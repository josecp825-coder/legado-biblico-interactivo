// ==========================================
// 🛡️ SERVICE WORKER — LEGADO BÍBLICO EXCLUSIVO
// MURO DE CONTENCIÓN REFORZADO v95
// ESTE SW SOLO SIRVE A LEGADO BÍBLICO (raíz "/")
// JAMÁS interferir con Agenda Digital ("/app/")
// ID ÚNICO: legado-biblico-app (manifest.json)
// ESTRATEGIA: Cache First + Network Update (v368)
// ==========================================

const CACHE_NAME = 'legado-biblico-v386';

// ✅ SOLO archivos de LEGADO BÍBLICO (raíz)
const ARCHIVOS_CACHE = [
    './',
    './index.html',
    './legado.html',
    './style.css',
    './mobile.css',
    './data_motor.js',
    './cba_motor.js',
    './data_kids_v2.js',
    './kids_cinema.js',
    './data_jovenes.js',
    './data_adultos_v37.js',
    './trivia_parte1.js',
    './trivia_parte2.js',
    './trivia_parte3.js',
    './data_teens_v8.js',
    './himnario_data.js',
    './data_iglesia_v1.js',
    './_add_eventos_especiales.js',
    './_pdf_eventos.js',
    './html2canvas.min.js',
    './jspdf.umd.min.js',
    './_nueva_funcion.js',
    './versus_engine.js',
    './firebase-service.js',
    './firebase-config.js',
    './teen-auth.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './version.json',
    './_ano_biblico_v2.js',
    './fix_herramientas_culto.js',
    './_juego_penal_biblico.js',
    './_penal_visual.js',
    './_firebase_sync_iglesia.js'
];

// ─── INSTALL: llenar caché uno por uno ───────────────────────────
self.addEventListener('install', evento => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            let ok = 0, fail = 0;
            for (const archivo of ARCHIVOS_CACHE) {
                try {
                    await cache.add(new Request(archivo, { cache: 'no-cache' }));
                    ok++;
                } catch (e) {
                    fail++;
                    console.warn('[SW-LEGADO] ⚠️ No se pudo cachear:', archivo, e.message);
                }
            }
            console.log(`[SW-LEGADO] ✅ Cache ${CACHE_NAME}: ${ok} OK, ${fail} fallos`);
        })
    );
    self.skipWaiting();
});

// ─── ACTIVATE: limpiar cachés viejos ─────────────────────────────
self.addEventListener('activate', evento => {
    evento.waitUntil(
        caches.keys().then(claves => {
            return Promise.all(
                claves
                    .filter(clave => clave !== CACHE_NAME)
                    .map(clave => {
                        console.log('[SW-LEGADO] 🧹 Borrando caché viejo:', clave);
                        return caches.delete(clave);
                    })
            );
        }).then(() => {
            return self.clients.matchAll({ type: 'window' }).then(clientes => {
                clientes.forEach(cliente => {
                    cliente.postMessage({ type: 'SW_UPDATED', cache: CACHE_NAME });
                });
            });
        })
    );
    self.clients.claim();
});

// ─── MENSAJE: SKIP_WAITING desde la app ──────────────────────────
self.addEventListener('message', evento => {
    if (evento.data && evento.data.type === 'SKIP_WAITING') {
        console.log('[SW-LEGADO] 📨 SKIP_WAITING — activando SW inmediatamente');
        self.skipWaiting();
    }
});

// ─── FETCH: Cache First + Network Update en background ───────────
// La app carga INSTANTÁNEAMENTE desde caché.
// La red actualiza el caché en segundo plano sin bloquear.
// Esto elimina el problema de "carga infinita" con servidores lentos.
self.addEventListener('fetch', evento => {
    if (evento.request.method !== 'GET') return;

    const url = new URL(evento.request.url);

    // 🛡️ MURO DE CONTENCIÓN: no tocar recursos externos ni Agenda Digital
    const bloqueado =
        url.pathname.startsWith('/app') ||
        url.pathname.includes('/app/') ||
        url.pathname.includes('project_analysis') ||
        url.href.includes('firebase') ||
        url.href.includes('firestore') ||
        url.href.includes('googleapis') ||
        url.href.includes('bible-api') ||
        url.href.includes('github') ||
        url.href.includes('githubusercontent') ||
        url.href.includes('gemini') ||
        url.href.includes('vite') ||
        url.pathname.endsWith('.tsx') ||
        url.pathname.endsWith('.ts');

    if (bloqueado) return;

    // ✅ Cache First + Network Update
    // EXCEPCIÓN: index.html y version.json siempre van a la red primero
    // para evitar loops de versión
    const esHtml = url.pathname === '/' || 
                   url.pathname === '/index.html' || 
                   url.pathname.endsWith('/index.html') ||
                   url.href.includes('version.json');

    if (esHtml) {
        // Network First para el HTML principal y version.json
        evento.respondWith(
            fetch(evento.request, { cache: 'no-cache' })
                .then(respuestaRed => {
                    if (respuestaRed && respuestaRed.status === 200) {
                        caches.open(CACHE_NAME).then(c => c.put(evento.request, respuestaRed.clone()));
                    }
                    return respuestaRed;
                })
                .catch(() => caches.match(evento.request))
        );
        return;
    }

    evento.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(evento.request).then(respuestaCache => {

                // Actualizar caché en segundo plano (no bloquea)
                const fetchPromise = fetch(evento.request, { cache: 'no-cache' })
                    .then(respuestaRed => {
                        if (respuestaRed && respuestaRed.status === 200) {
                            cache.put(evento.request, respuestaRed.clone());
                        }
                        return respuestaRed;
                    })
                    .catch(() => null);

                // Si hay caché → responder INMEDIATAMENTE
                if (respuestaCache) return respuestaCache;

                // Si NO hay caché → esperar la red (primera carga)
                return fetchPromise.then(respuestaRed => {
                    if (respuestaRed) return respuestaRed;
                    if (evento.request.headers.get('accept')?.includes('text/html')) {
                        return new Response(
                            '<html><body style="background:#0F172A;color:#fff;text-align:center;padding:60px;font-family:sans-serif"><h1>📖 Legado Bíblico</h1><p style="opacity:0.5">Sin conexión. Reconéctate para continuar.</p></body></html>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    }
                });
            });
        })
    );
});
