const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\index.html';
let c = fs.readFileSync(FILE, 'utf8');

// Reemplazar el bloque exacto encontrado
const OLD = `                    // 🛡️ Solo recargar si el anti-loop lo permite
                    if (puedeRecargar()) {
                        window.location.reload(true);
                    }`;
const NEW = `                    // Recarga directa - seguro porque solo pasa cuando version cambia
                    sessionStorage.removeItem('legado_reload_ts');
                    window.location.replace(window.location.href.split('?')[0] + '?nocache=' + Date.now());`;

if (c.includes(OLD)) {
    c = c.replace(OLD, NEW);
    console.log('OK: checkVersion ahora recarga sin anti-loop');
} else {
    console.log('ERROR aun. Mostrando contexto...');
    const idx = c.indexOf('window.location.reload(true)');
    console.log(JSON.stringify(c.substring(idx - 200, idx + 100)));
}

// Actualizar indicador v149 -> v202
c = c.replace(/>v149</g, '>v202<');
console.log('v202 en UI:', c.includes('>v202<'));

fs.writeFileSync(FILE, c, 'utf8');
console.log('Guardado');
