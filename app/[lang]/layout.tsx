import type { Metadata } from "next";
import localFont from "next/font/local";
import { LangRouteShell } from "./LangRouteShell";
import {
  languageList,
  toOpenGraphLocale,
  type Language,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCanonicalStoreLinks } from "@/lib/mobile-app";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";

const suit = localFont({
  variable: "--font-suit",
  display: "swap",
  src: [
    { path: "../../public/fonts/suit/SUIT-Thin.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Heavy.woff2", weight: "900", style: "normal" },
  ],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
const journeysNavLabelMap: Record<Language, string> = {
  en: "Journeys",
  ko: "여정",
  ja: "旅",
  zh: "行程",
  es: "Viajes",
  pt: "Jornadas",
  fr: "Voyages",
  th: "ทริป",
  vi: "Hành trình",
};

const siteDescriptionByLanguage: Record<Language, string> = {
  en: "An app that quietly remembers your day.",
  ko: "하루의 순간을 조용히 기억하는 앱.",
  ja: "一日の瞬間を静かに記憶するアプリ。",
  zh: "安静记录你一天瞬间的应用。",
  es: "Una app que recuerda en silencio los momentos de tu día.",
  pt: "Um app que guarda em silêncio os momentos do seu dia.",
  fr: "Une app qui garde en mémoire, en douceur, les moments de votre journée.",
  th: "แอปที่จดจำช่วงเวลาของวันคุณอย่างเงียบๆ",
  vi: "Ứng dụng lặng lẽ ghi nhớ những khoảnh khắc trong ngày của bạn.",
};

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
  const { lang } = await params as { lang: Language };

  return {
    metadataBase: new URL(siteUrl),
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
  const { lang } = await params as { lang: Language };
  const dict = await getDictionary(lang);
  const storeLinks = getCanonicalStoreLinks(lang);
  const journeysNavLabel = journeysNavLabelMap[lang] ?? journeysNavLabelMap.en;

  return (
    <div className={suit.variable}>
      <LangRouteShell
        lang={lang}
        dict={dict}
        journeysNavLabel={journeysNavLabel}
        supportEmail={supportEmail}
        storeLinks={storeLinks}
      >
        {children}
      </LangRouteShell>
    </div>
  );
}
