import { type Language } from "@/lib/i18n/config";

export const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";

const journeysNavLabelMap: Record<Language, string> = {
  en: "Journeys",
  ko: "여정",
  ja: "旅",
  zh: "旅程",
  es: "Viajes",
  pt: "Viagens",
  fr: "Voyages",
  th: "ทริป",
  vi: "Hành trình",
};

export function getJourneysNavLabel(lang: Language): string {
  return journeysNavLabelMap[lang] ?? journeysNavLabelMap.en;
}
