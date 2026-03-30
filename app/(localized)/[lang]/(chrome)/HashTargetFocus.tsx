"use client";

import { useEffect } from "react";
import { scrollHomeSectionIntoView } from "@/lib/marketing/home-scroll";

export function HashTargetFocus() {
  useEffect(() => {
    const focusHashTarget = (behavior: "auto" | "smooth") => {
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
        scrollHomeSectionIntoView(target, { behavior });
      });
    };

    focusHashTarget("auto");

    const handleHashChange = () => {
      focusHashTarget("smooth");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
