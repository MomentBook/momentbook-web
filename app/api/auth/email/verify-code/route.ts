import {
  buildAuthProxyHeaders,
  checkRateLimit,
  getApiBaseUrl,
  jsonNoStore,
} from "../../_shared";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "email-verify-code", 12, 60_000);
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
    | { email?: string; code?: string }
    | null;
  const email = requestBody?.email?.trim().toLowerCase();
  const code = requestBody?.code?.trim();

  if (!email || !code) {
    return jsonNoStore(
      { status: "fail", message: "Email and verification code are required" },
      { status: 400 },
    );
  }

  try {
    const upstreamResponse = await fetch(
      `${apiBaseUrl}/v2/auth/email/verify-code`,
      {
        method: "POST",
        cache: "no-store",
        headers: await buildAuthProxyHeaders(),
        body: JSON.stringify({ email, code }),
      },
    );

    const payload = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok) {
      return jsonNoStore(
        payload ?? { status: "fail", message: "Verification failed" },
        { status: upstreamResponse.status },
      );
    }

    return jsonNoStore(payload, { status: upstreamResponse.status });
  } catch {
    return jsonNoStore(
      { status: "fail", message: "Verification request error" },
      { status: 500 },
    );
  }
}
