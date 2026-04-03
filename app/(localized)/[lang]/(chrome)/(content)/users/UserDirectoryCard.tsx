import Link from "next/link";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import type { Language } from "@/lib/i18n/config";
import type { PublicUserApi } from "@/lib/public-users";
import styles from "./users.module.scss";

type UserDirectoryCardProps = {
  lang: Language;
  user: PublicUserApi;
  matchedHashtags: string[];
  hashtagHint: string;
  journeysLabel: string;
  viewProfileLabel: string;
};

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.metaIcon} aria-hidden="true">
      <path
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.viewIcon} aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function UserDirectoryCard({
  lang,
  user,
  matchedHashtags,
  hashtagHint,
  journeysLabel,
  viewProfileLabel,
}: UserDirectoryCardProps) {
  return (
    <Link
      href={`/${lang}/users/${user.userId}`}
      className={styles.card}
    >
      <div className={styles.cardTop}>
        <div className={styles.avatarShell}>
          <ProfileAvatar
            name={user.name}
            picture={user.picture}
            size="profile"
          />
        </div>

        <div className={styles.cardIdentity}>
          <p className={styles.name}>{user.name}</p>
        </div>
      </div>

      {user.biography ? (
        <p className={styles.bio}>{user.biography}</p>
      ) : (
        <div className={styles.bioSpacer} aria-hidden="true" />
      )}

      {matchedHashtags.length > 0 ? (
        <div className={styles.matchedHashtagBlock}>
          <p className={styles.matchedHashtagLabel}>{hashtagHint}</p>
          <div className={styles.matchedHashtagList}>
            {matchedHashtags.slice(0, 4).map((hashtag) => (
              <span key={hashtag} className={styles.matchedHashtagChip}>
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className={styles.cardFooter}>
        <span className={styles.metaStat}>
          <BookIcon />
          {user.publishedJourneyCount} {journeysLabel}
        </span>
        <span className={styles.viewLink}>
          {viewProfileLabel}
          <ChevronIcon />
        </span>
      </div>
    </Link>
  );
}
