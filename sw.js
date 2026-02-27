// ==========================================
// SERVICE WORKER — LEGADO BIBLICO PWA v13
// AUTO-UPDATE: Network First strategy
// ==========================================

const BASE = '/legado-biblico-interactivo';
const CACHE_NAME = 'legado-biblico-v13';

const ARCHIVOS_CACHE = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/style.css`,
    `${BASE}/mobile.css`,
    `${BASE}/data_motor.js`,
    `${BASE}/data_kids.js`,
    `${BASE}/data_jovenes.js`,
    `${BASE}/data_adultos.js`,
    `${BASE}/data_teens_v5.js`,
    `${BASE}/versus_engine.js`,
    `${BASE}/firebase-service.js`,
    `${BASE}/manifest.json`,
    `${BASE}/icon-192.png`,
    `${BASE}/icon-512.png`
];

self.addEventListener('install', evento => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ARCHIVOS_CACHE).catch(err => {
                console.warn('[SW] Cache parcial:', err);
            });
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', evento => {
    evento.waitUntil(
        caches.keys().then(claves => {
            return Promise.all(
                claves
                    .filter(clave => clave !== CACHE_NAME)
                    .map(clave => caches.delete(clave))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', evento => {
    if (evento.request.method !== 'GET') return;
    const url = evento.request.url;
    if (url.includes('firebase') || url.includes('bible-api') || url.includes('firestore')) {
        return;
    }

    evento.respondWith(
        fetch(evento.request)
            .then(respuestaRed => {
                if (respuestaRed && respuestaRed.status === 200) {
                    const clon = respuestaRed.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(evento.request, clon);
                    });
                }
                return respuestaRed;
            })
            .catch(() => {
                return caches.match(evento.request).then(respuestaCache => {
                    if (respuestaCache) return respuestaCache;
                    if (evento.request.headers.get('accept').includes('text/html')) {
                        return new Response(
                            '<html><body style="background:#0F172A;color:#fff;text-align:center;padding:60px;font-family:sans-serif"><h1>Legado Biblico</h1><p style="opacity:0.5">Sin conexion.</p></body></html>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    }
                });
            })
    );
});
