import Link from "next/link";
import { LocalizedDateRange } from "@/components/LocalizedTime";
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
  const showMobileMeta = display.hasTakenAt || Boolean(display.locationName);
  const showDesktopMeta =
    display.hasTakenAt || Boolean(display.locationName) || Boolean(display.location);
  const showCaptionBlock =
    Boolean(display.caption) && display.caption !== display.title;
  const hasJourneyDateRange = Boolean(
    photo.journey.startedAt ||
      photo.journey.endedAt ||
      photo.journey.startedAtLocal ||
      photo.journey.endedAtLocal,
  );

  const renderJourneyDateRange = (className: string) =>
    hasJourneyDateRange ? (
      <LocalizedDateRange
        lang={lang}
        start={photo.journey.startedAt}
        end={photo.journey.endedAt}
        startContext={photo.journey.startedAtLocal}
        endContext={photo.journey.endedAtLocal}
        className={className}
      />
    ) : null;

  return (
    <>
      <header className={styles.archiveBar}>
        <Link href={journeyHref} className={styles.backLink}>
          <span aria-hidden="true">←</span>
          <span>{copy.backToJourney}</span>
        </Link>
        <p className={styles.archiveMarker}>{copy.archiveMarker}</p>
        <div className={styles.archiveSpacer} aria-hidden="true" />
      </header>

      <section className={styles.hero}>
        <div className={styles.heroStage}>
          <PhotoViewer
            lang={lang}
            photoUrl={photo.url}
            alt={display.title || photoId}
            copy={copy}
            locationName={display.locationName}
            takenAt={photo.takenAt}
            captureTime={display.captureTime}
          />
        </div>

        {(showJourneyContext || showDesktopMeta) ? (
          <aside className={styles.heroRail} aria-label={copy.archiveMarker}>
            {showJourneyContext ? (
              <div className={styles.contextBlock}>
                <p className={styles.metaLabel}>{copy.partOfLabel}</p>
                <Link href={journeyHref} className={styles.journeyLink}>
                  {display.journeyTitle}
                </Link>
                {renderJourneyDateRange(styles.contextSubline)}
              </div>
            ) : null}

            {showDesktopMeta ? (
              <dl className={styles.railMeta}>
                {display.hasTakenAt ? (
                  <div className={styles.railMetaItem}>
                    <dt className={styles.metaLabel}>{copy.takenAt}</dt>
                    <dd className={styles.railValue}>
                      <LocalizedDateTime
                        lang={lang}
                        timestamp={photo.takenAt}
                        localContext={display.captureTime}
                      />
                    </dd>
                  </div>
                ) : null}

                {display.locationName ? (
                  <div className={styles.railMetaItem}>
                    <dt className={styles.metaLabel}>{copy.location}</dt>
                    <dd className={styles.railValue}>{display.locationName}</dd>
                  </div>
                ) : null}

                {display.location ? (
                  <div className={styles.railMetaItem}>
                    <dt className={styles.metaLabel}>{copy.coordinates}</dt>
                    <dd className={`${styles.railValue} ${styles.metaMono}`}>
                      {formatCoordinates(display.location.lat, display.location.lng)}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </aside>
        ) : null}
      </section>

      <section className={styles.editorial}>
        {showJourneyContext ? (
          <div className={styles.mobileContext}>
            <p className={styles.metaLabel}>{copy.partOfLabel}</p>
            <Link href={journeyHref} className={styles.mobileContextLink}>
              {display.journeyTitle}
            </Link>
            {renderJourneyDateRange(styles.mobileContextDates)}
          </div>
        ) : null}

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{display.title}</h1>
        </div>

        {showCaptionBlock ? (
          <div className={styles.narrativeBlock}>
            <p className={styles.narrativeText}>{display.caption}</p>
          </div>
        ) : null}

        {showMobileMeta ? (
          <dl className={styles.mobileMetaGrid}>
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
          </dl>
        ) : null}

        {display.location ? (
          <section className={styles.mapSection} aria-labelledby="photo-coordinates-title">
            <div className={styles.mapHeader}>
              <p id="photo-coordinates-title" className={styles.metaLabel}>
                {copy.coordinates}
              </p>
              {display.locationName ? (
                <p className={styles.mapLocation}>{display.locationName}</p>
              ) : null}
              <p className={`${styles.mapCoordinates} ${styles.metaMono}`}>
                {formatCoordinates(display.location.lat, display.location.lng)}
              </p>
            </div>

            <div className={styles.mapVisual} aria-hidden="true">
              <div className={styles.mapGrid} />
              <span className={styles.mapPin} />
            </div>
          </section>
        ) : null}

        <section className={styles.archiveNoteSection}>
          <div className={styles.archiveNoteSurface}>
            <div className={styles.archiveNoteBlock}>
              <p className={styles.noteLabel}>{copy.archiveNoteLabel}</p>
              <p className={styles.noteBody}>{copy.archiveNoteBody}</p>
            </div>

            <div className={styles.archiveSummaryGrid}>
              {showJourneyContext ? (
                <div className={styles.summaryItem}>
                  <p className={styles.metaLabel}>{copy.partOfLabel}</p>
                  <Link href={journeyHref} className={styles.summaryLink}>
                    {display.journeyTitle}
                  </Link>
                  {renderJourneyDateRange(styles.summarySubline)}
                </div>
              ) : null}

              {display.hasTakenAt ? (
                <div className={styles.summaryItem}>
                  <p className={styles.metaLabel}>{copy.takenAt}</p>
                  <p className={styles.summaryValue}>
                    <LocalizedDateTime
                      lang={lang}
                      timestamp={photo.takenAt}
                      localContext={display.captureTime}
                    />
                  </p>
                </div>
              ) : null}

              {display.locationName ? (
                <div className={styles.summaryItem}>
                  <p className={styles.metaLabel}>{copy.location}</p>
                  <p className={styles.summaryValue}>{display.locationName}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
