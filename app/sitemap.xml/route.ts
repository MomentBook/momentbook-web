import {
  buildSitemapXmlResponse,
  validateSitemapEntries,
  renderSitemapIndex,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
} from "@/lib/sitemap/xml";
import {
  fetchJourneyMediaSitemapCatalog,
  fetchPublishedJourneySitemapChunks,
  fetchPublicUserSitemapChunks,
} from "@/lib/sitemap/public-content";

export const revalidate = 3600;

function resolveChunkLastmod(values: Array<string | null | undefined>) {
  const timestamps = values
    .map((value) => toIsoDateOrNull(value ?? null))
    .filter((value): value is string => Boolean(value))
    .map((value) => Date.parse(value))
    .filter((value) => Number.isFinite(value));

  if (timestamps.length === 0) {
    return null;
  }

  return new Date(Math.max(...timestamps)).toISOString();
}

export async function GET() {
  const siteUrl = resolveSitemapSiteUrl();
  const [journeyChunks, userChunks, journeyMediaCatalog] = await Promise.all([
    fetchPublishedJourneySitemapChunks(),
    fetchPublicUserSitemapChunks(),
    fetchJourneyMediaSitemapCatalog(),
  ]);

  const sitemapUrls = validateSitemapEntries(
    [
      { loc: `${siteUrl}/sitemap-static.xml` },
      ...journeyChunks.map((chunk) => ({
        loc: `${siteUrl}/sitemaps/journeys/${chunk.index}.xml`,
        lastmod: resolveChunkLastmod(
          chunk.items.map((journey) => journey.publishedAt ?? journey.createdAt),
        ),
      })),
      ...userChunks.map((chunk) => ({
        loc: `${siteUrl}/sitemaps/users/${chunk.index}.xml`,
      })),
      ...journeyMediaCatalog.flatMap((entry) => [
        ...Array.from({ length: entry.momentParts }, (_, index) => ({
          loc: `${siteUrl}/sitemaps/journey-moments/${encodeURIComponent(entry.publicId)}/${index + 1}.xml`,
          lastmod: entry.lastmod,
        })),
        ...Array.from({ length: entry.photoParts }, (_, index) => ({
          loc: `${siteUrl}/sitemaps/photos/${encodeURIComponent(entry.publicId)}/${index + 1}.xml`,
          lastmod: entry.lastmod,
        })),
      ]),
    ],
    "sitemap-index",
  );

  const xml = renderSitemapIndex(sitemapUrls);

  return buildSitemapXmlResponse(xml);
}
