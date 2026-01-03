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
            MomentBook is a quiet travel journal. It remembers where you've been and what you noticed along the way.
          </p>

          <p>
            You don't need to write. You don't need to plan. You just take photos when something feels worth keeping. The app gathers the rest—where you were, when it happened, how the pieces connect.
          </p>

          <p>
            At the end of the day, if you want, you can see your day returned to you as a gentle story. A path you walked. Moments you held. Nothing more.
          </p>

          <h2 className={styles.heading2}>Who this might fit</h2>

          <p>
            You might find MomentBook useful if you travel, wander, or simply move through your day and want a record that doesn't feel like work.
          </p>

          <p>
            If you've ever looked back and wondered, "Where was I that afternoon?" or "What was that small street?" or "When did I visit that place?"—this app exists for that question.
          </p>

          <p>
            It's for people who value the act of noticing, not the performance of documenting.
          </p>

          <h2 className={styles.heading2}>What it is not</h2>

          <p>
            MomentBook is not a diary in the traditional sense. You're not expected to write daily. You're not building a habit or maintaining a streak.
          </p>

          <p>
            It is not a productivity tool. It doesn't measure your output, track your goals, or optimize your routines. It doesn't care if you're consistent.
          </p>

          <p>
            It is not a social platform. There's no feed, no followers, no sharing mechanism. What you gather belongs to you alone.
          </p>

          <p>
            MomentBook doesn't want to change your behavior. It wants to recognize what you're already doing—moving through the world, noticing things, being somewhere.
          </p>

          <h2 className={styles.heading2}>How it understands your day</h2>

          <p>
            The app operates on a simple idea: a day is made of states. You're at home, then you're traveling, then you're at a place, then you're traveling again.
          </p>

          <p>
            MomentBook watches these transitions quietly. It doesn't interrupt. It doesn't notify. It simply keeps track, so when the day ends, it can show you the shape your day took.
          </p>

          <p>
            This happens automatically. You don't configure it. You don't set it up. It just works, the way a good tool should—present when needed, invisible otherwise.
          </p>

          <h2 className={styles.heading2}>Privacy and your data</h2>

          <p>
            Everything stays on your device by default. Your photos, your locations, your days—they live locally. Nothing is uploaded unless you choose to back it up yourself.
          </p>

          <p>
            There are no analytics. No tracking. No third parties watching what you do. The app exists to serve you, not to extract data from you.
          </p>

          <p>
            This is intentional. Privacy isn't a feature you enable. It's the foundation.
          </p>

          <h2 className={styles.heading2}>Who this may not fit</h2>

          <p>
            If you're looking for detailed journaling with long-form writing, this may not be the right tool. MomentBook is built for images and observation, not extended reflection.
          </p>

          <p>
            If you want social features—sharing your day, building an audience, seeing what others are doing—this app intentionally doesn't provide that.
          </p>

          <p>
            If you need accountability systems, habit tracking, or motivational prompts, you won't find them here. MomentBook is passive, optional, and quiet. It doesn't push.
          </p>

          <p>
            The app respects that some people won't need it, and that's okay. It exists for those who recognize themselves in its approach.
          </p>
        </div>
      </article>
    </div>
  );
}
