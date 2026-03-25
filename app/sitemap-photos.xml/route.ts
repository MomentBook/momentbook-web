import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublishedJourney } from "@/lib/published-journey";
import {
  fetchAllPublishedJourneysForSitemap,
  mapWithConcurrency,
} from "@/lib/sitemap/public-content";
import {
  buildSitemapXmlResponse,
  normalizeSitemapUrls,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();
  const journeys = await fetchAllPublishedJourneysForSitemap();
  const journeyDetails = await mapWithConcurrency(
    journeys,
    6,
    async (journey) => fetchPublishedJourney(journey.publicId),
  );

  const urls: SitemapUrlEntry[] = [];
  const seenPhotoIds = new Set<string>();

  for (const publishedJourney of journeyDetails) {
    if (!publishedJourney) {
      continue;
    }

    const images = publishedJourney.images ?? [];
    const publishedAt = toIsoDateOrNull(publishedJourney.publishedAt);

    for (const image of images) {
      if (!image.photoId || seenPhotoIds.has(image.photoId)) {
        continue;
      }

      seenPhotoIds.add(image.photoId);

      for (const lang of languageList) {
        urls.push({
          loc: `${siteUrl}/${lang}/photos/${image.photoId}`,
          lastmod: publishedAt,
          alternates: buildSitemapAlternates(siteUrl, `/photos/${image.photoId}`),
        });
      }
    }
  }

  const xml = renderSitemapUrlset(normalizeSitemapUrls(urls, "sitemap-photos"));

  return buildSitemapXmlResponse(xml);
}
