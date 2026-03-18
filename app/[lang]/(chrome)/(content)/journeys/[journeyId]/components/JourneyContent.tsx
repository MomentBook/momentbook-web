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
import ClientMap from "./ClientMap";
import {
    buildJourneyLocationSummaries,
    buildMomentAnchorId,
    formatDuration,
    sortJourneyClustersByTimeline,
    sortJourneyImagesByCaptureTime,
} from "../utils";

type JourneyContentProps = {
    journey: PublishedJourneyApi;
    photoImageMap: Map<string, string>;
    lang: Language;
    labels: JourneyLabels;
    authorName: string;
    publishedTimestamp: number | null;
    periodStart: number | null;
    periodEnd: number | null;
    totalDuration: number;
    locationCount: number;
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
    anchorId: string;
    href: string;
    photos: MomentPhoto[];
};

const journeyFallbackImage = "/images/placeholders/journey-cover-fallback.svg";

function buildHeroImages(images: PublishedJourneyImage[], title: string): MomentPhoto[] {
    if (images.length === 0) {
        return [
            {
                key: "fallback-cover",
                photoId: null,
                url: journeyFallbackImage,
                alt: title,
            },
        ];
    }

    return images.slice(0, 3).map((image, index) => ({
        key: image.photoId || `${index}-${image.url}`,
        photoId: image.photoId || null,
        url: image.url,
        alt: image.locationName || title,
    }));
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
                anchorId: buildMomentAnchorId(cluster.clusterId),
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
    const previewPhotos = photos.slice(0, 3);
    const overflowCount = Math.max(0, photos.length - previewPhotos.length);
    const sizes = "(max-width: 739px) 100vw, (max-width: 1099px) 64vw, 40vw";

    if (previewPhotos.length === 1) {
        const photo = previewPhotos[0];
        if (!photo) {
            return null;
        }

        return (
            <div className={`${styles.photoShowcase} ${styles.photoShowcaseSingle}`}>
                {renderMomentPhotoLink(lang, photo, styles.showcasePrimary, sizes)}
            </div>
        );
    }

    if (previewPhotos.length === 2) {
        return (
            <div className={`${styles.photoShowcase} ${styles.photoShowcasePair}`}>
                {previewPhotos.map((photo) =>
                    renderMomentPhotoLink(lang, photo, styles.showcaseCell, sizes),
                )}
            </div>
        );
    }

    const [firstPhoto, secondPhoto, thirdPhoto] = previewPhotos;

    if (!firstPhoto || !secondPhoto || !thirdPhoto) {
        return null;
    }

    return (
        <div className={`${styles.photoShowcase} ${styles.photoShowcaseTriptych}`}>
            {renderMomentPhotoLink(lang, firstPhoto, styles.showcasePrimary, sizes)}
            <div className={styles.showcaseStack}>
                {renderMomentPhotoLink(lang, secondPhoto, styles.showcaseCell, sizes)}
                {renderMomentPhotoLink(
                    lang,
                    thirdPhoto,
                    styles.showcaseCell,
                    sizes,
                    overflowCount,
                )}
            </div>
        </div>
    );
}

function renderArchivePhotoCard(
    lang: Language,
    photo: ArchivePhoto,
    labels: JourneyLabels,
) {
    const media = (
        <div className={styles.archivePhotoFrame}>
            <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(max-width: 739px) 100vw, (max-width: 1099px) 50vw, 33vw"
                className={styles.photoImage}
            />
        </div>
    );

    const body = (
        <div className={styles.archivePhotoBody}>
            <p className={styles.archivePhotoLocation}>{photo.locationName}</p>
            {photo.takenAt ? (
                <div className={styles.archivePhotoMeta}>
                    <span>{labels.capturedAtLabel}</span>
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
    totalDuration,
    locationCount,
}: JourneyContentProps) {
    const heroImages = buildHeroImages(journey.images, journey.title);
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
    const locationSummaries = buildJourneyLocationSummaries(journey).slice(0, 6);
    const contentGridClassName = [
        styles.contentGrid,
        !hasClusters && locationSummaries.length === 0 ? styles.contentGridSingle : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <article className={styles.shell}>
            <header className={styles.hero}>
                <div className={styles.heroMedia}>
                    <div className={styles.heroPrimaryFrame}>
                        <Image
                            src={heroImages[0]?.url ?? journeyFallbackImage}
                            alt={heroImages[0]?.alt ?? journey.title}
                            fill
                            priority
                            sizes="(max-width: 1099px) 100vw, 58vw"
                            className={styles.heroImage}
                        />
                    </div>

                    {heroImages.length > 1 ? (
                        <div className={styles.heroSecondaryStack}>
                            {heroImages.slice(1).map((photo) => (
                                <div key={photo.key} className={styles.heroSecondaryFrame}>
                                    <Image
                                        src={photo.url}
                                        alt={photo.alt}
                                        fill
                                        sizes="(max-width: 1099px) 50vw, 18vw"
                                        className={styles.heroImage}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroIntro}>
                        <p className={styles.eyebrow}>{labels.eyebrow}</p>
                        <h1 className={styles.title}>{journey.title}</h1>
                        {journey.description ? (
                            <p className={styles.description}>{journey.description}</p>
                        ) : null}
                    </div>

                    <div className={styles.heroMetaLine}>
                        <Link
                            href={`/${lang}/users/${encodedUserId}`}
                            className={styles.authorLink}
                        >
                            {authorName}
                        </Link>
                        {publishedTimestamp ? (
                            <span className={styles.heroMetaInline}>
                                <span className={styles.heroMetaInlineLabel}>
                                    {labels.publishedLabel}
                                </span>
                                <LocalizedDate
                                    lang={lang}
                                    timestamp={publishedTimestamp}
                                    fallback="—"
                                />
                            </span>
                        ) : null}
                    </div>

                    <div className={styles.heroMetaGrid}>
                        <div className={styles.metaCard}>
                            <span className={styles.metaLabel}>{labels.periodLabel}</span>
                            <span className={styles.metaValue}>
                                <LocalizedDateRange
                                    lang={lang}
                                    start={periodStart}
                                    end={periodEnd}
                                    fallback="—"
                                />
                            </span>
                        </div>

                        <div className={styles.metaCard}>
                            <span className={styles.metaLabel}>{labels.photosStat}</span>
                            <span className={styles.metaValue}>
                                {photoCount} {labels.photoCount}
                            </span>
                        </div>

                        <div className={styles.metaCard}>
                            <span className={styles.metaLabel}>{labels.placesStat}</span>
                            <span className={styles.metaValue}>
                                {locationCount} {labels.locationCount}
                            </span>
                        </div>

                        <div className={styles.metaCard}>
                            <span className={styles.metaLabel}>{labels.durationStat}</span>
                            <span className={styles.metaValue}>
                                {totalDuration > 0
                                    ? formatDuration(
                                          totalDuration,
                                          labels.hours,
                                          labels.minutes,
                                      )
                                    : "—"}
                            </span>
                        </div>
                    </div>

                    {locationSummaries.length > 0 ? (
                        <div className={styles.locationChips}>
                            {locationSummaries.map((location) => (
                                <span key={location.name} className={styles.locationChip}>
                                    {location.name}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
            </header>

            <div className={contentGridClassName}>
                {(hasClusters || locationSummaries.length > 0) ? (
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarStack}>
                            {hasClusters ? (
                                <section className={styles.sidebarCard}>
                                    <div className={styles.sidebarHeader}>
                                        <h2 className={styles.sidebarTitle}>
                                            {labels.routeTitle}
                                        </h2>
                                    </div>
                                    <ClientMap
                                        clusters={clusterSections.map((section) => section.cluster)}
                                        mode={journey.mode}
                                        locationFallback={labels.locationFallback}
                                        photoLabel={labels.photoCount}
                                        lang={lang}
                                        journeyPublicId={journey.publicId}
                                    />
                                </section>
                            ) : null}

                            {clusterSections.length > 1 ? (
                                <nav className={styles.sidebarCard} aria-label={labels.jumpTitle}>
                                    <div className={styles.sidebarHeader}>
                                        <h2 className={styles.sidebarTitle}>
                                            {labels.jumpTitle}
                                        </h2>
                                    </div>
                                    <div className={styles.jumpList}>
                                        {clusterSections.map((section, index) => (
                                            <a
                                                key={section.cluster.clusterId}
                                                href={`#${section.anchorId}`}
                                                className={styles.jumpLink}
                                            >
                                                <span className={styles.jumpIndex}>
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className={styles.jumpLabel}>
                                                    {section.cluster.locationName ||
                                                        labels.locationFallback}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            ) : null}

                            {locationSummaries.length > 0 ? (
                                <section className={styles.sidebarCard}>
                                    <div className={styles.sidebarHeader}>
                                        <h2 className={styles.sidebarTitle}>{labels.places}</h2>
                                    </div>
                                    <div className={styles.placeList}>
                                        {locationSummaries.map((location) => (
                                            <div
                                                key={location.name}
                                                className={styles.placeRow}
                                            >
                                                <span className={styles.placeName}>
                                                    {location.name}
                                                </span>
                                                <span className={styles.placeCount}>
                                                    {location.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ) : null}
                        </div>
                    </aside>
                ) : null}

                <main className={styles.mainColumn}>
                    {hasClusters ? (
                        <section className={styles.sectionCard}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>{labels.momentsTitle}</h2>
                            </div>

                            <div className={styles.momentList}>
                                {clusterSections.map((section, index) => (
                                    <section
                                        key={section.cluster.clusterId}
                                        id={section.anchorId}
                                        className={styles.momentCard}
                                    >
                                        <div className={styles.momentHeader}>
                                            <span className={styles.momentSequence}>
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <div className={styles.momentIntro}>
                                                <div className={styles.momentTitleRow}>
                                                    <div className={styles.momentCopy}>
                                                        <h3 className={styles.momentTitle}>
                                                            {section.cluster.locationName ||
                                                                labels.locationFallback}
                                                        </h3>
                                                        <div className={styles.momentMeta}>
                                                            <LocalizedDateTimeRange
                                                                lang={lang}
                                                                start={
                                                                    section.cluster.time.startAt
                                                                }
                                                                end={section.cluster.time.endAt}
                                                                fallback="—"
                                                            />
                                                            {section.cluster.time.durationMs > 0 ? (
                                                                <span>
                                                                    {formatDuration(
                                                                        section.cluster.time.durationMs,
                                                                        labels.hours,
                                                                        labels.minutes,
                                                                    )}
                                                                </span>
                                                            ) : null}
                                                            <span>
                                                                {section.cluster.photoIds.length}{" "}
                                                                {labels.photoCount}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        href={section.href}
                                                        className={styles.momentCta}
                                                    >
                                                        {labels.momentCta}
                                                    </Link>
                                                </div>

                                                {renderMomentGallery(lang, section.photos)}
                                            </div>
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </section>
                    ) : (
                        <section className={styles.sectionCard}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>
                                    {labels.photoArchiveTitle}
                                </h2>
                                <p className={styles.sectionLead}>
                                    {labels.photoArchiveLead}
                                </p>
                            </div>

                            {archivePhotos.length > 0 ? (
                                <div className={styles.archiveGrid}>
                                    {archivePhotos.map((photo) =>
                                        renderArchivePhotoCard(lang, photo, labels),
                                    )}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    {labels.photoArchiveEmpty}
                                </div>
                            )}
                        </section>
                    )}
                </main>
            </div>
        </article>
    );
}
