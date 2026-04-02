"use server";

import { redirect } from "next/navigation";
import {
  AdminSessionExpiredError,
  BackendApiError,
  loginAdminWithEmail,
  logoutAdminFromBackend,
  readAccessTokenClaims,
  readTokenExpiryMs,
} from "@/lib/admin/api";
import {
  ADMIN_REVIEWS_PATH,
  buildAdminLoginHref,
  sanitizeAdminPath,
} from "@/lib/admin/paths";
import {
  clearAdminSession,
  createAdminSession,
  getStoredAdminSession,
} from "@/lib/admin/session";

function readText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function buildLoginErrorRedirect(nextPath: string, error: string): never {
  redirect(
    buildAdminLoginHref({
      next: nextPath,
      error,
    }),
  );
}

export async function loginAdminAction(formData: FormData): Promise<never> {
  const email = readText(formData.get("email")).toLowerCase();
  const password = readText(formData.get("password"));
  const nextPath =
    sanitizeAdminPath(readText(formData.get("next"))) ?? ADMIN_REVIEWS_PATH;

  if (!email || !password) {
    buildLoginErrorRedirect(nextPath, "missing_fields");
  }

  try {
    const login = await loginAdminWithEmail({ email, password });
    const claims = readAccessTokenClaims(login.accessToken);

    if (claims.role !== "admin") {
      buildLoginErrorRedirect(nextPath, "admin_only");
    }

    await createAdminSession({
      userId: login.user._id,
      role: "admin",
      email:
        typeof claims.email === "string" ? claims.email : login.user.email ?? null,
      name: typeof claims.name === "string" ? claims.name : login.user.name ?? null,
      accessToken: login.accessToken,
      refreshToken: login.refreshToken,
      accessTokenExpiresAt: readTokenExpiryMs(login.accessToken),
      refreshTokenExpiresAt: readTokenExpiryMs(login.refreshToken),
    });
  } catch (error) {
    if (error instanceof AdminSessionExpiredError) {
      buildLoginErrorRedirect(nextPath, "invalid_credentials");
    }

    if (error instanceof BackendApiError) {
      buildLoginErrorRedirect(nextPath, "service_unavailable");
    }

    buildLoginErrorRedirect(nextPath, "invalid_credentials");
  }

  redirect(nextPath);
}

export async function logoutAdminAction(): Promise<never> {
  const session = await getStoredAdminSession();

  if (session?.refreshToken) {
    try {
      await logoutAdminFromBackend(session.refreshToken);
    } catch {
      // Clear the local admin session even if backend logout fails.
    }
  }

  await clearAdminSession();
  redirect(
    buildAdminLoginHref({
      loggedOut: true,
    }),
  );
}
