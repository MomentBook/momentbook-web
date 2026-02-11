import type { Metadata } from "next";

export type PublicMetadataKind = "journey" | "moment" | "photo" | "user";

type BuildPublicKeywordsOptions = {
  kind: PublicMetadataKind;
  title?: string | null;
  description?: string | null;
  locationNames?: string[];
  authorName?: string | null;
  extra?: string[];
};

const COMMON_PUBLIC_KEYWORDS = [
  "MomentBook",
  "travel memories",
  "travel timeline",
  "public content",
  "location based journey",
];

const KEYWORDS_BY_KIND: Record<PublicMetadataKind, string[]> = {
  journey: [
    "published journey",
    "trip timeline",
    "travel route",
    "journey photos",
  ],
  moment: [
    "travel moment",
    "location moment",
    "timeline moment",
    "moment photos",
  ],
  photo: [
    "published photo",
    "travel photo",
    "photo memory",
    "photo location",
  ],
  user: [
    "public profile",
    "shared journeys",
    "travel profile",
    "published journeys",
  ],
};

function readText(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeKeyword(value: string): string | null {
  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) {
    return null;
  }

  if (compact.length > 80) {
    return compact.slice(0, 80).trim();
  }

  return compact;
}

function dedupeKeywords(values: string[]): string[] {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const value of values) {
    const normalized = normalizeKeyword(value);
    if (!normalized) {
      continue;
    }

    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(normalized);
  }

  return deduped;
}

export function buildPublicKeywords({
  kind,
  title,
  description,
  locationNames,
  authorName,
  extra,
}: BuildPublicKeywordsOptions): string[] {
  const cleanTitle = readText(title);
  const cleanDescription = readText(description);
  const cleanAuthor = readText(authorName);
  const cleanLocations = (locationNames ?? [])
    .map((value) => readText(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 8);

  const keywords = dedupeKeywords([
    ...COMMON_PUBLIC_KEYWORDS,
    ...KEYWORDS_BY_KIND[kind],
    ...(extra ?? []),
    ...(cleanTitle ? [cleanTitle, `${cleanTitle} momentbook`] : []),
    ...(cleanDescription ? [cleanDescription] : []),
    ...(cleanAuthor ? [cleanAuthor, `${cleanAuthor} journey`] : []),
    ...cleanLocations,
    ...cleanLocations.map((location) => `${location} travel`),
  ]);

  return keywords.slice(0, 24);
}

export function buildOpenGraphArticleTags(
  options: BuildPublicKeywordsOptions,
): string[] {
  const keywords = buildPublicKeywords(options);
  return keywords.filter((keyword) => keyword.length <= 50).slice(0, 10);
}

export function buildPublicRobots(): Metadata["robots"] {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}
