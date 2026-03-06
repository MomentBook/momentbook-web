"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { type Language } from "@/lib/i18n/config";
import { detectLandingPlatform } from "@/lib/install-campaign";
import { scrollHomeSectionIntoView } from "@/lib/marketing/home-scroll";
import { HOME_SECTION_IDS, buildHomeSectionHref } from "@/lib/marketing/home-sections";
import { launchAppOrStore } from "@/lib/mobile-app";

type DownloadActionButtonProps = {
  lang: Language;
  className?: string;
  children: ReactNode;
};

export function DownloadActionButton({
  lang,
  className,
  children,
}: DownloadActionButtonProps) {
  const router = useRouter();
  const launchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (launchTimeoutRef.current !== null) {
        window.clearTimeout(launchTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (typeof window === "undefined") {
      return;
    }

    const downloadSection = document.getElementById(HOME_SECTION_IDS.download);
    const platform = detectLandingPlatform(
      window.navigator.userAgent,
      window.navigator.maxTouchPoints,
    );

    if (downloadSection instanceof HTMLElement) {
      scrollHomeSectionIntoView(downloadSection);
    } else if (platform === "desktop") {
      router.push(buildHomeSectionHref(lang, HOME_SECTION_IDS.download));
      return;
    }

    if (launchTimeoutRef.current !== null) {
      window.clearTimeout(launchTimeoutRef.current);
    }

    if (platform === "desktop") {
      return;
    }

    const launchDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 120
      : 480;

    launchTimeoutRef.current = window.setTimeout(() => {
      launchTimeoutRef.current = null;
      launchAppOrStore(platform, lang);
    }, launchDelay);
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
