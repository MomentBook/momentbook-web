import type { Metadata } from "next";
import { redirect } from "next/navigation";
import styles from "./journeys.module.scss";
import {
  type Language,
  toLocaleTag,
} from "@/lib/i18n/config";
import { buildOpenGraphUrl, buildAlternates } from "@/lib/i18n/metadata";
import {
  fetchPublishedJourneys,
} from "@/lib/published-journey";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import {
  buildLocalizedAppScreenshotImage,
  buildOpenGraphBase,
  buildPublicKeywords,
  buildPublicRobots,
} from "@/lib/seo/public-metadata";
import { buildJourneyCards } from "./journeys.helpers";
import { JourneysListContent } from "./JourneysListContent";
import {
  buildJourneyPageDescription,
  buildJourneyPageTitle,
  getJourneyPageLabels,
  JOURNEYS_BATCH_SIZE,
} from "./journeys-page.helpers";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Language };
  const labels = getJourneyPageLabels(lang);
  const title = buildJourneyPageTitle(labels);
  const description = buildJourneyPageDescription(labels);
  const socialImages = [buildLocalizedAppScreenshotImage(lang, title)];
  const path = "/journeys";

  const keywords = buildPublicKeywords({
    lang,
    kind: "journey",
    extra: [title],
  });

  return {
    title,
    description,
    keywords,
    applicationName: "MomentBook",
    creator: "MomentBook",
    publisher: "MomentBook",
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      ...buildOpenGraphBase(lang, path),
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
  const hasLegacyPageQuery =
    typeof page === "string" || (Array.isArray(page) && page.length > 0);

  if (hasLegacyPageQuery) {
    redirect(`/${lang}/journeys`);
  }

  const labels = getJourneyPageLabels(lang);
  const journeysData = await fetchPublishedJourneys({
    page: 1,
    limit: JOURNEYS_BATCH_SIZE,
    sort: "discovery",
    lang,
  });

  const journeys = journeysData?.journeys ?? [];
  const totalJourneys = journeysData?.total ?? 0;
  const cards = await buildJourneyCards(journeys, labels);
  const siteUrl = resolveStructuredDataSiteUrl();
  const pagePath = buildOpenGraphUrl(lang, "/journeys");
  const pageUrl = buildStructuredDataUrl(pagePath, siteUrl);
  const pageTitle = buildJourneyPageTitle(labels);
  const description = buildJourneyPageDescription(labels);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description,
    url: pageUrl,
    inLanguage: toLocaleTag(lang),
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
        position: index + 1,
        url: buildStructuredDataUrl(
          buildOpenGraphUrl(lang, `/journeys/${card.publicId}`),
          siteUrl,
        ),
        name: card.title,
      })),
    },
  };

  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(lang, [
    { name: pageTitle, path: `/${lang}/journeys` },
  ], siteUrl);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <JourneysListContent
        lang={lang}
        labels={labels}
        initialCards={cards}
        initialPage={journeysData?.page ?? 1}
        initialTotalJourneys={totalJourneys}
        initialHasMore={journeysData?.hasMore ?? false}
      />
    </div>
  );
}
