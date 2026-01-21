import { MetadataRoute } from "next";
import { languageList } from "@/lib/i18n/config";
import { fetchPublicUsers, fetchUserJourneys } from "@/lib/public-users";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemapJourneys(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  // Fetch all public users
  const usersResponse = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = usersResponse?.data?.users ?? [];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Fetch journeys for each user
  for (const user of users) {
    const journeysResponse = await fetchUserJourneys(user.userId, { limit: 1000 });
    const journeys = journeysResponse?.data?.journeys ?? [];

    // Generate entries for each journey in each language
    journeys.forEach((journey) => {
      languageList.forEach((lang) => {
        sitemapEntries.push({
          url: `${siteUrl}/${lang}/journeys/${journey.publicId}`,
          lastModified: new Date(journey.publishedAt),
          changeFrequency: "weekly",
          priority: 0.9,
        });
      });
    });
  }

  return sitemapEntries;
}
