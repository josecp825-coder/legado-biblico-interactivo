const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// El bloque roto: desde la linea del input mes-especifico hasta el cierre del historico-cultos
// Buscamos el fragmento exacto para reemplazarlo

const ROTO = `            <div style="display:flex;gap:8px;align-items:center;">
              <input type="month" id="pdf-mes-especifico" style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1px solid rgba(85,239,196,0.2);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;">
            <input type="text" id="search-culto" placeholder="\\u{1F50D} Buscar nombre, fecha..." \r\n                oninput="cargarCultosSemana()" \r\n                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"\r\n                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"\r\n                style="padding:9px 12px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:8px;outline:none;font-size:0.75rem;width:170px;">\r\n\r\n          </div>\r\n          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">\r\n              <button onclick="exportarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4BE} EXPORTAR</button>\r\n              <button onclick="importarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4C2} RESTAURAR</button>\r\n              <button onclick="sincronizarCultosDesdeFirebase()" style="flex:1;min-width:90px;padding:8px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.25);color:#ff4757;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F525} FIREBASE SYNC</button>\r\n          </div>\r\n          <div id="historico-cultos" style="display:grid;gap:10px;"></div>\r\n        </div>`;

const CORRECTO = `            <div style="display:flex;gap:8px;align-items:center;">
              <input type="month" id="pdf-mes-especifico" style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1px solid rgba(85,239,196,0.2);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;">
              <button onclick="generarPDFCultosPeriodo('mes-especifico')" style="padding:9px 12px;background:rgba(85,239,196,0.12);border:1px solid rgba(85,239,196,0.35);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;white-space:nowrap;">\\u{1F4C4} Mes elegido</button>
            </div>
          </div>
          <!-- Estadísticas participante -->
          <div style="background:rgba(162,155,254,0.05);border:1px solid rgba(162,155,254,0.2);border-radius:16px;padding:16px;">
            <div style="color:#a29bfe;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">\\u{1F4CA} PARTICIPACIÓN POR PERSONA</div>
            <select id="select-participante" onchange="mostrarEstadisticasParticipante(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(162,155,254,0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;margin-bottom:10px;">
              <option value="">— Elegir participante —</option>
            </select>
            <div id="stats-participante"></div>
          </div>
        </div>

        <!-- ======== TAB 3: CULTOS REGISTRADOS ======== -->
        <div id="tab-content-cultos" style="display:none;">
          <!-- ETIQUETA + DESPLEGABLE -->
          <div style="margin-bottom:14px;">
            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;padding-left:2px;">
              ⬇️ ELEGIR DÍA DE CULTO
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <select id="tipo-historial-select" onchange="cargarCultosSemana()" style="flex:1;background:rgba(255,107,107,0.1);border:1.5px solid #ff6b6b;color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;padding:9px 12px;border-radius:10px;outline:none;cursor:pointer;">
                <option value="sabado">⛪ CULTO DE SÁBADO</option>
                <option value="semana">📅 CULTO DE SEMANA</option>
              </select>
              <input type="text" id="search-culto" placeholder="\\u{1F50D} Buscar..."
                oninput="cargarCultosSemana()"
                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                style="padding:9px 12px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:8px;outline:none;font-size:0.75rem;width:120px;">
            </div>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button onclick="exportarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4BE} EXPORTAR</button>
              <button onclick="importarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4C2} RESTAURAR</button>
              <button onclick="sincronizarCultosDesdeFirebase()" style="flex:1;min-width:90px;padding:8px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.25);color:#ff4757;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F525} FIREBASE SYNC</button>
          </div>
          <div id="historico-cultos" style="display:grid;gap:10px;"></div>
        </div>`;

// Hacemos el reemplazo usando una búsqueda más flexible con regex
// Buscamos desde pdf-mes-especifico hasta el cierre de historico-cultos
const regex = /(<input type="month" id="pdf-mes-especifico"[^>]+>)[\s\S]*?(<div id="historico-cultos"[^>]+><\/div>\s*<\/div>)/;
const match = code.match(regex);

if (match) {
    code = code.replace(regex, CORRECTO);
    fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
    console.log('[OK] TAB 3 reconstruido correctamente.');
} else {
    console.log('[FAIL] No se encontró el patrón. Intentando método alternativo...');
    // Método alternativo: buscar y reemplazar desde "search-culto" hasta el cierre
    const regexAlt = /(<input type="text" id="search-culto"[\s\S]*?<\/div>)\s*(<div style="display:flex;gap:6px[\s\S]*?<div id="historico-cultos"[^>]+><\/div>\s*<\/div>)/;
    const matchAlt = code.match(regexAlt);
    if (matchAlt) {
        console.log('[INFO] Encontrado con método alternativo. Reconstruyendo...');
    }
    console.log('[FAIL] Revisar manualmente el archivo.');
}
