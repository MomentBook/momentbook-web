import { version } from "@/package.json";

type UnknownRecord = Record<string, unknown>;

export type BackendAuthUser = {
  userId: string | null;
  name: string | null;
  email: string | null;
};

export type BackendConsentStatus = {
  isAllRequiredConsented: boolean;
  missingRequiredConsents: string[];
  requiresAction: boolean;
};

export type BackendAuthTokens = {
  accessToken: string;
  refreshToken: string | null;
  accessTokenExpiresAt: number;
};

export type BackendAuthResult = BackendAuthTokens & {
  user: BackendAuthUser;
  consents: BackendConsentStatus | null;
  provider: string | null;
};

function asRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" ? (value as UnknownRecord) : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function parseJwtExpiryMs(token: string): number | null {
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8"),
    ) as { exp?: unknown };
    const exp = payload.exp;

    if (typeof exp !== "number" || !Number.isFinite(exp)) {
      return null;
    }

    return exp * 1000;
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Platform": "web",
    "App-Env": process.env.NEXT_PUBLIC_APP_ENV ?? "",
    "App-Is-Local": process.env.NEXT_PUBLIC_APP_IS_LOCAL ?? "false",
    "App-Version": version,
    "Accept-Language": "en",
  };
}

function getApiBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  return raw.replace(/\/+$/, "");
}

function normalizeAuthResult(payload: unknown): BackendAuthResult | null {
  const root = asRecord(payload);
  const data = asRecord(root?.data);

  const userRaw = asRecord(data?.user);
  const userId =
    asString(userRaw?.userId) ??
    asString(userRaw?._id) ??
    asString(data?.userId) ??
    null;
  const name = asString(userRaw?.name) ?? asString(data?.name) ?? null;
  const email = asString(userRaw?.email) ?? asString(data?.email) ?? null;

  const accessToken =
    asString(data?.accessToken) ??
    asString(data?.token) ??
    asString(root?.accessToken);
  if (!accessToken) {
    return null;
  }

  const refreshToken =
    asString(data?.refreshToken) ??
    asString(root?.refreshToken) ??
    null;

  const expiresInSeconds = asNumber(data?.expiresIn) ?? asNumber(root?.expiresIn);
  const expiresFromPayload =
    typeof expiresInSeconds === "number" && expiresInSeconds > 0
      ? Date.now() + expiresInSeconds * 1000
      : null;
  const accessTokenExpiresAt =
    expiresFromPayload ??
    parseJwtExpiryMs(accessToken) ??
    Date.now() + 55 * 60 * 1000;

  const consentsRaw = asRecord(data?.consents);
  const consents: BackendConsentStatus | null = consentsRaw
    ? {
        isAllRequiredConsented: asBoolean(consentsRaw.isAllRequiredConsented) ?? false,
        missingRequiredConsents: asStringArray(consentsRaw.missingRequiredConsents),
        requiresAction: asBoolean(consentsRaw.requiresAction) ?? false,
      }
    : null;

  const provider = asString(data?.provider) ?? asString(root?.provider) ?? null;

  return {
    user: {
      userId,
      name,
      email,
    },
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    consents,
    provider,
  };
}

async function callBackendAuth(
  path: string,
  body: UnknownRecord,
): Promise<BackendAuthResult | null> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      cache: "no-store",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      return null;
    }

    return normalizeAuthResult(payload);
  } catch {
    return null;
  }
}

async function callBackendAction(path: string, body: UnknownRecord): Promise<boolean> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return false;
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      cache: "no-store",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function exchangeEmailLogin(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  return callBackendAuth("/v2/auth/email/login", {
    email: normalizedEmail,
    password,
  });
}

export async function exchangeGoogleLogin(
  accessToken?: string,
  idToken?: string,
) {
  if (!accessToken && !idToken) {
    return null;
  }

  return callBackendAuth("/v2/auth/google/token", {
    ...(accessToken ? { accessToken } : {}),
    ...(idToken ? { idToken } : {}),
  });
}

export async function exchangeAppleLogin(
  idToken?: string,
  code?: string,
  options?: { nonce?: string; state?: string },
) {
  if (!idToken || !code) {
    return null;
  }

  return callBackendAuth("/v2/auth/apple", {
    id_token: idToken,
    code,
    platform: "web",
    ...(asString(options?.nonce) ? { nonce: options?.nonce } : {}),
    ...(asString(options?.state) ? { state: options?.state } : {}),
  });
}

export async function exchangeRefreshToken(refreshToken: string) {
  if (!refreshToken) {
    return null;
  }

  const refreshed = await callBackendAuth("/v2/auth/refresh", { refreshToken });
  if (!refreshed?.refreshToken) {
    return null;
  }

  return refreshed;
}

export async function exchangeLogout(refreshToken: string) {
  if (!refreshToken) {
    return false;
  }

  return callBackendAction("/v2/auth/logout", { refreshToken });
}
