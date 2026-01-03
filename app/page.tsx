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
        <section className={styles.intro}>
          <h1 className={styles.title}>An app that quietly remembers your day.</h1>
          <p className={styles.subtitle}>
            MomentBook creates space for noticing. It doesn't ask you to be productive or optimized. It simply holds what you choose to remember.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>You might find this useful if...</h2>
          <ul className={styles.list}>
            <li>You notice small moments that don't fit anywhere else</li>
            <li>You want to remember days, not tasks</li>
            <li>You prefer observation over optimization</li>
            <li>You value quietness over performance</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Explore</h2>
          <div className={styles.grid}>
            <article>
              <Link href="/journeys/a-quiet-morning" className={styles.card}>
                <h3 className={styles.cardTitle}>A Quiet Morning</h3>
                <p className={styles.cardDescription}>
                  The stillness before the day begins.
                </p>
              </Link>
            </article>
            <article>
              <Link href="/places/familiar-spaces" className={styles.card}>
                <h3 className={styles.cardTitle}>Familiar Spaces</h3>
                <p className={styles.cardDescription}>
                  The rooms and corners you return to.
                </p>
              </Link>
            </article>
          </div>
        </section>

        <div className={styles.downloadSection}>
          <Link href="/download" className={styles.downloadButton}>
            Download MomentBook
          </Link>
        </div>
      </div>
    </div>
  );
}
