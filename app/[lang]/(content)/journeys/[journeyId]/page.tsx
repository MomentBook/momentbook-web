import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  fetchPublishedJourney,
  type PublishedJourneyApi,
  type PublishedJourneyCluster,
} from "@/lib/published-journey";

export const revalidate = 3600;

const journeyLabels: Record<
  Language,
  {
    eyebrow: string;
    photoCount: string;
    locationCount: string;
    duration: string;
    places: string;
    gallery: string;
    hours: string;
  }
> = {
  en: {
    eyebrow: "Journey",
    photoCount: "photos",
    locationCount: "places",
    duration: "duration",
    places: "Places Visited",
    gallery: "Photo Gallery",
    hours: "h",
  },
  ko: {
    eyebrow: "여정",
    photoCount: "장",
    locationCount: "곳",
    duration: "소요 시간",
    places: "방문한 장소",
    gallery: "사진 갤러리",
    hours: "시간",
  },
  ja: {
    eyebrow: "旅",
    photoCount: "枚",
    locationCount: "か所",
    duration: "所要時間",
    places: "訪れた場所",
    gallery: "フォトギャラリー",
    hours: "時間",
  },
  zh: {
    eyebrow: "行程",
    photoCount: "张照片",
    locationCount: "个地点",
    duration: "持续时间",
    places: "到访地点",
    gallery: "照片画廊",
    hours: "小时",
  },
};

function formatDateRange(lang: Language, start: number, end: number) {
  const formatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const startDate = formatter.format(new Date(start));
  const endDate = formatter.format(new Date(end));

  if (startDate === endDate) {
    return startDate;
  }

  return `${startDate} – ${endDate}`;
}

function formatDuration(ms: number, hoursLabel: string) {
  const hours = Math.round(ms / (1000 * 60 * 60));
  if (hours < 1) {
    const minutes = Math.round(ms / (1000 * 60));
    return `${minutes}m`;
  }
  return `${hours}${hoursLabel}`;
}

function getUniqueLocations(clusters: PublishedJourneyCluster[]): string[] {
  const locationSet = new Set<string>();
  clusters.forEach((cluster) => {
    if (cluster.locationName) {
      locationSet.add(cluster.locationName);
    }
  });
  return Array.from(locationSet);
}

function buildImageUrlToPhotoIdMap(journey: PublishedJourneyApi): Map<string, string> {
  const map = new Map<string, string>();
  journey.images.forEach((img) => {
    map.set(img.url, img.photoId);
  });
  return map;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; journeyId: string }>;
}): Promise<Metadata> {
  const { lang, journeyId } = (await params) as {
    lang: Language;
    journeyId: string;
  };
  const journey = await fetchPublishedJourney(journeyId);

  if (!journey) {
    return {
      title: "Journey not found",
    };
  }

  const path = `/journeys/${journey.publicId}`;
  const url = buildOpenGraphUrl(lang, path);
  const locations = getUniqueLocations(journey.clusters);
  const description =
    journey.description ||
    `A journey through ${locations.slice(0, 3).join(", ")} with ${journey.photoCount} photos`;

  const images = journey.images.slice(0, 6).map((img) => ({
    url: img.url,
    alt: journey.title,
  }));

  return {
    title: journey.title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: journey.title,
      description,
      type: "article",
      url,
      images,
      publishedTime: journey.publishedAt,
      modifiedTime: journey.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: journey.title,
      description,
      images: images.map((img) => img.url),
    },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ lang: string; journeyId: string }>;
}) {
  const { lang, journeyId } = (await params) as {
    lang: Language;
    journeyId: string;
  };
  const journey = await fetchPublishedJourney(journeyId);

  if (!journey) {
    notFound();
  }

  const labels = journeyLabels[lang] ?? journeyLabels.en;
  const dateRange = formatDateRange(lang, journey.startedAt, journey.endedAt);
  const locations = getUniqueLocations(journey.clusters);
  const totalDuration = journey.clusters.reduce(
    (sum, cluster) => sum + cluster.time.durationMs,
    0
  );
  const imageMap = buildImageUrlToPhotoIdMap(journey);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(
    buildOpenGraphUrl(lang, `/journeys/${journey.publicId}`),
    siteUrl
  ).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: journey.title,
    description: journey.description,
    image: journey.images.map((img) => img.url),
    datePublished: journey.publishedAt,
    dateModified: journey.publishedAt,
    author: {
      "@type": "Person",
      name: "MomentBook User",
    },
    publisher: {
      "@type": "Organization",
      name: "MomentBook",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <div>
            <p className={styles.eyebrow}>{labels.eyebrow}</p>
            <h1 className={styles.title}>{journey.title}</h1>
            {journey.description && (
              <p className={styles.subtitle}>{journey.description}</p>
            )}
          </div>
        </div>

        <div className={styles.metaRow}>
          <span>{dateRange}</span>
          <span>
            {journey.photoCount} {labels.photoCount}
          </span>
          <span>
            {locations.length} {labels.locationCount}
          </span>
          {totalDuration > 0 && (
            <span>{formatDuration(totalDuration, labels.hours)}</span>
          )}
        </div>
      </header>

      {locations.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{labels.places}</h2>
          <div className={styles.tagGrid}>
            {locations.map((location) => (
              <span key={location} className={styles.tag}>
                {location}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.gallery}</h2>

        {journey.clusters.map((cluster) => {
          const clusterPhotos = cluster.photoIds
            .map((photoUrl) => {
              const photoId = imageMap.get(photoUrl);
              return {
                url: photoUrl,
                photoId: photoId || "",
              };
            })
            .filter((photo) => photo.photoId);

          if (clusterPhotos.length === 0) return null;

          return (
            <div key={cluster.clusterId} className={styles.clusterSection}>
              {cluster.locationName && (
                <h3 className={styles.clusterTitle}>{cluster.locationName}</h3>
              )}

              <div className={styles.photoGrid}>
                {clusterPhotos.map((photo) => (
                  <div key={photo.photoId} className={styles.photoCard}>
                    <div className={styles.photoFrame}>
                      <Image
                        src={photo.url}
                        alt={cluster.locationName || journey.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.photoImage}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
