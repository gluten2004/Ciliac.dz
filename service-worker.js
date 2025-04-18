self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('ciliac-cache').then(function(cache) {
      return cache.addAll([
        '/', // تأكد من أن المسار إلى الصفحة الرئيسية صحيح
        '/Ciliac.dz/index.html',
        '/Ciliac.dz/manifest.json',
        '/Ciliac.dz/icons/icon-192.png',
        '/Ciliac.dz/icons/icon-512.png',
        '/Ciliac.dz/doctors.html',
        '/Ciliac.dz/recipes.html',
        '/Ciliac.dz/maps.html'
      ]).catch(function(error) {
        console.error('فشل في إضافة الملفات إلى الكاش:', error);
      });
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      // إذا كانت هناك استجابة من الكاش، ارجع إليها، وإلا قم بتحميلها من الإنترنت
      return response || fetch(e.request).then(function(networkResponse) {
        // يمكن إضافة الكاش للملفات الجديدة بعد تحميلها من الإنترنت
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
