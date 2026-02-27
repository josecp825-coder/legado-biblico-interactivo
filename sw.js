// ==========================================
// SERVICE WORKER — LEGADO BIBLICO PWA v4
// AUTO-UPDATE: Network First strategy
// ==========================================

const BASE = '/legado-biblico-interactivo';
const CACHE_NAME = 'legado-biblico-v4';

const ARCHIVOS_CACHE = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/style.css`,
    `${BASE}/mobile.css`,
    `${BASE}/data_motor.js`,
    `${BASE}/data_kids.js`,
    `${BASE}/data_jovenes.js`,
    `${BASE}/data_adultos.js`,
    `${BASE}/data_teens.js`,
    `${BASE}/versus_engine.js`,
    `${BASE}/firebase-service.js`,
    `${BASE}/manifest.json`,
    `${BASE}/icon-192.png`,
    `${BASE}/icon-512.png`
];

// INSTALACION
self.addEventListener('install', evento => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ARCHIVOS_CACHE).catch(err => {
                console.warn('[SW] Cache parcial:', err);
            });
        })
    );
    // Activa inmediatamente sin esperar
    self.skipWaiting();
});

// ACTIVACION — elimina caches viejas y toma control
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
    // Toma control de todas las pestanas abiertas inmediatamente
    self.clients.claim();
});

// FETCH — Network First: siempre intenta la red primero
// Si no hay internet, usa el cache como respaldo
self.addEventListener('fetch', evento => {
    // Solo intercepta peticiones GET
    if (evento.request.method !== 'GET') return;

    // Para APIs externas (Firebase, Biblia API) — solo red
    const url = evento.request.url;
    if (url.includes('firebase') || url.includes('bible-api') || url.includes('firestore')) {
        return;
    }

    evento.respondWith(
        // 1. Intenta la red primero
        fetch(evento.request)
            .then(respuestaRed => {
                // Si la respuesta es valida, actualiza el cache
                if (respuestaRed && respuestaRed.status === 200) {
                    const clon = respuestaRed.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(evento.request, clon);
                    });
                }
                return respuestaRed;
            })
            .catch(() => {
                // 2. Sin internet — usa el cache
                return caches.match(evento.request).then(respuestaCache => {
                    if (respuestaCache) return respuestaCache;
                    // Sin cache tampoco — pagina offline
                    if (evento.request.headers.get('accept').includes('text/html')) {
                        return new Response(
                            '<html><body style="background:#0F172A;color:#fff;text-align:center;padding:60px;font-family:sans-serif"><h1>Legado Biblico</h1><p style="opacity:0.5">Sin conexion. Reconecta para acceder.</p></body></html>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    }
                });
            })
    );
});

// MENSAJE desde la app para forzar actualizacion
self.addEventListener('message', evento => {
    if (evento.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
