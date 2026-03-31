
        // �������������������������������������������
        // 🛡� ESCUDO ANTI-LOOP DE RECARGA v84
        // Previene congelamientos por recargas infinitas
        // �������������������������������������������
        function puedeRecargar() {
            const COOLDOWN_MS = 15000; // 15 segundos de espera m�nima entre recargas
            const ultimaRecarga = parseInt(sessionStorage.getItem('legado_reload_ts') || '0');
            const ahora = Date.now();
            if (ahora - ultimaRecarga < COOLDOWN_MS) {
                console.warn('[ANTI-LOOP] ⛔ Recarga bloqueada � cooldown activo (' + Math.round((COOLDOWN_MS - (ahora - ultimaRecarga)) / 1000) + 's restantes)');
                return false;
            }
            sessionStorage.setItem('legado_reload_ts', ahora.toString());
            return true;
        }

        // 🔥 RESET NUCLEAR por URL: agendatecnicadigital.com/?reset=1
        if (window.location.search.includes('reset=1')) {
            (async function() {
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(regs.map(function(r){ return r.unregister(); }));
                }
                if ('caches' in window) {
                    const keys = await caches.keys();
                    await Promise.all(keys.map(function(k){ return caches.delete(k); }));
                }
                localStorage.removeItem('legado_v3');
                sessionStorage.clear();
                window.location.replace('./');
            })();
        }

        // ���������������������������������������������������
        // SISTEMA DE VERSI�N EMBEBIDA v247
        // NO depende de fetch/red � comparaci�n instant�nea
        // Este n�mero cambia con cada deploy en index.html
        // ���������������������������������������������������
        const _HTML_VERSION = '377'; // CORREGIDO

        async function checkVersion() {
            const versionGuardada = localStorage.getItem('legado_v3') || '0';

            // 1. Verificaci�n instant�nea: �el HTML que se carg� es nuevo?
            if (versionGuardada !== '0' && versionGuardada !== _HTML_VERSION) {
                // El index.html actual tiene una versi�n DIFERENTE a la guardada
                // → Limpiar cach� y recargar
                console.log('[VERSION] 🆕 HTML v' + _HTML_VERSION + ' vs guardado v' + versionGuardada + ' → ACTUALIZANDO');
                const msg = document.getElementById('pwa-splash-msg');
                if (msg) msg.textContent = 'Actualizando a v' + _HTML_VERSION + '...';

                try {
                    if ('serviceWorker' in navigator) {
                        const regs = await navigator.serviceWorker.getRegistrations();
                        await Promise.all(regs.map(r => r.unregister()));
                    }
                    if ('caches' in window) {
                        const keys = await caches.keys();
                        await Promise.all(keys.map(k => caches.delete(k)));
                    }
                } catch(e) { console.warn('[VERSION] cleanup error:', e); }

                localStorage.setItem('legado_v3', _HTML_VERSION);
                sessionStorage.removeItem('legado_reload_ts');
                window.location.replace('./?v=' + _HTML_VERSION + '&t=' + Date.now());
                return;
            }

            // 2. Primera vez o versi�n correcta → guardar y confirmar con servidor
            localStorage.setItem('legado_v3', _HTML_VERSION);

            // 3. Verificaci�n secundaria con servidor (no bloquea el splash)
            try {
                const res = await fetch('./version.json?nocache=' + Date.now(), {cache:'no-store'});
                const data = await res.json();
                if (data.version !== _HTML_VERSION) {
                    // El servidor tiene una versi�n A�N m�s nueva que este HTML
                    // ✅ Guard anti-loop: verificar cooldown antes de recargar
                    if (!puedeRecargar()) {
                        console.warn('[VERSION] ⛔ Recarga secundaria bloqueada por cooldown');
                        window._ocultarSplash();
                        return;
                    }
                    console.log('[VERSION] 🔄 Servidor tiene v' + data.version + ', actualizando...');
                    if ('serviceWorker' in navigator) {
                        const regs = await navigator.serviceWorker.getRegistrations();
                        await Promise.all(regs.map(r => r.unregister()));
                    }
                    if ('caches' in window) {
                        const keys = await caches.keys();
                        await Promise.all(keys.map(k => caches.delete(k)));
                    }
                    localStorage.setItem('legado_v3', data.version);
                    sessionStorage.removeItem('legado_reload_ts');
                    window.location.replace('./?v=' + data.version + '&t=' + Date.now());
                    return;
                }
            } catch (e) {
                console.warn('[VERSION] Sin acceso al servidor (modo offline ok):', e);
            }

            // ✅ Todo bien � ocultar splash
            window._ocultarSplash();
        }

        checkVersion();
        window.addEventListener('online', () => checkVersion());

        // ✅ Escuchar cuando el Service Worker se actualiza → recargar p�gina
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', function(ev) {
                if (ev.data && ev.data.type === 'SW_UPDATED') {
                    console.log('[PWA] Nuevo SW activo:', ev.data.cache, '→ recargando...');
                    window.location.replace('./?v=sw&t=' + Date.now());
                }
            });
        }

        // ✅ Funci�n global para forzar actualizaci�n manual (bot�n en la UI)
        window.forzarActualizacion = async function() {
            if (!confirm('🔄 Actualizar Legado B�blico\n\nSe descargar� el c�digo m�s reciente.\nTus datos est�n protegidos.\n\n�Continuar?')) return;
            try {
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(regs.map(r => r.unregister()));
                }
                if ('caches' in window) {
                    const keys = await caches.keys();
                    await Promise.all(keys.map(k => caches.delete(k)));
                }
                localStorage.removeItem('legado_v3');
            } catch(e) { console.warn(e); }
            window.location.replace('./index.html?nocache=' + Date.now());
        };

    