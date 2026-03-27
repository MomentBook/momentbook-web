import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { Reveal } from "@/components/Reveal";
import { type Language } from "@/lib/i18n/config";
import { HOME_SECTION_IDS, buildHomeSectionHref } from "@/lib/marketing/home-sections";
import {
  getHomeMarketingImagePrompt,
  type HomeMarketingImagePromptKey,
} from "./home-image-prompts";
import styles from "./page.module.scss";

const STORY_SCENE_IDS = [
  "photoPile",
  "batchImport",
  "timelineFormation",
] as const satisfies readonly HomeMarketingImagePromptKey[];

type HomeMarketingShowcaseContent = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
};

type HomeMarketingSceneContent = {
  sceneLabel: string;
  title: string;
  description: string;
};

type HomeMarketingValueContent = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
};

type HomeMarketingBridgeContent = {
  title: string;
  lead: string;
  cta: string;
};

export type HomeMarketingContent = {
  showcase: HomeMarketingShowcaseContent;
  storyEyebrow: string;
  storyTitle: string;
  storyLead: string;
  scenes: HomeMarketingSceneContent[];
  value: HomeMarketingValueContent;
  bridge: HomeMarketingBridgeContent;
};

type HomeMarketingStoryProps = {
  lang: Language;
  content: HomeMarketingContent;
};

type HomeMarketingVisualSlotProps = {
  promptKey: HomeMarketingImagePromptKey;
  variant: HomeMarketingImagePromptKey;
};

function HomeMarketingVisualSlot({
  promptKey,
  variant,
}: HomeMarketingVisualSlotProps) {
  const prompt = getHomeMarketingImagePrompt(promptKey);

  return (
    <div
      className={styles.marketingVisual}
      data-variant={variant}
      data-prompt-key={promptKey}
      role="img"
      aria-label={prompt.alt}
      title={prompt.label}
    >
      <span className={styles.visuallyHidden}>{prompt.shortHint}</span>
      <div className={styles.marketingVisualSurface}>
        {variant === "resultOverview" ? (
          <>
            <div className={styles.marketingVisualToolbar} />
            <div className={styles.resultOverviewGrid}>
              <div className={styles.resultOverviewCollage}>
                <span className={styles.resultPhotoTall} />
                <span className={styles.resultPhotoWide} />
                <span className={styles.resultPhotoWide} />
              </div>
              <div className={styles.resultOverviewTimeline}>
                <div className={styles.resultTimelineHeader}>
                  <span className={styles.resultTimelinePill} />
                  <span className={styles.resultTimelinePill} />
                </div>
                {[0, 1, 2].map((item) => (
                  <div key={item} className={styles.resultTimelineCard}>
                    <span className={styles.resultTimelineLineShort} />
                    <span className={styles.resultTimelineLineLong} />
                    <span className={styles.resultTimelineMeta} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.resultOverviewFloatingCard}>
              <span className={styles.resultFloatingLine} />
              <span className={styles.resultFloatingLineShort} />
            </div>
          </>
        ) : null}

        {variant === "photoPile" ? (
          <div className={styles.photoPileCanvas}>
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className={styles.photoPileCard}>
                <span className={styles.photoPileSky} />
                <span className={styles.photoPileGround} />
              </div>
            ))}
            <div className={styles.photoPileShelf} />
          </div>
        ) : null}

        {variant === "batchImport" ? (
          <div className={styles.batchImportCanvas}>
            <div className={styles.batchImportHeader}>
              <span className={styles.batchImportSelection} />
              <span className={styles.batchImportAction} />
            </div>
            <div className={styles.batchImportGrid}>
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div key={item} className={styles.batchImportTile}>
                  <span className={styles.batchImportTileBadge} />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {variant === "timelineFormation" ? (
          <div className={styles.timelineFormationCanvas}>
            <div className={styles.timelineFormationRail}>
              {[0, 1, 2].map((item) => (
                <span key={item} className={styles.timelineFormationThumb} />
              ))}
            </div>
            <div className={styles.timelineFormationMoments}>
              {[0, 1, 2].map((item) => (
                <div key={item} className={styles.timelineFormationMomentCard}>
                  <span className={styles.timelineFormationTitle} />
                  <span className={styles.timelineFormationBody} />
                  <span className={styles.timelineFormationMeta} />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {variant === "organizedResult" ? (
          <div className={styles.organizedResultCanvas}>
            <div className={styles.organizedResultHeroRow}>
              <div className={styles.organizedResultHeroCard}>
                <span className={styles.organizedResultHeroTitle} />
                <span className={styles.organizedResultHeroBody} />
              </div>
              <div className={styles.organizedResultStatStack}>
                <span className={styles.organizedResultStat} />
                <span className={styles.organizedResultStat} />
              </div>
            </div>
            <div className={styles.organizedResultTimeline}>
              {[0, 1, 2].map((item) => (
                <div key={item} className={styles.organizedResultRow}>
                  <span className={styles.organizedResultMarker} />
                  <div className={styles.organizedResultRowBody}>
                    <span className={styles.organizedResultRowTitle} />
                    <span className={styles.organizedResultRowLine} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function HomeMarketingStory({
  lang,
  content,
}: HomeMarketingStoryProps) {
  return (
    <>
      <section
        id={HOME_SECTION_IDS.story}
        className={styles.marketingShowcaseSection}
        aria-labelledby="home-result-showcase-title"
        tabIndex={-1}
      >
        <div className={styles.marketingShowcaseGrid}>
          <Reveal
            delay={0}
            duration={820}
            distance={10}
            className={styles.marketingShowcaseCopy}
          >
            <p className={styles.sectionEyebrow}>{content.showcase.eyebrow}</p>
            <h2 id="home-result-showcase-title" className={styles.sectionTitle}>
              {content.showcase.title}
            </h2>
            <p className={styles.sectionLead}>{content.showcase.lead}</p>
            <div className={styles.marketingActions}>
              <DownloadActionButton
                lang={lang}
                className={styles.primaryButton}
              >
                {content.showcase.primaryCta}
              </DownloadActionButton>
              <Link href="#home-story-sequence" className={styles.secondaryButton}>
                {content.showcase.secondaryCta}
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={90}
            duration={860}
            distance={10}
            className={styles.marketingShowcaseVisualWrap}
          >
            <HomeMarketingVisualSlot
              promptKey="resultOverview"
              variant="resultOverview"
            />
          </Reveal>
        </div>
      </section>

      <section
        id="home-story-sequence"
        className={styles.marketingStorySection}
        aria-labelledby="home-story-sequence-title"
        tabIndex={-1}
      >
        <Reveal
          delay={0}
          duration={780}
          distance={8}
          className={styles.marketingStoryIntro}
        >
          <p className={styles.sectionEyebrow}>{content.storyEyebrow}</p>
          <h2 id="home-story-sequence-title" className={styles.sectionTitle}>
            {content.storyTitle}
          </h2>
          <p className={styles.sectionLead}>{content.storyLead}</p>
        </Reveal>

        <div className={styles.marketingSceneList}>
          {content.scenes.map((scene, index) => (
            <article
              key={`${scene.sceneLabel}-${scene.title}`}
              className={styles.marketingScene}
              data-reversed={index % 2 === 1}
            >
              <Reveal
                delay={index * 50}
                duration={820}
                distance={8}
                className={styles.marketingSceneVisualWrap}
              >
                <HomeMarketingVisualSlot
                  promptKey={STORY_SCENE_IDS[index] ?? "timelineFormation"}
                  variant={STORY_SCENE_IDS[index] ?? "timelineFormation"}
                />
              </Reveal>

              <Reveal
                delay={index * 50 + 60}
                duration={760}
                distance={8}
                className={styles.marketingSceneCopy}
              >
                <p className={styles.marketingSceneLabel}>{scene.sceneLabel}</p>
                <h3 className={styles.marketingSceneTitle}>{scene.title}</h3>
                <p className={styles.marketingSceneDescription}>
                  {scene.description}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.marketingValueSection}
        aria-labelledby="home-value-title"
      >
        <div className={styles.marketingValueGrid}>
          <Reveal
            delay={0}
            duration={820}
            distance={8}
            className={styles.marketingValueCopy}
          >
            <p className={styles.sectionEyebrow}>{content.value.eyebrow}</p>
            <h2 id="home-value-title" className={styles.sectionTitle}>
              {content.value.title}
            </h2>
            <p className={styles.sectionLead}>{content.value.lead}</p>
            <ul className={styles.marketingValueList}>
              {content.value.bullets.map((bullet) => (
                <li key={bullet} className={styles.marketingValueItem}>
                  <span className={styles.marketingValueDot} aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={90}
            duration={860}
            distance={8}
            className={styles.marketingValueVisualWrap}
          >
            <HomeMarketingVisualSlot
              promptKey="organizedResult"
              variant="organizedResult"
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.marketingBridgeSection} aria-labelledby="home-bridge-title">
        <Reveal
          delay={0}
          duration={760}
          distance={8}
          className={styles.marketingBridgeCard}
        >
          <div className={styles.marketingBridgeCopy}>
            <h2 id="home-bridge-title" className={styles.marketingBridgeTitle}>
              {content.bridge.title}
            </h2>
            <p className={styles.marketingBridgeLead}>{content.bridge.lead}</p>
          </div>
          <Link
            href={buildHomeSectionHref(lang, HOME_SECTION_IDS.download)}
            className={styles.secondaryButton}
          >
            {content.bridge.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
