import { cache } from "react";
import type {
    PublicUserItemDto,
    PublicUserProfileDto,
    PublicUserProfileResponseDto,
    PublicUsersResponseDto,
    PublishedJourneysResponseDto,
} from "@/src/apis/client";
import { fetchPublicApi } from "@/lib/public-api";

export type PublicUserApi = PublicUserItemDto & {
    biography?: string;
};

export type UserJourneyApi = {
    publicId: string;
    journeyId?: string;
    userId?: string;
    startedAt?: number;
    endedAt?: number;
    recapStage?: string;
    photoCount?: number;
    imageCount?: number;
    thumbnailUrl?: string;
    metadata?: Record<string, unknown>;
    publishedAt?: string;
    createdAt?: string;
    title?: string;
    description?: string;
    images?: Array<
        | {
            url?: string;
            imageUrl?: string;
            src?: string;
            photoId?: string;
        }
        | string
    >;
    coverUrl?: string;
};

type PublicUsersResponse = {
    status: string;
    data?: {
        users?: PublicUserApi[];
        total?: number;
        page?: number;
        pages?: number;
        limit?: number;
    };
};

type PublicUserProfileResponse = {
    status: string;
    data?: PublicUserProfileDto;
};

type PublishedJourneysResponse = {
    status: string;
    data?: {
        journeys?: UserJourneyApi[];
        total?: number;
        page?: number;
        pages?: number;
        limit?: number;
    };
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readText(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function readNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }

    return null;
}

function normalizeMetadata(value: unknown): Record<string, unknown> | undefined {
    return isRecord(value) ? value : undefined;
}

function normalizePublicUserItem(value: unknown): PublicUserApi | null {
    if (!isRecord(value)) {
        return null;
    }

    const userId = readText(value.userId);
    const name = readText(value.name);
    const publishedJourneyCount = readNumber(value.publishedJourneyCount);

    if (!userId || !name || publishedJourneyCount === null) {
        return null;
    }

    return {
        userId,
        name,
        picture: readText(value.picture) ?? undefined,
        publishedJourneyCount,
        biography: readText(value.biography) ?? undefined,
    };
}

function normalizePublicUserProfile(value: unknown): PublicUserProfileDto | null {
    if (!isRecord(value)) {
        return null;
    }

    const userId = readText(value.userId);
    const name = readText(value.name);
    const publishedJourneyCount = readNumber(value.publishedJourneyCount);

    if (!userId || !name || publishedJourneyCount === null) {
        return null;
    }

    return {
        userId,
        name,
        picture: readText(value.picture) ?? undefined,
        biography: readText(value.biography) ?? undefined,
        publishedJourneyCount,
    };
}

function normalizeJourneyTitleFromMetadata(
    metadata: Record<string, unknown> | undefined,
): string | undefined {
    if (!metadata) {
        return undefined;
    }

    return (
        readText(metadata.title) ??
        readText(metadata.journeyTitle) ??
        undefined
    );
}

function normalizeJourneyDescriptionFromMetadata(
    metadata: Record<string, unknown> | undefined,
): string | undefined {
    if (!metadata) {
        return undefined;
    }

    return (
        readText(metadata.description) ??
        readText(metadata.summary) ??
        undefined
    );
}

function normalizeUserJourney(value: unknown): UserJourneyApi | null {
    if (!isRecord(value)) {
        return null;
    }

    const publicId = readText(value.publicId);
    if (!publicId) {
        return null;
    }

    const metadata = normalizeMetadata(value.metadata);

    return {
        publicId,
        journeyId: readText(value.journeyId) ?? undefined,
        userId: readText(value.userId) ?? undefined,
        startedAt: readNumber(value.startedAt) ?? undefined,
        endedAt: readNumber(value.endedAt) ?? undefined,
        recapStage: readText(value.recapStage) ?? undefined,
        photoCount: readNumber(value.photoCount) ?? undefined,
        imageCount: readNumber(value.imageCount) ?? undefined,
        thumbnailUrl: readText(value.thumbnailUrl) ?? undefined,
        metadata,
        publishedAt: readText(value.publishedAt) ?? undefined,
        createdAt: readText(value.createdAt) ?? undefined,
        title:
            readText(value.title) ??
            normalizeJourneyTitleFromMetadata(metadata),
        description:
            readText(value.description) ??
            normalizeJourneyDescriptionFromMetadata(metadata),
        images: Array.isArray(value.images)
            ? (value.images as UserJourneyApi["images"])
            : undefined,
        coverUrl: readText(value.coverUrl) ?? undefined,
    };
}

export async function fetchPublicUsers(options?: {
    page?: number;
    limit?: number;
    sort?: "recent" | "oldest" | "mostJourneys";
}): Promise<PublicUsersResponse | null> {
    const { page = 1, limit = 100, sort = "recent" } = options ?? {};

    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
        });

        const response = await fetchPublicApi(
            `/v2/users/public?${params.toString()}`,
            { next: { revalidate: 3600 } },
        );

        if (!response || !response.ok) {
            return null;
        }

        const payload = (await response.json()) as
            | PublicUsersResponseDto
            | PublicUsersResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        const users = Array.isArray(payload.data.users)
            ? payload.data.users
                .map((item) => normalizePublicUserItem(item))
                .filter((item): item is PublicUserApi => Boolean(item))
            : [];

        return {
            status: payload.status,
            data: {
                users,
                total: readNumber(payload.data.total) ?? users.length,
                page: readNumber(payload.data.page) ?? page,
                pages: readNumber(payload.data.pages) ?? 1,
                limit: readNumber(payload.data.limit) ?? limit,
            },
        };
    } catch (error) {
        console.warn("[public-users] Failed to fetch public users", error);
        return null;
    }
}

export const fetchPublicUser = cache(async function fetchPublicUser(
    userId: string,
): Promise<PublicUserProfileDto | null> {
    try {
        const response = await fetchPublicApi(
            `/v2/users/public/${encodeURIComponent(userId)}`,
            { next: { revalidate: 3600 } },
        );

        if (!response || !response.ok) {
            return null;
        }

        const payload = (await response.json()) as
            | PublicUserProfileResponseDto
            | PublicUserProfileResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        return normalizePublicUserProfile(payload.data);
    } catch (error) {
        console.warn(
            "[public-users] Failed to fetch public user profile",
            error,
        );
        return null;
    }
});

export async function fetchUserJourneys(
    userId: string,
    options?: {
        page?: number;
        limit?: number;
        sort?: "recent" | "oldest";
    },
): Promise<PublishedJourneysResponse | null> {
    const { page = 1, limit = 100, sort = "recent" } = options ?? {};

    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
        });

        const response = await fetchPublicApi(
            `/v2/users/public/${encodeURIComponent(userId)}/journeys?${params.toString()}`,
            { next: { revalidate: 3600 } },
        );

        if (!response || !response.ok) {
            return null;
        }

        const payload = (await response.json()) as
            | PublishedJourneysResponseDto
            | PublishedJourneysResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        const journeys = Array.isArray(payload.data.journeys)
            ? payload.data.journeys
                .map((item) => normalizeUserJourney(item))
                .filter((item): item is UserJourneyApi => Boolean(item))
            : [];

        return {
            status: payload.status,
            data: {
                journeys,
                total: readNumber(payload.data.total) ?? journeys.length,
                page: readNumber(payload.data.page) ?? page,
                pages: readNumber(payload.data.pages) ?? 1,
                limit: readNumber(payload.data.limit) ?? limit,
            },
        };
    } catch (error) {
        console.warn(
            "[public-users] Failed to fetch user journeys",
            error,
        );
        return null;
    }
}
