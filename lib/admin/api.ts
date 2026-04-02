import "server-only";

import { ENV } from "@/src/configs/env.server";

type Envelope<T> = {
  status: string;
  data: T;
  message?: string;
};

type EmailLoginResponseData = {
  user: {
    _id: string;
    name?: string;
    email?: string | null;
    picture?: string | null;
    isGuest: boolean;
  };
  accessToken: string;
  refreshToken: string;
};

type TokenRefreshResponseData = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type AccessTokenClaims = {
  role?: string;
  email?: string | null;
  name?: string | null;
  picture?: string | null;
  exp?: number;
  [key: string]: unknown;
};

export class BackendApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "BackendApiError";
  }
}

export class AdminSessionExpiredError extends BackendApiError {
  constructor(message = "Admin session expired") {
    super(message, 401);
    this.name = "AdminSessionExpiredError";
  }
}

export class AdminAccessDeniedError extends BackendApiError {
  constructor(message = "Admin access required") {
    super(message, 403);
    this.name = "AdminAccessDeniedError";
  }
}

function buildApiUrl(pathname: string, query?: Record<string, string | number>) {
  const url = new URL(pathname, ENV.API_BASE_URL);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function parseEnvelope<T>(response: Response): Promise<Envelope<T>> {
  const payload = (await response.json().catch(() => null)) as
    | Envelope<T>
    | { message?: string }
    | null;

  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;

    if (response.status === 401) {
      throw new AdminSessionExpiredError(message);
    }

    if (response.status === 403) {
      throw new AdminAccessDeniedError(message);
    }

    throw new BackendApiError(message, response.status);
  }

  if (!payload || typeof payload !== "object" || !("data" in payload)) {
    throw new BackendApiError("Invalid backend response shape", response.status);
  }

  return payload as Envelope<T>;
}

async function requestEnvelope<T>(options: {
  pathname: string;
  method?: "GET" | "POST";
  accessToken?: string;
  body?: Record<string, unknown>;
  query?: Record<string, string | number>;
}): Promise<Envelope<T>> {
  const response = await fetch(buildApiUrl(options.pathname, options.query), {
    method: options.method ?? "GET",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.accessToken
        ? { Authorization: `Bearer ${options.accessToken}` }
        : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    cache: "no-store",
  });

  return parseEnvelope<T>(response);
}

export async function loginAdminWithEmail(input: {
  email: string;
  password: string;
}): Promise<EmailLoginResponseData> {
  const response = await requestEnvelope<EmailLoginResponseData>({
    pathname: "/v2/auth/email/login",
    method: "POST",
    body: input,
  });

  return response.data;
}

export async function logoutAdminFromBackend(
  refreshToken: string,
): Promise<void> {
  await requestEnvelope<void>({
    pathname: "/v2/auth/logout",
    method: "POST",
    body: { refreshToken },
  });
}

export async function refreshAdminTokens(
  refreshToken: string,
): Promise<TokenRefreshResponseData> {
  const response = await requestEnvelope<TokenRefreshResponseData>({
    pathname: "/v2/auth/refresh",
    method: "POST",
    body: { refreshToken },
  });

  return response.data;
}

export function readTokenExpiryMs(token: string): number {
  return readAccessTokenClaims(token).exp! * 1000;
}

export function readAccessTokenClaims(token: string): AccessTokenClaims {
  const segments = token.split(".");
  if (segments.length < 2) {
    throw new Error("Invalid token format");
  }

  const payloadSegment = segments[1];
  const normalized = payloadSegment
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(payloadSegment.length / 4) * 4, "=");
  const payload = JSON.parse(
    Buffer.from(normalized, "base64").toString("utf8"),
  ) as AccessTokenClaims;

  if (typeof payload.exp !== "number") {
    throw new Error("Missing access token expiration");
  }

  return payload;
}
