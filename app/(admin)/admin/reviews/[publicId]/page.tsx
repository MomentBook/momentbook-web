import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminReviewDetailPageView } from "@/app/(admin)/admin/AdminWorkspace";
import { getAdminReviewDetailMock } from "@/lib/admin/mock-data";
import {
  buildAdminReviewDetailHref,
  buildAdminWorkspaceHref,
} from "@/lib/admin/paths";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import {
  loadAdminWorkspaceShell,
  parsePage,
  parseReviewStatus,
  parseStatus,
  readQueryParam,
  resolveBanner,
} from "../../workspace-data";

export const metadata: Metadata = {
  title: "Review Detail",
  robots: buildNoIndexRobots(),
};

export default async function AdminReviewDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ publicId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const publicId = decodeURIComponent(resolvedParams.publicId);
  const page = parsePage(readQueryParam(resolvedSearchParams.page));
  const status = parseStatus(readQueryParam(resolvedSearchParams.status));
  const targetPublicId = readQueryParam(resolvedSearchParams.targetPublicId);
  const mutation = readQueryParam(resolvedSearchParams.mutation);
  const reviewStatus = parseReviewStatus(
    readQueryParam(resolvedSearchParams.reviewStatus),
  );
  const returnTo = buildAdminReviewDetailHref(publicId, {
    page: page > 1 ? String(page) : null,
    status: status === "pending" ? null : status,
  });
  const detail = getAdminReviewDetailMock(publicId);

  if (!detail) {
    redirect(
      buildAdminWorkspaceHref("reviews", {
        page: page > 1 ? String(page) : null,
        status: status === "pending" ? null : status,
      }),
    );
  }

  const banner = resolveBanner({
    error: readQueryParam(resolvedSearchParams.error),
    mutation,
    reviewStatus,
    targetPublicId,
  });

  const reviewMutation =
    mutation === "review_updated" && targetPublicId && reviewStatus
      ? {
          publicId: targetPublicId,
          reviewStatus,
        }
      : null;

  const { queue, session } = await loadAdminWorkspaceShell({
    page,
    returnTo,
    status,
  });

  return (
    <AdminReviewDetailPageView
      banner={banner}
      detail={detail}
      queue={queue}
      reviewMutation={reviewMutation}
      returnTo={returnTo}
      session={session}
      targetPublicId={targetPublicId}
    />
  );
}
