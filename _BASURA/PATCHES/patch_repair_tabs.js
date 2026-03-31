const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// Normalizar a LF para trabajar
code = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// El problema: se duplico cambiarTabCulto y quedo mal estructurado
// Buscar el bloque roto y reemplazar todo desde volverSelectorCulto hasta el final de renderControlCultosSemana

const BLOQUE_ROTO_START = '    window.volverSelectorCulto = function() {';
const BLOQUE_ROTO_END = '}\n\nwindow.autocompleteHimno';

const BLOQUE_CORRECTO = `    window.volverSelectorCulto = function() {
        const selector = document.getElementById('selector-tipo-culto');
        const wrapperSab = document.getElementById('formulario-sabado-wrapper');
        if (selector) selector.style.display = 'block';
        if (wrapperSab) wrapperSab.style.display = 'none';
    };

    window.cambiarTabCulto = function(tab) {
        ['form','buscar','cultos','eventos'].forEach(function(t) {
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
        if (tab === 'form') {
            var s = document.getElementById('selector-tipo-culto');
            var w = document.getElementById('formulario-sabado-wrapper');
            if (s) s.style.display = 'block';
            if (w) w.style.display = 'none';
        }
        if (tab === 'buscar') { if(typeof actualizarListaParticipantes === 'function') actualizarListaParticipantes(); }
        if (tab === 'eventos') {
            var cont = document.getElementById('eventos-modulo-contenedor');
            if (cont && typeof renderTabEventos === 'function') {
                cont.innerHTML = renderTabEventos();
                var fEl = document.getElementById('evt-fecha-inicio');
                if (fEl && fEl.value && typeof seleccionarDuracion === 'function') {
                    seleccionarDuracion(window._duracionEvento || 7);
                }
            }
        }
    };

    autoDetectarTipoCulto(hoyStr);
    cargarCultosSemana();
    // Mostrar selector de tipo de culto al inicio
    var selInicio = document.getElementById('selector-tipo-culto');
    var wrpInicio = document.getElementById('formulario-sabado-wrapper');
    if (selInicio) selInicio.style.display = 'block';
    if (wrpInicio) wrpInicio.style.display = 'none';
    // Sincronizar con Firebase al abrir el módulo
    setTimeout(function() {
        if (typeof sincronizarCultosDesdeFirebase === 'function') {
            sincronizarCultosDesdeFirebase();
        }
    }, 2000);
}

window.autocompleteHimno`;

const idxStart = code.indexOf(BLOQUE_ROTO_START);
const idxEnd = code.indexOf(BLOQUE_ROTO_END);

if (idxStart > 0 && idxEnd > 0) {
    code = code.slice(0, idxStart) + BLOQUE_CORRECTO + code.slice(idxEnd + BLOQUE_ROTO_END.length);
    // Restaurar CRLF
    code = code.replace(/\n/g, '\r\n');
    fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
    console.log('[OK] Bloque roto reparado. idxStart:', idxStart, 'idxEnd:', idxEnd);
} else {
    console.log('[FAIL] idxStart:', idxStart, 'idxEnd:', idxEnd);
    // Diagnostico
    const i1 = code.indexOf('volverSelectorCulto');
    const i2 = code.indexOf('autocompleteHimno');
    console.log('volverSelectorCulto en:', i1, ' autocompleteHimno en:', i2);
}
