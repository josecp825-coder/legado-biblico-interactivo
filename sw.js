// ==========================================
// SERVICE WORKER — LEGADO BÍBLICO PWA v3
// Permite uso OFFLINE y instalación en
// celular y escritorio como app nativa
// ==========================================

const BASE = '/legado-biblico-interactivo';
const CACHE_NAME = 'legado-biblico-v3';

// Archivos que se guardan para uso sin internet
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
    `${BASE}/icon-512.png`,
    // Imágenes del módulo Niños
    `${BASE}/biblia_ninos_hero_1772168630395.png`,
    `${BASE}/daniel_leones_cartoon_1772168642765.png`,
    `${BASE}/noe_arca_cartoon_1772168653149.png`,
    // Imágenes del módulo Jóvenes
    `${BASE}/jovenes_profecia_hero_1772169591746.png`,
    `${BASE}/daniel_profecia_timeline_1772169603328.png`,
    // Imágenes del módulo Adultos
    `${BASE}/adultos_seminario_hero_1772170415343.png`,
    `${BASE}/egw_portrait_adventista_1772170430747.png`,
    // Imagen Game Over
    `${BASE}/nino_triste.png.png`
];

// INSTALACIÓN — guarda todos los archivos en cache
self.addEventListener('install', evento => {
    console.log('[SW] Instalando Legado Bíblico PWA...');
    evento.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Guardando archivos en cache...');
            return cache.addAll(ARCHIVOS_CACHE).catch(err => {
                console.warn('[SW] Algunos archivos no se pudieron cachear:', err);
            });
        })
    );
    self.skipWaiting();
});

// ACTIVACIÓN — limpia caches anteriores
self.addEventListener('activate', evento => {
    console.log('[SW] Activando nueva versión...');
    evento.waitUntil(
        caches.keys().then(claves => {
            return Promise.all(
                claves
                    .filter(clave => clave !== CACHE_NAME)
                    .map(clave => {
                        console.log('[SW] Eliminando cache antigua:', clave);
                        return caches.delete(clave);
                    })
            );
        })
    );
    self.clients.claim();
});

// FETCH — responde con cache si no hay internet
self.addEventListener('fetch', evento => {
    evento.respondWith(
        caches.match(evento.request).then(respuesta => {
            if (respuesta) {
                return respuesta; // Sirve desde cache
            }
            // Si no está en cache, intenta la red
            return fetch(evento.request).then(respuestaRed => {
                // Solo cachea respuestas válidas
                if (!respuestaRed || respuestaRed.status !== 200 || respuestaRed.type !== 'basic') {
                    return respuestaRed;
                }
                const respuestaClon = respuestaRed.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(evento.request, respuestaClon);
                });
                return respuestaRed;
            }).catch(() => {
                // Sin internet y sin cache — muestra página offline básica
                return new Response(
                    '<h1 style="color:white;text-align:center;padding:50px;background:#1a0a2e;height:100vh;margin:0;font-family:sans-serif;">📖 Legado Bíblico<br><small style="font-size:0.5em;opacity:0.6;">Conecta a internet para cargar los módulos</small></h1>',
                    { headers: { 'Content-Type': 'text/html' } }
                );
            });
        })
    );
});
