import { type Language } from "@/lib/i18n/config";

export const HOME_SECTION_IDS = {
  story: "story",
  download: "download",
} as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[keyof typeof HOME_SECTION_IDS];

export function buildHomeSectionHref(lang: Language, sectionId: HomeSectionId) {
  return `/${lang}#${sectionId}`;
}
