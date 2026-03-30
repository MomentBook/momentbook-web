import type { Metadata } from "next";
import "@/app/globals.scss";
import { RootDocument, APP_ICONS, APP_METADATA_BASE } from "@/app/RootDocument";
import { defaultLanguage, toLocaleTag } from "@/lib/i18n/config";

export const metadata: Metadata = {
  metadataBase: APP_METADATA_BASE,
  icons: APP_ICONS,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootDocument htmlLang={toLocaleTag(defaultLanguage)}>
      {children}
    </RootDocument>
  );
}
