const cacheName = `Amir_cache`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                'index.html',
                'css/style.css',
                'images/favicon.ico',
                'images/logo-512x512.png',
                'images/logo-192x192.png',
                'images/logo-128x128.png',
                'images/logo.png',
                'images/BackGround.svg',
                'fonts/Muli-Bold.ttf',
                'fonts/Muli-Regular.ttf',
                'fonts/Muli-SemiBold.ttf',
                'app.js',
                'sw.js',
                'manifest.json',
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

//Stale-while-revalidate
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
                return response || fetchPromise;
            })
        })
    );
});

