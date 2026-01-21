import { MetadataRoute } from "next";
import { languageList } from "@/lib/i18n/config";

export default function sitemapStatic(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

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

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each language
  languageList.forEach((lang) => {
    // Homepage
    sitemapEntries.push({
      url: `${siteUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    });

    // All static pages
    allPages.forEach((page) => {
      sitemapEntries.push({
        url: `${siteUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  return sitemapEntries;
}
