import type { ImageProps } from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import type { Language } from "@/lib/i18n/config";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import landing00Poster from "@/assets/ui/posters/landing-00.jpg";
import landing01Poster from "@/assets/ui/posters/landing-01.jpg";
import landing02Poster from "@/assets/ui/posters/landing-02.jpg";
import landing03Poster from "@/assets/ui/posters/landing-03.jpg";
import {
  getHomeMarketingImagePrompt,
  type HomeMarketingImagePromptKey,
} from "./home-image-prompts";
import { HomeMarketingVideo } from "./HomeMarketingVideo";
import styles from "./page.module.scss";

const STORY_SCENE_IDS = [
  "photoPile",
  "batchImport",
  "timelineFormation",
] as const satisfies readonly HomeMarketingImagePromptKey[];

const HOME_MARKETING_VIDEO_ASSETS: Record<
  Exclude<HomeMarketingImagePromptKey, "resultOverview">,
  {
    videoSrc: string;
    posterSrc: ImageProps["src"];
  }
> = {
  photoPile: {
    videoSrc: "/videos/landing_00.mp4",
    posterSrc: landing00Poster,
  },
  batchImport: {
    videoSrc: "/videos/landing_01.mp4",
    posterSrc: landing01Poster,
  },
  timelineFormation: {
    videoSrc: "/videos/landing_02.mp4",
    posterSrc: landing02Poster,
  },
  organizedResult: {
    videoSrc: "/videos/landing_03.mp4",
    posterSrc: landing03Poster,
  },
};

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
  lang: Language;
  promptKey: Exclude<HomeMarketingImagePromptKey, "resultOverview">;
};

function HomeMarketingVisualSlot({
  lang,
  promptKey,
}: HomeMarketingVisualSlotProps) {
  const prompt = getHomeMarketingImagePrompt(promptKey, lang);
  const asset = HOME_MARKETING_VIDEO_ASSETS[promptKey];

  return (
    <HomeMarketingVideo
      videoSrc={asset.videoSrc}
      posterSrc={asset.posterSrc}
      ariaLabel={prompt.alt}
    />
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
                  lang={lang}
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
            <HomeMarketingVisualSlot lang={lang} promptKey="organizedResult" />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
