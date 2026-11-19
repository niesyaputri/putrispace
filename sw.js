/* Putri Space service worker · Created by CreanovativeCo */
const CACHE = 'putrispace-1.3.1';
const IMGS = ['img/listen/b1-idea.webp', 'img/listen/b1-ex.webp', 'img/listen/b1-icon.webp', 'img/listen/b2-idea.webp', 'img/listen/b2-ex.webp', 'img/listen/b2-icon.webp', 'img/listen/b3-idea.webp', 'img/listen/b3-ex.webp', 'img/listen/b3-icon.webp', 'img/listen/b4-idea.webp', 'img/listen/b4-ex.webp', 'img/listen/b4-icon.webp', 'img/listen/b5-idea.webp', 'img/listen/b5-ex.webp', 'img/listen/b5-icon.webp', 'img/listen/b6-idea.webp', 'img/listen/b6-ex.webp', 'img/listen/b6-icon.webp', 'img/listen/b7-idea.webp', 'img/listen/b7-ex.webp', 'img/listen/b7-icon.webp', 'img/listen/b8-idea.webp', 'img/listen/b8-ex.webp', 'img/listen/b8-icon.webp', 'img/listen/b3-practice.webp', 'img/listen/b9-icon.webp', 'img/listen/b10-icon.webp', 'img/listen/b11-icon.webp'];
const SHELL = ['./', 'index.html', 'styles.css?v=1.3.1', 'i18n.js?v=1.3.1', 'content.js?v=1.3.1', 'js/core.js?v=1.3.1', 'js/home.js?v=1.3.1', 'js/english.js?v=1.3.1', 'js/hr.js?v=1.3.1', 'js/grammar.js?v=1.3.1', 'content-grammar.js?v=1.3.1', 'content-listening.js?v=1.3.1', 'js/listening.js?v=1.3.1', 'app.js?v=1.3.1', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.concat(IMGS))).then(() => self.skipWaiting())); });
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
