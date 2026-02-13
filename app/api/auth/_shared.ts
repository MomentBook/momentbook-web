import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { version } from "@/package.json";

export const REFRESH_COOKIE_NAME = "refresh_token";
const RATE_LIMIT_MAX_ENTRIES = 5000;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function getEnv(name: string, fallback = "") {
  const value = process.env[name];
  return value === undefined || value === null || value === "" ? fallback : value;
}

export function getApiBaseUrl() {
  const apiBaseUrl = getEnv("NEXT_PUBLIC_API_BASE_URL").trim();
  if (!apiBaseUrl) {
    return "";
  }

  try {
    const parsed = new URL(apiBaseUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }

    const isProd = getEnv("NEXT_PUBLIC_APP_ENV") === "production";
    if (isProd && parsed.protocol !== "https:") {
      return "";
    }

    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

export function buildRefreshCookieOptions(maxAgeSeconds?: number) {
  const isProd =
    process.env.NODE_ENV === "production" ||
    getEnv("NEXT_PUBLIC_APP_ENV") === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict" as const,
    path: "/",
    ...(typeof maxAgeSeconds === "number" ? { maxAge: maxAgeSeconds } : {}),
  };
}

export async function buildAuthProxyHeaders() {
  const requestHeaders = await headers();

  return {
    "Content-Type": "application/json",
    "X-Platform": "web",
    "App-Env": getEnv("NEXT_PUBLIC_APP_ENV"),
    "App-Is-Local": getEnv("NEXT_PUBLIC_APP_IS_LOCAL", "false"),
    "App-Version": version,
    "Accept-Language": requestHeaders.get("accept-language") ?? "",
  };
}

function withNoStoreHeaders(init?: ResponseInit): ResponseInit {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  return {
    ...(init ?? {}),
    headers,
  };
}

export function jsonNoStore(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, withNoStoreHeaders(init));
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  for (const [key, bucket] of rateLimitStore.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function checkRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  pruneRateLimitStore(now);

  const ip = getClientIp(request);
  const key = `${scope}:${ip}`;
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return { limited: false, retryAfterSeconds: 0 };
}
