const MAX_URLS_PER_SITEMAP = 50000;

export type SitemapAlternate = {
  lang: string;
  href: string;
};

export type SitemapUrlEntry = {
  loc: string;
  lastmod?: string | null;
  changefreq?: string;
  priority?: number;
  alternates?: SitemapAlternate[];
};

export type SitemapIndexEntry = {
  loc: string;
  lastmod?: string | null;
};

export function toIsoDateOrNull(value: string | number | Date | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function normalizeSitemapUrls<T>(urls: T[], label: string): T[] {
  if (urls.length <= MAX_URLS_PER_SITEMAP) {
    return urls;
  }

  console.warn(
    `[${label}] URL count ${urls.length} exceeds ${MAX_URLS_PER_SITEMAP}. Truncating to protocol limit.`,
  );
  return urls.slice(0, MAX_URLS_PER_SITEMAP);
}

export function renderSitemapUrlset(urls: SitemapUrlEntry[]): string {
  const body = urls
    .map((url) => {
      const lines = [
        "  <url>",
        `    <loc>${xmlEscape(url.loc)}</loc>`,
      ];

      if (url.lastmod) {
        lines.push(`    <lastmod>${xmlEscape(url.lastmod)}</lastmod>`);
      }
      if (url.changefreq) {
        lines.push(`    <changefreq>${xmlEscape(url.changefreq)}</changefreq>`);
      }
      if (typeof url.priority === "number") {
        lines.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
      }
      if (url.alternates?.length) {
        lines.push(
          ...url.alternates.map(
            (alt) =>
              `    <xhtml:link rel="alternate" hreflang="${xmlEscape(alt.lang)}" href="${xmlEscape(alt.href)}"/>`,
          ),
        );
      }

      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>`;
}

export function renderSitemapIndex(entries: SitemapIndexEntry[]): string {
  const body = entries
    .map((entry) => {
      const lines = [
        "  <sitemap>",
        `    <loc>${xmlEscape(entry.loc)}</loc>`,
      ];

      if (entry.lastmod) {
        lines.push(`    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>`);
      }

      lines.push("  </sitemap>");
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`;
}

