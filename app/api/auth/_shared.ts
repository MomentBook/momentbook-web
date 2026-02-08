import { headers } from "next/headers";
import { version } from "@/package.json";

export const REFRESH_COOKIE_NAME = "refresh_token";

export function getEnv(name: string, fallback = "") {
  const value = process.env[name];
  return value === undefined || value === null || value === "" ? fallback : value;
}

export function getApiBaseUrl() {
  const apiBaseUrl = getEnv("NEXT_PUBLIC_API_BASE_URL");
  return apiBaseUrl.replace(/\/+$/, "");
}

export function buildRefreshCookieOptions(maxAgeSeconds?: number) {
  const isProd = getEnv("NEXT_PUBLIC_APP_ENV") === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    ...(typeof maxAgeSeconds === "number" ? { maxAge: maxAgeSeconds } : {}),
  };
}

export async function buildAuthProxyHeaders() {
  const requestHeaders = await headers();

  return {
    "Content-Type": "application/json",
    "App-Env": getEnv("NEXT_PUBLIC_APP_ENV"),
    "App-Is-Local": getEnv("NEXT_PUBLIC_APP_IS_LOCAL", "false"),
    "App-Version": version,
    "Accept-Language": requestHeaders.get("accept-language") ?? "",
  };
}
