"use client";

import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { FadeIn } from "@/components/FadeIn";
import { type Language } from "@/lib/i18n/config";
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

export type HomeHeroProcessStep = {
  stepLabel: string;
  title: string;
  description: string;
};

export type HomeHeroProcessContent = {
  introEyebrow: string;
  processEyebrow: string;
  processTitle: string;
  processLead: string;
  processSteps: HomeHeroProcessStep[];
};

type HomeHeroProps = {
  lang: Language;
  content: HomeHeroContent;
  process: HomeHeroProcessContent;
};

export function HomeHero({ lang, content, process }: HomeHeroProps) {
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
            </FadeIn>
            {content.heroFootnote ? (
              <FadeIn delay={240}>
                <p className={styles.heroFootnote}>{content.heroFootnote}</p>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.workflowSection} aria-labelledby="home-process-title">
        <div className={styles.workflowIntro}>
          <FadeIn delay={100}>
            <p className={styles.sectionEyebrow}>{process.processEyebrow}</p>
          </FadeIn>
          <FadeIn delay={140}>
            <h2 id="home-process-title" className={styles.workflowTitle}>
              {process.processTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={180}>
            <p className={styles.workflowLead}>{process.processLead}</p>
          </FadeIn>
        </div>
        <div className={styles.workflowGrid}>
          {process.processSteps.map((step, index) => (
            <FadeIn
              key={`${step.stepLabel}-${step.title}`}
              delay={220 + (index * 80)}
              className={styles.workflowCard}
            >
              <p className={styles.workflowStepLabel}>{step.stepLabel}</p>
              <h3 className={styles.workflowStepTitle}>{step.title}</h3>
              <p className={styles.workflowStepDescription}>{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
