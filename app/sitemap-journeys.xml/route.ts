import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublicUsers, fetchUserJourneys } from "@/lib/public-users";

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
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
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

  // Fetch journeys for each user
  for (const user of users) {
    const journeysResponse = await fetchUserJourneys(user.userId, {
      limit: 1000,
    });
    const journeys = journeysResponse?.data?.journeys ?? [];

    // Generate entries for each journey
    journeys.forEach((journey) => {
      languageList.forEach((lang) => {
        urls.push({
          loc: `${siteUrl}/${lang}/journeys/${journey.publicId}`,
          lastmod: safeISOString(journey.publishedAt),
          alternates: buildSitemapAlternates(
            siteUrl,
            `/journeys/${journey.publicId}`,
          ),
        });
      });
    });
  }

  const xml = generateSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
