import type { Metadata } from "next";
import { redirect } from "next/navigation";
import styles from "./journeys.module.scss";
import {
  type Language,
} from "@/lib/i18n/config";
import { buildOpenGraphUrl, buildPaginatedAlternates } from "@/lib/i18n/metadata";
import {
  fetchPublishedJourneys,
} from "@/lib/published-journey";
import {
  buildPaginationEntries,
  parsePositiveIntegerPage,
} from "@/lib/pagination";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import {
  buildLocalizedAppScreenshotImage,
  buildOpenGraphBase,
  buildPublicRobots,
} from "@/lib/seo/public-metadata";
import { buildJourneyCards, buildJourneyPageHref } from "./journeys.helpers";
import { JourneysListContent } from "./JourneysListContent";
import {
  buildJourneyPageDescription,
  buildJourneyPageTitle,
  getJourneyPageLabels,
  JOURNEYS_PER_PAGE,
} from "./journeys-page.helpers";

export const revalidate = 300;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Language };
  const { page } = (await searchParams) as { page?: string | string[] };
  const labels = getJourneyPageLabels(lang);
  const currentPage = parsePositiveIntegerPage(page);
  const title = buildJourneyPageTitle(labels, currentPage);
  const description = buildJourneyPageDescription(labels, currentPage);
  const socialImages = [buildLocalizedAppScreenshotImage(lang, title)];
  const path = "/journeys";
  const openGraphPath =
    currentPage > 1 ? `${path}?page=${currentPage}` : path;

  return {
    title,
    description,
    applicationName: "MomentBook",
    creator: "MomentBook",
    publisher: "MomentBook",
    robots: buildPublicRobots(),
    alternates: buildPaginatedAlternates(lang, path, currentPage),
    openGraph: {
      ...buildOpenGraphBase(lang, openGraphPath),
      type: "website",
      title,
      description,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImages.map((image) => image.url),
    },
  };
}

export default async function JourneysPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { lang } = (await params) as { lang: Language };
  const { page } = (await searchParams) as { page?: string | string[] };
  const labels = getJourneyPageLabels(lang);
  const requestedPage = parsePositiveIntegerPage(page);
  const journeysData = await fetchPublishedJourneys({
    page: requestedPage,
    limit: JOURNEYS_PER_PAGE,
    sort: "recent",
    lang,
  });

  const journeys = journeysData?.journeys ?? [];
  const totalJourneys = journeysData?.total ?? 0;
  const totalPages = Math.max(1, journeysData?.pages ?? 1);
  const safeCurrentPage = Math.min(requestedPage, totalPages);

  if (requestedPage !== safeCurrentPage) {
    redirect(buildJourneyPageHref(lang, safeCurrentPage));
  }

  const paginationEntries = buildPaginationEntries(safeCurrentPage, totalPages);
  const hasPreviousPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;
  const cards = await buildJourneyCards(journeys, labels);
  const siteUrl = resolveStructuredDataSiteUrl();
  const pagePath = buildOpenGraphUrl(lang, "/journeys");
  const pagePathWithQuery =
    safeCurrentPage > 1 ? `${pagePath}?page=${safeCurrentPage}` : pagePath;
  const pageUrl = buildStructuredDataUrl(pagePathWithQuery, siteUrl);
  const offset = (safeCurrentPage - 1) * JOURNEYS_PER_PAGE;
  const pageTitle = buildJourneyPageTitle(labels, safeCurrentPage);
  const description = buildJourneyPageDescription(labels, safeCurrentPage);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description,
    url: pageUrl,
    publisher: buildPublisherOrganizationJsonLd(siteUrl),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalJourneys,
      itemListElement: cards.map((card, index) => ({
        "@type": "ListItem",
        position: offset + index + 1,
        url: buildStructuredDataUrl(
          buildOpenGraphUrl(lang, `/journeys/${card.publicId}`),
          siteUrl,
        ),
        name: card.title,
      })),
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <JourneysListContent
        lang={lang}
        labels={labels}
        cards={cards}
        safeCurrentPage={safeCurrentPage}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        paginationEntries={paginationEntries}
      />
    </div>
  );
}
