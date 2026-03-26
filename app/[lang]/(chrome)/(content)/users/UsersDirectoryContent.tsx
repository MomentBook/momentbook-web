import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import type { PublicUserApi } from "@/lib/public-users";
import { UserDirectoryCard } from "./UserDirectoryCard";
import { UsersEmptyState } from "./UsersEmptyState";
import { UserSearchForm } from "./UserSearchForm";
import type { UserListLabels } from "./users-page.helpers";
import styles from "./users.module.scss";

type UsersDirectoryContentProps = {
  lang: Language;
  labels: UserListLabels;
  filteredUsers: PublicUserApi[];
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

      <header className={styles.hero}>
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
      </header>

      <section className={styles.contentShell}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{labels.resultsEyebrow}</p>
            <h2 className={styles.sectionTitle}>{countText}</h2>
          </div>

          {isFiltering ? (
            <Link href={`/${lang}/users`} className={styles.clearLink}>
              {labels.clearSearch}
            </Link>
          ) : null}
        </div>

        {filteredUsers.length > 0 ? (
          <div className={styles.grid}>
            {filteredUsers.map((user) => (
              <UserDirectoryCard
                key={user.userId}
                lang={lang}
                user={user}
                journeysLabel={labels.journeysLabel}
                viewProfileLabel={labels.viewProfile}
              />
            ))}
          </div>
        ) : (
          <UsersEmptyState
            lang={lang}
            message={labels.empty}
            clearSearchLabel={labels.clearSearch}
            showClearAction={isFiltering}
          />
        )}
      </section>
    </>
  );
}
