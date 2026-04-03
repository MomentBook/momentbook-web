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
  buildAdminWorkspaceHref,
  type AdminWorkspaceTab,
  withAdminQuery,
} from "@/lib/admin/paths";
import type { AdminSession } from "@/lib/admin/session";
import { defaultLanguage } from "@/lib/i18n/config";
import type {
  AdminReviewDetail,
  AdminReviewQueueData,
  AdminReviewQueueStatus,
  AdminReviewStatus,
} from "@/lib/admin/mock-data";
import styles from "./workspace.module.scss";

const ADMIN_DISPLAY_LANGUAGE = defaultLanguage;

type DashboardBanner = {
  tone: "default" | "error" | "success";
  message: string;
};

type ReviewMutationSummary = {
  publicId: string;
  reviewStatus: AdminReviewStatus;
};

type AdminWorkspaceProps = {
  activeTab: AdminWorkspaceTab;
  banner: DashboardBanner | null;
  reviewMutation: ReviewMutationSummary | null;
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

function buildQueueHref(
  page: number,
  status: AdminReviewQueueStatus,
  publicId: string | null,
): string {
  return buildAdminWorkspaceHref("reviews", {
    page: page > 1 ? String(page) : null,
    status: status === "pending" ? null : status,
    publicId,
  });
}

function buildFilterHref(status: AdminReviewQueueStatus): string {
  return buildAdminWorkspaceHref("reviews", {
    status: status === "pending" ? null : status,
    page: null,
    publicId: null,
  });
}

function buildTabHref(
  tab: AdminWorkspaceTab,
  options: {
    page: number;
    selectedPublicId: string | null;
    status: AdminReviewQueueStatus;
    targetPublicId: string | null;
  },
): string {
  return buildAdminWorkspaceHref(tab, {
    page: options.page > 1 ? String(options.page) : null,
    publicId: options.selectedPublicId,
    status: options.status === "pending" ? null : options.status,
    targetPublicId: options.targetPublicId,
  });
}

function resolveDefaultReviewStatus(options: {
  reviewMutation: ReviewMutationSummary | null;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}): AdminReviewStatus {
  const trimmedTarget = options.targetPublicId?.trim() || "";
  const activeTarget = trimmedTarget || options.selectedPublicId || "";

  if (
    options.reviewMutation &&
    options.reviewMutation.publicId === activeTarget
  ) {
    return options.reviewMutation.reviewStatus;
  }

  if (
    options.selectedDetail &&
    (!trimmedTarget || trimmedTarget === options.selectedDetail.journey.publicId)
  ) {
    return options.selectedDetail.review.status;
  }

  return "PENDING";
}

function getActiveTabMeta(tab: AdminWorkspaceTab): {
  title: string;
} {
  if (tab === "reviews") {
    return {
      title: "Reviews",
    };
  }

  return {
    title: "Overview",
  };
}

function Sidebar({
  activeTab,
  queue,
  selectedPublicId,
  session,
  targetPublicId,
}: {
  activeTab: AdminWorkspaceTab;
  queue: AdminReviewQueueData;
  selectedPublicId: string | null;
  session: AdminSession;
  targetPublicId: string | null;
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
            selectedPublicId,
            status: queue.status,
            targetPublicId,
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
  activeTab,
  banner,
  pendingCount,
}: {
  activeTab: AdminWorkspaceTab;
  banner: DashboardBanner | null;
  pendingCount: number;
}) {
  const meta = getActiveTabMeta(activeTab);

  return (
    <header className={styles.contentHeader}>
      <div className={styles.headerCopy}>
        <div className={styles.headerTitleRow}>
          <h2 className={styles.contentTitle}>{meta.title}</h2>
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
  detail: AdminReviewDetail | null;
  title: string;
  actions?: ReactNode;
}) {
  const journey = detail?.journey ?? null;
  const coverImage = journey?.thumbnailUrl ?? journey?.images[0]?.url ?? null;

  if (!detail || !journey) {
    return (
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeading}>
            <h3 className={styles.cardTitle}>{title}</h3>
          </div>
        </div>
        <div className={styles.emptyState}>
          <h4 className={styles.emptyTitle}>No selection</h4>
        </div>
      </section>
    );
  }

  const review = detail.review;

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
  selectedPublicId,
}: {
  queue: AdminReviewQueueData;
  selectedPublicId: string | null;
}) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>Reviews</h3>
        </div>
        <span className={styles.sectionMeta}>
          {queue.total} items
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
                  <tr
                    key={item.publicId}
                    className={
                      item.publicId === selectedPublicId
                        ? styles.queueTableRowActive
                        : styles.queueTableRow
                    }
                  >
                    <td>
                      <span className={buildStatusClassName(item.review.status)}>
                        {buildStatusLabel(item.review.status)}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={buildQueueHref(queue.page, queue.status, item.publicId)}
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
                  publicId: selectedPublicId,
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
                  publicId: selectedPublicId,
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
  reviewMutation,
  returnTo,
  selectedDetail,
  selectedPublicId,
  targetPublicId,
}: {
  reviewMutation: ReviewMutationSummary | null;
  returnTo: string;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}) {
  const effectiveTargetPublicId = targetPublicId ?? selectedPublicId ?? "";
  const defaultReviewStatus = resolveDefaultReviewStatus({
    reviewMutation,
    selectedDetail,
    selectedPublicId,
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
        <input
          type="hidden"
          name="returnTo"
          value={withAdminQuery(returnTo, {
            publicId: selectedPublicId,
          })}
        />

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
  selectedPublicId,
  session,
  targetPublicId,
}: {
  queue: AdminReviewQueueData;
  selectedPublicId: string | null;
  session: AdminSession;
  targetPublicId: string | null;
}) {
  const reviewsHref = buildTabHref("reviews", {
    page: queue.page,
    selectedPublicId,
    status: queue.status,
    targetPublicId,
  });

  return (
    <div className={styles.sectionStack}>
      <section className={styles.metricGrid}>
        <SummaryMetric
          label="Pending now"
          value={queue.summary.pendingCount}
        />
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
              <dd>Review status</dd>
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
  reviewMutation,
  queue,
  returnTo,
  selectedDetail,
  selectedPublicId,
  targetPublicId,
}: {
  reviewMutation: ReviewMutationSummary | null;
  queue: AdminReviewQueueData;
  returnTo: string;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}) {
  return (
    <div className={styles.workspaceColumns}>
      <ReviewTablePanel queue={queue} selectedPublicId={selectedPublicId} />

      <div className={styles.stackList}>
        <SelectedJourneyCard detail={selectedDetail} title="Preview" />
        <ReviewUpdateCard
          reviewMutation={reviewMutation}
          returnTo={returnTo}
          selectedDetail={selectedDetail}
          selectedPublicId={selectedPublicId}
          targetPublicId={targetPublicId}
        />
      </div>
    </div>
  );
}

export function AdminWorkspace({
  activeTab,
  banner,
  reviewMutation,
  queue,
  returnTo,
  selectedDetail,
  selectedPublicId,
  session,
  targetPublicId,
}: AdminWorkspaceProps) {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Sidebar
          activeTab={activeTab}
          queue={queue}
          selectedPublicId={selectedPublicId}
          session={session}
          targetPublicId={targetPublicId}
        />

        <section className={styles.content}>
          <ContentHeader
            activeTab={activeTab}
            banner={banner}
            pendingCount={queue.summary.pendingCount}
          />

          {activeTab === "reviews" ? (
            <ReviewsPanel
              reviewMutation={reviewMutation}
              queue={queue}
              returnTo={returnTo}
              selectedDetail={selectedDetail}
              selectedPublicId={selectedPublicId}
              targetPublicId={targetPublicId}
            />
          ) : (
            <OverviewPanel
              queue={queue}
              selectedPublicId={selectedPublicId}
              session={session}
              targetPublicId={targetPublicId}
            />
          )}
        </section>
      </div>
    </main>
  );
}
