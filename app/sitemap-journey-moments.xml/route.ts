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

  for (const publishedJourney of journeyDetails) {
    if (!publishedJourney) {
      continue;
    }

    const lastmod = toIsoDateOrNull(publishedJourney.publishedAt);

    for (const cluster of publishedJourney.clusters) {
      const encodedClusterId = encodeURIComponent(cluster.clusterId);
      for (const lang of languageList) {
        urls.push({
          loc: `${siteUrl}/${lang}/journeys/${publishedJourney.publicId}/moments/${encodedClusterId}`,
          lastmod,
          alternates: buildSitemapAlternates(
            siteUrl,
            `/journeys/${publishedJourney.publicId}/moments/${encodedClusterId}`,
          ),
        });
      }
    }
  }

  const xml = renderSitemapUrlset(
    normalizeSitemapUrls(urls, "sitemap-journey-moments"),
  );

  return buildSitemapXmlResponse(xml);
}
