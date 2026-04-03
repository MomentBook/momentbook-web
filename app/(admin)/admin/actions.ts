"use server";

import { redirect } from "next/navigation";
import {
  AdminAccessDeniedError,
  AdminSessionExpiredError,
  BackendApiError,
  loginAdminWithEmail,
  logoutAdminFromBackend,
  readAccessTokenClaims,
  readTokenExpiryMs,
  updatePublishedJourneyReviewStatus,
} from "@/lib/admin/api";
import {
  ADMIN_REVIEWS_PATH,
  buildAdminLoginHref,
  sanitizeAdminPath,
  withAdminQuery,
} from "@/lib/admin/paths";
import {
  clearAdminSession,
  createAdminSession,
  getStoredAdminSession,
  requireAdminSession,
} from "@/lib/admin/session";
import type { UpdatePublishedJourneyReviewRequestDto } from "@/src/apis/client";

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

function buildReviewActionRedirect(
  nextPath: string,
  entries: Record<string, string | null | undefined>,
): never {
  redirect(withAdminQuery(nextPath, entries));
}

function readReviewStatus(
  value: FormDataEntryValue | null,
): UpdatePublishedJourneyReviewRequestDto["status"] | null {
  if (typeof value !== "string") {
    return null;
  }

  if (value === "PENDING" || value === "APPROVED" || value === "REJECTED") {
    return value;
  }

  return null;
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

export async function updatePublishedJourneyReviewAction(
  formData: FormData,
): Promise<never> {
  const nextPath =
    sanitizeAdminPath(readText(formData.get("returnTo"))) ?? ADMIN_REVIEWS_PATH;
  const targetPublicId = readText(formData.get("targetPublicId"));
  const reviewStatus = readReviewStatus(formData.get("reviewStatus"));

  const buildReturnEntries = (
    extra: Record<string, string | null | undefined>,
  ) => ({
    targetPublicId: targetPublicId || null,
    mutation: null,
    reviewStatus: null,
    error: null,
    ...extra,
  });

  if (!targetPublicId) {
    buildReviewActionRedirect(
      nextPath,
      buildReturnEntries({
        error: "missing_public_id",
      }),
    );
  }

  if (!reviewStatus) {
    buildReviewActionRedirect(
      nextPath,
      buildReturnEntries({
        error: "invalid_review_status",
      }),
    );
  }

  const session = await requireAdminSession(nextPath);

  try {
    const result = await updatePublishedJourneyReviewStatus({
      accessToken: session.accessToken,
      publicId: targetPublicId,
      status: reviewStatus,
    });

    buildReviewActionRedirect(
      nextPath,
      buildReturnEntries({
        targetPublicId: result.publicId,
        mutation: "review_updated",
        reviewStatus: result.review.status,
      }),
    );
  } catch (error) {
    if (error instanceof AdminSessionExpiredError) {
      redirect(
        buildAdminLoginHref({
          next: nextPath,
          error: "session_expired",
        }),
      );
    }

    if (error instanceof AdminAccessDeniedError) {
      buildReviewActionRedirect(
        nextPath,
        buildReturnEntries({
          error: "admin_access_denied",
        }),
      );
    }

    if (error instanceof BackendApiError && error.statusCode === 404) {
      buildReviewActionRedirect(
        nextPath,
        buildReturnEntries({
          error: "review_target_not_found",
        }),
      );
    }

    buildReviewActionRedirect(
      nextPath,
      buildReturnEntries({
        error: "review_update_failed",
      }),
    );
  }
}
