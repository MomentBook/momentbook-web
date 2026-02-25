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

type FAQContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  calloutPrefix: string;
  calloutLink: string;
  calloutSuffix: string;
  items: FAQItem[];
};

const faqContent: { en: FAQContent; ko: FAQContent } = {
  en: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Simple answers about MomentBook's core travel-photo flow.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "Short answers for one flow: upload, organize, clean up, timeline, map.",
    calloutPrefix: "Need more help? ",
    calloutLink: "Contact support",
    calloutSuffix: " for account or technical issues.",
    items: [
      {
        question: "What is MomentBook for?",
        answer:
          "It turns mixed travel photos into one clear timeline and map recap.",
      },
      {
        question: "Do I need to upload photos one by one?",
        answer:
          "No. The main flow starts with one batch upload of all travel photos.",
      },
      {
        question: "What happens after upload?",
        answer:
          "Photos are auto-organized by date and time.",
      },
      {
        question: "Can I fix wrongly organized photos?",
        answer:
          "Yes. You can manually remove receipts or unrelated shots and adjust grouped items.",
      },
      {
        question: "What does the final result look like?",
        answer:
          "A complete travel timeline and map pins for recall.",
      },
      {
        question: "Is everything public by default?",
        answer:
          "No. Journeys are private by default. Publishing is optional.",
      },
      {
        question: "Can I keep a copy without publishing?",
        answer:
          "Yes. Export a ZIP (images + metadata) for archive or direct sharing.",
      },
    ],
  },
  ko: {
    metaTitle: "MomentBook FAQ",
    metaDescription: "MomentBook 핵심 여행 사진 정리 흐름에 대한 간단한 답변입니다.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle:
      "업로드, 자동 정리, 수동 보정, 타임라인, 지도 회상만 짧게 설명합니다.",
    calloutPrefix: "추가 도움이 필요하면 ",
    calloutLink: "지원팀에 문의",
    calloutSuffix: "해 주세요.",
    items: [
      {
        question: "MomentBook은 어떤 앱인가요?",
        answer:
          "흩어진 여행 사진을 타임라인과 지도 회상으로 정리하는 앱입니다.",
      },
      {
        question: "사진을 하나씩 올려야 하나요?",
        answer: "아니요. 핵심 흐름은 여행 사진 전체를 한 번에 일괄 업로드하는 방식입니다.",
      },
      {
        question: "업로드 후에는 무엇이 일어나나요?",
        answer: "사진이 날짜와 시간 기준으로 자동 정리됩니다.",
      },
      {
        question: "잘못 정리된 사진은 수정할 수 있나요?",
        answer: "네. 영수증이나 기타 잘못 분류된 사진을 수동으로 정리할 수 있습니다.",
      },
      {
        question: "최종 결과는 어떻게 보이나요?",
        answer: "완성된 타임라인과 지도 핀으로 여행을 회상할 수 있습니다.",
      },
      {
        question: "기본 공개인가요?",
        answer: "아니요. 기본은 비공개이며 게시는 선택입니다.",
      },
      {
        question: "게시하지 않고도 보관할 수 있나요?",
        answer:
          "네. 이미지와 메타데이터 ZIP으로 내보내 보관하거나 직접 공유할 수 있습니다.",
      },
    ],
  },
};

function getFaqContent(lang: Language): FAQContent {
  if (lang === "ko") {
    return faqContent.ko;
  }

  return faqContent.en;
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
    mainEntity: content.items.map((item) => ({
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
        <h1 className={faqStyles.title}>{content.pageTitle}</h1>
        <p className={faqStyles.subtitle}>{content.pageSubtitle}</p>
      </header>

      <div className={faqStyles.faqGrid}>
        {content.items.map((faq) => (
          <section key={faq.question} className={faqStyles.faqItem}>
            <h2 className={faqStyles.faqQuestion}>{faq.question}</h2>
            <p className={faqStyles.faqAnswer}>{faq.answer}</p>
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
