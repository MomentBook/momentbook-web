import Image from "next/image";
import Link from "next/link";
import { LocalizedDate, LocalizedDateRange } from "@/components/LocalizedTime";
import type { Language } from "@/lib/i18n/config";
import { resolveJourneyPeriodRange } from "@/lib/journey-period";
import type { UserJourneyApi } from "@/lib/public-users";
import {
  asRecord,
  readText,
  resolveJourneyListCoverUrl,
} from "@/lib/view-helpers";
import type { UserPageLabels } from "./user-page.helpers";
import styles from "./user.module.scss";

const FALLBACK_COVER_SRC = "/images/placeholders/journey-cover-fallback.svg";

type UserJourneyCardProps = {
  journey: UserJourneyApi;
  lang: Language;
  labels: UserPageLabels;
};

function resolveJourneyMetadata(journey: UserJourneyApi) {
  const metadata = asRecord(journey.metadata);

  return {
    title: readText(metadata?.title),
    description: readText(metadata?.description),
  };
}

function getJourneyCoverUrl(journey: UserJourneyApi): string | null {
  return resolveJourneyListCoverUrl(journey);
}

function getJourneyPeriodRange(journey: UserJourneyApi) {
  return resolveJourneyPeriodRange({
    startedAt: journey.startedAt,
    endedAt: journey.endedAt,
    photoSources: [journey.images],
  });
}

function getJourneyPhotoCount(journey: UserJourneyApi): number {
  if (typeof journey.photoCount === "number" && Number.isFinite(journey.photoCount)) {
    return journey.photoCount;
  }

  if (typeof journey.imageCount === "number" && Number.isFinite(journey.imageCount)) {
    return journey.imageCount;
  }

  return 0;
}

export function UserJourneyCard({ journey, lang, labels }: UserJourneyCardProps) {
  const meta = resolveJourneyMetadata(journey);
  const journeyTitle = meta.title ?? readText(journey.title) ?? labels.untitledJourney;
  const journeyDescription = meta.description ?? readText(journey.description);
  const coverUrl = getJourneyCoverUrl(journey);
  const photoCount = getJourneyPhotoCount(journey);
  const periodRange = getJourneyPeriodRange(journey);

  return (
    <Link
      href={`/${lang}/journeys/${journey.publicId}`}
      className={styles.journeyCard}
      aria-label={journeyTitle}
    >
      <div className={styles.journeyCover}>
        <Image
          src={coverUrl ?? FALLBACK_COVER_SRC}
          alt={coverUrl ? journeyTitle : ""}
          aria-hidden={coverUrl ? undefined : true}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className={styles.journeyImage}
        />
        {photoCount > 0 ? (
          <span className={styles.photoBadge}>
            {photoCount} {labels.photos}
          </span>
        ) : null}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>{journeyTitle}</h3>
          <p className={styles.cardDescription}>
            {journeyDescription ?? "\u00A0"}
          </p>
        </div>

        <div className={styles.cardMeta}>
          <div className={styles.cardMetaRow}>
            <span className={styles.cardMetaLabel}>{labels.period}</span>
            <LocalizedDateRange
              lang={lang}
              start={periodRange.start}
              end={periodRange.end}
              fallback={labels.periodUnknown}
              className={styles.cardMetaValue}
            />
          </div>
          <div className={styles.cardMetaRow}>
            <span className={styles.cardMetaLabel}>{labels.publishedLabel}</span>
            <LocalizedDate
              lang={lang}
              timestamp={journey.publishedAt ? Date.parse(journey.publishedAt) : null}
              fallback={labels.unknownDateLabel}
              className={styles.cardMetaValueAccent}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
