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

const homePageCopy: { en: HomePageCopy; ko: HomePageCopy } = {
  en: {
    metaTitle: "MomentBook — Travel photos into one timeline",
    metaDescription:
      "MomentBook organizes post-trip photos into one timeline and one map recap through a single batch-based flow.",
    eyebrow: "MomentBook App",
    heroTitle: "Travel photos become one timeline and one map recap.",
    heroLead:
      "After a trip, upload in one batch, adjust only what is needed, and revisit places through timeline order and map pins.",
    primaryCta: "Download MomentBook",
    secondaryCta: "Read About",
    heroMeta: "One focused flow: batch upload, auto-order, light cleanup, and recap.",
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
};

function getHomePageCopy(lang: Language): HomePageCopy {
  if (lang === "ko") {
    return homePageCopy.ko;
  }

  return homePageCopy.en;
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
        <div className={styles.heroBackdrop} aria-hidden />
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
