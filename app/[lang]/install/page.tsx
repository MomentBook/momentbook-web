import type { Metadata } from "next";
import { headers } from "next/headers";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  detectLandingPlatform,
  normalizeCampaignParams,
  type CampaignSearchParams,
} from "@/lib/install-campaign";
import { getInstallLandingContent } from "@/lib/install-landing";
import { buildAppleSmartBannerContent, getStoreLinks } from "@/lib/mobile-app";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import { InstallLanding } from "./InstallLanding";

const installMetadataByLanguage: Partial<Record<Language, { title: string; description: string }>> = {
  en: {
    title: "Install MomentBook",
    description:
      "A mobile-first MomentBook install landing for short-form travel traffic. See the app UI, sample trip flow, and official store links.",
  },
  ko: {
    title: "MomentBook 설치",
    description:
      "쇼츠 유입 사용자를 위한 MomentBook 모바일 설치 랜딩입니다. 앱 UI, 예시 여행 흐름, 공식 스토어 링크를 바로 확인할 수 있습니다.",
  },
};

function getInstallMetadata(lang: Language) {
  return installMetadataByLanguage[lang] ?? installMetadataByLanguage.en!;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<CampaignSearchParams>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const campaign = normalizeCampaignParams(await searchParams, lang);
  const content = getInstallMetadata(lang);
  const path = "/install";

  return {
    title: content.title,
    description: content.description,
    robots: buildNoIndexRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: content.title,
      description: content.description,
      url: buildOpenGraphUrl(lang, path),
    },
    twitter: {
      title: content.title,
      description: content.description,
    },
    other: {
      "apple-itunes-app": buildAppleSmartBannerContent(lang, campaign),
    },
  };
}

export default async function InstallPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<CampaignSearchParams>;
}) {
  const { lang } = await params as { lang: Language };
  const campaign = normalizeCampaignParams(await searchParams, lang);
  const headerStore = await headers();
  const platform = detectLandingPlatform(headerStore.get("user-agent") ?? "");
  const content = getInstallLandingContent(lang, {
    dest: campaign.dest,
    variant: campaign.variant,
  });
  const storeLinks = getStoreLinks(lang, campaign);

  return (
    <InstallLanding
      lang={lang}
      campaign={campaign}
      platform={platform}
      content={content}
      storeLinks={storeLinks}
    />
  );
}
