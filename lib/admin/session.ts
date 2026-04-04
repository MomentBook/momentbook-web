import "server-only";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EncryptJWT, jwtDecrypt } from "jose";
import {
  readAccessTokenClaims,
  readTokenExpiryMs,
  refreshAdminTokens,
} from "@/lib/admin/api";
import { isAllowedAdminEmail } from "@/lib/admin/config";
import { buildAdminLoginHref } from "@/lib/admin/paths";
import { ENV } from "@/src/configs/env.server";

const ADMIN_SESSION_COOKIE_NAME = "momentbook_admin_session";
const ADMIN_SESSION_COOKIE_PATH = "/admin";
const ACCESS_TOKEN_REFRESH_WINDOW_MS = 60_000;

export type AdminSession = {
  userId: string;
  role: "admin";
  email: string | null;
  name: string | null;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

function getSessionSecret(): Uint8Array {
  const raw = ENV.ADMIN_SESSION_SECRET?.trim();

  if (!raw) {
    throw new Error("Missing required server env: ADMIN_SESSION_SECRET");
  }

  return createHash("sha256").update(raw).digest();
}

function isSessionShape(value: unknown): value is AdminSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return (
    typeof payload.userId === "string" &&
    payload.role === "admin" &&
    (typeof payload.email === "string" || payload.email === null) &&
    (typeof payload.name === "string" || payload.name === null) &&
    typeof payload.accessToken === "string" &&
    typeof payload.refreshToken === "string" &&
    typeof payload.accessTokenExpiresAt === "number" &&
    typeof payload.refreshTokenExpiresAt === "number"
  );
}

async function encryptAdminSession(session: AdminSession): Promise<string> {
  return new EncryptJWT(session)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(session.refreshTokenExpiresAt / 1000))
    .encrypt(getSessionSecret());
}

export async function createAdminSession(session: AdminSession): Promise<void> {
  const cookieStore = await cookies();
  const expires = new Date(session.refreshTokenExpiresAt);
  const encrypted = await encryptAdminSession(session);

  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: ADMIN_SESSION_COOKIE_PATH,
  });
}

async function readStoredAdminSessionCookie(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!encrypted) {
    return null;
  }

  try {
    const { payload } = await jwtDecrypt(encrypted, getSessionSecret());
    return isSessionShape(payload) ? payload : null;
  } catch {
    return null;
  }
}

export async function getStoredAdminSession(): Promise<AdminSession | null> {
  const session = await readStoredAdminSessionCookie();

  if (!session) {
    return null;
  }

  if (session.refreshTokenExpiresAt <= Date.now()) {
    return null;
  }

  if (!isAllowedAdminEmail(session.email)) {
    return null;
  }

  return session;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await getStoredAdminSession();

  if (!session) {
    return null;
  }

  return session;
}

async function refreshAdminSession(
  session: AdminSession,
): Promise<AdminSession | null> {
  if (session.accessTokenExpiresAt - Date.now() > ACCESS_TOKEN_REFRESH_WINDOW_MS) {
    return session;
  }

  try {
    const refreshed = await refreshAdminTokens(session.refreshToken);
    const claims = readAccessTokenClaims(refreshed.accessToken);
    const nextSession: AdminSession = {
      userId: session.userId,
      role: "admin",
      email:
        typeof claims.email === "string" ? claims.email : session.email,
      name: typeof claims.name === "string" ? claims.name : session.name,
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
      accessTokenExpiresAt: readTokenExpiryMs(refreshed.accessToken),
      refreshTokenExpiresAt: readTokenExpiryMs(refreshed.refreshToken),
    };

    if (!isAllowedAdminEmail(nextSession.email)) {
      await clearAdminSession();
      return null;
    }

    await createAdminSession(nextSession);
    return nextSession;
  } catch {
    await clearAdminSession();
    return null;
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: ADMIN_SESSION_COOKIE_PATH,
  });
}

export async function requireAdminSession(nextPath: string): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    redirect(
      buildAdminLoginHref({
        next: nextPath,
        error: "session_expired",
      }),
    );
  }

  return session;
}

export async function requireAdminApiSession(
  nextPath: string,
): Promise<AdminSession> {
  const session = await getStoredAdminSession();

  if (!session) {
    redirect(
      buildAdminLoginHref({
        next: nextPath,
        error: "session_expired",
      }),
    );
  }

  const refreshedSession = await refreshAdminSession(session);

  if (!refreshedSession) {
    redirect(
      buildAdminLoginHref({
        next: nextPath,
        error: "session_expired",
      }),
    );
  }

  return refreshedSession;
}

export async function requireAdminActionSession(
  nextPath: string,
): Promise<AdminSession> {
  return requireAdminApiSession(nextPath);
}
