import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./moment.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  fetchPublishedJourney,
} from "@/lib/published-journey";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
import ClientMap from "../../components/ClientMap";

export const revalidate = 60;

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

const momentLabels: Partial<Record<Language, MomentLabels>> & { en: MomentLabels } = {
  en: {
    eyebrow: "Moment",
    backToJourney: "Back to Journey",
    timeLabel: "Time",
    photosLabel: "photos",
    journeyLabel: "Journey",
    mapTitle: "Place on the map",
    contextNote: "This moment is part of a published journey. Some journeys are shared as photos only; unshared moments remain private.",
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
    contextNote: "이 순간은 게시된 여정의 일부입니다. 사진만 공유된 여정도 있으며, 공유되지 않은 기록은 공개되지 않습니다.",
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
    contextNote: "この瞬間は公開された旅の一部です。写真のみの共有もあり、共有していない記録は公開されません。",
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
    contextNote: "此瞬间属于已发布的行程。部分行程仅分享照片，未发布的记录不会公开。",
    emptyPhotos: "此瞬间没有照片。",
    locationFallback: "地点",
  },
  es: {
    eyebrow: "Momento",
    backToJourney: "Volver al viaje",
    timeLabel: "Hora",
    photosLabel: "fotos",
    journeyLabel: "Viaje",
    mapTitle: "Lugar en el mapa",
    contextNote: "Este momento forma parte de un viaje publicado. Algunos viajes se comparten solo con fotos; lo no compartido sigue privado.",
    emptyPhotos: "No hay fotos en este momento.",
    locationFallback: "Lugar",
  },
  pt: {
    eyebrow: "Momento",
    backToJourney: "Voltar para jornada",
    timeLabel: "Horario",
    photosLabel: "fotos",
    journeyLabel: "Jornada",
    mapTitle: "Local no mapa",
    contextNote: "Este momento faz parte de uma jornada publicada. Algumas jornadas sao compartilhadas apenas com fotos; o que nao foi compartilhado continua privado.",
    emptyPhotos: "Nao ha fotos neste momento.",
    locationFallback: "Local",
  },
  fr: {
    eyebrow: "Moment",
    backToJourney: "Retour au voyage",
    timeLabel: "Heure",
    photosLabel: "photos",
    journeyLabel: "Voyage",
    mapTitle: "Lieu sur la carte",
    contextNote: "Ce moment fait partie d'un voyage publie. Certains voyages sont partages uniquement avec des photos; les moments non partages restent prives.",
    emptyPhotos: "Aucune photo dans ce moment.",
    locationFallback: "Lieu",
  },
  th: {
    eyebrow: "ช่วงเวลา",
    backToJourney: "กลับไปที่ทริป",
    timeLabel: "เวลา",
    photosLabel: "รูป",
    journeyLabel: "ทริป",
    mapTitle: "ตำแหน่งบนแผนที่",
    contextNote: "ช่วงเวลานี้เป็นส่วนหนึ่งของทริปที่เผยแพร่ บางทริปแชร์เฉพาะรูป เนื้อหาที่ไม่แชร์จะยังเป็นส่วนตัว",
    emptyPhotos: "ไม่มีรูปในช่วงเวลานี้",
    locationFallback: "สถานที่",
  },
  vi: {
    eyebrow: "Khoanh khac",
    backToJourney: "Quay lai hanh trinh",
    timeLabel: "Thoi gian",
    photosLabel: "anh",
    journeyLabel: "Hanh trinh",
    mapTitle: "Dia diem tren ban do",
    contextNote: "Khoanh khac nay thuoc mot hanh trinh da dang. Mot so hanh trinh chi chia se bang anh; cac khoanh khac chua chia se van rieng tu.",
    emptyPhotos: "Khong co anh trong khoanh khac nay.",
    locationFallback: "Dia diem",
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
          <span>
            <LocalizedDateTimeRange
              lang={lang}
              start={cluster.time.startAt}
              end={cluster.time.endAt}
            />
          </span>
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
