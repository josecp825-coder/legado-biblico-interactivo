/**
 * CBA_MOTOR.JS v102
 * Motor de Integración del Comentario Bíblico Adventista
 * Fuente: adventista-io/comentario-biblico-adventista-html
 * 
 * MEJORAS v102:
 * - Auto-scroll al versículo específico
 * - Navegación de capítulos dentro del panel
 * - Resaltado del versículo seleccionado
 */

const CBA_BASE_URL = "https://raw.githubusercontent.com/adventistaio/comentario-biblico-adventista-html/master/";

const CBA_BOOKS_MAP = {
    "Genesis": "antiguo-testamento/01-genesis.html",
    "Exodo": "antiguo-testamento/02-exodo.html",
    "Levitico": "antiguo-testamento/03-levitico.html",
    "Numeros": "antiguo-testamento/04-numeros.html",
    "Deuteronomio": "antiguo-testamento/05-deuteronomio.html",
    "Josue": "antiguo-testamento/06-josue.html",
    "Jueces": "antiguo-testamento/07-jueces.html",
    "Rut": "antiguo-testamento/08-rut.html",
    "1 Samuel": "antiguo-testamento/09-i-samuel.html",
    "2 Samuel": "antiguo-testamento/10-ii-samuel.html",
    "1 Reyes": "antiguo-testamento/11-i-reyes.html",
    "2 Reyes": "antiguo-testamento/12-ii-reyes.html",
    "1 Cronicas": "antiguo-testamento/13-i-cronicas.html",
    "2 Cronicas": "antiguo-testamento/14-ii-cronicas.html",
    "Esdras": "antiguo-testamento/15-esdras.html",
    "Nehemias": "antiguo-testamento/16-nehemias.html",
    "Ester": "antiguo-testamento/17-ester.html",
    "Job": "antiguo-testamento/18-job.html",
    "Salmos": "antiguo-testamento/19-salmos.html",
    "Proverbios": "antiguo-testamento/20-proverbios.html",
    "Eclesiastes": "antiguo-testamento/21-eclesiastes.html",
    "Cantares": "antiguo-testamento/22-cantares.html",
    "Isaias": "antiguo-testamento/23-isaias.html",
    "Jeremias": "antiguo-testamento/24-jeremias.html",
    "Lamentaciones": "antiguo-testamento/25-lamentaciones.html",
    "Ezequiel": "antiguo-testamento/26-ezequiel.html",
    "Daniel": "antiguo-testamento/27-daniel.html",
    "Oseas": "antiguo-testamento/28-oseas.html",
    "Joel": "antiguo-testamento/29-joel.html",
    "Amos": "antiguo-testamento/30-amos.html",
    "Abdias": "antiguo-testamento/31-abdias.html",
    "Jonas": "antiguo-testamento/32-jonas.html",
    "Miqueas": "antiguo-testamento/33-miqueas.html",
    "Nahum": "antiguo-testamento/34-nahum.html",
    "Habacuc": "antiguo-testamento/35-habacuc.html",
    "Sofonias": "antiguo-testamento/36-sofonias.html",
    "Hageo": "antiguo-testamento/37-hageo.html",
    "Zacarias": "antiguo-testamento/38-zacarias.html",
    "Malaquias": "antiguo-testamento/39-malaquias.html",
    "Mateo": "nuevo-testamento/40-mateo.html",
    "Marcos": "nuevo-testamento/41-marcos.html",
    "Lucas": "nuevo-testamento/42-lucas.html",
    "Juan": "nuevo-testamento/43-juan.html",
    "Hechos": "nuevo-testamento/44-hechos.html",
    "Romanos": "nuevo-testamento/45-romanos.html",
    "1 Corintios": "nuevo-testamento/46-i-corintios.html",
    "2 Corintios": "nuevo-testamento/47-ii-corintios.html",
    "Galatas": "nuevo-testamento/48-galatas.html",
    "Efesios": "nuevo-testamento/49-efesios.html",
    "Filipenses": "nuevo-testamento/50-filipenses.html",
    "Colosenses": "nuevo-testamento/51-colosenses.html",
    "1 Tesalonicenses": "nuevo-testamento/52-i-tesalonicenses.html",
    "2 Tesalonicenses": "nuevo-testamento/53-ii-tesalonicenses.html",
    "1 Timoteo": "nuevo-testamento/54-i-timoteo.html",
    "2 Timoteo": "nuevo-testamento/55-ii-timoteo.html",
    "Tito": "nuevo-testamento/56-tito.html",
    "Filemon": "nuevo-testamento/57-filemon.html",
    "Hebreos": "nuevo-testamento/58-hebreos.html",
    "Santiago": "nuevo-testamento/59-santiago.html",
    "1 Pedro": "nuevo-testamento/60-i-pedro.html",
    "2 Pedro": "nuevo-testamento/61-ii-pedro.html",
    "1 Juan": "nuevo-testamento/62-i-juan.html",
    "2 Juan": "nuevo-testamento/63-ii-juan.html",
    "3 Juan": "nuevo-testamento/64-iii-juan.html",
    "Judas": "nuevo-testamento/65-judas.html",
    "Apocalipsis": "nuevo-testamento/66-apocalipsis.html"
};

let _currentCbaCache = { book: null, content: null };
// Guardar versículo enfocado para auto-scroll
let _cbaVersoEnfoque = null;

/**
 * Abre el panel CBA — ahora acepta un versículo opcional para auto-scroll
 * @param {number|null} verso - Versículo específico para enfocar (null = capítulo completo)
 */
window.abrirCbaActual = async function (verso = null) {
    const libro = window.currentLibroNombre;
    const capitulo = window.currentCapitulo;
    if (!libro) return;

    _cbaVersoEnfoque = verso;
    mostrarCbaPanel();

    document.getElementById('cba-content').innerHTML = `
        <div style="text-align:center; padding:40px;">
            <div class="loader-spinner" style="margin:0 auto"></div>
            <p style="margin-top:15px; color:#a29bfe; font-size:0.9rem">
                ${verso ? `Buscando comentario para versículo ${verso}...` : 'Cargando comentario del capítulo...'}
            </p>
        </div>
    `;

    try {
        const text = await getCbaText(libro);
        renderCbaChapter(text, libro, capitulo, verso);
    } catch (e) {
        console.error("Error cargando CBA:", e);
        document.getElementById('cba-content').innerHTML = `
            <div style="text-align:center; padding:20px; color:#ff4757">
                <p style="font-size:1.2rem">⚠️</p>
                <p style="font-weight:900; margin-bottom:8px">No se pudo cargar el comentario para ${libro}.</p>
                <p style="font-size:0.72rem; opacity:0.6; font-family:monospace; background:rgba(255,71,87,0.1); padding:8px; border-radius:8px; margin-top:8px">${e.message}</p>
                <button onclick="window.abrirCbaActual(${verso})" style="margin-top:12px; background:rgba(85,239,196,0.15); border:1px solid #55efc4; color:#55efc4; padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:900; font-size:0.85rem;">🔄 REINTENTAR</button>
            </div>
        `;
    }
};

/**
 * Navegar a otro capítulo dentro del CBA (sin cerrar el panel)
 */
window.cbaIrCapitulo = async function (cap) {
    const libro = window.currentLibroNombre;
    if (!libro) return;
    window.currentCapitulo = cap;
    _cbaVersoEnfoque = null;

    document.getElementById('cba-content').innerHTML = `
        <div style="text-align:center; padding:40px;">
            <div class="loader-spinner" style="margin:0 auto"></div>
            <p style="margin-top:15px; color:#a29bfe; font-size:0.9rem">Cargando capítulo ${cap}...</p>
        </div>
    `;

    try {
        const text = await getCbaText(libro);
        renderCbaChapter(text, libro, cap, null);
    } catch (e) {
        document.getElementById('cba-content').innerHTML = `
            <div style="text-align:center; padding:20px; color:#ff4757">
                <p>⚠️ Error al cargar capítulo ${cap}</p>
                <button onclick="window.cbaIrCapitulo(${cap})" style="margin-top:12px; background:rgba(85,239,196,0.15); border:1px solid #55efc4; color:#55efc4; padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:900;">🔄 REINTENTAR</button>
            </div>
        `;
    }
};

/**
 * Obtiene el texto del libro desde GitHub o caché
 */
async function getCbaText(libro) {
    if (_currentCbaCache.book === libro) return _currentCbaCache.content;

    const fileName = CBA_BOOKS_MAP[libro];
    if (!fileName) throw new Error(`Libro "${libro}" no mapeado en CBA`);

    const url = CBA_BASE_URL + fileName;
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit'
    });

    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${fileName}`);

    const html = await response.text();
    _currentCbaCache = { book: libro, content: html };
    return html;
}

/**
 * Renderiza el capítulo con navegación y auto-scroll al versículo
 */
function renderCbaChapter(html, libro, capitulo, versoEnfoque) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const divs = doc.querySelectorAll('div.t');

    let contentHtml = "";
    let foundChapter = false;
    let currentVerse = 0;
    let versiculosEncontrados = [];

    const capNum = parseInt(capitulo);
    const capturePattern = new RegExp(`^CAP[ÍI]TULO\\s*${capNum}\\b`, 'i');
    const nextCapPattern = new RegExp(`^CAP[ÍI]TULO\\s*${capNum + 1}\\b`, 'i');

    divs.forEach(div => {
        let text = div.textContent.trim();
        if (!text) return;

        if (capturePattern.test(text)) {
            foundChapter = true;
            return;
        }

        if (foundChapter && nextCapPattern.test(text)) {
            foundChapter = false;
        }

        if (foundChapter) {
            const verseMatch = text.match(/^([0-9]+)\.\s*/);
            if (verseMatch) {
                currentVerse = parseInt(verseMatch[1]);
                versiculosEncontrados.push(currentVerse);
                text = text.replace(/^([0-9]+)\.\s*/, '');

                // Resaltar el versículo seleccionado
                const esEnfocado = versoEnfoque && currentVerse === parseInt(versoEnfoque);
                const estilo = esEnfocado
                    ? 'margin-top:20px; color:#55efc4; font-weight:900; font-size:0.85rem; background:rgba(85,239,196,0.15); padding:8px 12px; border-radius:10px; border-left:4px solid #55efc4;'
                    : 'margin-top:20px; color:#a29bfe; font-weight:900; font-size:0.8rem';

                contentHtml += `<div id="cba-v-${currentVerse}" class="cba-verse-header" style="${estilo}">
                    VERSÍCULO ${currentVerse} ${esEnfocado ? '← Tu versículo' : ''}
                </div>`;
            }

            contentHtml += `<p class="cba-text" style="font-size:1rem; line-height:1.7; color:rgba(255,255,255,0.85); margin-bottom:8px;">${text}</p>`;
        }
    });

    if (contentHtml === "") {
        contentHtml = `<p style="text-align:center; padding:30px; opacity:0.6">No se encontró comentario detallado para el capítulo ${capitulo} de ${libro}.</p>`;
    }

    // ── BARRA DE NAVEGACIÓN DE CAPÍTULOS ──
    const navHtml = `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:12px 0; border-bottom:1px solid rgba(162,155,254,0.2); margin-bottom:15px;">
            <button onclick="window.cbaIrCapitulo(${capNum - 1})" 
                style="background:rgba(85,239,196,0.12); border:1.5px solid #55efc4; color:#55efc4; padding:8px 14px; border-radius:10px; font-weight:900; cursor:pointer; font-size:0.8rem; ${capNum <= 1 ? 'opacity:0.3; pointer-events:none;' : ''}"
            >◀ Cap ${capNum - 1}</button>
            
            <div style="text-align:center; flex:1;">
                <div style="color:#55efc4; font-weight:900; font-size:1rem; letter-spacing:1px;">${libro.toUpperCase()}</div>
                <div style="color:#a29bfe; font-weight:700; font-size:0.75rem; letter-spacing:2px;">CAPÍTULO ${capNum}</div>
            </div>
            
            <button onclick="window.cbaIrCapitulo(${capNum + 1})" 
                style="background:rgba(85,239,196,0.12); border:1.5px solid #55efc4; color:#55efc4; padding:8px 14px; border-radius:10px; font-weight:900; cursor:pointer; font-size:0.8rem;"
            >Cap ${capNum + 1} ▶</button>
        </div>
    `;

    // ── ÍNDICE RÁPIDO DE VERSÍCULOS ──
    let indexHtml = '';
    if (versiculosEncontrados.length > 0) {
        indexHtml = `
            <div style="margin-bottom:15px; padding:10px; background:rgba(162,155,254,0.08); border-radius:12px; border:1px solid rgba(162,155,254,0.15);">
                <div style="color:#a29bfe; font-size:0.65rem; font-weight:900; letter-spacing:2px; margin-bottom:8px;">IR AL VERSÍCULO:</div>
                <div style="display:flex; flex-wrap:wrap; gap:5px;">
                    ${versiculosEncontrados.map(v => {
            const activo = versoEnfoque && v === parseInt(versoEnfoque);
            return `<button onclick="document.getElementById('cba-v-${v}').scrollIntoView({behavior:'smooth',block:'start'})" 
                            style="min-width:36px; padding:6px 8px; background:${activo ? 'rgba(85,239,196,0.3)' : 'rgba(255,255,255,0.06)'}; border:1px solid ${activo ? '#55efc4' : 'rgba(255,255,255,0.15)'}; color:${activo ? '#55efc4' : '#fff'}; border-radius:8px; font-weight:700; font-size:0.75rem; cursor:pointer;">${v}</button>`;
        }).join('')}
                </div>
            </div>
        `;
    }

    document.getElementById('cba-content').innerHTML = navHtml + indexHtml + contentHtml;

    // Actualizar título del panel
    const titleEl = document.getElementById('cba-title') || document.querySelector('.cba-header span');
    if (titleEl) titleEl.textContent = `📖 CBA: ${libro} ${capitulo}${versoEnfoque ? ':' + versoEnfoque : ''}`;

    // ── AUTO-SCROLL al versículo enfocado ──
    if (versoEnfoque) {
        setTimeout(() => {
            const el = document.getElementById(`cba-v-${versoEnfoque}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
}

/**
 * Funciones de UI para el panel
 */
function mostrarCbaPanel() {
    document.getElementById('cba-panel').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarCbaPanel() {
    document.getElementById('cba-panel').classList.remove('active');
    document.body.style.overflow = '';
}
