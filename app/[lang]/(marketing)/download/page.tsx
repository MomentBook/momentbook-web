import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import styles from "./download.module.scss";

export const metadata: Metadata = {
  title: "Download MomentBook",
  description: "Get MomentBook for iOS and Android. A quiet space for your days, available on your phone.",
  openGraph: {
    title: "Download MomentBook",
    description: "Get MomentBook for iOS and Android. A quiet space for your days, available on your phone.",
  },
};

export default function DownloadPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section - Visual First */}
      <section className={styles.hero}>
        <FadeIn>
          <div className={styles.heroVisual}>
            <DeviceMock>
              <span>Your moments, quietly kept</span>
            </DeviceMock>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <h1 className={styles.heroTitle}>
            Download MomentBook
          </h1>
        </FadeIn>

        <FadeIn delay={250}>
          <p className={styles.heroSubtitle}>
            A quiet space for your days. Available for iPhone and Android.
          </p>
        </FadeIn>

        <FadeIn delay={350}>
          <div className={styles.downloadButtons}>
            <a href="#" className={styles.storeButton} aria-label="Download on the App Store">
              <div className={styles.storeButtonContent}>
                <span className={styles.storeButtonLabel}>Download on the</span>
                <span className={styles.storeButtonName}>App Store</span>
              </div>
            </a>
            <a href="#" className={styles.storeButton} aria-label="Get it on Google Play">
              <div className={styles.storeButtonContent}>
                <span className={styles.storeButtonLabel}>Get it on</span>
                <span className={styles.storeButtonName}>Google Play</span>
              </div>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={450}>
          <p className={styles.availability}>
            Coming soon. Links will be available when the app launches.
          </p>
        </FadeIn>
      </section>

      {/* What You Get Section */}
      <section className={styles.features}>
        <FadeIn>
          <h2 className={styles.featuresTitle}>What you get</h2>
        </FadeIn>

        <div className={styles.featureGrid}>
          <FadeIn delay={100}>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Offline first</h3>
              <p className={styles.featureText}>
                Everything lives on your device. No internet required.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Optional sync</h3>
              <p className={styles.featureText}>
                Connect your own cloud storage if you want backup or multi-device access.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Private by default</h3>
              <p className={styles.featureText}>
                No analytics, no tracking, no third parties. Your data is yours.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* System Requirements */}
      <section className={styles.requirements}>
        <FadeIn>
          <h2 className={styles.requirementsTitle}>System requirements</h2>
        </FadeIn>

        <div className={styles.requirementsList}>
          <FadeIn delay={100}>
            <div className={styles.requirement}>
              <h3 className={styles.requirementPlatform}>iOS</h3>
              <p className={styles.requirementDetails}>
                Requires iOS 16.0 or later
                <br />
                Compatible with iPhone and iPad
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className={styles.requirement}>
              <h3 className={styles.requirementPlatform}>Android</h3>
              <p className={styles.requirementDetails}>
                Requires Android 10.0 or later
                <br />
                Compatible with most Android devices
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Privacy Note */}
      <section className={styles.privacy}>
        <FadeIn>
          <p className={styles.privacyText}>
            MomentBook doesn't collect usage data, track behavior, or share information with third parties.
            <br />
            What you record stays with you.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
