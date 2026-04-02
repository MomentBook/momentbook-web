import {
  buildSitemapXmlResponse,
  renderSitemapIndex,
  resolveSitemapSiteUrl,
  validateSitemapEntries,
} from "@/lib/sitemap/xml";
import { fetchPublicUserSitemapChunks } from "@/lib/sitemap/public-content";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();
  const chunks = await fetchPublicUserSitemapChunks();

  const xml = renderSitemapIndex(
    validateSitemapEntries(
      chunks.map((chunk) => ({
        loc: `${siteUrl}/sitemaps/users/${chunk.index}.xml`,
      })),
      "sitemap-users-index",
    ),
  );

  return buildSitemapXmlResponse(xml);
}
