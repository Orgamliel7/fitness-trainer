self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('fitness-trainer-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/workout',
          '/results',
          '/manifest.json',
          '/icons/icon-192x192.png',
          '/icons/icon-512x512.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          return caches.open('fitness-trainer-v1').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      }).catch(() => {
        // Return a fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        // Just return an error response for non-navigation requests
        return new Response('Network error occurred', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' },
        });
      })
    );
  });