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

                {orderedClusters.map((cluster, index) => {
                    const encodedClusterId = encodeURIComponent(cluster.clusterId);
                    const clusterPhotos = cluster.photoIds
                        .map((photoId) => {
                            return {
                                url: imageMap.get(photoId),
                                photoId: photoId || "",
                            };
                        })
                        .filter((photo) => photo.photoId);

                    if (clusterPhotos.length === 0) return null;

                    return (
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
                                                src={photo.url as string}
                                                alt={
                                                    cluster.locationName ||
                                                    journey.title
                                                }
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1439px) 33vw, 25vw"
                                                className={styles.photoImage}
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
