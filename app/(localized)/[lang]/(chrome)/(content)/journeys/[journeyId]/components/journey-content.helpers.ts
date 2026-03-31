import type { Language } from "@/lib/i18n/config";
import type { CaptureTimeContext } from "@/lib/local-time-context";
import type {
  PublishedJourneyApi,
  PublishedJourneyCluster,
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
  cluster: PublishedJourneyCluster;
  href: string;
  coverPhoto: DisplayImage;
};

const JOURNEY_FALLBACK_IMAGE = "/images/placeholders/journey-cover-fallback.svg";

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

function buildClusterCoverPhoto(
  cluster: PublishedJourneyCluster,
  photoImageMap: Map<string, string>,
  title: string,
  locationFallback: string,
): DisplayImage {
  const firstPhotoId = cluster.photoIds.find((photoId) => photoImageMap.has(photoId));
  const url = firstPhotoId ? photoImageMap.get(firstPhotoId) : null;

  return {
    key: firstPhotoId
      ? `${cluster.clusterId}-${firstPhotoId}`
      : `${cluster.clusterId}-fallback`,
    url: url || JOURNEY_FALLBACK_IMAGE,
    alt: cluster.locationName || locationFallback || title,
  };
}

export function buildJourneyClusterSections(
  journey: PublishedJourneyApi,
  photoImageMap: Map<string, string>,
  lang: Language,
  locationFallback: string,
): ClusterSection[] {
  const encodedJourneyId = encodeURIComponent(journey.publicId);

  return sortJourneyClustersByTimeline(journey.clusters).map<ClusterSection>((cluster) => ({
    cluster,
    href: `/${lang}/journeys/${encodedJourneyId}/moments/${encodeURIComponent(cluster.clusterId)}`,
    coverPhoto: buildClusterCoverPhoto(
      cluster,
      photoImageMap,
      journey.title,
      locationFallback,
    ),
  }));
}
