import { languageList } from "@/lib/i18n/config";

function generateSitemapXML(urls: { loc: string; alternates: { lang: string; href: string }[] }[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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

  const staticPaths = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/journeys", priority: 0.8 },
    { path: "/download", priority: 0.9 },
    { path: "/faq", priority: 0.7 },
    { path: "/privacy", priority: 0.5 },
    { path: "/terms", priority: 0.5 },
    { path: "/community-guidelines", priority: 0.5 },
    { path: "/marketing-consent", priority: 0.5 },
    { path: "/support", priority: 0.6 },
  ];

  const urls = staticPaths.map((page) => ({
    loc: `${siteUrl}/en${page.path}`,
    alternates: languageList.map((lang) => ({
      lang,
      href: `${siteUrl}/${lang}${page.path}`,
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
