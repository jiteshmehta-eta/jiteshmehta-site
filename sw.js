/* Service worker for jiteshmehta.in.
   Lets the site work as an installed app and keeps it readable offline.

   WHEN A PAGE OR ARTICLE IS ADDED: add it to PAGES below and raise VERSION
   by one. Replacing a PDF under its existing name needs no change here,
   because every file is refreshed from the network whenever one is available. */

const VERSION = 'v2';
const CACHE = 'jm-' + VERSION;

/* Saved on first visit, so the site opens with no connection. */
const PAGES = [
  '/',
  '/404.html',
  '/styles.css',
  '/app.js',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/logo/logo-192.png',
  '/logo/icon-512.png',
  '/logo/jitesh-mehta-480.jpg',
  '/insights/erp-replaced-sooner.html',
  '/insights/supply-chain-expires-2027.html'
];

/* Saved only inside the installed app, so an ordinary website visitor on
   mobile data is not made to download 3 MB of PDFs they did not ask for. */
const DOCUMENTS = [
  '/downloads/JM_ETA_SAP_Value_Protection_Guide.pdf',
  '/downloads/JM_ETA_CEO_Checklist.pdf',
  '/downloads/JM_ETA_SAP_SI_Challenge_Checklist.pdf',
  '/downloads/JM_ETA_Capability_Statement.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PAGES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('jm-') && k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'save-documents') {
    event.waitUntil(
      caches.open(CACHE).then((cache) => Promise.all(
        DOCUMENTS.map((url) =>
          cache.match(url).then((hit) => hit || cache.add(url)).catch(() => {})
        )
      ))
    );
  }
});

function store(request, response) {
  if (response && response.status === 200 && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* Partial requests (a PDF viewer asking for a range of pages) go straight
     to the network; the saved whole file is the fallback. */
  if (request.headers.has('range')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(url.pathname))
    );
    return;
  }

  /* Pages: newest copy first, saved copy when offline. */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => store(request, response))
        .catch(() =>
          caches.match(request, { ignoreSearch: true })
            .then((hit) => hit || caches.match('/'))
        )
    );
    return;
  }

  /* Everything else: answer from the saved copy at once, and refresh it in
     the background so a replaced file is picked up on the next visit. */
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((hit) => {
      const fresh = fetch(request)
        .then((response) => store(request, response))
        .catch(() => hit);
      return hit || fresh;
    })
  );
});
