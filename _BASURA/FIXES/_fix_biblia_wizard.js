// Rediseñar la seccion de busqueda del lector de Biblia
// Flujo: tipo letra → sugerencias → selecciona libro → OK grande → capitulo/versiculo → LEER
const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_motor.js';
let c = fs.readFileSync(FILE, 'utf8');

// =====================================================
// 1. Reemplazar renderSelectorLibrosPrincipal con nueva version
// =====================================================

const NEW_FN = `function renderSelectorLibrosPrincipal(containerId) {
    containerId = containerId || 'bible-home-selector';
    var area = document.getElementById(containerId);
    if (!area) return;

    // Ultimo libro leido
    var ultimaVisita = localStorage.getItem('legado_ultima_visita');
    var ultimaBtn = '';
    if (ultimaVisita) {
        try {
            var u = JSON.parse(ultimaVisita);
            ultimaBtn = '<button onclick="abrirLibroPrincipal(\\'' + u.libro + '\\',' + u.cap + ',null)" ' +
                'style="width:100%;padding:14px 18px;background:linear-gradient(135deg,rgba(85,239,196,0.15),rgba(85,239,196,0.05));' +
                'border:1.5px solid rgba(85,239,196,0.4);border-radius:16px;color:#fff;cursor:pointer;' +
                'display:flex;align-items:center;gap:14px;margin-bottom:14px;text-align:left">' +
                '<span style="font-size:1.8rem">\\uD83D\\uDCD6</span>' +
                '<div style="flex:1"><div style="font-size:0.6rem;color:#55efc4;font-weight:900;letter-spacing:2px">SEGUIR LEYENDO</div>' +
                '<div style="font-size:1.05rem;font-weight:900;color:#fff;margin-top:3px">' + u.libro + ' ' + u.cap + '</div></div>' +
                '<span style="color:#55efc4;font-size:1.8rem;font-weight:300">&#8250;</span></button>';
        } catch(e) {}
    }

    // HTML principal
    var html = '<div>';

    // Header
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">';
    html += '<button onclick="if(typeof cerrarBibliaOverlay===\\'function\\'){cerrarBibliaOverlay()}else{mostrarBibleCompacto(\\'' + containerId + '\\')}" ';
    html += 'style="padding:10px 14px;background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.15);color:#fff;border-radius:12px;cursor:pointer;font-size:1rem">';
    html += '&#8592;</button>';
    html += '<div style="flex:1;text-align:center">';
    html += '<div style="font-size:0.7rem;color:#55efc4;font-weight:900;letter-spacing:2px">LEGADO B&Iacute;BLICO</div>';
    html += '<div style="font-size:0.65rem;color:rgba(255,255,255,0.45)">Reina Valera 1960</div>';
    html += '</div>';
    html += '<div style="display:flex;align-items:center;gap:3px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.2);border-radius:20px;padding:4px 8px">';
    html += '<button onclick="ajustarFuenteLibros(-0.1)" style="background:none;border:none;color:#55efc4;padding:2px 4px;font-weight:900;font-size:0.85rem;cursor:pointer">A-</button>';
    html += '<span id="lf-size-ind" style="color:#fff;font-size:0.65rem;font-weight:700;min-width:26px;text-align:center">' + Math.round(_libFontSize * 100) + '%</span>';
    html += '<button onclick="ajustarFuenteLibros(0.1)" style="background:none;border:none;color:#55efc4;padding:2px 4px;font-weight:900;font-size:0.95rem;cursor:pointer">A+</button>';
    html += '</div></div>';

    // Seguir leyendo
    html += ultimaBtn;

    // =========================================
    // BUSCADOR RAPIDO — nuevo flujo 3 pasos
    // =========================================
    html += '<div id="biblia-wizard" style="background:rgba(253,203,110,0.07);border:1.5px solid rgba(253,203,110,0.3);border-radius:18px;padding:16px;margin-bottom:14px">';

    // PASO 1: Campo de texto
    html += '<div id="wizard-paso1">';
    html += '<div style="font-size:1rem;color:#fdcb6e;font-weight:900;letter-spacing:1px;margin-bottom:12px">&#9889; BUSCA TU LIBRO</div>';
    html += '<input id="wizard-input-libro" type="text" placeholder="Escribe el nombre... ej: Juan, Salmos, Gen..." ';
    html += 'oninput="wizardBuscarLibro(this.value)" ';
    html += 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ';
    html += 'style="width:100%;padding:16px;background:rgba(0,0,0,0.5);border:2px solid rgba(253,203,110,0.5);';
    html += 'color:#fff;border-radius:14px;font-size:1.15rem;font-weight:700;outline:none;box-sizing:border-box;letter-spacing:0.5px">';
    html += '<div id="wizard-sugerencias" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px"></div>';
    html += '</div>';

    // PASO 2: Confirmacion del libro + capitulo/versiculo (oculto al inicio)
    html += '<div id="wizard-paso2" style="display:none">';
    html += '<div id="wizard-libro-seleccionado" style="font-size:1.3rem;color:#55efc4;font-weight:900;text-align:center;margin-bottom:16px;padding:12px;background:rgba(85,239,196,0.1);border-radius:12px;border:1px solid rgba(85,239,196,0.3)"></div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">';
    html += '<div>';
    html += '<div style="font-size:0.65rem;color:rgba(255,255,255,0.5);font-weight:900;letter-spacing:1.5px;margin-bottom:6px">CAP&Iacute;TULO</div>';
    html += '<input id="wizard-cap" type="number" min="1" placeholder="Ej: 3" ';
    html += 'style="width:100%;padding:14px;background:rgba(0,0,0,0.5);border:2px solid rgba(253,203,110,0.4);';
    html += 'color:#fff;border-radius:12px;font-size:1.4rem;font-weight:900;outline:none;box-sizing:border-box;text-align:center" ';
    html += 'onkeydown="if(event.key===\\'Enter\\')document.getElementById(\\'wizard-vers\\').focus()">';
    html += '</div>';
    html += '<div>';
    html += '<div style="font-size:0.65rem;color:rgba(255,255,255,0.5);font-weight:900;letter-spacing:1.5px;margin-bottom:6px">VERS&Iacute;CULO (opcional)</div>';
    html += '<input id="wizard-vers" type="number" min="1" placeholder="Ej: 16" ';
    html += 'style="width:100%;padding:14px;background:rgba(0,0,0,0.5);border:2px solid rgba(162,155,254,0.4);';
    html += 'color:#fff;border-radius:12px;font-size:1.4rem;font-weight:900;outline:none;box-sizing:border-box;text-align:center" ';
    html += 'onkeydown="if(event.key===\\'Enter\\')wizardIrALeer()">';
    html += '</div>';
    html += '</div>';
    html += '<button onclick="wizardIrALeer()" ';
    html += 'style="width:100%;padding:20px;background:linear-gradient(135deg,#00b894,#55efc4);border:none;';
    html += 'color:#000;font-weight:900;font-size:1.3rem;border-radius:16px;cursor:pointer;';
    html += 'letter-spacing:1px;box-shadow:0 6px 25px rgba(85,239,196,0.4)">&#9989; LEER</button>';
    html += '<button onclick="wizardVolver()" ';
    html += 'style="width:100%;padding:10px;background:none;border:none;color:rgba(255,255,255,0.4);';
    html += 'font-size:0.75rem;cursor:pointer;margin-top:6px">&#8592; cambiar libro</button>';
    html += '</div>';

    html += '</div>'; // cierre biblia-wizard

    // Historial rapido
    html += '<div id="relampago-historial" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:14px;min-height:20px">';
    html += '<span style="color:rgba(255,255,255,0.2);font-size:0.6rem;font-style:italic">Citas recientes aparecer&aacute;n aqu&iacute;</span>';
    html += '</div>';

    // Tabs
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-bottom:8px">';
    html += '<button id="tab-genero" onclick="cambiarModoSelectorBiblia(\\'genero\\')" style="padding:10px 4px;border-radius:14px;border:2px solid #55efc4;background:rgba(85,239,196,0.18);color:#55efc4;font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#128218;</span>TODOS</button>';
    html += '<button id="tab-at" onclick="cambiarModoSelectorBiblia(\\'at\\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(85,239,196,0.3);background:rgba(85,239,196,0.05);color:rgba(85,239,196,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#128220;</span>AT</button>';
    html += '<button id="tab-nt" onclick="cambiarModoSelectorBiblia(\\'nt\\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(162,155,254,0.3);background:rgba(162,155,254,0.05);color:rgba(162,155,254,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#9997;&#65039;</span>NT</button>';
    html += '<button id="tab-buscar" onclick="cambiarModoSelectorBiblia(\\'buscar\\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(253,203,110,0.3);background:rgba(253,203,110,0.05);color:rgba(253,203,110,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#128269;</span>BUSCAR</button>';
    html += '</div>';
    html += '<div style="display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px">';
    html += '<button id="tab-favs" onclick="cambiarModoSelectorBiblia(\\'favs\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(253,203,110,0.3);background:rgba(253,203,110,0.05);color:rgba(253,203,110,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#11088; FAVS</button>';
    html += '<button id="tab-aliento" onclick="cambiarModoSelectorBiblia(\\'aliento\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(255,159,67,0.3);background:rgba(255,159,67,0.05);color:rgba(255,159,67,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#129309; ALIENTO</button>';
    html += '<button id="tab-historial" onclick="cambiarModoSelectorBiblia(\\'historial\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(116,185,255,0.3);background:rgba(116,185,255,0.05);color:rgba(116,185,255,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#128202; LE&Iacute;DOS</button>';
    html += '<button id="tab-notas" onclick="cambiarModoSelectorBiblia(\\'notas\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(254,202,87,0.3);background:rgba(254,202,87,0.05);color:rgba(254,202,87,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#128221; NOTAS</button>';
    html += '</div>';
    html += '<div id="libros-dinamicos-root"></div>';
    html += '</div>';

    area.innerHTML = html;

    setTimeout(function() {
        var inp = document.getElementById('wizard-input-libro');
        if (inp) { try { inp.focus(); } catch(e) {} }
        renderHistorialRelampago();
        cambiarModoSelectorBiblia(_modoSelectorBiblia);
    }, 150);
}

`;

// =====================================================
// 2. Agregar funciones del wizard al final del archivo
// =====================================================
const WIZARD_FNS = `
// =====================================================
// WIZARD BIBLIA — Flujo 3 pasos: Libro → Cap/Vers → Leer
// =====================================================

var _wizardLibroSeleccionado = null;

window.wizardBuscarLibro = function(texto) {
    var sug = document.getElementById('wizard-sugerencias');
    if (!sug) return;
    var t = texto.trim().toLowerCase()
        .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');

    if (!t || t.length < 1) {
        sug.innerHTML = '';
        sug.style.display = 'none';
        return;
    }

    var resultados = [];
    // Buscar por abreviaciones
    Object.entries(ABREVIACIONES_BIBLIA).forEach(function(par) {
        if (par[0].startsWith(t)) {
            if (resultados.indexOf(par[1]) < 0) resultados.push(par[1]);
        }
    });
    // Buscar por nombre del libro
    TODOS_LIBROS.forEach(function(l) {
        var norm = l.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
        if (norm.startsWith(t) || norm.includes(t)) {
            if (resultados.indexOf(l) < 0) resultados.push(l);
        }
    });

    resultados = resultados.slice(0, 8);

    if (resultados.length === 0) {
        sug.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:0.75rem;padding:8px;grid-column:1/-1">No encontrado. Intenta con m&aacute;s letras.</div>';
        sug.style.display = 'grid';
        return;
    }

    sug.innerHTML = resultados.map(function(l) {
        var esAT = LIBROS_AT.indexOf(l) >= 0;
        var color = esAT ? '#55efc4' : '#a29bfe';
        var caps = CONTEO_CAPITULOS[l] || 1;
        return '<button onclick="wizardSeleccionarLibro(\\'' + l + '\\')" ' +
            'style="padding:14px 10px;background:rgba(255,255,255,0.05);border:2px solid ' + color + '60;' +
            'color:' + color + ';border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;' +
            'display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.15s">' +
            l + '<span style="font-size:0.55rem;opacity:0.5;font-weight:400">' + caps + ' cap.</span></button>';
    }).join('');
    sug.style.display = 'grid';
};

window.wizardSeleccionarLibro = function(libro) {
    _wizardLibroSeleccionado = libro;
    // Ocultar paso 1, mostrar paso 2
    var p1 = document.getElementById('wizard-paso1');
    var p2 = document.getElementById('wizard-paso2');
    var lbl = document.getElementById('wizard-libro-seleccionado');
    if (p1) p1.style.display = 'none';
    if (p2) p2.style.display = 'block';
    if (lbl) {
        var esAT = LIBROS_AT.indexOf(libro) >= 0;
        var color = esAT ? '#55efc4' : '#a29bfe';
        lbl.innerHTML = '<span style="color:rgba(255,255,255,0.5);font-size:0.6rem;display:block;letter-spacing:2px;margin-bottom:4px">' +
            (esAT ? 'ANTIGUO TESTAMENTO' : 'NUEVO TESTAMENTO') + '</span>' +
            '<span style="color:' + color + '">' + libro + '</span>';
        lbl.style.borderColor = color + '50';
    }
    // Auto-foco en capitulo
    setTimeout(function() {
        var cap = document.getElementById('wizard-cap');
        if (cap) { try { cap.focus(); } catch(e) {} }
    }, 100);
};

window.wizardVolver = function() {
    _wizardLibroSeleccionado = null;
    var p1 = document.getElementById('wizard-paso1');
    var p2 = document.getElementById('wizard-paso2');
    if (p1) { p1.style.display = 'block'; }
    if (p2) { p2.style.display = 'none'; }
    var inp = document.getElementById('wizard-input-libro');
    if (inp) { inp.value = ''; try { inp.focus(); } catch(e) {} }
    var sug = document.getElementById('wizard-sugerencias');
    if (sug) { sug.innerHTML = ''; sug.style.display = 'none'; }
};

window.wizardIrALeer = function() {
    if (!_wizardLibroSeleccionado) return;
    var capEl = document.getElementById('wizard-cap');
    var versEl = document.getElementById('wizard-vers');
    var cap = capEl ? parseInt(capEl.value) || 1 : 1;
    var vers = versEl ? parseInt(versEl.value) || null : null;
    var maxCap = CONTEO_CAPITULOS[_wizardLibroSeleccionado] || 1;
    cap = Math.min(Math.max(cap, 1), maxCap);
    guardarCitaHistorial(_wizardLibroSeleccionado, cap, vers);
    renderHistorialRelampago();
    var overlay = document.getElementById('biblia-overlay');
    if (overlay) overlay.remove();
    mostrarToast('\\u25B6 ' + _wizardLibroSeleccionado + ' ' + cap + (vers ? ':' + vers : ''));
    abrirLibroPrincipal(_wizardLibroSeleccionado, cap, vers);
    _wizardLibroSeleccionado = null;
};

`;

// Encontrar y reemplazar la funcion rota
const START = 'function renderSelectorLibrosPrincipal';
const END_MARKER = 'function cambiarModoSelectorBiblia';

const idxStart = c.indexOf(START);
const idxEnd = c.indexOf(END_MARKER);

if (idxStart < 0 || idxEnd < 0) {
    console.log('ERROR: funciones no encontradas');
    process.exit(1);
}

const antes = c.substring(0, idxStart);
const despues = c.substring(idxEnd);
c = antes + NEW_FN + despues;

// Agregar wizard functions al final del archivo (antes del EOF)
// Verificar que no existan ya
if (c.indexOf('window.wizardBuscarLibro') < 0) {
    c = c + '\n' + WIZARD_FNS;
    console.log('OK: wizard functions agregadas');
} else {
    // Reemplazar las existentes
    const idxWiz = c.indexOf('// ===\n// WIZARD BIBLIA');
    if (idxWiz >= 0) {
        c = c.substring(0, idxWiz) + WIZARD_FNS;
        console.log('OK: wizard functions actualizadas');
    } else {
        console.log('OK: wizard ya existe (no modificado)');
    }
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('GUARDADO. Tamano:', c.length);
