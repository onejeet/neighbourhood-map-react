// window.self.importScripts('node_modules/sw-toolbox/sw-toolbox.js');

// window.self.toolbox.precache(['src/*.js', 'src/*.css', 'public/*.html']);
// window.self.toolbox.router.get('/*', toolbox.networkFirst);



//Caching
const cacheName = 'onejeet-mws-restaurants-1';

window.self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
        return cache.addAll([
          '/',
          '/sw.js',
          '/css/styles.css',
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10'
        ]).catch(error => {
          console.log('Caches Installation failed: ' + error);
        });
      })
  );
});

// Response
window.self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response){
          console.log('Serving '+event.request.url+' From Cache');
          return response;
      }
      return fetch(event.request);
    }).catch(error => {
      return new Response('<b>Not connected to the internet</b>', {
          headers:{
              'Content-Type':'text/html'
          }
      });
    })
  );
});
