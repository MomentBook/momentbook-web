import type { JourneyImage } from "@/lib/public-content";

export type PublishedPhotoApi = {
  photoId: string;
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  takenAt?: number;
  locationName?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  journey: {
    publicId: string;
    userId?: string;
    journeyId: string;
    startedAt: number;
    endedAt?: number;
    metadata?: Record<string, any>;
  };
};

type PublishedPhotoResponse = {
  status: string;
  data?: PublishedPhotoApi;
};

function getApiBaseUrl(): string | null {
  const baseUrl =
    process.env.MOMENTBOOK_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return null;
  }

  return baseUrl.replace(/\/+$/, "");
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
    console.warn("[published-photo] Failed to fetch published photo", error);
    return null;
  }
}

export function normalizePublishedPhoto(
  photo: PublishedPhotoApi,
): JourneyImage & { photoId: string } {
  return {
    photoId: photo.photoId,
    url: photo.url,
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
    takenAt: photo.takenAt,
    locationName: photo.locationName,
    location: photo.location,
  };
}
