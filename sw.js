const CACHE_NAME = 'vr-shop-cache-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/js/products.js',
  '/images/Hero_Desktop.webp',
  '/images/Hero_Tablet.webp',
  '/images/Hero_Mobile.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 