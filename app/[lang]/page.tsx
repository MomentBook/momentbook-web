import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { getLocalizedScreenshotPath } from "@/lib/app-screenshots";
import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { getCoreFlowContent } from "@/lib/core-flow";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type HomePageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroImageAlt: string;
  mapImageAlt: string;
  primaryCta: string;
  secondaryCta: string;
  journeysCta: string;
  finalTitle: string;
  finalLead: string;
};

const homePageCopy: { en: HomePageCopy; ko: HomePageCopy } = {
  en: {
    metaTitle: "MomentBook — One upload, one travel timeline",
    metaDescription:
      "Upload all trip photos in one batch, clean up misplaced shots, and revisit your route through timeline and map pins.",
    eyebrow: "MomentBook",
    title: "From mixed camera roll to one complete travel timeline.",
    lead: "Batch upload first. Auto-organize next. Then fix misplaced photos and revisit your trip with timeline and map pins.",
    heroImageAlt: "MomentBook photo batch upload screen",
    mapImageAlt: "MomentBook timeline and map pin screen",
    primaryCta: "Download MomentBook",
    secondaryCta: "How it works",
    journeysCta: "See public journeys",
    finalTitle: "Simple by design",
    finalLead:
      "No noisy feed. No ranking. Just your trip, organized in order and recalled on a map.",
  },
  ko: {
    metaTitle: "MomentBook — 한 번 업로드, 하나의 여행 타임라인",
    metaDescription:
      "여행 사진을 한 번에 업로드하고, 잘못 분류된 사진을 정리한 뒤, 타임라인과 지도 핀으로 여행을 다시 떠올릴 수 있습니다.",
    eyebrow: "MomentBook",
    title: "흩어진 카메라롤을 하나의 여행 타임라인으로.",
    lead: "먼저 일괄 업로드하고, 자동 정리한 뒤, 잘못 들어간 사진만 정리합니다. 마지막에는 타임라인과 지도 핀으로 여행을 회상합니다.",
    heroImageAlt: "MomentBook 사진 일괄 업로드 화면",
    mapImageAlt: "MomentBook 타임라인과 지도 핀 화면",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식 보기",
    journeysCta: "공개 여정 보기",
    finalTitle: "의도적으로 단순하게",
    finalLead:
      "시끄러운 피드도, 랭킹도 없습니다. 여행을 정리하고 장소를 다시 떠올리는 데만 집중합니다.",
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
  const coreFlow = getCoreFlowContent(lang);

  const heroImage = getLocalizedScreenshotPath(lang, "photos");
  const mapImage = getLocalizedScreenshotPath(lang, "timeline");

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
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <FadeIn>
              <span className={styles.eyebrow}>{content.eyebrow}</span>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p className={styles.heroLead}>{content.lead}</p>
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
          </div>

          <FadeIn delay={140}>
            <DeviceMock className={styles.heroDevice} screenClassName={deviceStyles.screenMedia}>
              <Image
                src={heroImage}
                alt={content.heroImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
                className={deviceStyles.screenImage}
              />
            </DeviceMock>
          </FadeIn>
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{coreFlow.title}</h2>
          <p className={styles.sectionLead}>{coreFlow.lead}</p>
        </div>

        <ol className={styles.stepList}>
          {coreFlow.steps.map((step) => (
            <li key={step.title} className={styles.stepCard}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDetail}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapCopy}>
          <h2 className={styles.sectionTitle}>{coreFlow.mapRecapTitle}</h2>
          <p className={styles.sectionLead}>{coreFlow.mapRecapDetail}</p>
          <Link href={`/${lang}/journeys`} className={styles.inlineLink}>
            {content.journeysCta}
          </Link>
        </div>

        <DeviceMock className={styles.mapDevice} screenClassName={deviceStyles.screenMedia}>
          <Image
            src={mapImage}
            alt={content.mapImageAlt}
            fill
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
            className={deviceStyles.screenImage}
          />
        </DeviceMock>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.sectionTitle}>{content.finalTitle}</h2>
        <p className={styles.sectionLead}>{content.finalLead}</p>
        <div className={styles.heroActions}>
          <Link href={`/${lang}/download`} className={styles.primaryButton}>
            {content.primaryCta}
          </Link>
          <Link href={`/${lang}/about`} className={styles.secondaryButton}>
            {content.secondaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
