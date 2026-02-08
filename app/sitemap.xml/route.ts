function generateSitemapIndexXML(sitemapUrls: {
  loc: string;
  lastmod: string;
}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (item) => `  <sitemap>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const lastmod = new Date().toISOString();
  const sitemapUrls = [
    `${siteUrl}/sitemap-static.xml`,
    `${siteUrl}/sitemap-journeys.xml`,
    `${siteUrl}/sitemap-journey-moments.xml`,
    `${siteUrl}/sitemap-photos.xml`,
    `${siteUrl}/sitemap-users.xml`,
  ].map((loc) => ({ loc, lastmod }));

  const xml = generateSitemapIndexXML(sitemapUrls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
