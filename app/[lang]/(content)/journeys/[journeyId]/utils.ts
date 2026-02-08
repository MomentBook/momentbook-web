import type { Language } from "@/lib/i18n/config";
import type {
    PublishedJourneyApi,
    PublishedJourneyCluster,
} from "@/lib/published-journey";

export function formatDateRange(lang: Language, start: number, end: number) {
    const formatter = new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const startDate = formatter.format(new Date(start));
    const endDate = formatter.format(new Date(end));

    if (startDate === endDate) {
        return startDate;
    }

    return `${startDate} – ${endDate}`;
}

export function formatDuration(ms: number, hoursLabel: string) {
    const hours = Math.round(ms / (1000 * 60 * 60));
    if (hours < 1) {
        const minutes = Math.round(ms / (1000 * 60));
        return `${minutes}m`;
    }
    return `${hours}${hoursLabel}`;
}

export function getUniqueLocations(
    clusters: PublishedJourneyCluster[],
): string[] {
    const locationSet = new Set<string>();
    clusters.forEach((cluster) => {
        if (cluster.locationName) {
            locationSet.add(cluster.locationName);
        }
    });
    return Array.from(locationSet);
}

export function buildImageUrlToPhotoIdMap(
    journey: PublishedJourneyApi,
): Map<string, string> {
    const map = new Map<string, string>();
    journey.images.forEach((img) => {
        map.set(img.photoId, img.url);
    });
    return map;
}
