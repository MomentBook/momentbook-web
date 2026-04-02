import {
  buildSitemapXmlResponse,
  renderSitemapIndex,
  resolveSitemapSiteUrl,
  validateSitemapEntries,
} from "@/lib/sitemap/xml";
import { fetchJourneyMediaSitemapCatalog } from "@/lib/sitemap/public-content";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();
  const catalog = await fetchJourneyMediaSitemapCatalog();

  const xml = renderSitemapIndex(
    validateSitemapEntries(
      catalog.flatMap((entry) =>
        Array.from({ length: entry.momentParts }, (_, index) => ({
          loc: `${siteUrl}/sitemaps/journey-moments/${encodeURIComponent(entry.publicId)}/${index + 1}.xml`,
          lastmod: entry.lastmod,
        })),
      ),
      "sitemap-journey-moments-index",
    ),
  );

  return buildSitemapXmlResponse(xml);
}
