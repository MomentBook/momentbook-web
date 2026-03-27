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
    label: "Organized trip overview",
    alt: "Placeholder for a generated image showing a clean travel timeline result inside the app.",
    shortHint: "Large result-first visual focused on the finished timeline inside the app.",
    prompt:
      "Create a premium marketing image for a travel photo organizer app. Show a calm, elegant phone UI with one finished trip organized into a clear timeline by time and place. The composition should feel factual and product-led, not hype. Show grouped travel moments, subtle location labels, day dividers, and a readable timeline structure. Use soft forest green, warm sand, and off-white tones around the device. Keep real travel photography visible inside the UI, but the app result should dominate the frame. No social feed motifs, no exaggerated AI glow, no ranking or gamification.",
  },
  photoPile: {
    label: "Travel photos piling up",
    alt: "Placeholder for a generated image showing a growing stack of travel photos from one trip.",
    shortHint: "Mixed travel photos from one trip before import, still sitting in the camera roll.",
    prompt:
      "Create a realistic travel-photo scene for a product landing page. Show a loosely arranged pile of travel photos from one trip: streets, meals, transit, landmarks, quiet in-between moments. The image should feel like a personal camera roll becoming crowded, not like a polished postcard collage. Use natural lighting, honest colors, and a calm editorial tone. Avoid text overlays, no people posing for the camera, and no generic stock-photo perfection.",
  },
  batchImport: {
    label: "Batch import selection",
    alt: "Placeholder for a generated image showing multiple travel photos selected for import into the app.",
    shortHint: "A batch of travel photos being selected and brought into the app at once.",
    prompt:
      "Create a product-relevant app marketing image showing multiple travel photos being selected for import on a phone screen. The UI should clearly communicate batch selection without looking tied to a specific operating system screenshot. Show selected thumbnails, a calm import action, and a sense that one trip is being brought in together. Keep the composition clean, factual, and realistic. Use soft natural light and MomentBook-like colors around the device. No hype text, no social icons, and no decorative confetti.",
  },
  timelineFormation: {
    label: "Timeline taking shape",
    alt: "Placeholder for a generated image showing travel photos being grouped into timeline moments by time and place.",
    shortHint: "The transition from scattered photos to grouped moments with time and place structure.",
    prompt:
      "Create a transition-focused marketing image for a travel photo organizer. Show a phone or tablet interface where scattered trip photos are becoming grouped moments in a timeline. Include visual hints of time order, place clusters, and route flow, but keep the interface calm and readable. The feeling should be that the trip is quietly organizing itself. Use editorial composition, soft forest green and sand accents, and real travel imagery inside the UI. Avoid futuristic AI visuals, dashboards, or productivity tropes.",
  },
  organizedResult: {
    label: "Finished timeline detail",
    alt: "Placeholder for a generated image showing a finished organized timeline with readable trip structure.",
    shortHint: "A clearer second look at the organized result and why it is easier to revisit later.",
    prompt:
      "Create a refined close-up marketing image of a finished travel timeline inside an app. Show grouped moments, date structure, place references, and photo clusters that make the trip easy to review later. The image should emphasize clarity and calm organization rather than technical complexity. Use premium editorial styling, soft off-white surfaces, forest-green accents, and realistic travel photos inside the interface. Keep the app result as the primary subject. No hype text, no neon effects, no competitive or social patterns.",
  },
};

export function getHomeMarketingImagePrompt(
  key: HomeMarketingImagePromptKey,
): HomeMarketingImagePrompt {
  return HOME_MARKETING_IMAGE_PROMPTS[key];
}
