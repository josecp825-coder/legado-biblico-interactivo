// ==========================================
// LEGADO BIBLICO - MOTOR COMPLETO ADOLESCENTES v8.0
// RESTAURACION TOTAL + TRIVIA CONFIGURABLE
// ==========================================
const BIBLIA_API_URL = "https://bible-api.deno.dev/api/read/";

const JUEGOS_BANCO = [
    { p: "Cual es el Sabado biblico segun el 4to mandamiento?", o: ["Viernes", "Sabado", "Domingo"], c: 1 },
    { p: "En que capitulo de Apocalipsis esta el mensaje de los Tres Angeles?", o: ["Capitulo 7", "Capitulo 14", "Capitulo 12"], c: 1 },
    { p: "Que significa la palabra 'Adventista'?", o: ["Creyente en el Sabado", "Creyente en la Segunda Venida", "Creyente en el bautismo"], c: 1 },
    { p: "Que dice Eclesiastes 9:5 sobre el estado de los muertos?", o: ["Van al cielo inmediatamente", "No saben nada - duermen", "Se comunican con los vivos"], c: 1 },
    { p: "Cuantos mandamientos tiene la Ley de Dios?", o: ["7", "10", "12"], c: 1 },
    { p: "Quien escribio 'El Camino a Cristo'?", o: ["Elena G. de White", "Martin Lutero", "Juan Calvino"], c: 0 },
    { p: "Que modelo de salud proclama la Iglesia Adventista?", o: ["Solo oracion", "NEWSTART (salud integral)", "Medicina natural"], c: 1 },
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

// --- ESTADO GLOBAL ---
let currentTranslation = "rv1960";
let currentLibroSlug = "";
let currentLibroNombre = "";
let currentCapitulo = 1;
let totalCapitulos = 1;
let libroSeleccionadoTrivia = "";
let preguntasRepetir = null;

let juegoState = {
    preguntaIdx: 0,
    vidas: 3,
    puntos: 0,
    total: 0,
    preguntas: [],
    timer: null,
    tiempoRestante: 20,
    tiempoConfig: 20,
    aprobado: false
};

// --- NAVEGACION Y RENDER ---
function renderBibliaDinamicaTeens() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div class="content-wrapper">
            <header class="teen-header">
                <button class="btn-volver" onclick="window.location.reload()">ATRAS</button>
                <div class="header-main">
                    <span style="font-size:0.7rem; opacity:0.6; letter-spacing:2px">MODO ESTUDIO PRO</span>
                    <h1>BIBLIA INTERACTIVA</h1>
                </div>
            </header>
            <nav class="teen-nav">
                <button id="nav-btn-lectura" onclick="cambiarSeccionTeen('lectura')" class="nav-active">LECTURA</button>
                <button id="nav-btn-explorar" onclick="cambiarSeccionTeen('explorar')">BUSCAR</button>
                <button id="nav-btn-jugar" onclick="cambiarSeccionTeen('jugar')">JUEGOS</button>
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
        <div class="bible-selector-container" style="padding:20px">
            <div id="bible-main-grid" class="dual-landing-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:30px">
                <button onclick="mostrarSeccionTestamento('ANTIGUO TESTAMENTO')" style="padding:25px;border-radius:15px;background:#55efc4;color:#000;font-weight:900;border:none">ANTIGUO TESTAMENTO</button>
                <button onclick="mostrarSeccionTestamento('NUEVO TESTAMENTO')" style="padding:25px;border-radius:15px;background:#a29bfe;color:#000;font-weight:900;border:none">NUEVO TESTAMENTO</button>
            </div>
            <div id="libros-dinamicos-root"></div>
        </div>
    `;
}

function mostrarSeccionTestamento(testamento) {
    const root = document.getElementById('libros-dinamicos-root');
    const info = ESTRUCTURA_BIBLIA[testamento];
    root.innerHTML = `
        <h3 style="text-align:center;letter-spacing:5px;opacity:0.6;margin-bottom:20px">${testamento}</h3>
        <div style="display:grid;grid-template-columns:1fr;gap:20px">
            ${Object.entries(info.categorias).map(([cat, libros]) => `
                <div style="background:rgba(255,255,255,0.03);padding:20px;border-radius:20px">
                    <p style="color:${info.color};font-weight:900;font-size:0.8rem;margin-bottom:15px;letter-spacing:1px">${cat.toUpperCase()}</p>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px">
                        ${libros.map(l => `<button class="btn-libro-premium" onclick="abrirLibro('${l}')">${l}</button>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

async function abrirLibro(libro, cap = 1, trans = "rv1960") {
    currentTranslation = trans;
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    currentCapitulo = parseInt(cap);

    const area = document.getElementById('teen-content-area');
    area.innerHTML = `<div style="text-align:center;padding:100px"><div class="loader-spinner" style="margin:0 auto"></div><p>CARGANDO ${libro.toUpperCase()}...</p></div>`;

    const data = await buscarEnBiblia(currentLibroSlug, currentCapitulo, currentTranslation);
    if (data && data.vers) {
        totalCapitulos = data.num_chapters || 1;
        renderLecturaInmersivaReal(data);
    } else {
        area.innerHTML = `<p>Error cargando ${libro}. Reintenta.</p>`;
    }
}

function renderLecturaInmersivaReal(data) {
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div class="immersive-reader-container" id="reader-container" style="padding:20px">
            <div style="position:sticky;top:0;background:rgba(0,0,0,0.9);padding:15px;z-index:100;display:flex;justify-content:space-between;align-items:center;border-radius:0 0 15px 15px">
                <button onclick="renderSelectorLibros()" style="background:none;border:none;color:#55efc4;font-weight:900">< SALIR</button>
                <span style="font-weight:900">${data.name} ${data.chapter}</span>
                <div style="display:flex;gap:10px">
                    <button onclick="cambiarCapitulo(-1)" style="padding:5px 10px;background:#333;color:#fff;border:none"> < </button>
                    <button onclick="cambiarCapitulo(1)" style="padding:5px 10px;background:#333;color:#fff;border:none"> > </button>
                </div>
            </div>
            
            <div style="margin-top:30px;line-height:1.8;font-size:1.1rem">
                ${data.vers.map(v => `
                    <div style="margin-bottom:15px;display:flex;gap:15px">
                        <span style="color:#55efc4;font-weight:900;font-size:0.8rem;margin-top:4px">${v.number}</span>
                        <p style="margin:0">${v.verse}</p>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top:50px;text-align:center">
                <button onclick="marcarReto()" style="padding:20px;background:#55efc4;color:#000;font-weight:900;border:none;border-radius:15px;width:100%">COMPLETAR LECTURA (+50 PUNTOS)</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// --- JUEGOS Y CONFIGURADOR ---
function renderJuegoTeens() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;text-align:center">
            <h2 style="margin-bottom:30px">ZONA DE JUEGOS</h2>
            <button onclick="iniciarTriviaRapida()" style="width:100%;padding:40px;background:#a29bfe;color:#000;font-weight:900;margin-bottom:15px;border:none;border-radius:20px">TRIVIA RAPIDA (EXAMEN)</button>
            <button onclick="renderConfiguradorTrivia()" style="width:100%;padding:40px;background:#55efc4;color:#000;font-weight:900;border:none;border-radius:20px">TRIVIA POR LIBRO (CONFIGURABLE)</button>
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
            .libro-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:10px; border-radius:10px; cursor:pointer; font-size:0.8rem; height:45px; display:flex; align-items:center; justify-content:center; }
            .libro-card.sel-verde { border-color:#55efc4; color:#55efc4; background:rgba(85,239,196,0.1); }
            .libro-card.sel-morado { border-color:#a29bfe; color:#a29bfe; background:rgba(162,155,254,0.1); }
            .cat-header { display:flex; padding:10px; cursor:pointer; color:#55efc4; border-bottom:1px solid rgba(255,255,255,0.05); }
            .cat-body { display:none; padding:10px 0; }
            .cat-body.open { display:block; }
            .test-tab { padding:12px; border-radius:12px; border:1px solid #fff; background:none; color:#fff; margin-right:8px; flex:1; font-weight:900; }
            .test-tab.active { background:#fff; color:#000; }
            .config-select { width:100%; padding:10px; background:#000; color:#fff; border:1px solid #55efc4; border-radius:10px; margin-bottom:10px; }
        </style>
        <div style="padding:20px">
            <h2 style="text-align:center;color:#55efc4">CONFIGURA TU EXAMEN</h2>
            <div style="display:flex;margin-bottom:25px;margin-top:20px">
                <button onclick="mostrarTestamentoTrivia('ANTIGUO TESTAMENTO')" class="test-tab active" id="tab-ANTIGUO_TESTAMENTO">ANTIGUO</button>
                <button onclick="mostrarTestamentoTrivia('NUEVO TESTAMENTO')" class="test-tab" id="tab-NUEVO_TESTAMENTO">NUEVO</button>
            </div>
            <div id="libros-trivia-grid">
                ${grupos.map((g, gi) => `
                    <div class="testamento-panel" id="panel-${g.nombre.replace(/\s/g, '_')}" style="${gi > 0 ? 'display:none' : ''}">
                        ${Object.entries(g.categorias).map(([cat, libros], ci) => `
                            <div>
                                <div class="cat-header" onclick="toggleCat(this)">
                                    <span style="flex:1; font-weight:900">${cat.toUpperCase()}</span>
                                    <span>v</span>
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
            <div id="config-avanzada" style="display:none;margin-top:25px;padding:25px;background:rgba(255,255,255,0.05);border-radius:20px; border:1px solid #55efc4">
                <p style="font-weight:900; color:#55efc4; margin-bottom:15px">OPCIONES DE EXAMEN</p>
                
                <label style="font-size:0.8rem; opacity:0.7">CAPITULOS:</label>
                <div style="display:flex;gap:10px;align-items:center; margin-bottom:15px">
                    <input id="cap-desde" type="number" value="1" style="width:50px; background:#000; color:#fff; border:1px solid #333; padding:5px"> AL 
                    <input id="cap-hasta" type="number" value="3" style="width:50px; background:#000; color:#fff; border:1px solid #333; padding:5px">
                </div>

                <label style="font-size:0.8rem; opacity:0.7">CANTIDAD DE PREGUNTAS:</label>
                <select id="trivia-cantidad" class="config-select">
                    <option value="5">5 Preguntas</option>
                    <option value="10">10 Preguntas</option>
                    <option value="15">15 Preguntas</option>
                    <option value="20">20 Preguntas</option>
                </select>

                <label style="font-size:0.8rem; opacity:0.7">TIEMPO POR PREGUNTA:</label>
                <select id="trivia-tiempo" class="config-select">
                    <option value="10">10 Segundos (Experto)</option>
                    <option value="20" selected>20 Segundos (Normal)</option>
                    <option value="30">30 Segundos (Calmado)</option>
                    <option value="60">60 Segundos (Estudiante)</option>
                </select>

                <button onclick="iniciarTriviaLibro()" style="width:100%;padding:15px;margin-top:10px;background:#55efc4;color:#000;font-weight:900;border-radius:10px;border:none">¡COMENZAR EXAMEN!</button>
            </div>
        </div>
    `;
}

function seleccionarLibroTrivia(libro) {
    libroSeleccionadoTrivia = libro;
    document.querySelectorAll('.libro-card').forEach(b => { b.classList.remove('sel-verde', 'sel-morado'); });
    const btn = document.getElementById('libtrivia-' + libro.replace(/\s/g, '_'));
    if (btn) btn.classList.add('sel-' + btn.dataset.color);
    document.getElementById('config-avanzada').style.display = 'block';
}

function iniciarTriviaRapida() {
    preguntasRepetir = null; // Reiniciar preguntas para trivia rapida
    iniciarGameEngine(JUEGOS_BANCO, 10, 20);
}

function iniciarTriviaLibro() {
    const cant = parseInt(document.getElementById('trivia-cantidad').value);
    const tiempo = parseInt(document.getElementById('trivia-tiempo').value);

    // Si aprobó antes y es el mismo libro, generamos nuevas. 
    // Si no aprobó, usamos las mismas de preguntasRepetir (si existen).
    if (preguntasRepetir && !juegoState.aprobado) {
        mostrarToast("Repitiendo examen para mejorar...");
        iniciarGameEngine(preguntasRepetir, cant, tiempo);
    } else {
        // Generar preguntas aleatorias del banco (Simulado por ahora con JUEGOS_BANCO)
        // En un futuro aqui se cargarian del libro especifico
        const preguntasNuevas = [...JUEGOS_BANCO].sort(() => Math.random() - 0.5).slice(0, cant);
        preguntasRepetir = preguntasNuevas;
        iniciarGameEngine(preguntasNuevas, cant, tiempo);
    }
}

function iniciarGameEngine(preguntas, total, tiempo) {
    juegoState = {
        preguntaIdx: 0,
        vidas: 3,
        puntos: 0,
        total: total,
        preguntas: preguntas,
        timer: null,
        tiempoRestante: tiempo,
        tiempoConfig: tiempo,
        aprobado: false
    };
    renderPantallaPregunta();
}

function renderPantallaPregunta() {
    if (juegoState.preguntaIdx >= juegoState.preguntas.length || juegoState.vidas <= 0) {
        finalizarExamen();
        return;
    }

    const p = juegoState.preguntas[juegoState.preguntaIdx];
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div style="padding:20px; text-align:center">
            <div style="display:flex; justify-content:space-between; margin-bottom:20px">
                <span id="vidas-display" style="color:#ff4757; font-weight:900">VIDAS: ${'❤️'.repeat(juegoState.vidas)}</span>
                <span id="timer-display" style="color:#55efc4; font-weight:900">TIEMPO: ${juegoState.tiempoRestante}s</span>
            </div>
            
            <div style="background:rgba(255,255,255,0.05); padding:30px; border-radius:20px; margin-bottom:20px; border:1px solid #55efc4">
                <p style="font-size:0.8rem; opacity:0.5; letter-spacing:2px">PREGUNTA ${juegoState.preguntaIdx + 1} DE ${juegoState.total}</p>
                <h2 style="margin-top:10px">${p.p}</h2>
            </div>

            <div style="display:grid; grid-template-columns:1fr; gap:10px">
                ${p.o.map((op, idx) => `
                    <button onclick="verificarRespuesta(${idx})" style="padding:15px; background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:12px; text-align:left; font-size:1rem">
                        ${idx + 1}. ${op}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    iniciarTemporizador();
}

function iniciarTemporizador() {
    clearInterval(juegoState.timer);
    juegoState.tiempoRestante = juegoState.tiempoConfig;
    document.getElementById('timer-display').innerText = `TIEMPO: ${juegoState.tiempoRestante}s`;

    juegoState.timer = setInterval(() => {
        juegoState.tiempoRestante--;
        document.getElementById('timer-display').innerText = `TIEMPO: ${juegoState.tiempoRestante}s`;

        if (juegoState.tiempoRestante <= 0) {
            clearInterval(juegoState.timer);
            verificarRespuesta(-1); // Tiempo agotado
        }
    }, 1000);
}

function verificarRespuesta(idx) {
    clearInterval(juegoState.timer);
    const p = juegoState.preguntas[juegoState.preguntaIdx];

    if (idx === p.c) {
        juegoState.puntos += 100;
        mostrarToast("¡CORRECTO! +100 PUNTOS");
    } else {
        juegoState.vidas--;
        mostrarToast(idx === -1 ? "TIEMPO AGOTADO -1 VIDA" : "INCORRECTO -1 VIDA");
    }

    juegoState.preguntaIdx++;
    setTimeout(renderPantallaPregunta, 1000);
}

function finalizarExamen() {
    const area = document.getElementById('teen-content-area');
    const porcentaje = (juegoState.puntos / (juegoState.total * 100)) * 100;
    juegoState.aprobado = porcentaje >= 70;

    area.innerHTML = `
        <div style="padding:40px; text-align:center">
            <h1 style="color:${juegoState.aprobado ? '#55efc4' : '#ff4757'}">
                ${juegoState.aprobado ? '¡EXAMEN APROBADO!' : 'EXAMEN FALLIDO'}
            </h1>
            <div style="font-size:3rem; margin:20px 0">${Math.round(porcentaje)}%</div>
            <p>Puntos obtenidos: ${juegoState.puntos}</p>
            
            <button onclick="renderJuegoTeens()" style="width:100%; padding:20px; background:#fff; color:#000; font-weight:900; border-radius:15px; border:none; margin-top:30px">VOLVER AL MENU</button>
            <button onclick="renderConfiguradorTrivia()" style="width:100%; padding:20px; background:rgba(255,255,255,0.1); color:#fff; font-weight:900; border-radius:15px; border:1px solid #fff; margin-top:10px">REINTENTAR / CAMBIAR LIBRO</button>
        </div>
    `;
}

// --- UTILIDADES ---
async function cambiarCapitulo(delta) {
    const nuevoCap = currentCapitulo + delta;
    if (nuevoCap >= 1 && nuevoCap <= totalCapitulos) {
        await abrirLibro(currentLibroNombre, nuevoCap, currentTranslation);
    }
}

function normalizarLibro(libro) {
    const mapa = {
        "Genesis": "genesis", "Exodo": "exodo", "Levitico": "levitico", "Numeros": "numeros", "Deuteronomio": "deuteronomio",
        "Josue": "josue", "Jueces": "rut", "Rut": "rut", "1 Samuel": "1_samuel", "2 Samuel": "2_samuel",
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
    return mapa[libro] || libro.toLowerCase();
}

async function marcarReto() {
    mostrarToast("NUEVO LOGRO: Capitulo Completado (+50 Puntos)");
}

function mostrarToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#55efc4;color:#000;padding:15px;border-radius:10px;font-weight:900;z-index:9999';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

function renderExplorador() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px">
            <h2>BUSCAR EN LA PALABRA</h2>
            <input id="bible-search" type="text" placeholder="Juan 3:16" style="width:100%;padding:15px;background:#000;color:#fff;border:1px solid #333;border-radius:10px">
            <button onclick="ejecutarBusqueda()" style="width:100%;margin-top:10px;padding:15px;background:#55efc4;color:#000;font-weight:900;border:none;border-radius:10px">BUSCAR</button>
            <div id="search-results" style="margin-top:20px"></div>
        </div>
    `;
}

async function ejecutarBusqueda() {
    mostrarToast("Buscando en la Biblia...");
}

function toggleCat(h) { const b = h.nextElementSibling; b.classList.toggle('open'); }
function mostrarTestamentoTrivia(n) {
    document.querySelectorAll('.test-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + n.replace(/\s/g, '_')).classList.add('active');
    document.querySelectorAll('.testamento-panel').forEach(p => p.style.display = 'none');
    document.getElementById('panel-' + n.replace(/\s/g, '_')).style.display = 'block';
}
