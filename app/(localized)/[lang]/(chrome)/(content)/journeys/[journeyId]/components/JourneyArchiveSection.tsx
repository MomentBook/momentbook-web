import Image from "next/image";
import Link from "next/link";
import { LocalizedDate } from "@/components/LocalizedTime";
import type { Language } from "@/lib/i18n/config";
import type { JourneyLabels } from "../labels";
import type { ArchivePhoto } from "./journey-content.helpers";
import styles from "./JourneyContent.module.scss";

type JourneyArchiveSectionProps = {
  lang: Language;
  labels: JourneyLabels;
  photos: ArchivePhoto[];
};

function JourneyArchivePhotoCard({
  lang,
  photo,
}: {
  lang: Language;
  photo: ArchivePhoto;
}) {
  const media = (
    <div className={styles.archivePhotoFrame}>
      <Image
        src={photo.url}
        alt={photo.alt}
        fill
        sizes="(max-width: 739px) 50vw, (max-width: 1099px) 33vw, 24vw"
        className={styles.photoImage}
      />
    </div>
  );

  const body = (
    <div className={styles.archivePhotoBody}>
      <p className={styles.archivePhotoLocation}>{photo.locationName}</p>
      {photo.takenAt ? (
        <div className={styles.archivePhotoMeta}>
          <LocalizedDate lang={lang} timestamp={photo.takenAt} fallback="—" />
        </div>
      ) : null}
    </div>
  );

  if (!photo.photoId) {
    return (
      <div key={photo.key} className={styles.archivePhotoCard}>
        {media}
        {body}
      </div>
    );
  }

  return (
    <Link
      key={photo.key}
      href={`/${lang}/photos/${encodeURIComponent(photo.photoId)}`}
      className={styles.archivePhotoCard}
    >
      {media}
      {body}
    </Link>
  );
}

export function JourneyArchiveSection({
  lang,
  labels,
  photos,
}: JourneyArchiveSectionProps) {
  return (
    <section className={styles.archiveSection}>
      <div className={styles.sectionIntro}>
        <h2 className={styles.sectionTitle}>{labels.photoArchiveTitle}</h2>
        <p className={styles.sectionLead}>{labels.photoArchiveLead}</p>
      </div>

      {photos.length > 0 ? (
        <div className={styles.archiveGrid}>
          {photos.map((photo) => (
            <JourneyArchivePhotoCard
              key={photo.key}
              lang={lang}
              photo={photo}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          {labels.photoArchiveEmpty}
        </div>
      )}
    </section>
  );
}
