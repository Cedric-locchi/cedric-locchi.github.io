const CACHE = 'V1';

function updatedCache(request, response) {
    return caches.open(CACHE)
        .then(function(cache){
            cache.put(request.url, response);
        })
}

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        const timeoutID = setTimeout(reject, timeout);
        fetch(request).then(function (response) {
            clearTimeout(timeoutID);
            fulfill(response);
            updatedCache(request, response.clone());
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE)
        .then(function (cache) {
            return cache.match(request)
                .then(function (matching) {
                    return matching || Promise.reject('no match');
                });
        });
}

self.addEventListener('install', function () {
    console.log('install worker');
});

self.addEventListener('fetch', function (evt) {
    evt.respondWith(
        fromNetwork(evt.request, 40000)
            .catch(function () {
                return fromCache(evt.request);
            })
    );
});
