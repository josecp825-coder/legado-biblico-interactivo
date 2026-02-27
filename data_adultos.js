// ==========================================
// 📜 MÓDULO ADULTOS — SEMINARIO DIGITAL SDA
// Filosofía Adventista del Séptimo Día
// ==========================================

const ADULTOS_DATA = {
    estudioDelDia: {
        pasaje: "Hebreos 8:1-6",
        titulo: "El Sumo Sacerdote en el Santuario Celestial",
        subtitulo: "La Gran Controversia — Capítulo Doctrinal",
        versos: [
            { v: 1, heb: "archiereus", gr: "ἀρχιερεύς", texto: "Ahora bien, el punto principal de lo que venimos diciendo es este: tenemos tal sumo sacerdote, el cual se sentó a la diestra del trono de la Majestad en los cielos," },
            { v: 2, heb: "leitourgos", gr: "λειτουργός", texto: "ministro del santuario, y de aquel verdadero tabernáculo que levantó el Señor, y no el hombre." },
            { v: 4, heb: "", gr: "", texto: "Así que, si estuviese sobre la tierra, ni siquiera sería sacerdote, habiendo aún sacerdotes que presentan las ofrendas según la ley;" },
            { v: 5, heb: "hypodeigma", gr: "ὑπόδειγμα", texto: "los cuales sirven a lo que es figura y sombra de las cosas celestiales, como se le advirtió a Moisés cuando iba a erigir el tabernáculo..." },
            { v: 6, heb: "diatheke", gr: "διαθήκη", texto: "Pero ahora tanto mejor ministerio es el suyo, cuanto es mediador de un mejor pacto, establecido sobre mejores promesas." }
        ],
        exegesis: {
            contexto: "El Libro de Hebreos fue escrito circa 60-70 d.C. a creyentes judíos en riesgo de apostasía. El autor establece la superioridad del sacerdocio de Cristo sobre el levítico mediante una tipología directa del santuario mosaico.",
            palabrasClave: [
                { palabra: "ἀρχιερεύς (archiereús)", significado: "Sumo Sacerdote — título reservado para el oficio más alto del sacerdocio levítico. Solo uno podía entrar al Lugar Santísimo: el día del Gran Día de Expiación (Yom Kipur)." },
                { palabra: "λειτουργός (leitourgós)", significado: "Ministro/Servidor oficial. Término griego de donde deriva 'liturgia'. Implica un ministerio continuo y oficial, no esporádico." },
                { palabra: "ὑπόδειγμα (hypódeigma)", significado: "Copia, modelo, ejemplo. El santuario terrenal era una COPIA del celestial (ver Éx 25:40). La teología del santuario SDA descansa en esta palabra." },
                { palabra: "διαθήκη (diathéke)", significado: "Pacto/Testamento. El 'mejor pacto' es el Nuevo Pacto en la sangre de Cristo, con la ley escrita en el corazón (Jer 31:31-34)." }
            ],
            estructuraSantuario: [
                { lugar: "Atrio", objeto: "Altar de holocausto / Fuente", representacion: "La cruz — lugar de expiación por el pecado", ref: "Lev 1 / Éx 30:18" },
                { lugar: "Lugar Santo", objeto: "Candelabro / Mesa / Altar de incienso", representacion: "Ministerio de intercesión de Cristo (27 d.C. — 1844 d.C.)", ref: "Heb 7:25" },
                { lugar: "Lugar Santísimo", objeto: "Arca del Pacto / Ley de Dios", representacion: "Juicio Investigador — iniciado en 1844 d.C. (Dan 8:14)", ref: "Dan 8:14" }
            ]
        },
        comentarioSDA: "El Santuario Celestial es el fundamento de la doctrina adventista más distintiva: el Juicio Investigador (o Pre-Adviento). Basado en Daniel 8:14 ('Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado'), los adventistas identifican 1844 d.C. como el inicio de la fase final del ministerio sacerdotal de Cristo. Este no es un juicio condenatorio, sino el examen de los registros del cielo antes de la Segunda Venida — la vindicación del carácter de Dios en la Gran Controversia.",
        ellenGWhite: {
            cita: "Cristo es el mediador del nuevo pacto... el Señor Jesucristo intercede por nosotros como nuestro Sumo Sacerdote en el santuario celestial. Él presenta a Dios los méritos de su sangre expiatoria.",
            obra: "El Conflicto de los Siglos, pág. 415",
            imagen: "egw_portrait_adventista_1772170430747.png"
        },
        traducciones: [
            { sigla: "RV1960", texto: "Ahora bien, el punto principal de lo que venimos diciendo es este: tenemos tal sumo sacerdote, el cual se sentó a la diestra del trono de la Majestad en los cielos," },
            { sigla: "NVI", texto: "Ahora bien, el punto principal de lo que estamos diciendo es este: tenemos un sumo sacerdote que se sentó a la derecha del trono de la Majestad en el cielo," },
            { sigla: "DHH", texto: "Lo más importante de todo lo que estamos diciendo es que tenemos un sumo sacerdote que está sentado a la derecha del trono de Dios, el soberano supremo, en el cielo." }
        ]
    },

    doctrinas28: [
        { num: 1, titulo: "La Sagrada Escritura", icono: "📖", resumen: "La Biblia, compuesta de 66 libros, es la infalible revelación de la voluntad de Dios. Norma suprema de fe y práctica.", ref: "2 Tim 3:16-17" },
        { num: 4, titulo: "La Ley de Dios", icono: "📜", resumen: "Los preceptos del Decálogo reflejan el carácter de Dios. El cuarto mandamiento establece el sábado del séptimo día como conmemoración de la creación.", ref: "Éx 20:1-17; Mat 5:17" },
        { num: 7, titulo: "La Naturaleza del Hombre", icono: "🧬", resumen: "El ser humano es una unidad indivisible. La muerte es un estado de inconciencia hasta la resurrección. No existe el alma inmortal separada del cuerpo.", ref: "Gén 2:7; Ecl 9:5" },
        { num: 14, titulo: "Unidad en el Cuerpo de Cristo", icono: "🤝", resumen: "La iglesia es un cuerpo unido. En Cristo no hay distinción de etnia, cultura o género. Todos son uno en Cristo Jesús.", ref: "Gál 3:27-29" },
        { num: 18, titulo: "El Don de la Profecía", icono: "🔮", resumen: "El don de profecía caracteriza la iglesia remanente. Elena G. de White ejerció este don y sus escritos son autoridad normativa, aunque subordinada a la Biblia.", ref: "Ap 12:17; 19:10" },
        { num: 20, titulo: "El Sábado", icono: "🌅", resumen: "El Creador instituyó el sábado del séptimo día (sábado) como símbolo perpetuo de su obra creadora y redentora. Su fidelidad es una señal de nuestra santificación.", ref: "Gén 2:1-3; Éx 20:8-11" },
        { num: 24, titulo: "El Ministerio de Cristo en el Santuario", icono: "🏛️", resumen: "Desde la Ascensión, Cristo ministra como Sumo Sacerdote en el santuario celestial. En 1844 comenzó el Juicio Pre-Adviento — la segunda fase de su ministerio.", ref: "Dan 8:14; Heb 8:1-5" },
        { num: 28, titulo: "La Nueva Tierra", icono: "🌍", resumen: "En la Nueva Tierra, el universo entero quedará libre del pecado. El shabbat eterno del cielo es la culminación de todas las cosas. Dios morará con su pueblo para siempre.", ref: "Is 66:22-23; Ap 21:1-5" }
    ],

    notasPersonales: [],

    planEstudio: [
        { semana: 1, tema: "El Santuario — Tipología y Antitipo", textos: ["Éx 25-27", "Lev 16", "Heb 8-10"] },
        { semana: 2, tema: "Daniel 8 y las 2,300 tardes", textos: ["Dan 8:14", "Dan 9:24-27", "Esd 7:7-26"] },
        { semana: 3, tema: "El Juicio Investigador — ¿Bíblico?", textos: ["Dan 7:9-14", "Ap 14:6-7", "1 Pe 4:17"] },
        { semana: 4, tema: "La Nueva Tierra y el Sábado Eterno", textos: ["Is 66:22-23", "Ap 21-22", "Gén 2:1-3"] }
    ]
};

// --- ESTADO MÓDULO ADULTOS ---
let adultosState = {
    seccion: "hub",
    tabExeg: "texto",
    doctrinaIdx: 0,
    notaTexto: "",
    planSemana: 0,
    cargandoNube: true,
    notas: []
};

// ==========================================
// HUB PRINCIPAL ADULTOS
// ==========================================
function renderModuloAdultos() {
    const container = document.getElementById("pantalla-estudio");
    const est = ADULTOS_DATA.estudioDelDia;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#1a0a00,#2d1a00,#1a1200);font-family:'Georgia',serif;padding-bottom:50px;">

            <!-- HEADER ELEGANTE -->
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);border-bottom:1px solid rgba(212,175,55,0.2);padding:16px 22px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;">
                <button onclick="window.location.reload()" style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Georgia',serif;letter-spacing:1px;">← INICIO</button>
                <div style="text-align:center;">
                    <div style="color:rgba(212,175,55,0.6);font-size:0.65rem;letter-spacing:4px;font-family:'Segoe UI',sans-serif;">LEGADO BÍBLICO</div>
                    <div style="color:#d4af37;font-weight:700;font-size:0.9rem;letter-spacing:2px;">SEMINARIO DIGITAL SDA</div>
                </div>
                <div style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:6px;padding:6px 12px;color:#d4af37;font-size:0.78rem;font-family:'Segoe UI',sans-serif;">📜 Nivel: Avanzado</div>
            </div>

            <!-- HERO BANNER -->
            <div style="position:relative;margin:20px;border-radius:12px;overflow:hidden;box-shadow:0 25px 80px rgba(0,0,0,0.8);border:1px solid rgba(212,175,55,0.2);">
                <img src="adultos_seminario_hero_1772170415343.png" style="width:100%;height:260px;object-fit:cover;object-position:center;display:block;">
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(26,10,0,0.97) 0%,rgba(26,10,0,0.5) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:28px;">
                    <div style="color:rgba(212,175,55,0.7);font-size:0.65rem;letter-spacing:5px;margin-bottom:8px;font-family:'Segoe UI',sans-serif;">ESTUDIO DEL DÍA</div>
                    <h1 style="color:#fff;font-size:1.6rem;font-weight:700;margin:0 0 6px;line-height:1.3;">${est.titulo}</h1>
                    <p style="color:rgba(255,255,255,0.55);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">${est.pasaje} — ${est.subtitulo}</p>
                </div>
            </div>

            <!-- MENÚ SECCIONES -->
            <div style="padding:0 20px;display:grid;gap:12px;">

                <!-- ESTUDIO EXEGÉTICO -->
                <div onclick="renderExegesisAdultos()" style="background:linear-gradient(135deg,rgba(212,175,55,0.08),rgba(180,130,20,0.04));border:1px solid rgba(212,175,55,0.2);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(212,175,55,0.5)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(212,175,55,0.2)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">🏛️</div>
                    <div style="flex:1;">
                        <h3 style="color:#d4af37;font-size:1rem;margin:0 0 4px;letter-spacing:1px;">Estudio Exegético</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Hebreos 8 — Análisis griego, contexto y estructura del Santuario</p>
                    </div>
                    <div style="color:rgba(212,175,55,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- COMENTARIO SDA -->
                <div onclick="renderComentarioSDA()" style="background:linear-gradient(135deg,rgba(139,90,43,0.15),rgba(100,60,20,0.08));border:1px solid rgba(139,90,43,0.3);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(139,90,43,0.6)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(139,90,43,0.3)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">📖</div>
                    <div style="flex:1;">
                        <h3 style="color:#cd853f;font-size:1rem;margin:0 0 4px;">Comentario Bíblico SDA</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Perspectiva adventista + Cita de Elena G. de White</p>
                    </div>
                    <div style="color:rgba(205,133,63,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- 28 DOCTRINAS -->
                <div onclick="renderDoctrinas28()" style="background:linear-gradient(135deg,rgba(70,50,120,0.15),rgba(50,30,90,0.08));border:1px solid rgba(100,80,160,0.3);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(150,120,210,0.6)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(100,80,160,0.3)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">📋</div>
                    <div style="flex:1;">
                        <h3 style="color:#a29bfe;font-size:1rem;margin:0 0 4px;">28 Doctrinas Fundamentales</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Referencia rápida de las creencias adventistas esenciales</p>
                    </div>
                    <div style="color:rgba(162,155,254,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- TRADUCCIONES -->
                <div onclick="renderTraduccionesAdultos()" style="background:linear-gradient(135deg,rgba(0,140,130,0.12),rgba(0,100,95,0.06));border:1px solid rgba(0,180,165,0.25);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(0,206,201,0.5)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(0,180,165,0.25)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">🔄</div>
                    <div style="flex:1;">
                        <h3 style="color:#00cec9;font-size:1rem;margin:0 0 4px;">Traducciones en Paralelo</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">RV1960 · NVI · DHH — Versículo a versículo</p>
                    </div>
                    <div style="color:rgba(0,206,201,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- NOTAS PERSONALES -->
                <div onclick="renderNotasAdultos()" style="background:liner-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(255,255,255,0.25)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(255,255,255,0.1)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">✏️</div>
                    <div style="flex:1;">
                        <h3 style="color:rgba(255,255,255,0.8);font-size:1rem;margin:0 0 4px;">Notas Personales</h3>
                        <p style="color:rgba(255,255,255,0.35);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Tu bloc de estudio — guardado permanentemente en tu dispositivo</p>
                    </div>
                    <div style="color:rgba(255,255,255,0.3);font-size:1.3rem;">›</div>
                </div>

                <!-- PLAN DE ESTUDIO -->
                <div onclick="renderPlanEstudio()" style="background:linear-gradient(135deg,rgba(255,100,50,0.1),rgba(200,60,20,0.05));border:1px solid rgba(255,120,50,0.25);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(255,150,80,0.5)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(255,120,50,0.25)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">📅</div>
                    <div style="flex:1;">
                        <h3 style="color:#fd9644;font-size:1rem;margin:0 0 4px;">Plan de Estudio — 4 Semanas</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">El Santuario — Daniel 8 — Juicio Investigador — Nueva Tierra</p>
                    </div>
                    <div style="color:rgba(253,150,68,0.6);font-size:1.3rem;">›</div>
                </div>
            </div>
        </div>
    `;

    // 🔥 SINCRONIZACIÓN NUBE
    if (adultosState.cargandoNube) {
        cargarNotasFirebase().then(notas => {
            adultosState.notas = notas;
            adultosState.cargandoNube = false;
        });
    }
}

// ==========================================
// EXÉGESIS
// ==========================================
function renderExegesisAdultos() {
    const est = ADULTOS_DATA.estudioDelDia;
    const container = document.getElementById("pantalla-estudio");
    let tab = adultosState.tabExeg;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0800,#1e1200,#120d00);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(212,175,55,0.15);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);color:#d4af37;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#d4af37;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">🏛️ ESTUDIO EXEGÉTICO</span>
                <div style="width:80px;"></div>
            </div>

            <!-- TABS -->
            <div style="display:flex;border-bottom:1px solid rgba(212,175,55,0.12);background:rgba(0,0,0,0.3);">
                ${[
            { id: "texto", label: "Texto" },
            { id: "palabras", label: "Palabras Clave" },
            { id: "santuario", label: "Estructura" }
        ].map(t => `
                    <button onclick="adultosState.tabExeg='${t.id}';renderExegesisAdultos();"
                        style="flex:1;padding:14px;font-size:0.8rem;font-family:'Segoe UI',sans-serif;font-weight:${tab === t.id ? '700' : '400'};
                        color:${tab === t.id ? '#d4af37' : 'rgba(255,255,255,0.4)'};background:transparent;border:none;
                        border-bottom:${tab === t.id ? '2px solid #d4af37' : '2px solid transparent'};cursor:pointer;letter-spacing:1px;">
                        ${t.label}
                    </button>
                `).join('')}
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                ${tab === 'texto' ? `
                    <div style="background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.15);border-radius:10px;padding:22px;margin-bottom:16px;">
                        <div style="color:rgba(212,175,55,0.6);font-size:0.68rem;letter-spacing:4px;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">${est.pasaje} — REINA-VALERA 1960</div>
                        ${est.versos.map(v => `
                            <div style="display:flex;gap:14px;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid rgba(212,175,55,0.08);">
                                <span style="background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.3);color:#d4af37;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.82rem;font-weight:700;flex-shrink:0;font-family:'Segoe UI',sans-serif;">${v.v}</span>
                                <div>
                                    <p style="color:rgba(255,255,255,0.9);font-size:0.95rem;margin:0 0 6px;line-height:1.7;font-style:italic;">${v.texto}</p>
                                    ${v.gr ? `<span style="background:rgba(162,155,254,0.12);border:1px solid rgba(162,155,254,0.2);color:#a29bfe;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-family:'Segoe UI',sans-serif;cursor:pointer;" onclick="renderExegesisAdultos()">${v.gr} · ${v.heb}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="background:rgba(255,255,255,0.03);border-left:3px solid #d4af37;padding:18px 20px;border-radius:0 8px 8px 0;">
                        <div style="color:#d4af37;font-size:0.68rem;letter-spacing:3px;margin-bottom:10px;font-family:'Segoe UI',sans-serif;">📚 CONTEXTO HISTÓRICO</div>
                        <p style="color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.75;margin:0;">${est.exegesis.contexto}</p>
                    </div>
                ` : ''}

                ${tab === 'palabras' ? `
                    <div style="display:grid;gap:14px;">
                        ${est.exegesis.palabrasClave.map(p => `
                            <div style="background:rgba(162,155,254,0.06);border:1px solid rgba(162,155,254,0.15);border-radius:10px;padding:20px;">
                                <div style="color:#a29bfe;font-size:0.9rem;font-weight:700;margin-bottom:8px;font-family:'Courier New',monospace;">${p.palabra}</div>
                                <p style="color:rgba(255,255,255,0.75);font-size:0.85rem;line-height:1.7;margin:0;font-family:'Segoe UI',sans-serif;">${p.significado}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${tab === 'santuario' ? `
                    <div style="margin-bottom:16px;">
                        <h3 style="color:#d4af37;font-size:0.9rem;letter-spacing:2px;margin:0 0 16px;font-family:'Segoe UI',sans-serif;">ESTRUCTURA DEL SANTUARIO — TIPOLOGÍA</h3>
                        ${est.exegesis.estructuraSantuario.map((s, i) => `
                            <div style="background:${['rgba(255,107,107,0.08)', 'rgba(249,202,36,0.08)', 'rgba(85,239,196,0.08)'][i]};border:1px solid ${['rgba(255,107,107,0.2)', 'rgba(249,202,36,0.2)', 'rgba(85,239,196,0.2)'][i]};border-radius:10px;padding:18px;margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;">
                                <div style="background:${['#ff6b6b', '#f9ca24', '#55efc4'][i]};color:#000;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.75rem;flex-shrink:0;font-family:'Segoe UI',sans-serif;">${i + 1}</div>
                                <div>
                                    <h4 style="color:${['#ff6b6b', '#f9ca24', '#55efc4'][i]};font-size:0.92rem;margin:0 0 4px;">${s.lugar}</h4>
                                    <p style="color:rgba(255,255,255,0.6);font-size:0.78rem;margin:0 0 6px;font-family:'Segoe UI',sans-serif;">${s.objeto}</p>
                                    <p style="color:rgba(255,255,255,0.85);font-size:0.85rem;margin:0 0 6px;line-height:1.5;font-family:'Segoe UI',sans-serif;">${s.representacion}</p>
                                    <span style="color:rgba(255,255,255,0.35);font-size:0.72rem;font-family:'Segoe UI',sans-serif;">${s.ref}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <button onclick="renderModuloAdultos()" style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);color:#d4af37;padding:12px;border-radius:8px;cursor:pointer;width:100%;font-family:'Georgia',serif;letter-spacing:1px;margin-top:8px;">← Volver al Seminario</button>
            </div>
        </div>
    `;
}

// ==========================================
// COMENTARIO SDA + ELENA G. WHITE
// ==========================================
function renderComentarioSDA() {
    const est = ADULTOS_DATA.estudioDelDia;
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0800,#1a1000,#0a0800);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(139,90,43,0.3);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(139,90,43,0.1);border:1px solid rgba(139,90,43,0.3);color:#cd853f;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#cd853f;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">📖 COMENTARIO SDA</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <!-- COMENTARIO PRINCIPAL -->
                <div style="background:rgba(139,90,43,0.08);border:1px solid rgba(139,90,43,0.2);border-radius:12px;padding:24px;margin-bottom:20px;">
                    <div style="color:#cd853f;font-size:0.68rem;letter-spacing:4px;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">COMENTARIO BÍBLICO ADVENTISTA — ${est.pasaje}</div>
                    <p style="color:rgba(255,255,255,0.88);font-size:0.94rem;line-height:1.85;margin:0;">${est.comentarioSDA}</p>
                </div>

                <!-- ELENA G. WHITE -->
                <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(212,175,55,0.2);border-radius:12px;overflow:hidden;margin-bottom:20px;">
                    <div style="display:flex;align-items:center;gap:0;">
                        <div style="flex:1;padding:24px;">
                            <div style="color:rgba(212,175,55,0.7);font-size:0.65rem;letter-spacing:4px;margin-bottom:12px;font-family:'Segoe UI',sans-serif;">✨ ELENA G. DE WHITE</div>
                            <p style="color:rgba(255,255,255,0.85);font-size:0.9rem;font-style:italic;line-height:1.75;margin:0 0 14px;">"${est.ellenGWhite.cita}"</p>
                            <span style="color:rgba(212,175,55,0.6);font-size:0.78rem;font-family:'Segoe UI',sans-serif;">— ${est.ellenGWhite.obra}</span>
                        </div>
                        <div style="width:130px;flex-shrink:0;height:200px;overflow:hidden;">
                            <img src="${est.ellenGWhite.imagen}" style="width:100%;height:100%;object-fit:cover;object-position:top;">
                        </div>
                    </div>
                </div>

                <!-- TEXTOS CONEXOS -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;">
                    <div style="color:rgba(255,255,255,0.4);font-size:0.68rem;letter-spacing:3px;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">📚 TEXTOS CONEXOS DE ESTUDIO</div>
                    <div style="display:flex;flex-wrap:wrap;gap:10px;">
                        ${["Daniel 8:14", "Hebreos 9:24-28", "Levítico 16", "Apocalipsis 11:19", "1 Juan 2:1"].map(t => `
                            <span style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.2);color:#d4af37;padding:6px 14px;border-radius:4px;font-size:0.8rem;font-family:'Segoe UI',sans-serif;cursor:pointer;">${t}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 28 DOCTRINAS
// ==========================================
function renderDoctrinas28() {
    const container = document.getElementById("pantalla-estudio");
    const docs = ADULTOS_DATA.doctrinas28;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#130f2e,#0d0a22);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(162,155,254,0.15);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(162,155,254,0.08);border:1px solid rgba(162,155,254,0.2);color:#a29bfe;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#a29bfe;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">📋 28 DOCTRINAS</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;margin:0 0 20px;font-family:'Segoe UI',sans-serif;text-align:center;">Creencias Fundamentales de la Iglesia Adventista del Séptimo Día — Selección temática</p>
                <div style="display:grid;gap:12px;">
                    ${docs.map(d => `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(162,155,254,0.12);border-radius:10px;padding:20px;transition:0.3s;cursor:default;"
                            onmouseover="this.style.borderColor='rgba(162,155,254,0.3)'"
                            onmouseout="this.style.borderColor='rgba(162,155,254,0.12)'">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                                <span style="background:rgba(162,155,254,0.15);color:#a29bfe;width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.8rem;font-family:'Segoe UI',sans-serif;flex-shrink:0;">#${d.num}</span>
                                <span style="font-size:1.3rem;">${d.icono}</span>
                                <h3 style="color:#fff;font-size:0.95rem;margin:0;">${d.titulo}</h3>
                            </div>
                            <p style="color:rgba(255,255,255,0.65);font-size:0.83rem;line-height:1.65;margin:0 0 10px;font-family:'Segoe UI',sans-serif;">${d.resumen}</p>
                            <span style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.15);color:rgba(212,175,55,0.7);padding:3px 10px;border-radius:4px;font-size:0.72rem;font-family:'Segoe UI',sans-serif;">${d.ref}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// TRADUCCIONES EN PARALELO
// ==========================================
function renderTraduccionesAdultos() {
    const trad = ADULTOS_DATA.estudioDelDia.traducciones;
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#001a1a,#003333,#001a1a);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(0,206,201,0.15);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(0,206,201,0.08);border:1px solid rgba(0,206,201,0.2);color:#00cec9;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#00cec9;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">🔄 TRADUCCIONES</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <div style="background:rgba(0,206,201,0.05);border:1px solid rgba(0,206,201,0.12);border-radius:10px;padding:16px 20px;margin-bottom:20px;text-align:center;">
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Hebreos 8:1 en 3 traducciones — comparación versículo por versículo</p>
                </div>

                <div style="display:grid;gap:14px;">
                    ${trad.map((t, i) => `
                        <div style="background:rgba(0,206,201,${[0.06, 0.04, 0.03][i]});border:1px solid rgba(0,206,201,${[0.25, 0.18, 0.12][i]});border-radius:12px;padding:22px;">
                            <div style="background:rgba(0,206,201,0.15);color:#00cec9;font-size:0.72rem;font-weight:900;letter-spacing:3px;padding:4px 12px;border-radius:4px;display:inline-block;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">${t.sigla}</div>
                            <p style="color:rgba(255,255,255,0.88);font-size:0.92rem;line-height:1.75;margin:0;font-style:italic;">${t.texto}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// NOTAS PERSONALES
// ==========================================
function renderNotasAdultos() {
    const container = document.getElementById("pantalla-estudio");
    const notas = adultosState.notas;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#111,#1a1a1a,#111);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:rgba(255,255,255,0.7);font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">✏️ NOTAS PERSONALES</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <!-- EDITOR -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:20px;margin-bottom:16px;">
                    <div style="color:rgba(255,255,255,0.4);font-size:0.68rem;letter-spacing:3px;margin-bottom:12px;font-family:'Segoe UI',sans-serif;">NUEVA NOTA — ${ADULTOS_DATA.estudioDelDia.pasaje}</div>
                    <textarea id="nota-input" placeholder="Escribe tus observaciones, reflexiones o preguntas sobre el pasaje de hoy..."
                        style="width:100%;min-height:120px;background:transparent;border:none;color:#fff;font-family:'Georgia',serif;font-size:0.9rem;resize:vertical;outline:none;line-height:1.7;box-sizing:border-box;"></textarea>
                    <button onclick="guardarNota()" style="background:linear-gradient(135deg,rgba(212,175,55,0.2),rgba(180,130,20,0.15));border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:10px 24px;border-radius:6px;cursor:pointer;font-family:'Georgia',serif;letter-spacing:1px;margin-top:8px;">💾 Guardar Nota</button>
                </div>

                <!-- NOTAS GUARDADAS -->
                ${notas.length > 0 ? `
                    <h3 style="color:rgba(255,255,255,0.4);font-size:0.72rem;letter-spacing:3px;margin:0 0 14px;font-family:'Segoe UI',sans-serif;">NOTAS GUARDADAS (${notas.length})</h3>
                    <div style="display:grid;gap:10px;">
                        ${notas.slice().reverse().map((n, i) => `
                            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:16px;position:relative;">
                                <div style="color:rgba(212,175,55,0.5);font-size:0.7rem;margin-bottom:8px;font-family:'Segoe UI',sans-serif;">${n.fecha} · ${n.pasaje}</div>
                                <p style="color:rgba(255,255,255,0.75);font-size:0.87rem;margin:0;line-height:1.65;">${n.texto}</p>
                                <button onclick="eliminarNota(${notas.length - 1 - i})" style="position:absolute;top:10px;right:12px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.2);color:#ff7675;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:0.7rem;font-family:'Segoe UI',sans-serif;">✕</button>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="color:rgba(255,255,255,0.2);text-align:center;font-family:\'Segoe UI\',sans-serif;font-size:0.85rem;">No hay notas guardadas aún. Empieza a escribir arriba.</p>'}
            </div>
        </div>
    `;
}

async function guardarNota() {
    const input = document.getElementById('nota-input').value.trim();
    if (!input) return;

    // Guardar en Firebase (el servicio ya maneja localStorage)
    await guardarNotaFirebase(input, ADULTOS_DATA.estudioDelDia.pasaje);

    // Recargar notas y limpiar input
    adultosState.notas = await cargarNotasFirebase();
    renderNotasAdultos();
}

async function eliminarNota(idx) {
    const nota = adultosState.notas[idx];
    if (!nota) return;

    await eliminarNotaFirebase(nota.id, idx);
    adultosState.notas = await cargarNotasFirebase();
    renderNotasAdultos();
}

// ==========================================
// PLAN DE ESTUDIO 4 SEMANAS
// ==========================================
function renderPlanEstudio() {
    const container = document.getElementById("pantalla-estudio");
    const plan = ADULTOS_DATA.planEstudio;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0f0800,#1e0f00,#0f0a00);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(253,150,68,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(253,150,68,0.08);border:1px solid rgba(253,150,68,0.2);color:#fd9644;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#fd9644;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">📅 PLAN DE ESTUDIO</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:24px;">
                    <h2 style="color:#fd9644;font-size:1.2rem;margin:0 0 6px;">El Santuario y el Juicio</h2>
                    <p style="color:rgba(255,255,255,0.4);font-size:0.82rem;margin:0;font-family:'Segoe UI',sans-serif;">Plan de estudio intensivo — 4 semanas</p>
                </div>

                <div style="display:grid;gap:14px;">
                    ${plan.map((s, i) => `
                        <div style="background:rgba(253,150,68,0.05);border:1px solid rgba(253,150,68,0.15);border-radius:12px;padding:20px;transition:0.3s;"
                            onmouseover="this.style.borderColor='rgba(253,150,68,0.35)'"
                            onmouseout="this.style.borderColor='rgba(253,150,68,0.15)'">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                                <div style="background:rgba(253,150,68,0.2);color:#fd9644;border:1px solid rgba(253,150,68,0.3);border-radius:6px;padding:4px 12px;font-size:0.75rem;font-weight:700;font-family:'Segoe UI',sans-serif;white-space:nowrap;">SEMANA ${s.semana}</div>
                                <h3 style="color:#fff;font-size:0.92rem;margin:0;line-height:1.3;">${s.tema}</h3>
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:8px;">
                                ${s.textos.map(t => `
                                    <span style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);color:rgba(212,175,55,0.8);padding:4px 12px;border-radius:4px;font-size:0.78rem;font-family:'Segoe UI',sans-serif;">${t}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.15);border-radius:10px;padding:18px;margin-top:20px;text-align:center;">
                    <p style="color:rgba(212,175,55,0.8);font-size:0.85rem;margin:0;font-family:'Segoe UI',sans-serif;font-style:italic;">"El estudio de la Biblia exige nuestros más vigorosos esfuerzos mentales y perseverancia en la oración." — Elena G. de White</p>
                </div>
            </div>
        </div>
    `;
}
