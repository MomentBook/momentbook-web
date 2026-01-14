"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { languages, type Language } from "@/lib/i18n/config";
import styles from "./LanguageSwitcher.module.scss";

export function LanguageSwitcher({ currentLang }: { currentLang: Language }) {
  const pathname = usePathname();

  // Extract the path without the language prefix
  const pathWithoutLang = pathname.replace(/^\/(en|ko|zh|ja)/, "");

  return (
    <div className={styles.switcher}>
      {Object.entries(languages).map(([lang, { nativeName }]) => {
        const isActive = lang === currentLang;
        const href = `/${lang}${pathWithoutLang}`;

        return (
          <Link
            key={lang}
            href={href}
            className={`${styles.langLink} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {nativeName}
          </Link>
        );
      })}
    </div>
  );
}
