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

const installMetadataByLanguage: Record<Language, { title: string; description: string }> = {
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
  ja: {
    title: "MomentBook インストール",
    description:
      "ショート流入ユーザー向けの MomentBook モバイルインストールページです。アプリ UI、サンプル旅の流れ、公式ストアリンクをすぐ確認できます。",
  },
  zh: {
    title: "安装 MomentBook",
    description:
      "面向短视频流量用户的 MomentBook 移动安装页。可直接查看应用界面、示例旅程流程和官方商店链接。",
  },
  es: {
    title: "Instalar MomentBook",
    description:
      "Landing móvil de instalación de MomentBook para tráfico desde shorts. Puedes ver la interfaz de la app, un flujo de viaje de ejemplo y los enlaces oficiales de las tiendas.",
  },
  pt: {
    title: "Instalar MomentBook",
    description:
      "Página mobile de instalação do MomentBook para tráfego vindo de shorts. Veja a interface do app, um fluxo de viagem de exemplo e os links oficiais das lojas.",
  },
  fr: {
    title: "Installer MomentBook",
    description:
      "Page mobile d'installation de MomentBook pour le trafic venant des shorts. Consultez l'interface de l'app, un exemple de parcours de voyage et les liens officiels des stores.",
  },
  th: {
    title: "ติดตั้ง MomentBook",
    description:
      "หน้าแลนดิงติดตั้งบนมือถือของ MomentBook สำหรับผู้ใช้ที่มาจากช็อตส์ ดู UI ของแอป ลำดับทริปตัวอย่าง และลิงก์สโตร์ทางการได้ทันที",
  },
  vi: {
    title: "Cài MomentBook",
    description:
      "Trang đích cài đặt di động của MomentBook dành cho lưu lượng từ short. Bạn có thể xem giao diện ứng dụng, luồng chuyến đi mẫu và các liên kết cửa hàng chính thức ngay tại đây.",
  },
};

function getInstallMetadata(lang: Language) {
  return installMetadataByLanguage[lang] ?? installMetadataByLanguage.en;
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
