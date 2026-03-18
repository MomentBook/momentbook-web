"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import {
  detectLanguageFromAcceptLanguage,
  isValidLanguage,
} from "@/lib/i18n/config";
import {
  LANGUAGE_STORAGE_KEY,
  LEGACY_LANGUAGE_STORAGE_KEY,
  PREFERRED_LANGUAGE_COOKIE_NAME,
  languageAtom,
  normalizeLanguage,
  normalizeStoredLanguageValue,
} from "@/lib/state/preferences";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readCookie(name: string): string | null {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ?? null;
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_MAX_AGE}`;
}

function detectDeviceLanguage(): string {
  if (typeof navigator === "undefined") {
    return "";
  }

  const candidates =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language].filter(Boolean);

  if (candidates.length === 0) {
    return "";
  }

  return detectLanguageFromAcceptLanguage(candidates.join(","));
}

export default function LanguageSyncProvider() {
  const pathname = usePathname();
  const [preferredLanguage, setPreferredLanguage] = useAtom(languageAtom);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathLang = pathSegments[0];
    const normalizedStored = normalizeLanguage(preferredLanguage);

    let targetLang = normalizedStored;

    if (pathLang && isValidLanguage(pathLang)) {
      if (pathLang !== normalizedStored) {
        setPreferredLanguage(pathLang);
      }
      targetLang = pathLang;
    } else if (!normalizedStored) {
      const persistedLanguage =
        normalizeStoredLanguageValue(localStorage.getItem(LANGUAGE_STORAGE_KEY)) ||
        normalizeStoredLanguageValue(localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY)) ||
        normalizeLanguage(readCookie(PREFERRED_LANGUAGE_COOKIE_NAME));

      if (persistedLanguage) {
        setPreferredLanguage(persistedLanguage);
        targetLang = persistedLanguage;
      } else {
        const deviceLang = normalizeLanguage(detectDeviceLanguage());
        if (deviceLang) {
          setPreferredLanguage(deviceLang);
          targetLang = deviceLang;
        }
      }
    }

    if (targetLang) {
      const cookieLang = readCookie(PREFERRED_LANGUAGE_COOKIE_NAME);
      if (cookieLang !== targetLang) {
        writeCookie(PREFERRED_LANGUAGE_COOKIE_NAME, targetLang);
      }
    }
  }, [pathname, preferredLanguage, setPreferredLanguage]);

  return null;
}
