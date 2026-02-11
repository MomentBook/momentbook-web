import type {
    PublishedJourneyDetailDto,
    PublishedJourneyDetailResponseDto,
    PublishedJourneyItemDto,
    PublishedJourneysResponseDto,
} from "@/src/apis/client";
import { fetchPublicApi } from "@/lib/public-api";

export type JourneyMode = "ROUTE_STRONG" | "ROUTE_WEAK" | "ROUTE_NONE";
export type PublishedJourneyContentStatus = "available" | "reported_hidden";

export type PublishedJourneyImage = {
    url: string;
    photoId: string;
    width?: number;
    height?: number;
    caption?: string;
    takenAt?: number;
    locationName?: string;
    location?: {
        lat: number;
        lng: number;
    };
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
    contentStatus?: PublishedJourneyContentStatus;
    notice?: string;
};

export type PublishedJourneyListItemApi = {
    publicId: string;
    journeyId?: string;
    userId: string;
    startedAt?: number;
    endedAt?: number;
    recapStage?: string;
    photoCount?: number;
    imageCount?: number;
    thumbnailUrl?: string;
    metadata?: Record<string, unknown>;
    title?: string;
    description?: string;
    publishedAt?: string;
    createdAt?: string;
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
    data?: PublishedJourneyDetailDto | Record<string, unknown>;
    message?: unknown;
};

type PublishedPhotoResponse = {
    status?: string;
    data?: unknown;
    message?: unknown;
};

type FetchPublishedJourneyResult = {
    status: "success" | "hidden" | "not_found" | "error";
    data: PublishedJourneyApi | null;
    message?: string;
};

const PUBLIC_JOURNEY_CACHE_TTL_SECONDS = 60;

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

function readMessage(value: unknown): string | null {
    if (typeof value === "string") {
        return value;
    }

    if (Array.isArray(value)) {
        const firstString = value.find((item) => typeof item === "string");
        return typeof firstString === "string" ? firstString : null;
    }

    if (isRecord(value)) {
        return readText(value.message) ?? null;
    }

    return null;
}

function isHiddenJourneyMessage(message: string | null | undefined): boolean {
    if (!message) {
        return false;
    }

    const normalized = message.toLowerCase();
    return (
        message.includes("숨김") ||
        message.includes("신고가 누적") ||
        normalized.includes("hidden") ||
        normalized.includes("reported")
    );
}

function normalizeContentStatus(
    value: unknown,
): PublishedJourneyContentStatus | undefined {
    if (value === "available" || value === "reported_hidden") {
        return value;
    }

    return undefined;
}

function normalizeJourneyMode(value: unknown): JourneyMode {
    if (value === "ROUTE_STRONG" || value === "ROUTE_WEAK" || value === "ROUTE_NONE") {
        return value;
    }

    return "ROUTE_NONE";
}

function normalizeLocation(
    value: unknown,
): { lat: number; lng: number } | null {
    if (!isRecord(value)) {
        return null;
    }

    const lat =
        readNumber(value.lat) ??
        readNumber(value.latitude);
    const lng =
        readNumber(value.lng) ??
        readNumber(value.longitude);

    if (lat === null || lng === null) {
        return null;
    }

    return { lat, lng };
}

function normalizePhotoIds(value: unknown): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) => readText(item))
        .filter((item): item is string => Boolean(item));
}

function normalizeClusterType(value: unknown): "STOP" | "ORPHAN" {
    if (value === "STOP" || value === "ROUTE_STOP") {
        return "STOP";
    }

    return "ORPHAN";
}

function normalizePublishedJourneyImage(
    value: unknown,
): PublishedJourneyImage | null {
    if (typeof value === "string") {
        const url = readText(value);
        if (!url) {
            return null;
        }

        return {
            url,
            photoId: "",
        };
    }

    if (!isRecord(value)) {
        return null;
    }

    const url =
        readText(value.url) ??
        readText(value.imageUrl) ??
        readText(value.src);

    if (!url) {
        return null;
    }

    const location = normalizeLocation(value.location) ?? undefined;

    return {
        url,
        photoId: readText(value.photoId) ?? "",
        width: readNumber(value.width) ?? undefined,
        height: readNumber(value.height) ?? undefined,
        caption: readText(value.caption) ?? undefined,
        takenAt: readNumber(value.takenAt) ?? undefined,
        locationName: readText(value.locationName) ?? undefined,
        location,
    };
}

function normalizePublishedJourneyCluster(
    value: unknown,
    index: number,
): PublishedJourneyCluster | null {
    if (!isRecord(value)) {
        return null;
    }

    const clusterId =
        readText(value.clusterId) ??
        readText(value.timelineId) ??
        readText(value.id) ??
        `cluster-${index}`;

    const time = isRecord(value.time) ? value.time : null;
    const startAt =
        readNumber(time?.startAt) ??
        readNumber(value.startedAt);
    const endAt =
        readNumber(time?.endAt) ??
        readNumber(value.endedAt) ??
        startAt;

    const center =
        normalizeLocation(value.center) ??
        normalizeLocation(value.location);

    if (startAt === null || endAt === null || !center) {
        return null;
    }

    const durationMs =
        readNumber(time?.durationMs) ??
        Math.max(0, endAt - startAt);

    const locationRecord = isRecord(value.location) ? value.location : null;
    const locationName =
        readText(value.locationName) ??
        readText(locationRecord?.displayName) ??
        readText(locationRecord?.name) ??
        readText(locationRecord?.label) ??
        undefined;

    const photoIds = normalizePhotoIds(value.photoIds);
    const singlePhotoId = readText(value.photoId);

    return {
        clusterId,
        type: normalizeClusterType(value.type),
        time: {
            startAt,
            endAt,
            durationMs,
        },
        center,
        locationName,
        photoIds: singlePhotoId ? [...photoIds, singlePhotoId] : photoIds,
    };
}

function normalizeJourneyMetadata(
    value: unknown,
): Record<string, unknown> | undefined {
    return isRecord(value) ? value : undefined;
}

function normalizeJourneyListItem(value: unknown): PublishedJourneyListItemApi | null {
    if (!isRecord(value)) {
        return null;
    }

    const publicId = readText(value.publicId);
    const userId = readText(value.userId);

    if (!publicId || !userId) {
        return null;
    }

    const metadata = normalizeJourneyMetadata(value.metadata);

    return {
        publicId,
        journeyId: readText(value.journeyId) ?? undefined,
        userId,
        startedAt: readNumber(value.startedAt) ?? undefined,
        endedAt: readNumber(value.endedAt) ?? undefined,
        recapStage: readText(value.recapStage) ?? undefined,
        photoCount: readNumber(value.photoCount) ?? undefined,
        imageCount: readNumber(value.imageCount) ?? undefined,
        thumbnailUrl: readText(value.thumbnailUrl) ?? undefined,
        metadata,
        title:
            readText(value.title) ??
            readText(metadata?.title) ??
            readText(metadata?.journeyTitle) ??
            undefined,
        description:
            readText(value.description) ??
            readText(metadata?.description) ??
            readText(metadata?.summary) ??
            undefined,
        publishedAt: readText(value.publishedAt) ?? undefined,
        createdAt: readText(value.createdAt) ?? undefined,
    };
}

function normalizePublishedJourney(
    value: unknown,
    fallbackMessage?: string,
): PublishedJourneyApi | null {
    if (!isRecord(value)) {
        return null;
    }

    const publicId = readText(value.publicId);
    const userId = readText(value.userId);

    if (!publicId || !userId) {
        return null;
    }

    const metadata = normalizeJourneyMetadata(value.metadata);
    const images = Array.isArray(value.images)
        ? value.images
            .map((item) => normalizePublishedJourneyImage(item))
            .filter((item): item is PublishedJourneyImage => Boolean(item))
        : [];

    const clusters = Array.isArray(value.clusters)
        ? value.clusters
            .map((item, index) => normalizePublishedJourneyCluster(item, index))
            .filter((item): item is PublishedJourneyCluster => Boolean(item))
        : [];

    const clusterStarts = clusters.map((cluster) => cluster.time.startAt);
    const clusterEnds = clusters.map((cluster) => cluster.time.endAt);

    const publishedAt =
        readText(value.publishedAt) ??
        readText(value.createdAt) ??
        new Date().toISOString();

    const startedAt =
        readNumber(value.startedAt) ??
        (clusterStarts.length > 0 ? Math.min(...clusterStarts) : null) ??
        Date.parse(publishedAt);
    const endedAt =
        readNumber(value.endedAt) ??
        (clusterEnds.length > 0 ? Math.max(...clusterEnds) : null) ??
        startedAt;

    return {
        publicId,
        userId,
        startedAt,
        endedAt,
        title:
            readText(value.title) ??
            readText(metadata?.title) ??
            readText(metadata?.journeyTitle) ??
            "Untitled journey",
        description:
            readText(value.description) ??
            readText(metadata?.description) ??
            readText(metadata?.summary) ??
            undefined,
        mode: normalizeJourneyMode(value.mode),
        photoCount: readNumber(value.photoCount) ?? images.length,
        images,
        clusters,
        publishedAt,
        createdAt: readText(value.createdAt) ?? publishedAt,
        contentStatus: normalizeContentStatus(value.contentStatus),
        notice: readMessage(value.notice) ?? fallbackMessage,
    };
}

function normalizePublishedPhoto(value: unknown): PublishedPhotoApi | null {
    if (!isRecord(value)) {
        return null;
    }

    const journeySource = isRecord(value.journey) ? value.journey : null;

    const photoId = readText(value.photoId);
    const url =
        readText(value.url) ??
        readText(value.imageUrl) ??
        (isRecord(value.image) ? readText(value.image.url) : null);
    const journeyPublicId =
        readText(journeySource?.publicId) ??
        readText(value.journeyPublicId);

    if (!photoId || !url || !journeyPublicId) {
        return null;
    }

    const journeyTitle =
        readText(journeySource?.title) ??
        (isRecord(journeySource?.metadata)
            ? readText(journeySource.metadata.title)
            : null) ??
        "Journey";

    const locationName =
        readText(value.locationName) ??
        (isRecord(value.location) ? readText(value.location.displayName) : null) ??
        undefined;

    return {
        photoId,
        url,
        takenAt:
            readNumber(value.takenAt) ??
            readNumber(value.capturedAt) ??
            undefined,
        locationName,
        location: normalizeLocation(value.location) ?? undefined,
        caption: readText(value.caption) ?? undefined,
        journey: {
            publicId: journeyPublicId,
            title: journeyTitle,
        },
    };
}

function isPublishedJourneyResponse(
    payload: unknown,
): payload is PublishedJourneyResponse {
    return Boolean(
        payload &&
        typeof payload === "object" &&
        "status" in payload,
    );
}

export async function fetchPublishedJourneyResult(
    publicId: string,
): Promise<FetchPublishedJourneyResult> {
    try {
        const response = await fetchPublicApi(
            `/v2/journeys/public/${encodeURIComponent(publicId)}`,
            { next: { revalidate: PUBLIC_JOURNEY_CACHE_TTL_SECONDS } },
        );

        if (!response) {
            return { status: "error", data: null };
        }

        const payload = (await response.json().catch(() => null)) as
            | PublishedJourneyDetailResponseDto
            | PublishedJourneyResponse
            | { message?: unknown }
            | null;
        const message =
            isRecord(payload) && "message" in payload
                ? (readMessage(payload.message) ?? undefined)
                : undefined;

        if (response.ok) {
            if (!isPublishedJourneyResponse(payload)) {
                return { status: "error", data: null, message };
            }

            if (payload.status !== "success" || !payload.data) {
                return { status: "error", data: null, message };
            }

            const data = normalizePublishedJourney(payload.data, message);

            if (!data) {
                return { status: "error", data: null, message };
            }

            if (data.contentStatus === "reported_hidden") {
                return {
                    status: "hidden",
                    data,
                    message: data.notice ?? message,
                };
            }

            return {
                status: "success",
                data,
                message,
            };
        }

        if (response.status === 404) {
            if (isHiddenJourneyMessage(message)) {
                return { status: "hidden", data: null, message };
            }

            return { status: "not_found", data: null, message };
        }

        return { status: "error", data: null, message };
    } catch (error) {
        console.warn(
            "[published-journey] Failed to fetch published journey",
            error,
        );
        return { status: "error", data: null };
    }
}

export async function fetchPublishedJourney(
    publicId: string,
): Promise<PublishedJourneyApi | null> {
    const result = await fetchPublishedJourneyResult(publicId);
    return result.status === "success" ? result.data : null;
}

export async function fetchPublishedJourneys(options?: {
    page?: number;
    limit?: number;
    sort?: "recent" | "oldest";
    userId?: string;
}): Promise<PublishedJourneysListApi | null> {
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

        const response = await fetchPublicApi(
            `/v2/journeys/public?${params.toString()}`,
            { next: { revalidate: PUBLIC_JOURNEY_CACHE_TTL_SECONDS } },
        );

        if (!response || !response.ok) {
            return null;
        }

        const payload = (await response.json()) as
            | PublishedJourneysResponseDto
            | {
                status: string;
                data?: {
                    journeys?: PublishedJourneyItemDto[];
                    total?: number;
                    page?: number;
                    pages?: number;
                    limit?: number;
                };
            };

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        const journeys = Array.isArray(payload.data.journeys)
            ? payload.data.journeys
                .map((item) => normalizeJourneyListItem(item))
                .filter((item): item is PublishedJourneyListItemApi => Boolean(item))
            : [];

        return {
            journeys,
            total: readNumber(payload.data.total) ?? journeys.length,
            page: readNumber(payload.data.page) ?? page,
            pages: readNumber(payload.data.pages) ?? 1,
            limit: readNumber(payload.data.limit) ?? limit,
        };
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
    try {
        const response = await fetchPublicApi(
            `/v2/journeys/public/photos/${encodeURIComponent(photoId)}`,
            { next: { revalidate: PUBLIC_JOURNEY_CACHE_TTL_SECONDS } },
        );

        if (!response || !response.ok) {
            return null;
        }

        const payload = (await response.json().catch(() => null)) as
            | PublishedPhotoResponse
            | Record<string, unknown>
            | null;

        if (!payload) {
            return null;
        }

        if (isRecord(payload) && "status" in payload && payload.status !== "success") {
            return null;
        }

        const source =
            isRecord(payload) && "data" in payload
                ? (payload.data as unknown)
                : payload;

        return normalizePublishedPhoto(source);
    } catch (error) {
        console.warn(
            "[published-journey] Failed to fetch published photo",
            error,
        );
        return null;
    }
}
