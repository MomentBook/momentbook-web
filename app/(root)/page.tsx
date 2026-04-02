import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildAppleSmartBannerContent } from "@/lib/mobile-app";
import {
  defaultLanguage,
  languageList,
  languages,
  toLocaleTag,
} from "@/lib/i18n/config";
import { buildRootAlternates } from "@/lib/i18n/metadata";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import {
  buildAbsoluteTitle,
  buildLocalizedAppScreenshotImage,
  buildPublicRobots,
} from "@/lib/seo/public-metadata";
import { RootRedirectClient } from "./RootRedirectClient";
import styles from "./page.module.scss";

const ROOT_TITLE = "MomentBook";
const ROOT_DESCRIPTION =
  "MomentBook is the public web for exploring published journeys, moments, photos, and traveler profiles from the app in your preferred language.";
const ROOT_SOCIAL_IMAGE = buildLocalizedAppScreenshotImage(
  defaultLanguage,
  ROOT_TITLE,
);
const ROOT_LANGUAGE_ITEMS = languageList.map((code) => ({
  code,
  href: `/${code}`,
  nativeName: languages[code].nativeName,
  name: languages[code].name,
}));

export const metadata: Metadata = {
  title: buildAbsoluteTitle(ROOT_TITLE),
  description: ROOT_DESCRIPTION,
  applicationName: ROOT_TITLE,
  creator: ROOT_TITLE,
  publisher: ROOT_TITLE,
  robots: buildPublicRobots(),
  alternates: buildRootAlternates(),
  openGraph: {
    type: "website",
    url: "/",
    siteName: ROOT_TITLE,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    images: [ROOT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    images: [ROOT_SOCIAL_IMAGE.url],
  },
  other: {
    "apple-itunes-app": buildAppleSmartBannerContent(defaultLanguage),
  },
};

export default function RootPage() {
  const siteUrl = resolveStructuredDataSiteUrl();
  const organizationId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@id": organizationId,
    ...buildPublisherOrganizationJsonLd(siteUrl),
    description: ROOT_DESCRIPTION,
    availableLanguage: languageList.map((lang) => toLocaleTag(lang)),
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: buildStructuredDataUrl("/", siteUrl),
    name: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    inLanguage: languageList.map((lang) => toLocaleTag(lang)),
    publisher: {
      "@id": organizationId,
    },
  };

  return (
    <main className={styles.page}>
      <Suspense fallback={null}>
        <RootRedirectClient />
      </Suspense>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />

      <section className={styles.panel} aria-labelledby="root-language-gateway-title">
        <p className={styles.eyebrow}>MomentBook</p>
        <h1 id="root-language-gateway-title" className={styles.title}>
          Redirecting to your language
        </h1>
        <p className={styles.description}>
          MomentBook is the public web for exploring published journeys,
          moments, photos, and traveler profiles from the app. You are being
          redirected to the best language match now.
        </p>
        <p className={styles.hint}>
          If the redirect does not start, continue in your language.
        </p>

        <nav className={styles.languageGrid} aria-label="Language options">
          {ROOT_LANGUAGE_ITEMS.map((item) => (
            <Link key={item.code} href={item.href} className={styles.languageLink}>
              <span className={styles.languageName}>{item.nativeName}</span>
              <span className={styles.languageMeta}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
