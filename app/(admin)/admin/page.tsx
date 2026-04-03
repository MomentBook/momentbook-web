import type { Metadata } from "next";
import {
  getAdminReviewDetailMock,
  getAdminReviewQueueMock,
  type AdminReviewDetail,
  type AdminReviewQueueStatus,
  type AdminReviewStatus,
} from "@/lib/admin/mock-data";
import {
  buildAdminWorkspaceHref,
  parseAdminWorkspaceTab,
} from "@/lib/admin/paths";
import { requireAdminSession } from "@/lib/admin/session";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import { AdminWorkspace } from "./AdminWorkspace";

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
  tab: ReturnType<typeof parseAdminWorkspaceTab>;
}) {
  const returnTo = buildAdminWorkspaceHref(options.tab, {
    page: options.page > 1 ? String(options.page) : null,
    publicId: options.publicId,
    status: options.status === "pending" ? null : options.status,
  });
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
}

export const metadata: Metadata = {
  title: "Moderation Workspace",
  robots: buildNoIndexRobots(),
};

export default async function AdminIndexPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeTab = parseAdminWorkspaceTab(
    readQueryParam(resolvedSearchParams.tab),
  );
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
      tab: activeTab,
    });

  const reviewMutation =
    mutation === "review_updated" && targetPublicId && reviewStatus
      ? {
          publicId: targetPublicId,
          reviewStatus,
        }
      : null;

  return (
    <AdminWorkspace
      activeTab={activeTab}
      banner={banner}
      reviewMutation={reviewMutation}
      queue={queue}
      returnTo={returnTo}
      selectedDetail={selectedDetail}
      selectedPublicId={selectedPublicId}
      session={session}
      targetPublicId={targetPublicId}
    />
  );
}
