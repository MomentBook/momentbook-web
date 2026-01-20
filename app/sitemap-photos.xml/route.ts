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
    <priority>0.6</priority>
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

async function fetchPublishedPhotos() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    console.warn("[sitemap-photos] API_BASE_URL not configured");
    return [];
  }

  try {
    // Fetch all published journeys first to get their photos
    const response = await fetch(`${apiBaseUrl}/v2/journeys/public?limit=10000`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (data.status === "success" && Array.isArray(data.data)) {
      // Extract all photos from all journeys
      const photos: { photoId: string; publishedAt: string }[] = [];

      data.data.forEach((journey: any) => {
        if (Array.isArray(journey.images)) {
          journey.images.forEach((image: any) => {
            if (image.photoId) {
              photos.push({
                photoId: image.photoId,
                publishedAt: journey.publishedAt || journey.createdAt,
              });
            }
          });
        }
      });

      return photos;
    }

    return [];
  } catch (error) {
    console.error("[sitemap-photos] Failed to fetch photos:", error);
    return [];
  }
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const photos = await fetchPublishedPhotos();

  const urls = photos.map((photo) => ({
    loc: `${siteUrl}/en/photos/${photo.photoId}`,
    lastmod: photo.publishedAt ? new Date(photo.publishedAt).toISOString() : new Date().toISOString(),
    alternates: languageList.map((lang) => ({
      lang,
      href: `${siteUrl}/${lang}/photos/${photo.photoId}`,
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
