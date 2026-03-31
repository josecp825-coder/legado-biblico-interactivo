// =====================================================
// BIBLIA LECTOR — Lector principal, notas, compartir
// =====================================================

window.expandirSelectorBiblia = function (containerId) {
    renderSelectorLibrosPrincipal(containerId);
};

function renderSelectorLibrosPrincipal(containerId) {
    containerId = containerId || 'bible-home-selector';
    var area = document.getElementById(containerId);
    if (!area) return;

    // Ultimo libro leido
    var ultimaVisita = localStorage.getItem('legado_ultima_visita');
    var ultimaBtn = '';
    if (ultimaVisita) {
        try {
            var u = JSON.parse(ultimaVisita);
            ultimaBtn = '<button onclick="abrirLibroPrincipal(\'' + u.libro + '\',' + u.cap + ',null)" ' +
                'style="width:100%;padding:14px 18px;background:linear-gradient(135deg,rgba(85,239,196,0.15),rgba(85,239,196,0.05));' +
                'border:1.5px solid rgba(85,239,196,0.4);border-radius:16px;color:#fff;cursor:pointer;' +
                'display:flex;align-items:center;gap:14px;margin-bottom:14px;text-align:left">' +
                '<span style="font-size:1.8rem">\uD83D\uDCD6</span>' +
                '<div style="flex:1"><div style="font-size:0.6rem;color:#55efc4;font-weight:900;letter-spacing:2px">SEGUIR LEYENDO</div>' +
                '<div style="font-size:1.05rem;font-weight:900;color:#fff;margin-top:3px">' + u.libro + ' ' + u.cap + '</div></div>' +
                '<span style="color:#55efc4;font-size:1.8rem;font-weight:300">&#8250;</span></button>';
        } catch(e) {}
    }

    // HTML principal
    var html = '<div>';

    // Header
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">';
    html += '<button onclick="if(typeof cerrarBibliaOverlay===\'function\'){cerrarBibliaOverlay()}else{mostrarBibleCompacto(\'' + containerId + '\')}" ';
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
    html += 'onkeydown="if(event.key===\'Enter\' || event.keyCode===13){event.preventDefault();document.getElementById(\'wizard-vers\').focus()}">';
    html += '</div>';
    html += '<div>';
    html += '<div style="font-size:0.65rem;color:rgba(255,255,255,0.5);font-weight:900;letter-spacing:1.5px;margin-bottom:6px">VERS&Iacute;CULO (opcional)</div>';
    html += '<input id="wizard-vers" type="number" min="1" placeholder="Ej: 16" ';
    html += 'style="width:100%;padding:14px;background:rgba(0,0,0,0.5);border:2px solid rgba(162,155,254,0.4);';
    html += 'color:#fff;border-radius:12px;font-size:1.4rem;font-weight:900;outline:none;box-sizing:border-box;text-align:center" ';
    html += 'onkeydown="if(event.key===\'Enter\' || event.keyCode===13){event.preventDefault();wizardIrALeer()}">';
    html += '</div>';
    html += '</div>';
    html += '<button type="button" onclick="wizardIrALeer()" ';
    html += 'style="width:100%;padding:20px;background:linear-gradient(135deg,#00b894,#55efc4);border:none;';
    html += 'color:#000;font-weight:900;font-size:1.3rem;border-radius:16px;cursor:pointer;';
    html += 'letter-spacing:1px;box-shadow:0 6px 25px rgba(85,239,196,0.4)">&#9989; LEER</button>';
    html += '<button onclick="wizardVolver()" ';
    html += 'style="width:100%;padding:10px;background:none;border:none;color:rgba(255,255,255,0.4);';
    html += 'font-size:0.75rem;cursor:pointer;margin-top:6px">&#8592; cambiar libro</button>';
    html += '</div>';

    html += '</div>'; // cierre biblia-wizard

    // =========================================
    // BUSCADOR INTELIGENTE (Full-Text Search)
    // =========================================
    html += '<div id="biblia-buscador-smart" style="background:rgba(116,185,255,0.07);border:1.5px solid rgba(116,185,255,0.3);border-radius:18px;padding:16px;margin-bottom:14px">';
    html += '<div style="font-size:1rem;color:#74b9ff;font-weight:900;letter-spacing:1px;margin-bottom:12px">&#128269; BUSCADOR INTELIGENTE</div>';
    html += '<div style="display:flex;gap:8px">';
    html += '<input id="smart-search-input" type="text" placeholder="Ej: Eutico, gracia, amor..." ';
    html += 'onkeydown="if(event.key===\'Enter\'){event.preventDefault();ejecutarBuscadorInteligente()}" ';
    html += 'autocomplete="off" style="flex:1;padding:14px;background:rgba(0,0,0,0.5);border:2px solid rgba(116,185,255,0.4);color:#fff;border-radius:12px;font-size:1rem;font-weight:700;outline:none">';
    html += '<button onclick="ejecutarBuscadorInteligente()" style="padding:0 20px;background:linear-gradient(135deg,#0984e3,#74b9ff);border:none;color:#fff;font-weight:900;border-radius:12px;cursor:pointer;font-size:1.2rem">&#128269;</button>';
    html += '</div>';
    html += '<div id="smart-search-results" style="margin-top:14px;display:none;flex-direction:column;gap:8px;max-height:280px;overflow-y:auto;padding-right:4px"></div>';
    html += '</div>';    // Historial rapido
    html += '<div id="relampago-historial" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:14px;min-height:20px">';
    html += '<span style="color:rgba(255,255,255,0.2);font-size:0.6rem;font-style:italic">Citas recientes aparecer&aacute;n aqu&iacute;</span>';
    html += '</div>';

    // Tabs
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-bottom:8px">';
    html += '<button id="tab-genero" onclick="cambiarModoSelectorBiblia(\'genero\')" style="padding:10px 4px;border-radius:14px;border:2px solid #55efc4;background:rgba(85,239,196,0.18);color:#55efc4;font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#128218;</span>TODOS</button>';
    html += '<button id="tab-at" onclick="cambiarModoSelectorBiblia(\'at\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(85,239,196,0.3);background:rgba(85,239,196,0.05);color:rgba(85,239,196,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#128220;</span>AT</button>';
    html += '<button id="tab-nt" onclick="cambiarModoSelectorBiblia(\'nt\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(162,155,254,0.3);background:rgba(162,155,254,0.05);color:rgba(162,155,254,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#9997;&#65039;</span>NT</button>';
    html += '<button id="tab-buscar" onclick="cambiarModoSelectorBiblia(\'buscar\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(253,203,110,0.3);background:rgba(253,203,110,0.05);color:rgba(253,203,110,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span>&#128269;</span>BUSCAR</button>';
    html += '</div>';
    html += '<div style="display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px">';
    html += '<button id="tab-favs" onclick="cambiarModoSelectorBiblia(\'favs\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(253,203,110,0.3);background:rgba(253,203,110,0.05);color:rgba(253,203,110,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#11088; FAVS</button>';
    html += '<button id="tab-aliento" onclick="cambiarModoSelectorBiblia(\'aliento\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(255,159,67,0.3);background:rgba(255,159,67,0.05);color:rgba(255,159,67,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#129309; ALIENTO</button>';
    html += '<button id="tab-historial" onclick="cambiarModoSelectorBiblia(\'historial\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(116,185,255,0.3);background:rgba(116,185,255,0.05);color:rgba(116,185,255,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#128202; LE&Iacute;DOS</button>';
    html += '<button id="tab-notas" onclick="cambiarModoSelectorBiblia(\'notas\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(254,202,87,0.3);background:rgba(254,202,87,0.05);color:rgba(254,202,87,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#128221; NOTAS</button>';
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

function cambiarModoSelectorBiblia(modo) {
    _modoSelectorBiblia = modo;
    const modos = ['genero', 'at', 'nt', 'buscar', 'favs', 'aliento', 'historial', 'notas'];
    const colores = { genero: '#55efc4', at: '#55efc4', nt: '#a29bfe', buscar: '#fdcb6e', favs: '#fdcb6e', aliento: '#ff9f43', historial: '#74b9ff', notas: '#feca57' };
    const rgbs = { genero: '85,239,196', at: '85,239,196', nt: '162,155,254', buscar: '253,203,110', favs: '253,203,110', aliento: '255,159,67', historial: '116,185,255', notas: '254,202,87' };
    modos.forEach(m => {
        const btn = document.getElementById('tab-' + m);
        if (!btn) return;
        const activo = (m === modo);
        btn.style.background = activo ? `rgba(${rgbs[m]},0.2)` : 'rgba(255,255,255,0.03)';
        btn.style.borderColor = activo ? colores[m] : 'rgba(255,255,255,0.15)';
        btn.style.color = activo ? colores[m] : 'rgba(255,255,255,0.4)';
        btn.style.boxShadow = activo ? `0 0 15px ${colores[m]}40` : 'none';
    });
    const root = document.getElementById('libros-dinamicos-root');
    if (!root) return;
    if (modo === 'genero') renderModoGenero(root);
    if (modo === 'at') renderModoTestamento(root, 'at');
    if (modo === 'nt') renderModoTestamento(root, 'nt');
    if (modo === 'buscar') renderModoBuscar(root);
    if (modo === 'favs') renderModoFavoritos(root);
    if (modo === 'aliento') renderModoAliento(root);
    if (modo === 'historial') renderHistorialLectura(root);
    if (modo === 'notas') renderModoNotas(root);
}

function renderModoGenero(root) {
    let html = '';
    let catIdx = 0;
    Object.entries(ESTRUCTURA_BIBLIA).forEach(([testamento, info]) => {
        const esAT = testamento === 'ANTIGUO TESTAMENTO';
        html += `<div style="grid-column:1/-1;padding:8px 0 5px;color:${info.color};font-weight:900;font-size:0.68rem;letter-spacing:3px;border-bottom:2px solid ${info.color}50;margin-top:12px;text-align:center;text-shadow:0 0 10px ${info.color}60">${esAT ? '📜' : '✝️'} ${testamento}</div>`;
        Object.entries(info.categorias).forEach(([cat, libros]) => {
            const cor = COLORES_CATEGORIA[catIdx % COLORES_CATEGORIA.length];
            html += `<div style="grid-column:1/-1;padding:5px 4px 3px;color:${cor};font-weight:800;font-size:0.65rem;letter-spacing:1.5px;margin-top:8px;border-left:3px solid ${cor};padding-left:8px">${cat.toUpperCase()}</div>`;
            libros.forEach(l => {
                html += `<button class="btn-libro-dyn" onclick="seleccionarCapitulos('${l}')"
                    style="padding:10px 5px;font-size:${_libFontSize}rem;border-radius:10px;background:rgba(${hexToRgb(cor)},0.1);border:1.5px solid ${cor}60;color:${cor};font-weight:800;cursor:pointer;transition:all 0.15s;text-align:center;line-height:1.3">${l}</button>`;
            });
            catIdx++;
        });
    });
    root.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">${html}</div>`;
}

// Convierte hex a rgb para usar en rgba()
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}

function mostrarSeccionTestamento(testamento) {
    const root = document.getElementById('seccion-genero-libros') || document.getElementById('libros-dinamicos-root');
    const info = ESTRUCTURA_BIBLIA[testamento];
    root.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:15px">
            <button onclick="renderModoGenero(document.getElementById('libros-dinamicos-root'))"
                style="background:rgba(255,255,255,0.1);border:none;color:#fff;width:34px;height:34px;border-radius:50%;font-weight:900;cursor:pointer;font-size:1rem">←</button>
            <h3 style="margin:0;letter-spacing:3px;color:${info.color};font-size:0.9rem">${testamento}</h3>
        </div>
        <div style="display:grid;grid-template-columns:1fr;gap:15px">
            ${Object.entries(info.categorias).map(([cat, libros]) => `
                <div style="background:rgba(255,255,255,0.03);padding:18px;border-radius:18px;border:1px solid rgba(255,255,255,0.06)">
                    <p style="color:${info.color};font-weight:900;font-size:0.75rem;margin-bottom:12px;letter-spacing:1px;opacity:0.8">${cat.toUpperCase()}</p>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(105px,1fr));gap:8px">
                        ${libros.map(l => `<button class="btn-libro-premium" onclick="seleccionarCapitulos('${l}')">${l}</button>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderModoTestamento(root, cual) {
    // cual = 'at' o 'nt'
    const esAT = (cual === 'at');
    const libros = esAT ? LIBROS_AT : LIBROS_NT;
    const titulo = esAT ? '📜 ANTIGUO TESTAMENTO' : '✝️ NUEVO TESTAMENTO';
    const subtitulo = esAT ? '39 LIBROS' : '27 LIBROS';
    const colorPrincipal = esAT ? '#55efc4' : '#a29bfe';
    const pal = esAT
        ? ['#55efc4', '#74b9ff', '#fdcb6e', '#fd79a8', '#a29bfe', '#00cec9', '#e17055', '#ffeaa7']
        : ['#a29bfe', '#74b9ff', '#fd79a8', '#fdcb6e', '#55efc4', '#e17055', '#00cec9', '#6c5ce7'];

    const btns = libros.map((l, i) => {
        const c = pal[i % pal.length];
        return `<button class="btn-libro-dyn" onclick="seleccionarCapitulos('${l}')"
            style="padding:10px 5px;font-size:${_libFontSize}rem;border-radius:10px;background:rgba(${hexToRgb(c)},0.12);border:1.5px solid ${c}70;color:${c};font-weight:800;cursor:pointer;text-align:center;line-height:1.3;transition:all 0.15s">${l}</button>`;
    }).join('');

    root.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
            <div style="grid-column:1/-1;padding:10px 0 6px;color:${colorPrincipal};font-weight:900;font-size:0.7rem;letter-spacing:3px;border-bottom:2px solid ${colorPrincipal}50;text-align:center;text-shadow:0 0 10px ${colorPrincipal}60">${titulo} — ${subtitulo}</div>
            ${btns}
        </div>
    `;
}

function renderModoBuscar(root) {
    root.innerHTML = `
        <!-- BARRA DE REFERENCIA DIRECTA - ESTILO TARJETA PREMIUM -->
        <div style="background:linear-gradient(135deg,rgba(253,203,110,0.12),rgba(225,112,85,0.08));border:2px solid rgba(253,203,110,0.4);border-radius:20px;padding:20px;margin-bottom:16px;box-shadow:0 8px 25px rgba(253,203,110,0.1)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
                <span style="font-size:1.4rem">⚡</span>
                <div>
                    <div style="color:#fdcb6e;font-size:0.85rem;font-weight:900;letter-spacing:1px">IR DIRECTO A REFERENCIA</div>
                    <div style="color:rgba(255,255,255,0.45);font-size:0.65rem;margin-top:2px">Escribe libro, capítulo y versículo</div>
                </div>
            </div>

            <!-- Fila: LIBRO | CAP | VER -->
            <div style="display:grid;grid-template-columns:1fr 72px 72px;gap:8px;margin-bottom:12px">
                <div style="display:flex;flex-direction:column;gap:4px">
                    <label style="color:#fdcb6e;font-size:0.6rem;font-weight:900;letter-spacing:1.5px">LIBRO</label>
                    <input id="bib-ref-libro" type="text" placeholder="Ej: Juan"
                        oninput="autoRellenarCap(this.value)"
                        autocomplete="off"
                        style="padding:12px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(253,203,110,0.5);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;width:100%;box-sizing:border-box">
                </div>
                <div style="display:flex;flex-direction:column;gap:4px">
                    <label style="color:#74b9ff;font-size:0.6rem;font-weight:900;letter-spacing:1.5px">CAP.</label>
                    <input id="bib-ref-cap" type="number" placeholder="1" min="1"
                        style="padding:12px 8px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(116,185,255,0.5);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;text-align:center;width:100%;box-sizing:border-box">
                </div>
                <div style="display:flex;flex-direction:column;gap:4px">
                    <label style="color:#fd79a8;font-size:0.6rem;font-weight:900;letter-spacing:1.5px">VER.</label>
                    <input id="bib-ref-vers" type="number" placeholder="1" min="1"
                        style="padding:12px 8px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(253,121,168,0.5);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;text-align:center;width:100%;box-sizing:border-box">
                </div>
            </div>

            <button onclick="irReferenciaDirect()"
                style="width:100%;padding:15px;background:linear-gradient(135deg,#fdcb6e,#e17055);border:none;color:#000;font-weight:900;border-radius:14px;cursor:pointer;font-size:1rem;letter-spacing:1px;box-shadow:0 5px 20px rgba(253,203,110,0.4);transition:transform 0.15s"
                onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform='scale(1)'">
                ⚡ ABRIR REFERENCIA
            </button>
        </div>

        <!-- BUSCADOR POR NOMBRE -->
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px">
            <div style="color:rgba(255,255,255,0.5);font-size:0.65rem;font-weight:900;letter-spacing:2px;margin-bottom:10px">🔍 FILTRAR POR NOMBRE</div>
            <input id="bib-busq-libro" type="text" placeholder="Escribe parte del nombre..."
                oninput="filtrarLibrosBusqueda(this.value)"
                autocomplete="off"
                style="width:100%;padding:12px 16px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(255,255,255,0.2);color:#fff;border-radius:12px;font-size:${_libFontSize}rem;outline:none;box-sizing:border-box;margin-bottom:10px">

            <div id="bib-resultados-libros" style="display:none;grid-template-columns:repeat(3,1fr);gap:6px;max-height:180px;overflow-y:auto;margin-bottom:8px"></div>

            <div id="bib-todos-visibles" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
                ${TODOS_LIBROS.map((l, i) => {
        const esAT = LIBROS_AT.includes(l);
        const pal = esAT
            ? ['#55efc4', '#74b9ff', '#fdcb6e', '#fd79a8', '#a29bfe', '#00cec9', '#e17055', '#ffeaa7']
            : ['#a29bfe', '#74b9ff', '#fd79a8', '#fdcb6e', '#55efc4', '#e17055', '#00cec9', '#6c5ce7'];
        const c = pal[i % pal.length];
        return `<button class="bib-btn-filtro btn-libro-dyn" data-libro="${l.toLowerCase()}" onclick="seleccionarCapitulos('${l}')"
                        style="padding:10px 5px;border-radius:10px;background:rgba(${hexToRgb(c)},0.1);border:1.5px solid ${c}60;color:${c};font-size:${_libFontSize}rem;font-weight:800;cursor:pointer;text-align:center;transition:all 0.15s">${l}</button>`;
    }).join('')}
            </div>
        </div>
    `;
}

function filtrarLibrosBusqueda(texto) {
    const q = texto.toLowerCase().trim();
    const botones = document.querySelectorAll('.bib-btn-filtro');
    const resultados = document.getElementById('bib-resultados-libros');
    const todos = document.getElementById('bib-todos-visibles');

    if (!q) {
        if (resultados) resultados.innerHTML = '';
        if (todos) todos.style.display = 'grid';
        return;
    }
    if (todos) todos.style.display = 'none';

    const encontrados = TODOS_LIBROS.filter(l => l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q.normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
    if (resultados) {
        if (encontrados.length === 0) {
            resultados.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:rgba(255,255,255,0.4);padding:15px;font-size:0.85rem">Sin resultados</div>`;
        } else {
            resultados.innerHTML = encontrados.map(l => `
                <button onclick="seleccionarCapitulos('${l}')" onclick_also="document.getElementById('bib-busq-libro').value=''"
                    style="padding:10px 6px;border-radius:10px;background:rgba(253,203,110,0.15);border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:700;font-size:0.82rem;cursor:pointer">
                    ${l}</button>`).join('');
        }
    }
}

// Muestra cuántos caps tiene el libro en el placeholder del campo CAP
function autoRellenarCap(val) {
    const capInput = document.getElementById('bib-ref-cap');
    if (!capInput) return;
    const q = val.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const libro = TODOS_LIBROS.find(l =>
        l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(q)
    );
    if (libro && CONTEO_CAPITULOS[libro]) {
        capInput.placeholder = `1-${CONTEO_CAPITULOS[libro]}`;
        capInput.max = CONTEO_CAPITULOS[libro];
    } else {
        capInput.placeholder = '1';
        capInput.removeAttribute('max');
    }
}

function irReferenciaDirect() {

    const libroInput = (document.getElementById('bib-ref-libro')?.value || '').trim();
    const cap = parseInt(document.getElementById('bib-ref-cap')?.value) || 1;
    const vers = parseInt(document.getElementById('bib-ref-vers')?.value) || null;

    if (!libroInput) { mostrarToast('⚠️ Ingresa el nombre del libro'); return; }

    // Normalizar: buscar coincidencia
    const q = libroInput.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const encontrado = TODOS_LIBROS.find(l =>
        l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === q ||
        l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(q)
    );

    if (!encontrado) {
        mostrarToast(`❌ Libro "${libroInput}" no encontrado`);
        return;
    }

    const capTotal = CONTEO_CAPITULOS[encontrado] || 1;
    const capFinal = Math.min(Math.max(cap, 1), capTotal);

    mostrarToast(`📖 Abriendo ${encontrado} ${capFinal}${vers ? ':' + vers : ''}...`);
    abrirLibroPrincipal(encontrado, capFinal, vers);
}


async function seleccionarCapitulos(libro) {
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    const root = document.getElementById('libros-dinamicos-root');
    root.innerHTML = `<div style="text-align:center;padding:50px"><div class="loader-spinner" style="margin:0 auto"></div><p>CARGANDO CAPÍTULOS...</p></div>`;
    const totalCaps = CONTEO_CAPITULOS[libro] || 1;
    root.innerHTML = `
        <div style="text-align:left; margin-bottom:20px; display:flex; align-items:center; gap:15px">
            <button onclick="renderSelectorLibrosPrincipal()" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:40px; height:40px; border-radius:50%; font-weight:900; cursor:pointer">←</button>
            <h2 style="margin:0; font-size:1.5rem; letter-spacing:2px; color:#55efc4">${libro.toUpperCase()}</h2>
        </div>
        <p style="opacity:0.6; font-size:0.8rem; letter-spacing:2px; margin-bottom:20px">SELECCIONA UN CAPÍTULO:</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(60px, 1fr)); gap:10px">
            ${Array.from({ length: totalCaps }, (_, i) => i + 1).map(c => `
                <button onclick="seleccionarVersiculos('${libro}', ${c})" style="padding:15px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:12px; font-weight:900; cursor:pointer; font-size:1.1rem">${c}</button>
            `).join('')}
        </div>
    `;
    window.scrollTo(0, 0);
}

async function seleccionarVersiculos(libro, cap) {
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    currentCapitulo = parseInt(cap);
    const root = document.getElementById('libros-dinamicos-root');
    root.innerHTML = `<div style="text-align:center;padding:50px"><div class="loader-spinner" style="margin:0 auto"></div><p>CARGANDO VERSÍCULOS...</p></div>`;
    try {
        const data = await buscarEnBiblia(currentLibroSlug, currentCapitulo);
        if (data && data.vers) {
            root.innerHTML = `
                <div style="text-align:left; margin-bottom:20px; display:flex; align-items:center; gap:15px">
                    <button onclick="seleccionarCapitulos('${libro}')" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:40px; height:40px; border-radius:50%; font-weight:900; cursor:pointer">←</button>
                    <h2 style="margin:0; font-size:1.5rem; letter-spacing:2px; color:#55efc4">${libro.toUpperCase()} ${cap}</h2>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(60px, 1fr)); gap:10px">
                    ${data.vers.map(v => `
                        <button onclick="abrirLibroPrincipal('${libro}', ${cap}, ${v.number})" style="padding:15px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:12px; font-weight:900; cursor:pointer; font-size:1.1rem">${v.number}</button>
                    `).join('')}
                </div>
            `;
            window.scrollTo(0, 0);
        }
    } catch (e) { }
}

async function buscarEnBiblia(s, c = 1, t = "rv1960") {
    try {
        const r = await fetch(`${BIBLIA_API_URL}${t}/${s}/${c}`);
        return r.ok ? await r.json() : null;
    } catch (e) {
        return null;
    }
}

async function abrirLibroPrincipal(libro, cap = 1, verso = null) {
    // FIX APPLE IOS TECLADO: Quitar foco para que el teclado baje antes de renderizar
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
        try { document.activeElement.blur(); } catch(e) {}
    }

    const intro = document.querySelector('.intro-container');
    if (intro) intro.style.display = 'none';
    const st = document.getElementById('lb-santuario-layer');
    if (st) st.style.display = 'none';

    const pantalla = document.getElementById('pantalla-estudio');
    if (pantalla) pantalla.className = `container-estudio theme-adolescentes is-active`;
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    currentCapitulo = parseInt(cap);
    // Guardar última visita para el botón "SEGUIR LEYENDO"
    localStorage.setItem('legado_ultima_visita', JSON.stringify({ libro: libro, cap: parseInt(cap) }));
    cerrarContexto();
    // Cerrar overlay del selector de Biblia si está abierto
    const overlay = document.getElementById('biblia-overlay');
    if (overlay) overlay.remove();
    const area = document.getElementById('pantalla-estudio');
    area.innerHTML = `<div style="text-align:center;padding:100px"><div class="loader-spinner" style="margin:0 auto"></div></div>`;
    window.scrollTo(0, 0); // FIX: Restablecer scroll al top
    setTimeout(() => window.scrollTo(0, 0), 50); // FIX iOS: doble reset de scroll post-teclado
    try {
        const data = await buscarEnBiblia(currentLibroSlug, currentCapitulo);
        if (data && data.vers) {
            // Validar versículo
            if (verso && parseInt(verso) > data.vers.length) {
                // Banner visible que dura 6 segundos
                renderLecturaGlobal(data, null);
                setTimeout(() => {
                    const reader = document.getElementById('reader-container');
                    if (reader) {
                        const banner = document.createElement('div');
                        banner.id = 'verso-error-banner';
                        banner.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999999;background:rgba(15,23,42,0.97);border:2px solid #fdcb6e;border-radius:20px;padding:24px;text-align:center;max-width:320px;box-shadow:0 0 40px rgba(253,203,110,0.4);animation:devFadeIn 0.3s ease-out;';
                        banner.innerHTML = `
                            <div style="font-size:2.5rem;margin-bottom:12px;">⚠️</div>
                            <div style="color:#fdcb6e;font-weight:900;font-size:1rem;margin-bottom:8px;">Versículo no existe</div>
                            <div style="color:rgba(255,255,255,0.7);font-size:0.85rem;line-height:1.6;margin-bottom:14px;">${libro} ${currentCapitulo} solo tiene <b style="color:#55efc4">${data.vers.length}</b> versículos.<br>El versículo <b style="color:#ff6b6b">${verso}</b> no existe.</div>
                            <button onclick="this.parentElement.remove()" style="padding:10px 24px;background:linear-gradient(135deg,#fdcb6e,#f39c12);border:none;color:#000;border-radius:12px;cursor:pointer;font-weight:900;font-size:0.85rem;">ENTENDIDO ✅</button>
                        `;
                        document.body.appendChild(banner);
                        setTimeout(() => { const b = document.getElementById('verso-error-banner'); if (b) b.remove(); }, 6000);
                    }
                }, 300);
                return;
            }
            renderLecturaGlobal(data, verso);
        }
    } catch (e) { }
}

/**
 * Jose - Lector Global con BARRA DINÁMICA y SELECTOR DE FUENTE
 */
function renderLecturaGlobal(data, versoEnfocar = null) {
    window.currentChapterVerses = data.vers;
    currentLibroNombre = data.name;
    currentCapitulo = data.chapter;
    // ✅ Exponer en window para que cba_motor.js pueda leerlos
    window.currentLibroNombre = data.name;
    window.currentCapitulo = data.chapter;

    // 📊 Guardar en historial de lectura
    guardarHistorialLectura(data.name, data.chapter);
    window.currentCapitulo = data.chapter;
    inyectarEstilosLecturaGlobal();
    const area = document.getElementById('pantalla-estudio');

    // 🍎 [APPLE FIX] Ensure body is at the absolute top 
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0,0), 100);

    area.innerHTML = `
        <!-- Jose - Barra Global REDISEÑADA - Todo en pantalla -->
        <div id="floating-bible-nav" class="floating-nav-panel">
            <!-- Fila 1: Home + Atrás Biblia + Título COMPLETO del libro + Capítulo -->
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px; width:100%; box-sizing:border-box;">
                <button ontouchend="event.preventDefault();volverMenuPrincipal()" onclick="volverMenuPrincipal()" class="btn-home-back" style="width:34px;height:34px;font-size:1rem;">🏠</button>
                <button ontouchend="event.preventDefault();abrirSelectorBiblias()" onclick="abrirSelectorBiblias()" class="btn-home-back" style="background:rgba(85,239,196,0.15);border-color:rgba(85,239,196,0.4);font-size:0.7rem;width:34px;height:34px;">📖</button>
                <span class="current-ref-text" style="flex:1; font-size:0.85rem; word-break:break-word; white-space:normal; line-height:1.2;">${data.name}</span>
                <div style="display:flex;align-items:center;gap:2px;background:rgba(253,203,110,0.15);padding:3px 8px;border-radius:10px;border:1.5px solid rgba(253,203,110,0.5);flex-shrink:0">
                    <span style="color:rgba(255,255,255,0.5);font-size:0.55rem;font-weight:900;letter-spacing:0.5px">CAP</span>
                    <span style="color:#fdcb6e;font-size:1rem;font-weight:900;margin-left:2px">${data.chapter}</span>
                </div>
            </div>
            <!-- Fila 2: Flechas + Fuente + Tema -->
            <div style="display:flex; align-items:center; justify-content:space-between; gap:4px; margin-bottom:4px; width:100%; box-sizing:border-box;">
                <button onclick="cambiarCapituloGlobal(-1)" class="btn-arrow" style="flex-shrink:0; width:34px; height:30px;">‹</button>
                <button onclick="cambiarCapituloGlobal(1)" class="btn-arrow" style="flex-shrink:0; width:34px; height:30px;">›</button>
                <div style="flex:1"></div>
                <div style="display:flex; align-items:center; gap:4px; background:rgba(255,255,255,0.1); padding:3px 8px; border-radius:16px; border:1px solid #55efc4; white-space:nowrap; flex-shrink:0;">
                    <span style="font-size:0.55rem; color:#55efc4; font-weight:900;">Aa</span>
                    <button ontouchend="event.preventDefault();ajustarFuenteGlobal(-0.1)" onclick="ajustarFuenteGlobal(-0.1)" class="btn-font" style="padding:6px 10px; font-size:0.9rem; min-width:32px; min-height:32px; display:flex; align-items:center; justify-content:center;">−</button>
                    <button ontouchend="event.preventDefault();ajustarFuenteGlobal(0.1)" onclick="ajustarFuenteGlobal(0.1)" class="btn-font" style="padding:6px 10px; font-size:0.9rem; min-width:32px; min-height:32px; display:flex; align-items:center; justify-content:center;">+</button>
                </div>
                <!-- 🌙 MODO LECTURA -->
                <button onclick="ciclarTemaLectura()" id="btn-tema-lectura" class="btn-font" style="padding:6px 10px; font-size:0.9rem; min-width:32px; min-height:32px; display:flex; align-items:center; justify-content:center;">🌙</button>
            </div>
            
            <!-- Fila 3: Botones de navegación (compactos) -->
            <div class="nav-bottom-grid">
                <button onclick="window.abrirSelectorRapidoLibros()" class="btn-nav-dynamic">
                    <span class="nav-btn-icon">📖</span>
                    <span class="nav-btn-label">LIBRO</span>
                </button>
                <button onclick="window.abrirSelectorRapidoCaps(currentLibroSlug)" class="btn-nav-dynamic">
                    <span class="nav-btn-icon">📑</span>
                    <span class="nav-btn-label">CAP ${data.chapter}</span>
                </button>
                <button onclick="window.abrirSelectorRapidoVersos()" class="btn-nav-dynamic">
                    <span class="nav-btn-icon">🔢</span>
                    <span class="nav-btn-label">VERSO</span>
                </button>
                <button onclick="window.abrirCbaActual()" class="btn-nav-dynamic btn-cba-pulsar">
                    <span class="nav-btn-icon">📖</span>
                    <span class="nav-btn-label">CBA</span>
                </button>
            </div>
        </div>

        <div class="immersive-reader-container" id="reader-container" style="padding:20px; padding-top: 190px; padding-bottom: 200px;">
            <div class="reading-progress-container"><div class="reading-progress-bar" id="reading-bar"></div></div>
            <!-- 🔍 BUSCAR EN CAPÍTULO -->
            <div style="display:flex;gap:6px;margin-bottom:12px;">
                <input id="buscar-cap-input" type="text" placeholder="🔍 Buscar en este capítulo..." style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:8px 12px;border-radius:10px;font-size:0.8rem;" oninput="buscarEnCapitulo(this.value)">
                <button onclick="document.getElementById('buscar-cap-input').value='';buscarEnCapitulo('')" style="background:rgba(255,100,100,0.15);border:1px solid rgba(255,100,100,0.3);color:#ff6b6b;padding:8px 10px;border-radius:10px;font-size:0.7rem;font-weight:900;cursor:pointer;">✕</button>
            </div>
            
            <div class="verses-container-dynamic" id="verses-body" style="line-height:1.9; font-size:${currentFontSize}rem;">
                ${data.vers.map(v => {
        const key = `${data.name} ${data.chapter}:${v.number}`;
        const savedNote = localStorage.getItem(`nota_${key}`);
        const hasNoteClass = savedNote && savedNote.trim() !== '' ? 'verse-has-note' : '';
        const isFocused = versoEnfocar && parseInt(v.number) === parseInt(versoEnfocar) ? 'verse-focus-highlight' : '';

        return `
                        <div id="vblock-${v.number}" class="verse-block ${hasNoteClass} ${isFocused}" data-ref="${data.name} ${data.chapter}" data-num="${v.number}" style="margin-bottom:15px; cursor:pointer; position:relative; touch-action:pan-y;">
                            <p>
                                <span style="color:#55efc4;font-weight:900;margin-right:10px">${v.number}</span>
                                <span id="note-indicator-${v.number}">${savedNote ? '📝' : ''}</span>
                                ${formatearTextoEspecial(v.verse)}
                            </p>
                        </div>`;
    }).join('')}
            </div>
            
            <div id="context-card" class="context-card">
                <div class="context-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px">
                    <span class="context-title" id="context-ref" style="font-weight:900; color:#55efc4; letter-spacing:1px">ESTUDIO</span>
                    <span class="context-close" onclick="cerrarContexto()" style="cursor:pointer; padding:5px; font-size:1.2rem">✖</span>
                </div>
                <div class="context-content" id="context-body"></div>
                <div id="note-edit-area" style="margin-top:15px">
                    <textarea id="personal-note" placeholder="Reflexión..." style="width:100%; height:60px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:#fff; padding:10px; font-size:0.9rem; resize:none"></textarea>
                    <button onclick="guardarNotaGlobal()" style="width:100%; margin-top:10px; background:#55efc4; color:#000; border:none; padding:12px; border-radius:10px; cursor:pointer; font-weight:900">💾 GUARDAR</button>
                </div>
            </div>
        </div>
    `;

    // === DOBLE TAP para abrir el panel de comentario ===
    // 1er toque  → resalta el versículo y muestra feedback
    // 2do toque  → abre el panel de notas/CBA (dentro de ~700ms)
    setTimeout(() => {
        const vBody = document.getElementById('verses-body');
        if (vBody) {
            let _ts = 0, _sy = 0, _sx = 0, _moved = false;
            let _lastTapBlock = null, _lastTapTime = 0;

            vBody.addEventListener('touchstart', e => {
                _ts = Date.now();
                _sy = e.touches[0].clientY;
                _sx = e.touches[0].clientX;
                _moved = false;
            }, { passive: true });

            vBody.addEventListener('touchmove', e => {
                if (Math.abs(e.touches[0].clientY - _sy) > 10 ||
                    Math.abs(e.touches[0].clientX - _sx) > 10) _moved = true;
            }, { passive: true });

            vBody.addEventListener('touchend', e => {
                if (_moved || (Date.now() - _ts) > 400) return; // scroll o long-press
                const block = e.target.closest('.verse-block');
                if (!block) return;

                const now = Date.now();
                const msSinceLast = now - _lastTapTime;

                if (_lastTapBlock === block && msSinceLast < 700 && msSinceLast > 40) {
                    // ===  SEGUNDO TAP — ABRIR PANEL ===
                    document.querySelectorAll('.verse-tap1').forEach(el => {
                        el.classList.remove('verse-tap1');
                        const tip = el.querySelector('.tap-tip');
                        if (tip) tip.remove();
                    });
                    const num = parseInt(block.dataset.num);
                    const ref = block.dataset.ref;
                    const verseData = window.currentChapterVerses?.find(v => parseInt(v.number) === num);
                    if (verseData) mostrarContextoGlobal(ref, num, verseData.verse);
                    _lastTapBlock = null;
                    _lastTapTime = 0;
                } else {
                    // === PRIMER TAP — FEEDBACK VISUAL ===
                    document.querySelectorAll('.verse-tap1').forEach(el => {
                        el.classList.remove('verse-tap1');
                        const tip = el.querySelector('.tap-tip');
                        if (tip) tip.remove();
                    });
                    block.classList.add('verse-tap1');

                    // Mini-indicator "toca de nuevo"
                    const tip = document.createElement('span');
                    tip.className = 'tap-tip';
                    tip.innerHTML = ' ✓ toca de nuevo';
                    tip.style.cssText = 'font-size:0.6rem;color:#55efc4;vertical-align:middle;opacity:0.85;font-weight:900;letter-spacing:0.5px;';
                    block.querySelector('p').appendChild(tip);

                    _lastTapBlock = block;
                    _lastTapTime = now;

                    // Auto-reset si el usuario no hace 2do tap
                    setTimeout(() => {
                        if (_lastTapBlock === block) {
                            block.classList.remove('verse-tap1');
                            const t = block.querySelector('.tap-tip');
                            if (t) t.remove();
                            _lastTapBlock = null;
                            _lastTapTime = 0;
                        }
                    }, 2200);
                }
            });

            // Soporte desktop: doble click
            vBody.addEventListener('dblclick', e => {
                if ('ontouchstart' in window) return;
                const block = e.target.closest('.verse-block');
                if (!block) return;
                const num = parseInt(block.dataset.num);
                const ref = block.dataset.ref;
                const verseData = window.currentChapterVerses?.find(v => parseInt(v.number) === num);
                if (verseData) mostrarContextoGlobal(ref, num, verseData.verse);
            });
        }
        if (versoEnfocar) document.getElementById(`vblock-${versoEnfocar}`)?.scrollIntoView({ behavior: 'auto', block: 'center' });
        // Aplicar tema de lectura guardado
        if (_temaActual > 0) aplicarTemaLectura();
    }, 100);
}

// Jose - Funcion para ajustar la fuente dinamicamente
window.ajustarFuenteGlobal = function (delta) {
    currentFontSize += delta;
    if (currentFontSize < 0.8) currentFontSize = 0.8;
    if (currentFontSize > 2.5) currentFontSize = 2.5;
    localStorage.setItem('bibleFontSize', currentFontSize);
    const body = document.getElementById('verses-body');
    if (body) body.style.fontSize = currentFontSize + 'rem';
};

async function cambiarCapituloGlobal(delta) {
    const totalCaps = (typeof CONTEO_CAPITULOS !== 'undefined' && currentLibroNombre) ? (CONTEO_CAPITULOS[currentLibroNombre] || 150) : 150;
    const nuevoCap = currentCapitulo + delta;
    if (nuevoCap > 0 && nuevoCap <= totalCaps) {
        abrirLibroPrincipal(currentLibroNombre, nuevoCap);
    } else {
        if (nuevoCap <= 0) mostrarToast('⚠️ Este es el primer capítulo del libro.');
        if (nuevoCap > totalCaps) mostrarToast('⚠️ Has llegado al último capítulo.');
    }
}

window.abrirSelectorRapidoLibros = function () {
    const card = document.getElementById('context-card');
    const body = document.getElementById('context-body');
    const title = document.getElementById('context-ref');
    title.innerText = "SELECCIONAR LIBRO";
    document.getElementById('note-edit-area').style.display = 'none';
    card.classList.add('active');

    // Mini-buscador integrado + lista AT/NT
    body.innerHTML = `
        <div style="margin-bottom:10px">
            <input id="lect-busq-libro" type="text" placeholder="🔍 Buscar libro..."
                oninput="filtrarLibrosLector(this.value)"
                autocomplete="off"
                style="width:100%;padding:10px 14px;background:rgba(0,0,0,0.5);border:1px solid #55efc4;color:#fff;border-radius:10px;font-size:0.95rem;outline:none;box-sizing:border-box">
        </div>
        <div id="lect-resultados" style="display:none;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;max-height:120px;overflow-y:auto"></div>
        <div id="lect-lista-completa" style="max-height:38vh;overflow-y:auto;padding:2px">
            <div style="color:#55efc4;font-weight:900;font-size:0.65rem;letter-spacing:2px;padding:6px 0;border-bottom:1px solid rgba(85,239,196,0.2);margin-bottom:8px">📜 ANTIGUO TESTAMENTO</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:12px">
                ${LIBROS_AT.map(l => `<button onclick="window.abrirSelectorRapidoCaps('${l}')"
                    style="padding:8px 4px;background:rgba(85,239,196,0.06);border:1px solid rgba(85,239,196,0.25);color:#fff;border-radius:8px;font-size:0.75rem;cursor:pointer;text-align:center">${l}</button>`).join('')}
            </div>
            <div style="color:#a29bfe;font-weight:900;font-size:0.65rem;letter-spacing:2px;padding:6px 0;border-bottom:1px solid rgba(162,155,254,0.2);margin-bottom:8px">✝️ NUEVO TESTAMENTO</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px">
                ${LIBROS_NT.map(l => `<button onclick="window.abrirSelectorRapidoCaps('${l}')"
                    style="padding:8px 4px;background:rgba(162,155,254,0.06);border:1px solid rgba(162,155,254,0.25);color:#fff;border-radius:8px;font-size:0.75rem;cursor:pointer;text-align:center">${l}</button>`).join('')}
            </div>
        </div>
    `;
};

window.filtrarLibrosLector = function (texto) {
    const q = texto.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const res = document.getElementById('lect-resultados');
    const lista = document.getElementById('lect-lista-completa');
    if (!q) {
        res.style.display = 'none'; res.innerHTML = '';
        lista.style.display = 'block';
        return;
    }
    lista.style.display = 'none';
    const encontrados = TODOS_LIBROS.filter(l => l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q));
    res.style.display = 'grid';
    res.innerHTML = encontrados.length === 0
        ? `<div style="grid-column:1/-1;text-align:center;color:rgba(255,255,255,0.4);padding:12px;font-size:0.8rem">Sin resultados</div>`
        : encontrados.map(l => `<button onclick="window.abrirSelectorRapidoCaps('${l}')"
            style="padding:9px 4px;background:rgba(253,203,110,0.15);border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:700;font-size:0.8rem;cursor:pointer;border-radius:8px">${l}</button>`).join('');
};


window.abrirSelectorRapidoCaps = async function (libro) {
    const card = document.getElementById('context-card');
    const body = document.getElementById('context-body');
    const title = document.getElementById('context-ref');
    title.innerText = libro.toUpperCase();
    document.getElementById('note-edit-area').style.display = 'none';
    card.classList.add('active');
    const total = CONTEO_CAPITULOS[libro] || 1;
    // Botón ← Libros al inicio
    let html = `
        <button onclick="window.abrirSelectorRapidoLibros()" style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);color:#fff;padding:9px 14px;border-radius:12px;cursor:pointer;font-weight:700;font-size:0.82rem;margin-bottom:12px;width:100%;">
            ← Volver a Libros
        </button>
        <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:8px; max-height: 38vh; overflow-y: auto; padding: 4px;">`;
    for (let i = 1; i <= total; i++) {
        html += `<button onclick="cerrarContexto();abrirLibroPrincipal('${libro}', ${i})" style="padding:10px; background:rgba(85,239,196,0.1); border:1px solid #55efc4; color:#fff; border-radius:8px; font-weight:900; cursor:pointer">${i}</button>`;
    }
    html += `</div>`;
    body.innerHTML = html;
};

window.abrirSelectorRapidoVersos = function () {
    const card = document.getElementById('context-card');
    const body = document.getElementById('context-body');
    const title = document.getElementById('context-ref');
    title.innerText = "IR A VERSÍCULO";
    document.getElementById('note-edit-area').style.display = 'none';
    card.classList.add('active');
    if (!window.currentChapterVerses) return;
    // Botón ← Capítulos al inicio
    let html = `
        <button onclick="window.abrirSelectorRapidoCaps(window.currentLibroNombre)" style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);color:#fff;padding:9px 14px;border-radius:12px;cursor:pointer;font-weight:700;font-size:0.82rem;margin-bottom:12px;width:100%;">
            ← Volver a Capítulos
        </button>
        <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:8px; max-height: 38vh; overflow-y: auto; padding: 4px;">`;
    window.currentChapterVerses.forEach(v => {
        html += `<button onclick="irAVersiculoRapido(${v.number})" style="padding:10px; background:rgba(85,239,196,0.1); border:1px solid #55efc4; color:#fff; border-radius:8px; font-weight:900; cursor:pointer">${v.number}</button>`;
    });
    html += `</div>`;
    body.innerHTML = html;
};

window.irAVersiculoRapido = function (num) {
    cerrarContexto();
    const el = document.getElementById(`vblock-${num}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.querySelectorAll('.verse-focus-highlight').forEach(x => x.classList.remove('verse-focus-highlight'));
        el.classList.add('verse-focus-highlight');
        setTimeout(() => el.classList.remove('verse-focus-highlight'), 4000);
    }
};

function mostrarContextoGlobal(ref, num, texto) {
    document.querySelectorAll('.verse-focus-highlight').forEach(el => el.classList.remove('verse-focus-highlight'));
    document.getElementById(`vblock-${num}`)?.classList.add('verse-focus-highlight');
    const card = document.getElementById('context-card');
    const fullRef = `${ref}:${num}`;
    document.getElementById('context-ref').innerText = `${fullRef}`;

    // Verificar si ya es favorito
    const favs = JSON.parse(localStorage.getItem('legado_favoritos_biblia') || '[]');
    const esFav = favs.some(f => f.ref === fullRef);
    const iconFav = esFav ? '⭐' : '☆';
    const txtFav = esFav ? 'GUARDADO' : 'FAVORITO';
    const colorFav = esFav ? '#fdcb6e' : 'rgba(253,203,110,0.6)';

    document.getElementById('context-body').innerHTML = `
        <p style="font-style:italic; line-height:1.6; font-size:1.15rem; color:#fff">"${texto}"</p>
        
        <!-- ACCIONES RÁPIDAS -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:15px;">
            <button onclick="compartirVersiculo('${fullRef.replace(/'/g, "\\'")}', \`${texto.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`)" style="padding:12px 8px;background:rgba(108,92,231,0.15);border:1px solid rgba(162,155,254,0.4);color:#a29bfe;border-radius:12px;cursor:pointer;font-weight:900;font-size:0.7rem;display:flex;flex-direction:column;align-items:center;gap:4px;">
                <span style="font-size:1.2rem">📤</span>COMPARTIR
            </button>
            <button onclick="toggleFavoritoVersiculo('${fullRef.replace(/'/g, "\\'")}', \`${texto.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`)" style="padding:12px 8px;background:rgba(253,203,110,0.1);border:1px solid ${colorFav}50;color:${colorFav};border-radius:12px;cursor:pointer;font-weight:900;font-size:0.7rem;display:flex;flex-direction:column;align-items:center;gap:4px;" id="btn-fav-contexto">
                <span style="font-size:1.2rem">${iconFav}</span>${txtFav}
            </button>
            <button onclick="copiarVersiculo('${fullRef.replace(/'/g, "\\'")}', \`${texto.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`)" style="padding:12px 8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.3);color:rgba(85,239,196,0.7);border-radius:12px;cursor:pointer;font-weight:900;font-size:0.7rem;display:flex;flex-direction:column;align-items:center;gap:4px;">
                <span style="font-size:1.2rem">📋</span>COPIAR
            </button>
        </div>

        <button onclick="window.abrirCbaActual(${num})" style="margin-top:10px; background:rgba(255,165,2,0.2); border:1px solid #ffa502; color:#ffa502; width:100%; padding:12px; border-radius:12px; cursor:pointer; font-weight:900; letter-spacing:1px; display:flex; align-items:center; justify-content:center; gap:10px;">
            <span>📖</span> VER COMENTARIO CBA v${num}
        </button>
    `;

    document.getElementById('personal-note').value = localStorage.getItem(`nota_${fullRef}`) || "";
    document.getElementById('note-edit-area').style.display = 'block';
    card.dataset.currentKey = fullRef;
    card.classList.add('active');
}

function guardarNotaGlobal() {
    const card = document.getElementById('context-card');
    const key = card.dataset.currentKey;
    const note = document.getElementById('personal-note').value;
    if (key) {
        localStorage.setItem(`nota_${key}`, note);
        const vNum = key.split(':')[1];
        const vBlock = document.getElementById(`vblock-${vNum}`);
        if (vBlock) note.trim() !== '' ? vBlock.classList.add('verse-has-note') : vBlock.classList.remove('verse-has-note');
        const ind = document.getElementById(`note-indicator-${vNum}`);
        if (ind) ind.innerText = note.trim() !== '' ? '📝' : '';
        mostrarToast("✅ Nota Guardada");
        setTimeout(() => cerrarContexto(), 400);
    }
}

function normalizarLibro(l) {
    const sinAcentos = l.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const m = { "1 Samuel": "1-samuel", "2 Samuel": "2-samuel", "1 Reyes": "1-reyes", "2 Reyes": "2-reyes", "1 Cronicas": "1-cronicas", "2 Cronicas": "2-cronicas", "1 Tesalonicenses": "1-tesalonicenses", "2 Tesalonicenses": "2-tesalonicenses", "1 Timoteo": "1-timoteo", "2 Timoteo": "2-timoteo", "1 Pedro": "1-pedro", "2 Pedro": "2-pedro", "1 Juan": "1-juan", "2 Juan": "2-juan", "3 Juan": "3-juan" };
    return m[sinAcentos] || sinAcentos.toLowerCase().replace(/\s+/g, '-');
}

function formatearTextoEspecial(t) { return t.replace(/(Jehová|Dios|Jesús|Cristo|Espíritu|Padre)/g, '<strong>$1</strong>'); }

function mostrarToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed; bottom:110px; left:50%; transform:translateX(-50%); background:rgba(30,41,59,0.95); color:#fff; padding:15px 30px; border-radius:15px; font-weight:900; z-index:100000; border:1px solid #55efc4; box-shadow:0 10px 40px rgba(0,0,0,0.5); pointer-events:none;';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

function cerrarContexto() { document.querySelectorAll('#context-card, .context-card').forEach(el => el.classList.remove('active')); }

function inyectarEstilosLecturaGlobal() {
    if (document.getElementById('motor-bibli-styles-v90')) return;
    const s = document.createElement('style');
    s.id = 'motor-bibli-styles-v90';
    s.innerHTML = `
        .floating-nav-panel { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; background: rgba(5, 10, 20, 0.95) !important; backdrop-filter: blur(25px) !important; padding: 8px 10px 8px !important; z-index: 9999999 !important; border-bottom: 3px solid #55efc4 !important; box-shadow: 0 0 30px rgba(85, 239, 196, 0.6) !important; border-radius: 0 0 28px 28px !important; animation: slideDown 0.5s ease-out; box-sizing: border-box !important; transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease !important; }
        .floating-nav-panel.nav-oculta { transform: translateY(-110%) !important; opacity: 0 !important; pointer-events: none !important; }
        .btn-mostrar-nav { position: fixed !important; top: 6px !important; right: 10px !important; z-index: 10000000 !important; padding: 8px 12px !important; background: rgba(85,239,196,0.9) !important; border: none !important; border-radius: 20px !important; color: #000 !important; font-weight: 900 !important; font-size: 0.75rem !important; cursor: pointer !important; display: none !important; box-shadow: 0 4px 15px rgba(85,239,196,0.5) !important; }
        .btn-mostrar-nav.visible { display: block !important; animation: fadeIn 0.3s ease; }
        .nav-brand-area { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .btn-home-back { background: rgba(255,255,255,0.15); border: 2px solid rgba(85, 239, 196, 0.3); font-size: 1.2rem; width: 40px; height: 40px; border-radius: 50%; color: #55efc4; cursor: pointer; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 10px rgba(85, 239, 196, 0.2); flex-shrink: 0; }
        .current-ref-text { color: #fff; font-weight: 900; font-size: 1rem; letter-spacing: 1px; text-transform: uppercase; text-shadow: 0 0 10px rgba(255,255,255,0.3); min-width: 0; }
        .nav-arrows { display: flex; gap: 12px; }
        .btn-arrow { width: 36px !important; height: 36px !important; background: rgba(85,239,196,0.1); color: #55efc4; border: 2px solid #55efc4 !important; border-radius: 50%; font-weight: 900; cursor:pointer; box-shadow: 0 0 15px rgba(85, 239, 196, 0.4); flex-shrink: 0; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 1.3rem !important; padding: 0 !important; }
        .btn-font { background: rgba(255,255,255,0.15); border: 1px solid #55efc4; color: #fff; padding: 5px 9px; border-radius: 10px; font-weight: 900; font-size: 0.75rem; cursor: pointer; }
        .nav-bottom-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; width: 100%; box-sizing: border-box; }
        .btn-nav-dynamic { background: #ffffff !important; border: none !important; color: #000 !important; padding: 10px 4px !important; border-radius: 14px !important; font-weight: 900 !important; font-size: 0.75rem !important; cursor: pointer !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 3px !important; box-shadow: 0 0 15px rgba(255,255,255,0.4), 0 0 8px rgba(85,239,196,0.3) !important; transition: 0.25s ease !important; width: 100% !important; box-sizing: border-box !important; min-width: 0 !important; overflow: hidden !important; }
        .btn-nav-dynamic:active { transform: scale(0.9) !important; background: #55efc4 !important; }
        .nav-btn-icon { font-size: 1.1rem; line-height: 1; display: block; }
        .nav-btn-label { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.5px; display: block; white-space: nowrap; }
        .btn-cba-pulsar { animation: cba-pulse 2.5s infinite !important; box-shadow: 0 0 18px rgba(255, 165, 2, 0.5) !important; border: 2px solid #ffa502 !important; background: rgba(255,165,2,0.12) !important; color: #ffa502 !important; }
        .btn-cba-pulsar .nav-btn-label { color: #ffa502 !important; }
        .verse-block { padding: 18px; border-radius: 20px; transition: 0.25s ease; margin-bottom: 18px; border: 1px solid transparent; touch-action: manipulation; }
        .verse-tap1 { background: rgba(85, 239, 196, 0.12) !important; border: 2px solid rgba(85,239,196,0.55) !important; box-shadow: 0 0 18px rgba(85,239,196,0.15) !important; }
        .verse-focus-highlight { background: rgba(85, 239, 196, 0.25) !important; border: 2.5px solid #55efc4 !important; box-shadow: 0 0 30px rgba(85,239,196,0.3); }
        .verse-has-note { background: rgba(254, 202, 87, 0.08) !important; border-left: 6px solid #feca57 !important; }
        .context-card { position: fixed; bottom: -100%; left: 50%; transform: translateX(-50%); width: 95%; max-width: 580px; background: #0f172a; border: 1.5px solid rgba(85, 239, 196, 0.3); border-radius: 35px 35px 0 0; padding: 30px 30px 60px; z-index: 10000000 !important; transition: bottom 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 -20px 60px rgba(0,0,0,0.8); }
        .context-card.active { bottom: 0; }
        .loader-spinner { width: 50px; height: 50px; border: 6px solid rgba(85, 239, 196, 0.1); border-top-color: #55efc4; border-radius: 50%; animation: spin 0.8s infinite linear; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes cba-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.04); } 100% { transform: scale(1); } }
    `;
    document.head.appendChild(s);

    // Marcar body como lector activo (oculta el widget inferior derecho)
    document.body.classList.add('lector-biblico-activo');

    // Panel flotante arrastrable: toggle barra + lupita buscador
    // SIN auto-scroll — el usuario controla manualmente
    setTimeout(function() {
        var navOculta = false;

        // ── Contenedor arrastrable ──
        var panel = document.createElement('div');
        panel.id = 'panel-lector-ctrl';
        panel.style.cssText = 'position:fixed;bottom:18px;right:14px;z-index:10000000;display:flex;gap:6px;align-items:center;';

        // ── Boton toggle barra (OCULTAR / MOSTRAR) ──
        var btnToggle = document.createElement('button');
        btnToggle.style.cssText = 'padding:10px 13px;background:rgba(85,239,196,0.92);border:none;border-radius:22px;color:#000;font-weight:900;font-size:0.72rem;cursor:pointer;box-shadow:0 4px 18px rgba(85,239,196,0.4);white-space:nowrap;';
        btnToggle.innerHTML = '\u2191 OCULTAR BARRA';
        btnToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var nav = document.getElementById('floating-bible-nav');
            if (!nav) return;
            if (navOculta) {
                nav.classList.remove('nav-oculta');
                btnToggle.innerHTML = '\u2191 OCULTAR BARRA';
                btnToggle.style.background = 'rgba(85,239,196,0.92)';
                navOculta = false;
            } else {
                nav.classList.add('nav-oculta');
                btnToggle.innerHTML = '\u2193 MOSTRAR BARRA';
                btnToggle.style.background = 'rgba(253,203,110,0.92)';
                navOculta = true;
            }
        });

        // ── Boton lupita — volver al buscador ──
        var btnLupa = document.createElement('button');
        btnLupa.style.cssText = 'width:40px;height:40px;background:rgba(162,155,254,0.92);border:none;border-radius:50%;color:#000;font-size:1.1rem;cursor:pointer;box-shadow:0 4px 18px rgba(162,155,254,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;';
        btnLupa.innerHTML = '\uD83D\uDD0D';
        btnLupa.title = 'Buscador rapido';
        btnLupa.addEventListener('click', function(e) {
            e.stopPropagation();
            if (typeof abrirSelectorBiblias === 'function') abrirSelectorBiblias();
        });

        panel.appendChild(btnToggle);
        panel.appendChild(btnLupa);
        document.body.appendChild(panel);

        // ── Hacer el panel arrastrable con touch ──
        var arrastre = false, ox, oy, or_, ob_;
        panel.addEventListener('touchstart', function(e) {
            if (e.target !== panel) return; // solo arrastra el div, no los botones
            arrastre = true;
            ox = e.touches[0].clientX; oy = e.touches[0].clientY;
            or_ = parseInt(panel.style.right) || 14;
            ob_ = parseInt(panel.style.bottom) || 18;
        }, { passive: true });
        panel.addEventListener('touchmove', function(e) {
            if (!arrastre) return;
            var dx = e.touches[0].clientX - ox, dy = e.touches[0].clientY - oy;
            panel.style.right = Math.max(4, Math.min(window.innerWidth - 160, or_ - dx)) + 'px';
            panel.style.bottom = Math.max(4, Math.min(window.innerHeight - 60, ob_ - dy)) + 'px';
        }, { passive: true });
        panel.addEventListener('touchend', function() { arrastre = false; });

        // ── Limpiar al salir del lector ──
        window._limpiarBarraLector = function() {
            document.body.classList.remove('lector-biblico-activo');
            var p = document.getElementById('panel-lector-ctrl');
            if (p) p.remove();
        };
    }, 400);


}

// ===============================================
// 🤝 VERSÍCULOS DE ALIENTO — Kit Pastoral
// ===============================================
const VERSICULOS_ALIENTO = [
    {
        cat: '😢 Duelo', desc: 'Pérdida de un ser querido', versos: [
            { ref: 'Salmos 34:18', texto: 'Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.' },
            { ref: 'Apocalipsis 21:4', texto: 'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.' },
            { ref: '1 Tesalonicenses 4:13', texto: 'No queremos que ignoréis acerca de los que duermen, para que no os entristezcáis como los otros que no tienen esperanza.' },
            { ref: 'Juan 11:25', texto: 'Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.' },
            { ref: 'Salmos 23:4', texto: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.' }
        ]
    },
    {
        cat: '🏥 Enfermedad', desc: 'Para el que está enfermo', versos: [
            { ref: 'Isaías 41:10', texto: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.' },
            { ref: 'Salmos 103:3', texto: 'Él es quien perdona todas tus iniquidades, el que sana todas tus dolencias.' },
            { ref: 'Santiago 5:15', texto: 'Y la oración de fe salvará al enfermo, y el Señor lo levantará.' },
            { ref: 'Jeremías 30:17', texto: 'Mas yo haré venir sanidad para ti, y sanaré tus heridas, dice Jehová.' },
            { ref: 'Salmos 41:3', texto: 'Jehová lo sustentará sobre el lecho del dolor; ablandará toda su cama en la enfermedad.' }
        ]
    },
    {
        cat: '😞 Depresión', desc: 'Para el deprimido', versos: [
            { ref: 'Salmos 42:11', texto: '¿Por qué te abates, oh alma mía? Espera en Dios; porque aún he de alabarle, salvación mía y Dios mío.' },
            { ref: 'Mateo 11:28', texto: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.' },
            { ref: 'Isaías 40:31', texto: 'Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.' },
            { ref: 'Filipenses 4:13', texto: 'Todo lo puedo en Cristo que me fortalece.' },
            { ref: 'Salmos 34:17', texto: 'Claman los justos, y Jehová oye, y los libra de todas sus angustias.' }
        ]
    },
    {
        cat: '💔 Matrimonio', desc: 'Problemas de pareja', versos: [
            { ref: '1 Corintios 13:4', texto: 'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.' },
            { ref: 'Efesios 5:25', texto: 'Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella.' },
            { ref: 'Mateo 19:6', texto: 'Lo que Dios juntó, no lo separe el hombre.' },
            { ref: 'Colosenses 3:14', texto: 'Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.' },
            { ref: 'Proverbios 18:22', texto: 'El que halla esposa halla el bien, y alcanza la benevolencia de Jehová.' }
        ]
    },
    {
        cat: '👨‍👩‍👧 Hijos', desc: 'Problemas con los hijos', versos: [
            { ref: 'Proverbios 22:6', texto: 'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.' },
            { ref: 'Isaías 54:13', texto: 'Y todos tus hijos serán enseñados por Jehová; y se multiplicará la paz de tus hijos.' },
            { ref: 'Salmos 127:3', texto: 'He aquí, herencia de Jehová son los hijos; cosa de estima el fruto del vientre.' },
            { ref: 'Efesios 6:4', texto: 'Padres, no provoquéis a ira a vuestros hijos, sino criadlos en disciplina y amonestación del Señor.' },
            { ref: 'Proverbios 29:17', texto: 'Corrige a tu hijo, y te dará descanso, y dará alegría a tu alma.' }
        ]
    },
    {
        cat: '👵 Familia', desc: 'Problemas familiares', versos: [
            { ref: 'Josué 24:15', texto: 'Yo y mi casa serviremos a Jehová.' },
            { ref: 'Salmos 133:1', texto: '¡Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía!' },
            { ref: 'Colosenses 3:13', texto: 'Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja.' },
            { ref: 'Proverbios 17:17', texto: 'En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia.' },
            { ref: 'Efesios 4:32', texto: 'Sed benignos unos con otros, misericordiosos, perdonándoos unos a otros.' }
        ]
    },
    {
        cat: '💼 Desempleo', desc: 'Sin trabajo', versos: [
            { ref: 'Filipenses 4:19', texto: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.' },
            { ref: 'Mateo 6:33', texto: 'Buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.' },
            { ref: 'Salmos 37:25', texto: 'Joven fui, y he envejecido, y no he visto justo desamparado, ni su descendencia que mendigue pan.' },
            { ref: 'Proverbios 16:3', texto: 'Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.' },
            { ref: 'Jeremías 29:11', texto: 'Porque yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz, y no de mal.' }
        ]
    },
    {
        cat: '😰 Estrés', desc: 'Ansiedad y preocupación', versos: [
            { ref: 'Filipenses 4:6', texto: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego.' },
            { ref: '1 Pedro 5:7', texto: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.' },
            { ref: 'Mateo 6:34', texto: 'No os afanéis por el día de mañana, porque el día de mañana traerá su afán.' },
            { ref: 'Isaías 26:3', texto: 'Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.' },
            { ref: 'Salmos 55:22', texto: 'Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo.' }
        ]
    },
    {
        cat: '⛓️ Prisión', desc: 'En la cárcel', versos: [
            { ref: 'Isaías 61:1', texto: 'Me ha enviado a proclamar libertad a los cautivos, y a los presos apertura de la cárcel.' },
            { ref: 'Juan 8:36', texto: 'Si el Hijo os libertare, seréis verdaderamente libres.' },
            { ref: 'Salmos 146:7', texto: 'Jehová pone en libertad a los aprisionados.' },
            { ref: 'Salmos 107:14', texto: 'Los sacó de las tinieblas y de la sombra de muerte, y rompió sus prisiones.' },
            { ref: 'Romanos 8:1', texto: 'Ninguna condenación hay para los que están en Cristo Jesús.' }
        ]
    },
    {
        cat: '🚪 Alejado de Dios', desc: 'Para el que dejó la iglesia', versos: [
            { ref: 'Apocalipsis 3:20', texto: 'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él.' },
            { ref: 'Lucas 15:20', texto: 'Y levantándose, vino a su padre. Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia.' },
            { ref: 'Santiago 4:8', texto: 'Acercaos a Dios, y él se acercará a vosotros.' },
            { ref: 'Jeremías 29:13', texto: 'Me buscaréis y me hallaréis, porque me buscaréis de todo vuestro corazón.' },
            { ref: 'Isaías 1:18', texto: 'Si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos.' }
        ]
    },
    {
        cat: '❌ Pérdida de fe', desc: 'Ha perdido su fe', versos: [
            { ref: 'Hebreos 11:1', texto: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.' },
            { ref: 'Marcos 9:24', texto: 'Creo; ayuda mi incredulidad.' },
            { ref: 'Romanos 10:17', texto: 'La fe es por el oír, y el oír, por la palabra de Dios.' },
            { ref: '2 Corintios 5:7', texto: 'Porque por fe andamos, no por vista.' },
            { ref: 'Hebreos 12:2', texto: 'Puestos los ojos en Jesús, el autor y consumador de la fe.' }
        ]
    },
    {
        cat: '💀 Al borde de la muerte', desc: 'Para el moribundo', versos: [
            { ref: 'Juan 14:1', texto: 'No se turbe vuestro corazón; creéis en Dios, creed también en mí. En la casa de mi Padre muchas moradas hay.' },
            { ref: 'Romanos 8:38', texto: 'Ni la muerte, ni la vida podrá separarnos del amor de Dios.' },
            { ref: 'Filipenses 1:21', texto: 'Porque para mí el vivir es Cristo, y el morir es ganancia.' },
            { ref: '2 Corintios 5:8', texto: 'Más quisiéramos estar ausentes del cuerpo, y presentes al Señor.' },
            { ref: '1 Corintios 15:55', texto: '¿Dónde está, oh muerte, tu aguijón? ¿Dónde, oh sepulcro, tu victoria?' }
        ]
    },
    {
        cat: '💸 Necesidad económica', desc: 'Sin dinero', versos: [
            { ref: 'Filipenses 4:19', texto: 'Mi Dios suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.' },
            { ref: 'Malaquías 3:10', texto: 'Probadme ahora en esto, y veréis si no os abro las ventanas de los cielos y derramo sobre vosotros bendición.' },
            { ref: 'Deuteronomio 28:12', texto: 'Jehová te abrirá su buen tesoro, el cielo, para enviar la lluvia a tu tierra en su tiempo.' },
            { ref: 'Salmos 37:25', texto: 'No he visto justo desamparado, ni su descendencia que mendigue pan.' },
            { ref: 'Mateo 6:31', texto: 'No os afanéis, diciendo: ¿Qué comeremos? Porque vuestro Padre celestial sabe que tenéis necesidad.' }
        ]
    },
    {
        cat: '🌟 Éxito y riqueza', desc: 'Para el próspero', versos: [
            { ref: 'Deuteronomio 8:18', texto: 'Acuérdate de Jehová tu Dios, porque él te da el poder para hacer las riquezas.' },
            { ref: '1 Timoteo 6:17', texto: 'A los ricos manda que no sean altivos, ni pongan la esperanza en las riquezas.' },
            { ref: 'Proverbios 11:28', texto: 'El que confía en sus riquezas caerá; mas los justos reverdecerán como ramas.' },
            { ref: 'Lucas 12:15', texto: 'La vida del hombre no consiste en la abundancia de los bienes que posee.' },
            { ref: 'Mateo 6:19', texto: 'No os hagáis tesoros en la tierra; sino haceos tesoros en el cielo.' }
        ]
    },
    {
        cat: '😊 Alegría', desc: 'Para celebrar y agradecer', versos: [
            { ref: 'Salmos 118:24', texto: 'Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.' },
            { ref: 'Filipenses 4:4', texto: 'Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!' },
            { ref: 'Nehemías 8:10', texto: 'No os entristezcáis, porque el gozo de Jehová es vuestra fuerza.' },
            { ref: 'Salmos 100:1', texto: 'Cantad alegres a Dios, habitantes de toda la tierra.' },
            { ref: 'Santiago 1:17', texto: 'Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces.' }
        ]
    },
    {
        cat: '😔 Soledad', desc: 'Para el que se siente solo', versos: [
            { ref: 'Deuteronomio 31:6', texto: 'No temas ni te espantes, porque Jehová tu Dios es el que va contigo; no te dejará, ni te desamparará.' },
            { ref: 'Mateo 28:20', texto: 'He aquí yo estoy con vosotros todos los días, hasta el fin del mundo.' },
            { ref: 'Salmos 68:6', texto: 'Dios hace habitar en familia a los desamparados.' },
            { ref: 'Hebreos 13:5', texto: 'No te desampararé, ni te dejaré.' },
            { ref: 'Isaías 49:15', texto: '¿Se olvidará la mujer de su niño? Aunque olvide ella, yo nunca me olvidaré de ti.' }
        ]
    },
    {
        cat: '🙏 Perdón', desc: 'Para el arrepentido', versos: [
            { ref: '1 Juan 1:9', texto: 'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados y limpiarnos de toda maldad.' },
            { ref: 'Salmos 103:12', texto: 'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.' },
            { ref: 'Isaías 43:25', texto: 'Yo, yo soy el que borro tus rebeliones por amor de mí mismo, y no me acordaré de tus pecados.' },
            { ref: 'Miqueas 7:19', texto: 'Él volverá a tener misericordia de nosotros; sepultará nuestras iniquidades.' },
            { ref: 'Mateo 6:14', texto: 'Si perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial.' }
        ]
    },
    {
        cat: '🏚️ Pérdida material', desc: 'Pérdida de bienes, robo, incendio', versos: [
            { ref: 'Job 1:21', texto: 'Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito.' },
            { ref: 'Mateo 6:19', texto: 'No os hagáis tesoros en la tierra; sino haceos tesoros en el cielo, donde ni la polilla ni el orín corrompen.' },
            { ref: 'Filipenses 4:12', texto: 'Sé vivir humildemente, y sé tener abundancia; en todo y por todo estoy enseñado.' },
            { ref: 'Habacuc 3:17', texto: 'Aunque la higuera no florezca, ni en las vides haya frutos, con todo, yo me alegraré en Jehová.' },
            { ref: '2 Corintios 4:18', texto: 'Las cosas que se ven son temporales, pero las que no se ven son eternas.' }
        ]
    },
    {
        cat: '🌊 Desastres naturales', desc: 'Terremotos, huracanes, inundaciones', versos: [
            { ref: 'Salmos 46:1', texto: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.' },
            { ref: 'Isaías 43:2', texto: 'Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te anegarán.' },
            { ref: 'Nahúm 1:7', texto: 'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.' },
            { ref: 'Salmos 91:1', texto: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.' },
            { ref: 'Romanos 8:28', texto: 'A los que aman a Dios, todas las cosas les ayudan a bien.' }
        ]
    },
    {
        cat: '⚔️ Persecución', desc: 'Perseguido por su fe', versos: [
            { ref: 'Mateo 5:10', texto: 'Bienaventurados los que padecen persecución por causa de la justicia, porque de ellos es el reino de los cielos.' },
            { ref: '2 Timoteo 3:12', texto: 'Todos los que quieren vivir piadosamente en Cristo Jesús padecerán persecución.' },
            { ref: 'Romanos 8:35', texto: '¿Quién nos separará del amor de Cristo? ¿Tribulación, angustia, persecución, hambre, peligro, espada?' },
            { ref: '1 Pedro 4:14', texto: 'Si sois vituperados por el nombre de Cristo, sois bienaventurados.' },
            { ref: 'Juan 16:33', texto: 'En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.' }
        ]
    }
];

function renderModoAliento(root) {
    let html = `
        <div style="text-align:center;margin-bottom:18px;">
            <div style="font-size:1.8rem;margin-bottom:6px;">🤝</div>
            <div style="color:#ff9f43;font-weight:900;font-size:0.9rem;letter-spacing:2px;">VERSÍCULOS DE ALIENTO</div>
            <div style="color:rgba(255,255,255,0.4);font-size:0.7rem;margin-top:4px;">Toca una situación para ver versículos</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;

    VERSICULOS_ALIENTO.forEach((cat, i) => {
        const colores = ['#e74c3c', '#55efc4', '#a29bfe', '#fd79a8', '#fdcb6e', '#74b9ff', '#ff9f43', '#00cec9', '#6c5ce7', '#e17055', '#fab1a0', '#ffeaa7', '#00b894', '#ff6b6b', '#81ecec', '#dfe6e9', '#0984e3'];
        const c = colores[i % colores.length];
        html += `
            <button onclick="mostrarCategAliento(${i})" style="padding:14px 10px;background:rgba(${hexToRgb(c)},0.08);border:1.5px solid ${c}40;border-radius:14px;cursor:pointer;text-align:left;transition:all 0.15s;">
                <div style="font-size:1.1rem;margin-bottom:4px;">${cat.cat.split(' ')[0]}</div>
                <div style="color:${c};font-weight:900;font-size:0.72rem;">${cat.cat.split(' ').slice(1).join(' ')}</div>
                <div style="color:rgba(255,255,255,0.35);font-size:0.6rem;margin-top:2px;">${cat.desc}</div>
            </button>`;
    });

    html += `</div>`;
    root.innerHTML = html;
}

function mostrarCategAliento(idx) {
    const cat = VERSICULOS_ALIENTO[idx];
    const root = document.getElementById('libros-dinamicos-root');
    if (!root) return;
    window._alientoIdx = idx;

    let html = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
            <button onclick="cambiarModoSelectorBiblia('aliento')" style="background:rgba(255,255,255,0.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-weight:900;cursor:pointer;font-size:1rem;">←</button>
            <div>
                <div style="font-size:1.3rem;display:inline;">${cat.cat.split(' ')[0]}</div>
                <span style="color:#ff9f43;font-weight:900;font-size:1rem;margin-left:6px;">${cat.cat.split(' ').slice(1).join(' ')}</span>
                <div style="color:rgba(255,255,255,0.4);font-size:0.7rem;margin-top:2px;">${cat.desc} — Marca los que quieras enviar</div>
            </div>
        </div>
        <div style="display:flex;gap:6px;margin-bottom:16px;">
            <button onclick="compartirCatAliento(${idx})" style="flex:1;padding:10px;background:rgba(108,92,231,0.12);border:1px solid rgba(162,155,254,0.4);color:#a29bfe;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;">📤 ENVIAR TODOS</button>
            <button id="btn-enviar-marcados" onclick="compartirMarcadosAliento(${idx})" style="flex:1;padding:10px;background:rgba(85,239,196,0.12);border:1px solid rgba(85,239,196,0.4);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;opacity:0.4;" disabled>✅ ENVIAR MARCADOS (0)</button>
        </div>`;

    cat.versos.forEach((v, vi) => {
        const p = parsearCitaRapida(v.ref);
        html += `
        <div id="aliento-card-${vi}" style="background:rgba(255,159,67,0.05);border:1px solid rgba(255,159,67,0.2);border-radius:14px;padding:14px;margin-bottom:10px;transition:all 0.2s;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <input type="checkbox" id="aliento-chk-${vi}" onchange="actualizarMarcadosAliento()" style="width:20px;height:20px;accent-color:#ff9f43;cursor:pointer;flex-shrink:0;">
                <div style="color:#ff9f43;font-weight:900;font-size:0.85rem;">📖 ${v.ref}</div>
            </div>
            <div style="color:rgba(255,255,255,0.8);font-size:0.88rem;font-style:italic;line-height:1.6;margin-bottom:10px;">"${v.texto}"</div>
            <div style="display:flex;gap:6px;">
                ${p ? `<button onclick="abrirLibroPrincipal('${p.libro}', ${p.cap}, ${p.vers || 1})" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">📖 LEER</button>` : ''}
                <button onclick="compartirVersiculo('${v.ref}', '${v.texto.replace(/'/g, "\\'")}')" style="flex:1;padding:8px;background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.3);color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">📤 ENVIAR</button>
            </div>
        </div>`;
    });

    root.innerHTML = html;
    window.scrollTo(0, 0);
}

function actualizarMarcadosAliento() {
    const cat = VERSICULOS_ALIENTO[window._alientoIdx];
    let count = 0;
    cat.versos.forEach((v, vi) => {
        const chk = document.getElementById('aliento-chk-' + vi);
        const card = document.getElementById('aliento-card-' + vi);
        if (chk && chk.checked) {
            count++;
            if (card) { card.style.borderColor = '#ff9f43'; card.style.background = 'rgba(255,159,67,0.12)'; }
        } else {
            if (card) { card.style.borderColor = 'rgba(255,159,67,0.2)'; card.style.background = 'rgba(255,159,67,0.05)'; }
        }
    });
    const btn = document.getElementById('btn-enviar-marcados');
    if (btn) {
        btn.textContent = `✅ ENVIAR MARCADOS (${count})`;
        btn.disabled = count === 0;
        btn.style.opacity = count > 0 ? '1' : '0.4';
    }
}

function compartirMarcadosAliento(idx) {
    const cat = VERSICULOS_ALIENTO[idx];
    const seleccionados = [];
    cat.versos.forEach((v, vi) => {
        const chk = document.getElementById('aliento-chk-' + vi);
        if (chk && chk.checked) seleccionados.push(v);
    });
    if (seleccionados.length === 0) { mostrarToast('⚠️ Marca al menos un versículo'); return; }

    let msg = `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `  ${cat.cat}\n`;
    msg += `  ${cat.desc}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    seleccionados.forEach(v => {
        msg += `📖 *${v.ref}*\n`;
        msg += `"${v.texto}"\n\n`;
    });
    msg += `─────────────────────\n`;
    msg += `📱 _Legado Bíblico App_`;
    if (navigator.share) {
        navigator.share({ title: cat.cat, text: msg }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(msg).then(() => mostrarToast('✅ Versículos copiados'));
    }
}

function compartirCatAliento(idx) {
    const cat = VERSICULOS_ALIENTO[idx];
    let msg = `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `  ${cat.cat}\n`;
    msg += `  ${cat.desc}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    cat.versos.forEach(v => {
        msg += `📖 *${v.ref}*\n`;
        msg += `"${v.texto}"\n\n`;
    });
    msg += `─────────────────────\n`;
    msg += `📱 _Legado Bíblico App_`;
    if (navigator.share) {
        navigator.share({ title: cat.cat, text: msg }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(msg).then(() => mostrarToast('✅ Versículos copiados'));
    }
}
function renderModoFavoritos(root) {
    const favs = JSON.parse(localStorage.getItem('legado_favoritos_biblia') || '[]');

    if (favs.length === 0) {
        root.innerHTML = `
            <div style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:15px;">⭐</div>
                <div style="color:#fdcb6e;font-weight:900;font-size:1rem;margin-bottom:8px;">Sin favoritos aún</div>
                <div style="color:rgba(255,255,255,0.4);font-size:0.8rem;line-height:1.6;">Abre cualquier libro, toca dos veces un versículo y usa el botón ⭐ FAVORITO para guardarlo aquí.</div>
            </div>`;
        return;
    }

    let html = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="color:#fdcb6e;font-weight:900;font-size:0.75rem;letter-spacing:2px;">⭐ ${favs.length} VERSÍCULO${favs.length > 1 ? 'S' : ''} GUARDADO${favs.length > 1 ? 'S' : ''}</div>
            <button onclick="compartirTodosFavoritos()" style="padding:6px 12px;background:rgba(108,92,231,0.15);border:1px solid rgba(162,155,254,0.4);color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">📤 COMPARTIR TODOS</button>
        </div>`;

    favs.forEach((fav, i) => {
        const textoCorto = fav.texto.length > 120 ? fav.texto.substring(0, 120) + '...' : fav.texto;
        const partes = fav.ref.split(':');
        const refPartes = partes[0].split(' ');
        const cap = refPartes.pop();
        const libro = refPartes.join(' ');
        const vers = partes[1];

        html += `
        <div style="background:rgba(253,203,110,0.06);border:1px solid rgba(253,203,110,0.2);border-radius:14px;padding:14px;margin-bottom:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <div style="color:#fdcb6e;font-weight:900;font-size:0.85rem;">📖 ${fav.ref}</div>
                <button onclick="eliminarFavorito(${i})" style="background:none;border:none;color:rgba(255,100,100,0.5);font-size:0.8rem;cursor:pointer;padding:4px;">🗑️</button>
            </div>
            <div style="color:rgba(255,255,255,0.7);font-size:0.82rem;font-style:italic;line-height:1.5;margin-bottom:10px;">"${textoCorto}"</div>
            <div style="display:flex;gap:6px;">
                <button onclick="abrirLibroPrincipal('${libro}', ${cap}, ${vers})" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">📖 IR</button>
                <button onclick="compartirVersiculo('${fav.ref.replace(/'/g, "\\'")}', '${fav.texto.replace(/'/g, "\\'").replace(/\n/g, ' ')}')" style="flex:1;padding:8px;background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.3);color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">📤 ENVIAR</button>
            </div>
        </div>`;
    });

    root.innerHTML = html;
}

function eliminarFavorito(index) {
    let favs = JSON.parse(localStorage.getItem('legado_favoritos_biblia') || '[]');
    favs.splice(index, 1);
    localStorage.setItem('legado_favoritos_biblia', JSON.stringify(favs));
    mostrarToast('🗑️ Favorito eliminado');
    const root = document.getElementById('libros-dinamicos-root');
    if (root) renderModoFavoritos(root);
}

function compartirTodosFavoritos() {
    const favs = JSON.parse(localStorage.getItem('legado_favoritos_biblia') || '[]');
    if (favs.length === 0) return;
    let msg = `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `  ⭐ *MIS VERSÍCULOS FAVORITOS*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    favs.forEach(f => {
        msg += `📖 *${f.ref}*\n`;
        msg += `"${f.texto.length > 150 ? f.texto.substring(0, 150) + '...' : f.texto}"\n\n`;
    });
    msg += `─────────────────────\n`;
    msg += `📱 _Legado Bíblico App_`;

    if (navigator.share) {
        navigator.share({ title: 'Mis Versículos Favoritos', text: msg }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(msg).then(() => mostrarToast('✅ Favoritos copiados'));
    }
}

// ===============================================
// 📤 COMPARTIR VERSÍCULO — Formato Premium
// ===============================================
function compartirVersiculo(ref, texto) {
    const msg = `━━━━━━━━━━━━━━━━━━━━━\n` +
        `     ✝️  *${ref.toUpperCase()}*\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `"${texto}"\n\n` +
        `📖 ${ref} — *RVR 1960*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `📱 _Legado Bíblico App_`;

    if (navigator.share) {
        navigator.share({ title: ref, text: msg }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(msg).then(() => {
            mostrarToast('✅ Versículo copiado');
        });
    }
}

// ===============================================
// ⭐ FAVORITOS — Guardar/Quitar versículos
// ===============================================
function toggleFavoritoVersiculo(ref, texto) {
    let favs = JSON.parse(localStorage.getItem('legado_favoritos_biblia') || '[]');
    const idx = favs.findIndex(f => f.ref === ref);
    if (idx >= 0) {
        favs.splice(idx, 1);
        localStorage.setItem('legado_favoritos_biblia', JSON.stringify(favs));
        mostrarToast('☆ Versículo removido de favoritos');
        const btn = document.getElementById('btn-fav-contexto');
        if (btn) {
            btn.innerHTML = '<span style="font-size:1.2rem">☆</span>FAVORITO';
            btn.style.color = 'rgba(253,203,110,0.6)';
        }
    } else {
        favs.unshift({ ref, texto, fecha: new Date().toISOString() });
        if (favs.length > 100) favs = favs.slice(0, 100);
        localStorage.setItem('legado_favoritos_biblia', JSON.stringify(favs));
        mostrarToast('⭐ ¡Versículo guardado en favoritos!');
        const btn = document.getElementById('btn-fav-contexto');
        if (btn) {
            btn.innerHTML = '<span style="font-size:1.2rem">⭐</span>GUARDADO';
            btn.style.color = '#fdcb6e';
            btn.style.borderColor = '#fdcb6e';
            btn.style.background = 'rgba(253,203,110,0.15)';
        }
    }
}

// ===============================================
// 📋 COPIAR VERSÍCULO
// ===============================================
function copiarVersiculo(ref, texto) {
    const msg = `"${texto}" — ${ref} (RVR 1960)`;
    navigator.clipboard?.writeText(msg).then(() => {
        mostrarToast('📋 Versículo copiado al portapapeles');
    }).catch(() => {
        mostrarToast('⚠️ No se pudo copiar');
    });
}

// ===============================================
// 🌙 MODOS DE LECTURA
// ===============================================
const TEMAS_LECTURA = [
    { nombre: 'Oscuro', icono: '🌙', bg: '#0F172A', texto: 'rgba(255,255,255,0.85)', numColor: '#55efc4', navBg: 'rgba(15,23,42,0.97)' },
    { nombre: 'Sepia', icono: '📜', bg: '#f4ecd8', texto: '#5b4636', numColor: '#8b6914', navBg: 'rgba(244,236,216,0.97)' },
    { nombre: 'Claro', icono: '☀️', bg: '#ffffff', texto: '#1a1a1a', numColor: '#2d7a4f', navBg: 'rgba(255,255,255,0.97)' }
];
let _temaActual = parseInt(localStorage.getItem('legado_tema_lectura') || '0');

function ciclarTemaLectura() {
    _temaActual = (_temaActual + 1) % TEMAS_LECTURA.length;
    localStorage.setItem('legado_tema_lectura', _temaActual);
    aplicarTemaLectura();
    mostrarToast(`${TEMAS_LECTURA[_temaActual].icono} Modo: ${TEMAS_LECTURA[_temaActual].nombre}`);
}

function aplicarTemaLectura() {
    const tema = TEMAS_LECTURA[_temaActual];
    const reader = document.getElementById('reader-container');
    const nav = document.getElementById('floating-bible-nav');
    const btn = document.getElementById('btn-tema-lectura');
    if (reader) {
        reader.style.background = tema.bg;
        reader.style.color = tema.texto;
    }
    if (nav) {
        nav.style.background = tema.navBg;
        if (_temaActual > 0) { nav.style.borderColor = 'rgba(0,0,0,0.15)'; }
        else { nav.style.borderColor = 'rgba(85,239,196,0.15)'; }
    }
    if (btn) btn.textContent = TEMAS_LECTURA[(_temaActual + 1) % TEMAS_LECTURA.length].icono;
    // Cambiar color de números de versículos
    document.querySelectorAll('.verse-block span[style*="color:#55efc4"]').forEach(el => {
        el.style.color = tema.numColor;
    });
}

// ===============================================
// 🔍 BUSCAR EN CAPÍTULO
// ===============================================
function buscarEnCapitulo(query) {
    const blocks = document.querySelectorAll('.verse-block');
    const q = query.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let count = 0;
    blocks.forEach(block => {
        if (!q) {
            block.style.display = '';
            block.style.border = '';
            block.style.background = '';
            return;
        }
        const texto = block.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (texto.includes(q)) {
            block.style.display = '';
            block.style.border = '2px solid #fdcb6e';
            block.style.background = 'rgba(253,203,110,0.1)';
            count++;
        } else {
            block.style.display = 'none';
        }
    });

    if (q && count === 0) {
        // Reducimos la frecuencia de los toasts en búsquedas parciales
        if (q.length > 3) mostrarToast(`🔍 No se encontró "${query}"`);
    } else if (q) {
        // Opcional: remover estoast de exito por ruido
    }
}

// ===============================================
// 📊 HISTORIAL DE LECTURA
// ===============================================
function guardarHistorialLectura(libro, capitulo) {
    let hist = JSON.parse(localStorage.getItem('legado_historial_lectura') || '[]');
    const ref = `${libro} ${capitulo}`;
    // Remover si ya existe
    hist = hist.filter(h => h.ref !== ref);
    hist.unshift({ ref, libro, cap: capitulo, fecha: new Date().toISOString() });
    if (hist.length > 50) hist = hist.slice(0, 50);
    localStorage.setItem('legado_historial_lectura', JSON.stringify(hist));
}

function renderHistorialLectura(root) {
    const hist = JSON.parse(localStorage.getItem('legado_historial_lectura') || '[]');
    if (hist.length === 0) {
        root.innerHTML = `
            <div style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:15px;">📊</div>
                <div style="color:#74b9ff;font-weight:900;font-size:1rem;margin-bottom:8px;">Sin historial aún</div>
                <div style="color:rgba(255,255,255,0.4);font-size:0.8rem;line-height:1.6;">Lee cualquier capítulo y aparecerá aquí.</div>
            </div>`;
        return;
    }

    let html = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="color:#74b9ff;font-weight:900;font-size:0.75rem;letter-spacing:2px;">📊 ÚLTIMOS ${hist.length} CAPÍTULOS LEÍDOS</div>
            <button onclick="localStorage.removeItem('legado_historial_lectura');cambiarModoSelectorBiblia('historial')" style="padding:4px 10px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.3);color:#ff6b6b;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.6rem;">🗑️ LIMPIAR</button>
        </div>`;

    hist.forEach(h => {
        const fecha = new Date(h.fecha);
        const hoy = new Date();
        const diff = Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24));
        const cuando = diff === 0 ? 'Hoy' : diff === 1 ? 'Ayer' : `Hace ${diff} días`;

        html += `
        <button onclick="abrirLibroPrincipal('${h.libro}', ${h.cap})" style="display:flex;align-items:center;gap:12px;width:100%;padding:12px;background:rgba(116,185,255,0.05);border:1px solid rgba(116,185,255,0.15);border-radius:12px;margin-bottom:6px;cursor:pointer;text-align:left;">
            <span style="font-size:1.2rem;">📖</span>
            <div style="flex:1;">
                <div style="color:#74b9ff;font-weight:900;font-size:0.85rem;">${h.ref}</div>
                <div style="color:rgba(255,255,255,0.35);font-size:0.65rem;">${cuando}</div>
            </div>
            <span style="color:rgba(255,255,255,0.3);font-size:0.8rem;">→</span>
        </button>`;
    });

    root.innerHTML = html;
}

// ===============================================
// 📝 MIS NOTAS / REFLEXIONES
// ===============================================
function renderModoNotas(root) {
    // Buscar todas las notas guardadas
    const notas = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('nota_')) {
            const valor = localStorage.getItem(key);
            if (valor && valor.trim()) {
                const ref = key.replace('nota_', '');
                notas.push({ ref, nota: valor, key });
            }
        }
    }

    if (notas.length === 0) {
        root.innerHTML = `
            <div style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:15px;">📝</div>
                <div style="color:#feca57;font-weight:900;font-size:1rem;margin-bottom:8px;">Sin notas aún</div>
                <div style="color:rgba(255,255,255,0.4);font-size:0.8rem;line-height:1.6;">Haz doble-tap en cualquier versículo<br>y escribe una reflexión para guardarla aquí.</div>
            </div>`;
        return;
    }

    let html = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="color:#feca57;font-weight:900;font-size:0.75rem;letter-spacing:2px;">📝 MIS ${notas.length} REFLEXIONES</div>
            <button onclick="mostrarConfirm('\uD83D\uDDD1\uFE0F \u00bfBorrar TODAS las reflexiones?', function(){for(let i=localStorage.length-1;i>=0;i--){const k=localStorage.key(i);if(k.startsWith('nota_'))localStorage.removeItem(k);}cambiarModoSelectorBiblia('notas');mostrarToast('\uD83D\uDDD1\uFE0F Reflexiones eliminadas');})" style="padding:4px 10px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.3);color:#ff6b6b;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.6rem;">🗑️ BORRAR TODAS</button>
        </div>`;

    notas.forEach(n => {
        const partes = n.ref.split(':');
        const libroYcap = partes[0] || n.ref;
        const vers = partes[1] || '';
        const notaCorta = n.nota.length > 80 ? n.nota.substring(0, 80) + '...' : n.nota;
        const libroNombre = libroYcap.replace(/\s\d+$/, '').trim();
        const capNum = libroYcap.match(/(\d+)$/)?.[1] || '1';

        html += `
        <div style="padding:14px;background:rgba(254,202,87,0.05);border:1px solid rgba(254,202,87,0.2);border-radius:14px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <div style="color:#feca57;font-weight:900;font-size:0.85rem;">📖 ${n.ref}</div>
                <div style="display:flex;gap:4px;">
                    <button onclick="borrarNotaDesdePanel('${n.key.replace(/'/g, "\\\\'")}')" style="padding:4px 8px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.2);color:#ff6b6b;border-radius:6px;cursor:pointer;font-size:0.6rem;font-weight:900;">🗑️</button>
                </div>
            </div>
            <div style="color:rgba(255,255,255,0.6);font-size:0.78rem;line-height:1.5;font-style:italic;margin-bottom:10px;">"${notaCorta}"</div>
            <div style="display:flex;gap:6px;">
                <button onclick="abrirLibroPrincipal('${libroNombre}', ${capNum}, ${vers || 'null'})" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">📖 IR AL VERSÍCULO</button>
                <button onclick="compartirNota('${n.ref.replace(/'/g, "\\\\'")}', '${n.nota.replace(/'/g, "\\\\'").replace(/\n/g, ' ')}')" style="flex:1;padding:8px;background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.3);color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;">📤 COMPARTIR</button>
            </div>
        </div>`;
    });

    root.innerHTML = html;
}
