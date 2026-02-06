import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublicUsers } from "@/lib/public-users";

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

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  // Fetch all public users
  const response = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = response?.data?.users ?? [];

  const lastmod = new Date().toISOString();
  const urls = users.flatMap((user) =>
    languageList.map((lang) => ({
      loc: `${siteUrl}/${lang}/users/${user.userId}`,
      lastmod,
      alternates: buildSitemapAlternates(siteUrl, `/users/${user.userId}`),
    })),
  );

  const xml = generateSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
