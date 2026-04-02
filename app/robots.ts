import { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin",
      },
    ],
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
