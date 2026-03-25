import Image from "next/image";
import Link from "next/link";
import {
    LocalizedDate,
    LocalizedDateRange,
    LocalizedDateTimeRange,
} from "@/components/LocalizedTime";
import type { Language } from "@/lib/i18n/config";
import type {
    PublishedJourneyApi,
    PublishedJourneyCluster,
    PublishedJourneyImage,
} from "@/lib/published-journey";
import type { JourneyLabels } from "../labels";
import styles from "./JourneyContent.module.scss";
import { sortJourneyClustersByTimeline, sortJourneyImagesByCaptureTime } from "../utils";

type JourneyContentProps = {
    journey: PublishedJourneyApi;
    photoImageMap: Map<string, string>;
    lang: Language;
    labels: JourneyLabels;
    authorName: string | null;
    publishedTimestamp: number | null;
    periodStart: number | null;
    periodEnd: number | null;
};

type DisplayImage = {
    key: string;
    url: string;
    alt: string;
};

type ArchivePhoto = {
    key: string;
    photoId: string | null;
    url: string;
    alt: string;
    locationName: string;
    takenAt: number | null;
};

type ClusterSection = {
    cluster: PublishedJourneyCluster;
    href: string;
    coverPhoto: DisplayImage;
};

const journeyFallbackImage = "/images/placeholders/journey-cover-fallback.svg";

function buildHeroImage(images: PublishedJourneyImage[], title: string): DisplayImage {
    const firstImage = images[0];
    if (!firstImage) {
        return {
            key: "fallback-cover",
            url: journeyFallbackImage,
            alt: title,
        };
    }

    return {
        key: firstImage.photoId || firstImage.url,
        url: firstImage.url,
        alt: firstImage.locationName || title,
    };
}

function buildArchivePhotos(
    images: PublishedJourneyImage[],
    title: string,
    locationFallback: string,
): ArchivePhoto[] {
    return sortJourneyImagesByCaptureTime(images).map((image, index) => ({
        key: image.photoId || `${index}-${image.url}`,
        photoId: image.photoId || null,
        url: image.url,
        alt: image.locationName || title,
        locationName: image.locationName || locationFallback,
        takenAt: image.takenAt ?? null,
    }));
}

function buildClusterCoverPhoto(
    cluster: PublishedJourneyCluster,
    photoImageMap: Map<string, string>,
    title: string,
    locationFallback: string,
): DisplayImage {
    const firstPhotoId = cluster.photoIds.find((photoId) => photoImageMap.has(photoId));
    const url = firstPhotoId ? photoImageMap.get(firstPhotoId) : null;

    return {
        key: firstPhotoId
            ? `${cluster.clusterId}-${firstPhotoId}`
            : `${cluster.clusterId}-fallback`,
        url: url || journeyFallbackImage,
        alt: cluster.locationName || locationFallback || title,
    };
}

function buildClusterSections(
    journey: PublishedJourneyApi,
    photoImageMap: Map<string, string>,
    lang: Language,
    locationFallback: string,
): ClusterSection[] {
    const encodedJourneyId = encodeURIComponent(journey.publicId);

    return sortJourneyClustersByTimeline(journey.clusters)
        .map<ClusterSection>((cluster) => {
            const href = `/${lang}/journeys/${encodedJourneyId}/moments/${encodeURIComponent(cluster.clusterId)}`;
            return {
                cluster,
                href,
                coverPhoto: buildClusterCoverPhoto(
                    cluster,
                    photoImageMap,
                    journey.title,
                    locationFallback,
                ),
            };
        });
}

function renderArchivePhotoCard(
    lang: Language,
    photo: ArchivePhoto,
) {
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

export default function JourneyContent({
    journey,
    photoImageMap,
    lang,
    labels,
    authorName,
    publishedTimestamp,
    periodStart,
    periodEnd,
}: JourneyContentProps) {
    const heroImage = buildHeroImage(journey.images, journey.title);
    const archivePhotos = buildArchivePhotos(
        journey.images,
        journey.title,
        labels.locationFallback,
    );
    const clusterSections = buildClusterSections(
        journey,
        photoImageMap,
        lang,
        labels.locationFallback,
    );
    const hasClusters = clusterSections.length > 0;
    const photoCount = journey.photoCount > 0 ? journey.photoCount : journey.images.length;
    const encodedUserId = encodeURIComponent(journey.userId);
    const hasTripPeriod = periodStart !== null || periodEnd !== null;

    return (
        <article className={styles.shell}>
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

            {hasClusters ? (
                <section
                    className={styles.momentsSection}
                    aria-labelledby="journey-moments-title"
                >
                    <div className={styles.sectionIntro}>
                        <h2
                            id="journey-moments-title"
                            className={styles.sectionTitle}
                        >
                            {labels.momentsTitle}
                        </h2>
                    </div>

                    <ol className={styles.momentList}>
                        {clusterSections.map((section, index) => (
                            <li
                                key={section.cluster.clusterId}
                                className={styles.momentListItem}
                            >
                                <Link
                                    href={section.href}
                                    className={styles.momentCard}
                                >
                                    <div className={styles.momentThumb}>
                                        <Image
                                            src={section.coverPhoto.url}
                                            alt={section.coverPhoto.alt}
                                            fill
                                            sizes="(max-width: 739px) 5.25rem, 7rem"
                                            className={styles.photoImage}
                                        />
                                    </div>

                                    <div className={styles.momentCardBody}>
                                        <div className={styles.momentCardTop}>
                                            <span className={styles.momentIndex}>
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span
                                                className={styles.momentChevron}
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        </div>

                                        <h3 className={styles.momentTitle}>
                                            {section.cluster.locationName ||
                                                labels.locationFallback}
                                        </h3>

                                        <div className={styles.momentMeta}>
                                            <LocalizedDateTimeRange
                                                lang={lang}
                                                start={section.cluster.time.startAt}
                                                end={section.cluster.time.endAt}
                                                fallback="—"
                                            />
                                            <span>
                                                {section.cluster.photoIds.length}{" "}
                                                {labels.photoCount}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </section>
            ) : (
                <section className={styles.archiveSection}>
                    <div className={styles.sectionIntro}>
                        <h2 className={styles.sectionTitle}>{labels.photoArchiveTitle}</h2>
                        <p className={styles.sectionLead}>{labels.photoArchiveLead}</p>
                    </div>

                    {archivePhotos.length > 0 ? (
                        <div className={styles.archiveGrid}>
                            {archivePhotos.map((photo) =>
                                renderArchivePhotoCard(lang, photo),
                            )}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            {labels.photoArchiveEmpty}
                        </div>
                    )}
                </section>
            )}
        </article>
    );
}
