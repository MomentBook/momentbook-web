import type { Metadata } from "next";
import "@/app/globals.scss";
import {
  APP_ICONS,
  APP_METADATA_BASE,
  RootDocument,
} from "@/app/RootDocument";
import { defaultLanguage, toLocaleTag } from "@/lib/i18n/config";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";

export const metadata: Metadata = {
  metadataBase: APP_METADATA_BASE,
  icons: APP_ICONS,
  title: {
    default: "MomentBook Admin",
    template: "%s | MomentBook Admin",
  },
  robots: buildNoIndexRobots(),
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootDocument
      htmlLang={toLocaleTag(defaultLanguage)}
      includeAnalytics={false}
      includeLanguageSync={false}
      includePageAnimationSync={false}
    >
      {children}
    </RootDocument>
  );
}
