import type { Metadata } from "next";
import {
  defaultLanguage,
  resolveSupportedLanguage,
  type Language,
} from "@/lib/i18n/config";

export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;
export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";

type HomeSocialImageTarget = {
  kind: "home";
  lang?: Language;
};

type JourneySocialImageTarget = {
  kind: "journey";
  lang: Language;
  journeyId: string;
};

type MomentSocialImageTarget = {
  kind: "moment";
  lang: Language;
  journeyId: string;
  clusterId: string;
};

type PhotoSocialImageTarget = {
  kind: "photo";
  lang: Language;
  photoId: string;
};

type UserSocialImageTarget = {
  kind: "user";
  lang: Language;
  userId: string;
  page?: number;
};

export type SocialImageTarget =
  | HomeSocialImageTarget
  | JourneySocialImageTarget
  | MomentSocialImageTarget
  | PhotoSocialImageTarget
  | UserSocialImageTarget;

type SocialMetadataImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

function appendPositiveInteger(
  params: URLSearchParams,
  key: string,
  value: number | undefined,
) {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 1) {
    return;
  }

  params.set(key, value.toString());
}

export function resolveSocialImageLanguage(value: string | null | undefined): Language {
  return resolveSupportedLanguage(value) ?? defaultLanguage;
}

export function buildSocialImagePath(target: SocialImageTarget): string {
  const params = new URLSearchParams();

  params.set("kind", target.kind);
  params.set("lang", target.lang ?? defaultLanguage);

  if (target.kind === "journey" || target.kind === "moment") {
    params.set("journeyId", target.journeyId);
  }

  if (target.kind === "moment") {
    params.set("clusterId", target.clusterId);
  }

  if (target.kind === "photo") {
    params.set("photoId", target.photoId);
  }

  if (target.kind === "user") {
    params.set("userId", target.userId);
    appendPositiveInteger(params, "page", target.page);
  }

  return `/api/share-image?${params.toString()}`;
}

export function buildSocialImageMetadata(
  target: SocialImageTarget,
  alt: string,
): SocialMetadataImage[] {
  return [
    {
      url: buildSocialImagePath(target),
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      alt,
    },
  ];
}

export function applyTwitterImageMetadata(
  images: SocialMetadataImage[] | undefined,
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    images: images?.map((image) => image.url),
  };
}
