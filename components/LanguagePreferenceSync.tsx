"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { languageAtom, normalizeLanguage } from "@/lib/state/preferences";
import { type Language } from "@/lib/i18n/config";

export function LanguagePreferenceSync({ currentLang }: { currentLang: Language }) {
  const [preferredLanguage, setPreferredLanguage] = useAtom(languageAtom);

  useEffect(() => {
    const normalized = normalizeLanguage(preferredLanguage);

    if (!normalized) {
      setPreferredLanguage(currentLang);
    }
  }, [currentLang, preferredLanguage, setPreferredLanguage]);

  return null;
}
