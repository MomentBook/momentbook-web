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
    authorName: string;
    publishedTimestamp: number | null;
    periodStart: number | null;
    periodEnd: number | null;
};

type MomentPhoto = {
    key: string;
    photoId: string | null;
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
    photos: MomentPhoto[];
};

const journeyFallbackImage = "/images/placeholders/journey-cover-fallback.svg";

function buildHeroImage(images: PublishedJourneyImage[], title: string): MomentPhoto {
    const firstImage = images[0];
    if (!firstImage) {
        return {
            key: "fallback-cover",
            photoId: null,
            url: journeyFallbackImage,
            alt: title,
        };
    }

    return {
        key: firstImage.photoId || firstImage.url,
        photoId: firstImage.photoId || null,
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

function buildClusterSections(
    journey: PublishedJourneyApi,
    photoImageMap: Map<string, string>,
    lang: Language,
    locationFallback: string,
): ClusterSection[] {
    const encodedJourneyId = encodeURIComponent(journey.publicId);

    return sortJourneyClustersByTimeline(journey.clusters)
        .map<ClusterSection | null>((cluster) => {
            const href = `/${lang}/journeys/${encodedJourneyId}/moments/${encodeURIComponent(cluster.clusterId)}`;
            const photos = cluster.photoIds
                .map<MomentPhoto | null>((photoId, index) => {
                    const url = photoImageMap.get(photoId);
                    if (!url) {
                        return null;
                    }

                    return {
                        key: `${cluster.clusterId}-${photoId}-${index}`,
                        photoId,
                        url,
                        alt: cluster.locationName || locationFallback,
                    };
                })
                .filter((photo): photo is MomentPhoto => Boolean(photo));

            if (photos.length === 0) {
                return null;
            }

            return {
                cluster,
                href,
                photos,
            };
        })
        .filter((section): section is ClusterSection => Boolean(section));
}

function renderMomentPhotoLink(
    lang: Language,
    photo: MomentPhoto,
    className: string,
    sizes: string,
    overflowCount = 0,
) {
    const frame = (
        <div className={className}>
            <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes={sizes}
                className={styles.photoImage}
            />
            {overflowCount > 0 ? (
                <span className={styles.photoOverflow}>+{overflowCount}</span>
            ) : null}
        </div>
    );

    if (!photo.photoId) {
        return <div key={photo.key}>{frame}</div>;
    }

    return (
        <Link
            key={photo.key}
            href={`/${lang}/photos/${encodeURIComponent(photo.photoId)}`}
        >
            {frame}
        </Link>
    );
}

function renderMomentGallery(lang: Language, photos: MomentPhoto[]) {
    const previewPhotos = photos.slice(0, 4);
    const overflowCount = Math.max(0, photos.length - previewPhotos.length);
    const sizes =
        previewPhotos.length === 1
            ? "(max-width: 739px) 100vw, (max-width: 1099px) 88vw, 72vw"
            : "(max-width: 739px) 50vw, (max-width: 1099px) 44vw, 36vw";

    if (previewPhotos.length === 0) {
        return null;
    }

    return (
        <div
            className={`${styles.photoShowcase} ${
                previewPhotos.length === 1
                    ? styles.photoShowcaseSingle
                    : styles.photoShowcaseGrid
            }`}
        >
            {previewPhotos.map((photo, index) =>
                renderMomentPhotoLink(
                    lang,
                    photo,
                    previewPhotos.length === 1
                        ? styles.showcaseHero
                        : styles.showcaseTile,
                    sizes,
                    index === previewPhotos.length - 1 ? overflowCount : 0,
                ),
            )}
        </div>
    );
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
                        <Link
                            href={`/${lang}/users/${encodedUserId}`}
                            className={styles.authorLink}
                        >
                            {authorName}
                        </Link>

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
                <section className={styles.momentsSection}>
                    {clusterSections.map((section, index) => (
                        <section
                            key={section.cluster.clusterId}
                            className={styles.momentSection}
                        >
                            <div className={styles.momentHeader}>
                                <span className={styles.momentIndex}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className={styles.momentCopy}>
                                    <h2 className={styles.momentTitle}>
                                        <Link
                                            href={section.href}
                                            className={styles.momentTitleLink}
                                        >
                                            {section.cluster.locationName ||
                                                labels.locationFallback}
                                        </Link>
                                    </h2>
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
                            </div>

                            {renderMomentGallery(lang, section.photos)}
                        </section>
                    ))}
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
