import { renderSitemapIndex } from "@/lib/sitemap/xml";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const sitemapUrls = [
    `${siteUrl}/sitemap-static.xml`,
    `${siteUrl}/sitemap-journeys.xml`,
    `${siteUrl}/sitemap-journey-moments.xml`,
    `${siteUrl}/sitemap-photos.xml`,
    `${siteUrl}/sitemap-users.xml`,
  ].map((loc) => ({ loc }));

  const xml = renderSitemapIndex(sitemapUrls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
