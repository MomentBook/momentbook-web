export type HomeMarketingImagePromptKey =
  | "resultOverview"
  | "photoPile"
  | "batchImport"
  | "timelineFormation"
  | "organizedResult";

export type HomeMarketingImagePrompt = {
  label: string;
  alt: string;
  shortHint: string;
  prompt: string;
};

export const HOME_MARKETING_IMAGE_PROMPTS: Record<
  HomeMarketingImagePromptKey,
  HomeMarketingImagePrompt
> = {
  resultOverview: {
    label: "Organized trip overview video prompt",
    alt: "Video generation prompt for the finished travel timeline overview.",
    shortHint: "Result-first video prompt for the finished timeline.",
    prompt:
      "6-second editorial product video. Slow dolly-in on a phone showing one trip organized into a clear timeline by time and place, soft forest-green UI, warm sand light, realistic travel photos, no hype graphics.",
  },
  photoPile: {
    label: "Travel photos piling up video prompt",
    alt: "Video generation prompt for a growing pile of travel photos.",
    shortHint: "Mixed travel photos before import.",
    prompt:
      "6-second overhead video. Mixed travel photos from one trip spread across a table in natural daylight, honest documentary mood, soft motion, no text overlays.",
  },
  batchImport: {
    label: "Batch import selection video prompt",
    alt: "Video generation prompt for selecting many travel photos at once.",
    shortHint: "Batch import selection prompt.",
    prompt:
      "6-second close product video. A phone selects many trip photos at once, gentle tap motion, clean neutral UI, calm editorial framing, no celebratory effects.",
  },
  timelineFormation: {
    label: "Timeline taking shape video prompt",
    alt: "Video generation prompt for photos grouping into timeline moments.",
    shortHint: "Photos become grouped moments.",
    prompt:
      "6-second transition video. Scattered trip photos inside a phone UI softly group into moments by time and place, readable timeline, restrained motion, quiet cinematic tone.",
  },
  organizedResult: {
    label: "Finished timeline detail video prompt",
    alt: "Video generation prompt for the final organized timeline detail.",
    shortHint: "Closer look at the finished timeline.",
    prompt:
      "6-second close-up video. The finished trip timeline shows grouped moments and place labels in a calm phone UI, editorial lighting, no social or productivity motifs.",
  },
};

export function getHomeMarketingImagePrompt(
  key: HomeMarketingImagePromptKey,
): HomeMarketingImagePrompt {
  return HOME_MARKETING_IMAGE_PROMPTS[key];
}
