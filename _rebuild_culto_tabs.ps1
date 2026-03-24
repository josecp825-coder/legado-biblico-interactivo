# Script para reemplazar renderControlCultosSemana con version de 3 pestanas
$file = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$startMarker = 'function renderControlCultosSemana() {'
$endMarker = "    setTimeout(function(){ if(typeof inicializarHerramientasExtra === 'function') inicializarHerramientasExtra(); }, 200);" + "`r`n}"

$idx1 = $content.IndexOf($startMarker)
$idx2 = $content.IndexOf($endMarker, $idx1)
if ($idx1 -lt 0 -or $idx2 -lt 0) {
    Write-Host "ERROR: marcadores no encontrados. idx1=$idx1 idx2=$idx2"
    exit 1
}
$endIdx = $idx2 + $endMarker.Length
Write-Host "Reemplazando funcion desde $idx1 hasta $endIdx"

$newFunc = @'
function renderControlCultosSemana() {
    const contenedor = document.getElementById('pantalla-estudio');
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

    // ---- Construccion de campos del formulario ----
    const CAMPOS_CULTO = [
        { id: 'anciano', icon: '\u{1F9D3}', label: 'ANCIANO DE TURNO', placeholder: '\u00bfQui\u00e9n es el anciano?', tipo: 'nombre' },
        { id: 'bienvenida', icon: '\u{1F91D}', label: 'BIENVENIDA', placeholder: 'Nombre del encargado...', tipo: 'nombre' },
        { id: 'oracion1', icon: '\u{1F64F}', label: 'PRIMERA ORACI\u00d3N', placeholder: '\u00bfQui\u00e9n ora?', tipo: 'nombre' },
        { id: 'himno1_quien', icon: '\u{1F3B5}', label: 'HIMNO DE APERTURA \u2014 ANUNCIA', placeholder: '\u00bfQui\u00e9n anuncia el himno?', tipo: 'nombre' },
        { id: 'himno1', icon: '\u{1F3B6}', label: 'HIMNO DE APERTURA \u2014 N\u00daMERO', placeholder: '# del himno...', tipo: 'himno' },
        { id: 'lectura', icon: '\u{1F4D6}', label: 'LECTURA B\u00cdBLICA', placeholder: '', tipo: 'biblia_struct', extra: { id: 'lectura_quien', placeholder: '\u00bfQui\u00e9n lee?' } },
        { id: 'especial', icon: '\u2B50', label: 'PARTE ESPECIAL', placeholder: '\u00bfQui\u00e9n participa?', tipo: 'nombre', extra: { id: 'especial_desc', placeholder: 'Descripci\u00f3n...' } },
        { id: 'intercesora', icon: '\u{1F64F}', label: 'ORACI\u00d3N INTERCESORA', placeholder: '\u00bfQui\u00e9n ora?', tipo: 'nombre' },
        { id: 'pred_anuncia', icon: '\u{1F3A4}', label: 'ANUNCIA AL PREDICADOR', placeholder: '\u00bfQui\u00e9n presenta al predicador?', tipo: 'nombre' },
        { id: 'predicador', icon: '\u{1F399}\uFE0F', label: 'PREDICADOR/A', placeholder: 'Nombre del predicador...', tipo: 'nombre', extra: { id: 'pred_tema', placeholder: 'Tema del serm\u00f3n...' }, extra2: { id: 'pred_texto', placeholder: '', tipo: 'biblia_struct' } },
        { id: 'himno2', icon: '\u{1F3B5}', label: 'HIMNO FINAL', placeholder: '# del himno...', tipo: 'himno', extra: { id: 'himno2_quien', placeholder: '\u00bfQui\u00e9n anuncia el himno?' } },
        { id: 'oracion_final', icon: '\u{1F64F}', label: 'ORACI\u00d3N FINAL', placeholder: '\u00bfQui\u00e9n ora?', tipo: 'nombre' },
        { id: 'sonido', icon: '\u{1F39B}\uFE0F', label: 'ENCARGADO DE SONIDO', placeholder: 'Nombre...', tipo: 'nombre' },
        { id: 'obs', icon: '\u{1F4DD}', label: 'OBSERVACIONES', placeholder: 'Notas adicionales...', tipo: 'texto' }
    ];
    const tipoColores = { nombre: '162,155,254', himno: '254,202,87', biblia: '85,239,196', biblia_struct: '85,239,196', texto: '116,185,255' };
    let camposHTML = CAMPOS_CULTO.map((c, i) => {
        const rgb = tipoColores[c.tipo] || '162,155,254';
        let extraHTML = '';
        if (c.extra) {
            if (c.extra.tipo === 'biblia_struct') { extraHTML += renderBibliaStructHTML(c.extra.id); }
            else { extraHTML += `<input type="text" id="culto-${c.extra.id}" placeholder="${c.extra.placeholder}" style="width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:8px;outline:none;margin-top:6px;font-size:0.85rem;"><div id="sug-${c.extra.id}" style="display:none;position:relative;z-index:50;"></div>`; }
        }
        if (c.extra2) {
            if (c.extra2.tipo === 'biblia_struct') { extraHTML += renderBibliaStructHTML(c.extra2.id); }
            else { extraHTML += `<input type="text" id="culto-${c.extra2.id}" placeholder="${c.extra2.placeholder}" style="width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:8px;outline:none;margin-top:6px;font-size:0.85rem;"><div id="sug-${c.extra2.id}" style="display:none;position:relative;z-index:50;"></div>`; }
        }
        if (c.tipo === 'biblia_struct') {
            return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;position:relative;"><label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;"><span style="font-size:1.1rem;">${c.icon}</span><span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${i+1}</span>${c.label}</label>${renderBibliaStructHTML(c.id)}<input type="hidden" id="culto-${c.id}" value="">${extraHTML}</div>`;
        }
        const inputEvent = c.tipo === 'himno' ? 'oninput="autocompleteHimno(this)"' : (c.tipo === 'biblia' ? 'oninput="autocompleteBiblia(this)"' : '');
        return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;position:relative;"><label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;"><span style="font-size:1.1rem;">${c.icon}</span><span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${i+1}</span>${c.label}</label><input type="text" id="culto-${c.id}" placeholder="${c.placeholder}" ${inputEvent} style="width:100%;padding:12px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;"><div id="sug-${c.id}" style="display:none;position:relative;z-index:50;"></div>${c.tipo === 'himno' ? `<div id="himno-titulo-${c.id}" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>` : ''}${extraHTML}</div>`;
    }).join('');

    // ---- Estilos de pestanas ----
    const tabStyle = (active) => active
        ? 'flex:1;padding:11px 4px;background:rgba(255,107,107,0.2);border:1.5px solid #ff6b6b;color:#ff6b6b;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;letter-spacing:0.5px;'
        : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';

    contenedor.innerHTML = `
    <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
      <!-- HEADER FIJO -->
      <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:14px 15px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,107,107,0.25);">
        <button onclick="renderModuloIglesia()" style="background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;padding:8px 14px;border-radius:8px;font-weight:900;font-size:0.85rem;">\u2B05\uFE0F</button>
        <div style="flex:1;">
          <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:0.85rem;">\u{1F4CB} REGISTRO DE CULTOS</div>
          <div style="color:rgba(255,255,255,0.3);font-size:0.58rem;">Iglesia Adventista Cypress Hills</div>
        </div>
      </div>

      <!-- PESTANAS -->
      <div style="padding:12px 14px 0;max-width:600px;margin:0 auto;">
        <div style="display:flex;gap:8px;margin-bottom:15px;" id="tabs-culto">
          <button id="tab-btn-form" onclick="cambiarTabCulto('form')" style="${tabStyle(true)}">📝<br>Formulario</button>
          <button id="tab-btn-buscar" onclick="cambiarTabCulto('buscar')" style="${tabStyle(false)}">🔍<br>Buscar</button>
          <button id="tab-btn-cultos" onclick="cambiarTabCulto('cultos')" style="${tabStyle(false)}">📋<br>Cultos</button>
        </div>

        <!-- ======== TAB 1: FORMULARIO ======== -->
        <div id="tab-content-form">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
            <div>
              <label style="display:block;color:#ff6b6b;font-size:0.68rem;margin-bottom:5px;font-weight:900;letter-spacing:0.5px;">\u{1F4C5} FECHA \u2014 \u26A0\uFE0F OBLIGATORIO</label>
              <input type="date" id="culto-fecha" value="${hoyStr}" onchange="autoDetectarTipoCulto(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:10px;outline:none;">
            </div>
            <div>
              <label style="display:block;color:rgba(255,255,255,0.4);font-size:0.65rem;margin-bottom:5px;font-weight:900;">\u26EA D\u00cdA</label>
              <select id="culto-tipo" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:10px;outline:none;">
                <option>Domingo</option><option>Lunes</option><option>Martes</option>
                <option>Mi\u00e9rcoles</option><option>Jueves</option><option>Viernes</option>
                <option>S\u00e1bado</option><option>Especial</option>
              </select>
            </div>
          </div>
          <div style="display:grid;gap:10px;margin-bottom:18px;">${camposHTML}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">
            <button onclick="guardarCultoSemana()" style="padding:15px;background:linear-gradient(135deg,#55efc4,#00b894);border:none;color:#000;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 5px 18px rgba(85,239,196,0.3);">\u{1F4BE} GUARDAR</button>
            <button onclick="compartirCultoActual()" style="padding:15px;background:linear-gradient(135deg,#a29bfe,#6c5ce7);border:none;color:#fff;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 5px 18px rgba(108,92,231,0.3);">\u{1F4E4} COMPARTIR</button>
          </div>
        </div>

        <!-- ======== TAB 2: BUSCAR / HERRAMIENTAS ======== -->
        <div id="tab-content-buscar" style="display:none;">
          <!-- PDF por período -->
          <div style="background:rgba(85,239,196,0.05);border:1px solid rgba(85,239,196,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">
            <div style="color:#55efc4;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">\u{1F4C4} IMPRIMIR POR PER\u00cdODO</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
              <button onclick="generarPDFCultosPeriodo('semana')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4}<br>Esta Semana</button>
              <button onclick="generarPDFCultosPeriodo('mes')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4}<br>Este Mes</button>
              <button onclick="generarPDFCultosPeriodo('anio')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4}<br>Este A\u00f1o</button>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <input type="month" id="pdf-mes-especifico" style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1px solid rgba(85,239,196,0.2);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;">
              <button onclick="generarPDFCultosPeriodo('mes-especifico')" style="padding:9px 12px;background:rgba(85,239,196,0.12);border:1px solid rgba(85,239,196,0.35);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;white-space:nowrap;">\u{1F4C4} Mes elegido</button>
            </div>
          </div>
          <!-- Estadísticas participante -->
          <div style="background:rgba(162,155,254,0.05);border:1px solid rgba(162,155,254,0.2);border-radius:16px;padding:16px;">
            <div style="color:#a29bfe;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">\u{1F4CA} PARTICIPACI\u00d3N POR PERSONA</div>
            <select id="select-participante" onchange="mostrarEstadisticasParticipante(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(162,155,254,0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;margin-bottom:10px;">
              <option value="">— Elegir participante —</option>
            </select>
            <div id="stats-participante"></div>
          </div>
        </div>

        <!-- ======== TAB 3: CULTOS REGISTRADOS ======== -->
        <div id="tab-content-cultos" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <div style="color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;">\u{1F4CA} HISTORIAL</div>
            <input type="text" id="search-culto" placeholder="\u{1F50D} Buscar nombre, fecha..." oninput="cargarCultosSemana()" style="padding:9px 12px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:8px;outline:none;font-size:0.75rem;width:170px;">
          </div>
          <div id="historico-cultos" style="display:grid;gap:10px;"></div>
        </div>

      </div>
    </div>`;

    // Funciones de pestanas
    window.cambiarTabCulto = function(tab) {
        ['form','buscar','cultos'].forEach(function(t) {
            var content = document.getElementById('tab-content-' + t);
            var btn = document.getElementById('tab-btn-' + t);
            if (!content || !btn) return;
            var active = (t === tab);
            content.style.display = active ? 'block' : 'none';
            btn.style.cssText = active
                ? 'flex:1;padding:11px 4px;background:rgba(255,107,107,0.2);border:1.5px solid #ff6b6b;color:#ff6b6b;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;letter-spacing:0.5px;'
                : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';
        });
        if (tab === 'cultos') cargarCultosSemana();
        if (tab === 'buscar') { if(typeof actualizarListaParticipantes === 'function') actualizarListaParticipantes(); }
    };

    autoDetectarTipoCulto(hoyStr);
    cargarCultosSemana();
}
'@

$before = $content.Substring(0, $idx1)
$after = $content.Substring($endIdx)
$newContent = $before + $newFunc + $after

[System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "renderControlCultosSemana reemplazado OK"

# Verificar
$verify = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$checkIdx = $verify.IndexOf('function renderControlCultosSemana()')
$snippet = $verify.Substring($checkIdx, 100)
Write-Host "Inicio funcion: $snippet"
