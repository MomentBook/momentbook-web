import type { JourneyImage, JourneyInputSummary } from "@/lib/public-content";

export type PublishedJourneyApi = {
    publicId: string;
    userId?: string;
    journeyId: string;
    startedAt: number;
    endedAt?: number;
    recapDraft?: {
        inputSummary?: JourneyInputSummary;
        computed?: Record<string, any>;
    };
    recapStage?: "NONE" | "SYSTEM_DONE" | "USER_DONE" | "FINALIZED";
    images?: JourneyImage[];
    metadata?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;
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
