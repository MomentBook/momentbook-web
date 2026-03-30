import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "@/app/globals.scss";
import {
  APP_ICONS,
  APP_METADATA_BASE,
  RootDocument,
} from "@/app/RootDocument";
import { LanguagePreferenceSync } from "@/components/LanguagePreferenceSync";
import {
  isValidLanguage,
  languageList,
  toLocaleTag,
  toOpenGraphLocale,
  type Language,
} from "@/lib/i18n/config";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";

const suit = localFont({
  variable: "--font-suit",
  display: "swap",
  src: [
    { path: "../../../public/fonts/suit/SUIT-Thin.woff2", weight: "100", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-Light.woff2", weight: "300", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../../../public/fonts/suit/SUIT-Heavy.woff2", weight: "900", style: "normal" },
  ],
});

const siteDescriptionByLanguage: Record<Language, string> = {
  en: "An app that quietly remembers the moments of your day.",
  ko: "하루의 순간을 조용히 기억하는 앱.",
  ja: "一日の瞬間を静かに覚えておくアプリ。",
  zh: "一款静静记住你一天中那些瞬间的应用。",
  es: "Una aplicación que recuerda en silencio los momentos de tu día.",
  pt: "Um aplicativo que guarda em silêncio os momentos do seu dia.",
  fr: "Une application qui se souvient discrètement des moments de votre journée.",
  th: "แอปที่จดจำช่วงเวลาของวันคุณอย่างเงียบๆ",
  vi: "Ứng dụng lặng lẽ ghi nhớ những khoảnh khắc trong ngày của bạn.",
};

function resolveRouteLanguage(lang: string): Language {
  if (!isValidLanguage(lang)) {
    notFound();
  }

  return lang;
}

// Generate static params for all supported languages
export async function generateStaticParams() {
  return languageList.map((lang) => ({ lang }));
}

// Generate metadata based on language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = resolveRouteLanguage(rawLang);

  return {
    metadataBase: APP_METADATA_BASE,
    icons: APP_ICONS,
    title: {
      default: "MomentBook",
      template: "%s | MomentBook",
    },
    description: siteDescriptionByLanguage[lang],
    robots: buildNoIndexRobots(),
    openGraph: {
      type: "website",
      locale: toOpenGraphLocale(lang),
      siteName: "MomentBook",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = resolveRouteLanguage(rawLang);

  return (
    <RootDocument htmlLang={toLocaleTag(lang)}>
      <div className={suit.variable}>
        <LanguagePreferenceSync currentLang={lang} />
        {children}
      </div>
    </RootDocument>
  );
}
