import { type Language } from "@/lib/i18n/config";

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

export function getLocalizedScreenshotPath(lang: Language, key: AppScreenshotKey): string {
  return `/screenshots/${screenshotFolderByLanguage[lang]}/${screenshotFilenameByKey[key]}`;
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
