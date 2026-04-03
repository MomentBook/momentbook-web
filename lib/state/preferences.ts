import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { type Language, resolveSupportedLanguage } from "@/lib/i18n/config";

export type Theme = "light" | "dark";
export const LANGUAGE_STORAGE_KEY = "language";
export const LEGACY_LANGUAGE_STORAGE_KEY = "preferredLanguage";
export const PREFERRED_LANGUAGE_COOKIE_NAME = "preferredLanguage";

const themeStorage = createJSONStorage<Theme>();
const languageStorage = createJSONStorage<Language | "">();

export const themeAtom = atomWithStorage<Theme>("theme", "light", themeStorage, {
  getOnInit: true,
});
export const languageAtom = atomWithStorage<Language | "">(
  LANGUAGE_STORAGE_KEY,
  "",
  languageStorage,
  { getOnInit: true }
);

export function parseStoredLanguageValue(raw: string | null): string | null {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function normalizeLanguage(value: string | null): Language | "" {
  return resolveSupportedLanguage(value) ?? "";
}

export function normalizeStoredLanguageValue(raw: string | null): Language | "" {
  return normalizeLanguage(parseStoredLanguageValue(raw));
}
