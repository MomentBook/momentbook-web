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
