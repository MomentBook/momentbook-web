"use client";

import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  languages,
  stripLanguagePrefix,
  type Language,
} from "@/lib/i18n/config";
import { languageAtom } from "@/lib/state/preferences";
import styles from "./LanguageDropdown.module.scss";

type LanguageDropdownProps = {
  currentLang: Language;
  variant?: "default" | "compact" | "drawer";
};

export function LanguageDropdown({
  currentLang,
  variant = "default",
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [, setPreferredLanguage] = useAtom(languageAtom);

  const pathWithoutLang = stripLanguagePrefix(pathname);
  const currentLanguage = languages[currentLang];
  const isCompact = variant === "compact";
  const isDrawer = variant === "drawer";
  const currentLabel = isCompact ? currentLang.toUpperCase() : currentLanguage.nativeName;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={`${styles.dropdown} ${isCompact ? styles.compact : ""} ${isDrawer ? styles.drawer : ""}`}
      ref={dropdownRef}
    >
      <button
        className={`${styles.trigger} ${isCompact ? styles.compactTrigger : ""} ${isDrawer ? styles.drawerTrigger : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
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
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className={`${styles.currentLang} ${isCompact ? styles.compactLang : ""}`}>
          {currentLabel}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={`${styles.menu} ${isDrawer ? styles.drawerMenu : ""}`}>
          {Object.entries(languages).map(([lang, { nativeName, name }]) => {
            const isActive = lang === currentLang;
            const href = `/${lang}${pathWithoutLang}`;

            return (
              <Link
                key={lang}
                href={href}
                className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                onClick={() => {
                  setPreferredLanguage(lang as Language);
                  setIsOpen(false);
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.nativeName}>{nativeName}</span>
                <span className={styles.englishName}>{name}</span>
                {isActive && (
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
