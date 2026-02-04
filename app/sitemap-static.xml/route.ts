import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";

function generateSitemapXML(urls: {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
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
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
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
  const lastmod = new Date().toISOString();

  // Static marketing pages
  const marketingPages = ["about", "how-it-works", "download"];

  // Static content pages
  const contentPages = ["faq", "journeys", "users"];

  // Legal pages
  const legalPages = [
    "privacy",
    "terms",
    "community-guidelines",
    "marketing-consent",
    "support",
  ];

  const allPages = [...marketingPages, ...contentPages, ...legalPages];

  const urls: {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
    alternates: { lang: string; href: string }[];
  }[] = [];

  // Homepage entries for each language
  languageList.forEach((lang) => {
    urls.push({
      loc: `${siteUrl}/${lang}`,
      lastmod,
      changefreq: "monthly",
      priority: 1.0,
      alternates: buildSitemapAlternates(siteUrl, ""),
    });
  });

  // All static pages for each language
  allPages.forEach((page) => {
    languageList.forEach((lang) => {
      urls.push({
        loc: `${siteUrl}/${lang}/${page}`,
        lastmod,
        changefreq: "monthly",
        priority: 0.8,
        alternates: buildSitemapAlternates(siteUrl, page),
      });
    });
  });

  const xml = generateSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
