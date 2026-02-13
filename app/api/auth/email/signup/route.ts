import {
  REFRESH_COOKIE_NAME,
  buildAuthProxyHeaders,
  buildRefreshCookieOptions,
  checkRateLimit,
  getApiBaseUrl,
  jsonNoStore,
} from "../../_shared";

type JsonObject = Record<string, unknown>;

function asObject(value: unknown): JsonObject | null {
  return value && typeof value === "object" ? (value as JsonObject) : null;
}

function stripRefreshToken(payload: unknown): unknown {
  const root = asObject(payload);
  if (!root) {
    return payload;
  }

  const sanitizedRoot: JsonObject = { ...root };
  const rootRefreshToken = sanitizedRoot.refreshToken;
  if (typeof rootRefreshToken === "string") {
    delete sanitizedRoot.refreshToken;
  }

  const data = asObject(sanitizedRoot.data);
  if (data) {
    const sanitizedData: JsonObject = { ...data };
    const dataRefreshToken = sanitizedData.refreshToken;
    if (typeof dataRefreshToken === "string") {
      delete sanitizedData.refreshToken;
    }
    sanitizedRoot.data = sanitizedData;
  }

  return sanitizedRoot;
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "email-signup", 8, 60_000);
  if (rateLimit.limited) {
    return jsonNoStore(
      { status: "fail", message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return jsonNoStore(
      { status: "fail", message: "API base url is not configured" },
      { status: 500 },
    );
  }

  const requestBody = (await request.json().catch(() => null)) as
    | {
        email?: string;
        password?: string;
        name?: string;
        verificationToken?: string;
      }
    | null;
  const email = requestBody?.email?.trim().toLowerCase();
  const password = requestBody?.password;
  const name = requestBody?.name?.trim();
  const verificationToken = requestBody?.verificationToken?.trim();

  if (!email || !password || !name || !verificationToken) {
    return jsonNoStore(
      {
        status: "fail",
        message: "Email, password, name and verification token are required",
      },
      { status: 400 },
    );
  }

  try {
    const upstreamResponse = await fetch(`${apiBaseUrl}/v2/auth/email/signup`, {
      method: "POST",
      cache: "no-store",
      headers: await buildAuthProxyHeaders(),
      body: JSON.stringify({
        email,
        password,
        name,
        verificationToken,
      }),
    });

    const payload = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok) {
      return jsonNoStore(
        payload ?? { status: "fail", message: "Sign-up failed" },
        { status: upstreamResponse.status },
      );
    }

    const refreshToken = payload?.data?.refreshToken;
    const response = jsonNoStore(stripRefreshToken(payload), {
      status: upstreamResponse.status,
    });

    if (typeof refreshToken === "string" && refreshToken.length > 0) {
      const refreshMaxAgeSeconds = 60 * 60 * 24 * 30;
      response.cookies.set(
        REFRESH_COOKIE_NAME,
        refreshToken,
        buildRefreshCookieOptions(refreshMaxAgeSeconds),
      );
    }

    return response;
  } catch {
    return jsonNoStore(
      { status: "fail", message: "Sign-up request error" },
      { status: 500 },
    );
  }
}
