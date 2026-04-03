import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublishedJourneySitemapChunks } from "@/lib/sitemap/public-content";
import {
  buildSitemapXmlResponse,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  validateSitemapEntries,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

function parsePositiveInteger(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }

  return parsed;
}

function buildNotFoundResponse() {
  return new Response("Not found", { status: 404 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ part?: string }> },
) {
  const { part: rawPart } = await params;
  const part = parsePositiveInteger(rawPart);

  if (!part) {
    return buildNotFoundResponse();
  }

  const chunks = await fetchPublishedJourneySitemapChunks();
  const chunk = chunks.find((entry) => entry.index === part);

  if (!chunk) {
    return buildNotFoundResponse();
  }

  const siteUrl = resolveSitemapSiteUrl();
  const urls: SitemapUrlEntry[] = [];

  for (const journey of chunk.items) {
    const lastmod = toIsoDateOrNull(journey.publishedAt ?? journey.createdAt);

    for (const lang of languageList) {
      urls.push({
        loc: `${siteUrl}/${lang}/journeys/${journey.publicId}`,
        lastmod,
        alternates: buildSitemapAlternates(siteUrl, `/journeys/${journey.publicId}`),
        images: journey.thumbnailUrl ? [{ loc: journey.thumbnailUrl }] : undefined,
      });
    }
  }

  return buildSitemapXmlResponse(
    renderSitemapUrlset(validateSitemapEntries(urls, `sitemap-journeys-part-${part}`)),
  );
}
