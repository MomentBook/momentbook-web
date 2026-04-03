import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminSessionExpiredError } from "@/lib/admin/api";
import {
  ADMIN_REVIEWS_PATH,
  buildAdminLoginHref,
  withAdminQuery,
} from "@/lib/admin/paths";
import {
  getAdminReviewDetailMock,
  getAdminReviewQueueMock,
  type AdminReviewDetail,
  type AdminReviewQueueStatus,
  type AdminReviewStatus,
} from "@/lib/admin/mock-data";
import { requireAdminSession } from "@/lib/admin/session";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import { AdminReviewsDashboard } from "./AdminReviewsDashboard";

function readQueryParam(value: string | string[] | undefined): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }

  return null;
}

function parsePage(value: string | null): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;
}

function parseStatus(value: string | null): AdminReviewQueueStatus {
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

function parseReviewStatus(value: string | null): AdminReviewStatus | null {
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

function buildReturnHref(page: number, status: AdminReviewQueueStatus): string {
  return withAdminQuery(ADMIN_REVIEWS_PATH, {
    page: page > 1 ? String(page) : null,
    status: status === "pending" ? null : status,
  });
}

function resolveBanner(options: {
  error: string | null;
  mutation: string | null;
  reviewStatus: AdminReviewStatus | null;
  targetPublicId: string | null;
}): { tone: "default" | "error" | "success"; message: string } | null {
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

async function loadWorkspaceData(options: {
  page: number;
  publicId: string | null;
  status: AdminReviewQueueStatus;
}) {
  const returnTo = buildReturnHref(options.page, options.status);

  try {
    const session = await requireAdminSession(returnTo);
    const queue = getAdminReviewQueueMock({
      page: options.page,
      status: options.status,
      limit: 20,
    });
    let selectedPublicId = options.publicId?.trim() || null;

    if (!selectedPublicId && queue.items.length > 0) {
      selectedPublicId = queue.items[0]?.publicId ?? null;
    }

    let selectedDetail: AdminReviewDetail | null = null;

    if (selectedPublicId) {
      selectedDetail = getAdminReviewDetailMock(selectedPublicId);

      if (!selectedDetail && queue.items.length > 0) {
        selectedPublicId = queue.items[0]?.publicId ?? null;

        if (selectedPublicId) {
          selectedDetail = getAdminReviewDetailMock(selectedPublicId);
        }
      }
    }

    return {
      queue,
      returnTo,
      selectedDetail,
      selectedPublicId,
      session,
    };
  } catch (error) {
    if (error instanceof AdminSessionExpiredError) {
      redirect(
        buildAdminLoginHref({
          next: returnTo,
          error: "session_expired",
        }),
      );
    }

    throw error;
  }
}

export const metadata: Metadata = {
  title: "Journey Review",
  robots: buildNoIndexRobots(),
};

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parsePage(readQueryParam(resolvedSearchParams.page));
  const status = parseStatus(readQueryParam(resolvedSearchParams.status));
  const currentPublicId = readQueryParam(resolvedSearchParams.publicId);
  const targetPublicId = readQueryParam(resolvedSearchParams.targetPublicId);
  const mutation = readQueryParam(resolvedSearchParams.mutation);
  const reviewStatus = parseReviewStatus(
    readQueryParam(resolvedSearchParams.reviewStatus),
  );

  const banner = resolveBanner({
    error: readQueryParam(resolvedSearchParams.error),
    mutation,
    reviewStatus,
    targetPublicId,
  });

  const { queue, returnTo, selectedDetail, selectedPublicId, session } =
    await loadWorkspaceData({
      page,
      publicId: currentPublicId,
      status,
    });

  const liveMutation =
    mutation === "review_updated" && targetPublicId && reviewStatus
      ? {
          publicId: targetPublicId,
          reviewStatus,
        }
      : null;

  return (
    <AdminReviewsDashboard
      banner={banner}
      liveMutation={liveMutation}
      queue={queue}
      returnTo={returnTo}
      selectedDetail={selectedDetail}
      selectedPublicId={selectedPublicId}
      session={session}
      targetPublicId={targetPublicId}
    />
  );
}
