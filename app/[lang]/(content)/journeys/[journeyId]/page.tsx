import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  type JourneyImage,
  type JourneyInputSummary,
  type PublicJourney,
  publicJourneys,
  getPublicJourney,
  getJourneyPhotos,
  getPublicUser,
} from "@/lib/public-content";
import {
  fetchPublishedJourney,
  type PublishedJourneyApi,
} from "@/lib/published-journey";

export const revalidate = 3600;

const journeyLabels: Record<Language, {
  eyebrow: string;
  highlights: string;
  places: string;
  photosTitle: string;
  download: string;
  empty: string;
  photoCountLabel: string;
  locationCountLabel: string;
  hoursLabel: string;
  openEnded: string;
}> = {
  en: {
    eyebrow: "Journey",
    highlights: "Highlights",
    places: "Places visited",
    photosTitle: "Photos from this journey",
    download: "Download MomentBook",
    empty: "No photos shared yet.",
    photoCountLabel: "photos",
    locationCountLabel: "locations",
    hoursLabel: "h",
    openEnded: "—",
  },
  ko: {
    eyebrow: "여정",
    highlights: "하이라이트",
    places: "방문한 장소",
    photosTitle: "이 여정의 사진",
    download: "MomentBook 다운로드",
    empty: "공유된 사진이 아직 없습니다.",
    photoCountLabel: "장",
    locationCountLabel: "곳",
    hoursLabel: "시간",
    openEnded: "—",
  },
  ja: {
    eyebrow: "旅",
    highlights: "ハイライト",
    places: "訪れた場所",
    photosTitle: "この旅の写真",
    download: "MomentBook をダウンロード",
    empty: "まだ共有された写真がありません。",
    photoCountLabel: "枚",
    locationCountLabel: "か所",
    hoursLabel: "時間",
    openEnded: "—",
  },
  zh: {
    eyebrow: "行程",
    highlights: "亮点",
    places: "到访地点",
    photosTitle: "该行程的照片",
    download: "下载 MomentBook",
    empty: "还没有共享的照片。",
    photoCountLabel: "张照片",
    locationCountLabel: "个地点",
    hoursLabel: "小时",
    openEnded: "—",
  },
};

type JourneyView = {
  source: "api" | "static";
  journeyId: string;
  userId?: string;
  title: string;
  description: string;
  startedAt: number;
  endedAt?: number;
  recapStage?: "NONE" | "SYSTEM_DONE" | "USER_DONE" | "FINALIZED" | "DRAFT";
  recapDraft: {
    inputSummary: JourneyInputSummary;
    computed?: Record<string, any>;
  };
  highlights: string[];
  locations: string[];
  images: JourneyImage[];
};

type JourneyPhotoCard = {
  id: string;
  url: string;
  caption?: string;
  locationName?: string;
  href?: string;
};

function getMetadataString(
  metadata: Record<string, any> | undefined,
  key: string,
): string | undefined {
  const value = metadata?.[key];
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function getMetadataStringArray(
  metadata: Record<string, any> | undefined,
  key: string,
): string[] {
  const value = metadata?.[key];
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function extractLocationNames(recapDraft?: PublishedJourneyApi["recapDraft"]): string[] {
  const names = new Set<string>();

  const addName = (value: unknown) => {
    if (typeof value !== "string") {
      return;
    }
    const trimmed = value.trim();
    if (trimmed.length) {
      names.add(trimmed);
    }
  };

  const routeClusters = recapDraft?.computed?.route?.routeClusters ?? [];
  for (const cluster of routeClusters) {
    addName(cluster?.locationName);
  }

  const orphanClusters = recapDraft?.computed?.unmapped?.orphanClusters ?? [];
  for (const cluster of orphanClusters) {
    addName(cluster?.locationName);
  }

  return Array.from(names);
}

function buildJourneyFromApi(apiJourney: PublishedJourneyApi): JourneyView {
  const metadata = apiJourney.metadata ?? {};
  const images = Array.isArray(apiJourney.images) ? apiJourney.images : [];
  const locationNames = [
    ...getMetadataStringArray(metadata, "locations"),
    ...extractLocationNames(apiJourney.recapDraft),
  ];
  const uniqueLocations = Array.from(new Set(locationNames));
  const metadataHighlights = getMetadataStringArray(metadata, "highlights");
  const highlights =
    metadataHighlights.length > 0
      ? metadataHighlights
      : uniqueLocations.slice(0, 3);

  const fallbackSummary: JourneyInputSummary = {
    totalPhotos: images.length,
    totalLocations: uniqueLocations.length,
    totalStayPoints: uniqueLocations.length,
    timeSpanMs: apiJourney.endedAt
      ? apiJourney.endedAt - apiJourney.startedAt
      : 0,
  };

  const recapDraft = apiJourney.recapDraft ?? {};
  const inputSummary = recapDraft.inputSummary ?? fallbackSummary;

  return {
    source: "api",
    journeyId: apiJourney.publicId,
    userId: apiJourney.userId ?? getMetadataString(metadata, "userId"),
    title: getMetadataString(metadata, "title") ?? "Untitled journey",
    description: getMetadataString(metadata, "description") ?? "",
    startedAt: apiJourney.startedAt,
    endedAt: apiJourney.endedAt,
    recapStage: apiJourney.recapStage,
    recapDraft: {
      ...recapDraft,
      inputSummary,
    },
    highlights,
    locations: uniqueLocations,
    images,
  };
}

function buildJourneyFromStatic(journey: PublicJourney): JourneyView {
  return {
    ...journey,
    source: "static",
  };
}

function formatDateRange(
  lang: Language,
  start: number,
  end: number | undefined,
  openEnded: string,
) {
  const formatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const startLabel = formatter.format(new Date(start));
  const endLabel = end ? formatter.format(new Date(end)) : openEnded;

  return `${startLabel} · ${endLabel}`;
}

function formatDuration(ms: number, hoursLabel: string, openEnded: string) {
  if (!ms) {
    return openEnded;
  }

  const hours = Math.round(ms / 3600000);
  return `${hours}${hoursLabel}`;
}

export async function generateStaticParams() {
  return languageList.flatMap((lang) =>
    publicJourneys.map((journey) => ({
      lang,
      journeyId: journey.journeyId,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; journeyId: string }>;
}): Promise<Metadata> {
  const { lang, journeyId } = await params as { lang: Language; journeyId: string };
  const apiJourney = await fetchPublishedJourney(journeyId);
  const journey = apiJourney
    ? buildJourneyFromApi(apiJourney)
    : (() => {
        const staticJourney = getPublicJourney(journeyId);
        return staticJourney ? buildJourneyFromStatic(staticJourney) : null;
      })();

  if (!journey) {
    return {
      title: "Journey not found",
    };
  }

  const path = `/journeys/${journey.journeyId}`;
  const url = buildOpenGraphUrl(lang, path);
  const images = journey.images.map((image) => ({
    url: image.url,
    width: image.width,
    height: image.height,
    alt: journey.title,
  }));

  return {
    title: journey.title,
    description: journey.description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: journey.title,
      description: journey.description,
      type: "article",
      url,
      images: images.length ? images : undefined,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: journey.title,
      description: journey.description,
      images: images.length ? images.map((image) => image.url) : undefined,
    },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ lang: string; journeyId: string }>;
}) {
  const { lang, journeyId } = await params as { lang: Language; journeyId: string };
  const apiJourney = await fetchPublishedJourney(journeyId);
  const journey = apiJourney
    ? buildJourneyFromApi(apiJourney)
    : (() => {
        const staticJourney = getPublicJourney(journeyId);
        return staticJourney ? buildJourneyFromStatic(staticJourney) : null;
      })();

  if (!journey) {
    notFound();
  }

  const user = journey.userId ? getPublicUser(journey.userId) : undefined;
  const photos =
    journey.source === "static" ? getJourneyPhotos(journey.journeyId) : [];
  const labels = journeyLabels[lang] ?? journeyLabels.en;
  const dateRange = formatDateRange(lang, journey.startedAt, journey.endedAt, labels.openEnded);
  const stats = journey.recapDraft.inputSummary;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, `/journeys/${journey.journeyId}`), siteUrl).toString();
  const authorUrl = user
    ? new URL(buildOpenGraphUrl(lang, `/users/${user.userId}`), siteUrl).toString()
    : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: journey.title,
    description: journey.description,
    image: journey.images.map((image) => image.url),
    author: user
      ? {
          "@type": "Person",
          name: user.displayName,
          url: authorUrl,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "MomentBook",
      url: siteUrl,
    },
    datePublished: new Date(journey.startedAt).toISOString(),
    dateModified: new Date(journey.endedAt || journey.startedAt).toISOString(),
    mainEntityOfPage: pageUrl,
  };

  const photoCards: JourneyPhotoCard[] =
    journey.source === "static"
      ? photos.map((photo) => ({
          id: photo.photoId,
          url: photo.url,
          caption: photo.caption,
          locationName: photo.locationName,
          href: `/${lang}/photos/${photo.photoId}`,
        }))
      : journey.images.map((image, index) => ({
          id: image.photoId || image.url || `photo-${index}`,
          url: image.url,
          caption: image.caption,
          locationName: image.locationName,
          href: image.photoId ? `/${lang}/photos/${image.photoId}` : undefined,
        }));

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
            <p className={styles.subtitle}>{journey.description}</p>
          </div>
          {user && (
            <Link href={`/${lang}/users/${user.userId}`} className={styles.userCard}>
              <div>
                <p className={styles.userName}>{user.displayName}</p>
                <p className={styles.userHandle}>{user.handle}</p>
              </div>
            </Link>
          )}
        </div>

        <div className={styles.metaRow}>
          <span>{dateRange}</span>
          <span>{stats.totalPhotos} {labels.photoCountLabel}</span>
          <span>{stats.totalStayPoints} {labels.locationCountLabel}</span>
          <span>{formatDuration(stats.timeSpanMs, labels.hoursLabel, labels.openEnded)}</span>
        </div>
      </header>

      {journey.highlights.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{labels.highlights}</h2>
          <ul className={styles.highlightList}>
            {journey.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      {journey.locations.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{labels.places}</h2>
          <div className={styles.tagGrid}>
            {journey.locations.map((location) => (
              <span key={location} className={styles.tag}>
                {location}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{labels.photosTitle}</h2>
          <Link href={`/${lang}/download`} className={styles.ctaLink}>
            {labels.download}
          </Link>
        </div>
        <div className={styles.photoGrid}>
          {photoCards.map((photo) => {
            const content = (
              <>
                <div className={styles.photoFrame}>
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? journey.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.photoImage}
                  />
                </div>
                {(photo.caption || photo.locationName) && (
                  <div className={styles.photoMeta}>
                    {photo.caption && (
                      <p className={styles.photoCaption}>{photo.caption}</p>
                    )}
                    {photo.locationName && (
                      <p className={styles.photoLocation}>{photo.locationName}</p>
                    )}
                  </div>
                )}
              </>
            );

            if (photo.href) {
              return (
                <Link key={photo.id} href={photo.href} className={styles.photoCard}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={photo.id} className={styles.photoCard}>
                {content}
              </div>
            );
          })}
          {photoCards.length === 0 && (
            <div className={styles.emptyState}>
              {labels.empty}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
