import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./about.module.scss";
import {
  type AppScreenshotKey,
  getLocalizedScreenshotGallery,
} from "@/lib/app-screenshots";
import { getCoreFlowContent } from "@/lib/core-flow";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  previewTitle: string;
  previewLead: string;
  principleTitle: string;
  principles: string[];
};

const aboutCopy: { en: AboutCopy; ko: AboutCopy } = {
  en: {
    metaTitle: "How MomentBook works — one clean travel flow",
    metaDescription:
      "A simple flow: batch upload, auto-organize, manual cleanup, timeline completion, and map-based trip recall.",
    heroTitle: "How it works, without noise",
    heroLead: "One travel-photo flow from upload to recap.",
    primaryCta: "Download app",
    secondaryCta: "Common questions",
    previewTitle: "What you see in the app",
    previewLead: "Only the screens you need for upload, organize, and recap.",
    principleTitle: "Design principles",
    principles: [
      "One clear path from upload to recap",
      "Auto first, manual only when needed",
      "Timeline and map used together",
    ],
  },
  ko: {
    metaTitle: "MomentBook 작동 방식 — 하나의 깔끔한 여행 흐름",
    metaDescription:
      "일괄 업로드, 자동 정리, 수동 보정, 타임라인 완성, 지도 기반 회상까지 하나의 단순한 흐름으로 구성됩니다.",
    heroTitle: "군더더기 없는 작동 방식",
    heroLead: "업로드부터 회고까지 하나의 사진 정리 흐름에 집중합니다.",
    primaryCta: "앱 다운로드",
    secondaryCta: "자주 묻는 질문",
    previewTitle: "앱에서 보이는 화면",
    previewLead: "업로드, 정리, 회고에 필요한 화면만 남겼습니다.",
    principleTitle: "디자인 원칙",
    principles: [
      "업로드부터 회고까지 한 줄기 흐름",
      "자동 우선, 필요한 지점만 수동 보정",
      "타임라인과 지도를 함께 사용",
    ],
  },
};

const screenshotCaptions: Record<"en" | "ko", Record<AppScreenshotKey, string>> = {
  en: {
    intro: "App entry",
    tracking: "Trip context",
    photos: "Batch upload and organization",
    timeline: "Timeline and recap",
  },
  ko: {
    intro: "앱 시작 화면",
    tracking: "여행 맥락 확인",
    photos: "일괄 업로드와 정리",
    timeline: "타임라인 회고",
  },
};

function getAboutCopy(lang: Language): AboutCopy {
  if (lang === "ko") {
    return aboutCopy.ko;
  }

  return aboutCopy.en;
}

function getCaption(lang: Language, key: AppScreenshotKey): string {
  if (lang === "ko") {
    return screenshotCaptions.ko[key];
  }

  return screenshotCaptions.en[key];
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getAboutCopy(lang);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, "/about"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/about"),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getAboutCopy(lang);
  const flow = getCoreFlowContent(lang);
  const screenshots = getLocalizedScreenshotGallery(lang).filter(
    (item) => item.key === "photos" || item.key === "timeline" || item.key === "tracking",
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MomentBook",
        item: `${siteUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}/${lang}/about`,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
        <p className={styles.heroLead}>{content.heroLead}</p>
        <div className={styles.heroActions}>
          <Link href={`/${lang}/download`} className={styles.primaryButton}>
            {content.primaryCta}
          </Link>
          <Link href={`/${lang}/faq`} className={styles.secondaryButton}>
            {content.secondaryCta}
          </Link>
        </div>
      </header>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{flow.title}</h2>
          <p className={styles.sectionLead}>{flow.lead}</p>
        </header>

        <ol className={styles.stepList}>
          {flow.steps.map((step, index) => (
            <li key={step.title} className={styles.stepItem}>
              <span className={styles.stepBadge}>{index + 1}</span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDetail}>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.previewTitle}</h2>
          <p className={styles.sectionLead}>{content.previewLead}</p>
        </header>

        <div className={styles.previewGrid}>
          {screenshots.map((screenshot) => (
            <article key={screenshot.src} className={styles.previewCard}>
              <DeviceMock className={styles.previewDevice} screenClassName={deviceStyles.screenMedia}>
                <Image
                  src={screenshot.src}
                  alt={getCaption(lang, screenshot.key)}
                  fill
                  sizes="(max-width: 768px) 72vw, (max-width: 1080px) 32vw, 280px"
                  className={deviceStyles.screenImage}
                />
              </DeviceMock>
              <p className={styles.previewCaption}>{getCaption(lang, screenshot.key)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.principleCard}>
          <h2 className={styles.sectionTitle}>{content.principleTitle}</h2>
          <ul className={styles.principleList}>
            {content.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link href={`/${lang}/download`} className={styles.primaryButton}>
              {content.primaryCta}
            </Link>
            <Link href={`/${lang}/faq`} className={styles.secondaryButton}>
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
