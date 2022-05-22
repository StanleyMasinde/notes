/**
 * The main service worker file. 
 * Author: Stanley Masinde
 */
const version = 'v2'
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(version).then(cache => {
            cache.addAll([
                '/',
                '/manifest.json',
                '/icons/icon-48x48.png',
                '/icons/icon-72x72.png',
                '/icons/icon-96x96.png',
                '/icons/icon-128x128.png',
                '/icons/icon-144x144.png',
                '/icons/icon-152x152.png',
                '/icons/icon-192x192.png',
                '/icons/icon-384x384.png',
                '/icons/icon-512x512.png',
            ])
        })
    )
})

// // ----------------------------------------------------------------------------
// // Service worker activation.
// // ----------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activating Service Worker ...')
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				console.log('[Service Worker] Removing old cache.', key)
				return caches.delete(key)
			}))
		})
	)
	return self.clients.claim()
})

// // ----------------------------------------------------------------------------
// // Service worker fetch event.
// // ----------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
	console.log('[Service Worker] Fetching resource: ', event.request.url)
	event.respondWith(
		caches.open(version).then(async (cache) => {
			const response = await cache.match(event.request)
			return response || fetch(event.request).then((response_1) => {
				cache.put(event.request, response_1.clone())
				return response_1
			})
		})
	)
})