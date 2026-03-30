import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import styles from "./users.module.scss";

type UsersEmptyStateProps = {
  lang: Language;
  message: string;
  clearSearchLabel: string;
  showClearAction: boolean;
};

export function UsersEmptyState({
  lang,
  message,
  clearSearchLabel,
  showClearAction,
}: UsersEmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={styles.emptyIconSvg}>
          <path
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0a7 7 0 0 1 14 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </div>
      <p className={styles.emptyTitle}>{message}</p>
      {showClearAction ? (
        <Link href={`/${lang}/users`} className={styles.emptyAction}>
          {clearSearchLabel}
        </Link>
      ) : null}
    </div>
  );
}
