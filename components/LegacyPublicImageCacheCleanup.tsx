"use client";

import { useEffect } from "react";

const SERVICE_WORKER_PATH = "/public-image-cache-sw.js";
const CACHE_PREFIX = "momentbook-public-images-";
const CLEANUP_RELOAD_KEY = "momentbook:legacy-public-image-cache-cleanup-reload";

function isLegacyPublicImageCacheRegistration(
  registration: ServiceWorkerRegistration,
): boolean {
  return [registration.installing, registration.waiting, registration.active]
    .some((worker) => worker?.scriptURL.endsWith(SERVICE_WORKER_PATH));
}

function shouldReloadAfterCleanup(): boolean {
  try {
    if (sessionStorage.getItem(CLEANUP_RELOAD_KEY) === "1") {
      return false;
    }

    sessionStorage.setItem(CLEANUP_RELOAD_KEY, "1");
    return true;
  } catch {
    return false;
  }
}

export function LegacyPublicImageCacheCleanup() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !("caches" in window)
    ) {
      return;
    }

    let cancelled = false;

    async function cleanupLegacyPublicImageCache() {
      const registrations = await navigator.serviceWorker.getRegistrations()
        .catch(() => [] as ServiceWorkerRegistration[]);
      const legacyRegistrations = registrations.filter(
        isLegacyPublicImageCacheRegistration,
      );

      const unregisterResults = await Promise.all(
        legacyRegistrations.map((registration) =>
          registration.unregister().catch(() => false),
        ),
      );

      const cacheKeys = await caches.keys().catch(() => [] as string[]);
      const deleteResults = await Promise.all(
        cacheKeys
          .filter((cacheKey) => cacheKey.startsWith(CACHE_PREFIX))
          .map((cacheKey) => caches.delete(cacheKey).catch(() => false)),
      );

      if (cancelled) {
        return;
      }

      const removedLegacyArtifacts =
        unregisterResults.some(Boolean) || deleteResults.some(Boolean);
      const legacyController =
        navigator.serviceWorker.controller?.scriptURL.endsWith(
          SERVICE_WORKER_PATH,
        ) ?? false;

      if (
        removedLegacyArtifacts &&
        legacyController &&
        shouldReloadAfterCleanup()
      ) {
        window.location.reload();
      }
    }

    void cleanupLegacyPublicImageCache();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
