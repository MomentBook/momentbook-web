import Image from "next/image";
import Link from "next/link";
import styles from "../journey.module.scss";
import type { JourneyMode, PublishedJourneyApi } from "@/lib/published-journey";
import ClientMap from "./ClientMap";

type JourneyContentProps = {
    journey: PublishedJourneyApi;
    imageMap: Map<string, string>;
    lang: string;
    labels: {
        places: string;
        gallery: string;
        routeTitle: string;
        routeBadgeStrong: string;
        routeBadgeWeak: string;
        routeBadgeNone: string;
        routeBadgePhotoOnly: string;
        routeLeadStrong: string;
        routeLeadWeak: string;
        routeLeadNone: string;
        routeLeadPhotoOnly: string;
        mapEmpty: string;
        locationFallback: string;
        photoCount: string;
    };
    locations: string[];
};

const routeBadgeByMode: Record<JourneyMode, keyof JourneyContentProps["labels"]> = {
    ROUTE_STRONG: "routeBadgeStrong",
    ROUTE_WEAK: "routeBadgeWeak",
    ROUTE_NONE: "routeBadgeNone",
    PHOTO_ONLY: "routeBadgePhotoOnly",
};

const routeLeadByMode: Record<JourneyMode, keyof JourneyContentProps["labels"]> = {
    ROUTE_STRONG: "routeLeadStrong",
    ROUTE_WEAK: "routeLeadWeak",
    ROUTE_NONE: "routeLeadNone",
    PHOTO_ONLY: "routeLeadPhotoOnly",
};

export default function JourneyContent({
    journey,
    imageMap,
    lang,
    labels,
    locations,
}: JourneyContentProps) {
    const badgeKey = routeBadgeByMode[journey.mode] ?? "routeBadgeNone";
    const leadKey = routeLeadByMode[journey.mode] ?? "routeLeadNone";
    const routeBadge = labels[badgeKey];
    const routeLead = labels[leadKey];

    return (
        <>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{labels.routeTitle}</h2>
                    <span className={styles.routeBadge}>{routeBadge}</span>
                </div>
                <p className={styles.sectionLead}>{routeLead}</p>
                {journey.clusters.length > 0 ? (
                    <ClientMap
                        clusters={journey.clusters}
                        mode={journey.mode}
                        locationFallback={labels.locationFallback}
                        photoLabel={labels.photoCount}
                    />
                ) : (
                    <div className={styles.mapPlaceholder}>{labels.mapEmpty}</div>
                )}
            </section>

            {locations.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{labels.places}</h2>
                    <div className={styles.tagGrid}>
                        {locations.map((location) => (
                            <span key={location} className={styles.tag}>
                                {location}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{labels.gallery}</h2>

                {journey.clusters.map((cluster) => {
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
                            {cluster.locationName && (
                                <h3 className={styles.clusterTitle}>
                                    {cluster.locationName}
                                </h3>
                            )}

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
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
