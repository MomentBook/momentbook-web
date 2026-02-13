"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import {
  defaultLanguage,
  detectLanguageFromAcceptLanguage,
  isValidLanguage,
} from "@/lib/i18n/config";
import { languageAtom } from "@/lib/state/preferences";

export default function RootPage() {
  const router = useRouter();
  const preferredLanguage = useAtomValue(languageAtom);

  useEffect(() => {
    let targetLanguage = isValidLanguage(preferredLanguage)
      ? preferredLanguage
      : defaultLanguage;

    if (!isValidLanguage(preferredLanguage) && typeof navigator !== "undefined") {
      const candidates =
        navigator.languages && navigator.languages.length > 0
          ? navigator.languages
          : [navigator.language].filter(Boolean);

      if (candidates.length > 0) {
        targetLanguage = detectLanguageFromAcceptLanguage(candidates.join(","));
      }
    }

    router.replace(`/${targetLanguage}`);
  }, [preferredLanguage, router]);

  return null;
}
