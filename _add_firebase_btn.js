const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// 1. Agregar boton de sincronizar Firebase junto a los botones de exportar/restaurar
const OLD_BTN = `          <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button onclick="exportarCultosBackup()" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;letter-spacing:0.5px;">\\u{1F4BE} EXPORTAR RESPALDO</button>
              <button onclick="importarCultosBackup()" style="flex:1;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;letter-spacing:0.5px;">\\u{1F4C2} RESTAURAR</button>
          </div>`;
const NEW_BTN = `          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button onclick="exportarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4BE} EXPORTAR</button>
              <button onclick="importarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4C2} RESTAURAR</button>
              <button onclick="sincronizarCultosDesdeFirebase()" style="flex:1;min-width:90px;padding:8px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.25);color:#ff4757;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F525} FIREBASE SYNC</button>
          </div>`;

if (c.includes(OLD_BTN)) {
    c = c.replace(OLD_BTN, NEW_BTN);
    console.log('OK: boton FIREBASE SYNC agregado');
} else {
    console.log('ERROR: no encontrado bloque botones');
    const idx = c.indexOf('EXPORTAR RESPALDO');
    if (idx >= 0) console.log(c.substring(idx - 50, idx + 200));
}

// 2. Llamar sincronizarCultosDesdeFirebase cuando se cargue el modulo de iglesia
// Buscar donde se llama cargarCultosSemana() al iniciar
const OLD_INIT = `    cargarCultosSemana();`;
const NEW_INIT = `    cargarCultosSemana();
    // 🔥 Sincronizar con Firebase al abrir el módulo
    setTimeout(function() {
        if (typeof sincronizarCultosDesdeFirebase === 'function') {
            sincronizarCultosDesdeFirebase();
        }
    }, 2000);`;

// Solo reemplazar la primera ocurrencia (al iniciar el modulo)
const firstIdx = c.indexOf(OLD_INIT);
if (firstIdx >= 0) {
    c = c.substring(0, firstIdx) + NEW_INIT + c.substring(firstIdx + OLD_INIT.length);
    console.log('OK: auto-sync al iniciar modulo agregado');
} else {
    console.log('ERROR: no encontrado cargarCultosSemana al init');
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== GUARDADO. Tamano:', c.length);
