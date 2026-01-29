import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  // Return sitemap index pointing to sub-sitemaps
  return [
    {
      url: `${siteUrl}/sitemap-static.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-journeys.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-journey-moments.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-photos.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-users.xml`,
      lastModified: new Date(),
    },
  ];
}
