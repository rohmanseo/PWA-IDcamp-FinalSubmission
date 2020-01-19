
self.addEventListener("push", function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/Icon-144.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
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
], {
ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp("/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "wb1"
  })
);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate(
    {
      cacheName: "wb-api"
    }
  )
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets"
  })
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
