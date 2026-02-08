import Image from "next/image";
import Link from "next/link";
import styles from "../journey.module.scss";
import type { JourneyMode, PublishedJourneyApi } from "@/lib/published-journey";
import ClientMap from "./ClientMap";
import { sortJourneyClustersByTimeline } from "../utils";

type JourneyContentProps = {
    journey: PublishedJourneyApi;
    imageMap: Map<string, string>;
    lang: string;
    labels: {
        gallery: string;
        routeTitle: string;
        routeBadgeStrong: string;
        routeBadgeWeak: string;
        routeBadgeNone: string;
        routeLeadStrong: string;
        routeLeadWeak: string;
        routeLeadNone: string;
        mapEmpty: string;
        locationFallback: string;
        photoCount: string;
    };
};

const routeBadgeByMode: Record<JourneyMode, keyof JourneyContentProps["labels"]> = {
    ROUTE_STRONG: "routeBadgeStrong",
    ROUTE_WEAK: "routeBadgeWeak",
    ROUTE_NONE: "routeBadgeNone",
};

const routeLeadByMode: Record<JourneyMode, keyof JourneyContentProps["labels"]> = {
    ROUTE_STRONG: "routeLeadStrong",
    ROUTE_WEAK: "routeLeadWeak",
    ROUTE_NONE: "routeLeadNone",
};

export default function JourneyContent({
    journey,
    imageMap,
    lang,
    labels,
}: JourneyContentProps) {
    const badgeKey = routeBadgeByMode[journey.mode] ?? "routeBadgeNone";
    const leadKey = routeLeadByMode[journey.mode] ?? "routeLeadNone";
    const routeBadge = labels[badgeKey];
    const routeLead = labels[leadKey];
    const orderedClusters = sortJourneyClustersByTimeline(journey.clusters);
    const encodedJourneyId = encodeURIComponent(journey.publicId);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{labels.routeTitle}</h2>
                    <span className={styles.routeBadge}>{routeBadge}</span>
                </div>
                <p className={styles.sectionLead}>{routeLead}</p>
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

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{labels.gallery}</h2>

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
