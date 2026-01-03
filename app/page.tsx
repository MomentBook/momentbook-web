import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "MomentBook",
  description: "An app that quietly remembers your day.",
};

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero - Large visual, minimal text */}
      <section className={styles.hero}>
        <FadeIn>
          <DeviceMock>
            <span>A day remembered</span>
          </DeviceMock>
        </FadeIn>
        <FadeIn delay={200}>
          <h1 className={styles.heroTitle}>Your day, quietly kept</h1>
        </FadeIn>
      </section>

      {/* Flow Section 1 - Photos */}
      <section className={styles.flow}>
        <FadeIn>
          <div className={styles.flowVisual}>
            <DeviceMock>
              <span>A photo, nothing more</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <p className={styles.flowText}>Take a photo when something feels worth keeping.</p>
        </FadeIn>
      </section>

      {/* Flow Section 2 - Movement */}
      <section className={styles.flow}>
        <FadeIn>
          <div className={styles.flowVisual}>
            <DeviceMock>
              <span>Paths form</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <p className={styles.flowText}>The app notices where you go.</p>
        </FadeIn>
      </section>

      {/* Flow Section 3 - Recap */}
      <section className={styles.flow}>
        <FadeIn>
          <div className={styles.flowVisual}>
            <DeviceMock>
              <span>Evening arrives</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <p className={styles.flowText}>When the day ends, everything gathers into one gentle story.</p>
        </FadeIn>
      </section>

      {/* Emotional Pause */}
      <section className={styles.pause}>
        <FadeIn>
          <p className={styles.pauseText}>
            Nothing is required.
            <br />
            Some days you'll open it.
            <br />
            Some days you won't.
          </p>
        </FadeIn>
      </section>

      {/* Privacy Note */}
      <section className={styles.privacy}>
        <FadeIn>
          <p className={styles.privacyText}>
            Private by default. Your journey is yours first.
          </p>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <FadeIn>
          <div className={styles.ctaVisual}>
            <DeviceMock>
              <span>Waiting quietly</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className={styles.ctaActions}>
            <Link href="/download" className={styles.ctaButton}>
              Get the app
            </Link>
            <Link href="/how-it-works" className={styles.ctaSecondary}>
              See how it works
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
