import { PaginationNav } from "@/components/PaginationNav";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { SectionReveal } from "@/components/SectionReveal";
import type { PaginationEntry } from "@/lib/pagination";
import type { Language } from "@/lib/i18n/config";
import type { PublicUserApi, UserJourneyApi } from "@/lib/public-users";
import { UserJourneyCard } from "./UserJourneyCard";
import {
  buildUserProfilePageHref,
  type UserPageLabels,
} from "./user-page.helpers";
import styles from "./user.module.scss";

type UserProfileContentProps = {
  lang: Language;
  user: PublicUserApi;
  labels: UserPageLabels;
  journeys: UserJourneyApi[];
  profileImageUrl: string | null;
  sharedCountText: string;
  pageStatusText: string;
  paginationEntries: PaginationEntry[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  safeCurrentPage: number;
  totalPages: number;
};

export function UserProfileContent({
  lang,
  user,
  labels,
  journeys,
  profileImageUrl,
  sharedCountText,
  pageStatusText,
  paginationEntries,
  hasPreviousPage,
  hasNextPage,
  safeCurrentPage,
  totalPages,
}: UserProfileContentProps) {
  return (
    <>
      <SectionReveal as="header" className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.avatarHalo}>
            <div className={styles.avatarFrame}>
              <ProfileAvatar
                name={user.name}
                picture={profileImageUrl}
                size="profile"
              />
            </div>
          </div>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>{labels.profileEyebrow}</p>
            <h1 className={styles.name}>{user.name}</h1>

            <div className={styles.heroMeta}>
              <span className={styles.countBadge}>{sharedCountText}</span>
            </div>

            {user.biography ? (
              <p className={styles.bio}>{user.biography}</p>
            ) : null}
          </div>
        </div>
      </SectionReveal>

      <section className={styles.section}>
        <SectionReveal className={styles.sectionHeader}>
          <div className={styles.sectionHeadingGroup}>
            <p className={styles.sectionEyebrow}>{labels.profileEyebrow}</p>
            <h2 className={styles.sectionTitle}>{labels.journeys}</h2>
          </div>

          <div className={styles.sectionSummary}>
            <p className={styles.sectionCount}>{sharedCountText}</p>
            {totalPages > 1 ? (
              <p className={styles.pageStatus}>{pageStatusText}</p>
            ) : null}
          </div>
        </SectionReveal>

        {journeys.length === 0 ? (
          <SectionReveal className={styles.emptyState}>
            <div className={styles.emptyDivider} />
            <p className={styles.emptyTitle}>{labels.emptyJourneys}</p>
            <div className={styles.emptyDivider} />
          </SectionReveal>
        ) : (
          <>
            <div className={styles.journeyGrid}>
              {journeys.map((journey, index) => (
                <SectionReveal
                  key={journey.publicId}
                  variant="item"
                  staggerIndex={index}
                >
                  <UserJourneyCard
                    journey={journey}
                    lang={lang}
                    labels={labels}
                  />
                </SectionReveal>
              ))}
            </div>

            {totalPages > 1 ? (
              <SectionReveal delay={120}>
                <PaginationNav
                  ariaLabel={labels.journeys}
                  currentPage={safeCurrentPage}
                  entries={paginationEntries}
                  hasPreviousPage={hasPreviousPage}
                  hasNextPage={hasNextPage}
                  previousLabel={labels.previousPage}
                  nextLabel={labels.nextPage}
                  buildHref={(targetPage) => buildUserProfilePageHref(lang, user.userId, targetPage)}
                  classNames={{
                    nav: styles.pagination,
                    button: styles.pageButton,
                    buttonDisabled: styles.pageButtonDisabled,
                    numbers: styles.pageNumbers,
                    ellipsis: styles.pageEllipsis,
                    current: styles.pageNumberCurrent,
                    page: styles.pageNumber,
                  }}
                />
              </SectionReveal>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
