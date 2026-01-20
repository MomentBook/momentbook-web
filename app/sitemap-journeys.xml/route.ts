import { languageList } from "@/lib/i18n/config";

function generateSitemapXML(urls: {
  loc: string;
  lastmod: string;
  alternates: { lang: string; href: string }[]
}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
${url.alternates
  .map(
    (alt) =>
      `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>`
  )
  .join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>`;
}

async function fetchPublishedJourneys() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    console.warn("[sitemap-journeys] API_BASE_URL not configured");
    return [];
  }

  try {
    const response = await fetch(`${apiBaseUrl}/v2/journeys/public?limit=10000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.warn("[sitemap-journeys] API request failed:", response.status);
      return [];
    }

    const data = await response.json();

    if (data.status === "success" && Array.isArray(data.data)) {
      return data.data.map((journey: any) => ({
        publicId: journey.publicId,
        publishedAt: journey.publishedAt || journey.createdAt,
      }));
    }

    return [];
  } catch (error) {
    console.error("[sitemap-journeys] Failed to fetch journeys:", error);
    return [];
  }
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const journeys = await fetchPublishedJourneys();

  const urls = journeys.map((journey: any) => ({
    loc: `${siteUrl}/en/journeys/${journey.publicId}`,
    lastmod: journey.publishedAt ? new Date(journey.publishedAt).toISOString() : new Date().toISOString(),
    alternates: languageList.map((lang) => ({
      lang,
      href: `${siteUrl}/${lang}/journeys/${journey.publicId}`,
    })),
  }));

  const xml = generateSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
