import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import { fetchPublishedJourneyMomentSitemapPart } from "@/lib/sitemap/public-content";
import {
  buildSitemapXmlResponse,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  validateSitemapEntries,
  type SitemapImageEntry,
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

function buildClusterImages(
  photoIds: string[],
  imageUrlByPhotoId: Map<string, string>,
): SitemapImageEntry[] | undefined {
  const seen = new Set<string>();
  const images: SitemapImageEntry[] = [];

  for (const photoId of photoIds) {
    const url = imageUrlByPhotoId.get(photoId);

    if (!url || seen.has(url)) {
      continue;
    }

    seen.add(url);
    images.push({ loc: url });

    if (images.length >= 1000) {
      break;
    }
  }

  return images.length > 0 ? images : undefined;
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

  const payload = await fetchPublishedJourneyMomentSitemapPart(publicId, part);

  if (!payload) {
    return buildNotFoundResponse();
  }

  const { journey, clusters } = payload;
  const siteUrl = resolveSitemapSiteUrl();
  const lastmod = toIsoDateOrNull(journey.publishedAt ?? journey.createdAt);
  const imageUrlByPhotoId = new Map(
    journey.images.map((image) => [image.photoId, image.url] as const),
  );
  const urls: SitemapUrlEntry[] = [];

  for (const cluster of clusters) {
    const encodedClusterId = encodeURIComponent(cluster.clusterId);

    for (const lang of languageList) {
      urls.push({
        loc: `${siteUrl}/${lang}/journeys/${journey.publicId}/moments/${encodedClusterId}`,
        lastmod,
        alternates: buildSitemapAlternates(
          siteUrl,
          `/journeys/${journey.publicId}/moments/${encodedClusterId}`,
        ),
        images: buildClusterImages(cluster.photoIds, imageUrlByPhotoId),
      });
    }
  }

  return buildSitemapXmlResponse(
    renderSitemapUrlset(
      validateSitemapEntries(
        urls,
        `sitemap-journey-moments-${journey.publicId}-${part}`,
      ),
    ),
  );
}
