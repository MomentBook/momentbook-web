import type { Metadata } from "next";
import { getLocalizedScreenshotPath, type AppScreenshotKey } from "@/lib/app-screenshots";
import { languageList, toLocaleTag, toOpenGraphLocale, type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

export type PublicMetadataKind = "journey" | "moment" | "photo" | "user";

const SITE_NAME = "MomentBook";
const SEO_DESCRIPTION_MAX_LENGTH = 180;
const DEFAULT_APP_SCREENSHOT_WIDTH = 1125;
const DEFAULT_APP_SCREENSHOT_HEIGHT = 2436;

type BuildPublicKeywordsOptions = {
  lang: Language;
  kind: PublicMetadataKind;
  title?: string | null;
  locationNames?: string[];
  authorName?: string | null;
  hashtags?: string[];
  extra?: string[];
};

const COMMON_PUBLIC_KEYWORDS: Record<Language, string[]> = {
  en: ["MomentBook", "travel memories", "journey timeline"],
  ko: ["MomentBook", "여행 기록", "여정 타임라인"],
  ja: ["MomentBook", "旅の記録", "旅のタイムライン"],
  zh: ["MomentBook", "旅行记录", "旅程时间线"],
  es: ["MomentBook", "recuerdos de viaje", "cronología de viaje"],
  pt: ["MomentBook", "memórias de viagem", "linha do tempo da viagem"],
  fr: ["MomentBook", "souvenirs de voyage", "chronologie du voyage"],
  th: ["MomentBook", "บันทึกการเดินทาง", "ไทม์ไลน์การเดินทาง"],
  vi: ["MomentBook", "ghi nhớ hành trình", "dòng thời gian hành trình"],
};

const KEYWORDS_BY_KIND: Record<Language, Record<PublicMetadataKind, string[]>> = {
  en: {
    journey: ["published journey", "travel route", "journey photos"],
    moment: ["travel moment", "location moment", "moment photos"],
    photo: ["travel photo", "published photo", "photo memory"],
    user: ["public profile", "shared journeys", "travel profile"],
  },
  ko: {
    journey: ["공개 여정", "여행 경로", "여정 사진"],
    moment: ["여행 순간", "장소 순간", "순간 사진"],
    photo: ["여행 사진", "공개 사진", "사진 기록"],
    user: ["공개 프로필", "공유된 여정", "여행 프로필"],
  },
  ja: {
    journey: ["公開された旅", "旅行ルート", "旅の写真"],
    moment: ["旅の瞬間", "場所の記録", "瞬間の写真"],
    photo: ["旅行写真", "公開写真", "写真の記録"],
    user: ["公開プロフィール", "共有された旅", "旅行プロフィール"],
  },
  zh: {
    journey: ["公开旅程", "旅行路线", "旅程照片"],
    moment: ["旅行瞬间", "地点片段", "瞬间照片"],
    photo: ["旅行照片", "公开照片", "照片记录"],
    user: ["公开资料", "共享旅程", "旅行档案"],
  },
  es: {
    journey: ["viaje publicado", "ruta de viaje", "fotos del viaje"],
    moment: ["momento de viaje", "momento del lugar", "fotos del momento"],
    photo: ["foto de viaje", "foto publicada", "recuerdo fotográfico"],
    user: ["perfil público", "viajes compartidos", "perfil de viaje"],
  },
  pt: {
    journey: ["viagem publicada", "rota da viagem", "fotos da viagem"],
    moment: ["momento da viagem", "momento do lugar", "fotos do momento"],
    photo: ["foto de viagem", "foto publicada", "memória em foto"],
    user: ["perfil público", "viagens compartilhadas", "perfil de viagem"],
  },
  fr: {
    journey: ["voyage publié", "itinéraire de voyage", "photos du voyage"],
    moment: ["moment du voyage", "moment du lieu", "photos du moment"],
    photo: ["photo de voyage", "photo publiée", "souvenir en photo"],
    user: ["profil public", "voyages partagés", "profil de voyage"],
  },
  th: {
    journey: ["ทริปสาธารณะ", "เส้นทางการเดินทาง", "รูปภาพของทริป"],
    moment: ["ช่วงเวลาของการเดินทาง", "ช่วงเวลาของสถานที่", "รูปภาพของช่วงเวลา"],
    photo: ["รูปท่องเที่ยว", "รูปภาพสาธารณะ", "ความทรงจำจากภาพถ่าย"],
    user: ["โปรไฟล์สาธารณะ", "ทริปที่แชร์", "โปรไฟล์การเดินทาง"],
  },
  vi: {
    journey: ["hành trình công khai", "lộ trình chuyến đi", "ảnh của hành trình"],
    moment: ["khoảnh khắc hành trình", "khoảnh khắc địa điểm", "ảnh khoảnh khắc"],
    photo: ["ảnh du lịch", "ảnh đã đăng", "ký ức bằng ảnh"],
    user: ["hồ sơ công khai", "hành trình được chia sẻ", "hồ sơ du lịch"],
  },
};

const SEGMENTABLE_LANGUAGES = new Set<Language>(["ko", "ja", "zh", "th"]);
const SEGMENTABLE_SCRIPT_PATTERNS: Record<Language, RegExp> = {
  en: /$^/,
  ko: /[\p{Script=Hangul}]/u,
  ja: /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u,
  zh: /[\p{Script=Han}]/u,
  es: /$^/,
  pt: /$^/,
  fr: /$^/,
  th: /[\p{Script=Thai}]/u,
  vi: /$^/,
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

function normalizeTopicTerm(value: string): string | null {
  const normalized = normalizeKeyword(value);

  if (!normalized) {
    return null;
  }

  const stripped = normalized
    .replace(/^#+/, "")
    .replace(/[()[\]{}<>]/g, "")
    .trim();

  return stripped.length > 0 ? stripped : null;
}

function splitTopicPhrase(phrase: string, lang: Language): string[] {
  if (!SEGMENTABLE_LANGUAGES.has(lang) || /\s/.test(phrase)) {
    return [];
  }

  const locale = toLocaleTag(lang);
  const normalizedPhrase = phrase.trim();
  const scriptPattern = SEGMENTABLE_SCRIPT_PATTERNS[lang];

  if (normalizedPhrase.length < 2) {
    return [];
  }

  if (!scriptPattern.test(normalizedPhrase)) {
    return [];
  }

  if (typeof Intl.Segmenter !== "function") {
    return [];
  }

  const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
  const candidates: string[] = [];

  for (const segment of segmenter.segment(normalizedPhrase)) {
    if (!segment.isWordLike) {
      continue;
    }

    const token = normalizeTopicTerm(segment.segment);
    if (!token || token === normalizedPhrase) {
      continue;
    }

    candidates.push(token);
  }

  return dedupeKeywords(candidates).slice(0, 4);
}

export function buildPublicKeywords({
  lang,
  kind,
  title,
  locationNames,
  authorName,
  hashtags,
  extra,
}: BuildPublicKeywordsOptions): string[] {
  const cleanTitle = readText(title);
  const cleanAuthor = readText(authorName);
  const cleanLocations = (locationNames ?? [])
    .map((value) => readText(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 8);
  const cleanHashtags = (hashtags ?? [])
    .map((value) => normalizeTopicTerm(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 8);
  const segmentedTerms = [
    ...(cleanTitle ? splitTopicPhrase(cleanTitle, lang) : []),
    ...cleanLocations.flatMap((location) => splitTopicPhrase(location, lang)),
    ...cleanHashtags.flatMap((hashtag) => splitTopicPhrase(hashtag, lang)),
  ];

  const keywords = dedupeKeywords([
    ...(COMMON_PUBLIC_KEYWORDS[lang] ?? COMMON_PUBLIC_KEYWORDS.en),
    ...(KEYWORDS_BY_KIND[lang]?.[kind] ?? KEYWORDS_BY_KIND.en[kind]),
    ...(extra ?? []),
    ...(cleanTitle ? [cleanTitle, `${cleanTitle} MomentBook`] : []),
    ...(cleanAuthor ? [cleanAuthor] : []),
    ...cleanLocations,
    ...cleanHashtags,
    ...segmentedTerms,
  ]);

  return keywords.slice(0, 24);
}

export function buildOpenGraphArticleTags(keywords: string[]): string[] {
  return keywords.filter((keyword) => keyword.length <= 50).slice(0, 10);
}

export function buildStructuredDataKeywordValue(keywords: string[]): string | undefined {
  const normalized = dedupeKeywords(keywords).slice(0, 18);
  return normalized.length > 0 ? normalized.join(", ") : undefined;
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
  socialImages?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
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
  socialImages,
  other,
}: BuildStandardPageMetadataOptions): Metadata {
  const normalizedImages = compactSocialImages(socialImages ?? []);

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
      images: normalizedImages,
    },
    twitter: {
      card: resolveTwitterCard(normalizedImages, twitterCard),
      title,
      description,
      images: normalizedImages?.map((image) => image.url),
    },
    ...(other ? { other } : {}),
  };
}

export function buildLocalizedAppScreenshotImage(
  lang: Language,
  alt: string,
  key: AppScreenshotKey = "intro",
) {
  return {
    url: getLocalizedScreenshotPath(lang, key),
    width: DEFAULT_APP_SCREENSHOT_WIDTH,
    height: DEFAULT_APP_SCREENSHOT_HEIGHT,
    alt,
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
