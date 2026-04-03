import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import {
  logoutAdminAction,
  updatePublishedJourneyReviewAction,
} from "@/app/(admin)/admin/actions";
import { ADMIN_REVIEWS_PATH, withAdminQuery } from "@/lib/admin/paths";
import type { AdminSession } from "@/lib/admin/session";
import { defaultLanguage } from "@/lib/i18n/config";
import type {
  AdminReviewDetail,
  AdminReviewQueueData,
  AdminReviewQueueItem,
  AdminReviewQueueStatus,
  AdminReviewStatus,
} from "@/lib/admin/mock-data";
import styles from "./reviews.module.scss";

const ADMIN_DISPLAY_LANGUAGE = defaultLanguage;

type DashboardBanner = {
  tone: "default" | "error" | "success";
  message: string;
};

type LiveMutationSummary = {
  publicId: string;
  reviewStatus: AdminReviewStatus;
};

type AdminReviewsDashboardProps = {
  banner: DashboardBanner | null;
  liveMutation: LiveMutationSummary | null;
  queue: AdminReviewQueueData;
  returnTo: string;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  session: AdminSession;
  targetPublicId: string | null;
};

function buildStatusLabel(status: AdminReviewStatus): string {
  if (status === "APPROVED") {
    return "Approved";
  }

  if (status === "REJECTED") {
    return "Rejected";
  }

  return "Pending";
}

function buildStatusClassName(status: AdminReviewStatus): string {
  if (status === "APPROVED") {
    return `${styles.statusChip} ${styles.statusApproved}`;
  }

  if (status === "REJECTED") {
    return `${styles.statusChip} ${styles.statusRejected}`;
  }

  return `${styles.statusChip} ${styles.statusPending}`;
}

function buildContentStatusLabel(
  status: AdminReviewDetail["journey"]["contentStatus"],
): string {
  if (status === "reported_hidden") {
    return "Reported hidden";
  }

  if (status === "review_pending") {
    return "Review pending";
  }

  if (status === "review_rejected") {
    return "Review rejected";
  }

  return "Available";
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

function buildFilterHref(status: AdminReviewQueueStatus): string {
  return withAdminQuery(ADMIN_REVIEWS_PATH, {
    status: status === "pending" ? null : status,
    page: null,
    publicId: null,
  });
}

function resolveDefaultReviewStatus(options: {
  liveMutation: LiveMutationSummary | null;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}): AdminReviewStatus {
  const trimmedTarget = options.targetPublicId?.trim() || "";
  const activeTarget = trimmedTarget || options.selectedPublicId || "";

  if (options.liveMutation && options.liveMutation.publicId === activeTarget) {
    return options.liveMutation.reviewStatus;
  }

  if (
    options.selectedDetail &&
    (!trimmedTarget || trimmedTarget === options.selectedDetail.journey.publicId)
  ) {
    return options.selectedDetail.review.status;
  }

  return "PENDING";
}

function AdminHeader({
  pendingCount,
  session,
}: {
  pendingCount: number;
  session: AdminSession;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerIntro}>
        <span className={styles.eyebrow}>Internal moderation</span>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Journey review</h1>
          <span className={styles.pendingBadge}>{pendingCount} pending</span>
        </div>
      </div>

      <div className={styles.sessionBlock}>
        <div className={styles.sessionMeta}>
          <span className={styles.sessionLabel}>Signed in as</span>
          <strong className={styles.sessionValue}>
            {session.email || session.name || "Admin"}
          </strong>
        </div>

        <form action={logoutAdminAction}>
          <button type="submit" className={styles.signOutButton}>
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}

function QueueItem({
  href,
  isActive,
  item,
}: {
  href: string;
  isActive: boolean;
  item: AdminReviewQueueItem;
}) {
  const thumbUrl = item.thumbnailUrl ?? null;

  return (
    <Link
      href={href}
      className={isActive ? styles.queueItemActive : styles.queueItem}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={styles.queueThumbWrap}>
        {thumbUrl ? (
          <Image
            src={thumbUrl}
            alt=""
            fill
            className={styles.queueThumb}
            sizes="60px"
          />
        ) : (
          <div className={styles.queueThumbFallback}>No image</div>
        )}
      </div>

      <div className={styles.queueBody}>
        <div className={styles.queueRowTop}>
          <div className={styles.inlineMeta}>
            <span className={buildStatusClassName(item.review.status)}>
              {buildStatusLabel(item.review.status)}
            </span>
            <span className={styles.metaPill}>{item.photoCount} photos</span>
          </div>
          <span className={styles.metaText}>{item.visibility}</span>
        </div>

        <strong className={styles.queueTitle}>
          {item.title || "Untitled journey"}
        </strong>

        <div className={styles.queueMetaRow}>
          <span>{item.author.name || "Unknown author"}</span>
          <span>{item.publicId}</span>
        </div>

        <div className={styles.queueMetaRow}>
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
          ) : (
            <span>Not published</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function QueuePanel({
  queue,
  returnTo,
  selectedPublicId,
}: {
  queue: AdminReviewQueueData;
  returnTo: string;
  selectedPublicId: string | null;
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionLabel}>Queue</span>
          <h2 className={styles.sectionTitle}>Review list</h2>
        </div>
        <span className={styles.sectionMeta}>
          {queue.total} items · page {queue.page} of {queue.pages}
        </span>
      </div>

      <div className={styles.filterRow} aria-label="Queue status filters">
        {(
          [
            ["pending", "Pending"],
            ["approved", "Approved"],
            ["rejected", "Rejected"],
            ["all", "All"],
          ] as const
        ).map(([value, label]) => (
          <Link
            key={value}
            href={buildFilterHref(value)}
            className={
              queue.status === value ? styles.filterChipActive : styles.filterChip
            }
          >
            {label}
          </Link>
        ))}
      </div>

      {queue.items.length > 0 ? (
        <>
          <div className={styles.queueList}>
            {queue.items.map((item) => (
              <QueueItem
                key={item.publicId}
                href={buildQueueHref(returnTo, item.publicId)}
                isActive={item.publicId === selectedPublicId}
                item={item}
              />
            ))}
          </div>

          {queue.pages > 1 ? (
            <div className={styles.pagination}>
              <Link
                href={buildReturnHref(Math.max(1, queue.page - 1), queue.status)}
                aria-disabled={queue.page <= 1}
                className={
                  queue.page <= 1 ? styles.paginationDisabled : styles.paginationLink
                }
              >
                Previous
              </Link>
              <span className={styles.sectionMeta}>
                Page {queue.page} of {queue.pages}
              </span>
              <Link
                href={buildReturnHref(
                  Math.min(queue.pages, queue.page + 1),
                  queue.status,
                )}
                aria-disabled={queue.page >= queue.pages}
                className={
                  queue.page >= queue.pages
                    ? styles.paginationDisabled
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
          <h3 className={styles.emptyTitle}>No records in this filter</h3>
          <p className={styles.emptyBody}>
            Switch the queue filter or return to the pending list.
          </p>
          {queue.status !== "pending" ? (
            <Link href={ADMIN_REVIEWS_PATH} className={styles.emptyAction}>
              Show pending
            </Link>
          ) : null}
        </div>
      )}
    </section>
  );
}

function ReviewWorkspace({
  liveMutation,
  returnTo,
  selectedDetail,
  selectedPublicId,
  targetPublicId,
}: {
  liveMutation: LiveMutationSummary | null;
  returnTo: string;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}) {
  const journey = selectedDetail?.journey ?? null;
  const selectedReviewStatus = selectedDetail?.review.status ?? "PENDING";
  const coverImage = journey?.thumbnailUrl ?? journey?.images[0]?.url ?? null;
  const effectiveTargetPublicId = targetPublicId ?? selectedPublicId ?? "";
  const defaultReviewStatus = resolveDefaultReviewStatus({
    liveMutation,
    selectedDetail,
    selectedPublicId,
    targetPublicId,
  });

  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionLabel}>Selected journey</span>
          <h2 className={styles.sectionTitle}>Review editor</h2>
        </div>

        {liveMutation ? (
          <div className={styles.resultCard} role="status" aria-live="polite">
            <span className={styles.resultLabel}>Last saved</span>
            <div className={styles.inlineMeta}>
              <span className={buildStatusClassName(liveMutation.reviewStatus)}>
                {buildStatusLabel(liveMutation.reviewStatus)}
              </span>
              <span className={styles.metaPill}>{liveMutation.publicId}</span>
            </div>
          </div>
        ) : null}
      </div>

      {journey ? (
        <article className={styles.previewCard}>
          <div className={styles.previewImageWrap}>
            {coverImage ? (
              <Image
                src={coverImage}
                alt=""
                fill
                className={styles.previewImage}
                sizes="(max-width: 1100px) 100vw, 360px"
              />
            ) : (
              <div className={styles.queueThumbFallback}>No cover image</div>
            )}
          </div>

          <div className={styles.previewContent}>
            <div className={styles.inlineMeta}>
              <span className={buildStatusClassName(selectedReviewStatus)}>
                {buildStatusLabel(selectedReviewStatus)}
              </span>
              <span className={styles.metaPill}>{journey.visibility}</span>
              <span className={styles.metaPill}>{journey.photoCount} photos</span>
            </div>

            <h3 className={styles.previewTitle}>
              {journey.title || "Untitled journey"}
            </h3>

            {journey.description ? (
              <p className={styles.previewDescription}>{journey.description}</p>
            ) : null}

            {journey.notice ? (
              <p className={styles.noticeText}>{journey.notice}</p>
            ) : null}

            <dl className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <dt>Public ID</dt>
                <dd>{journey.publicId}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Content status</dt>
                <dd>{buildContentStatusLabel(journey.contentStatus)}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Author</dt>
                <dd>{journey.author.name || "Unknown author"}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Current review</dt>
                <dd>{buildStatusLabel(selectedReviewStatus)}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Created</dt>
                <dd>
                  <LocalizedDate
                    lang={ADMIN_DISPLAY_LANGUAGE}
                    timestamp={Date.parse(journey.createdAt)}
                  />
                </dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Published</dt>
                <dd>
                  {journey.publishedAt ? (
                    <LocalizedDate
                      lang={ADMIN_DISPLAY_LANGUAGE}
                      timestamp={Date.parse(journey.publishedAt)}
                    />
                  ) : (
                    "Not published"
                  )}
                </dd>
              </div>
              <div className={styles.metaItemWide}>
                <dt>Journey window</dt>
                <dd>
                  <LocalizedDateTimeRange
                    lang={ADMIN_DISPLAY_LANGUAGE}
                    start={journey.startedAt}
                    end={journey.endedAt}
                    startContext={journey.startedAtLocal}
                    endContext={journey.endedAtLocal}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </article>
      ) : (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>Nothing selected</h3>
          <p className={styles.emptyBody}>
            Choose a queue item to preload the public ID and review context.
          </p>
        </div>
      )}

      <form action={updatePublishedJourneyReviewAction} className={styles.formCard}>
        <input
          type="hidden"
          name="returnTo"
          value={withAdminQuery(returnTo, {
            publicId: selectedPublicId,
          })}
        />

        <label className={styles.field}>
          <span className={styles.label}>Public ID</span>
          <input
            type="text"
            name="targetPublicId"
            className={styles.input}
            defaultValue={effectiveTargetPublicId}
            placeholder="Enter a published journey public ID"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>

        <fieldset className={styles.statusFieldset}>
          <legend className={styles.legend}>Review status</legend>
          <div className={styles.statusOptions}>
            <label className={styles.statusOption}>
              <input
                className={styles.statusInput}
                type="radio"
                name="reviewStatus"
                value="PENDING"
                defaultChecked={defaultReviewStatus === "PENDING"}
              />
              <span className={styles.statusCard}>
                <strong className={styles.statusTitle}>Pending</strong>
                <span className={styles.statusCaption}>Keep in review queue</span>
              </span>
            </label>

            <label className={styles.statusOption}>
              <input
                className={styles.statusInput}
                type="radio"
                name="reviewStatus"
                value="APPROVED"
                defaultChecked={defaultReviewStatus === "APPROVED"}
              />
              <span className={styles.statusCard}>
                <strong className={styles.statusTitle}>Approved</strong>
                <span className={styles.statusCaption}>
                  Eligible for public read-only web
                </span>
              </span>
            </label>

            <label className={styles.statusOption}>
              <input
                className={styles.statusInput}
                type="radio"
                name="reviewStatus"
                value="REJECTED"
                defaultChecked={defaultReviewStatus === "REJECTED"}
              />
              <span className={styles.statusCard}>
                <strong className={styles.statusTitle}>Rejected</strong>
                <span className={styles.statusCaption}>Keep off public web</span>
              </span>
            </label>
          </div>
        </fieldset>

        <div className={styles.formFooter}>
          <p className={styles.formNote}>
            Queue and preview data are mock. Saving updates the live review
            status for the public ID above.
          </p>

          <button type="submit" className={styles.saveButton}>
            Save review status
          </button>
        </div>
      </form>
    </section>
  );
}

export function AdminReviewsDashboard({
  banner,
  liveMutation,
  queue,
  returnTo,
  selectedDetail,
  selectedPublicId,
  session,
  targetPublicId,
}: AdminReviewsDashboardProps) {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <AdminHeader
          pendingCount={queue.summary.pendingCount}
          session={session}
        />

        {banner ? (
          <p
            className={
              banner.tone === "error"
                ? styles.bannerError
                : banner.tone === "success"
                  ? styles.bannerSuccess
                  : styles.banner
            }
            role="status"
            aria-live="polite"
          >
            {banner.message}
          </p>
        ) : null}

        <div className={styles.workspace}>
          <QueuePanel
            queue={queue}
            returnTo={returnTo}
            selectedPublicId={selectedPublicId}
          />

          <ReviewWorkspace
            liveMutation={liveMutation}
            returnTo={returnTo}
            selectedDetail={selectedDetail}
            selectedPublicId={selectedPublicId}
            targetPublicId={targetPublicId}
          />
        </div>
      </div>
    </main>
  );
}
