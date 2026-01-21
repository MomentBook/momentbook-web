import { MetadataRoute } from "next";
import { languageList } from "@/lib/i18n/config";
import { fetchPublicUsers } from "@/lib/public-users";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemapUsers(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

  // Fetch all public users
  const response = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = response?.data?.users ?? [];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each user in each language
  users.forEach((user) => {
    languageList.forEach((lang) => {
      sitemapEntries.push({
        url: `${siteUrl}/${lang}/users/${user.userId}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
