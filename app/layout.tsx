import type { Metadata } from "next";
import Script from "next/script";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://momentbook.app"),
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
      <body>{children}</body>
    </html>
  );
}
