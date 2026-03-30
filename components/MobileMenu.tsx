"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { type Language } from "@/lib/i18n/config";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HOME_SECTION_IDS, buildHomeSectionHref } from "@/lib/marketing/home-sections";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
  lang: Language;
  journeysLabel: string;
  dict: {
    nav: {
      download: string;
    };
  };
}

type MobileMenuLink = {
  href: string;
  label: string;
};

type MobileMenuLabels = {
  openMenu: string;
  dialogLabel: string;
  goHome: string;
  closeMenu: string;
  mainNavigation: string;
};

const mobileMenuLabelsByLanguage: Record<Language, MobileMenuLabels> = {
  en: {
    openMenu: "Open menu",
    dialogLabel: "Mobile navigation menu",
    goHome: "Go to home",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
  },
  ko: {
    openMenu: "메뉴 열기",
    dialogLabel: "모바일 탐색 메뉴",
    goHome: "홈으로 이동",
    closeMenu: "메뉴 닫기",
    mainNavigation: "주요 탐색",
  },
  ja: {
    openMenu: "メニューを開く",
    dialogLabel: "モバイルナビゲーションメニュー",
    goHome: "ホームへ移動",
    closeMenu: "メニューを閉じる",
    mainNavigation: "メインナビゲーション",
  },
  zh: {
    openMenu: "打开菜单",
    dialogLabel: "移动导航菜单",
    goHome: "前往首页",
    closeMenu: "关闭菜单",
    mainNavigation: "主导航",
  },
  es: {
    openMenu: "Abrir menú",
    dialogLabel: "Menú de navegación móvil",
    goHome: "Ir al inicio",
    closeMenu: "Cerrar menú",
    mainNavigation: "Navegación principal",
  },
  pt: {
    openMenu: "Abrir menu",
    dialogLabel: "Menu de navegação móvel",
    goHome: "Ir para o início",
    closeMenu: "Fechar menu",
    mainNavigation: "Navegação principal",
  },
  fr: {
    openMenu: "Ouvrir le menu",
    dialogLabel: "Menu de navigation mobile",
    goHome: "Aller à l'accueil",
    closeMenu: "Fermer le menu",
    mainNavigation: "Navigation principale",
  },
  th: {
    openMenu: "เปิดเมนู",
    dialogLabel: "เมนูนำทางบนมือถือ",
    goHome: "ไปหน้าหลัก",
    closeMenu: "ปิดเมนู",
    mainNavigation: "การนำทางหลัก",
  },
  vi: {
    openMenu: "Mở menu",
    dialogLabel: "Menu điều hướng trên di động",
    goHome: "Đi tới trang chủ",
    closeMenu: "Đóng menu",
    mainNavigation: "Điều hướng chính",
  },
};

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function createMenuLinks(
  lang: Language,
  dict: MobileMenuProps["dict"],
  journeysLabel: string,
): MobileMenuLink[] {
  return [
    { href: buildHomeSectionHref(lang, HOME_SECTION_IDS.download), label: dict.nav.download },
    { href: `/${lang}/journeys`, label: journeysLabel },
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
  const navLinks = useMemo(
    () => createMenuLinks(lang, dict, journeysLabel),
    [lang, dict, journeysLabel],
  );
  const labels = mobileMenuLabelsByLanguage[lang] ?? mobileMenuLabelsByLanguage.en;

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
          aria-label={labels.openMenu}
          aria-expanded={false}
          aria-controls={menuId}
        >
          <span className={`${styles.line} ${styles.lineTop}`} />
          <span className={`${styles.line} ${styles.lineMiddle}`} />
          <span className={`${styles.line} ${styles.lineBottom}`} />
        </button>
      )}

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div className={styles.overlay} onClick={closeMenu}>
              <aside
                id={menuId}
                ref={drawerRef}
                className={styles.menu}
                role="dialog"
                aria-modal="true"
                aria-label={labels.dialogLabel}
                onClick={(event) => event.stopPropagation()}
              >
                <div className={styles.menuHeader}>
                  <Link
                    href={homeHref}
                    className={styles.menuHome}
                    onNavigate={closeMenu}
                    aria-label={labels.goHome}
                  >
                    <MomentBookLogo
                      className={styles.menuLogo}
                      iconClassName={styles.menuLogoIcon}
                      wordmarkClassName={styles.menuWordmarkText}
                      iconSize={24}
                      wordmarkWidth={120}
                      wordmarkHeight={27}
                    />
                  </Link>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={styles.closeButton}
                    onClick={closeMenu}
                    aria-label={labels.closeMenu}
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

                <nav className={styles.menuMain} aria-label={labels.mainNavigation}>
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ""}`}
                        onNavigate={closeMenu}
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
              </aside>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
