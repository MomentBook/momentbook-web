"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { defaultLanguage, isValidLanguage } from "@/lib/i18n/config";
import { languageAtom } from "@/lib/state/preferences";

export default function RootPage() {
  const router = useRouter();
  const preferredLanguage = useAtomValue(languageAtom);

  useEffect(() => {
    const targetLanguage = isValidLanguage(preferredLanguage)
      ? preferredLanguage
      : defaultLanguage;

    router.replace(`/${targetLanguage}`);
  }, [preferredLanguage, router]);

  return null;
}
