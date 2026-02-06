import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { version } from "@/package.json";

const REFRESH_COOKIE_NAME = "refresh_token";

function getEnv(name: string, fallback = "") {
  const value = process.env[name];
  return value === undefined || value === null || value === "" ? fallback : value;
}

function buildRefreshCookieOptions(maxAgeSeconds?: number) {
  const isProd = getEnv("NEXT_PUBLIC_APP_ENV") === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    ...(typeof maxAgeSeconds === "number" ? { maxAge: maxAgeSeconds } : {}),
  };
}

export async function POST(request: Request) {
  const API_BASE_URL = getEnv("NEXT_PUBLIC_API_BASE_URL");
  if (!API_BASE_URL) {
    return NextResponse.json(
      { status: "fail", message: "API base url is not configured" },
      { status: 500 },
    );
  }

  const requestBody = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  const email = requestBody?.email?.trim();
  const password = requestBody?.password;

  if (!email || !password) {
    return NextResponse.json(
      { status: "fail", message: "Email and password are required" },
      { status: 400 },
    );
  }

  const APP_ENV = getEnv("NEXT_PUBLIC_APP_ENV");
  const APP_IS_LOCAL = getEnv("NEXT_PUBLIC_APP_IS_LOCAL", "false");

  try {
    const upstreamResponse = await fetch(`${API_BASE_URL}/v2/auth/email/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "App-Env": APP_ENV,
        "App-Is-Local": APP_IS_LOCAL,
        "App-Version": version,
        "Accept-Language": (await headers()).get("accept-language") ?? "",
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = await upstreamResponse.json().catch(() => null);
    if (!upstreamResponse.ok) {
      return NextResponse.json(
        payload ?? { status: "fail", message: "Login failed" },
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
      { status: "fail", message: "Login request error" },
      { status: 500 },
    );
  }
}
