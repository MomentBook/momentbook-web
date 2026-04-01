import Image from "next/image";
import { DeviceMock } from "@/components/DeviceMock";
import { StoreBadgeLink } from "@/components/StoreBadgeLink";
import type { Language } from "@/lib/i18n/config";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { InstallLandingContent } from "@/lib/install-landing";
import type { MobilePlatform } from "@/lib/mobile-app";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./install.module.scss";

type InstallLandingHeroProps = {
  lang: Language;
  content: InstallLandingContent;
  showOpenAction: boolean;
  primaryOpenPlatform: MobilePlatform | null;
  heroStorePlatforms: MobilePlatform[];
  storeLinks: Record<MobilePlatform, string>;
  highlightTimelineStep: boolean;
  onHeroOpenClick: (platform: MobilePlatform) => void;
  onHeroStoreClick: (platform: MobilePlatform) => void;
  onSampleTripClick: () => void;
};

export function InstallLandingHero({
  lang,
  content,
  showOpenAction,
  primaryOpenPlatform,
  heroStorePlatforms,
  storeLinks,
  highlightTimelineStep,
  onHeroOpenClick,
  onHeroStoreClick,
  onSampleTripClick,
}: InstallLandingHeroProps) {
  return (
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
              onClick={() => onHeroOpenClick(primaryOpenPlatform)}
            >
              {content.openInAppLabel}
            </button>
          ) : null}

          {!showOpenAction ? (
            <div className={styles.heroStoreActions}>
              {heroStorePlatforms.map((targetPlatform) => (
                <StoreBadgeLink
                  key={targetPlatform}
                  lang={lang}
                  platform={targetPlatform}
                  href={storeLinks[targetPlatform]}
                  className={styles.storeBadgeLink}
                  imageClassName={styles.storeBadge}
                  onClick={() => onHeroStoreClick(targetPlatform)}
                />
              ))}
            </div>
          ) : null}

          <a href="#sample-trip" className={styles.sampleTripLink} onClick={onSampleTripClick}>
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
                  unoptimized={shouldBypassImageOptimization(frame.src)}
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
  );
}
