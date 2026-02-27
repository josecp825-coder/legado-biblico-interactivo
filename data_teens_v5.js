// ==========================================
// LEGADO BIBLICO - MOTOR ADOLESCENTES v11.0
// CORRECCION CRITICA: RANGO DE CAPITULOS Y FORMATO
// ==========================================
const BIBLIA_API_URL = "https://bible-api.deno.dev/api/read/";

const JUEGOS_BANCO_GENERAL = [
    { p: "Cual es el Sabado biblico segun el 4to mandamiento?", o: ["Viernes", "Sabado", "Domingo"], c: 1 },
    { p: "En que capitulo de Apocalipsis esta el mensaje de los Tres Angeles?", o: ["Capitulo 7", "Capitulo 14", "Capitulo 12"], c: 1 },
    { p: "Que significa la palabra 'Adventista'?", o: ["Creyente en el Sabado", "Creyente en la Segunda Venida", "Creyente en el bautismo"], c: 1 },
    { p: "Que dice Eclesiastes 9:5 sobre el estado de los muertos?", o: ["Van al cielo inmediatamente", "No saben nada - duermen", "Se comunican con los vivos"], c: 1 },
    { p: "Cuantos mandamientos tiene la Ley de Dios?", o: ["7", "10", "12"], c: 1 }
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

let preguntasRepetir = null;
let ultimoLibroTrivia = "";
let ultimoRangoTrivia = "";

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
            <div id="bible-main-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:30px">
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

async function abrirLibro(libro, cap = 1) {
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    currentCapitulo = parseInt(cap);

    const area = document.getElementById('teen-content-area');
    area.innerHTML = `<div style="text-align:center;padding:100px"><div class="loader-spinner" style="margin:0 auto"></div><p>CARGANDO ${libro.toUpperCase()}...</p></div>`;

    const data = await buscarEnBiblia(currentLibroSlug, currentCapitulo);
    if (data && data.vers) {
        renderLecturaInmersivaReal(data);
    } else {
        area.innerHTML = `<p>Error cargando. Reintenta.</p>`;
    }
}

function renderLecturaInmersivaReal(data) {
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div class="immersive-reader-container" style="padding:20px">
            <div style="position:sticky;top:0;background:rgba(0,0,0,0.9);padding:15px;z-index:100;display:flex;justify-content:space-between;align-items:center;border-radius:0 0 15px 15px">
                <button onclick="renderSelectorLibros()" style="background:none;border:none;color:#55efc4;font-weight:900">< SALIR</button>
                <span style="font-weight:900">${data.name} ${data.chapter}</span>
                <div style="display:flex;gap:10px">
                    <button onclick="buscarEnBiblia('${currentLibroSlug}', ${currentCapitulo - 1}).then(d => { if(d) { currentCapitulo--; renderLecturaInmersivaReal(d); } })" style="padding:5px 10px;background:#333;color:#fff;border:none"> < </button>
                    <button onclick="buscarEnBiblia('${currentLibroSlug}', ${currentCapitulo + 1}).then(d => { if(d) { currentCapitulo++; renderLecturaInmersivaReal(d); } })" style="padding:5px 10px;background:#333;color:#fff;border:none"> > </button>
                </div>
            </div>
            <div style="margin-top:30px;line-height:1.8;font-size:1.1rem">
                ${data.vers.map(v => `<p><span style="color:#55efc4;font-weight:900;margin-right:10px">${v.number}</span>${v.verse}</p>`).join('')}
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderJuegoTeens() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px;text-align:center">
            <h2 style="margin-bottom:30px">ZONA DE JUEGOS</h2>
            <button onclick="iniciarTriviaRapida()" style="width:100%;padding:40px;background:#a29bfe;color:#000;font-weight:900;margin-bottom:15px;border:none;border-radius:20px">TRIVIA RAPIDA (EXAMEN)</button>
            <button onclick="renderConfiguradorTrivia()" style="width:100%;padding:40px;background:#55efc4;color:#000;font-weight:900;border:none;border-radius:20px">TRIVIA POR LIBRO (EXCLUSIVO)</button>
        </div>
    `;
}

function renderConfiguradorTrivia() {
    const area = document.getElementById('teen-content-area');
    const grupos = Object.entries(ESTRUCTURA_BIBLIA).map(([test, info]) => ({
        nombre: test, color: info.color, categorias: info.categorias
    }));
    area.innerHTML = `
        <div style="padding:20px">
            <h2 style="text-align:center;color:#55efc4">CONFIGURA TU EXAMEN EXCLUSIVO</h2>
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
                                        ${libros.map(l => `<button id="libtrivia-${l.replace(/\s/g, '_')}" class="libro-card" data-color="${g.color === '#55efc4' ? 'verde' : 'morado'}" onclick="seleccionarLibroTrivia('${l}')">${l}</button>`).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            <div id="config-avanzada" style="display:none;margin-top:25px;padding:25px;background:rgba(255,255,255,0.05);border-radius:20px; border:1px solid #55efc4">
                <p style="font-weight:900; color:#55efc4; margin-bottom:15px">PARAMETROS DEL LIBRO</p>
                <div style="display:flex;gap:10px;align-items:center; margin-bottom:15px">
                    <input id="cap-desde" type="number" value="1" style="width:50px; background:#000; color:#fff; border:1px solid #333"> AL <input id="cap-hasta" type="number" value="3" style="width:50px; background:#000; color:#fff; border:1px solid #333">
                </div>
                <select id="trivia-cantidad" class="config-select">
                    <option value="5">5 Preguntas</option><option value="10">10 Preguntas</option><option value="15">15 Preguntas</option><option value="20">20 Preguntas</option>
                </select>
                <select id="trivia-tiempo" class="config-select">
                    <option value="10">10s (Modo Pro)</option><option value="20" selected>20s (Estandar)</option><option value="30">30s (Tranquilo)</option>
                </select>
                <button onclick="iniciarTriviaLibro()" style="width:100%;padding:15px;margin-top:10px;background:#55efc4;color:#000;font-weight:900;border-radius:10px">GENERAR EXAMEN DEL LIBRO</button>
            </div>
        </div>
    `;
}

function seleccionarLibroTrivia(libro) {
    currentLibroNombre = libro;
    currentLibroSlug = normalizarLibro(libro);
    document.querySelectorAll('.libro-card').forEach(b => b.classList.remove('sel-verde', 'sel-morado'));
    const btn = document.getElementById('libtrivia-' + libro.replace(/\s/g, '_'));
    btn.className += ' sel-' + btn.dataset.color;
    document.getElementById('config-avanzada').style.display = 'block';
}

async function iniciarTriviaLibro() {
    const cant = parseInt(document.getElementById('trivia-cantidad').value);
    const tiempo = parseInt(document.getElementById('trivia-tiempo').value);
    const desde = parseInt(document.getElementById('cap-desde').value);
    const hasta = parseInt(document.getElementById('cap-hasta').value);
    const rangoActual = `${desde}-${hasta}`;

    if (preguntasRepetir && !juegoState.aprobado && ultimoLibroTrivia === currentLibroSlug && ultimoRangoTrivia === rangoActual) {
        mostrarToast("Repitiendo preguntas para mejorar...");
        iniciarGameEngine(preguntasRepetir, cant, tiempo);
        return;
    }

    mostrarToast("Generando preguntas de los capitulos seleccionados...");
    let pool = [];
    for (let c = desde; c <= hasta; c++) {
        const d = await buscarEnBiblia(currentLibroSlug, c);
        if (d && d.vers) {
            // Guardamos el capitulo en cada versiculo para la pregunta
            const versWithCap = d.vers.map(v => ({ ...v, chapter: c }));
            pool = pool.concat(versWithCap);
        }
    }

    if (pool.length < 5) return mostrarToast("Error: Pocos versiculos en este rango.");

    const pregs = [];
    const poolS = pool.sort(() => Math.random() - 0.5);
    for (let i = 0; i < cant && i < poolS.length; i++) {
        const v = poolS[i];
        const words = v.verse.split(' ');
        if (words.length < 8) continue;
        const correct = `...${words.slice(-4).join(' ')}`;
        pregs.push({
            p: `Segun ${currentLibroNombre} ${v.chapter}:${v.number}, ¿como termina este texto: "${words.slice(0, 5).join(' ')}..."?`,
            o: [correct, "...y se fue pronto", "...en aquel tiempo", "...dijo el Profeta"].sort(() => Math.random() - 0.5),
            c: 0
        });
        pregs[pregs.length - 1].c = pregs[pregs.length - 1].o.indexOf(correct);
    }

    ultimoLibroTrivia = currentLibroSlug;
    ultimoRangoTrivia = rangoActual;
    preguntasRepetir = pregs;
    iniciarGameEngine(pregs, cant, tiempo);
}

function iniciarTriviaRapida() {
    iniciarGameEngine(JUEGOS_BANCO_GENERAL, 5, 20);
}

function iniciarGameEngine(ps, t, tm) {
    juegoState = { preguntaIdx: 0, vidas: 3, puntos: 0, total: ps.length, preguntas: ps, timer: null, tiempoRestante: tm, tiempoConfig: tm, aprobado: false };
    renderPantallaPregunta();
}

function renderPantallaPregunta() {
    if (juegoState.preguntaIdx >= juegoState.preguntas.length || juegoState.vidas <= 0) return finalizarExamen();
    const p = juegoState.preguntas[juegoState.preguntaIdx];
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:20px; text-align:center">
            <div style="display:flex; justify-content:space-between; margin-bottom:20px">
                <span style="font-weight:900">VIDAS: ${'❤️'.repeat(juegoState.vidas)}</span>
                <span id="timer-display" style="color:#55efc4; font-weight:900">TIEMPO: ${juegoState.tiempoRestante}s</span>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; border:1px solid #55efc4">
                <p style="font-size:0.7rem; opacity:0.6">PREGUNTA ${juegoState.preguntaIdx + 1} DE ${juegoState.total}</p>
                <h2 style="font-size:1.1rem">${p.p}</h2>
            </div>
            <div style="display:grid; gap:10px; margin-top:20px">
                ${p.o.map((o, i) => `<button onclick="verificarRespuesta(${i})" style="padding:15px; background:rgba(255,255,255,0.1); color:#fff; border-radius:10px; border:1px solid #444; text-align:left">${o}</button>`).join('')}
            </div>
        </div>
    `;
    iniciarTemporizador();
}

function iniciarTemporizador() {
    clearInterval(juegoState.timer);
    juegoState.tiempoRestante = juegoState.tiempoConfig;
    juegoState.timer = setInterval(() => {
        juegoState.tiempoRestante--;
        const disp = document.getElementById('timer-display');
        if (disp) disp.innerText = `TIEMPO: ${juegoState.tiempoRestante}s`;
        if (juegoState.tiempoRestante <= 0) { clearInterval(juegoState.timer); verificarRespuesta(-1); }
    }, 1000);
}

function verificarRespuesta(i) {
    clearInterval(juegoState.timer);
    if (juegoState.preguntas[juegoState.preguntaIdx] && i === juegoState.preguntas[juegoState.preguntaIdx].c) {
        juegoState.puntos += 100;
        mostrarToast("¡CORRECTO!");
    }
    else {
        juegoState.vidas--;
        mostrarToast("INCORRECTO");
    }
    juegoState.preguntaIdx++;
    setTimeout(renderPantallaPregunta, 800);
}

function finalizarExamen() {
    const p = (juegoState.puntos / (juegoState.total * 100)) * 100;
    juegoState.aprobado = p >= 70;
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:40px; text-align:center">
            <h1 style="color:${juegoState.aprobado ? '#55efc4' : '#ff4757'}">${juegoState.aprobado ? '¡APROBADO!' : 'REPROBADO'}</h1>
            <div style="font-size:3rem; margin:20px 0">${Math.round(p)}%</div>
            <button onclick="renderJuegoTeens()" style="width:100%; padding:20px; background:#55efc4; font-weight:900; color:#000; border-radius:15px; border:none">VOLVER</button>
        </div>
    `;
}

function normalizarLibro(l) {
    const m = { "Genesis": "genesis", "Exodo": "exodo", "Levitico": "levitico", "Numeros": "numeros", "Deuteronomio": "deuteronomio", "Josue": "josue", "Jueces": "jueces", "Rut": "rut", "1 Samuel": "1_samuel", "2 Samuel": "2_samuel", "1 Reyes": "1_reyes", "2 Reyes": "2_reyes", "1 Cronicas": "1_cronicas", "2 Cronicas": "2_cronicas", "Esdras": "esdras", "Nehemias": "nehemias", "Ester": "ester", "Job": "job", "Salmos": "salmos", "Proverbios": "proverbios", "Eclesiastes": "eclesiastes", "Cantares": "cantares", "Isaias": "isaias", "Jeremias": "jeremias", "Lamentaciones": "lamentaciones", "Ezequiel": "ezequiel", "Daniel": "daniel", "Oseas": "oseas", "Joel": "joel", "Amos": "amos", "Abdias": "abdias", "Jonis": "jonas", "Miqueas": "miqueas", "Nahum": "nahum", "Habacuc": "habacuc", "Sofonias": "sofonias", "Hageo": "hageo", "Zacarias": "zacarias", "Malaquias": "malaquias", "Mateo": "mateo", "Marcos": "marcos", "Lucas": "lucas", "Juan": "juan", "Hechos": "hechos", "Romanos": "romanos", "1 Corintios": "1_corintios", "2 Corintios": "2_corintios", "Galatas": "galatas", "Efesios": "efesios", "Filipenses": "filipenses", "Colosenses": "colosenses", "1 Tesalonicenses": "1_tesalonicenses", "2 Tesalonicenses": "2_tesalonicenses", "1 Timoteo": "1_timoteo", "2 Timoteo": "2_timoteo", "Tito": "tito", "Filemon": "filemon", "Hebreos": "hebreos", "Santiago": "santiago", "1 Pedro": "1_pedro", "2 Pedro": "2_pedro", "1 Juan": "1_juan", "2 Juan": "2_juan", "3 Juan": "3_juan", "Judas": "judas", "Apocalipsis": "apocalipsis" };
    return m[l] || l.toLowerCase();
}

async function buscarEnBiblia(s, c = 1, t = "rv1960") {
    try {
        const r = await fetch(`${BIBLIA_API_URL}${t}/${s}/${c}`);
        if (!r.ok) return null;
        return await r.json();
    } catch (e) { return null; }
}

function mostrarToast(m) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#55efc4;color:#000;padding:15px;border-radius:10px;font-weight:900;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,0.5)';
    t.innerText = m;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
}

function toggleCat(h) {
    const b = h.nextElementSibling;
    b.style.display = b.style.display === 'block' ? 'none' : 'block';
}

function mostrarTestamentoTrivia(n) {
    document.querySelectorAll('.test-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + n.replace(/\s/g, '_')).classList.add('active');
    document.querySelectorAll('.testamento-panel').forEach(p => p.style.display = 'none');
    document.getElementById('panel-' + n.replace(/\s/g, '_')).style.display = 'block';
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

function ejecutarBusqueda() { mostrarToast("Buscando..."); }
