import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublishedJourneyPhotoSitemapPart } from "@/lib/sitemap/public-content";
import {
  buildSitemapXmlResponse,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  validateSitemapEntries,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;

function parsePositiveInteger(value: string): number | null {
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
  {
    params,
  }: {
    params: Promise<{ publicId: string; part: string }>;
  },
) {
  const { publicId, part: rawPart } = await params;
  const part = parsePositiveInteger(rawPart);

  if (!part) {
    return buildNotFoundResponse();
  }

  const payload = await fetchPublishedJourneyPhotoSitemapPart(publicId, part);

  if (!payload) {
    return buildNotFoundResponse();
  }

  const { journey, images } = payload;
  const siteUrl = resolveSitemapSiteUrl();
  const lastmod = toIsoDateOrNull(journey.publishedAt ?? journey.createdAt);
  const urls: SitemapUrlEntry[] = [];

  for (const image of images) {
    for (const lang of languageList) {
      urls.push({
        loc: `${siteUrl}/${lang}/photos/${image.photoId}`,
        lastmod,
        alternates: buildSitemapAlternates(siteUrl, `/photos/${image.photoId}`),
        images: [{ loc: image.url }],
      });
    }
  }

  return buildSitemapXmlResponse(
    renderSitemapUrlset(
      validateSitemapEntries(urls, `sitemap-photos-${journey.publicId}-${part}`),
    ),
  );
}
