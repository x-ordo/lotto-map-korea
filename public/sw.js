/**
 * LottoShrine Service Worker
 * Provides offline caching for static assets and API responses
 */

const STATIC_CACHE_NAME = 'lottoshrine-static-v1';
const DYNAMIC_CACHE_NAME = 'lottoshrine-dynamic-v1';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/og-shrine.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE_NAME && name !== DYNAMIC_CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (except Kakao static assets)
  if (url.origin !== self.location.origin) {
    // Cache Kakao CDN images
    if (url.hostname.includes('daumcdn.net') || url.hostname.includes('kakaocdn.net')) {
      event.respondWith(networkFirstThenCache(request));
    }
    return;
  }

  // API requests - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstThenCache(request));
    return;
  }

  // Data files - cache first with network update
  if (url.pathname.startsWith('/data/')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Static assets - cache first
  event.respondWith(cacheFirstThenNetwork(request));
});

// Cache strategies
async function cacheFirstThenNetwork(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    console.log('[SW] Network failed, no cache:', request.url);
    // Return offline page if available
    return caches.match('/');
  }
}

async function networkFirstThenCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE_NAME);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise;
}

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'LottoShrine', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Focus existing window if open
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

// Handle skip waiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
