import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  publicJourneys,
  getPublicJourney,
  getJourneyPhotos,
  getPublicUser,
} from "@/lib/public-content";

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

function formatDateRange(lang: Language, start: number, end: number, openEnded: string) {
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
  const journey = getPublicJourney(journeyId);

  if (!journey) {
    return {
      title: "Journey not found",
    };
  }

  const path = `/journeys/${journeyId}`;
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
  const journey = getPublicJourney(journeyId);

  if (!journey) {
    notFound();
  }

  const user = getPublicUser(journey.userId);
  const photos = getJourneyPhotos(journey.journeyId);
  const labels = journeyLabels[lang] ?? journeyLabels.en;
  const dateRange = formatDateRange(lang, journey.startedAt, journey.endedAt, labels.openEnded);
  const stats = journey.recapDraft.inputSummary;

  return (
    <div className={styles.page}>
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
          <span>{stats.totalLocations} {labels.locationCountLabel}</span>
          <span>{formatDuration(stats.timeSpanMs, labels.hoursLabel, labels.openEnded)}</span>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.highlights}</h2>
        <ul className={styles.highlightList}>
          {journey.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

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

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{labels.photosTitle}</h2>
          <Link href={`/${lang}/download`} className={styles.ctaLink}>
            {labels.download}
          </Link>
        </div>
        <div className={styles.photoGrid}>
          {photos.map((photo) => (
            <Link
              key={photo.photoId}
              href={`/${lang}/photos/${photo.photoId}`}
              className={styles.photoCard}
            >
              <div className={styles.photoFrame}>
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.photoImage}
                />
              </div>
              <div className={styles.photoMeta}>
                <p className={styles.photoCaption}>{photo.caption}</p>
                <p className={styles.photoLocation}>{photo.locationName}</p>
              </div>
            </Link>
          ))}
          {photos.length === 0 && (
            <div className={styles.emptyState}>
              {labels.empty}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
