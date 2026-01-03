import type { Metadata } from "next";
import styles from "@/styles/common.module.scss";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of use for MomentBook.",
};

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <header>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            By using MomentBook, you agree to these terms.
          </p>
        </header>

        <div className={styles.textContent}>
          <h2 className={styles.heading2}>Your content</h2>

          <p>
            Everything you record in MomentBook belongs to you. We don't claim ownership, and we don't have access to it.
          </p>

          <h2 className={styles.heading2}>How you can use the app</h2>

          <p>
            MomentBook is for personal, non-commercial use. You're welcome to use it however makes sense for you, as long as you're not harming others or violating laws.
          </p>

          <h2 className={styles.heading2}>No guarantees</h2>

          <p>
            We work to keep MomentBook reliable and secure, but we can't guarantee it will always be available or error-free. Use the app at your own discretion.
          </p>

          <h2 className={styles.heading2}>Changes</h2>

          <p>
            We may update these terms from time to time. If we make significant changes, we'll let you know through the app.
          </p>

          <p className={styles.note}>
            Last updated: January 2026
          </p>
        </div>
      </article>
    </div>
  );
}
