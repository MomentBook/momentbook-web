import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-static.xml`,
      `${siteUrl}/sitemap-journeys.xml`,
      `${siteUrl}/sitemap-journey-moments.xml`,
      `${siteUrl}/sitemap-photos.xml`,
      `${siteUrl}/sitemap-users.xml`,
    ],
  };
}
