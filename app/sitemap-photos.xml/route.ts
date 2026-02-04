import { buildSitemapAlternates } from "@/lib/i18n/config";
import { fetchPublicUsers, fetchUserJourneys } from "@/lib/public-users";
import { fetchPublishedJourney } from "@/lib/published-journey";

function safeISOString(date: string | number | undefined): string {
  if (!date) {
    return new Date().toISOString();
  }

  try {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      return new Date().toISOString();
    }
    return parsed.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function generateSitemapXML(urls: {
  loc: string;
  lastmod: string;
  alternates: { lang: string; href: string }[];
}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
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

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  // Fetch all public users
  const usersResponse = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = usersResponse?.data?.users ?? [];

  const urls: {
    loc: string;
    lastmod: string;
    alternates: { lang: string; href: string }[];
  }[] = [];

  const seenPhotoIds = new Set<string>();

  // Fetch journeys for each user and extract photo IDs
  for (const user of users) {
    const journeysResponse = await fetchUserJourneys(user.userId, {
      limit: 1000,
    });
    const journeys = journeysResponse?.data?.journeys ?? [];

    // Extract photo IDs from each journey
    for (const journey of journeys) {
      const publishedJourney = await fetchPublishedJourney(journey.publicId);
      if (!publishedJourney) {
        continue;
      }

      const images = publishedJourney.images ?? [];
      const publishedAt = safeISOString(publishedJourney.publishedAt);

      images.forEach((image) => {
        if (!image.photoId || seenPhotoIds.has(image.photoId)) {
          return;
        }

        seenPhotoIds.add(image.photoId);

        urls.push({
          loc: `${siteUrl}/en/photos/${image.photoId}`,
          lastmod: publishedAt,
          alternates: buildSitemapAlternates(
            siteUrl,
            `/photos/${image.photoId}`,
          ),
        });
      });
    }
  }

  const xml = generateSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
