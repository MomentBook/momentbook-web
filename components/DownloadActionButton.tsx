"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DownloadQrModal } from "@/components/DownloadQrModal";
import { trackAnalyticsEvent } from "@/lib/analytics/gtag";
import {
  getPublicPageContext,
  PUBLIC_WEB_EVENTS,
  type MarketingSurface,
} from "@/lib/analytics/public-web";
import { type Language } from "@/lib/i18n/config";
import { detectLandingPlatform } from "@/lib/install-campaign";
import { scrollHomeSectionIntoView } from "@/lib/marketing/home-scroll";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import { launchAppOrStore } from "@/lib/mobile-app";

type DownloadActionButtonProps = {
  lang: Language;
  className?: string;
  children: ReactNode;
  analyticsSurface?: MarketingSurface;
  mobileLaunchBehavior?: "scroll-to-download" | "launch-directly";
};

export function DownloadActionButton({
  lang,
  className,
  children,
  analyticsSurface,
  mobileLaunchBehavior = "scroll-to-download",
}: DownloadActionButtonProps) {
  const launchTimeoutRef = useRef<number | null>(null);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const pageContext = getPublicPageContext(pathname);

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

    if (analyticsSurface) {
      trackAnalyticsEvent(PUBLIC_WEB_EVENTS.downloadCtaClick, {
        route_lang: lang,
        page_surface: pageContext.pageSurface,
        page_location: window.location.href,
        surface: analyticsSurface,
        platform_hint: platform,
        action: platform === "desktop" ? "open_qr" : "launch_store",
      });
    }

    if (platform === "desktop") {
      setIsQrOpen(true);
      return;
    }

    if (
      mobileLaunchBehavior === "scroll-to-download"
      && downloadSection instanceof HTMLElement
    ) {
      scrollHomeSectionIntoView(downloadSection);
    }

    if (launchTimeoutRef.current !== null) {
      window.clearTimeout(launchTimeoutRef.current);
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
    <>
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
      <DownloadQrModal
        lang={lang}
        isOpen={isQrOpen}
        onClose={() => {
          setIsQrOpen(false);
        }}
      />
    </>
  );
}
