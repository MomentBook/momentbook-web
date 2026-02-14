"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Language } from "@/lib/i18n/config";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
  lang: Language;
  journeysLabel: string;
  dict: {
    nav: {
      about: string;
      faq: string;
      download: string;
    };
  };
}

type MobileMenuLink = {
  href: string;
  label: string;
};

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function createMenuLinks(lang: Language, dict: MobileMenuProps["dict"]): MobileMenuLink[] {
  return [
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/faq`, label: dict.nav.faq },
    { href: `/${lang}/download`, label: dict.nav.download },
  ];
}

function isActivePath(currentPath: string, href: string) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function MobileMenu({ lang, dict, journeysLabel }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const homeHref = `/${lang}`;
  const journeysHref = `/${lang}/journeys`;
  const navLinks = useMemo(
    () => createMenuLinks(lang, dict),
    [lang, dict.nav.about, dict.nav.faq, dict.nav.download],
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const isActiveLink = useCallback(
    (href: string) => isActivePath(pathname, href),
    [pathname],
  );

  // Prevent background scroll and keep keyboard focus inside drawer.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousTouchAction = document.body.style.touchAction;
    const previousFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    document.body.style.touchAction = "none";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.tabIndex !== -1);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !drawerRef.current.contains(activeElement)) {
          event.preventDefault();
          last?.focus();
        }
        return;
      }

      if (activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      document.body.style.touchAction = previousTouchAction;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocused?.isConnected) {
        previousFocused.focus();
      }
    };
  }, [closeMenu, isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className={styles.hamburger}
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={false}
          aria-controls={menuId}
        >
          <span className={`${styles.line} ${styles.lineTop}`} />
          <span className={`${styles.line} ${styles.lineMiddle}`} />
          <span className={`${styles.line} ${styles.lineBottom}`} />
        </button>
      )}

      {isOpen && (
        <div className={styles.overlay} onClick={closeMenu}>
          <aside
            id={menuId}
            ref={drawerRef}
            className={styles.menu}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.menuHeader}>
              <Link
                href={homeHref}
                className={styles.menuHome}
                onClick={closeMenu}
                aria-label="Go to Home"
              >
                <MomentBookLogo
                  className={styles.menuLogo}
                  wordmarkClassName={styles.menuWordmarkText}
                  hideIcon
                  wordmarkWidth={130}
                />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <nav className={styles.menuMain} aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ""}`}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.menuPrefs}>
              <LanguageDropdown currentLang={lang} variant="drawer" />
              <ThemeToggle variant="drawer" />
            </div>

            <Link
              href={journeysHref}
              className={`${styles.journeysButton} ${isActiveLink(journeysHref) ? styles.journeysButtonActive : ""}`}
              onClick={closeMenu}
            >
              {journeysLabel}
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
