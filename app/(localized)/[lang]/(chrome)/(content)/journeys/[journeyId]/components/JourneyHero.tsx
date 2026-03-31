import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateRange } from "@/components/LocalizedTime";
import { getHashtagSearchValue } from "@/lib/hashtags";
import { isRemoteImageSource } from "@/lib/image-source";
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

type JourneyHeroMetaItem = {
  key: string;
  label: string;
  value: ReactNode;
};

function JourneyHeroMetaRail({
  items,
  className,
}: {
  items: JourneyHeroMetaItem[];
  className: string;
}) {
  return (
    <dl className={className}>
      {items.map((item) => (
        <div key={item.key} className={styles.heroMetaItem}>
          <dt className={styles.heroMetaLabel}>{item.label}</dt>
          <dd className={styles.heroMetaContent}>{item.value}</dd>
        </div>
      ))}
    </dl>
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
  const showNativeName = sourceLanguage
    ? sourceLanguage.nativeName.localeCompare(sourceLanguage.displayName, undefined, {
        sensitivity: "accent",
      }) !== 0
    : false;
  const metaItems: JourneyHeroMetaItem[] = [];

  if (authorName) {
    metaItems.push({
      key: "author",
      label: labels.authorLabel,
      value: (
        <Link href={authorHref} className={styles.heroMetaLink}>
          {authorName}
        </Link>
      ),
    });
  }

  if (hasTripPeriod) {
    metaItems.push({
      key: "period",
      label: labels.periodLabel,
      value: (
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
      ),
    });
  } else if (publishedTimestamp) {
    metaItems.push({
      key: "published",
      label: labels.publishedLabel,
      value: (
        <span className={styles.heroMetaValue}>
          <LocalizedDate
            lang={lang}
            timestamp={publishedTimestamp}
            fallback="—"
          />
        </span>
      ),
    });
  }

  if (photoCount > 0) {
    metaItems.push({
      key: "photos",
      label: labels.photosStat,
      value: (
        <span className={styles.heroMetaValue}>
          {photoCount} {labels.photoCount}
        </span>
      ),
    });
  }

  if (sourceLanguage) {
    metaItems.push({
      key: "source-language",
      label: labels.originalLanguageLabel,
      value: (
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
      ),
    });
  }

  const hasMetaRail = metaItems.length > 0;

  return (
    <header className={styles.hero}>
      <div className={styles.heroCard}>
        <div className={styles.heroFrame}>
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 899px) 100vw, (max-width: 1199px) 92vw, 70rem"
            unoptimized={isRemoteImageSource(heroImage.url)}
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
            </div>
          </div>
        </div>

        {hasMetaRail ? (
          <div className={styles.heroMetaPanel}>
            <JourneyHeroMetaRail
              items={metaItems}
              className={styles.heroMetaRail}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
