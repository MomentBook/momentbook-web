import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./download.module.scss";
import { getLocalizedScreenshotPath } from "@/lib/app-screenshots";
import { getCoreFlowContent } from "@/lib/core-flow";
import { getStoreRegion, type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type StoreLinks = {
  ios: string;
  android: string;
};

type DownloadCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  availability: string;
  deviceAlt: string;
  iosTopLabel: string;
  iosName: string;
  androidTopLabel: string;
  androidName: string;
  startTitle: string;
  startLead: string;
  requirementsTitle: string;
  iosRequirement: string[];
  androidRequirement: string[];
};

const downloadCopy: { en: DownloadCopy; ko: DownloadCopy } = {
  en: {
    metaTitle: "Download MomentBook",
    metaDescription:
      "Download MomentBook on iOS and Android. Upload trip photos once, then revisit with timeline and map pins.",
    title: "Download MomentBook",
    subtitle: "Start with one batch upload. End with one complete trip recap.",
    availability: "Available on App Store and Google Play.",
    deviceAlt: "MomentBook timeline screen",
    iosTopLabel: "Download on",
    iosName: "App Store",
    androidTopLabel: "Get it on",
    androidName: "Google Play",
    startTitle: "Start in one flow",
    startLead: "Use the same simple sequence every trip.",
    requirementsTitle: "System requirements",
    iosRequirement: ["iOS 16.0 or later", "iPhone and iPad"],
    androidRequirement: ["Android 10.0 or later", "Most Android devices"],
  },
  ko: {
    metaTitle: "MomentBook 다운로드",
    metaDescription:
      "iOS와 Android에서 MomentBook을 다운로드하고, 여행 사진을 한 번에 올린 뒤 타임라인과 지도 핀으로 회상하세요.",
    title: "MomentBook 다운로드",
    subtitle: "한 번의 일괄 업로드로 시작해, 한 번의 여행 회고로 마무리합니다.",
    availability: "App Store와 Google Play에서 이용할 수 있습니다.",
    deviceAlt: "MomentBook 타임라인 화면",
    iosTopLabel: "다운로드",
    iosName: "App Store",
    androidTopLabel: "다운로드",
    androidName: "Google Play",
    startTitle: "하나의 흐름으로 시작",
    startLead: "매 여행마다 같은 단순한 순서로 정리합니다.",
    requirementsTitle: "시스템 요구사항",
    iosRequirement: ["iOS 16.0 이상", "iPhone 및 iPad"],
    androidRequirement: ["Android 10.0 이상", "대부분의 Android 기기"],
  },
};

const iosPath = "app/momentbook-%EC%97%AC%ED%96%89-%EA%B8%B0%EB%A1%9D/id6749165889";

function getStoreLinks(lang: Language): StoreLinks {
  const region = getStoreRegion(lang);

  return {
    ios: `https://apps.apple.com/${region.ios}/${iosPath}`,
    android: `https://play.google.com/store/apps/details?id=com.reflectalab.momentbook&hl=${region.hl}&gl=${region.gl}`,
  };
}

function getDownloadCopy(lang: Language): DownloadCopy {
  if (lang === "ko") {
    return downloadCopy.ko;
  }

  return downloadCopy.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getDownloadCopy(lang);
  const path = "/download";

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, path),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getDownloadCopy(lang);
  const flow = getCoreFlowContent(lang);
  const storeLinks = getStoreLinks(lang);
  const deviceImage = getLocalizedScreenshotPath(lang, "timeline");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/download"), siteUrl).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MomentBook",
    description: content.metaDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    softwareRequirements: "iOS 16.0 or later, Android 10.0 or later",
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        url: storeLinks.ios,
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        url: storeLinks.android,
        price: "0",
        priceCurrency: "USD",
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <FadeIn>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
              <p className={styles.heroSubtitle}>{content.subtitle}</p>

              <div className={styles.storeButtons}>
                <a
                  href={storeLinks.ios}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.iosName}
                >
                  <span className={styles.storeTop}>{content.iosTopLabel}</span>
                  <span className={styles.storeName}>{content.iosName}</span>
                </a>
                <a
                  href={storeLinks.android}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.androidName}
                >
                  <span className={styles.storeTop}>{content.androidTopLabel}</span>
                  <span className={styles.storeName}>{content.androidName}</span>
                </a>
              </div>

              <p className={styles.availability}>{content.availability}</p>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <DeviceMock className={styles.heroDevice} screenClassName={deviceStyles.screenMedia}>
              <Image
                src={deviceImage}
                alt={content.deviceAlt}
                fill
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
                className={deviceStyles.screenImage}
              />
            </DeviceMock>
          </FadeIn>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.startTitle}</h2>
          <p className={styles.sectionLead}>{content.startLead}</p>
        </header>

        <ol className={styles.flowList}>
          {flow.steps.map((step) => (
            <li key={step.title} className={styles.flowItem}>
              <h3 className={styles.flowTitle}>{step.title}</h3>
              <p className={styles.flowDetail}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.requirementsTitle}</h2>
        </header>

        <div className={styles.requirementGrid}>
          <article className={styles.requirementCard}>
            <h3 className={styles.requirementTitle}>iOS</h3>
            <ul className={styles.requirementList}>
              {content.iosRequirement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.requirementCard}>
            <h3 className={styles.requirementTitle}>Android</h3>
            <ul className={styles.requirementList}>
              {content.androidRequirement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
