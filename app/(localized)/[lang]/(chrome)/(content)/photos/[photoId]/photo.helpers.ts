import type { Language } from "@/lib/i18n/config";
import type { CaptureTimeContext } from "@/lib/local-time-context";
import type { PublishedPhotoApi } from "@/lib/published-journey";
import { buildSeoDescription } from "@/lib/seo/public-metadata";
import { readText } from "@/lib/view-helpers";

export type PhotoPageCopy = {
  eyebrow: string;
  backToJourney: string;
  partOfLabel: string;
  takenAt: string;
  location: string;
  coordinates: string;
  archiveNoteLabel: string;
  archiveNoteBody: string;
  openViewer: string;
  openViewerHint: string;
  viewerDialogLabel: string;
  closeViewer: string;
  viewerDesktopHint: string;
  viewerTouchHint: string;
  metadataTitleTemplate: string;
  metadataDescriptionLocationOnlyTemplate: string;
  metadataDescriptionWithLocationTemplate: string;
  metadataDescriptionWithoutLocationTemplate: string;
};

export const photoCopy: Record<Language, PhotoPageCopy> = {
  en: {
    eyebrow: "Photo",
    backToJourney: "Back to journey",
    partOfLabel: "part of",
    takenAt: "Captured",
    location: "Place",
    coordinates: "Coordinates",
    archiveNoteLabel: "Archive note",
    archiveNoteBody:
      "Shown as part of a published journey archive on MomentBook.",
    openViewer: "Open larger photo view",
    openViewerHint: "Open full view",
    viewerDialogLabel: "Enlarged photo viewer",
    closeViewer: "Close photo viewer",
    viewerDesktopHint: "Press Esc to close",
    viewerTouchHint: "Pinch or double-tap to zoom",
    metadataTitleTemplate: "Photo from {journey}",
    metadataDescriptionLocationOnlyTemplate:
      "Published travel photo captured at {location}, shown in the MomentBook web archive.",
    metadataDescriptionWithLocationTemplate:
      "Published travel photo from {journey}, captured at {location} and shown in the MomentBook web archive.",
    metadataDescriptionWithoutLocationTemplate:
      "Published travel photo from {journey}, shown in the MomentBook web archive.",
  },
  ko: {
    eyebrow: "사진",
    backToJourney: "여정으로 돌아가기",
    partOfLabel: "다음 여정의 일부",
    takenAt: "기록 시각",
    location: "장소",
    coordinates: "좌표",
    archiveNoteLabel: "아카이브 노트",
    archiveNoteBody:
      "MomentBook의 공개 여정 아카이브 일부로 노출되는 사진입니다.",
    openViewer: "사진 크게 보기 열기",
    openViewerHint: "크게 보기",
    viewerDialogLabel: "확대 사진 뷰어",
    closeViewer: "사진 뷰어 닫기",
    viewerDesktopHint: "Esc 키로 닫기",
    viewerTouchHint: "핀치 또는 더블 탭으로 확대",
    metadataTitleTemplate: "{journey}의 사진",
    metadataDescriptionLocationOnlyTemplate:
      "{location}에서 촬영되어 MomentBook 공개 웹 아카이브에 노출되는 여행 사진입니다.",
    metadataDescriptionWithLocationTemplate:
      "{location}에서 촬영되었고 MomentBook 공개 웹 아카이브에 노출되는 {journey}의 여행 사진입니다.",
    metadataDescriptionWithoutLocationTemplate:
      "MomentBook 공개 웹 아카이브에 노출되는 {journey}의 여행 사진입니다.",
  },
  ja: {
    eyebrow: "写真",
    backToJourney: "旅に戻る",
    partOfLabel: "次の旅の一部",
    takenAt: "記録時刻",
    location: "場所",
    coordinates: "座標",
    archiveNoteLabel: "アーカイブノート",
    archiveNoteBody:
      "MomentBook の公開旅アーカイブの一部として表示される写真です。",
    openViewer: "写真を大きく表示",
    openViewerHint: "大きく見る",
    viewerDialogLabel: "拡大写真ビューア",
    closeViewer: "写真ビューアを閉じる",
    viewerDesktopHint: "Esc キーで閉じる",
    viewerTouchHint: "ピンチまたはダブルタップで拡大",
    metadataTitleTemplate: "{journey}の写真",
    metadataDescriptionLocationOnlyTemplate:
      "{location}で撮影され、MomentBook の公開 Web アーカイブに表示される旅行写真です。",
    metadataDescriptionWithLocationTemplate:
      "{location}で撮影され、MomentBook の公開 Web アーカイブに表示される{journey}の旅行写真です。",
    metadataDescriptionWithoutLocationTemplate:
      "MomentBook の公開 Web アーカイブに表示される{journey}の旅行写真です。",
  },
  zh: {
    eyebrow: "照片",
    backToJourney: "返回旅程",
    partOfLabel: "属于以下旅程",
    takenAt: "记录时间",
    location: "地点",
    coordinates: "坐标",
    archiveNoteLabel: "归档说明",
    archiveNoteBody:
      "这张照片作为 MomentBook 公开旅程档案的一部分展示。",
    openViewer: "打开大图查看",
    openViewerHint: "查看大图",
    viewerDialogLabel: "放大照片查看器",
    closeViewer: "关闭照片查看器",
    viewerDesktopHint: "按 Esc 关闭",
    viewerTouchHint: "双指缩放或双击放大",
    metadataTitleTemplate: "{journey} 的照片",
    metadataDescriptionLocationOnlyTemplate:
      "这是一张拍摄于 {location}、展示在 MomentBook 网页公开档案中的旅行照片。",
    metadataDescriptionWithLocationTemplate:
      "这是一张来自 {journey}、拍摄于 {location}，并展示在 MomentBook 网页公开档案中的旅行照片。",
    metadataDescriptionWithoutLocationTemplate:
      "这是一张来自 {journey}、展示在 MomentBook 网页公开档案中的旅行照片。",
  },
  es: {
    eyebrow: "Foto",
    backToJourney: "Volver al viaje",
    partOfLabel: "parte de",
    takenAt: "Capturada",
    location: "Lugar",
    coordinates: "Coordenadas",
    archiveNoteLabel: "Nota de archivo",
    archiveNoteBody:
      "Se muestra como parte de un archivo de viaje publicado en MomentBook.",
    openViewer: "Abrir foto ampliada",
    openViewerHint: "Ver en grande",
    viewerDialogLabel: "Visor de foto ampliada",
    closeViewer: "Cerrar visor de foto",
    viewerDesktopHint: "Pulsa Esc para cerrar",
    viewerTouchHint: "Pellizca o toca dos veces para ampliar",
    metadataTitleTemplate: "Foto de {journey}",
    metadataDescriptionLocationOnlyTemplate:
      "Foto de viaje publicada, tomada en {location} y mostrada en el archivo web de MomentBook.",
    metadataDescriptionWithLocationTemplate:
      "Foto de viaje publicada de {journey}, tomada en {location} y mostrada en el archivo web de MomentBook.",
    metadataDescriptionWithoutLocationTemplate:
      "Foto de viaje publicada de {journey}, mostrada en el archivo web de MomentBook.",
  },
  pt: {
    eyebrow: "Foto",
    backToJourney: "Voltar para a viagem",
    partOfLabel: "parte de",
    takenAt: "Registrada",
    location: "Local",
    coordinates: "Coordenadas",
    archiveNoteLabel: "Nota de arquivo",
    archiveNoteBody:
      "Exibida como parte de um arquivo de viagem publicado no MomentBook.",
    openViewer: "Abrir foto ampliada",
    openViewerHint: "Ver maior",
    viewerDialogLabel: "Visualizador de foto ampliada",
    closeViewer: "Fechar visualizador de foto",
    viewerDesktopHint: "Pressione Esc para fechar",
    viewerTouchHint: "Use pinça ou toque duas vezes para ampliar",
    metadataTitleTemplate: "Foto de {journey}",
    metadataDescriptionLocationOnlyTemplate:
      "Foto de viagem publicada, tirada em {location} e exibida no arquivo web do MomentBook.",
    metadataDescriptionWithLocationTemplate:
      "Foto de viagem publicada de {journey}, tirada em {location} e exibida no arquivo web do MomentBook.",
    metadataDescriptionWithoutLocationTemplate:
      "Foto de viagem publicada de {journey}, exibida no arquivo web do MomentBook.",
  },
  fr: {
    eyebrow: "Photo",
    backToJourney: "Retour au voyage",
    partOfLabel: "partie de",
    takenAt: "Prise le",
    location: "Lieu",
    coordinates: "Coordonnées",
    archiveNoteLabel: "Note d'archive",
    archiveNoteBody:
      "Affichée comme partie d'une archive de voyage publiée sur MomentBook.",
    openViewer: "Ouvrir la photo en grand",
    openViewerHint: "Voir en grand",
    viewerDialogLabel: "Visionneuse de photo agrandie",
    closeViewer: "Fermer la visionneuse",
    viewerDesktopHint: "Appuyez sur Échap pour fermer",
    viewerTouchHint: "Pincez ou touchez deux fois pour zoomer",
    metadataTitleTemplate: "Photo de {journey}",
    metadataDescriptionLocationOnlyTemplate:
      "Photo de voyage publiée, prise à {location} et affichée dans l'archive web de MomentBook.",
    metadataDescriptionWithLocationTemplate:
      "Photo de voyage publiée de {journey}, prise à {location} et affichée dans l'archive web de MomentBook.",
    metadataDescriptionWithoutLocationTemplate:
      "Photo de voyage publiée de {journey}, affichée dans l'archive web de MomentBook.",
  },
  th: {
    eyebrow: "รูปภาพ",
    backToJourney: "กลับไปที่ทริป",
    partOfLabel: "เป็นส่วนหนึ่งของ",
    takenAt: "เวลาที่บันทึก",
    location: "สถานที่",
    coordinates: "พิกัด",
    archiveNoteLabel: "หมายเหตุคลัง",
    archiveNoteBody:
      "รูปนี้แสดงเป็นส่วนหนึ่งของคลังทริปสาธารณะบน MomentBook",
    openViewer: "เปิดดูรูปขนาดใหญ่",
    openViewerHint: "ดูแบบเต็ม",
    viewerDialogLabel: "ตัวดูรูปภาพขยาย",
    closeViewer: "ปิดตัวดูรูปภาพ",
    viewerDesktopHint: "กด Esc เพื่อปิด",
    viewerTouchHint: "บีบนิ้วหรือแตะสองครั้งเพื่อซูม",
    metadataTitleTemplate: "รูปจาก {journey}",
    metadataDescriptionLocationOnlyTemplate:
      "รูปท่องเที่ยวที่ถ่ายที่ {location} และแสดงในคลังเว็บสาธารณะของ MomentBook",
    metadataDescriptionWithLocationTemplate:
      "รูปท่องเที่ยวจาก {journey} ที่ถ่ายที่ {location} และแสดงในคลังเว็บสาธารณะของ MomentBook",
    metadataDescriptionWithoutLocationTemplate:
      "รูปท่องเที่ยวจาก {journey} ที่แสดงในคลังเว็บสาธารณะของ MomentBook",
  },
  vi: {
    eyebrow: "Ảnh",
    backToJourney: "Quay lại hành trình",
    partOfLabel: "thuộc về",
    takenAt: "Thời điểm ghi",
    location: "Địa điểm",
    coordinates: "Tọa độ",
    archiveNoteLabel: "Ghi chú lưu trữ",
    archiveNoteBody:
      "Ảnh này được hiển thị như một phần của kho lưu trữ hành trình công khai trên MomentBook.",
    openViewer: "Mở ảnh lớn",
    openViewerHint: "Xem toàn màn",
    viewerDialogLabel: "Trình xem ảnh phóng to",
    closeViewer: "Đóng trình xem ảnh",
    viewerDesktopHint: "Nhấn Esc để đóng",
    viewerTouchHint: "Chụm hoặc chạm hai lần để phóng to",
    metadataTitleTemplate: "Ảnh từ {journey}",
    metadataDescriptionLocationOnlyTemplate:
      "Ảnh du lịch đã đăng, chụp tại {location} và hiển thị trong kho lưu trữ web của MomentBook.",
    metadataDescriptionWithLocationTemplate:
      "Ảnh du lịch đã đăng từ {journey}, chụp tại {location} và hiển thị trong kho lưu trữ web của MomentBook.",
    metadataDescriptionWithoutLocationTemplate:
      "Ảnh du lịch đã đăng từ {journey}, hiển thị trong kho lưu trữ web của MomentBook.",
  },
};

export const photoNotFoundTitleByLanguage: Record<Language, string> = {
  en: "Photo not found",
  ko: "사진을 찾을 수 없습니다",
  ja: "写真が見つかりません",
  zh: "找不到照片",
  es: "No se encontró la foto",
  pt: "Foto não encontrada",
  fr: "Photo introuvable",
  th: "ไม่พบรูปภาพ",
  vi: "Không tìm thấy ảnh",
};

type Coordinates = {
  lat: number;
  lng: number;
};

export type PhotoDisplayState = {
  title: string;
  caption: string | null;
  journeyTitle: string | null;
  locationName: string | null;
  takenAt: number | null;
  captureTime: CaptureTimeContext | null;
  hasTakenAt: boolean;
  location: Coordinates | null;
  description: string;
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function hasValidTimestamp(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function hasValidCoordinates(
  location: PublishedPhotoApi["location"],
): location is Coordinates {
  return Boolean(
    location &&
      Number.isFinite(location.lat) &&
      Number.isFinite(location.lng),
  );
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDirection = lat >= 0 ? "N" : "S";
  const lngDirection = lng >= 0 ? "E" : "W";

  return `${Math.abs(lat).toFixed(5)}° ${latDirection}, ${Math.abs(lng).toFixed(5)}° ${lngDirection}`;
}

export function buildPhotoSeoText(
  copy: PhotoPageCopy,
  photo: PublishedPhotoApi,
): { title: string; description: string } {
  const journeyTitle = readText(photo.journey.title);
  const caption = readText(photo.caption);
  const locationName = readText(photo.locationName);

  const title =
    caption ??
    (journeyTitle
      ? fillTemplate(copy.metadataTitleTemplate, { journey: journeyTitle })
      : copy.eyebrow);

  const description = buildSeoDescription([
    caption,
    journeyTitle
      ? locationName
        ? fillTemplate(copy.metadataDescriptionWithLocationTemplate, {
            journey: journeyTitle,
            location: locationName,
          })
        : fillTemplate(copy.metadataDescriptionWithoutLocationTemplate, {
            journey: journeyTitle,
          })
      : locationName
        ? fillTemplate(copy.metadataDescriptionLocationOnlyTemplate, {
            location: locationName,
          })
        : copy.archiveNoteBody,
  ]);

  return { title, description };
}

export function buildPhotoDisplayState(
  copy: PhotoPageCopy,
  photo: PublishedPhotoApi,
): PhotoDisplayState {
  const seoText = buildPhotoSeoText(copy, photo);
  const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
  const location = hasValidCoordinates(photo.location) ? photo.location : null;

  return {
    title: seoText.title,
    caption: readText(photo.caption),
    journeyTitle: readText(photo.journey.title),
    locationName: readText(photo.locationName),
    takenAt,
    captureTime: photo.captureTime ?? null,
    hasTakenAt: takenAt !== null,
    location,
    description: seoText.description,
  };
}
