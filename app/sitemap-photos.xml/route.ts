import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublishedJourney } from "@/lib/published-journey";
import {
  fetchAllPublishedJourneysForSitemap,
  mapWithConcurrency,
} from "@/lib/sitemap/public-content";
import {
  normalizeSitemapUrls,
  renderSitemapUrlset,
  toIsoDateOrNull,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
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
          changefreq: "monthly",
          priority: 0.6,
          alternates: buildSitemapAlternates(siteUrl, `/photos/${image.photoId}`),
        });
      }
    }
  }

  const xml = renderSitemapUrlset(normalizeSitemapUrls(urls, "sitemap-photos"));

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
