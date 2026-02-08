import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.scss";
import LanguageSyncProvider from "./components/LanguageSyncProvider";
import AuthSessionProvider from "./components/AuthSessionProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ENV } from "@/src/configs/env.server";
import GaRouteTracker from "./components/GaRouteTracker";
import {
    defaultLanguage,
    isValidLanguage,
    toLocaleTag,
    type Language,
} from "@/lib/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
const GA_ID = ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
};

function resolveRequestLanguage(pathname: string | null): Language {
    if (!pathname) {
        return defaultLanguage;
    }

    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (firstSegment && isValidLanguage(firstSegment)) {
        return firstSegment;
    }

    return defaultLanguage;
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const requestHeaders = await headers();
    const pathname = requestHeaders.get("x-pathname");
    const lang = resolveRequestLanguage(pathname);

    return (
        <html lang={toLocaleTag(lang)} suppressHydrationWarning>
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
            </head>
            <body>
                <AuthSessionProvider>
                    <LanguageSyncProvider />
                    {process.env.NODE_ENV === "production" ? (
                        <>
                            <GoogleAnalytics gaId={GA_ID} />
                            <GaRouteTracker />
                        </>
                    ) : null}
                    {children}
                </AuthSessionProvider>
            </body>
        </html>
    );
}
