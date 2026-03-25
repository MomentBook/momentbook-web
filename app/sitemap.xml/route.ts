import {
  buildSitemapXmlResponse,
  renderSitemapIndex,
  resolveSitemapSiteUrl,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();
  const sitemapUrls = [
    `${siteUrl}/sitemap-static.xml`,
    `${siteUrl}/sitemap-journeys.xml`,
    `${siteUrl}/sitemap-journey-moments.xml`,
    `${siteUrl}/sitemap-photos.xml`,
    `${siteUrl}/sitemap-users.xml`,
  ].map((loc) => ({ loc }));

  const xml = renderSitemapIndex(sitemapUrls);

  return buildSitemapXmlResponse(xml);
}
