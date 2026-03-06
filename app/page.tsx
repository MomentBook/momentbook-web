"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import {
  defaultLanguage,
  detectLanguageFromAcceptLanguage,
  isValidLanguage,
} from "@/lib/i18n/config";
import { languageAtom } from "@/lib/state/preferences";

function RootRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preferredLanguage = useAtomValue(languageAtom);
  const searchParamsString = searchParams.toString();

  useEffect(() => {
    let targetLanguage = isValidLanguage(preferredLanguage)
      ? preferredLanguage
      : defaultLanguage;
    const queryLang = searchParams.get("lang");

    if (queryLang && isValidLanguage(queryLang)) {
      targetLanguage = queryLang;
    }

    if (!queryLang && !isValidLanguage(preferredLanguage) && typeof navigator !== "undefined") {
      const candidates =
        navigator.languages && navigator.languages.length > 0
          ? navigator.languages
          : [navigator.language].filter(Boolean);

      if (candidates.length > 0) {
        targetLanguage = detectLanguageFromAcceptLanguage(candidates.join(","));
      }
    }

    const nextSearchParams = new URLSearchParams(searchParamsString);
    nextSearchParams.delete("lang");

    const nextQuery = nextSearchParams.toString();
    router.replace(nextQuery ? `/${targetLanguage}?${nextQuery}` : `/${targetLanguage}`);
  }, [preferredLanguage, router, searchParams, searchParamsString]);

  return null;
}

export default function RootPage() {
  return (
    <Suspense fallback={null}>
      <RootRedirect />
    </Suspense>
  );
}
