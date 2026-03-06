import { getStoreRegion, type Language } from "@/lib/i18n/config";

export type MobilePlatform = "ios" | "android";

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

type CampaignQueryKey =
  | "source"
  | "dest"
  | "lang"
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_content"
  | "utm_term"
  | "variant";

type CampaignOverrideMap = Partial<Record<string, string>>;

type AppLinkConfig = {
  defaultUrlByPlatform: Record<MobilePlatform, (lang: Language) => string>;
  byDestination?: Partial<Record<MobilePlatform, CampaignOverrideMap>>;
  bySource?: Partial<Record<MobilePlatform, CampaignOverrideMap>>;
  bySourceDestination?: Partial<Record<MobilePlatform, CampaignOverrideMap>>;
};

export const IOS_APP_ID = "6749165889";
export const IOS_STORE_PATH = "app/momentbook-%EC%97%AC%ED%96%89-%EA%B8%B0%EB%A1%9D/id6749165889";
export const ANDROID_APP_ID = "com.reflectalab.momentbook";

const DEEP_LINK_CONFIG: AppLinkConfig = {
  defaultUrlByPlatform: {
    ios: () => "",
    android: () => "",
  },
};

const STORE_LINK_CONFIG: AppLinkConfig = {
  defaultUrlByPlatform: {
    ios: (lang) => {
      const region = getStoreRegion(lang);
      return `https://apps.apple.com/${region.ios}/${IOS_STORE_PATH}`;
    },
    android: (lang) => {
      const region = getStoreRegion(lang);
      return `https://play.google.com/store/apps/details?id=${ANDROID_APP_ID}&hl=${region.hl}&gl=${region.gl}`;
    },
  },
  byDestination: {
    ios: {},
    android: {},
  },
  bySource: {
    ios: {},
    android: {},
  },
  bySourceDestination: {
    ios: {},
    android: {},
  },
};

const CAMPAIGN_QUERY_KEYS: CampaignQueryKey[] = [
  "source",
  "dest",
  "lang",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "variant",
];

function normalizeToken(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const compact = value.trim().toLowerCase();
  return compact.length > 0 ? compact : null;
}

function buildSourceDestinationKey(source: string | null, dest: string | null) {
  if (!source || !dest) {
    return null;
  }

  return `${source}:${dest}`;
}

function resolveConfiguredUrl(
  config: AppLinkConfig,
  platform: MobilePlatform,
  lang: Language,
  campaign: CampaignParams = {},
) {
  const source = normalizeToken(campaign.source);
  const dest = normalizeToken(campaign.dest);
  const sourceDestinationKey = buildSourceDestinationKey(source, dest);

  if (sourceDestinationKey) {
    const matchedSourceDestination =
      config.bySourceDestination?.[platform]?.[sourceDestinationKey];

    if (matchedSourceDestination) {
      return matchedSourceDestination;
    }
  }

  if (dest) {
    const matchedDestination = config.byDestination?.[platform]?.[dest];

    if (matchedDestination) {
      return matchedDestination;
    }
  }

  if (source) {
    const matchedSource = config.bySource?.[platform]?.[source];

    if (matchedSource) {
      return matchedSource;
    }
  }

  return config.defaultUrlByPlatform[platform](lang);
}

function readCampaignQueryEntries(campaign: CampaignParams) {
  const queryEntries: Array<[CampaignQueryKey, string]> = [];

  if (campaign.source) {
    queryEntries.push(["source", campaign.source]);
  }
  if (campaign.dest) {
    queryEntries.push(["dest", campaign.dest]);
  }
  if (campaign.lang) {
    queryEntries.push(["lang", campaign.lang]);
  }
  if (campaign.utmSource) {
    queryEntries.push(["utm_source", campaign.utmSource]);
  }
  if (campaign.utmMedium) {
    queryEntries.push(["utm_medium", campaign.utmMedium]);
  }
  if (campaign.utmCampaign) {
    queryEntries.push(["utm_campaign", campaign.utmCampaign]);
  }
  if (campaign.utmContent) {
    queryEntries.push(["utm_content", campaign.utmContent]);
  }
  if (campaign.utmTerm) {
    queryEntries.push(["utm_term", campaign.utmTerm]);
  }
  if (campaign.variant) {
    queryEntries.push(["variant", campaign.variant]);
  }

  return queryEntries;
}

function appendCampaignQuery(urlValue: string, campaign: CampaignParams = {}) {
  if (!urlValue) {
    return "";
  }

  const url = new URL(urlValue);

  CAMPAIGN_QUERY_KEYS.forEach((key) => {
    url.searchParams.delete(key);
  });

  readCampaignQueryEntries(campaign).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

export function getCanonicalStoreLinks(lang: Language) {
  return {
    ios: resolveConfiguredUrl(STORE_LINK_CONFIG, "ios", lang),
    android: resolveConfiguredUrl(STORE_LINK_CONFIG, "android", lang),
  };
}

export function getStoreLinks(lang: Language, campaign: CampaignParams = {}) {
  return {
    ios: buildStoreLink("ios", lang, campaign),
    android: buildStoreLink("android", lang, campaign),
  };
}

export function buildStoreLink(
  platform: MobilePlatform,
  lang: Language,
  campaign: CampaignParams = {},
) {
  const baseUrl = resolveConfiguredUrl(STORE_LINK_CONFIG, platform, lang, campaign);
  return appendCampaignQuery(baseUrl, campaign);
}

export function buildOpenInAppUrl(
  platform: MobilePlatform,
  lang: Language,
  campaign: CampaignParams = {},
) {
  const configuredUrl = resolveConfiguredUrl(DEEP_LINK_CONFIG, platform, lang, campaign);

  if (!configuredUrl) {
    return null;
  }

  return appendCampaignQuery(configuredUrl, { ...campaign, lang });
}

export function canOpenInApp(platform: MobilePlatform, lang: Language, campaign: CampaignParams = {}) {
  return Boolean(buildOpenInAppUrl(platform, lang, campaign));
}

export function buildAppleSmartBannerContent(lang: Language) {
  const appArgument = buildOpenInAppUrl("ios", lang, { lang });
  return appArgument
    ? `app-id=${IOS_APP_ID}, app-argument=${appArgument}`
    : `app-id=${IOS_APP_ID}`;
}
