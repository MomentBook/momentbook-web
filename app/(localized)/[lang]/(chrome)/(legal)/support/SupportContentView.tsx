import Link from "next/link";
import styles from "./support.module.scss";
import type { Language } from "@/lib/i18n/config";
import type { SupportContent } from "./support.copy";

type SupportContentViewProps = {
  lang: Language;
  content: SupportContent;
  supportEmail: string;
};

export function SupportContentView({
  lang,
  content,
  supportEmail,
}: SupportContentViewProps) {
  return (
    <article className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.title}>{content.title}</h1>
      </header>

      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>{content.faqHeading}</h2>
        <p>
          {content.faqPrefix}
          <Link href={`/${lang}/faq`} className={styles.link}>
            {content.faqLinkLabel}
          </Link>
          {content.faqSuffix}
        </p>

        <h2 className={styles.heading2}>{content.contactHeading}</h2>
        <p>
          {content.contactPrefix}
          <a href={`mailto:${supportEmail}`} className={styles.link}>
            {supportEmail}
          </a>
          {content.contactSuffix}
        </p>
      </div>
    </article>
  );
}
