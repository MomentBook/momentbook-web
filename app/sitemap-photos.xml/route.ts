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
        Array.from({ length: entry.photoParts }, (_, index) => ({
          loc: `${siteUrl}/sitemaps/photos/${encodeURIComponent(entry.publicId)}/${index + 1}.xml`,
          lastmod: entry.lastmod,
        })),
      ),
      "sitemap-photos-index",
    ),
  );

  return buildSitemapXmlResponse(xml);
}
