import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import type { PublishedPhotoApi } from "@/lib/published-journey";
import { LocalizedDateTime } from "./LocalizedDateTime";
import { PhotoViewer } from "./PhotoViewer";
import {
  formatCoordinates,
  type PhotoDisplayState,
  type PhotoPageCopy,
} from "./photo.helpers";
import styles from "./photo.module.scss";

type PhotoContentProps = {
  lang: Language;
  photoId: string;
  photo: PublishedPhotoApi;
  copy: PhotoPageCopy;
  display: PhotoDisplayState;
};

export function PhotoContent({
  lang,
  photoId,
  photo,
  copy,
  display,
}: PhotoContentProps) {
  const journeyHref = `/${lang}/journeys/${photo.journey.publicId}`;
  const showJourneyContext = Boolean(display.journeyTitle);
  const showCaptionBlock =
    Boolean(display.caption) && display.caption !== display.title;
  const showMetadata =
    display.hasTakenAt || Boolean(display.locationName) || Boolean(display.location);

  return (
    <>
      <header className={styles.archiveBar}>
        <Link href={journeyHref} className={styles.backLink}>
          <span aria-hidden="true">←</span>
          <span>{copy.backToJourney}</span>
        </Link>
      </header>

      <article className={styles.article}>
        <section className={styles.heroSection}>
          <PhotoViewer
            photoUrl={photo.url}
            alt={display.title || photoId}
            copy={copy}
          />
        </section>

        <section className={styles.contentSection}>
          {showJourneyContext ? (
            <div className={styles.contextBlock}>
              <Link href={journeyHref} className={styles.contextLink}>
                {display.journeyTitle}
              </Link>
            </div>
          ) : null}

          <h1
            className={`${styles.title} ${display.hasGeneratedTitle ? styles.generatedTitle : ""}`}
          >
            {display.title}
          </h1>

          {showCaptionBlock ? (
            <p className={styles.caption}>{display.caption}</p>
          ) : null}

          {showMetadata ? (
            <dl className={styles.metaList}>
              {display.hasTakenAt ? (
                <div className={styles.metaItem}>
                  <dt className={styles.metaLabel}>{copy.takenAt}</dt>
                  <dd className={styles.metaValue}>
                    <LocalizedDateTime
                      lang={lang}
                      timestamp={photo.takenAt}
                      localContext={display.captureTime}
                    />
                  </dd>
                </div>
              ) : null}

              {display.locationName ? (
                <div className={styles.metaItem}>
                  <dt className={styles.metaLabel}>{copy.location}</dt>
                  <dd className={styles.metaValue}>{display.locationName}</dd>
                </div>
              ) : null}

              {display.location ? (
                <div className={styles.metaItem}>
                  <dt className={styles.metaLabel}>{copy.coordinates}</dt>
                  <dd className={`${styles.metaValue} ${styles.metaMono}`}>
                    {formatCoordinates(display.location.lat, display.location.lng)}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </section>
      </article>
    </>
  );
}
