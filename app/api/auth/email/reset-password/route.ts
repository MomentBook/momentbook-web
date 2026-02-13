import {
  buildAuthProxyHeaders,
  checkRateLimit,
  getApiBaseUrl,
  jsonNoStore,
} from "../../_shared";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "email-reset-password", 10, 60_000);
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
    | { email?: string; code?: string; newPassword?: string }
    | null;
  const email = requestBody?.email?.trim().toLowerCase();
  const code = requestBody?.code?.trim();
  const newPassword = requestBody?.newPassword;

  if (!email || !code || !newPassword) {
    return jsonNoStore(
      {
        status: "fail",
        message: "Email, verification code and new password are required",
      },
      { status: 400 },
    );
  }

  try {
    const upstreamResponse = await fetch(
      `${apiBaseUrl}/v2/auth/email/reset-password`,
      {
        method: "POST",
        cache: "no-store",
        headers: await buildAuthProxyHeaders(),
        body: JSON.stringify({ email, code, newPassword }),
      },
    );

    const payload = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok) {
      return jsonNoStore(
        payload ?? { status: "fail", message: "Failed to reset password" },
        { status: upstreamResponse.status },
      );
    }

    return jsonNoStore(payload, { status: upstreamResponse.status });
  } catch {
    return jsonNoStore(
      { status: "fail", message: "Password reset request error" },
      { status: 500 },
    );
  }
}
