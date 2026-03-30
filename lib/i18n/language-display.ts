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

export function normalizeLanguageCode(value: string | null | undefined): Language | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const baseCode = normalized.split("-")[0];
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

  const displayNames = typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames([toLocaleTag(uiLanguage)], { type: "language" })
    : null;

  return {
    code,
    localeTag: toLocaleTag(code),
    displayName: displayNames?.of(code) ?? languages[code].name,
    nativeName: languages[code].nativeName,
  };
}
