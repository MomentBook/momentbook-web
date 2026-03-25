import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function resolveStructuredDataSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
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
