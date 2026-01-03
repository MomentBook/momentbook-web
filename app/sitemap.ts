import { MetadataRoute } from "next";
import { journeys, places, days } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  const staticRoutes = [
    "",
    "/about",
    "/how-it-works",
    "/download",
    "/faq",
    "/privacy",
    "/terms",
    "/support",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const journeyRoutes = journeys.map((journey) => ({
    url: `${siteUrl}/journeys/${journey.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const placeRoutes = places.map((place) => ({
    url: `${siteUrl}/places/${place.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const dayRoutes = days.map((day) => ({
    url: `${siteUrl}/days/${day.date}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...journeyRoutes, ...placeRoutes, ...dayRoutes];
}
