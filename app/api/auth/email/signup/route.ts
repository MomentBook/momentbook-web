import { NextResponse } from "next/server";
import {
  REFRESH_COOKIE_NAME,
  buildAuthProxyHeaders,
  buildRefreshCookieOptions,
  getApiBaseUrl,
} from "../../_shared";

export async function POST(request: Request) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return NextResponse.json(
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
    return NextResponse.json(
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
      return NextResponse.json(
        payload ?? { status: "fail", message: "Sign-up failed" },
        { status: upstreamResponse.status },
      );
    }

    const refreshToken = payload?.data?.refreshToken;
    const response = NextResponse.json(payload, { status: upstreamResponse.status });

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
    return NextResponse.json(
      { status: "fail", message: "Sign-up request error" },
      { status: 500 },
    );
  }
}
