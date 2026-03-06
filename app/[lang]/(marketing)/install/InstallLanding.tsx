"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { trackAnalyticsEvent } from "@/lib/analytics/gtag";
import {
  getInstallLandingContent,
  type InstallLandingVariantKey,
} from "@/lib/install-landing";
import {
  buildOpenInAppUrl,
  buildStoreLink,
  canOpenInApp,
  getStoreLinks,
  type CampaignParams,
  type MobilePlatform,
} from "@/lib/mobile-app";
import { type Language } from "@/lib/i18n/config";
import styles from "./install.module.scss";

type LandingPlatform = MobilePlatform | "desktop";

type StoreBadgeLinkProps = {
  platform: MobilePlatform;
  href: string;
  className?: string;
  onClick?: () => void;
};

const INSTALL_BAR_SESSION_KEY = "momentbook-install-bar-dismissed";

function subscribeNoop() {
  return () => undefined;
}

function detectPlatform(userAgent: string, maxTouchPoints = 0): LandingPlatform {
  const normalized = userAgent.toLowerCase();
  const isiPadOs = normalized.includes("macintosh") && maxTouchPoints > 1;

  if (/iphone|ipad|ipod/.test(normalized) || isiPadOs) {
    return "ios";
  }

  if (/android/.test(normalized)) {
    return "android";
  }

  return "desktop";
}

function getSearchValue(searchParams: ReturnType<typeof useSearchParams>, key: string) {
  const value = searchParams.get(key);
  return value && value.trim().length > 0 ? value.trim() : null;
}

function buildCampaignParams(
  searchParams: ReturnType<typeof useSearchParams>,
  lang: Language,
): CampaignParams {
  return {
    source: getSearchValue(searchParams, "source"),
    dest: getSearchValue(searchParams, "dest"),
    lang,
    utmSource: getSearchValue(searchParams, "utm_source"),
    utmMedium: getSearchValue(searchParams, "utm_medium"),
    utmCampaign: getSearchValue(searchParams, "utm_campaign"),
    utmContent: getSearchValue(searchParams, "utm_content"),
    utmTerm: getSearchValue(searchParams, "utm_term"),
    variant: getSearchValue(searchParams, "variant"),
  };
}

function buildEventParams(
  campaign: CampaignParams,
  lang: Language,
  platform: LandingPlatform,
  extra: Record<string, string | number | boolean | null | undefined> = {},
) {
  return {
    route_lang: lang,
    platform_hint: platform,
    source: campaign.source,
    dest: campaign.dest,
    utm_source: campaign.utmSource,
    utm_medium: campaign.utmMedium,
    utm_campaign: campaign.utmCampaign,
    utm_content: campaign.utmContent,
    utm_term: campaign.utmTerm,
    variant: campaign.variant,
    ...extra,
  };
}

function launchAppOrStore(
  platform: MobilePlatform,
  lang: Language,
  campaign: CampaignParams,
) {
  if (typeof window === "undefined") {
    return;
  }

  const fallbackUrl = buildStoreLink(platform, lang, campaign);
  const openInAppUrl = buildOpenInAppUrl(platform, lang, campaign);

  if (!openInAppUrl) {
    window.location.assign(fallbackUrl);
    return;
  }

  const clearEvents = new Set<number>();
  const fallbackTimeout = window.setTimeout(() => {
    window.location.assign(fallbackUrl);
  }, 900);

  clearEvents.add(fallbackTimeout);

  const clearFallback = () => {
    clearEvents.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    clearEvents.clear();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", clearFallback);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      clearFallback();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", clearFallback, { once: true });
  window.location.assign(openInAppUrl);
}

function StoreBadgeLink({
  platform,
  href,
  className,
  onClick,
}: StoreBadgeLinkProps) {
  const isIos = platform === "ios";
  const src = isIos
    ? "/images/download/app-store-button.webp"
    : "/images/download/google-play-button.webp";
  const alt = isIos ? "Download on the App Store" : "Get it on Google Play";

  return (
    <a
      href={href}
      className={`${styles.storeBadgeLink} ${className ?? ""}`.trim()}
      onClick={onClick}
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        width={isIos ? 635 : 636}
        height={200}
        className={styles.storeBadge}
      />
    </a>
  );
}

export function InstallLanding({ lang }: { lang: Language }) {
  const searchParams = useSearchParams();
  const campaign = buildCampaignParams(searchParams, lang);
  const content = getInstallLandingContent(lang, {
    dest: campaign.dest,
    variant: campaign.variant,
  });
  const storeLinks = getStoreLinks(lang, campaign);
  const {
    source,
    dest,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    variant,
  } = campaign;
  const platform = useSyncExternalStore(
    subscribeNoop,
    () => detectPlatform(window.navigator.userAgent, window.navigator.maxTouchPoints),
    () => null,
  );
  const storedInstallBarDismissed = useSyncExternalStore(
    subscribeNoop,
    () => window.sessionStorage.getItem(INSTALL_BAR_SESSION_KEY) === "1",
    () => false,
  );
  const [installBarVisible, setInstallBarVisible] = useState(false);
  const [installBarDismissed, setInstallBarDismissed] = useState(false);
  const isInstallBarDismissed = installBarDismissed || storedInstallBarDismissed;
  const resolvedPlatform = platform ?? "desktop";

  useEffect(() => {
    if (platform === null) {
      return;
    }

    trackAnalyticsEvent(
      "page_view_from_short",
      buildEventParams({
        source,
        dest,
        lang,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        variant,
      }, lang, resolvedPlatform, {
        page_location: typeof window === "undefined" ? undefined : window.location.href,
      }),
    );
  }, [
    dest,
    lang,
    platform,
    resolvedPlatform,
    source,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource,
    utmTerm,
    variant,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (platform === null) {
      return;
    }

    let hasTrackedHalfScroll = false;

    const handleScroll = () => {
      if (hasTrackedHalfScroll) {
        return;
      }

      const doc = document.documentElement;
      const progress = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);

      if (progress >= 0.5) {
        hasTrackedHalfScroll = true;
        trackAnalyticsEvent(
          "scroll_50",
          buildEventParams({
            source,
            dest,
            lang,
            utmSource,
            utmMedium,
            utmCampaign,
            utmContent,
            utmTerm,
            variant,
          }, lang, resolvedPlatform),
        );
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    dest,
    lang,
    platform,
    resolvedPlatform,
    source,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource,
    utmTerm,
    variant,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (platform !== "android" || isInstallBarDismissed) {
      return;
    }

    let hasShown = false;

    const showInstallBar = () => {
      if (hasShown) {
        return;
      }

      hasShown = true;
      setInstallBarVisible(true);
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", showInstallBar);
      window.removeEventListener("scroll", showInstallBar);
      window.removeEventListener("keydown", showInstallBar);
    };

    const timeoutId = window.setTimeout(showInstallBar, 3000);

    window.addEventListener("pointerdown", showInstallBar, { passive: true });
    window.addEventListener("scroll", showInstallBar, { passive: true });
    window.addEventListener("keydown", showInstallBar);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", showInstallBar);
      window.removeEventListener("scroll", showInstallBar);
      window.removeEventListener("keydown", showInstallBar);
    };
  }, [isInstallBarDismissed, platform]);

  const handleHeroOpenClick = (targetPlatform: MobilePlatform) => {
    trackAnalyticsEvent(
      targetPlatform === "ios" ? "hero_cta_click_ios" : "hero_cta_click_android",
      buildEventParams(campaign, lang, resolvedPlatform, { surface: "hero" }),
    );
    trackAnalyticsEvent(
      "open_in_app_click",
      buildEventParams(campaign, lang, resolvedPlatform, {
        surface: "hero",
        target_platform: targetPlatform,
      }),
    );
    launchAppOrStore(targetPlatform, lang, campaign);
  };

  const handleHeroStoreClick = (targetPlatform: MobilePlatform) => {
    trackAnalyticsEvent(
      targetPlatform === "ios" ? "hero_cta_click_ios" : "hero_cta_click_android",
      buildEventParams(campaign, lang, resolvedPlatform, { surface: "hero" }),
    );
  };

  const handleSampleTripClick = () => {
    trackAnalyticsEvent(
      "sample_trip_click",
      buildEventParams(campaign, lang, resolvedPlatform, { sample_key: content.sample.key }),
    );
  };

  const handleFinalStoreClick = (targetPlatform: MobilePlatform) => {
    trackAnalyticsEvent(
      "final_cta_click",
      buildEventParams(campaign, lang, resolvedPlatform, { target_platform: targetPlatform }),
    );
  };

  const dismissInstallBar = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(INSTALL_BAR_SESSION_KEY, "1");
    }

    setInstallBarDismissed(true);
    setInstallBarVisible(false);
    trackAnalyticsEvent("install_banner_dismiss", buildEventParams(campaign, lang, resolvedPlatform));
  };

  const handleInstallBarAction = () => {
    if (platform !== "android") {
      return;
    }

    if (canOpenInApp("android", lang, campaign)) {
      trackAnalyticsEvent(
        "open_in_app_click",
        buildEventParams(campaign, lang, resolvedPlatform, {
          surface: "install_bar",
          target_platform: "android",
        }),
      );
    }

    launchAppOrStore("android", lang, campaign);
  };

  const activeVariant = (campaign.variant ?? content.heroHeadlineOptions[0].key) as InstallLandingVariantKey;
  const showIosOpenAction = resolvedPlatform === "ios" && canOpenInApp("ios", lang, campaign);
  const showAndroidOpenAction = resolvedPlatform === "android" && canOpenInApp("android", lang, campaign);

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

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <p className={styles.heroEyebrow}>{content.eyebrow}</p>
              {content.sample.key !== "default" ? (
                <span className={styles.destinationChip}>{content.sample.heroLabel}</span>
              ) : null}
            </div>

            <h1 className={styles.heroTitle}>{content.heroHeadline}</h1>
            <p className={styles.heroLead}>{content.heroSubheadline}</p>

            <div className={styles.heroActions}>
              {showIosOpenAction ? (
                <button
                  type="button"
                  className={styles.primaryActionButton}
                  onClick={() => handleHeroOpenClick("ios")}
                >
                  {content.openInAppLabel}
                </button>
              ) : null}

              {showAndroidOpenAction ? (
                <button
                  type="button"
                  className={styles.primaryActionButton}
                  onClick={() => handleHeroOpenClick("android")}
                >
                  {content.openInAppLabel}
                </button>
              ) : null}

              {!showIosOpenAction && !showAndroidOpenAction ? (
                <div className={styles.heroStoreActions}>
                  {(resolvedPlatform === "desktop" || resolvedPlatform === "ios") ? (
                    <StoreBadgeLink
                      platform="ios"
                      href={storeLinks.ios}
                      onClick={() => handleHeroStoreClick("ios")}
                    />
                  ) : null}
                  {(resolvedPlatform === "desktop" || resolvedPlatform === "android") ? (
                    <StoreBadgeLink
                      platform="android"
                      href={storeLinks.android}
                      onClick={() => handleHeroStoreClick("android")}
                    />
                  ) : null}
                </div>
              ) : null}

              <a href="#sample-trip" className={styles.sampleTripLink} onClick={handleSampleTripClick}>
                {content.sampleTripLink}
              </a>
            </div>

            <ul className={styles.trustRow} role="list">
              {content.trustItems.map((item) => (
                <li key={item} className={styles.trustItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.heroMediaCard}>
              <DeviceMock className={styles.heroDevice} screenClassName={deviceStyles.screenMedia}>
                <div className={styles.heroSequence}>
                  {content.heroFrames.map((frame, index) => (
                    <Image
                      key={frame.key}
                      src={frame.src}
                      alt=""
                      aria-hidden="true"
                      fill
                      priority={index === 0}
                      sizes="(max-width: 979px) min(92vw, 20rem), 21rem"
                      className={`${styles.heroFrame} ${styles[`heroFrame${index}` as keyof typeof styles]}`}
                    />
                  ))}
                </div>
              </DeviceMock>

              <div className={styles.heroStepRail} aria-label={content.timelineViewLabel}>
                {content.heroSteps.map((step, index) => (
                  <div
                    key={`${step}-${index}`}
                    className={`${styles.heroStep} ${activeVariant === "timeline" && index === 2 ? styles.heroStepStrong : ""}`}
                  >
                    <span className={styles.heroStepIndex}>0{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>{content.sectionBenefitsLabel}</p>
            <h2 className={styles.sectionTitle}>{content.benefitsTitle}</h2>
            <p className={styles.sectionLead}>{content.benefitsLead}</p>
          </div>

          <div className={styles.benefitGrid}>
            {content.benefits.map((benefit) => (
              <article key={benefit.key} className={styles.benefitCard}>
                <div className={styles.benefitMedia}>
                  <Image
                    src={benefit.screenshotSrc}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 979px) 100vw, 20rem"
                    className={styles.benefitImage}
                    style={{ objectPosition: benefit.objectPosition }}
                  />
                </div>
                <div className={styles.benefitBody}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitText}>{benefit.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sample-trip" className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>{content.sectionSampleLabel}</p>
            <h2 className={styles.sectionTitle}>{content.sample.sectionTitle}</h2>
            <p className={styles.sectionLead}>{content.sample.sectionLead}</p>
          </div>

          <div className={styles.sampleLayout}>
            <div className={styles.samplePreview}>
              <div className={styles.samplePreviewHeader}>
                <span className={styles.samplePreviewLabel}>{content.timelineViewLabel}</span>
                <strong className={styles.samplePreviewCity}>{content.sample.city}</strong>
              </div>
              <div className={styles.sampleScreenshotCard}>
                <Image
                  src={content.sampleTimelineScreenshotSrc}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 979px) 100vw, 28rem"
                  className={styles.sampleScreenshot}
                />
              </div>
            </div>

            <div className={styles.sampleDayList}>
              {content.sample.days.map((day) => (
                <article key={`${content.sample.key}-${day.dayLabel}-${day.title}`} className={styles.sampleDayCard}>
                  <p className={styles.sampleDayLabel}>{day.dayLabel}</p>
                  <h3 className={styles.sampleDayTitle}>{day.title}</h3>
                  <p className={styles.sampleDayNote}>{day.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.finalSection}`}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>{content.sectionInstallLabel}</p>
            <h2 className={styles.sectionTitle}>{content.finalTitle}</h2>
            <p className={styles.sectionLead}>{content.finalLead}</p>
          </div>

          <div className={styles.finalActions}>
            <StoreBadgeLink
              platform="ios"
              href={storeLinks.ios}
              onClick={() => handleFinalStoreClick("ios")}
            />
            <StoreBadgeLink
              platform="android"
              href={storeLinks.android}
              onClick={() => handleFinalStoreClick("android")}
            />
          </div>

          <p className={styles.finalNote}>{content.finalDesktopNote}</p>
        </section>
      </div>

      {resolvedPlatform === "android" && installBarVisible && !isInstallBarDismissed ? (
        <div className={styles.installBar} role="region" aria-label={content.installBarLead}>
          <div className={styles.installBarContent}>
            <div className={styles.installBarCopy}>
              <strong>{content.installBarLead}</strong>
              <span>{content.sample.heroLabel}</span>
            </div>
            <button type="button" className={styles.installBarButton} onClick={handleInstallBarAction}>
              {canOpenInApp("android", lang, campaign) ? content.openInAppLabel : content.installBarAction}
            </button>
            <button
              type="button"
              className={styles.installBarDismiss}
              onClick={dismissInstallBar}
              aria-label={content.dismissLabel}
            >
              {content.dismissLabel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
