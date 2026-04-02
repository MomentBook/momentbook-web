import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import {
  buildSitemapXmlResponse,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  validateSitemapEntries,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();
  const staticLastmod = toIsoDateOrNull(
    process.env.NEXT_PUBLIC_SITEMAP_STATIC_LASTMOD ?? null,
  );

  // Static content pages
  const contentPages = ["faq", "journeys", "users"];

  const urls: SitemapUrlEntry[] = [];

  // Homepage entries for each language
  languageList.forEach((lang) => {
    urls.push({
      loc: `${siteUrl}/${lang}`,
      lastmod: staticLastmod,
      alternates: buildSitemapAlternates(siteUrl, ""),
    });
  });

  // All static pages for each language
  contentPages.forEach((page) => {
    languageList.forEach((lang) => {
      urls.push({
        loc: `${siteUrl}/${lang}/${page}`,
        lastmod: staticLastmod,
        alternates: buildSitemapAlternates(siteUrl, page),
      });
    });
  });

  const xml = renderSitemapUrlset(validateSitemapEntries(urls, "sitemap-static"));

  return buildSitemapXmlResponse(xml);
}
