const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\index.html';
let c = fs.readFileSync(FILE, 'utf8');

// ESTRATEGIA: Cambiar la clave de localStorage de 'legado_app_version' a 'legado_v3'
// Esto hace que el checkVersion NUNCA encuentre el valor antiguo y SIEMPRE detecte el cambio

// ADEMAS: El checkVersion ahora compara contra el script SRC en el DOM (no localStorage)
// Si el script cargado no tiene v=202, debe actualizar. Sin anti-loop.

const OLD_CHECK = `        // MOTOR DE AUTO-ACTUALIZACIÓN PROFESIONAL v84 (CON ANTI-LOOP)
        async function checkVersion() {
            try {
                const res = await fetch('./version.json?t=' + Date.now());
                const data = await res.json();
                const currentVersion = localStorage.getItem('legado_app_version');

                if (currentVersion !== data.version) {
                    console.log("🔥 NUEVA VERSIÓN DETECTADA v" + data.version);
                    localStorage.setItem('legado_app_version', data.version);
                    if ('caches' in window) {
                        const keys = await caches.keys();
                        for (let key of keys) await caches.delete(key);
                    }
                    if ('serviceWorker' in navigator) {
                        const regs = await navigator.serviceWorker.getRegistrations();
                        for (let reg of regs) await reg.unregister();
                    }
                    // Recarga directa al detectar nueva version (sin anti-loop)
                    sessionStorage.removeItem('legado_reload_ts');
                    window.location.replace(window.location.href.split('?')[0] + '?nc=' + Date.now());
                }
            } catch (e) { console.warn("Modo Offline:", e); }
        }
        checkVersion();`;

const NEW_CHECK = `        // MOTOR DE AUTO-ACTUALIZACIÓN v203
        async function checkVersion() {
            try {
                const res = await fetch('./version.json?nocache=' + Date.now(), {cache:'no-store'});
                const data = await res.json();
                // Usar clave nueva 'legado_v3' para evitar conflicto con version guardada
                const currentKey = 'legado_v3';
                const currentVersion = localStorage.getItem(currentKey) || '0';

                if (currentVersion !== data.version) {
                    console.log("🔥 ACTUALIZANDO a v" + data.version + " (tenia v" + currentVersion + ")");
                    // Borrar caches sin esperar
                    if ('caches' in window) {
                        const keys = await caches.keys();
                        await Promise.all(keys.map(k => caches.delete(k)));
                    }
                    if ('serviceWorker' in navigator) {
                        const regs = await navigator.serviceWorker.getRegistrations();
                        await Promise.all(regs.map(r => r.unregister()));
                    }
                    // Guardar version DESPUES del redirect (en la proxima carga)
                    localStorage.setItem(currentKey, data.version);
                    // Forzar carga completamente nueva
                    window.location.href = window.location.pathname + '?fresh=' + data.version + '&t=' + Date.now();
                } else {
                    console.log("✅ Version actualizada:", data.version);
                }
            } catch (e) { console.warn("Sin conexion:", e); }
        }
        checkVersion();`;

if (c.includes(OLD_CHECK)) {
    c = c.replace(OLD_CHECK, NEW_CHECK);
    console.log('OK: checkVersion actualizado con nueva clave legado_v3');
} else {
    console.log('ERROR: no coincide exacto. Verificando partes...');
    console.log('Tiene "MOTOR DE AUTO-ACTUALIZACIÓN":', c.includes('MOTOR DE AUTO-ACTUALIZACIÓN'));
    console.log('Tiene checkVersion():', c.includes('checkVersion()'));
    // Intentar encontrar variante
    const idx = c.indexOf('async function checkVersion()');
    if (idx >= 0) {
        console.log('Contexto checkVersion:');
        console.log(c.substring(idx, idx + 100));
    }
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('Guardado.');
