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

async function fetchPublishedUsers() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    console.warn("[sitemap-users] API_BASE_URL not configured");
    return [];
  }

  try {
    // Get unique user IDs from published journeys
    const response = await fetch(`${apiBaseUrl}/v2/journeys/public?limit=10000`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (data.status === "success" && Array.isArray(data.data)) {
      // Extract unique user IDs
      const userMap = new Map<string, string>();

      data.data.forEach((journey: any) => {
        if (journey.userId) {
          const lastUpdate = journey.publishedAt || journey.createdAt || new Date().toISOString();
          const existing = userMap.get(journey.userId);

          // Keep the most recent update
          if (!existing || lastUpdate > existing) {
            userMap.set(journey.userId, lastUpdate);
          }
        }
      });

      return Array.from(userMap.entries()).map(([userId, lastUpdate]) => ({
        userId,
        lastUpdate,
      }));
    }

    return [];
  } catch (error) {
    console.error("[sitemap-users] Failed to fetch users:", error);
    return [];
  }
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const users = await fetchPublishedUsers();

  const urls = users.map((user) => ({
    loc: `${siteUrl}/en/users/${user.userId}`,
    lastmod: user.lastUpdate ? new Date(user.lastUpdate).toISOString() : new Date().toISOString(),
    alternates: languageList.map((lang) => ({
      lang,
      href: `${siteUrl}/${lang}/users/${user.userId}`,
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
