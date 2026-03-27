"use client";

import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { type Language } from "@/lib/i18n/config";
import { HOME_SECTION_IDS, buildHomeSectionHref } from "@/lib/marketing/home-sections";
import styles from "./page.module.scss";

export type HomeHeroContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroExploreCta: string;
  heroFootnote: string;
  primaryCta: string;
};

type HomeHeroProps = {
  lang: Language;
  content: HomeHeroContent;
};

export function HomeHero({ lang, content }: HomeHeroProps) {
  return (
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
              <Link
                href={buildHomeSectionHref(lang, HOME_SECTION_IDS.story)}
                className={styles.secondaryButton}
              >
                {content.heroExploreCta}
              </Link>
            </div>
          </div>
          {content.heroFootnote ? (
            <p className={styles.heroFootnote}>{content.heroFootnote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
