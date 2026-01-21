import { MetadataRoute } from "next";
import { languageList } from "@/lib/i18n/config";
import { fetchPublicUsers, fetchUserJourneys } from "@/lib/public-users";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemapPhotos(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  // Fetch all public users
  const usersResponse = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = usersResponse?.data?.users ?? [];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const seenPhotoIds = new Set<string>();

  // Fetch journeys for each user and extract photo IDs
  for (const user of users) {
    const journeysResponse = await fetchUserJourneys(user.userId, { limit: 1000 });
    const journeys = journeysResponse?.data?.journeys ?? [];

    // Extract photo IDs from each journey
    journeys.forEach((journey) => {
      const images = journey.images ?? [];
      images.forEach((image) => {
        // Avoid duplicates
        if (image.photoId && !seenPhotoIds.has(image.photoId)) {
          seenPhotoIds.add(image.photoId);

          // Generate entries for each photo in each language
          languageList.forEach((lang) => {
            sitemapEntries.push({
              url: `${siteUrl}/${lang}/photos/${image.photoId}`,
              lastModified: new Date(journey.publishedAt),
              changeFrequency: "monthly",
              priority: 0.6,
            });
          });
        }
      });
    });
  }

  return sitemapEntries;
}
