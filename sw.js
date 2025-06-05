const CACHE_NAME = 'vr-shop-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'css/styles.css',
  'js/main.js',
  'js/products.js',
  'images/Hero_Desktop.webp',
  'images/Hero_Tablet.webp',
  'images/Hero_Mobile.webp',
  'images/icon-192x192.png',
  'images/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 