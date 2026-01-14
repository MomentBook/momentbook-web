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
import {
  fetchPublishedPhoto,
  type PublishedPhotoApi,
} from "@/lib/published-photo";

export const revalidate = 3600;

const photoLabels: Record<Language, {
  back: string;
  journey: string;
  traveler: string;
  captured: string;
  untitled: string;
}> = {
  en: {
    back: "← Back to journey",
    journey: "Journey",
    traveler: "Traveler",
    captured: "Captured",
    untitled: "Moment",
  },
  ko: {
    back: "← 여정으로 돌아가기",
    journey: "여정",
    traveler: "여행자",
    captured: "기록 시각",
    untitled: "순간",
  },
  ja: {
    back: "← 旅に戻る",
    journey: "旅",
    traveler: "旅行者",
    captured: "記録時刻",
    untitled: "瞬間",
  },
  zh: {
    back: "← 返回行程",
    journey: "行程",
    traveler: "旅行者",
    captured: "记录时间",
    untitled: "瞬间",
  },
};

type PhotoView = {
  photoId: string;
  url: string;
  width?: number;
  height?: number;
  caption: string;
  locationName?: string;
  takenAt?: number;
  journeySlug: string;
  journeyTitle?: string;
  userId?: string;
};

function buildPhotoViewFromApi(photo: PublishedPhotoApi): PhotoView {
  const caption = photo.caption?.trim() || "";

  return {
    photoId: photo.photoId,
    url: photo.url,
    width: photo.width,
    height: photo.height,
    caption,
    locationName: photo.locationName,
    takenAt: photo.takenAt,
    journeySlug: photo.journey.publicId,
    journeyTitle:
      typeof photo.journey.metadata?.title === "string"
        ? photo.journey.metadata.title
        : undefined,
    userId:
      typeof photo.journey.userId === "string"
        ? photo.journey.userId
        : typeof photo.journey.metadata?.userId === "string"
          ? photo.journey.metadata.userId
          : undefined,
  };
}

function buildPhotoViewFromStatic(photo: ReturnType<typeof getPublicPhoto>): PhotoView {
  if (!photo) {
    throw new Error("Photo not found");
  }

  return {
    photoId: photo.photoId,
    url: photo.url,
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
    locationName: photo.locationName,
    takenAt: photo.takenAt,
    journeySlug: photo.journeyId,
    journeyTitle: getPublicJourney(photo.journeyId)?.title,
    userId: photo.userId,
  };
}

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
  const labels = photoLabels[lang] ?? photoLabels.en;
  const apiPhoto = await fetchPublishedPhoto(photoId);
  const photo = apiPhoto
    ? buildPhotoViewFromApi(apiPhoto)
    : (() => {
        const staticPhoto = getPublicPhoto(photoId);
        return staticPhoto ? buildPhotoViewFromStatic(staticPhoto) : null;
      })();

  if (!photo) {
    return {
      title: "Photo not found",
    };
  }

  const path = `/photos/${photoId}`;
  const url = buildOpenGraphUrl(lang, path);
  const title = photo.caption || labels.untitled;

  return {
    title,
    description: photo.locationName
      ? `${photo.locationName} · ${title}`
      : title,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description: photo.locationName
        ? `${photo.locationName} · ${title}`
        : title,
      type: "article",
      url,
      images: [
        {
          url: photo.url,
          width: photo.width,
          height: photo.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: photo.locationName || title,
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
  const apiPhoto = await fetchPublishedPhoto(photoId);
  const photo = apiPhoto
    ? buildPhotoViewFromApi(apiPhoto)
    : (() => {
        const staticPhoto = getPublicPhoto(photoId);
        return staticPhoto ? buildPhotoViewFromStatic(staticPhoto) : null;
      })();

  if (!photo) {
    notFound();
  }

  const journey = photo.journeyTitle
    ? { title: photo.journeyTitle, journeyId: photo.journeySlug }
    : getPublicJourney(photo.journeySlug);
  const user = photo.userId ? getPublicUser(photo.userId) : undefined;
  const labels = photoLabels[lang] ?? photoLabels.en;
  const title = photo.caption || labels.untitled;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href={`/${lang}/journeys/${photo.journeySlug}`} className={styles.backLink}>
          {labels.back}
        </Link>
        <h1 className={styles.title}>{title}</h1>
        {photo.locationName && (
          <p className={styles.subtitle}>{photo.locationName}</p>
        )}
      </header>

      <div className={styles.imageFrame}>
        <Image
          src={photo.url}
          alt={title}
          fill
          sizes="(max-width: 900px) 100vw, 70vw"
          className={styles.image}
        />
      </div>

      <div className={styles.metaGrid}>
        {journey && (
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>{labels.journey}</p>
            {journey.title ? (
              <Link href={`/${lang}/journeys/${journey.journeyId}`} className={styles.metaValue}>
                {journey.title}
              </Link>
            ) : (
              <p className={styles.metaValue}>{labels.journey}</p>
            )}
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
            {photo.takenAt
              ? new Date(photo.takenAt).toLocaleString(lang)
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
