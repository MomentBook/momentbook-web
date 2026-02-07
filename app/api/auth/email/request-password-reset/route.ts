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
    | { email?: string }
    | null;
  const email = requestBody?.email?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { status: "fail", message: "Email is required" },
      { status: 400 },
    );
  }

  try {
    const upstreamResponse = await fetch(
      `${apiBaseUrl}/v2/auth/email/request-password-reset`,
      {
        method: "POST",
        cache: "no-store",
        headers: await buildAuthProxyHeaders(),
        body: JSON.stringify({ email }),
      },
    );

    const payload = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        payload ?? { status: "fail", message: "Failed to request password reset" },
        { status: upstreamResponse.status },
      );
    }

    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch {
    return NextResponse.json(
      { status: "fail", message: "Password reset request error" },
      { status: 500 },
    );
  }
}
