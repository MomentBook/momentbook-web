import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchAllPublishedJourneysForSitemap } from "@/lib/sitemap/public-content";
import {
  normalizeSitemapUrls,
  renderSitemapUrlset,
  toIsoDateOrNull,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const journeys = await fetchAllPublishedJourneysForSitemap();

  const urls: SitemapUrlEntry[] = [];
  for (const journey of journeys) {
    const lastmod = toIsoDateOrNull(journey.publishedAt ?? journey.createdAt);
    for (const lang of languageList) {
      urls.push({
        loc: `${siteUrl}/${lang}/journeys/${journey.publicId}`,
        lastmod,
        changefreq: "weekly",
        priority: 0.9,
        alternates: buildSitemapAlternates(siteUrl, `/journeys/${journey.publicId}`),
      });
    }
  }

  const xml = renderSitemapUrlset(
    normalizeSitemapUrls(urls, "sitemap-journeys"),
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
