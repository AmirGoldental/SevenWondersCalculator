const staticCacheName = 'site-static-content';
const assets = [
    '/',
    '/index.html',
    '/css/style.css',
    '/images/favicon.ico',
    '/images/logo-512x512.png',
    '/images/logo-128x128.png',
    '/images/logo.png',
    '/images/BackGround.svg',
    '/fonts/Muli-Bold.ttf',
    '/fonts/Muli-Regular.ttf',
    '/fonts/Muli-SemiBold.ttf',
];
// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});
// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});
// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});