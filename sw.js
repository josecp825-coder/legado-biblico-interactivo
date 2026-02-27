// ==========================================
// SERVICE WORKER — LEGADO BÍBLICO PWA
// Permite uso OFFLINE y instalación en
// celular y escritorio como app nativa
// ==========================================

const CACHE_NAME = 'legado-biblico-v1';

// Archivos que se guardan para uso sin internet
const ARCHIVOS_CACHE = [
    './',
    './index.html',
    './data_motor.js',
    './data_kids.js',
    './data_jovenes.js',
    './data_adultos.js',
    './data_teens.js',
    './versus_engine.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    // Imágenes del módulo Niños
    './biblia_ninos_hero.png.png',
    './daniel_leones_cartoon.png.png',
    './noe_arca_cartoon.png.png',
    // Imágenes del módulo Jóvenes
    './jovenes_profecia_hero.png.png',
    './daniel_profecia_timeline.png.png',
    // Imágenes del módulo Adultos
    './adultos_seminario_hero.png.png',
    './egw_portrait_adventista.png.png',
    // Imagen Game Over
    './nino_triste.png.png'
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
