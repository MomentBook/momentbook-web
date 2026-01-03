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
          <h1 className={styles.heroTitle}>A quiet space for your day</h1>
          <p className={styles.heroSubtitle}>
            MomentBook is a travel journal that remembers where you've been. You live your day. The app quietly gathers the pieces.
          </p>
        </section>

        {/* Key Ideas - Not Features */}
        <section className={styles.ideas}>
          <div className={styles.idea}>
            <h2 className={styles.ideaTitle}>Just take photos</h2>
            <p className={styles.ideaText}>
              When something catches your eye, take a photo. You don't need to write anything. The image and the moment are enough.
            </p>
          </div>

          <div className={styles.idea}>
            <h2 className={styles.ideaTitle}>Your steps become a path</h2>
            <p className={styles.ideaText}>
              The app notices where you go. Over time, your movements form quiet maps of the places that matter.
            </p>
          </div>

          <div className={styles.idea}>
            <h2 className={styles.ideaTitle}>A gentle recap at night</h2>
            <p className={styles.ideaText}>
              Before you sleep, the day returns as a simple story. Nothing is demanded. It's just there if you want to see it.
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
            MomentBook isn't about tracking or optimizing. It's about noticing you were somewhere, and that it happened. Some days you'll use it. Some days you won't. The app doesn't mind either way.
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
