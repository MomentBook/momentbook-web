import Script from "next/script";
import { Manrope, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ENV } from "@/src/configs/env.server";
import GaRouteTracker from "@/app/components/GaRouteTracker";
import LanguageSyncProvider from "@/app/components/LanguageSyncProvider";
import { APP_LOGO_PATH } from "@/lib/branding/logo";

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

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

export const APP_METADATA_BASE = new URL(SITE_URL);

export const APP_ICONS = {
  icon: APP_LOGO_PATH,
  shortcut: APP_LOGO_PATH,
  apple: APP_LOGO_PATH,
} as const;

export function RootDocument({
  children,
  htmlLang,
}: {
  children: React.ReactNode;
  htmlLang: string;
}) {
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
