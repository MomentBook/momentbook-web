import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { resolveSiteUrl } from "@/lib/site-url";

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function resolveStructuredDataSiteUrl() {
  return resolveSiteUrl();
}

export function buildStructuredDataUrl(path: string, siteUrl = resolveStructuredDataSiteUrl()) {
  return new URL(path, siteUrl).toString();
}

export function buildPublisherOrganizationJsonLd(
  siteUrl = resolveStructuredDataSiteUrl(),
) {
  return {
    "@type": "Organization",
    name: "MomentBook",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: buildAbsoluteAppTransparentLogoUrl(siteUrl),
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Builds a BreadcrumbList JSON-LD schema from an ordered list of items.
 *
 * Each item becomes a ListItem whose `position` is 1-indexed.
 * Paths are resolved to absolute URLs using the site URL.
 *
 * @example
 * buildBreadcrumbListJsonLd([
 *   { name: "Home", path: "/en" },
 *   { name: "Journeys", path: "/en/journeys" },
 *   { name: "Trip to Seoul", path: "/en/journeys/abc" },
 * ]);
 */
export function buildBreadcrumbListJsonLd(
  items: BreadcrumbItem[],
  siteUrl = resolveStructuredDataSiteUrl(),
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildStructuredDataUrl(item.path, siteUrl),
    })),
  };
}
