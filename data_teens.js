// ==========================================
// LEGADO BÍBLICO - ENGINE TEENS v3.0
// ==========================================
const BIBLIA_API_URL = "https://bible-api.deno.dev/api/read/";

// --- BANCO DE PREGUNTAS — FILOSOFÍA ADVENTISTA DEL SÉPTIMO DÍA ---
const JUEGOS_BANCO = [
    // --- DOCTRINA SDA ---
    { p: "¿Qué día es el Sábado bíblico según el 4to mandamiento?", o: ["Viernes", "Sábado", "Domingo"], c: 1 },
    { p: "¿En qué capítulo de Apocalipsis está el mensaje de los Tres Ángeles?", o: ["Capítulo 7", "Capítulo 14", "Capítulo 12"], c: 1 },
    { p: "¿Qué significa la palabra 'Adventista'?", o: ["Creyente en el Sábado", "Creyente en la Segunda Venida", "Creyente en el bautismo"], c: 1 },
    { p: "¿Qué dice Eclesiastés 9:5 sobre el estado de los muertos?", o: ["Van al cielo inmediatamente", "No saben nada — duermen", "Se comunican con los vivos"], c: 1 },
    { p: "¿Cuántos mandamientos tiene la Ley de Dios?", o: ["7", "10", "12"], c: 1 },
    { p: "¿Quién escribió 'El Camino a Cristo' y 'El Conflicto de los Siglos'?", o: ["Elena G. de White", "Martín Lutero", "Juan Calvino"], c: 0 },
    { p: "¿Qué modelo de salud proclama la Iglesia Adventista?", o: ["Solo oración", "NEWSTART (salud integral)", "Medicina natural solamente"], c: 1 },
    { p: "¿Cómo se llama la esperanza central del pueblo adventista?", o: ["La Gran Espera", "La Bendita Esperanza", "El Gran Avivamiento"], c: 1 },
    { p: "¿Qué es el 'Juicio Investigador' en la doctrina adventista?", o: ["Un juicio humano", "El examen de registros en el santuario celestial antes de la venida de Cristo", "El juicio del Gran Trono Blanco"], c: 1 },
    { p: "¿En qué libro bíblico se describen las 2,300 tardes y mañanas?", o: ["Apocalipsis 13", "Daniel 8", "Ezequiel 4"], c: 1 },
    // --- PROFECÍAS ---
    { p: "¿Cuánto tiempo profético duró el dominio del papado en Daniel 7?", o: ["1260 días/años", "2300 años", "490 años"], c: 0 },
    { p: "¿Qué simboliza el Santuario del Antiguo Testamento en la doctrina adventista?", o: ["Solo historia judía", "El plan de salvación y el ministerio de Cristo en el cielo", "El Templo de Salomón solamente"], c: 1 },
    { p: "¿Qué significa el principio día-a-año en profecía bíblica?", o: ["Un día profético = 30 años literales", "Un día profético = 1 año literal", "Un día profético = 7 años literales"], c: 1 },
    { p: "¿En qué año se fundó oficialmente la Iglesia Adventista del Séptimo Día?", o: ["1844", "1863", "1888"], c: 1 },
    { p: "¿Qué ocurre con los justos cuando Jesús regrese según 1 Tesalonicenses 4:16-17?", o: ["Quedan en la tierra", "Son arrebatados para encontrar al Señor en el aire", "Van al purgatorio"], c: 1 },
    // --- BIBLIA GENERAL ---
    { p: "¿Qué día descansó Dios en la creación según Génesis 2?", o: ["El 5to día", "El 7mo día", "El 1er día"], c: 1 },
    { p: "'Aquí está la paciencia de los santos: los que guardan los mandamientos de Dios y la fe de Jesús'. ¿Dónde está este texto?", o: ["Romanos 14:12", "Apocalipsis 14:12", "Daniel 7:21"], c: 1 },
    { p: "¿Qué forma de bautismo practica la Iglesia Adventista?", o: ["Aspersión", "Inmersión completa", "Cualquier forma es válida"], c: 1 },
    { p: "¿Quién construyó el arca según Génesis?", o: ["Abraham", "Noé", "Moisés"], c: 1 },
    { p: "¿Qué significa el nombre 'Inmanuel' según Isaías 7:14?", o: ["Dios salva", "Dios con nosotros", "Jehová es fuerte"], c: 1 },
    { p: "¿En qué río fue bautizado Jesús?", o: ["Nilo", "Jordán", "Eufrates"], c: 1 },
    { p: "¿Cuántos libros tiene la Biblia en total?", o: ["60", "66", "72"], c: 1 },
    { p: "¿Quién mató al gigante Goliat?", o: ["Salomón", "Saúl", "David"], c: 2 }
];

const ESTRUCTURA_BIBLIA = {
    "ANTIGUO TESTAMENTO": {
        color: "#55efc4",
        categorias: {
            "Pentateuco (La Ley)": ["Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio"],
            "Libros Históricos": ["Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", "Esdras", "Nehemías", "Ester"],
            "Poéticos y Sapienciales": ["Job", "Salmos", "Proverbios", "Eclesiastés", "Cantares"],
            "Profetas Mayores": ["Isaías", "Jeremías", "Lamentaciones", "Ezequiel", "Daniel"],
            "Profetas Menores": ["Oseas", "Joel", "Amós", "Abdías", "Jonás", "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo", "Zacarías", "Malaquías"]
        }
    },
    "NUEVO TESTAMENTO": {
        color: "#a29bfe",
        categorias: {
            "Evangelios": ["Mateo", "Marcos", "Lucas", "Juan"],
            "Historia": ["Hechos"],
            "Epístolas Paulinas": ["Romanos", "1 Corintios", "2 Corintios", "Gálatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemón"],
            "Epístolas Generales": ["Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas"],
            "Profecía (Apocalíptico)": ["Apocalipsis"]
        }
    }
};

const IMAGENES_TEMATICAS = {
    profectico: "vision_profetica_moderna_1772145951421.png",
    paisaje: "biblia_paisaje_majestuoso_1772145938797.png"
};

// --- ESTADO GLOBAL ---
let currentTranslation = "rv1960";
let currentLibroSlug = "";
let currentLibroNombre = "";
let currentCapitulo = 1;
let totalCapitulos = 1;
let currentThemeIndex = 0;
const themes = ['', 'reading-theme-sepia', 'reading-theme-night'];

// Estado del juego
let juegoState = { preguntaIdx: 0, vidas: 3, xp: 0, total: 0, preguntas: [], timer: null, tiempo: 20 };

// --- NORMALIZACIÓN ---
function normalizarLibro(libro) {
    const mapa = {
        "Génesis": "genesis", "Éxodo": "exodo", "Levítico": "levitico", "Números": "numeros", "Deuteronomio": "deuteronomio",
        "Josué": "josue", "Jueces": "jueces", "Rut": "rut", "1 Samuel": "1_samuel", "2 Samuel": "2_samuel",
        "1 Reyes": "1_reyes", "2 Reyes": "2_reyes", "1 Crónicas": "1_cronicas", "2 Crónicas": "2_cronicas",
        "Esdras": "esdras", "Nehemías": "nehemias", "Ester": "ester", "Job": "job", "Salmos": "salmos",
        "Proverbios": "proverbios", "Eclesiastés": "eclesiastes", "Cantares": "cantares", "Isaías": "isaias",
        "Jeremías": "jeremias", "Lamentaciones": "lamentaciones", "Ezequiel": "ezequiel", "Daniel": "daniel",
        "Oseas": "oseas", "Joel": "joel", "Amós": "amos", "Abdías": "abdias", "Jonás": "jonas",
        "Miqueas": "miqueas", "Nahúm": "nahum", "Habacuc": "habacuc", "Sofonías": "sofonias",
        "Hageo": "hageo", "Zacarías": "zacarias", "Malaquías": "malaquias", "Mateo": "mateo",
        "Marcos": "marcos", "Lucas": "lucas", "Juan": "juan", "Hechos": "hechos", "Romanos": "romanos",
        "1 Corintios": "1_corintios", "2 Corintios": "2_corintios", "Gálatas": "galatas", "Efesios": "efesios",
        "Filipenses": "filipenses", "Colosenses": "colosenses", "1 Tesalonicenses": "1_tesalonicenses",
        "2 Tesalonicenses": "2_tesalonicenses", "1 Timoteo": "1_timoteo", "2 Timoteo": "2_timoteo",
        "Tito": "tito", "Filemón": "filemon", "Hebreos": "hebreos", "Santiago": "santiago",
        "1 Pedro": "1_pedro", "2 Pedro": "2_pedro", "1 Juan": "1_juan", "2 Juan": "2_juan",
        "3 Juan": "3_juan", "Judas": "judas", "Apocalipsis": "apocalipsis"
    };
    return mapa[libro] || libro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_');
}

async function buscarEnBiblia(slug, cap = 1, trans = "rv1960") {
    try {
        const v = (trans === "tla" || trans === "pdt") ? "pdt" : "rv1960";
        const r = await fetch(`${BIBLIA_API_URL}${v}/${slug}/${cap}`);
        return await r.json();
    } catch (e) { return null; }
}

// ==========================================
// PERSPECTIVAS BÍBLICAS — FILOSOFÍA SDA
// ==========================================
const BIBLE_INSIGHTS = {
    // Textos clave con lentes Adventistas
    "Isa\u00edas 1:18": "🔄 La redencion es total. No importa el historial — Dios puede restaurarte completamente. Elena G. de White escribio: 'La misericordia de Dios es tan grande como Su ley es perfecta.' Este es el corazon del Gran Conflicto.",
    "Josue 1:9": "🗡️ El pueblo Adventista es llamado a pararse firme en los ultimos dias. Apoc. 14:12 habla de los que 'guardan los mandamientos de Dios y la fe de Jesus'. Eso requiere esta clase de valentia.",
    "Salmos 23:1": "✨ El Sabado existe para recordarnos que Dios es nuestro Pastor. No es ritual — es una cita semanal con el Creador que dice: 'Aqui estoy, soy tu Senor' (Genesis 2:3). Descansa en El.",
    "Mateo 5:14": "👥 Los jovenes Adventistas somos llamados a ser luz. Nuestro estilo de vida NEWSTART testifica: salud, integridad y servicio. Nuestra diferencia ES nuestro testimonio.",
    "Juan 3:16": "❤️🔥 El corazon del Gran Conflicto. Dios no entrego a Su Hijo para condenar, sino para salvar. Esta verdad conecta con el Juicio Investigador: Dios quiere que estemos del lado de Cristo.",
    "Apocalipsis 14:12": "🕎 Este es el texto de identidad Adventista. Guardar los mandamientos de Dios (incluido el Sabado) y la fe de Jesus. No es legalismo — es lealtad a Aquel que nos amo primero.",
    "Daniel 8:14": "👀 Las 2,300 tardes y mananas — la profecia que ubico a los Adventistas en el mapa historico. Concluye en 1844. El Juicio Investigador comenzo. Jesus aboga por ti ahora mismo en el cielo.",
    "Genesis 2:3": "🌟 Aqui nace el Sabado. Antes de Israel, antes de Moises, Dios santifico el 7mo dia. No es tradicion cultural — es una institucion creacional para toda la humanidad. El sello del Creador en el tiempo."
};

// ==========================================
// HUB PRINCIPAL
// ==========================================
function renderBibliaDinamicaTeens() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div class="content-wrapper">
            <header class="teen-header">
                <button class="btn-volver" onclick="window.location.reload()">&#8592; INICIO</button>
                <div class="header-main">
                    <span class="badget-teen" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);letter-spacing:3px">&#9729;&#65039; IGLESIA ADVENTISTA DEL 7MO DÍA</span>
                    <h1>BIBLIA INTERACTIVA</h1>
                    <p style="font-size:0.85rem;opacity:0.7;letter-spacing:1px">Ap. 14:12 — Guardadores de Mandamientos | Hola, ${usuarioActual.nombre} | <span class="score-global">PUNTOS: 0</span></p>
                </div>
            </header>
            <nav class="teen-nav">
                <button id="nav-btn-lectura" onclick="cambiarSeccionTeen('lectura')" class="nav-active">📖 LECTURA</button>
                <button id="nav-btn-explorar" onclick="cambiarSeccionTeen('explorar')">🔍 EXPLORADOR</button>
                <button id="nav-btn-jugar" onclick="cambiarSeccionTeen('jugar')">🎮 JUEGOS</button>
            </nav>
            <div id="teen-content-area"></div>
        </div>
    `;
    cambiarSeccionTeen('lectura');
    actualizarMarcadorReal();
}

function cambiarSeccionTeen(seccion) {
    document.querySelectorAll('.teen-nav button').forEach(b => b.classList.remove('nav-active'));
    const btn = document.getElementById(`nav-btn-${seccion}`);
    if (btn) btn.classList.add('nav-active');
    if (seccion === 'lectura') renderSelectorLibros();
    else if (seccion === 'explorar') renderExplorador();
    else if (seccion === 'jugar') renderJuegoTeens();
}

// ==========================================
// LECTURA — SELECTOR DE LIBROS
// ==========================================
function renderSelectorLibros() {
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div class="bible-selector-container">
            <div style="text-align:center; margin-bottom:40px;">
                <div class="search-bar-premium" style="max-width:500px;margin:0 auto;border-radius:20px;">
                    <span>🔍</span>
                    <input type="text" id="global-bible-search" placeholder="Busca un libro..." onkeyup="filtrarLibrosGlobal(this.value)">
                </div>
                <p style="opacity:0.3;font-size:0.8rem;letter-spacing:3px;margin-top:15px">LA PALABRA DE DIOS A TU ALCANCE</p>
            </div>
            <div id="bible-main-grid" class="dual-landing-grid" style="gap:20px;max-width:1200px;margin:0 auto;height:160px;margin-bottom:40px">
                <div id="nav-antiguo" class="hero-panel antiguo" onclick="mostrarSeccionTestamento('ANTIGUO TESTAMENTO')" ontouchstart="mostrarSeccionTestamento('ANTIGUO TESTAMENTO')" style="border-radius:20px;cursor:pointer">
                    <div class="hero-info" style="left:20px;bottom:20px"><h3 style="font-size:1.6rem;margin:0">ANTIGUO</h3><p style="font-size:0.65rem;letter-spacing:2px;margin:0;opacity:0.7">PROMESAS</p></div>
                </div>
                <div id="nav-nuevo" class="hero-panel nuevo" onclick="mostrarSeccionTestamento('NUEVO TESTAMENTO')" ontouchstart="mostrarSeccionTestamento('NUEVO TESTAMENTO')" style="border-radius:20px;cursor:pointer">
                    <div class="hero-info" style="left:20px;bottom:20px"><h3 style="font-size:1.6rem;margin:0">NUEVO</h3><p style="font-size:0.65rem;letter-spacing:2px;margin:0;opacity:0.7">REVELACIÓN</p></div>
                </div>
            </div>
            <div id="bible-browse-area"><div id="libros-dinamicos-root" style="width:100%">
                <div style="text-align:center;padding:60px;opacity:0.4"><p style="font-size:1.2rem;font-weight:200;letter-spacing:5px">SELECCIONA UN TESTAMENTO</p></div>
            </div></div>
        </div>
    `;
}

function mostrarSeccionTestamento(testamento) {
    const root = document.getElementById('libros-dinamicos-root');
    const info = ESTRUCTURA_BIBLIA[testamento];
    ['nav-antiguo', 'nav-nuevo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.boxShadow = 'none'; el.style.transform = 'scale(1)'; }
    });
    const activo = testamento === 'ANTIGUO TESTAMENTO' ? 'nav-antiguo' : 'nav-nuevo';
    const el = document.getElementById(activo);
    if (el) { el.style.boxShadow = `0 0 30px rgba(${testamento === 'ANTIGUO TESTAMENTO' ? '85,239,196' : '162,155,254'},0.4)`; el.style.transform = 'scale(1.02)'; }
    root.innerHTML = `
        <div style="padding:0 20px;animation:fadeIn 0.4s ease">
            <div style="text-align:center;margin-bottom:30px">
                <h2 style="color:${info.color};font-size:2rem;font-weight:300;letter-spacing:8px;text-transform:uppercase;margin:0">${testamento}</h2>
                <div style="width:60px;height:3px;background:${info.color};margin:15px auto;border-radius:10px;opacity:0.6"></div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:20px">
                ${Object.entries(info.categorias).map(([cat, libros]) => `
                    <div style="padding:25px;border-radius:20px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05)">
                        <h4 style="color:${info.color};font-size:0.8rem;margin-bottom:20px;opacity:0.6;letter-spacing:2px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:10px">${cat.toUpperCase()}</h4>
                        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">
                            ${libros.map(l => `<button class="btn-libro-premium" style="padding:12px;font-size:0.9rem;border-radius:10px" onclick="abrirLibro('${l}')">${l}</button>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    window.scrollTo({ top: 350, behavior: 'smooth' });
}

function filtrarLibrosGlobal(query) {
    const mainGrid = document.getElementById('bible-main-grid');
    const root = document.getElementById('libros-dinamicos-root');
    const valor = query.trim();
    if (!valor) { if (mainGrid) mainGrid.style.display = 'grid'; if (root) root.innerHTML = ''; return; }
    if (mainGrid) mainGrid.style.display = 'none';
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const buscar = norm(valor);
    let encontrados = [];
    for (let t in ESTRUCTURA_BIBLIA) { const ti = ESTRUCTURA_BIBLIA[t]; for (let c in ti.categorias) { ti.categorias[c].forEach(l => { if (norm(l).includes(buscar)) encontrados.push({ nombre: l, color: ti.color }); }); } }
    root.innerHTML = `
        <div style="max-width:900px;margin:0 auto;animation:fadeIn 0.4s ease">
            <div style="text-align:center;margin-bottom:20px"><span class="badget-teen">${encontrados.length} RESULTADOS PARA "${valor.toUpperCase()}"</span></div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">
                ${encontrados.map(e => `<button class="btn-libro-premium" style="border-left:4px solid ${e.color}" onclick="abrirLibro('${e.nombre}')">${e.nombre}</button>`).join('')}
                ${encontrados.length === 0 ? '<p style="opacity:0.4;grid-column:1/-1;text-align:center;padding:40px">No encontrado. Prueba con otra palabra...</p>' : ''}
            </div>
        </div>
    `;
}

// ==========================================
// LECTURA — INMERSIVA CON NAVEGACIÓN RÁPIDA
// ==========================================
async function abrirLibro(libro, cap = 1, trans = "rv1960") {
    currentTranslation = trans;
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    currentCapitulo = parseInt(cap);
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `<div class="loader-bible-modern"><div class="loader-spinner"></div><h2 style="color:#fff;font-weight:900;letter-spacing:2px">CARGANDO ${libro.toUpperCase()} ${cap}...</h2></div>`;
    const data = await buscarEnBiblia(currentLibroSlug, currentCapitulo, currentTranslation);
    if (data && data.vers) {
        totalCapitulos = data.num_chapters || currentCapitulo;
        renderLecturaInmersivaReal(data);
    } else {
        area.innerHTML = `<div style="text-align:center;padding:80px"><h3>Error cargando ${libro}</h3><button onclick="renderSelectorLibros()" class="btn-check" style="max-width:200px;margin-top:20px">VOLVER</button></div>`;
    }
}

async function cambiarCapitulo(delta) {
    const nuevoCap = currentCapitulo + delta;
    if (nuevoCap < 1 || nuevoCap > totalCapitulos) return;
    await abrirLibro(currentLibroNombre, nuevoCap, currentTranslation);
}

async function irACapitulo() {
    const input = document.getElementById('cap-input');
    if (!input) return;
    const val = parseInt(input.value);
    if (val >= 1 && val <= totalCapitulos) await abrirLibro(currentLibroNombre, val, currentTranslation);
}

function renderLecturaInmersivaReal(data) {
    const area = document.getElementById('teen-content-area');
    const bgHero = ['Isaías', 'Jeremías', 'Ezequiel', 'Daniel', 'Apocalipsis'].some(p => data.name.includes(p)) ? IMAGENES_TEMATICAS.profectico : IMAGENES_TEMATICAS.paisaje;
    const esRV = currentTranslation === 'rv1960';

    area.innerHTML = `
        <div class="immersive-reader-container" id="reader-container">
            <div class="reading-progress-container"><div class="reading-progress-bar" id="reading-bar"></div></div>

            <!-- TOOLBAR FLOTANTE -->
            <div class="immersive-controls">
                <button class="btn-reader-tool" onclick="toggleReadingTheme()" title="Tema">🎨</button>
                <button class="btn-reader-tool" onclick="switchTranslation()" title="Versión" style="font-size:0.7rem;font-weight:900">${esRV ? 'RV' : 'TLA'}</button>
                <button class="btn-reader-tool" onclick="renderSelectorLibros()" title="Salir">✕</button>
            </div>

            <!-- HERO -->
            <div class="reader-hero" style="background-image:url('${bgHero}')">
                <div class="hero-content">
                    <span class="badget-teen" style="margin-bottom:15px;display:inline-block">MODO LECTURA</span>
                    <h2>${data.name.toUpperCase()} — CAPÍTULO ${data.chapter}</h2>
                    <p class="subtitle-hero">${currentTranslation.toUpperCase()} | ${data.vers.length} VERSÍCULOS</p>
                </div>
            </div>

            <!-- NAVEGACIÓN RÁPIDA SUPERIOR (SIEMPRE VISIBLE) -->
            <div id="nav-bar-reader" style="position:sticky;top:0;z-index:500;background:rgba(0,0,0,0.85);backdrop-filter:blur(20px);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08)">
                <button onclick="cambiarCapitulo(-1)" ${currentCapitulo <= 1 ? 'disabled' : ''} style="background:${currentCapitulo <= 1 ? 'rgba(255,255,255,0.05)' : '#55efc4'};color:#000;border:none;padding:8px 18px;border-radius:8px;font-weight:900;cursor:pointer;opacity:${currentCapitulo <= 1 ? 0.3 : 1}">← PREV</button>
                <div style="display:flex;align-items:center;gap:10px">
                    <span style="color:#55efc4;font-weight:700;font-size:0.85rem">${data.name} ${data.chapter} / ${totalCapitulos}</span>
                    <input id="cap-input" type="number" min="1" max="${totalCapitulos}" placeholder="Cap." style="width:65px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 8px;border-radius:8px;text-align:center;font-size:0.85rem">
                    <button onclick="irACapitulo()" style="background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.8rem">IR ↩</button>
                </div>
                <button onclick="cambiarCapitulo(1)" ${currentCapitulo >= totalCapitulos ? 'disabled' : ''} style="background:${currentCapitulo >= totalCapitulos ? 'rgba(255,255,255,0.05)' : '#a29bfe'};color:#000;border:none;padding:8px 18px;border-radius:8px;font-weight:900;cursor:pointer;opacity:${currentCapitulo >= totalCapitulos ? 0.3 : 1}">SIG →</button>
            </div>

            <!-- VERSÍCULOS -->
            <div class="verses-container-dynamic">
                <div class="text-bible-flow">
                    ${data.vers.map(v => {
        const key = `${data.name} ${data.chapter}:${v.number}`;
        const hasInsight = BIBLE_INSIGHTS[key];
        return `
                        <div class="verse-block" onclick="mostrarContexto('${data.name} ${data.chapter}', ${v.number}, '${v.verse.replace(/'/g, "\\'")}')">
                            <span class="v-num-badge">${v.number}</span>
                            <p class="v-text-dynamic">${formatearTextoEspecial(v.verse)}${hasInsight ? '<span class="insight-dot"></span>' : ''}</p>
                        </div>`;
    }).join('')}
                </div>

                <!-- NAVEGACIÓN INFERIOR -->
                <div style="display:flex;justify-content:space-between;align-items:center;padding:60px 0 40px;border-top:1px solid rgba(255,255,255,0.05);margin-top:40px">
                    <button onclick="cambiarCapitulo(-1)" ${currentCapitulo <= 1 ? 'disabled' : ''} style="background:rgba(85,239,196,0.1);color:#55efc4;border:1px solid #55efc4;padding:15px 30px;border-radius:12px;cursor:pointer;font-weight:900;opacity:${currentCapitulo <= 1 ? 0.3 : 1}">← CAPÍTULO ANTERIOR</button>
                    <button onclick="marcarReto()" style="background:#55efc4;color:#000;border:none;padding:15px 30px;border-radius:12px;font-weight:900;cursor:pointer">✅ COMPLETAR +50 XP</button>
                    <button onclick="cambiarCapitulo(1)" ${currentCapitulo >= totalCapitulos ? 'disabled' : ''} style="background:rgba(162,155,254,0.1);color:#a29bfe;border:1px solid #a29bfe;padding:15px 30px;border-radius:12px;cursor:pointer;font-weight:900;opacity:${currentCapitulo >= totalCapitulos ? 0.3 : 1}">SIGUIENTE CAPÍTULO →</button>
                </div>
            </div>

            <!-- PANEL FLOTANTE LATERAL (siempre visible al scroll) -->
            <div id="float-nav" style="position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:600;display:flex;flex-direction:column;gap:10px;transition:opacity 0.4s">
                <!-- Anterior -->
                <button onclick="cambiarCapitulo(-1)" title="Capítulo anterior"
                    style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid ${currentCapitulo <= 1 ? 'rgba(255,255,255,0.05)' : 'rgba(85,239,196,0.4)'};color:${currentCapitulo <= 1 ? 'rgba(255,255,255,0.2)' : '#55efc4'};width:48px;height:48px;border-radius:12px;cursor:${currentCapitulo <= 1 ? 'default' : 'pointer'};font-size:1.2rem;display:flex;align-items:center;justify-content:center;font-weight:900"
                    ${currentCapitulo <= 1 ? 'disabled' : ''}>‹</button>
                <!-- Indicador de capítulo -->
                <div style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:12px;width:48px;padding:8px 0;text-align:center">
                    <div style="color:#55efc4;font-size:0.65rem;font-weight:900;line-height:1.2">${data.chapter}<br><span style="color:rgba(255,255,255,0.3);font-size:0.5rem">/${totalCapitulos}</span></div>
                </div>
                <!-- Siguiente -->
                <button onclick="cambiarCapitulo(1)" title="Capítulo siguiente"
                    style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid ${currentCapitulo >= totalCapitulos ? 'rgba(255,255,255,0.05)' : 'rgba(162,155,254,0.4)'};color:${currentCapitulo >= totalCapitulos ? 'rgba(255,255,255,0.2)' : '#a29bfe'};width:48px;height:48px;border-radius:12px;cursor:${currentCapitulo >= totalCapitulos ? 'default' : 'pointer'};font-size:1.2rem;display:flex;align-items:center;justify-content:center;font-weight:900"
                    ${currentCapitulo >= totalCapitulos ? 'disabled' : ''}>›</button>
                <!-- Cambiar libro -->
                <button onclick="renderSelectorLibros()" title="Cambiar libro"
                    style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid rgba(254,202,87,0.3);color:#feca57;width:48px;height:48px;border-radius:12px;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center">📚</button>
            </div>

            <!-- TARJETA DE CONTEXTO -->
            <div id="context-card" class="context-card">
                <div class="context-header">
                    <span class="context-title" id="context-ref">DATO PRO</span>
                    <span class="context-close" onclick="cerrarContexto()">✕</span>
                </div>
                <div class="context-content" id="context-body"></div>
                <div style="margin-top:12px">
                    <textarea id="personal-note" placeholder="Tu reflexión personal..." style="width:100%;height:55px;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;padding:8px;font-size:0.85rem;resize:none;box-sizing:border-box"></textarea>
                    <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
                        <button onclick="guardarNotaRapida()" style="background:#55efc4;color:#000;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:bold;font-size:0.75rem">💾 GUARDAR</button>
                        <button class="tag-badge" onclick="etiquetarVersiculo('#paz')">#paz</button>
                        <button class="tag-badge" onclick="etiquetarVersiculo('#fuerza')">#fuerza</button>
                        <button class="tag-badge" onclick="etiquetarVersiculo('#duda')">#duda</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    window.onscroll = manejarScroll;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    cerrarContexto();
}

function manejarScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const bar = document.getElementById("reading-bar");
    if (bar) bar.style.width = ((winScroll / height) * 100) + "%";
}

function mostrarContexto(ref, num, texto) {
    const card = document.getElementById('context-card');
    const key = `${ref}:${num}`;
    const insight = BIBLE_INSIGHTS[key] || "Este versículo habla directamente a tu situación hoy. ¿Qué te dice a ti personalmente? 🙏";
    document.getElementById('context-ref').innerText = `${ref}:${num} — DATO PRO`;
    document.getElementById('context-body').innerHTML = `
        <p style="font-size:0.9rem;font-style:italic;opacity:0.7;margin-bottom:12px">"${texto}"</p>
        <div style="background:rgba(85,239,196,0.1);padding:12px;border-radius:10px;border-left:4px solid #55efc4">${insight}</div>`;
    const saved = localStorage.getItem(`nota_${key}`);
    document.getElementById('personal-note').value = saved || "";
    card.dataset.currentKey = key;
    card.classList.add('active');
}

function cerrarContexto() { const c = document.getElementById('context-card'); if (c) c.classList.remove('active'); }
function guardarNotaRapida() {
    const card = document.getElementById('context-card');
    const key = card.dataset.currentKey;
    const note = document.getElementById('personal-note').value;
    if (key) { localStorage.setItem(`nota_${key}`, note); }
    mostrarToast("✅ Nota guardada");
}
function etiquetarVersiculo(tag) { mostrarToast(`Etiquetado como ${tag} 🏷️`); }
function toggleReadingTheme() {
    const c = document.getElementById('reader-container');
    if (c) c.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    if (themes[currentThemeIndex] && c) c.classList.add(themes[currentThemeIndex]);
}
function switchTranslation() {
    const next = currentTranslation === "rv1960" ? "tla" : "rv1960";
    abrirLibro(currentLibroNombre, currentCapitulo, next);
}
function formatearTextoEspecial(t) { return t.replace(/(Jehová|Dios|Jesús|Cristo|Espíritu|Padre)/g, '<strong>$1</strong>'); }

// ==========================================
// EXPLORADOR MEJORADO
// ==========================================
function renderExplorador() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;max-width:900px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
                <h2 style="font-size:2.5rem;font-weight:900;background:linear-gradient(to right,#55efc4,#a29bfe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0">🔍 BUSCADOR</h2>
                <p style="opacity:0.5;letter-spacing:2px;font-size:0.85rem">ENCUENTRA CUALQUIER VERSO EN SEGUNDOS</p>
            </div>

            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:30px;margin-bottom:30px">
                <div style="display:flex;gap:10px">
                    <input id="bible-search" type="text" placeholder="Ej: Juan 3:16 o Salmos 23" onkeyup="if(event.key==='Enter')ejecutarBusqueda()" style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);padding:15px 20px;border-radius:12px;color:#fff;font-size:1rem">
                    <button onclick="ejecutarBusqueda()" style="background:linear-gradient(135deg,#55efc4,#00b894);color:#000;border:none;padding:15px 25px;border-radius:12px;font-weight:900;cursor:pointer;white-space:nowrap">BUSCAR ⚡</button>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:15px">
                    ${['Juan 3:16', 'Salmos 23:1', 'Josué 1:9', 'Isaías 40:31', 'Filipenses 4:13'].map(s => `<button onclick="document.getElementById('bible-search').value='${s}';ejecutarBusqueda()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:6px 14px;border-radius:20px;cursor:pointer;font-size:0.8rem">${s}</button>`).join('')}
                </div>
            </div>

            <div id="search-results">
                <div style="text-align:center;padding:40px;opacity:0.3">
                    <p style="font-size:3rem">📖</p>
                    <p style="letter-spacing:3px;font-size:0.85rem">ESCRIBE UNA CITA BÍBLICA ARRIBA</p>
                </div>
            </div>
        </div>
    `;
}

async function ejecutarBusqueda() {
    const query = document.getElementById('bible-search').value.trim();
    if (!query) return;
    const results = document.getElementById('search-results');
    results.innerHTML = `<div style="text-align:center;padding:40px"><div class="loader-spinner" style="margin:0 auto 20px"></div><p>Buscando...</p></div>`;

    // Parsear cita: manejo de libros con número como "1 Juan 3:16"
    const partes = query.split(/\s+/);
    let libro, capVers;
    if (partes[0].match(/^\d$/) && partes.length >= 3) {
        libro = `${partes[0]} ${partes[1]}`; capVers = partes[2];
    } else { libro = partes[0]; capVers = partes[1]; }

    const [cap, vers] = capVers ? capVers.split(':') : ['1', null];
    const slug = normalizarLibro(libro);
    const data = await buscarEnBiblia(slug, cap || 1);

    if (data && data.vers) {
        let html = '';
        const target = vers ? data.vers.filter(v => v.number == vers) : data.vers.slice(0, 10);
        if (target.length === 0) { results.innerHTML = '<p style="text-align:center;opacity:0.5">Versículo no encontrado.</p>'; return; }
        html = target.map(v => `
            <div onclick="abrirLibro('${data.name}', ${data.chapter})" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:25px;margin-bottom:15px;cursor:pointer;transition:0.3s" onmouseover="this.style.background='rgba(85,239,196,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                    <span style="color:#55efc4;font-weight:900;font-size:0.85rem;letter-spacing:1px">${data.name} ${data.chapter}:${v.number}</span>
                    <button onclick="event.stopPropagation();abrirLibro('${data.name}',${data.chapter})" style="background:rgba(85,239,196,0.15);color:#55efc4;border:none;padding:5px 12px;border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:bold">LEER CAPÍTULO →</button>
                </div>
                <p style="font-family:'Crimson Text',serif;font-size:1.5rem;line-height:1.7;color:#f1f2f6;margin:0">"${formatearTextoEspecial(v.verse)}"</p>
            </div>
        `).join('');
        if (!vers) html += `<div style="text-align:center;padding:20px;opacity:0.5;font-size:0.8rem">Mostrando primeros 10 versículos. Busca con versículo específico para ver uno.</div>`;
        results.innerHTML = html;
    } else {
        results.innerHTML = `<div style="text-align:center;padding:40px;opacity:0.5"><p style="font-size:2rem">😕</p><p>No encontrado. Intenta con: <em>Juan 3:16</em></p></div>`;
    }
}

// ==========================================
// 🎮 JUEGOS — MODO ARENA
// ==========================================
function renderJuegoTeens() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;max-width:800px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
                <h2 style="font-size:2.5rem;font-weight:900;background:linear-gradient(to right,#ff6b6b,#feca57,#48dbfb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0">⚡ MODO ARENA</h2>
                <p style="opacity:0.5;letter-spacing:2px;font-size:0.85rem">¿CUÁNTO SABES DE LA BIBLIA?</p>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
                <!-- TRIVIA RÁPIDA -->
                <div onclick="iniciarJuego()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:24px;padding:35px;text-align:center;cursor:pointer;transition:0.3s;border:2px solid transparent" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 20px 40px rgba(108,92,231,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                    <div style="font-size:2.5rem;margin-bottom:10px">⚡</div>
                    <h3 style="color:#fff;font-size:1.1rem;font-weight:900;margin:0 0 8px">TRIVIA RÁPIDA</h3>
                    <p style="color:rgba(255,255,255,0.7);font-size:0.78rem;margin:0">10 preguntas · 20 seg c/u · 3 vidas</p>
                </div>
                <!-- VERSUS -->
                <div onclick="renderVersusLobby()" style="background:linear-gradient(135deg,rgba(255,107,107,0.2),rgba(254,202,87,0.15));border:2px solid rgba(255,107,107,0.4);border-radius:24px;padding:35px;text-align:center;cursor:pointer;transition:0.3s" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 20px 40px rgba(255,107,107,0.3)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                    <div style="font-size:2.5rem;margin-bottom:10px">🆚</div>
                    <h3 style="color:#feca57;font-size:1.1rem;font-weight:900;margin:0 0 8px">VERSUS EN VIVO</h3>
                    <p style="color:rgba(255,255,255,0.7);font-size:0.78rem;margin:0">Desafía a un amigo · Tiempo real · 8 rondas</p>
                </div>
            </div>

            <!-- TRIVIA POR LIBRO (nueva) -->
            <div onclick="renderConfiguradorTrivia()" style="background:linear-gradient(135deg,rgba(85,239,196,0.15),rgba(0,184,148,0.1));border:2px solid rgba(85,239,196,0.35);border-radius:24px;padding:30px;cursor:pointer;transition:0.3s;margin-bottom:25px;display:flex;align-items:center;gap:25px" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 15px 30px rgba(85,239,196,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                <div style="font-size:3rem;flex-shrink:0">📖</div>
                <div>
                    <h3 style="color:#55efc4;font-size:1.15rem;font-weight:900;margin:0 0 6px">TRIVIA POR LIBRO</h3>
                    <p style="color:rgba(255,255,255,0.65);font-size:0.82rem;margin:0">Elige un libro de la Biblia, selecciona cuántos capítulos estudiar y genera preguntas desde los versículos reales. ¡El modo más inteligente para estudiar!</p>
                </div>
                <div style="flex-shrink:0;color:#55efc4;font-size:1.5rem">→</div>
            </div>

            <!-- RÉCORD -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:25px">
                <h4 style="color:#feca57;margin:0 0 15px;font-size:0.85rem;letter-spacing:2px">🏆 TU RÉCORD</h4>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;text-align:center">
                    <div><div style="font-size:1.8rem;font-weight:900;color:#55efc4" id="stat-xp">0</div><div style="font-size:0.7rem;opacity:0.5">XP TOTAL</div></div>
                    <div><div style="font-size:1.8rem;font-weight:900;color:#a29bfe" id="stat-partidas">-</div><div style="font-size:0.7rem;opacity:0.5">MEJOR RACHA</div></div>
                    <div><div style="font-size:1.8rem;font-weight:900;color:#ff6b6b" id="stat-nivel">LV.1</div><div style="font-size:0.7rem;opacity:0.5">NIVEL</div></div>
                </div>
            </div>
        </div>
    `;
    actualizarMarcadorReal();
}

function iniciarJuego() {
    const preguntas = JUEGOS_BANCO.sort(() => Math.random() - 0.5).slice(0, 10);
    juegoState = { preguntaIdx: 0, vidas: 3, xp: 0, total: preguntas.length, preguntas, timer: null, tiempo: 20 };
    renderPregunta();
}

function renderPregunta() {
    const { preguntaIdx, vidas, xp, total, preguntas, tiempo } = juegoState;
    if (preguntaIdx >= total) { renderResultado(xp, total); return; }
    const q = preguntas[preguntaIdx];
    const pct = ((preguntaIdx) / total) * 100;
    const area = document.getElementById('teen-content-area');

    area.innerHTML = `
        <div style="padding:20px;max-width:700px;margin:0 auto">
            <!-- HUD -->
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <div style="display:flex;gap:5px">
                    ${'❤️'.repeat(vidas)}${'🖤'.repeat(3 - vidas)}
                </div>
                <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:6px 16px">
                    <span style="color:#feca57;font-weight:900;font-size:0.9rem" id="timer-display">⏱ ${tiempo}s</span>
                </div>
                <div style="color:#55efc4;font-weight:900">⚡ ${xp} XP</div>
            </div>

            <!-- BARRA DE PROGRESO -->
            <div style="background:rgba(255,255,255,0.08);border-radius:20px;height:8px;margin-bottom:25px;overflow:hidden">
                <div style="width:${pct}%;height:100%;background:linear-gradient(to right,#55efc4,#a29bfe);border-radius:20px;transition:width 0.5s"></div>
            </div>
            <div style="text-align:right;font-size:0.75rem;opacity:0.4;margin-bottom:20px">${preguntaIdx + 1} / ${total}</div>

            <!-- PREGUNTA -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:35px;margin-bottom:25px;text-align:center">
                <p style="font-size:1.4rem;font-weight:700;line-height:1.5;margin:0">${q.p}</p>
            </div>

            <!-- OPCIONES -->
            <div style="display:grid;gap:12px" id="opciones-grid">
                ${q.o.map((opt, i) => `
                    <button id="opt-${i}" onclick="responderTrivia(${i},${q.c})" style="background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.12);color:#fff;padding:18px 25px;border-radius:16px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.2s;text-align:left;display:flex;align-items:center;gap:12px" onmouseover="this.style.background='rgba(162,155,254,0.15)';this.style.borderColor='#a29bfe'" onmouseout="if(!this.dataset.answered){this.style.background='rgba(255,255,255,0.06)';this.style.borderColor='rgba(255,255,255,0.12)'}">
                        <span style="background:rgba(255,255,255,0.1);width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:900;flex-shrink:0">${['A', 'B', 'C'][i]}</span>
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Timer
    clearInterval(juegoState.timer);
    let t = tiempo;
    juegoState.timer = setInterval(() => {
        t--;
        const td = document.getElementById('timer-display');
        if (td) {
            td.innerText = `⏱ ${t}s`;
            td.style.color = t <= 5 ? '#ff6b6b' : '#feca57';
        }
        if (t <= 0) { clearInterval(juegoState.timer); tiempoAgotado(); }
    }, 1000);
}

function responderTrivia(idx, correcta) {
    clearInterval(juegoState.timer);
    const opts = document.querySelectorAll('[id^="opt-"]');
    opts.forEach(b => { b.style.pointerEvents = 'none'; b.dataset.answered = 'true'; });

    const btnCorrecto = document.getElementById(`opt-${correcta}`);
    const btnElegido = document.getElementById(`opt-${idx}`);

    btnCorrecto.style.background = 'rgba(85,239,196,0.25)';
    btnCorrecto.style.borderColor = '#55efc4';

    if (idx === correcta) {
        const xpGanado = Math.max(10, juegoState.tiempo * 5 - 30);
        juegoState.xp += xpGanado;
        mostrarFeedback(true, `+${xpGanado} XP 🔥`);
    } else {
        btnElegido.style.background = 'rgba(255,107,107,0.25)';
        btnElegido.style.borderColor = '#ff6b6b';
        juegoState.vidas--;
        mostrarFeedback(false, 'Casi... 💀');
        if (juegoState.vidas <= 0) {
            setTimeout(() => renderResultado(juegoState.xp, juegoState.preguntaIdx + 1, true), 1500);
            return;
        }
    }
    juegoState.preguntaIdx++;
    setTimeout(() => renderPregunta(), 1500);
}

function tiempoAgotado() {
    juegoState.vidas--;
    juegoState.preguntaIdx++;
    mostrarFeedback(false, '⏰ ¡Tiempo agotado!');
    if (juegoState.vidas <= 0) { setTimeout(() => renderResultado(juegoState.xp, juegoState.preguntaIdx, true), 1500); return; }
    setTimeout(() => renderPregunta(), 1500);
}

function mostrarFeedback(correcto, msg) {
    const area = document.getElementById('teen-content-area');
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:${correcto ? 'rgba(85,239,196,0.95)' : 'rgba(255,107,107,0.95)'};color:#000;padding:20px 40px;border-radius:16px;font-size:1.5rem;font-weight:900;z-index:9999;animation:fadeIn 0.2s;pointer-events:none`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1200);
}

function renderResultado(xp, respondidas, gameOver = false) {
    clearInterval(juegoState.timer);
    const pct = Math.round((respondidas / juegoState.total) * 100);
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div style="padding:20px;max-width:600px;margin:0 auto;text-align:center">
            <div style="margin-bottom:20px;animation:fadeIn 0.5s">
                ${gameOver
            ? `<img src="nino_triste.png.png" alt="Niño triste" style="width:120px;height:120px;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(255,107,107,0.3))">`
            : `<div style="font-size:5rem">🏆</div>`
        }
            </div>
            <h2 style="font-size:2.5rem;font-weight:900;color:${gameOver ? '#ff6b6b' : '#feca57'};margin:0 0 10px">${gameOver ? '¡ÁNIMO!' : '¡VICTORIA!'}</h2>
            <p style="opacity:0.6;margin-bottom:30px">${gameOver ? '¡Con Dios todo es posible! Inténtalo de nuevo 💪' : '¡Eres un guerrero de la fe! Sigue adelante 🙏'}</p>

            <div style="background:rgba(255,255,255,0.05);border-radius:24px;padding:30px;margin-bottom:30px">
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
                    <div><div style="font-size:2.5rem;font-weight:900;color:#55efc4">+${xp}</div><div style="font-size:0.75rem;opacity:0.5">XP GANADO</div></div>
                    <div><div style="font-size:2.5rem;font-weight:900;color:#feca57">${respondidas}</div><div style="font-size:0.75rem;opacity:0.5">RESPONDIDAS</div></div>
                    <div><div style="font-size:2.5rem;font-weight:900;color:#a29bfe">${pct}%</div><div style="font-size:0.75rem;opacity:0.5">PRECISIÓN</div></div>
                </div>
            </div>

            <div style="display:flex;gap:15px;justify-content:center">
                <button onclick="iniciarJuego()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:#fff;border:none;padding:15px 30px;border-radius:14px;font-weight:900;cursor:pointer;font-size:1rem">🔄 JUGAR DE NUEVO</button>
                <button onclick="cambiarSeccionTeen('lectura')" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:15px 30px;border-radius:14px;cursor:pointer;font-size:1rem">📖 IR A LEER</button>
            </div>
        </div>
    `;
    // Guardar XP en Firebase
    try {
        db.collection("usuarios_legado").doc(usuarioActual.nombre).set({
            puntos: firebase.firestore.FieldValue.increment(xp),
            ultima_actividad: new Date()
        }, { merge: true }).then(() => actualizarMarcadorReal());
    } catch (e) { }
}

// ==========================================
// FIREBASE & UTILIDADES
// ==========================================
async function marcarReto() {
    mostrarToast("🚀 ¡Capítulo completado! +50 XP");
    try {
        await db.collection("usuarios_legado").doc(usuarioActual.nombre).set({
            desafio_completado: true,
            puntos: firebase.firestore.FieldValue.increment(50),
            ultima_actividad: new Date()
        }, { merge: true });
        actualizarMarcadorReal();
    } catch (e) { console.error("Error Firestore:", e); }
}

async function actualizarMarcadorReal() {
    try {
        const doc = await db.collection("usuarios_legado").doc(usuarioActual.nombre).get();
        if (doc.exists) {
            const data = doc.data();
            const pts = data.puntos || 0;
            const sg = document.querySelector('.score-global');
            const ss = document.querySelector('.score');
            if (sg) sg.innerText = `PUNTOS: ${pts}`;
            if (ss) ss.innerText = `TU SCORE: ${pts}`;
            const sxp = document.getElementById('stat-xp');
            const slv = document.getElementById('stat-nivel');
            if (sxp) sxp.innerText = pts;
            if (slv) slv.innerText = `LV.${Math.floor(pts / 100) + 1}`;
        }
    } catch (e) { }
}

function mostrarToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:rgba(30,41,59,0.95);color:#fff;padding:12px 24px;border-radius:12px;font-size:0.9rem;font-weight:700;z-index:9999;border:1px solid rgba(85,239,196,0.3);animation:fadeIn 0.3s;pointer-events:none';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = '0.5s'; }, 2000);
    setTimeout(() => t.remove(), 2500);
}

// ==========================================
// 📖 TRIVIA POR LIBRO — MOTOR DINÁMICO
// ==========================================
let triviaLibroState = { libro: null, capsDesde: 1, capsHasta: 3, numPreguntas: 10, preguntas: [], idx: 0, xp: 0, vidas: 3, timer: null };

// Lista de todos los libros (plana)
const TODOS_LIBROS = Object.values(ESTRUCTURA_BIBLIA).flatMap(t => Object.values(t.categorias).flat());

function renderConfiguradorTrivia() {
    const area = document.getElementById('teen-content-area');

    // Agrupar libros con sus colores por testamento
    const grupos = Object.entries(ESTRUCTURA_BIBLIA).map(([test, info]) => ({
        nombre: test,
        color: info.color,
        libros: Object.values(info.categorias).flat()
    }));

    area.innerHTML = `
        <div style="padding:20px;max-width:800px;margin:0 auto">
            <div style="text-align:center;margin-bottom:30px">
                <h2 style="font-size:2rem;font-weight:900;color:#55efc4;margin:0">📖 TRIVIA POR LIBRO</h2>
                <p style="opacity:0.5;font-size:0.85rem;margin-top:8px">Configura tu sesión de estudio bíblico</p>
            </div>

            <!-- PASO 1: Seleccionar libro -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:25px;margin-bottom:20px">
                <h4 style="color:#55efc4;margin:0 0 15px;font-size:0.85rem;letter-spacing:2px">PASO 1 — ELIGE EL LIBRO</h4>

                <!-- Búsqueda rápida de libro -->
                <input id="filtro-libro-trivia" type="text" placeholder="Buscar libro..." onkeyup="filtrarLibrosTrivia(this.value)"
                    style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);padding:10px 15px;border-radius:10px;color:#fff;font-size:0.95rem;margin-bottom:15px;box-sizing:border-box">

                <div id="libros-trivia-grid">
                    ${grupos.map(g => `
                        <div style="margin-bottom:15px">
                            <div style="color:${g.color};font-size:0.7rem;font-weight:900;letter-spacing:2px;margin-bottom:8px;opacity:0.7">${g.nombre}</div>
                            <div style="display:flex;flex-wrap:wrap;gap:8px">
                                ${g.libros.map(l => `
                                    <button id="libtrivia-${l.replace(/\s/g, '_')}" onclick="seleccionarLibroTrivia('${l}')"
                                        style="background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.1);color:#fff;padding:7px 14px;border-radius:8px;cursor:pointer;font-size:0.8rem;transition:0.2s"
                                        onmouseover="this.style.background='rgba(${g.color === '#55efc4' ? '85,239,196' : '162,155,254'},0.2)';this.style.borderColor='${g.color}'"
                                        onmouseout="if(this.dataset.selected!='1'){this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(255,255,255,0.1)'}">
                                        ${l}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div id="libro-seleccionado-display" style="display:none;margin-top:15px;padding:12px 18px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.3);border-radius:10px;color:#55efc4;font-weight:700">
                    ✅ Libro seleccionado: <span id="nombre-libro-trivia">-</span> (<span id="caps-libro-trivia">-</span> capítulos)
                </div>
            </div>

            <!-- PASO 2: Rango de capítulos -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:25px;margin-bottom:20px">
                <h4 style="color:#a29bfe;margin:0 0 15px;font-size:0.85rem;letter-spacing:2px">PASO 2 — RANGO DE CAPÍTULOS A ESTUDIAR</h4>
                <div style="display:flex;align-items:center;gap:15px;flex-wrap:wrap">
                    <label style="font-size:0.85rem;opacity:0.7">Desde:</label>
                    <input id="cap-desde" type="number" min="1" value="1" style="width:70px;background:rgba(0,0,0,0.3);border:1px solid rgba(162,155,254,0.3);color:#fff;padding:8px;border-radius:8px;text-align:center;font-size:1rem">
                    <label style="font-size:0.85rem;opacity:0.7">Hasta:</label>
                    <input id="cap-hasta" type="number" min="1" value="3" style="width:70px;background:rgba(0,0,0,0.3);border:1px solid rgba(162,155,254,0.3);color:#fff;padding:8px;border-radius:8px;text-align:center;font-size:1rem">
                    <span id="hint-caps" style="font-size:0.8rem;opacity:0.5">(Máx: ? cap.)</span>
                </div>
            </div>

            <!-- PASO 3: Cantidad de preguntas -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:25px;margin-bottom:25px">
                <h4 style="color:#feca57;margin:0 0 15px;font-size:0.85rem;letter-spacing:2px">PASO 3 — CANTIDAD DE PREGUNTAS</h4>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                    ${[5, 10, 15, 20].map(n => `
                        <button id="nq-${n}" onclick="seleccionarNumPreguntas(${n})"
                            style="background:${n === 10 ? 'rgba(254,202,87,0.2)' : 'rgba(255,255,255,0.05)'};border:2px solid ${n === 10 ? '#feca57' : 'rgba(255,255,255,0.1)'};color:${n === 10 ? '#feca57' : '#fff'};padding:10px 20px;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.95rem;transition:0.2s">
                            ${n}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- BOTÓN INICIAR -->
            <button onclick="iniciarTriviaLibro()" id="btn-iniciar-trivia-libro"
                style="width:100%;background:linear-gradient(135deg,#55efc4,#00b894);color:#000;border:none;padding:18px;border-radius:16px;font-weight:900;cursor:pointer;font-size:1.1rem;letter-spacing:1px;transition:0.3s"
                onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                ⚡ GENERAR PREGUNTAS Y JUGAR
            </button>
            <div style="text-align:center;margin-top:15px">
                <button onclick="renderJuegoTeens()" style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:0.85rem">← Volver a Juegos</button>
            </div>
        </div>
    `;
    // Inicializar defaults
    triviaLibroState.numPreguntas = 10;
}

function filtrarLibrosTrivia(query) {
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const q = norm(query.trim());
    document.querySelectorAll('[id^="libtrivia-"]').forEach(btn => {
        const visible = !q || norm(btn.innerText).includes(q);
        btn.style.display = visible ? 'inline-block' : 'none';
    });
}

function seleccionarLibroTrivia(libro) {
    // Quitar selección anterior
    document.querySelectorAll('[id^="libtrivia-"]').forEach(b => {
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.borderColor = 'rgba(255,255,255,0.1)';
        delete b.dataset.selected;
    });
    // Marcar nueva
    const id = `libtrivia-${libro.replace(/\s/g, '_')}`;
    const btn = document.getElementById(id);
    if (btn) { btn.style.background = 'rgba(85,239,196,0.25)'; btn.style.borderColor = '#55efc4'; btn.dataset.selected = '1'; }

    triviaLibroState.libro = libro;
    document.getElementById('nombre-libro-trivia').innerText = libro;

    // Obtener total de capítulos consulando la API
    const slug = normalizarLibro(libro);
    buscarEnBiblia(slug, 1).then(d => {
        const total = d ? d.num_chapters : 50;
        triviaLibroState.totalCaps = total;
        document.getElementById('caps-libro-trivia').innerText = total;
        document.getElementById('cap-hasta').max = total;
        document.getElementById('cap-desde').max = total;
        document.getElementById('hint-caps').innerText = `(Máx: ${total} cap.)`;
        document.getElementById('libro-seleccionado-display').style.display = 'block';
    });
}

function seleccionarNumPreguntas(n) {
    triviaLibroState.numPreguntas = n;
    [5, 10, 15, 20].forEach(x => {
        const b = document.getElementById(`nq-${x}`);
        if (b) {
            b.style.background = x === n ? 'rgba(254,202,87,0.2)' : 'rgba(255,255,255,0.05)';
            b.style.borderColor = x === n ? '#feca57' : 'rgba(255,255,255,0.1)';
            b.style.color = x === n ? '#feca57' : '#fff';
        }
    });
}

async function iniciarTriviaLibro() {
    if (!triviaLibroState.libro) { mostrarToast('⚠️ Primero selecciona un libro'); return; }
    const desde = parseInt(document.getElementById('cap-desde').value) || 1;
    const hasta = parseInt(document.getElementById('cap-hasta').value) || 3;
    if (desde > hasta) { mostrarToast('⚠️ "Desde" debe ser menor o igual que "Hasta"'); return; }

    const area = document.getElementById('teen-content-area');
    area.innerHTML = `<div class="loader-bible-modern"><div class="loader-spinner"></div><h2 style="color:#fff;font-weight:900;letter-spacing:2px">GENERANDO PREGUNTAS DESDE ${triviaLibroState.libro.toUpperCase()}...</h2><p style="opacity:0.5">Leyendo ${hasta - desde + 1} capítulo(s) de la Biblia...</p></div>`;

    triviaLibroState.capsDesde = desde;
    triviaLibroState.capsHasta = hasta;

    // Obtener versículos de los capítulos seleccionados
    const slug = normalizarLibro(triviaLibroState.libro);
    const promesas = [];
    for (let c = desde; c <= hasta; c++) promesas.push(buscarEnBiblia(slug, c));
    const resultados = await Promise.all(promesas);

    // Generar preguntas dinámicas a partir de los versículos
    const preguntas = generarPreguntasDesdeCaps(resultados, triviaLibroState.numPreguntas);

    if (preguntas.length === 0) {
        area.innerHTML = `<div style="text-align:center;padding:60px"><h3>No se pudieron generar preguntas</h3><p style="opacity:0.6">Intenta con más capítulos</p><button onclick="renderConfiguradorTrivia()" class="btn-check" style="max-width:200px;margin-top:20px">VOLVER</button></div>`;
        return;
    }

    juegoState = { preguntaIdx: 0, vidas: 3, xp: 0, total: preguntas.length, preguntas, timer: null, tiempo: 20 };
    juegoState.modo = 'libro';
    renderPregunta();
}

function generarPreguntasDesdeCaps(resultados, maxPreguntas) {
    const preguntas = [];
    const palabrasClave = ['Jehová', 'Dios', 'Jesús', 'Cristo', 'Israel', 'Señor', 'rey', 'profeta', 'templo', 'Espíritu', 'pueblo', 'tierra', 'cielo', 'vida', 'muerte', 'amor'];

    resultados.forEach(data => {
        if (!data || !data.vers) return;
        const libro = data.name;
        const cap = data.chapter;

        data.vers.forEach(v => {
            if (!v.verse || v.verse.length < 30) return;

            // TIPO 1: Completar el versículo (palabra clave faltante)
            const palabraEncontrada = palabrasClave.find(p => v.verse.includes(p));
            if (palabraEncontrada && preguntas.length < maxPreguntas * 2) {
                const texto = v.verse.replace(palabraEncontrada, '________');
                // Opciones: la correcta + 2 palabras falsas aleatorias
                const falsas = palabrasClave.filter(p => p !== palabraEncontrada).sort(() => Math.random() - 0.5).slice(0, 2);
                const opciones = [palabraEncontrada, ...falsas].sort(() => Math.random() - 0.5);
                const correcta = opciones.indexOf(palabraEncontrada);
                preguntas.push({
                    p: `${libro} ${cap}:${v.number} — completa: "${texto}"`,
                    o: opciones,
                    c: correcta,
                    tipo: 'completar'
                });
            }

            // TIPO 2: ¿En qué capítulo? (si hay suficientes capítulos distintos)
            if (resultados.length > 1 && Math.random() < 0.3 && preguntas.length < maxPreguntas * 2) {
                const caps = resultados.filter(r => r && r.chapter).map(r => r.chapter);
                const capsFalsas = caps.filter(c => c !== cap).sort(() => Math.random() - 0.5).slice(0, 2);
                if (capsFalsas.length >= 2) {
                    const opciones = [String(cap), ...capsFalsas.map(String)].sort(() => Math.random() - 0.5);
                    const correcta = opciones.indexOf(String(cap));
                    const fragmento = v.verse.length > 70 ? v.verse.substring(0, 70) + '...' : v.verse;
                    preguntas.push({
                        p: `¿En qué capítulo de ${libro} aparece: "${fragmento}"?`,
                        o: opciones.map(x => `Capítulo ${x}`),
                        c: correcta,
                        tipo: 'capitulo'
                    });
                }
            }
        });
    });

    // Mezclar y limitar
    return preguntas.sort(() => Math.random() - 0.5).slice(0, maxPreguntas);
}
