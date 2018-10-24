self.addEventListener('fetch', function (e) {
    if (e.request.url.indexOf('https://api.foursquare.com') == 0) {
        // Put data handler code here
        fetch(e.request)
            .then(function (response) {
                let cacheName = 'react-onejeet-project';
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request.url, response.clone());
                    console.log('ServiceWorker Fetched & Cached Data');
                    return response;
                });
            })
    } else {
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});
