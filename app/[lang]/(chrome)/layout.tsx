import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import styles from "./layout.module.scss";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { SocialChannelLinks } from "@/components/SocialChannelLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { ScrollHeader } from "@/components/ScrollHeader";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Language } from "@/lib/i18n/config";

const supportEmail =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";

const journeysNavLabelMap: Record<Language, string> = {
    en: "Journeys",
    ko: "여정",
    ja: "旅",
    zh: "行程",
    es: "Viajes",
    pt: "Jornadas",
    fr: "Voyages",
    th: "ทริป",
    vi: "Hành trình",
};

export default async function ChromeLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = (await params) as { lang: Language };
    const dict = await getDictionary(lang);
    const journeysNavLabel =
        journeysNavLabelMap[lang] ?? journeysNavLabelMap.en;

    return (
        <>
            <ScrollHeader className={styles.header}>
                <nav className={styles.nav}>
                    <Link href={`/${lang}`} className={styles.logo}>
                        <MomentBookLogo
                            className={styles.logoMark}
                            iconClassName={styles.logoIcon}
                            wordmarkClassName={styles.logoWordmark}
                            hideIcon
                        />
                    </Link>

                    <div className={styles.desktopNav}>
                        <Link
                            href={`/${lang}/journeys`}
                            className={styles.navLink}
                        >
                            {journeysNavLabel}
                        </Link>
                        <DownloadActionButton
                            lang={lang}
                            className={styles.navAction}
                        >
                            {dict.nav.download}
                        </DownloadActionButton>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.desktopPrefs}>
                            <LanguageDropdown
                                currentLang={lang}
                                variant="compact"
                            />
                            <ThemeToggle variant="icon" />
                        </div>
                        <MobileMenu
                            lang={lang}
                            dict={dict}
                            journeysLabel={journeysNavLabel}
                        />
                    </div>
                </nav>
            </ScrollHeader>

            <main className={styles.main}>{children}</main>

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
                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerHeading}>
                                    {dict.footer.sections.product}
                                </h3>
                                <ul className={styles.footerList}>
                                    <li>
                                        <Link
                                            href={`/${lang}/journeys`}
                                            className={styles.footerLink}
                                        >
                                            {journeysNavLabel}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${lang}/faq`}
                                            className={styles.footerLink}
                                        >
                                            {dict.nav.faq}
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerHeading}>
                                    {dict.footer.sections.support}
                                </h3>
                                <ul className={styles.footerList}>
                                    <li>
                                        <Link
                                            href={`/${lang}/support`}
                                            className={styles.footerLink}
                                        >
                                            {dict.footer.links.support}
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href={`mailto:${supportEmail}`}
                                            className={styles.footerLink}
                                        >
                                            {dict.footer.email}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h3 className={styles.footerHeading}>
                                    {dict.footer.sections.legal}
                                </h3>
                                <ul className={styles.footerList}>
                                    <li>
                                        <Link
                                            href={`/${lang}/privacy`}
                                            className={styles.footerLink}
                                        >
                                            {dict.footer.links.privacy}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${lang}/terms`}
                                            className={styles.footerLink}
                                        >
                                            {dict.footer.links.terms}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${lang}/community-guidelines`}
                                            className={styles.footerLink}
                                        >
                                            {
                                                dict.footer.links
                                                    .communityGuidelines
                                            }
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${lang}/marketing-consent`}
                                            className={styles.footerLink}
                                        >
                                            {dict.footer.links.marketingConsent}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p className={styles.footerCopyright}>
                            {dict.footer.copyright}
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
