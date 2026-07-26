const CACHE = 'max-load-v3.0.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-64.png',
  './icon-192.png',
  './icon-512.png',
  './brand-icon.png',
  './daf.jpg',
  './iveco.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
