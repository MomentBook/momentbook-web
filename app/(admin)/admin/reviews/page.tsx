import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { AdminSessionExpiredError } from "@/lib/admin/api";
import { logoutAdminAction } from "@/app/(admin)/admin/actions";
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

function resolveBanner(
  error: string | null,
): { tone: "default" | "error"; message: string } | null {
  if (error === "actions_pending") {
    return {
      tone: "default",
      message:
        "Approve and reject controls are shown for layout review only. The moderation write API is not connected yet.",
    };
  }

  return null;
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
          <h3 className={styles.sectionTitle}>Review actions</h3>
          <p className={styles.actionsBody}>
            This screen is a boilerplate moderation workspace. The approve and
            reject controls are shown for layout review only.
          </p>
        </div>

        <form className={styles.approveForm}>
          <button type="button" className={styles.approveButton} disabled>
            Approve submission
          </button>
        </form>

        <form className={styles.rejectForm}>
          <label className={styles.field}>
            <span className={styles.label}>Rejection reason</span>
            <textarea
              name="rejectionReason"
              className={styles.textarea}
              defaultValue={detail.review.rejectionReason ?? ""}
              placeholder="Explain why this submission should stay off the public web."
            />
          </label>
          <div className={styles.buttonRow}>
            <button type="button" className={styles.rejectButton} disabled>
              Reject submission
            </button>
          </div>
        </form>
        <p className={styles.actionsNote}>
          Live review read/write integration will be connected after the backend
          moderation API is implemented.
        </p>
      </section>
    </div>
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
  const banner = resolveBanner(readQueryParam(resolvedSearchParams.error));
  const { session, queue, selectedPublicId, selectedDetail, returnTo } =
    await loadWorkspaceData({
      page,
      status,
      publicId: currentPublicId,
    });

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.brandBlock}>
            <span className={styles.sidebarEyebrow}>MomentBook</span>
            <h1 className={styles.sidebarTitle}>Review workspace</h1>
            <p className={styles.sidebarBody}>
              Internal moderation surface for designing the future review flow.
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
              Boilerplate review workspace for the future moderation flow. Admin
              access is real, but the queue and detail content are mock data for now.
            </p>
          </header>

          {banner ? (
            <p className={banner.tone === "error" ? styles.bannerError : styles.banner}>
              {banner.message}
            </p>
          ) : null}

          <section className={styles.summaryGrid}>
            <SummaryCard
              label="Pending now"
              value={queue.summary.pendingCount}
              hint="Mock records waiting for future API wiring"
            />
            <SummaryCard
              label="Approved set"
              value={queue.summary.approvedTodayCount}
              hint="Static examples for layout verification"
            />
            <SummaryCard
              label="Rejected set"
              value={queue.summary.rejectedTodayCount}
              hint="Static rejected-state example"
            />
          </section>

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
                <h3 className={styles.panelTitle}>Queue</h3>
                <span className={styles.panelMeta}>
                  {queue.total} submission{queue.total === 1 ? "" : "s"}
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
                <h3 className={styles.panelTitle}>Selected submission</h3>
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
