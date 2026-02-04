// Language configuration for MomentBook web

export const languages = {
  en: {
    name: "English",
    nativeName: "English",
    locale: "en-US",
    openGraphLocale: "en_US",
    store: { ios: "us", hl: "en", gl: "US" },
  },
  ko: {
    name: "Korean",
    nativeName: "한국어",
    locale: "ko-KR",
    openGraphLocale: "ko_KR",
    store: { ios: "kr", hl: "ko", gl: "KR" },
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語",
    locale: "ja-JP",
    openGraphLocale: "ja_JP",
    store: { ios: "jp", hl: "ja", gl: "JP" },
  },
  zh: {
    name: "Chinese",
    nativeName: "中文",
    locale: "zh-CN",
    openGraphLocale: "zh_CN",
    store: { ios: "cn", hl: "zh", gl: "CN" },
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    locale: "es-ES",
    openGraphLocale: "es_ES",
    store: { ios: "es", hl: "es", gl: "ES" },
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português (Brasil)",
    locale: "pt-BR",
    openGraphLocale: "pt_BR",
    store: { ios: "br", hl: "pt-BR", gl: "BR" },
  },
  fr: {
    name: "French",
    nativeName: "Français",
    locale: "fr-FR",
    openGraphLocale: "fr_FR",
    store: { ios: "fr", hl: "fr", gl: "FR" },
  },
  th: {
    name: "Thai",
    nativeName: "ไทย",
    locale: "th-TH",
    openGraphLocale: "th_TH",
    store: { ios: "th", hl: "th", gl: "TH" },
  },
  vi: {
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    locale: "vi-VN",
    openGraphLocale: "vi_VN",
    store: { ios: "vn", hl: "vi", gl: "VN" },
  },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "en";

export const languageList: Language[] = Object.keys(languages) as Language[];

const languagePrefixRegex = new RegExp(
  `^/(${languageList.map((code) => code.replace("-", "\\-")).join("|")})(?=/|$)`,
);

// Check if a language code is valid
export function isValidLanguage(lang: string): lang is Language {
  return lang in languages;
}

export function toLocaleTag(lang: Language): string {
  return languages[lang].locale;
}

export function toOpenGraphLocale(lang: Language): string {
  return languages[lang].openGraphLocale;
}

export function getStoreRegion(lang: Language) {
  return languages[lang].store;
}

export function toHreflang(lang: Language): string {
  return toLocaleTag(lang);
}

export function stripLanguagePrefix(pathname: string): string {
  return pathname.replace(languagePrefixRegex, "");
}

// Get language from path or return default
export function getLanguageFromPath(path: string): Language {
  const segments = path.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }

  return defaultLanguage;
}

// Generate alternate language links for SEO
export function generateAlternateLinks(pathname: string) {
  const pathWithoutLang = stripLanguagePrefix(pathname);

  return languageList.map((lang) => ({
    lang: toHreflang(lang),
    url: `/${lang}${pathWithoutLang}`,
  }));
}

export function buildSitemapAlternates(siteUrl: string, path: string) {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return [
    ...languageList.map((lang) => ({
      lang: toHreflang(lang),
      href: `${siteUrl}/${lang}${normalizedPath}`,
    })),
    {
      lang: "x-default",
      href: `${siteUrl}/${defaultLanguage}${normalizedPath}`,
    },
  ];
}

export function detectLanguageFromAcceptLanguage(
  acceptLanguageHeader: string | null,
): Language {
  if (!acceptLanguageHeader) {
    return defaultLanguage;
  }

  const languageByLocale = new Map<string, Language>(
    languageList.map((lang) => [toLocaleTag(lang).toLowerCase(), lang]),
  );

  const candidates = acceptLanguageHeader
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const candidate of candidates) {
    const fullMatch = languageByLocale.get(candidate);
    if (fullMatch) {
      return fullMatch;
    }

    const base = candidate.split("-")[0];
    if (base && isValidLanguage(base)) {
      return base;
    }
  }

  return defaultLanguage;
}
