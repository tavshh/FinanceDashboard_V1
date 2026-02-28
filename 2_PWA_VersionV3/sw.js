const CACHE_NAME = 'finanzas-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './chart.js',
  './manifest.json',
  './icon-512.png'
];

// Instala el service worker y guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Intercepta las peticiones de red y responde con la caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si el archivo está en la caché, devuélvelo. Si no, búscalo en internet.
      return response || fetch(event.request);
    })
  );
});