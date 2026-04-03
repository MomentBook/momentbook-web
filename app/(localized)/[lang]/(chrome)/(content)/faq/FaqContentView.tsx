import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import type { getFaqContent } from "@/lib/marketing/faq-content";
import styles from "./faq.module.scss";

type FaqContent = ReturnType<typeof getFaqContent>;

type FaqContentViewProps = {
  lang: Language;
  content: FaqContent;
};

export function FaqContentView({
  lang,
  content,
}: FaqContentViewProps) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{content.pageTitle}</h1>
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
    </>
  );
}
