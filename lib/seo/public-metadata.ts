import type { Metadata } from "next";
import { languageList, toOpenGraphLocale, type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

export type PublicMetadataKind = "journey" | "moment" | "photo" | "user";

const SITE_NAME = "MomentBook";
const SEO_DESCRIPTION_MAX_LENGTH = 180;

type BuildPublicKeywordsOptions = {
  kind: PublicMetadataKind;
  title?: string | null;
  locationNames?: string[];
  authorName?: string | null;
  extra?: string[];
};

const COMMON_PUBLIC_KEYWORDS = [
  "MomentBook",
  "travel memories",
  "travel timeline",
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

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeKeyword(value: string): string | null {
  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) {
    return null;
  }

  if (compact.length > 80) {
    const boundary = compact.lastIndexOf(" ", 80);
    return (boundary > 0 ? compact.slice(0, boundary) : compact.slice(0, 80)).trim();
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
  locationNames,
  authorName,
  extra,
}: BuildPublicKeywordsOptions): string[] {
  const cleanTitle = readText(title);
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
    ...(cleanAuthor ? [cleanAuthor, `${cleanAuthor} journey`] : []),
    ...cleanLocations,
    ...cleanLocations.map((location) => `${location} travel`),
  ]);

  return keywords.slice(0, 24);
}

export function buildOpenGraphArticleTags(keywords: string[]): string[] {
  return keywords.filter((keyword) => keyword.length <= 50).slice(0, 10);
}

export function buildAbsoluteTitle(title: string): Metadata["title"] {
  return {
    absolute: title,
  };
}

export function buildSeoDescription(
  parts: Array<string | null | undefined>,
  maxLength = SEO_DESCRIPTION_MAX_LENGTH,
): string {
  const joined = collapseWhitespace(
    parts
      .map((part) => readText(part))
      .filter((part): part is string => Boolean(part))
      .join(" "),
  );

  if (joined.length <= maxLength) {
    return joined;
  }

  const truncated = joined.slice(0, maxLength);
  const boundary = truncated.lastIndexOf(" ");
  const safeBoundary = boundary > 0 ? boundary : maxLength;

  return `${truncated.slice(0, safeBoundary).trim()}...`;
}

export function buildOpenGraphBase(lang: Language, path: string) {
  return {
    url: buildOpenGraphUrl(lang, path),
    siteName: SITE_NAME,
    locale: toOpenGraphLocale(lang),
    alternateLocale: languageList
      .filter((code) => code !== lang)
      .map((code) => toOpenGraphLocale(code)),
  };
}

type BuildStandardPageMetadataOptions = {
  lang: Language;
  path: string;
  title: string;
  description: string;
  robots: Metadata["robots"];
  absoluteTitle?: boolean;
  openGraphType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  other?: Metadata["other"];
};

export function buildStandardPageMetadata({
  lang,
  path,
  title,
  description,
  robots,
  absoluteTitle = false,
  openGraphType = "website",
  twitterCard = "summary",
  other,
}: BuildStandardPageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? buildAbsoluteTitle(title) : title,
    description,
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots,
    alternates: buildAlternates(lang, path),
    openGraph: {
      ...buildOpenGraphBase(lang, path),
      type: openGraphType,
      title,
      description,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
    },
    ...(other ? { other } : {}),
  };
}

export function compactSocialImages<T>(
  images: Array<T | null | undefined | false>,
): T[] | undefined {
  const filtered = images.filter(Boolean) as T[];
  return filtered.length > 0 ? filtered : undefined;
}

export function resolveTwitterCard(
  images: Array<unknown> | undefined,
  fallback: "summary" | "summary_large_image" = "summary",
) {
  if (!images || images.length === 0) {
    return fallback;
  }

  return "summary_large_image";
}

export function buildPublicRobots(): Metadata["robots"] {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  };
}

export function buildNoIndexFollowRobots(): Metadata["robots"] {
  return {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  };
}

export function buildNoIndexRobots(): Metadata["robots"] {
  return {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  };
}
