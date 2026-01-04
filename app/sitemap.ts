import { MetadataRoute } from "next";
import { journeys, places, days } from "@/lib/content";
import { languageList } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  const staticPaths = [
    "",
    "/about",
    "/how-it-works",
    "/download",
    "/faq",
    "/privacy",
    "/terms",
    "/community-guidelines",
    "/support",
  ];

  // Generate routes for each language
  const staticRoutes = languageList.flatMap((lang) =>
    staticPaths.map((route) => ({
      url: `${siteUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const journeyRoutes = languageList.flatMap((lang) =>
    journeys.map((journey) => ({
      url: `${siteUrl}/${lang}/journeys/${journey.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const placeRoutes = languageList.flatMap((lang) =>
    places.map((place) => ({
      url: `${siteUrl}/${lang}/places/${place.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const dayRoutes = languageList.flatMap((lang) =>
    days.map((day) => ({
      url: `${siteUrl}/${lang}/days/${day.date}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...journeyRoutes, ...placeRoutes, ...dayRoutes];
}
