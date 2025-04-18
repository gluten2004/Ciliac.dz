self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('ciliac-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/Ciliac.dz/index.html',
        '/Ciliac.dz/manifest.json',
        '/Ciliac.dz/icons/icon-192.png',
        '/icons/icon-512.png',
        '/Ciliac.dz/doctors.html',
        '/Ciliac.dz/recipes.html',
        '/Ciliac.dz/maps.html'
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
