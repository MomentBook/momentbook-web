"use client";

import { useEffect } from "react";

export function HashTargetFocus() {
  useEffect(() => {
    const focusHashTarget = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        return;
      }

      let targetId = hash;

      try {
        targetId = decodeURIComponent(hash);
      } catch {
        targetId = hash;
      }

      const target = document.getElementById(targetId);

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
