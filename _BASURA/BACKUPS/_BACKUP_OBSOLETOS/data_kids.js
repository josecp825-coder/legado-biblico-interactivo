// ==========================================
// 🎨 MÓDULO NIÑOS — BIBLIA VIVA
// Filosofía Adventista del Séptimo Día
// ==========================================

const HISTORIAS_NINOS = [
    {
        id: "daniel",
        titulo: "¡Daniel y los Leones!",
        emoji: "🦁",
        imagen: "daniel_leones_cartoon_1772168642765.png",
        color: "#f9ca24",
        colorOscuro: "#f0932b",
        versiculo: { ref: "Daniel 6:22", texto: "Mi Dios envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño." },
        cuento: [
            "🌟 Daniel amaba a Dios con todo su corazón. ¡Oraba tres veces al día sin importar lo que pasara!",
            "😈 Unos hombres malos hicieron una ley para que nadie orara a Dios. ¡Querían atrapar a Daniel!",
            "🙏 Pero Daniel siguió orando con valentía. ¡Dios era más importante que cualquier ley!",
            "🦁 El rey tuvo que echarlo a los leones... ¡pero Dios envió un ángel que cerró las bocas de todos los leones!",
            "✨ A la mañana siguiente, Daniel estaba perfectamente bien. ¡El rey le dijo a todos que adoraran al Dios de Daniel!"
        ],
        leccion: "¡Dios cuida a quienes confían en Él! No importa qué tan difícil sea, sigue orando.",
        miniJuego: {
            pregunta: "Daniel oraba a Dios ___ veces al día",
            opciones: ["Una", "Tres", "Siete"],
            correcta: 1,
            completar: { texto: "Mi Dios envió su ___", palabra: "ángel", pistas: ["á", "_", "_", "_", "l"] }
        },
        estrellas: 3
    },
    {
        id: "noe",
        titulo: "¡Noé y su Arca Gigante!",
        emoji: "🚢",
        imagen: "noe_arca_cartoon_1772168653149.png",
        color: "#48dbfb",
        colorOscuro: "#0abde3",
        versiculo: { ref: "Génesis 6:22", texto: "Y lo hizo así Noé; hizo conforme a todo lo que Dios le mandó." },
        cuento: [
            "🌍 Hace mucho tiempo, las personas se olvidaron de Dios y hacían cosas malas.",
            "👴 Pero Noé era diferente. ¡Él amaba a Dios y obedecía todo lo que Dios decía!",
            "🔨 Dios le dijo a Noé que construyera un arca gigante... ¡del tamaño de un edificio! Sus vecinos se reían de él.",
            "🐘🦒 Dios envió dos animales de cada especie: elefantes, jirafas, leones, palomas... ¡todos entraron al arca!",
            "🌈 Llovió 40 días y 40 noches. Cuando todo terminó, Dios puso un arco iris como promesa de amor para siempre."
        ],
        leccion: "¡Obedecer a Dios siempre vale la pena! Aunque los demás se rían, Dios tiene el mejor plan.",
        miniJuego: {
            pregunta: "¿Cuántos días llovió en el diluvio?",
            opciones: ["20 días", "40 días", "100 días"],
            correcta: 1,
            completar: { texto: "E hizo Noé conforme a todo lo que Dios le ___", palabra: "mandó", pistas: ["m", "_", "_", "_", "ó"] }
        },
        estrellas: 3
    },
    {
        id: "sabado",
        titulo: "¡El Día Especial de Dios!",
        emoji: "🌟",
        imagen: "biblia_ninos_hero_1772168630395.png",
        color: "#a29bfe",
        colorOscuro: "#6c5ce7",
        versiculo: { ref: "Génesis 2:3", texto: "Y bendijo Dios al día séptimo, y lo santificó, porque en él reposó de toda la obra que había hecho." },
        cuento: [
            "🌅 En el principio, Dios creó el cielo y la tierra en 6 días increíbles. ¡Hizo el sol, la luna, los océanos y los animales!",
            "🌿 El día 1 hizo la luz. El día 3 hizo las plantas. El día 5 los peces y pájaros. El día 6 ¡los animales y al ser humano!",
            "😴 El día 7... Dios descansó. ¡No porque estuviera cansado, sino para darnos un regalo especial!",
            "🎁 El Sábado es como un abrazo de Dios cada semana. Es el día para estar con la familia, cantar y hablar con Él.",
            "💜 Dios puso el Sábado en el corazón de los 10 mandamientos porque lo ama mucho. ¡Es el día del Señor!"
        ],
        leccion: "El Sábado es el regalo de Dios para ti cada semana. ¡Es un día especial para descansar y estar con Él!",
        miniJuego: {
            pregunta: "¿En qué día de la semana descansó Dios?",
            opciones: ["El 5to día", "El 7mo día", "El 1er día"],
            correcta: 1,
            completar: { texto: "Y bendijo Dios al día ___ y lo santificó", palabra: "séptimo", pistas: ["s", "_", "_", "t", "_", "m", "o"] }
        },
        estrellas: 3
    }
];

// --- ESTADO DEL MÓDULO NIÑOS ---
let kidsState = {
    historiaActual: 0,
    seccion: "hub",  // hub | historia | juego
    estrellasTotales: 0,
    paginaCuento: 0,
    cargandoNube: true
};

// ==========================================
// HUB PRINCIPAL NIÑOS
// ==========================================
function renderModuloNinos() {
    const container = document.getElementById("pantalla-estudio");
    container.innerHTML = `
        <div style="min-height:100vh; background:linear-gradient(160deg,#667eea 0%,#764ba2 40%,#f093fb 100%); font-family:'Segoe UI',sans-serif; padding-bottom:40px;">

            <!-- HEADER -->
            <div style="background:rgba(0,0,0,0.2);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;">
                <button onclick="window.location.reload()" style="background:rgba(255,255,255,0.15);border:none;color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.85rem;font-weight:700;">← INICIO</button>
                <span style="color:#fff;font-weight:900;font-size:1rem;letter-spacing:2px;">📖 BIBLIA VIVA</span>
                <div style="background:rgba(255,215,0,0.25);border:2px solid gold;border-radius:20px;padding:6px 14px;color:gold;font-weight:900;font-size:0.9rem;" id="kids-estrellas-header">
                    ⭐ <span id="stars-count">${kidsState.estrellasTotales}</span>
                </div>
            </div>

            <!-- HERO BANNER -->
            <div style="position:relative;margin:20px;border-radius:30px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.3);border:5px solid #fff;">
                <img src="biblia_ninos_hero_1772168630395.png" style="width:100%;height:220px;object-fit:cover;display:block;">
                <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:25px;">
                    <h1 style="color:#fff;font-size:1.8rem;font-weight:900;margin:0;text-shadow:0 2px 10px rgba(0,0,0,0.5);">¡Bienvenido, Explorador Bíblico! 🌟</h1>
                    <p style="color:rgba(255,255,255,0.85);margin:5px 0 0;font-size:0.9rem;">Descubre historias increíbles que Dios tiene para ti</p>
                </div>
            </div>

            <!-- VERSÍCULO DEL DÍA -->
            <div style="margin:0 20px 25px;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border-radius:24px;padding:22px;border:2px solid rgba(255,255,255,0.3);">
                <div style="color:rgba(255,255,255,0.7);font-size:0.75rem;letter-spacing:3px;margin-bottom:10px;">✨ VERSÍCULO DEL DÍA</div>
                <p style="color:#fff;font-size:1.15rem;font-weight:700;line-height:1.5;margin:0 0 10px;">"Porque tanto amó Dios al mundo, que dio a su Hijo unigénito..."</p>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="color:rgba(255,255,255,0.6);font-size:0.8rem;">Juan 3:16</span>
                    <button onclick="leerVersiculo('Porque tanto amó Dios al mundo, que dio a su Hijo unigénito')" style="background:rgba(255,255,255,0.2);border:none;color:#fff;padding:6px 14px;border-radius:20px;cursor:pointer;font-size:0.8rem;">🔊 Escuchar</button>
                </div>
            </div>

            <!-- HISTORIAS -->
            <div style="padding:0 20px;">
                <h2 style="color:#fff;font-size:1.1rem;font-weight:900;letter-spacing:2px;margin:0 0 15px;opacity:0.9;">📚 HISTORIAS DE HOY</h2>
                <div style="display:grid;gap:16px;">
                    ${HISTORIAS_NINOS.map((h, i) => `
                        <div onclick="abrirHistoria(${i})" style="background:linear-gradient(135deg,${h.color}22,${h.colorOscuro}44);border:2px solid ${h.color}66;border-radius:24px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:18px;backdrop-filter:blur(8px);"
                            onmouseover="this.style.transform='scale(1.02)';this.style.borderColor='${h.color}'"
                            onmouseout="this.style.transform='scale(1)';this.style.borderColor='${h.color}66'">
                            <div style="width:80px;height:80px;border-radius:20px;overflow:hidden;flex-shrink:0;border:3px solid ${h.color};box-shadow:0 4px 15px ${h.color}44;">
                                <img src="${h.image || h.imagen}" style="width:100%;height:100%;object-fit:cover;">
                            </div>
                            <div style="flex:1;">
                                <div style="font-size:1.4rem;margin-bottom:4px;">${h.emoji}</div>
                                <h3 style="color:#fff;font-size:1.05rem;font-weight:900;margin:0 0 5px;">${h.titulo}</h3>
                                <p style="color:rgba(255,255,255,0.65);font-size:0.78rem;margin:0;">${h.versiculo.ref}</p>
                                <div style="margin-top:8px;">
                                    ${'⭐'.repeat(h.estrellas)}
                                </div>
                            </div>
                            <div style="color:${h.color};font-size:1.5rem;">›</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- BOTÓN GRAN JUEGO -->
            <div style="margin:25px 20px 0;text-align:center;">
                <button onclick="abrirHistoria(Math.floor(Math.random()*${HISTORIAS_NINOS.length}))" style="background:linear-gradient(135deg,#f9ca24,#f0932b);color:#fff;border:none;padding:16px 35px;border-radius:30px;font-size:1rem;font-weight:900;cursor:pointer;box-shadow:0 8px 25px rgba(249,202,36,0.4);letter-spacing:1px;width:100%;">
                    🎮 ¡JUGAR TRIVIA BÍBLICA! ⭐
                </button>
            </div>
        </div>
    `;

    // 🔥 SINCRONIZACIÓN NUBE: Cargar estrellas al entrar
    if (kidsState.cargandoNube) {
        cargarEstrellasNinos().then(stars => {
            kidsState.estrellasTotales = stars;
            kidsState.cargandoNube = false;
            const el = document.getElementById('stars-count');
            if (el) el.innerText = stars;
        });
    }
}

// ==========================================
// PANTALLA DE HISTORIA (MODAL INMERSIVO)
// ==========================================
function abrirHistoria(idx) {
    kidsState.historiaActual = idx;
    kidsState.seccion = "historia";
    kidsState.paginaCuento = 0;
    renderContenidoHistoria();
}

function renderContenidoHistoria() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh; background:${h.colorOscuro}; font-family:'Segoe UI',sans-serif; color:#fff;">
            
            <!-- TOOLBAR SUPERIOR -->
            <div style="padding:15px 20px; display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.15);">
                <button onclick="renderModuloNinos()" style="background:rgba(255,255,255,0.2); border:none; color:#fff; padding:8px 15px; border-radius:15px; cursor:pointer;">🏠 Salir</button>
                <div style="font-weight:900; font-size:0.9rem; letter-spacing:1px;">HUÉSPED DE HONOR 👑</div>
                <div style="width:50px;"></div>
            </div>

            <!-- IMAGEN DE LA HISTORIA -->
            <div style="width:100%; height:300px; position:relative; overflow:hidden;">
                <img src="${h.imagen}" style="width:100%; height:100%; object-fit:cover; animation:zoomEffect 20s infinite alternate;">
                <div style="position:absolute; inset:0; background:linear-gradient(to top, ${h.colorOscuro}, transparent);"></div>
            </div>

            <div style="padding:0 25px 40px; margin-top:-40px; position:relative; z-index:10;">
                <div style="background:white; color:#333; border-radius:30px; padding:30px; box-shadow:0 15px 40px rgba(0,0,0,0.3);">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <span style="font-size:2rem;">${h.emoji}</span>
                        <h2 style="margin:0; font-size:1.5rem; font-weight:900; color:${h.colorOscuro}">${h.titulo}</h2>
                    </div>

                    <!-- PÁGINA DEL CUENTO -->
                    <div id="cuento-texto" style="font-size:1.15rem; line-height:1.6; min-height:160px; margin-bottom:20px;">
                        ${h.cuento[kidsState.paginaCuento]}
                    </div>

                    <!-- NAVEGACIÓN CUENTO -->
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; gap:10px;">
                             <button onclick="leerTextoActual()" style="background:${h.color}; border:none; width:45px; height:45px; border-radius:50%; cursor:pointer; font-size:1.2rem; box-shadow:0 4px 10px ${h.color}66;">🔊</button>
                        </div>
                        
                        <div style="display:flex; gap:10px;">
                            ${kidsState.paginaCuento < h.cuento.length - 1
            ? `<button onclick="cambiarPagina(1)" style="background:${h.colorOscuro}; color:white; border:none; padding:12px 25px; border-radius:20px; font-weight:900; cursor:pointer;">Siguiente →</button>`
            : `<button onclick="renderJuegoNiños()" style="background:#2ed573; color:white; border:none; padding:12px 25px; border-radius:20px; font-weight:900; cursor:pointer; animation:pulse 1s infinite;">¡JUGAR Y GANAR! ⭐</button>`
        }
                        </div>
                    </div>

                    <!-- INDICADOR DE PÁGINAS -->
                    <div style="display:flex; justify-content:center; gap:8px; margin-top:25px;">
                        ${h.cuento.map((_, i) => `<div style="width:${i === kidsState.paginaCuento ? '25px' : '8px'}; height:8px; background:${i === kidsState.paginaCuento ? h.colorOscuro : '#ddd'}; border-radius:10px; transition:0.3s;"></div>`).join('')}
                    </div>
                </div>

                <!-- VERSÍCULO CLAVE -->
                <div style="margin-top:25px; background:rgba(255,255,255,0.1); padding:20px; border-radius:25px; border:1px dashed rgba(255,255,255,0.3);">
                    <div style="font-size:0.7rem; letter-spacing:2px; margin-bottom:8px; opacity:0.8;">📖 TESORO BÍBLICO</div>
                    <p style="font-size:1rem; font-style:italic; margin:0 0 5px;">"${h.versiculo.texto}"</p>
                    <div style="font-size:0.8rem; font-weight:900;">${h.versiculo.ref}</div>
                </div>
            </div>
        </div>

        <style>
            @keyframes zoomEffect { from { transform: scale(1); } to { transform: scale(1.15); } }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        </style>
    `;
}

function cambiarPagina(delta) {
    kidsState.paginaCuento += delta;
    renderContenidoHistoria();
}

function leerTextoActual() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const msg = new SpeechSynthesisUtterance(h.cuento[kidsState.paginaCuento]);
    msg.lang = 'es-ES';
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
}

function leerVersiculo(texto) {
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'es-ES';
    window.speechSynthesis.speak(msg);
}

// ==========================================
// TRIVIA PARA NIÑOS (REDUX)
// ==========================================
function renderJuegoNiños() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh; background:linear-gradient(135deg, ${h.color}, ${h.colorOscuro}); padding:30px 20px; font-family:'Segoe UI',sans-serif; text-align:center;">
             <div style="background:white; border-radius:30px; padding:35px 25px; max-width:500px; margin:0 auto; box-shadow:0 20px 60px rgba(0,0,0,0.2);">
                <div style="font-size:4rem; margin-bottom:15px;">🤔</div>
                <h2 style="color:${h.colorOscuro}; font-size:1.4rem; font-weight:900; margin-bottom:25px;">${h.miniJuego.pregunta}</h2>

                <div style="display:grid; gap:12px;">
                    ${h.miniJuego.opciones.map((opt, i) => `
                        <button onclick="responderJuegoNinos(${i})" style="padding:18px; border-radius:20px; border:2px solid #eee; background:white; font-size:1.1rem; font-weight:700; cursor:pointer; transition:0.2s;"
                            onmouseover="this.style.borderColor='${h.color}'; this.style.background='${h.color}11'"
                            onmouseout="this.style.borderColor='#eee'; this.style.background='white'">${opt}</button>
                    `).join('')}
                </div>

                <div id="kids-resultado" style="margin-top:25px;"></div>
             </div>
        </div>
    `;
}

function responderJuegoNinos(idx) {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const esCorrecta = idx === h.miniJuego.correcta;
    const res = document.getElementById('kids-resultado');

    if (esCorrecta) {
        kidsState.estrellasTotales += 3;
        // Sincronizar con Firebase y localStorage automáticamente
        guardarEstrellasNinos(kidsState.estrellasTotales);
        guardarPuntajeFirebase('Niños - Historias', 3, { historia: h.titulo });
    }

    res.innerHTML = `
        <div style="animation:popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
            <div style="font-size:3.5rem; margin-bottom:10px;">${esCorrecta ? '🎉' : '😅'}</div>
            <h3 style="color:${esCorrecta ? '#2ed573' : '#ff4757'}; font-weight:900; font-size:1.3rem; margin-bottom:15px;">
                ${esCorrecta ? '¡EXCELENTE TRABAJO!' : '¡CASI LO LOGRAS!'}
            </h3>
            <p style="color:#666; margin-bottom:20px;">
                ${esCorrecta ? 'Has ganado 3 estrellas de oro por tu sabiduría.' : 'Vuelve a leer la historia para encontrar la respuesta.'}
            </p>
            <button onclick="renderModuloNinos()" style="background:${h.colorOscuro}; color:white; border:none; padding:15px 30px; border-radius:20px; font-weight:900; cursor:pointer; width:100%;">
                ${esCorrecta ? '¡Genial! Volver al Inicio' : 'Intentar de nuevo'}
            </button>
        </div>
        <style>@keyframes popIn { from { transform:scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } }</style>
    `;
}
