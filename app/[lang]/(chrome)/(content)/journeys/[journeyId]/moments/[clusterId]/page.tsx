import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./moment.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublishedJourney } from "@/lib/published-journey";
import {
  buildOpenGraphBase,
  buildPublicRobots,
  compactSocialImages,
  resolveTwitterCard,
  buildSeoDescription,
} from "@/lib/seo/public-metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
import ClientMap from "../../components/ClientMap";

export const revalidate = 60;

type MomentLabels = {
  eyebrow: string;
  backToJourney: string;
  timeLabel: string;
  photosLabel: string;
  mapTitle: string;
  emptyPhotos: string;
  locationFallback: string;
  galleryTitle: string;
};

const momentNotFoundTitleByLanguage: Record<Language, string> = {
  en: "Moment not found",
  ko: "순간을 찾을 수 없습니다",
  ja: "瞬間が見つかりません",
  zh: "找不到瞬间",
  es: "No se encontró el momento",
  pt: "Momento não encontrado",
  fr: "Moment introuvable",
  th: "ไม่พบช่วงเวลา",
  vi: "Không tìm thấy khoảnh khắc",
};

const momentDescriptionWithLocationTemplateByLanguage: Record<Language, string> = {
  en: "Published moment from {journey} in {location} with {count} travel photos on MomentBook.",
  ko: "{journey}의 {location} 순간으로, MomentBook에 공개된 여행 사진 {count}장이 포함되어 있습니다.",
  ja: "{journey}の{location}の瞬間で、MomentBook に公開された旅行写真{count}枚が含まれています。",
  zh: "这是 {journey} 中位于 {location} 的公开瞬间，包含 {count} 张旅行照片。",
  es: "Momento publicado de {journey} en {location} con {count} fotos de viaje en MomentBook.",
  pt: "Momento publicado de {journey} em {location} com {count} fotos de viagem no MomentBook.",
  fr: "Moment publié de {journey} à {location} avec {count} photos de voyage sur MomentBook.",
  th: "ช่วงเวลาจาก {journey} ที่ {location} พร้อมรูปท่องเที่ยว {count} รูปที่เผยแพร่บน MomentBook",
  vi: "Khoảnh khắc công khai từ {journey} tại {location} với {count} ảnh du lịch trên MomentBook.",
};

const momentDescriptionWithoutLocationTemplateByLanguage: Record<Language, string> = {
  en: "Published moment from {journey} with {count} travel photos on MomentBook.",
  ko: "{journey}의 공개 순간이며 MomentBook에 공개된 여행 사진 {count}장이 포함되어 있습니다.",
  ja: "{journey}の公開された瞬間で、MomentBook に旅行写真{count}枚が含まれています。",
  zh: "这是 {journey} 中公开的一个瞬间，包含 {count} 张旅行照片。",
  es: "Momento publicado de {journey} con {count} fotos de viaje en MomentBook.",
  pt: "Momento publicado de {journey} com {count} fotos de viagem no MomentBook.",
  fr: "Moment publié de {journey} avec {count} photos de voyage sur MomentBook.",
  th: "ช่วงเวลาจาก {journey} พร้อมรูปท่องเที่ยว {count} รูปที่เผยแพร่บน MomentBook",
  vi: "Khoảnh khắc công khai từ {journey} với {count} ảnh du lịch trên MomentBook.",
};

function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

const momentLabels: Record<Language, MomentLabels> = {
  en: {
    eyebrow: "Moment",
    backToJourney: "Back to journey",
    timeLabel: "Time",
    photosLabel: "Photos",
    mapTitle: "Map",
    emptyPhotos: "No photos in this moment.",
    locationFallback: "Location",
    galleryTitle: "Visual story",
  },
  ko: {
    eyebrow: "순간",
    backToJourney: "여정으로 돌아가기",
    timeLabel: "시간",
    photosLabel: "사진",
    mapTitle: "지도",
    emptyPhotos: "이 순간에는 사진이 없습니다.",
    locationFallback: "장소",
    galleryTitle: "사진 흐름",
  },
  ja: {
    eyebrow: "瞬間",
    backToJourney: "旅に戻る",
    timeLabel: "時間",
    photosLabel: "写真",
    mapTitle: "地図",
    emptyPhotos: "この瞬間には写真がありません。",
    locationFallback: "場所",
    galleryTitle: "ビジュアルストーリー",
  },
  zh: {
    eyebrow: "瞬间",
    backToJourney: "返回旅程",
    timeLabel: "时间",
    photosLabel: "照片",
    mapTitle: "地图",
    emptyPhotos: "此瞬间没有照片。",
    locationFallback: "地点",
    galleryTitle: "画面记录",
  },
  es: {
    eyebrow: "Momento",
    backToJourney: "Volver al viaje",
    timeLabel: "Hora",
    photosLabel: "Fotos",
    mapTitle: "Mapa",
    emptyPhotos: "No hay fotos en este momento.",
    locationFallback: "Lugar",
    galleryTitle: "Relato visual",
  },
  pt: {
    eyebrow: "Momento",
    backToJourney: "Voltar para a viagem",
    timeLabel: "Horário",
    photosLabel: "Fotos",
    mapTitle: "Mapa",
    emptyPhotos: "Não há fotos neste momento.",
    locationFallback: "Local",
    galleryTitle: "História visual",
  },
  fr: {
    eyebrow: "Moment",
    backToJourney: "Retour au voyage",
    timeLabel: "Heure",
    photosLabel: "Photos",
    mapTitle: "Carte",
    emptyPhotos: "Aucune photo dans ce moment.",
    locationFallback: "Lieu",
    galleryTitle: "Récit visuel",
  },
  th: {
    eyebrow: "ช่วงเวลา",
    backToJourney: "กลับไปที่ทริป",
    timeLabel: "เวลา",
    photosLabel: "รูป",
    mapTitle: "แผนที่",
    emptyPhotos: "ไม่มีรูปในช่วงเวลานี้",
    locationFallback: "สถานที่",
    galleryTitle: "เรื่องราวผ่านภาพ",
  },
  vi: {
    eyebrow: "Khoảnh khắc",
    backToJourney: "Quay lại hành trình",
    timeLabel: "Thời gian",
    photosLabel: "Ảnh",
    mapTitle: "Bản đồ",
    emptyPhotos: "Không có ảnh trong khoảnh khắc này.",
    locationFallback: "Địa điểm",
    galleryTitle: "Câu chuyện hình ảnh",
  },
};

function buildImageUrlToPhotoIdMap(
  journeyImages: Array<{ url: string; photoId: string }>,
) {
  const map = new Map<string, string>();
  journeyImages.forEach((img) => {
    map.set(img.photoId, img.url);
  });
  return map;
}

function buildMomentSeoDescription(
  lang: Language,
  journeyTitle: string,
  locationName: string | null,
  photoCount: number,
) {
  const values = {
    journey: journeyTitle,
    location: locationName ?? "",
    count: String(photoCount),
  };

  return fillTemplate(
    locationName
      ? momentDescriptionWithLocationTemplateByLanguage[lang]
      : momentDescriptionWithoutLocationTemplateByLanguage[lang],
    values,
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

  const journey = await fetchPublishedJourney(journeyId);

  if (!journey) {
    return {
      title: momentNotFoundTitleByLanguage[lang],
    };
  }

  const cluster = journey.clusters.find((item) => item.clusterId === clusterId);
  if (!cluster) {
    return {
      title: momentNotFoundTitleByLanguage[lang],
    };
  }

  const labels = momentLabels[lang] ?? momentLabels.en;
  const locationName = cluster.locationName || labels.locationFallback;
  const title = `${locationName} · ${journey.title}`;
  const description = buildSeoDescription([
    buildMomentSeoDescription(
      lang,
      journey.title,
      cluster.locationName ?? null,
      cluster.photoIds.length,
    ),
  ]);
  const path = `/journeys/${journey.publicId}/moments/${cluster.clusterId}`;
  const imageMap = buildImageUrlToPhotoIdMap(journey.images);
  const clusterImages = compactSocialImages(
    cluster.photoIds
      .map((photoId) => imageMap.get(photoId))
      .filter(Boolean)
      .slice(0, 6)
      .map((imgUrl) => ({
        url: imgUrl as string,
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
      tags: cluster.locationName ? [journey.title, cluster.locationName] : [journey.title],
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
    description: buildMomentSeoDescription(
      lang,
      journey.title,
      cluster.locationName ?? null,
      cluster.photoIds.length,
    ),
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <header className={styles.header}>
        <Link
          href={`/${lang}/journeys/${journey.publicId}`}
          className={styles.backLink}
        >
          <span className={styles.backIcon} aria-hidden="true">
            ←
          </span>
          <span className={styles.backCopy}>
            <span className={styles.backEyebrow}>{labels.eyebrow}</span>
            <span className={styles.backJourney}>{journey.title}</span>
          </span>
        </Link>
      </header>

      <section className={styles.hero}>
        <p className={styles.journeyEyebrow}>{journey.title}</p>
        <h1 className={styles.title}>{locationName}</h1>
        <dl className={styles.metaList}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{labels.timeLabel}</dt>
            <dd className={styles.metaValue}>
              <LocalizedDateTimeRange
                lang={lang}
                start={cluster.time.startAt}
                end={cluster.time.endAt}
              />
            </dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{labels.photosLabel}</dt>
            <dd className={styles.metaValue}>
              {clusterPhotos.length}
            </dd>
          </div>
        </dl>
      </section>

      <section className={styles.mapSection} aria-labelledby="moment-map-title">
        <h2 id="moment-map-title" className={styles.visuallyHidden}>
          {labels.mapTitle}
        </h2>
        <div className={styles.mapFrame}>
          <ClientMap
            clusters={[cluster]}
            mode={journey.mode}
            locationFallback={labels.locationFallback}
            photoLabel={labels.photosLabel}
            lang={lang}
            journeyPublicId={journey.publicId}
          />
        </div>
      </section>

      <section className={styles.gallerySection} aria-labelledby="moment-gallery-title">
        <h2 id="moment-gallery-title" className={styles.galleryTitle}>
          {labels.galleryTitle}
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
                    sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 22vw"
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
