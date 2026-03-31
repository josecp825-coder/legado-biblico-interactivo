
        async function superHuracanUpdate() {
            const btn = document.getElementById('btn-actualizar-pwa');
            if (btn) { btn.innerHTML = '🔥 RESPALDANDO Y LIMPIANDO...'; btn.disabled = true; btn.style.background='linear-gradient(135deg,#e17055,#d63031)'; }

            try {
                // 1. FORZAR GUARDADO EN LA NUBE (por si acaso)
                if (typeof window.superGuardarNubeUniversal === 'function') {
                    try { await window.superGuardarNubeUniversal(); } catch(e) {}
                }

                // 2. Destruir SW activo forzando skips y deletes
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
                }

                // 3. Desregistrar TODOS los Service Workers (MEGA PURGA)
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    for(let r of regs) { await r.unregister(); }
                }

                // 4. Borrar TODOS los cach�s del navegador
                if ('caches' in window) {
                    const keys = await caches.keys();
                    for(let k of keys) { await caches.delete(k); }
                }

                // 5. Preservar datos vitales
                const _save = {};
                ['legado_user_name','legado_cultos_semanales','legado_liturgias',
                 'legado_font_paso','cal_bio_registered','cal_bio_cred_id','cal_director',
                 'plan_ano_biblico','plan_fecha_inicio','plan_dias_leidos',
                 'legado_eventos','legado_predicaciones'].forEach(k => {
                    const v = localStorage.getItem(k);
                    if (v) _save[k] = v;
                });
                
                // Purgar localStorage por completo de basura y cach� antigua
                localStorage.clear();
                sessionStorage.clear();
                
                // Restaurar los datos vitales puros
                Object.keys(_save).forEach(k => localStorage.setItem(k, _save[k]));

                // Forzar reload f�sico desde el servidor
                if (btn) btn.innerHTML = '🚀 REINICIANDO...';
                setTimeout(() => {
                    window.location.href = window.location.pathname + '?hard_reset=' + Date.now();
                }, 400);

            } catch (err) {
                // Fallback nuclear
                window.location.href = window.location.pathname + '?hard_reset_err=' + Date.now();
            }
        }

    