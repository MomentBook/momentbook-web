import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import { APP_LOGO_TRANSPARENT_PATH, buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import styles from "./page.module.scss";

type HomePageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  heroMeta: string;
  deviceAlt: string;
  splashSubtitle: string;
};

const homePageCopy: Record<Language, HomePageCopy> = {
  en: {
    metaTitle: "MomentBook — Organize and keep after every trip",
    metaDescription:
      "MomentBook uploads post-trip photos in one batch and organizes them into one timeline and one map recap.",
    eyebrow: "MomentBook App",
    heroTitle: "Organize and keep after every trip.",
    heroLead:
      "After your trip, upload once and adjust only what is needed, then revisit places through timeline order and map pins.",
    primaryCta: "Download MomentBook",
    secondaryCta: "Read About",
    heroMeta: "Core flow: batch upload, auto organization, minimal cleanup, and recap.",
    deviceAlt: "MomentBook splash screen",
    splashSubtitle: "Travel memories, quietly kept.",
  },
  ko: {
    metaTitle: "MomentBook — 여행 후 정리하여 보관하세요",
    metaDescription:
      "MomentBook는 여행 후 사진을 일괄 업로드해 하나의 타임라인과 지도 회상으로 정리합니다.",
    eyebrow: "MomentBook App",
    heroTitle: "여행 후 정리하여 보관하세요",
    heroLead:
      "여행 후 한 번에 업로드하고 필요한 보정만 거쳐, 타임라인 순서와 지도 핀으로 장소를 다시 떠올립니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "소개 읽기",
    heroMeta: "핵심 흐름: 일괄 업로드, 자동 정리, 최소 보정, 회상.",
    deviceAlt: "MomentBook 스플래시 화면",
    splashSubtitle: "여행 기억을 차분히 보관합니다.",
  },
  ja: {
    metaTitle: "MomentBook — 旅行後に整理して保管しましょう",
    metaDescription:
      "MomentBookは旅行後の写真を一括アップロードし、ひとつのタイムラインと地図の回想に整理します。",
    eyebrow: "MomentBook App",
    heroTitle: "旅行後に整理して保管しましょう",
    heroLead:
      "旅行後に一度でアップロードし、必要な補正だけを行って、タイムライン順序と地図ピンで場所を思い出せます。",
    primaryCta: "MomentBookをダウンロード",
    secondaryCta: "紹介を見る",
    heroMeta: "コアフロー: 一括アップロード、自動整理、最小補正、回想。",
    deviceAlt: "MomentBook スプラッシュ画面",
    splashSubtitle: "旅の記憶を静かに保管します。",
  },
  zh: {
    metaTitle: "MomentBook — 旅行后整理并保存",
    metaDescription:
      "MomentBook 会在旅行后一次上传照片，并整理为一条时间线和一次地图回想。",
    eyebrow: "MomentBook App",
    heroTitle: "旅行后整理并保存",
    heroLead:
      "旅行结束后一次上传，只做必要修正，再通过时间线顺序和地图标记回想去过的地方。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "查看介绍",
    heroMeta: "核心流程: 批量上传、自动整理、最少修正、回想。",
    deviceAlt: "MomentBook 启动画面",
    splashSubtitle: "安静地保存旅行记忆。",
  },
  es: {
    metaTitle: "MomentBook — Organiza y guarda después del viaje",
    metaDescription:
      "MomentBook sube fotos de viaje en lote y las organiza en una sola línea de tiempo y un repaso en mapa.",
    eyebrow: "MomentBook App",
    heroTitle: "Organiza y guarda después del viaje.",
    heroLead:
      "Después del viaje, sube todo una vez, corrige solo lo necesario y recuerda lugares con orden temporal y pines del mapa.",
    primaryCta: "Descargar MomentBook",
    secondaryCta: "Leer introducción",
    heroMeta: "Flujo central: carga en lote, organización automática, ajuste mínimo y repaso.",
    deviceAlt: "Pantalla de inicio de MomentBook",
    splashSubtitle: "Tus recuerdos de viaje, guardados con calma.",
  },
  pt: {
    metaTitle: "MomentBook — Organize e guarde após a viagem",
    metaDescription:
      "O MomentBook envia fotos da viagem em lote e organiza tudo em uma timeline única com recap no mapa.",
    eyebrow: "MomentBook App",
    heroTitle: "Organize e guarde após a viagem.",
    heroLead:
      "Após a viagem, envie tudo de uma vez, ajuste apenas o necessário e relembre lugares pela ordem da timeline e pelos pinos no mapa.",
    primaryCta: "Baixar MomentBook",
    secondaryCta: "Ler introdução",
    heroMeta: "Fluxo principal: envio em lote, organização automática, ajuste mínimo e recap.",
    deviceAlt: "Tela de abertura do MomentBook",
    splashSubtitle: "Memórias de viagem guardadas com tranquilidade.",
  },
  fr: {
    metaTitle: "MomentBook — Organisez et conservez après le voyage",
    metaDescription:
      "MomentBook importe les photos de voyage en lot puis les organise en une timeline unique et un rappel sur carte.",
    eyebrow: "MomentBook App",
    heroTitle: "Organisez et conservez après le voyage.",
    heroLead:
      "Après le voyage, importez tout en une fois, corrigez seulement l'essentiel et revoyez les lieux avec la timeline et les épingles de carte.",
    primaryCta: "Télécharger MomentBook",
    secondaryCta: "Lire la présentation",
    heroMeta: "Flux principal: import en lot, organisation automatique, correction minimale et rappel.",
    deviceAlt: "Écran de démarrage MomentBook",
    splashSubtitle: "Les souvenirs de voyage, conservés avec calme.",
  },
  th: {
    metaTitle: "MomentBook — จัดระเบียบและเก็บไว้หลังทริป",
    metaDescription:
      "MomentBook อัปโหลดรูปหลังทริปแบบชุดเดียว และจัดเป็นไทม์ไลน์เดียวพร้อมการย้อนดูบนแผนที่",
    eyebrow: "MomentBook App",
    heroTitle: "จัดระเบียบและเก็บไว้หลังทริป",
    heroLead:
      "หลังทริป อัปโหลดครั้งเดียว ปรับแก้เท่าที่จำเป็น แล้วทบทวนสถานที่ผ่านลำดับไทม์ไลน์และหมุดแผนที่",
    primaryCta: "ดาวน์โหลด MomentBook",
    secondaryCta: "อ่านแนะนำ",
    heroMeta: "โฟลว์หลัก: อัปโหลดแบบชุด, จัดระเบียบอัตโนมัติ, ปรับแก้น้อยที่สุด, ย้อนความทรงจำ",
    deviceAlt: "หน้าสแปลชของ MomentBook",
    splashSubtitle: "เก็บความทรงจำการเดินทางไว้อย่างสงบ",
  },
  vi: {
    metaTitle: "MomentBook — Sắp xếp và lưu giữ sau chuyến đi",
    metaDescription:
      "MomentBook tải ảnh sau chuyến đi theo lô và sắp thành một timeline cùng phần hồi tưởng trên bản đồ.",
    eyebrow: "MomentBook App",
    heroTitle: "Sắp xếp và lưu giữ sau chuyến đi.",
    heroLead:
      "Sau chuyến đi, tải lên một lần, chỉ chỉnh những gì cần thiết rồi nhớ lại địa điểm qua timeline và ghim bản đồ.",
    primaryCta: "Tải MomentBook",
    secondaryCta: "Đọc giới thiệu",
    heroMeta: "Luồng chính: tải theo lô, tự động sắp xếp, chỉnh tối thiểu và hồi tưởng.",
    deviceAlt: "Màn hình splash MomentBook",
    splashSubtitle: "Lưu giữ ký ức chuyến đi một cách nhẹ nhàng.",
  },
};

function getHomePageCopy(lang: Language): HomePageCopy {
  return homePageCopy[lang] ?? homePageCopy.en;
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHomePageCopy(lang);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, "/"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/"),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHomePageCopy(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MomentBook",
    url: siteUrl,
    logo: buildAbsoluteAppTransparentLogoUrl(siteUrl),
    sameAs: [
      "https://apps.apple.com/app/momentbook/id6749165889",
      "https://play.google.com/store/apps/details?id=com.reflectalab.momentbook",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: supportEmail,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MomentBook",
    url: siteUrl,
    description: content.metaDescription,
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <FadeIn>
              <span className={styles.eyebrow}>{content.eyebrow}</span>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p className={styles.heroLead}>{content.heroLead}</p>
            </FadeIn>
            <FadeIn delay={160}>
              <div className={styles.heroActions}>
                <Link href={`/${lang}/download`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
                <Link href={`/${lang}/about`} className={styles.secondaryButton}>
                  {content.secondaryCta}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <p className={styles.heroMeta}>{content.heroMeta}</p>
            </FadeIn>
          </div>

          <FadeIn delay={120} className={styles.heroMediaWrap}>
            <DeviceMock className={styles.heroDevice} screenClassName={deviceStyles.screenMedia}>
              <div className={styles.splashScreen} role="img" aria-label={content.deviceAlt}>
                <div className={styles.splashLogoWrap}>
                  <Image
                    src={APP_LOGO_TRANSPARENT_PATH}
                    alt=""
                    aria-hidden="true"
                    width={168}
                    height={168}
                    sizes="168px"
                    className={styles.splashLogo}
                  />
                </div>
                <p className={styles.splashAppName}>MomentBook</p>
                <p className={styles.splashSubtitle}>{content.splashSubtitle}</p>
              </div>
            </DeviceMock>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
