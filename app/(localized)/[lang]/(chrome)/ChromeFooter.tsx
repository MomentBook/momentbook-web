import Link from "next/link";
import { AnalyticsLink } from "@/components/AnalyticsLink";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { SocialChannelLinks } from "@/components/SocialChannelLinks";
import { PUBLIC_WEB_EVENTS } from "@/lib/analytics/public-web";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Language } from "@/lib/i18n/config";
import styles from "./layout.module.scss";

type ChromeDictionary = Awaited<ReturnType<typeof getDictionary>>;

type FooterLink = {
  href: string;
  label: string;
  linkId: string;
};

type FooterColumnProps = {
  lang: Language;
  sectionId: "product" | "support" | "legal";
  heading: string;
  links: FooterLink[];
};

type ChromeFooterProps = {
  lang: Language;
  dict: ChromeDictionary;
  journeysLabel: string;
  supportEmail: string;
};

function FooterColumn({ lang, sectionId, heading, links }: FooterColumnProps) {
  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerHeading}>
        {heading}
      </h3>
      <ul className={styles.footerList}>
        {links.map((link) => (
          <li key={link.href}>
            <AnalyticsLink
              lang={lang}
              href={link.href}
              className={styles.footerLink}
              analyticsEvent={PUBLIC_WEB_EVENTS.navigationLinkClick}
              analyticsParams={{
                surface: "footer",
                link_group: sectionId,
                link_id: link.linkId,
                link_kind: "footer_column",
              }}
            >
              {link.label}
            </AnalyticsLink>
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
      sectionId: "product" as const,
      heading: dict.footer.sections.product,
      links: [
        { href: `/${lang}/journeys`, label: journeysLabel, linkId: "journeys" },
        { href: `/${lang}/faq`, label: dict.nav.faq, linkId: "faq" },
      ],
    },
    {
      sectionId: "support" as const,
      heading: dict.footer.sections.support,
      links: [
        { href: `/${lang}/support`, label: dict.footer.links.support, linkId: "support" },
        { href: `mailto:${supportEmail}`, label: dict.footer.email, linkId: "email" },
      ],
    },
    {
      sectionId: "legal" as const,
      heading: dict.footer.sections.legal,
      links: [
        { href: `/${lang}/privacy`, label: dict.footer.links.privacy, linkId: "privacy" },
        { href: `/${lang}/terms`, label: dict.footer.links.terms, linkId: "terms" },
        {
          href: `/${lang}/community-guidelines`,
          label: dict.footer.links.communityGuidelines,
          linkId: "community_guidelines",
        },
        {
          href: `/${lang}/marketing-consent`,
          label: dict.footer.links.marketingConsent,
          linkId: "marketing_consent",
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
          </div>
          <div className={styles.footerActions}>
            <DownloadActionButton
              lang={lang}
              className={styles.footerButton}
              analyticsSurface="footer"
            >
              {dict.footer.ctaPrimary}
            </DownloadActionButton>
            <AnalyticsLink
              lang={lang}
              href={`/${lang}/support`}
              className={styles.footerButtonGhost}
              analyticsEvent={PUBLIC_WEB_EVENTS.navigationLinkClick}
              analyticsParams={{
                surface: "footer",
                link_group: "support",
                link_id: "support_cta",
                link_kind: "footer_cta",
              }}
            >
              {dict.footer.ctaSecondary}
            </AnalyticsLink>
          </div>
          <div className={styles.footerSocialRow}>
            <SocialChannelLinks
              lang={lang}
              ariaLabel={dict.footer.social.groupLabel}
              linkLabels={dict.footer.social.links}
            />
          </div>
        </section>

        <div className={styles.footerTop}>
          <div className={styles.footerGrid}>
            {footerColumns.map((column) => (
              <FooterColumn
                key={column.sectionId}
                lang={lang}
                sectionId={column.sectionId}
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
