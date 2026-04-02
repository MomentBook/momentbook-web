"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import {
  defaultLanguage,
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

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ?? null;
}

function detectBrowserLanguage(): string {
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

export function RootRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preferredLanguage = useAtomValue(languageAtom);
  const searchParamsString = searchParams.toString();

  useEffect(() => {
    const queryLang = searchParams.get("lang");
    let targetLanguage = defaultLanguage;

    if (queryLang && isValidLanguage(queryLang)) {
      targetLanguage = queryLang;
    } else {
      targetLanguage =
        normalizeLanguage(preferredLanguage) ||
        normalizeStoredLanguageValue(localStorage.getItem(LANGUAGE_STORAGE_KEY)) ||
        normalizeStoredLanguageValue(
          localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY),
        ) ||
        normalizeLanguage(readCookie(PREFERRED_LANGUAGE_COOKIE_NAME)) ||
        normalizeLanguage(detectBrowserLanguage()) ||
        defaultLanguage;
    }

    const nextSearchParams = new URLSearchParams(searchParamsString);
    nextSearchParams.delete("lang");

    const nextQuery = nextSearchParams.toString();
    router.replace(
      nextQuery
        ? `/${targetLanguage}?${nextQuery}`
        : `/${targetLanguage}`,
    );
  }, [preferredLanguage, router, searchParams, searchParamsString]);

  return null;
}
