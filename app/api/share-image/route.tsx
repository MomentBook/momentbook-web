import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getLocalizedScreenshotPath } from "@/lib/app-screenshots";
import { type Language } from "@/lib/i18n/config";
import {
  fetchPublishedJourney,
  fetchPublishedJourneyResult,
  fetchPublishedPhoto,
} from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { buildSeoDescription } from "@/lib/seo/public-metadata";
import {
  resolveSocialImageLanguage,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/seo/social-image";
import { SocialImageView } from "@/lib/seo/social-image-view";
import { resolveSiteUrl } from "@/lib/site-url";
import { buildJourneyHeroImage } from "@/app/(localized)/[lang]/(chrome)/(content)/journeys/[journeyId]/components/journey-content.helpers";
import {
  buildJourneyDescription,
  journeyLabels,
  resolveJourneyUnavailableCopy,
} from "@/app/(localized)/[lang]/(chrome)/(content)/journeys/[journeyId]/labels";
import { getUniqueJourneyLocations } from "@/app/(localized)/[lang]/(chrome)/(content)/journeys/[journeyId]/utils";
import {
  buildMomentDisplayLocationName,
  buildMomentImageUrlMap,
  buildMomentPhotos,
  buildMomentSeoDescription,
  findJourneyCluster,
  momentLabels,
  momentNotFoundTitleByLanguage,
  readMomentLocationName,
} from "@/app/(localized)/[lang]/(chrome)/(content)/journeys/[journeyId]/moments/[clusterId]/moment.helpers";
import {
  buildPhotoDisplayState,
  photoCopy,
  photoNotFoundTitleByLanguage,
} from "@/app/(localized)/[lang]/(chrome)/(content)/photos/[photoId]/photo.helpers";
import {
  buildUserMetadataDescription,
  buildUserMetadataTitle,
  buildUserSharedCountText,
  getUserPageLabels,
  userNotFoundTitleByLanguage,
} from "@/app/(localized)/[lang]/(chrome)/(content)/users/[userId]/user-page.helpers";
import { getHomePageCopy } from "@/app/(localized)/[lang]/(chrome)/home.copy";

export const runtime = "nodejs";

type SocialImageModel = {
  eyebrow: string;
  title: string;
  description?: string | null;
  meta?: string | null;
  backgroundImageUrl?: string | null;
  sideImageUrl?: string | null;
  sideImageAlt?: string | null;
};

function readText(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parsePositiveInteger(value: string | null): number {
  if (!value) {
    return 1;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function buildAbsoluteAssetUrl(path: string): string {
  return new URL(path, resolveSiteUrl()).toString();
}

function toAbsoluteImageUrl(value: string | null | undefined): string | null {
  const trimmed = readText(value);

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return buildAbsoluteAssetUrl(trimmed);
  }

  return null;
}

function joinMeta(parts: Array<string | null | undefined>): string | null {
  const values = parts
    .map((part) => readText(part))
    .filter((part): part is string => Boolean(part));

  return values.length > 0 ? values.join(" · ") : null;
}

function buildGenericModel(
  title: string,
  description?: string | null,
  eyebrow = "MomentBook",
): SocialImageModel {
  return {
    eyebrow,
    title,
    description,
  };
}

async function buildHomeModel(lang: Language): Promise<SocialImageModel> {
  const content = getHomePageCopy(lang);

  return {
    eyebrow: "MomentBook",
    title: content.metaTitle,
    description: content.metaDescription,
    sideImageUrl: buildAbsoluteAssetUrl(getLocalizedScreenshotPath(lang, "intro")),
    sideImageAlt: content.metaTitle,
  };
}

async function buildJourneyModel(
  lang: Language,
  journeyId: string,
): Promise<SocialImageModel> {
  const result = await fetchPublishedJourneyResult(journeyId, lang);

  if (result.status === "hidden") {
    const copy = resolveJourneyUnavailableCopy(lang, result.data, result.message);
    return buildGenericModel(copy.title, copy.message);
  }

  const journey = result.data;

  if (!journey) {
    return buildGenericModel(journeyNotFoundTitleByLanguage[lang]);
  }

  const author = await fetchPublicUser(journey.userId);
  const locations = getUniqueJourneyLocations(journey);
  const heroImage = buildJourneyHeroImage(journey.images, journey.title, journey.thumbnailUrl);
  const labels = journeyLabels[lang] ?? journeyLabels.en;

  return {
    eyebrow: labels.eyebrow,
    title: journey.title,
    description: buildSeoDescription([
      journey.description,
      buildJourneyDescription(lang, locations, journey.photoCount),
    ]),
    meta: joinMeta([author?.name, locations[0], locations[1]]),
    backgroundImageUrl: toAbsoluteImageUrl(heroImage.url),
  };
}

async function buildMomentModel(
  lang: Language,
  journeyId: string,
  clusterId: string,
): Promise<SocialImageModel> {
  const journey = await fetchPublishedJourney(journeyId, lang);

  if (!journey) {
    return buildGenericModel(momentNotFoundTitleByLanguage[lang]);
  }

  const cluster = findJourneyCluster(journey, clusterId);

  if (!cluster) {
    return buildGenericModel(momentNotFoundTitleByLanguage[lang]);
  }

  const labels = momentLabels[lang] ?? momentLabels.en;
  const locationName = readMomentLocationName(cluster.locationName);
  const imageUrlMap = buildMomentImageUrlMap(journey);
  const momentPhotos = buildMomentPhotos(cluster, imageUrlMap);

  return {
    eyebrow: labels.eyebrow,
    title: buildMomentDisplayLocationName(labels, locationName),
    description: buildSeoDescription([
      cluster.impression,
      buildMomentSeoDescription(
        lang,
        journey.title,
        cluster.locationName ?? null,
        cluster.photoIds.length,
      ),
    ]),
    meta: readText(journey.title),
    backgroundImageUrl: toAbsoluteImageUrl(
      momentPhotos[0]?.url ?? journey.thumbnailUrl ?? journey.images[0]?.url ?? null,
    ),
  };
}

async function buildPhotoModel(
  lang: Language,
  photoId: string,
): Promise<SocialImageModel> {
  const photo = await fetchPublishedPhoto(photoId, lang);

  if (!photo) {
    return buildGenericModel(photoNotFoundTitleByLanguage[lang]);
  }

  const copy = photoCopy[lang] ?? photoCopy.en;
  const display = buildPhotoDisplayState(copy, photo);

  return {
    eyebrow: copy.eyebrow,
    title: display.title,
    description: display.description,
    meta: joinMeta([display.journeyTitle, display.locationName]),
    backgroundImageUrl: toAbsoluteImageUrl(photo.url),
  };
}

async function buildUserModel(
  lang: Language,
  userId: string,
  currentPage: number,
): Promise<SocialImageModel> {
  const user = await fetchPublicUser(userId);

  if (!user) {
    return buildGenericModel(userNotFoundTitleByLanguage[lang]);
  }

  const labels = getUserPageLabels(lang);

  return {
    eyebrow: labels.profileEyebrow,
    title: buildUserMetadataTitle(lang, user.name, currentPage),
    description: buildUserMetadataDescription(lang, user, currentPage),
    meta: buildUserSharedCountText(labels, user.publishedJourneyCount),
    sideImageUrl: toAbsoluteImageUrl(user.picture),
    sideImageAlt: user.name,
  };
}

const journeyNotFoundTitleByLanguage: Record<Language, string> = {
  en: "Journey not found",
  ko: "여정을 찾을 수 없습니다",
  ja: "旅が見つかりません",
  zh: "找不到旅程",
  es: "No se encontró el viaje",
  pt: "Viagem não encontrada",
  fr: "Voyage introuvable",
  th: "ไม่พบทริป",
  vi: "Không tìm thấy hành trình",
};

async function buildSocialImageModel(request: NextRequest): Promise<SocialImageModel> {
  const params = request.nextUrl.searchParams;
  const kind = params.get("kind");
  const lang = resolveSocialImageLanguage(params.get("lang"));

  if (kind === "journey") {
    return buildJourneyModel(lang, params.get("journeyId") ?? "");
  }

  if (kind === "moment") {
    return buildMomentModel(
      lang,
      params.get("journeyId") ?? "",
      params.get("clusterId") ?? "",
    );
  }

  if (kind === "photo") {
    return buildPhotoModel(lang, params.get("photoId") ?? "");
  }

  if (kind === "user") {
    return buildUserModel(
      lang,
      params.get("userId") ?? "",
      parsePositiveInteger(params.get("page")),
    );
  }

  return buildHomeModel(lang);
}

export async function GET(request: NextRequest) {
  const model = await buildSocialImageModel(request);

  return new ImageResponse(
    (
      <SocialImageView
        eyebrow={model.eyebrow}
        title={model.title}
        description={model.description}
        meta={model.meta}
        backgroundImageUrl={model.backgroundImageUrl}
        sideImageUrl={model.sideImageUrl}
        sideImageAlt={model.sideImageAlt}
      />
    ),
    {
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      headers: {
        "Content-Type": SOCIAL_IMAGE_CONTENT_TYPE,
      },
    },
  );
}
