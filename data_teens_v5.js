// ==========================================
// LEGADO BIBLICO - MOTOR ADOLESCENTES v6.0
// ==========================================
const BIBLIA_API_URL = "https://bible-api.deno.dev/api/read/";

const JUEGOS_BANCO = [
    { p: "Cual es el Sabado biblico segun el 4to mandamiento?", o: ["Viernes", "Sabado", "Domingo"], c: 1 },
    { p: "En que capitulo de Apocalipsis esta el mensaje de los Tres Angeles?", o: ["Capitulo 7", "Capitulo 14", "Capitulo 12"], c: 1 },
    { p: "Que significa la palabra 'Adventista'?", o: ["Creyente en el Sabado", "Creyente en la Segunda Venida", "Creyente en el bautismo"], c: 1 },
    { p: "Que dice Eclesiastes 9:5 sobre el estado de los muertos?", o: ["Van al cielo inmediatamente", "No saben nada - duermen", "Se comunican con los vivos"], c: 1 },
    { p: "Cuantos mandamientos tiene la Ley de Dios?", o: ["7", "10", "12"], c: 1 },
    { p: "Quien escribio 'El Camino a Cristo'?", o: ["Elena G. de White", "Martin Lutero", "Juan Calvino"], c: 0 },
    { p: "Que modelo de salud proclama la Iglesia Adventista?", o: ["Solo oracion", "ESTILO DE VIDA SALUDABLE", "Medicina natural"], c: 1 },
    { p: "Como se llama la esperanza central del pueblo adventista?", o: ["La Gran Espera", "La Bendita Esperanza", "El Gran Avivamiento"], c: 1 },
    { p: "En que libro biblico se describen las 2,300 tardes y mananas?", o: ["Apocalipsis 13", "Daniel 8", "Ezequiel 4"], c: 1 }
];

const ESTRUCTURA_BIBLIA = {
    "ANTIGUO TESTAMENTO": {
        color: "#55efc4",
        categorias: {
            "Pentateuco (La Ley)": ["Genesis", "Exodo", "Levitico", "Numeros", "Deuteronomio"],
            "Libros Historicos": ["Josue", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Cronicas", "2 Cronicas", "Esdras", "Nehemias", "Ester"],
            "Poeticos y Sapienciales": ["Job", "Salmos", "Proverbios", "Eclesiastes", "Cantares"],
            "Profetas Mayores": ["Isaias", "Jeremias", "Lamentaciones", "Ezequiel", "Daniel"],
            "Profetas Menores": ["Oseas", "Joel", "Amos", "Abdias", "Jonis", "Miqueas", "Nahum", "Habacuc", "Sofonias", "Hageo", "Zacarias", "Malaquias"]
        }
    },
    "NUEVO TESTAMENTO": {
        color: "#a29bfe",
        categorias: {
            "Evangelios": ["Mateo", "Marcos", "Lucas", "Juan"],
            "Historia": ["Hechos"],
            "Epistolas Paulinas": ["Romanos", "1 Corintios", "2 Corintios", "Galatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemon"],
            "Epistolas Generales": ["Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas"],
            "Profecia (Apocaliptico)": ["Apocalipsis"]
        }
    }
};

let currentTranslation = "rv1960";
let currentLibroSlug = "";
let currentLibroNombre = "";
let currentCapitulo = 1;
let totalCapitulos = 1;
let currentThemeIndex = 0;
const themes = ['', 'reading-theme-sepia', 'reading-theme-night'];
let juegoState = { preguntaIdx: 0, vidas: 3, xp: 0, total: 0, preguntas: [], timer: null, tiempo: 20 };

function normalizarLibro(libro) {
    const mapa = {
        "Genesis": "genesis", "Exodo": "exodo", "Levitico": "levitico", "Numeros": "numeros", "Deuteronomio": "deuteronomio",
        "Josue": "josue", "Jueces": "jueces", "Rut": "rut", "1 Samuel": "1_samuel", "2 Samuel": "2_samuel",
        "1 Reyes": "1_reyes", "2 Reyes": "2_reyes", "1 Cronicas": "1_cronicas", "2 Cronicas": "2_cronicas",
        "Esdras": "esdras", "Nehemias": "nehemias", "Ester": "ester", "Job": "job", "Salmos": "salmos",
        "Proverbios": "proverbios", "Eclesiastes": "eclesiastes", "Cantares": "cantares", "Isaias": "isaias",
        "Jeremias": "jeremias", "Lamentaciones": "lamentaciones", "Ezequiel": "ezequiel", "Daniel": "daniel",
        "Oseas": "oseas", "Joel": "joel", "Amos": "amos", "Abdias": "abdias", "Jonis": "jonas",
        "Miqueas": "miqueas", "Nahum": "nahum", "Habacuc": "habacuc", "Sofonias": "sofonias",
        "Hageo": "hageo", "Zacarias": "zacarias", "Malaquias": "malaquias", "Mateo": "mateo",
        "Marcos": "marcos", "Lucas": "lucas", "Juan": "juan", "Hechos": "hechos", "Romanos": "romanos",
        "1 Corintios": "1_corintios", "2 Corintios": "2_corintios", "Galatas": "galatas", "Efesios": "efesios",
        "Filipenses": "filipenses", "Colosenses": "colosenses", "1 Tesalonicenses": "1_tesalonicenses",
        "2 Tesalonicenses": "2_tesalonicenses", "1 Timoteo": "1_timoteo", "2 Timoteo": "2_timoteo",
        "Tito": "tito", "Filemon": "filemon", "Hebreos": "hebreos", "Santiago": "santiago",
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

function renderBibliaDinamicaTeens() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div class="content-wrapper">
            <header class="teen-header">
                <button class="btn-volver" onclick="window.location.reload()">ATRAS</button>
                <div class="header-main">
                    <span style="font-size:0.7rem; opacity:0.6; letter-spacing:2px">PRO ESTUDIO</span>
                    <h1>BIBLIA INTERACTIVA</h1>
                </div>
            </header>
            <nav class="teen-nav">
                <button id="nav-btn-lectura" onclick="cambiarSeccionTeen('lectura')" class="nav-active">LECTURA</button>
                <button id="nav-btn-explorar" onclick="cambiarSeccionTeen('explorar')">BUSCAR</button>
                <button id="nav-btn-jugar" onclick="cambiarSeccionTeen('jugar')">ARENA</button>
            </nav>
            <div id="teen-content-area"></div>
        </div>
    `;
    cambiarSeccionTeen('lectura');
}

function cambiarSeccionTeen(seccion) {
    document.querySelectorAll('.teen-nav button').forEach(b => b.classList.remove('nav-active'));
    document.getElementById(`nav-btn-${seccion}`).classList.add('nav-active');
    if (seccion === 'lectura') renderSelectorLibros();
    else if (seccion === 'explorar') renderExplorador();
    else if (seccion === 'jugar') renderJuegoTeens();
}

function renderSelectorLibros() {
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div style="padding:20px">
            <div id="bible-main-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:25px">
                <button onclick="mostrarSeccionTestamento('ANTIGUO TESTAMENTO')" style="padding:25px;border-radius:15px;background:#55efc4;color:#000;font-weight:900;border:none;box-shadow:0 8px 20px rgba(85,239,196,0.3)">ANTIGUO TESTAMENTO</button>
                <button onclick="mostrarSeccionTestamento('NUEVO TESTAMENTO')" style="padding:25px;border-radius:15px;background:#a29bfe;color:#000;font-weight:900;border:none;box-shadow:0 8px 20px rgba(162,155,254,0.3)">NUEVO TESTAMENTO</button>
            </div>
            <div id="libros-dinamicos-root"></div>
        </div>
    `;
}

function mostrarSeccionTestamento(testamento) {
    const root = document.getElementById('libros-dinamicos-root');
    const info = ESTRUCTURA_BIBLIA[testamento];
    root.innerHTML = `
        <h3 style="text-align:center;letter-spacing:3px;opacity:0.6;font-size:0.8rem;margin-bottom:20px">${testamento}</h3>
        <div style="display:grid;grid-template-columns:1fr;gap:15px">
            ${Object.entries(info.categorias).map(([cat, libros]) => `
                <div style="background:rgba(255,255,255,0.03);padding:18px;border-radius:16px;border:1px solid rgba(255,255,255,0.05)">
                    <p style="color:${info.color};font-weight:900;font-size:0.75rem;margin-bottom:12px;letter-spacing:1px">${cat.toUpperCase()}</p>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px">
                        ${libros.map(l => `<button class="btn-libro-premium" onclick="abrirLibro('${l}')" style="padding:10px;font-size:0.85rem">${l}</button>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExplorador() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px">
            <h2 style="text-align:center">BUSCADOR</h2>
            <input id="bible-search" type="text" placeholder="Ej: Juan 3:16" style="width:100%;padding:15px;background:#000;color:#fff;border:1px solid #333;border-radius:12px">
            <button onclick="ejecutarBusqueda()" style="width:100%;margin-top:15px;padding:15px;background:#55efc4;color:#000;font-weight:900;border:none;border-radius:12px">REALIZAR BUSQUEDA</button>
            <div id="search-results" style="margin-top:20px"></div>
        </div>
    `;
}

function renderJuegoTeens() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;text-align:center">
            <h2 style="margin-bottom:30px">MODO ARENA DE BATALLA</h2>
            <div onclick="iniciarJuego()" style="background:rgba(162,155,254,0.1);border:2px solid #a29bfe;padding:35px;border-radius:24px;margin-bottom:20px;cursor:pointer">
                <h3 style="color:#a29bfe;margin-bottom:10px">TRIVIA RAPIDA</h3>
                <p style="opacity:0.5;font-size:0.8rem">10 PREGUNTAS ALEATORIAS</p>
            </div>
            <div onclick="renderConfiguradorTrivia()" style="background:rgba(85,239,196,0.1);border:2px solid #55efc4;padding:35px;border-radius:24px;cursor:pointer">
                <h3 style="color:#55efc4;margin-bottom:10px">TRIVIA POR LIBRO</h3>
                <p style="opacity:0.5;font-size:0.8rem">ELIGE TUS PROPIOS MAPAS</p>
            </div>
        </div>
    `;
}

function renderConfiguradorTrivia() {
    const area = document.getElementById('teen-content-area');
    const grupos = Object.entries(ESTRUCTURA_BIBLIA).map(([test, info]) => ({
        nombre: test, color: info.color, categorias: info.categorias
    }));
    area.innerHTML = `
        <style>
            .libro-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:10px; border-radius:10px; cursor:pointer; font-size:0.8rem; height:45px; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
            .libro-card.sel-verde { border-color:#55efc4; color:#55efc4; background:rgba(85,239,196,0.1); box-shadow:0 0 15px rgba(85,239,196,0.2); }
            .libro-card.sel-morado { border-color:#a29bfe; color:#a29bfe; background:rgba(162,155,254,0.1); box-shadow:0 0 15px rgba(162,155,254,0.2); }
            .cat-header { display:flex; padding:12px; cursor:pointer; color:#55efc4; border-bottom:1px solid rgba(255,255,255,0.05); }
            .cat-body { display:none; padding:15px 0; }
            .cat-body.open { display:block; }
            .test-tab { padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.2); background:none; color:#fff; margin-right:8px; flex:1; font-weight:900; font-size:0.75rem; letter-spacing:1px; }
            .test-tab.active { background:#fff; color:#000; border-color:#fff; }
        </style>
        <div style="padding:20px">
            <h2 style="text-align:center;color:#55efc4;margin-bottom:25px">TRIVIA POR LIBRO</h2>
            <div style="margin-bottom:20px">
                <input id="filtro-libro-trivia" type="text" placeholder="Busca tu zona de estudio..." onkeyup="filtrarLibrosTrivia(this.value)" style="width:100%;padding:15px;background:#000;color:#fff;border:1px solid #333;border-radius:12px">
            </div>
            <div style="display:flex;margin-bottom:25px">
                <button onclick="mostrarTestamentoTrivia('ANTIGUO TESTAMENTO')" class="test-tab active" id="tab-ANTIGUO_TESTAMENTO">ANTIGUO TEST.</button>
                <button onclick="mostrarTestamentoTrivia('NUEVO TESTAMENTO')" class="test-tab" id="tab-NUEVO_TESTAMENTO">NUEVO TEST.</button>
            </div>
            <div id="libros-trivia-grid">
                ${grupos.map((g, gi) => `
                    <div class="testamento-panel" id="panel-${g.nombre.replace(/\s/g, '_')}" style="${gi > 0 ? 'display:none' : ''}">
                        ${Object.entries(g.categorias).map(([cat, libros], ci) => `
                            <div style="margin-bottom:8px">
                                <div class="cat-header" onclick="toggleCat(this)">
                                    <span style="flex:1;font-size:0.8rem;font-weight:900">${cat.toUpperCase()}</span>
                                    <span style="opacity:0.4">v</span>
                                </div>
                                <div class="cat-body ${ci === 0 ? 'open' : ''}">
                                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:8px">
                                        ${libros.map(l => `
                                            <button id="libtrivia-${l.replace(/\s/g, '_')}" class="libro-card" data-color="${g.color === '#55efc4' ? 'verde' : 'morado'}" onclick="seleccionarLibroTrivia('${l}')">${l}</button>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            <div id="config-avanzada" style="display:none;margin-top:25px;padding:25px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:20px">
                <p style="font-size:0.85rem;margin-bottom:15px;font-weight:900">RANGO DE CAPITULOS:</p>
                <div style="display:flex;gap:15px;align-items:center">
                    <input id="cap-desde" type="number" value="1" style="width:65px;background:#000;color:#fff;border:2px solid #55efc4;padding:10px;border-radius:10px;text-align:center;font-weight:900">
                    <span style="opacity:0.5">AL</span> 
                    <input id="cap-hasta" type="number" value="3" style="width:65px;background:#000;color:#fff;border:2px solid #55efc4;padding:10px;border-radius:10px;text-align:center;font-weight:900">
                </div>
                <button onclick="iniciarTriviaLibro()" style="width:100%;padding:18px;margin-top:25px;background:linear-gradient(135deg,#55efc4,#00b894);color:#000;font-weight:900;border:none;border-radius:15px;font-size:1.1rem;letter-spacing:1px">EMPEZAR DESAFIO</button>
            </div>
        </div>
    `;
}

function toggleCat(h) { const b = h.nextElementSibling; b.classList.toggle('open'); }
function mostrarTestamentoTrivia(n) {
    document.querySelectorAll('.test-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + n.replace(/\s/g, '_')).classList.add('active');
    document.querySelectorAll('.testamento-panel').forEach(p => p.style.display = 'none');
    document.getElementById('panel-' + n.replace(/\s/g, '_')).style.display = 'block';
}

function seleccionarLibroTrivia(libro) {
    document.querySelectorAll('.libro-card').forEach(b => { b.classList.remove('sel-verde', 'sel-morado'); });
    const btn = document.getElementById('libtrivia-' + libro.replace(/\s/g, '_'));
    if (btn) btn.classList.add('sel-' + btn.dataset.color);
    document.getElementById('config-avanzada').style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
