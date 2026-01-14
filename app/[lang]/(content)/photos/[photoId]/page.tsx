import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./photo.module.scss";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  publicPhotos,
  getPublicPhoto,
  getPublicJourney,
  getPublicUser,
} from "@/lib/public-content";

export const revalidate = 3600;

const photoLabels: Record<Language, {
  back: string;
  journey: string;
  traveler: string;
  captured: string;
}> = {
  en: {
    back: "← Back to journey",
    journey: "Journey",
    traveler: "Traveler",
    captured: "Captured",
  },
  ko: {
    back: "← 여정으로 돌아가기",
    journey: "여정",
    traveler: "여행자",
    captured: "기록 시각",
  },
  ja: {
    back: "← 旅に戻る",
    journey: "旅",
    traveler: "旅行者",
    captured: "記録時刻",
  },
  zh: {
    back: "← 返回行程",
    journey: "行程",
    traveler: "旅行者",
    captured: "记录时间",
  },
};

export async function generateStaticParams() {
  return languageList.flatMap((lang) =>
    publicPhotos.map((photo) => ({
      lang,
      photoId: photo.photoId,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; photoId: string }>;
}): Promise<Metadata> {
  const { lang, photoId } = await params as { lang: Language; photoId: string };
  const photo = getPublicPhoto(photoId);

  if (!photo) {
    return {
      title: "Photo not found",
    };
  }

  const path = `/photos/${photoId}`;
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: photo.caption,
    description: `${photo.locationName} · ${photo.caption}`,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: photo.caption,
      description: `${photo.locationName} · ${photo.caption}`,
      type: "article",
      url,
      images: [
        {
          url: photo.url,
          width: photo.width,
          height: photo.height,
          alt: photo.caption,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: photo.caption,
      description: photo.locationName,
      images: [photo.url],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ lang: string; photoId: string }>;
}) {
  const { lang, photoId } = await params as { lang: Language; photoId: string };
  const photo = getPublicPhoto(photoId);

  if (!photo) {
    notFound();
  }

  const journey = getPublicJourney(photo.journeyId);
  const user = getPublicUser(photo.userId);
  const labels = photoLabels[lang] ?? photoLabels.en;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href={`/${lang}/journeys/${photo.journeyId}`} className={styles.backLink}>
          {labels.back}
        </Link>
        <h1 className={styles.title}>{photo.caption}</h1>
        <p className={styles.subtitle}>{photo.locationName}</p>
      </header>

      <div className={styles.imageFrame}>
        <Image
          src={photo.url}
          alt={photo.caption}
          fill
          sizes="(max-width: 900px) 100vw, 70vw"
          className={styles.image}
        />
      </div>

      <div className={styles.metaGrid}>
        {journey && (
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>{labels.journey}</p>
            <Link href={`/${lang}/journeys/${journey.journeyId}`} className={styles.metaValue}>
              {journey.title}
            </Link>
          </div>
        )}
        {user && (
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>{labels.traveler}</p>
            <Link href={`/${lang}/users/${user.userId}`} className={styles.metaValue}>
              {user.displayName}
            </Link>
          </div>
        )}
        <div className={styles.metaCard}>
          <p className={styles.metaLabel}>{labels.captured}</p>
          <p className={styles.metaValue}>
            {new Date(photo.takenAt).toLocaleString(lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
