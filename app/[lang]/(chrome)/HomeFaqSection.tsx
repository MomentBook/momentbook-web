import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import { type FAQContent } from "@/lib/marketing/faq-content";
import { type Language } from "@/lib/i18n/config";
import styles from "./page.module.scss";

type HomeFaqSectionProps = {
  lang: Language;
  content: FAQContent;
};

export function HomeFaqSection({ lang, content }: HomeFaqSectionProps) {
  return (
    <section
      id={HOME_SECTION_IDS.faq}
      tabIndex={-1}
      className={`${styles.homeSection} ${styles.faqSection}`}
      aria-labelledby="faq-title"
    >
      <FadeIn delay={140}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>{content.pageTitle}</p>
          <h2 id="faq-title" className={styles.sectionTitle}>
            {content.pageTitle}
          </h2>
          <p className={styles.sectionLead}>{content.pageSubtitle}</p>
        </div>
      </FadeIn>

      <div className={styles.faqGroups}>
        {content.groups.map((group, groupIndex) => (
          <FadeIn key={`${group.title}-${groupIndex}`} delay={180 + groupIndex * 60}>
            <article className={styles.faqGroupCard}>
              <header className={styles.faqGroupHeader}>
                <h3 className={styles.faqGroupTitle}>{group.title}</h3>
                <p className={styles.faqGroupDescription}>{group.description}</p>
              </header>

              <div className={styles.faqList}>
                {group.items.map((faq, index) => (
                  <details key={`${faq.question}-${index}`} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{faq.question}</summary>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={320}>
        <p className={styles.faqCallout}>
          {content.calloutPrefix}
          <Link href={`/${lang}/support`} className={styles.faqCalloutLink}>
            {content.calloutLink}
          </Link>
          {content.calloutSuffix}
        </p>
      </FadeIn>
    </section>
  );
}
