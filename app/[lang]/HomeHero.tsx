"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import { ScrollActivatedVideo } from "@/components/ScrollActivatedVideo";
import { APP_LOGO_TRANSPARENT_PATH } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import styles from "./page.module.scss";

export type HomeHeroContent = {
  heroTitle: string;
  heroLead: string;
  heroTutorialCta: string;
  primaryCta: string;
  deviceAlt: string;
  splashSubtitle: string;
  replayLabel: string;
  introPromptCta: string;
  introGuideTitle: string;
  introGuideLead: string;
};

type HomeHeroProps = {
  lang: Language;
  content: HomeHeroContent;
};

export function HomeHero({ lang, content }: HomeHeroProps) {
  const introSectionRef = useRef<HTMLElement>(null);
  const [introVersion, setIntroVersion] = useState(0);
  const [showIntroPrompt, setShowIntroPrompt] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  const scrollToIntroSection = () => {
    const section = introSectionRef.current;

    if (!section) {
      return;
    }

    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <FadeIn delay={80}>
              <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p className={styles.heroLead}>{content.heroLead}</p>
            </FadeIn>
            <FadeIn delay={160} className={styles.heroActionsWrap}>
              <div className={styles.heroActions}>
                <button type="button" className={styles.primaryButton} onClick={scrollToIntroSection}>
                  {content.heroTutorialCta}
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={120} className={styles.heroMediaWrap}>
            <DeviceMock className={styles.heroDevice} screenClassName={deviceStyles.screenMedia}>
              <div className={styles.splashScreen} role="img" aria-label={content.deviceAlt}>
                <div className={styles.splashLogoWrap}>
                  <Image
                    src={APP_LOGO_TRANSPARENT_PATH}
                    alt=""
                    aria-hidden="true"
                    width={168}
                    height={168}
                    sizes="168px"
                    className={styles.splashLogo}
                  />
                </div>
                <p className={styles.splashAppName}>MomentBook</p>
                <p className={styles.splashSubtitle}>{content.splashSubtitle}</p>
              </div>
            </DeviceMock>
          </FadeIn>
        </div>
      </section>

      <section
        ref={introSectionRef}
        className={`${styles.introSection} ${isIntroExpanded ? styles.introSectionExpanded : ""}`}
      >
        <FadeIn delay={140} className={styles.introStageWrap}>
          <div className={styles.introStage}>
            <div className={styles.introMediaPane}>
              <ScrollActivatedVideo
                key={`intro-${introVersion}`}
                className={styles.introVideo}
                src="/media/intro.mp4"
                poster="/media/intro-poster.jpg"
                title={content.deviceAlt}
                replayLabel={content.replayLabel}
                showReplayButton={false}
                onPlaybackStart={() => {
                  setShowIntroPrompt(false);
                }}
                onPlaybackEnd={() => {
                  setShowIntroPrompt(true);
                }}
                fallback={(
                  <div className={styles.introFallback} role="img" aria-label={content.deviceAlt}>
                    <Image
                      src="/media/intro-poster.jpg"
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 979px) 92vw, 78vw"
                      className={styles.introFallbackImage}
                    />
                  </div>
                )}
              />

              {!isIntroExpanded && showIntroPrompt ? (
                <button
                  type="button"
                  className={styles.introPromptButton}
                  onClick={() => {
                    setIsIntroExpanded(true);
                    setShowIntroPrompt(false);
                  }}
                >
                  {content.introPromptCta}
                </button>
              ) : null}
            </div>

            <aside
              className={`${styles.introGuidePane} ${isIntroExpanded ? styles.introGuidePaneVisible : ""}`}
              aria-hidden={!isIntroExpanded}
            >
              <h2 className={styles.introGuideTitle}>{content.introGuideTitle}</h2>
              <p className={styles.introGuideLead}>{content.introGuideLead}</p>
              <div className={styles.introGuideActions}>
                <button
                  type="button"
                  className={styles.introGuideReplayButton}
                  onClick={() => {
                    setIntroVersion((current) => current + 1);
                    setIsIntroExpanded(false);
                    setShowIntroPrompt(false);
                  }}
                >
                  {content.replayLabel}
                </button>
                <Link href={`/${lang}/download`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
              </div>
            </aside>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
