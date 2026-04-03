import { AnalyticsLink } from "@/components/AnalyticsLink";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { PUBLIC_WEB_EVENTS } from "@/lib/analytics/public-web";
import { SectionReveal } from "@/components/SectionReveal";
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
      <SectionReveal className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>{content.heroEyebrow}</p>
          <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
          <p className={styles.heroLead}>{content.heroLead}</p>
          <div className={styles.heroActionsWrap}>
            <div className={styles.heroActions}>
              <DownloadActionButton
                lang={lang}
                className={styles.primaryButton}
                analyticsSurface="home_hero"
              >
                {content.primaryCta}
              </DownloadActionButton>
              <AnalyticsLink
                lang={lang}
                href={buildHomeSectionHref(lang, HOME_SECTION_IDS.story)}
                className={styles.secondaryButton}
                analyticsEvent={PUBLIC_WEB_EVENTS.navigationLinkClick}
                analyticsParams={{
                  surface: "home_hero",
                  link_id: "see_flow",
                  link_kind: "secondary_cta",
                  target_section: HOME_SECTION_IDS.story,
                }}
              >
                {content.heroExploreCta}
              </AnalyticsLink>
            </div>
          </div>
          {content.heroFootnote ? (
            <p className={styles.heroFootnote}>{content.heroFootnote}</p>
          ) : null}
        </div>
      </SectionReveal>
    </section>
  );
}
