"use client";

import { useEffect, useMemo, useRef } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics/gtag";
import {
  buildCampaignEventParams,
  type CampaignParams,
  type LandingPlatform,
} from "@/lib/install-campaign";
import type { Language } from "@/lib/i18n/config";

type AnalyticsExtra = Record<string, string | number | boolean | null | undefined>;

type UseInstallLandingAnalyticsOptions = {
  campaign: CampaignParams;
  lang: Language;
  platform: LandingPlatform;
  heroHeadlineKey: string;
};

export function useInstallLandingAnalytics({
  campaign,
  lang,
  platform,
  heroHeadlineKey,
}: UseInstallLandingAnalyticsOptions) {
  const hasTrackedPageViewRef = useRef(false);
  const hasTrackedHalfScrollRef = useRef(false);

  const eventParams = useMemo(
    () => buildCampaignEventParams(campaign, lang, platform, {
      hero_variant: heroHeadlineKey,
    }),
    [campaign, heroHeadlineKey, lang, platform],
  );

  useEffect(() => {
    if (typeof window === "undefined" || hasTrackedPageViewRef.current) {
      return;
    }

    hasTrackedPageViewRef.current = true;
    trackAnalyticsEvent("page_view_from_short", {
      ...eventParams,
      page_location: window.location.href,
    });
  }, [eventParams]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      if (hasTrackedHalfScrollRef.current) {
        return;
      }

      const doc = document.documentElement;
      const progress = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);

      if (progress >= 0.5) {
        hasTrackedHalfScrollRef.current = true;
        trackAnalyticsEvent("scroll_50", eventParams);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [eventParams]);

  return (eventName: string, extra: AnalyticsExtra = {}) => {
    trackAnalyticsEvent(eventName, { ...eventParams, ...extra });
  };
}
