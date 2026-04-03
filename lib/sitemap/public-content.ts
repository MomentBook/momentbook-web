import { cache } from "react";
import { languageList } from "@/lib/i18n/config";
import type {
  PublishedJourneyApi,
  PublishedJourneyImage,
  PublishedJourneyListItemApi,
} from "@/lib/published-journey";
import { fetchPublishedJourney, fetchPublishedJourneys } from "@/lib/published-journey";
import type { PublicUserApi } from "@/lib/public-users";
import { fetchPublicUsers } from "@/lib/public-users";
import { MAX_URLS_PER_SITEMAP, toIsoDateOrNull } from "@/lib/sitemap/xml";

const DEFAULT_USER_PAGE_LIMIT = 100;
const DEFAULT_JOURNEY_PAGE_LIMIT = 50;
const MAX_API_PAGES = 200;
const LOCALIZED_URLS_PER_RESOURCE = languageList.length;

export const MAX_RESOURCES_PER_SITEMAP = Math.max(
  1,
  Math.floor(MAX_URLS_PER_SITEMAP / LOCALIZED_URLS_PER_RESOURCE),
);

export type SitemapChunk<T> = {
  index: number;
  items: T[];
};

export type JourneyMediaSitemapCatalogEntry = {
  publicId: string;
  lastmod: string | null;
  momentParts: number;
  photoParts: number;
};

function chunkItems<T>(items: T[], size: number): T[][] {
  const safeSize = Math.max(1, Math.floor(size));
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += safeSize) {
    chunks.push(items.slice(index, index + safeSize));
  }

  return chunks;
}

function buildSitemapChunks<T>(items: T[], size: number): SitemapChunk<T>[] {
  return chunkItems(items, size).map((chunk, index) => ({
    index: index + 1,
    items: chunk,
  }));
}

function dedupeJourneyImages(images: PublishedJourneyImage[]): PublishedJourneyImage[] {
  const uniqueImages: PublishedJourneyImage[] = [];
  const seen = new Set<string>();

  for (const image of images) {
    const key = image.photoId || image.url;
    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueImages.push(image);
  }

  return uniqueImages;
}

export const fetchAllPublicUsersForSitemap = cache(async function fetchAllPublicUsersForSitemap(): Promise<PublicUserApi[]> {
  const users: PublicUserApi[] = [];
  const seen = new Set<string>();

  for (let page = 1; page <= MAX_API_PAGES; page += 1) {
    const response = await fetchPublicUsers({
      page,
      limit: DEFAULT_USER_PAGE_LIMIT,
      sort: "recent",
    });
    const data = response?.data;

    if (!data) {
      break;
    }

    for (const user of data.users ?? []) {
      if (!user.userId || seen.has(user.userId)) {
        continue;
      }

      seen.add(user.userId);
      users.push(user);
    }

    const totalPages = Math.max(1, data.pages ?? page);
    if (page >= totalPages) {
      break;
    }
  }

  return users;
});

export const fetchAllPublishedJourneysForSitemap = cache(async function fetchAllPublishedJourneysForSitemap(): Promise<PublishedJourneyListItemApi[]> {
  const journeys: PublishedJourneyListItemApi[] = [];
  const seen = new Set<string>();

  for (let page = 1; page <= MAX_API_PAGES; page += 1) {
    const response = await fetchPublishedJourneys({
      page,
      limit: DEFAULT_JOURNEY_PAGE_LIMIT,
      sort: "recent",
    });

    if (!response) {
      break;
    }

    for (const journey of response.journeys ?? []) {
      if (!journey.publicId || seen.has(journey.publicId)) {
        continue;
      }

      seen.add(journey.publicId);
      journeys.push(journey);
    }

    const totalPages = response.pages;
    if (
      (typeof totalPages === "number" && page >= Math.max(1, totalPages)) ||
      (typeof totalPages !== "number" && !response.hasMore)
    ) {
      break;
    }
  }

  return journeys;
});

export async function fetchPublishedJourneySitemapChunks(): Promise<
  SitemapChunk<PublishedJourneyListItemApi>[]
> {
  const journeys = await fetchAllPublishedJourneysForSitemap();
  return buildSitemapChunks(journeys, MAX_RESOURCES_PER_SITEMAP);
}

export async function fetchPublishedJourneySitemapPartParams(): Promise<
  Array<{ part: string }>
> {
  const chunks = await fetchPublishedJourneySitemapChunks();

  return chunks.map((chunk) => ({
    part: `${chunk.index}.xml`,
  }));
}

export async function fetchPublicUserSitemapChunks(): Promise<SitemapChunk<PublicUserApi>[]> {
  const users = await fetchAllPublicUsersForSitemap();
  return buildSitemapChunks(users, MAX_RESOURCES_PER_SITEMAP);
}

export async function fetchPublicUserSitemapPartParams(): Promise<
  Array<{ part: string }>
> {
  const chunks = await fetchPublicUserSitemapChunks();

  return chunks.map((chunk) => ({
    part: `${chunk.index}.xml`,
  }));
}

export const fetchJourneyMediaSitemapCatalog = cache(async function fetchJourneyMediaSitemapCatalog(): Promise<
  JourneyMediaSitemapCatalogEntry[]
> {
  const journeys = await fetchAllPublishedJourneysForSitemap();
  const details = await mapWithConcurrency(
    journeys,
    6,
    async (journey): Promise<JourneyMediaSitemapCatalogEntry | null> => {
      const detail = await fetchPublishedJourney(journey.publicId);

      if (!detail) {
        return null;
      }

      const uniqueImages = dedupeJourneyImages(detail.images);

      return {
        publicId: detail.publicId,
        lastmod: toIsoDateOrNull(detail.publishedAt ?? detail.createdAt),
        momentParts:
          detail.clusters.length > 0
            ? Math.ceil(detail.clusters.length / MAX_RESOURCES_PER_SITEMAP)
            : 0,
        photoParts:
          uniqueImages.length > 0
            ? Math.ceil(uniqueImages.length / MAX_RESOURCES_PER_SITEMAP)
            : 0,
      };
    },
  );

  return details.filter(
    (entry): entry is JourneyMediaSitemapCatalogEntry => Boolean(entry),
  );
});

export async function fetchJourneyMomentSitemapPartParams(): Promise<
  Array<{ publicId: string; part: string }>
> {
  const catalog = await fetchJourneyMediaSitemapCatalog();

  return catalog.flatMap((entry) =>
    Array.from({ length: entry.momentParts }, (_, index) => ({
      publicId: entry.publicId,
      part: `${index + 1}.xml`,
    })),
  );
}

export async function fetchJourneyPhotoSitemapPartParams(): Promise<
  Array<{ publicId: string; part: string }>
> {
  const catalog = await fetchJourneyMediaSitemapCatalog();

  return catalog.flatMap((entry) =>
    Array.from({ length: entry.photoParts }, (_, index) => ({
      publicId: entry.publicId,
      part: `${index + 1}.xml`,
    })),
  );
}

export async function fetchPublishedJourneyMomentSitemapPart(
  publicId: string,
  part: number,
): Promise<{
  journey: PublishedJourneyApi;
  clusters: PublishedJourneyApi["clusters"];
} | null> {
  const journey = await fetchPublishedJourney(publicId);

  if (!journey) {
    return null;
  }

  const chunks = chunkItems(journey.clusters, MAX_RESOURCES_PER_SITEMAP);
  const clusters = chunks[part - 1];

  if (!clusters) {
    return null;
  }

  return { journey, clusters };
}

export async function fetchPublishedJourneyPhotoSitemapPart(
  publicId: string,
  part: number,
): Promise<{
  journey: PublishedJourneyApi;
  images: PublishedJourneyImage[];
} | null> {
  const journey = await fetchPublishedJourney(publicId);

  if (!journey) {
    return null;
  }

  const uniqueImages = dedupeJourneyImages(journey.images);
  const chunks = chunkItems(uniqueImages, MAX_RESOURCES_PER_SITEMAP);
  const images = chunks[part - 1];

  if (!images) {
    return null;
  }

  return { journey, images };
}

export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const safeConcurrency = Math.max(1, Math.floor(concurrency));
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(safeConcurrency, items.length) },
      () => worker(),
    ),
  );

  return results;
}
