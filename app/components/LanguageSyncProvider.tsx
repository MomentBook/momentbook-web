"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import {
  detectLanguageFromAcceptLanguage,
  isValidLanguage,
} from "@/lib/i18n/config";
import { languageAtom, normalizeLanguage } from "@/lib/state/preferences";

const COOKIE_NAME = "preferredLanguage";
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

function parseStoredLanguage(raw: string | null): string | null {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
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
      const legacyRaw = localStorage.getItem("preferredLanguage");
      const legacy = normalizeLanguage(parseStoredLanguage(legacyRaw));

      if (legacy) {
        setPreferredLanguage(legacy);
        targetLang = legacy;
      } else {
        const deviceLang = normalizeLanguage(detectDeviceLanguage());
        if (deviceLang) {
          setPreferredLanguage(deviceLang);
          targetLang = deviceLang;
        }
      }
    }

    if (targetLang) {
      const cookieLang = readCookie(COOKIE_NAME);
      if (cookieLang !== targetLang) {
        writeCookie(COOKIE_NAME, targetLang);
      }
    }
  }, [pathname, preferredLanguage, setPreferredLanguage]);

  return null;
}
