"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  ScrollActivatedVideo,
  type ScrollActivatedVideoHandle,
} from "@/components/ScrollActivatedVideo";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import styles from "./page.module.scss";

export type HomeTutorialContent = {
  introEyebrow: string;
  deviceAlt: string;
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
  introGuideTitle: string;
  introGuideLead: string;
};

type HomeTutorialSectionProps = {
  content: HomeTutorialContent;
};

export function HomeTutorialSection({ content }: HomeTutorialSectionProps) {
  const introVideoRef = useRef<ScrollActivatedVideoHandle>(null);
  const [hasIntroStarted, setHasIntroStarted] = useState(false);
  const [hasIntroEnded, setHasIntroEnded] = useState(false);

  const handlePrimaryVideoAction = () => {
    if (hasIntroEnded) {
      setHasIntroEnded(false);
      void introVideoRef.current?.replay({ forceUnmute: true });
      return;
    }

    void introVideoRef.current?.play({ forceUnmute: true });
  };

  return (
    <section
      id={HOME_SECTION_IDS.overview}
      tabIndex={-1}
      className={styles.introSection}
      aria-labelledby="overview-title"
    >
      <div className={styles.introHeader}>
        <FadeIn delay={100}>
          <p className={styles.sectionEyebrow}>{content.introEyebrow}</p>
        </FadeIn>
        <FadeIn delay={140}>
          <h2 id="overview-title" className={styles.introSectionTitle}>
            {content.introGuideTitle}
          </h2>
        </FadeIn>
        <FadeIn delay={180}>
          <p className={styles.introSectionLead}>{content.introGuideLead}</p>
        </FadeIn>
        {!hasIntroStarted || hasIntroEnded ? (
          <FadeIn delay={220} className={styles.introHeaderActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handlePrimaryVideoAction}
            >
              {hasIntroEnded ? content.replayLabel : content.playLabel}
            </button>
          </FadeIn>
        ) : null}
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
              showCenterPlayOverlay={false}
              onPlaybackStart={() => {
                setHasIntroStarted(true);
                setHasIntroEnded(false);
              }}
              onPlaybackEnd={() => {
                setHasIntroEnded(true);
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
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
