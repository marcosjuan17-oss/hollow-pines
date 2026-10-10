// Hollow Pines offline cache — version 48bd5945b1
const CACHE = 'hollow-pines-48bd5945b1';
const CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "assets/dirt_col.jpg", "assets/dirt_nrm.jpg", "assets/ground_col.jpg", "assets/ground_nrm.jpg", "assets/hollow_pines.json", "assets/m_img0.jpg", "assets/m_img1.jpg", "assets/m_img2.jpg", "assets/m_img3.jpg", "assets/m_img4.jpg", "assets/m_img5.jpg", "assets/m_img6.jpg", "assets/m_img7.jpg", "assets/poster_0.jpg", "assets/poster_1.jpg", "assets/poster_2.jpg", "assets/scare.jpg", "assets/sign_0.jpg", "assets/sign_1.jpg", "assets/sign_2.jpg", "assets/sign_3.jpg", "assets/sign_4.jpg", "assets/sign_5.jpg", "assets/sign_6.jpg", "assets/sign_7.jpg"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const cacheable = url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net' || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com');
  if (!cacheable) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); return r; }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })));
});
