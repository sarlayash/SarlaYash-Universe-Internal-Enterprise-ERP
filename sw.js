// SarlaYash Universe ERP — Progressive Web App (PWA) Service Worker
// Enables 100% offline functionality, fast asset caching, and standalone mobile app experience.

const CACHE_NAME = "sarlayash-erp-v3";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sarlayash_logo.jpg",
  "./sarlayash_blessings_banner.jpg",
  "./credentials_table.png",
  "./kapil_founder_mentorship.jpg",
  "./kapil_portrait.jpg",
  "./icon-192.png",
  "./icon-512.png"
];

// Install: Cache critical static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[PWA SW] Pre-caching critical application shell");
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[PWA SW] Non-fatal pre-cache warning:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Purge older cache versions and claim immediate client control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[PWA SW] Removing outdated cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first with cache fallback for dynamic content, cache-first for static assets
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Strategy for navigation requests (HTML pages)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback to cached index.html or root
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          return caches.match("./index.html") || caches.match("./");
        })
    );
    return;
  }

  // Strategy for static assets, scripts, styles, images & CDN fonts
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Quietly ignore background network errors when offline
          });
        return cachedResponse;
      }

      // If not in cache, fetch from network and cache
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === "opaque") {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // If completely offline and asset not cached, return graceful fallback
          if (event.request.destination === "image") {
            return caches.match("./sarlayash_logo.jpg");
          }
        });
    })
  );
});
