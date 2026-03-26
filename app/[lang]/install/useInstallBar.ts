"use client";

import { useEffect, useState } from "react";
import type { LandingPlatform } from "@/lib/install-campaign";

const INSTALL_BAR_SESSION_KEY = "momentbook-install-bar-dismissed";

export function useInstallBar(platform: LandingPlatform) {
  const [installBarVisible, setInstallBarVisible] = useState(false);
  const [installBarDismissed, setInstallBarDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem(INSTALL_BAR_SESSION_KEY) === "1";
  });

  useEffect(() => {
    if (platform !== "android" || installBarDismissed) {
      return;
    }

    let hasShown = false;

    const showInstallBar = () => {
      if (hasShown) {
        return;
      }

      hasShown = true;
      setInstallBarVisible(true);
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", showInstallBar);
      window.removeEventListener("scroll", showInstallBar);
      window.removeEventListener("keydown", showInstallBar);
    };

    const timeoutId = window.setTimeout(showInstallBar, 3000);

    window.addEventListener("pointerdown", showInstallBar, { passive: true });
    window.addEventListener("scroll", showInstallBar, { passive: true });
    window.addEventListener("keydown", showInstallBar);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", showInstallBar);
      window.removeEventListener("scroll", showInstallBar);
      window.removeEventListener("keydown", showInstallBar);
    };
  }, [installBarDismissed, platform]);

  const dismissInstallBarState = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(INSTALL_BAR_SESSION_KEY, "1");
    }

    setInstallBarDismissed(true);
    setInstallBarVisible(false);
  };

  return {
    installBarVisible,
    installBarDismissed,
    dismissInstallBarState,
  };
}
