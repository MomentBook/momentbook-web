import Image from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import type { InstallLandingContent } from "@/lib/install-landing";
import { InstallSectionHeader } from "./InstallSectionHeader";
import styles from "./install.module.scss";

type InstallBenefitsSectionProps = {
  content: InstallLandingContent;
};

export function InstallBenefitsSection({ content }: InstallBenefitsSectionProps) {
  return (
    <section className={styles.section}>
      <InstallSectionHeader
        eyebrow={content.sectionBenefitsLabel}
        title={content.benefitsTitle}
        lead={content.benefitsLead}
      />

      <div className={styles.benefitGrid}>
        {content.benefits.map((benefit, index) => (
          <SectionReveal key={benefit.key} variant="item" staggerIndex={index}>
            <article className={styles.benefitCard}>
              <div className={styles.benefitMedia}>
                <Image
                  src={benefit.screenshotSrc}
                  alt=""
                  aria-hidden="true"
                  fill
                  loading="lazy"
                  sizes="(max-width: 819px) 100vw, 20rem"
                  className={styles.benefitImage}
                  style={{ objectPosition: benefit.objectPosition }}
                />
              </div>
              <div className={styles.benefitBody}>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitText}>{benefit.body}</p>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
