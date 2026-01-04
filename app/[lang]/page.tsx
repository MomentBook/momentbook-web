import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import styles from "./page.module.scss";
import { type Language } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "MomentBook",
  description: "An app that quietly remembers your day.",
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const dict = await getDictionary(lang);

  return (
    <div className={styles.page}>
      {/* Hero - Large visual, minimal text */}
      <section className={styles.hero}>
        <FadeIn>
          <DeviceMock>
            <span>{dict.home.hero.deviceText}</span>
          </DeviceMock>
        </FadeIn>
        <FadeIn delay={200}>
          <h1 className={styles.heroTitle}>{dict.home.hero.title}</h1>
        </FadeIn>
      </section>

      {/* Flow Section 1 - Photos */}
      <section className={styles.flow}>
        <FadeIn>
          <div className={styles.flowVisual}>
            <DeviceMock>
              <span>{dict.home.flow.photo.deviceText}</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <p className={styles.flowText}>{dict.home.flow.photo.text}</p>
        </FadeIn>
      </section>

      {/* Flow Section 2 - Movement */}
      <section className={styles.flow}>
        <FadeIn>
          <div className={styles.flowVisual}>
            <DeviceMock>
              <span>{dict.home.flow.moment.deviceText}</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <p className={styles.flowText}>{dict.home.flow.moment.text}</p>
        </FadeIn>
      </section>

      {/* Flow Section 3 - Recap */}
      <section className={styles.flow}>
        <FadeIn>
          <div className={styles.flowVisual}>
            <DeviceMock>
              <span>{dict.home.flow.memory.deviceText}</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <p className={styles.flowText}>{dict.home.flow.memory.text}</p>
        </FadeIn>
      </section>

      {/* Emotional Pause */}
      <section className={styles.pause}>
        <FadeIn>
          <p className={styles.pauseText}>{dict.home.pause.text}</p>
        </FadeIn>
      </section>

      {/* Privacy Note */}
      <section className={styles.privacy}>
        <FadeIn>
          <p className={styles.privacyText}>{dict.home.privacy.text}</p>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <FadeIn>
          <div className={styles.ctaVisual}>
            <DeviceMock>
              <span>{dict.home.cta.deviceText}</span>
            </DeviceMock>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className={styles.ctaActions}>
            <Link href={`/${lang}/download`} className={styles.ctaButton}>
              {dict.home.cta.primaryButton}
            </Link>
            <Link href={`/${lang}/how-it-works`} className={styles.ctaSecondary}>
              {dict.common.learnMore}
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
