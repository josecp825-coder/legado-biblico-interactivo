// ==========================================
// 🛡️ SERVICE WORKER — LEGADO BÍBLICO EXCLUSIVO
// MURO DE CONTENCIÓN REFORZADO v94
// ESTE SW SOLO SIRVE A LEGADO BÍBLICO (raíz "/")
// JAMÁS interferir con Agenda Digital ("/app/")
// ID ÚNICO: legado-biblico-app (manifest.json)
// ==========================================

const CACHE_NAME = 'legado-biblico-v257-MULTI-PLANTILLA';

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
    // ✅ M5+M6 FIX: Archivos que faltaban para modo offline
    './_ano_biblico_v2.js',
    './fix_herramientas_culto.js',
    './_nueva_funcion.js',
    './_juego_penal_biblico.js',
    './_penal_visual.js'
    // 🎨 Imágenes se cargan por demanda (cacheFirst)
    // para no bloquear la instalación del SW
];

self.addEventListener('install', evento => {
    // ✅ Cachear archivos UNO POR UNO — si uno falla, los demás sí se cachean
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
            console.log(`[SW-LEGADO] ✅ Cache v${CACHE_NAME}: ${ok} OK, ${fail} fallos`);
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
                    .map(clave => {
                        console.log('[SW-LEGADO] 🧹 Borrando caché viejo:', clave);
                        return caches.delete(clave);
                    })
            );
        }).then(() => {
            // ✅ Notificar a todos los clientes que hay nueva versión activa
            return self.clients.matchAll({ type: 'window' }).then(clientes => {
                clientes.forEach(cliente => {
                    cliente.postMessage({ type: 'SW_UPDATED', cache: CACHE_NAME });
                });
            });
        })
    );
    self.clients.claim();
});


// 📨 Escuchar mensaje SKIP_WAITING desde la app (botón "Actualizar App")
self.addEventListener('message', evento => {
    if (evento.data && evento.data.type === 'SKIP_WAITING') {
        console.log('[SW-LEGADO] 📨 SKIP_WAITING recibido — activando SW inmediatamente');
        self.skipWaiting();
    }
});

self.addEventListener('fetch', evento => {
    if (evento.request.method !== 'GET') return;

    const url = new URL(evento.request.url);

    // ═══════════════════════════════════════════════════════
    // 🛡️🛡️🛡️ MURO DE CONTENCIÓN BLINDADO 🛡️🛡️🛡️
    // Regla #1: Si la URL tiene CUALQUIER cosa de Agenda Digital → NO TOCAR
    // Regla #2: Si la URL tiene servicios externos → NO TOCAR
    // ═══════════════════════════════════════════════════════
    const bloqueado =
        url.pathname.startsWith('/app') ||          // Agenda Digital
        url.pathname.includes('/app/') ||            // Cualquier sub-ruta de app
        url.pathname.includes('project_analysis') || // Carpeta local de Agenda
        url.href.includes('firebase') ||             // Firebase APIs
        url.href.includes('firestore') ||            // Firestore
        url.href.includes('googleapis') ||           // Google APIs
        url.href.includes('bible-api') ||            // API Bíblica
        url.href.includes('github') ||               // GitHub (CBA Comentario)
        url.href.includes('githubusercontent') ||     // GitHub raw (archivos CBA)
        url.href.includes('gemini') ||               // Gemini AI
        url.href.includes('vite') ||                 // Archivos Vite
        url.pathname.endsWith('.tsx') ||              // Archivos React
        url.pathname.endsWith('.ts');                 // Archivos TypeScript

    if (bloqueado) {
        // 🚫 No interceptar — dejar que el navegador/sub-app maneje esto
        return;
    }

    // ═══════════════════════════════════════════════════════
    // ✅ SOLO servir archivos de LEGADO BÍBLICO
    // Estrategia: Network First, Cache Fallback
    // ═══════════════════════════════════════════════════════
    evento.respondWith(
        fetch(evento.request, { cache: 'no-cache' })
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
                    if (evento.request.headers.get('accept')?.includes('text/html')) {
                        return new Response(
                            '<html><body style="background:#0F172A;color:#fff;text-align:center;padding:60px;font-family:sans-serif"><h1>📖 Legado Bíblico</h1><p style="opacity:0.5">Sin conexión. Reconéctate para continuar.</p></body></html>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    }
                });
            })
    );
});

