import type { Metadata } from "next";
import Link from "next/link";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { flattenFaqItems, getFaqContent } from "@/lib/marketing/faq-content";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import styles from "./faq.module.scss";

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
  const faqItems = flattenFaqItems(content.groups);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/faq"), siteUrl).toString();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
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
