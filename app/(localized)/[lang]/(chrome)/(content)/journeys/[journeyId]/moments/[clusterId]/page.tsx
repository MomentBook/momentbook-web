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
  buildStructuredDataKeywordValue,
  compactSocialImages,
  resolveTwitterCard,
  buildSeoDescription,
} from "@/lib/seo/public-metadata";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
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
  const title = buildMomentSeoTitle(journey.title, locationName);
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
  const imageUrlMap = buildMomentImageUrlMap(journey);
  const clusterImages = compactSocialImages(
    buildMomentPhotos(cluster, imageUrlMap)
      .slice(0, 6)
      .map((photo) => ({
        url: photo.url,
        alt: title,
      })),
  );

  return {
    title,
    description,
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
      card: resolveTwitterCard(clusterImages),
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
  const clusterImageUrls = clusterPhotos.map((photo) => photo.url);
  const user = await fetchPublicUser(journey.userId);
  const authorName = readMomentLocationName(user?.name);
  const siteUrl = resolveStructuredDataSiteUrl();
  const pageUrl = buildStructuredDataUrl(
    buildOpenGraphUrl(lang, `/journeys/${journey.publicId}/moments/${cluster.clusterId}`),
    siteUrl,
  );
  const headline = buildMomentSeoTitle(journey.title, locationName);
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: seoDescription,
    image: clusterImageUrls,
    inLanguage: toLocaleTag(lang),
    ...(keywordValue ? { keywords: keywordValue } : {}),
    datePublished: journey.publishedAt,
    dateModified: journey.publishedAt,
    ...(cluster.locationName
      ? {
          about: [
            {
              "@type": "Place",
              name: cluster.locationName,
            },
          ],
        }
      : {}),
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

  return (
    <div className={styles.page}>
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
