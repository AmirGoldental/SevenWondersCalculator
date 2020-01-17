const cacheName = `Amir_cache`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                'index.html',
                'css/style.css',
                //'images/favicon.ico',
                //'images/logo/pyramid16.png',
                //'images/logo/pyramid24.png',
                //'images/logo/pyramid32.png',
                //'images/logo/pyramid64.png',
                //'images/logo/pyramid128.png',
                //'images/logo/pyramid192.png',
                //'images/logo/pyramid256.png',
                //'images/logo/pyramid512.png',
                'images/BackGround.webp',
                'images/rules1.png',
                'images/rules2.png',
                'images/rules3.png',
                'app.js',
                'sw.js',
                'manifest.json',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
                'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js',
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

//Stale-while-revalidate
self.addEventListener('fetch', function (event) {
    var req = event.request.clone();
    if (req.clone().method == "GET") {
        if (extractHostname(req.url) == "www.google-analytics.com") {
            try {
                event.respondWith(fetch(event.request).then(function (networkResponse) {
                    return networkResponse;
                }))
            } catch (error) {
                console.log("error with goog analy")
            }
        }
        else {
            event.respondWith(
                // Get the response from the cache
                caches.open(cacheName).then(function (cache) {
                    return cache.match(event.request).then(function (response) {
                        // Get the response from the network
                        var fetchPromise = fetch(event.request).then(function (networkResponse) {
                            // And store it in the cache for later
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        })
                        return response || fetchPromise;
                    })
                })
            );
        }
    }
});

