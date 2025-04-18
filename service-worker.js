self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('ciliac-cache').then(function(cache) {
      return cache.addAll([
        '/Ciliac.dz/',
        '/Ciliac.dz/index.html',
        '/Ciliac.dz/manifest.json',
        '/Ciliac.dz/icons/icon-192.png',
        '/Ciliac.dz/icons/icon-512.png',
        '/Ciliac.dz/doctors.html',
        '/Ciliac.dz/recipes.html',
        '/Ciliac.dz/maps.html'
      ]);
    }).catch(function(error) {
      console.error('فشل في إضافة الملفات إلى الكاش:', error);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request).then(function(networkResponse) {
        if (networkResponse && networkResponse.status === 200) {
          caches.open('ciliac-cache').then(function(cache) {
            cache.put(e.request, networkResponse.clone());
          });
        }
        return networkResponse;
      });
    }).catch(function(error) {
      console.error('خطأ في عملية الفetch:', error);
      return new Response('حدث خطأ أثناء جلب المحتوى.');
    })
  );
});
