const fs = require("fs");
const path = require("path");

// Path to the generated service worker file after the build
const swPath = path.join(__dirname, "dist/compete-x/browser/ngsw-worker.js");

// Custom logic to inject into the service worker
const customLogic = `
  // Store Requests in Cache Storage
  async function saveRequestToCache(request) {
    const cache = await caches.open('sync-api-requests-cache');
    const requestClone = new Request(request.url, request.options);
    await cache.put(requestClone, new Response(JSON.stringify(request.options), { headers: { 'Content-Type': 'application/json' } }));
  }

  // Retrieve Requests from Cache
  async function getRequestsFromCache() {
    const cache = await caches.open('sync-api-requests-cache');
    const cachedRequests = await cache.keys(); // Get all request keys in the cache
    const requests = [];

    for (const request of cachedRequests) {
      const response = await cache.match(request);
      const options = await response.json(); // Parse the stored request options
      requests.push({ url: request.url, options });
    }

    return requests;
  }

  // Remove Synced Requests
  async function removeRequestFromCache(requestUrl) {
    const cache = await caches.open('sync-api-requests-cache');
    await cache.delete(requestUrl);
  }

  // Sync Event Listener for Sending Cached Requests
  self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-api-requests') {
      event.waitUntil(syncPendingRequests());
    }
  });

  async function syncPendingRequests() {
    const requests = await getRequestsFromCache();
    for (const request of requests) {
      try {
        await fetch(request.url, request.options); // Resend the request
        await removeRequestFromCache(request.url); // Remove it from cache on success
      } catch (err) {
        console.error('Failed to sync request:', request, err);
        // Optionally, leave it in the cache for the next sync attempt
      }
    }
  }

  // Save Requests in Cache When Offline
  self.addEventListener('fetch', (event) => {
    if (!navigator.onLine) {
      // Save the request in the cache if offline
      event.respondWith(
        fetch(event.request).catch(async () => {
          await saveRequestToCache({
            url: event.request.url,
            options: {
              method: event.request.method,
              headers: event.request.headers,
              body: event.request.body,
            },
          });

          // Register the sync event
          self.registration.sync.register('sync-api-requests');
        })
      );
    }
  });
`;

fs.appendFile(swPath, customLogic, (err) => {
  if (err) {
    console.error("Failed to inject custom logic into service worker:", err);
    process.exit(1);
  } else {
    console.log("Custom logic successfully injected into service worker.");
  }
});
