import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "MomentBook",
  description: "An app that quietly remembers your day.",
};

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>A place for your day to rest</h1>
          <p className={styles.heroSubtitle}>
            You move through the world. MomentBook quietly remembers where you've been.
          </p>
        </section>

        {/* Key Ideas - Not Features */}
        <section className={styles.ideas}>
          <div className={styles.idea}>
            <h2 className={styles.ideaTitle}>You don't need to write</h2>
            <p className={styles.ideaText}>
              Take a photo when something feels worth keeping. The image is enough.
            </p>
          </div>

          <div className={styles.idea}>
            <h2 className={styles.ideaTitle}>Your movement becomes memory</h2>
            <p className={styles.ideaText}>
              The app notices where you go. Over time, a quiet map forms.
            </p>
          </div>

          <div className={styles.idea}>
            <h2 className={styles.ideaTitle}>Your day returns at night</h2>
            <p className={styles.ideaText}>
              When the day ends, everything gathers into one gentle story. Nothing is required of you.
            </p>
          </div>
        </section>

        {/* Privacy Note */}
        <aside className={styles.privacyNote}>
          <p className={styles.privacyText}>
            Private by default. No sharing pressure. What you remember stays with you.
          </p>
        </aside>

        {/* How It Feels */}
        <section className={styles.feeling}>
          <p className={styles.feelingText}>
            This isn't about tracking or optimizing. It's about noticing you were somewhere. Some days you'll open it. Some days you won't.
          </p>
        </section>

        {/* CTA */}
        <div className={styles.cta}>
          <Link href="/download" className={styles.ctaButton}>
            Get the app
          </Link>
          <Link href="/how-it-works" className={styles.ctaSecondary}>
            See how it works
          </Link>
        </div>
      </div>
    </div>
  );
}
