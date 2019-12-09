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

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});

//self.addEventListener('fetch', event => {
//    event.respondWith(
//        caches.open(cacheName)
//            .then(cache => cache.match(event.request, { ignoreSearch: true }))
//            .then(response => {
//                return response || fetch(event.request);
//            })
//    )
//    caches.open(cacheName).then(cache => {
//        fetch(event.request).then(response => {
//            if (response) {
//                cache.put(event.request, response.clone());
//                console.log("updated cache");
//            }
//        }).catch(_ => {
//            console.log("No network");
//        });
//    }
//    );
//});


//self.addEventListener('fetch', event => {
//    event.respondWith(
//        caches.open(cacheName)
//            .then(cache =>
//                caches.match(event.request).then(response => {
//                    if (response) return response
//                    fetch(event.request).then(response => {
//                        cache.put(event.request, response.clone());
//                        return response;
//                    });
//                })
//            ));
//});


