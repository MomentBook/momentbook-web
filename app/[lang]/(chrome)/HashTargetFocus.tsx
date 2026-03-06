"use client";

import { useEffect } from "react";

export function HashTargetFocus() {
  useEffect(() => {
    const focusHashTarget = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash));

      if (!(target instanceof HTMLElement)) {
        return;
      }

      window.requestAnimationFrame(() => {
        target.focus({ preventScroll: true });
      });
    };

    focusHashTarget();
    window.addEventListener("hashchange", focusHashTarget);

    return () => {
      window.removeEventListener("hashchange", focusHashTarget);
    };
  }, []);

  return null;
}
