/* Putri Space service worker · Created by CreanovativeCo */
const CACHE = 'putrispace-1.1.3';
const SHELL = ['./', 'index.html', 'styles.css?v=1.1.3', 'i18n.js?v=1.1.3', 'content.js?v=1.1.3', 'js/core.js?v=1.1.3', 'js/home.js?v=1.1.3', 'js/english.js?v=1.1.3', 'js/hr.js?v=1.1.3', 'app.js?v=1.1.3', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) {
    if (url.hostname.includes('fonts.g')) e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return res; })));
    return;
  }
  e.respondWith(fetch(req).then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return res; }).catch(() => caches.match(req).then((r) => r || caches.match('index.html'))));
});
