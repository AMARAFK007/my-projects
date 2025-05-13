// MedShop E-commerce Service Worker
const CACHE_NAME = 'medshop-cache-v1';
const OFFLINE_PAGE = '/offline.html';

// Resources to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/images/logo.png',
  '/images/product1.jpg',
  '/css/main.css',
  '/css/mobile.css',
  '/manifest.json',
  '/favicon.ico'
];

// Assets that should be cached when used
const RUNTIME_CACHE_URLS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/cdnjs\.cloudflare\.com/,
  /\.(png|jpg|jpeg|gif|webp|svg)$/,
  /\/api\/products/,
  /\/api\/categories/
];

// Install event - precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', event => {
  // Skip cross-origin requests like Google Analytics
  if (!event.request.url.startsWith(self.location.origin) &&
      !RUNTIME_CACHE_URLS.some(pattern => 
        pattern instanceof RegExp 
          ? pattern.test(event.request.url) 
          : event.request.url.includes(pattern)
      )) {
    return;
  }
  
  // Process API requests specifically
  if (event.request.url.includes('/api/')) {
    return handleApiRequest(event);
  }

  // For HTML navigation requests - network first with offline fallback
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, try to serve cached HTML
          return caches.match(event.request)
            .then(response => {
              // If we have a cached version, return it
              return response || caches.match(OFFLINE_PAGE);
            });
        })
    );
    return;
  }
  
  // For images and static assets - cache first, then network
  if (isAssetRequest(event.request)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Return cached response immediately
            return cachedResponse;
          }
          
          // If not in cache, fetch from network
          return cacheNetworkResponse(event.request);
        })
    );
    return;
  }
  
  // Default strategy - network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache a copy of the response
        if (shouldCacheResponse(event.request, response)) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request);
      })
  );
});

// Helper function to handle API requests
function handleApiRequest(event) {
  // Use a stale-while-revalidate strategy for API calls
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Update cache with fresh data
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // If no network and no cache, return a generic error response
            if (!cachedResponse) {
              return new Response(JSON.stringify({ 
                error: 'Network error, and no cached data available' 
              }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
              });
            }
            return cachedResponse;
          });
        
        // Return cached data immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      });
    })
  );
}

// Function to cache network response for assets
async function cacheNetworkResponse(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok && shouldCacheResponse(request, response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // If fetch fails and the request was for an image, return fallback
    if (request.destination === 'image') {
      return cache.match('/images/placeholder.jpg');
    }
    throw error;
  }
}

// Function to determine if a request is for a static asset
function isAssetRequest(request) {
  const url = new URL(request.url);
  
  // Check for static file extensions
  if (/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/.test(url.pathname)) {
    return true;
  }
  
  // Check for asset directories
  if (url.pathname.startsWith('/images/') || 
      url.pathname.startsWith('/fonts/') || 
      url.pathname.startsWith('/css/') || 
      url.pathname.startsWith('/_next/static/')) {
    return true;
  }
  
  return false;
}

// Check if the response should be cached
function shouldCacheResponse(request, response) {
  // Don't cache bad responses
  if (!response || response.status !== 200) {
    return false;
  }
  
  // Check if it's an asset that should be cached
  const url = request.url;
  for (const pattern of RUNTIME_CACHE_URLS) {
    if (pattern instanceof RegExp) {
      if (pattern.test(url)) return true;
    } else if (url.includes(pattern)) {
      return true;
    }
  }
  
  return isAssetRequest(request);
}

// Background sync for pending actions (like add to cart when offline)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
});

// Sync the cart with the server when back online
async function syncCart() {
  try {
    // Get pending cart actions from IndexedDB
    const db = await openDatabase();
    const pendingActions = await getPendingActions(db);
    
    if (pendingActions.length === 0) return;
    
    // Send each pending action to the server
    for (const action of pendingActions) {
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.data)
        });
        
        if (response.ok) {
          // If successful, remove action from pending queue
          await removePendingAction(db, action.id);
        }
      } catch (error) {
        console.error('Failed to sync action:', error);
      }
    }
  } catch (error) {
    console.error('Failed to sync cart:', error);
  }
}

// Open the IndexedDB database
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('medshop-offline', 1);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingActions')) {
        db.createObjectStore('pendingActions', { keyPath: 'id', autoIncrement: true });
      }
    };
    
    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}

// Get pending actions from IndexedDB
function getPendingActions(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('pendingActions', 'readonly');
    const store = transaction.objectStore('pendingActions');
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Remove a pending action from IndexedDB
function removePendingAction(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('pendingActions', 'readwrite');
    const store = transaction.objectStore('pendingActions');
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Listen for push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/images/logo.png',
      badge: '/images/badge.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Error showing notification:', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        const url = event.notification.data.url;
        
        // Check if there is already a window/tab open with this URL
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If not, open a new window/tab
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
}); 