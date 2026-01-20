import type {
    PublicUserProfileDto,
} from "@/src/apis/client";

// Re-export API types for consistency
export type PublicUserApi = PublicUserProfileDto;

export type UserJourneyApi = {
    publicId: string;
    title: string;
    description?: string;
    photoCount: number;
    images?: Array<{ url: string; photoId: string }>;
    publishedAt: string;
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
    data?: PublicUserApi;
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

function getApiBaseUrl(): string | null {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        return null;
    }

    return baseUrl.replace(/\/+$/, "");
}

export async function fetchPublicUsers(options?: {
    page?: number;
    limit?: number;
    sort?: "recent" | "oldest" | "mostJourneys";
}): Promise<PublicUsersResponse | null> {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        return null;
    }

    const { page = 1, limit = 100, sort = "recent" } = options ?? {};

    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
        });

        const response = await fetch(
            `${baseUrl}/v2/users/public?${params.toString()}`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PublicUsersResponse;

        if (payload?.status !== "success") {
            return null;
        }

        return payload;
    } catch (error) {
        console.warn("[public-users] Failed to fetch public users", error);
        return null;
    }
}

export async function fetchPublicUser(
    userId: string,
): Promise<PublicUserApi | null> {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        return null;
    }

    try {
        const response = await fetch(
            `${baseUrl}/v2/users/public/${encodeURIComponent(userId)}`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PublicUserProfileResponse;

        if (payload?.status !== "success" || !payload.data) {
            return null;
        }

        return payload.data;
    } catch (error) {
        console.warn(
            "[public-users] Failed to fetch public user profile",
            error,
        );
        return null;
    }
}

export async function fetchUserJourneys(
    userId: string,
    options?: {
        page?: number;
        limit?: number;
    },
): Promise<PublishedJourneysResponse | null> {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
        return null;
    }

    const { page = 1, limit = 100 } = options ?? {};

    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await fetch(
            `${baseUrl}/v2/users/public/${encodeURIComponent(userId)}/journeys?${params.toString()}`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PublishedJourneysResponse;

        if (payload?.status !== "success") {
            return null;
        }

        return payload;
    } catch (error) {
        console.warn(
            "[public-users] Failed to fetch user journeys",
            error,
        );
        return null;
    }
}
