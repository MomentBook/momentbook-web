import {
  buildSitemapXmlResponse,
  renderSitemapIndex,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  validateSitemapEntries,
} from "@/lib/sitemap/xml";
import { fetchPublishedJourneySitemapChunks } from "@/lib/sitemap/public-content";

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
  const chunks = await fetchPublishedJourneySitemapChunks();

  const xml = renderSitemapIndex(
    validateSitemapEntries(
      chunks.map((chunk) => ({
        loc: `${siteUrl}/sitemaps/journeys/${chunk.index}.xml`,
        lastmod: resolveChunkLastmod(
          chunk.items.map((journey) => journey.publishedAt ?? journey.createdAt),
        ),
      })),
      "sitemap-journeys-index",
    ),
  );

  return buildSitemapXmlResponse(xml);
}
