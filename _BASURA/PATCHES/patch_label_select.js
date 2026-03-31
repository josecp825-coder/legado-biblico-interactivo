const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// Buscamos el bloque del TAB 3 que quedó desordenado y lo reemplazamos con la versión correcta
// Buscamos desde el comentario TAB 3 hasta donde empieza TAB 4

const oldBlock = /<!-- ======== TAB 3: CULTOS REGISTRADOS ======== -->[\s\S]*?<!-- ======== TAB 4:/;

const newBlock = `<!-- ======== TAB 3: CULTOS REGISTRADOS ======== -->
        <div id="tab-content-cultos" style="display:none;">

          <!-- ETIQUETA + DESPLEGABLE -->
          <div style="margin-bottom:14px;">
            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;padding-left:2px;">
              ⬇️ ELEGIR DÍA DE CULTO
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <select id="tipo-historial-select" onchange="cargarCultosSemana()" style="flex:1;background:rgba(255,107,107,0.1);border:1.5px solid #ff6b6b;color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;padding:9px 12px;border-radius:10px;outline:none;cursor:pointer;">
                <option value="sabado">⛪ CULTO DE SÁBADO</option>
                <option value="semana">📅 CULTO DE SEMANA</option>
              </select>
              <input type="text" id="search-culto" placeholder="\\u{1F50D} Buscar..." 
                oninput="cargarCultosSemana()" 
                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                style="padding:9px 12px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:8px;outline:none;font-size:0.75rem;width:130px;">
            </div>
          </div>

          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button onclick="exportarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4BE} EXPORTAR</button>
              <button onclick="importarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F4C2} RESTAURAR</button>
              <button onclick="sincronizarCultosDesdeFirebase()" style="flex:1;min-width:90px;padding:8px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.25);color:#ff4757;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\\u{1F525} FIREBASE SYNC</button>
          </div>
          <div id="historico-cultos" style="display:grid;gap:10px;"></div>
        </div>
        <!-- ======== TAB 4:`;

code = code.replace(oldBlock, newBlock);

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('[OK] Bloque TAB 3 reconstruido correctamente con etiqueta guía.');
