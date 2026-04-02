import type { Language } from "@/lib/i18n/config";
import type { CaptureTimeContext } from "@/lib/local-time-context";
import type {
  PublishedJourneyApi,
  PublishedJourneyImage,
} from "@/lib/published-journey";
import { sortJourneyClustersByTimeline, sortJourneyImagesByCaptureTime } from "../utils";

export type DisplayImage = {
  key: string;
  url: string;
  alt: string;
};

export type ArchivePhoto = {
  key: string;
  photoId: string | null;
  url: string;
  alt: string;
  locationName: string;
  takenAt: number | null;
  captureTime: CaptureTimeContext | null;
};

export type ClusterSection = {
  key: string;
  href: string;
  title: string;
  impression: string | null;
  time: PublishedJourneyApi["clusters"][number]["time"];
  photoCount: number;
  previewPhotos: DisplayImage[];
};

const JOURNEY_FALLBACK_IMAGE = "/images/placeholders/journey-cover-fallback.svg";
const CLUSTER_PREVIEW_LIMIT = 3;

export function buildJourneyHeroImage(
  images: PublishedJourneyImage[],
  title: string,
  thumbnailUrl?: string,
): DisplayImage {
  const preferredImage = thumbnailUrl
    ? images.find((image) => image.url === thumbnailUrl) ?? images[0]
    : images[0];
  const preferredUrl = thumbnailUrl ?? preferredImage?.url;

  if (!preferredUrl) {
    return {
      key: "fallback-cover",
      url: JOURNEY_FALLBACK_IMAGE,
      alt: title,
    };
  }

  return {
    key: preferredImage?.photoId || preferredUrl,
    url: preferredUrl,
    alt: preferredImage?.locationName || title,
  };
}

export function buildJourneyArchivePhotos(
  images: PublishedJourneyImage[],
  title: string,
  locationFallback: string,
): ArchivePhoto[] {
  return sortJourneyImagesByCaptureTime(images).map((image, index) => ({
    key: image.photoId || `${index}-${image.url}`,
    photoId: image.photoId || null,
    url: image.url,
    alt: image.locationName || title,
    locationName: image.locationName || locationFallback,
    takenAt: image.takenAt ?? null,
    captureTime: image.captureTime ?? null,
  }));
}

function buildClusterPreviewPhotos(
  cluster: PublishedJourneyApi["clusters"][number],
  imageByPhotoId: Map<string, PublishedJourneyImage>,
  title: string,
  locationFallback: string,
): DisplayImage[] {
  const fallbackAlt = cluster.locationName || locationFallback || title;
  const previewPhotos = cluster.photoIds
    .map((photoId) => imageByPhotoId.get(photoId))
    .filter((image): image is PublishedJourneyImage => Boolean(image))
    .slice(0, CLUSTER_PREVIEW_LIMIT)
    .map((image, index) => ({
      key: image.photoId || `${cluster.clusterId}-${index}`,
      url: image.url,
      alt: image.locationName || fallbackAlt,
    }));

  return previewPhotos.length > 0
    ? previewPhotos
    : [
        {
          key: `${cluster.clusterId}-fallback`,
          url: JOURNEY_FALLBACK_IMAGE,
          alt: fallbackAlt,
        },
      ];
}

export function buildJourneyClusterSections(
  journey: PublishedJourneyApi,
  lang: Language,
  locationFallback: string,
): ClusterSection[] {
  const encodedJourneyId = encodeURIComponent(journey.publicId);
  const imageByPhotoId = new Map(
    journey.images.map((image) => [image.photoId, image] as const),
  );

  return sortJourneyClustersByTimeline(journey.clusters).map<ClusterSection>((cluster) => ({
    key: cluster.clusterId,
    href: `/${lang}/journeys/${encodedJourneyId}/moments/${encodeURIComponent(cluster.clusterId)}`,
    title: cluster.locationName || locationFallback,
    impression: cluster.impression?.trim() || null,
    time: cluster.time,
    photoCount: cluster.photoIds.length,
    previewPhotos: buildClusterPreviewPhotos(
      cluster,
      imageByPhotoId,
      journey.title,
      locationFallback,
    ),
  }));
}
