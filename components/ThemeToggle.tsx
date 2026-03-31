"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useAtom } from "jotai";
import type { Language } from "@/lib/i18n/config";
import { themeAtom } from "@/lib/state/preferences";
import styles from "./ThemeToggle.module.scss";

const noopSubscribe = () => () => {};

type ThemeToggleProps = {
  lang: Language;
  variant?: "default" | "icon" | "drawer";
};

type ThemeToggleLabels = {
  light: string;
  dark: string;
  switchToLight: string;
  switchToDark: string;
};

const themeToggleLabelsByLanguage: Record<Language, ThemeToggleLabels> = {
  en: {
    light: "Light",
    dark: "Dark",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  ko: {
    light: "라이트",
    dark: "다크",
    switchToLight: "라이트 테마로 전환",
    switchToDark: "다크 테마로 전환",
  },
  ja: {
    light: "ライト",
    dark: "ダーク",
    switchToLight: "ライトテーマに切り替え",
    switchToDark: "ダークテーマに切り替え",
  },
  zh: {
    light: "浅色",
    dark: "深色",
    switchToLight: "切换到浅色主题",
    switchToDark: "切换到深色主题",
  },
  es: {
    light: "Claro",
    dark: "Oscuro",
    switchToLight: "Cambiar al tema claro",
    switchToDark: "Cambiar al tema oscuro",
  },
  pt: {
    light: "Claro",
    dark: "Escuro",
    switchToLight: "Mudar para o tema claro",
    switchToDark: "Mudar para o tema escuro",
  },
  fr: {
    light: "Clair",
    dark: "Sombre",
    switchToLight: "Passer au thème clair",
    switchToDark: "Passer au thème sombre",
  },
  th: {
    light: "สว่าง",
    dark: "มืด",
    switchToLight: "สลับเป็นธีมสว่าง",
    switchToDark: "สลับเป็นธีมมืด",
  },
  vi: {
    light: "Sáng",
    dark: "Tối",
    switchToLight: "Chuyển sang giao diện sáng",
    switchToDark: "Chuyển sang giao diện tối",
  },
};

export function ThemeToggle({ lang, variant = "default" }: ThemeToggleProps) {
  const [theme, setTheme] = useAtom(themeAtom);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const isIcon = variant === "icon";
  const isDrawer = variant === "drawer";
  const labels = themeToggleLabelsByLanguage[lang] ?? themeToggleLabelsByLanguage.en;
  const isLightTheme = theme === "light";
  const nextThemeLabel = isLightTheme ? labels.dark : labels.light;
  const toggleLabel = isLightTheme ? labels.switchToDark : labels.switchToLight;

  useEffect(() => {
    if (!mounted) {
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
  }, [mounted, theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <button
        className={`${styles.toggle} ${isIcon ? styles.iconOnly : ""} ${isDrawer ? styles.drawer : ""}`}
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.toggle} ${isIcon ? styles.iconOnly : ""} ${isDrawer ? styles.drawer : ""}`}
      aria-label={toggleLabel}
      title={toggleLabel}
    >
      {theme === "light" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
      <span className={`${styles.label} ${isDrawer ? styles.drawerLabel : ""}`}>
        {nextThemeLabel}
      </span>
    </button>
  );
}
