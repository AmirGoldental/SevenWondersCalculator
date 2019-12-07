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
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});



