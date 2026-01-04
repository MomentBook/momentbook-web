import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/styles/common.module.scss";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with MomentBook.",
};

export default function SupportPage() {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <header>
          <h1 className={styles.title}>Support</h1>
          <p className={styles.subtitle}>
            If you need help with MomentBook, we're here.
          </p>
        </header>

        <div className={styles.textContent}>
          <h2 className={styles.heading2}>Common questions</h2>

          <p>
            You might find answers in our <Link href="/faq" className={styles.link}>FAQ</Link>.
          </p>

          <h2 className={styles.heading2}>Contact</h2>

          <p>
            For other questions or issues, you can reach us at{" "}
            <a href="mailto:support@momentbook.app" className={styles.link}>
              support@momentbook.app
            </a>
          </p>

          <p className={styles.note}>
            We typically respond within 1-2 business days.
          </p>
        </div>
      </article>
    </div>
  );
}
