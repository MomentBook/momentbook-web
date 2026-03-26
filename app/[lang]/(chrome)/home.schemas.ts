import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { MARKETING_CHANNEL_URLS } from "@/lib/marketing/social-channels";

type StoreLinks = {
  ios: string;
  android: string;
};

type BuildHomeStructuredDataParams = {
  metaDescription: string;
  pageUrl: string;
  siteUrl: string;
  supportEmail: string;
  softwareRequirements: string;
  storeLinks: StoreLinks;
  contactType: string;
};

export function buildHomeStructuredData({
  metaDescription,
  pageUrl,
  siteUrl,
  supportEmail,
  softwareRequirements,
  storeLinks,
  contactType,
}: BuildHomeStructuredDataParams) {
  return {
    organizationSchema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MomentBook",
      url: siteUrl,
      logo: buildAbsoluteAppTransparentLogoUrl(siteUrl),
      sameAs: [...MARKETING_CHANNEL_URLS, storeLinks.ios, storeLinks.android],
      contactPoint: {
        "@type": "ContactPoint",
        contactType,
        email: supportEmail,
      },
    },
    websiteSchema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "MomentBook",
      url: pageUrl,
      description: metaDescription,
    },
    softwareApplicationSchema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "MomentBook",
      description: metaDescription,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android",
      softwareRequirements,
      url: pageUrl,
      offers: [
        {
          "@type": "Offer",
          url: storeLinks.ios,
          price: "0",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          url: storeLinks.android,
          price: "0",
          priceCurrency: "USD",
        },
      ],
    },
  };
}
