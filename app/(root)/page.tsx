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
  buildPublicRobots,
} from "@/lib/seo/public-metadata";
import {
  buildSocialImageMetadata,
} from "@/lib/seo/social-image";
import { RootRedirectClient } from "./RootRedirectClient";
import styles from "./page.module.scss";

const ROOT_TITLE = "MomentBook";
const ROOT_DESCRIPTION =
  "MomentBook is the public web for exploring published journeys, moments, photos, and traveler profiles from the app in your preferred language.";
const ROOT_SOCIAL_IMAGES = buildSocialImageMetadata(
  { kind: "home", lang: defaultLanguage },
  ROOT_TITLE,
);
const ROOT_LANGUAGE_ITEMS = languageList.map((code) => ({
  code,
  href: `/${code}`,
  nativeName: languages[code].nativeName,
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
    images: ROOT_SOCIAL_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    images: ROOT_SOCIAL_IMAGES.map((image) => image.url),
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

      <section className={styles.card} aria-labelledby="root-language-gateway-title">
        <p className={styles.brand}>MomentBook</p>

        <div className={styles.copy} role="status" aria-live="polite">
          <h1 id="root-language-gateway-title" className={styles.title}>
            Redirecting to your language
          </h1>
          <p className={styles.description}>
            Finding the best version for you now, or choose one manually below.
          </p>
        </div>

        <div className={styles.progress} aria-hidden="true" />

        <details className={styles.languageChooser}>
          <summary className={styles.languageSummary}>
            Choose language manually
          </summary>
          <nav className={styles.languageGrid} aria-label="Language options">
            {ROOT_LANGUAGE_ITEMS.map((item) => (
              <Link
                key={item.code}
                href={item.href}
                className={styles.languageLink}
                lang={toLocaleTag(item.code)}
              >
                {item.nativeName}
              </Link>
            ))}
          </nav>
        </details>
      </section>
    </main>
  );
}
