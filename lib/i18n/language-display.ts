import {
  isValidLanguage,
  languages,
  toLocaleTag,
  type Language,
} from "@/lib/i18n/config";

export type LanguageDisplayInfo = {
  code: Language;
  localeTag: string;
  displayName: string;
  nativeName: string;
};

const localizedLanguageDisplayNames: Record<Language, Record<Language, string>> = {
  en: {
    en: "English",
    ko: "Korean",
    ja: "Japanese",
    zh: "Chinese",
    es: "Spanish",
    pt: "Portuguese",
    fr: "French",
    th: "Thai",
    vi: "Vietnamese",
  },
  ko: {
    en: "영어",
    ko: "한국어",
    ja: "일본어",
    zh: "중국어",
    es: "스페인어",
    pt: "포르투갈어",
    fr: "프랑스어",
    th: "태국어",
    vi: "베트남어",
  },
  ja: {
    en: "英語",
    ko: "韓国語",
    ja: "日本語",
    zh: "中国語",
    es: "スペイン語",
    pt: "ポルトガル語",
    fr: "フランス語",
    th: "タイ語",
    vi: "ベトナム語",
  },
  zh: {
    en: "英语",
    ko: "韩语",
    ja: "日语",
    zh: "中文",
    es: "西班牙语",
    pt: "葡萄牙语",
    fr: "法语",
    th: "泰语",
    vi: "越南语",
  },
  es: {
    en: "inglés",
    ko: "coreano",
    ja: "japonés",
    zh: "chino",
    es: "español",
    pt: "portugués",
    fr: "francés",
    th: "tailandés",
    vi: "vietnamita",
  },
  pt: {
    en: "inglês",
    ko: "coreano",
    ja: "japonês",
    zh: "chinês",
    es: "espanhol",
    pt: "português",
    fr: "francês",
    th: "tailandês",
    vi: "vietnamita",
  },
  fr: {
    en: "anglais",
    ko: "coréen",
    ja: "japonais",
    zh: "chinois",
    es: "espagnol",
    pt: "portugais",
    fr: "français",
    th: "thaï",
    vi: "vietnamien",
  },
  th: {
    en: "อังกฤษ",
    ko: "เกาหลี",
    ja: "ญี่ปุ่น",
    zh: "จีน",
    es: "สเปน",
    pt: "โปรตุเกส",
    fr: "ฝรั่งเศส",
    th: "ไทย",
    vi: "เวียดนาม",
  },
  vi: {
    en: "Tiếng Anh",
    ko: "Tiếng Hàn",
    ja: "Tiếng Nhật",
    zh: "Tiếng Trung",
    es: "Tiếng Tây Ban Nha",
    pt: "Tiếng Bồ Đào Nha",
    fr: "Tiếng Pháp",
    th: "Tiếng Thái",
    vi: "Tiếng Việt",
  },
};

export function normalizeLanguageCode(value: string | null | undefined): Language | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const [baseCode] = normalized.split(/[-_]/);
  return baseCode && isValidLanguage(baseCode) ? baseCode : null;
}

export function getLanguageDisplayInfo(
  value: string | null | undefined,
  uiLanguage: Language,
): LanguageDisplayInfo | null {
  const code = normalizeLanguageCode(value);
  if (!code) {
    return null;
  }

  return {
    code,
    localeTag: toLocaleTag(code),
    displayName: localizedLanguageDisplayNames[uiLanguage][code],
    nativeName: languages[code].nativeName,
  };
}
