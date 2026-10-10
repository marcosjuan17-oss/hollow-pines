// Hollow Pines offline cache — version 1f400ae84f
const CACHE = 'hollow-pines-1f400ae84f';
const CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "assets/dirt_col.jpg", "assets/dirt_nrm.jpg", "assets/ground_col.jpg", "assets/ground_nrm.jpg", "assets/hollow_pines.json", "assets/m_img0.jpg", "assets/m_img1.jpg", "assets/m_img10.jpg", "assets/m_img11.jpg", "assets/m_img12.jpg", "assets/m_img13.jpg", "assets/m_img14.jpg", "assets/m_img15.jpg", "assets/m_img16.jpg", "assets/m_img17.jpg", "assets/m_img18.png", "assets/m_img19.jpg", "assets/m_img2.jpg", "assets/m_img20.jpg", "assets/m_img21.jpg", "assets/m_img22.png", "assets/m_img23.jpg", "assets/m_img24.png", "assets/m_img25.jpg", "assets/m_img26.jpg", "assets/m_img27.jpg", "assets/m_img28.jpg", "assets/m_img29.jpg", "assets/m_img3.jpg", "assets/m_img30.jpg", "assets/m_img31.jpg", "assets/m_img32.jpg", "assets/m_img33.jpg", "assets/m_img34.jpg", "assets/m_img35.jpg", "assets/m_img36.jpg", "assets/m_img37.jpg", "assets/m_img38.jpg", "assets/m_img39.png", "assets/m_img4.jpg", "assets/m_img40.png", "assets/m_img41.jpg", "assets/m_img42.jpg", "assets/m_img43.png", "assets/m_img44.jpg", "assets/m_img45.jpg", "assets/m_img46.jpg", "assets/m_img47.jpg", "assets/m_img48.jpg", "assets/m_img49.jpg", "assets/m_img5.jpg", "assets/m_img6.jpg", "assets/m_img7.jpg", "assets/m_img8.jpg", "assets/m_img9.jpg", "assets/poster_0.jpg", "assets/poster_1.jpg", "assets/poster_2.jpg", "assets/scare.jpg", "assets/sign_0.jpg", "assets/sign_1.jpg", "assets/sign_2.jpg", "assets/sign_3.jpg", "assets/sign_4.jpg", "assets/sign_5.jpg", "assets/sign_6.jpg", "assets/sign_7.jpg"];
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
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; }).catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })));
});
