// ==========================================
// 🆚 MODO VERSUS — EN VIVO CON FIREBASE
// ==========================================
/*
  ARQUITECTURA:
  Firestore > salas_versus > {codigoSala} > {
    estado: 'esperando' | 'contando' | 'activo' | 'terminado',
    preguntas: [...],       // array de índices del banco
    preguntaActual: 0,
    tiempoInicio: timestamp,
    jugador1: { nombre, xp, respondio: false },
    jugador2: { nombre, xp, respondio: false },
    respuestaRonda: { j1: null, j2: null }
  }
*/

let versus = {
    codigoSala: null,
    rolJugador: null,      // 'jugador1' | 'jugador2'
    unsubscribe: null,     // listener Firestore
    preguntaActual: 0,
    xpLocal: 0,
    timerLocal: null,
    puntosBonus: 20        // XP base por respuesta correcta rápida
};

// --- Generar código de 4 letras ---
function generarCodigo() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// --- LOBBY VERSUS ---
function renderVersusLobby() {
    const area = document.getElementById('pantalla-estudio');
    area.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#1a0a00,#2d1500,#1a0a00);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(255,107,107,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderJuegoTeens()" style="background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.25);color:#ff6b6b;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#ff6b6b;font-size:0.8rem;letter-spacing:2px;">🆚 MODO VERSUS</span>
            </div>
            <div style="padding:20px;max-width:700px;margin:0 auto">
                <div style="text-align:center;margin-bottom:30px">
                    <h2 style="font-size:2.2rem;font-weight:900;background:linear-gradient(to right,#ff6b6b,#feca57);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 6px">🆚 MODO VERSUS</h2>
                    <p style="color:rgba(255,255,255,0.4);letter-spacing:2px;font-size:0.78rem;margin:0">DESAFÍA A TUS AMIGOS EN TIEMPO REAL</p>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
                    <!-- CREAR SALA -->
                    <div style="background:linear-gradient(135deg,rgba(255,107,107,0.15),rgba(254,202,87,0.1));border:2px solid rgba(255,107,107,0.3);border-radius:20px;padding:28px;text-align:center">
                        <div style="font-size:2.5rem;margin-bottom:12px">⚔️</div>
                        <h3 style="color:#ff6b6b;font-size:1rem;font-weight:900;margin:0 0 8px">CREAR SALA</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:16px">Genera un código y compártelo</p>
                        <button onclick="crearSalaVersus()" id="btn-crear-sala" style="background:linear-gradient(135deg,#ff6b6b,#ee5a24);color:#fff;border:none;padding:12px 20px;border-radius:12px;font-weight:900;cursor:pointer;width:100%;font-size:0.9rem">CREAR ⚡</button>
                    </div>

                    <!-- UNIRSE A SALA -->
                    <div style="background:linear-gradient(135deg,rgba(72,219,251,0.15),rgba(162,155,254,0.1));border:2px solid rgba(72,219,251,0.3);border-radius:20px;padding:28px;text-align:center">
                        <div style="font-size:2.5rem;margin-bottom:12px">🔗</div>
                        <h3 style="color:#48dbfb;font-size:1rem;font-weight:900;margin:0 0 8px">UNIRSE</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:8px">Ingresa el código de tu rival</p>
                        <input id="input-codigo-sala" maxlength="4" placeholder="XXXX" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(72,219,251,0.3);color:#fff;padding:10px;border-radius:10px;text-align:center;font-size:1.3rem;font-weight:900;letter-spacing:4px;margin-bottom:8px;box-sizing:border-box;text-transform:uppercase">
                        <button onclick="unirseSalaVersus()" style="background:linear-gradient(135deg,#48dbfb,#0abde3);color:#000;border:none;padding:12px 20px;border-radius:12px;font-weight:900;cursor:pointer;width:100%;font-size:0.9rem">UNIRSE 🚀</button>
                    </div>
                </div>

                <!-- REGLAS DEL JUEGO -->
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:20px">
                    <h4 style="color:#feca57;margin:0 0 14px;font-size:0.8rem;letter-spacing:2px">📋 CÓMO JUGAR</h4>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center">
                        <div><div style="font-size:1.5rem;margin-bottom:4px">1️⃣</div><p style="font-size:0.75rem;color:rgba(255,255,255,0.55);margin:0">Uno crea la sala y comparte el código de 4 letras</p></div>
                        <div><div style="font-size:1.5rem;margin-bottom:4px">2️⃣</div><p style="font-size:0.75rem;color:rgba(255,255,255,0.55);margin:0">El otro jugador ingresa el código y se une</p></div>
                        <div><div style="font-size:1.5rem;margin-bottom:4px">3️⃣</div><p style="font-size:0.75rem;color:rgba(255,255,255,0.55);margin:0">¡Responde rápido! El más rápido gana los puntos</p></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- CREAR SALA EN FIRESTORE ---
async function crearSalaVersus() {
    const btn = document.getElementById('btn-crear-sala');
    btn.innerText = 'Creando...'; btn.disabled = true;
    const codigo = generarCodigo();
    const preguntas = [...Array(20).keys()].sort(() => Math.random() - 0.5).slice(0, 8);
    try {
        await db.collection('salas_versus').doc(codigo).set({
            estado: 'esperando',
            preguntas,
            preguntaActual: 0,
            creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
            jugador1: { nombre: usuarioActual.nombre, xp: 0, respondio: false, respuesta: null },
            jugador2: null
        });
        versus.codigoSala = codigo;
        versus.rolJugador = 'jugador1';
        versus.xpLocal = 0;
        renderEsperandoRival(codigo);
        escucharSala(codigo);
    } catch (e) {
        btn.innerText = 'CREAR ⚡'; btn.disabled = false;
        mostrarToast('❌ Error al crear sala. Revisa conexión.');
    }
}

// --- UNIRSE A SALA EXISTENTE ---
async function unirseSalaVersus() {
    const input = document.getElementById('input-codigo-sala');
    const codigo = input.value.toUpperCase().trim();
    if (codigo.length < 4) { mostrarToast('⚠️ Ingresa el código de 4 letras'); return; }

    try {
        const docRef = db.collection('salas_versus').doc(codigo);
        const snap = await docRef.get();
        if (!snap.exists) { mostrarToast('❌ Sala no encontrada'); return; }
        const sala = snap.data();
        if (sala.estado !== 'esperando') { mostrarToast('⚠️ La sala ya comenzó o terminó'); return; }
        if (sala.jugador1.nombre === usuarioActual.nombre) { mostrarToast('⚠️ Ya estás en esta sala'); return; }

        await docRef.update({
            jugador2: { nombre: usuarioActual.nombre, xp: 0, respondio: false, respuesta: null },
            estado: 'contando'
        });
        versus.codigoSala = codigo;
        versus.rolJugador = 'jugador2';
        versus.xpLocal = 0;
        escucharSala(codigo);
    } catch (e) {
        mostrarToast('❌ Error al unirse. Intenta de nuevo.');
    }
}

// --- PANTALLA ESPERANDO RIVAL ---
function renderEsperandoRival(codigo) {
    const area = document.getElementById('pantalla-estudio');
    area.innerHTML = `
        <div style="padding:20px;max-width:500px;margin:80px auto;text-align:center">
            <div style="font-size:4rem;margin-bottom:20px;animation:pulseInsight 1.5s infinite">⚡</div>
            <h2 style="font-weight:900;margin:0 0 10px">ESPERANDO RIVAL...</h2>
            <p style="opacity:0.6;margin-bottom:30px">Comparte este código con tu amigo</p>

            <div style="background:linear-gradient(135deg,rgba(255,107,107,0.2),rgba(254,202,87,0.1));border:3px solid #ff6b6b;border-radius:24px;padding:30px;margin-bottom:30px">
                <div id="codigo-display" style="font-size:4rem;font-weight:900;letter-spacing:12px;color:#feca57">${codigo}</div>
                <p style="opacity:0.6;font-size:0.8rem;margin:10px 0 0">Código de sala</p>
            </div>

            <button onclick="copiarCodigo('${codigo}')" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:12px 25px;border-radius:12px;cursor:pointer;margin-bottom:15px;width:100%">📋 COPIAR CÓDIGO</button>
            <button onclick="cancelarSala('${codigo}')" style="background:rgba(255,107,107,0.1);color:#ff6b6b;border:1px solid rgba(255,107,107,0.3);padding:12px 25px;border-radius:12px;cursor:pointer;width:100%">✕ Cancelar</button>
        </div>
    `;
}

function copiarCodigo(codigo) {
    navigator.clipboard.writeText(codigo).then(() => mostrarToast('📋 Código copiado'));
}

async function cancelarSala(codigo) {
    if (versus.unsubscribe) versus.unsubscribe();
    try { await db.collection('salas_versus').doc(codigo).delete(); } catch (e) { }
    versus.codigoSala = null;
    renderVersusLobby();
}

// --- ESCUCHAR CAMBIOS EN TIEMPO REAL ---
function escucharSala(codigo) {
    if (versus.unsubscribe) versus.unsubscribe();
    versus.unsubscribe = db.collection('salas_versus').doc(codigo).onSnapshot(snap => {
        if (!snap.exists) return;
        const sala = snap.data();
        if (sala.estado === 'contando') renderCountdown(sala);
        else if (sala.estado === 'activo') renderPreguntaVersus(sala);
        else if (sala.estado === 'terminado') renderResultadoVersus(sala);
    });
}

// --- CUENTA REGRESIVA ---
function renderCountdown(sala) {
    const area = document.getElementById('pantalla-estudio');
    let count = 3;
    area.innerHTML = `
        <div style="text-align:center;padding:80px 20px;max-width:500px;margin:0 auto">
            <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:20px;margin-bottom:30px;display:flex;justify-content:space-around">
                <div><div style="font-size:1.5rem;font-weight:900;color:#55efc4">${sala.jugador1.nombre}</div><div style="font-size:0.75rem;opacity:0.5">JUGADOR 1</div></div>
                <div style="font-size:1.5rem;opacity:0.5">VS</div>
                <div><div style="font-size:1.5rem;font-weight:900;color:#ff6b6b">${sala.jugador2 ? sala.jugador2.nombre : '?'}</div><div style="font-size:0.75rem;opacity:0.5">JUGADOR 2</div></div>
            </div>
            <div id="countdown-num" style="font-size:8rem;font-weight:900;color:#feca57;animation:fadeIn 0.3s">${count}</div>
            <p style="opacity:0.5;letter-spacing:3px">EN VIVO</p>
        </div>
    `;
    // Solo jugador1 activa el juego en Firebase después del countdown
    if (versus.rolJugador === 'jugador1') {
        const iv = setInterval(() => {
            count--;
            const el = document.getElementById('countdown-num');
            if (el) { el.innerText = count; el.style.animation = 'none'; setTimeout(() => el.style.animation = 'fadeIn 0.3s', 10); }
            if (count <= 0) {
                clearInterval(iv);
                db.collection('salas_versus').doc(versus.codigoSala).update({ estado: 'activo', preguntaActual: 0 });
            }
        }, 1000);
    }
}

// --- PREGUNTA VERSUS EN TIEMPO REAL ---
function renderPreguntaVersus(sala) {
    clearInterval(versus.timerLocal);
    const idx = sala.preguntaActual;
    if (idx >= sala.preguntas.length) {
        if (versus.rolJugador === 'jugador1') {
            db.collection('salas_versus').doc(versus.codigoSala).update({ estado: 'terminado' });
        }
        return;
    }
    const q = JUEGOS_BANCO[sala.preguntas[idx]];
    const total = sala.preguntas.length;
    const miDato = sala[versus.rolJugador];
    const rivalDato = versus.rolJugador === 'jugador1' ? sala.jugador2 : sala.jugador1;
    const yaRespondi = miDato && miDato.respondio;

    const area = document.getElementById('pantalla-estudio');
    area.innerHTML = `
        <div style="padding:20px;max-width:700px;margin:0 auto">
            <!-- MARCADOR EN VIVO -->
            <div style="background:rgba(0,0,0,0.4);border-radius:20px;padding:15px 25px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border:1px solid rgba(255,255,255,0.08)">
                <div style="text-align:center">
                    <div style="font-size:1.4rem;font-weight:900;color:#55efc4">${miDato ? miDato.xp : 0}</div>
                    <div style="font-size:0.7rem;opacity:0.5">${usuarioActual.nombre}</div>
                </div>
                <div style="text-align:center;font-size:0.75rem;opacity:0.5">
                    RONDA ${idx + 1} / ${total}<br>
                    <span id="timer-versus" style="color:#feca57;font-size:1.1rem;font-weight:900">⏱ 15s</span>
                </div>
                <div style="text-align:center">
                    <div style="font-size:1.4rem;font-weight:900;color:#ff6b6b">${rivalDato ? rivalDato.xp : 0}</div>
                    <div style="font-size:0.7rem;opacity:0.5">${rivalDato ? rivalDato.nombre : '...'}</div>
                </div>
            </div>

            <!-- BARRA DE PROGRESO RONDA -->
            <div style="background:rgba(255,255,255,0.08);border-radius:20px;height:6px;margin-bottom:20px;overflow:hidden">
                <div style="width:${(idx / total) * 100}%;height:100%;background:linear-gradient(to right,#ff6b6b,#feca57);transition:width 0.5s"></div>
            </div>

            <!-- PREGUNTA -->
            <div style="background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:24px;padding:30px;margin-bottom:20px;text-align:center">
                <p style="font-size:1.35rem;font-weight:700;line-height:1.5;margin:0">${q.p}</p>
            </div>

            <!-- OPCIONES -->
            <div style="display:grid;gap:12px" id="versus-opciones">
                ${q.o.map((opt, i) => `
                    <button id="vopt-${i}" onclick="${yaRespondi ? '' : `responderVersus(${i},${q.c})`}"
                        style="background:${yaRespondi ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'};border:2px solid rgba(255,255,255,0.12);color:${yaRespondi ? 'rgba(255,255,255,0.4)' : '#fff'};padding:18px 25px;border-radius:16px;font-size:1rem;font-weight:600;cursor:${yaRespondi ? 'default' : 'pointer'};text-align:left;display:flex;align-items:center;gap:12px;transition:0.2s">
                        <span style="background:rgba(255,255,255,0.1);min-width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:900">${['A', 'B', 'C'][i]}</span>
                        ${opt}
                    </button>
                `).join('')}
            </div>

            ${yaRespondi ? '<p style="text-align:center;margin-top:20px;color:#feca57;font-size:0.9rem;animation:pulseInsight 1.5s infinite">⏳ Esperando al rival...</p>' : ''}
        </div>
    `;

    // Timer local visual
    let t = 15;
    versus.timerLocal = setInterval(() => {
        t--;
        const td = document.getElementById('timer-versus');
        if (td) { td.innerText = `⏱ ${t}s`; if (t <= 5) td.style.color = '#ff6b6b'; }
        if (t <= 0) {
            clearInterval(versus.timerLocal);
            if (!yaRespondi) responderVersus(-1, q.c); // Tiempo agotado = fallo
        }
    }, 1000);
}

// --- REGISTRAR RESPUESTA EN FIRESTORE ---
async function responderVersus(idx, correcta) {
    clearInterval(versus.timerLocal);
    const esCorrecta = idx === correcta;
    const xpGanado = esCorrecta ? 30 : 0;
    versus.xpLocal += xpGanado;

    // Feedback visual inmediato
    if (idx >= 0) {
        const bc = document.getElementById(`vopt-${correcta}`);
        const be = document.getElementById(`vopt-${idx}`);
        if (bc) { bc.style.background = 'rgba(85,239,196,0.3)'; bc.style.borderColor = '#55efc4'; }
        if (!esCorrecta && be) { be.style.background = 'rgba(255,107,107,0.3)'; be.style.borderColor = '#ff6b6b'; }
    }
    document.querySelectorAll('[id^="vopt-"]').forEach(b => b.style.pointerEvents = 'none');

    mostrarFeedback(esCorrecta, esCorrecta ? `+30 XP ⚡` : idx === -1 ? '⏰ ¡Tiempo!' : '✖️ ¡Falló!');

    try {
        const update = {};
        update[`${versus.rolJugador}.respondio`] = true;
        update[`${versus.rolJugador}.xp`] = firebase.firestore.FieldValue.increment(xpGanado);
        update[`${versus.rolJugador}.respuesta`] = idx;
        await db.collection('salas_versus').doc(versus.codigoSala).update(update);

        // Verificar si ambos respondieron para avanzar (solo J1 avanza ronda)
        if (versus.rolJugador === 'jugador1') {
            await esperarYAvanzarRonda();
        }
    } catch (e) { console.error('Error guardando respuesta versus:', e); }
}

// --- JUGADOR 1 COORDINA EL AVANCE DE RONDA ---
async function esperarYAvanzarRonda() {
    // Esperar máx 8 segundos a que J2 responda, luego avanzar igual
    let intentos = 0;
    const check = setInterval(async () => {
        intentos++;
        const snap = await db.collection('salas_versus').doc(versus.codigoSala).get();
        const sala = snap.data();
        const j1Listo = sala.jugador1 && sala.jugador1.respondio;
        const j2Listo = sala.jugador2 && sala.jugador2.respondio;
        if ((j1Listo && j2Listo) || intentos >= 8) {
            clearInterval(check);
            const siguiente = sala.preguntaActual + 1;
            if (siguiente >= sala.preguntas.length) {
                await db.collection('salas_versus').doc(versus.codigoSala).update({ estado: 'terminado' });
            } else {
                await db.collection('salas_versus').doc(versus.codigoSala).update({
                    preguntaActual: siguiente,
                    'jugador1.respondio': false, 'jugador1.respuesta': null,
                    'jugador2.respondio': false, 'jugador2.respuesta': null
                });
            }
        }
    }, 1000);
}

// --- PANTALLA FINAL VERSUS ---
function renderResultadoVersus(sala) {
    clearInterval(versus.timerLocal);
    if (versus.unsubscribe) { versus.unsubscribe(); versus.unsubscribe = null; }
    const j1 = sala.jugador1;
    const j2 = sala.jugador2 || { nombre: '???', xp: 0 };
    const soyJ1 = versus.rolJugador === 'jugador1';
    const miXp = soyJ1 ? j1.xp : j2.xp;
    const rivalXp = soyJ1 ? j2.xp : j1.xp;
    const rivalNombre = soyJ1 ? j2.nombre : j1.nombre;
    const gané = miXp > rivalXp;
    const empate = miXp === rivalXp;

    const area = document.getElementById('pantalla-estudio');
    area.innerHTML = `
        <div style="margin-bottom:15px;animation:fadeIn 0.5s">
                ${empate
            ? `<div style="font-size:5rem">🤝</div>`
            : gané
                ? `<div style="font-size:5rem">🏆</div>`
                : `<img src="nino_triste.png.png" alt="Animo" style="width:110px;height:110px;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(255,107,107,0.3))">`
        }
            </div>
            <h2 style="font-size:2.5rem;font-weight:900;color:${empate ? '#feca57' : gané ? '#55efc4' : '#ff6b6b'};margin:0 0 8px">${empate ? '¡EMPATE!' : gané ? '¡GANASTE!' : '¡ÁNIMO!'}</h2>
            <p style="opacity:0.6;margin-bottom:30px">${empate ? 'Rara vez pasa... ¡revanche!' : gané ? '¡Eres un campeón de la fe! 🔥' : '¡Con Dios todo es posible! Estudia y vuelve 💪'}</p>

            <!-- MARCADOR FINAL -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:30px;margin-bottom:25px">
                <div style="display:flex;justify-content:space-around;align-items:center">
                    <div>
                        <div style="font-size:2.5rem;font-weight:900;color:#55efc4">${miXp}</div>
                        <div style="font-size:0.8rem;font-weight:700;margin-top:5px">${usuarioActual.nombre}</div>
                        <div style="font-size:0.7rem;opacity:0.4">TÚ</div>
                    </div>
                    <div style="font-size:2rem;opacity:0.4">VS</div>
                    <div>
                        <div style="font-size:2.5rem;font-weight:900;color:#ff6b6b">${rivalXp}</div>
                        <div style="font-size:0.8rem;font-weight:700;margin-top:5px">${rivalNombre}</div>
                        <div style="font-size:0.7rem;opacity:0.4">RIVAL</div>
                    </div>
                </div>
                ${!empate ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.05);color:#feca57;font-weight:700">
                    ${gané ? `🏆 ${usuarioActual.nombre} GANA CON ${miXp - rivalXp} PUNTOS DE VENTAJA` : `${rivalNombre} GANA CON ${rivalXp - miXp} PUNTOS DE VENTAJA`}
                </div>` : ''}
            </div>

            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
                <button onclick="renderVersusLobby()" style="background:linear-gradient(135deg,#ff6b6b,#ee5a24);color:#fff;border:none;padding:14px 25px;border-radius:14px;font-weight:900;cursor:pointer">⚔️ REVANCHE</button>
                <button onclick="renderJuegoTeens()" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:14px 25px;border-radius:14px;cursor:pointer">🎮 MENÚ</button>
                <button onclick="cambiarSeccionTeen('lectura')" style="background:rgba(85,239,196,0.1);color:#55efc4;border:1px solid rgba(85,239,196,0.3);padding:14px 25px;border-radius:14px;cursor:pointer">📖 LEER</button>
            </div>
        </div>
    `;

    // Guardar XP ganado en Firebase
    try {
        db.collection('usuarios_legado').doc(usuarioActual.nombre).set({
            puntos: firebase.firestore.FieldValue.increment(miXp),
            ultima_actividad: new Date()
        }, { merge: true }).then(() => actualizarMarcadorReal());
    } catch (e) { }
}
