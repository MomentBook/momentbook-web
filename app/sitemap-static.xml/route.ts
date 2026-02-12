import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import {
  normalizeSitemapUrls,
  renderSitemapUrlset,
  toIsoDateOrNull,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const staticLastmod = toIsoDateOrNull(
    process.env.NEXT_PUBLIC_SITEMAP_STATIC_LASTMOD ?? null,
  );

  // Static marketing pages
  const marketingPages = ["about", "download"];

  // Static content pages
  const contentPages = ["faq", "journeys", "users"];

  const allPages = [...marketingPages, ...contentPages];

  const urls: SitemapUrlEntry[] = [];

  // Homepage entries for each language
  languageList.forEach((lang) => {
    urls.push({
      loc: `${siteUrl}/${lang}`,
      lastmod: staticLastmod,
      changefreq: "monthly",
      priority: 1.0,
      alternates: buildSitemapAlternates(siteUrl, ""),
    });
  });

  // All static pages for each language
  allPages.forEach((page) => {
    languageList.forEach((lang) => {
      urls.push({
        loc: `${siteUrl}/${lang}/${page}`,
        lastmod: staticLastmod,
        changefreq: "monthly",
        priority: 0.8,
        alternates: buildSitemapAlternates(siteUrl, page),
      });
    });
  });

  const xml = renderSitemapUrlset(normalizeSitemapUrls(urls, "sitemap-static"));

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
