import type {
    PublishedJourneyApi,
    PublishedJourneyCluster,
    PublishedJourneyImage,
} from "@/lib/published-journey";

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

export function buildPhotoIdToImageUrlMap(
    journey: PublishedJourneyApi,
): Map<string, string> {
    const map = new Map<string, string>();

    journey.images.forEach((img) => {
        map.set(img.photoId, img.url);
    });

    return map;
}
