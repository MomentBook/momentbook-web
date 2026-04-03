import type { Language } from "@/lib/i18n/config";
import {
  buildBreadcrumbListJsonLd,
  resolveStructuredDataSiteUrl,
  type BreadcrumbItem,
} from "@/lib/seo/json-ld";

// ---------------------------------------------------------------------------
// Localized "Home" labels for breadcrumb root
// ---------------------------------------------------------------------------

const HOME_LABELS: Record<Language, string> = {
  en: "Home",
  ko: "홈",
  ja: "ホーム",
  zh: "首页",
  es: "Inicio",
  pt: "Início",
  fr: "Accueil",
  th: "หน้าแรก",
  vi: "Trang chủ",
};

// ---------------------------------------------------------------------------
// Breadcrumb builder helpers
// ---------------------------------------------------------------------------

function homeItem(lang: Language): BreadcrumbItem {
  return { name: HOME_LABELS[lang], path: `/${lang}` };
}

/**
 * Builds a BreadcrumbList JSON-LD schema for a content page.
 *
 * The first item is always the localized home page.
 * Subsequent items are appended in order.
 *
 * @example
 * // Journey detail page
 * buildPageBreadcrumbJsonLd("ko", [
 *   { name: "여정", path: "/ko/journeys" },
 *   { name: "서울 여행", path: "/ko/journeys/abc" },
 * ]);
 */
export function buildPageBreadcrumbJsonLd(
  lang: Language,
  items: BreadcrumbItem[],
  siteUrl = resolveStructuredDataSiteUrl(),
) {
  return buildBreadcrumbListJsonLd([homeItem(lang), ...items], siteUrl);
}
