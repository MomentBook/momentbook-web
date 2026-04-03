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
      <SectionReveal as="header" className={styles.hero}>
        <h1 className={styles.title}>{labels.title}</h1>

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
