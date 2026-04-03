import type { Language } from "@/lib/i18n/config";
import type {
  PublishedJourneyApi,
  PublishedJourneyCluster,
} from "@/lib/published-journey";
import { formatTemplate, readText } from "@/lib/view-helpers";

export type MomentLabels = {
  eyebrow: string;
  hashtagsTitle: string;
  backToJourney: string;
  timeLabel: string;
  photosLabel: string;
  mapTitle: string;
  emptyPhotos: string;
  locationFallback: string;
  galleryTitle: string;
};

export type MomentPhoto = {
  photoId: string;
  url: string;
};

export const momentNotFoundTitleByLanguage: Record<Language, string> = {
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

export const momentLabels: Record<Language, MomentLabels> = {
  en: {
    eyebrow: "Moment",
    hashtagsTitle: "Themes",
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
    hashtagsTitle: "해시태그",
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
    hashtagsTitle: "ハッシュタグ",
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
    hashtagsTitle: "标签",
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
    hashtagsTitle: "Etiquetas",
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
    hashtagsTitle: "Hashtags",
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
    hashtagsTitle: "Hashtags",
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
    hashtagsTitle: "แฮชแท็ก",
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
    hashtagsTitle: "Thẻ chủ đề",
    backToJourney: "Quay lại hành trình",
    timeLabel: "Thời gian",
    photosLabel: "Ảnh",
    mapTitle: "Bản đồ",
    emptyPhotos: "Không có ảnh trong khoảnh khắc này.",
    locationFallback: "Địa điểm",
    galleryTitle: "Câu chuyện hình ảnh",
  },
};

export function findJourneyCluster(
  journey: Pick<PublishedJourneyApi, "clusters">,
  clusterId: string,
): PublishedJourneyCluster | null {
  return journey.clusters.find((cluster) => cluster.clusterId === clusterId) ?? null;
}

export function buildMomentImageUrlMap(
  journey: Pick<PublishedJourneyApi, "images">,
): Map<string, string> {
  const imageUrlMap = new Map<string, string>();

  journey.images.forEach((image) => {
    if (!image.photoId) {
      return;
    }

    imageUrlMap.set(image.photoId, image.url);
  });

  return imageUrlMap;
}

export function buildMomentPhotos(
  cluster: Pick<PublishedJourneyCluster, "photoIds" | "photos">,
  imageUrlMap: Map<string, string>,
): MomentPhoto[] {
  const directPhotoById = new Map<string, MomentPhoto>();

  cluster.photos.forEach((photo, index) => {
    const photoId = photo.photoId || cluster.photoIds[index];

    if (!photoId || directPhotoById.has(photoId)) {
      return;
    }

    directPhotoById.set(photoId, {
      photoId,
      url: photo.url,
    });
  });

  if (cluster.photoIds.length > 0) {
    return cluster.photoIds
      .map((photoId) => {
        const directPhoto = directPhotoById.get(photoId);
        if (directPhoto) {
          return directPhoto;
        }

        const url = imageUrlMap.get(photoId);
        return url ? { photoId, url } : null;
      })
      .filter((photo): photo is MomentPhoto => Boolean(photo));
  }

  return Array.from(directPhotoById.values());
}

export function readMomentLocationName(
  locationName: string | null | undefined,
): string | null {
  return readText(locationName);
}

export function buildMomentDisplayLocationName(
  labels: MomentLabels,
  locationName: string | null,
): string {
  return locationName ?? labels.locationFallback;
}

export function buildMomentSeoTitle(
  journeyTitle: string,
  locationName: string | null,
): string {
  return locationName ? `${locationName} · ${journeyTitle}` : journeyTitle;
}

export function buildMomentSeoDescription(
  lang: Language,
  journeyTitle: string,
  locationName: string | null,
  photoCount: number,
): string {
  return formatTemplate(
    locationName
      ? momentDescriptionWithLocationTemplateByLanguage[lang]
      : momentDescriptionWithoutLocationTemplateByLanguage[lang],
    {
      journey: journeyTitle,
      location: locationName ?? "",
      count: photoCount,
    },
  );
}
