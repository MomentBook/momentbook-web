import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { Language } from "@/lib/i18n/config";
import type {
  PublishedJourneyApi,
  PublishedJourneyCluster,
} from "@/lib/published-journey";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
import ClientMap from "../../components/ClientMap";
import { HashtagChipList } from "../../../components/HashtagChipList";
import styles from "./moment.module.scss";
import type { MomentLabels, MomentPhoto } from "./moment.helpers";

type MomentContentProps = {
  lang: Language;
  journey: PublishedJourneyApi;
  cluster: PublishedJourneyCluster;
  labels: MomentLabels;
  displayLocationName: string;
  clusterPhotos: MomentPhoto[];
};

export function MomentContent({
  lang,
  journey,
  cluster,
  labels,
  displayLocationName,
  clusterPhotos,
}: MomentContentProps) {
  const momentImpression = cluster.impression?.trim();

  return (
    <>
      <SectionReveal as="header" className={styles.header}>
        <Link
          href={`/${lang}/journeys/${journey.publicId}`}
          className={styles.backLink}
        >
          <span className={styles.backIcon} aria-hidden="true">
            ←
          </span>
          <span className={styles.backCopy}>
            <span className={styles.backJourney}>{journey.title}</span>
          </span>
        </Link>
      </SectionReveal>

      <SectionReveal as="section" className={styles.hero} delay={40}>
        <h1 className={styles.title}>{displayLocationName}</h1>
        <dl className={styles.metaList}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{labels.timeLabel}</dt>
            <dd className={styles.metaValue}>
              <LocalizedDateTimeRange
                lang={lang}
                start={cluster.time.startAt}
                end={cluster.time.endAt}
                startContext={cluster.time.startLocal}
                endContext={cluster.time.endLocal}
              />
            </dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{labels.photosLabel}</dt>
            <dd className={styles.metaValue}>{clusterPhotos.length}</dd>
          </div>
        </dl>
        {momentImpression ? (
          <p className={styles.impression}>{momentImpression}</p>
        ) : null}
        <HashtagChipList
          lang={lang}
          hashtags={journey.hashtags}
          title={labels.hashtagsTitle}
          rootClassName={styles.hashtagSection}
          titleClassName={styles.hashtagTitle}
          listClassName={styles.hashtagList}
          chipClassName={styles.hashtagChip}
        />
      </SectionReveal>

      <SectionReveal
        as="section"
        className={styles.mapSection}
        aria-labelledby="moment-map-title"
        delay={80}
      >
        <h2 id="moment-map-title" className={styles.visuallyHidden}>
          {labels.mapTitle}
        </h2>
        <div className={styles.mapFrame}>
          <ClientMap
            clusters={[cluster]}
            mode={journey.mode}
            locationFallback={labels.locationFallback}
            photoLabel={labels.photosLabel}
            lang={lang}
            journeyPublicId={journey.publicId}
          />
        </div>
      </SectionReveal>

      <SectionReveal
        as="section"
        className={styles.gallerySection}
        aria-labelledby="moment-gallery-title"
        delay={120}
      >
        <h2 id="moment-gallery-title" className={styles.galleryTitle}>
          {labels.galleryTitle}
        </h2>
        {clusterPhotos.length > 0 ? (
          <div className={styles.photoGrid}>
            {clusterPhotos.map((photo, index) => (
              <SectionReveal
                key={photo.photoId}
                asChild
                variant="item"
                staggerIndex={index}
                wrapperClassName={styles.photoGridItem}
              >
                <Link
                  href={`/${lang}/photos/${photo.photoId}`}
                  className={styles.photoCard}
                >
                  <div className={styles.photoFrame}>
                    <Image
                      src={photo.url}
                      alt={displayLocationName}
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 22vw"
                      unoptimized={shouldBypassImageOptimization(photo.url)}
                      className={styles.photoImage}
                    />
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>{labels.emptyPhotos}</div>
        )}
      </SectionReveal>
    </>
  );
}
