import Image from "next/image";
import Link from "next/link";
import styles from "../journey.module.scss";
import type { PublishedJourneyApi } from "@/lib/published-journey";
import ClientMap from "./ClientMap";
import { sortJourneyClustersByTimeline } from "../utils";

type JourneyContentProps = {
    journey: PublishedJourneyApi;
    imageMap: Map<string, string>;
    lang: string;
    labels: {
        gallery: string;
        routeTitle: string;
        mapEmpty: string;
        locationFallback: string;
        photoCount: string;
    };
};

export default function JourneyContent({
    journey,
    imageMap,
    lang,
    labels,
}: JourneyContentProps) {
    const orderedClusters = sortJourneyClustersByTimeline(journey.clusters);
    const encodedJourneyId = encodeURIComponent(journey.publicId);
    const fallbackPhotos = journey.images
        .map((image, index) => ({
            key: image.photoId || `${index}-${image.url}`,
            photoId: image.photoId || null,
            url: image.url,
            alt: image.locationName || journey.title,
        }))
        .filter((item) => Boolean(item.url));

    const clusteredSections = orderedClusters
        .map((cluster, index) => {
            const encodedClusterId = encodeURIComponent(cluster.clusterId);
            const clusterPhotos = cluster.photoIds
                .map((photoId) => {
                    const url = imageMap.get(photoId);
                    if (!url) {
                        return null;
                    }

                    return {
                        photoId,
                        url,
                    };
                })
                .filter((photo): photo is { photoId: string; url: string } => Boolean(photo));

            if (clusterPhotos.length === 0) {
                return null;
            }

            return {
                cluster,
                index,
                encodedClusterId,
                clusterPhotos,
            };
        })
        .filter(
            (
                section,
            ): section is {
                cluster: (typeof orderedClusters)[number];
                index: number;
                encodedClusterId: string;
                clusterPhotos: Array<{ photoId: string; url: string }>;
            } => Boolean(section),
        );

    const useFallbackGallery =
        clusteredSections.length === 0 && fallbackPhotos.length > 0;

    return (
        <>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{labels.routeTitle}</h2>
                </div>
                {orderedClusters.length > 0 ? (
    <ClientMap
      clusters={orderedClusters}
      mode={journey.mode}
      locationFallback={labels.locationFallback}
      photoLabel={labels.photoCount}
      lang={lang}
      journeyPublicId={journey.publicId}
    />
                ) : (
                    <div className={styles.mapPlaceholder}>{labels.mapEmpty}</div>
                )}
            </section>

            <section className={`${styles.section} ${styles.gallerySection}`}>
                <h2 className={`${styles.sectionTitle} ${styles.galleryTitle}`}>
                    {labels.gallery}
                </h2>

                {clusteredSections.map(({ cluster, index, encodedClusterId, clusterPhotos }) => (
                    <div
                        key={cluster.clusterId}
                        id={cluster.clusterId}
                        className={styles.clusterSection}
                    >
                        <div className={styles.clusterHeader}>
                            <span className={styles.clusterIndex}>
                                {index + 1}
                            </span>
                            <h3 className={styles.clusterTitle}>
                                <Link
                                    href={`/${lang}/journeys/${encodedJourneyId}/moments/${encodedClusterId}`}
                                    className={styles.clusterTitleLink}
                                >
                                    {cluster.locationName || labels.locationFallback}
                                </Link>
                            </h3>
                        </div>

                        <div className={styles.photoGrid}>
                            {clusterPhotos.map((photo) => (
                                <Link
                                    key={photo.photoId}
                                    href={`/${lang}/photos/${photo.photoId}`}
                                    className={styles.photoCard}
                                >
                                    <div className={styles.photoFrame}>
                                        <Image
                                            src={photo.url}
                                            alt={cluster.locationName || journey.title}
                                            fill
                                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1439px) 33vw, 25vw"
                                            className={styles.photoImage}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {useFallbackGallery ? (
                    <div className={styles.clusterSection}>
                        <div className={styles.photoGrid}>
                            {fallbackPhotos.map((photo) => {
                                if (photo.photoId) {
                                    return (
                                        <Link
                                            key={photo.key}
                                            href={`/${lang}/photos/${photo.photoId}`}
                                            className={styles.photoCard}
                                        >
                                            <div className={styles.photoFrame}>
                                                <Image
                                                    src={photo.url}
                                                    alt={photo.alt}
                                                    fill
                                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1439px) 33vw, 25vw"
                                                    className={styles.photoImage}
                                                />
                                            </div>
                                        </Link>
                                    );
                                }

                                return (
                                    <div key={photo.key} className={styles.photoCard}>
                                        <div className={styles.photoFrame}>
                                            <Image
                                                src={photo.url}
                                                alt={photo.alt}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1439px) 33vw, 25vw"
                                                className={styles.photoImage}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </section>
        </>
    );
}
