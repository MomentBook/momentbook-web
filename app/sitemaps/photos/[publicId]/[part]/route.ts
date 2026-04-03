import { buildSitemapAlternates, languageList } from "@/lib/i18n/config";
import {
  fetchJourneyPhotoSitemapPartParams,
  fetchPublishedJourneyPhotoSitemapPart,
} from "@/lib/sitemap/public-content";
import {
  readSingleRouteParam,
  resolveAppRouteParams,
  stripRequiredRouteSuffix,
  type AppRouteContext,
} from "@/lib/sitemap/route-params";
import {
  buildSitemapXmlResponse,
  renderSitemapUrlset,
  resolveSitemapSiteUrl,
  toIsoDateOrNull,
  validateSitemapEntries,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";

export const revalidate = 3600;
export const dynamicParams = true;

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

type JourneyPhotoSitemapRouteParams = {
  publicId?: string;
  part?: string;
};

export async function generateStaticParams() {
  return fetchJourneyPhotoSitemapPartParams();
}

export async function GET(
  _request: Request,
  context: AppRouteContext<JourneyPhotoSitemapRouteParams>,
) {
  const params = await resolveAppRouteParams(context);
  const publicId = readSingleRouteParam(params?.publicId);
  const rawPart = stripRequiredRouteSuffix(
    readSingleRouteParam(params?.part),
    ".xml",
  );
  const part = parsePositiveInteger(rawPart);

  if (!publicId || !part) {
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
