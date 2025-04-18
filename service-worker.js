self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('ciliac-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-192.png',
        '/icons/icon-512.png',
        // أضف باقي الصفحات إذا حبيتي:
        '/doctors.html',
        '/recipes.html',
        '/maps.html'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
