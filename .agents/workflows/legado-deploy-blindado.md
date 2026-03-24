---
description: Protocolo BLINDADO de deploy para Legado Bíblico — sincroniza versiones automáticamente y previene el bucle infinito de SW
---

# 🛡️ DEPLOY BLINDADO — LEGADO BÍBLICO
## Protocolo Anti-Loop de Versión

> Este workflow REEMPLAZA el proceso manual de deploy.
> Usarlo garantiza que `version.json`, `index.html` y `sw.js`
> siempre tienen el mismo número de versión.
> **Un número diferente = bucle infinito en la app.**

---

## ⚙️ PASO 1 — Determinar el número de versión siguiente

// turbo
Lee el archivo `version.json` y suma 1 al campo `version`:

```powershell
node -e "const f=require('fs'),d=JSON.parse(f.readFileSync('version.json'));console.log('VERSION ACTUAL:',d.version,'→ SIGUIENTE:',(parseInt(d.version)+1));"
```

Anota el número siguiente. Ese número se usará en TODOS los pasos.

---

## ⚙️ PASO 2 — Ejecutar el script de sincronización automática

// turbo
Ejecuta este script Node.js que sincroniza los 3 archivos críticos en un solo comando:

```powershell
node _sync_version.js NUMERO_VERSION
```

Este script hace automáticamente:
- ✅ Actualiza `version.json` con el nuevo número
- ✅ Actualiza `_HTML_VERSION` en `index.html` (línea ~44)
- ✅ Actualiza `CACHE_NAME` en `sw.js`
- ✅ Verifica que los 3 valores coincidan antes de continuar

**Si el script no existe**, créalo con el contenido del Paso 3.

---

## ⚙️ PASO 3 — Crear el script de sincronización (si no existe)

Crear el archivo `_sync_version.js` en la carpeta del proyecto con este contenido:

```javascript
// _sync_version.js — Sincronizador de versiones para Legado Bíblico
// Uso: node _sync_version.js NUMERO_VERSION
// Ejemplo: node _sync_version.js 369

const fs = require('fs');
const path = require('path');
const BASE = path.dirname(require.resolve('./version.json'));

const nuevaVersion = process.argv[2];
if (!nuevaVersion || isNaN(nuevaVersion)) {
    console.error('❌ ERROR: Debes pasar el número de versión.');
    console.error('   Ejemplo: node _sync_version.js 369');
    process.exit(1);
}

console.log('🔄 Sincronizando versión → ' + nuevaVersion);

// 1. version.json
const vJSON = { version: nuevaVersion, nombre: 'DEPLOY-v' + nuevaVersion, fecha: new Date().toISOString().split('T')[0] };
fs.writeFileSync(path.join(BASE, 'version.json'), JSON.stringify(vJSON), 'utf8');
console.log('  ✅ version.json → ' + nuevaVersion);

// 2. index.html — actualizar _HTML_VERSION
let html = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8');
const htmlBefore = html.match(/const _HTML_VERSION = '(\d+)'/)?.[1];
html = html.replace(
    /const _HTML_VERSION = '\d+';(\s*\/\/ ← CAMBIAR EN CADA DEPLOY)/,
    "const _HTML_VERSION = '" + nuevaVersion + "';$1"
);
fs.writeFileSync(path.join(BASE, 'index.html'), html, 'utf8');
console.log('  ✅ index.html: v' + htmlBefore + ' → v' + nuevaVersion);

// 3. sw.js — actualizar CACHE_NAME
let sw = fs.readFileSync(path.join(BASE, 'sw.js'), 'utf8');
const swBefore = sw.match(/legado-biblico-v(\d+)/)?.[1];
sw = sw.replace(/legado-biblico-v\d+/g, 'legado-biblico-v' + nuevaVersion);
fs.writeFileSync(path.join(BASE, 'sw.js'), sw, 'utf8');
console.log('  ✅ sw.js: legado-biblico-v' + swBefore + ' → legado-biblico-v' + nuevaVersion);

// 4. Verificación final
const vCheck = JSON.parse(fs.readFileSync(path.join(BASE, 'version.json'), 'utf8')).version;
const hCheck = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8').match(/const _HTML_VERSION = '(\d+)'/)?.[1];
const sCheck = fs.readFileSync(path.join(BASE, 'sw.js'), 'utf8').match(/legado-biblico-v(\d+)/)?.[1];

console.log('\n📊 VERIFICACIÓN:');
console.log('  version.json : ' + vCheck + (vCheck === nuevaVersion ? ' ✅' : ' ❌'));
console.log('  index.html   : ' + hCheck + (hCheck === nuevaVersion ? ' ✅' : ' ❌'));
console.log('  sw.js        : ' + sCheck + (sCheck === nuevaVersion ? ' ✅' : ' ❌'));

if (vCheck === nuevaVersion && hCheck === nuevaVersion && sCheck === nuevaVersion) {
    console.log('\n🚀 Sincronización PERFECTA. Listo para deploy.');
} else {
    console.error('\n🚨 ERROR: Los 3 archivos no coinciden. DETENER DEPLOY.');
    process.exit(1);
}
```

---

## ⚙️ PASO 4 — Subir los archivos al servidor

Después de sincronizar, hacer el deploy de los archivos modificados:

```powershell
powershell -ExecutionPolicy Bypass -File NOMBRE_DEPLOY.ps1
```

> **REGLA OBLIGATORIA**: El array de archivos del script de deploy
> **SIEMPRE** debe incluir estos 3 además de cualquier otro:
> ```
> 'sw.js', 'index.html', 'version.json'
> ```

---

## ⚙️ PASO 5 — Verificar en producción

// turbo
```powershell
node -e "fetch('https://legadobiblicopro.com/version.json').then(r=>r.json()).then(d=>console.log('Servidor OK: v'+d.version)).catch(e=>console.error('Error:',e.message));"
```

Confirmar que el número en producción coincide con el número que sincronizamos.

---

## 🚨 REGLAS INVIOLABLES

1. **NUNCA** cambiar solo `version.json`. Siempre sincronizar los 3 archivos.
2. **NUNCA** hacer deploy sin ejecutar primero `_sync_version.js`.
3. `sw.js`, `index.html` y `version.json` **SIEMPRE** viajan juntos en el deploy.
4. Si el número no coincide en los 3 archivos → **BUCLE INFINITO garantizado**.

---

## 🆘 Si la app ya está en bucle infinito

Ejecutar en este orden:
```powershell
# 1. Sincronizar versiones
node _sync_version.js NUMERO_VERSION

# 2. Deploy OBLIGATORIO de los 3 archivos críticos
powershell -ExecutionPolicy Bypass -File DEPLOY_FIX_LOOP.ps1
```

---

## 🖥️ Servidor de Producción

| Campo    | Valor |
|----------|-------|
| FTP Host | `82.25.87.104` |
| Usuario  | `u166906157` |
| Ruta     | `ftp://82.25.87.104/domains/legadobiblicopro.com/public_html` |
| URL App  | `https://legadobiblicopro.com` |
