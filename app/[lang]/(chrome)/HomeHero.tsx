"use client";

import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { Reveal } from "@/components/Reveal";
import { type Language } from "@/lib/i18n/config";
import { scrollHomeSectionIntoView } from "@/lib/marketing/home-scroll";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import styles from "./page.module.scss";

export type HomeHeroContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroExploreCta: string;
  heroVideoCta: string;
  heroFootnote: string;
  primaryCta: string;
};

export type HomeHeroProcessStep = {
  stepLabel: string;
  title: string;
  description: string;
};

export type HomeHeroProcessContent = {
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
  const scrollToIntroSection = () => {
    const target = document.getElementById(HOME_SECTION_IDS.overview);

    if (target instanceof HTMLElement) {
      scrollHomeSectionIntoView(target);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>{content.heroEyebrow}</p>
            <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
            <p className={styles.heroLead}>{content.heroLead}</p>
            <div className={styles.heroActionsWrap}>
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
                {content.heroVideoCta}
              </button>
            </div>
            {content.heroFootnote ? (
              <p className={styles.heroFootnote}>{content.heroFootnote}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.workflowSection} aria-labelledby="home-process-title">
        <Reveal
          delay={0}
          duration={760}
          distance={8}
          className={styles.workflowIntro}
        >
          <p className={styles.sectionEyebrow}>{process.processEyebrow}</p>
          <h2 id="home-process-title" className={styles.workflowTitle}>
            {process.processTitle}
          </h2>
          <p className={styles.workflowLead}>{process.processLead}</p>
        </Reveal>
        <div className={styles.workflowGrid}>
          {process.processSteps.map((step, index) => (
            <Reveal
              key={`${step.stepLabel}-${step.title}`}
              delay={index * 70}
              distance={8}
              duration={760}
              className={styles.workflowCard}
            >
              <p className={styles.workflowStepLabel}>{step.stepLabel}</p>
              <h3 className={styles.workflowStepTitle}>{step.title}</h3>
              <p className={styles.workflowStepDescription}>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
