import type { StaticImageData } from "next/image";
import { type Language } from "@/lib/i18n/config";
import koIntroUiImage from "@/assets/ui/screenshots/1.ko-KR/intro.webp";
import koTrackingUiImage from "@/assets/ui/screenshots/1.ko-KR/tracking.webp";
import koPhotosUiImage from "@/assets/ui/screenshots/1.ko-KR/photos.webp";
import koTimelineUiImage from "@/assets/ui/screenshots/1.ko-KR/timeline.webp";
import enIntroUiImage from "@/assets/ui/screenshots/2.en-US/intro.webp";
import enTrackingUiImage from "@/assets/ui/screenshots/2.en-US/tracking.webp";
import enPhotosUiImage from "@/assets/ui/screenshots/2.en-US/photos.webp";
import enTimelineUiImage from "@/assets/ui/screenshots/2.en-US/timeline.webp";
import jaIntroUiImage from "@/assets/ui/screenshots/3.ja-JP/intro.webp";
import jaTrackingUiImage from "@/assets/ui/screenshots/3.ja-JP/tracking.webp";
import jaPhotosUiImage from "@/assets/ui/screenshots/3.ja-JP/photos.webp";
import jaTimelineUiImage from "@/assets/ui/screenshots/3.ja-JP/timeline.webp";
import zhIntroUiImage from "@/assets/ui/screenshots/4.zh-CN/intro.webp";
import zhTrackingUiImage from "@/assets/ui/screenshots/4.zh-CN/tracking.webp";
import zhPhotosUiImage from "@/assets/ui/screenshots/4.zh-CN/photos.webp";
import zhTimelineUiImage from "@/assets/ui/screenshots/4.zh-CN/timeline.webp";
import esIntroUiImage from "@/assets/ui/screenshots/5.es-ES/intro.webp";
import esTrackingUiImage from "@/assets/ui/screenshots/5.es-ES/tracking.webp";
import esPhotosUiImage from "@/assets/ui/screenshots/5.es-ES/photos.webp";
import esTimelineUiImage from "@/assets/ui/screenshots/5.es-ES/timeline.webp";
import ptIntroUiImage from "@/assets/ui/screenshots/6.pt-BR/intro.webp";
import ptTrackingUiImage from "@/assets/ui/screenshots/6.pt-BR/tracking.webp";
import ptPhotosUiImage from "@/assets/ui/screenshots/6.pt-BR/photos.webp";
import ptTimelineUiImage from "@/assets/ui/screenshots/6.pt-BR/timeline.webp";
import frIntroUiImage from "@/assets/ui/screenshots/7.fr-FR/intro.webp";
import frTrackingUiImage from "@/assets/ui/screenshots/7.fr-FR/tracking.webp";
import frPhotosUiImage from "@/assets/ui/screenshots/7.fr-FR/photos.webp";
import frTimelineUiImage from "@/assets/ui/screenshots/7.fr-FR/timeline.webp";
import thIntroUiImage from "@/assets/ui/screenshots/8.th-TH/intro.webp";
import thTrackingUiImage from "@/assets/ui/screenshots/8.th-TH/tracking.webp";
import thPhotosUiImage from "@/assets/ui/screenshots/8.th-TH/photos.webp";
import thTimelineUiImage from "@/assets/ui/screenshots/8.th-TH/timeline.webp";
import viIntroUiImage from "@/assets/ui/screenshots/9.vi-VN/intro.webp";
import viTrackingUiImage from "@/assets/ui/screenshots/9.vi-VN/tracking.webp";
import viPhotosUiImage from "@/assets/ui/screenshots/9.vi-VN/photos.webp";
import viTimelineUiImage from "@/assets/ui/screenshots/9.vi-VN/timeline.webp";

export type AppScreenshotKey = "intro" | "tracking" | "photos" | "timeline";

const screenshotFolderByLanguage: Record<Language, string> = {
  ko: "1.ko-KR",
  en: "2.en-US",
  ja: "3.ja-JP",
  zh: "4.zh-CN",
  es: "5.es-ES",
  pt: "6.pt-BR",
  fr: "7.fr-FR",
  th: "8.th-TH",
  vi: "9.vi-VN",
};

const screenshotFilenameByKey: Record<AppScreenshotKey, string> = {
  intro: "00.intro.PNG",
  tracking: "01.tracking.PNG",
  photos: "02.photos.PNG",
  timeline: "03.timeline.PNG",
};

const screenshotUiAssetByLanguage: Record<Language, Record<AppScreenshotKey, StaticImageData>> = {
  ko: {
    intro: koIntroUiImage,
    tracking: koTrackingUiImage,
    photos: koPhotosUiImage,
    timeline: koTimelineUiImage,
  },
  en: {
    intro: enIntroUiImage,
    tracking: enTrackingUiImage,
    photos: enPhotosUiImage,
    timeline: enTimelineUiImage,
  },
  ja: {
    intro: jaIntroUiImage,
    tracking: jaTrackingUiImage,
    photos: jaPhotosUiImage,
    timeline: jaTimelineUiImage,
  },
  zh: {
    intro: zhIntroUiImage,
    tracking: zhTrackingUiImage,
    photos: zhPhotosUiImage,
    timeline: zhTimelineUiImage,
  },
  es: {
    intro: esIntroUiImage,
    tracking: esTrackingUiImage,
    photos: esPhotosUiImage,
    timeline: esTimelineUiImage,
  },
  pt: {
    intro: ptIntroUiImage,
    tracking: ptTrackingUiImage,
    photos: ptPhotosUiImage,
    timeline: ptTimelineUiImage,
  },
  fr: {
    intro: frIntroUiImage,
    tracking: frTrackingUiImage,
    photos: frPhotosUiImage,
    timeline: frTimelineUiImage,
  },
  th: {
    intro: thIntroUiImage,
    tracking: thTrackingUiImage,
    photos: thPhotosUiImage,
    timeline: thTimelineUiImage,
  },
  vi: {
    intro: viIntroUiImage,
    tracking: viTrackingUiImage,
    photos: viPhotosUiImage,
    timeline: viTimelineUiImage,
  },
};

export function getLocalizedScreenshotPath(lang: Language, key: AppScreenshotKey): string {
  return `/screenshots/${screenshotFolderByLanguage[lang]}/${screenshotFilenameByKey[key]}`;
}

export function getLocalizedUiScreenshotAsset(
  lang: Language,
  key: AppScreenshotKey,
): StaticImageData {
  return screenshotUiAssetByLanguage[lang][key];
}

export function getLocalizedScreenshotGallery(lang: Language): Array<{
  key: AppScreenshotKey;
  src: string;
}> {
  return [
    { key: "intro", src: getLocalizedScreenshotPath(lang, "intro") },
    { key: "tracking", src: getLocalizedScreenshotPath(lang, "tracking") },
    { key: "photos", src: getLocalizedScreenshotPath(lang, "photos") },
    { key: "timeline", src: getLocalizedScreenshotPath(lang, "timeline") },
  ];
}

export function getLocalizedUiScreenshotGallery(lang: Language): Array<{
  key: AppScreenshotKey;
  src: StaticImageData;
}> {
  return [
    { key: "intro", src: getLocalizedUiScreenshotAsset(lang, "intro") },
    { key: "tracking", src: getLocalizedUiScreenshotAsset(lang, "tracking") },
    { key: "photos", src: getLocalizedUiScreenshotAsset(lang, "photos") },
    { key: "timeline", src: getLocalizedUiScreenshotAsset(lang, "timeline") },
  ];
}
