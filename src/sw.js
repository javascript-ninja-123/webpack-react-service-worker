var registerWorkerPouch = require('worker-pouch/worker');
var PouchDB = require('pouchdb');
var CACHE_NAME = 'my-site-cache-v1';
registerWorkerPouch(self, PouchDB);


const { assets } = global.serviceWorkerOption
console.log(assets)
let assetsToCache = [...assets, './']

self.addEventListener('install', function(event) {
  console.log('installed')
  event.waitUntil(
  global.caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(assetsToCache);
      })
  );
});


self.addEventListener('activate', function(event) {

  event.waitUntil(
    global.caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.indexOf(CACHE_NAME) === -1) {
            return global.caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    global.caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log("this data is from cached", event.request)
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest)
        .then(function(response) {
            console.log('fresh from server', response)
            var responseToCache = response.clone();
            global.caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(err => {
          console.log('unable to fetch')
        })
      })
    );
});

self.addEventListener('sync', async function(event) {
  if (event.tag == 'myFirstSync') {
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(data => console.log(data))
      .catch(err => console.log('error'))
    }
});
