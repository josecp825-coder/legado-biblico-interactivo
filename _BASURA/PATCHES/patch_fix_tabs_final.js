const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// Normalizar todo a CRLF primero
code = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Encontrar el inicio del TAB 2 (buscar) y reemplazar hasta el final del TAB 4 y cierre del template
const START_MARKER = '        <!-- ======== TAB 2: BUSCAR / HERRAMIENTAS ======== -->';
const END_MARKER = '    </div>`;\n\n    // Funciones de pestanas';  
const END_MARKER2 = '    </div>`;\r\n\r\n    // Funciones de pestanas';

const REPLACEMENT = `        <!-- ======== TAB 2: BUSCAR / HERRAMIENTAS ======== -->
        <div id="tab-content-buscar" style="display:none;">
          <!-- BÚSQUEDA RÁPIDA -->
          <div style="background:rgba(255,159,67,0.05);border:1px solid rgba(255,159,67,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">
            <div style="color:#ff9f43;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">🔍 BÚSQUEDA RÁPIDA</div>
            <input type="text" id="input-busqueda-global" placeholder="Ej: Santa Cena, Bautismo..."
                oninput="ejecutarBusquedaGlobal(this.value)"
                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                style="width:100%;padding:13px;background:rgba(0,0,0,0.5);border:1.5px solid rgba(255,159,67,0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;margin-bottom:6px;font-weight:700;">
            <div id="resultados-busqueda-global"></div>
          </div>
          <!-- PDF por período -->
          <div style="background:rgba(85,239,196,0.05);border:1px solid rgba(85,239,196,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">
            <div style="color:#55efc4;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">📄 IMPRIMIR POR PERÍODO</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
              <button onclick="generarPDFCultosPeriodo('semana')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">📄<br>Esta Semana</button>
              <button onclick="generarPDFCultosPeriodo('mes')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">📄<br>Este Mes</button>
              <button onclick="generarPDFCultosPeriodo('anio')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">📄<br>Este Año</button>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <input type="month" id="pdf-mes-especifico" style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1px solid rgba(85,239,196,0.2);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;">
              <button onclick="generarPDFCultosPeriodo('mes-especifico')" style="padding:9px 12px;background:rgba(85,239,196,0.12);border:1px solid rgba(85,239,196,0.35);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;white-space:nowrap;">📄 Mes elegido</button>
            </div>
          </div>
          <!-- Estadísticas participante -->
          <div style="background:rgba(162,155,254,0.05);border:1px solid rgba(162,155,254,0.2);border-radius:16px;padding:16px;">
            <div style="color:#a29bfe;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">📊 PARTICIPACIÓN POR PERSONA</div>
            <select id="select-participante" onchange="mostrarEstadisticasParticipante(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(162,155,254,0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;margin-bottom:10px;">
              <option value="">— Elegir participante —</option>
            </select>
            <div id="stats-participante"></div>
          </div>
        </div>

        <!-- ======== TAB 3: HISTORIAL DE CULTOS ======== -->
        <div id="tab-content-cultos" style="display:none;">
          <div style="margin-bottom:14px;">
            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;padding-left:2px;">
              ⬇️ ELEGIR DÍA DE CULTO
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <select id="tipo-historial-select" onchange="cargarCultosSemana()" style="flex:1;background:rgba(255,107,107,0.1);border:1.5px solid #ff6b6b;color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;padding:9px 12px;border-radius:10px;outline:none;cursor:pointer;">
                <option value="sabado">⛪ CULTO DE SÁBADO</option>
                <option value="semana">📅 CULTO DE SEMANA</option>
              </select>
              <input type="text" id="search-culto" placeholder="🔍 Buscar..."
                oninput="cargarCultosSemana()"
                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                style="padding:9px 12px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:8px;outline:none;font-size:0.75rem;width:120px;">
            </div>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button onclick="exportarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">💾 EXPORTAR</button>
              <button onclick="importarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">📂 RESTAURAR</button>
              <button onclick="sincronizarCultosDesdeFirebase()" style="flex:1;min-width:90px;padding:8px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.25);color:#ff4757;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">🔥 FIREBASE SYNC</button>
          </div>
          <div id="historico-cultos" style="display:grid;gap:10px;"></div>
        </div>

        <!-- ======== TAB 4: PROGRAMAS ESPECIALES ======== -->
        <div id="tab-content-eventos" style="display:none;">
          <div id="eventos-modulo-contenedor">
            <div style="text-align:center;color:rgba(255,255,255,0.3);padding:20px;font-size:0.8rem;">Toca para cargar eventos...</div>
          </div>
        </div>

      </div>
    </div>\`;

    // Funciones de pestanas`;

let idxStart = code.indexOf(START_MARKER);
let idxEnd = code.indexOf('\n    // Funciones de pestanas', idxStart);

if (idxStart > 0 && idxEnd > 0) {
    code = code.slice(0, idxStart) + REPLACEMENT + code.slice(idxEnd + '\n    // Funciones de pestanas'.length);
    // Normalizar a CRLF
    code = code.replace(/\n/g, '\r\n');
    fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
    console.log('[OK] TABs 2,3,4 reconstruidos limpiamente. idxStart:', idxStart, 'idxEnd:', idxEnd);
} else {
    console.log('[FAIL] No se encontraron marcadores. idxStart:', idxStart, 'idxEnd:', idxEnd);
}
