import { type Language } from "@/lib/i18n/config";

export type CampaignQueryKey =
  | "source"
  | "dest"
  | "lang"
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_content"
  | "utm_term"
  | "variant";

export type CampaignParams = {
  source?: string | null;
  dest?: string | null;
  lang?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  variant?: string | null;
};

export type CampaignSearchParams = Partial<Record<CampaignQueryKey, string | string[] | undefined>>;

export type LandingPlatform = "ios" | "android" | "desktop";

function readQueryValue(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (!candidate) {
    return null;
  }

  const trimmed = candidate.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeCampaignParams(
  searchParams: CampaignSearchParams,
  lang: Language,
): CampaignParams {
  return {
    source: readQueryValue(searchParams.source),
    dest: readQueryValue(searchParams.dest),
    lang,
    utmSource: readQueryValue(searchParams.utm_source),
    utmMedium: readQueryValue(searchParams.utm_medium),
    utmCampaign: readQueryValue(searchParams.utm_campaign),
    utmContent: readQueryValue(searchParams.utm_content),
    utmTerm: readQueryValue(searchParams.utm_term),
    variant: readQueryValue(searchParams.variant),
  };
}

export function detectLandingPlatform(
  userAgent: string,
  maxTouchPoints = 0,
): LandingPlatform {
  const normalized = userAgent.toLowerCase();
  const isIpadOs = normalized.includes("macintosh") && maxTouchPoints > 1;

  if (/iphone|ipad|ipod/.test(normalized) || isIpadOs) {
    return "ios";
  }

  if (/android/.test(normalized)) {
    return "android";
  }

  return "desktop";
}

export function buildCampaignEventParams(
  campaign: CampaignParams,
  lang: Language,
  platform: LandingPlatform,
  extra: Record<string, string | number | boolean | null | undefined> = {},
) {
  return {
    route_lang: lang,
    platform_hint: platform,
    source: campaign.source,
    dest: campaign.dest,
    utm_source: campaign.utmSource,
    utm_medium: campaign.utmMedium,
    utm_campaign: campaign.utmCampaign,
    utm_content: campaign.utmContent,
    utm_term: campaign.utmTerm,
    variant: campaign.variant,
    ...extra,
  };
}
