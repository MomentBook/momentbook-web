import type { Metadata } from "next";
import Link from "next/link";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { flattenFaqItems, getFaqContent } from "@/lib/marketing/faq-content";
import {
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import {
  buildAbsoluteTitle,
  buildOpenGraphBase,
  buildPublicRobots,
  buildSeoDescription,
} from "@/lib/seo/public-metadata";
import styles from "./faq.module.scss";

const faqSeoContextByLanguage: Record<Language, string> = {
  en: "Answers about batch-uploading trip photos, organizing them by time and place, optional publishing, and the public web archive.",
  ko: "여행 사진 일괄 업로드, 시간·장소 기준 정리, 선택적 게시, 공개 웹 아카이브에 대한 답변을 담고 있습니다.",
  ja: "旅行写真の一括アップロード、時間と場所による整理、任意の公開、公開 Web アーカイブに関する回答をまとめています。",
  zh: "包含关于旅行照片批量上传、按时间与地点整理、可选公开以及网页公开档案的说明。",
  es: "Incluye respuestas sobre carga por lotes de fotos de viaje, organización por tiempo y lugar, publicación opcional y archivo web público.",
  pt: "Reúne respostas sobre envio em lote de fotos de viagem, organização por tempo e lugar, publicação opcional e arquivo público na web.",
  fr: "Réunit des réponses sur l'import groupé de photos de voyage, l'organisation par date et lieu, la publication facultative et l'archive web publique.",
  th: "รวมคำตอบเกี่ยวกับการอัปโหลดรูปทริปแบบครั้งเดียว การจัดตามเวลาและสถานที่ การเผยแพร่แบบเลือกได้ และคลังสาธารณะบนเว็บ",
  vi: "Tổng hợp câu trả lời về tải ảnh chuyến đi theo lô, sắp xếp theo thời gian và địa điểm, đăng công khai tùy chọn và kho lưu trữ công khai trên web.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);
  const path = "/faq";
  const title = buildAbsoluteTitle(content.metaTitle);
  const description = buildSeoDescription([
    content.metaDescription,
    faqSeoContextByLanguage[lang] ?? faqSeoContextByLanguage.en,
  ]);

  return {
    title,
    description,
    applicationName: "MomentBook",
    creator: "MomentBook",
    publisher: "MomentBook",
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      ...buildOpenGraphBase(lang, path),
      type: "website",
      title: content.metaTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: content.metaTitle,
      description,
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
  const faqItems = flattenFaqItems(content.groups);
  const siteUrl = resolveStructuredDataSiteUrl();
  const pageUrl = buildStructuredDataUrl(buildOpenGraphUrl(lang, "/faq"), siteUrl);
  const description = buildSeoDescription([
    content.metaDescription,
    faqSeoContextByLanguage[lang] ?? faqSeoContextByLanguage.en,
  ]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: content.metaTitle,
    description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <header className={styles.header}>
        <h1 className={styles.title}>{content.pageTitle}</h1>
        <p className={styles.subtitle}>{content.pageSubtitle}</p>
      </header>

      <div className={styles.groups}>
        {content.groups.map((group, groupIndex) => (
          <section
            key={`${group.title}-${groupIndex}`}
            className={styles.group}
            aria-labelledby={`faq-group-${groupIndex}`}
          >
            <header className={styles.groupHeader}>
              <h2 id={`faq-group-${groupIndex}`} className={styles.groupTitle}>
                {group.title}
              </h2>
              <p className={styles.groupDescription}>{group.description}</p>
            </header>

            <div className={styles.faqList}>
              {group.items.map((faq, index) => (
                <details key={`${faq.question}-${index}`} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.question}</summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className={styles.callout}>
        {content.calloutPrefix}
        <Link href={`/${lang}/support`} className={styles.calloutLink}>
          {content.calloutLink}
        </Link>
        {content.calloutSuffix}
      </p>
    </div>
  );
}
