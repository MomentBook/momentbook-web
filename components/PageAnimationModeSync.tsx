"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocalizedHomePath } from "@/lib/i18n/pathname";

const PAGE_ANIMATION_ATTRIBUTE = "data-page-animations";

export function PageAnimationModeSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute(
      PAGE_ANIMATION_ATTRIBUTE,
      isLocalizedHomePath(pathname) ? "enabled" : "disabled",
    );
  }, [pathname]);

  return null;
}
