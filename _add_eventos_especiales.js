// ================================================================
// 🌟 MÓDULO EVENTOS ESPECIALES — LEGADO BÍBLICO v215
// Autor: Antigravity / Cypress Hills Adventist Church
// Descripción: Eventos multi-día del calendario eclesiástico
//   - Semana de Oración, Campaña Evangelística, Días especiales, etc.
//   - Sistema de compartir completo (todo el evento o un solo día)
//   - Highlight visual del día de envío
// ================================================================

// ----------------------------------------------------------------
// CATÁLOGO DE TIPOS DE EVENTO
// ----------------------------------------------------------------
const CATALOGO_EVENTOS = [
    { key: 'semana_oracion',       emoji: '🙏', nombre: 'Semana de Oración',          color: '#a29bfe' },
    { key: 'campana_evangelistica', emoji: '📢', nombre: 'Campaña Evangelística',       color: '#ff6b6b' },
    { key: 'semana_mayordomia',    emoji: '🙏👪⌚💰', nombre: 'Semana de Mayordomía',    color: '#00b894' },
    { key: 'semana_familia',       emoji: '👨‍👩‍👧‍👦', nombre: 'Semana de Familia',            color: '#55efc4' },
    { key: 'media_semana_familia', emoji: '🏠', nombre: 'Media Semana de Familia',     color: '#00cec9' },
    { key: 'dia_juventud',         emoji: '🔥', nombre: 'Día de la Juventud',          color: '#e17055' },
    { key: 'dia_caballero',        emoji: '🎩', nombre: 'Día del Caballero',           color: '#0984e3' },
    { key: 'dia_damas',            emoji: '🌸', nombre: 'Día de las Damas',            color: '#fd79a8' },
    { key: 'enfasis_espiritual',   emoji: '✨', nombre: 'Semana de Énfasis Espiritual',color: '#6c5ce7' },
    { key: 'santa_cena',           emoji: '🍞', nombre: 'Santa Cena',                  color: '#fab1a0' },
    { key: 'personalizado',        emoji: '⭐', nombre: 'Evento Personalizado',         color: '#74b9ff' }
];

// Colores por día de la semana (para highlight de compartir)
const COLORES_DIA = {
    0: { hex: '#ffa07a', rgb: '255,160,122', nombre: 'Domingo' },
    1: { hex: '#74b9ff', rgb: '116,185,255', nombre: 'Lunes' },
    2: { hex: '#55efc4', rgb: '85,239,196',  nombre: 'Martes' },
    3: { hex: '#a29bfe', rgb: '162,155,254', nombre: 'Miércoles' },
    4: { hex: '#fdcb6e', rgb: '253,203,110', nombre: 'Jueves' },
    5: { hex: '#fd79a8', rgb: '253,121,168', nombre: 'Viernes' },
    6: { hex: '#f9ca24', rgb: '249,202,36',  nombre: 'Sábado' }
};

// Estado global del editor de eventos
window._eventoEditandoId = null;
window._eventoEditorDiaActivo = 0;

// ----------------------------------------------------------------
// GENERAR DÍAS DEL EVENTO  (array de objetos {fecha, diaSemana})
// ----------------------------------------------------------------
function _generarDiasEvento(fechaInicioStr, duracion) {
    const dias = [];
    const base = new Date(fechaInicioStr + 'T12:00:00Z');
    for (let i = 0; i < duracion; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        dias.push({ fecha: iso, diaSemana: d.getUTCDay() });
    }
    return dias;
}

// ================================================================
// 🔥 FIREBASE SYNC — EVENTOS ESPECIALES
// Backup en la nube para que nunca se pierdan los datos
// ================================================================

async function _syncEventoFirebase(evento) {
    try {
        if (typeof db === 'undefined') return;
        const docId = String(evento.id || Date.now());
        await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('eventos').doc(docId).set(evento);
        console.log('[Firebase Eventos] ✅ Guardado en nube:', evento.titulo);
    } catch(e) {
        console.warn('[Firebase Eventos] No se pudo sincronizar:', e.message);
    }
}

async function _deleteEventoFirebase(id) {
    try {
        if (typeof db === 'undefined') return;
        await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('eventos').doc(String(id)).delete();
        console.log('[Firebase Eventos] 🗑️ Eliminado de nube:', id);
    } catch(e) {
        console.warn('[Firebase Eventos] Error eliminando:', e.message);
    }
}

window.sincronizarEventosDesdeFirebase = async function(silencioso = false) {
    try {
        if (typeof db === 'undefined') {
            if (!silencioso && typeof mostrarToast === 'function') mostrarToast('⚠️ Firebase no disponible');
            return;
        }
        if (!silencioso && typeof mostrarToast === 'function') mostrarToast('⏳ Sincronizando eventos con Firebase...');
        const snap = await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('eventos').orderBy('fechaInicio', 'desc').get();
        if (snap.empty) {
            if (!silencioso && typeof mostrarToast === 'function') mostrarToast('ℹ️ No hay eventos en Firebase aún');
            return;
        }
        const eventosFirebase = snap.docs.map(d => d.data());
        const eventosLocales  = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
        const idsLocales = new Set(eventosLocales.map(e => String(e.id)));
        const soloFirebase = eventosFirebase.filter(e => !idsLocales.has(String(e.id)));
        const combinados = [...eventosLocales, ...soloFirebase]
            .sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
        localStorage.setItem('legado_eventos', JSON.stringify(combinados));
        if (!silencioso && typeof mostrarToast === 'function') mostrarToast('🔥 ' + combinados.length + ' eventos sincronizados');
        if (typeof cargarHistorialEventos === 'function') cargarHistorialEventos();
        console.log('[Firebase Eventos] Sincronizados:', combinados.length, 'eventos');
    } catch(e) {
        console.warn('[Firebase Eventos] Error sincronizando:', e.message);
        // Silenciado para no asustar al usuario con "Missing or insufficient permissions"
    }
};

// ----------------------------------------------------------------
// FORMATEAR FECHA CORTA  (para cabeceras de tabs)
// ----------------------------------------------------------------
function _fechaCorta(isoStr) {
    const d = new Date(isoStr + 'T12:00:00Z');
    const dias = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    return dias[d.getUTCDay()] + ' ' + d.getUTCDate();
}

function _fechaLarga(isoStr) {
    const d = new Date(isoStr + 'T12:00:00Z');
    const diasNombre = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    return diasNombre[d.getUTCDay()] + ' ' + d.getUTCDate() + ' de ' + meses[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
}

// ----------------------------------------------------------------
// RENDER PRINCIPAL — TAB EVENTOS (inyectado dentro de tab-content-eventos)
// ----------------------------------------------------------------
function renderTabEventos() {
    const hoy = new Date().toISOString().split('T')[0];
    const opciones = CATALOGO_EVENTOS.map(e =>
        `<option value="${e.key}">${e.emoji} ${e.nombre}</option>`
    ).join('');

    return `
    <div id="eventos-panel">
      <!-- SUB-PESTAÑAS: Formulario / Historial -->
      <div style="display:flex;gap:6px;margin-bottom:14px;">
        <button id="evt-tab-nuevo" onclick="cambiarSubTabEvento('nuevo')"
          style="flex:1;padding:10px 4px;background:rgba(116,185,255,0.2);border:1.5px solid #74b9ff;color:#74b9ff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;">
          ➕<br>Nuevo Evento
        </button>
        <button id="evt-tab-lista" onclick="cambiarSubTabEvento('lista')"
          style="flex:1;padding:10px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.68rem;">
          📋<br>Historial
        </button>
      </div>

      <!-- FORMULARIO DE NUEVO EVENTO -->
      <div id="evt-content-nuevo">
        <div style="background:rgba(116,185,255,0.06);border:1.5px solid rgba(116,185,255,0.25);border-radius:16px;padding:16px;margin-bottom:14px;">
          <div style="color:#74b9ff;font-weight:900;font-size:0.72rem;letter-spacing:1.5px;margin-bottom:12px;">📅 DATOS DEL EVENTO</div>

          <!-- TIPO -->
          <div style="margin-bottom:10px;">
            <label style="color:rgba(255,255,255,0.45);font-size:0.62rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:5px;">TIPO DE EVENTO</label>
            <select id="evt-tipo" onchange="actualizarTituloEvento()"
              style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(116,185,255,0.35);color:#fff;border-radius:10px;outline:none;font-size:0.88rem;">
              ${opciones}
            </select>
          </div>

          <!-- TÍTULO -->
          <div style="margin-bottom:10px;">
            <label style="color:rgba(255,255,255,0.45);font-size:0.62rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:5px;">TÍTULO DEL EVENTO</label>
            <input type="text" id="evt-titulo" placeholder="Ej.: Semana de Oración 2026..."
              style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(116,185,255,0.35);color:#fff;border-radius:10px;outline:none;font-size:0.88rem;box-sizing:border-box;">
          </div>

          <!-- FECHA INICIO + DURACIÓN -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px;">
            <div>
              <label style="color:rgba(255,255,255,0.45);font-size:0.62rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:5px;">📅 FECHA INICIO</label>
              <input type="date" id="evt-fecha-inicio" onchange="generarTabsDias()" onclick="try{this.showPicker()}catch(e){}"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(116,185,255,0.35);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;box-sizing:border-box;cursor:pointer;">
            </div>
            <div>
              <div id="duracion-btns" style="display:grid;">
                <label style="color:rgba(255,255,255,0.45);font-size:0.62rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:5px;">DURACIÓN</label>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;">
                  ${[1,3,5,7].map(n => `
                    <button onclick="seleccionarDuracion(${n})" id="evt-dur-${n}"
                      style="padding:10px 2px;background:${n===7?'rgba(116,185,255,0.2)':'rgba(255,255,255,0.04)'};border:${n===7?'1.5px solid #74b9ff':'1px solid rgba(255,255,255,0.12)'};color:${n===7?'#74b9ff':'rgba(255,255,255,0.4)'};border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">
                      ${n}d
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CONTENEDOR DE TABS POR DÍA -->
        <div id="evt-dias-wrapper" style="display:none;">
          <div style="color:rgba(255,255,255,0.4);font-size:0.62rem;font-weight:900;letter-spacing:1px;margin-bottom:8px;">✏️ PROGRAMA POR DÍA — Toca el día para editarlo</div>
          <!-- TABS DE DÍAS -->
          <div id="evt-dias-tabs" style="display:flex;gap:5px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px;"></div>
          <!-- FORMULARIO DEL DÍA ACTIVO -->
          <div id="evt-dia-form" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;">
            <div style="text-align:center;color:rgba(255,255,255,0.3);font-size:0.8rem;">Selecciona la duración para ver los días</div>
          </div>

          <!-- BOTONES GUARDAR -->
          <div style="display:grid;gap:8px;margin-top:14px;">
            <button onclick="guardarEventoCompleto()" id="btn-guardar-evento"
              style="width:100%;padding:15px;background:linear-gradient(135deg,#74b9ff,#0984e3);border:none;color:#fff;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 5px 18px rgba(116,185,255,0.35);">
              💾 GUARDAR EVENTO COMPLETO
            </button>
          </div>
        </div>
      </div>

      <!-- HISTORIAL DE EVENTOS -->
      <div id="evt-content-lista" style="display:none;">
        <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
          <button onclick="sincronizarEventosDesdeFirebase()" style="flex:1;min-width:120px;padding:9px;background:rgba(108,92,231,0.1);border:1px solid rgba(108,92,231,0.3);color:#a29bfe;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.62rem;letter-spacing:0.5px;">☁️ FIREBASE SYNC</button>
          <button onclick="exportarEventosBackup()" style="flex:1;min-width:120px;padding:9px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.62rem;letter-spacing:0.5px;">💾 EXPORTAR JSON</button>
        </div>
        <div id="evt-historial-contenedor" style="display:grid;gap:12px;">
          <div style="text-align:center;color:rgba(255,255,255,0.3);padding:20px;font-size:0.85rem;">Cargando eventos...</div>
        </div>
      </div>
    </div>`;
}

// ----------------------------------------------------------------
// CAMBIAR SUB-PESTAÑA DENTRO DE EVENTOS
// ----------------------------------------------------------------
window.cambiarSubTabEvento = function(tab) {
    ['nuevo', 'lista'].forEach(t => {
        const c = document.getElementById('evt-content-' + t);
        const b = document.getElementById('evt-tab-' + t);
        if (!c || !b) return;
        const activo = (t === tab);
        c.style.display = activo ? 'block' : 'none';
        b.style.cssText = activo
            ? 'flex:1;padding:10px 4px;background:rgba(116,185,255,0.2);border:1.5px solid #74b9ff;color:#74b9ff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;'
            : 'flex:1;padding:10px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.68rem;';
    });
    if (tab === 'lista') cargarHistorialEventos();
};

// ----------------------------------------------------------------
// AUTO-RELLENAR TÍTULO AL CAMBIAR TIPO
// ----------------------------------------------------------------
window.actualizarTituloEvento = function() {
    const tipo = document.getElementById('evt-tipo')?.value;
    const cat  = CATALOGO_EVENTOS.find(e => e.key === tipo);
    if (!cat) return;
    const el = document.getElementById('evt-titulo');
    const btnsDur = document.getElementById('duracion-btns');
    if (tipo === 'santa_cena') {
        if (el && !el.value) el.value = cat.nombre;
        // Ocultar selector de duración — Santa Cena es siempre 1 día
        if (btnsDur) btnsDur.style.display = 'none';
        if (typeof seleccionarDuracion === 'function') seleccionarDuracion(1);
    } else {
        // Mostrar selector de duración para otros eventos
        if (btnsDur) btnsDur.style.display = 'grid';
        const anio = new Date().getFullYear();
        if (el && !el.value) el.value = cat.nombre + ' ' + anio;
    }
};

// ----------------------------------------------------------------
// SELECCIONAR DURACIÓN y generar tabs
// ----------------------------------------------------------------
window._duracionEvento = 7;
window.seleccionarDuracion = function(n) {
    window._duracionEvento = n;
    [1,3,5,7].forEach(d => {
        const btn = document.getElementById('evt-dur-' + d);
        if (!btn) return;
        const activo = (d === n);
        btn.style.cssText = activo
            ? 'padding:10px 2px;background:rgba(116,185,255,0.2);border:1.5px solid #74b9ff;color:#74b9ff;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;'
            : 'padding:10px 2px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;';
    });
    generarTabsDias();
};

// ----------------------------------------------------------------
// GENERAR TABS DE DÍAS
// ----------------------------------------------------------------
window.generarTabsDias = function() {
    const fechaInicio = document.getElementById('evt-fecha-inicio')?.value;
    const duracion = window._duracionEvento || 7;
    if (!fechaInicio) return;

    window._diasEvento = _generarDiasEvento(fechaInicio, duracion);

    // ✅ PRESERVAR DATOS si estamos en modo edición
    // generarTabsDias siempre crea slots vacíos — aquí restauramos los datos del evento
    if (window._eventoEditandoId) {
        const evts = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
        const evEdit = evts.find(function(e) { return e.id === window._eventoEditandoId; });
        if (evEdit && evEdit.dias) {
            const esSC = evEdit.tipo === 'santa_cena' ||
                (evEdit.titulo && evEdit.titulo.toLowerCase().includes('santa cena'));
            if (esSC) {
                const diaSab = evEdit.dias.find(function(d) { return d.diaSemana === 6; }) || evEdit.dias[0];
                if (diaSab && window._diasEvento[0]) {
                    window._diasEvento[0].datos    = diaSab.datos || {};
                    window._diasEvento[0].fecha     = diaSab.fecha     || window._diasEvento[0].fecha;
                    window._diasEvento[0].diaSemana = diaSab.diaSemana !== undefined ? diaSab.diaSemana : 6;
                }
            } else {
                evEdit.dias.forEach(function(dia, i) {
                    if (window._diasEvento[i]) window._diasEvento[i].datos = dia.datos || {};
                });
            }
        }
    }

    const hoyCStr = new Date().toISOString().split('T')[0];

    // ── Tabs de navegación (comportamiento existente) ──
    const tabsEl = document.getElementById('evt-dias-tabs');
    if (!tabsEl) return;
    tabsEl.innerHTML = window._diasEvento.map((dia, i) => {
        const col = COLORES_DIA[dia.diaSemana];
        const esHoy = (dia.fecha === hoyCStr);
        return `
        <button id="evt-dia-tab-${i}" onclick="cambiarDiaEvento(${i})"
          style="flex-shrink:0;padding:9px 12px;background:rgba(${col.rgb},0.12);border:${esHoy?'2px':'1px'} solid rgba(${col.rgb},${esHoy?'0.9':'0.35'});
                 color:#fff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;text-align:center;min-width:52px;
                 position:relative;">
          ${_fechaCorta(dia.fecha)}<br>
          ${esHoy ? `<span style="position:absolute;top:-7px;left:50%;transform:translateX(-50%);background:${col.hex};color:#000;font-size:0.45rem;font-weight:900;padding:1px 5px;border-radius:6px;white-space:nowrap;">HOY</span>` : ''}
        </button>`;
    }).join('');

    // ── Barra de Exportación Multi-Selección ──────────────────────
    // Inicializar: todos los días seleccionados por defecto
    window._exportDiasChecked = new Array(window._diasEvento.length).fill(true);

    // Crear / actualizar toolbar
    var toolbar = document.getElementById('evt-export-toolbar');
    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.id = 'evt-export-toolbar';
        const form = document.getElementById('evt-dia-form');
        if (form) form.parentNode.insertBefore(toolbar, form);
    }

    const chipsHtml = window._diasEvento.map(function(dia, i) {
        const col = COLORES_DIA[dia.diaSemana];
        return `<span id="exp-dia-${i}" onclick="_toggleExportDia(${i})"
          style="display:inline-flex;align-items:center;justify-content:center;padding:5px 9px;
                 background:rgba(${col.rgb},0.25);border:2px solid rgba(${col.rgb},0.9);
                 color:${col.hex};border-radius:9px;cursor:pointer;font-weight:900;
                 font-size:0.62rem;margin:2px;white-space:nowrap;transition:all 0.15s;">
          ${_fechaCorta(dia.fecha)}
        </span>`;
    }).join('');

    toolbar.innerHTML = `
    <div style="padding:10px 0 10px;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:10px;">
      <div style="color:rgba(255,255,255,0.35);font-size:0.55rem;font-weight:900;letter-spacing:1px;margin-bottom:7px;">
        📤 SELECCIONAR DÍAS A ENVIAR: (toca para activar/desactivar)
      </div>
      <div style="display:flex;flex-wrap:wrap;margin-bottom:8px;">
        ${chipsHtml}
        <span onclick="_selTodosExport(true)"
          style="display:inline-flex;align-items:center;padding:5px 9px;margin:2px;
                 background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);
                 color:rgba(255,255,255,0.5);border-radius:9px;cursor:pointer;font-weight:900;font-size:0.6rem;">
          ✅ Todos
        </span>
        <span onclick="_selTodosExport(false)"
          style="display:inline-flex;align-items:center;padding:5px 9px;margin:2px;
                 background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
                 color:rgba(255,255,255,0.3);border-radius:9px;cursor:pointer;font-weight:900;font-size:0.6rem;">
          ☐ Ninguno
        </span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">
        <button onclick="_exportarDiasSeleccionados('imagen')"
          style="padding:11px 6px;background:linear-gradient(135deg,rgba(253,121,168,0.2),rgba(108,92,231,0.15));
                 border:1.5px solid rgba(253,121,168,0.6);color:#fd79a8;border-radius:11px;
                 cursor:pointer;font-weight:900;font-size:0.72rem;letter-spacing:0.3px;">
          🖼️ IMAGEN / PLANTILLA
        </button>
        <button onclick="_exportarDiasSeleccionados('pdf')"
          style="padding:11px 6px;background:rgba(116,185,255,0.1);
                 border:1.5px solid rgba(116,185,255,0.45);color:#74b9ff;border-radius:11px;
                 cursor:pointer;font-weight:900;font-size:0.72rem;">
          📄 PDF COMPACTO
        </button>
      </div>
    </div>`;
    // ─────────────────────────────────────────────────────────────

    // Mostrar wrapper
    const wrapper = document.getElementById('evt-dias-wrapper');
    if (wrapper) wrapper.style.display = 'block';

    // Activar el día de hoy si está en el rango, si no el primero
    const idxHoy = window._diasEvento.findIndex(d => d.fecha === hoyCStr);
    cambiarDiaEvento(idxHoy >= 0 ? idxHoy : 0);
};

// ── Toggle chip individual ──────────────────────────────────────
window._toggleExportDia = function(i) {
    if (!window._exportDiasChecked) return;
    window._exportDiasChecked[i] = !window._exportDiasChecked[i];
    const on  = window._exportDiasChecked[i];
    const col = COLORES_DIA[window._diasEvento[i].diaSemana];
    const span = document.getElementById('exp-dia-' + i);
    if (span) {
        span.style.background = `rgba(${col.rgb},${on ? '0.25' : '0.04'})`;
        span.style.border     = `${on ? '2' : '1'}px solid rgba(${col.rgb},${on ? '0.9' : '0.15'})`;
        span.style.opacity    = on ? '1' : '0.4';
    }
};

// ── Seleccionar todos / ninguno ──────────────────────────────────
window._selTodosExport = function(val) {
    const n = (window._exportDiasChecked || []).length;
    for (let i = 0; i < n; i++) {
        if (window._exportDiasChecked[i] !== val) _toggleExportDia(i);
    }
};

// ── EXPORTAR los días seleccionados ─────────────────────────────
window._exportarDiasSeleccionados = function(tipo) {
    // 1. Guardar el día activo actual
    _guardarDatosFormDia(window._eventoEditorDiaActivo);
    _autoGuardarEventoEnMemoria();

    // 2. Leer selección
    const sel = [];
    (window._exportDiasChecked || []).forEach(function(v, i) { if (v) sel.push(i); });
    if (sel.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Selecciona al menos un día para enviar');
        return;
    }

    // 3. Obtener ID del evento (edición o autoguardado)
    const eventoId = window._eventoEditandoId || window._autoGuardadoId;
    if (!eventoId) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Completa el título y fecha del evento primero');
        return;
    }

    // 4. Generar: usa modo 'todos' si todos están seleccionados (más fiable)
    const esTotal = (sel.length === (window._exportDiasChecked || []).length);

    if (tipo === 'imagen') {
        if (esTotal) {
            generarPlantillaEvento(eventoId, 'todos');
        } else {
            window._diaSelElegir = sel;
            generarPlantillaEvento(eventoId, 'seleccion');
        }
    } else {
        if (esTotal) {
            generarPDFEvento(eventoId, 'todos');
        } else {
            window._diaSelElegir = sel;
            generarPDFEvento(eventoId, 'seleccion');
        }
    }
};


// ----------------------------------------------------------------
// CAMBIAR DÍA ACTIVO EN EL EDITOR
// ----------------------------------------------------------------
window.cambiarDiaEvento = function(idx) {
    // Guardar datos del día actual antes de cambiar
    if (window._diasEvento && window._diasEvento[window._eventoEditorDiaActivo]) {
        _guardarDatosFormDia(window._eventoEditorDiaActivo);
        // ✅ AUTOGUARDADO: persistir en localStorage al cambiar de día
        _autoGuardarEventoEnMemoria();
    }
    window._eventoEditorDiaActivo = idx;

    // Actualizar estilos de tabs
    if (window._diasEvento) {
        window._diasEvento.forEach((_, i) => {
            const btn = document.getElementById('evt-dia-tab-' + i);
            if (!btn) return;
            const col = COLORES_DIA[window._diasEvento[i].diaSemana];
            const activo = (i === idx);
            btn.style.background = activo ? `rgba(${col.rgb},0.3)` : `rgba(${col.rgb},0.12)`;
            btn.style.border = activo ? `2px solid ${col.hex}` : `1px solid rgba(${col.rgb},0.35)`;
        });
    }

    // Renderizar formulario del día
    _renderFormDia(idx);
};

// ----------------------------------------------------------------
// AUTOGUARDADO SILENCIOSO — guarda todos los días en localStorage
// Se llama cada vez que el usuario cambia de día
// ----------------------------------------------------------------
function _autoGuardarEventoEnMemoria() {
    if (!window._diasEvento) return;
    const tipo   = document.getElementById('evt-tipo')?.value;
    const titulo = document.getElementById('evt-titulo')?.value?.trim();
    const fechaInicio = document.getElementById('evt-fecha-inicio')?.value;
    if (!tipo || !titulo || !fechaInicio) return; // datos mínimos requeridos

    const cat = CATALOGO_EVENTOS.find(e => e.key === tipo);
    const idEvento = window._eventoEditandoId || window._autoGuardadoId;

    // Si no hay ID de edición, es un evento nuevo — crear ID temporal
    if (!window._autoGuardadoId && !window._eventoEditandoId) {
        window._autoGuardadoId = Date.now();
    }

    const evento = {
        id: idEvento || window._autoGuardadoId,
        tipo,
        emoji: cat ? cat.emoji : '⭐',
        color: cat ? cat.color : '#74b9ff',
        titulo,
        fechaInicio,
        duracion: window._duracionEvento || 7,
        dias: window._diasEvento.map(d => ({ fecha: d.fecha, diaSemana: d.diaSemana, datos: d.datos || {} })),
        creadoEn: new Date().toISOString(),
        _autoGuardado: true
    };

    let eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    // Remover versión previa del mismo evento
    eventos = eventos.filter(e => e.id !== evento.id);
    eventos.unshift(evento);
    eventos.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
    localStorage.setItem('legado_eventos', JSON.stringify(eventos));
    console.log('[AUTOGUARDADO] Evento guardado silenciosamente:', titulo, '— días:', window._diasEvento.length);
    // 🔥 FIREBASE AUTOGUARDADO — backup silencioso en la nube
    _syncEventoFirebase(evento).catch(e => console.warn('[Firebase Eventos] Autoguardado:', e));
}

// ----------------------------------------------------------------
// GUARDAR DATOS DEL FORMULARIO DE UN DÍA EN MEMORIA
// ----------------------------------------------------------------
function _guardarDatosFormDia(idx) {
    if (!window._diasEvento || !window._diasEvento[idx]) return;
    const d = window._diasEvento[idx];
    const campos = ['maestro_ceremonia', 'gen_diaconos', 'gen_diaconisas', 'alabanza_director', 'alabanza_himno1', 'titulo_alabanza_himno1', 'alabanza_himno2', 'titulo_alabanza_himno2', 'alabanza_himno3', 'titulo_alabanza_himno3', 'alabanza_himno4', 'titulo_alabanza_himno4', 'tema', 'orador', 'presenta_orador', 'orador_apertura', 'oracion_inicial', 'anuncia_himno_apertura', 'himno_apertura', 'titulo_himno_apertura', 'anuncia_lectura', 'cita_biblica', 'texto_biblica', 'anuncia_especial', 'musica_especial', 'presenta_himno_final', 'himno_final', 'titulo_himno_final', 'orador_oracion', 'gen_sonido', 'observaciones',
        // ✝️ CULTO DE SÁBADO — campos específicos
        'anciano_tipo', 'anciano', 'ev_diaconos', 'ev_diaconisas',
        'ev_llamado', 'ev_doxologia', 'titulo_ev_doxologia', 'ev_invocacion', 'ev_bienvenida',
        'infantil_anuncia', 'infantil',
        'ev_ofrendas_anuncia', 'ev_ofrendas', 'ev_ofrendas_diaconisa',
        'ev_himno_anuncia', 'ev_himno_adoracion', 'titulo_ev_himno_adoracion',
        'ev_lectura_quien', 'ev_lectura_cita',
        'ev_oracion_intercesora',
        'ev_musica_especial',
        'ev_pred_anuncia', 'ev_predicador', 'ev_tema',
        'ev_himno_final_quien', 'ev_himno_final', 'titulo_ev_himno_final',
        'ev_oracion_final', 'ev_sonido', 'observaciones',
        // 🍞 SANTA CENA — 6 Diáconos
        'sc_diacono_1_nombre','sc_diacono_1_funcion',
        'sc_diacono_2_nombre','sc_diacono_2_funcion',
        'sc_diacono_3_nombre','sc_diacono_3_funcion',
        'sc_diacono_4_nombre','sc_diacono_4_funcion',
        'sc_diacono_5_nombre','sc_diacono_5_funcion',
        'sc_diacono_6_nombre','sc_diacono_6_funcion',
        // 🍇 SANTA CENA — 6 Diaconizas
        'sc_diaconiza_1_nombre','sc_diaconiza_1_funcion',
        'sc_diaconiza_2_nombre','sc_diaconiza_2_funcion',
        'sc_diaconiza_3_nombre','sc_diaconiza_3_funcion',
        'sc_diaconiza_4_nombre','sc_diaconiza_4_funcion',
        'sc_diaconiza_5_nombre','sc_diaconiza_5_funcion',
        'sc_diaconiza_6_nombre','sc_diaconiza_6_funcion',
        // Lecturas, oraciones y ordenador
        'sc_lectura_pan','sc_cita_pan','sc_oracion_pan',
        'sc_lectura_vino','sc_cita_vino','sc_oracion_vino',
        'sc_ordenador', 'sc_oracion_final'
    ];
    if (!d.datos) d.datos = {};
    campos.forEach(c => {
        const el = document.getElementById('evt-field-' + c);
        if (el) {
            const nuevoValor = el.value.trim();
            d.datos[c] = nuevoValor;
        }
    });
}

// ----------------------------------------------------------------
// RENDERIZAR EL FORMULARIO PARA UN DÍA ESPECÍFICO
// ----------------------------------------------------------------
function _renderFormDia(idx) {
    const dia = window._diasEvento && window._diasEvento[idx];
    if (!dia) return;
    const col = COLORES_DIA[dia.diaSemana];
    const d = dia.datos || {};

    // Campo de texto simple
    const campo = (id, label, placeholder, icon) => `
        <div style="margin-bottom:10px;">
          <label style="color:rgba(255,255,255,0.75);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">${icon} ${label}</label>
          <input type="text" id="evt-field-${id}" value="${(d[id]||'').replace(/"/g,'&quot;')}" placeholder="${placeholder}"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${col.rgb},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;box-sizing:border-box;">
        </div>`;

    // Campo de himno con autocomplete de título
    const campoHimno = (idNum, idTitulo, label) => `
        <div style="margin-bottom:10px;">
          <label style="color:rgba(255,255,255,0.75);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">🎵 ${label}</label>
          <div style="display:flex;gap:6px;align-items:center;">
            <input type="number" id="evt-field-${idNum}" value="${d[idNum]||''}" placeholder="#"
              oninput="_autoTituloHimno('${idNum}','${idTitulo}')"
              style="width:70px;flex-shrink:0;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${col.rgb},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;box-sizing:border-box;">
            <div style="flex:1;position:relative;">
              <input type="text" id="evt-field-${idTitulo}" value="${(d[idTitulo]||'').replace(/"/g,'&quot;')}" placeholder="Título del himno (editable)"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.25);border:1.5px solid rgba(${col.rgb},0.3);color:rgba(255,255,255,0.9);border-radius:10px;outline:none;font-size:0.78rem;box-sizing:border-box;">
              <span style="position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:0.7rem;opacity:0.4;">🔒</span>
            </div>
          </div>
        </div>`;

    // Campo de cita bíblica con búsqueda de texto
    const campoCita = () => `
        <div style="margin-bottom:10px;">
          <label style="color:rgba(255,255,255,0.75);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">📖 CITA BÍBLICA</label>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <input type="text" id="evt-field-cita_biblica" value="${(d['cita_biblica']||'').replace(/"/g,'&quot;')}" placeholder="Ej.: Juan 3:16 o Salmos 23:1-3"
              style="flex:1;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${col.rgb},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;box-sizing:border-box;">
            <button onclick="_buscarTextoBiblico()" title="Buscar texto"
              style="padding:10px 14px;background:rgba(${col.rgb},0.2);border:1.5px solid rgba(${col.rgb},0.4);color:${col.hex};border-radius:10px;cursor:pointer;font-size:0.85rem;font-weight:900;white-space:nowrap;">🔍</button>
          </div>
          <textarea id="evt-field-texto_biblica" rows="3" placeholder="El texto bíblico aparecerá aquí... o escríbelo tú"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(${col.rgb},0.2);color:rgba(255,255,255,0.8);border-radius:10px;outline:none;font-size:0.78rem;box-sizing:border-box;resize:vertical;line-height:1.5;">${(d['texto_biblica']||'')}</textarea>
        </div>`;

    const formEl = document.getElementById('evt-dia-form');
    if (!formEl) return;
    formEl.style.borderColor = `rgba(${col.rgb},0.3)`;

    // ✅ Banner del título del evento
    const tituloEvento = document.getElementById('evt-titulo')?.value?.trim() || '';
    const bannerTitulo = tituloEvento
        ? `<div style="padding:8px 14px;background:rgba(${col.rgb},0.12);border-left:4px solid ${col.hex};border-radius:0 8px 8px 0;margin-bottom:12px;">
             <div style="color:rgba(255,255,255,0.4);font-size:0.52rem;font-weight:900;letter-spacing:1px;">📌 EVENTO</div>
             <div style="color:${col.hex};font-weight:900;font-size:0.78rem;">${tituloEvento}</div>
           </div>` : '';

    const cabecera = `
        ${bannerTitulo}
        <div style="color:${col.hex};font-weight:900;font-size:0.75rem;letter-spacing:1px;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <span style="background:rgba(${col.rgb},0.15);border:1px solid rgba(${col.rgb},0.3);padding:4px 12px;border-radius:20px;">${_fechaLarga(dia.fecha)}</span>
          <button onclick="_verPreviaDia(${idx})" title="Vista previa"
            style="margin-left:auto;padding:5px 12px;background:rgba(${col.rgb},0.15);border:1px solid rgba(${col.rgb},0.3);color:${col.hex};border-radius:8px;cursor:pointer;font-size:0.65rem;font-weight:900;">👁️ PREVIA</button>
        </div>`;

    // ─── FORMULARIO SEGÚN DÍA ─────────────────────────────────────
    if (dia.diaSemana === 6) {
        // ✝️ SÁBADO → formulario completo de 12 pasos
        const ORO = col.rgb; // color del día (sábado = amarillo)
        const c = (id, label, ph, icon, num) => {
            const numBadge = num !== undefined
                ? `<span style="color:rgba(${ORO},0.6);font-size:0.55rem;background:rgba(${ORO},0.15);padding:1px 6px;border-radius:5px;margin-right:4px;">${num}</span>`
                : '';
            return `<div style="margin-bottom:10px;">
              <label style="color:rgba(${ORO},0.8);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">${icon} ${numBadge}${label}</label>
              <input type="text" id="evt-field-${id}" value="${(d[id]||'').replace(/"/g,'&quot;')}" placeholder="${ph}"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;box-sizing:border-box;">
            </div>`;
        };
        const cHimno = (id, label, num) => `
            <div style="margin-bottom:10px;">
              <label style="color:rgba(${ORO},0.8);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">🎵 <span style="color:rgba(${ORO},0.6);font-size:0.55rem;background:rgba(${ORO},0.15);padding:1px 6px;border-radius:5px;margin-right:4px;">${num}</span>${label}</label>
              <div style="display:flex;gap:6px;align-items:center;">
                <input type="number" id="evt-field-${id}" value="${d[id]||''}" placeholder="#"
                  oninput="_autoTituloHimno('${id}','titulo_${id}')"
                  style="width:70px;flex-shrink:0;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.4);color:#fdcb6e;border-radius:10px;outline:none;font-size:0.85rem;font-weight:900;">
                <div style="flex:1;position:relative;">
                  <input type="text" id="evt-field-titulo_${id}" value="${(d['titulo_'+id]||'').replace(/"/g,'&quot;')}" placeholder="Título (editable)"
                    style="width:100%;padding:10px;background:rgba(0,0,0,0.25);border:1.5px solid rgba(${ORO},0.3);color:rgba(255,255,255,0.9);border-radius:10px;outline:none;font-size:0.78rem;box-sizing:border-box;">
                  <span style="position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:0.7rem;opacity:0.4;">🔒</span>
                </div>
              </div>
            </div>`;
        const seccion = (titulo) =>
            `<div style="color:rgba(${ORO},0.7);font-size:0.58rem;font-weight:900;letter-spacing:2px;margin:14px 0 8px;padding:5px 10px;background:rgba(${ORO},0.08);border-left:3px solid rgba(${ORO},0.5);border-radius:0 6px 6px 0;">${titulo}</div>`;

        formEl.innerHTML = cabecera + `
        <div style="background:rgba(${ORO},0.06);border:2px solid rgba(${ORO},0.3);border-radius:14px;padding:14px;margin-bottom:14px;">
          <div style="color:${col.hex};font-weight:900;font-size:0.7rem;letter-spacing:2px;text-align:center;margin-bottom:4px;">✝️ CULTO DIVINO</div>
          <div style="color:rgba(255,255,255,0.3);font-size:0.6rem;text-align:center;">Programa litúrgico del Culto de Sábado</div>
        </div>

        ${seccion('👴 PRESIDENCIA DEL CULTO')}
        <div style="margin-bottom:10px;">
          <label style="color:rgba(${ORO},0.8);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">👴 ANCIANO(S) / ANCIANA(S) DE TURNO</label>
          <select id="evt-field-anciano_tipo" style="width:100%;padding:10px;background:rgba(0,0,0,0.5);border:1.5px solid rgba(${ORO},0.35);color:#fff;border-radius:10px;outline:none;font-size:0.82rem;margin-bottom:6px;">
            <option value="">— Seleccionar categoría —</option>
            <option value="Anciano de Turno" ${(d['anciano_tipo']||'')==='Anciano de Turno'?'selected':''}>🧓 Anciano de Turno</option>
            <option value="Ancianos de Turno" ${(d['anciano_tipo']||'')==='Ancianos de Turno'?'selected':''}>🧓🧓 Ancianos de Turno</option>
            <option value="Anciana de Turno" ${(d['anciano_tipo']||'')==='Anciana de Turno'?'selected':''}>👵 Anciana de Turno</option>
            <option value="Ancianas de Turno" ${(d['anciano_tipo']||'')==='Ancianas de Turno'?'selected':''}>👵👵 Ancianas de Turno</option>
            <option value="Anciano y Anciana de Turno" ${(d['anciano_tipo']||'')==='Anciano y Anciana de Turno'?'selected':''}>🧓👵 Anciano y Anciana de Turno</option>
          </select>
          <input type="text" id="evt-field-anciano" value="${(d['anciano']||'').replace(/"/g,'&quot;')}" placeholder="Nombre(s) del anciano/a de turno..."
            style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;box-sizing:border-box;font-weight:700;">
        </div>

        <div style="margin-bottom:10px;">
          <label style="color:rgba(${ORO},0.8);font-size:0.55rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">🚪 DIÁCONOS Y DIACONISAS DE TURNO (PUERTA Y ORDEN)</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <input type="text" id="evt-field-ev_diaconos" value="${(d['ev_diaconos']||'').replace(/"/g,'&quot;')}" placeholder="Diáconos..."
              style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1px solid rgba(${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;box-sizing:border-box;">
            <input type="text" id="evt-field-ev_diaconisas" value="${(d['ev_diaconisas']||'').replace(/"/g,'&quot;')}" placeholder="Diaconisas..."
              style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1px solid rgba(${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;box-sizing:border-box;">
          </div>
        </div>

        ${seccion('⚡ APERTURA DEL CULTO')}
        ${c('ev_llamado',    'LLAMADO A LA ADORACIÓN',    '¿Quién hace el llamado?',   '📣',  '0')}
        ${cHimno('ev_doxologia',   'DOXOLOGÍA',  '1')}
        ${c('ev_invocacion', 'INVOCACIÓN',                '¿Quién ora?',               '🙏',  '2')}
        ${c('ev_bienvenida', 'BIENVENIDA',                '¿Quién da la bienvenida?',  '🤝',  '3')}

        <div style="margin-bottom:10px;">
          <label style="color:rgba(${ORO},0.8);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">👶 <span style="color:rgba(${ORO},0.6);font-size:0.55rem;background:rgba(${ORO},0.15);padding:1px 6px;border-radius:5px;margin-right:4px;">4</span>RINCÓN INFANTIL</label>
          <div style="color:rgba(255,255,255,0.45);font-size:0.55rem;font-weight:800;margin-bottom:3px;margin-left:4px;letter-spacing:1px;">¿QUIÉN ANUNCIA?:</div>
          <input type="text" id="evt-field-infantil_anuncia" value="${(d['infantil_anuncia']||'').replace(/"/g,'&quot;')}" placeholder="Ej. Hno. Pedro..."
            style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.25);color:#fff;border-radius:10px;outline:none;font-size:0.82rem;box-sizing:border-box;margin-bottom:8px;">
          <div style="color:rgba(255,255,255,0.45);font-size:0.55rem;font-weight:800;margin-bottom:3px;margin-left:4px;letter-spacing:1px;">¿QUIÉN CONDUCE/DA LA HISTORIA?:</div>
          <input type="text" id="evt-field-infantil" value="${(d['infantil']||'').replace(/"/g,'&quot;')}" placeholder="Ej. Hna. Maria..."
            style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.82rem;box-sizing:border-box;">
        </div>

        <div style="margin-bottom:10px;">
          <label style="color:rgba(${ORO},0.8);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">💰 <span style="color:rgba(${ORO},0.6);font-size:0.55rem;background:rgba(${ORO},0.15);padding:1px 6px;border-radius:5px;margin-right:4px;">5</span>DIEZMOS Y OFRENDAS</label>
          <div style="color:rgba(255,255,255,0.45);font-size:0.55rem;font-weight:800;margin-bottom:3px;margin-left:4px;letter-spacing:1px;">¿QUIÉN ANUNCIA?:</div>
          <input type="text" id="evt-field-ev_ofrendas_anuncia" value="${(d['ev_ofrendas_anuncia']||'').replace(/"/g,'&quot;')}" placeholder="Ej. Hno. Carlos..."
            style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.25);color:#fff;border-radius:10px;outline:none;font-size:0.82rem;box-sizing:border-box;margin-bottom:8px;">
          <div style="color:rgba(255,255,255,0.45);font-size:0.55rem;font-weight:800;margin-bottom:3px;margin-left:4px;letter-spacing:1px;">¿QUIÉNES RECOGEN?:</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <input type="text" id="evt-field-ev_ofrendas" value="${(d['ev_ofrendas']||'').replace(/"/g,'&quot;')}" placeholder="Diácono..."
              style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.82rem;box-sizing:border-box;">
            <input type="text" id="evt-field-ev_ofrendas_diaconisa" value="${(d['ev_ofrendas_diaconisa']||'').replace(/"/g,'&quot;')}" placeholder="Diaconisa..."
              style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:10px;outline:none;font-size:0.82rem;box-sizing:border-box;">
          </div>
        </div>

        ${seccion('🎵 HIMNO DE ADORACIÓN')}
        ${c('ev_himno_anuncia', 'QUIEN ANUNCIA EL HIMNO',  '¿Quién anuncia?',          '📣',  '6')}
        ${cHimno('ev_himno_adoracion', 'HIMNO DE ADORACIÓN', '6')}

        ${seccion('📖 LECTURA BÍBLICA')}
        ${c('ev_lectura_quien', 'LECTOR',                  '¿Quién lee la cita?',      '📖',  '7')}
        ${c('ev_lectura_cita',  'CITA BÍBLICA',            'Ej.: Apocalipsis 14:6',    '📖',  '7')}

        ${seccion('🙏 DESARROLLO')}
        ${c('ev_oracion_intercesora', 'ORACIÓN INTERCESORA', '¿Quién ora?',            '🙏',  '8')}
        ${c('ev_pred_anuncia', 'PRESENTA AL PREDICADOR',   '¿Quién presenta?',         '📝',  '')}
        ${c('ev_musica_especial',     'MÚSICA ESPECIAL',     '¿Quién o qué grupo?',    '🎶',  '9')}

        ${seccion('🎤 PREDICACIÓN')}
        ${c('ev_predicador',   'PREDICADOR/A',             'Nombre del predicador...',  '🎤',  '10')}
        ${c('ev_tema',         'TEMA DEL SERMÓN',          'Título del sermón...',      '📋',  '')}

        ${seccion('🎵 CIERRE DEL CULTO')}
        ${c('ev_himno_final_quien', 'QUIEN ANUNCIA EL HIMNO FINAL', '¿Quién anuncia?', '📣', '11')}
        ${cHimno('ev_himno_final', 'HIMNO FINAL', '11')}
        ${c('ev_oracion_final', 'ORACIÓN FINAL',           '¿Quién ora?',              '🙏',  '12')}
        ${c('ev_sonido',       'ENCARGADO DE SONIDO',      'Nombre...',                '🎛️', '')}
        ${c('observaciones',   'OBSERVACIONES / NOTAS',    'Notas adicionales...',     '📝',  '')}
        `;
    } else {
        // ─── DÍAS DE SEMANA → formulario genérico ampliado ────────
        const secGen = (titulo) =>
            `<div style="color:rgba(255,255,255,0.8);font-size:0.58rem;font-weight:900;letter-spacing:2px;margin:14px 0 8px;padding:5px 10px;background:rgba(${col.rgb},0.1);border-left:3px solid rgba(${col.rgb},0.5);border-radius:0 6px 6px 0;">${titulo}</div>`;

        formEl.innerHTML = cabecera + `
        ${secGen('🎩 PRESIDENCIA Y SERVIDORES')}
        ${campo('maestro_ceremonia',   'MAESTRO/A DE CEREMONIA',               'Nombre(s) — puede ser más de uno...', '🎩')}
        <div style="margin-bottom:10px;">
          <label style="color:rgba(255,255,255,0.75);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">🚪 DIÁCONOS Y DIACONISAS</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <input type="text" id="evt-field-gen_diaconos" value="${(d['gen_diaconos']||'').replace(/"/g,'&quot;')}" placeholder="Diáconos..."
              style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1px solid rgba(${col.rgb},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;box-sizing:border-box;">
            <input type="text" id="evt-field-gen_diaconisas" value="${(d['gen_diaconisas']||'').replace(/"/g,'&quot;')}" placeholder="Diaconisas..."
              style="width:100%;padding:9px;background:rgba(0,0,0,0.4);border:1px solid rgba(${col.rgb},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;box-sizing:border-box;">
          </div>
        </div>

        ${secGen('🎶 MOMENTO DE ALABANZA')}
        ${campo('alabanza_director',   'DIRECTOR / QUIEN DIRIGE LA ALABANZA',  'Nombre de quien dirige...', '🎶')}
        ${campoHimno('alabanza_himno1','titulo_alabanza_himno1','HIMNO DE ALABANZA #1')}
        ${campoHimno('alabanza_himno2','titulo_alabanza_himno2','HIMNO DE ALABANZA #2')}
        ${campoHimno('alabanza_himno3','titulo_alabanza_himno3','HIMNO DE ALABANZA #3')}
        ${campoHimno('alabanza_himno4','titulo_alabanza_himno4','HIMNO DE ALABANZA #4')}

        ${secGen('📋 PROGRAMA DEL SERVICIO')}
        ${campo('tema',                'TEMA / TÍTULO DEL SERVICIO',           'Ej.: El Poder de la Oración...', '📋')}
        ${campo('orador_apertura',     'BIENVENIDA',                           '¿Quién da la bienvenida?',       '🤝')}
        ${campo('oracion_inicial',     'ORACIÓN INICIAL / DE APERTURA',       '¿Quién ora?',                     '🙏')}
        ${campo('anuncia_himno_apertura','QUIEN ANUNCIA EL HIMNO TEMA',          '¿Quién lo anuncia?',               '📣')}
        ${campoHimno('himno_apertura','titulo_himno_apertura','HIMNO DE APERTURA / HIMNO TEMA')}
        ${campo('anuncia_lectura',     'QUIEN ANUNCIA LA LECTURA BÍBLICA',    '¿Quién lee la cita?',              '📖')}
        ${campoCita()}
        ${campo('anuncia_especial',    'QUIEN ANUNCIA LA PARTE ESPECIAL',      '¿Quién hace el anuncio?',         '🎶')}
        ${campo('musica_especial',     'MÚSICA ESPECIAL',                      '¿Quién participa?',              '🎶')}

        ${secGen('🎤 PREDICACIÓN')}
        ${campo('presenta_orador',     'QUIEN PRESENTA AL ORADOR',             '¿Quién lo presenta?',              '📝')}
        ${campo('orador',              'ORADOR / PREDICADOR',                  'Nombre del orador...',            '🎤')}

        ${secGen('🎵 CIERRE')}
        ${campo('presenta_himno_final','QUIEN PRESENTA EL HIMNO TEMA FINAL',   '¿Quién lo presenta/dirige?',      '🎵')}
        ${campoHimno('himno_final','titulo_himno_final','HIMNO FINAL / HIMNO TEMA')}
        ${campo('orador_oracion',      'ORACIÓN FINAL',                         '¿Quién ora?',                    '🙏')}
        ${campo('gen_sonido',          'ENCARGADO DE SONIDO',                  'Nombre...',                       '🎛️')}
        ${campo('observaciones',       'OBSERVACIONES / NOTAS',                'Notas adicionales...',            '📝')}
        `;
    }

    // Restaurar textarea (no se puede hacer con .innerHTML fácilmente)
    const taRef = document.getElementById('evt-field-texto_biblica');
    if (taRef && d['texto_biblica']) taRef.value = d['texto_biblica'];

    // ================================================================
    // 🍞 BLOQUE SANTA CENA — solo visible cuando es ese tipo de evento
    // ================================================================
    const tipoEvento = document.getElementById('evt-tipo')?.value;
    if (tipoEvento === 'santa_cena') {
        const SC = '#fab1a0';
        const SC_RGB = '250,177,160';

        const scCampo = (id, label, placeholder, icon) =>
            `<div style="margin-bottom:10px;">
               <label style="color:rgba(${SC_RGB},0.85);font-size:0.6rem;font-weight:900;letter-spacing:1px;display:block;margin-bottom:4px;">${icon} ${label}</label>
               <input type="text" id="evt-field-${id}" value="${(d[id]||'').replace(/"/g,'&quot;')}" placeholder="${placeholder}"
                 style="width:100%;padding:10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(${SC_RGB},0.35);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;box-sizing:border-box;">
             </div>`;

        // ── FILA: Nombre + Función (texto libre) ──────────────
        const buildFila = (prefijo, r) => {
            const vn = (d[prefijo+'_'+r+'_nombre'] || '').replace(/"/g,'&quot;');
            const vf = (d[prefijo+'_'+r+'_funcion'] || '').replace(/"/g,'&quot;');
            return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
              <input type="text" id="evt-field-${prefijo}_${r}_nombre"
                value="${vn}" placeholder="Nombre ${r}"
                style="padding:9px;background:rgba(0,0,0,0.4);border:1px solid rgba(${SC_RGB},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.78rem;box-sizing:border-box;">
              <input type="text" id="evt-field-${prefijo}_${r}_funcion"
                value="${vf}" placeholder="Función..."
                style="padding:9px;background:rgba(0,0,0,0.4);border:1px solid rgba(${SC_RGB},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.78rem;box-sizing:border-box;">
            </div>`;
        };

        let filasDiacono = '';
        for (let r = 1; r <= 6; r++) filasDiacono += buildFila('sc_diacono', r);

        let filasDiaconiza = '';
        for (let r = 1; r <= 6; r++) filasDiaconiza += buildFila('sc_diaconiza', r);

        const encabezado = (titulo) =>
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:6px;padding:6px 4px;background:rgba(${SC_RGB},0.1);border-radius:8px;">
              <span style="color:rgba(${SC_RGB},0.9);font-size:0.55rem;font-weight:900;padding:0 6px;">NOMBRE</span>
              <span style="color:rgba(${SC_RGB},0.9);font-size:0.55rem;font-weight:900;padding:0 6px;">FUNCIÓN</span>
            </div>`;

        const scSection = document.createElement('div');
        scSection.id = 'bloque-santa-cena';
        scSection.style.cssText = `margin-top:18px;border:2px solid rgba(${SC_RGB},0.45);border-radius:16px;padding:16px;background:rgba(${SC_RGB},0.04);`;
        scSection.innerHTML = `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
            <span style="font-size:1.6rem;">🍞</span>
            <div>
              <div style="color:rgba(255,255,255,0.4);font-size:0.52rem;font-weight:900;letter-spacing:1.5px;">SEGUNDA PARTE</div>
              <div style="color:${SC};font-weight:900;font-size:0.9rem;letter-spacing:0.5px;">SANTA CENA</div>
            </div>
          </div>

          <!-- SECCIÓN DIÁCONOS -->
          <div style="color:rgba(${SC_RGB},0.9);font-size:0.65rem;font-weight:900;letter-spacing:2px;margin-bottom:8px;padding:8px 10px;background:rgba(${SC_RGB},0.15);border-radius:8px;">👨 DIÁCONOS OFICIALES</div>
          ${encabezado()}
          ${filasDiacono}

          <!-- SECCIÓN DIACONIZAS -->
          <div style="color:rgba(${SC_RGB},0.9);font-size:0.65rem;font-weight:900;letter-spacing:2px;margin:18px 0 8px;padding:8px 10px;background:rgba(${SC_RGB},0.15);border-radius:8px;">👩 DIACONIZAS</div>
          ${encabezado()}
          ${filasDiaconiza}

          <!-- Lecturas y oraciones -->
          <div style="color:rgba(${SC_RGB},0.65);font-size:0.6rem;font-weight:900;letter-spacing:1.5px;margin:18px 0 8px;">📖 LECTURAS Y ORACIONES</div>
          ${scCampo('sc_lectura_pan',  'LECTURA POR EL PAN',   '¿Quién tiene la lectura por el pan?',  '📖')}
          ${scCampo('sc_cita_pan',     'CITA BÍBLICA (PAN)',    'Ej: 1 Corintios 11:23-24',              '📜')}
          ${scCampo('sc_oracion_pan',  'ORACIÓN POR EL PAN',   '¿Quién ora por el pan?',               '🙏')}
          ${scCampo('sc_lectura_vino', 'LECTURA POR EL VINO',  '¿Quién tiene la lectura por el vino?',  '📖')}
          ${scCampo('sc_cita_vino',    'CITA BÍBLICA (VINO)',   'Ej: 1 Corintios 11:25-26',              '📜')}
          ${scCampo('sc_oracion_vino', 'ORACIÓN POR EL VINO',  '¿Quién ora por el vino?',               '🙏')}

          <!-- Orador / Predicador y Cierre -->
          ${scCampo('sc_ordenador', 'ORADOR / PREDICADOR', 'Nombre del orador o predicador...', '🎤')}
          ${scCampo('sc_oracion_final', 'ORACIÓN FINAL', '¿Quién hace la oración final?', '🙏')}
        `;
        formEl.appendChild(scSection);
    }

}

// ----------------------------------------------------------------
// GUARDAR EL EVENTO COMPLETO EN LOCALSTORAGE
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// AUTO-TÍTULO DE HIMNO al escribir número
// ----------------------------------------------------------------
window._autoTituloHimno = function(idNum, idTitulo) {
    const numEl = document.getElementById('evt-field-' + idNum);
    const titEl = document.getElementById('evt-field-' + idTitulo);
    if (!numEl || !titEl) return;
    const num = parseInt(numEl.value);
    if (isNaN(num) || num < 1) { titEl.value = ''; return; }
    // buscarHimno viene de himnario_data.js
    const titulo = (typeof buscarHimno === 'function') ? buscarHimno(num) : (window.HIMNARIO_ADVENTISTA && window.HIMNARIO_ADVENTISTA[num]) || null;
    if (titulo) {
        titEl.value = titulo;
        titEl.style.color = '#55efc4';
    } else {
        titEl.value = '(himno no encontrado)';
        titEl.style.color = 'rgba(255,100,100,0.7)';
    }
};

// ----------------------------------------------------------------
// BUSCAR TEXTO BÍBLICO (API bible-api.com — RVR 1960)
// ----------------------------------------------------------------
window._buscarTextoBiblico = async function() {
    // Guardar primero el campo actual para no perderlo
    const citaEl = document.getElementById('evt-field-cita_biblica');
    const textoEl = document.getElementById('evt-field-texto_biblica');
    if (!citaEl || !textoEl) return;
    const cita = citaEl.value.trim();
    if (!cita) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Escribe una cita bíblica primero');
        return;
    }
    textoEl.value = '⏳ Buscando...';
    textoEl.style.color = 'rgba(255,255,255,0.4)';
    try {
        // Normalizar la cita para la API: Juan 3:16 → juan+3:16
        const citaEnc = encodeURIComponent(cita);
        const url = `https://bible-api.com/${citaEnc}?translation=rvr1960`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (data.text) {
            const texto = data.text.trim().replace(/\n/g, ' ');
            const referencia = data.reference || cita;
            textoEl.value = `"${texto}" — ${referencia}`;
            textoEl.style.color = 'rgba(255,255,255,0.85)';
            citaEl.value = referencia; // actualizar con referencia normalizada
            if (typeof mostrarToast === 'function') mostrarToast('📖 Texto bíblico encontrado');
        } else {
            throw new Error('Sin texto');
        }
    } catch(e) {
        textoEl.value = '';
        textoEl.style.color = 'rgba(255,255,255,0.8)';
        textoEl.placeholder = '❌ No se encontró. Escribe el texto manualmente.';
        if (typeof mostrarToast === 'function') mostrarToast('❌ Cita no encontrada. Escríbela manualmente.');
    }
};

// ----------------------------------------------------------------
// VISTA PREVIA DEL DÍA (modal de documento antes de compartir)
// ----------------------------------------------------------------
window._verPreviaDia = function(idx) {
    try {
        // Guardar datos actuales
        _guardarDatosFormDia(idx);
        const dia = window._diasEvento && window._diasEvento[idx];
        if (!dia) {
            if (typeof mostrarToast === 'function') mostrarToast('Error: día no encontrado');
            return;
        }
        const d = dia.datos || {};
        const col = (typeof COLORES_DIA !== 'undefined' && COLORES_DIA[dia.diaSemana]) ? COLORES_DIA[dia.diaSemana] : { hex: '#00b894', rgb: '0,184,148', nombre: 'Día' };

        // Obtener datos del evento
        const tipo   = document.getElementById('evt-tipo')?.value || '';
        const titulo = document.getElementById('evt-titulo')?.value || 'Evento Especial';
        const cat    = (typeof CATALOGO_EVENTOS !== 'undefined') ? CATALOGO_EVENTOS.find(e => e.key === tipo) : null;
        const emoji  = cat ? cat.emoji : '⭐';

    const fila = (ico, label, val) => val ? `
        <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="font-size:1rem;width:24px;text-align:center;flex-shrink:0;">${ico}</span>
          <div>
            <div style="color:rgba(255,255,255,0.4);font-size:0.58rem;font-weight:900;letter-spacing:1px;margin-bottom:2px;">${label}</div>
            <div style="color:#fff;font-size:0.85rem;font-weight:600;">${val}</div>
          </div>
        </div>` : '';

    const citaHtml = (d.cita_biblica || d.texto_biblica) ? `
        <div style="margin-top:12px;padding:14px;background:rgba(${col.rgb},0.08);border-left:3px solid ${col.hex};border-radius:0 10px 10px 0;">
          <div style="color:${col.hex};font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:6px;">📖 CITA BÍBLICA</div>
          ${d.cita_biblica ? `<div style="color:rgba(255,255,255,0.5);font-size:0.65rem;margin-bottom:4px;">${d.cita_biblica}</div>` : ''}
          ${d.texto_biblica ? `<div style="color:rgba(255,255,255,0.85);font-size:0.82rem;line-height:1.6;font-style:italic;">${d.texto_biblica}</div>` : ''}
        </div>` : '';

    const himnoAp = d.himno_apertura ? `#${d.himno_apertura}${d.titulo_himno_apertura ? ' — '+d.titulo_himno_apertura : ''}` : '';
    const himnoFn = d.himno_final ? `#${d.himno_final}${d.titulo_himno_final ? ' — '+d.titulo_himno_final : ''}` : '';

    let modal = document.getElementById('evt-previa-modal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'evt-previa-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);display:flex;align-items:flex-end;justify-content:center;overflow:hidden;';
    modal.innerHTML = `
    <div style="background:linear-gradient(180deg,#120e2a,#0a0818);border-radius:24px 24px 0 0;padding:0;width:100%;max-width:500px;max-height:90vh;display:flex;flex-direction:column;border-top:2px solid ${col.hex};">
      <!-- Header fijo -->
      <div style="padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
          <span style="font-size:1.8rem;">${emoji}</span>
          <div style="flex:1;">
            <div style="color:${col.hex};font-weight:900;font-size:0.72rem;letter-spacing:1.5px;">VISTA PREVIA DEL PROGRAMA</div>
            <div style="color:#fff;font-weight:700;font-size:0.88rem;">${titulo}</div>
          </div>
          <button onclick="document.getElementById('evt-previa-modal').remove()"
            style="background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.5);font-size:1.2rem;padding:6px 10px;border-radius:10px;cursor:pointer;">✕</button>
        </div>
        <div style="display:inline-block;background:rgba(${col.rgb},0.15);border:1px solid rgba(${col.rgb},0.3);color:${col.hex};font-size:0.65rem;font-weight:900;padding:4px 12px;border-radius:20px;letter-spacing:0.5px;">
          📅 ${_fechaLarga(dia.fecha)}
        </div>
      </div>

      <!-- Contenido scrollable -->
      <div style="overflow-y:auto;padding:16px 20px;flex:1;">
        ${fila('🎩', 'MAESTRO/A DE CEREMONIA', d.maestro_ceremonia)}
        ${fila('🚪', 'DIÁCONOS', d.gen_diaconos)}
        ${fila('🚪', 'DIACONISAS', d.gen_diaconisas)}
        ${fila('🎶', 'DIRIGE LA ALABANZA', d.alabanza_director)}
        ${d.alabanza_himno1 ? fila('🎵', 'HIMNO ALABANZA #1', '#' + d.alabanza_himno1 + (d.titulo_alabanza_himno1 ? ' — ' + d.titulo_alabanza_himno1 : '')) : ''}
        ${d.alabanza_himno2 ? fila('🎵', 'HIMNO ALABANZA #2', '#' + d.alabanza_himno2 + (d.titulo_alabanza_himno2 ? ' — ' + d.titulo_alabanza_himno2 : '')) : ''}
        ${d.alabanza_himno3 ? fila('🎵', 'HIMNO ALABANZA #3', '#' + d.alabanza_himno3 + (d.titulo_alabanza_himno3 ? ' — ' + d.titulo_alabanza_himno3 : '')) : ''}
        ${d.alabanza_himno4 ? fila('🎵', 'HIMNO ALABANZA #4', '#' + d.alabanza_himno4 + (d.titulo_alabanza_himno4 ? ' — ' + d.titulo_alabanza_himno4 : '')) : ''}
        ${fila('📋', 'TEMA DEL SERVICIO', d.tema)}
        ${fila('🤝', 'BIENVENIDA', d.orador_apertura)}
        ${fila('🙏', 'ORACIÓN INICIAL', d.oracion_inicial)}
        ${d.anuncia_himno_apertura ? fila('📣', 'QUIEN ANUNCIA EL HIMNO', d.anuncia_himno_apertura) : ''}
        ${fila('🎵', 'HIMNO DE APERTURA', himnoAp)}
        ${d.anuncia_lectura ? fila('📣', 'QUIEN ANUNCIA LA LECTURA', d.anuncia_lectura) : ''}
        ${citaHtml}
        ${d.anuncia_especial ? fila('📣', 'QUIEN ANUNCIA PARTE ESPECIAL', d.anuncia_especial) : ''}
        ${fila('🎶', 'MÚSICA ESPECIAL', d.musica_especial)}
        ${d.presenta_orador ? fila('📝', 'QUIEN PRESENTA AL ORADOR', d.presenta_orador) : ''}
        ${fila('🎤', 'ORADOR / PREDICADOR', d.orador)}
        ${d.presenta_himno_final ? fila('📣', 'QUIEN PRESENTA EL HIMNO FINAL', d.presenta_himno_final) : ''}
        ${fila('🎵', 'HIMNO FINAL', himnoFn)}
        ${fila('🙏', 'ORACIÓN FINAL', d.orador_oracion)}
        ${fila('🎛️', 'ENCARGADO DE SONIDO', d.gen_sonido)}
        ${fila('📝', 'OBSERVACIONES', d.observaciones)}

        ${!d.tema && !d.orador && !d.orador_apertura && !d.himno_apertura && !d.cita_biblica && !d.maestro_ceremonia ? `
          <div style="text-align:center;padding:30px 20px;color:rgba(255,255,255,0.25);font-size:0.82rem;">
            <div style="font-size:2rem;margin-bottom:8px;">📝</div>
            Este día aún no tiene información registrada.
          </div>` : ''}
      </div>

      <!-- Botones de acción fijos -->
      <div style="padding:14px 20px;border-top:1px solid rgba(255,255,255,0.07);display:grid;grid-template-columns:1fr 1fr;gap:8px;flex-shrink:0;">
        <button onclick="_compartirDesdePreviaDia(${idx});document.getElementById('evt-previa-modal').remove();"
          style="padding:13px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1.5px solid rgba(37,211,102,0.4);color:#25D366;border-radius:12px;cursor:pointer;font-weight:900;font-size:0.78rem;">
          📤 Compartir este día
        </button>
        <button onclick="document.getElementById('evt-previa-modal').remove()"
          style="padding:13px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.5);border-radius:12px;cursor:pointer;font-weight:700;font-size:0.78rem;">
          ✏️ Seguir editando
        </button>
      </div>
    </div>`;
    document.body.appendChild(modal);
    } catch(e) {
        console.error('Error generando vista previa:', e);
        if (typeof mostrarToast === 'function') mostrarToast('Plantilla Error: ' + e.message);
    }
};

// Compartir directamente desde la vista previa del formulario
window._compartirDesdePreviaDia = function(idx) {
    const dia = window._diasEvento && window._diasEvento[idx];
    if (!dia) return;
    const d = dia.datos || {};
    const tipo   = document.getElementById('evt-tipo')?.value || '';
    const titulo = document.getElementById('evt-titulo')?.value || 'Evento Especial';
    const cat    = CATALOGO_EVENTOS.find(e => e.key === tipo);
    const emoji  = cat ? cat.emoji : '⭐';
    const sep = '══════════════════════════';
    const lineas = [];
    lineas.push(sep);
    lineas.push(`${emoji} ${titulo.toUpperCase()}`);
    lineas.push(`⛪ Iglesia Adventista Cypress Hills`);
    lineas.push(sep);
    lineas.push('');
    lineas.push(`📅 ${_fechaLarga(dia.fecha).toUpperCase()}`);
    lineas.push('');
    if (d.maestro_ceremonia)      lineas.push(`🎩 Maestro/a de Ceremonia: ${d.maestro_ceremonia}`);
    if (d.gen_diaconos)           lineas.push(`🚪 Diáconos: ${d.gen_diaconos}`);
    if (d.gen_diaconisas)         lineas.push(`🚪 Diaconisas: ${d.gen_diaconisas}`);
    if (d.alabanza_director)      lineas.push(`🎶 Dirige la alabanza: ${d.alabanza_director}`);
    if (d.alabanza_himno1)        lineas.push(`🎵 Himno alabanza #1: #${d.alabanza_himno1}${d.titulo_alabanza_himno1 ? ' — '+d.titulo_alabanza_himno1 : ''}`);
    if (d.alabanza_himno2)        lineas.push(`🎵 Himno alabanza #2: #${d.alabanza_himno2}${d.titulo_alabanza_himno2 ? ' — '+d.titulo_alabanza_himno2 : ''}`);
    if (d.alabanza_himno3)        lineas.push(`🎵 Himno alabanza #3: #${d.alabanza_himno3}${d.titulo_alabanza_himno3 ? ' — '+d.titulo_alabanza_himno3 : ''}`);
    if (d.alabanza_himno4)        lineas.push(`🎵 Himno alabanza #4: #${d.alabanza_himno4}${d.titulo_alabanza_himno4 ? ' — '+d.titulo_alabanza_himno4 : ''}`);
    if (d.tema)                   lineas.push(`📋 Tema: ${d.tema}`);
    if (d.orador_apertura)        lineas.push(`🤝 Bienvenida: ${d.orador_apertura}`);
    if (d.oracion_inicial)        lineas.push(`🙏 Oración Inicial: ${d.oracion_inicial}`);
    if (d.anuncia_himno_apertura) lineas.push(`📣 Anuncia himno apertura: ${d.anuncia_himno_apertura}`);
    if (d.himno_apertura)         lineas.push(`🎵 Himno apertura: #${d.himno_apertura}${d.titulo_himno_apertura ? ' — '+d.titulo_himno_apertura : ''}`);
    if (d.anuncia_lectura)        lineas.push(`📣 Anuncia lectura bíblica: ${d.anuncia_lectura}`);
    if (d.cita_biblica)           lineas.push(`📖 Cita: ${d.cita_biblica}`);
    if (d.texto_biblica)          lineas.push(`   ${d.texto_biblica}`);
    if (d.anuncia_especial)       lineas.push(`📣 Anuncia parte especial: ${d.anuncia_especial}`);
    if (d.musica_especial)        lineas.push(`🎶 Música especial: ${d.musica_especial}`);
    if (d.presenta_orador)        lineas.push(`📝 Presenta al Orador: ${d.presenta_orador}`);
    if (d.orador)                 lineas.push(`🎤 Orador: ${d.orador}`);
    if (d.presenta_himno_final)   lineas.push(`📣 Presenta himno final: ${d.presenta_himno_final}`);
    if (d.himno_final)            lineas.push(`🎵 Himno final: #${d.himno_final}${d.titulo_himno_final ? ' — '+d.titulo_himno_final : ''}`);
    if (d.orador_oracion)         lineas.push(`🙏 Oración final: ${d.orador_oracion}`);
    if (d.gen_sonido)             lineas.push(`🎛️ Sonido: ${d.gen_sonido}`);
    if (d.observaciones)          lineas.push(`📝 ${d.observaciones}`);
    lineas.push('');
    lineas.push(sep);
    lineas.push('   📱 Legado Bíblico');
    lineas.push(sep);
    const texto = lineas.join('\n');
    if (navigator.share) {
        navigator.share({ text: texto }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto);
        if (typeof mostrarToast === 'function') mostrarToast('📋 Programa copiado al portapapeles');
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
};

window.guardarEventoCompleto = function() {
    // Guardar datos del día activo primero
    if (window._diasEvento) {
        _guardarDatosFormDia(window._eventoEditorDiaActivo);
    }

    const tipo   = document.getElementById('evt-tipo')?.value;
    const titulo = document.getElementById('evt-titulo')?.value.trim();
    const fechaInicio = document.getElementById('evt-fecha-inicio')?.value;

    if (!tipo || !titulo || !fechaInicio) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Completa tipo, título y fecha');
        return;
    }

    const cat = CATALOGO_EVENTOS.find(e => e.key === tipo);
    let eventoId = window._eventoEditandoId || window._autoGuardadoId || Date.now();

    // ✅ ANTI-DUPLICADO: Si ya existe evento con mismo tipo + fecha, reusar ese ID
    const eventosActuales = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    if (!window._eventoEditandoId) {
        const existeDuplicate = eventosActuales.find(e =>
            e.tipo === tipo && e.fechaInicio === fechaInicio && e.id !== eventoId
        );
        if (existeDuplicate) {
            // Usar el ID existente en vez de crear duplicado
            eventoId = existeDuplicate.id;
            window._autoGuardadoId = eventoId;
            console.log('[Anti-duplicado] Reutilizando evento existente ID:', eventoId);
        }
    }

    // ✅ FUSIONAR con datos de sesiones anteriores
    // Si un día ya tenía datos guardados antes y la sesión actual no lo tocó, se preservan
    const eventoExistente = eventosActuales.find(e => e.id === eventoId);
    if (eventoExistente && eventoExistente.dias && window._diasEvento) {
        eventoExistente.dias.forEach((savedDia, i) => {
            if (!window._diasEvento[i]) return;
            const currentDatos = window._diasEvento[i].datos || {};
            const hasCurrentData = Object.keys(currentDatos).some(k => !!currentDatos[k]);
            const hasSavedData  = savedDia.datos && Object.keys(savedDia.datos).some(k => !!savedDia.datos[k]);
            // Si este día no fue editado en esta sesión pero tenía datos anteriores → preservar
            if (!hasCurrentData && hasSavedData) {
                window._diasEvento[i].datos = savedDia.datos;
            }
        });
    }

    const evento = {
        id: eventoId,
        tipo,
        emoji: cat ? cat.emoji : '⭐',
        color: cat ? cat.color : '#74b9ff',
        titulo,
        fechaInicio,
        duracion: window._duracionEvento || 7,
        dias: (window._diasEvento || []).map(d => ({ fecha: d.fecha, diaSemana: d.diaSemana, datos: d.datos || {} })),
        creadoEn: new Date().toISOString()
    };

    let eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    eventos = eventos.filter(e => e.id !== eventoId);
    if (window._eventoEditandoId) {
        window._eventoEditandoId = null;
        const btn = document.getElementById('btn-guardar-evento');
        if (btn) { btn.innerHTML = '💾 GUARDAR EVENTO COMPLETO'; btn.style.background = 'linear-gradient(135deg,#74b9ff,#0984e3)'; }
        if (typeof mostrarToast === 'function') mostrarToast('✅ Evento actualizado');
    } else {
        if (typeof mostrarToast === 'function') mostrarToast('✅ Evento guardado');
    }
    window._autoGuardadoId = null;
    eventos.unshift(evento);
    eventos.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
    localStorage.setItem('legado_eventos', JSON.stringify(eventos));
    // 🔥 FIREBASE BACKUP — protege el evento en la nube
    _syncEventoFirebase(evento).catch(e => console.warn('[Firebase Eventos] Error sync:', e));


    // Limpiar formulario
    ['evt-tipo','evt-titulo','evt-fecha-inicio'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { if (id === 'evt-tipo') el.selectedIndex = 0; else el.value = ''; }
    });
    window._diasEvento = null;
    window._eventoEditorDiaActivo = 0;
    const wrapper = document.getElementById('evt-dias-wrapper');
    if (wrapper) wrapper.style.display = 'none';

    // Ir al historial
    cambiarSubTabEvento('lista');
};

// ----------------------------------------------------------------
// CARGAR HISTORIAL DE EVENTOS
// ----------------------------------------------------------------
window.cargarHistorialEventos = function() {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const el = document.getElementById('evt-historial-contenedor');
    if (!el) return;

    if (eventos.length === 0) {
        el.innerHTML = `
        <div style="text-align:center;padding:40px 20px;background:rgba(255,255,255,0.02);border-radius:16px;border:1px dashed rgba(255,255,255,0.1);">
          <div style="font-size:3rem;margin-bottom:12px;">📅</div>
          <div style="color:rgba(255,255,255,0.4);font-size:0.85rem;">No hay eventos registrados aún.</div>
          <div style="color:rgba(255,255,255,0.25);font-size:0.72rem;margin-top:4px;">Crea tu primer evento especial ↑</div>
        </div>`;
        return;
    }

    const eventosConDatos = eventos.filter(ev =>
        (ev.dias||[]).some(d => d.datos && Object.keys(d.datos).some(k => !!d.datos[k]))
    ).length;
    const eventosSinDatos = eventos.length - eventosConDatos;

    // ✅ Header con botón de actualización
    const headerHtml = `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div style="color:rgba(255,255,255,0.4);font-size:0.62rem;font-weight:900;letter-spacing:1px;">
          📋 ${eventos.length} EVENTO${eventos.length>1?'S':''} GUARDADOS
        </div>
      <div style="display:flex;gap:6px;">
        <button onclick="sincronizarEventosDesdeFirebase()"
          style="padding:5px 12px;background:rgba(108,92,231,0.12);border:1px solid rgba(108,92,231,0.35);
                 color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.58rem;letter-spacing:1px;">
          ☁️ RECUPERAR DE NUBE
        </button>
        <button onclick="forzarActualizacion()"
          style="padding:5px 12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);
                 color:rgba(255,255,255,0.45);border-radius:8px;cursor:pointer;font-weight:700;font-size:0.58rem;">
          🔄 Actualizar App
        </button>
      </div>
      </div>
      ${eventosSinDatos > 0 ? `
      <div style="background:rgba(253,203,110,0.08);border:1.5px solid rgba(253,203,110,0.25);border-radius:12px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="color:#fdcb6e;font-size:0.65rem;font-weight:900;">📝 ${eventosSinDatos} evento${eventosSinDatos>1?'s':''} sin completar</div>
          <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;margin-top:2px;">Puedes editarlos o limpiarlos</div>
        </div>
        <button onclick="_borrarEventosVacios()"
          style="padding:8px 14px;background:rgba(253,203,110,0.15);border:1.5px solid rgba(253,203,110,0.4);
                 color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;white-space:nowrap;">
          🧹 Limpiar Vacíos
        </button>
      </div>` : `
      <div style="background:rgba(46,213,115,0.07);border:1px solid rgba(46,213,115,0.25);border-radius:10px;padding:7px 12px;color:rgba(46,213,115,0.7);font-size:0.6rem;font-weight:700;">
        ✅ ${eventosConDatos} evento${eventosConDatos>1?'s':''} con datos guardados
      </div>`}
      <button onclick="_borrarTodosEventos()"
        style="width:100%;margin-top:8px;padding:10px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.12);
               color:rgba(255,255,255,0.3);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.6rem;">
        🗑️ Borrar todos los eventos
      </button>
    </div>`;

    el.innerHTML = headerHtml + eventos.map(function(ev) {
        try {
            var hoyCStr = new Date().toISOString().split('T')[0];
            var d0 = ev.dias && ev.dias[0] ? ev.dias[0] : null;
            var dLast = ev.dias && ev.dias.length > 0 ? ev.dias[ev.dias.length-1] : null;
            var strStart = d0 && d0.fecha && typeof d0.fecha === 'string' ? d0.fecha.split('T')[0].split('-').reverse().join('/') : (ev.fechaInicio||'');
            var strEnd = dLast && dLast.fecha && typeof dLast.fecha === 'string' && dLast !== d0 ? dLast.fecha.split('T')[0].split('-').reverse().join('/') : '';
            var diasStr = strEnd ? strStart + ' al ' + strEnd : strStart;

            var diasConDatos = (ev.dias || []).filter(function(d) {
                return d.datos && Object.keys(d.datos).some(function(k) { return !!d.datos[k]; });
            }).length;
        var totalDias = (ev.dias || []).length;
        var estaActivo = ev.dias && ev.dias.some(function(d) { return d.fecha === hoyCStr; });
        var evColorSeguro = ev.color || '#74b9ff';
        var evRgb = _hexToRgb(evColorSeguro);

        // ── Subtitle line ──────────────────────────────────────────
        var subtitulo;
        if (ev.tipo === 'santa_cena') {
            var sab = (ev.dias || []).find(function(d) { return d.diaSemana === 6; }) || (ev.dias && ev.dias[0]);
            var sabStr = sab ? (function(){ var f = sab.fecha.split('-'); return 'Sábado ' + f[2] + '/' + f[1] + '/' + f[0]; })() : ev.fechaInicio;
            subtitulo = '✝️ ' + sabStr + ' · Santa Cena';
        } else {
            subtitulo = '📅 ' + diasStr + ' • ' + ev.duracion + ' día' + (ev.duracion > 1 ? 's' : '')
                + ' • <span style="color:' + (diasConDatos === totalDias ? '#2ed573' : '#fdcb6e') + '">'
                + diasConDatos + '/' + totalDias + ' días con datos</span>';
        }

        // ── Day chips (only for non-santa_cena) ──────────────────
        var chipsHtml = '';
        if (ev.tipo !== 'santa_cena') {
            var chipsInner = (ev.dias || []).map(function(dia) {
                var col = COLORES_DIA[dia.diaSemana];
                var esHoy = (dia.fecha === hoyCStr);
                var tieneDatos = dia.datos && Object.keys(dia.datos).some(function(k) { return !!dia.datos[k]; });
                return '<span style="position:relative;padding:4px 10px;'
                    + 'background:rgba(' + col.rgb + ',' + (esHoy ? '0.3' : '0.1') + ');'
                    + 'border:' + (esHoy ? '2px' : '1px') + ' solid rgba(' + col.rgb + ',' + (esHoy ? '0.9' : '0.3') + ');'
                    + 'color:' + (esHoy ? col.hex : 'rgba(255,255,255,0.6)') + ';'
                    + 'border-radius:8px;font-size:0.62rem;font-weight:' + (esHoy ? '900' : '600') + ';white-space:nowrap;">'
                    + _fechaCorta(dia.fecha) + (esHoy ? ' 📍' : '')
                    + (tieneDatos ? '<span style="position:absolute;top:-3px;right:-2px;background:#2ed573;width:6px;height:6px;border-radius:50%;"></span>' : '')
                    + '</span>';
            }).join('');
            chipsHtml = '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;">' + chipsInner + '</div>';
        }

        // ── Action buttons → GRID 2x2 como en cultos ─────────────
        var botonesGrid = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-bottom:12px;">'
            + '<button onclick="editarEvento(' + ev.id + ')" style="padding:11px 4px;background:rgba(253,203,110,0.15);border:1.5px solid rgba(253,203,110,0.5);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;letter-spacing:0.3px;">✏️ EDITAR</button>'
            + '<button onclick="_abrirSelectorDias(' + ev.id + ')" style="padding:11px 4px;background:linear-gradient(135deg,rgba(253,121,168,0.18),rgba(108,92,231,0.12));border:1.5px solid rgba(253,121,168,0.5);color:#fd79a8;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;">✨ PLANTILLA</button>'
            + '<button onclick="generarPDFEvento(' + ev.id + ')" style="padding:11px 4px;background:rgba(116,185,255,0.1);border:1.5px solid rgba(116,185,255,0.4);color:#74b9ff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;">📄 PDF</button>'
            + '<button onclick="compartirEventoCompleto(' + ev.id + ')" style="padding:11px 4px;background:rgba(37,211,102,0.1);border:1.5px solid rgba(37,211,102,0.4);color:#25D366;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;">📤 COMPARTIR</button>'
            + '</div>';

        return '<div id="evt-' + ev.id + '" style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(' + evRgb + ',' + (estaActivo ? '0.6' : '0.2') + ');border-radius:16px;overflow:hidden;' + (estaActivo ? 'box-shadow:0 0 20px rgba(' + evRgb + ',0.15)' : '') + '">'
            // CABECERA
            + '<div style="padding:14px 16px;background:rgba(' + evRgb + ',0.08);border-bottom:1px solid rgba(' + evRgb + ',0.15);display:flex;align-items:center;gap:12px;">'
            +   '<div style="font-size:2rem;">' + ev.emoji + '</div>'
            +   '<div style="flex:1;min-width:0;">'
            +     '<div style="color:' + evColorSeguro + ';font-weight:900;font-size:0.8rem;letter-spacing:0.5px;">'
            +       (estaActivo ? '<span style="background:' + evColorSeguro + ';color:#000;font-size:0.55rem;padding:2px 7px;border-radius:8px;margin-right:6px;font-weight:900;">EN CURSO</span>' : '')
            +       ev.titulo
            +     '</div>'
            +     '<div style="color:rgba(255,255,255,0.4);font-size:0.65rem;margin-top:2px;">' + subtitulo + '</div>'
            +   '</div>'
            +   '<button onclick="borrarEvento(' + ev.id + ')" style="background:transparent;border:none;color:rgba(255,100,100,0.4);font-size:1rem;cursor:pointer;padding:4px;" title="Eliminar">🗑️</button>'
            + '</div>'
            // DÍAS + BOTONES
            + '<div style="padding:10px 16px 0;">'
            +   chipsHtml
            +   botonesGrid
            + '</div>'
            + '</div>';
        } catch(e) { console.error("Error drawing list", e); return ''; }
    }).join('');

// ----------------------------------------------------------------
}; // FIN cargarHistorialEventos




// ELEGIR DÍA(S) PARA PDF O PLANTILLA — Selección múltiple con checkboxes
// ----------------------------------------------------------------
window.elegirDiaEvento = function(eventoId, tipo) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(function(e) { return e.id === eventoId; });
    if (!ev || !ev.dias || ev.dias.length === 0) return;

    // Si solo tiene 1 día, generar directo
    if (ev.dias.length === 1) {
        window._diaSelElegir = [0];
        if (tipo === 'pdf') generarPDFEvento(eventoId, 'seleccion');
        else generarPlantillaEvento(eventoId, 'seleccion');
        return;
    }

    var icono = tipo === 'pdf' ? '📄' : '🖼️';
    var label = tipo === 'pdf' ? 'PDF' : 'Plantilla Imagen';
    var colorEv = ev.color || '#74b9ff';

    var modal = document.getElementById('evt-dia-picker');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'evt-dia-picker';
    modal.style.cssText = 'position:fixed;inset:0;z-index:10005;background:rgba(0,0,0,0.88);display:flex;align-items:flex-end;justify-content:center;';

    var checkboxesHtml = ev.dias.map(function(dia, i) {
        var col = (typeof COLORES_DIA !== 'undefined') ? COLORES_DIA[dia.diaSemana] : { hex: colorEv, rgb: '116,185,255', nombre: '' };
        var fechaCorta = (typeof _fechaCorta === 'function') ? _fechaCorta(dia.fecha) : dia.fecha;
        var tema = dia.datos && dia.datos.tema
            ? '<div style="color:rgba(255,255,255,0.45);font-size:0.62rem;margin-top:2px;">' + dia.datos.tema + '</div>'
            : '';
        return '<label id="lbl-dia-' + i + '" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(' + col.rgb + ',0.07);border:1.5px solid rgba(' + col.rgb + ',0.25);border-radius:12px;cursor:pointer;margin-bottom:7px;transition:background 0.2s;" onclick="_toggleDiaPicker(' + i + ',\'' + col.rgb + '\')">'
            + '<div id="chk-box-' + i + '" style="width:22px;height:22px;border-radius:6px;border:2px solid rgba(' + col.rgb + ',0.5);background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;transition:all 0.15s;"></div>'
            + '<div style="flex:1;">'
            +   '<div style="color:' + col.hex + ';font-weight:900;font-size:0.8rem;">' + fechaCorta + ' — ' + (col.nombre || '') + '</div>'
            +   tema
            + '</div>'
            + '</label>';
    }).join('');

    modal.innerHTML = '<div style="background:linear-gradient(180deg,#120e2a,#0a0818);border-radius:24px 24px 0 0;width:100%;max-width:500px;max-height:85vh;display:flex;flex-direction:column;border-top:2px solid ' + colorEv + ';">'
        + '<div style="padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">'
        +   '<div>'
        +     '<div style="color:' + colorEv + ';font-size:0.65rem;font-weight:900;letter-spacing:1.5px;">' + icono + ' SELECCIONAR DÍAS — ' + label.toUpperCase() + '</div>'
        +     '<div style="color:#fff;font-weight:700;font-size:0.85rem;">' + ev.titulo + '</div>'
        +   '</div>'
        +   '<button onclick="document.getElementById(\'evt-dia-picker\').remove()" style="background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.5);padding:6px 10px;border-radius:8px;cursor:pointer;font-size:1rem;">✕</button>'
        + '</div>'
        // Barra de acceso rápido: Todos / Ninguno
        + '<div style="padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;flex-shrink:0;">'
        +   '<button onclick="_selAllDiasPicker(true)" style="flex:1;padding:8px;background:rgba(' + _hexToRgb(colorEv) + ',0.15);border:1px solid rgba(' + _hexToRgb(colorEv) + ',0.4);color:' + colorEv + ';border-radius:10px;cursor:pointer;font-weight:900;font-size:0.72rem;">✅ Toda la semana</button>'
        +   '<button onclick="_selAllDiasPicker(false)" style="flex:1;padding:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.72rem;">☐ Ninguno</button>'
        + '</div>'
        // Lista de días con checkboxes
        + '<div style="flex:1;overflow-y:auto;padding:14px 16px;">'
        +   checkboxesHtml
        + '</div>'
        // Botón de generar
        + '<div style="padding:14px 16px;border-top:1px solid rgba(255,255,255,0.07);flex-shrink:0;">'
        +   '<button onclick="_generarSeleccionPicker(' + eventoId + ',\'' + tipo + '\')" style="width:100%;padding:15px;background:linear-gradient(135deg,' + colorEv + ',rgba(' + _hexToRgb(colorEv) + ',0.7));border:none;color:#000;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.95rem;letter-spacing:0.5px;">'
        +     icono + ' GENERAR DÍAS SELECCIONADOS'
        +   '</button>'
        + '</div>'
        + '</div>';

    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });

    // Inicializar estado interno
    window._pickerDiasTotal = ev.dias.length;
    window._pickerChecked = new Array(ev.dias.length).fill(false);
};

// Toggle individual checkbox
window._toggleDiaPicker = function(idx, rgb) {
    window._pickerChecked[idx] = !window._pickerChecked[idx];
    var box = document.getElementById('chk-box-' + idx);
    var lbl = document.getElementById('lbl-dia-' + idx);
    if (box) {
        box.innerHTML = window._pickerChecked[idx] ? '✓' : '';
        box.style.background = window._pickerChecked[idx] ? 'rgba(' + rgb + ',0.35)' : 'transparent';
        box.style.borderColor = window._pickerChecked[idx] ? 'rgba(' + rgb + ',0.9)' : 'rgba(' + rgb + ',0.5)';
    }
    if (lbl) {
        lbl.style.background = window._pickerChecked[idx] ? 'rgba(' + rgb + ',0.18)' : 'rgba(' + rgb + ',0.07)';
        lbl.style.borderColor = window._pickerChecked[idx] ? 'rgba(' + rgb + ',0.8)' : 'rgba(' + rgb + ',0.25)';
    }
};

// Seleccionar / deseleccionar todos
window._selAllDiasPicker = function(val) {
    for (var i = 0; i < (window._pickerDiasTotal || 0); i++) {
        if (window._pickerChecked[i] !== val) _toggleDiaPicker(i, '116,185,255');
    }
};

// Generar con la selección actual
window._generarSeleccionPicker = function(eventoId, tipo) {
    var seleccionados = [];
    (window._pickerChecked || []).forEach(function(val, i) { if (val) seleccionados.push(i); });
    if (seleccionados.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Selecciona al menos un día');
        return;
    }
    document.getElementById('evt-dia-picker').remove();
    window._diaSelElegir = seleccionados;
    if (tipo === 'pdf') generarPDFEvento(eventoId, 'seleccion');
    else generarPlantillaEvento(eventoId, 'seleccion');
};


// Helper: hex to rgb string
function _hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `${r},${g},${b}`;
}

// ----------------------------------------------------------------
// SELECTOR DE DÍAS PARA WHATSAPP (con checkboxes)
// ----------------------------------------------------------------
window.elegirDiasWhatsApp = function(eventoId) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(function(e) { return e.id === eventoId; });
    if (!ev || !ev.dias || ev.dias.length === 0) return;

    // Si solo tiene 1 día, compartir directo
    if (ev.dias.length === 1) {
        compartirDiaEvento(eventoId, 0);
        return;
    }

    var colorEv = ev.color || '#25D366';

    var modal = document.getElementById('evt-wa-picker');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'evt-wa-picker';
    modal.style.cssText = 'position:fixed;inset:0;z-index:10005;background:rgba(0,0,0,0.88);display:flex;align-items:flex-end;justify-content:center;';

    var checkboxesHtml = ev.dias.map(function(dia, i) {
        var col = (typeof COLORES_DIA !== 'undefined') ? COLORES_DIA[dia.diaSemana] : { hex: '#25D366', rgb: '37,211,102', nombre: '' };
        var fechaCorta = (typeof _fechaCorta === 'function') ? _fechaCorta(dia.fecha) : dia.fecha;
        var tieneDatos = dia.datos && Object.keys(dia.datos).some(function(k){ return !!dia.datos[k]; });
        var tema = dia.datos && dia.datos.tema
            ? '<div style="color:rgba(255,255,255,0.45);font-size:0.62rem;margin-top:2px;">' + (tieneDatos ? '✅ ' : '') + dia.datos.tema + '</div>'
            : '<div style="color:rgba(255,255,255,0.25);font-size:0.58rem;margin-top:2px;">' + (tieneDatos ? '✅ Con datos' : '⬜ Sin datos') + '</div>';
        return '<label id="wa-lbl-dia-' + i + '" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(' + col.rgb + ',0.07);border:1.5px solid rgba(' + col.rgb + ',0.25);border-radius:12px;cursor:pointer;margin-bottom:7px;transition:background 0.2s;" onclick="_toggleWaPicker(' + i + ',\'' + col.rgb + '\')">' 
            + '<div id="wa-chk-' + i + '" style="width:22px;height:22px;border-radius:6px;border:2px solid rgba(' + col.rgb + ',0.5);background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;transition:all 0.15s;"></div>'
            + '<div style="flex:1;">'
            +   '<div style="color:' + col.hex + ';font-weight:900;font-size:0.8rem;">' + fechaCorta + ' — ' + (col.nombre || '') + '</div>'
            +   tema
            + '</div>'
            + '</label>';
    }).join('');

    modal.innerHTML = '<div style="background:linear-gradient(180deg,#0a1a10,#0a0818);border-radius:24px 24px 0 0;width:100%;max-width:500px;max-height:85vh;display:flex;flex-direction:column;border-top:2px solid #25D366;">'
        + '<div style="padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">'
        +   '<div>'
        +     '<div style="color:#25D366;font-size:0.65rem;font-weight:900;letter-spacing:1.5px;">📋 SELECCIONAR DÍAS — WHATSAPP</div>'
        +     '<div style="color:#fff;font-weight:700;font-size:0.85rem;">' + ev.emoji + ' ' + ev.titulo + '</div>'
        +   '</div>'
        +   '<button onclick="document.getElementById(\'evt-wa-picker\').remove()" style="background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.5);padding:6px 10px;border-radius:8px;cursor:pointer;font-size:1rem;">✕</button>'
        + '</div>'
        // Barra rápida: Todos / Ninguno
        + '<div style="padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;flex-shrink:0;">'
        +   '<button onclick="_selAllWaPicker(true)" style="flex:1;padding:8px;background:rgba(37,211,102,0.15);border:1px solid rgba(37,211,102,0.4);color:#25D366;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.72rem;">✅ Toda la semana</button>'
        +   '<button onclick="_selAllWaPicker(false)" style="flex:1;padding:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.72rem;">☐ Ninguno</button>'
        + '</div>'
        // Lista
        + '<div style="flex:1;overflow-y:auto;padding:14px 16px;">'
        +   checkboxesHtml
        + '</div>'
        // Botón generar
        + '<div style="padding:14px 16px;border-top:1px solid rgba(255,255,255,0.07);flex-shrink:0;">'
        +   '<button onclick="_enviarWaSeleccion(' + eventoId + ')" style="width:100%;padding:15px;background:linear-gradient(135deg,#25D366,#128C7E);border:none;color:#fff;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.95rem;letter-spacing:0.5px;">'
        +     '📤 ENVIAR DÍAS SELECCIONADOS POR WHATSAPP'
        +   '</button>'
        + '</div>'
        + '</div>';

    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });

    // Estado interno de checkboxes para WhatsApp
    window._waPickerTotal = ev.dias.length;
    window._waPickerChecked = new Array(ev.dias.length).fill(false);
};

// Toggle checkbox individual del picker de WhatsApp
window._toggleWaPicker = function(idx, rgb) {
    window._waPickerChecked[idx] = !window._waPickerChecked[idx];
    var box = document.getElementById('wa-chk-' + idx);
    var lbl = document.getElementById('wa-lbl-dia-' + idx);
    if (box) {
        box.innerHTML = window._waPickerChecked[idx] ? '✓' : '';
        box.style.background = window._waPickerChecked[idx] ? 'rgba(' + rgb + ',0.35)' : 'transparent';
        box.style.borderColor = window._waPickerChecked[idx] ? 'rgba(' + rgb + ',0.9)' : 'rgba(' + rgb + ',0.5)';
    }
    if (lbl) {
        lbl.style.background = window._waPickerChecked[idx] ? 'rgba(' + rgb + ',0.18)' : 'rgba(' + rgb + ',0.07)';
        lbl.style.borderColor = window._waPickerChecked[idx] ? 'rgba(' + rgb + ',0.8)' : 'rgba(' + rgb + ',0.25)';
    }
};

// Seleccionar / deseleccionar todos en el picker de WhatsApp
window._selAllWaPicker = function(val) {
    for (var i = 0; i < (window._waPickerTotal || 0); i++) {
        if (window._waPickerChecked[i] !== val) _toggleWaPicker(i, '37,211,102');
    }
};

// Generar texto de WhatsApp con los días seleccionados en el picker
window._enviarWaSeleccion = function(eventoId) {
    var seleccionados = [];
    (window._waPickerChecked || []).forEach(function(val, i) { if (val) seleccionados.push(i); });
    if (seleccionados.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Selecciona al menos un día');
        return;
    }
    document.getElementById('evt-wa-picker').remove();
    compartirDiasSeleccionados(eventoId, seleccionados);
};

// Generar y compartir el texto de WhatsApp con días específicos
window.compartirDiasSeleccionados = function(eventoId, indicesDias) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(function(e) { return e.id === eventoId; });
    if (!ev) return;

    const hoyCStr = new Date().toISOString().split('T')[0];
    const sep = '══════════════════════════';
    const lineas = [];

    // Días seleccionados ordenados
    const diasSel = indicesDias.map(function(i) { return ev.dias[i]; }).filter(Boolean);

    lineas.push(sep);
    lineas.push(ev.emoji + ' ' + ev.titulo.toUpperCase());
    lineas.push('⛪ Iglesia Adventista Cypress Hills');
    if (diasSel.length > 1) {
        lineas.push('📅 Del ' + diasSel[0].fecha.split('-').reverse().join('/') + ' al ' + diasSel[diasSel.length-1].fecha.split('-').reverse().join('/'));
    } else if (diasSel.length === 1) {
        lineas.push('📅 ' + (typeof _fechaLarga === 'function' ? _fechaLarga(diasSel[0].fecha) : diasSel[0].fecha));
    }
    lineas.push(sep);
    lineas.push('');

    diasSel.forEach(function(dia) {
        const esHoy = (dia.fecha === hoyCStr);
        const d = dia.datos || {};

        if (esHoy) {
            lineas.push('▶️ ' + (typeof _fechaLarga === 'function' ? _fechaLarga(dia.fecha).toUpperCase() : dia.fecha) + ' — HOY ◀️');
        } else {
            lineas.push('📌 ' + (typeof _fechaLarga === 'function' ? _fechaLarga(dia.fecha) : dia.fecha));
        }

        // ── Campos días de semana ──
        if (d.tema)                   lineas.push('   📋 Tema: ' + d.tema);
        if (d.orador)                 lineas.push('   🎤 Orador: ' + d.orador);
        if (d.presenta_orador)        lineas.push('      Presenta: ' + d.presenta_orador);
        if (d.orador_apertura)        lineas.push('   🙏 Bienvenida: ' + d.orador_apertura);
        if (d.infantil_anuncia || d.infantil) {
            var inf = [];
            if (d.infantil_anuncia) inf.push('Anuncia: ' + d.infantil_anuncia);
            if (d.infantil) inf.push('Conduce: ' + d.infantil);
            lineas.push('   👶 Rincón Infantil: ' + inf.join(' | '));
        }

        if (d.anuncia_himno_apertura) lineas.push('   📣 Anuncia himno: ' + d.anuncia_himno_apertura);
        if (d.himno_apertura)         lineas.push('   🎵 Himno apertura: #' + d.himno_apertura + (d.titulo_himno_apertura ? ' — ' + d.titulo_himno_apertura : ''));
        if (d.anuncia_lectura)        lineas.push('   📣 Anuncia lectura: ' + d.anuncia_lectura);
        if (d.cita_biblica)           lineas.push('   📖 Cita: ' + d.cita_biblica);
        if (d.texto_biblica)          lineas.push('      ' + d.texto_biblica);
        if (d.anuncia_especial)       lineas.push('   📣 Anuncia parte especial: ' + d.anuncia_especial);
        if (d.musica_especial)        lineas.push('   🎶 Parte especial: ' + d.musica_especial);
        if (d.presenta_himno_final)   lineas.push('   📣 Presenta himno final: ' + d.presenta_himno_final);
        if (d.himno_final)            lineas.push('   🎵 Himno final: #' + d.himno_final + (d.titulo_himno_final ? ' — ' + d.titulo_himno_final : ''));
        if (d.orador_oracion)         lineas.push('   🙏 Oración final: ' + d.orador_oracion);
        if (d.observaciones)          lineas.push('   📝 ' + d.observaciones);
        // ── Campos Sábado / Santa Cena (ev_*) ──
        if (d.anciano)               lineas.push('   👴 ' + (d.anciano_tipo||'Anciano') + ': ' + d.anciano);
        if (d.ev_diaconos || d.ev_diaconisas) {
            var diacs = [];
            if (d.ev_diaconos) diacs.push('Diáconos: ' + d.ev_diaconos);
            if (d.ev_diaconisas) diacs.push('Diaconisas: ' + d.ev_diaconisas);
            lineas.push('   🚪 Puerta y Orden: ' + diacs.join(' / '));
        }
        if (d.ev_llamado)            lineas.push('   📣 Llamado: ' + d.ev_llamado);
        if (d.ev_doxologia)          lineas.push('   🎵 Doxología: #' + d.ev_doxologia + (d.titulo_ev_doxologia ? ' — ' + d.titulo_ev_doxologia : ''));
        if (d.ev_invocacion)         lineas.push('   🙏 Invocación: ' + d.ev_invocacion);
        if (d.ev_bienvenida)         lineas.push('   🤝 Bienvenida: ' + d.ev_bienvenida);
        if (d.ev_ofrendas_anuncia || d.ev_ofrendas || d.ev_ofrendas_diaconisa) {
            var ofrS = [];
            if (d.ev_ofrendas_anuncia) ofrS.push('Anuncia: ' + d.ev_ofrendas_anuncia);
            var recs1 = [];
            if (d.ev_ofrendas) recs1.push(d.ev_ofrendas);
            if (d.ev_ofrendas_diaconisa) recs1.push(d.ev_ofrendas_diaconisa);
            if (recs1.length > 0) ofrS.push('Recogen: ' + recs1.join(' y '));
            lineas.push('   💰 Diezmos y Ofrendas: ' + ofrS.join(' | '));
        }
        if (d.ev_himno_adoracion)    lineas.push('   🎵 Himno adoración: #' + d.ev_himno_adoracion + (d.titulo_ev_himno_adoracion ? ' — ' + d.titulo_ev_himno_adoracion : ''));
        if (d.ev_oracion_intercesora) lineas.push('   🙏 Oración intercesora: ' + d.ev_oracion_intercesora);
        if (d.ev_pred_anuncia)       lineas.push('   📝 Presenta: ' + d.ev_pred_anuncia);
        if (d.ev_predicador)         lineas.push('   🎤 Predicador: ' + d.ev_predicador);
        if (d.ev_himno_final)        lineas.push('   🎵 Himno final: #' + d.ev_himno_final + (d.titulo_ev_himno_final ? ' — ' + d.titulo_ev_himno_final : ''));
        if (d.ev_oracion_final)      lineas.push('   🙏 Oración final: ' + d.ev_oracion_final);
        if (d.ev_sonido)             lineas.push('   🎛️ Sonido: ' + d.ev_sonido);
        // ─── Diáconos (1-6 con función) ───
        for (var _dn = 1; _dn <= 6; _dn++) {
            var _dNom = d['sc_diacono_'+_dn+'_nombre'];
            var _dFun = d['sc_diacono_'+_dn+'_funcion'];
            if (_dNom) lineas.push('   🍞 Diácono '+_dn+': '+_dNom+(_dFun ? ' — '+_dFun : ''));
        }
        // ─── Diaconizas (1-6 con función) ───
        for (var _dz = 1; _dz <= 6; _dz++) {
            var _dzNom = d['sc_diaconiza_'+_dz+'_nombre'];
            var _dzFun = d['sc_diaconiza_'+_dz+'_funcion'];
            if (_dzNom) lineas.push('   🌸 Diaconiza '+_dz+': '+_dzNom+(_dzFun ? ' — '+_dzFun : ''));
        }
        // ─── Ceremonia Santa Cena ───
        if (d.sc_lectura_pan)   lineas.push('   📖 Lectura por el Pan: ' + d.sc_lectura_pan);
        if (d.sc_oracion_pan)   lineas.push('   🙏 Oración por el Pan: ' + d.sc_oracion_pan);
        if (d.sc_lectura_vino)  lineas.push('   📖 Lectura por el Vino: ' + d.sc_lectura_vino);
        if (d.sc_oracion_vino)  lineas.push('   🙏 Oración por el Vino: ' + d.sc_oracion_vino);
        if (d.sc_predicador)    lineas.push('   🎤 Orador/Predicador SC: ' + d.sc_predicador);
        if (d.sc_ordenador)     lineas.push('   ✝️ Ordenador: ' + d.sc_ordenador);
        if (d.sc_oracion_final) lineas.push('   🙏 Oración final: ' + d.sc_oracion_final);

        lineas.push('');
    });

    lineas.push(sep);
    lineas.push('   📱 Legado Bíblico');
    lineas.push(sep);

    const texto = lineas.join('\n');
    if (navigator.share) {
        navigator.share({ text: texto }).catch(function(){});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto);
        if (typeof mostrarToast === 'function') mostrarToast('📋 ' + diasSel.length + ' día(s) copiados al portapapeles');
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
};

// ----------------------------------------------------------------
// COMPARTIR EL EVENTO COMPLETO (WhatsApp)
// ----------------------------------------------------------------
window.compartirEventoCompleto = function(id) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(e => e.id === id);
    if (!ev) return;

    const hoyCStr = new Date().toISOString().split('T')[0];
    const sep = '══════════════════════════';
    const lineas = [];

    lineas.push(sep);
    lineas.push(`${ev.emoji} ${ev.titulo.toUpperCase()}`);
    lineas.push(`⛪ Iglesia Adventista Cypress Hills`);
    if (ev.dias && ev.dias.length > 1) {
        lineas.push(`📅 Del ${ev.dias[0].fecha.split('-').reverse().join('/')} al ${ev.dias[ev.dias.length-1].fecha.split('-').reverse().join('/')}`);
    }
    lineas.push(sep);
    lineas.push('');

    (ev.dias || []).forEach(dia => {
        const esHoy = (dia.fecha === hoyCStr);
        const col = COLORES_DIA[dia.diaSemana];
        const d = dia.datos || {};

        if (esHoy) {
            lineas.push(`▶️ ${_fechaLarga(dia.fecha).toUpperCase()} — HOY ◀️`);
        } else {
            lineas.push(`📌 ${_fechaLarga(dia.fecha)}`);
        }

        // ── Campos días de semana ──
        if (d.tema)                  lineas.push(`   📋 Tema: ${d.tema}`);
        if (d.orador)                lineas.push(`   🎤 Orador: ${d.orador}`);
        if (d.presenta_orador)       lineas.push(`      Presenta: ${d.presenta_orador}`);
        if (d.orador_apertura)       lineas.push(`   🙏 Bienvenida: ${d.orador_apertura}`);
        if (d.infantil_anuncia || d.infantil) {
            var inf = [];
            if (d.infantil_anuncia) inf.push(`Anuncia: ${d.infantil_anuncia}`);
            if (d.infantil) inf.push(`Conduce: ${d.infantil}`);
            lineas.push(`   👶 Rincón Infantil: ${inf.join(' | ')}`);
        }

        if (d.anuncia_himno_apertura) lineas.push(`   📣 Anuncia himno: ${d.anuncia_himno_apertura}`);
        if (d.himno_apertura)        lineas.push(`   🎵 Himno apertura: #${d.himno_apertura}${d.titulo_himno_apertura ? ' — '+d.titulo_himno_apertura : ''}`);
        if (d.anuncia_lectura)       lineas.push(`   📣 Anuncia lectura: ${d.anuncia_lectura}`);
        if (d.cita_biblica)          lineas.push(`   📖 Cita: ${d.cita_biblica}`);
        if (d.texto_biblica)         lineas.push(`      ${d.texto_biblica}`);
        if (d.anuncia_especial)      lineas.push(`   📣 Anuncia parte especial: ${d.anuncia_especial}`);
        if (d.musica_especial)       lineas.push(`   🎶 Parte especial: ${d.musica_especial}`);
        if (d.presenta_himno_final)  lineas.push(`   📣 Presenta himno final: ${d.presenta_himno_final}`);
        if (d.himno_final)           lineas.push(`   🎵 Himno final: #${d.himno_final}${d.titulo_himno_final ? ' — '+d.titulo_himno_final : ''}`);
        if (d.orador_oracion)        lineas.push(`   🙏 Oración final: ${d.orador_oracion}`);
        if (d.observaciones)         lineas.push(`   📝 ${d.observaciones}`);
        // ── Campos Sábado / Santa Cena (ev_*) ──
        if (d.anciano)               lineas.push(`   👴 ${d.anciano_tipo||'Anciano'}: ${d.anciano}`);
        if (d.ev_diaconos || d.ev_diaconisas) {
            var diacs = [];
            if (d.ev_diaconos) diacs.push(`Diáconos: ${d.ev_diaconos}`);
            if (d.ev_diaconisas) diacs.push(`Diaconisas: ${d.ev_diaconisas}`);
            lineas.push(`   🚪 Puerta y Orden: ${diacs.join(' / ')}`);
        }
        if (d.ev_llamado)            lineas.push(`   📣 Llamado: ${d.ev_llamado}`);
        if (d.ev_doxologia)          lineas.push(`   🎵 Doxología: #${d.ev_doxologia}${d.titulo_ev_doxologia ? ' — '+d.titulo_ev_doxologia : ''}`);
        if (d.ev_invocacion)         lineas.push(`   🙏 Invocación: ${d.ev_invocacion}`);
        if (d.ev_bienvenida)         lineas.push(`   🤝 Bienvenida: ${d.ev_bienvenida}`);
        if (d.ev_ofrendas_anuncia || d.ev_ofrendas || d.ev_ofrendas_diaconisa) {
            var ofrS2 = [];
            if (d.ev_ofrendas_anuncia) ofrS2.push(`Anuncia: ${d.ev_ofrendas_anuncia}`);
            var recs2 = [];
            if (d.ev_ofrendas) recs2.push(d.ev_ofrendas);
            if (d.ev_ofrendas_diaconisa) recs2.push(d.ev_ofrendas_diaconisa);
            if (recs2.length > 0) ofrS2.push(`Recogen: ${recs2.join(' y ')}`);
            lineas.push(`   💰 Diezmos y Ofrendas: ${ofrS2.join(' | ')}`);
        }
        if (d.ev_himno_adoracion)    lineas.push(`   🎵 Himno adoración: #${d.ev_himno_adoracion}${d.titulo_ev_himno_adoracion ? ' — '+d.titulo_ev_himno_adoracion : ''}`);
        if (d.ev_oracion_intercesora) lineas.push(`   🙏 Oración intercesora: ${d.ev_oracion_intercesora}`);
        if (d.ev_pred_anuncia)       lineas.push(`   📝 Presenta: ${d.ev_pred_anuncia}`);
        if (d.ev_predicador)         lineas.push(`   🎤 Predicador: ${d.ev_predicador}`);
        if (d.ev_tema)               lineas.push(`   📋 Tema: ${d.ev_tema}`);
        if (d.ev_himno_final)        lineas.push(`   🎵 Himno final: #${d.ev_himno_final}${d.titulo_ev_himno_final ? ' — '+d.titulo_ev_himno_final : ''}`);
        if (d.ev_oracion_final)      lineas.push(`   🙏 Oración final: ${d.ev_oracion_final}`);
        if (d.ev_sonido)             lineas.push(`   🎛️ Sonido: ${d.ev_sonido}`);
        // --- Diaconos (1-6 con funcion) ---
        for (var _dn2 = 1; _dn2 <= 6; _dn2++) {
            var _dNom2 = d['sc_diacono_'+_dn2+'_nombre'];
            var _dFun2 = d['sc_diacono_'+_dn2+'_funcion'];
            if (_dNom2) lineas.push('   \ud83c\udf5e Di\u00e1cono '+_dn2+': '+_dNom2+(_dFun2 ? ' \u2014 '+_dFun2 : ''));
        }
        // --- Diaconizas (1-6 con funcion) ---
        for (var _dz2 = 1; _dz2 <= 6; _dz2++) {
            var _dzNom2 = d['sc_diaconiza_'+_dz2+'_nombre'];
            var _dzFun2 = d['sc_diaconiza_'+_dz2+'_funcion'];
            if (_dzNom2) lineas.push('   \ud83c\udf38 Diaconiza '+_dz2+': '+_dzNom2+(_dzFun2 ? ' \u2014 '+_dzFun2 : ''));
        }
        // --- Ceremonia Santa Cena ---
        if (d.sc_lectura_pan)   lineas.push('   \ud83d\udcd6 Lectura por el Pan: ' + d.sc_lectura_pan);
        if (d.sc_oracion_pan)   lineas.push('   \ud83d\ude4f Oraci\u00f3n por el Pan: ' + d.sc_oracion_pan);
        if (d.sc_lectura_vino)  lineas.push('   \ud83d\udcd6 Lectura por el Vino: ' + d.sc_lectura_vino);
        if (d.sc_oracion_vino)  lineas.push('   \ud83d\ude4f Oraci\u00f3n por el Vino: ' + d.sc_oracion_vino);
        if (d.sc_predicador)    lineas.push('   \ud83c\udfa4 Orador SC: ' + d.sc_predicador);
        if (d.sc_ordenador)     lineas.push('   \u271d\ufe0f Ordenador: ' + d.sc_ordenador);
        if (d.sc_oracion_final) lineas.push('   \ud83d\ude4f Oraci\u00f3n final: ' + d.sc_oracion_final);
        lineas.push('');
    });

    lineas.push(sep);
    lineas.push('   📱 Legado Bíblico');
    lineas.push(sep);

    const texto = lineas.join('\n');
    if (navigator.share) {
        navigator.share({ text: texto }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto);
        if (typeof mostrarToast === 'function') mostrarToast('📋 Evento copiado al portapapeles');
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
};

// ----------------------------------------------------------------
// ABRIR SELECTOR DE DÍA PARA COMPARTIR UN SOLO DÍA
// ----------------------------------------------------------------
window.abrirSelectorDia = function(id) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(e => e.id === id);
    if (!ev || !ev.dias || ev.dias.length === 0) return;

    const hoyCStr = new Date().toISOString().split('T')[0];

    // Crear modal
    let modal = document.getElementById('evt-selector-dia-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'evt-selector-dia-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.15s;';
    modal.innerHTML = `
    <div style="background:linear-gradient(180deg,#120e2a,#0a0818);border-radius:24px 24px 0 0;padding:24px 20px;width:100%;max-width:500px;border-top:1px solid rgba(116,185,255,0.3);">
      <div style="color:#74b9ff;font-weight:900;font-size:0.8rem;letter-spacing:1.5px;margin-bottom:5px;">📅 COMPARTIR UN DÍA</div>
      <div style="color:rgba(255,255,255,0.4);font-size:0.72rem;margin-bottom:16px;">${ev.emoji} ${ev.titulo}</div>
      <div style="display:grid;gap:8px;">
        ${ev.dias.map((dia, i) => {
            const col = COLORES_DIA[dia.diaSemana];
            const esHoy = (dia.fecha === hoyCStr);
            const d = dia.datos || {};
            return `
            <button onclick="compartirDiaEvento(${id},${i});document.getElementById('evt-selector-dia-modal').remove();"
              style="padding:12px 16px;background:rgba(${col.rgb},${esHoy?'0.2':'0.07'});border:${esHoy?'2px':'1px'} solid rgba(${col.rgb},${esHoy?'0.8':'0.3'});
                     color:#fff;border-radius:12px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;">
              <div style="min-width:42px;text-align:center;">
                <div style="color:${col.hex};font-weight:900;font-size:0.85rem;">${_fechaCorta(dia.fecha)}</div>
                ${esHoy ? '<div style="background:'+col.hex+';color:#000;font-size:0.45rem;font-weight:900;padding:1px 4px;border-radius:4px;margin-top:2px;">HOY</div>' : ''}
              </div>
              <div style="flex:1;min-width:0;">
                <div style="color:rgba(255,255,255,0.8);font-size:0.75rem;font-weight:700;">${d.tema || '(sin tema aún)'}</div>
                ${d.orador ? '<div style="color:rgba(255,255,255,0.4);font-size:0.62rem;">🎤 '+d.orador+'</div>' : ''}
              </div>
              <div style="color:rgba(255,255,255,0.3);font-size:1rem;">›</div>
            </button>`;
        }).join('')}
      </div>
      <button onclick="document.getElementById('evt-selector-dia-modal').remove()"
        style="width:100%;margin-top:16px;padding:13px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.5);border-radius:12px;cursor:pointer;font-weight:700;">
        Cancelar
      </button>
    </div>`;
    document.body.appendChild(modal);
};

// ----------------------------------------------------------------
// COMPARTIR UN SOLO DÍA DEL EVENTO
// ----------------------------------------------------------------
window.compartirDiaEvento = function(eventoId, diaIdx) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(e => e.id === eventoId);
    if (!ev || !ev.dias || !ev.dias[diaIdx]) return;

    const dia = ev.dias[diaIdx];
    const d   = dia.datos || {};
    const col = COLORES_DIA[dia.diaSemana];
    const sep = '══════════════════════════';
    const lineas = [];

    lineas.push(sep);
    lineas.push(`${ev.emoji} ${ev.titulo.toUpperCase()}`);
    lineas.push(`⛪ Iglesia Adventista Cypress Hills`);
    lineas.push(sep);
    lineas.push('');
    lineas.push(`📅 ${_fechaLarga(dia.fecha).toUpperCase()}`);
    lineas.push('');

    // ── Campos días de semana ──
    if (d.infantil_anuncia || d.infantil) {
        var ia = [];
        if (d.infantil_anuncia) ia.push(`Anuncia: ${d.infantil_anuncia}`);
        if (d.infantil) ia.push(`Conduce: ${d.infantil}`);
        lineas.push(`👶 Rincón Infantil: ${ia.join(' | ')}`);
    }

    if (d.tema)                  lineas.push(`📋 Tema: ${d.tema}`);
    if (d.orador)                lineas.push(`🎤 Orador: ${d.orador}`);
    if (d.presenta_orador)       lineas.push(`   Presenta: ${d.presenta_orador}`);
    if (d.orador_apertura)       lineas.push(`🙏 Bienvenida/Apertura: ${d.orador_apertura}`);
    if (d.anuncia_himno_apertura) lineas.push(`📣 Anuncia himno apertura: ${d.anuncia_himno_apertura}`);
    if (d.himno_apertura)        lineas.push(`🎵 Himno apertura: #${d.himno_apertura}${d.titulo_himno_apertura ? ' — '+d.titulo_himno_apertura : ''}`);
    if (d.anuncia_lectura)       lineas.push(`📣 Anuncia lectura bíblica: ${d.anuncia_lectura}`);
    if (d.cita_biblica)          lineas.push(`📖 Cita bíblica: ${d.cita_biblica}`);
    if (d.texto_biblica)         lineas.push(`   ${d.texto_biblica}`);
    if (d.anuncia_especial)      lineas.push(`📣 Anuncia parte especial: ${d.anuncia_especial}`);
    if (d.musica_especial)       lineas.push(`🎶 Música especial: ${d.musica_especial}`);
    if (d.presenta_himno_final)  lineas.push(`📣 Presenta himno final: ${d.presenta_himno_final}`);
    if (d.himno_final)           lineas.push(`🎵 Himno final: #${d.himno_final}${d.titulo_himno_final ? ' — '+d.titulo_himno_final : ''}`);
    if (d.orador_oracion)        lineas.push(`🙏 Oración final: ${d.orador_oracion}`);
    if (d.observaciones)         lineas.push(`📝 ${d.observaciones}`);
    // ── Campos Sábado / Santa Cena (ev_*) ──
    if (d.anciano)               lineas.push(`👴 ${d.anciano_tipo||'Anciano'}: ${d.anciano}`);
    if (d.ev_diaconos || d.ev_diaconisas) {
        var darr = [];
        if (d.ev_diaconos) darr.push(`Diáconos: ${d.ev_diaconos}`);
        if (d.ev_diaconisas) darr.push(`Diaconisas: ${d.ev_diaconisas}`);
        lineas.push(`🚪 Puerta y Orden: ${darr.join(' / ')}`);
    }
    if (d.ev_llamado)            lineas.push(`📣 Llamado: ${d.ev_llamado}`);
    if (d.ev_doxologia)          lineas.push(`🎵 Doxología: #${d.ev_doxologia}${d.titulo_ev_doxologia ? ' — '+d.titulo_ev_doxologia : ''}`);
    if (d.ev_invocacion)         lineas.push(`🙏 Invocación: ${d.ev_invocacion}`);
    if (d.ev_bienvenida)         lineas.push(`🤝 Bienvenida: ${d.ev_bienvenida}`);
    if (d.ev_ofrendas_anuncia || d.ev_ofrendas || d.ev_ofrendas_diaconisa) {
        var ofrS3 = [];
        if (d.ev_ofrendas_anuncia) ofrS3.push(`Anuncia: ${d.ev_ofrendas_anuncia}`);
        var recs3 = [];
        if (d.ev_ofrendas) recs3.push(d.ev_ofrendas);
        if (d.ev_ofrendas_diaconisa) recs3.push(d.ev_ofrendas_diaconisa);
        if (recs3.length > 0) ofrS3.push(`Recogen: ${recs3.join(' y ')}`);
        lineas.push(`💰 Diezmos y Ofrendas: ${ofrS3.join(' | ')}`);
    }
    if (d.ev_himno_adoracion)    lineas.push(`🎵 Himno adoración: #${d.ev_himno_adoracion}${d.titulo_ev_himno_adoracion ? ' — '+d.titulo_ev_himno_adoracion : ''}`);
    if (d.ev_oracion_intercesora) lineas.push(`🙏 Oración intercesora: ${d.ev_oracion_intercesora}`);
    if (d.ev_pred_anuncia)       lineas.push(`📝 Presenta: ${d.ev_pred_anuncia}`);
    if (d.ev_predicador)         lineas.push(`🎤 Predicador: ${d.ev_predicador}`);
    if (d.ev_himno_final)        lineas.push(`🎵 Himno final: #${d.ev_himno_final}${d.titulo_ev_himno_final ? ' — '+d.titulo_ev_himno_final : ''}`);
    if (d.ev_oracion_final)      lineas.push(`🙏 Oración final: ${d.ev_oracion_final}`);
    if (d.ev_sonido)             lineas.push(`🎛️ Sonido: ${d.ev_sonido}`);
    if (d.sc_diacono_1_nombre)   lineas.push(`🍞 Diácono 1: ${d.sc_diacono_1_nombre}${d.sc_diacono_1_funcion ? ' ('+d.sc_diacono_1_funcion+')' : ''}`);
    if (d.sc_diacono_2_nombre)   lineas.push(`🍷 Diácono 2: ${d.sc_diacono_2_nombre}${d.sc_diacono_2_funcion ? ' ('+d.sc_diacono_2_funcion+')' : ''}`);
    if (d.sc_ordenador)          lineas.push(`✝️ Ordenador: ${d.sc_ordenador}`);
    if (d.sc_oracion_final)      lineas.push(`🙏 Oración final: ${d.sc_oracion_final}`);

    lineas.push('');
    lineas.push(sep);
    lineas.push('   📱 Legado Bíblico');
    lineas.push(sep);

    const texto = lineas.join('\n');
    if (navigator.share) {
        navigator.share({ text: texto }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto);
        if (typeof mostrarToast === 'function') mostrarToast('📋 Programa del día copiado');
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
};

// ----------------------------------------------------------------
// EDITAR EVENTO
// ----------------------------------------------------------------
window.editarEvento = function(id) {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const ev = eventos.find(e => e.id === id);
    if (!ev) { if (typeof mostrarToast === 'function') mostrarToast('❌ Evento no encontrado'); return; }

    // Guardar referencia del evento a editar
    window._eventoEditandoId = id;
    window._autoGuardadoId   = null;

    // PASO 1: Activar la pestaña EVENTOS (para que el DOM de eventos exista)
    if (typeof cambiarTabCulto === 'function') cambiarTabCulto('eventos');

    // PASO 2: Cambiar a sub-pestaña NUEVO EVENTO (después de que el DOM esté listo)
    setTimeout(() => {
        if (typeof cambiarSubTabEvento === 'function') cambiarSubTabEvento('nuevo');

        // PASO 3: Rellenar cabecera del formulario
        const elTipo   = document.getElementById('evt-tipo');
        const elTitulo = document.getElementById('evt-titulo');
        const elFecha  = document.getElementById('evt-fecha-inicio');

        if (elTipo)   elTipo.value   = ev.tipo;
        if (elTitulo) elTitulo.value = ev.titulo;
        if (elFecha)  elFecha.value  = ev.fechaInicio;

        // PASO 4: Activar lógica del tipo y generar tabs
        if (typeof actualizarTituloEvento === 'function') actualizarTituloEvento();
        const dur = ev.duracion || 1;
        if (typeof seleccionarDuracion === 'function') seleccionarDuracion(dur);

        // PASO 5: Restaurar datos de días (esperar tabs generados)
        setTimeout(() => {
            const esSC = ev.tipo === 'santa_cena'
                || (ev.titulo && ev.titulo.toLowerCase().includes('santa cena'));

            if (esSC) {
                const diaSab = (ev.dias || []).find(d => d.diaSemana === 6) || (ev.dias && ev.dias[0]);
                if (window._diasEvento && window._diasEvento[0] && diaSab) {
                    window._diasEvento[0].datos    = diaSab.datos || {};
                    window._diasEvento[0].fecha     = diaSab.fecha;
                    window._diasEvento[0].diaSemana = diaSab.diaSemana;
                }
            } else if (window._diasEvento && ev.dias) {
                ev.dias.forEach((dia, i) => {
                    if (window._diasEvento[i]) window._diasEvento[i].datos = dia.datos || {};
                });
            }

            // PASO 6: Renderizar formulario SIN autoguardado previo
            window._eventoEditorDiaActivo = 0;
            if (typeof _renderFormDia === 'function') _renderFormDia(0);

            // Botón modo edición
            const btn = document.getElementById('btn-guardar-evento');
            if (btn) {
                btn.innerHTML = '✏️ ACTUALIZAR EVENTO';
                btn.style.background = 'linear-gradient(135deg,#e17055,#fdcb6e)';
            }
            if (typeof mostrarToast === 'function') mostrarToast('✏️ Editando: ' + ev.titulo);
        }, 250);
    }, 100);
};




// ----------------------------------------------------------------
// CONFIRMACIÓN PERSONALIZADA (sin confirm() nativo — funciona en PWA)
// ----------------------------------------------------------------
window._confirmarAccion = function(mensaje, onSi) {
    var modal = document.getElementById('_modal-confirm-evt');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = '_modal-confirm-evt';
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML = '<div style="background:#1a1a2e;border:2px solid rgba(255,100,100,0.5);border-radius:18px;padding:24px;max-width:340px;width:100%;text-align:center;">'
        + '<div style="font-size:2.5rem;margin-bottom:12px;">⚠️</div>'
        + '<div style="color:#fff;font-size:0.85rem;font-weight:600;margin-bottom:20px;line-height:1.5;">' + mensaje + '</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">'
        + '<button id="_conf-no" style="padding:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.7);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.82rem;">Cancelar</button>'
        + '<button id="_conf-si" style="padding:12px;background:rgba(255,100,100,0.25);border:2px solid rgba(255,100,100,0.7);color:#ff6b6b;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.82rem;">Sí, borrar</button>'
        + '</div></div>';
    document.body.appendChild(modal);
    document.getElementById('_conf-no').onclick = function() { modal.remove(); };
    document.getElementById('_conf-si').onclick = function() { modal.remove(); onSi(); };
};

// ----------------------------------------------------------------
// BORRAR EVENTO
// ----------------------------------------------------------------
window.borrarEvento = function(id) {
    _confirmarAccion('¿Eliminar este evento?<br><small style="color:rgba(255,255,255,0.5)">Esta acción no se puede deshacer.</small>', function() {
        var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
        eventos = eventos.filter(function(e) { return e.id !== id; });
        localStorage.setItem('legado_eventos', JSON.stringify(eventos));
        cargarHistorialEventos();
        if (typeof mostrarToast === 'function') mostrarToast('🗑️ Evento eliminado');
    });
};

// ----------------------------------------------------------------
// BORRAR EVENTOS VACÍOS (sin ningún dato llenado)
// ----------------------------------------------------------------
window._borrarEventosVacios = function() {
    var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    // REGLA ÚNICA: solo borrar si NINGÚN día tiene NINGÚN dato
    var vacios = eventos.filter(function(ev) {
        return !(ev.dias||[]).some(function(d) {
            return d.datos && Object.keys(d.datos).some(function(k) { return !!d.datos[k]; });
        });
    });
    if (vacios.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('✅ No hay eventos sin datos');
        return;
    }
    var lista = vacios.map(function(e) { return '• ' + e.titulo; }).join('<br>');
    _confirmarAccion('Se borrarán <b>' + vacios.length + '</b> evento(s) sin datos:<br><br>'
        + '<span style="color:rgba(255,255,255,0.55);font-size:0.75rem;">' + lista + '</span>'
        + '<br><br><span style="color:#2ed573;font-size:0.7rem;">✅ Los que tienen datos se conservan</span>', function() {
        var restantes = eventos.filter(function(ev) {
            return !vacios.some(function(v) { return v.id === ev.id; });
        });
        localStorage.setItem('legado_eventos', JSON.stringify(restantes));
        cargarHistorialEventos();
        if (typeof mostrarToast === 'function') mostrarToast('🧹 ' + vacios.length + ' evento(s) vacíos eliminados');
    });
};

window._borrarTodosEventos = function() {
    var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    if (eventos.length === 0) { if (typeof mostrarToast === 'function') mostrarToast('No hay eventos'); return; }
    _confirmarAccion('¿Borrar <b>todos</b> los ' + eventos.length + ' eventos guardados?<br><small style="color:rgba(255,255,255,0.5)">Esta acción no se puede deshacer.</small>', function() {
        localStorage.removeItem('legado_eventos');
        cargarHistorialEventos();
        if (typeof mostrarToast === 'function') mostrarToast('🧹 Lista de eventos limpiada');
    });
};

// ================================================================
// PATCH: INYECTAR LA 4TA PESTAÑA EN renderControlCultosSemana
// Este bloque se ejecuta UNA SOLA VEZ tras cargar el módulo
// para parchear la función existente.
// ================================================================
(function _patchEventosTab() {
    const _originalRender = window.renderControlCultosSemana || renderControlCultosSemana;
    window.renderControlCultosSemana = function() {
        // Llamar al render original
        _originalRender();

        // Inyectar la 4ta pestaña después de que el DOM está listo
        setTimeout(function() {
            const tabsBar = document.getElementById('tabs-culto');
            if (!tabsBar) return;

            // Verificar que no fue ya inyectado
            if (document.getElementById('tab-btn-eventos')) return;

            // Añadir botón de pestaña
            const btnEvt = document.createElement('button');
            btnEvt.id = 'tab-btn-eventos';
            btnEvt.onclick = function() { cambiarTabCulto('eventos'); };
            btnEvt.style.cssText = 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';
            btnEvt.innerHTML = '🌟<br>Eventos';
            tabsBar.appendChild(btnEvt);

            // Añadir contenedor de la pestaña eventos
            const contentParent = document.getElementById('tab-content-cultos')?.parentNode;
            if (contentParent) {
                const divEvt = document.createElement('div');
                divEvt.id = 'tab-content-eventos';
                divEvt.style.display = 'none';
                divEvt.innerHTML = renderTabEventos();
                contentParent.appendChild(divEvt);
            }

            // Extender cambiarTabCulto para incluir 'eventos'
            const _origCambiarTab = window.cambiarTabCulto;
            window.cambiarTabCulto = function(tab) {
                // Tabs originales
                ['form','buscar','cultos','eventos'].forEach(function(t) {
                    const content = document.getElementById('tab-content-' + t);
                    const btn = document.getElementById('tab-btn-' + t);
                    if (!content || !btn) return;
                    const activo = (t === tab);
                    content.style.display = activo ? 'block' : 'none';
                    btn.style.cssText = activo
                        ? (t === 'eventos'
                            ? 'flex:1;padding:11px 4px;background:rgba(116,185,255,0.2);border:1.5px solid #74b9ff;color:#74b9ff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;letter-spacing:0.5px;'
                            : 'flex:1;padding:11px 4px;background:rgba(255,107,107,0.2);border:1.5px solid #ff6b6b;color:#ff6b6b;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;letter-spacing:0.5px;')
                        : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';
                });
                // Acciones especiales por tab
                if (tab === 'cultos') { if(typeof cargarCultosSemana === 'function') cargarCultosSemana(); }
                if (tab === 'buscar') { if(typeof actualizarListaParticipantes === 'function') actualizarListaParticipantes(); }
                if (tab === 'eventos') {
                    // Al entrar: generar días si hay fecha seleccionada
                    const fEl = document.getElementById('evt-fecha-inicio');
                    if (fEl && fEl.value && !window._diasEvento) {
                        seleccionarDuracion(window._duracionEvento || 7);
                    }
                    // SIEMPRE cargar el historial para que esté listo
                    setTimeout(function() {
                        cargarHistorialEventos();
                        // Si hay eventos guardados, ir directo al historial
                        const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
                        if (eventos.length > 0 && !window._eventoEditandoId) {
                            cambiarSubTabEvento('lista');
                        }
                    }, 100);
                }
            };

        }, 50);
    };
})();

// ================================================================
// 💾 EXPORTAR EVENTOS COMO JSON DE EMERGENCIA
// ================================================================
window.exportarEventosBackup = function() {
    const eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    if (eventos.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay eventos para exportar');
        return;
    }
    const blob = new Blob([JSON.stringify(eventos, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'eventos_backup_' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    if (typeof mostrarToast === 'function') mostrarToast('💾 ' + eventos.length + ' eventos exportados');
};

// ----------------------------------------------------------------
// BLINDAJE INMORTAL - SEMANA DE MAYORDOMÍA (INYECTOR)
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// (MAYO INMORTAL 2) - Inyector Seguro y Sincrono
// ----------------------------------------------------------------
(function() {
    try {
        let evBs = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
        // Buscar cualquier evento de mayordomía en Marzo 2026 para inyectarlo ahí, no importa qué nombre le hayan puesto
        let idxMayo = evBs.findIndex(e => e.titulo && e.titulo.toUpperCase().includes('MAYORDOM') && e.fechaInicio && e.fechaInicio.startsWith('2026-03'));
        // Si no lo encuentra por fecha inicio, buscar solo por título si no hay más
        if (idxMayo === -1) idxMayo = evBs.findIndex(e => e.titulo && e.titulo.toUpperCase().includes('MAYORDOMÍA 2026'));
        if (idxMayo === -1) idxMayo = evBs.findIndex(e => e.titulo && e.titulo.toUpperCase().includes('PERSPECTIVA DIVINA'));
        
        let dom15 = {
            fecha: '2026-03-15', diaSemana: 0,
            datos: {
                anuncia_himno_apertura: 'Patricio Tejada', himno_apertura: '236', titulo_himno_apertura: 'A Jesús entrégatelo todo',
                anuncia_lectura: 'Flavio Candelario', cita_biblica: '2 Reyes 4: 8-11', orador: 'Pr. Rafael Solano',
                presenta_orador: 'Obed Lopez', tema: 'El Mayordomo siervo', presenta_himno_final: 'Jose Castillo',
                himno_final: '236', titulo_himno_final: 'A Jesús entrégatelo todo', orador_oracion: 'Pr. Solano',
                observaciones: 'Entrar antes de la 7:30 al zoom'
            }
        };

        let lun16 = {
            fecha: '2026-03-16', diaSemana: 1,
            datos: {
                orador_apertura: 'Jose Lopez', comunica_apertura: false, anuncia_himno_apertura: 'Luz Lopez',
                himno_apertura: '236', titulo_himno_apertura: 'A Jesús entrégatelo todo', anuncia_lectura: 'Yulyma Maza',
                cita_biblica: 'Galatas 4:1-2', orador: 'PR. RAAFAEL SOLANO', presenta_orador: 'Jose Lopez',
                tema: 'El Mayordomo siervo hasta el tiempo señalado', himno_final: '236', titulo_himno_final: 'A Jesús entrégatelo todo',
                orador_oracion: 'Pr. Rafael Solano'
            }
        };

        let mar17 = {
            fecha: '2026-03-17', diaSemana: 2,
            datos: {
                orador_apertura: 'Jose Luis Candelario', anuncia_himno_apertura: 'Engel Candelario',
                himno_apertura: '236', titulo_himno_apertura: 'A Jesús entrégatelo todo', anuncia_lectura: 'Wanda Nuñez',
                cita_biblica: 'Colosenses 3:1-4', orador: 'PR. RAAFAEL SOLANO', presenta_orador: 'Jose Castillo',
                tema: 'El Mayordomo siervo', presenta_himno_final: 'Engel Candelario', himno_final: '236',
                titulo_himno_final: 'A Jesús entrégatelo todo', orador_oracion: 'Pr. Rafael Solano'
            }
        };

        let mier18 = {
            fecha: '2026-03-18', diaSemana: 3,
            datos: {
                orador_apertura: 'Jose Lopez (Bien.) / Luz Lopez (Oración)', 
                anuncia_himno_apertura: 'Luz Lopez',
                himno_apertura: '236', titulo_himno_apertura: 'A Jesús entrégatelo todo', 
                anuncia_lectura: 'Yulima Maza', cita_biblica: 'San Mateo 6:19', 
                orador: 'Pr. Rafael Solano', presenta_orador: 'Jose Lopez',
                tema: 'Donde está tu tesoro ahí está tu corazón', 
                himno_final: '236', titulo_himno_final: 'A Jesús entrégatelo todo',
                orador_oracion: 'Pr. Rafael Solano'
            }
        };

        let jue19 = {
            fecha: '2026-03-19', diaSemana: 4,
            datos: {
                orador_apertura: 'Ernesto Valencia (Bienv. y Oración)',
                anuncia_himno_apertura: 'Fiordaliza Gutierrez',
                himno_apertura: '236', titulo_himno_apertura: 'A Jesús entrégatelo todo',
                anuncia_lectura: 'Ernesto Valencia', cita_biblica: 'Santiago 4:17',
                orador: 'Pr. Rafael Solano', presenta_orador: 'Jose Castillo',
                tema: 'Vive lo que profesas', 
                presenta_himno_final: 'Fiordaliza Gutierrez',
                himno_final: '236', titulo_himno_final: 'A Jesús entrégatelo todo',
                orador_oracion: 'Pr. Rafael Solano'
            }
        };

        let vie20 = {
            fecha: '2026-03-20', diaSemana: 5,
            datos: {
                orador_apertura: 'Karina A. (Bienv.) / Juan A. (Oración)',
                anuncia_himno_apertura: 'Albhert Antigua',
                himno_apertura: '236', titulo_himno_apertura: 'A Jesús entrégatelo todo',
                anuncia_lectura: 'Briamna Antigua',
                orador: 'Pr. Rafael Solano', presenta_orador: 'Karina Antigua',
                tema: 'Dios es el dueño y quiere mayordomos fieles', 
                presenta_himno_final: 'Albhert Antigua',
                himno_final: '236', titulo_himno_final: 'A Jesús entrégatelo todo',
                orador_oracion: 'Pr. Rafael Solano'
            }
        };

        let nuevosDias = [
            dom15, lun16, mar17, mier18, jue19, vie20,
            { fecha: '2026-03-21', diaSemana: 6, datos: {} }
        ];

        let forcedId = 1774000000000;

        if (idxMayo === -1) {
            evBs.push({
                id: forcedId,
                tipo: 'semana_mayordomia',
                titulo: 'MAYORDOMÍA DESDE LA PERSPECTIVA DIVINA',
                color: '#fdcb6e', // Faltaba el COLOR lo que causaba el fallo fatal
                emoji: '🙏👪⌚💰', fechaInicio: '2026-03-15', duracion: 7,
                dias: JSON.parse(JSON.stringify(nuevosDias)) // Deep copy
            });
            localStorage.setItem('legado_eventos', JSON.stringify(evBs));
        } else {
            let viejo = evBs[idxMayo];
            let changed = false;
            
            if (viejo.id !== forcedId) { viejo.id = forcedId; changed = true; }
            if (viejo.fechaInicio !== '2026-03-15') { viejo.fechaInicio = '2026-03-15'; changed = true; }
            if (viejo.duracion !== 7) { viejo.duracion = 7; changed = true; }
            if (!viejo.color) { viejo.color = '#fdcb6e'; changed = true; }

            // Clone to avoid reference issues
            let finalDias = JSON.parse(JSON.stringify(nuevosDias));

            (viejo.dias || []).forEach(vd => {
                let fvd = vd.fecha.split('T')[0]; // Normalize
                let targetIdx = finalDias.findIndex(nd => nd.fecha === fvd);
                if (targetIdx !== -1 && targetIdx >= 6 && vd.datos) { 
                    finalDias[targetIdx].datos = Object.assign({}, finalDias[targetIdx].datos, vd.datos);
                }
            });

            let hashNuevos = JSON.stringify(finalDias);
            let hashViejos = JSON.stringify(viejo.dias);
            if (hashNuevos !== hashViejos) {
                viejo.dias = finalDias;
                changed = true;
            }

            if (changed) {
                localStorage.setItem('legado_eventos', JSON.stringify(evBs));
            }
        }
    } catch(e) { }
})();
