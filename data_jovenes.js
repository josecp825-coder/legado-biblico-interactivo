// ==========================================
// 🚀 MÓDULO JÓVENES — FORO PROFÉTICO
// Filosofía Adventista del Séptimo Día
// ==========================================

const JOVENES_DATA = {
    debateDelDia: {
        tema: "¿Es el Sábado del séptimo día relevante para los cristianos de hoy?",
        contexto: "Apocalipsis 14:12 habla de los que 'guardan los mandamientos de Dios'. El cuarto mandamiento ordena santificar el sábado (sábado = séptimo día). ¿Es este mandamiento vigente o fue abolido?",
        posiciones: [
            { id: "A", label: "Sí, es vigente", color: "#55efc4", icon: "⚡", desc: "Los 10 mandamientos son eternos. Jesús dijo que no vino a abrogarlos (Mat 5:17). El sábado fue establecido en el Edén antes del pecado." },
            { id: "B", label: "No, fue abolido", color: "#ff6b6b", icon: "🔥", desc: "Cristo es nuestro descanso (Heb 4:9-10). La ley fue clavada en la cruz (Col 2:14). Adoramos en el primer día por la resurrección." },
            { id: "C", label: "Neutral / Estudiando", color: "#feca57", icon: "🤔", desc: "Es un tema que requiere más estudio. Quiero examinar todas las referencias antes de decidir." }
        ],
        versiculo: { ref: "Apocalipsis 14:12", texto: "Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús." }
    },

    profeciasDaniel: [
        { capitulo: "Daniel 2", simbolo: "🏛️", imagen: "daniel_profecia_timeline_1772169603328.png", titulo: "La Estatua de Metales", descripcion: "Nabucodonosor sueña con una estatua de 4 metales: oro (Babilonia), plata (Medo-Persia), bronce (Grecia), hierro/barro (Roma/naciones divididas). Una piedra sin manos la destruye y llena la tierra.", cumplimiento: "Babilonia (605-539 a.C.) → Medo-Persia (539-331 a.C.) → Grecia (331-168 a.C.) → Roma (168 a.C.-476 d.C.) → Europa dividida hoy", color: "#f9ca24" },
        { capitulo: "Daniel 7", simbolo: "🦁", imagen: "jovenes_profecia_hero_1772169591746.png", titulo: "Las 4 Bestias", descripcion: "León (Babilonia), Oso (Medo-Persia), Leopardo (Grecia), Bestia terrible (Roma). Un \"cuerno pequeño\" persigue a los santos 1,260 años. El Anciano de Días abre juicio.", cumplimiento: "El 'cuerno pequeño' identificado como el papado medieval (538-1798 d.C. = 1,260 años proféticos)", color: "#a29bfe" },
        { capitulo: "Daniel 8-9", simbolo: "📅", imagen: "daniel_profecia_timeline_1772169603328.png", titulo: "Las 2,300 Tardes y Mañanas", descripcion: "Profecía de los 2,300 días hasta la purificación del santuario. Las 70 semanas (490 años) son 'cortadas' de los 2,300. Comienza en 457 a.C. — Mesías ungido en 27 d.C.", cumplimiento: "2,300 años - 457 a.C. = 1844 d.C. — Inicio del Juicio Investigador en el Santuario Celestial. Fundamento de la doctrina adventista.", color: "#fd79a8" }
    ],

    devocionalExpress: {
        titulo: "Devocional de Hoy — 5 Minutos",
        pasaje: "Apocalipsis 14:6-12",
        versos: [
            { v: 6, texto: "Vi volar por en medio del cielo a otro ángel, que tenía el evangelio eterno para predicarlo a los moradores de la tierra..." },
            { v: 7, texto: "diciendo a gran voz: Temed a Dios, y dadle gloria, porque la hora de su juicio ha llegado; y adorad a aquel que hizo el cielo y la tierra..." },
            { v: 12, texto: "Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús." }
        ],
        reflexion: "El 'evangelio eterno' es la Buena Noticia que nunca cambia: Dios nos llama a salir de Babilonia (sistemas religiosos confusos) y a adorarlo como Creador. El sábado es la firma de esa adoración.",
        mision: "Esta semana: estudia con alguien la diferencia entre el sábado bíblico y el domingo. Usa solo la Biblia como fuente.",
        versiculo_mem: { ref: "Ap. 14:12", texto: "Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús." }
    },

    apologetica: [
        {
            pregunta: "¿Por qué adorar el sábado si 'estamos bajo la gracia, no bajo la ley'?",
            respuesta: "Romanos 6:15 responde esta misma pregunta: '¿Pecaremos porque estamos bajo la gracia? En ninguna manera.' La gracia nos libera del CASTIGO del pecado, no del estándar de vida de Dios. Los 10 mandamientos definen el pecado (1 Juan 3:4). La gracia nos da el poder de obedecerlos (Ezequiel 36:27).",
            versiculos: ["Romanos 3:31", "1 Juan 2:3-4", "Apocalipsis 22:14"],
            color: "#6c5ce7"
        },
        {
            pregunta: "¿Los muertos están en el cielo o 'durmiendo'?",
            respuesta: "La Biblia enseña el 'sueño de la muerte' (estado inconsciente). Eclesiastés 9:5 dice 'los muertos no saben nada'. Lázaro 'durmió' (Juan 11:11-14). Los muertos resucitan en la Segunda Venida (1 Tes 4:16), no van al cielo inmediatamente. Esto elimina el espiritismo y el purgatorio.",
            versiculos: ["Eclesiastés 9:5", "Juan 11:11-14", "1 Tesalonicenses 4:16"],
            color: "#00b894"
        },
        {
            pregunta: "¿Habrá un rapto secreto antes de la tribulación?",
            respuesta: "El 'rapto secreto' no aparece en la Biblia. Cristo viene de manera visible, audible y gloriosa: 'todo ojo le verá' (Ap 1:7). 'Con voz de arcángel y trompeta' (1 Tes 4:16). No hay un segundo regreso secreto. La Segunda Venida es UN evento glorioso que pone fin a todo.",
            versiculos: ["Apocalipsis 1:7", "Mateo 24:27", "1 Tesalonicenses 4:16-17"],
            color: "#fd79a8"
        }
    ],

    retoMemoria: {
        versiculo: "Apocalipsis 14:12",
        texto: "Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús.",
        palabras: ["Aquí", "está", "la", "paciencia", "de", "los", "santos", "los", "que", "guardan", "los", "mandamientos", "de", "Dios", "y", "la", "fe", "de", "Jesús"]
    }
};

// --- ESTADO MÓDULO JÓVENES ---
let jovenState = {
    seccion: "hub",
    debateVoto: null,
    profeciaIdx: 0,
    memoriaIdx: 0,
    apologeticaIdx: 0,
    palabrasOrdenadas: [],
    completado: { debate: false, devocional: false, apolo: false, memoria: false },
    cargandoNube: true
};

// ==========================================
// HUB PRINCIPAL JÓVENES
// ==========================================
function renderModuloJovenes() {
    const container = document.getElementById("pantalla-estudio");
    const completados = Object.values(jovenState.completado).filter(Boolean).length;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(160deg,#0f0c29,#302b63,#24243e);font-family:'Segoe UI',sans-serif;padding-bottom:50px;">

            <!-- HEADER -->
            <div style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.08);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;">
                <button onclick="window.location.reload()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.82rem;font-weight:700;letter-spacing:1px;">← INICIO</button>
                <span style="color:#a29bfe;font-weight:900;font-size:0.9rem;letter-spacing:3px;">⚡ FORO PROFÉTICO</span>
                <div style="background:rgba(162,155,254,0.15);border:1px solid #a29bfe55;border-radius:20px;padding:6px 14px;color:#a29bfe;font-weight:900;font-size:0.85rem;">${completados}/4 ✓</div>
            </div>

            <!-- HERO BANNER -->
            <div style="position:relative;margin:20px;border-radius:24px;overflow:hidden;box-shadow:0 25px 80px rgba(0,0,0,0.6);">
                <img src="jovenes_profecia_hero_1772169591746.png" style="width:100%;height:240px;object-fit:cover;object-position:center top;">
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(15,12,41,0.95) 0%,rgba(15,12,41,0.3) 60%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:25px;">
                    <p style="color:#a29bfe;font-size:0.72rem;letter-spacing:4px;margin:0 0 6px;font-weight:700;">IGLESIA ADVENTISTA · JÓVENES</p>
                    <h1 style="color:#fff;font-size:1.7rem;font-weight:900;margin:0;line-height:1.2;text-shadow:0 2px 20px rgba(0,0,0,0.8);">Profe en la Profecía 🔮</h1>
                    <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin:6px 0 0;">"La profecía nunca fue traída por voluntad humana" — 2 Pedro 1:21</p>
                </div>
            </div>

            <!-- PROGRESO DIARIO -->
            <div style="margin:0 20px 20px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:18px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                    <span style="color:rgba(255,255,255,0.6);font-size:0.78rem;letter-spacing:2px;">PROGRESO DEL DÍA</span>
                    <span style="color:#a29bfe;font-weight:900;font-size:0.85rem;">${completados * 25}%</span>
                </div>
                <div style="background:rgba(255,255,255,0.06);border-radius:10px;height:6px;overflow:hidden;">
                    <div style="width:${completados * 25}%;height:100%;background:linear-gradient(to right,#6c5ce7,#a29bfe);border-radius:10px;transition:1s;"></div>
                </div>
                <div style="display:flex;justify-content:space-around;margin-top:14px;">
                    ${[
            { k: "debate", i: "⚡", l: "Debate" },
            { k: "devocional", i: "📖", l: "Devocional" },
            { k: "apolo", i: "🛡️", l: "Apologética" },
            { k: "memoria", i: "🧠", l: "Memoria" }
        ].map(x => `
                        <div style="text-align:center;opacity:${jovenState.completado[x.k] ? '1' : '0.4'};">
                            <div style="font-size:1.3rem;">${jovenState.completado[x.k] ? '✅' : x.i}</div>
                            <div style="color:rgba(255,255,255,0.5);font-size:0.65rem;margin-top:3px;">${x.l}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- MENÚ SECCIONES -->
            <div style="padding:0 20px;display:grid;gap:14px;">

                <!-- DEBATE DEL DÍA -->
                <div onclick="renderDebateJovenes()" style="background:linear-gradient(135deg,rgba(108,92,231,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.3);border-radius:22px;padding:20px;cursor:pointer;transition:0.3s;position:relative;overflow:hidden;"
                    onmouseover="this.style.borderColor='#a29bfe';this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.borderColor='rgba(162,155,254,0.3)';this.style.transform='translateY(0)'">
                    <div style="font-size:2rem;margin-bottom:8px;">⚡</div>
                    <h3 style="color:#fff;font-size:1.05rem;font-weight:900;margin:0 0 5px;">Debate del Día</h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;">${JOVENES_DATA.debateDelDia.tema.substring(0, 60)}...</p>
                    <div style="position:absolute;right:20px;top:50%;transform:translateY(-50%);color:#a29bfe;font-size:1.5rem;">›</div>
                    ${jovenState.completado.debate ? '<div style="position:absolute;top:14px;right:40px;background:#55efc4;color:#000;border-radius:20px;padding:3px 10px;font-size:0.7rem;font-weight:900;">✓ HECHO</div>' : ''}
                </div>

                <!-- MAPA PROFÉTICO -->
                <div onclick="renderMapaProfetico()" style="background:linear-gradient(135deg,rgba(253,121,168,0.15),rgba(162,155,254,0.08));border:1px solid rgba(253,121,168,0.25);border-radius:22px;padding:20px;cursor:pointer;transition:0.3s;"
                    onmouseover="this.style.borderColor='#fd79a8';this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.borderColor='rgba(253,121,168,0.25)';this.style.transform='translateY(0)'">
                    <div style="font-size:2rem;margin-bottom:8px;">🗺️</div>
                    <h3 style="color:#fff;font-size:1.05rem;font-weight:900;margin:0 0 5px;">Mapa Profético</h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;">Daniel 2, 7, 8-9 — Las profecías que cambian todo</p>
                    <div style="position:absolute;right:20px;font-size:1.5rem;color:#fd79a8;">›</div>
                </div>

                <!-- DEVOCIONAL EXPRESS -->
                <div onclick="renderDevocionalJovenes()" style="background:linear-gradient(135deg,rgba(0,184,148,0.15),rgba(85,239,196,0.08));border:1px solid rgba(85,239,196,0.25);border-radius:22px;padding:20px;cursor:pointer;transition:0.3s;"
                    onmouseover="this.style.borderColor='#55efc4';this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.borderColor='rgba(85,239,196,0.25)';this.style.transform='translateY(0)'">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                        <div style="font-size:2rem;">📖</div>
                        <div style="background:#55efc4;color:#000;border-radius:12px;padding:3px 10px;font-size:0.7rem;font-weight:900;">5 MIN</div>
                    </div>
                    <h3 style="color:#fff;font-size:1.05rem;font-weight:900;margin:0 0 5px;">Devocional Express</h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;">Apocalipsis 14:6-12 — Los 3 Mensajes Angelicales</p>
                    ${jovenState.completado.devocional ? '<div style="margin-top:8px;background:#55efc4;color:#000;border-radius:20px;padding:3px 10px;font-size:0.7rem;font-weight:900;display:inline-block;">✓ COMPLETADO</div>' : ''}
                </div>

                <!-- APOLOGÉTICA SDA -->
                <div onclick="renderApologetica(0)" style="background:linear-gradient(135deg,rgba(249,202,36,0.12),rgba(240,147,43,0.08));border:1px solid rgba(249,202,36,0.25);border-radius:22px;padding:20px;cursor:pointer;transition:0.3s;"
                    onmouseover="this.style.borderColor='#f9ca24';this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.borderColor='rgba(249,202,36,0.25)';this.style.transform='translateY(0)'">
                    <div style="font-size:2rem;margin-bottom:8px;">🛡️</div>
                    <h3 style="color:#fff;font-size:1.05rem;font-weight:900;margin:0 0 5px;">Apologética SDA</h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;">${JOVENES_DATA.apologetica.length} preguntas difíciles — con respuestas bíblicas</p>
                </div>

                <!-- RETO DE MEMORIA -->
                <div onclick="renderRetoMemoria()" style="background:linear-gradient(135deg,rgba(116,75,162,0.2),rgba(102,126,234,0.1));border:1px solid rgba(116,75,162,0.4);border-radius:22px;padding:20px;cursor:pointer;transition:0.3s;"
                    onmouseover="this.style.borderColor='#764ba2';this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.borderColor='rgba(116,75,162,0.4)';this.style.transform='translateY(0)'">
                    <div style="font-size:2rem;margin-bottom:8px;">🧠</div>
                    <h3 style="color:#fff;font-size:1.05rem;font-weight:900;margin:0 0 5px;">Reto de Memoria</h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;">${JOVENES_DATA.retoMemoria.versiculo} — ¿Puedes ordenar las palabras?</p>
                </div>
            </div>
        </div>
    `;

    // 🔥 SINCRONIZACIÓN NUBE
    if (jovenState.cargandoNube) {
        cargarProgresoJovenes().then(prog => {
            jovenState.completado = prog;
            jovenState.cargandoNube = false;
            // Re-renderizar una vez cargado para mostrar los checks ✅
            renderModuloJovenes();
        });
    }
}

// ==========================================
// DEBATE DEL DÍA
// ==========================================
function renderDebateJovenes() {
    const d = JOVENES_DATA.debateDelDia;
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(160deg,#0f0c29,#1a1a4e,#302b63);font-family:'Segoe UI',sans-serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.3);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
                <button onclick="renderModuloJovenes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.82rem;font-weight:700;">← FORO</button>
                <span style="color:#a29bfe;font-weight:900;letter-spacing:2px;font-size:0.85rem;">⚡ DEBATE DEL DÍA</span>
                <div style="width:60px;"></div>
            </div>

            <div style="padding:25px 20px;max-width:680px;margin:0 auto;">
                <!-- PREGUNTA -->
                <div style="background:rgba(162,155,254,0.08);border:2px solid rgba(162,155,254,0.25);border-radius:24px;padding:25px;margin-bottom:20px;">
                    <div style="color:#a29bfe;font-size:0.72rem;letter-spacing:3px;margin-bottom:12px;">PREGUNTA DE HOY</div>
                    <h2 style="color:#fff;font-size:1.25rem;font-weight:900;margin:0 0 15px;line-height:1.4;">${d.tema}</h2>
                    <p style="color:rgba(255,255,255,0.6);font-size:0.88rem;margin:0;line-height:1.6;">${d.contexto}</p>
                </div>

                <!-- VERSÍCULO BASE -->
                <div style="background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.15);border-radius:18px;padding:16px 20px;margin-bottom:24px;">
                    <div style="color:gold;font-size:0.7rem;letter-spacing:2px;margin-bottom:8px;">📖 TEXTO BASE</div>
                    <p style="color:#fff;font-style:italic;margin:0 0 6px;font-size:0.9rem;">"${d.versiculo.texto}"</p>
                    <span style="color:rgba(255,255,255,0.4);font-size:0.78rem;">${d.versiculo.ref}</span>
                </div>

                <!-- POSICIONES -->
                <h3 style="color:rgba(255,255,255,0.5);font-size:0.78rem;letter-spacing:3px;margin:0 0 14px;">ELIGE TU POSICIÓN:</h3>
                <div style="display:grid;gap:12px;" id="debate-opciones">
                    ${d.posiciones.map(p => `
                        <div id="deb-${p.id}" onclick="votarDebate('${p.id}')"
                            style="background:rgba(255,255,255,0.04);border:2px solid rgba(255,255,255,0.1);border-radius:20px;padding:20px;cursor:pointer;transition:0.3s;"
                            onmouseover="if(!jovenState.debateVoto){this.style.borderColor='${p.color}';this.style.transform='translateX(4px)';}"
                            onmouseout="if(!jovenState.debateVoto){this.style.borderColor='rgba(255,255,255,0.1)';this.style.transform='translateX(0)';}">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                                <span style="font-size:1.5rem;">${p.icon}</span>
                                <span style="color:#fff;font-weight:900;font-size:1rem;">${p.label}</span>
                            </div>
                            <p style="color:rgba(255,255,255,0.55);font-size:0.83rem;margin:0;line-height:1.5;">${p.desc}</p>
                        </div>
                    `).join('')}
                </div>
                <div id="debate-resultado" style="display:none;margin-top:20px;"></div>
            </div>
        </div>
    `;

    // Restaurar voto previo si existe
    if (jovenState.debateVoto) mostrarVotoDebate(jovenState.debateVoto);
}

function votarDebate(id) {
    jovenState.debateVoto = id;
    jovenState.completado.debate = true;
    mostrarVotoDebate(id);

    // Sincronizar con Firebase
    guardarProgresoJovenes(jovenState.completado);
    guardarPuntajeFirebase('Jóvenes - Debate', 10, { voto: id });
}

function mostrarVotoDebate(id) {
    const d = JOVENES_DATA.debateDelDia;
    document.querySelectorAll('[id^="deb-"]').forEach(el => el.style.pointerEvents = 'none');
    const pos = d.posiciones.find(p => p.id === id);
    const elegido = document.getElementById(`deb-${id}`);
    if (elegido) { elegido.style.borderColor = pos.color; elegido.style.background = `${pos.color}18`; }

    const res = document.getElementById('debate-resultado');
    if (res) {
        res.style.display = 'block';
        res.innerHTML = `
            <div style="background:rgba(162,155,254,0.1);border:2px solid rgba(162,155,254,0.3);border-radius:20px;padding:22px;animation:fadeInUp 0.4s ease;">
                <div style="color:#a29bfe;font-size:0.72rem;letter-spacing:3px;margin-bottom:10px;">💜 PERSPECTIVA ADVENTISTA</div>
                <p style="color:#fff;font-size:0.92rem;line-height:1.6;margin:0 0 16px;">Desde la perspectiva Adventista: el sábado del séptimo día ES vigente. Es el <strong>cuarto mandamiento</strong> (Éx 20:8-11), instituido en el Edén (Gén 2:2-3), guardado por Jesús (Luc 4:16), y que seguirá en la nueva tierra (Is 66:23). La marca de la bestia (Ap 14:9) está relacionada con adorar en un día diferente al ordenado por Dios.</p>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button onclick="renderModuloJovenes()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;padding:12px 22px;border-radius:16px;cursor:pointer;font-weight:900;">← Volver al Foro</button>
                    <button onclick="renderDevocionalJovenes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:12px 22px;border-radius:16px;cursor:pointer;font-weight:700;">Devocional →</button>
                </div>
            </div>
        `;
    }
}

// ==========================================
// MAPA PROFÉTICO
// ==========================================
function renderMapaProfetico() {
    const container = document.getElementById("pantalla-estudio");
    const prof = JOVENES_DATA.profeciasDaniel;
    let idx = jovenState.profeciaIdx;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(160deg,#0f0c29,#1a0a2e,#24243e);font-family:'Segoe UI',sans-serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.4);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
                <button onclick="renderModuloJovenes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.82rem;">← FORO</button>
                <span style="color:#fd79a8;font-weight:900;letter-spacing:2px;font-size:0.85rem;">🗺️ MAPA PROFÉTICO</span>
                <span style="color:rgba(255,255,255,0.4);font-size:0.8rem;">${idx + 1}/${prof.length}</span>
            </div>

            <!-- TABS -->
            <div style="display:flex;gap:8px;padding:15px 20px;overflow-x:auto;">
                ${prof.map((p, i) => `
                    <button onclick="jovenState.profeciaIdx=${i};renderMapaProfetico();"
                        style="background:${i === idx ? `linear-gradient(135deg,${p.color},${p.color}aa)` : 'rgba(255,255,255,0.06)'};border:${i === idx ? 'none' : '1px solid rgba(255,255,255,0.1)'};color:${i === idx ? '#fff' : 'rgba(255,255,255,0.5)'};padding:8px 18px;border-radius:20px;cursor:pointer;font-size:0.8rem;font-weight:${i === idx ? '900' : '500'};white-space:nowrap;">
                        ${p.simbolo} ${p.capitulo}
                    </button>
                `).join('')}
            </div>

            <div style="padding:0 20px;max-width:680px;margin:0 auto;">
                <!-- IMAGEN -->
                <div style="border-radius:22px;overflow:hidden;margin-bottom:20px;box-shadow:0 15px 50px rgba(0,0,0,0.5);border:2px solid ${prof[idx].color}33;">
                    <img src="${prof[idx].imagen}" style="width:100%;height:220px;object-fit:cover;display:block;">
                </div>

                <!-- INFO PROFECÍA -->
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:22px;margin-bottom:16px;">
                    <div style="color:${prof[idx].color};font-size:0.72rem;letter-spacing:3px;margin-bottom:8px;">${prof[idx].capitulo}</div>
                    <h2 style="color:#fff;font-size:1.25rem;font-weight:900;margin:0 0 14px;">${prof[idx].simbolo} ${prof[idx].titulo}</h2>
                    <p style="color:rgba(255,255,255,0.7);font-size:0.88rem;line-height:1.7;margin:0;">${prof[idx].descripcion}</p>
                </div>

                <!-- CUMPLIMIENTO -->
                <div style="background:${prof[idx].color}10;border:1px solid ${prof[idx].color}33;border-left:4px solid ${prof[idx].color};border-radius:0 18px 18px 0;padding:18px 20px;margin-bottom:20px;">
                    <div style="color:${prof[idx].color};font-size:0.7rem;letter-spacing:3px;margin-bottom:8px;">📅 CUMPLIMIENTO HISTÓRICO</div>
                    <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin:0;line-height:1.6;">${prof[idx].cumplimiento}</p>
                </div>

                <!-- NAVEGACIÓN -->
                <div style="display:flex;gap:12px;">
                    ${idx > 0 ? `<button onclick="jovenState.profeciaIdx--;renderMapaProfetico();" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:14px;border-radius:16px;cursor:pointer;flex:1;">← Anterior</button>` : '<div style="flex:1"></div>'}
                    ${idx < prof.length - 1 ? `<button onclick="jovenState.profeciaIdx++;renderMapaProfetico();" style="background:linear-gradient(135deg,${prof[idx].color},${prof[idx].color}aa);border:none;color:#fff;padding:14px;border-radius:16px;cursor:pointer;font-weight:900;flex:1;">Siguiente →</button>` : `<button onclick="renderModuloJovenes();" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;padding:14px;border-radius:16px;cursor:pointer;font-weight:900;flex:1;">🏠 Volver al Foro</button>`}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// DEVOCIONAL EXPRESS
// ==========================================
function renderDevocionalJovenes() {
    const dev = JOVENES_DATA.devocionalExpress;
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(160deg,#00b09b,#096c4e,#0f0c29);font-family:'Segoe UI',sans-serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.3);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);">
                <button onclick="renderModuloJovenes()" style="background:rgba(255,255,255,0.1);border:none;color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.82rem;">← FORO</button>
                <span style="color:#55efc4;font-weight:900;letter-spacing:2px;font-size:0.82rem;">📖 DEVOCIONAL EXPRESS</span>
                <div style="background:#55efc433;border:1px solid #55efc4;border-radius:15px;padding:4px 12px;color:#55efc4;font-size:0.75rem;font-weight:900;">5 MIN</div>
            </div>

            <div style="padding:20px;max-width:680px;margin:0 auto;">
                <h2 style="color:#fff;font-size:1.3rem;font-weight:900;margin:0 0 6px;">${dev.titulo}</h2>
                <p style="color:rgba(255,255,255,0.5);font-size:0.85rem;margin:0 0 20px;">Pasaje: ${dev.pasaje}</p>

                <!-- VERSÍCULOS -->
                <div style="background:rgba(255,255,255,0.06);border-radius:22px;padding:22px;margin-bottom:18px;">
                    ${dev.versos.map(v => `
                        <div style="display:flex;gap:12px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06);">
                            <span style="background:#55efc4;color:#000;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.8rem;flex-shrink:0;">${v.v}</span>
                            <p style="color:rgba(255,255,255,0.85);font-size:0.9rem;margin:0;line-height:1.6;font-style:italic;">"${v.texto}"</p>
                        </div>
                    `).join('')}
                </div>

                <!-- REFLEXIÓN -->
                <div style="background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);border-radius:18px;padding:20px;margin-bottom:18px;">
                    <div style="color:#55efc4;font-size:0.72rem;letter-spacing:3px;margin-bottom:10px;">💡 REFLEXIÓN ADVENTISTA</div>
                    <p style="color:#fff;font-size:0.9rem;line-height:1.7;margin:0;">${dev.reflexion}</p>
                </div>

                <!-- MISIÓN -->
                <div style="background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:18px;padding:18px;margin-bottom:20px;">
                    <div style="color:gold;font-size:0.72rem;letter-spacing:3px;margin-bottom:8px;">⚡ MISIÓN DE LA SEMANA</div>
                    <p style="color:rgba(255,255,255,0.85);font-size:0.88rem;margin:0;">${dev.mision}</p>
                </div>

                <!-- BOTÓN COMPLETADO -->
                <button onclick="jovenState.completado.devocional=true; guardarProgresoJovenes(jovenState.completado); guardarPuntajeFirebase('Jóvenes - Devocional', 15); renderModuloJovenes();"
                    style="background:linear-gradient(135deg,#00b894,#55efc4);color:#000;border:none;padding:16px;border-radius:20px;cursor:pointer;font-weight:900;font-size:1rem;width:100%;letter-spacing:1px;">
                    ✅ DEVOCIONAL COMPLETADO
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// APOLOGÉTICA SDA
// ==========================================
function renderApologetica(idx) {
    jovenState.apologeticaIdx = idx;
    const a = JOVENES_DATA.apologetica;
    const item = a[idx];
    const container = document.getElementById("pantalla-estudio");
    let mostrado = false;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(160deg,#1a0533,#2d1b69,#0f0c29);font-family:'Segoe UI',sans-serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.3);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
                <button onclick="renderModuloJovenes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.82rem;">← FORO</button>
                <span style="color:#f9ca24;font-weight:900;letter-spacing:2px;font-size:0.82rem;">🛡️ APOLOGÉTICA SDA</span>
                <span style="color:rgba(255,255,255,0.4);font-size:0.8rem;">${idx + 1}/${a.length}</span>
            </div>

            <div style="padding:20px;max-width:680px;margin:0 auto;">
                <!-- DOTS NAVEGACIÓN -->
                <div style="display:flex;justify-content:center;gap:8px;margin-bottom:24px;">
                    ${a.map((_, i) => `<div style="width:${i === idx ? '24' : '8'}px;height:8px;border-radius:20px;background:${i === idx ? item.color : 'rgba(255,255,255,0.15)'};transition:0.3s;cursor:pointer;" onclick="renderApologetica(${i})"></div>`).join('')}
                </div>

                <!-- PREGUNTA -->
                <div style="background:rgba(249,202,36,0.08);border:2px solid rgba(249,202,36,0.2);border-radius:22px;padding:25px;margin-bottom:20px;">
                    <div style="color:#f9ca24;font-size:0.72rem;letter-spacing:3px;margin-bottom:12px;">❓ PREGUNTA DIFÍCIL</div>
                    <h2 style="color:#fff;font-size:1.15rem;font-weight:900;margin:0;line-height:1.4;">${item.pregunta}</h2>
                </div>

                <!-- RESPUESTA (Revelar) -->
                <div id="apolo-respuesta-btn">
                    <button onclick="document.getElementById('apolo-respuesta-btn').style.display='none';document.getElementById('apolo-respuesta').style.display='block';"
                        style="background:linear-gradient(135deg,${item.color},${item.color}88);border:none;color:#fff;padding:16px;border-radius:20px;cursor:pointer;font-weight:900;font-size:0.95rem;width:100%;margin-bottom:16px;">
                        🛡️ Ver Respuesta Bíblica
                    </button>
                </div>

                <div id="apolo-respuesta" style="display:none;animation:fadeIn 0.4s ease;">
                    <div style="background:${item.color}10;border:2px solid ${item.color}33;border-radius:22px;padding:22px;margin-bottom:16px;">
                        <div style="color:${item.color};font-size:0.72rem;letter-spacing:3px;margin-bottom:12px;">📖 RESPUESTA CLAVE</div>
                        <p style="color:#fff;font-size:0.92rem;line-height:1.7;margin:0;">${item.respuesta}</p>
                    </div>

                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:16px;margin-bottom:20px;">
                        <div style="color:rgba(255,255,255,0.4);font-size:0.7rem;letter-spacing:2px;margin-bottom:10px;">📚 TEXTOS CLAVE:</div>
                        <div style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${item.versiculos.map(v => `<span style="background:${item.color}22;border:1px solid ${item.color}44;color:${item.color};padding:4px 12px;border-radius:12px;font-size:0.78rem;font-weight:700;">${v}</span>`).join('')}
                        </div>
                    </div>

                    <div style="display:flex;gap:10px;">
                        ${idx < a.length - 1 ? `<button onclick="renderApologetica(${idx + 1})" style="background:linear-gradient(135deg,${item.color},${item.color}aa);border:none;color:#fff;padding:14px;border-radius:16px;cursor:pointer;font-weight:900;flex:1;">Siguiente pregunta →</button>` :
            `<button onclick="jovenState.completado.apolo=true; guardarProgresoJovenes(jovenState.completado); guardarPuntajeFirebase('Jóvenes - Apologética', 20); renderModuloJovenes();" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;padding:14px;border-radius:16px;cursor:pointer;font-weight:900;flex:1;">✅ Sección Completada</button>`}
                    </div>
                </div>
            </div>
        </div>
        <style>@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}</style>
    `;
}

// ==========================================
// RETO DE MEMORIA
// ==========================================
function renderRetoMemoria() {
    const reto = JOVENES_DATA.retoMemoria;
    const container = document.getElementById("pantalla-estudio");
    const palabras = [...reto.palabras];
    const mezcladas = [...palabras].sort(() => Math.random() - 0.5);
    let seleccionadas = [];

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(160deg,#0f0c29,#302b63,#1a1a4e);font-family:'Segoe UI',sans-serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.3);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
                <button onclick="renderModuloJovenes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.82rem;">← FORO</button>
                <span style="color:#a29bfe;font-weight:900;letter-spacing:2px;font-size:0.82rem;">🧠 RETO DE MEMORIA</span>
                <div style="width:60px;"></div>
            </div>

            <div style="padding:20px;max-width:680px;margin:0 auto;">
                <h2 style="color:#fff;font-size:1.2rem;font-weight:900;margin:0 0 6px;text-align:center;">${reto.versiculo}</h2>
                <p style="color:rgba(255,255,255,0.4);font-size:0.82rem;text-align:center;margin:0 0 20px;">Ordena las palabras del versículo</p>

                <!-- ÁREA DE RESPUESTA -->
                <div id="mem-area" style="min-height:80px;background:rgba(162,155,254,0.06);border:2px dashed rgba(162,155,254,0.25);border-radius:20px;padding:16px;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;align-items:flex-start;align-content:flex-start;">
                    <p id="mem-placeholder" style="color:rgba(255,255,255,0.2);font-size:0.85rem;margin:0;width:100%;text-align:center;">Toca las palabras para ordenarlas aquí...</p>
                </div>

                <!-- PALABRAS MEZCLADAS -->
                <div id="mem-palabras" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                    ${mezcladas.map((p, i) => `
                        <button id="mpal-${i}" onclick="seleccionarPalabra('${p}', ${i})"
                            data-palabra="${p}" data-idx="${i}"
                            style="background:rgba(162,155,254,0.15);border:1px solid rgba(162,155,254,0.3);color:#fff;padding:8px 14px;border-radius:12px;cursor:pointer;font-size:0.88rem;font-weight:600;transition:0.2s;"
                            onmouseover="this.style.background='rgba(162,155,254,0.3)'"
                            onmouseout="this.style.background='rgba(162,155,254,0.15)'">${p}</button>
                    `).join('')}
                </div>

                <!-- BOTONES ACCIÓN -->
                <div style="display:flex;gap:10px;">
                    <button onclick="renderRetoMemoria()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);padding:14px;border-radius:16px;cursor:pointer;font-size:0.85rem;flex:1;">🔄 Reiniciar</button>
                    <button onclick="verificarMemoria(${JSON.stringify(palabras)})" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;padding:14px;border-radius:16px;cursor:pointer;font-weight:900;flex:2;">✓ Verificar</button>
                </div>
                <div id="mem-resultado" style="margin-top:16px;"></div>
            </div>
        </div>
    `;

    window._memSeleccionadas = [];
    window.seleccionarPalabra = function (palabra, idx) {
        const btn = document.getElementById(`mpal-${idx}`);
        const area = document.getElementById('mem-area');
        const ph = document.getElementById('mem-placeholder');

        if (btn.style.opacity === '0.3') return;
        btn.style.opacity = '0.3';
        btn.style.pointerEvents = 'none';
        window._memSeleccionadas.push({ palabra, idx });

        if (ph) ph.style.display = 'none';

        const chip = document.createElement('div');
        chip.style.cssText = `background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:#fff;padding:8px 14px;border-radius:12px;font-size:0.85rem;font-weight:700;cursor:pointer;animation:fadeIn 0.2s ease;`;
        chip.innerText = palabra;
        chip.onclick = function () {
            const entry = window._memSeleccionadas.find(e => e.idx === idx);
            if (entry) {
                window._memSeleccionadas = window._memSeleccionadas.filter(e => e.idx !== idx);
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                chip.remove();
                if (window._memSeleccionadas.length === 0 && ph) ph.style.display = 'block';
            }
        };
        area.appendChild(chip);
    };
}

function verificarMemoria(correctas) {
    const mis = window._memSeleccionadas.map(e => e.palabra);
    const esCorrecta = mis.join(' ') === correctas.join(' ');
    const res = document.getElementById('mem-resultado');
    if (esCorrecta) {
        jovenState.completado.memoria = true;
        // Guardar progreso y puntaje
        guardarProgresoJovenes(jovenState.completado);
        guardarPuntajeFirebase('Jóvenes - Memoria', 50);

        res.innerHTML = `<div style="text-align:center;background:rgba(85,239,196,0.1);border:2px solid #55efc4;border-radius:20px;padding:20px;animation:fadeIn 0.4s ease;"><div style="font-size:3rem;margin-bottom:8px;">🎉</div><h3 style="color:#55efc4;font-weight:900;margin:0 0 8px;">¡Perfecto! ¡Memorizado!</h3><p style="color:rgba(255,255,255,0.7);margin:0 0 16px;">¡Tienes el versículo de Apocalipsis 14:12 en tu corazón!</p><button onclick="renderModuloJovenes()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;padding:14px 28px;border-radius:16px;cursor:pointer;font-weight:900;">← Volver al Foro ✓</button></div>`;
    } else {
        res.innerHTML = `<div style="text-align:center;background:rgba(255,107,107,0.1);border:2px solid #ff6b6b;border-radius:20px;padding:18px;animation:fadeIn 0.4s ease;"><div style="font-size:2rem;">😅</div><p style="color:#ff6b6b;font-weight:700;margin:8px 0 4px;">No es exactamente igual. Correcto sería:</p><p style="color:rgba(255,255,255,0.8);font-size:0.85rem;font-style:italic;margin:0 0 12px;">"${correctas.join(' ')}"</p><button onclick="renderRetoMemoria()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:10px 20px;border-radius:14px;cursor:pointer;">🔄 Intentar de nuevo</button></div>`;
    }
}
