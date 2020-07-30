const CACHE_NAME = "submissionpwa-v6";
const urlToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/main.js",
  "/nav.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/home.html",
  "/pages/saved.html",
  "/pages/article.html",
  "/asset/css/materialize.min.css",
  "/asset/css/style.css",
  "/asset/js/materialize.min.js",
  "/asset/js/script.js",
  "/asset/js/api.js",
  "/asset/js/data-source.js",
  "/asset/js/article.js",
  "/asset/js/db.js",
  "/asset/js/idb.js",
  "/asset/js/extension.js",
  "/asset/js/push-manager.js",
  "/asset/js/request-permission.js",
  "/asset/js/reg-sw.js",
  "/icon.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  const BASE_URL = "http://api.football-data.org/v2/";
  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {
        ignoreSearch: true
      }).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload";
  }

  let options = {
    body: body,
    icon: "",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
})