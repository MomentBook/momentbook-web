import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.scss";
import { getCoreFlowContent } from "@/lib/core-flow";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type AboutSection = {
  title: string;
  paragraphs: string[];
};

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageLead: string;
  sections: AboutSection[];
  flowTitle: string;
  flowLead: string;
  scopeTitle: string;
  scopePoints: string[];
  scopeLead: string;
  faqCta: string;
  downloadCta: string;
};

const aboutCopy: { en: AboutCopy; ko: AboutCopy } = {
  en: {
    metaTitle: "About MomentBook — Detailed text guide",
    metaDescription:
      "Detailed text explanation of MomentBook's post-trip photo flow and the read-only scope of MomentBook Web.",
    pageTitle: "About MomentBook",
    pageLead:
      "This page keeps the app explanation in plain text. It is intended for users who want to understand the full flow before installation.",
    sections: [
      {
        title: "What MomentBook focuses on",
        paragraphs: [
          "MomentBook is built around one moment: after your trip ends and photos are mixed in your camera roll.",
          "The app starts with batch upload, auto-ordering by date and time, and only small manual cleanup when needed.",
        ],
      },
      {
        title: "What MomentBook does not target",
        paragraphs: [
          "It is not a feed product, ranking product, or frequent posting loop.",
          "The main outcome is a clear timeline and map recap for personal recall.",
        ],
      },
      {
        title: "How the web and app split roles",
        paragraphs: [
          "Native app handles creation, editing, and account-side controls.",
          "Web exposes published journeys, moments, photos, and profiles as public read-only pages.",
        ],
      },
    ],
    flowTitle: "Detailed post-trip flow",
    flowLead: "The core sequence is fixed and repeated for each trip.",
    scopeTitle: "Public web scope",
    scopeLead: "Current web scope is intentionally limited to explanation and read-only access.",
    scopePoints: [
      "Marketing pages explain app context and route users to installation.",
      "FAQ provides short operational answers without redefining app behavior.",
      "Download page links to official stores and platform requirements.",
    ],
    faqCta: "Read FAQ",
    downloadCta: "Go to Download",
  },
  ko: {
    metaTitle: "MomentBook 소개 — 상세 텍스트 가이드",
    metaDescription:
      "MomentBook의 여행 후 사진 정리 흐름과 웹의 읽기 전용 범위를 텍스트로 자세히 설명합니다.",
    pageTitle: "MomentBook 소개",
    pageLead:
      "이 페이지는 앱 설명을 단순 텍스트로 유지합니다. 설치 전에 전체 흐름을 먼저 확인하려는 사용자를 위한 구성입니다.",
    sections: [
      {
        title: "MomentBook가 집중하는 지점",
        paragraphs: [
          "MomentBook는 여행이 끝난 직후, 카메라롤에 사진이 섞여 있는 상황에 맞춰 설계되었습니다.",
          "흐름은 일괄 업로드, 날짜/시간 자동 정리, 필요한 수동 보정으로 이어집니다.",
        ],
      },
      {
        title: "MomentBook의 비목표",
        paragraphs: [
          "피드 소비, 랭킹 경쟁, 잦은 게시 유도 구조를 목표로 하지 않습니다.",
          "핵심 결과는 여행 순서를 정리한 타임라인과 지도 회상입니다.",
        ],
      },
      {
        title: "웹과 앱의 역할 분리",
        paragraphs: [
          "작성/편집/계정 제어는 네이티브 앱에서 수행합니다.",
          "웹은 공개된 여정, 모먼트, 사진, 프로필을 읽기 전용으로 제공합니다.",
        ],
      },
    ],
    flowTitle: "여행 후 상세 흐름",
    flowLead: "아래 순서는 매 여행마다 반복되는 고정 흐름입니다.",
    scopeTitle: "공개 웹 제공 범위",
    scopeLead: "현재 웹 범위는 설명과 읽기 전용 접근으로 의도적으로 제한되어 있습니다.",
    scopePoints: [
      "홈/소개 페이지는 앱 사용 맥락을 설명하고 설치로 연결합니다.",
      "FAQ는 앱 동작을 재정의하지 않고 짧은 답변만 제공합니다.",
      "Download는 공식 스토어 링크와 플랫폼 요구사항을 제공합니다.",
    ],
    faqCta: "FAQ 보기",
    downloadCta: "다운로드로 이동",
  },
};

function getAboutCopy(lang: Language): AboutCopy {
  if (lang === "ko") {
    return aboutCopy.ko;
  }

  return aboutCopy.en;
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

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>{content.pageTitle}</h1>
          <p className={styles.pageLead}>{content.pageLead}</p>
        </header>

        {content.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.flowTitle}</h2>
          <p className={styles.paragraph}>{content.flowLead}</p>
          <p className={styles.paragraph}>{flow.lead}</p>
          <ol className={styles.flowList}>
            {flow.steps.map((step) => (
              <li key={step.title} className={styles.flowItem}>
                <p className={styles.flowTitle}>{step.title}</p>
                <p className={styles.paragraph}>{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className={styles.paragraph}>{flow.mapRecapTitle}: {flow.mapRecapDetail}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.scopeTitle}</h2>
          <p className={styles.paragraph}>{content.scopeLead}</p>
          <ul className={styles.scopeList}>
            {content.scopePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <footer className={styles.footerLinks}>
          <Link href={`/${lang}/faq`} className={styles.linkButton}>
            {content.faqCta}
          </Link>
          <Link href={`/${lang}/download`} className={styles.linkButton}>
            {content.downloadCta}
          </Link>
        </footer>
      </article>
    </main>
  );
}
