"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { resolveClientPreferredLanguage } from "@/lib/i18n/preference.client";
import {
  languageAtom,
} from "@/lib/state/preferences";

export function RootRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preferredLanguage = useAtomValue(languageAtom);
  const searchParamsString = searchParams.toString();

  useEffect(() => {
    const targetLanguage = resolveClientPreferredLanguage({
      explicitLanguage: searchParams.get("lang"),
      currentPreference: preferredLanguage,
    });

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
