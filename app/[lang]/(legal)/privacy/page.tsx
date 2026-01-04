import type { Metadata } from "next";
import styles from "@/styles/common.module.scss";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MomentBook handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <header>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Your moments are yours. MomentBook doesn't share, sell, or analyze your data.
          </p>
        </header>

        <div className={styles.textContent}>
          <h2 className={styles.heading2}>What we collect</h2>

          <p>
            MomentBook stores the moments you choose to record. This data lives on your device and in your personal cloud storage (if you enable sync).
          </p>

          <h2 className={styles.heading2}>What we don't do</h2>

          <ul className={styles.list}>
            <li>We don't read your moments</li>
            <li>We don't share your data with third parties</li>
            <li>We don't use your content for training or analytics</li>
            <li>We don't track your behavior across apps or websites</li>
          </ul>

          <h2 className={styles.heading2}>Your control</h2>

          <p>
            You can export or delete your data at any time. Nothing is permanent unless you choose it to be.
          </p>

          <p className={styles.note}>
            Last updated: January 2026
          </p>
        </div>
      </article>
    </div>
  );
}
