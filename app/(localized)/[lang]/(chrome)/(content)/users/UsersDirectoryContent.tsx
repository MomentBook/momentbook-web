import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import type { Language } from "@/lib/i18n/config";
import { UserDirectoryCard } from "./UserDirectoryCard";
import { UsersEmptyState } from "./UsersEmptyState";
import { UserSearchForm } from "./UserSearchForm";
import type { UserDirectorySearchResult } from "./users.helpers";
import type { UserListLabels } from "./users-page.helpers";
import styles from "./users.module.scss";

type UsersDirectoryContentProps = {
  lang: Language;
  labels: UserListLabels;
  filteredUsers: UserDirectorySearchResult[];
  countText: string;
  isFiltering: boolean;
};

export function UsersDirectoryContent({
  lang,
  labels,
  filteredUsers,
  countText,
  isFiltering,
}: UsersDirectoryContentProps) {
  return (
    <>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropOrbPrimary} />
        <div className={styles.backdropOrbSecondary} />
        <div className={styles.backdropLine} />
      </div>

      <SectionReveal as="header" className={styles.hero}>
        <p className={styles.kicker}>{labels.directoryEyebrow}</p>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>

        <div className={styles.searchShell}>
          <UserSearchForm
            lang={lang}
            placeholder={labels.searchPlaceholder}
            submitLabel={labels.searchButton}
          />
        </div>
      </SectionReveal>

      <section className={styles.contentShell}>
        <SectionReveal className={styles.sectionHeader}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{labels.resultsEyebrow}</p>
            <h2 className={styles.sectionTitle}>{countText}</h2>
          </div>

          {isFiltering ? (
            <Link href={`/${lang}/users`} className={styles.clearLink}>
              {labels.clearSearch}
            </Link>
          ) : null}
        </SectionReveal>

        {filteredUsers.length > 0 ? (
          <div className={styles.grid}>
            {filteredUsers.map((result, index) => (
              <SectionReveal key={result.user.userId} variant="item" staggerIndex={index}>
                <UserDirectoryCard
                  lang={lang}
                  user={result.user}
                  matchedHashtags={result.matchedHashtags}
                  hashtagHint={labels.hashtagHint}
                  journeysLabel={labels.journeysLabel}
                  viewProfileLabel={labels.viewProfile}
                />
              </SectionReveal>
            ))}
          </div>
        ) : (
          <SectionReveal delay={80}>
            <UsersEmptyState
              lang={lang}
              message={labels.empty}
              clearSearchLabel={labels.clearSearch}
              showClearAction={isFiltering}
            />
          </SectionReveal>
        )}
      </section>
    </>
  );
}
