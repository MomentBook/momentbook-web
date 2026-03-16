"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { FadeIn } from "@/components/FadeIn";
import {
  ScrollActivatedVideo,
  type ScrollActivatedVideoHandle,
} from "@/components/ScrollActivatedVideo";
import { type Language } from "@/lib/i18n/config";
import { scrollHomeSectionIntoView } from "@/lib/marketing/home-scroll";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import styles from "./page.module.scss";

export type HomeHeroContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroExploreCta: string;
  heroTutorialCta: string;
  heroFootnote: string;
  deviceAlt: string;
  primaryCta: string;
  replayLabel: string;
  playWithSoundLabel: string;
  playLabel: string;
  pauseLabel: string;
  muteLabel: string;
  unmuteLabel: string;
  volumeLabel: string;
  seekLabel: string;
  fullscreenLabel: string;
  exitFullscreenLabel: string;
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
  const introVideoRef = useRef<ScrollActivatedVideoHandle>(null);
  const [showIntroPrompt, setShowIntroPrompt] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  useEffect(() => {
    if (!showIntroPrompt || isIntroExpanded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsIntroExpanded(true);
      setShowIntroPrompt(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isIntroExpanded, showIntroPrompt]);

  const scrollToIntroSection = () => {
    if (introSectionRef.current) {
      scrollHomeSectionIntoView(introSectionRef.current);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <FadeIn delay={80}>
              <p className={styles.heroEyebrow}>{content.heroEyebrow}</p>
            </FadeIn>
            <FadeIn delay={120}>
              <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
            </FadeIn>
            <FadeIn delay={160}>
              <p className={styles.heroLead}>{content.heroLead}</p>
            </FadeIn>
            <FadeIn delay={200} className={styles.heroActionsWrap}>
              <div className={styles.heroActions}>
                <DownloadActionButton
                  lang={lang}
                  className={styles.primaryButton}
                >
                  {content.primaryCta}
                </DownloadActionButton>
                <Link href={`/${lang}/journeys`} className={styles.secondaryButton}>
                  {content.heroExploreCta}
                </Link>
              </div>
              <button
                type="button"
                className={styles.tertiaryButton}
                onClick={scrollToIntroSection}
              >
                {content.heroTutorialCta}
              </button>
            </FadeIn>
            <FadeIn delay={240}>
              <p className={styles.heroFootnote}>{content.heroFootnote}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section
        ref={introSectionRef}
        id={HOME_SECTION_IDS.overview}
        tabIndex={-1}
        className={`${styles.introSection} ${isIntroExpanded ? styles.introSectionExpanded : ""}`}
        aria-labelledby="overview-title"
      >
        <div className={styles.introHeader}>
          <FadeIn delay={100}>
            <p className={styles.sectionEyebrow}>{content.heroTutorialCta}</p>
          </FadeIn>
          <FadeIn delay={140}>
            <h2 id="overview-title" className={styles.introSectionTitle}>
              {content.introGuideTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={180}>
            <p className={styles.introSectionLead}>{content.introGuideLead}</p>
          </FadeIn>
        </div>
        <FadeIn delay={140} className={styles.introStageWrap}>
          <div className={styles.introStage}>
            <div className={styles.introMediaPane}>
              <ScrollActivatedVideo
                ref={introVideoRef}
                className={styles.introVideo}
                src="/media/intro.mp4"
                poster="/media/intro-poster.jpg"
                title={content.deviceAlt}
                replayLabel={content.replayLabel}
                playWithSoundLabel={content.playWithSoundLabel}
                playLabel={content.playLabel}
                pauseLabel={content.pauseLabel}
                muteLabel={content.muteLabel}
                unmuteLabel={content.unmuteLabel}
                volumeLabel={content.volumeLabel}
                seekLabel={content.seekLabel}
                fullscreenLabel={content.fullscreenLabel}
                exitFullscreenLabel={content.exitFullscreenLabel}
                allowReplayFromControls={false}
                autoplay={false}
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
                    setIsIntroExpanded(false);
                    setShowIntroPrompt(false);
                    void introVideoRef.current?.replay({ forceUnmute: true });
                  }}
                >
                  {content.replayLabel}
                </button>
                <DownloadActionButton
                  lang={lang}
                  className={styles.primaryButton}
                >
                  {content.primaryCta}
                </DownloadActionButton>
              </div>
            </aside>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
