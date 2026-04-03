import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
  LANGUAGE_STORAGE_KEY,
  LEGACY_LANGUAGE_STORAGE_KEY,
  PREFERRED_LANGUAGE_COOKIE_NAME,
} from "@/lib/state/preferences";
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
const ROOT_REDIRECT_LANGUAGE_CONFIG = languageList.map((code) => ({
  code,
  locale: languages[code].locale,
}));

function buildRootRedirectBootstrapScript() {
  return `
    (function() {
      if (window.location.pathname !== "/") {
        return;
      }

      const defaultLanguage = ${JSON.stringify(defaultLanguage)};
      const supportedLanguages = new Set(${JSON.stringify(languageList)});
      const localeToLanguage = new Map(${JSON.stringify(
        ROOT_REDIRECT_LANGUAGE_CONFIG.map(({ code, locale }) => [
          locale.toLowerCase(),
          code,
        ]),
      )});
      const languageStorageKey = ${JSON.stringify(LANGUAGE_STORAGE_KEY)};
      const legacyLanguageStorageKey = ${JSON.stringify(LEGACY_LANGUAGE_STORAGE_KEY)};
      const preferredLanguageCookieName = ${JSON.stringify(PREFERRED_LANGUAGE_COOKIE_NAME)};

      function canonicalizeLanguageTag(value) {
        if (typeof value !== "string") {
          return "";
        }

        const normalized = value.trim().replace(/_/g, "-");
        if (!normalized) {
          return "";
        }

        try {
          const canonical = Intl.getCanonicalLocales(normalized)[0];
          return canonical ? canonical.toLowerCase() : "";
        } catch (error) {
          return "";
        }
      }

      function resolveSupportedLanguage(value) {
        const canonical = canonicalizeLanguageTag(value);
        if (!canonical || canonical === "*") {
          return "";
        }

        let candidate = canonical;

        while (candidate) {
          const localeMatch = localeToLanguage.get(candidate);
          if (localeMatch) {
            return localeMatch;
          }

          if (supportedLanguages.has(candidate)) {
            return candidate;
          }

          const separatorIndex = candidate.lastIndexOf("-");
          if (separatorIndex < 0) {
            return "";
          }

          candidate = candidate.slice(0, separatorIndex);
        }

        return "";
      }

      function parseStoredLanguage(raw) {
        if (!raw) {
          return "";
        }

        try {
          return JSON.parse(raw);
        } catch (error) {
          return raw;
        }
      }

      function readStorageValue(key) {
        try {
          return window.localStorage.getItem(key);
        } catch (error) {
          return null;
        }
      }

      function readCookie(name) {
        const matched = document.cookie
          .split("; ")
          .find(function(row) {
            return row.indexOf(name + "=") === 0;
          });

        if (!matched) {
          return "";
        }

        const value = matched.slice(name.length + 1);

        try {
          return decodeURIComponent(value);
        } catch (error) {
          return value;
        }
      }

      function detectBrowserLanguage() {
        const candidates =
          navigator.languages && navigator.languages.length > 0
            ? navigator.languages
            : [navigator.language].filter(Boolean);

        for (const candidate of candidates) {
          if (candidate.trim() === "*") {
            return defaultLanguage;
          }

          const resolved = resolveSupportedLanguage(candidate);
          if (resolved) {
            return resolved;
          }
        }

        return "";
      }

      const searchParams = new URLSearchParams(window.location.search);
      const explicitLanguage = resolveSupportedLanguage(searchParams.get("lang"));
      const storedLanguage = resolveSupportedLanguage(
        parseStoredLanguage(readStorageValue(languageStorageKey)),
      );
      const legacyStoredLanguage = resolveSupportedLanguage(
        parseStoredLanguage(readStorageValue(legacyLanguageStorageKey)),
      );
      const cookieLanguage = resolveSupportedLanguage(
        readCookie(preferredLanguageCookieName),
      );
      const browserLanguage = detectBrowserLanguage();
      const targetLanguage =
        explicitLanguage ||
        storedLanguage ||
        legacyStoredLanguage ||
        cookieLanguage ||
        browserLanguage ||
        defaultLanguage;

      searchParams.delete("lang");
      const nextQuery = searchParams.toString();
      const nextPath = "/" + targetLanguage;
      const nextUrl =
        nextPath +
        (nextQuery ? "?" + nextQuery : "") +
        window.location.hash;

      if (
        nextUrl !==
        window.location.pathname + window.location.search + window.location.hash
      ) {
        window.location.replace(nextUrl);
      }
    })();
  `;
}

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
  const redirectBootstrapScript = buildRootRedirectBootstrapScript();
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
      <Script id="root-language-redirect" strategy="beforeInteractive">
        {redirectBootstrapScript}
      </Script>

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

      <section className={styles.status} aria-labelledby="root-language-gateway-title">
        <div className={styles.copy} role="status" aria-live="polite">
          <h1 id="root-language-gateway-title" className={styles.title}>
            Redirecting...
          </h1>
        </div>

        <div className={styles.progress} aria-hidden="true" />

        <details className={styles.languageChooser}>
          <summary className={styles.languageSummary}>
            Language
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
