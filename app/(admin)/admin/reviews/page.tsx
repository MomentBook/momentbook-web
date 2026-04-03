import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { AdminSessionExpiredError } from "@/lib/admin/api";
import {
  logoutAdminAction,
  updatePublishedJourneyReviewAction,
} from "@/app/(admin)/admin/actions";
import {
  ADMIN_REVIEWS_PATH,
  buildAdminLoginHref,
  withAdminQuery,
} from "@/lib/admin/paths";
import {
  getAdminReviewDetailMock,
  getAdminReviewQueueMock,
  type AdminJourneyDetail,
  type AdminReviewDetail,
  type AdminReviewQueueItem,
  type AdminReviewQueueStatus,
  type AdminReviewStatus,
} from "@/lib/admin/mock-data";
import { requireAdminSession } from "@/lib/admin/session";
import { defaultLanguage } from "@/lib/i18n/config";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import styles from "./reviews.module.scss";

const ADMIN_DISPLAY_LANGUAGE = defaultLanguage;

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

function resolveBanner(options: {
  error: string | null;
  mutation: string | null;
  targetPublicId: string | null;
  reviewStatus: AdminReviewStatus | null;
}): { tone: "default" | "error" | "success"; message: string } | null {
  if (options.mutation === "review_updated" && options.targetPublicId && options.reviewStatus) {
    return {
      tone: "success",
      message:
        `Review status for ${options.targetPublicId} is now ${buildStatusLabel(options.reviewStatus)}. Public surfaces expose only approved journeys with public visibility.`,
    };
  }

  switch (options.error) {
    case "missing_public_id":
      return {
        tone: "error",
        message: "Enter a public ID before sending a live review update.",
      };
    case "invalid_review_status":
      return {
        tone: "error",
        message: "Choose a valid review status before submitting.",
      };
    case "admin_access_denied":
      return {
        tone: "error",
        message:
          "The current admin session is valid, but it is not allowed to update journey review status.",
      };
    case "review_target_not_found":
      return {
        tone: "error",
        message:
          "No published journey matched that public ID. Check the identifier and try again.",
      };
    case "review_update_failed":
      return {
        tone: "error",
        message:
          "The review status could not be updated. Check backend health and try again.",
      };
    default:
      return null;
  }
}

function buildStatusChipClass(status: AdminReviewQueueItem["review"]["status"]): string {
  if (status === "APPROVED") {
    return styles.chipApproved;
  }

  if (status === "REJECTED") {
    return styles.chipRejected;
  }

  return styles.chipPending;
}

function buildStatusLabel(status: AdminReviewQueueItem["review"]["status"]): string {
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

function buildQueueHref(returnTo: string, publicId: string): string {
  return withAdminQuery(returnTo, {
    publicId,
  });
}

async function loadWorkspaceData(options: {
  page: number;
  status: AdminReviewQueueStatus;
  publicId: string | null;
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
      session,
      queue,
      selectedPublicId,
      selectedDetail,
      returnTo,
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
  title: "Review Queue",
  robots: buildNoIndexRobots(),
};

function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <article className={styles.summaryCard}>
      <span className={styles.summaryLabel}>{label}</span>
      <strong className={styles.summaryValue}>{value}</strong>
      <span className={styles.summaryHint}>{hint}</span>
    </article>
  );
}

function QueueCard({
  item,
  href,
  isActive,
}: {
  item: AdminReviewQueueItem;
  href: string;
  isActive: boolean;
}) {
  const thumbUrl = item.thumbnailUrl ?? null;

  return (
    <Link
      href={href}
      className={isActive ? styles.queueCardActive : styles.queueCard}
    >
      <div className={styles.queueCardTop}>
        <div className={styles.queueThumbWrap}>
          {thumbUrl ? (
            <Image
              src={thumbUrl}
              alt=""
              fill
              className={styles.queueThumb}
              sizes="160px"
            />
          ) : (
            <div className={styles.queueThumbFallback}>No preview</div>
          )}
        </div>

        <div className={styles.queueBody}>
          <h2 className={styles.queueTitle}>
            {item.title || "Untitled submission"}
          </h2>
          {item.description ? (
            <p className={styles.queueDescription}>{item.description}</p>
          ) : null}
          <div className={styles.queueMetaRow}>
            <span className={buildStatusChipClass(item.review.status)}>
              {buildStatusLabel(item.review.status)}
            </span>
            <span className={styles.chip}>{item.photoCount} photos</span>
            <span className={styles.chip}>
              {item.author.name || "Unknown author"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.queueFooter}>
        <span>
          Created{" "}
          <LocalizedDate
            lang={ADMIN_DISPLAY_LANGUAGE}
            timestamp={Date.parse(item.createdAt)}
          />
        </span>
        {item.publishedAt ? (
          <span>
            Published{" "}
            <LocalizedDate
              lang={ADMIN_DISPLAY_LANGUAGE}
              timestamp={Date.parse(item.publishedAt)}
            />
          </span>
        ) : null}
        <span>{item.publicId}</span>
      </div>
    </Link>
  );
}

function TimelineItem({ item }: { item: AdminJourneyDetail["timeline"][number] }) {
  return (
    <li className={styles.timelineItem}>
      <strong className={styles.timelineTitle}>
        {item.locationName || item.type || "Timeline item"}
      </strong>
      {item.time ? (
        <span className={styles.timelineMeta}>
          <LocalizedDateTimeRange
            lang={ADMIN_DISPLAY_LANGUAGE}
            start={item.time.startAt}
            end={item.time.endAt}
            startContext={item.time.startLocal}
            endContext={item.time.endLocal}
          />
        </span>
      ) : null}
      {item.impression ? (
        <p className={styles.timelineNote}>{item.impression}</p>
      ) : null}
    </li>
  );
}

function DetailPanel({ detail }: { detail: AdminReviewDetail }) {
  const journey = detail.journey;
  const coverImage = journey.thumbnailUrl ?? journey.images[0]?.url ?? null;
  const localizations = journey.localizedContent?.entries.slice(0, 3) ?? [];
  const timeline = journey.timeline.slice(0, 5);

  return (
    <div className={styles.detailWrap}>
      <section className={styles.detailHero}>
        <div className={styles.detailCoverWrap}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt=""
              fill
              className={styles.detailCover}
              sizes="(max-width: 1100px) 100vw, 52vw"
            />
          ) : (
            <div className={styles.detailCoverFallback}>No cover image</div>
          )}
        </div>

        <div className={styles.detailIntro}>
          <div className={styles.queueMetaRow}>
            <span className={buildStatusChipClass(detail.review.status)}>
              {buildStatusLabel(detail.review.status)}
            </span>
            <span className={styles.chip}>{journey.photoCount} photos</span>
            <span className={styles.chip}>
              {journey.author.name || "Unknown author"}
            </span>
          </div>
          <h2 className={styles.detailTitle}>
            {journey.title || "Untitled submission"}
          </h2>
          {journey.description ? (
            <p className={styles.detailDescription}>{journey.description}</p>
          ) : null}
        </div>
      </section>

      <section className={styles.detailMetaGrid}>
        <article className={styles.detailMetaCard}>
          <span className={styles.detailMetaLabel}>Journey Window</span>
          <span className={styles.detailMetaValue}>
            <LocalizedDateTimeRange
              lang={ADMIN_DISPLAY_LANGUAGE}
              start={journey.startedAt}
              end={journey.endedAt}
              startContext={journey.startedAtLocal}
              endContext={journey.endedAtLocal}
            />
          </span>
        </article>
        <article className={styles.detailMetaCard}>
          <span className={styles.detailMetaLabel}>Submission ID</span>
          <span className={styles.detailMetaValue}>{journey.publicId}</span>
        </article>
        <article className={styles.detailMetaCard}>
          <span className={styles.detailMetaLabel}>Visibility</span>
          <span className={styles.detailMetaValue}>{journey.visibility}</span>
        </article>
        <article className={styles.detailMetaCard}>
          <span className={styles.detailMetaLabel}>Source Language</span>
          <span className={styles.detailMetaValue}>
            {journey.localizedContent?.sourceLanguage || "Unknown"}
          </span>
        </article>
      </section>

      {localizations.length > 0 ? (
        <section className={styles.detailSection}>
          <h3 className={styles.sectionTitle}>Localized content snapshot</h3>
          <div className={styles.localizations}>
            {localizations.map((entry) => (
              <article key={entry.locale} className={styles.localizationCard}>
                <span className={`${styles.chip} ${styles.localeTag}`}>
                  {entry.locale}
                </span>
                <strong className={styles.detailMetaValue}>
                  {entry.title || "Untitled localization"}
                </strong>
                {entry.description ? (
                  <p className={styles.timelineNote}>{entry.description}</p>
                ) : null}
                {entry.hashtags.length > 0 ? (
                  <div className={styles.queueMetaRow}>
                    {entry.hashtags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.chip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {timeline.length > 0 ? (
        <section className={styles.detailSection}>
          <h3 className={styles.sectionTitle}>Timeline preview</h3>
          <ol className={styles.timelineList}>
            {timeline.map((item) => (
              <TimelineItem
                key={`${item.clusterId ?? item.locationName ?? "timeline"}-${item.time?.startAt ?? 0}`}
                item={item}
              />
            ))}
          </ol>
        </section>
      ) : null}

      <section className={styles.actions}>
        <div>
          <h3 className={styles.sectionTitle}>Preview notes</h3>
          <p className={styles.actionsBody}>
            This panel still shows static mock content for layout review. Use
            the live review status form above with a real public ID when you
            need to change moderation state.
          </p>
        </div>
        {detail.review.reviewedAt ? (
          <p className={styles.actionsNote}>
            Mock review timestamp:{" "}
            <LocalizedDate
              lang={ADMIN_DISPLAY_LANGUAGE}
              timestamp={Date.parse(detail.review.reviewedAt)}
            />
          </p>
        ) : null}
        {detail.review.rejectionReason ? (
          <p className={styles.actionsNote}>
            Mock rejection note: {detail.review.rejectionReason}
          </p>
        ) : null}
        <p className={styles.actionsNote}>
          The backend write contract only accepts the canonical review status.
          Rejection reasons are not stored by the current API.
        </p>
      </section>
    </div>
  );
}

function LiveModerationCard({
  returnTo,
  targetPublicId,
  liveMutation,
}: {
  returnTo: string;
  targetPublicId: string | null;
  liveMutation: { publicId: string; reviewStatus: AdminReviewStatus } | null;
}) {
  return (
    <section className={styles.liveCard}>
      <div className={styles.liveHeader}>
        <div>
          <h3 className={styles.sectionTitle}>Live review status update</h3>
          <p className={styles.actionsBody}>
            The queue below is still a mock preview. Because the backend does
            not expose an admin read API yet, live moderation currently works
            only when you already know the target public ID.
          </p>
        </div>
        {liveMutation ? (
          <div className={styles.liveResultCard}>
            <span className={styles.summaryLabel}>Last update</span>
            <div className={styles.queueMetaRow}>
              <span className={buildStatusChipClass(liveMutation.reviewStatus)}>
                {buildStatusLabel(liveMutation.reviewStatus)}
              </span>
              <span className={styles.chip}>{liveMutation.publicId}</span>
            </div>
          </div>
        ) : null}
      </div>

      <form action={updatePublishedJourneyReviewAction} className={styles.liveForm}>
        <input type="hidden" name="returnTo" value={returnTo} />

        <label className={styles.field}>
          <span className={styles.label}>Public ID</span>
          <input
            type="text"
            name="targetPublicId"
            className={styles.input}
            defaultValue={targetPublicId ?? ""}
            placeholder="abc123xyz789"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>

        <div className={styles.buttonRow}>
          <button
            type="submit"
            name="reviewStatus"
            value="PENDING"
            className={styles.pendingButton}
          >
            Mark pending
          </button>
          <button
            type="submit"
            name="reviewStatus"
            value="APPROVED"
            className={styles.approveButton}
          >
            Approve
          </button>
          <button
            type="submit"
            name="reviewStatus"
            value="REJECTED"
            className={styles.rejectButton}
          >
            Reject
          </button>
        </div>
      </form>

      <p className={styles.actionsNote}>
        `published: true` does not guarantee public visibility. Only approved
        records with public visibility appear on public surfaces.
      </p>
    </section>
  );
}

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
    targetPublicId,
    reviewStatus,
  });
  const { session, queue, selectedPublicId, selectedDetail, returnTo } =
    await loadWorkspaceData({
      page,
      status,
      publicId: currentPublicId,
    });
  const liveActionReturnTo = withAdminQuery(returnTo, {
    publicId: selectedPublicId,
  });
  const liveMutation =
    mutation === "review_updated" && targetPublicId && reviewStatus
      ? {
          publicId: targetPublicId,
          reviewStatus,
        }
      : null;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.brandBlock}>
            <span className={styles.sidebarEyebrow}>MomentBook</span>
            <h1 className={styles.sidebarTitle}>Review workspace</h1>
            <p className={styles.sidebarBody}>
              Internal moderation surface with live status updates and a mock
              queue preview.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Admin navigation">
            <span className={styles.navLinkActive}>
              <span>Reviews</span>
              <span className={styles.navMeta}>{queue.summary.pendingCount}</span>
            </span>
          </nav>

          <div className={styles.accountCard}>
            <span className={styles.accountLabel}>Workspace access</span>
            <strong className={styles.accountName}>
              {session.name || "Admin session"}
            </strong>
            <span className={styles.accountMeta}>
              {session.email || "Signed in with backend admin role"}
            </span>
          </div>

          <form action={logoutAdminAction} className={styles.logoutForm}>
            <button type="submit" className={styles.logoutButton}>
              Sign out
            </button>
          </form>
        </aside>

        <section className={styles.workspace}>
          <header className={styles.hero}>
            <span className={styles.heroTopline}>Calm moderation workflow</span>
            <h2 className={styles.heroTitle}>Published journey review queue</h2>
            <p className={styles.heroBody}>
              Admin authentication and review status mutation are live. The
              queue and detail cards remain mock preview data until the backend
              exposes an admin read API.
            </p>
          </header>

          {banner ? (
            <p
              className={
                banner.tone === "error"
                  ? styles.bannerError
                  : banner.tone === "success"
                    ? styles.bannerSuccess
                    : styles.banner
              }
            >
              {banner.message}
            </p>
          ) : null}

          <section className={styles.summaryGrid}>
            <SummaryCard
              label="Pending now"
              value={queue.summary.pendingCount}
              hint="Static mock records for queue preview"
            />
            <SummaryCard
              label="Approved set"
              value={queue.summary.approvedTodayCount}
              hint="Static approved examples for layout verification"
            />
            <SummaryCard
              label="Rejected set"
              value={queue.summary.rejectedTodayCount}
              hint="Static rejected examples for layout verification"
            />
          </section>

          <LiveModerationCard
            returnTo={liveActionReturnTo}
            targetPublicId={targetPublicId}
            liveMutation={liveMutation}
          />

          <div className={styles.filters}>
            {(
              [
                ["pending", "Pending"],
                ["approved", "Approved"],
                ["rejected", "Rejected"],
                ["all", "All"],
              ] as const
            ).map(([value, label]) => {
              const href = withAdminQuery(ADMIN_REVIEWS_PATH, {
                status: value === "pending" ? null : value,
                page: null,
                publicId: null,
              });

              return (
                <Link
                  key={value}
                  href={href}
                  className={
                    status === value ? styles.filterChipActive : styles.filterChip
                  }
                >
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>

          <div className={styles.grid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Queue preview</h3>
                <span className={styles.panelMeta}>
                  {queue.total} mock submission{queue.total === 1 ? "" : "s"}
                </span>
              </div>

              {queue.items.length > 0 ? (
                <>
                  <div className={styles.queueList}>
                    {queue.items.map((item) => (
                      <QueueCard
                        key={item.publicId}
                        item={item}
                        href={buildQueueHref(returnTo, item.publicId)}
                        isActive={item.publicId === selectedPublicId}
                      />
                    ))}
                  </div>
                  {queue.pages > 1 ? (
                    <div className={styles.pagination}>
                      <Link
                        href={buildReturnHref(Math.max(1, queue.page - 1), status)}
                        aria-disabled={queue.page <= 1}
                        className={
                          queue.page <= 1
                            ? styles.paginationLinkDisabled
                            : styles.paginationLink
                        }
                      >
                        Previous
                      </Link>
                      <span className={styles.paginationMeta}>
                        Page {queue.page} of {queue.pages}
                      </span>
                      <Link
                        href={buildReturnHref(
                          Math.min(queue.pages, queue.page + 1),
                          status,
                        )}
                        aria-disabled={queue.page >= queue.pages}
                        className={
                          queue.page >= queue.pages
                            ? styles.paginationLinkDisabled
                            : styles.paginationLink
                        }
                      >
                        Next
                      </Link>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className={styles.emptyState}>
                  No submissions match this filter right now.
                </div>
              )}
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Selected preview</h3>
                <span className={styles.panelMeta}>
                  {selectedDetail ? selectedDetail.journey.publicId : "No selection"}
                </span>
              </div>

              {selectedDetail ? (
                <DetailPanel detail={selectedDetail} />
              ) : (
                <div className={styles.emptyDetail}>
                  <p>
                    Choose a submission from the queue to inspect its timeline,
                    localized copy, and the future moderation layout.
                  </p>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
