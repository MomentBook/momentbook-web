// Language configuration for MomentBook web

export const languages = {
  en: { name: 'English', nativeName: 'English' },
  ko: { name: 'Korean', nativeName: '한국어' },
  zh: { name: 'Chinese', nativeName: '中文' },
  ja: { name: 'Japanese', nativeName: '日本語' },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

export const languageList: Language[] = Object.keys(languages) as Language[];

// Check if a language code is valid
export function isValidLanguage(lang: string): lang is Language {
  return lang in languages;
}

// Get language from path or return default
export function getLanguageFromPath(path: string): Language {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }

  return defaultLanguage;
}

// Generate alternate language links for SEO
export function generateAlternateLinks(pathname: string) {
  const pathWithoutLang = pathname.replace(/^\/(en|ko|zh|ja)/, '');

  return languageList.map(lang => ({
    lang,
    url: `/${lang}${pathWithoutLang}`,
  }));
}
