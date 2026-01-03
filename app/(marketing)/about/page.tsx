import type { Metadata } from "next";
import styles from "@/styles/common.module.scss";

export const metadata: Metadata = {
  title: "About",
  description: "What MomentBook is, and what it is not.",
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <header>
          <h1 className={styles.title}>What MomentBook is</h1>
          <p className={styles.subtitle}>And what it is not.</p>
        </header>

        <div className={styles.textContent}>
          <p>
            MomentBook is a quiet journal for movement. It remembers where you've been.
          </p>

          <p>
            You don't need to write. Take photos when something feels worth keeping. The app gathers the rest—where you were, when it happened.
          </p>

          <p>
            At day's end, if you want, everything returns as one gentle memory.
          </p>

          <h2 className={styles.heading2}>Who this might fit</h2>

          <p>
            You might find this useful if you move through the world and want a record that doesn't feel like work.
          </p>

          <p>
            If you've ever wondered, "Where was I that afternoon?" or "When did I visit that place?"—this exists for that question.
          </p>

          <p>
            It's for people who value noticing, not documenting.
          </p>

          <h2 className={styles.heading2}>What it is not</h2>

          <p>
            This is not a diary. You're not expected to write daily. You're not building a habit or maintaining a streak.
          </p>

          <p>
            It is not a productivity tool. It doesn't measure output, track goals, or optimize routines.
          </p>

          <p>
            It is not a social platform. There's no feed, no followers, no sharing. What you gather belongs to you.
          </p>

          <p>
            This app doesn't want to change you. It wants to see what you're already doing.
          </p>

          <h2 className={styles.heading2}>How it understands your day</h2>

          <p>
            A day is made of movement. You're at home, then traveling, then somewhere else, then traveling again.
          </p>

          <p>
            The app watches these transitions quietly. It doesn't interrupt or notify. When the day ends, it shows you the shape your day took.
          </p>

          <p>
            This happens automatically. Nothing to configure. Nothing to set up.
          </p>

          <h2 className={styles.heading2}>Privacy and your data</h2>

          <p>
            Everything stays on your device. Your photos, your locations, your days—they live locally.
          </p>

          <p>
            No analytics. No tracking. No third parties. The app exists to serve you, not extract from you.
          </p>

          <p>
            Privacy isn't a feature. It's the foundation.
          </p>

          <h2 className={styles.heading2}>Who this may not fit</h2>

          <p>
            If you're looking for long-form writing or extended reflection, this isn't the right tool. MomentBook is built for images and brief observation.
          </p>

          <p>
            If you want social features—sharing, audiences, feeds—this app intentionally doesn't provide that.
          </p>

          <p>
            If you need accountability, habit tracking, or motivation, you won't find it here. This is passive, optional, quiet.
          </p>

          <p>
            Some people won't need this. That's okay. It exists for those who recognize themselves in it.
          </p>
        </div>
      </article>
    </div>
  );
}
