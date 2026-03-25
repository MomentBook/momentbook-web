import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchAllPublishedJourneysForSitemap } from "@/lib/sitemap/public-content";
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

  const urls: SitemapUrlEntry[] = [];
  for (const journey of journeys) {
    const lastmod = toIsoDateOrNull(journey.publishedAt ?? journey.createdAt);
    for (const lang of languageList) {
      urls.push({
        loc: `${siteUrl}/${lang}/journeys/${journey.publicId}`,
        lastmod,
        alternates: buildSitemapAlternates(siteUrl, `/journeys/${journey.publicId}`),
      });
    }
  }

  const xml = renderSitemapUrlset(
    normalizeSitemapUrls(urls, "sitemap-journeys"),
  );

  return buildSitemapXmlResponse(xml);
}
