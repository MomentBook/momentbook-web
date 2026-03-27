import { SectionReveal } from "@/components/SectionReveal";
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
  content,
}: HomeMarketingStoryProps) {
  return (
    <>
      <section
        id={HOME_SECTION_IDS.story}
        className={styles.marketingStorySection}
        aria-labelledby="home-story-sequence-title"
        tabIndex={-1}
      >
        <SectionReveal className={styles.marketingStoryIntro}>
          <h2 id="home-story-sequence-title" className={styles.sectionTitle}>
            {content.storyTitle}
          </h2>
        </SectionReveal>

        <div className={styles.marketingSceneList}>
          {content.scenes.map((scene, index) => (
            <article
              key={`${scene.sceneLabel}-${scene.title}`}
              className={styles.marketingScene}
              data-reversed={index % 2 === 1}
            >
              <SectionReveal
                className={styles.marketingSceneVisualWrap}
                variant="item"
                staggerIndex={index}
              >
                <HomeMarketingVisualSlot
                  promptKey={STORY_SCENE_IDS[index] ?? "timelineFormation"}
                />
              </SectionReveal>

              <SectionReveal
                delay={60}
                className={styles.marketingSceneCopy}
                variant="item"
                staggerIndex={index}
              >
                <h3 className={styles.marketingSceneTitle}>{scene.title}</h3>
                <p className={styles.marketingSceneDescription}>
                  {scene.description}
                </p>
              </SectionReveal>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.marketingValueSection}
        aria-labelledby="home-value-title"
      >
        <div className={styles.marketingValueGrid}>
          <SectionReveal className={styles.marketingValueCopy}>
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
          </SectionReveal>

          <SectionReveal delay={90} className={styles.marketingValueVisualWrap}>
            <HomeMarketingVisualSlot promptKey="organizedResult" />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
