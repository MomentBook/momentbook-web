import type { Metadata } from "next";
import styles from "@/styles/common.module.scss";

export const metadata: Metadata = {
  title: "Download",
  description: "Get MomentBook for iOS and Android.",
};

export default function DownloadPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <h1 className={styles.title}>Download MomentBook</h1>
          <p className={styles.subtitle}>
            MomentBook is available for iOS and Android.
          </p>
        </header>

        <div className={styles.buttonGroup}>
          <a href="#" className={styles.button}>
            Download on the App Store
          </a>
          <a href="#" className={styles.button}>
            Get it on Google Play
          </a>
        </div>

        <p className={styles.note}>
          Links will be available when the app launches.
        </p>
      </div>
    </div>
  );
}
