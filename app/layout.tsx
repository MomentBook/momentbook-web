import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.scss";
import LanguageSyncProvider from "./components/LanguageSyncProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ENV } from "@/src/configs/env.server";
import GaRouteTracker from "./components/GaRouteTracker";
import { APP_LOGO_PATH } from "@/lib/branding/logo";
import {
    defaultLanguage,
    languageList,
    toLocaleTag,
    type Language,
} from "@/lib/i18n/config";
//
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
const GA_ID = ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
const HTML_LANG_BY_CODE = Object.fromEntries(
    languageList.map((code) => [code, toLocaleTag(code)]),
) as Record<Language, string>;
const DEFAULT_HTML_LANG = HTML_LANG_BY_CODE[defaultLanguage];
const HTML_LANG_MAP_JSON = JSON.stringify(HTML_LANG_BY_CODE);

const manrope = Manrope({
    variable: "--font-rounded",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    variable: "--font-editorial",
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["500", "600", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    icons: {
        icon: APP_LOGO_PATH,
        shortcut: APP_LOGO_PATH,
        apple: APP_LOGO_PATH,
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang={DEFAULT_HTML_LANG} suppressHydrationWarning>
            <head>
                <Script id="html-lang-script" strategy="beforeInteractive">
                    {`
            (function() {
              var langMap = ${HTML_LANG_MAP_JSON};
              var pathname = window.location.pathname || "/";
              var segment = pathname.split("/")[1];
              var lang = langMap[segment] || "${DEFAULT_HTML_LANG}";
              document.documentElement.setAttribute("lang", lang);
            })();
          `}
                </Script>
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
            </head>
            <body className={`${manrope.variable} ${playfairDisplay.variable}`}>
                <LanguageSyncProvider />
                {process.env.NODE_ENV === "production" ? (
                    <>
                        <GoogleAnalytics gaId={GA_ID} />
                        <GaRouteTracker />
                    </>
                ) : null}
                {children}
            </body>
        </html>
    );
}
