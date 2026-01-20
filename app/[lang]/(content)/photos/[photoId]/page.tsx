import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./photo.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  fetchPublishedPhoto,
  type PublishedPhotoApi,
} from "@/lib/published-journey";

export const revalidate = 3600;

const photoLabels: Record<
  Language,
  {
    backToJourney: string;
    takenAt: string;
    location: string;
    fromJourney: string;
  }
> = {
  en: {
    backToJourney: "Back to Journey",
    takenAt: "Taken at",
    location: "Location",
    fromJourney: "From Journey",
  },
  ko: {
    backToJourney: "여정으로 돌아가기",
    takenAt: "촬영 시각",
    location: "장소",
    fromJourney: "이 여정에서",
  },
  ja: {
    backToJourney: "旅に戻る",
    takenAt: "撮影日時",
    location: "場所",
    fromJourney: "この旅から",
  },
  zh: {
    backToJourney: "返回行程",
    takenAt: "拍摄时间",
    location: "地点",
    fromJourney: "来自行程",
  },
};

function formatDateTime(lang: Language, timestamp?: number): string | null {
  if (!timestamp || isNaN(timestamp)) {
    return null;
  }

  try {
    const formatter = new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formatter.format(new Date(timestamp));
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; photoId: string }>;
}): Promise<Metadata> {
  const { lang, photoId } = (await params) as {
    lang: Language;
    photoId: string;
  };
  const photo = await fetchPublishedPhoto(photoId);

  if (!photo) {
    return {
      title: "Photo not found",
    };
  }

  const path = `/photos/${photo.photoId}`;
  const url = buildOpenGraphUrl(lang, path);
  const title = photo.caption || `Photo from ${photo.journey.title}`;
  const description =
    photo.caption ||
    `A photo from ${photo.journey.title}${photo.locationName ? ` taken at ${photo.locationName}` : ""}`;

  const publishedTime =
    photo.takenAt && !isNaN(photo.takenAt)
      ? new Date(photo.takenAt).toISOString()
      : undefined;

  return {
    title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: photo.url,
          alt: title,
        },
      ],
      publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [photo.url],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ lang: string; photoId: string }>;
}) {
  const { lang, photoId } = (await params) as {
    lang: Language;
    photoId: string;
  };
  const photo = await fetchPublishedPhoto(photoId);

  if (!photo) {
    notFound();
  }

  const labels = photoLabels[lang] ?? photoLabels.en;
  const dateTime = formatDateTime(lang, photo.takenAt);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(
    buildOpenGraphUrl(lang, `/photos/${photo.photoId}`),
    siteUrl
  ).toString();

  const datePublished =
    photo.takenAt && !isNaN(photo.takenAt)
      ? new Date(photo.takenAt).toISOString()
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: photo.url,
    url: pageUrl,
    caption: photo.caption,
    ...(datePublished && { datePublished }),
    author: {
      "@type": "Person",
      name: "MomentBook User",
    },
    isPartOf: {
      "@type": "Article",
      name: photo.journey.title,
      url: new URL(
        buildOpenGraphUrl(lang, `/journeys/${photo.journey.publicId}`),
        siteUrl
      ).toString(),
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link
            href={`/${lang}/journeys/${photo.journey.publicId}`}
            className={styles.backLink}
          >
            ← {labels.backToJourney}
          </Link>
        </nav>

        <div className={styles.photoContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={photo.url}
              alt={photo.caption || photo.journey.title}
              fill
              priority
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>

        <div className={styles.metadata}>
          {photo.caption && (
            <div className={styles.captionSection}>
              <p className={styles.caption}>{photo.caption}</p>
            </div>
          )}

          <div className={styles.detailsGrid}>
            {dateTime && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>{labels.takenAt}</span>
                <span className={styles.detailValue}>{dateTime}</span>
              </div>
            )}

            {photo.locationName && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>{labels.location}</span>
                <span className={styles.detailValue}>{photo.locationName}</span>
              </div>
            )}

            <div className={styles.detail}>
              <span className={styles.detailLabel}>{labels.fromJourney}</span>
              <Link
                href={`/${lang}/journeys/${photo.journey.publicId}`}
                className={styles.journeyLink}
              >
                {photo.journey.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
