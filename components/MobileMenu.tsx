"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Language } from "@/lib/i18n/config";
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

export function MobileMenu({ lang, dict, journeysLabel }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className={`${styles.line} ${isOpen ? styles.open : ""}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.open : ""}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.open : ""}`}></span>
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <nav className={styles.menu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.menuMain}>
              <Link
                href={`/${lang}/about`}
                className={styles.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {dict.nav.about}
              </Link>
              <Link
                href={`/${lang}/faq`}
                className={styles.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {dict.nav.faq}
              </Link>
              <Link
                href={`/${lang}/download`}
                className={styles.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {dict.nav.download}
              </Link>
            </div>
            <Link
              href={`/${lang}/journeys`}
              className={styles.journeysButton}
              onClick={() => setIsOpen(false)}
            >
              {journeysLabel}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
