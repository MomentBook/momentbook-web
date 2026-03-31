import { languageList, type Language } from "@/lib/i18n/config";

export const PUBLIC_WEB_EVENTS = {
  downloadCtaClick: "download_cta_click",
  navigationLinkClick: "navigation_link_click",
  featuredJourneyClick: "featured_journey_click",
  socialChannelClick: "social_channel_click",
  webVitals: "web_vitals",
} as const;

export type MarketingSurface =
  | "header"
  | "home_hero"
  | "home_featured"
  | "footer"
  | "footer_social";

export type PublicPageSurface =
  | "root_redirect"
  | "home"
  | "install"
  | "install_redirect"
  | "faq"
  | "journeys"
  | "journey_detail"
  | "journey_moment"
  | "users"
  | "user_detail"
  | "photo_detail"
  | "legal"
  | "other";

const supportedLanguages = new Set(languageList);
const legalSegments = new Set([
  "privacy",
  "terms",
  "community-guidelines",
  "marketing-consent",
  "support",
]);

function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }

  const [pathWithoutHash] = pathname.split("#");
  const [cleanPath] = pathWithoutHash.split("?");
  return cleanPath || "/";
}

export function readRouteLanguageFromPathname(pathname: string): Language | null {
  const normalizedPathname = normalizePathname(pathname);
  const [firstSegment] = normalizedPathname.split("/").filter(Boolean);

  if (!firstSegment || !supportedLanguages.has(firstSegment as Language)) {
    return null;
  }

  return firstSegment as Language;
}

export function getPublicPageSurface(pathname: string): PublicPageSurface {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/") {
    return "root_redirect";
  }

  const segments = normalizedPathname.split("/").filter(Boolean);
  const [firstSegment, ...localizedSegments] = segments;

  if (!firstSegment || !supportedLanguages.has(firstSegment as Language)) {
    return "other";
  }

  if (localizedSegments.length === 0) {
    return "home";
  }

  const [section, resourceId, thirdSegment] = localizedSegments;

  if (section === "install") {
    return resourceId === "redirect" ? "install_redirect" : "install";
  }

  if (section === "faq") {
    return "faq";
  }

  if (section === "journeys") {
    if (!resourceId) {
      return "journeys";
    }

    return thirdSegment === "moments" ? "journey_moment" : "journey_detail";
  }

  if (section === "users") {
    return resourceId ? "user_detail" : "users";
  }

  if (section === "photos") {
    return "photo_detail";
  }

  if (legalSegments.has(section)) {
    return "legal";
  }

  return "other";
}

export function getPublicPageContext(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  return {
    pathname: normalizedPathname,
    pageSurface: getPublicPageSurface(normalizedPathname),
    routeLanguage: readRouteLanguageFromPathname(normalizedPathname),
  };
}
