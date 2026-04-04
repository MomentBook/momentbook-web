import { redirect } from "next/navigation";
import {
  AdminAccessDeniedError,
  AdminSessionExpiredError,
} from "@/lib/admin/api";
import {
  ADMIN_REVIEW_PAGE_SIZE,
  loadAdminReviewWorkspaceData,
  type AdminReviewQueueStatus,
  type AdminReviewStatus,
} from "@/lib/admin/reviews";
import { buildAdminLoginHref } from "@/lib/admin/paths";
import {
  clearAdminSession,
  requireAdminApiSession,
} from "@/lib/admin/session";

export type AdminDashboardBanner = {
  tone: "default" | "error" | "success";
  message: string;
};

export function readQueryParam(
  value: string | string[] | undefined,
): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }

  return null;
}

export function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;
}

export function parseStatus(value: string | null): AdminReviewQueueStatus {
  if (
    value === "pending" ||
    value === "approved" ||
    value === "rejected" ||
    value === "all"
  ) {
    return value;
  }

  return "pending";
}

export function parseReviewStatus(value: string | null): AdminReviewStatus | null {
  if (
    value === "PENDING" ||
    value === "APPROVED" ||
    value === "REJECTED"
  ) {
    return value;
  }

  return null;
}

function buildReviewStatusLabel(status: AdminReviewStatus): string {
  if (status === "APPROVED") {
    return "Approved";
  }

  if (status === "REJECTED") {
    return "Rejected";
  }

  return "Pending";
}

export function resolveBanner(options: {
  error: string | null;
  mutation: string | null;
  reviewStatus: AdminReviewStatus | null;
  targetPublicId: string | null;
}): AdminDashboardBanner | null {
  if (
    options.mutation === "review_updated" &&
    options.targetPublicId &&
    options.reviewStatus
  ) {
    return {
      tone: "success",
      message: `${options.targetPublicId} updated to ${buildReviewStatusLabel(options.reviewStatus)}.`,
    };
  }

  switch (options.error) {
    case "missing_public_id":
      return {
        tone: "error",
        message: "Enter a public ID.",
      };
    case "invalid_review_status":
      return {
        tone: "error",
        message: "Choose a review status.",
      };
    case "admin_access_denied":
      return {
        tone: "error",
        message: "This session cannot update review status.",
      };
    case "review_target_not_found":
      return {
        tone: "error",
        message: "No published journey matched that public ID.",
      };
    case "review_update_failed":
      return {
        tone: "error",
        message: "Could not update review status. Try again.",
      };
    default:
      return null;
  }
}

export async function loadAdminWorkspaceShell(options: {
  page: number;
  returnTo: string;
  status: AdminReviewQueueStatus;
}) {
  const session = await requireAdminApiSession(options.returnTo);

  try {
    const { queue } = await loadAdminReviewWorkspaceData({
      accessToken: session.accessToken,
      page: options.page,
      status: options.status,
      limit: ADMIN_REVIEW_PAGE_SIZE,
    });

    return {
      queue,
      session,
    };
  } catch (error) {
    if (
      error instanceof AdminSessionExpiredError ||
      error instanceof AdminAccessDeniedError
    ) {
      await clearAdminSession();
      redirect(
        buildAdminLoginHref({
          next: options.returnTo,
          error: "session_expired",
        }),
      );
    }

    throw error;
  }
}

export async function loadAdminReviewDetailShell(options: {
  page: number;
  publicId: string;
  returnTo: string;
  status: AdminReviewQueueStatus;
}) {
  const session = await requireAdminApiSession(options.returnTo);

  try {
    const { detail, queue } = await loadAdminReviewWorkspaceData({
      accessToken: session.accessToken,
      page: options.page,
      status: options.status,
      limit: ADMIN_REVIEW_PAGE_SIZE,
      publicId: options.publicId,
    });

    return {
      detail,
      queue,
      session,
    };
  } catch (error) {
    if (
      error instanceof AdminSessionExpiredError ||
      error instanceof AdminAccessDeniedError
    ) {
      await clearAdminSession();
      redirect(
        buildAdminLoginHref({
          next: options.returnTo,
          error: "session_expired",
        }),
      );
    }

    throw error;
  }
}
