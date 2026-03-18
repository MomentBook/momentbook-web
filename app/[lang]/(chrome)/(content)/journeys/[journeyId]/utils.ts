import type {
    PublishedJourneyApi,
    PublishedJourneyCluster,
    PublishedJourneyImage,
} from "@/lib/published-journey";

export type JourneyLocationSummary = {
    name: string;
    count: number;
};

export function formatDuration(
    ms: number,
    hoursLabel: string,
    minutesLabel: string,
) {
    const hours = Math.round(ms / (1000 * 60 * 60));
    if (hours < 1) {
        const minutes = Math.round(ms / (1000 * 60));
        return `${minutes}${minutesLabel}`;
    }

    return `${hours}${hoursLabel}`;
}

export function sortJourneyClustersByTimeline(
    clusters: PublishedJourneyCluster[],
): PublishedJourneyCluster[] {
    return [...clusters].sort((a, b) => {
        const startTimeDiff = a.time.startAt - b.time.startAt;
        if (startTimeDiff !== 0) {
            return startTimeDiff;
        }

        return a.clusterId.localeCompare(b.clusterId);
    });
}

export function sortJourneyImagesByCaptureTime(
    images: PublishedJourneyImage[],
): PublishedJourneyImage[] {
    return [...images].sort((a, b) => {
        const aTime = a.takenAt ?? Number.MAX_SAFE_INTEGER;
        const bTime = b.takenAt ?? Number.MAX_SAFE_INTEGER;

        if (aTime !== bTime) {
            return aTime - bTime;
        }

        return a.url.localeCompare(b.url);
    });
}

export function getUniqueJourneyLocations(
    journey: Pick<PublishedJourneyApi, "clusters" | "images">,
): string[] {
    const locationSet = new Set<string>();

    for (const cluster of journey.clusters) {
        if (cluster.locationName) {
            locationSet.add(cluster.locationName);
        }
    }

    if (locationSet.size > 0) {
        return Array.from(locationSet);
    }

    for (const image of journey.images) {
        if (image.locationName) {
            locationSet.add(image.locationName);
        }
    }

    return Array.from(locationSet);
}

export function buildJourneyLocationSummaries(
    journey: Pick<PublishedJourneyApi, "clusters" | "images">,
): JourneyLocationSummary[] {
    const counts = new Map<string, number>();

    const addLocation = (name: string | undefined, count: number) => {
        const normalized = name?.trim();
        if (!normalized) {
            return;
        }

        counts.set(normalized, (counts.get(normalized) ?? 0) + Math.max(count, 1));
    };

    if (journey.clusters.length > 0) {
        for (const cluster of journey.clusters) {
            addLocation(cluster.locationName, cluster.photoIds.length);
        }
    } else {
        for (const image of journey.images) {
            addLocation(image.locationName, 1);
        }
    }

    return [...counts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => {
            if (b.count !== a.count) {
                return b.count - a.count;
            }

            return a.name.localeCompare(b.name);
        });
}

export function buildPhotoIdToImageUrlMap(
    journey: PublishedJourneyApi,
): Map<string, string> {
    const map = new Map<string, string>();

    journey.images.forEach((img) => {
        map.set(img.photoId, img.url);
    });

    return map;
}

export function buildMomentAnchorId(clusterId: string) {
    return `moment-${clusterId.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
