import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./moment.module.scss";
import { type Language, toLocaleTag } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublishedJourney } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import {
  buildOpenGraphArticleTags,
  buildOpenGraphBase,
  buildPublicKeywords,
  buildPublicRobots,
  buildSocialImageSequence,
  buildSeoTitle,
  buildStructuredDataKeywordValue,
  buildSeoDescription,
} from "@/lib/seo/public-metadata";
import { buildSocialImageMetadata } from "@/lib/seo/social-image";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getJourneyPageLabels } from "../../../journeys-page.helpers";
import { MomentContent } from "./MomentContent";
import {
  buildMomentDisplayLocationName,
  buildMomentImageUrlMap,
  buildMomentPhotos,
  buildMomentSeoDescription,
  buildMomentSeoTitle,
  findJourneyCluster,
  momentLabels,
  momentNotFoundTitleByLanguage,
  readMomentLocationName,
} from "./moment.helpers";

export const revalidate = 300;

function buildVisibleMomentTopics(hashtags: string[]): Array<{ "@type": "DefinedTerm"; name: string }> {
  return hashtags
    .map((tag) => tag.replace(/^#+/, "").trim())
    .filter((tag) => tag.length > 0)
    .slice(0, 8)
    .map((tag) => ({
      "@type": "DefinedTerm" as const,
      name: tag,
    }));
}

function buildJourneyThumbnailSocialImages(
  journey: NonNullable<Awaited<ReturnType<typeof fetchPublishedJourney>>>,
  fallbackImages: Array<{ url: string }>,
  alt: string,
) {
  const thumbnailImage = journey.thumbnailUrl
    ? journey.images.find((image) => image.url === journey.thumbnailUrl)
    : undefined;
  const fallbackImage = fallbackImages[0];

  return buildSocialImageSequence(
    [
      journey.thumbnailUrl
        ? {
            url: journey.thumbnailUrl,
            width: thumbnailImage?.width,
            height: thumbnailImage?.height,
            alt,
          }
        : null,
      fallbackImage
        ? {
            url: fallbackImage.url,
            alt,
          }
        : null,
    ],
    { limit: 1 },
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; journeyId: string; clusterId: string }>;
}): Promise<Metadata> {
  const { lang, journeyId, clusterId } = (await params) as {
    lang: Language;
    journeyId: string;
    clusterId: string;
  };

  const journey = await fetchPublishedJourney(journeyId, lang);

  if (!journey) {
    return {
      title: momentNotFoundTitleByLanguage[lang],
    };
  }

  const cluster = findJourneyCluster(journey, clusterId);
  if (!cluster) {
    return {
      title: momentNotFoundTitleByLanguage[lang],
    };
  }

  const labels = momentLabels[lang] ?? momentLabels.en;
  const locationName = readMomentLocationName(cluster.locationName);
  const title = buildSeoTitle([
    buildMomentSeoTitle(journey.title, locationName),
    labels.eyebrow,
  ]);
  const description = buildSeoDescription([
    cluster.impression,
    buildMomentSeoDescription(
      lang,
      journey.title,
      cluster.locationName ?? null,
      cluster.photoIds.length,
    ),
  ]);
  const keywords = buildPublicKeywords({
    lang,
    kind: "moment",
    title,
    locationNames: cluster.locationName ? [cluster.locationName] : [],
    hashtags: journey.hashtags,
    extra: [labels.eyebrow, journey.title],
  });
  const path = `/journeys/${journey.publicId}/moments/${cluster.clusterId}`;
  const clusterImages = buildSocialImageMetadata(
    {
      kind: "moment",
      lang,
      journeyId: journey.publicId,
      clusterId: cluster.clusterId,
    },
    title,
  );

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
      title,
      description,
      type: "article",
      images: clusterImages,
      publishedTime: journey.publishedAt,
      modifiedTime: journey.publishedAt,
      section: labels.eyebrow,
      tags: buildOpenGraphArticleTags(keywords),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: clusterImages?.map((img) => img.url),
    },
  };
}

export default async function JourneyMomentPage({
  params,
}: {
  params: Promise<{ lang: string; journeyId: string; clusterId: string }>;
}) {
  const { lang, journeyId, clusterId } = (await params) as {
    lang: Language;
    journeyId: string;
    clusterId: string;
  };

  const journey = await fetchPublishedJourney(journeyId, lang);

  if (!journey) {
    notFound();
  }

  const cluster = findJourneyCluster(journey, clusterId);

  if (!cluster) {
    notFound();
  }

  const labels = momentLabels[lang] ?? momentLabels.en;
  const locationName = readMomentLocationName(cluster.locationName);
  const displayLocationName = buildMomentDisplayLocationName(labels, locationName);
  const imageUrlMap = buildMomentImageUrlMap(journey);
  const clusterPhotos = buildMomentPhotos(cluster, imageUrlMap);
  const structuredImages =
    buildJourneyThumbnailSocialImages(journey, clusterPhotos, displayLocationName)?.map(
      (image) => image.url,
    ) ?? clusterPhotos.map((photo) => photo.url);
  const user = await fetchPublicUser(journey.userId);
  const authorName = readMomentLocationName(user?.name);
  const siteUrl = resolveStructuredDataSiteUrl();
  const pageUrl = buildStructuredDataUrl(
    buildOpenGraphUrl(lang, `/journeys/${journey.publicId}/moments/${cluster.clusterId}`),
    siteUrl,
  );
  const headline = buildSeoTitle([
    buildMomentSeoTitle(journey.title, locationName),
    labels.eyebrow,
  ]);
  const description = buildMomentSeoDescription(
    lang,
    journey.title,
    cluster.locationName ?? null,
    cluster.photoIds.length,
  );
  const seoDescription = buildSeoDescription([
    cluster.impression,
    description,
  ]);
  const keywords = buildPublicKeywords({
    lang,
    kind: "moment",
    title: headline,
    locationNames: cluster.locationName ? [cluster.locationName] : [],
    authorName,
    hashtags: journey.hashtags,
    extra: [labels.eyebrow, journey.title],
  });
  const keywordValue = buildStructuredDataKeywordValue(keywords);
  const about = [
    ...(cluster.locationName
      ? [
          {
            "@type": "Place" as const,
            name: cluster.locationName,
          },
        ]
      : []),
    ...buildVisibleMomentTopics(journey.hashtags),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: seoDescription,
    image: structuredImages,
    inLanguage: toLocaleTag(lang),
    ...(keywordValue ? { keywords: keywordValue } : {}),
    datePublished: journey.publishedAt,
    dateModified: journey.publishedAt,
    ...(about.length > 0 ? { about } : {}),
    ...(authorName
      ? {
          author: {
            "@type": "Person",
            name: authorName,
            url: buildStructuredDataUrl(
              buildOpenGraphUrl(lang, `/users/${journey.userId}`),
              siteUrl,
            ),
          },
        }
      : {}),
    publisher: buildPublisherOrganizationJsonLd(siteUrl),
    isPartOf: {
      "@type": "Article",
      name: journey.title,
      url: buildStructuredDataUrl(
        buildOpenGraphUrl(lang, `/journeys/${journey.publicId}`),
        siteUrl,
      ),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const journeyPageLabels = getJourneyPageLabels(lang);
  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(lang, [
    { name: journeyPageLabels.title, path: `/${lang}/journeys` },
    { name: journey.title || journeyPageLabels.title, path: `/${lang}/journeys/${journey.publicId}` },
    { name: displayLocationName, path: `/${lang}/journeys/${journey.publicId}/moments/${cluster.clusterId}` },
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
      <MomentContent
        lang={lang}
        journey={journey}
        cluster={cluster}
        labels={labels}
        displayLocationName={displayLocationName}
        clusterPhotos={clusterPhotos}
      />
    </div>
  );
}
