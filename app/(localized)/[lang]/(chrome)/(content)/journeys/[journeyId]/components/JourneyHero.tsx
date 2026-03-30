import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateRange } from "@/components/LocalizedTime";
import type { Language } from "@/lib/i18n/config";
import type { PublishedJourneyApi } from "@/lib/published-journey";
import type { JourneyLabels } from "../labels";
import type { DisplayImage } from "./journey-content.helpers";
import styles from "./JourneyContent.module.scss";

type JourneyHeroProps = {
  journey: PublishedJourneyApi;
  heroImage: DisplayImage;
  lang: Language;
  labels: JourneyLabels;
  authorName: string | null;
  publishedTimestamp: number | null;
  periodStart: number | null;
  periodEnd: number | null;
  photoCount: number;
};

export function JourneyHero({
  journey,
  heroImage,
  lang,
  labels,
  authorName,
  publishedTimestamp,
  periodStart,
  periodEnd,
  photoCount,
}: JourneyHeroProps) {
  const encodedUserId = encodeURIComponent(journey.userId);
  const hasTripPeriod = periodStart !== null || periodEnd !== null;

  return (
    <header className={styles.hero}>
      <div className={styles.heroFrame}>
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          priority
          sizes="(max-width: 1099px) 100vw, 78rem"
          className={styles.heroImage}
        />
      </div>

      <div className={styles.heroBody}>
        <p className={styles.eyebrow}>{labels.eyebrow}</p>
        <h1 className={styles.title}>{journey.title}</h1>
        {journey.description ? (
          <p className={styles.description}>{journey.description}</p>
        ) : null}

        <div className={styles.metaRow}>
          {authorName ? (
            <Link
              href={`/${lang}/users/${encodedUserId}`}
              className={styles.authorLink}
            >
              {authorName}
            </Link>
          ) : null}

          {hasTripPeriod ? (
            <span className={styles.metaItem}>
              <span className={styles.metaKey}>{labels.periodLabel}</span>
              <LocalizedDateRange
                lang={lang}
                start={periodStart}
                end={periodEnd}
                fallback="—"
              />
            </span>
          ) : publishedTimestamp ? (
            <span className={styles.metaItem}>
              <span className={styles.metaKey}>{labels.publishedLabel}</span>
              <LocalizedDate
                lang={lang}
                timestamp={publishedTimestamp}
                fallback="—"
              />
            </span>
          ) : null}

          <span className={styles.metaItem}>
            <span className={styles.metaKey}>{labels.photosStat}</span>
            <span>
              {photoCount} {labels.photoCount}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
