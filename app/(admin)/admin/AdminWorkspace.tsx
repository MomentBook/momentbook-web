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
  AdminReviewQueueItem,
  AdminReviewQueueStatus,
  AdminReviewStatus,
} from "@/lib/admin/mock-data";
import styles from "./workspace.module.scss";

const ADMIN_DISPLAY_LANGUAGE = defaultLanguage;

type DashboardBanner = {
  tone: "default" | "error" | "success";
  message: string;
};

type LiveMutationSummary = {
  publicId: string;
  reviewStatus: AdminReviewStatus;
};

type AdminWorkspaceProps = {
  activeTab: AdminWorkspaceTab;
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

function getActiveTabMeta(tab: AdminWorkspaceTab): {
  title: string;
} {
  if (tab === "reviews") {
    return {
      title: "Reviews",
    };
  }

  if (tab === "live") {
    return {
      title: "Live update",
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
    {
      tab: "live",
      label: "Live update",
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
            sizes="72px"
          />
        ) : (
          <div className={styles.imageFallback}>No image</div>
        )}
      </div>

      <div className={styles.queueBody}>
        <div className={styles.queueTopRow}>
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
          <div className={styles.queueList}>
            {queue.items.map((item) => (
              <QueueItem
                key={item.publicId}
                href={buildQueueHref(queue.page, queue.status, item.publicId)}
                isActive={item.publicId === selectedPublicId}
                item={item}
              />
            ))}
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
            Switch the queue filter or return to the pending list.
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

function OverviewPanel({
  queue,
  selectedDetail,
  selectedPublicId,
  session,
  targetPublicId,
}: {
  queue: AdminReviewQueueData;
  selectedDetail: AdminReviewDetail | null;
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
  const liveHref = buildTabHref("live", {
    page: queue.page,
    selectedPublicId,
    status: queue.status,
    targetPublicId: targetPublicId ?? selectedPublicId,
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
        <SelectedJourneyCard
          detail={selectedDetail}
          title="Preview"
          actions={
            <Link href={reviewsHref} className={styles.secondaryButton}>
              Reviews
            </Link>
          }
        />

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeading}>
              <h3 className={styles.cardTitle}>Access</h3>
            </div>
          </div>

          <dl className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <dt>Current account</dt>
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

          <div className={styles.inlineActions}>
            <Link href={liveHref} className={styles.primaryButton}>
              Live update
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function ReviewsPanel({
  queue,
  selectedDetail,
  selectedPublicId,
  targetPublicId,
}: {
  queue: AdminReviewQueueData;
  selectedDetail: AdminReviewDetail | null;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}) {
  const liveHref = buildTabHref("live", {
    page: queue.page,
    selectedPublicId,
    status: queue.status,
    targetPublicId: targetPublicId ?? selectedPublicId,
  });

  return (
    <div className={styles.workspaceColumns}>
      <QueuePanel queue={queue} selectedPublicId={selectedPublicId} />

      <SelectedJourneyCard
        detail={selectedDetail}
        title="Preview"
        actions={
          <Link href={liveHref} className={styles.primaryButton}>
            Live update
          </Link>
        }
      />
    </div>
  );
}

function LiveUpdatePanel({
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
  const effectiveTargetPublicId = targetPublicId ?? selectedPublicId ?? "";
  const defaultReviewStatus = resolveDefaultReviewStatus({
    liveMutation,
    selectedDetail,
    selectedPublicId,
    targetPublicId,
  });

  return (
    <div className={styles.workspaceColumns}>
      <SelectedJourneyCard
        detail={selectedDetail}
        title="Preview"
      />

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeading}>
            <h3 className={styles.cardTitle}>Update status</h3>
          </div>

          {liveMutation ? (
            <div className={styles.resultCard} role="status" aria-live="polite">
              <span className={styles.sidebarLabel}>Last saved</span>
              <div className={styles.inlineMeta}>
                <span className={buildStatusClassName(liveMutation.reviewStatus)}>
                  {buildStatusLabel(liveMutation.reviewStatus)}
                </span>
                <span className={styles.metaPill}>{liveMutation.publicId}</span>
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
    </div>
  );
}

export function AdminWorkspace({
  activeTab,
  banner,
  liveMutation,
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
              queue={queue}
              selectedDetail={selectedDetail}
              selectedPublicId={selectedPublicId}
              targetPublicId={targetPublicId}
            />
          ) : activeTab === "live" ? (
            <LiveUpdatePanel
              liveMutation={liveMutation}
              returnTo={returnTo}
              selectedDetail={selectedDetail}
              selectedPublicId={selectedPublicId}
              targetPublicId={targetPublicId}
            />
          ) : (
            <OverviewPanel
              queue={queue}
              selectedDetail={selectedDetail}
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
