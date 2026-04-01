const CACHE_PREFIX = "momentbook-public-images-";

async function deleteLegacyPublicImageCaches() {
  const cacheKeys = await caches.keys();

  await Promise.all(
    cacheKeys
      .filter((cacheKey) => cacheKey.startsWith(CACHE_PREFIX))
      .map((cacheKey) => caches.delete(cacheKey)),
  );
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    await deleteLegacyPublicImageCaches();
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
