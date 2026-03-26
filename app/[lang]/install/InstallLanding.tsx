"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import {
  detectLandingPlatform,
  type CampaignParams,
  type LandingPlatform,
} from "@/lib/install-campaign";
import {
  canOpenInApp,
  launchAppOrStore,
  type MobilePlatform,
  type StoreLinks,
} from "@/lib/mobile-app";
import { type InstallLandingContent } from "@/lib/install-landing";
import { type Language } from "@/lib/i18n/config";
import { InstallBar } from "./InstallBar";
import { InstallBenefitsSection } from "./InstallBenefitsSection";
import { InstallFinalSection } from "./InstallFinalSection";
import { InstallLandingHero } from "./InstallLandingHero";
import { InstallSampleTripSection } from "./InstallSampleTripSection";
import { useInstallBar } from "./useInstallBar";
import { useInstallLandingAnalytics } from "./useInstallLandingAnalytics";
import styles from "./install.module.scss";

type InstallLandingProps = {
  lang: Language;
  campaign: CampaignParams;
  platform: LandingPlatform;
  content: InstallLandingContent;
  storeLinks: StoreLinks;
  qrSvgMarkup: string;
};

function subscribePlatform(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("resize", onStoreChange);

  return () => {
    window.removeEventListener("resize", onStoreChange);
  };
}

function getClientPlatformSnapshot() {
  return detectLandingPlatform(window.navigator.userAgent, window.navigator.maxTouchPoints);
}

export function InstallLanding({
  lang,
  campaign,
  platform,
  content,
  storeLinks,
  qrSvgMarkup,
}: InstallLandingProps) {
  const resolvedPlatform = useSyncExternalStore(
    subscribePlatform,
    getClientPlatformSnapshot,
    () => platform,
  );
  const trackInstallEvent = useInstallLandingAnalytics({
    campaign,
    lang,
    platform: resolvedPlatform,
    heroHeadlineKey: content.heroHeadlineKey,
  });
  const {
    installBarVisible,
    installBarDismissed,
    dismissInstallBarState,
  } = useInstallBar(resolvedPlatform);

  const openInAppAvailability = {
    ios: canOpenInApp("ios", lang, campaign),
    android: canOpenInApp("android", lang, campaign),
  };

  const heroStorePlatforms: MobilePlatform[] = resolvedPlatform === "desktop"
    ? ["ios", "android"]
    : [resolvedPlatform];

  const showOpenAction = (
    resolvedPlatform === "ios" && openInAppAvailability.ios
  ) || (
    resolvedPlatform === "android" && openInAppAvailability.android
  );

  const handleHeroOpenClick = (targetPlatform: MobilePlatform) => {
    trackInstallEvent(
      targetPlatform === "ios" ? "hero_cta_click_ios" : "hero_cta_click_android",
      { surface: "hero" },
    );
    trackInstallEvent("open_in_app_click", {
      surface: "hero",
      target_platform: targetPlatform,
    });
    launchAppOrStore(targetPlatform, lang, campaign);
  };

  const handleHeroStoreClick = (targetPlatform: MobilePlatform) => {
    trackInstallEvent(
      targetPlatform === "ios" ? "hero_cta_click_ios" : "hero_cta_click_android",
      { surface: "hero" },
    );
  };

  const handleSampleTripClick = () => {
    trackInstallEvent("sample_trip_click", {
      sample_key: content.sample.key,
    });
  };

  const handleFinalStoreClick = (targetPlatform: MobilePlatform) => {
    trackInstallEvent("final_cta_click", {
      target_platform: targetPlatform,
    });
  };

  const dismissInstallBar = () => {
    dismissInstallBarState();
    trackInstallEvent("install_banner_dismiss");
  };

  const handleInstallBarAction = () => {
    if (resolvedPlatform !== "android") {
      return;
    }

    if (openInAppAvailability.android) {
      trackInstallEvent("open_in_app_click", {
        surface: "install_bar",
        target_platform: "android",
      });
    }

    launchAppOrStore("android", lang, campaign);
  };

  const highlightTimelineStep = content.heroHeadlineKey === "timeline";
  const primaryOpenPlatform = resolvedPlatform === "desktop"
    ? null
    : resolvedPlatform;

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.brandBar}>
          <Link href={`/${lang}`} className={styles.brandLink}>
            <MomentBookLogo
              className={styles.brandLogo}
              iconClassName={styles.brandIcon}
              wordmarkClassName={styles.brandWordmark}
            />
          </Link>
          <p className={styles.brandTagline}>{content.eyebrow}</p>
        </header>

        <InstallLandingHero
          lang={lang}
          content={content}
          showOpenAction={showOpenAction}
          primaryOpenPlatform={primaryOpenPlatform}
          heroStorePlatforms={heroStorePlatforms}
          storeLinks={storeLinks}
          highlightTimelineStep={highlightTimelineStep}
          onHeroOpenClick={handleHeroOpenClick}
          onHeroStoreClick={handleHeroStoreClick}
          onSampleTripClick={handleSampleTripClick}
        />

        <InstallBenefitsSection content={content} />
        <InstallSampleTripSection content={content} />
        <InstallFinalSection
          lang={lang}
          content={content}
          platform={resolvedPlatform}
          storeLinks={storeLinks}
          qrSvgMarkup={qrSvgMarkup}
          onStoreClick={handleFinalStoreClick}
        />
      </div>

      <InstallBar
        content={content}
        show={resolvedPlatform === "android" && installBarVisible && !installBarDismissed}
        useOpenInAppLabel={openInAppAvailability.android}
        onAction={handleInstallBarAction}
        onDismiss={dismissInstallBar}
      />
    </div>
  );
}
