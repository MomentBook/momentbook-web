"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isValidLanguage } from "@/lib/i18n/config";

export default function LanguageSyncProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract language from current pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const currentLang = pathSegments[0];

    if (currentLang && isValidLanguage(currentLang)) {
      // Sync to localStorage
      const storedLang = localStorage.getItem("preferredLanguage");
      if (storedLang !== currentLang) {
        localStorage.setItem("preferredLanguage", currentLang);
      }

      // Sync to cookie for server-side access
      const cookieLang = document.cookie
        .split("; ")
        .find((row) => row.startsWith("preferredLanguage="))
        ?.split("=")[1];

      if (cookieLang !== currentLang) {
        document.cookie = `preferredLanguage=${currentLang}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
      }
    }
  }, [pathname]);

  return null;
}
