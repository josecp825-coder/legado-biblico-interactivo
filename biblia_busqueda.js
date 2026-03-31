// =====================================================
// BIBLIA BUSQUEDA — Barra Relampago, Fuzzy, Microfono
// =====================================================

window.ajustarFuenteLibros = function (delta) {
    _libFontSize = Math.max(0.7, Math.min(1.6, _libFontSize + delta));
    localStorage.setItem('libFontSize', _libFontSize);
    document.querySelectorAll('.btn-libro-dyn').forEach(b => { b.style.fontSize = _libFontSize + 'rem'; });
    const ind = document.getElementById('lf-size-ind');
    if (ind) ind.innerText = Math.round(_libFontSize * 100) + '%';
};

// ═══════════════════════════════════════════════════════
// ⚡ BARRA RELÁMPAGO — Acceso instantáneo a citas bíblicas
// Escribe "Jn 3:16" o "Sal 23" y llegas de una vez
// ═══════════════════════════════════════════════════════

const ABREVIACIONES_BIBLIA = {
    // Antiguo Testamento
    'gn': 'Genesis', 'gen': 'Genesis', 'ge': 'Genesis',
    'ex': 'Exodo', 'exo': 'Exodo',
    'lv': 'Levitico', 'lev': 'Levitico',
    'nm': 'Numeros', 'num': 'Numeros', 'nu': 'Numeros',
    'dt': 'Deuteronomio', 'deu': 'Deuteronomio', 'de': 'Deuteronomio',
    'jos': 'Josue', 'jo': 'Josue',
    'jue': 'Jueces', 'jc': 'Jueces',
    'rt': 'Rut',
    '1s': '1 Samuel', '1sa': '1 Samuel', '1sam': '1 Samuel',
    '2s': '2 Samuel', '2sa': '2 Samuel', '2sam': '2 Samuel',
    '1r': '1 Reyes', '1re': '1 Reyes', '1rey': '1 Reyes',
    '2r': '2 Reyes', '2re': '2 Reyes', '2rey': '2 Reyes',
    '1cr': '1 Cronicas', '1cro': '1 Cronicas',
    '2cr': '2 Cronicas', '2cro': '2 Cronicas',
    'esd': 'Esdras', 'esdras': 'Esdras',
    'neh': 'Nehemias', 'ne': 'Nehemias',
    'est': 'Ester',
    'sal': 'Salmos', 'slm': 'Salmos', 'ps': 'Salmos',
    'pr': 'Proverbios', 'pro': 'Proverbios', 'prov': 'Proverbios',
    'ec': 'Eclesiastes', 'ecl': 'Eclesiastes',
    'cnt': 'Cantares', 'can': 'Cantares', 'ct': 'Cantares',
    'is': 'Isaias', 'isa': 'Isaias',
    'jer': 'Jeremias', 'jr': 'Jeremias',
    'lm': 'Lamentaciones', 'lam': 'Lamentaciones',
    'ez': 'Ezequiel', 'eze': 'Ezequiel',
    'dn': 'Daniel', 'dan': 'Daniel',
    'os': 'Oseas',
    'jl': 'Joel',
    'am': 'Amos',
    'abd': 'Abdias', 'ab': 'Abdias',
    'jon': 'Jonas',
    'mi': 'Miqueas', 'miq': 'Miqueas',
    'na': 'Nahum', 'nah': 'Nahum',
    'hab': 'Habacuc', 'ha': 'Habacuc',
    'sof': 'Sofonias', 'sf': 'Sofonias',
    'hag': 'Hageo', 'hg': 'Hageo',
    'zac': 'Zacarias', 'za': 'Zacarias',
    'mal': 'Malaquias', 'ml': 'Malaquias',
    // Nuevo Testamento
    'mt': 'Mateo', 'mat': 'Mateo',
    'mr': 'Marcos', 'mc': 'Marcos', 'mar': 'Marcos',
    'lc': 'Lucas', 'lu': 'Lucas', 'luc': 'Lucas',
    'jn': 'Juan', 'jua': 'Juan',
    'hch': 'Hechos', 'hc': 'Hechos', 'he': 'Hechos',
    'ro': 'Romanos', 'rom': 'Romanos',
    '1co': '1 Corintios', '1cor': '1 Corintios',
    '2co': '2 Corintios', '2cor': '2 Corintios',
    'ga': 'Galatas', 'gal': 'Galatas',
    'ef': 'Efesios', 'efe': 'Efesios',
    'flp': 'Filipenses', 'fil': 'Filipenses', 'fp': 'Filipenses',
    'col': 'Colosenses',
    '1ts': '1 Tesalonicenses', '1te': '1 Tesalonicenses', '1tes': '1 Tesalonicenses',
    '2ts': '2 Tesalonicenses', '2te': '2 Tesalonicenses', '2tes': '2 Tesalonicenses',
    '1ti': '1 Timoteo', '1tim': '1 Timoteo',
    '2ti': '2 Timoteo', '2tim': '2 Timoteo',
    'tit': 'Tito', 'tt': 'Tito',
    'flm': 'Filemon', 'fm': 'Filemon', 'filem': 'Filemon',
    'heb': 'Hebreos', 'hb': 'Hebreos',
    'stg': 'Santiago', 'sant': 'Santiago', 'sg': 'Santiago',
    '1p': '1 Pedro', '1pe': '1 Pedro', '1ped': '1 Pedro',
    '2p': '2 Pedro', '2pe': '2 Pedro', '2ped': '2 Pedro',
    '1jn': '1 Juan', '1ju': '1 Juan',
    '2jn': '2 Juan', '2ju': '2 Juan',
    '3jn': '3 Juan', '3ju': '3 Juan',
    'jud': 'Judas',
    'ap': 'Apocalipsis', 'apo': 'Apocalipsis', 'apoc': 'Apocalipsis',
};

// Parsear una referencia bíblica como "Jn 3:16", "Sal 23", "1 Corintios 13 4"
function parsearCitaRapida(texto) {
    const t = texto.trim();
    if (!t) return null;

    // Patrón: [libro] [cap]:[vers] o [libro] [cap] [vers]
    // Soporta: "Jn 3:16", "Sal 23", "1 Co 13:4", "Genesis 1 1", "Fil 2:2"
    // También: "juan3:16", "sal23"
    const match = t.match(/^(.+?)\s*(\d+)\s*[:\s.,;]\s*(\d+)$/i) ||
        t.match(/^(.+?)\s*(\d+)$/i);

    if (!match) return null;

    const libroRaw = match[1].trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cap = parseInt(match[2]);
    const vers = match[3] ? parseInt(match[3]) : null;

    // 1. Buscar en abreviaciones
    let libroEncontrado = ABREVIACIONES_BIBLIA[libroRaw];

    // 2. Si no está en abreviaciones, buscar por coincidencia exacta o parcial
    if (!libroEncontrado) {
        libroEncontrado = TODOS_LIBROS.find(l =>
            l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === libroRaw ||
            l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(libroRaw)
        );
    }

    // 3. FUZZY MATCHING — si aún no lo encontró, buscar el más parecido
    if (!libroEncontrado) {
        libroEncontrado = buscarLibroFuzzy(libroRaw);
    }

    if (!libroEncontrado) return null;

    const capTotal = CONTEO_CAPITULOS[libroEncontrado] || 1;
    const capFinal = Math.min(Math.max(cap, 1), capTotal);

    return { libro: libroEncontrado, cap: capFinal, vers: vers, capOriginal: cap, capTotal: capTotal };
}

// ═══════════════════════════════════════════════════════
// 🧠 FUZZY MATCHING — Encuentra libros aunque los escriban/pronuncien mal
// Usa distancia de Levenshtein para tolerancia a errores
// ═══════════════════════════════════════════════════════

function distanciaLevenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const costo = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,       // eliminación
                dp[i][j - 1] + 1,       // inserción
                dp[i - 1][j - 1] + costo // sustitución
            );
        }
    }
    return dp[m][n];
}

function buscarLibroFuzzy(textoInput) {
    if (!textoInput || textoInput.length < 2) return null;

    let mejorLibro = null;
    let mejorDistancia = Infinity;
    const umbral = Math.max(2, Math.floor(textoInput.length * 0.3)); // tolerancia del 30% (más estricto)

    // Buscar en TODOS los libros
    TODOS_LIBROS.forEach(libro => {
        const libroNorm = libro.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const dist = distanciaLevenshtein(textoInput, libroNorm);
        if (dist < mejorDistancia && dist <= umbral) {
            mejorDistancia = dist;
            mejorLibro = libro;
        }
        // También comparar con solo la primera parte (si el input es corto)
        if (textoInput.length >= 3 && textoInput.length < libroNorm.length) {
            const parcial = libroNorm.substring(0, textoInput.length);
            const distParcial = distanciaLevenshtein(textoInput, parcial);
            if (distParcial < mejorDistancia && distParcial <= 1) {
                mejorDistancia = distParcial;
                mejorLibro = libro;
            }
        }
    });

    // Buscar también en las abreviaciones
    Object.entries(ABREVIACIONES_BIBLIA).forEach(([abr, libro]) => {
        const dist = distanciaLevenshtein(textoInput, abr);
        if (dist < mejorDistancia && dist <= 2) {
            mejorDistancia = dist;
            mejorLibro = libro;
        }
    });

    // Marcar si fue fuzzy match (no exacto)
    if (mejorLibro && mejorDistancia > 0) {
        window._ultimoFuzzy = { libro: mejorLibro, distancia: mejorDistancia, original: textoInput };
    } else {
        window._ultimoFuzzy = null;
    }

    return mejorLibro;
}

// Sugerir libros mientras el usuario escribe
function sugerirLibrosRapido(texto) {
    const t = texto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!t || t.length < 1) return [];

    const resultados = new Set();

    // Buscar en abreviaciones
    Object.entries(ABREVIACIONES_BIBLIA).forEach(([abr, libro]) => {
        if (abr.startsWith(t)) resultados.add(libro);
    });

    // Buscar por nombre parcial
    TODOS_LIBROS.forEach(l => {
        const norm = l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (norm.startsWith(t) || norm.includes(t)) resultados.add(l);
    });

    return Array.from(resultados).slice(0, 6);
}

// Historial de citas recientes
function getHistorialCitas() {
    try {
        return JSON.parse(localStorage.getItem('legado_citas_recientes') || '[]');
    } catch { return []; }
}

function guardarCitaHistorial(libro, cap, vers) {
    const historial = getHistorialCitas();
    const cita = vers ? `${libro} ${cap}:${vers}` : `${libro} ${cap}`;
    // Evitar duplicados
    const nuevo = [cita, ...historial.filter(c => c !== cita)].slice(0, 8);
    localStorage.setItem('legado_citas_recientes', JSON.stringify(nuevo));
}

// Cita pendiente de confirmar
let _citaPendiente = null;

// Acción principal: buscar la cita y mostrar confirmación
window.irCitaRelampago = function () {
    const input = document.getElementById('relampago-input');
    if (!input) return;
    const texto = input.value.trim();
    if (!texto) { mostrarToast('⚡ Escribe una cita. Ej: Juan 3:16'); return; }

    const resultado = parsearCitaRapida(texto);
    if (!resultado) {
        // Mostrar error visible en el panel de confirmación
        const panel = document.getElementById('relampago-confirmacion');
        if (panel) {
            panel.innerHTML = `
                <div style="padding:12px;background:rgba(255,100,100,0.1);border:1.5px solid rgba(255,100,100,0.4);border-radius:14px;">
                    <div style="color:#ff6b6b;font-weight:900;font-size:0.9rem;margin-bottom:4px;">❌ No encontrado</div>
                    <div style="color:rgba(255,255,255,0.6);font-size:0.78rem;">"${texto}" no es un libro de la Biblia. Los 66 libros van desde Génesis hasta Apocalipsis.</div>
                    <button onclick="cancelarCitaRelampago()" style="margin-top:8px;padding:8px 16px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.75rem;">🎤 INTENTAR OTRA VEZ</button>
                </div>`;
            panel.style.display = 'block';
        }
        return;
    }

    // Mostrar panel de confirmación
    mostrarConfirmacionCita(resultado);
};

// Mostrar panel de confirmación visual
function mostrarConfirmacionCita(resultado) {
    _citaPendiente = resultado;
    const panel = document.getElementById('relampago-confirmacion');
    if (!panel) return;

    // VALIDACIÓN: ¿Existe el libro?
    if (!TODOS_LIBROS.includes(resultado.libro)) {
        panel.innerHTML = `
            <div style="padding:12px;background:rgba(255,100,100,0.1);border:1.5px solid rgba(255,100,100,0.4);border-radius:14px;">
                <div style="color:#ff6b6b;font-weight:900;font-size:0.9rem;margin-bottom:4px;">❌ Libro no encontrado</div>
                <div style="color:rgba(255,255,255,0.6);font-size:0.78rem;">El libro "${resultado.libro}" no existe en la Biblia. Intenta de nuevo.</div>
                <button onclick="cancelarCitaRelampago()" style="margin-top:8px;padding:8px 16px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.75rem;">🎤 INTENTAR OTRA VEZ</button>
            </div>`;
        panel.style.display = 'block';
        _citaPendiente = null;
        return;
    }

    const totalCaps = CONTEO_CAPITULOS[resultado.libro] || 1;
    const esAT = LIBROS_AT.includes(resultado.libro);
    const testamento = esAT ? 'AT' : 'NT';
    const colorTest = esAT ? '#55efc4' : '#a29bfe';
    let advertencia = '';

    // VALIDACIÓN: ¿Libro fue adivinado por fuzzy matching?
    if (window._ultimoFuzzy && window._ultimoFuzzy.libro === resultado.libro) {
        advertencia += `<div style="color:#74b9ff;font-size:0.72rem;margin-top:6px;padding:6px 10px;background:rgba(116,185,255,0.1);border-radius:8px;">🤔 ¿Quisiste decir <b>${resultado.libro}</b>? Dijiste "${window._ultimoFuzzy.original}"</div>`;
        window._ultimoFuzzy = null;
    }

    // VALIDACIÓN: ¿Capítulo fue ajustado?
    if (resultado.capOriginal && resultado.capOriginal > totalCaps) {
        advertencia += `<div style="color:#fdcb6e;font-size:0.72rem;margin-top:6px;padding:6px 10px;background:rgba(253,203,110,0.1);border-radius:8px;">⚠️ ${resultado.libro} solo tiene ${totalCaps} capítulo${totalCaps > 1 ? 's' : ''}. Pediste el ${resultado.capOriginal}, se abrirá el ${resultado.cap}.</div>`;
        resultado.vers = null;
    }

    // PRE-VALIDAR: ¿Versículo existe? (cargar datos del capítulo)
    if (resultado.vers) {
        const slug = normalizarLibro(resultado.libro);
        buscarEnBiblia(slug, resultado.cap).then(data => {
            if (data && data.vers && parseInt(resultado.vers) > data.vers.length) {
                const warnDiv = document.getElementById('verso-warn');
                if (warnDiv) {
                    warnDiv.innerHTML = `<div style="color:#ff6b6b;font-size:0.72rem;margin-top:6px;padding:6px 10px;background:rgba(255,100,100,0.1);border-radius:8px;">⚠️ ${resultado.libro} ${resultado.cap} solo tiene <b>${data.vers.length}</b> versículos. El versículo <b>${resultado.vers}</b> no existe. Se abrirá el capítulo al inicio.</div>`;
                    resultado.vers = null;
                    _citaPendiente = resultado;
                }
            }
        }).catch(() => { });
    }

    panel.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                    <span style="font-size:1.3rem">📖</span>
                    <span style="color:#fff;font-size:1.05rem;font-weight:900;letter-spacing:0.5px">${resultado.libro}</span>
                    <span style="background:${colorTest}25;color:${colorTest};font-size:0.55rem;font-weight:900;padding:2px 8px;border-radius:10px;border:1px solid ${colorTest}50;letter-spacing:1px">${testamento}</span>
                </div>
                <div style="display:flex;gap:12px;align-items:center">
                    <div style="display:flex;align-items:center;gap:5px">
                        <span style="color:rgba(255,255,255,0.4);font-size:0.65rem;font-weight:900">CAPÍTULO</span>
                        <span style="color:#fdcb6e;font-size:1.2rem;font-weight:900">${resultado.cap}</span>
                        <span style="color:rgba(255,255,255,0.25);font-size:0.55rem">de ${totalCaps}</span>
                    </div>
                    ${resultado.vers ? `
                    <div style="width:1px;height:18px;background:rgba(255,255,255,0.15)"></div>
                    <div style="display:flex;align-items:center;gap:5px">
                        <span style="color:rgba(255,255,255,0.4);font-size:0.65rem;font-weight:900">VERSÍCULO</span>
                        <span style="color:#55efc4;font-size:1.2rem;font-weight:900">${resultado.vers}</span>
                    </div>` : ''}
                </div>
                ${advertencia}
                <div id="verso-warn"></div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0">
                <button onclick="cancelarCitaRelampago()"
                    style="padding:8px 12px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.6);border-radius:12px;cursor:pointer;font-size:0.65rem;font-weight:900;transition:transform 0.15s"
                    ontouchstart="this.style.transform='scale(0.92)'" ontouchend="this.style.transform='scale(1)'">OTRA 🎤</button>
                <button onclick="confirmarCitaRelampago()"
                    style="padding:10px 18px;background:linear-gradient(135deg,#00b894,#55efc4);border:none;color:#000;border-radius:12px;cursor:pointer;font-size:0.9rem;font-weight:900;letter-spacing:0.5px;box-shadow:0 4px 15px rgba(85,239,196,0.35);transition:transform 0.15s;white-space:nowrap"
                    ontouchstart="this.style.transform='scale(0.92)'" ontouchend="this.style.transform='scale(1)'">IR ✅</button>
            </div>
        </div>
    `;
    panel.style.display = 'block';
}

// Confirmar e ir a la cita
window.confirmarCitaRelampago = function () {
    if (!_citaPendiente) return;
    const r = _citaPendiente;

    guardarCitaHistorial(r.libro, r.cap, r.vers);
    const input = document.getElementById('relampago-input');
    if (input) input.value = '';
    const sug = document.getElementById('relampago-sugerencias');
    if (sug) sug.style.display = 'none';
    const panel = document.getElementById('relampago-confirmacion');
    if (panel) { panel.style.display = 'none'; panel.innerHTML = ''; }
    renderHistorialRelampago();

    // Cerrar overlay de biblia si existe (para que pantalla-estudio sea visible)
    const bibliaOv = document.getElementById('biblia-overlay');
    if (bibliaOv) bibliaOv.remove();

    mostrarToast(`⚡ ${r.libro} ${r.cap}${r.vers ? ':' + r.vers : ''}`);
    abrirLibroPrincipal(r.libro, r.cap, r.vers);
    _citaPendiente = null;
};

// Cancelar
window.cancelarCitaRelampago = function () {
    _citaPendiente = null;
    const panel = document.getElementById('relampago-confirmacion');
    if (panel) { panel.style.display = 'none'; panel.innerHTML = ''; }
    mostrarToast('❌ Cancelado');
};

// Ir a cita desde historial
window.irCitaDesdeHistorial = function (citaStr) {
    const resultado = parsearCitaRapida(citaStr);
    if (resultado) {
        guardarCitaHistorial(resultado.libro, resultado.cap, resultado.vers);
        renderHistorialRelampago();
        // Cerrar overlay de biblia si existe
        const bibliaOv = document.getElementById('biblia-overlay');
        if (bibliaOv) bibliaOv.remove();
        mostrarToast(`⚡ ${resultado.libro} ${resultado.cap}${resultado.vers ? ':' + resultado.vers : ''}`);
        abrirLibroPrincipal(resultado.libro, resultado.cap, resultado.vers);
    }
};

// Mostrar sugerencias mientras escribe
window.onInputRelampago = function (texto) {
    const sug = document.getElementById('relampago-sugerencias');
    if (!sug) return;

    // Extraer solo la parte del nombre del libro (antes de cualquier número)
    const parteLibro = texto.replace(/\d+.*$/, '').trim();

    if (!parteLibro || parteLibro.length < 1) {
        sug.style.display = 'none';
        return;
    }

    const libros = sugerirLibrosRapido(parteLibro);
    if (libros.length === 0) {
        sug.style.display = 'none';
        return;
    }

    // Si solo escribió la parte del libro sin cap, mostrar sugerencias de libros
    const esAT = (l) => LIBROS_AT.includes(l);
    sug.innerHTML = libros.map(l => {
        const color = esAT(l) ? '#55efc4' : '#a29bfe';
        const caps = CONTEO_CAPITULOS[l] || 1;
        return `<button onclick="document.getElementById('relampago-input').value='${l} ';document.getElementById('relampago-input').focus();document.getElementById('relampago-sugerencias').style.display='none'"
            style="padding:8px 12px;background:rgba(${esAT(l) ? '85,239,196' : '162,155,254'},0.12);border:1px solid ${color}50;color:${color};border-radius:10px;font-size:0.78rem;font-weight:700;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:6px;transition:all 0.15s">
            <span>${l}</span>
            <span style="font-size:0.6rem;opacity:0.5">${caps} cap</span>
        </button>`;
    }).join('');
    sug.style.display = 'grid';
};

// Limpiar historial de citas
window.limpiarHistorialCitas = function () {
    localStorage.removeItem('legado_citas_recientes');
    renderHistorialRelampago();
    mostrarToast('🗑️ Historial limpio — listo para nuevo sermón');
};

// ═══════════════════════════════════════════════════════
// 🎤 MICRÓFONO — Reconocimiento de voz para citas bíblicas
// ═══════════════════════════════════════════════════════

let _reconocimientoActivo = false;
let _speechRecognition = null;

window.activarMicrofonoBiblia = function () {
    // Verificar soporte
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        mostrarToast('❌ Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
        return;
    }

    // Si ya está activo, detener
    if (_reconocimientoActivo && _speechRecognition) {
        _speechRecognition.stop();
        _reconocimientoActivo = false;
        actualizarEstadoMic(false);
        return;
    }

    _speechRecognition = new SpeechRecognition();
    _speechRecognition.lang = 'es-ES';
    _speechRecognition.continuous = false;
    _speechRecognition.interimResults = true;
    _speechRecognition.maxAlternatives = 3;

    _reconocimientoActivo = true;
    actualizarEstadoMic(true);
    mostrarToast('🎤 Escuchando... di la cita bíblica');

    _speechRecognition.onresult = function (evento) {
        let textoFinal = '';
        let textoInterino = '';

        for (let i = evento.resultIndex; i < evento.results.length; i++) {
            const transcripcion = evento.results[i][0].transcript;
            if (evento.results[i].isFinal) {
                textoFinal += transcripcion;
            } else {
                textoInterino += transcripcion;
            }
        }

        // Mostrar texto interino en el input
        const input = document.getElementById('relampago-input');
        if (input) {
            input.value = textoFinal || textoInterino;
            input.style.borderColor = textoFinal ? '#55efc4' : '#fdcb6e';
        }

        // Si tenemos resultado final, procesarlo
        if (textoFinal) {
            procesarVozBiblica(textoFinal);
        }
    };

    _speechRecognition.onerror = function (evento) {
        _reconocimientoActivo = false;
        actualizarEstadoMic(false);
        if (evento.error === 'no-speech') {
            mostrarToast('🎤 No se detectó voz. Intenta de nuevo.');
        } else if (evento.error === 'not-allowed') {
            mostrarToast('❌ Permiso de micrófono denegado. Actívalo en la configuración.');
        } else {
            mostrarToast('⚠️ Error de voz: ' + evento.error);
        }
    };

    _speechRecognition.onend = function () {
        _reconocimientoActivo = false;
        actualizarEstadoMic(false);
    };

    _speechRecognition.start();
};

function procesarVozBiblica(texto) {
    // Normalizar el texto hablado
    let normalizado = texto.trim().toLowerCase();

    // Correcciones comunes de reconocimiento de voz en español
    const correcciones = {
        'génesis': 'Genesis', 'genesis': 'Genesis', 'fenesis': 'Genesis', 'jenesis': 'Genesis',
        'éxodo': 'Exodo', 'exodo': 'Exodo',
        'levítico': 'Levitico', 'levitico': 'Levitico',
        'números': 'Numeros', 'numeros': 'Numeros',
        'deuteronomio': 'Deuteronomio',
        'josué': 'Josue', 'josue': 'Josue',
        'jueces': 'Jueces',
        'salmos': 'Salmos', 'salmo': 'Salmos', 'psalmos': 'Salmos',
        'proverbios': 'Proverbios',
        'eclesiastés': 'Eclesiastes', 'eclesiastes': 'Eclesiastes',
        'cantares': 'Cantares',
        'isaías': 'Isaias', 'isaias': 'Isaias',
        'jeremías': 'Jeremias', 'jeremias': 'Jeremias',
        'lamentaciones': 'Lamentaciones',
        'ezequiel': 'Ezequiel',
        'daniel': 'Daniel',
        'oseas': 'Oseas',
        'joel': 'Joel',
        'amós': 'Amos', 'amos': 'Amos',
        'abdías': 'Abdias', 'abdias': 'Abdias',
        'jonás': 'Jonas', 'jonas': 'Jonas',
        'miqueas': 'Miqueas',
        'nahúm': 'Nahum', 'nahum': 'Nahum',
        'habacuc': 'Habacuc',
        'sofonías': 'Sofonias', 'sofonias': 'Sofonias',
        'hageo': 'Hageo', 'ageo': 'Hageo',
        'zacarías': 'Zacarias', 'zacarias': 'Zacarias',
        'malaquías': 'Malaquias', 'malaquias': 'Malaquias',
        'mateo': 'Mateo', 'san mateo': 'Mateo',
        'marcos': 'Marcos', 'san marcos': 'Marcos',
        'lucas': 'Lucas', 'san lucas': 'Lucas',
        'juan': 'Juan', 'san juan': 'Juan', 'jua': 'Juan', 'juán': 'Juan', 'huan': 'Juan',
        'hechos': 'Hechos',
        'romanos': 'Romanos',
        'corintios': 'Corintios',
        'gálatas': 'Galatas', 'galatas': 'Galatas',
        'efesios': 'Efesios',
        'filipenses': 'Filipenses',
        'colosenses': 'Colosenses',
        'tesalonicenses': 'Tesalonicenses',
        'timoteo': 'Timoteo',
        'tito': 'Tito',
        'filemón': 'Filemon', 'filemon': 'Filemon',
        'hebreos': 'Hebreos',
        'santiago': 'Santiago',
        'pedro': 'Pedro',
        'judas': 'Judas',
        'apocalipsis': 'Apocalipsis',
    };

    // Reemplazar palabras de números hablados a dígitos
    const numPalabras = {
        'uno': '1', 'un': '1', 'una': '1',
        'dos': '2', 'tres': '3', 'cuatro': '4', 'cinco': '5',
        'seis': '6', 'siete': '7', 'ocho': '8', 'nueve': '9',
        'diez': '10', 'once': '11', 'doce': '12', 'trece': '13',
        'catorce': '14', 'quince': '15', 'dieciséis': '16', 'dieciseis': '16',
        'diecisiete': '17', 'dieciocho': '18', 'diecinueve': '19',
        'veinte': '20', 'veintiuno': '21', 'veintidós': '22', 'veintidos': '22',
        'veintitrés': '23', 'veintitres': '23', 'veinticuatro': '24',
        'veinticinco': '25', 'veintiséis': '26', 'veintiseis': '26',
        'veintisiete': '27', 'veintiocho': '28', 'veintinueve': '29',
        'treinta': '30', 'cuarenta': '40', 'cincuenta': '50',
        'primero': '1', 'primer': '1', 'primera': '1',
        'segundo': '2', 'segunda': '2', 'tercero': '3', 'tercera': '3',
    };

    // Limpiar frases comunes del habla
    normalizado = normalizado
        .replace(/^(léeme|leeme|dime|háblame de|hablame de|busca|abre|lee|búscame|buscame|quiero|dame)\s+/gi, '')
        .replace(/^(el libro de|el libro|libro de)\s+/gi, '')
        .replace(/por favor/gi, '');

    // Reemplazar "capítulo" y "versículo" por espacio
    normalizado = normalizado
        .replace(/cap[ií]tulo\s*/gi, '')
        .replace(/vers[ií]culo\s*/gi, '')
        .replace(/\bverso\s*/gi, '')
        .replace(/\bcap\b\.?\s*/gi, '')
        .replace(/,/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Reemplazar palabras de números
    Object.entries(numPalabras).forEach(([palabra, num]) => {
        const regex = new RegExp('\\b' + palabra + '\\b', 'gi');
        normalizado = normalizado.replace(regex, num);
    });

    // Manejar "primera/segundo" + libro (ej: "primera corintios 13 4")
    normalizado = normalizado
        .replace(/^1\s+/i, '1 ')
        .replace(/^2\s+/i, '2 ')
        .replace(/^3\s+/i, '3 ');

    // Poner en el input
    const input = document.getElementById('relampago-input');
    if (input) {
        input.value = normalizado;
        input.style.borderColor = 'rgba(253,203,110,0.45)';
    }

    // Intentar parsear
    const resultado = parsearCitaRapida(normalizado);
    if (resultado) {
        mostrarConfirmacionCita(resultado);
        mostrarToast(`🎤 ${resultado.libro} ${resultado.cap}${resultado.vers ? ':' + resultado.vers : ''} ← "${normalizado}"`);
    } else {
        // Mostrar error visible en el panel de confirmación
        const panel = document.getElementById('relampago-confirmacion');
        if (panel) {
            panel.innerHTML = `
                <div style="padding:12px;background:rgba(255,100,100,0.1);border:1.5px solid rgba(255,100,100,0.4);border-radius:14px;">
                    <div style="color:#ff6b6b;font-weight:900;font-size:0.9rem;margin-bottom:4px;">❌ No encontrado</div>
                    <div style="color:rgba(255,255,255,0.6);font-size:0.78rem;">"${normalizado}" no es un libro de la Biblia. Intenta decir el nombre del libro + capítulo.</div>
                    <button onclick="cancelarCitaRelampago()" style="margin-top:8px;padding:8px 16px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.75rem;">🎤 INTENTAR OTRA VEZ</button>
                </div>`;
            panel.style.display = 'block';
        }
    }
}

function actualizarEstadoMic(activo) {
    const btn = document.getElementById('btn-mic-relampago');
    if (!btn) return;
    if (activo) {
        btn.style.background = 'linear-gradient(135deg,#ff6b6b,#ee5a24)';
        btn.style.borderColor = '#ff6b6b';
        btn.style.boxShadow = '0 0 20px rgba(255,107,107,0.5)';
        btn.style.animation = 'mic-pulse 1s infinite';
        btn.innerHTML = '🎤';
    } else {
        btn.style.background = 'rgba(162,155,254,0.15)';
        btn.style.borderColor = 'rgba(162,155,254,0.5)';
        btn.style.boxShadow = 'none';
        btn.style.animation = 'none';
        btn.innerHTML = '🎤';
    }
}

// Renderizar el historial en la barra
function renderHistorialRelampago() {
    const cont = document.getElementById('relampago-historial');
    if (!cont) return;
    const historial = getHistorialCitas();
    if (historial.length === 0) {
        cont.innerHTML = '<span style="color:rgba(255,255,255,0.25);font-size:0.65rem;font-style:italic">Las citas del sermón aparecerán aquí</span>';
        return;
    }
    cont.innerHTML = `
        <button onclick="limpiarHistorialCitas()" title="Limpiar historial"
            style="padding:5px 8px;background:rgba(255,100,100,0.12);border:1px solid rgba(255,100,100,0.35);color:#ff6b6b;border-radius:18px;font-size:0.72rem;cursor:pointer;white-space:nowrap;transition:all 0.15s;display:flex;align-items:center;gap:4px">
            🗑️
        </button>
        <span style="color:rgba(253,203,110,0.5);font-size:0.58rem;font-weight:900;letter-spacing:1px">SERMÓN:</span>
        ` + historial.map(c =>
        `<button onclick="irCitaDesdeHistorial('${c}')"
            style="padding:5px 10px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.3);color:#fdcb6e;border-radius:18px;font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap;transition:all 0.15s">${c}</button>`
    ).join('');
}

// Renderizar la Barra Relámpago completa
function renderBarraRelampago() {
    return `
    <style>
        @keyframes mic-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.12); }
        }
    </style>
    <div id="barra-relampago" style="
        background:linear-gradient(135deg,rgba(253,203,110,0.1),rgba(225,112,85,0.06));
        border:1.5px solid rgba(253,203,110,0.35);
        border-radius:18px;
        padding:14px 16px;
        margin-bottom:10px;
        box-shadow:0 4px 20px rgba(253,203,110,0.08);
    ">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <span style="font-size:1.2rem">⚡</span>
            <div style="flex:1">
                <div style="color:#fdcb6e;font-size:0.72rem;font-weight:900;letter-spacing:1.5px">CITA RÁPIDA</div>
                <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;margin-top:1px">Escribe o dicta: Juan 3:16, Sal 23...</div>
            </div>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:8px">
            <input id="relampago-input" type="text" placeholder="Ej: Jn 3:16"
                oninput="onInputRelampago(this.value)"
                onkeydown="if(event.key==='Enter'){event.preventDefault();irCitaRelampago()}"
                autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                style="flex:1;padding:12px 14px;background:rgba(0,0,0,0.45);border:1.5px solid rgba(253,203,110,0.45);color:#fff;border-radius:12px;font-size:1rem;font-weight:700;outline:none;box-sizing:border-box;letter-spacing:0.5px">
            <button id="btn-mic-relampago" onclick="activarMicrofonoBiblia()"
                style="padding:12px 14px;background:rgba(162,155,254,0.15);border:1.5px solid rgba(162,155,254,0.5);color:#fff;border-radius:12px;cursor:pointer;font-size:1.1rem;transition:all 0.2s;display:flex;align-items:center;justify-content:center;min-width:48px"
                ontouchstart="this.style.transform='scale(0.92)'" ontouchend="this.style.transform='scale(1)'">
                🎤
            </button>
            <button onclick="irCitaRelampago()"
                style="padding:12px 16px;background:linear-gradient(135deg,#fdcb6e,#e17055);border:none;color:#000;font-weight:900;border-radius:12px;cursor:pointer;font-size:0.85rem;letter-spacing:0.5px;white-space:nowrap;box-shadow:0 4px 15px rgba(253,203,110,0.3);transition:transform 0.15s"
                onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'"
                ontouchstart="this.style.transform='scale(0.95)'" ontouchend="this.style.transform='scale(1)'">
                IR ⚡
            </button>
        </div>
        <div id="relampago-confirmacion" style="display:none;background:rgba(0,184,148,0.08);border:1.5px solid rgba(85,239,196,0.4);border-radius:14px;padding:12px 14px;margin-bottom:8px;animation:devFadeIn 0.3s ease-out"></div>
        <div id="relampago-sugerencias" style="display:none;grid-template-columns:repeat(2,1fr);gap:5px;margin-bottom:8px"></div>
        <div id="relampago-historial" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
            <span style="color:rgba(255,255,255,0.25);font-size:0.65rem;font-style:italic">Las citas del sermón aparecerán aquí</span>
        </div>
    </div>`;
}


/**
 * PANTALLA INICIO: muestra tarjeta compacta de la Biblia (sin scroll)
 * El usuario toca para expandir el selector completo
 * v99: La Cita Rápida ya NO aparece en el home — solo dentro del lector expandido
 */
function mostrarBibleCompacto(containerId = 'bible-home-selector') {
    const area = document.getElementById(containerId);
    if (!area) return;
    area.innerHTML = `
        <div id="bib-compact-card" onclick="expandirSelectorBiblia('${containerId}')" style="
            background: linear-gradient(135deg, rgba(85,239,196,0.13) 0%, rgba(85,239,196,0.04) 100%);
            border: 1.5px solid rgba(85,239,196,0.4);
            border-radius: 20px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            transition: transform 0.15s, box-shadow 0.15s;
            margin-bottom: 4px;
            box-shadow: 0 4px 20px rgba(85,239,196,0.1);
        "
        ontouchstart="this.style.transform='scale(0.97)'"
        ontouchend="this.style.transform='scale(1)'"
        onmousedown="this.style.transform='scale(0.97)'"
        onmouseup="this.style.transform='scale(1)'">
            <div style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#55efc4,#00b894);display:flex;align-items:center;justify-content:center;font-size:1.7rem;flex-shrink:0;box-shadow:0 4px 15px rgba(85,239,196,0.35)">📖</div>
            <div style="flex:1;min-width:0">
                <div style="font-size:0.58rem;color:#55efc4;letter-spacing:3px;font-weight:900;text-transform:uppercase">Biblia Completa RVR60</div>
                <div style="font-size:1rem;color:#fff;font-weight:900;margin-top:3px">Explorar 66 Libros</div>
                <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);margin-top:2px">Toca para abrir el selector</div>
            </div>
            <div style="color:#55efc4;font-size:1.6rem;flex-shrink:0;font-weight:300">›</div>
        </div>
    `;
}
