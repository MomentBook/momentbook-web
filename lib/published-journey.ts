export type JourneyMode = "ROUTE_STRONG" | "ROUTE_WEAK" | "ROUTE_NONE" | "PHOTO_ONLY";

export type PublishedJourneyImage = {
    url: string;
    photoId: string;
};

export type PublishedJourneyCluster = {
    clusterId: string;
    type: "STOP" | "ORPHAN";
    time: {
        startAt: number;
        endAt: number;
        durationMs: number;
    };
    center: {
        lat: number;
        lng: number;
    };
    locationName?: string;
    photoIds: string[];
};

export type PublishedJourneyApi = {
    publicId: string;
    userId: string;
    startedAt: number;
    endedAt: number;
    title: string;
    description?: string;
    mode: JourneyMode;
    photoCount: number;
    images: PublishedJourneyImage[];
    clusters: PublishedJourneyCluster[];
    publishedAt: string;
    createdAt: string;
};

type PublishedJourneyResponse = {
    status: string;
    data?: PublishedJourneyApi;
};

function getApiBaseUrl(): string | null {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        return null;
    }

    return baseUrl.replace(/\/+$/, "");
}

export async function fetchPublishedJourney(
    publicId: string,
): Promise<PublishedJourneyApi | null> {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        return null;
    }

    try {
        const response = await fetch(
            `${baseUrl}/v2/journeys/public/${encodeURIComponent(publicId)}`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PublishedJourneyResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        return payload.data;
    } catch (error) {
        console.warn(
            "[published-journey] Failed to fetch published journey",
            error,
        );
        return null;
    }
}
