var CACHE_NAME = 'tj-v1.0';
var urlsToCache = [
    '/index.html',
    '/css/global.css',
    '/js/global.js',
    '/team.html',
    '/js/team.js',
    '/events.html',
    '/gallery.html',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});