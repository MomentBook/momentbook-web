import { MetadataRoute } from "next";
import { publicJourneys, publicPhotos, publicUsers } from "@/lib/public-content";
import { languageList } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  const staticPaths = [
    "",
    "/about",
    "/how-it-works",
    "/journeys",
    "/download",
    "/faq",
    "/privacy",
    "/terms",
    "/community-guidelines",
    "/marketing-consent",
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
    publicJourneys.map((journey) => ({
      url: `${siteUrl}/${lang}/journeys/${journey.journeyId}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const photoRoutes = languageList.flatMap((lang) =>
    publicPhotos.map((photo) => ({
      url: `${siteUrl}/${lang}/photos/${photo.photoId}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  const userRoutes = languageList.flatMap((lang) =>
    publicUsers.map((user) => ({
      url: `${siteUrl}/${lang}/users/${user.userId}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...journeyRoutes, ...photoRoutes, ...userRoutes];
}
