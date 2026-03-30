// ============================================================
// _sync_version.js — Sincronizador de versiones para Legado Bíblico
// Uso: node _sync_version.js NUMERO_VERSION
// Ejemplo: node _sync_version.js 369
// ============================================================

const fs = require('fs');
const path = require('path');
const BASE = __dirname;

const nuevaVersion = process.argv[2];
if (!nuevaVersion || isNaN(nuevaVersion)) {
    console.error('');
    console.error('❌ ERROR: Debes pasar el número de versión.');
    console.error('   Ejemplo: node _sync_version.js 369');
    console.error('');
    process.exit(1);
}

console.log('');
console.log('🔄 Sincronizando versión Legado Bíblico → v' + nuevaVersion);
console.log('─────────────────────────────────────────────');

// ── 1. version.json ───────────────────────────────────────────
const vPath = path.join(BASE, 'version.json');
const vOld = JSON.parse(fs.readFileSync(vPath, 'utf8')).version;
const vJSON = { version: nuevaVersion, nombre: 'DEPLOY-v' + nuevaVersion, fecha: new Date().toISOString().split('T')[0] };
fs.writeFileSync(vPath, JSON.stringify(vJSON), 'utf8');
console.log('  ✅ version.json : v' + vOld + ' → v' + nuevaVersion);

// ── 2. index.html — _HTML_VERSION y SCRIPTS ──────────────────────
const hPath = path.join(BASE, 'index.html');
let html = fs.readFileSync(hPath, 'utf8');
const hOld = html.match(/const _HTML_VERSION = '(\d+)'/)?.[1];
if (!hOld) {
    console.error('  ❌ ERROR: No se encontró _HTML_VERSION en index.html');
    process.exit(1);
}
html = html.replace(
    /const _HTML_VERSION = '\d+';(\s*\/\/.*CAMBIAR EN CADA DEPLOY)/,
    "const _HTML_VERSION = '" + nuevaVersion + "';$1"
);

// FORZAR BYPASS DEL CACHÉ VIEJO (Truco Loophole "vite") // Aplica globalmente a todos los JS
html = html.replace(/(\.js\?v=)\d+/g, '$1' + nuevaVersion);
html = html.replace(/(&safe=vite)?/g, function(match, p1) { return p1 ? '' : ''; }); // limpiamos posibles sobrantes
html = html.replace(/auth_mundial\.js\?v=\d+/g, 'auth_mundial.js?v=' + nuevaVersion + '&safe=vite');
html = html.replace(/ui_core\.js\?v=\d+/g, 'ui_core.js?v=' + nuevaVersion + '&safe=vite');

fs.writeFileSync(hPath, html, 'utf8');
console.log('  ✅ index.html   : v' + hOld + ' → v' + nuevaVersion);

// ── 3. sw.js — CACHE_NAME ─────────────────────────────────────
const sPath = path.join(BASE, 'sw.js');
let sw = fs.readFileSync(sPath, 'utf8');
const sOld = sw.match(/legado-biblico-v(\d+)/)?.[1];
if (!sOld) {
    console.error('  ❌ ERROR: No se encontró CACHE_NAME en sw.js');
    process.exit(1);
}
sw = sw.replace(/legado-biblico-v\d+/g, 'legado-biblico-v' + nuevaVersion);
fs.writeFileSync(sPath, sw, 'utf8');
console.log('  ✅ sw.js        : v' + sOld + ' → v' + nuevaVersion);

// ── 4. Verificación final ──────────────────────────────────────
const vCheck = JSON.parse(fs.readFileSync(vPath, 'utf8')).version;
const hCheck = fs.readFileSync(hPath, 'utf8').match(/const _HTML_VERSION = '(\d+)'/)?.[1];
const sCheck = fs.readFileSync(sPath, 'utf8').match(/legado-biblico-v(\d+)/)?.[1];

console.log('─────────────────────────────────────────────');
const ok = vCheck === nuevaVersion && hCheck === nuevaVersion && sCheck === nuevaVersion;

if (ok) {
    console.log('');
    console.log('🚀 SINCRONIZACIÓN PERFECTA — v' + nuevaVersion + ' en los 3 archivos.');
    console.log('   → Ahora ejecuta el script de deploy.');
    console.log('   → SIEMPRE incluye: sw.js + index.html + version.json.');
    console.log('');
} else {
    console.error('');
    console.error('🚨 ERROR: Verificación fallida. NO hagas deploy.');
    console.error('   version.json : ' + vCheck + (vCheck === nuevaVersion ? ' ✅' : ' ❌'));
    console.error('   index.html   : ' + hCheck + (hCheck === nuevaVersion ? ' ✅' : ' ❌'));
    console.error('   sw.js        : ' + sCheck + (sCheck === nuevaVersion ? ' ✅' : ' ❌'));
    process.exit(1);
}
