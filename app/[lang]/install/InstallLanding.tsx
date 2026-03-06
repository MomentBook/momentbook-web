"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { trackAnalyticsEvent } from "@/lib/analytics/gtag";
import {
  buildCampaignEventParams,
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
import styles from "./install.module.scss";

type InstallLandingProps = {
  lang: Language;
  campaign: CampaignParams;
  platform: LandingPlatform;
  content: InstallLandingContent;
  storeLinks: StoreLinks;
};

type StoreBadgeLinkProps = {
  platform: MobilePlatform;
  href: string;
  className?: string;
  onClick?: () => void;
};

const INSTALL_BAR_SESSION_KEY = "momentbook-install-bar-dismissed";

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

export function InstallLanding({
  lang,
  campaign,
  platform,
  content,
  storeLinks,
}: InstallLandingProps) {
  const [installBarVisible, setInstallBarVisible] = useState(false);
  const resolvedPlatform = useSyncExternalStore(
    subscribePlatform,
    getClientPlatformSnapshot,
    () => platform,
  );
  const [installBarDismissed, setInstallBarDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem(INSTALL_BAR_SESSION_KEY) === "1";
  });
  const hasTrackedPageViewRef = useRef(false);
  const hasTrackedHalfScrollRef = useRef(false);

  const eventParams = useMemo(
    () => buildCampaignEventParams(campaign, lang, resolvedPlatform, {
      hero_variant: content.heroHeadlineKey,
    }),
    [campaign, content.heroHeadlineKey, lang, resolvedPlatform],
  );

  const trackInstallEvent = (
    eventName: string,
    extra: Record<string, string | number | boolean | null | undefined> = {},
  ) => {
    trackAnalyticsEvent(eventName, { ...eventParams, ...extra });
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (hasTrackedPageViewRef.current) {
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

  useEffect(() => {
    if (resolvedPlatform !== "android" || installBarDismissed) {
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
  }, [installBarDismissed, resolvedPlatform]);

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
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(INSTALL_BAR_SESSION_KEY, "1");
    }

    setInstallBarDismissed(true);
    setInstallBarVisible(false);
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
              {showOpenAction && primaryOpenPlatform ? (
                <button
                  type="button"
                  className={styles.primaryActionButton}
                  onClick={() => handleHeroOpenClick(primaryOpenPlatform)}
                >
                  {content.openInAppLabel}
                </button>
              ) : null}

              {!showOpenAction ? (
                <div className={styles.heroStoreActions}>
                  {heroStorePlatforms.map((targetPlatform) => (
                    <StoreBadgeLink
                      key={targetPlatform}
                      platform={targetPlatform}
                      href={storeLinks[targetPlatform]}
                      onClick={() => handleHeroStoreClick(targetPlatform)}
                    />
                  ))}
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

              <ol className={styles.heroStepRail} aria-label={content.timelineViewLabel}>
                {content.heroSteps.map((step, index) => (
                  <li
                    key={`${step}-${index}`}
                    className={`${styles.heroStep} ${highlightTimelineStep && index === 2 ? styles.heroStepStrong : ""}`}
                  >
                    <span className={styles.heroStepIndex} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
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
                    loading="lazy"
                    sizes="(max-width: 819px) 100vw, 20rem"
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
                  loading="lazy"
                  sizes="(max-width: 819px) 100vw, 28rem"
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

      {resolvedPlatform === "android" && installBarVisible && !installBarDismissed ? (
        <div className={styles.installBar} role="region" aria-label={content.installBarLead}>
          <div className={styles.installBarContent}>
            <div className={styles.installBarCopy}>
              <strong>{content.installBarLead}</strong>
              <span>{content.sample.heroLabel}</span>
            </div>
            <button type="button" className={styles.installBarButton} onClick={handleInstallBarAction}>
              {openInAppAvailability.android ? content.openInAppLabel : content.installBarAction}
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
