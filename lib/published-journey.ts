export type JourneyMode = "ROUTE_STRONG" | "ROUTE_WEAK" | "ROUTE_NONE";

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

export type PublishedJourneyListItemApi = {
    publicId: string;
    journeyId: string;
    userId: string;
    startedAt: number;
    endedAt?: number;
    recapStage: string;
    imageCount: number;
    thumbnailUrl?: string;
    metadata?: Record<string, unknown>;
    publishedAt?: string;
    createdAt: string;
};

export type PublishedJourneysListApi = {
    journeys: PublishedJourneyListItemApi[];
    total: number;
    page: number;
    pages: number;
    limit: number;
};

export type PublishedPhotoApi = {
    photoId: string;
    url: string;
    takenAt?: number;
    locationName?: string;
    location?: {
        lat: number;
        lng: number;
    };
    caption?: string;
    journey: {
        publicId: string;
        title: string;
    };
};

type PublishedJourneyResponse = {
    status: string;
    data?: PublishedJourneyApi;
};

type PublishedJourneysResponse = {
    status: string;
    data?: PublishedJourneysListApi;
};

type PublishedPhotoResponse = {
    status: string;
    data?: PublishedPhotoApi;
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

export async function fetchPublishedJourneys(options?: {
    page?: number;
    limit?: number;
    sort?: "recent" | "oldest";
    userId?: string;
}): Promise<PublishedJourneysListApi | null> {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        return null;
    }

    const { page = 1, limit = 20, sort = "recent", userId } = options ?? {};

    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
        });

        if (userId) {
            params.set("userId", userId);
        }

        const response = await fetch(
            `${baseUrl}/v2/journeys/public?${params.toString()}`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PublishedJourneysResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        return payload.data;
    } catch (error) {
        console.warn(
            "[published-journey] Failed to fetch published journeys",
            error,
        );
        return null;
    }
}

export async function fetchPublishedPhoto(
    photoId: string,
): Promise<PublishedPhotoApi | null> {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        return null;
    }

    try {
        const response = await fetch(
            `${baseUrl}/v2/journeys/public/photos/${encodeURIComponent(photoId)}`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PublishedPhotoResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        return payload.data;
    } catch (error) {
        console.warn(
            "[published-journey] Failed to fetch published photo",
            error,
        );
        return null;
    }
}
