import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateRange } from "@/components/LocalizedTime";
import { getHashtagSearchValue } from "@/lib/hashtags";
import type { LanguageDisplayInfo } from "@/lib/i18n/language-display";
import type { Language } from "@/lib/i18n/config";
import type { LocalDateTimeContext } from "@/lib/local-time-context";
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
  periodStartLocal?: LocalDateTimeContext | null;
  periodEndLocal?: LocalDateTimeContext | null;
  photoCount: number;
};

type JourneyHeroMetaRailProps = {
  lang: Language;
  labels: JourneyLabels;
  authorName: string | null;
  authorHref: string;
  hasTripPeriod: boolean;
  periodStart: number | null;
  periodEnd: number | null;
  periodStartLocal?: LocalDateTimeContext | null;
  periodEndLocal?: LocalDateTimeContext | null;
  publishedTimestamp: number | null;
  photoCount: number;
  sourceLanguage: LanguageDisplayInfo | null;
  showNativeName: boolean;
  className: string;
};

function JourneyHeroMetaRail({
  lang,
  labels,
  authorName,
  authorHref,
  hasTripPeriod,
  periodStart,
  periodEnd,
  periodStartLocal,
  periodEndLocal,
  publishedTimestamp,
  photoCount,
  sourceLanguage,
  showNativeName,
  className,
}: JourneyHeroMetaRailProps) {
  return (
    <div className={className}>
      {authorName ? (
        <div className={styles.heroMetaCard}>
          <span className={styles.heroMetaLabel}>{labels.authorLabel}</span>
          <Link href={authorHref} className={styles.heroMetaLink}>
            {authorName}
          </Link>
        </div>
      ) : null}

      {hasTripPeriod ? (
        <div className={styles.heroMetaCard}>
          <span className={styles.heroMetaLabel}>{labels.periodLabel}</span>
          <span className={styles.heroMetaValue}>
            <LocalizedDateRange
              lang={lang}
              start={periodStart}
              end={periodEnd}
              startContext={periodStartLocal}
              endContext={periodEndLocal}
              fallback="—"
            />
          </span>
        </div>
      ) : publishedTimestamp ? (
        <div className={styles.heroMetaCard}>
          <span className={styles.heroMetaLabel}>{labels.publishedLabel}</span>
          <span className={styles.heroMetaValue}>
            <LocalizedDate
              lang={lang}
              timestamp={publishedTimestamp}
              fallback="—"
            />
          </span>
        </div>
      ) : null}

      <div className={styles.heroMetaCard}>
        <span className={styles.heroMetaLabel}>{labels.photosStat}</span>
        <span className={styles.heroMetaValue}>
          {photoCount} {labels.photoCount}
        </span>
      </div>

      {sourceLanguage ? (
        <div className={styles.heroMetaCard}>
          <span className={styles.heroMetaLabel}>{labels.originalLanguageLabel}</span>
          <span className={styles.heroLanguageValue}>
            <span>{sourceLanguage.displayName}</span>
            {showNativeName ? (
              <>
                <span className={styles.heroMetaDivider} aria-hidden="true">
                  ·
                </span>
                <bdi lang={sourceLanguage.localeTag} className={styles.heroMetaNative}>
                  {sourceLanguage.nativeName}
                </bdi>
              </>
            ) : null}
          </span>
        </div>
      ) : null}
    </div>
  );
}

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
  periodStartLocal,
  periodEndLocal,
  photoCount,
}: JourneyHeroProps) {
  const encodedUserId = encodeURIComponent(journey.userId);
  const authorHref = `/${lang}/users/${encodedUserId}`;
  const hasTripPeriod = periodStart !== null || periodEnd !== null;
  const hasMetaRail = Boolean(authorName) || hasTripPeriod || Boolean(publishedTimestamp) || photoCount > 0 || Boolean(sourceLanguage);
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
          sizes="(max-width: 899px) 100vw, (max-width: 1199px) 92vw, 70rem"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroOverlayInner}>
            <p className={styles.eyebrow}>{labels.eyebrow}</p>
            {locationSummary ? (
              <p className={styles.heroLocation}>{locationSummary}</p>
            ) : null}
            <h1 className={styles.title}>{journey.title}</h1>
            {journey.description || journey.hashtags.length > 0 ? (
              <div className={styles.heroNarrative}>
                {journey.description ? (
                  <p className={styles.heroDescription}>{journey.description}</p>
                ) : null}

                {journey.hashtags.length > 0 ? (
                  <div
                    className={styles.heroHashtagSection}
                    aria-label={labels.hashtagsTitle}
                  >
                    {journey.hashtags.map((hashtag) => (
                      <Link
                        key={hashtag}
                        href={{
                          pathname: `/${lang}/users`,
                          query: { q: getHashtagSearchValue(hashtag) },
                        }}
                        className={styles.heroHashtagChip}
                      >
                        {hashtag}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {hasMetaRail ? (
              <JourneyHeroMetaRail
                lang={lang}
                labels={labels}
                authorName={authorName}
                authorHref={authorHref}
                hasTripPeriod={hasTripPeriod}
                periodStart={periodStart}
                periodEnd={periodEnd}
                periodStartLocal={periodStartLocal}
                periodEndLocal={periodEndLocal}
                publishedTimestamp={publishedTimestamp}
                photoCount={photoCount}
                sourceLanguage={sourceLanguage}
                showNativeName={showNativeName}
                className={styles.heroMetaRail}
              />
            ) : null}
          </div>
        </div>
      </div>

      {hasMetaRail ? (
        <JourneyHeroMetaRail
          lang={lang}
          labels={labels}
          authorName={authorName}
          authorHref={authorHref}
          hasTripPeriod={hasTripPeriod}
          periodStart={periodStart}
          periodEnd={periodEnd}
          periodStartLocal={periodStartLocal}
          periodEndLocal={periodEndLocal}
          publishedTimestamp={publishedTimestamp}
          photoCount={photoCount}
          sourceLanguage={sourceLanguage}
          showNativeName={showNativeName}
          className={styles.heroMetaRailMobile}
        />
      ) : null}
    </header>
  );
}
