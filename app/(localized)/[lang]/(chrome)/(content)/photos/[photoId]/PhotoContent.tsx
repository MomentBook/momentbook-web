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
  return (
    <>
      <header className={styles.topBar}>
        <Link
          href={`/${lang}/journeys/${photo.journey.publicId}`}
          className={styles.backLink}
        >
          <span aria-hidden="true">←</span>
          {copy.backToJourney}
        </Link>
      </header>

      <section className={styles.hero}>
        <PhotoViewer
          lang={lang}
          photoUrl={photo.url}
          alt={display.title || photoId}
          copy={copy}
          locationName={display.locationName}
          takenAt={photo.takenAt}
        />
      </section>

      <section className={styles.contentSection}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 className={styles.title}>{display.title}</h1>
        {display.journeyTitle ? (
          <p className={styles.partOfLine}>
            {copy.partOfLabel}{" "}
            <Link
              href={`/${lang}/journeys/${photo.journey.publicId}`}
              className={styles.journeyLink}
            >
              {display.journeyTitle}
            </Link>
          </p>
        ) : null}

        {display.hasTakenAt || display.locationName || display.location ? (
          <dl className={styles.metaGrid}>
            {display.hasTakenAt ? (
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>
                  {copy.takenAt}
                </dt>
                <dd className={styles.metaValue}>
                  <LocalizedDateTime
                    lang={lang}
                    timestamp={photo.takenAt}
                  />
                </dd>
              </div>
            ) : null}

            {display.locationName ? (
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>
                  {copy.location}
                </dt>
                <dd className={styles.metaValue}>
                  {display.locationName}
                </dd>
              </div>
            ) : null}

            {display.location ? (
              <div className={`${styles.metaItem} ${styles.metaWide}`}>
                <dt className={styles.metaLabel}>
                  {copy.coordinates}
                </dt>
                <dd className={`${styles.metaValue} ${styles.metaMono}`}>
                  {formatCoordinates(display.location.lat, display.location.lng)}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <p className={styles.note}>
          <span className={styles.noteLabel}>{copy.archiveNoteLabel}</span>
          <span className={styles.noteBody}>{copy.archiveNoteBody}</span>
        </p>
      </section>
    </>
  );
}
