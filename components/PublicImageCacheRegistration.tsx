"use client";

import { useEffect } from "react";

const SERVICE_WORKER_PATH = "/public-image-cache-sw.js";

function canRegisterServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }

  if (process.env.NODE_ENV !== "production") {
    return false;
  }

  return window.location.protocol === "https:" || window.location.hostname === "localhost";
}

export function PublicImageCacheRegistration() {
  useEffect(() => {
    if (!canRegisterServiceWorker()) {
      return;
    }

    void navigator.serviceWorker.register(SERVICE_WORKER_PATH, {
      scope: "/",
    }).catch(() => undefined);
  }, []);

  return null;
}
