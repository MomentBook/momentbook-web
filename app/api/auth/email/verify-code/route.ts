import { NextResponse } from "next/server";
import { buildAuthProxyHeaders, getApiBaseUrl } from "../../_shared";

export async function POST(request: Request) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return NextResponse.json(
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
    return NextResponse.json(
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
      return NextResponse.json(
        payload ?? { status: "fail", message: "Verification failed" },
        { status: upstreamResponse.status },
      );
    }

    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch {
    return NextResponse.json(
      { status: "fail", message: "Verification request error" },
      { status: 500 },
    );
  }
}
