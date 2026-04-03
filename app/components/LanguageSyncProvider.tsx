"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import {
  getPathLanguage,
  toLocaleTag,
} from "@/lib/i18n/config";
import {
  PREFERRED_LANGUAGE_COOKIE_NAME,
  readPreferenceCookie,
  resolveLanguageSyncTarget,
  writePreferenceCookie,
} from "@/lib/i18n/preference.client";
import {
  languageAtom,
  normalizeLanguage,
} from "@/lib/state/preferences";

export default function LanguageSyncProvider() {
  const pathname = usePathname();
  const [preferredLanguage, setPreferredLanguage] = useAtom(languageAtom);

  useEffect(() => {
    const pathLang = getPathLanguage(pathname);
    const normalizedStored = normalizeLanguage(preferredLanguage);
    const targetLang = resolveLanguageSyncTarget(pathname, preferredLanguage);

    if (targetLang !== normalizedStored) {
      setPreferredLanguage(targetLang);
    }

    if (pathLang) {
      document.documentElement.setAttribute("lang", toLocaleTag(pathLang));
    }

    if (readPreferenceCookie(PREFERRED_LANGUAGE_COOKIE_NAME) !== targetLang) {
      writePreferenceCookie(PREFERRED_LANGUAGE_COOKIE_NAME, targetLang);
    }
  }, [pathname, preferredLanguage, setPreferredLanguage]);

  return null;
}
