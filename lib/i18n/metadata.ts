import {
  defaultLanguage,
  languageList,
  toHreflang,
  type Language,
} from "@/lib/i18n/config";

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Builds alternate language links for SEO (hreflang + canonical).
 *
 * Returns relative URLs that Next.js converts to absolute URLs using the
 * `metadataBase` set in `app/[lang]/layout.tsx`.
 *
 * SEO Strategy:
 * - Includes all 9 supported languages as hreflang alternates
 * - Sets x-default to English (en) as the primary/fallback language
 * - Canonical points to the current language variant
 *
 * @param lang - Current page language
 * @param path - Page path without language prefix (e.g., "/about" or "")
 * @returns Object with canonical URL and language alternates
 *
 * @example
 * buildAlternates("ko", "/about")
 * // Returns:
 * // {
 * //   canonical: "/ko/about",
 * //   languages: {
 * //     "en-US": "/en/about",
 * //     "ko-KR": "/ko/about",
 * //     ...,
 * //     "x-default": "/en/about"
 * //   }
 * // }
 */
export function buildAlternates(lang: Language, path: string) {
  const normalizedPath = normalizePath(path);
  const languages = Object.fromEntries([
    ...languageList.map((code) => [
      toHreflang(code),
      `/${code}${normalizedPath}`,
    ]),
    // x-default: Signals to search engines which version to show when
    // no language preference matches. We use English as it's our primary language.
    ["x-default", `/${defaultLanguage}${normalizedPath}`],
  ]) as Record<string, string>;

  return {
    canonical: `/${lang}${normalizedPath}`,
    languages,
  };
}

/**
 * Builds OpenGraph URL for the current language variant.
 *
 * Returns a relative URL that Next.js converts to absolute using metadataBase.
 *
 * @param lang - Current page language
 * @param path - Page path without language prefix
 * @returns Relative URL for OpenGraph metadata
 */
export function buildOpenGraphUrl(lang: Language, path: string) {
  const normalizedPath = normalizePath(path);

  return `/${lang}${normalizedPath}`;
}
