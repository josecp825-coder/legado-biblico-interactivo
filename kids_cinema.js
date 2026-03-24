// ==========================================
// 🎬 MOTOR DE CINE — BIBLIA VIVA CINEMA
// Experiencia tipo video para cada historia
// ==========================================

// ── ESTILOS DEL CINE ──
(function inyectarEstilosCinema() {
    if (document.getElementById('kids-cinema-css')) return;
    const s = document.createElement('style');
    s.id = 'kids-cinema-css';
    s.textContent = `
        /* ═══ CINEMA MODE ═══ */
        .cinema-overlay {
            position: fixed; inset: 0; z-index: 50000;
            background: #000; color: #fff;
            font-family: 'Segoe UI', sans-serif;
            display: flex; flex-direction: column;
            overflow: hidden;
            animation: cinemaFadeIn 0.6s ease-out;
        }
        @keyframes cinemaFadeIn { from { opacity:0; } to { opacity:1; } }

        /* Top bar */
        .cinema-topbar {
            display: flex; justify-content: space-between; align-items: center;
            padding: 12px 18px;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(10px);
            z-index: 3; position: relative;
        }
        .cinema-topbar button {
            background: rgba(255,255,255,0.12); border: none; color: #fff;
            padding: 8px 16px; border-radius: 20px; cursor: pointer;
            font-size: 0.85rem; font-weight: 700;
        }
        .cinema-topbar .cinema-title {
            font-weight: 900; font-size: 0.85rem; letter-spacing: 2px;
            text-align: center; flex: 1;
        }

        /* Visual area */
        .cinema-visual {
            flex: 1; position: relative; overflow: hidden;
            display: flex; align-items: center; justify-content: center;
        }
        .cinema-bg-art {
            position: absolute; inset: 0;
            display: flex; align-items: center; justify-content: center;
            font-size: 10rem; opacity: 0.08;
            animation: cinemaFloat 8s ease-in-out infinite;
            pointer-events: none; user-select: none;
        }
        @keyframes cinemaFloat {
            0%,100% { transform: translateY(0) scale(1) rotate(0deg); }
            50%     { transform: translateY(-15px) scale(1.05) rotate(3deg); }
        }
        .cinema-image-container {
            position: absolute; inset: 0;
            animation: cinemaKenBurns 20s ease-in-out infinite alternate;
        }
        .cinema-image-container img {
            width: 100%; height: 100%; object-fit: cover;
        }
        @keyframes cinemaKenBurns {
            from { transform: scale(1) translate(0,0); }
            to   { transform: scale(1.15) translate(-2%,-3%); }
        }
        .cinema-gradient-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to bottom,
                rgba(0,0,0,0.1) 0%,
                rgba(0,0,0,0.3) 40%,
                rgba(0,0,0,0.85) 100%
            );
            z-index: 1;
        }

        /* Scene text area */
        .cinema-text-area {
            position: absolute; bottom: 0; left: 0; right: 0;
            z-index: 2; padding: 25px 22px 20px;
        }
        .cinema-scene-indicator {
            font-size: 0.65rem; letter-spacing: 3px; color: rgba(255,255,255,0.5);
            margin-bottom: 10px; font-weight: 700;
        }
        .cinema-text {
            font-size: 1.2rem; line-height: 1.7; color: #fff;
            min-height: 90px; font-weight: 500;
            text-shadow: 0 2px 8px rgba(0,0,0,0.7);
        }
        .cinema-text .typewriter-cursor {
            display: inline-block; width: 2px; height: 1.2em;
            background: #fff; margin-left: 2px;
            animation: blink 0.7s infinite;
            vertical-align: text-bottom;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        /* Bible verse card */
        .cinema-verse-card {
            margin: 12px 22px 0;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 16px; padding: 14px 16px;
            z-index: 2; position: relative;
        }
        .cinema-verse-card .label {
            font-size: 0.55rem; letter-spacing: 3px;
            color: rgba(255,255,255,0.4); margin-bottom: 6px;
        }
        .cinema-verse-card .text {
            font-family: 'Crimson Text', serif;
            font-style: italic; font-size: 0.9rem;
            color: rgba(255,255,255,0.8); line-height: 1.5;
        }
        .cinema-verse-card .ref {
            font-size: 0.7rem; font-weight: 900;
            margin-top: 6px; letter-spacing: 1px;
        }

        /* Controls bar */
        .cinema-controls {
            padding: 10px 18px 20px;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 3; position: relative;
        }
        .cinema-progress-bar {
            width: 100%; height: 5px;
            background: rgba(255,255,255,0.15); border-radius: 10px;
            margin-bottom: 12px; overflow: hidden; cursor: pointer;
        }
        .cinema-progress-fill {
            height: 100%; border-radius: 10px;
            transition: width 0.5s linear;
        }
        .cinema-btn-row {
            display: flex; justify-content: space-between; align-items: center;
        }
        .cinema-btn-row button {
            background: none; border: none; color: #fff;
            font-size: 1.3rem; cursor: pointer; padding: 8px;
            min-width: 48px; min-height: 48px;
            display: flex; align-items: center; justify-content: center;
        }
        .cinema-btn-row .cinema-timer {
            font-size: 0.7rem; color: rgba(255,255,255,0.4);
            font-family: monospace; letter-spacing: 1px;
        }

        /* Particles */
        .cinema-particle {
            position: absolute; pointer-events: none; z-index: 0;
            opacity: 0; animation: particleFloat 6s ease-in-out infinite;
        }
        @keyframes particleFloat {
            0%   { opacity:0; transform: translateY(30px) scale(0.5); }
            20%  { opacity:0.6; }
            80%  { opacity:0.6; }
            100% { opacity:0; transform: translateY(-80px) scale(1.2); }
        }

        /* Lesson card (end screen) */
        .cinema-lesson-card {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 24px; padding: 25px; margin: 15px 22px;
            text-align: center; z-index: 2; position: relative;
            animation: cinemaFadeIn 0.6s ease-out;
        }
        .cinema-lesson-card h3 { font-size: 1.2rem; margin: 10px 0; }
        .cinema-lesson-card p { color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem; }
        .cinema-trivia-btn {
            background: linear-gradient(135deg, #f9ca24, #f0932b);
            color: #fff; border: none; padding: 16px 30px;
            border-radius: 30px; font-size: 1rem; font-weight: 900;
            cursor: pointer; width: 100%; margin-top: 15px;
            box-shadow: 0 8px 25px rgba(249,202,36,0.4);
            letter-spacing: 1px;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse { 0%{transform:scale(1);} 50%{transform:scale(1.03);} 100%{transform:scale(1);} }

        /* Trivia cinema mode */
        .cinema-trivia-container {
            padding: 30px 22px; z-index: 2; position: relative;
            display: flex; flex-direction: column; align-items: center;
            justify-content: center; flex: 1;
        }
        .cinema-trivia-card {
            background: rgba(255,255,255,0.95); color: #333;
            border-radius: 30px; padding: 35px 25px; max-width: 500px;
            width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .cinema-trivia-option {
            padding: 16px; border-radius: 18px;
            border: 2px solid #eee; background: #fff;
            font-size: 1.05rem; font-weight: 700;
            cursor: pointer; transition: 0.2s; width: 100%;
            text-align: center;
        }
        .cinema-trivia-option:active {
            transform: scale(0.97);
        }
    `;
    document.head.appendChild(s);
})();


// ══════════════════════════════════════════
// HUB PRINCIPAL NIÑOS (30 HISTORIAS)
// ══════════════════════════════════════════
function renderModuloNinos() {
    kidsState.seccion = "hub";
    detenerCinema();
    const container = document.getElementById("pantalla-estudio");

    const historiasFiltradas = kidsState.categoriaFiltro === 'todas'
        ? HISTORIAS_NINOS
        : HISTORIAS_NINOS.filter(h => h.categoria === kidsState.categoriaFiltro);

    const historiasAT = HISTORIAS_NINOS.filter(h => h.categoria === 'AT');
    const historiasNT = HISTORIAS_NINOS.filter(h => h.categoria === 'NT');

    container.innerHTML = `
        <div style="min-height:100vh; background:linear-gradient(160deg,#667eea 0%,#764ba2 40%,#f093fb 100%); font-family:'Segoe UI',sans-serif; padding-bottom:40px;">

            <!-- HEADER -->
            <div style="background:rgba(0,0,0,0.2);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;">
                <button onclick="window.location.reload()" style="background:rgba(255,255,255,0.15);border:none;color:#fff;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.85rem;font-weight:700;">← INICIO</button>
                <span style="color:#fff;font-weight:900;font-size:1rem;letter-spacing:2px;">🎬 BIBLIA VIVA</span>
                <div style="background:rgba(255,215,0,0.25);border:2px solid gold;border-radius:20px;padding:6px 14px;color:gold;font-weight:900;font-size:0.9rem;" id="kids-estrellas-header">
                    ⭐ <span id="stars-count">${kidsState.estrellasTotales}</span>
                </div>
            </div>

            <!-- HERO BANNER -->
            <div style="position:relative;margin:20px;border-radius:30px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.3);border:5px solid #fff;">
                <img src="biblia_ninos_hero_1772168630395.png" style="width:100%;height:200px;object-fit:cover;display:block;">
                <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px;">
                    <h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0;text-shadow:0 2px 10px rgba(0,0,0,0.5);">¡Bienvenido, Explorador! 🌟</h1>
                    <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:0.85rem;">30 historias bíblicas animadas esperan por ti</p>
                </div>
            </div>

            <!-- FILTRO DE CATEGORÍAS -->
            <div style="display:flex;gap:10px;padding:0 20px;margin-bottom:20px;overflow-x:auto;">
                <button onclick="kidsState.categoriaFiltro='todas';renderModuloNinos()"
                    style="background:${kidsState.categoriaFiltro === 'todas' ? '#fff' : 'rgba(255,255,255,0.15)'};color:${kidsState.categoriaFiltro === 'todas' ? '#6c5ce7' : '#fff'};
                    border:none;padding:10px 20px;border-radius:25px;font-weight:900;font-size:0.8rem;cursor:pointer;white-space:nowrap;letter-spacing:1px;">
                    📖 TODAS (${HISTORIAS_NINOS.length})
                </button>
                <button onclick="kidsState.categoriaFiltro='AT';renderModuloNinos()"
                    style="background:${kidsState.categoriaFiltro === 'AT' ? '#fff' : 'rgba(255,255,255,0.15)'};color:${kidsState.categoriaFiltro === 'AT' ? '#00b894' : '#fff'};
                    border:none;padding:10px 20px;border-radius:25px;font-weight:900;font-size:0.8rem;cursor:pointer;white-space:nowrap;letter-spacing:1px;">
                    📜 A. TESTAMENTO (${historiasAT.length})
                </button>
                <button onclick="kidsState.categoriaFiltro='NT';renderModuloNinos()"
                    style="background:${kidsState.categoriaFiltro === 'NT' ? '#fff' : 'rgba(255,255,255,0.15)'};color:${kidsState.categoriaFiltro === 'NT' ? '#e84393' : '#fff'};
                    border:none;padding:10px 20px;border-radius:25px;font-weight:900;font-size:0.8rem;cursor:pointer;white-space:nowrap;letter-spacing:1px;">
                    ✝️ N. TESTAMENTO (${historiasNT.length})
                </button>
            </div>

            <!-- GRID DE HISTORIAS -->
            <div style="padding:0 20px;">
                <div style="display:grid;gap:14px;">
                    ${historiasFiltradas.map((h, i) => {
        const realIdx = HISTORIAS_NINOS.indexOf(h);
        return `
                        <div onclick="iniciarCinema(${realIdx})" style="
                            background: ${h.cssGradient};
                            border-radius:22px;padding:18px;cursor:pointer;
                            transition:0.3s;display:flex;align-items:center;gap:16px;
                            border:2px solid rgba(255,255,255,0.2);
                            box-shadow:0 6px 20px rgba(0,0,0,0.2);
                            position:relative;overflow:hidden;min-height:80px;
                        " onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform='scale(1)'" ontouchstart="this.style.transform='scale(0.97)'" ontouchend="this.style.transform='scale(1)'">
                            <!-- Emoji grande decorativo -->
                            <div style="position:absolute;right:-10px;top:-10px;font-size:4rem;opacity:0.12;pointer-events:none;">${h.cssEmoji ? h.cssEmoji.split('').slice(0, 2).join('') : h.emoji}</div>

                            <!-- Icono -->
                            <div style="width:60px;height:60px;border-radius:18px;background:rgba(0,0,0,0.2);
                                display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;
                                border:2px solid rgba(255,255,255,0.3);">
                                ${h.emoji}
                            </div>

                            <!-- Info -->
                            <div style="flex:1;min-width:0;">
                                <h3 style="color:#fff;font-size:0.95rem;font-weight:900;margin:0 0 4px;text-shadow:0 1px 4px rgba(0,0,0,0.3);">${h.titulo}</h3>
                                <p style="color:rgba(255,255,255,0.7);font-size:0.72rem;margin:0;">${h.versiculo.ref}</p>
                            </div>

                            <!-- Play -->
                            <div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.2);
                                display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;
                                backdrop-filter:blur(5px);">
                                ▶
                            </div>
                        </div>`;
    }).join('')}
                </div>
            </div>

            <!-- BOTÓN HISTORIA ALEATORIA -->
            <div style="margin:25px 20px 0;text-align:center;">
                <button onclick="iniciarCinema(Math.floor(Math.random()*HISTORIAS_NINOS.length))" style="
                    background:linear-gradient(135deg,#f9ca24,#f0932b);color:#fff;border:none;
                    padding:16px 35px;border-radius:30px;font-size:1rem;font-weight:900;cursor:pointer;
                    box-shadow:0 8px 25px rgba(249,202,36,0.4);letter-spacing:1px;width:100%;">
                    🎲 ¡HISTORIA SORPRESA! 🎬
                </button>
            </div>
        </div>
    `;

    // Sincronizar estrellas
    if (kidsState.cargandoNube) {
        cargarEstrellasNinos().then(stars => {
            kidsState.estrellasTotales = stars;
            kidsState.cargandoNube = false;
            const el = document.getElementById('stars-count');
            if (el) el.innerText = stars;
        });
    }
}

// ══════════════════════════════════════════
// 🎬 MODO CINEMA — INICIAR
// ══════════════════════════════════════════
function iniciarCinema(idx) {
    kidsState.historiaActual = idx;
    kidsState.paginaCuento = 0;
    kidsState.cinemaActivo = true;
    kidsState.cinemaPausado = false;
    renderCinema();
}

function detenerCinema() {
    kidsState.cinemaActivo = false;
    kidsState.cinemaPausado = false;
    kidsState.vozHablando = false;
    if (kidsState.cinemaTimer) clearTimeout(kidsState.cinemaTimer);
    kidsState.cinemaTimer = null;
    window.speechSynthesis.cancel();
    const overlay = document.getElementById('cinema-overlay');
    if (overlay) overlay.remove();
}

// ══════════════════════════════════════════
// 🎬 RENDER CINEMA
// ══════════════════════════════════════════
function renderCinema() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const pag = kidsState.paginaCuento;
    const total = h.cuento.length;
    const progreso = ((pag + 1) / total) * 100;

    // Eliminar overlay anterior
    let overlay = document.getElementById('cinema-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'cinema-overlay';
        overlay.className = 'cinema-overlay';
        document.body.appendChild(overlay);
    }

    // Generar partículas decorativas
    const particulas = Array.from({ length: 8 }, (_, i) => {
        const emojis = ['✨', '⭐', '💫', '🌟', '✦', '☆', '✧', '🌙'];
        const left = Math.random() * 90 + 5;
        const delay = Math.random() * 4;
        const dur = 4 + Math.random() * 4;
        return `<div class="cinema-particle" style="
            left:${left}%; bottom:20%;
            font-size:${0.8 + Math.random() * 0.8}rem;
            animation-delay:${delay}s;
            animation-duration:${dur}s;
        ">${emojis[i]}</div>`;
    }).join('');

    // Determinar fondo visual — usa imagen por escena si existe
    let fondoVisual = '';
    const imagenEscena = (h.imagenes && h.imagenes[pag]) ? h.imagenes[pag] : h.imagen;
    if (imagenEscena) {
        fondoVisual = `
            <div class="cinema-image-container">
                <img src="${imagenEscena}" alt="${h.titulo} - Escena ${pag + 1}">
            </div>
        `;
    } else {
        fondoVisual = `
            <div style="position:absolute;inset:0;background:${h.cssGradient};"></div>
        `;
    }

    overlay.innerHTML = `
        <!-- TOP BAR -->
        <div class="cinema-topbar">
            <button onclick="detenerCinema();renderModuloNinos();">✕ Salir</button>
            <div class="cinema-title">🎬 ESCENA ${pag + 1} DE ${total}</div>
            <div style="background:rgba(255,215,0,0.2);border:2px solid gold;border-radius:15px;padding:4px 12px;color:gold;font-weight:900;font-size:0.8rem;">
                ⭐ ${kidsState.estrellasTotales}
            </div>
        </div>

        <!-- VISUAL AREA -->
        <div class="cinema-visual" style="flex:1;">
            ${fondoVisual}
            <div class="cinema-bg-art">${h.cssEmoji || h.emoji}</div>
            <div class="cinema-gradient-overlay"></div>
            ${particulas}

            <!-- TEXT -->
            <div class="cinema-text-area">
                <div class="cinema-scene-indicator">${h.emoji} ${h.titulo.toUpperCase()}</div>
                <div class="cinema-text" id="cinema-typewriter">${h.cuento[pag]}</div>
            </div>
        </div>

        <!-- VERSE CARD -->
        <div class="cinema-verse-card">
            <div class="label">📖 TESORO BÍBLICO</div>
            <div class="text">"${h.versiculo.texto}"</div>
            <div class="ref" style="color:${h.color};">— ${h.versiculo.ref}</div>
        </div>

        <!-- BOTÓN ESCUCHAR / DEJAR DE ESCUCHAR (GRANDE Y VISIBLE) -->
        <div style="padding:8px 18px 0;background:rgba(0,0,0,0.6);z-index:3;position:relative;">
            <button onclick="toggleNarrarCinema()" id="btn-escuchar-cinema" style="
                width:100%;padding:14px 20px;border:none;border-radius:16px;cursor:pointer;
                background:${kidsState.narrandoActivo ? 'linear-gradient(135deg,#e74c3c,#c0392b)' : 'linear-gradient(135deg,#f9ca24,#f0932b)'};
                color:#fff;font-size:1.1rem;font-weight:900;letter-spacing:1px;
                display:flex;align-items:center;justify-content:center;gap:10px;
                box-shadow:0 4px 15px ${kidsState.narrandoActivo ? 'rgba(231,76,60,0.5)' : 'rgba(249,202,36,0.5)'};
                animation:pulse 2s infinite;
            ">${kidsState.narrandoActivo ? '🔇 DEJAR DE ESCUCHAR' : '🔊 ESCUCHAR HISTORIA'}</button>
        </div>

        <!-- CONTROLS -->
        <div class="cinema-controls">
            <div class="cinema-progress-bar" onclick="event.stopPropagation();">
                <div class="cinema-progress-fill" style="width:${progreso}%;background:linear-gradient(90deg,${h.color},${h.colorOscuro});"></div>
            </div>
            <div class="cinema-btn-row">
                <div style="display:flex;gap:5px;align-items:center;">
                    <button onclick="cinemaAnterior()" ${pag === 0 ? 'style="opacity:0.3"' : ''}>⏮️</button>
                    <button onclick="toggleCinemaPausa()" id="cinema-play-btn">${kidsState.cinemaPausado ? '▶️' : '⏸️'}</button>
                    <button onclick="cinemaSiguiente()">⏭️</button>
                </div>
                <div class="cinema-timer">${pag + 1} / ${total}</div>
                <div style="display:flex;gap:5px;align-items:center;">
                    <button onclick="toggleNarrarCinema()" title="${kidsState.narrandoActivo ? 'Detener narración' : 'Escuchar'}" style="font-size:1.5rem;">${kidsState.narrandoActivo ? '🔇' : '🔊'}</button>
                </div>
            </div>
        </div>
    `;

    // Efecto typewriter
    typewriterCinema(h.cuento[pag]);

    // Si la narración está activa, iniciar automáticamente
    if (kidsState.narrandoActivo) {
        cinema_narrar_escena();
    } else if (!kidsState.cinemaPausado) {
        // Si no hay narración, usar auto-advance por tiempo
        programarAutoAdvance();
    }
}

// ── TYPEWRITER ──
function typewriterCinema(texto) {
    const el = document.getElementById('cinema-typewriter');
    if (!el) return;
    el.innerHTML = '';
    let i = 0;
    const velocidad = 35; // ms por carácter

    function escribir() {
        if (!kidsState.cinemaActivo) return;
        if (i < texto.length) {
            el.innerHTML = texto.substring(0, i + 1) + '<span class="typewriter-cursor"></span>';
            i++;
            setTimeout(escribir, velocidad);
        } else {
            el.innerHTML = texto; // Quitar cursor al final
        }
    }
    escribir();
}

// ══════════════════════════════════════════
// 🔊 SISTEMA DE NARRACIÓN INTELIGENTE
// ══════════════════════════════════════════

// Limpiar texto de emojis para la voz + añadir pausas naturales
function limpiarTextoParaVoz(texto) {
    let limpio = texto.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1FFFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]+/gu, '').trim();
    // Limpiar prefijos de DÍA (ya que la voz los lee raro)
    limpio = limpio.replace(/^DÍA \d+:\s*/i, '');
    // Añadir pausas naturales convertiendo ! y . en pausas más largas
    limpio = limpio.replace(/!/g, '... ');
    limpio = limpio.replace(/\.\.\./g, ',,,');
    return limpio;
}

// Buscar la mejor voz NATURAL para niños en español
function obtenerVozInfantil() {
    const voces = window.speechSynthesis.getVoices();
    if (!voces.length) return null;

    // Prioridad ESTRICTA: voces más naturales primero
    const prioridad = [
        // 1. Voces Google (las más naturales en Android/Chrome)
        v => v.lang.startsWith('es') && v.name.includes('Google') && v.name.includes('español'),
        v => v.lang.startsWith('es') && v.name.includes('Google'),
        // 2. Voces Microsoft Neural (Windows 10/11 — suenan muy bien)
        v => v.lang.startsWith('es') && v.name.toLowerCase().includes('neural'),
        v => v.lang.startsWith('es') && v.name.toLowerCase().includes('elvira'),
        v => v.lang.startsWith('es') && v.name.toLowerCase().includes('sabina'),
        v => v.lang.startsWith('es') && v.name.toLowerCase().includes('dalia'),
        v => v.lang.startsWith('es') && v.name.toLowerCase().includes('helena'),
        // 3. Cualquier voz femenina en español
        v => v.lang.startsWith('es') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('mujer')),
        // 4. Voces Microsoft genéricas
        v => v.lang.startsWith('es') && v.name.toLowerCase().includes('microsoft'),
        // 5. Cualquier voz en español latinoaméricano (suena más cercana)
        v => v.lang === 'es-MX' || v.lang === 'es-419',
        v => v.lang === 'es-US',
        // 6. Cualquier español
        v => v.lang.startsWith('es')
    ];

    for (const filtro of prioridad) {
        const voz = voces.find(filtro);
        if (voz) {
            console.log('[CINEMA-VOZ] Usando:', voz.name, voz.lang);
            return voz;
        }
    }
    return null;
}

// Toggle narración: ESCUCHAR / DEJAR DE ESCUCHAR
function toggleNarrarCinema() {
    if (kidsState.narrandoActivo) {
        // DESACTIVAR narración
        kidsState.narrandoActivo = false;
        kidsState.vozHablando = false;
        window.speechSynthesis.cancel();
        // Actualizar botón
        actualizarBotonEscuchar();
        // Reanudar auto-advance por tiempo
        if (!kidsState.cinemaPausado) {
            programarAutoAdvance();
        }
    } else {
        // ACTIVAR narración
        kidsState.narrandoActivo = true;
        // Cancelar auto-advance por tiempo
        if (kidsState.cinemaTimer) clearTimeout(kidsState.cinemaTimer);
        // Actualizar botón
        actualizarBotonEscuchar();
        // Iniciar narración de la escena actual
        cinema_narrar_escena();
    }
}

// Actualizar visualmente el botón de escuchar
function actualizarBotonEscuchar() {
    const btn = document.getElementById('btn-escuchar-cinema');
    if (!btn) return;
    if (kidsState.narrandoActivo) {
        btn.style.background = 'linear-gradient(135deg,#e74c3c,#c0392b)';
        btn.style.boxShadow = '0 4px 15px rgba(231,76,60,0.5)';
        btn.innerHTML = '🔇 DEJAR DE ESCUCHAR';
    } else {
        btn.style.background = 'linear-gradient(135deg,#f9ca24,#f0932b)';
        btn.style.boxShadow = '0 4px 15px rgba(249,202,36,0.5)';
        btn.innerHTML = '🔊 ESCUCHAR HISTORIA';
    }
}

// Narrar la escena actual con voz amigable para niños
function cinema_narrar_escena() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    if (!h || !kidsState.cinemaActivo) return;

    window.speechSynthesis.cancel();
    kidsState.vozHablando = true;

    const textoLimpio = limpiarTextoParaVoz(h.cuento[kidsState.paginaCuento]);
    const msg = new SpeechSynthesisUtterance(textoLimpio);

    // Configurar voz amigable para niños
    const vozInfantil = obtenerVozInfantil();
    if (vozInfantil) msg.voice = vozInfantil;
    msg.lang = 'es-ES';
    msg.rate = 0.8;   // Lento y claro para niños
    msg.pitch = 1.2;  // Tono alto, más alegre
    msg.volume = 1.0;

    // Cuando TERMINA de hablar → avanzar a siguiente escena
    msg.onend = function () {
        kidsState.vozHablando = false;
        if (!kidsState.cinemaActivo || kidsState.cinemaPausado) return;
        if (kidsState.narrandoActivo) {
            // Pausa de 2 segundos antes de avanzar (para que no sea brusco)
            kidsState.cinemaTimer = setTimeout(() => {
                if (!kidsState.cinemaActivo || kidsState.cinemaPausado) return;
                cinemaSiguiente();
            }, 2000);
        }
    };

    // Si hay error en la voz, continuar sin bloquear
    msg.onerror = function () {
        kidsState.vozHablando = false;
        if (kidsState.narrandoActivo && !kidsState.cinemaPausado) {
            programarAutoAdvance();
        }
    };

    window.speechSynthesis.speak(msg);
}

// Función legacy compatible
function cinema_narrar() {
    if (!kidsState.narrandoActivo) {
        toggleNarrarCinema();
    } else {
        cinema_narrar_escena();
    }
}

// ── AUTO ADVANCE (solo cuando NO hay narración activa) ──
function programarAutoAdvance() {
    if (kidsState.cinemaTimer) clearTimeout(kidsState.cinemaTimer);
    // Si la narración está activa, NO usar auto-advance por tiempo
    if (kidsState.narrandoActivo) return;

    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const textoActual = h.cuento[kidsState.paginaCuento];
    // Tiempo = largo del texto * 60ms + 3 segundos de pausa
    const tiempoMs = textoActual.length * 60 + 3000;

    kidsState.cinemaTimer = setTimeout(() => {
        if (!kidsState.cinemaActivo || kidsState.cinemaPausado) return;
        cinemaSiguiente();
    }, tiempoMs);
}

// ── CONTROLES ──
function cinemaSiguiente() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    // Solo cancelar voz si NO estamos en modo narración
    if (!kidsState.narrandoActivo) {
        window.speechSynthesis.cancel();
    } else {
        // En modo narración, la voz se detiene suavemente
        window.speechSynthesis.cancel();
        kidsState.vozHablando = false;
    }
    if (kidsState.paginaCuento < h.cuento.length - 1) {
        kidsState.paginaCuento++;
        renderCinema();
    } else {
        // Fin → mostrar lección y trivia
        kidsState.narrandoActivo = false;
        window.speechSynthesis.cancel();
        renderCinemaFinal();
    }
}

function cinemaAnterior() {
    window.speechSynthesis.cancel();
    kidsState.vozHablando = false;
    if (kidsState.paginaCuento > 0) {
        kidsState.paginaCuento--;
        renderCinema();
    }
}

function toggleCinemaPausa() {
    kidsState.cinemaPausado = !kidsState.cinemaPausado;
    const btn = document.getElementById('cinema-play-btn');
    if (btn) btn.textContent = kidsState.cinemaPausado ? '▶️' : '⏸️';

    if (kidsState.cinemaPausado) {
        // Pausar: detener narración y timer
        if (kidsState.cinemaTimer) clearTimeout(kidsState.cinemaTimer);
        if (kidsState.narrandoActivo) {
            window.speechSynthesis.cancel();
            kidsState.vozHablando = false;
        }
    } else {
        // Reanudar
        if (kidsState.narrandoActivo) {
            cinema_narrar_escena();
        } else {
            programarAutoAdvance();
        }
    }
}

// ══════════════════════════════════════════
// 🎬 PANTALLA FINAL (LECCIÓN + TRIVIA)
// ══════════════════════════════════════════
function renderCinemaFinal() {
    if (kidsState.cinemaTimer) clearTimeout(kidsState.cinemaTimer);
    const h = HISTORIAS_NINOS[kidsState.historiaActual];

    const overlay = document.getElementById('cinema-overlay');
    if (!overlay) return;

    let fondoVisual = '';
    if (h.imagen) {
        fondoVisual = `<div class="cinema-image-container"><img src="${h.imagen}" alt="${h.titulo}"></div>`;
    } else {
        fondoVisual = `<div style="position:absolute;inset:0;background:${h.cssGradient};"></div>`;
    }

    overlay.innerHTML = `
        <div class="cinema-topbar">
            <button onclick="detenerCinema();renderModuloNinos();">✕ Salir</button>
            <div class="cinema-title">🏆 ¡HISTORIA COMPLETA!</div>
            <div style="background:rgba(255,215,0,0.2);border:2px solid gold;border-radius:15px;padding:4px 12px;color:gold;font-weight:900;font-size:0.8rem;">
                ⭐ ${kidsState.estrellasTotales}
            </div>
        </div>

        <div class="cinema-visual" style="flex:1;">
            ${fondoVisual}
            <div class="cinema-bg-art">${h.emoji}</div>
            <div class="cinema-gradient-overlay"></div>

            <div style="position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;padding:20px;overflow-y:auto;">
                <div class="cinema-lesson-card">
                    <div style="font-size:3rem;margin-bottom:5px;">${h.emoji}</div>
                    <h3 style="color:#fff;">${h.titulo}</h3>
                    <div style="height:1px;background:rgba(255,255,255,0.15);margin:15px 0;"></div>
                    <div style="font-size:0.65rem;letter-spacing:3px;color:rgba(255,255,255,0.4);margin-bottom:10px;">💡 LECCIÓN APRENDIDA</div>
                    <p>${h.leccion}</p>
                    <button class="cinema-trivia-btn" onclick="renderCinemaTrivia()">
                        🎮 ¡TRIVIA — GANA ESTRELLAS! ⭐
                    </button>
                    <button onclick="detenerCinema();renderModuloNinos();" style="
                        background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);
                        padding:12px;border-radius:20px;font-weight:700;cursor:pointer;width:100%;margin-top:10px;font-size:0.85rem;">
                        ← Volver a Historias
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ══════════════════════════════════════════
// 🎮 TRIVIA EN MODO CINEMA (5 PREGUNTAS)
// ══════════════════════════════════════════
function renderCinemaTrivia() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const overlay = document.getElementById('cinema-overlay');
    if (!overlay) return;

    // Inicializar estado de trivia
    if (typeof kidsState.triviaActual === 'undefined' || kidsState.triviaActual === null) {
        kidsState.triviaActual = 0;
        kidsState.triviaAciertos = 0;
        kidsState.triviaRespondida = false;
    }

    // Compatibilidad: si miniJuego es objeto simple (legacy), convertir a array
    const preguntas = Array.isArray(h.miniJuego) ? h.miniJuego : [h.miniJuego];
    const pregActual = preguntas[kidsState.triviaActual];
    const totalPreg = preguntas.length;

    overlay.innerHTML = `
        <div class="cinema-topbar">
            <button onclick="renderCinemaFinal()">← Atrás</button>
            <div class="cinema-title">🧠 PREGUNTA ${kidsState.triviaActual + 1} DE ${totalPreg}</div>
            <div style="background:rgba(255,215,0,0.2);border:2px solid gold;border-radius:15px;padding:4px 12px;color:gold;font-weight:900;font-size:0.8rem;">
                ⭐ ${kidsState.estrellasTotales}
            </div>
        </div>

        <div style="flex:1;position:relative;">
            <div style="position:absolute;inset:0;background:${h.cssGradient};"></div>
            <div class="cinema-gradient-overlay"></div>

            <div class="cinema-trivia-container">
                <!-- Barra de progreso de preguntas -->
                <div style="display:flex;gap:6px;margin-bottom:20px;width:100%;max-width:500px;">
                    ${preguntas.map((_, i) => `
                        <div style="flex:1;height:6px;border-radius:3px;background:${i < kidsState.triviaActual ? '#2ed573' : (i === kidsState.triviaActual ? '#f9ca24' : 'rgba(255,255,255,0.2)')};transition:0.3s;"></div>
                    `).join('')}
                </div>

                <!-- Marcador de aciertos -->
                <div style="background:rgba(0,0,0,0.3);border-radius:20px;padding:6px 16px;margin-bottom:15px;color:#fff;font-size:0.8rem;font-weight:700;">
                    ✅ ${kidsState.triviaAciertos} aciertos de ${kidsState.triviaActual}
                </div>

                <div class="cinema-trivia-card">
                    <div style="font-size:3rem;text-align:center;margin-bottom:12px;">🤔</div>
                    <h2 style="color:${h.colorOscuro};font-size:1.15rem;font-weight:900;margin-bottom:20px;text-align:center;line-height:1.4;">
                        ${pregActual.pregunta}
                    </h2>
                    <div style="display:grid;gap:10px;" id="trivia-opciones">
                        ${pregActual.opciones.map((opt, i) => `
                            <button class="cinema-trivia-option" id="trivia-opt-${i}" onclick="responderCinemaTrivia(${i})"
                                style="border-color:${h.color}22;"
                                onmousedown="this.style.transform='scale(0.97)'"
                                onmouseup="this.style.transform='scale(1)'">${opt}</button>
                        `).join('')}
                    </div>
                    <div id="cinema-trivia-resultado" style="margin-top:18px;"></div>
                </div>
            </div>
        </div>
    `;
}

function responderCinemaTrivia(idx) {
    if (kidsState.triviaRespondida) return; // Evitar doble respuesta
    kidsState.triviaRespondida = true;

    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const preguntas = Array.isArray(h.miniJuego) ? h.miniJuego : [h.miniJuego];
    const pregActual = preguntas[kidsState.triviaActual];
    const esCorrecta = idx === pregActual.correcta;
    const totalPreg = preguntas.length;

    if (esCorrecta) {
        kidsState.triviaAciertos++;
    }

    // Colorear opciones: verde la correcta, roja la incorrecta
    pregActual.opciones.forEach((_, i) => {
        const btn = document.getElementById('trivia-opt-' + i);
        if (!btn) return;
        btn.onclick = null;
        btn.style.cursor = 'default';
        if (i === pregActual.correcta) {
            btn.style.background = '#2ed573';
            btn.style.color = '#fff';
            btn.style.borderColor = '#2ed573';
            btn.style.fontWeight = '900';
        } else if (i === idx && !esCorrecta) {
            btn.style.background = '#ff4757';
            btn.style.color = '#fff';
            btn.style.borderColor = '#ff4757';
        } else {
            btn.style.opacity = '0.4';
        }
    });

    const res = document.getElementById('cinema-trivia-resultado');
    const esUltima = kidsState.triviaActual >= totalPreg - 1;

    res.innerHTML = `
        <div style="animation:cinemaFadeIn 0.4s ease-out;text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:6px;">${esCorrecta ? '✅' : '❌'}</div>
            <p style="color:${esCorrecta ? '#2ed573' : '#ff4757'};font-weight:900;font-size:1rem;margin-bottom:12px;">
                ${esCorrecta ? '¡Correcto!' : '¡Respuesta incorrecta!'}
            </p>
            <button onclick="${esUltima ? 'mostrarResultadoFinalTrivia()' : 'siguientePreguntaTrivia()'}" style="
                background:linear-gradient(135deg,${h.color},${h.colorOscuro});color:#fff;border:none;
                padding:14px 30px;border-radius:20px;font-weight:900;cursor:pointer;width:100%;
                font-size:0.95rem;box-shadow:0 4px 15px rgba(0,0,0,0.2);margin-top:5px;">
                ${esUltima ? '🏆 VER RESULTADO FINAL' : '➡️ SIGUIENTE PREGUNTA'}
            </button>
        </div>
    `;
}

function siguientePreguntaTrivia() {
    kidsState.triviaActual++;
    kidsState.triviaRespondida = false;
    renderCinemaTrivia();
}

function mostrarResultadoFinalTrivia() {
    const h = HISTORIAS_NINOS[kidsState.historiaActual];
    const preguntas = Array.isArray(h.miniJuego) ? h.miniJuego : [h.miniJuego];
    const total = preguntas.length;
    const aciertos = kidsState.triviaAciertos;
    const estrellas = aciertos; // 1 estrella por acierto

    // Guardar estrellas
    kidsState.estrellasTotales += estrellas;
    if (typeof guardarEstrellasNinos === 'function') guardarEstrellasNinos(kidsState.estrellasTotales);
    if (typeof guardarPuntajeFirebase === 'function') guardarPuntajeFirebase('Niños - Cinema', estrellas, { historia: h.titulo });

    const porcentaje = Math.round((aciertos / total) * 100);
    let emoji, mensaje;
    if (porcentaje === 100) { emoji = '🏆'; mensaje = '¡PERFECTO! ¡Eres un campeón bíblico!'; }
    else if (porcentaje >= 80) { emoji = '🌟'; mensaje = '¡Excelente! ¡Casi perfecto!'; }
    else if (porcentaje >= 60) { emoji = '👏'; mensaje = '¡Muy bien! ¡Sigue aprendiendo!'; }
    else if (porcentaje >= 40) { emoji = '💪'; mensaje = '¡Buen esfuerzo! Puedes mejorar.'; }
    else { emoji = '📖'; mensaje = '¡Lee la historia otra vez y vuelve a intentar!'; }

    const overlay = document.getElementById('cinema-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="cinema-topbar">
            <button onclick="detenerCinema();renderModuloNinos();">✕ Salir</button>
            <div class="cinema-title">🏆 RESULTADO</div>
            <div style="background:rgba(255,215,0,0.2);border:2px solid gold;border-radius:15px;padding:4px 12px;color:gold;font-weight:900;font-size:0.8rem;">
                ⭐ ${kidsState.estrellasTotales}
            </div>
        </div>

        <div style="flex:1;position:relative;">
            <div style="position:absolute;inset:0;background:${h.cssGradient};"></div>
            <div class="cinema-gradient-overlay"></div>

            <div class="cinema-trivia-container">
                <div class="cinema-trivia-card" style="text-align:center;">
                    <div style="font-size:4rem;margin-bottom:10px;">${emoji}</div>
                    <h2 style="color:${h.colorOscuro};font-size:1.4rem;font-weight:900;margin-bottom:8px;">
                        ${h.titulo}
                    </h2>
                    <p style="color:#666;font-size:0.9rem;margin-bottom:20px;">${mensaje}</p>

                    <!-- Resultado visual -->
                    <div style="background:linear-gradient(135deg,${h.color}15,${h.color}25);border-radius:20px;padding:20px;margin-bottom:20px;">
                        <div style="font-size:2.5rem;font-weight:900;color:${h.colorOscuro};">
                            ${aciertos} / ${total}
                        </div>
                        <div style="font-size:0.8rem;color:#999;margin-top:4px;">RESPUESTAS CORRECTAS</div>
                        <div style="margin-top:12px;font-size:1.8rem;">
                            ${'⭐'.repeat(estrellas)}${'☆'.repeat(total - estrellas)}
                        </div>
                        <div style="font-size:0.75rem;color:${h.color};font-weight:700;margin-top:4px;">
                            +${estrellas} estrellas ganadas
                        </div>
                    </div>

                    <button onclick="detenerCinema();renderModuloNinos();" style="
                        background:linear-gradient(135deg,${h.color},${h.colorOscuro});color:#fff;border:none;
                        padding:16px 30px;border-radius:25px;font-weight:900;cursor:pointer;width:100%;
                        font-size:1rem;box-shadow:0 8px 25px rgba(0,0,0,0.2);letter-spacing:1px;">
                        🎬 ¡VER MÁS HISTORIAS!
                    </button>
                    <button onclick="kidsState.triviaActual=0;kidsState.triviaAciertos=0;kidsState.triviaRespondida=false;renderCinemaTrivia();" style="
                        background:rgba(0,0,0,0.05);color:${h.colorOscuro};border:2px solid ${h.color}30;
                        padding:12px;border-radius:20px;font-weight:700;cursor:pointer;width:100%;
                        margin-top:10px;font-size:0.85rem;">
                        🔄 Repetir Trivia
                    </button>
                </div>
            </div>
        </div>
    `;

    // Resetear estado de trivia
    kidsState.triviaActual = null;
    kidsState.triviaAciertos = 0;
    kidsState.triviaRespondida = false;
}

// ── Funciones auxiliares compatibles ──
function leerVersiculo(texto) {
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'es-ES';
    window.speechSynthesis.speak(msg);
}

function abrirHistoria(idx) { iniciarCinema(idx); }
function renderJuegoNiños() { renderCinemaTrivia(); }
function leerTextoActual() { cinema_narrar(); }
function cambiarPagina(d) { if (d > 0) cinemaSiguiente(); else cinemaAnterior(); }
function responderJuegoNinos(idx) { responderCinemaTrivia(idx); }

