// ==========================================
// 🔐 TEEN AUTH ENGINE v1.0 — LEGADO BÍBLICO
// Sistema de usuarios para Adolescentes
// Director: Jose | Proyecto: Stone Oak SDA
// ==========================================

const TEEN_AUTH = {
    CLAVE_DIRECTOR: 'LEGADO2025',  // Código secreto del director
    usuarioActual: null,

    // ── Verificar si hay sesión activa ──
    obtenerSesion() {
        const s = localStorage.getItem('teen_sesion');
        if (s) {
            this.usuarioActual = JSON.parse(s);
            return this.usuarioActual;
        }
        return null;
    },

    // ── Guardar sesión ──
    guardarSesion(usuario) {
        this.usuarioActual = usuario;
        localStorage.setItem('teen_sesion', JSON.stringify(usuario));
    },

    // ── Cerrar sesión ──
    cerrarSesion() {
        this.usuarioActual = null;
        localStorage.removeItem('teen_sesion');
    }
};

// ==========================================
// PANTALLA DE INICIO DE SESIÓN TEEN
// ==========================================
function renderLoginTeen(callback) {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0020,#1a0035,#0a0818);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 20px;font-family:'Segoe UI',sans-serif;">

            <div style="font-size:3rem;margin-bottom:10px;">📖</div>
            <h1 style="color:#a29bfe;font-size:1.3rem;font-weight:900;letter-spacing:2px;margin:0 0 4px;">LEGADO BÍBLICO</h1>
            <p style="color:rgba(255,255,255,0.4);font-size:0.72rem;letter-spacing:3px;margin:0 0 32px;">ZONA ADOLESCENTES</p>

            <!-- TABS -->
            <div style="display:flex;gap:0;width:100%;max-width:340px;margin-bottom:24px;border-radius:12px;overflow:hidden;border:1px solid rgba(162,155,254,0.2);">
                <button id="tab-entrar" onclick="switchAuthTab('entrar')"
                    style="flex:1;padding:12px;background:rgba(162,155,254,0.15);border:none;color:#a29bfe;font-weight:900;font-size:0.82rem;cursor:pointer;letter-spacing:1px;">
                    ENTRAR
                </button>
                <button id="tab-nuevo" onclick="switchAuthTab('nuevo')"
                    style="flex:1;padding:12px;background:rgba(255,255,255,0.03);border:none;color:rgba(255,255,255,0.4);font-weight:900;font-size:0.82rem;cursor:pointer;letter-spacing:1px;">
                    CREAR CUENTA
                </button>
            </div>

            <!-- FORM ENTRAR -->
            <div id="form-entrar" style="width:100%;max-width:340px;">
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(162,155,254,0.18);border-radius:16px;padding:24px;">
                    <div style="margin-bottom:16px;">
                        <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.65rem;letter-spacing:2px;margin-bottom:8px;">TU NOMBRE</label>
                        <input id="login-nombre" type="text" placeholder="¿Cómo te llamas?"
                            style="width:100%;padding:14px 16px;background:rgba(0,0,0,0.3);border:1px solid rgba(162,155,254,0.2);border-radius:10px;color:#fff;font-size:0.92rem;font-family:'Segoe UI',sans-serif;box-sizing:border-box;outline:none;"
                            onfocus="this.style.borderColor='rgba(162,155,254,0.6)'"
                            onblur="this.style.borderColor='rgba(162,155,254,0.2)'" />
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.65rem;letter-spacing:2px;margin-bottom:8px;">TU PIN (4 dígitos)</label>
                        <input id="login-pin" type="password" maxlength="4" placeholder="• • • •" inputmode="numeric"
                            style="width:100%;padding:14px 16px;background:rgba(0,0,0,0.3);border:1px solid rgba(162,155,254,0.2);border-radius:10px;color:#fff;font-size:1.4rem;font-family:'Segoe UI',sans-serif;box-sizing:border-box;outline:none;text-align:center;letter-spacing:8px;"
                            onfocus="this.style.borderColor='rgba(162,155,254,0.6)'"
                            onblur="this.style.borderColor='rgba(162,155,254,0.2)'" />
                    </div>
                    <button onclick="loginTeen()" style="width:100%;padding:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;border-radius:12px;color:#fff;font-weight:900;font-size:0.95rem;cursor:pointer;letter-spacing:1px;">
                        ✨ ENTRAR
                    </button>
                </div>
                <button onclick="loginDirector()" style="width:100%;margin-top:12px;padding:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:rgba(255,255,255,0.3);font-size:0.7rem;cursor:pointer;font-family:'Segoe UI',sans-serif;">
                    🔐 Acceso Director
                </button>
            </div>

            <!-- FORM NUEVO USUARIO -->
            <div id="form-nuevo" style="width:100%;max-width:340px;display:none;">
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,206,201,0.2);border-radius:16px;padding:24px;">
                    <div style="margin-bottom:14px;">
                        <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.65rem;letter-spacing:2px;margin-bottom:8px;">TU NOMBRE COMPLETO</label>
                        <input id="reg-nombre" type="text" placeholder="Escribe tu nombre"
                            style="width:100%;padding:14px 16px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,206,201,0.2);border-radius:10px;color:#fff;font-size:0.92rem;font-family:'Segoe UI',sans-serif;box-sizing:border-box;outline:none;"
                            onfocus="this.style.borderColor='rgba(0,206,201,0.6)'"
                            onblur="this.style.borderColor='rgba(0,206,201,0.2)'" />
                    </div>
                    <div style="margin-bottom:14px;">
                        <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.65rem;letter-spacing:2px;margin-bottom:8px;">EDAD</label>
                        <select id="reg-edad" style="width:100%;padding:14px 16px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,206,201,0.2);border-radius:10px;color:#fff;font-size:0.88rem;font-family:'Segoe UI',sans-serif;box-sizing:border-box;outline:none;">
                            <option value="">-- Selecciona tu edad --</option>
                            ${[10, 11, 12, 13, 14, 15, 16, 17, 18].map(e => `<option value="${e}">${e} años</option>`).join('')}
                        </select>
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.65rem;letter-spacing:2px;margin-bottom:8px;">CREA TU PIN (4 dígitos)</label>
                        <input id="reg-pin" type="password" maxlength="4" placeholder="• • • •" inputmode="numeric"
                            style="width:100%;padding:14px 16px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,206,201,0.2);border-radius:10px;color:#fff;font-size:1.4rem;font-family:'Segoe UI',sans-serif;box-sizing:border-box;outline:none;text-align:center;letter-spacing:8px;"
                            onfocus="this.style.borderColor='rgba(0,206,201,0.6)'"
                            onblur="this.style.borderColor='rgba(0,206,201,0.2)'" />
                        <p style="color:rgba(255,255,255,0.3);font-size:0.68rem;margin:6px 0 0;text-align:center;">⚠️ Recuerda tu PIN — lo necesitarás para entrar</p>
                    </div>
                    <button onclick="registrarTeen()" style="width:100%;padding:16px;background:linear-gradient(135deg,#00b894,#00cec9);border:none;border-radius:12px;color:#000;font-weight:900;font-size:0.95rem;cursor:pointer;letter-spacing:1px;">
                        🚀 CREAR MI CUENTA
                    </button>
                </div>
            </div>

            <div id="auth-mensaje" style="margin-top:16px;min-height:24px;font-size:0.8rem;text-align:center;font-weight:700;"></div>
        </div>
    `;

    // Guardar callback para después del login
    window._teenAuthCallback = callback;
}

function switchAuthTab(tab) {
    const entrar = document.getElementById('form-entrar');
    const nuevo = document.getElementById('form-nuevo');
    const tabE = document.getElementById('tab-entrar');
    const tabN = document.getElementById('tab-nuevo');

    if (tab === 'entrar') {
        entrar.style.display = 'block';
        nuevo.style.display = 'none';
        tabE.style.background = 'rgba(162,155,254,0.15)';
        tabE.style.color = '#a29bfe';
        tabN.style.background = 'rgba(255,255,255,0.03)';
        tabN.style.color = 'rgba(255,255,255,0.4)';
    } else {
        nuevo.style.display = 'block';
        entrar.style.display = 'none';
        tabN.style.background = 'rgba(0,206,201,0.15)';
        tabN.style.color = '#00cec9';
        tabE.style.background = 'rgba(255,255,255,0.03)';
        tabE.style.color = 'rgba(255,255,255,0.4)';
    }
}

function mostrarMsgAuth(msg, color = '#ff6b6b') {
    const el = document.getElementById('auth-mensaje');
    if (el) { el.textContent = msg; el.style.color = color; }
}

// ── LOGIN ──
async function loginTeen() {
    const nombre = document.getElementById('login-nombre').value.trim();
    const pin = document.getElementById('login-pin').value.trim();

    if (!nombre || pin.length !== 4) {
        mostrarMsgAuth('⚠️ Ingresa tu nombre y PIN de 4 dígitos');
        return;
    }

    mostrarMsgAuth('🔄 Verificando...', '#a29bfe');

    try {
        // Buscar usuario en Firestore
        const snap = await db.collection('teens')
            .where('nombre_lower', '==', nombre.toLowerCase())
            .where('pin', '==', pin)
            .limit(1)
            .get();

        if (snap.empty) {
            mostrarMsgAuth('❌ Nombre o PIN incorrecto');
            return;
        }

        const docData = snap.docs[0].data();
        const usuario = {
            id: snap.docs[0].id,
            nombre: docData.nombre,
            edad: docData.edad,
            puntosTotales: docData.puntosTotales || 0,
            avatar: docData.avatar || '🧑',
            esDirector: false
        };

        // Actualizar última conexión
        await db.collection('teens').doc(usuario.id).update({
            ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp()
        });

        TEEN_AUTH.guardarSesion(usuario);
        mostrarMsgAuth(`✅ ¡Bienvenido, ${usuario.nombre}!`, '#55efc4');

        setTimeout(() => {
            if (window._teenAuthCallback) window._teenAuthCallback(usuario);
            else renderModuloAdolescentes();
        }, 800);

    } catch (e) {
        console.warn('[Teen Auth] Error:', e);
        mostrarMsgAuth('⚠️ Sin conexión — intenta de nuevo');
    }
}

// ── REGISTRO ──
async function registrarTeen() {
    const nombre = document.getElementById('reg-nombre').value.trim();
    const edad = document.getElementById('reg-edad').value;
    const pin = document.getElementById('reg-pin').value.trim();

    if (!nombre || !edad || pin.length !== 4) {
        mostrarMsgAuth('⚠️ Completa todos los campos y asegúrate que el PIN tenga 4 dígitos');
        return;
    }

    if (!/^\d{4}$/.test(pin)) {
        mostrarMsgAuth('⚠️ El PIN solo puede tener números');
        return;
    }

    mostrarMsgAuth('🔄 Creando tu cuenta...', '#a29bfe');

    try {
        // Verificar si el nombre ya existe
        const existe = await db.collection('teens')
            .where('nombre_lower', '==', nombre.toLowerCase())
            .limit(1).get();

        if (!existe.empty) {
            mostrarMsgAuth('❌ Ese nombre ya está en uso — elige otro');
            return;
        }

        const AVATARES = ['🧑', '👦', '👧', '🧒', '😎', '🌟', '⚡', '🔥', '🦁', '🦅'];
        const avatar = AVATARES[Math.floor(Math.random() * AVATARES.length)];

        const docRef = await db.collection('teens').add({
            nombre: nombre,
            nombre_lower: nombre.toLowerCase(),
            edad: parseInt(edad),
            pin: pin,
            avatar: avatar,
            puntosTotales: 0,
            devocionales_leidos: [],
            valores_completados: [],
            doctrinas_vistas: [],
            notas: [],
            historial_trivia: [],
            fechaRegistro: firebase.firestore.FieldValue.serverTimestamp(),
            ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp()
        });

        const usuario = { id: docRef.id, nombre, edad: parseInt(edad), puntosTotales: 0, avatar, esDirector: false };
        TEEN_AUTH.guardarSesion(usuario);

        mostrarMsgAuth(`✅ ¡Cuenta creada! Bienvenido, ${nombre}!`, '#55efc4');
        setTimeout(() => {
            if (window._teenAuthCallback) window._teenAuthCallback(usuario);
            else renderModuloAdolescentes();
        }, 900);

    } catch (e) {
        console.warn('[Teen Auth] Error registro:', e);
        mostrarMsgAuth('⚠️ Error al crear cuenta — verifica tu conexión');
    }
}

// ── ACCESO DIRECTOR (sin contraseña) ──
function loginDirector() {
    TEEN_AUTH.guardarSesion({ esDirector: true, nombre: 'Director' });
    renderPanelDirector();
}

// ==========================================
// PANEL DEL DIRECTOR — VER TODOS LOS TEENS
// ==========================================
async function renderPanelDirector() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a1428,#0f2044,#0a1428);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(212,175,55,0.25);position:sticky;top:0;z-index:100;">
                <button onclick="cerrarSesionDirector()" style="background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.25);color:#ff6b6b;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:700;">← SALIR</button>
                <div style="text-align:center;">
                    <div style="color:rgba(212,175,55,0.6);font-size:0.58rem;letter-spacing:3px;">LEGADO BIBLICO</div>
                    <div style="color:#d4af37;font-weight:900;font-size:0.88rem;letter-spacing:2px;">PANEL DIRECTOR</div>
                </div>
                <button onclick="cargarTeens()" style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.25);color:#d4af37;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.72rem;font-weight:700;">ACTUALIZAR</button>
            </div>

            <div style="padding:20px;max-width:700px;margin:0 auto;">

                <!-- ENVIAR LINK -->
                <div style="background:linear-gradient(135deg,rgba(37,211,102,0.1),rgba(0,180,80,0.05));border:1px solid rgba(37,211,102,0.3);border-radius:16px;padding:18px;margin-bottom:16px;">
                    <div style="font-size:0.58rem;letter-spacing:3px;color:rgba(37,211,102,0.8);margin-bottom:8px;">ENVIAR APP A LOS ADOLESCENTES</div>
                    <p style="color:rgba(255,255,255,0.6);font-size:0.78rem;margin:0 0 12px;line-height:1.5;">Comparte este link para que descarguen la app, creen su cuenta y empiecen a usarla:</p>
                    <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;margin-bottom:12px;">
                        <span style="color:#55efc4;font-size:0.82rem;font-weight:700;">https://agendatecnicadigital.com</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        <button onclick="compartirLinkWhatsApp()" style="padding:13px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;border-radius:10px;color:#fff;font-weight:900;font-size:0.8rem;cursor:pointer;">📤 COMPARTIR</button>
                        <button onclick="copiarLinkTeen()" id="btn-copiar-link" style="padding:13px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-weight:900;font-size:0.8rem;cursor:pointer;">COPIAR LINK</button>
                    </div>
                </div>

                <!-- GUIA DE JUEGOS -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:18px;margin-bottom:16px;">
                    <div style="font-size:0.58rem;letter-spacing:3px;color:rgba(162,155,254,0.8);margin-bottom:14px;">TIPOS DE JUEGOS Y ACTIVIDADES</div>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;gap:12px;padding:11px;background:rgba(254,202,87,0.06);border-radius:10px;border-left:3px solid #feca57;">
                            <span style="font-size:1.3rem;flex-shrink:0;">⚡</span>
                            <div><div style="color:#feca57;font-weight:900;font-size:0.8rem;margin-bottom:2px;">TRIVIA RAPIDA</div><div style="color:rgba(255,255,255,0.45);font-size:0.7rem;line-height:1.4;">12 preguntas biblicas. Cada correcta = 100 pts. Tienen 3 vidas para responder.</div></div>
                        </div>
                        <div style="display:flex;gap:12px;padding:11px;background:rgba(85,239,196,0.06);border-radius:10px;border-left:3px solid #55efc4;">
                            <span style="font-size:1.3rem;flex-shrink:0;">📚</span>
                            <div><div style="color:#55efc4;font-weight:900;font-size:0.8rem;margin-bottom:2px;">TRIVIA POR LIBRO</div><div style="color:rgba(255,255,255,0.45);font-size:0.7rem;line-height:1.4;">Escogen un libro de la Biblia y rango de capitulos. Se generan preguntas de ese libro.</div></div>
                        </div>
                        <div style="display:flex;gap:12px;padding:11px;background:rgba(255,107,107,0.06);border-radius:10px;border-left:3px solid #ff6b6b;">
                            <span style="font-size:1.3rem;flex-shrink:0;">🆚</span>
                            <div><div style="color:#ff6b6b;font-weight:900;font-size:0.8rem;margin-bottom:2px;">MODO VERSUS (PVP)</div><div style="color:rgba(255,255,255,0.45);font-size:0.7rem;line-height:1.4;">Dos teens compiten en tiempo real. Uno crea la sala y comparte el codigo. El otro entra y juegan juntos.</div></div>
                        </div>
                        <div style="display:flex;gap:12px;padding:11px;background:rgba(0,206,201,0.06);border-radius:10px;border-left:3px solid #00cec9;">
                            <span style="font-size:1.3rem;flex-shrink:0;">⭐</span>
                            <div><div style="color:#00cec9;font-weight:900;font-size:0.8rem;margin-bottom:2px;">VALORES Y CONDUCTA</div><div style="color:rgba(255,255,255,0.45);font-size:0.7rem;line-height:1.4;">6 valores: Respeto, Integridad, Palabras, Humildad, Proposito, Mente Digital. Cada uno tiene un reto semanal.</div></div>
                        </div>
                        <div style="display:flex;gap:12px;padding:11px;background:rgba(253,121,168,0.06);border-radius:10px;border-left:3px solid #fd79a8;">
                            <span style="font-size:1.3rem;flex-shrink:0;">📖</span>
                            <div><div style="color:#fd79a8;font-weight:900;font-size:0.8rem;margin-bottom:2px;">DEVOCIONAL DIARIO</div><div style="color:rgba(255,255,255,0.45);font-size:0.7rem;line-height:1.4;">Un devocional distinto cada dia. 7 en total, con versiculo y reflexion en lenguaje para jovenes.</div></div>
                        </div>
                        <div style="display:flex;gap:12px;padding:11px;background:rgba(108,92,231,0.06);border-radius:10px;border-left:3px solid #6c5ce7;">
                            <span style="font-size:1.3rem;flex-shrink:0;">🏛️</span>
                            <div><div style="color:#a29bfe;font-weight:900;font-size:0.8rem;margin-bottom:2px;">DOCTRINA TEEN</div><div style="color:rgba(255,255,255,0.45);font-size:0.7rem;line-height:1.4;">Temas: Jesus, La Biblia, Espiritu Santo, Sabado, La Iglesia, Segunda Venida. Con citas biblicas.</div></div>
                        </div>
                    </div>
                </div>

                <!-- ESTADISTICAS -->
                <div style="font-size:0.6rem;letter-spacing:3px;color:rgba(255,255,255,0.3);margin-bottom:10px;">ESTADISTICAS GENERALES</div>
                <div id="director-stats" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
                    <div style="background:rgba(162,155,254,0.08);border:1px solid rgba(162,155,254,0.2);border-radius:12px;padding:14px;text-align:center;">
                        <div id="stat-total" style="color:#a29bfe;font-size:1.6rem;font-weight:900;">...</div>
                        <div style="color:rgba(255,255,255,0.4);font-size:0.62rem;margin-top:2px;">TEENS</div>
                    </div>
                    <div style="background:rgba(0,206,201,0.08);border:1px solid rgba(0,206,201,0.2);border-radius:12px;padding:14px;text-align:center;">
                        <div id="stat-activos" style="color:#00cec9;font-size:1.6rem;font-weight:900;">...</div>
                        <div style="color:rgba(255,255,255,0.4);font-size:0.62rem;margin-top:2px;">HOY ACTIVOS</div>
                    </div>
                    <div style="background:rgba(254,202,87,0.08);border:1px solid rgba(254,202,87,0.2);border-radius:12px;padding:14px;text-align:center;">
                        <div id="stat-puntos" style="color:#feca57;font-size:1.6rem;font-weight:900;">...</div>
                        <div style="color:rgba(255,255,255,0.4);font-size:0.62rem;margin-top:2px;">PTS PROM.</div>
                    </div>
                </div>

                <!-- LISTA DE TEENS -->
                <div style="font-size:0.6rem;letter-spacing:3px;color:rgba(255,255,255,0.3);margin-bottom:12px;">TODOS LOS ADOLESCENTES</div>
                <div id="lista-teens" style="display:grid;gap:10px;">
                    <div style="text-align:center;padding:40px;color:rgba(255,255,255,0.3);font-size:0.82rem;">🔄 Cargando adolescentes...</div>
                </div>
            </div>
        </div>
    `;

    await cargarTeens();
}

function compartirLinkWhatsApp() {
    const msg =
        'Legado Biblico - Zona Teen\n\n' +
        'Te invito a nuestra app de estudio biblico para adolescentes.\n\n' +
        '- Crea tu cuenta (nombre + PIN 4 digitos)\n' +
        '- Juega trivia biblica\n' +
        '- Lee devocionales diarios\n' +
        '- Completa retos de valores\n\n' +
        'Entra aqui: https://agendatecnicadigital.com\n\n' +
        '(Abre en Safari/Chrome y toca Agregar a pantalla de inicio)';
    // 📤 Menú nativo de compartir
    if (navigator.share) {
        navigator.share({ title: 'Legado Bíblico - Zona Teen', text: msg }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(msg).then(() => {
            if (typeof mostrarToast === 'function') mostrarToast('📋 Mensaje copiado al portapapeles');
        });
    }
}

function copiarLinkTeen() {
    const texto = 'https://agendatecnicadigital.com';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            const btn = document.getElementById('btn-copiar-link');
            if (btn) { btn.textContent = 'COPIADO!'; btn.style.color = '#55efc4'; setTimeout(() => { btn.textContent = 'COPIAR LINK'; btn.style.color = '#fff'; }, 2000); }
        });
    } else {
        prompt('Copia este link:', texto);
    }
}

async function cargarTeens() {
    try {
        const snap = await db.collection('teens').orderBy('ultimoAcceso', 'desc').get();
        const teens = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Estadísticas
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const activos = teens.filter(t => {
            if (!t.ultimoAcceso) return false;
            const ua = t.ultimoAcceso.toDate ? t.ultimoAcceso.toDate() : new Date(t.ultimoAcceso);
            return ua >= hoy;
        }).length;

        const promPuntos = teens.length > 0
            ? Math.round(teens.reduce((s, t) => s + (t.puntosTotales || 0), 0) / teens.length)
            : 0;

        document.getElementById('stat-total').textContent = teens.length;
        document.getElementById('stat-activos').textContent = activos;
        document.getElementById('stat-puntos').textContent = promPuntos;

        // Lista
        const lista = document.getElementById('lista-teens');
        if (teens.length === 0) {
            lista.innerHTML = `<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.3);">Aún no hay adolescentes registrados</div>`;
            return;
        }

        lista.innerHTML = teens.map(t => {
            const ua = t.ultimoAcceso?.toDate ? t.ultimoAcceso.toDate() : null;
            const fechaStr = ua ? ua.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Sin datos';
            const devCount = (t.devocionales_leidos || []).length;
            const valCount = (t.valores_completados || []).length;
            const notasCount = (t.notas || []).length;
            const triviaCount = (t.historial_trivia || []).length;

            return `
                <div onclick="verFichaTeen('${t.id}')" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px 18px;cursor:pointer;transition:0.2s;"
                    onmouseover="this.style.borderColor='rgba(212,175,55,0.35)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.07)'">
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                        <div style="font-size:1.8rem;">${t.avatar || '🧑'}</div>
                        <div style="flex:1;">
                            <h3 style="color:#fff;font-size:0.92rem;margin:0 0 2px;font-weight:900;">${t.nombre}</h3>
                            <div style="color:rgba(255,255,255,0.35);font-size:0.68rem;">📅 ${t.edad || '?'} años · 🕐 ${fechaStr}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="color:#feca57;font-size:1rem;font-weight:900;">${t.puntosTotales || 0}</div>
                            <div style="color:rgba(255,200,0,0.5);font-size:0.6rem;">PUNTOS</div>
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                        <div style="background:rgba(253,121,168,0.08);border-radius:8px;padding:8px 4px;text-align:center;">
                            <div style="color:#fd79a8;font-size:1rem;font-weight:900;">${devCount}</div>
                            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;">DEVOS</div>
                        </div>
                        <div style="background:rgba(0,206,201,0.08);border-radius:8px;padding:8px 4px;text-align:center;">
                            <div style="color:#00cec9;font-size:1rem;font-weight:900;">${valCount}</div>
                            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;">VALORES</div>
                        </div>
                        <div style="background:rgba(162,155,254,0.08);border-radius:8px;padding:8px 4px;text-align:center;">
                            <div style="color:#a29bfe;font-size:1rem;font-weight:900;">${triviaCount}</div>
                            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;">TRIVIAS</div>
                        </div>
                        <div style="background:rgba(254,202,87,0.08);border-radius:8px;padding:8px 4px;text-align:center;">
                            <div style="color:#feca57;font-size:1rem;font-weight:900;">${notasCount}</div>
                            <div style="color:rgba(255,255,255,0.35);font-size:0.58rem;">NOTAS</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (e) {
        console.warn('[Director] Error cargando teens:', e);
        document.getElementById('lista-teens').innerHTML = `
            <div style="text-align:center;padding:30px;color:#ff6b6b;">⚠️ Error de conexión — verifica tu internet</div>
        `;
    }
}

// ── FICHA INDIVIDUAL DEL TEEN ──
async function verFichaTeen(id) {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `<div style="min-height:100vh;background:linear-gradient(170deg,#0a1428,#0f2044,#0a1428);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Segoe UI',sans-serif;">🔄 Cargando ficha...</div>`;

    try {
        const doc = await db.collection('teens').doc(id).get();
        const t = { id: doc.id, ...doc.data() };

        const ua = t.ultimoAcceso?.toDate ? t.ultimoAcceso.toDate() : null;
        const fr = t.fechaRegistro?.toDate ? t.fechaRegistro.toDate() : null;

        container.innerHTML = `
            <div style="min-height:100vh;background:linear-gradient(170deg,#0a1428,#0f2044,#0a1428);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
                <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(212,175,55,0.2);position:sticky;top:0;z-index:100;">
                    <button onclick="renderPanelDirector()" style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.25);color:#d4af37;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:700;">← PANEL</button>
                    <span style="color:#d4af37;font-size:0.8rem;letter-spacing:2px;">📋 FICHA DEL ESTUDIANTE</span>
                </div>
                <div style="padding:24px 20px;max-width:600px;margin:0 auto;">

                    <!-- PERFIL -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(212,175,55,0.2);border-radius:18px;padding:24px;text-align:center;margin-bottom:18px;">
                        <div style="font-size:3rem;margin-bottom:10px;">${t.avatar || '🧑'}</div>
                        <h1 style="color:#fff;font-size:1.3rem;margin:0 0 4px;font-weight:900;">${t.nombre}</h1>
                        <div style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin-bottom:14px;">${t.edad || '?'} años · Registrado el ${fr ? fr.toLocaleDateString('es-ES') : 'Sin datos'}</div>
                        <div style="font-size:2rem;font-weight:900;color:#feca57;">${t.puntosTotales || 0} <span style="font-size:0.8rem;color:rgba(254,202,87,0.6);">PUNTOS TOTALES</span></div>
                        <div style="color:rgba(255,255,255,0.3);font-size:0.7rem;margin-top:6px;">Última vez: ${ua ? ua.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' }) : 'Sin datos'}</div>
                    </div>

                    <!-- ESTADÍSTICAS -->
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px;">
                        <div style="background:rgba(253,121,168,0.07);border:1px solid rgba(253,121,168,0.2);border-radius:12px;padding:16px;">
                            <div style="color:rgba(253,121,168,0.7);font-size:0.58rem;letter-spacing:2px;margin-bottom:6px;">📖 DEVOCIONALES LEÍDOS</div>
                            <div style="color:#fd79a8;font-size:1.6rem;font-weight:900;">${(t.devocionales_leidos || []).length}</div>
                            ${(t.devocionales_leidos || []).length > 0 ? `<div style="color:rgba(255,255,255,0.3);font-size:0.68rem;margin-top:4px;">${(t.devocionales_leidos || []).join(', ')}</div>` : ''}
                        </div>
                        <div style="background:rgba(0,206,201,0.07);border:1px solid rgba(0,206,201,0.2);border-radius:12px;padding:16px;">
                            <div style="color:rgba(0,206,201,0.7);font-size:0.58rem;letter-spacing:2px;margin-bottom:6px;">⭐ VALORES COMPLETADOS</div>
                            <div style="color:#00cec9;font-size:1.6rem;font-weight:900;">${(t.valores_completados || []).length}</div>
                        </div>
                        <div style="background:rgba(162,155,254,0.07);border:1px solid rgba(162,155,254,0.2);border-radius:12px;padding:16px;">
                            <div style="color:rgba(162,155,254,0.7);font-size:0.58rem;letter-spacing:2px;margin-bottom:6px;">🎮 PARTIDAS DE TRIVIA</div>
                            <div style="color:#a29bfe;font-size:1.6rem;font-weight:900;">${(t.historial_trivia || []).length}</div>
                        </div>
                        <div style="background:rgba(254,202,87,0.07);border:1px solid rgba(254,202,87,0.2);border-radius:12px;padding:16px;">
                            <div style="color:rgba(254,202,87,0.7);font-size:0.58rem;letter-spacing:2px;margin-bottom:6px;">📝 NOTAS ESCRITAS</div>
                            <div style="color:#feca57;font-size:1.6rem;font-weight:900;">${(t.notas || []).length}</div>
                        </div>
                    </div>

                    <!-- HISTORIAL DE TRIVIA -->
                    ${(t.historial_trivia || []).length > 0 ? `
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;margin-bottom:18px;">
                        <div style="color:rgba(162,155,254,0.7);font-size:0.6rem;letter-spacing:2px;margin-bottom:12px;">🎮 ÚLTIMAS PARTIDAS</div>
                        ${(t.historial_trivia || []).slice(-5).reverse().map(h => `
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                                <span style="color:rgba(255,255,255,0.6);font-size:0.78rem;">${h.tipo || 'Trivia'}</span>
                                <span style="color:#feca57;font-size:0.82rem;font-weight:900;">${h.puntos} pts</span>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    <!-- NOTAS -->
                    ${(t.notas || []).length > 0 ? `
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;">
                        <div style="color:rgba(254,202,87,0.7);font-size:0.6rem;letter-spacing:2px;margin-bottom:12px;">📝 NOTAS DEL ESTUDIANTE</div>
                        ${(t.notas || []).slice(-5).reverse().map(n => `
                            <div style="background:rgba(0,0,0,0.2);border-left:2px solid rgba(254,202,87,0.3);padding:10px 12px;border-radius:0 8px 8px 0;margin-bottom:8px;">
                                <p style="color:rgba(255,255,255,0.7);font-size:0.8rem;margin:0 0 4px;">${n.texto}</p>
                                <span style="color:rgba(255,255,255,0.3);font-size:0.65rem;">${n.fecha || ''}</span>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    } catch (e) {
        console.warn('[Director] Error ficha:', e);
        container.innerHTML = `<div style="text-align:center;padding:60px;color:#ff6b6b;">⚠️ Error cargando la ficha</div>`;
    }
}

function cerrarSesionDirector() {
    TEEN_AUTH.cerrarSesion();
    renderLoginTeen();
}

// ==========================================
// GUARDAR ACTIVIDAD TEEN EN FIRESTORE
// ==========================================
async function registrarActividadTeen(tipo, datos = {}) {
    const usuario = TEEN_AUTH.obtenerSesion();
    if (!usuario || usuario.esDirector || !usuario.id) return;

    try {
        const ref = db.collection('teens').doc(usuario.id);
        const update = { ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp() };

        if (tipo === 'trivia') {
            update.puntosTotales = firebase.firestore.FieldValue.increment(datos.puntos || 0);
            update.historial_trivia = firebase.firestore.FieldValue.arrayUnion({
                tipo: datos.tipo || 'Trivia',
                puntos: datos.puntos || 0,
                fecha: new Date().toLocaleDateString('es-ES')
            });
        } else if (tipo === 'devocional') {
            update.devocionales_leidos = firebase.firestore.FieldValue.arrayUnion(datos.dia || 'Devocional');
        } else if (tipo === 'valor') {
            update.valores_completados = firebase.firestore.FieldValue.arrayUnion(datos.titulo || 'Valor');
        } else if (tipo === 'nota') {
            update.notas = firebase.firestore.FieldValue.arrayUnion({
                texto: datos.texto || '',
                fecha: new Date().toLocaleDateString('es-ES')
            });
        } else if (tipo === 'doctrina') {
            update.doctrinas_vistas = firebase.firestore.FieldValue.arrayUnion(datos.num || 0);
        }

        await ref.update(update);
        // Actualizar sesión local con nuevos puntos
        if (tipo === 'trivia' && datos.puntos) {
            usuario.puntosTotales = (usuario.puntosTotales || 0) + datos.puntos;
            TEEN_AUTH.guardarSesion(usuario);
        }

    } catch (e) {
        console.warn('[Teen Activity]', e.message);
    }
}

console.log('[Teen Auth] ✅ Sistema de usuarios Teen cargado');
