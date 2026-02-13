import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchAllPublicUsersForSitemap } from "@/lib/sitemap/public-content";
import {
  normalizeSitemapUrls,
  renderSitemapUrlset,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  const users = await fetchAllPublicUsersForSitemap();

  const urls: SitemapUrlEntry[] = users.flatMap((user) =>
    languageList.map((lang) => ({
      loc: `${siteUrl}/${lang}/users/${user.userId}`,
      lastmod: null,
      changefreq: "weekly",
      priority: 0.7,
      alternates: buildSitemapAlternates(siteUrl, `/users/${user.userId}`),
    })),
  );

  const xml = renderSitemapUrlset(normalizeSitemapUrls(urls, "sitemap-users"));

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
