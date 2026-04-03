"use client";

import {
  type Language,
} from "@/lib/i18n/config";
import {
  resolveClientPreferredLanguageFromSources,
  resolveLanguageSyncTarget as resolveLanguageSyncTargetFromSources,
} from "@/lib/i18n/preference";
import {
  LANGUAGE_STORAGE_KEY,
  LEGACY_LANGUAGE_STORAGE_KEY,
  PREFERRED_LANGUAGE_COOKIE_NAME,
} from "@/lib/state/preferences";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function readPreferenceCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  if (!value) {
    return null;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function writePreferenceCookie(name: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

export function resolveClientPreferredLanguage({
  explicitLanguage,
  currentPreference,
}: {
  explicitLanguage?: string | null;
  currentPreference?: string | null;
}): Language {
  return resolveClientPreferredLanguageFromSources({
    explicitLanguage,
    currentPreference,
    storedLanguage:
      typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(LANGUAGE_STORAGE_KEY),
    legacyStoredLanguage:
      typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY),
    cookieLanguage: readPreferenceCookie(PREFERRED_LANGUAGE_COOKIE_NAME),
    browserLanguages:
      typeof navigator === "undefined"
        ? []
        : navigator.languages && navigator.languages.length > 0
          ? navigator.languages
          : [navigator.language].filter(Boolean),
  });
}

export function resolveLanguageSyncTarget(pathname: string, currentPreference?: string | null) {
  return resolveLanguageSyncTargetFromSources({
    pathname,
    currentPreference,
    storedLanguage:
      typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(LANGUAGE_STORAGE_KEY),
    legacyStoredLanguage:
      typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY),
    cookieLanguage: readPreferenceCookie(PREFERRED_LANGUAGE_COOKIE_NAME),
    browserLanguages:
      typeof navigator === "undefined"
        ? []
        : navigator.languages && navigator.languages.length > 0
          ? navigator.languages
          : [navigator.language].filter(Boolean),
  });
}

export { PREFERRED_LANGUAGE_COOKIE_NAME };
