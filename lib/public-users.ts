import { cache } from "react";
import type {
    PublicUserItemDto,
    PublicUserProfileDto,
    PublicUserProfileResponseDto,
    PublicUsersResponseDto,
    PublishedJourneysResponseDto,
} from "@/src/apis/client";
import { PUBLIC_USER_REVALIDATE_SECONDS } from "@/lib/cache-policy";
import { normalizeHashtags } from "@/lib/hashtags";
import { appendPublicApiLanguage, fetchPublicApi } from "@/lib/public-api";
import type { Language } from "@/lib/i18n/config";
import {
    normalizeLocalDateTimeContext,
    type LocalDateTimeContext,
} from "@/lib/local-time-context";

export type PublicUserApi = PublicUserItemDto & {
    biography?: string;
};

export type UserJourneyApi = {
    publicId: string;
    journeyId?: string;
    userId?: string;
    startedAt?: number;
    endedAt?: number;
    startedAtLocal?: LocalDateTimeContext | null;
    endedAtLocal?: LocalDateTimeContext | null;
    recapStage?: string;
    photoCount?: number;
    imageCount?: number;
    thumbnailUrl?: string;
    metadata?: Record<string, unknown>;
    publishedAt?: string;
    createdAt?: string;
    title?: string;
    description?: string;
    hashtags?: string[];
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

function normalizeJourneyHashtagsFromMetadata(
    metadata: Record<string, unknown> | undefined,
): string[] {
    if (!metadata) {
        return [];
    }

    const candidates = Array.isArray(metadata.hashtags)
        ? metadata.hashtags
        : Array.isArray(metadata.localizedHashtags)
            ? metadata.localizedHashtags
            : [];

    return normalizeHashtags(
        candidates.map((value) => (typeof value === "string" ? value : null)),
    );
}

function normalizeJourneyHashtags(value: Record<string, unknown>, metadata: Record<string, unknown> | undefined): string[] {
    const inlineHashtags = Array.isArray(value.hashtags)
        ? value.hashtags
        : [];

    return normalizeHashtags([
        ...normalizeJourneyHashtagsFromMetadata(metadata),
        ...inlineHashtags.map((item) => (typeof item === "string" ? item : null)),
    ]);
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
        startedAtLocal: normalizeLocalDateTimeContext(value.startedAtLocal),
        endedAtLocal: normalizeLocalDateTimeContext(value.endedAtLocal),
        recapStage: readText(value.recapStage) ?? undefined,
        photoCount: readNumber(value.photoCount) ?? undefined,
        imageCount: readNumber(value.imageCount) ?? undefined,
        thumbnailUrl: readText(value.thumbnailUrl) ?? undefined,
        metadata,
        publishedAt: readText(value.publishedAt) ?? undefined,
        createdAt: readText(value.createdAt) ?? undefined,
        title:
            normalizeJourneyTitleFromMetadata(metadata) ??
            readText(value.title) ??
            undefined,
        description:
            normalizeJourneyDescriptionFromMetadata(metadata) ??
            readText(value.description) ??
            undefined,
        hashtags: normalizeJourneyHashtags(value, metadata),
        images: Array.isArray(value.images)
            ? (value.images as UserJourneyApi["images"])
            : undefined,
        coverUrl: readText(value.coverUrl) ?? undefined,
    };
}

const fetchPublicUsersCached = cache(async function fetchPublicUsersCached(
    page: number,
    limit: number,
    sort: "recent" | "oldest" | "mostJourneys",
): Promise<PublicUsersResponse | null> {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
        });

        const response = await fetchPublicApi(
            `/v2/users/public?${params.toString()}`,
            { next: { revalidate: PUBLIC_USER_REVALIDATE_SECONDS } },
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
});

export async function fetchPublicUsers(options?: {
    page?: number;
    limit?: number;
    sort?: "recent" | "oldest" | "mostJourneys";
}): Promise<PublicUsersResponse | null> {
    const { page = 1, limit = 100, sort = "recent" } = options ?? {};

    return fetchPublicUsersCached(page, limit, sort);
}

export const fetchPublicUser = cache(async function fetchPublicUser(
    userId: string,
): Promise<PublicUserProfileDto | null> {
    try {
        const response = await fetchPublicApi(
            `/v2/users/public/${encodeURIComponent(userId)}`,
            { next: { revalidate: PUBLIC_USER_REVALIDATE_SECONDS } },
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

const fetchUserJourneysCached = cache(async function fetchUserJourneysCached(
    userId: string,
    page: number,
    limit: number,
    sort: "recent" | "oldest",
    lang?: Language,
): Promise<PublishedJourneysResponse | null> {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
        });
        appendPublicApiLanguage(params, lang);

        const response = await fetchPublicApi(
            `/v2/users/public/${encodeURIComponent(userId)}/journeys?${params.toString()}`,
            { next: { revalidate: PUBLIC_USER_REVALIDATE_SECONDS } },
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
});

export async function fetchUserJourneys(
    userId: string,
    options?: {
        page?: number;
        limit?: number;
        sort?: "recent" | "oldest";
        lang?: Language;
    },
): Promise<PublishedJourneysResponse | null> {
    const { page = 1, limit = 100, sort = "recent", lang } = options ?? {};

    return fetchUserJourneysCached(userId, page, limit, sort, lang);
}
