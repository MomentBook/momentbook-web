import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateRange } from "@/components/LocalizedTime";
import type { LanguageDisplayInfo } from "@/lib/i18n/language-display";
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
  locationSummary: string | null;
  sourceLanguage: LanguageDisplayInfo | null;
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
  locationSummary,
  sourceLanguage,
  publishedTimestamp,
  periodStart,
  periodEnd,
  photoCount,
}: JourneyHeroProps) {
  const encodedUserId = encodeURIComponent(journey.userId);
  const hasTripPeriod = periodStart !== null || periodEnd !== null;
  const showNativeName = sourceLanguage
    ? sourceLanguage.nativeName.localeCompare(sourceLanguage.displayName, undefined, {
        sensitivity: "accent",
      }) !== 0
    : false;

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
        <div className={styles.heroOverlay}>
          <div className={styles.heroOverlayInner}>
            <p className={styles.eyebrow}>{labels.eyebrow}</p>
            {locationSummary ? (
              <p className={styles.heroLocation}>{locationSummary}</p>
            ) : null}
            <h1 className={styles.title}>{journey.title}</h1>
          </div>
        </div>
      </div>

      <div className={styles.heroBody}>
        <div className={styles.metaStrip}>
          <div className={styles.metaGrid}>
            {authorName ? (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>{labels.authorLabel}</span>
                <Link
                  href={`/${lang}/users/${encodedUserId}`}
                  className={styles.authorLink}
                >
                  {authorName}
                </Link>
              </div>
            ) : null}

            {hasTripPeriod ? (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>{labels.periodLabel}</span>
                <span className={styles.metaValue}>
                  <LocalizedDateRange
                    lang={lang}
                    start={periodStart}
                    end={periodEnd}
                    fallback="—"
                  />
                </span>
              </div>
            ) : publishedTimestamp ? (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>{labels.publishedLabel}</span>
                <span className={styles.metaValue}>
                  <LocalizedDate
                    lang={lang}
                    timestamp={publishedTimestamp}
                    fallback="—"
                  />
                </span>
              </div>
            ) : null}

            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>{labels.photosStat}</span>
              <span className={styles.metaValue}>
                {photoCount} {labels.photoCount}
              </span>
            </div>
          </div>

          {sourceLanguage ? (
            <div className={styles.languageNote}>
              <span className={styles.languageNoteLabel}>
                {labels.originalLanguageLabel}
              </span>
              <span className={styles.languageNoteValue}>
                <span>{sourceLanguage.displayName}</span>
                {showNativeName ? (
                  <>
                    <span className={styles.languageNoteDivider} aria-hidden="true">
                      ·
                    </span>
                    <bdi
                      lang={sourceLanguage.localeTag}
                      className={styles.languageNoteNative}
                    >
                      {sourceLanguage.nativeName}
                    </bdi>
                  </>
                ) : null}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
