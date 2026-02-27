// ==========================================
// LEGADO BÃBLICO - ENGINE TEENS v3.0
// ==========================================
const BIBLIA_API_URL = "https://bible-api.deno.dev/api/read/";

// --- BANCO DE PREGUNTAS â€” FILOSOFÃA ADVENTISTA DEL SÃ‰PTIMO DÃA ---
const JUEGOS_BANCO = [
    // --- DOCTRINA SDA ---
    { p: "Â¿QuÃ© dÃ­a es el SÃ¡bado bÃ­blico segÃºn el 4to mandamiento?", o: ["Viernes", "SÃ¡bado", "Domingo"], c: 1 },
    { p: "Â¿En quÃ© capÃ­tulo de Apocalipsis estÃ¡ el mensaje de los Tres Ãngeles?", o: ["CapÃ­tulo 7", "CapÃ­tulo 14", "CapÃ­tulo 12"], c: 1 },
    { p: "Â¿QuÃ© significa la palabra 'Adventista'?", o: ["Creyente en el SÃ¡bado", "Creyente en la Segunda Venida", "Creyente en el bautismo"], c: 1 },
    { p: "Â¿QuÃ© dice EclesiastÃ©s 9:5 sobre el estado de los muertos?", o: ["Van al cielo inmediatamente", "No saben nada â€” duermen", "Se comunican con los vivos"], c: 1 },
    { p: "Â¿CuÃ¡ntos mandamientos tiene la Ley de Dios?", o: ["7", "10", "12"], c: 1 },
    { p: "Â¿QuiÃ©n escribiÃ³ 'El Camino a Cristo' y 'El Conflicto de los Siglos'?", o: ["Elena G. de White", "MartÃ­n Lutero", "Juan Calvino"], c: 0 },
    { p: "Â¿QuÃ© modelo de salud proclama la Iglesia Adventista?", o: ["Solo oraciÃ³n", "NEWSTART (salud integral)", "Medicina natural solamente"], c: 1 },
    { p: "Â¿CÃ³mo se llama la esperanza central del pueblo adventista?", o: ["La Gran Espera", "La Bendita Esperanza", "El Gran Avivamiento"], c: 1 },
    { p: "Â¿QuÃ© es el 'Juicio Investigador' en la doctrina adventista?", o: ["Un juicio humano", "El examen de registros en el santuario celestial antes de la venida de Cristo", "El juicio del Gran Trono Blanco"], c: 1 },
    { p: "Â¿En quÃ© libro bÃ­blico se describen las 2,300 tardes y maÃ±anas?", o: ["Apocalipsis 13", "Daniel 8", "Ezequiel 4"], c: 1 },
    // --- PROFECÃAS ---
    { p: "Â¿CuÃ¡nto tiempo profÃ©tico durÃ³ el dominio del papado en Daniel 7?", o: ["1260 dÃ­as/aÃ±os", "2300 aÃ±os", "490 aÃ±os"], c: 0 },
    { p: "Â¿QuÃ© simboliza el Santuario del Antiguo Testamento en la doctrina adventista?", o: ["Solo historia judÃ­a", "El plan de salvaciÃ³n y el ministerio de Cristo en el cielo", "El Templo de SalomÃ³n solamente"], c: 1 },
    { p: "Â¿QuÃ© significa el principio dÃ­a-a-aÃ±o en profecÃ­a bÃ­blica?", o: ["Un dÃ­a profÃ©tico = 30 aÃ±os literales", "Un dÃ­a profÃ©tico = 1 aÃ±o literal", "Un dÃ­a profÃ©tico = 7 aÃ±os literales"], c: 1 },
    { p: "Â¿En quÃ© aÃ±o se fundÃ³ oficialmente la Iglesia Adventista del SÃ©ptimo DÃ­a?", o: ["1844", "1863", "1888"], c: 1 },
    { p: "Â¿QuÃ© ocurre con los justos cuando JesÃºs regrese segÃºn 1 Tesalonicenses 4:16-17?", o: ["Quedan en la tierra", "Son arrebatados para encontrar al SeÃ±or en el aire", "Van al purgatorio"], c: 1 },
    // --- BIBLIA GENERAL ---
    { p: "Â¿QuÃ© dÃ­a descansÃ³ Dios en la creaciÃ³n segÃºn GÃ©nesis 2?", o: ["El 5to dÃ­a", "El 7mo dÃ­a", "El 1er dÃ­a"], c: 1 },
    { p: "'AquÃ­ estÃ¡ la paciencia de los santos: los que guardan los mandamientos de Dios y la fe de JesÃºs'. Â¿DÃ³nde estÃ¡ este texto?", o: ["Romanos 14:12", "Apocalipsis 14:12", "Daniel 7:21"], c: 1 },
    { p: "Â¿QuÃ© forma de bautismo practica la Iglesia Adventista?", o: ["AspersiÃ³n", "InmersiÃ³n completa", "Cualquier forma es vÃ¡lida"], c: 1 },
    { p: "Â¿QuiÃ©n construyÃ³ el arca segÃºn GÃ©nesis?", o: ["Abraham", "NoÃ©", "MoisÃ©s"], c: 1 },
    { p: "Â¿QuÃ© significa el nombre 'Inmanuel' segÃºn IsaÃ­as 7:14?", o: ["Dios salva", "Dios con nosotros", "JehovÃ¡ es fuerte"], c: 1 },
    { p: "Â¿En quÃ© rÃ­o fue bautizado JesÃºs?", o: ["Nilo", "JordÃ¡n", "Eufrates"], c: 1 },
    { p: "Â¿CuÃ¡ntos libros tiene la Biblia en total?", o: ["60", "66", "72"], c: 1 },
    { p: "Â¿QuiÃ©n matÃ³ al gigante Goliat?", o: ["SalomÃ³n", "SaÃºl", "David"], c: 2 }
];

const ESTRUCTURA_BIBLIA = {
    "ANTIGUO TESTAMENTO": {
        color: "#55efc4",
        categorias: {
            "Pentateuco (La Ley)": ["GÃ©nesis", "Ã‰xodo", "LevÃ­tico", "NÃºmeros", "Deuteronomio"],
            "Libros HistÃ³ricos": ["JosuÃ©", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 CrÃ³nicas", "2 CrÃ³nicas", "Esdras", "NehemÃ­as", "Ester"],
            "PoÃ©ticos y Sapienciales": ["Job", "Salmos", "Proverbios", "EclesiastÃ©s", "Cantares"],
            "Profetas Mayores": ["IsaÃ­as", "JeremÃ­as", "Lamentaciones", "Ezequiel", "Daniel"],
            "Profetas Menores": ["Oseas", "Joel", "AmÃ³s", "AbdÃ­as", "JonÃ¡s", "Miqueas", "NahÃºm", "Habacuc", "SofonÃ­as", "Hageo", "ZacarÃ­as", "MalaquÃ­as"]
        }
    },
    "NUEVO TESTAMENTO": {
        color: "#a29bfe",
        categorias: {
            "Evangelios": ["Mateo", "Marcos", "Lucas", "Juan"],
            "Historia": ["Hechos"],
            "EpÃ­stolas Paulinas": ["Romanos", "1 Corintios", "2 Corintios", "GÃ¡latas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "FilemÃ³n"],
            "EpÃ­stolas Generales": ["Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas"],
            "ProfecÃ­a (ApocalÃ­ptico)": ["Apocalipsis"]
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

// --- NORMALIZACIÃ“N ---
function normalizarLibro(libro) {
    const mapa = {
        "GÃ©nesis": "genesis", "Ã‰xodo": "exodo", "LevÃ­tico": "levitico", "NÃºmeros": "numeros", "Deuteronomio": "deuteronomio",
        "JosuÃ©": "josue", "Jueces": "jueces", "Rut": "rut", "1 Samuel": "1_samuel", "2 Samuel": "2_samuel",
        "1 Reyes": "1_reyes", "2 Reyes": "2_reyes", "1 CrÃ³nicas": "1_cronicas", "2 CrÃ³nicas": "2_cronicas",
        "Esdras": "esdras", "NehemÃ­as": "nehemias", "Ester": "ester", "Job": "job", "Salmos": "salmos",
        "Proverbios": "proverbios", "EclesiastÃ©s": "eclesiastes", "Cantares": "cantares", "IsaÃ­as": "isaias",
        "JeremÃ­as": "jeremias", "Lamentaciones": "lamentaciones", "Ezequiel": "ezequiel", "Daniel": "daniel",
        "Oseas": "oseas", "Joel": "joel", "AmÃ³s": "amos", "AbdÃ­as": "abdias", "JonÃ¡s": "jonas",
        "Miqueas": "miqueas", "NahÃºm": "nahum", "Habacuc": "habacuc", "SofonÃ­as": "sofonias",
        "Hageo": "hageo", "ZacarÃ­as": "zacarias", "MalaquÃ­as": "malaquias", "Mateo": "mateo",
        "Marcos": "marcos", "Lucas": "lucas", "Juan": "juan", "Hechos": "hechos", "Romanos": "romanos",
        "1 Corintios": "1_corintios", "2 Corintios": "2_corintios", "GÃ¡latas": "galatas", "Efesios": "efesios",
        "Filipenses": "filipenses", "Colosenses": "colosenses", "1 Tesalonicenses": "1_tesalonicenses",
        "2 Tesalonicenses": "2_tesalonicenses", "1 Timoteo": "1_timoteo", "2 Timoteo": "2_timoteo",
        "Tito": "tito", "FilemÃ³n": "filemon", "Hebreos": "hebreos", "Santiago": "santiago",
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
// PERSPECTIVAS BÃBLICAS â€” FILOSOFÃA SDA
// ==========================================
const BIBLE_INSIGHTS = {
    // Textos clave con lentes Adventistas
    "Isa\u00edas 1:18": "ðŸ”„ La redencion es total. No importa el historial â€” Dios puede restaurarte completamente. Elena G. de White escribio: 'La misericordia de Dios es tan grande como Su ley es perfecta.' Este es el corazon del Gran Conflicto.",
    "Josue 1:9": "ðŸ—¡ï¸ El pueblo Adventista es llamado a pararse firme en los ultimos dias. Apoc. 14:12 habla de los que 'guardan los mandamientos de Dios y la fe de Jesus'. Eso requiere esta clase de valentia.",
    "Salmos 23:1": "âœ¨ El Sabado existe para recordarnos que Dios es nuestro Pastor. No es ritual â€” es una cita semanal con el Creador que dice: 'Aqui estoy, soy tu Senor' (Genesis 2:3). Descansa en El.",
    "Mateo 5:14": "ðŸ‘¥ Los jovenes Adventistas somos llamados a ser luz. Nuestro estilo de vida NEWSTART testifica: salud, integridad y servicio. Nuestra diferencia ES nuestro testimonio.",
    "Juan 3:16": "â¤ï¸ðŸ”¥ El corazon del Gran Conflicto. Dios no entrego a Su Hijo para condenar, sino para salvar. Esta verdad conecta con el Juicio Investigador: Dios quiere que estemos del lado de Cristo.",
    "Apocalipsis 14:12": "ðŸ•Ž Este es el texto de identidad Adventista. Guardar los mandamientos de Dios (incluido el Sabado) y la fe de Jesus. No es legalismo â€” es lealtad a Aquel que nos amo primero.",
    "Daniel 8:14": "ðŸ‘€ Las 2,300 tardes y mananas â€” la profecia que ubico a los Adventistas en el mapa historico. Concluye en 1844. El Juicio Investigador comenzo. Jesus aboga por ti ahora mismo en el cielo.",
    "Genesis 2:3": "ðŸŒŸ Aqui nace el Sabado. Antes de Israel, antes de Moises, Dios santifico el 7mo dia. No es tradicion cultural â€” es una institucion creacional para toda la humanidad. El sello del Creador en el tiempo."
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
                    <span class="badget-teen" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);letter-spacing:3px">&#9729;&#65039; IGLESIA ADVENTISTA DEL 7MO DÃA</span>
                    <h1>BIBLIA INTERACTIVA</h1>
                    <p style="font-size:0.85rem;opacity:0.7;letter-spacing:1px">Ap. 14:12 â€” Guardadores de Mandamientos | Hola, ${usuarioActual.nombre} | <span class="score-global">PUNTOS: 0</span></p>
                </div>
            </header>
            <nav class="teen-nav">
                <button id="nav-btn-lectura" onclick="cambiarSeccionTeen('lectura')" class="nav-active">ðŸ“– LECTURA</button>
                <button id="nav-btn-explorar" onclick="cambiarSeccionTeen('explorar')">ðŸ” EXPLORADOR</button>
                <button id="nav-btn-jugar" onclick="cambiarSeccionTeen('jugar')">ðŸŽ® JUEGOS</button>
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
// LECTURA â€” SELECTOR DE LIBROS
// ==========================================
function renderSelectorLibros() {
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div class="bible-selector-container">
            <div style="text-align:center; margin-bottom:40px;">
                <div class="search-bar-premium" style="max-width:500px;margin:0 auto;border-radius:20px;">
                    <span>ðŸ”</span>
                    <input type="text" id="global-bible-search" placeholder="Busca un libro..." onkeyup="filtrarLibrosGlobal(this.value)">
                </div>
                <p style="opacity:0.3;font-size:0.8rem;letter-spacing:3px;margin-top:15px">LA PALABRA DE DIOS A TU ALCANCE</p>
            </div>
            <div id="bible-main-grid" class="dual-landing-grid" style="gap:20px;max-width:1200px;margin:0 auto;height:160px;margin-bottom:40px">
                <div id="nav-antiguo" class="hero-panel antiguo" onclick="mostrarSeccionTestamento('ANTIGUO TESTAMENTO')" ontouchstart="mostrarSeccionTestamento('ANTIGUO TESTAMENTO')" style="border-radius:20px;cursor:pointer">
                    <div class="hero-info" style="left:20px;bottom:20px"><h3 style="font-size:1.6rem;margin:0">ANTIGUO</h3><p style="font-size:0.65rem;letter-spacing:2px;margin:0;opacity:0.7">PROMESAS</p></div>
                </div>
                <div id="nav-nuevo" class="hero-panel nuevo" onclick="mostrarSeccionTestamento('NUEVO TESTAMENTO')" ontouchstart="mostrarSeccionTestamento('NUEVO TESTAMENTO')" style="border-radius:20px;cursor:pointer">
                    <div class="hero-info" style="left:20px;bottom:20px"><h3 style="font-size:1.6rem;margin:0">NUEVO</h3><p style="font-size:0.65rem;letter-spacing:2px;margin:0;opacity:0.7">REVELACIÃ“N</p></div>
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
// LECTURA â€” INMERSIVA CON NAVEGACIÃ“N RÃPIDA
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
    const bgHero = ['IsaÃ­as', 'JeremÃ­as', 'Ezequiel', 'Daniel', 'Apocalipsis'].some(p => data.name.includes(p)) ? IMAGENES_TEMATICAS.profectico : IMAGENES_TEMATICAS.paisaje;
    const esRV = currentTranslation === 'rv1960';

    area.innerHTML = `
        <div class="immersive-reader-container" id="reader-container">
            <div class="reading-progress-container"><div class="reading-progress-bar" id="reading-bar"></div></div>

            <!-- TOOLBAR FLOTANTE -->
            <div class="immersive-controls">
                <button class="btn-reader-tool" onclick="toggleReadingTheme()" title="Tema">ðŸŽ¨</button>
                <button class="btn-reader-tool" onclick="switchTranslation()" title="VersiÃ³n" style="font-size:0.7rem;font-weight:900">${esRV ? 'RV' : 'TLA'}</button>
                <button class="btn-reader-tool" onclick="renderSelectorLibros()" title="Salir">âœ•</button>
            </div>

            <!-- HERO -->
            <div class="reader-hero" style="background-image:url('${bgHero}')">
                <div class="hero-content">
                    <span class="badget-teen" style="margin-bottom:15px;display:inline-block">MODO LECTURA</span>
                    <h2>${data.name.toUpperCase()} â€” CAPÃTULO ${data.chapter}</h2>
                    <p class="subtitle-hero">${currentTranslation.toUpperCase()} | ${data.vers.length} VERSÃCULOS</p>
                </div>
            </div>

            <!-- NAVEGACIÃ“N RÃPIDA SUPERIOR (SIEMPRE VISIBLE) -->
            <div id="nav-bar-reader" style="position:sticky;top:0;z-index:500;background:rgba(0,0,0,0.85);backdrop-filter:blur(20px);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08)">
                <button onclick="cambiarCapitulo(-1)" ${currentCapitulo <= 1 ? 'disabled' : ''} style="background:${currentCapitulo <= 1 ? 'rgba(255,255,255,0.05)' : '#55efc4'};color:#000;border:none;padding:8px 18px;border-radius:8px;font-weight:900;cursor:pointer;opacity:${currentCapitulo <= 1 ? 0.3 : 1}">â† PREV</button>
                <div style="display:flex;align-items:center;gap:10px">
                    <span style="color:#55efc4;font-weight:700;font-size:0.85rem">${data.name} ${data.chapter} / ${totalCapitulos}</span>
                    <input id="cap-input" type="number" min="1" max="${totalCapitulos}" placeholder="Cap." style="width:65px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 8px;border-radius:8px;text-align:center;font-size:0.85rem">
                    <button onclick="irACapitulo()" style="background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.8rem">IR â†©</button>
                </div>
                <button onclick="cambiarCapitulo(1)" ${currentCapitulo >= totalCapitulos ? 'disabled' : ''} style="background:${currentCapitulo >= totalCapitulos ? 'rgba(255,255,255,0.05)' : '#a29bfe'};color:#000;border:none;padding:8px 18px;border-radius:8px;font-weight:900;cursor:pointer;opacity:${currentCapitulo >= totalCapitulos ? 0.3 : 1}">SIG â†’</button>
            </div>

            <!-- VERSÃCULOS -->
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

                <!-- NAVEGACIÃ“N INFERIOR -->
                <div style="display:flex;justify-content:space-between;align-items:center;padding:60px 0 40px;border-top:1px solid rgba(255,255,255,0.05);margin-top:40px">
                    <button onclick="cambiarCapitulo(-1)" ${currentCapitulo <= 1 ? 'disabled' : ''} style="background:rgba(85,239,196,0.1);color:#55efc4;border:1px solid #55efc4;padding:15px 30px;border-radius:12px;cursor:pointer;font-weight:900;opacity:${currentCapitulo <= 1 ? 0.3 : 1}">â† CAPÃTULO ANTERIOR</button>
                    <button onclick="marcarReto()" style="background:#55efc4;color:#000;border:none;padding:15px 30px;border-radius:12px;font-weight:900;cursor:pointer">âœ… COMPLETAR +50 XP</button>
                    <button onclick="cambiarCapitulo(1)" ${currentCapitulo >= totalCapitulos ? 'disabled' : ''} style="background:rgba(162,155,254,0.1);color:#a29bfe;border:1px solid #a29bfe;padding:15px 30px;border-radius:12px;cursor:pointer;font-weight:900;opacity:${currentCapitulo >= totalCapitulos ? 0.3 : 1}">SIGUIENTE CAPÃTULO â†’</button>
                </div>
            </div>

            <!-- PANEL FLOTANTE LATERAL (siempre visible al scroll) -->
            <div id="float-nav" style="position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:600;display:flex;flex-direction:column;gap:10px;transition:opacity 0.4s">
                <!-- Anterior -->
                <button onclick="cambiarCapitulo(-1)" title="CapÃ­tulo anterior"
                    style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid ${currentCapitulo <= 1 ? 'rgba(255,255,255,0.05)' : 'rgba(85,239,196,0.4)'};color:${currentCapitulo <= 1 ? 'rgba(255,255,255,0.2)' : '#55efc4'};width:48px;height:48px;border-radius:12px;cursor:${currentCapitulo <= 1 ? 'default' : 'pointer'};font-size:1.2rem;display:flex;align-items:center;justify-content:center;font-weight:900"
                    ${currentCapitulo <= 1 ? 'disabled' : ''}>â€¹</button>
                <!-- Indicador de capÃ­tulo -->
                <div style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:12px;width:48px;padding:8px 0;text-align:center">
                    <div style="color:#55efc4;font-size:0.65rem;font-weight:900;line-height:1.2">${data.chapter}<br><span style="color:rgba(255,255,255,0.3);font-size:0.5rem">/${totalCapitulos}</span></div>
                </div>
                <!-- Siguiente -->
                <button onclick="cambiarCapitulo(1)" title="CapÃ­tulo siguiente"
                    style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid ${currentCapitulo >= totalCapitulos ? 'rgba(255,255,255,0.05)' : 'rgba(162,155,254,0.4)'};color:${currentCapitulo >= totalCapitulos ? 'rgba(255,255,255,0.2)' : '#a29bfe'};width:48px;height:48px;border-radius:12px;cursor:${currentCapitulo >= totalCapitulos ? 'default' : 'pointer'};font-size:1.2rem;display:flex;align-items:center;justify-content:center;font-weight:900"
                    ${currentCapitulo >= totalCapitulos ? 'disabled' : ''}>â€º</button>
                <!-- Cambiar libro -->
                <button onclick="renderSelectorLibros()" title="Cambiar libro"
                    style="background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);border:1px solid rgba(254,202,87,0.3);color:#feca57;width:48px;height:48px;border-radius:12px;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center">ðŸ“š</button>
            </div>

            <!-- TARJETA DE CONTEXTO -->
            <div id="context-card" class="context-card">
                <div class="context-header">
                    <span class="context-title" id="context-ref">DATO PRO</span>
                    <span class="context-close" onclick="cerrarContexto()">âœ•</span>
                </div>
                <div class="context-content" id="context-body"></div>
                <div style="margin-top:12px">
                    <textarea id="personal-note" placeholder="Tu reflexiÃ³n personal..." style="width:100%;height:55px;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;padding:8px;font-size:0.85rem;resize:none;box-sizing:border-box"></textarea>
                    <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
                        <button onclick="guardarNotaRapida()" style="background:#55efc4;color:#000;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:bold;font-size:0.75rem">ðŸ’¾ GUARDAR</button>
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
    const insight = BIBLE_INSIGHTS[key] || "Este versÃ­culo habla directamente a tu situaciÃ³n hoy. Â¿QuÃ© te dice a ti personalmente? ðŸ™";
    document.getElementById('context-ref').innerText = `${ref}:${num} â€” DATO PRO`;
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
    mostrarToast("âœ… Nota guardada");
}
function etiquetarVersiculo(tag) { mostrarToast(`Etiquetado como ${tag} ðŸ·ï¸`); }
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
function formatearTextoEspecial(t) { return t.replace(/(JehovÃ¡|Dios|JesÃºs|Cristo|EspÃ­ritu|Padre)/g, '<strong>$1</strong>'); }

// ==========================================
// EXPLORADOR MEJORADO
// ==========================================
function renderExplorador() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;max-width:900px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
                <h2 style="font-size:2.5rem;font-weight:900;background:linear-gradient(to right,#55efc4,#a29bfe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0">ðŸ” BUSCADOR</h2>
                <p style="opacity:0.5;letter-spacing:2px;font-size:0.85rem">ENCUENTRA CUALQUIER VERSO EN SEGUNDOS</p>
            </div>

            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:30px;margin-bottom:30px">
                <div style="display:flex;gap:10px">
                    <input id="bible-search" type="text" placeholder="Ej: Juan 3:16 o Salmos 23" onkeyup="if(event.key==='Enter')ejecutarBusqueda()" style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);padding:15px 20px;border-radius:12px;color:#fff;font-size:1rem">
                    <button onclick="ejecutarBusqueda()" style="background:linear-gradient(135deg,#55efc4,#00b894);color:#000;border:none;padding:15px 25px;border-radius:12px;font-weight:900;cursor:pointer;white-space:nowrap">BUSCAR âš¡</button>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:15px">
                    ${['Juan 3:16', 'Salmos 23:1', 'JosuÃ© 1:9', 'IsaÃ­as 40:31', 'Filipenses 4:13'].map(s => `<button onclick="document.getElementById('bible-search').value='${s}';ejecutarBusqueda()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:6px 14px;border-radius:20px;cursor:pointer;font-size:0.8rem">${s}</button>`).join('')}
                </div>
            </div>

            <div id="search-results">
                <div style="text-align:center;padding:40px;opacity:0.3">
                    <p style="font-size:3rem">ðŸ“–</p>
                    <p style="letter-spacing:3px;font-size:0.85rem">ESCRIBE UNA CITA BÃBLICA ARRIBA</p>
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

    // Parsear cita: manejo de libros con nÃºmero como "1 Juan 3:16"
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
        if (target.length === 0) { results.innerHTML = '<p style="text-align:center;opacity:0.5">VersÃ­culo no encontrado.</p>'; return; }
        html = target.map(v => `
            <div onclick="abrirLibro('${data.name}', ${data.chapter})" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:25px;margin-bottom:15px;cursor:pointer;transition:0.3s" onmouseover="this.style.background='rgba(85,239,196,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                    <span style="color:#55efc4;font-weight:900;font-size:0.85rem;letter-spacing:1px">${data.name} ${data.chapter}:${v.number}</span>
                    <button onclick="event.stopPropagation();abrirLibro('${data.name}',${data.chapter})" style="background:rgba(85,239,196,0.15);color:#55efc4;border:none;padding:5px 12px;border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:bold">LEER CAPÃTULO â†’</button>
                </div>
                <p style="font-family:'Crimson Text',serif;font-size:1.5rem;line-height:1.7;color:#f1f2f6;margin:0">"${formatearTextoEspecial(v.verse)}"</p>
            </div>
        `).join('');
        if (!vers) html += `<div style="text-align:center;padding:20px;opacity:0.5;font-size:0.8rem">Mostrando primeros 10 versÃ­culos. Busca con versÃ­culo especÃ­fico para ver uno.</div>`;
        results.innerHTML = html;
    } else {
        results.innerHTML = `<div style="text-align:center;padding:40px;opacity:0.5"><p style="font-size:2rem">ðŸ˜•</p><p>No encontrado. Intenta con: <em>Juan 3:16</em></p></div>`;
    }
}

// ==========================================
// ðŸŽ® JUEGOS â€” MODO ARENA
// ==========================================
function renderJuegoTeens() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;max-width:800px;margin:0 auto">
            <div style="text-align:center;margin-bottom:40px">
                <h2 style="font-size:2.5rem;font-weight:900;background:linear-gradient(to right,#ff6b6b,#feca57,#48dbfb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0">âš¡ MODO ARENA</h2>
                <p style="opacity:0.5;letter-spacing:2px;font-size:0.85rem">Â¿CUÃNTO SABES DE LA BIBLIA?</p>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
                <!-- TRIVIA RÃPIDA -->
                <div onclick="iniciarJuego()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:24px;padding:35px;text-align:center;cursor:pointer;transition:0.3s;border:2px solid transparent" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 20px 40px rgba(108,92,231,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                    <div style="font-size:2.5rem;margin-bottom:10px">âš¡</div>
                    <h3 style="color:#fff;font-size:1.1rem;font-weight:900;margin:0 0 8px">TRIVIA RÃPIDA</h3>
                    <p style="color:rgba(255,255,255,0.7);font-size:0.78rem;margin:0">10 preguntas Â· 20 seg c/u Â· 3 vidas</p>
                </div>
                <!-- VERSUS -->
                <div onclick="renderVersusLobby()" style="background:linear-gradient(135deg,rgba(255,107,107,0.2),rgba(254,202,87,0.15));border:2px solid rgba(255,107,107,0.4);border-radius:24px;padding:35px;text-align:center;cursor:pointer;transition:0.3s" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 20px 40px rgba(255,107,107,0.3)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                    <div style="font-size:2.5rem;margin-bottom:10px">ðŸ†š</div>
                    <h3 style="color:#feca57;font-size:1.1rem;font-weight:900;margin:0 0 8px">VERSUS EN VIVO</h3>
                    <p style="color:rgba(255,255,255,0.7);font-size:0.78rem;margin:0">DesafÃ­a a un amigo Â· Tiempo real Â· 8 rondas</p>
                </div>
            </div>

            <!-- TRIVIA POR LIBRO (nueva) -->
            <div onclick="renderConfiguradorTrivia()" style="background:linear-gradient(135deg,rgba(85,239,196,0.15),rgba(0,184,148,0.1));border:2px solid rgba(85,239,196,0.35);border-radius:24px;padding:30px;cursor:pointer;transition:0.3s;margin-bottom:25px;display:flex;align-items:center;gap:25px" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 15px 30px rgba(85,239,196,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
                <div style="font-size:3rem;flex-shrink:0">ðŸ“–</div>
                <div>
                    <h3 style="color:#55efc4;font-size:1.15rem;font-weight:900;margin:0 0 6px">TRIVIA POR LIBRO</h3>
                    <p style="color:rgba(255,255,255,0.65);font-size:0.82rem;margin:0">Elige un libro de la Biblia, selecciona cuÃ¡ntos capÃ­tulos estudiar y genera preguntas desde los versÃ­culos reales. Â¡El modo mÃ¡s inteligente para estudiar!</p>
                </div>
                <div style="flex-shrink:0;color:#55efc4;font-size:1.5rem">â†’</div>
            </div>

            <!-- RÃ‰CORD -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:25px">
                <h4 style="color:#feca57;margin:0 0 15px;font-size:0.85rem;letter-spacing:2px">ðŸ† TU RÃ‰CORD</h4>
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
                    ${'â¤ï¸'.repeat(vidas)}${'ðŸ–¤'.repeat(3 - vidas)}
                </div>
                <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:6px 16px">
                    <span style="color:#feca57;font-weight:900;font-size:0.9rem" id="timer-display">â± ${tiempo}s</span>
                </div>
                <div style="color:#55efc4;font-weight:900">âš¡ ${xp} XP</div>
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
            td.innerText = `â± ${t}s`;
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
        mostrarFeedback(true, `+${xpGanado} XP ðŸ”¥`);
    } else {
        btnElegido.style.background = 'rgba(255,107,107,0.25)';
        btnElegido.style.borderColor = '#ff6b6b';
        juegoState.vidas--;
        mostrarFeedback(false, 'Casi... ðŸ’€');
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
    mostrarFeedback(false, 'â° Â¡Tiempo agotado!');
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
            ? `<img src="nino_triste.png.png" alt="NiÃ±o triste" style="width:120px;height:120px;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(255,107,107,0.3))">`
            : `<div style="font-size:5rem">ðŸ†</div>`
        }
            </div>
            <h2 style="font-size:2.5rem;font-weight:900;color:${gameOver ? '#ff6b6b' : '#feca57'};margin:0 0 10px">${gameOver ? 'Â¡ÃNIMO!' : 'Â¡VICTORIA!'}</h2>
            <p style="opacity:0.6;margin-bottom:30px">${gameOver ? 'Â¡Con Dios todo es posible! IntÃ©ntalo de nuevo ðŸ’ª' : 'Â¡Eres un guerrero de la fe! Sigue adelante ðŸ™'}</p>

            <div style="background:rgba(255,255,255,0.05);border-radius:24px;padding:30px;margin-bottom:30px">
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
                    <div><div style="font-size:2.5rem;font-weight:900;color:#55efc4">+${xp}</div><div style="font-size:0.75rem;opacity:0.5">XP GANADO</div></div>
                    <div><div style="font-size:2.5rem;font-weight:900;color:#feca57">${respondidas}</div><div style="font-size:0.75rem;opacity:0.5">RESPONDIDAS</div></div>
                    <div><div style="font-size:2.5rem;font-weight:900;color:#a29bfe">${pct}%</div><div style="font-size:0.75rem;opacity:0.5">PRECISIÃ“N</div></div>
                </div>
            </div>

            <div style="display:flex;gap:15px;justify-content:center">
                <button onclick="iniciarJuego()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:#fff;border:none;padding:15px 30px;border-radius:14px;font-weight:900;cursor:pointer;font-size:1rem">ðŸ”„ JUGAR DE NUEVO</button>
                <button onclick="cambiarSeccionTeen('lectura')" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:15px 30px;border-radius:14px;cursor:pointer;font-size:1rem">ðŸ“– IR A LEER</button>
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
    mostrarToast("ðŸš€ Â¡CapÃ­tulo completado! +50 XP");
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
// ðŸ“– TRIVIA POR LIBRO â€” MOTOR DINÃMICO
// ==========================================
let triviaLibroState = { libro: null, capsDesde: 1, capsHasta: 3, numPreguntas: 10, preguntas: [], idx: 0, xp: 0, vidas: 3, timer: null };

// Lista de todos los libros (plana)
const TODOS_LIBROS = Object.values(ESTRUCTURA_BIBLIA).flatMap(t => Object.values(t.categorias).flat());

function renderConfiguradorTrivia() {
    const area = document.getElementById('teen-content-area');

    const EMOJIS_CAT = {
        "Pentateuco (La Ley)": "ðŸ“œ", "Libros HistÃ³ricos": "âš”ï¸",
        "PoÃ©ticos y Sapienciales": "ðŸŽµ", "Profetas Mayores": "ðŸ”¥",
        "Profetas Menores": "âš¡", "Evangelios": "âœï¸",
        "Historia": "ðŸŒ", "EpÃ­stolas Paulinas": "âœ‰ï¸",
        "EpÃ­stolas Generales": "ðŸ“©", "ProfecÃ­a (ApocalÃ­ptico)": "ðŸ‘ï¸"
    };

    const grupos = Object.entries(ESTRUCTURA_BIBLIA).map(([test, info]) => ({
        nombre: test, color: info.color, categorias: info.categorias
    }));

    area.innerHTML = `
        <style>
            @keyframes glowPulse { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
            .libro-card {
                background:rgba(255,255,255,0.04);
                border:1.5px solid rgba(255,255,255,0.08);
                color:rgba(255,255,255,0.7);
                padding:10px 6px;
                border-radius:12px;
                cursor:pointer;
                font-size:0.78rem;
                font-weight:600;
                text-align:center;
                transition:all 0.2s cubic-bezier(0.175,0.885,0.32,1.275);
                min-height:46px;
                display:flex;
                align-items:center;
                justify-content:center;
                line-height:1.2;
                font-family:'Outfit',sans-serif;
            }
            .libro-card:hover {
                transform:translateY(-3px) scale(1.05);
                background:rgba(255,255,255,0.1);
                border-color:rgba(255,255,255,0.3);
                color:#fff;
            }
            .libro-card.sel-verde {
                background:rgba(85,239,196,0.2);
                border-color:#55efc4;
                color:#55efc4;
                font-weight:900;
                box-shadow:0 0 15px rgba(85,239,196,0.3);
            }
            .libro-card.sel-morado {
                background:rgba(162,155,254,0.2);
                border-color:#a29bfe;
                color:#a29bfe;
                font-weight:900;
                box-shadow:0 0 15px rgba(162,155,254,0.3);
            }
            .cat-header {
                display:flex;align-items:center;gap:10px;
                padding:10px 14px;border-radius:10px;
                cursor:pointer;transition:background 0.2s;user-select:none;
            }
            .cat-header:hover { background:rgba(255,255,255,0.05); }
            .cat-body { display:none; padding:10px 4px 4px; }
            .cat-body.open { display:block; }
            .test-tab {
                padding:9px 20px;border-radius:30px;
                font-weight:900;font-size:0.8rem;
                letter-spacing:1px;cursor:pointer;
                border:2px solid transparent;transition:all 0.25s;
                font-family:'Outfit',sans-serif;
            }
            .tab-v { border-color:rgba(85,239,196,0.35);color:rgba(85,239,196,0.6);background:transparent; }
            .tab-v.active { background:rgba(85,239,196,0.15);border-color:#55efc4;color:#55efc4; }
            .tab-m { border-color:rgba(162,155,254,0.35);color:rgba(162,155,254,0.6);background:transparent; }
            .tab-m.active { background:rgba(162,155,254,0.15);border-color:#a29bfe;color:#a29bfe; }
        </style>

        <div style="padding:14px;max-width:800px;margin:0 auto">

            <!-- HEADER -->
            <div style="text-align:center;margin-bottom:20px">
                <div style="display:inline-block;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:5px 16px;font-size:0.68rem;font-weight:900;letter-spacing:3px;color:rgba(255,255,255,0.4);margin-bottom:10px">MODO ESTUDIO PRO</div>
                <h2 style="font-size:1.7rem;font-weight:900;margin:0;background:linear-gradient(to right,#55efc4,#a29bfe);-webkit-background-clip:text;-webkit-text-fill-color:transparent">ðŸ“– TRIVIA POR LIBRO</h2>
                <p style="opacity:0.35;font-size:0.75rem;margin-top:5px;letter-spacing:2px">ELIGE TU ARENA DE BATALLA BÃBLICA</p>
            </div>

            <!-- PASO 1 -->
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:18px;margin-bottom:14px">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                    <div style="background:linear-gradient(135deg,#55efc4,#00b894);color:#000;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.82rem;flex-shrink:0">1</div>
                    <span style="font-weight:900;font-size:0.88rem;letter-spacing:1px">ELIGE TU LIBRO</span>
                    <div id="libro-badge" style="display:none;margin-left:auto;background:rgba(85,239,196,0.12);border:1px solid #55efc4;color:#55efc4;padding:3px 10px;border-radius:20px;font-size:0.7rem;font-weight:900">âœ“ <span id="libro-badge-nome"></span></div>
                </div>

                <!-- BUSCADOR -->
                <div style="position:relative;margin-bottom:14px">
                    <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);opacity:0.35">ðŸ”</span>
                    <input id="filtro-libro-trivia" type="text" placeholder="Busca tu libro..." onkeyup="filtrarLibrosTrivia(this.value)"
                        style="width:100%;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.1);padding:11px 12px 11px 38px;border-radius:12px;color:#fff;font-size:0.92rem;box-sizing:border-box;outline:none;font-family:'Outfit',sans-serif"
                        onfocus="this.style.borderColor='rgba(85,239,196,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
                </div>

                <!-- TABS -->
                <div style="display:flex;gap:8px;margin-bottom:16px">
                    ${grupos.map((g, i) => `
                        <button onclick="mostrarTestamentoTrivia('${g.nombre}')"
                            class="test-tab ${i===0?'tab-v active':'tab-m'}"
                            id="tab-${g.nombre.replace(/\s/g,'_')}">
                            ${g.nombre === 'ANTIGUO TESTAMENTO' ? 'ðŸ“œ ANTIGUO T.' : 'âœï¸ NUEVO T.'}
                        </button>
                    `).join('')}
                </div>

                <!-- LIBROS -->
                <div id="libros-trivia-grid">
                    ${grupos.map((g, gi) => `
                        <div class="testamento-panel" id="panel-${g.nombre.replace(/\s/g,'_')}" style="${gi>0?'display:none':''}">
                            ${Object.entries(g.categorias).map(([cat, libros], ci) => `
                                <div style="margin-bottom:6px">
                                    <div class="cat-header" onclick="toggleCat(this)" style="color:${g.color}">
                                        <span>${EMOJIS_CAT[cat]||'ðŸ“š'}</span>
                                        <span style="font-size:0.75rem;font-weight:900;letter-spacing:1px;flex:1">${cat.toUpperCase()}</span>
                                        <span style="font-size:0.68rem;opacity:0.35;color:white">${libros.length}</span>
                                        <span class="cat-arrow" style="opacity:0.35;color:white;font-size:0.75rem;transition:transform 0.2s">${ci===0?'â–²':'â–¼'}</span>
                                    </div>
                                    <div class="cat-body ${ci===0?'open':''}">
                                        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:7px">
                                            ${libros.map(l => `
                                                <button id="libtrivia-${l.replace(/\s/g,'_')}"
                                                    class="libro-card"
                                                    data-color="${g.color==='#55efc4'?'verde':'morado'}"
                                                    onclick="seleccionarLibroTrivia('${l}')">
                                                    ${l}
                                                </button>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- CONFIG AVANZADA (aparece al elegir libro) -->
            <div id="config-avanzada" style="display:none;animation:fadeIn 0.4s ease">

                <!-- PASO 2 -->
                <div style="background:rgba(162,155,254,0.06);border:1px solid rgba(162,155,254,0.2);border-radius:20px;padding:18px;margin-bottom:12px">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                        <div style="background:linear-gradient(135deg,#a29bfe,#6c5ce7);color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.82rem;flex-shrink:0">2</div>
                        <span style="font-weight:900;font-size:0.88rem;letter-spacing:1px">RANGO DE CAPÃTULOS</span>
                        <span id="hint-caps" style="margin-left:auto;font-size:0.72rem;opacity:0.4">? caps</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
                        <div style="display:flex;flex-direction:column;gap:4px;align-items:center">
                            <label style="font-size:0.68rem;opacity:0.45;letter-spacing:1px">DESDE</label>
                            <input id="cap-desde" type="number" min="1" value="1"
                                style="width:68px;background:rgba(0,0,0,0.4);border:2px solid rgba(162,155,254,0.3);color:#a29bfe;padding:10px;border-radius:10px;text-align:center;font-size:1.1rem;font-weight:900;font-family:'Outfit',sans-serif;outline:none">
                        </div>
                        <div style="opacity:0.25;font-size:1rem;margin-top:18px">â†’</div>
                        <div style="display:flex;flex-direction:column;gap:4px;align-items:center">
                            <label style="font-size:0.68rem;opacity:0.45;letter-spacing:1px">HASTA</label>
                            <input id="cap-hasta" type="number" min="1" value="3"
                                style="width:68px;background:rgba(0,0,0,0.4);border:2px solid rgba(162,155,254,0.3);color:#a29bfe;padding:10px;border-radius:10px;text-align:center;font-size:1.1rem;font-weight:900;font-family:'Outfit',sans-serif;outline:none">
                        </div>
                    </div>
                </div>

                <!-- PASO 3 -->
                <div style="background:rgba(254,202,87,0.06);border:1px solid rgba(254,202,87,0.2);border-radius:20px;padding:18px;margin-bottom:18px">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                        <div style="background:linear-gradient(135deg,#feca57,#ff9f43);color:#000;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.82rem;flex-shrink:0">3</div>
                        <span style="font-weight:900;font-size:0.88rem;letter-spacing:1px">RONDAS DE BATALLA</span>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
                        ${[5,10,15,20].map(n => `
                            <button id="nq-${n}" onclick="seleccionarNumPreguntas(${n})"
                                style="background:${n===10?'rgba(254,202,87,0.2)':'rgba(255,255,255,0.04)'};border:2px solid ${n===10?'#feca57':'rgba(255,255,255,0.1)'};color:${n===10?'#feca57':'rgba(255,255,255,0.45)'};padding:14px 0;border-radius:12px;cursor:pointer;font-weight:900;font-size:1rem;transition:all 0.2s;font-family:'Outfit',sans-serif">
                                ${n}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- BTN INICIAR -->
                <button onclick="iniciarTriviaLibro()" id="btn-iniciar-trivia-libro"
                    style="width:100%;background:linear-gradient(135deg,#55efc4,#00b894);color:#000;border:none;padding:17px;border-radius:16px;font-weight:900;cursor:pointer;font-size:1.05rem;letter-spacing:2px;transition:all 0.3s;font-family:'Outfit',sans-serif;box-shadow:0 8px 25px rgba(85,239,196,0.3)"
                    onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 14px 35px rgba(85,239,196,0.5)'"
                    onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 8px 25px rgba(85,239,196,0.3)'">
                    âš¡ Â¡ENTRAR A LA ARENA!
                </button>
            </div>

            <div style="text-align:center;margin-top:12px">
                <button onclick="renderJuegoTeens()" style="background:none;border:none;color:rgba(255,255,255,0.3);cursor:pointer;font-size:0.82rem;font-family:'Outfit',sans-serif">â† Volver a Juegos</button>
            </div>
        </div>
    `;
    triviaLibroState.numPreguntas = 10;
}

function toggleCat(header) {
    const body = header.nextElementSibling;
    const arrow = header.querySelector('.cat-arrow');
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open');
    if (arrow) arrow.textContent = isOpen ? 'â–¼' : 'â–²';
}

function mostrarTestamentoTrivia(nombre) {
    document.querySelectorAll('.test-tab').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById(`tab-${nombre.replace(/\s/g,'_')}`);
    if (tab) tab.classList.add('active');
    document.querySelectorAll('.testamento-panel').forEach(p => p.style.display = 'none');
    const panel = document.getElementById(`panel-${nombre.replace(/\s/g,'_')}`);
    if (panel) panel.style.display = 'block';
}
