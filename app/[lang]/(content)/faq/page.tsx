import type { Metadata } from "next";
import Link from "next/link";
import faqStyles from "./faq.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQGroup = {
  title: string;
  description: string;
  items: FAQItem[];
};

type FAQContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  groups: FAQGroup[];
  calloutPrefix: string;
  calloutLink: string;
  calloutSuffix: string;
};

const faqContent: { en: FAQContent; ko: FAQContent } = {
  en: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Frequently asked questions about MomentBook's travel-photo organization flow.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "This page keeps practical answers short: upload, organize, cleanup, publish scope, and archive handling.",
    groups: [
      {
        title: "Flow basics",
        description: "What MomentBook does from trip end to recap.",
        items: [
          {
            question: "What is MomentBook for?",
            answer: "It turns mixed travel photos into one timeline and map recap.",
          },
          {
            question: "Do I upload photos one by one?",
            answer: "No. The main flow starts with a single batch upload.",
          },
          {
            question: "What happens after upload?",
            answer: "Photos are auto-organized by date and time.",
          },
          {
            question: "Can I fix wrongly organized photos?",
            answer: "Yes. You can remove unrelated photos and adjust grouped sections manually.",
          },
        ],
      },
      {
        title: "Visibility and archive",
        description: "How publish visibility and backup behave.",
        items: [
          {
            question: "Is everything public by default?",
            answer: "No. Journeys are private by default and publishing is optional.",
          },
          {
            question: "Can I keep a copy without publishing?",
            answer: "Yes. You can export a ZIP with images and metadata.",
          },
          {
            question: "What does MomentBook Web provide?",
            answer: "Public journeys, moments, photos, and user profiles are available as read-only pages.",
          },
        ],
      },
    ],
    calloutPrefix: "Need account or technical help? ",
    calloutLink: "Contact support",
    calloutSuffix: ".",
  },
  ko: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "MomentBook 여행 사진 정리 흐름에 대한 자주 묻는 질문입니다.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "업로드, 자동 정리, 보정, 공개 범위, 보관 방식까지 필요한 답변만 짧게 정리했습니다.",
    groups: [
      {
        title: "핵심 흐름",
        description: "여행 종료 후 회상 결과까지의 기본 동작입니다.",
        items: [
          {
            question: "MomentBook은 어떤 앱인가요?",
            answer: "흩어진 여행 사진을 하나의 타임라인과 지도 회상으로 정리하는 앱입니다.",
          },
          {
            question: "사진을 하나씩 올려야 하나요?",
            answer: "아니요. 핵심은 여행 사진을 한 번에 일괄 업로드하는 방식입니다.",
          },
          {
            question: "업로드 후에는 무엇이 일어나나요?",
            answer: "사진이 날짜와 시간 기준으로 자동 정리됩니다.",
          },
          {
            question: "잘못 정리된 사진은 수정할 수 있나요?",
            answer: "네. 불필요한 사진을 제거하고 잘못 묶인 구간을 수동 보정할 수 있습니다.",
          },
        ],
      },
      {
        title: "공개와 보관",
        description: "게시 공개 범위와 백업 관련 동작입니다.",
        items: [
          {
            question: "기본 공개인가요?",
            answer: "아니요. 기본은 비공개이며 게시는 선택입니다.",
          },
          {
            question: "게시하지 않고 보관할 수 있나요?",
            answer: "네. 이미지와 메타데이터를 ZIP으로 내보낼 수 있습니다.",
          },
          {
            question: "웹에서는 무엇을 제공하나요?",
            answer: "공개된 여정, 모먼트, 사진, 프로필을 읽기 전용 페이지로 제공합니다.",
          },
        ],
      },
    ],
    calloutPrefix: "계정 또는 기술 지원이 필요하면 ",
    calloutLink: "지원팀에 문의",
    calloutSuffix: "해 주세요.",
  },
};

function getFaqContent(lang: Language): FAQContent {
  if (lang === "ko") {
    return faqContent.ko;
  }

  return faqContent.en;
}

function flattenItems(groups: FAQGroup[]): FAQItem[] {
  return groups.flatMap((group) => group.items);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);
  const path = "/faq";

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

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/faq"), siteUrl).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: flattenItems(content.groups).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className={faqStyles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <header className={faqStyles.header}>
        <span className={faqStyles.headerBadge}>FAQ</span>
        <h1 className={faqStyles.title}>{content.pageTitle}</h1>
        <p className={faqStyles.subtitle}>{content.pageSubtitle}</p>
      </header>

      <div className={faqStyles.groupStack}>
        {content.groups.map((group, groupIndex) => (
          <section key={group.title} className={faqStyles.group}>
            <header className={faqStyles.groupHeader}>
              <span className={faqStyles.groupBadge}>
                {lang === "ko" ? `섹션 ${groupIndex + 1}` : `Section ${groupIndex + 1}`}
              </span>
              <h2 className={faqStyles.groupTitle}>{group.title}</h2>
              <p className={faqStyles.groupDescription}>{group.description}</p>
            </header>

            <div className={faqStyles.faqGrid}>
              {group.items.map((faq, itemIndex) => (
                <article key={faq.question} className={faqStyles.faqItem}>
                  <div className={faqStyles.faqQuestionRow}>
                    <span className={faqStyles.faqIndex}>{groupIndex + 1}.{itemIndex + 1}</span>
                    <h3 className={faqStyles.faqQuestion}>{faq.question}</h3>
                  </div>
                  <p className={faqStyles.faqAnswer}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className={faqStyles.callout}>
        <p>
          {content.calloutPrefix}
          <Link href={`/${lang}/support`} className={faqStyles.link}>
            {content.calloutLink}
          </Link>
          {content.calloutSuffix}
        </p>
      </aside>
    </main>
  );
}
