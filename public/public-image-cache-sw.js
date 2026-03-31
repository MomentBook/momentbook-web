const CACHE_PREFIX = "momentbook-public-images-";
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const MAX_CACHE_ENTRIES = 120;
const CACHEABLE_HOSTNAMES = new Set([
  "cdn.momentbook.app",
  "yourthink.s3.amazonaws.com",
  "yourthink.s3.ap-northeast-2.amazonaws.com",
  "yourthink-dev.s3.amazonaws.com",
  "yourthink-dev.s3.ap-northeast-2.amazonaws.com",
]);

function isCacheableImageRequest(request) {
  if (request.method !== "GET" || request.destination !== "image") {
    return false;
  }

  const url = new URL(request.url);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return false;
  }

  return CACHEABLE_HOSTNAMES.has(url.hostname);
}

async function trimCache(cache) {
  const keys = await cache.keys();
  const overflow = keys.length - MAX_CACHE_ENTRIES;

  for (let index = 0; index < overflow; index += 1) {
    await cache.delete(keys[index]);
  }
}

async function fetchAndStore(request, cache) {
  try {
    const response = await fetch(request);

    if (response.ok || response.type === "opaque") {
      await cache.put(request, response.clone());
      await trimCache(cache);
    }

    return response;
  } catch {
    return null;
  }
}

async function respondWithCachedImage(request, event) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  const networkPromise = fetchAndStore(request, cache);

  if (cachedResponse) {
    event.waitUntil(networkPromise);
    return cachedResponse;
  }

  const networkResponse = await networkPromise;

  if (networkResponse) {
    return networkResponse;
  }

  return fetch(request);
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheKeys = await caches.keys();

    await Promise.all(
      cacheKeys
        .filter((cacheKey) => cacheKey.startsWith(CACHE_PREFIX) && cacheKey !== CACHE_NAME)
        .map((cacheKey) => caches.delete(cacheKey)),
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (!isCacheableImageRequest(event.request)) {
    return;
  }

  event.respondWith(respondWithCachedImage(event.request, event));
});
