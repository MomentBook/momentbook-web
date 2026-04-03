import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import {
  logoutAdminAction,
  updatePublishedJourneyReviewAction,
} from "@/app/(admin)/admin/actions";
import { ADMIN_ALLOWED_EMAIL } from "@/lib/admin/config";
import {
  buildAdminReviewDetailHref,
  buildAdminWorkspaceHref,
  type AdminWorkspaceTab,
} from "@/lib/admin/paths";
import type { AdminSession } from "@/lib/admin/session";
import { defaultLanguage } from "@/lib/i18n/config";
import type {
  AdminReviewDetail,
  AdminReviewQueueData,
  AdminReviewQueueStatus,
  AdminReviewStatus,
} from "@/lib/admin/mock-data";
import type { AdminDashboardBanner } from "./workspace-data";
import styles from "./workspace.module.scss";

const ADMIN_DISPLAY_LANGUAGE = defaultLanguage;

type ReviewMutationSummary = {
  publicId: string;
  reviewStatus: AdminReviewStatus;
};

type AdminWorkspaceProps = {
  activeTab: AdminWorkspaceTab;
  banner: AdminDashboardBanner | null;
  queue: AdminReviewQueueData;
  session: AdminSession;
};

type AdminReviewDetailPageViewProps = {
  banner: AdminDashboardBanner | null;
  detail: AdminReviewDetail;
  queue: AdminReviewQueueData;
  reviewMutation: ReviewMutationSummary | null;
  returnTo: string;
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

function buildQueueStatusLabel(status: AdminReviewQueueStatus): string {
  if (status === "approved") {
    return "Approved";
  }

  if (status === "rejected") {
    return "Rejected";
  }

  if (status === "all") {
    return "All";
  }

  return "Pending";
}

function buildFilterHref(status: AdminReviewQueueStatus): string {
  return buildAdminWorkspaceHref("reviews", {
    status: status === "pending" ? null : status,
    page: null,
  });
}

function buildTabHref(
  tab: AdminWorkspaceTab,
  options: {
    page: number;
    status: AdminReviewQueueStatus;
  },
): string {
  return buildAdminWorkspaceHref(tab, {
    page: options.page > 1 ? String(options.page) : null,
    status: options.status === "pending" ? null : options.status,
  });
}

function buildReviewDetailTableHref(
  publicId: string,
  options: {
    page: number;
    status: AdminReviewQueueStatus;
  },
): string {
  return buildAdminReviewDetailHref(publicId, {
    page: options.page > 1 ? String(options.page) : null,
    status: options.status === "pending" ? null : options.status,
  });
}

function resolveDefaultReviewStatus(options: {
  detail: AdminReviewDetail;
  reviewMutation: ReviewMutationSummary | null;
  targetPublicId: string | null;
}): AdminReviewStatus {
  const trimmedTarget = options.targetPublicId?.trim() || "";
  const activeTarget = trimmedTarget || options.detail.journey.publicId;

  if (
    options.reviewMutation &&
    options.reviewMutation.publicId === activeTarget
  ) {
    return options.reviewMutation.reviewStatus;
  }

  if (!trimmedTarget || trimmedTarget === options.detail.journey.publicId) {
    return options.detail.review.status;
  }

  return "PENDING";
}

function getActiveTabTitle(tab: AdminWorkspaceTab): string {
  if (tab === "reviews") {
    return "Reviews";
  }

  return "Overview";
}

function Sidebar({
  activeTab,
  queue,
  session,
}: {
  activeTab: AdminWorkspaceTab;
  queue: AdminReviewQueueData;
  session: AdminSession;
}) {
  const navigationItems: Array<{
    tab: AdminWorkspaceTab;
    label: string;
    badge?: string;
  }> = [
    {
      tab: "overview",
      label: "Overview",
    },
    {
      tab: "reviews",
      label: "Reviews",
      badge: String(queue.summary.pendingCount),
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandBlock}>
        <span className={styles.brandEyebrow}>MomentBook Admin</span>
        <h1 className={styles.brandTitle}>Moderation</h1>
      </div>

      <nav className={styles.nav} aria-label="Workspace sections">
        {navigationItems.map((item) => {
          const href = buildTabHref(item.tab, {
            page: queue.page,
            status: queue.status,
          });

          return (
            <Link
              key={item.tab}
              href={href}
              className={
                activeTab === item.tab ? styles.navItemActive : styles.navItem
              }
              aria-current={activeTab === item.tab ? "page" : undefined}
            >
              <div className={styles.navCopy}>
                <span className={styles.navLabel}>{item.label}</span>
              </div>
              {item.badge ? (
                <span className={styles.navBadge}>{item.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarCard}>
        <span className={styles.sidebarLabel}>Account</span>
        <strong className={styles.sidebarValue}>
          {session.email || session.name || "Admin"}
        </strong>
      </div>

      <form action={logoutAdminAction}>
        <button type="submit" className={styles.signOutButton}>
          Sign out
        </button>
      </form>
    </aside>
  );
}

function ContentHeader({
  banner,
  pendingCount,
  title,
}: {
  banner: AdminDashboardBanner | null;
  pendingCount: number;
  title: string;
}) {
  return (
    <header className={styles.contentHeader}>
      <div className={styles.headerCopy}>
        <div className={styles.headerTitleRow}>
          <h2 className={styles.contentTitle}>{title}</h2>
          <span className={styles.pendingBadge}>{pendingCount} pending</span>
        </div>
      </div>

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
    </header>
  );
}

function SummaryMetric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "success" | "danger";
}) {
  return (
    <article
      className={
        tone === "success"
          ? `${styles.metricCard} ${styles.metricSuccess}`
          : tone === "danger"
            ? `${styles.metricCard} ${styles.metricDanger}`
            : styles.metricCard
      }
    >
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
    </article>
  );
}

function SelectedJourneyCard({
  detail,
  title,
  actions,
}: {
  detail: AdminReviewDetail;
  title: string;
  actions?: ReactNode;
}) {
  const journey = detail.journey;
  const review = detail.review;
  const coverImage = journey.thumbnailUrl ?? journey.images[0]?.url ?? null;

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        {actions}
      </div>

      <article className={styles.previewCard}>
        <div className={styles.previewImageWrap}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt=""
              fill
              className={styles.previewImage}
              sizes="(max-width: 960px) 100vw, 300px"
            />
          ) : (
            <div className={styles.imageFallback}>No cover image</div>
          )}
        </div>

        <div className={styles.previewContent}>
          <div className={styles.inlineMeta}>
            <span className={buildStatusClassName(review.status)}>
              {buildStatusLabel(review.status)}
            </span>
            <span className={styles.metaPill}>{journey.visibility}</span>
            <span className={styles.metaPill}>{journey.photoCount} photos</span>
          </div>

          <h4 className={styles.previewTitle}>
            {journey.title || "Untitled journey"}
          </h4>

          {journey.notice ? (
            <p className={styles.noticeCard}>{journey.notice}</p>
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
              <dt>Created</dt>
              <dd>
                <LocalizedDate
                  lang={ADMIN_DISPLAY_LANGUAGE}
                  timestamp={Date.parse(journey.createdAt)}
                />
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
    </section>
  );
}

function ReviewTablePanel({
  queue,
}: {
  queue: AdminReviewQueueData;
}) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>Reviews</h3>
        </div>
        <span className={styles.sectionMeta}>{queue.total} items</span>
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
          <div className={styles.tableScroll}>
            <table className={styles.queueTable}>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Journey</th>
                  <th>Author</th>
                  <th>Public ID</th>
                  <th>Photos</th>
                  <th>Created</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
                {queue.items.map((item) => (
                  <tr key={item.publicId} className={styles.queueTableRow}>
                    <td>
                      <span className={buildStatusClassName(item.review.status)}>
                        {buildStatusLabel(item.review.status)}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={buildReviewDetailTableHref(item.publicId, {
                          page: queue.page,
                          status: queue.status,
                        })}
                        className={styles.tablePrimaryLink}
                      >
                        {item.title || "Untitled journey"}
                      </Link>
                    </td>
                    <td>{item.author.name || "Unknown author"}</td>
                    <td className={styles.tableMono}>{item.publicId}</td>
                    <td>{item.photoCount}</td>
                    <td>
                      <LocalizedDate
                        lang={ADMIN_DISPLAY_LANGUAGE}
                        timestamp={Date.parse(item.createdAt)}
                      />
                    </td>
                    <td>
                      {item.publishedAt ? (
                        <LocalizedDate
                          lang={ADMIN_DISPLAY_LANGUAGE}
                          timestamp={Date.parse(item.publishedAt)}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {queue.pages > 1 ? (
            <div className={styles.pagination}>
              <Link
                href={buildAdminWorkspaceHref("reviews", {
                  page:
                    queue.page > 1 ? String(Math.max(1, queue.page - 1)) : null,
                  status: queue.status === "pending" ? null : queue.status,
                })}
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
                href={buildAdminWorkspaceHref("reviews", {
                  page:
                    queue.page < queue.pages
                      ? String(Math.min(queue.pages, queue.page + 1))
                      : String(queue.pages),
                  status: queue.status === "pending" ? null : queue.status,
                })}
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
          <h4 className={styles.emptyTitle}>No records in this filter</h4>
          <p className={styles.emptyBody}>
            Switch the filter or return to pending.
          </p>
          {queue.status !== "pending" ? (
            <Link
              href={buildAdminWorkspaceHref("reviews")}
              className={styles.secondaryButton}
            >
              Show pending
            </Link>
          ) : null}
        </div>
      )}
    </section>
  );
}

function ReviewUpdateCard({
  detail,
  reviewMutation,
  returnTo,
  targetPublicId,
}: {
  detail: AdminReviewDetail;
  reviewMutation: ReviewMutationSummary | null;
  returnTo: string;
  targetPublicId: string | null;
}) {
  const effectiveTargetPublicId = targetPublicId ?? detail.journey.publicId;
  const defaultReviewStatus = resolveDefaultReviewStatus({
    detail,
    reviewMutation,
    targetPublicId,
  });

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>Update status</h3>
        </div>

        {reviewMutation ? (
          <div className={styles.resultCard} role="status" aria-live="polite">
            <span className={styles.sidebarLabel}>Last saved</span>
            <div className={styles.inlineMeta}>
              <span className={buildStatusClassName(reviewMutation.reviewStatus)}>
                {buildStatusLabel(reviewMutation.reviewStatus)}
              </span>
              <span className={styles.metaPill}>{reviewMutation.publicId}</span>
            </div>
          </div>
        ) : null}
      </div>

      <form action={updatePublishedJourneyReviewAction} className={styles.formCard}>
        <input type="hidden" name="returnTo" value={returnTo} />

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Public ID</span>
          <input
            type="text"
            name="targetPublicId"
            className={styles.input}
            defaultValue={effectiveTargetPublicId}
            placeholder="Public ID"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>

        <fieldset className={styles.statusFieldset}>
          <legend className={styles.fieldLabel}>Review status</legend>
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
              </span>
            </label>
          </div>
        </fieldset>

        <div className={styles.formFooter}>
          <button type="submit" className={styles.primaryButton}>
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

function OverviewPanel({
  queue,
  session,
}: {
  queue: AdminReviewQueueData;
  session: AdminSession;
}) {
  const reviewsHref = buildTabHref("reviews", {
    page: queue.page,
    status: queue.status,
  });

  return (
    <div className={styles.sectionStack}>
      <section className={styles.metricGrid}>
        <SummaryMetric label="Pending now" value={queue.summary.pendingCount} />
        <SummaryMetric
          label="Approved today"
          value={queue.summary.approvedTodayCount}
          tone="success"
        />
        <SummaryMetric
          label="Rejected today"
          value={queue.summary.rejectedTodayCount}
          tone="danger"
        />
      </section>

      <div className={styles.infoGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeading}>
              <h3 className={styles.cardTitle}>Queue</h3>
            </div>
          </div>

          <dl className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <dt>Filter</dt>
              <dd>{buildQueueStatusLabel(queue.status)}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Total</dt>
              <dd>{queue.total}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Page</dt>
              <dd>
                {queue.page} / {queue.pages}
              </dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Visible rows</dt>
              <dd>{queue.items.length}</dd>
            </div>
          </dl>

          <div className={styles.inlineActions}>
            <Link href={reviewsHref} className={styles.primaryButton}>
              Open reviews
            </Link>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeading}>
              <h3 className={styles.cardTitle}>Session</h3>
            </div>
          </div>

          <dl className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <dt>Account</dt>
              <dd>{session.email || session.name || "Admin"}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Role</dt>
              <dd>Admin</dd>
            </div>
            <div className={styles.metaItemWide}>
              <dt>Allowed</dt>
              <dd>{ADMIN_ALLOWED_EMAIL}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeading}>
              <h3 className={styles.cardTitle}>Workspace</h3>
            </div>
          </div>

          <dl className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <dt>Tabs</dt>
              <dd>Overview, Reviews</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Write path</dt>
              <dd>Review detail</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Source</dt>
              <dd>Mock queue</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Entry</dt>
              <dd>/admin</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}

function ReviewsPanel({
  queue,
}: {
  queue: AdminReviewQueueData;
}) {
  return (
    <div className={styles.sectionStack}>
      <ReviewTablePanel queue={queue} />
    </div>
  );
}

export function AdminReviewDetailPageView({
  banner,
  detail,
  queue,
  reviewMutation,
  returnTo,
  session,
  targetPublicId,
}: AdminReviewDetailPageViewProps) {
  const backHref = buildAdminWorkspaceHref("reviews", {
    page: queue.page > 1 ? String(queue.page) : null,
    status: queue.status === "pending" ? null : queue.status,
  });

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Sidebar activeTab="reviews" queue={queue} session={session} />

        <section className={styles.content}>
          <ContentHeader
            banner={banner}
            pendingCount={queue.summary.pendingCount}
            title="Review detail"
          />

          <div className={styles.stackList}>
            <SelectedJourneyCard
              detail={detail}
              title="Preview"
              actions={
                <Link href={backHref} className={styles.secondaryButton}>
                  Back to reviews
                </Link>
              }
            />
            <ReviewUpdateCard
              detail={detail}
              reviewMutation={reviewMutation}
              returnTo={returnTo}
              targetPublicId={targetPublicId}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export function AdminWorkspace({
  activeTab,
  banner,
  queue,
  session,
}: AdminWorkspaceProps) {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Sidebar activeTab={activeTab} queue={queue} session={session} />

        <section className={styles.content}>
          <ContentHeader
            banner={banner}
            pendingCount={queue.summary.pendingCount}
            title={getActiveTabTitle(activeTab)}
          />

          {activeTab === "reviews" ? (
            <ReviewsPanel queue={queue} />
          ) : (
            <OverviewPanel queue={queue} session={session} />
          )}
        </section>
      </div>
    </main>
  );
}
