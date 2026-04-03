import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { logoutAdminAction, updatePublishedJourneyReviewAction } from "@/app/(admin)/admin/actions";
import {
  ADMIN_REVIEWS_PATH,
  withAdminQuery,
} from "@/lib/admin/paths";
import type { AdminSession } from "@/lib/admin/session";
import { defaultLanguage } from "@/lib/i18n/config";
import type {
  AdminJourneyDetail,
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

function buildQueueFilterLabel(status: AdminReviewQueueStatus): string {
  if (status === "approved") {
    return "Approved preview";
  }

  if (status === "rejected") {
    return "Rejected preview";
  }

  if (status === "all") {
    return "All preview records";
  }

  return "Pending preview";
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

function AdminMetricCard({
  hint,
  label,
  value,
}: {
  hint: string;
  label: string;
  value: number;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricHint}>{hint}</span>
    </article>
  );
}

function AdminNavigation({
  pendingCount,
  session,
}: {
  pendingCount: number;
  session: AdminSession;
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandPanel}>
        <span className={styles.brandEyebrow}>MomentBook Admin</span>
        <h1 className={styles.brandTitle}>Backoffice dashboard</h1>
        <p className={styles.brandBody}>
          Internal operations shell for moderation today, with room for future
          content health and audit tools.
        </p>
      </div>

      <div className={styles.navSection}>
        <span className={styles.navSectionTitle}>Workspace</span>
        <nav className={styles.navList} aria-label="Admin navigation">
          <Link href={ADMIN_REVIEWS_PATH} className={styles.navItemActive}>
            <span className={styles.navLabelWrap}>
              <span className={styles.navLabel}>Reviews</span>
              <span className={styles.navDescription}>
                Queue preview and live status control
              </span>
            </span>
            <span className={`${styles.pill} ${styles.pillLive}`}>
              {pendingCount}
            </span>
          </Link>

          <div className={styles.navItemDisabled} aria-disabled="true">
            <span className={styles.navLabelWrap}>
              <span className={styles.navLabel}>Content health</span>
              <span className={styles.navDescription}>
                Aggregate quality signals
              </span>
            </span>
            <span className={`${styles.pill} ${styles.pillSoon}`}>Soon</span>
          </div>

          <div className={styles.navItemDisabled} aria-disabled="true">
            <span className={styles.navLabelWrap}>
              <span className={styles.navLabel}>Audit trail</span>
              <span className={styles.navDescription}>
                Moderation history and change context
              </span>
            </span>
            <span className={`${styles.pill} ${styles.pillSoon}`}>Soon</span>
          </div>

          <div className={styles.navItemDisabled} aria-disabled="true">
            <span className={styles.navLabelWrap}>
              <span className={styles.navLabel}>Settings</span>
              <span className={styles.navDescription}>
                Policy and workspace configuration
              </span>
            </span>
            <span className={`${styles.pill} ${styles.pillMuted}`}>Later</span>
          </div>
        </nav>
      </div>

      <div className={styles.sessionCard}>
        <span className={styles.sessionLabel}>Active admin session</span>
        <strong className={styles.sessionValue}>
          {session.name || "Admin workspace"}
        </strong>
        <span className={styles.sessionMeta}>
          {session.email || "Signed in with backend admin role"}
        </span>
        <span className={styles.sessionHint}>
          Session tokens stay in an encrypted HttpOnly cookie and refresh
          against the backend lifecycle.
        </span>
      </div>

      <div className={styles.sidebarFooter}>
        <Link href="/" className={styles.linkButton}>
          Open public web
        </Link>

        <form action={logoutAdminAction}>
          <button type="submit" className={styles.logoutButton}>
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

function QueueCard({
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
      className={isActive ? styles.queueCardActive : styles.queueCard}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={styles.queueCardTop}>
        <div className={styles.queueThumbWrap}>
          {thumbUrl ? (
            <Image
              src={thumbUrl}
              alt=""
              fill
              className={styles.queueThumb}
              sizes="112px"
            />
          ) : (
            <div className={styles.queueThumbFallback}>No preview</div>
          )}
        </div>

        <div className={styles.queueCardBody}>
          <div className={styles.metaRow}>
            <span className={buildStatusClassName(item.review.status)}>
              {buildStatusLabel(item.review.status)}
            </span>
            <span className={styles.tag}>{item.photoCount} photos</span>
          </div>

          <h3 className={styles.queueTitle}>
            {item.title || "Untitled submission"}
          </h3>

          {item.description ? (
            <p className={styles.queueDescription}>{item.description}</p>
          ) : null}

          <div className={styles.metaRow}>
            <span className={styles.tag}>
              {item.author.name || "Unknown author"}
            </span>
            <span className={styles.tag}>{item.visibility}</span>
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
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderStack}>
          <span className={styles.panelEyebrow}>Queue</span>
          <h2 className={styles.panelTitle}>Review queue preview</h2>
          <p className={styles.panelBody}>
            Dense list optimized for quick scanning. This list remains mock
            data until a backend read API is available.
          </p>
        </div>
        <span className={styles.panelMeta}>
          {queue.total} records · page {queue.page} / {queue.pages}
        </span>
      </div>

      <div className={styles.panelToolbar}>
        <div className={styles.filterRow} aria-label="Queue status filters">
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
                  queue.status === value
                    ? styles.filterChipActive
                    : styles.filterChip
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
        <span className={styles.panelMeta}>{buildQueueFilterLabel(queue.status)}</span>
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
                href={buildReturnHref(Math.max(1, queue.page - 1), queue.status)}
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
                  queue.status,
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
          <h3 className={styles.emptyTitle}>No preview records in this filter</h3>
          <p className={styles.emptyBody}>
            The current mock dataset does not include items for this view.
            Switch filters or return to the pending set.
          </p>
          {queue.status !== "pending" ? (
            <Link href={ADMIN_REVIEWS_PATH} className={styles.emptyAction}>
              Show pending preview
            </Link>
          ) : null}
        </div>
      )}
    </section>
  );
}

function ReviewActionPanel({
  liveMutation,
  returnTo,
  selectedPublicId,
  targetPublicId,
}: {
  liveMutation: LiveMutationSummary | null;
  returnTo: string;
  selectedPublicId: string | null;
  targetPublicId: string | null;
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderStack}>
          <span className={styles.panelEyebrow}>Live control</span>
          <h2 className={styles.panelTitle}>Review status mutation</h2>
          <p className={styles.panelBody}>
            The write contract is live today. Queue and detail panes are still
            preview-only, so use a known public ID when changing moderation
            state.
          </p>
        </div>
        {liveMutation ? (
          <div className={styles.resultCard} role="status" aria-live="polite">
            <span className={styles.resultLabel}>Last update</span>
            <div className={styles.metaRow}>
              <span className={buildStatusClassName(liveMutation.reviewStatus)}>
                {buildStatusLabel(liveMutation.reviewStatus)}
              </span>
              <span className={styles.tag}>{liveMutation.publicId}</span>
            </div>
          </div>
        ) : null}
      </div>

      <form action={updatePublishedJourneyReviewAction} className={styles.actionForm}>
        <input type="hidden" name="returnTo" value={returnTo} />

        <label className={styles.field}>
          <span className={styles.label}>Target public ID</span>
          <input
            type="text"
            name="targetPublicId"
            className={styles.input}
            defaultValue={targetPublicId ?? ""}
            placeholder="Enter a real published journey public ID"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>

        <p className={styles.helpText}>
          Current preview selection:{" "}
          <strong>{selectedPublicId ?? "No preview selected"}</strong>
          . Preview selection does not guarantee that the same ID exists in the
          live backend.
        </p>

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

      <ul className={styles.noteList}>
        <li className={styles.noteItem}>
          Public surfaces show only approved journeys with public visibility.
        </li>
        <li className={styles.noteItem}>
          The backend write contract currently stores only the canonical review
          status.
        </li>
        <li className={styles.noteItem}>
          Rejection reason text is preview-only and is not written back by the
          current API.
        </li>
      </ul>
    </section>
  );
}

function DetailMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className={styles.detailMetric}>
      <span className={styles.detailMetricLabel}>{label}</span>
      <strong className={styles.detailMetricValue}>{value}</strong>
    </article>
  );
}

function TimelineItem({
  item,
}: {
  item: AdminJourneyDetail["timeline"][number];
}) {
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

function SelectedPreviewDetails({
  detail,
}: {
  detail: AdminReviewDetail;
}) {
  const journey = detail.journey;
  const localizations = journey.localizedContent?.entries.slice(0, 3) ?? [];
  const timeline = journey.timeline.slice(0, 5);

  return (
    <>
      <div className={styles.detailGrid}>
        <article className={styles.detailMetric}>
          <span className={styles.detailMetricLabel}>Journey window</span>
          <strong className={styles.detailMetricValue}>
            <LocalizedDateTimeRange
              lang={ADMIN_DISPLAY_LANGUAGE}
              start={journey.startedAt}
              end={journey.endedAt}
              startContext={journey.startedAtLocal}
              endContext={journey.endedAtLocal}
            />
          </strong>
        </article>
        <DetailMetric label="Submission ID" value={journey.publicId} />
        <DetailMetric
          label="Content status"
          value={buildContentStatusLabel(journey.contentStatus)}
        />
        <DetailMetric
          label="Localized locales"
          value={String(journey.localizedContent?.entries.length ?? 0)}
        />
      </div>

      {localizations.length > 0 ? (
        <section className={styles.detailSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Localized snapshot</h3>
            {journey.localizedContent?.generatedAt ? (
              <span className={styles.sectionMeta}>
                Generated{" "}
                <LocalizedDate
                  lang={ADMIN_DISPLAY_LANGUAGE}
                  timestamp={Date.parse(journey.localizedContent.generatedAt)}
                />
              </span>
            ) : null}
          </div>

          <div className={styles.contentGrid}>
            {localizations.map((entry) => (
              <article key={entry.locale} className={styles.contentCard}>
                <div className={styles.metaRow}>
                  <span className={styles.tag}>{entry.locale}</span>
                  <span className={styles.tag}>{entry.languageName}</span>
                </div>
                <strong className={styles.contentTitle}>
                  {entry.title || "Untitled localization"}
                </strong>
                {entry.description ? (
                  <p className={styles.contentBody}>{entry.description}</p>
                ) : null}
                {entry.hashtags.length > 0 ? (
                  <div className={styles.metaRow}>
                    {entry.hashtags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.tag}>
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
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Timeline preview</h3>
            <span className={styles.sectionMeta}>
              {timeline.length} checkpoints shown
            </span>
          </div>
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

      <section className={styles.detailSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Preview notes</h3>
        </div>
        <ul className={styles.noteList}>
          {detail.review.reviewedAt ? (
            <li className={styles.noteItem}>
              Mock reviewed at{" "}
              <LocalizedDate
                lang={ADMIN_DISPLAY_LANGUAGE}
                timestamp={Date.parse(detail.review.reviewedAt)}
              />
              .
            </li>
          ) : null}
          {detail.review.rejectionReason ? (
            <li className={styles.noteItem}>
              Mock rejection note: {detail.review.rejectionReason}
            </li>
          ) : null}
          <li className={styles.noteItem}>
            Preview cards intentionally show mock content until backend read
            contracts exist.
          </li>
          <li className={styles.noteItem}>
            The live API currently accepts only canonical review state changes.
          </li>
        </ul>
      </section>
    </>
  );
}

function PreviewInspectorPanel({
  detail,
}: {
  detail: AdminReviewDetail | null;
}) {
  if (!detail) {
    return (
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div className={styles.panelHeaderStack}>
            <span className={styles.panelEyebrow}>Inspector</span>
            <h2 className={styles.panelTitle}>Selected preview</h2>
            <p className={styles.panelBody}>
              Choose a record from the queue to inspect its mock journey detail,
              localization snapshot, and future moderation layout.
            </p>
          </div>
        </div>

        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>No preview selected</h3>
          <p className={styles.emptyBody}>
            The inspector stays intentionally empty until a queue item is
            selected.
          </p>
        </div>
      </section>
    );
  }

  const journey = detail.journey;
  const coverImage = journey.thumbnailUrl ?? journey.images[0]?.url ?? null;

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderStack}>
          <span className={styles.panelEyebrow}>Inspector</span>
          <h2 className={styles.panelTitle}>Selected preview</h2>
          <p className={styles.panelBody}>
            Mock dataset view for layout validation. Keep this separate from the
            live write flow until an admin read API exists.
          </p>
        </div>
        <span className={styles.panelMeta}>{journey.publicId}</span>
      </div>

      <div className={styles.detailHero}>
        <div className={styles.detailImageWrap}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt=""
              fill
              className={styles.detailImage}
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          ) : (
            <div className={styles.detailImageFallback}>No cover image</div>
          )}
        </div>

        <div className={styles.detailHeader}>
          <div className={styles.metaRow}>
            <span className={buildStatusClassName(detail.review.status)}>
              {buildStatusLabel(detail.review.status)}
            </span>
            <span className={styles.tag}>{journey.photoCount} photos</span>
            <span className={styles.tag}>{journey.visibility}</span>
          </div>

          <h3 className={styles.detailTitle}>
            {journey.title || "Untitled submission"}
          </h3>

          {journey.description ? (
            <p className={styles.detailDescription}>{journey.description}</p>
          ) : null}

          <div className={styles.metaRow}>
            <span className={styles.tag}>
              {journey.author.name || "Unknown author"}
            </span>
            <span className={styles.tag}>
              {journey.localizedContent?.sourceLanguage || "Unknown source language"}
            </span>
          </div>
        </div>
      </div>

      <SelectedPreviewDetails detail={detail} />
    </section>
  );
}

function FutureModulesPanel() {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderStack}>
          <span className={styles.panelEyebrow}>Roadmap-ready shell</span>
          <h2 className={styles.panelTitle}>Upcoming modules</h2>
          <p className={styles.panelBody}>
            These blocks reserve stable layout space for future admin features
            without implying live backend support today.
          </p>
        </div>
      </div>

      <div className={styles.futureGrid}>
        <article className={styles.futureCard}>
          <span className={`${styles.pill} ${styles.pillSoon}`}>Upcoming</span>
          <h3 className={styles.futureTitle}>Content health</h3>
          <p className={styles.futureBody}>
            Planned surface for aggregate signals such as review backlog,
            hidden-content patterns, and localization coverage quality.
          </p>
        </article>

        <article className={styles.futureCard}>
          <span className={`${styles.pill} ${styles.pillSoon}`}>Upcoming</span>
          <h3 className={styles.futureTitle}>Audit trail</h3>
          <p className={styles.futureBody}>
            Planned history view for moderation decisions, reviewer context, and
            follow-up investigation.
          </p>
        </article>
      </div>
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
  const selectedLocalizationCount =
    selectedDetail?.journey.localizedContent?.entries.length ?? 0;
  const selectedTimelineCount = selectedDetail?.journey.timeline.length ?? 0;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <AdminNavigation
          pendingCount={queue.summary.pendingCount}
          session={session}
        />

        <section className={styles.workspace}>
          <header className={styles.topBar}>
            <div className={styles.topBarIntro}>
              <span className={styles.topBarEyebrow}>Internal operations</span>
              <h2 className={styles.topBarTitle}>Review dashboard</h2>
              <p className={styles.topBarBody}>
                Backoffice workspace for review operations today, with stable
                layout zones prepared for future moderation tooling.
              </p>
            </div>

            <div className={styles.topBarMeta}>
              <article className={styles.commandCard}>
                <span className={styles.commandLabel}>Current filter</span>
                <strong className={styles.commandValue}>
                  {buildQueueFilterLabel(queue.status)}
                </strong>
                <span className={styles.commandHint}>
                  {queue.total} preview records in view
                </span>
              </article>

              <article className={styles.commandCard}>
                <span className={styles.commandLabel}>Selected preview</span>
                <strong className={styles.commandValue}>
                  {selectedPublicId ?? "No selection"}
                </strong>
                <span className={styles.commandHint}>
                  Inspector and layout preview context
                </span>
              </article>
            </div>
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
              role="status"
              aria-live="polite"
            >
              {banner.message}
            </p>
          ) : null}

          <section className={styles.metricsGrid}>
            <AdminMetricCard
              label="Pending now"
              value={queue.summary.pendingCount}
              hint="Preview count for moderation backlog"
            />
            <AdminMetricCard
              label="Approved set"
              value={queue.summary.approvedTodayCount}
              hint="Mock approved records for layout validation"
            />
            <AdminMetricCard
              label="Rejected set"
              value={queue.summary.rejectedTodayCount}
              hint="Mock rejected records for layout validation"
            />
            <AdminMetricCard
              label="Selected locales"
              value={selectedLocalizationCount}
              hint={`${selectedTimelineCount} timeline checkpoints in inspector`}
            />
          </section>

          <div className={styles.workspaceGrid}>
            <div className={styles.queueColumn}>
              <QueuePanel
                queue={queue}
                returnTo={returnTo}
                selectedPublicId={selectedPublicId}
              />
            </div>

            <div className={styles.inspectorColumn}>
              <ReviewActionPanel
                liveMutation={liveMutation}
                returnTo={withAdminQuery(returnTo, {
                  publicId: selectedPublicId,
                })}
                selectedPublicId={selectedPublicId}
                targetPublicId={targetPublicId}
              />
              <PreviewInspectorPanel detail={selectedDetail} />
              <FutureModulesPanel />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
