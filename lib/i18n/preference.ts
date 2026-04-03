import {
  defaultLanguage,
  detectLanguageFromLanguageList,
  getPathLanguage,
  type Language,
} from "@/lib/i18n/config";
import {
  normalizeLanguage,
  normalizeStoredLanguageValue,
} from "@/lib/state/preferences";

type PersistedLanguageSources = {
  currentPreference?: string | null;
  storedLanguage?: string | null;
  legacyStoredLanguage?: string | null;
  cookieLanguage?: string | null;
};

type ClientLanguageSources = PersistedLanguageSources & {
  explicitLanguage?: string | null;
  browserLanguages?: readonly string[];
};

export function resolvePersistedLanguagePreferenceFromSources({
  currentPreference,
  storedLanguage,
  legacyStoredLanguage,
  cookieLanguage,
}: PersistedLanguageSources): Language | "" {
  return (
    normalizeLanguage(currentPreference ?? null) ||
    normalizeStoredLanguageValue(storedLanguage ?? null) ||
    normalizeStoredLanguageValue(legacyStoredLanguage ?? null) ||
    normalizeLanguage(cookieLanguage ?? null)
  );
}

export function resolveClientPreferredLanguageFromSources({
  explicitLanguage,
  currentPreference,
  storedLanguage,
  legacyStoredLanguage,
  cookieLanguage,
  browserLanguages = [],
}: ClientLanguageSources): Language {
  return (
    normalizeLanguage(explicitLanguage ?? null) ||
    resolvePersistedLanguagePreferenceFromSources({
      currentPreference,
      storedLanguage,
      legacyStoredLanguage,
      cookieLanguage,
    }) ||
    detectLanguageFromLanguageList(browserLanguages) ||
    defaultLanguage
  );
}

export function resolveLanguageSyncTarget({
  pathname,
  currentPreference,
  storedLanguage,
  legacyStoredLanguage,
  cookieLanguage,
  browserLanguages = [],
}: ClientLanguageSources & {
  pathname: string;
}): Language {
  return (
    getPathLanguage(pathname) ||
    resolveClientPreferredLanguageFromSources({
      currentPreference,
      storedLanguage,
      legacyStoredLanguage,
      cookieLanguage,
      browserLanguages,
    })
  );
}
