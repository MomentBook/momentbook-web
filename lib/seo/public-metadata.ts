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

type BuildStructuredDataTopicTermsOptions = {
  lang: Language;
  title?: string | null;
  locationNames?: string[];
  hashtags?: string[];
  extra?: string[];
};

type StructuredDataTopicTerms = {
  keywords: string[];
  about: string[];
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

const SPACE_DELIMITED_TOPIC_TOKEN_PATTERN = /[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu;

const SPACE_DELIMITED_STOPWORDS_BY_LANGUAGE: Record<Language, string[]> = {
  en: ["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "with"],
  ko: [],
  ja: [],
  zh: [],
  es: ["al", "con", "de", "del", "el", "en", "la", "las", "lo", "los", "o", "para", "por", "un", "una", "y"],
  pt: ["a", "ao", "com", "da", "das", "de", "do", "dos", "e", "em", "na", "nas", "no", "nos", "o", "os", "ou", "para", "por", "um", "uma"],
  fr: ["au", "aux", "avec", "de", "des", "du", "en", "et", "la", "le", "les", "ou", "par", "pour", "sur", "un", "une"],
  th: [],
  vi: ["cho", "cua", "của", "la", "là", "mot", "một", "nhung", "những", "o", "ở", "tai", "tại", "tren", "trên", "trong", "tu", "từ", "va", "và", "voi", "với"],
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

function normalizeComparableText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase();
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

function normalizeComparableTopicToken(value: string, lang: Language): string {
  return value.normalize("NFKC").toLocaleLowerCase(toLocaleTag(lang));
}

function splitWhitespaceTopicPhrase(phrase: string, lang: Language): string[] {
  const locale = toLocaleTag(lang);
  const stopwords = new Set(
    (SPACE_DELIMITED_STOPWORDS_BY_LANGUAGE[lang] ?? []).map((word) =>
      word.toLocaleLowerCase(locale),
    ),
  );
  const matches = phrase.match(SPACE_DELIMITED_TOPIC_TOKEN_PATTERN) ?? [];
  const candidates: string[] = [];

  for (const match of matches) {
    const token = normalizeTopicTerm(match);
    if (!token) {
      continue;
    }

    if (/^\d+$/u.test(token)) {
      continue;
    }

    if (/^[\p{Script=Latin}\d'’-]+$/u.test(token) && token.length < 3) {
      continue;
    }

    if (stopwords.has(normalizeComparableTopicToken(token, lang))) {
      continue;
    }

    candidates.push(token);
  }

  return dedupeKeywords(candidates).slice(0, 6);
}

// ---------------------------------------------------------------------------
// Korean particle stripping
// ---------------------------------------------------------------------------

const KOREAN_PARTICLES = [
  "으로서", "으로써", "에서는", "에서의",
  "으로", "에서", "부터", "까지", "처럼", "만큼",
  "에게", "한테", "보다",
  "이는", "에는", "과는", "와는",
  "을", "를", "이", "가", "은", "는", "의", "에", "와", "과", "로", "도", "만",
];

function stripKoreanParticle(word: string): string | null {
  for (const particle of KOREAN_PARTICLES) {
    if (word.length > particle.length && word.endsWith(particle)) {
      const stem = word.slice(0, -particle.length);
      if (/[\p{Script=Hangul}]/u.test(stem) && stem.length >= 2) {
        return stem;
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Topic phrase segmentation
// ---------------------------------------------------------------------------

function segmentSingleToken(
  token: string,
  lang: Language,
  locale: string,
  scriptPattern: RegExp,
): string[] {
  const normalized = token.trim();
  if (normalized.length < 2 || !scriptPattern.test(normalized)) {
    return [];
  }

  const candidates: string[] = [];

  // For Korean: strip particles to extract noun stems
  if (lang === "ko") {
    const stem = stripKoreanParticle(normalized);
    if (stem) {
      candidates.push(stem);
    }
  }

  // For CJK compound words: split using Intl.Segmenter
  if (typeof Intl.Segmenter === "function" && !/\s/.test(normalized)) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });

    for (const segment of segmenter.segment(normalized)) {
      if (!segment.isWordLike) {
        continue;
      }

      const segToken = normalizeTopicTerm(segment.segment);
      if (!segToken || segToken === normalized || segToken.length < 2) {
        continue;
      }

      candidates.push(segToken);
    }
  }

  return candidates;
}

function splitTopicPhrase(phrase: string, lang: Language): string[] {
  const normalizedPhrase = phrase.trim();

  if (normalizedPhrase.length < 2) {
    return [];
  }

  if (!SEGMENTABLE_LANGUAGES.has(lang)) {
    return splitWhitespaceTopicPhrase(normalizedPhrase, lang);
  }

  const locale = toLocaleTag(lang);
  const scriptPattern = SEGMENTABLE_SCRIPT_PATTERNS[lang];

  if (!scriptPattern.test(normalizedPhrase)) {
    return [];
  }

  const candidates: string[] = [];

  // Split on whitespace and process each word individually
  const words = normalizedPhrase.split(/\s+/).filter((w) => w.length > 0);
  for (const word of words) {
    candidates.push(...segmentSingleToken(word, lang, locale, scriptPattern));
  }

  // Also segment the whole phrase if it has no spaces (compound word)
  if (!/\s/.test(normalizedPhrase)) {
    candidates.push(
      ...segmentSingleToken(normalizedPhrase, lang, locale, scriptPattern),
    );
  }

  return dedupeKeywords(candidates).slice(0, 6);
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
    ...(cleanTitle ? [cleanTitle] : []),
    ...(cleanAuthor ? [cleanAuthor] : []),
    ...cleanLocations,
    ...cleanHashtags,
    ...segmentedTerms,
  ]);

  return keywords.slice(0, 24);
}

export function buildStructuredDataTopicTerms({
  lang,
  title,
  locationNames,
  hashtags,
  extra,
}: BuildStructuredDataTopicTermsOptions): StructuredDataTopicTerms {
  const cleanTitle = readText(title);
  const cleanLocations = (locationNames ?? [])
    .map((value) => readText(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 5);
  const cleanHashtags = (hashtags ?? [])
    .map((value) => normalizeTopicTerm(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 8);
  const cleanExtra = (extra ?? [])
    .map((value) => readText(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 3);

  const about = dedupeKeywords([
    ...(cleanTitle ? splitTopicPhrase(cleanTitle, lang) : []),
    ...cleanExtra.flatMap((value) => splitTopicPhrase(value, lang)),
  ]).slice(0, 10);

  const keywords = dedupeKeywords([
    ...(cleanTitle ? [cleanTitle] : []),
    ...cleanLocations,
    ...cleanHashtags,
    ...cleanExtra,
    ...about,
  ]).slice(0, 18);

  return {
    keywords,
    about,
  };
}

export function buildStructuredDataDefinedTerms(
  values: string[],
): Array<{ "@type": "DefinedTerm"; name: string }> {
  return dedupeKeywords(values)
    .slice(0, 8)
    .map((name) => ({
      "@type": "DefinedTerm" as const,
      name,
    }));
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

export function buildSeoTitle(
  parts: Array<string | null | undefined>,
  maxLength = 70,
): string {
  const titleParts = parts
    .map((part) => readText(part))
    .filter((part): part is string => Boolean(part));

  if (titleParts.length === 0) {
    return SITE_NAME;
  }

  const deduped: string[] = [];

  for (const part of titleParts) {
    const comparablePart = normalizeComparableText(part);
    const isRedundant = deduped.some((existing) => {
      const comparableExisting = normalizeComparableText(existing);
      return (
        comparableExisting === comparablePart ||
        comparableExisting.includes(comparablePart) ||
        comparablePart.includes(comparableExisting)
      );
    });

    if (!isRedundant) {
      deduped.push(part);
    }
  }

  let title = deduped[0];
  for (let index = 1; index < deduped.length; index += 1) {
    const nextTitle = `${title} · ${deduped[index]}`;
    if (nextTitle.length > maxLength) {
      break;
    }

    title = nextTitle;
  }

  return title;
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

type SocialImageCandidate = {
  url?: string | null;
  width?: number;
  height?: number;
  alt?: string | null;
};

type SocialImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export function buildSocialImageSequence(
  images: Array<SocialImageCandidate | null | undefined | false>,
  options?: {
    limit?: number;
  },
): SocialImage[] | undefined {
  const normalized: SocialImage[] = [];
  const seen = new Set<string>();
  const limit = options?.limit;

  for (const image of images) {
    if (!image) {
      continue;
    }

    const url = readText(image?.url);
    const alt = readText(image.alt);

    if (!url || seen.has(url)) {
      continue;
    }

    seen.add(url);

    normalized.push({
      url,
      ...(typeof image.width === "number" ? { width: image.width } : {}),
      ...(typeof image.height === "number" ? { height: image.height } : {}),
      ...(alt ? { alt } : {}),
    });

    if (limit && normalized.length >= limit) {
      break;
    }
  }

  return normalized.length > 0 ? normalized : undefined;
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
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
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
