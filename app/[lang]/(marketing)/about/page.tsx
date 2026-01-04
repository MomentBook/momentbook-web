import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "About",
  description: "What MomentBook is, and what it is not.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <FadeIn>
          <h1 className={styles.title}>What MomentBook is</h1>
          <p className={styles.subtitle}>And what it is not.</p>
        </FadeIn>
      </header>

      {/* Section: What it is */}
      <section className={styles.section}>
        <FadeIn>
          <div className={styles.visual}>
            <DeviceMock>
              <span>Movement remembered</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className={styles.text}>
            <p>
              MomentBook is a quiet journal for movement. It remembers where you've been.
            </p>
            <p>
              You don't need to write. Take photos when something feels worth keeping. The app gathers the rest.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section: Who it's for */}
      <section className={styles.section}>
        <FadeIn delay={100}>
          <div className={styles.text}>
            <h2 className={styles.heading}>Who this might fit</h2>
            <p>
              You might find this useful if you move through the world and want a record that doesn't feel like work.
            </p>
            <p>
              If you've ever wondered, "Where was I that afternoon?"—this exists for that question.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className={styles.visual}>
            <DeviceMock>
              <span>Quiet noticing</span>
            </DeviceMock>
          </div>
        </FadeIn>
      </section>

      {/* Section: What it's not */}
      <section className={styles.section}>
        <FadeIn>
          <div className={styles.visual}>
            <DeviceMock>
              <span>No expectations</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className={styles.text}>
            <h2 className={styles.heading}>What it is not</h2>
            <p>
              Not a diary. Not a habit tracker. Not a productivity tool.
            </p>
            <p>
              No feed, no followers, no engagement metrics. What you gather is yours first.
            </p>
            <p>
              This app doesn't want to change you. It wants to see what you're already doing.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section: How it works */}
      <section className={styles.section}>
        <FadeIn delay={100}>
          <div className={styles.text}>
            <h2 className={styles.heading}>How it understands your day</h2>
            <p>
              A day is made of movement. You're at home, then traveling, then somewhere else.
            </p>
            <p>
              The app watches these transitions quietly. When the day ends, it shows you the shape your day took.
            </p>
            <p>
              This happens automatically. Nothing to configure.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className={styles.visual}>
            <DeviceMock>
              <span>Automatic shape</span>
            </DeviceMock>
          </div>
        </FadeIn>
      </section>

      {/* Section: Privacy */}
      <section className={styles.privacySection}>
        <FadeIn>
          <h2 className={styles.heading}>Privacy and your data</h2>
          <p>
            Your photos, your locations, your days—they live on your device, under your control.
          </p>
          <p>
            No analytics. No tracking. No third parties.
          </p>
          <p className={styles.emphasized}>
            Privacy isn't a feature. It's the foundation.
          </p>
        </FadeIn>
      </section>

      {/* Section: Who it's not for */}
      <section className={styles.closingSection}>
        <FadeIn>
          <h2 className={styles.heading}>Who this may not fit</h2>
          <p>
            If you're looking for long-form writing, social features, or habit tracking—this intentionally doesn't provide that.
          </p>
          <p className={styles.emphasized}>
            Some people won't need this. That's okay. It exists for those who recognize themselves in it.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
