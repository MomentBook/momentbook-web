import type { Metadata } from "next";
import Script from "next/script";
import "./globals.scss";
import LanguageSyncProvider from "./components/LanguageSyncProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ENV } from "@/src/configs/env.server";
import GaRouteTracker from "./components/GaRouteTracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
const GA_ID = ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
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
