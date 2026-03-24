const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// Agregar botones de respaldo justo antes del div#historico-cultos
const OLD_HIST_DIV = '          <div id="historico-cultos" style="display:grid;gap:10px;"></div>';
const NEW_HIST_DIV = `          <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button onclick="exportarCultosBackup()" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;letter-spacing:0.5px;">\\u{1F4BE} EXPORTAR RESPALDO</button>
              <button onclick="importarCultosBackup()" style="flex:1;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;letter-spacing:0.5px;">\\u{1F4C2} RESTAURAR</button>
          </div>
          <div id="historico-cultos" style="display:grid;gap:10px;"></div>`;

if (c.includes(OLD_HIST_DIV)) {
    c = c.replace(OLD_HIST_DIV, NEW_HIST_DIV);
    console.log('OK: botones EXPORTAR/RESTAURAR añadidos al historial');
} else {
    console.log('ERROR: no encontrado OLD_HIST_DIV');
    const idx = c.indexOf('historico-cultos');
    console.log('idx:', idx, c.substring(idx - 20, idx + 80));
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== GUARDADO. Tamano:', c.length);
