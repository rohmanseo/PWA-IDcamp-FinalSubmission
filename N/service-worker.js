importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');


workbox.routing.registerRoute(
  new RegExp('/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'wb1'
    })
);

workbox.precaching.precacheAndRoute([
  "/",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/favorit.html",
  "/manifest.json",
  "/css/materialize.min.css",
  "/css/custom.css",
  "/js/materialize.min.js",
  "/js/sw-register.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/favorites.js",
  "/js/idb.js",
  "/js/db.js",
  "/img/icon-512.png",
  "/img/icon-192.png",
  "/img/icon-144.png",
  "/img/icon-96.png",
  "/img/na.png"
]);
// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
const CACHE_NAME = "barclays-apps";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/favorit.html",
  "/manifest.json",
  "/css/materialize.min.css",
  "/css/custom.css",
  "/js/materialize.min.js",
  "/js/sw-register.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/favorites.js",
  "/js/idb.js",
  "/js/db.js",
  "/img/icon-512.png",
  "/img/icon-192.png",
  "/img/icon-144.png",
  "/img/icon-96.png",
  "/img/na.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/Icon-144.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});