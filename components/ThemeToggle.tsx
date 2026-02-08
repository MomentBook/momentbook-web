"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/lib/state/preferences";
import styles from "./ThemeToggle.module.scss";

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

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
      <button className={styles.toggle} style={{ opacity: 0 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
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
      <span className={styles.label}>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}
