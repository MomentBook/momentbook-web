import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { SocialChannelLinks } from "@/components/SocialChannelLinks";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Language } from "@/lib/i18n/config";
import styles from "./layout.module.scss";

type ChromeDictionary = Awaited<ReturnType<typeof getDictionary>>;

type FooterLink = {
  href: string;
  label: string;
};

type FooterColumnProps = {
  heading: string;
  links: FooterLink[];
};

type ChromeFooterProps = {
  lang: Language;
  dict: ChromeDictionary;
  journeysLabel: string;
  supportEmail: string;
};

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerHeading}>
        {heading}
      </h3>
      <ul className={styles.footerList}>
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("mailto:") ? (
              <a href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChromeFooter({
  lang,
  dict,
  journeysLabel,
  supportEmail,
}: ChromeFooterProps) {
  const footerColumns = [
    {
      heading: dict.footer.sections.product,
      links: [
        { href: `/${lang}/journeys`, label: journeysLabel },
        { href: `/${lang}/faq`, label: dict.nav.faq },
      ],
    },
    {
      heading: dict.footer.sections.support,
      links: [
        { href: `/${lang}/support`, label: dict.footer.links.support },
        { href: `mailto:${supportEmail}`, label: dict.footer.email },
      ],
    },
    {
      heading: dict.footer.sections.legal,
      links: [
        { href: `/${lang}/privacy`, label: dict.footer.links.privacy },
        { href: `/${lang}/terms`, label: dict.footer.links.terms },
        {
          href: `/${lang}/community-guidelines`,
          label: dict.footer.links.communityGuidelines,
        },
        {
          href: `/${lang}/marketing-consent`,
          label: dict.footer.links.marketingConsent,
        },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <section className={styles.footerLead}>
          <div className={styles.footerHeroTop}>
            <Link
              href={`/${lang}`}
              className={styles.footerLogo}
            >
              <MomentBookLogo
                className={styles.logoMark}
                iconClassName={styles.logoIcon}
                wordmarkClassName={styles.logoWordmark}
                hideIcon
              />
            </Link>

            <p className={styles.footerSummary}>
              {dict.footer.summary}
            </p>
          </div>
          <div className={styles.footerActions}>
            <DownloadActionButton
              lang={lang}
              className={styles.footerButton}
            >
              {dict.footer.ctaPrimary}
            </DownloadActionButton>
            <Link
              href={`/${lang}/support`}
              className={styles.footerButtonGhost}
            >
              {dict.footer.ctaSecondary}
            </Link>
          </div>
          <div className={styles.footerSocialRow}>
            <SocialChannelLinks
              ariaLabel={dict.footer.social.groupLabel}
              linkLabels={dict.footer.social.links}
            />
          </div>
        </section>

        <div className={styles.footerTop}>
          <div className={styles.footerGrid}>
            {footerColumns.map((column) => (
              <FooterColumn
                key={column.heading}
                heading={column.heading}
                links={column.links}
              />
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
