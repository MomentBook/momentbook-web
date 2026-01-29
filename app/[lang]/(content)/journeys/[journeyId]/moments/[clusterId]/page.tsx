import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./moment.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  fetchPublishedJourney,
  type PublishedJourneyCluster,
} from "@/lib/published-journey";
import ClientMap from "../../components/ClientMap";

export const revalidate = 3600;

type MomentLabels = {
  eyebrow: string;
  backToJourney: string;
  timeLabel: string;
  photosLabel: string;
  journeyLabel: string;
  mapTitle: string;
  contextNote: string;
  emptyPhotos: string;
  locationFallback: string;
};

const momentLabels: Record<Language, MomentLabels> = {
  en: {
    eyebrow: "Moment",
    backToJourney: "Back to Journey",
    timeLabel: "Time",
    photosLabel: "photos",
    journeyLabel: "Journey",
    mapTitle: "Place on the map",
    contextNote: "This moment is part of a published journey. Unshared moments remain private.",
    emptyPhotos: "No photos in this moment.",
    locationFallback: "Location",
  },
  ko: {
    eyebrow: "순간",
    backToJourney: "여정으로 돌아가기",
    timeLabel: "시간",
    photosLabel: "장",
    journeyLabel: "여정",
    mapTitle: "지도에서 보기",
    contextNote: "이 순간은 게시된 여정의 일부입니다. 공유되지 않은 기록은 공개되지 않습니다.",
    emptyPhotos: "이 순간에는 사진이 없습니다.",
    locationFallback: "장소",
  },
  ja: {
    eyebrow: "瞬間",
    backToJourney: "旅に戻る",
    timeLabel: "時間",
    photosLabel: "枚",
    journeyLabel: "旅",
    mapTitle: "地図で見る",
    contextNote: "この瞬間は公開された旅の一部です。共有していない記録は公開されません。",
    emptyPhotos: "この瞬間には写真がありません。",
    locationFallback: "場所",
  },
  zh: {
    eyebrow: "瞬间",
    backToJourney: "返回行程",
    timeLabel: "时间",
    photosLabel: "张",
    journeyLabel: "行程",
    mapTitle: "在地图上查看",
    contextNote: "此瞬间属于已发布的行程。未发布的记录不会公开。",
    emptyPhotos: "此瞬间没有照片。",
    locationFallback: "地点",
  },
};

function formatClusterRange(lang: Language, cluster: PublishedJourneyCluster) {
  const start = new Date(cluster.time.startAt);
  const end = new Date(cluster.time.endAt);
  const dateFormatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat(lang, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const startDate = dateFormatter.format(start);
  const endDate = dateFormatter.format(end);
  const startTime = timeFormatter.format(start);
  const endTime = timeFormatter.format(end);

  if (startDate === endDate) {
    return `${startDate} · ${startTime}–${endTime}`;
  }

  return `${startDate} ${startTime} – ${endDate} ${endTime}`;
}

function buildImageUrlToPhotoIdMap(
  journeyImages: Array<{ url: string; photoId: string }>,
) {
  const map = new Map<string, string>();
  journeyImages.forEach((img) => {
    map.set(img.photoId, img.url);
  });
  return map;
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

  const journey = await fetchPublishedJourney(journeyId);

  if (!journey) {
    return {
      title: "Moment not found",
    };
  }

  const cluster = journey.clusters.find((item) => item.clusterId === clusterId);
  if (!cluster) {
    return {
      title: "Moment not found",
    };
  }

  const labels = momentLabels[lang] ?? momentLabels.en;
  const locationName = cluster.locationName || labels.locationFallback;
  const title = `${locationName} · ${journey.title}`;
  const description = `A moment from ${journey.title}`;
  const path = `/journeys/${journey.publicId}/moments/${cluster.clusterId}`;
  const url = buildOpenGraphUrl(lang, path);

  const imageMap = buildImageUrlToPhotoIdMap(journey.images);
  const clusterImages = cluster.photoIds
    .map((photoId) => imageMap.get(photoId))
    .filter(Boolean)
    .slice(0, 6)
    .map((imgUrl) => ({
      url: imgUrl as string,
      alt: title,
    }));

  return {
    title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: clusterImages.length > 0 ? clusterImages : undefined,
      publishedTime: journey.publishedAt,
      modifiedTime: journey.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: clusterImages.map((img) => img.url),
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

  const journey = await fetchPublishedJourney(journeyId);

  if (!journey) {
    notFound();
  }

  const cluster = journey.clusters.find((item) => item.clusterId === clusterId);

  if (!cluster) {
    notFound();
  }

  const labels = momentLabels[lang] ?? momentLabels.en;
  const locationName = cluster.locationName || labels.locationFallback;
  const timeRange = formatClusterRange(lang, cluster);
  const imageMap = buildImageUrlToPhotoIdMap(journey.images);
  const clusterPhotos = cluster.photoIds
    .map((photoId) => ({
      photoId,
      url: imageMap.get(photoId),
    }))
    .filter((photo) => photo.photoId && photo.url);
  const clusterImageUrls = clusterPhotos.map((photo) => photo.url as string);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(
    buildOpenGraphUrl(lang, `/journeys/${journey.publicId}/moments/${cluster.clusterId}`),
    siteUrl,
  ).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locationName,
    description: `Moment from ${journey.title}`,
    image: clusterImageUrls,
    datePublished: journey.publishedAt,
    dateModified: journey.publishedAt,
    isPartOf: {
      "@type": "Article",
      name: journey.title,
      url: new URL(
        buildOpenGraphUrl(lang, `/journeys/${journey.publicId}`),
        siteUrl,
      ).toString(),
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.header}>
        <Link
          href={`/${lang}/journeys/${journey.publicId}`}
          className={styles.backLink}
        >
          ← {labels.backToJourney}
        </Link>
        <p className={styles.eyebrow}>{labels.eyebrow}</p>
        <h1 className={styles.title}>{locationName}</h1>
        <p className={styles.subtitle}>
          {labels.journeyLabel}: {journey.title}
        </p>
        <div className={styles.metaRow}>
          <span>{timeRange}</span>
          <span>
            {clusterPhotos.length} {labels.photosLabel}
          </span>
        </div>
      </header>

      <p className={styles.contextNote}>{labels.contextNote}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.mapTitle}</h2>
        <ClientMap
          clusters={[cluster]}
          mode={journey.mode}
          locationFallback={labels.locationFallback}
          photoLabel={labels.photosLabel}
          lang={lang}
          journeyPublicId={journey.publicId}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {clusterPhotos.length} {labels.photosLabel}
        </h2>
        {clusterPhotos.length > 0 ? (
          <div className={styles.photoGrid}>
            {clusterPhotos.map((photo) => (
              <Link
                key={photo.photoId}
                href={`/${lang}/photos/${photo.photoId}`}
                className={styles.photoCard}
              >
                <div className={styles.photoFrame}>
                  <Image
                    src={photo.url as string}
                    alt={locationName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.photoImage}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>{labels.emptyPhotos}</div>
        )}
      </section>
    </div>
  );
}
