import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { Reveal } from "@/components/Reveal";
import { type Language } from "@/lib/i18n/config";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
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

export type HomeMarketingContent = {
  showcase: HomeMarketingShowcaseContent;
  storyEyebrow: string;
  storyTitle: string;
  storyLead: string;
  scenes: HomeMarketingSceneContent[];
  value: HomeMarketingValueContent;
};

type HomeMarketingStoryProps = {
  lang: Language;
  content: HomeMarketingContent;
};

type HomeMarketingVisualSlotProps = {
  promptKey: HomeMarketingImagePromptKey;
};

function HomeMarketingVisualSlot({
  promptKey,
}: HomeMarketingVisualSlotProps) {
  const prompt = getHomeMarketingImagePrompt(promptKey);

  return (
    <div
      className={styles.marketingVisual}
      data-variant={promptKey}
      data-prompt-key={promptKey}
      role="img"
      aria-label={prompt.alt}
      title={prompt.label}
    >
      <span className={styles.visuallyHidden}>{prompt.label}</span>
      <div className={styles.marketingVisualSurface}>
        <p className={styles.marketingPromptText}>{prompt.prompt}</p>
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
            <h2 id="home-result-showcase-title" className={styles.sectionTitle}>
              {content.showcase.title}
            </h2>
            {content.showcase.lead ? (
              <p className={styles.sectionLead}>{content.showcase.lead}</p>
            ) : null}
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
            <HomeMarketingVisualSlot promptKey="resultOverview" />
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
          <h2 id="home-story-sequence-title" className={styles.sectionTitle}>
            {content.storyTitle}
          </h2>
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
                />
              </Reveal>

              <Reveal
                delay={index * 50 + 60}
                duration={760}
                distance={8}
                className={styles.marketingSceneCopy}
              >
                <h3 className={styles.marketingSceneTitle}>{scene.title}</h3>
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
            <h2 id="home-value-title" className={styles.sectionTitle}>
              {content.value.title}
            </h2>
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
            <HomeMarketingVisualSlot promptKey="organizedResult" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
