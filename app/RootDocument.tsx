import Script from "next/script";
import { Manrope, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ENV } from "@/src/configs/env.server";
import GaRouteTracker from "@/app/components/GaRouteTracker";
import LanguageSyncProvider from "@/app/components/LanguageSyncProvider";
import WebVitalsTracker from "@/app/components/WebVitalsTracker";
import { PageAnimationModeSync } from "@/components/PageAnimationModeSync";
import { APP_LOGO_PATH } from "@/lib/branding/logo";
import { languageList } from "@/lib/i18n/config";
import { resolveSiteUrl, resolveSiteUrlObject } from "@/lib/site-url";

const GA_ID = ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const manrope = Manrope({
  variable: "--font-rounded",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const SITE_URL = resolveSiteUrl();

export const APP_METADATA_BASE = resolveSiteUrlObject();

export const APP_ICONS = {
  icon: APP_LOGO_PATH,
  shortcut: APP_LOGO_PATH,
  apple: APP_LOGO_PATH,
} as const;

export function RootDocument({
  children,
  htmlLang,
  includeAnalytics = true,
  includeLanguageSync = true,
  includePageAnimationSync = true,
}: {
  children: React.ReactNode;
  htmlLang: string;
  includeAnalytics?: boolean;
  includeLanguageSync?: boolean;
  includePageAnimationSync?: boolean;
}) {
  const pageAnimationBootstrapScript = `
    (function() {
      const supportedLanguages = ${JSON.stringify(languageList)};
      const pathname = window.location.pathname || "/";
      const segments = pathname.split("/").filter(Boolean);
      const isLocalizedHome = segments.length === 1 && supportedLanguages.includes(segments[0]);

      document.documentElement.setAttribute(
        "data-page-animations",
        isLocalizedHome ? "enabled" : "disabled",
      );
    })();
  `;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              const stored = localStorage.getItem('theme');
              let themeValue = stored;
              if (stored) {
                try {
                  themeValue = JSON.parse(stored);
                } catch (error) {
                  themeValue = stored;
                }
              }
              const theme = (themeValue === 'light' || themeValue === 'dark') ? themeValue : 'light';
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `}
        </Script>
        <Script id="js-ready-script" strategy="beforeInteractive">
          {`
            document.documentElement.setAttribute('data-js', 'true');
          `}
        </Script>
        <Script id="page-animation-mode-script" strategy="beforeInteractive">
          {includePageAnimationSync
            ? pageAnimationBootstrapScript
            : `
              document.documentElement.setAttribute('data-page-animations', 'disabled');
            `}
        </Script>
      </head>
      <body className={`${manrope.variable} ${playfairDisplay.variable}`}>
        {includeLanguageSync ? <LanguageSyncProvider /> : null}
        {includePageAnimationSync ? <PageAnimationModeSync /> : null}
        {includeAnalytics && process.env.NODE_ENV === "production" ? (
          <>
            <GoogleAnalytics gaId={GA_ID} />
            <GaRouteTracker />
            <WebVitalsTracker />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
