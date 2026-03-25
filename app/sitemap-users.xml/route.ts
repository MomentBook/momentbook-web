import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchAllPublicUsersForSitemap } from "@/lib/sitemap/public-content";
import {
  buildSitemapXmlResponse,
  normalizeSitemapUrls,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();

  const users = await fetchAllPublicUsersForSitemap();

  const urls: SitemapUrlEntry[] = users.flatMap((user) =>
    languageList.map((lang) => ({
      loc: `${siteUrl}/${lang}/users/${user.userId}`,
      lastmod: null,
      alternates: buildSitemapAlternates(siteUrl, `/users/${user.userId}`),
    })),
  );

  const xml = renderSitemapUrlset(normalizeSitemapUrls(urls, "sitemap-users"));

  return buildSitemapXmlResponse(xml);
}
