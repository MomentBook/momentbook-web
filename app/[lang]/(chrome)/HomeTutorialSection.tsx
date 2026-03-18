"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ScrollActivatedVideo } from "@/components/ScrollActivatedVideo";
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
  return (
    <section
      id={HOME_SECTION_IDS.overview}
      tabIndex={-1}
      className={styles.introSection}
      aria-labelledby="overview-title"
    >
      <Reveal
        delay={0}
        duration={760}
        distance={8}
        className={styles.introHeader}
      >
        <p className={styles.sectionEyebrow}>{content.introEyebrow}</p>
        <h2 id="overview-title" className={styles.introSectionTitle}>
          {content.introGuideTitle}
        </h2>
        <p className={styles.introSectionLead}>{content.introGuideLead}</p>
      </Reveal>
      <Reveal
        delay={80}
        duration={820}
        distance={8}
        className={styles.introStageWrap}
      >
        <div className={styles.introStage}>
          <div className={styles.introMediaPane}>
            <ScrollActivatedVideo
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
              allowReplayFromControls
              autoplay={false}
              showReplayButton={false}
              showCenterPlayOverlay={false}
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
      </Reveal>
    </section>
  );
}
