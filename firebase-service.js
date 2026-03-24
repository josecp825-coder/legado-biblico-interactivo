// ==========================================
// 🔥 FIREBASE SERVICE — LEGADO BÍBLICO
// Sincronización en la nube para todos
// los módulos de la aplicación
// ==========================================

// --- ESTADO GLOBAL DEL USUARIO ---
let usuarioFirebase = {
    uid: null,
    nombre: null,
    nivel: null,
    cargado: false
};

// ==========================================
// 1. INICIO DE SESIÓN ANÓNIMO + PERFIL
// El usuario se loguea automáticamente sin
// necesidad de crear cuenta ni contraseña.
// Su progreso queda vinculado al dispositivo.
// ==========================================
async function iniciarSesionFirebase(nombre, nivel) {
    try {
        const auth = firebase.auth();
        let userAuth = auth.currentUser;

        // Login anónimo si no hay sesión activa
        if (!userAuth) {
            const resultado = await auth.signInAnonymously();
            userAuth = resultado.user;
        }

        usuarioFirebase.uid = userAuth.uid;
        usuarioFirebase.nombre = nombre;
        usuarioFirebase.nivel = nivel;
        usuarioFirebase.cargado = true;

        // Guardar o actualizar perfil en Firestore
        await db.collection('usuarios').doc(userAuth.uid).set({
            nombre: nombre,
            nivel: nivel,
            ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp(),
            dispositivo: navigator.userAgent.substring(0, 80)
        }, { merge: true });

        console.log(`[Firebase] ✅ Sesión activa: ${nombre} (${userAuth.uid.substring(0, 8)}...)`);
        return userAuth.uid;

    } catch (error) {
        console.warn('[Firebase] Error de sesión — usando localStorage:', error.message);
        return null;
    }
}

// ==========================================
// 2. ESTRELLAS — MÓDULO NIÑOS
// ==========================================
async function guardarEstrellasNinos(total) {
    // Siempre guarda en localStorage (respaldo offline)
    localStorage.setItem('kids_estrellas', total);

    if (!usuarioFirebase.uid) return;
    try {
        await db.collection('usuarios').doc(usuarioFirebase.uid).set({
            estrellas_ninos: total,
            ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`[Firebase] ⭐ Estrellas guardadas: ${total}`);
    } catch (e) {
        console.warn('[Firebase] Error guardando estrellas:', e.message);
    }
}

async function cargarEstrellasNinos() {
    // Primero intenta desde Firebase
    if (usuarioFirebase.uid) {
        try {
            const doc = await db.collection('usuarios').doc(usuarioFirebase.uid).get();
            if (doc.exists && doc.data().estrellas_ninos !== undefined) {
                const estrellas = doc.data().estrellas_ninos;
                localStorage.setItem('kids_estrellas', estrellas);
                return estrellas;
            }
        } catch (e) {
            console.warn('[Firebase] Error cargando estrellas:', e.message);
        }
    }
    // Fallback a localStorage
    return parseInt(localStorage.getItem('kids_estrellas') || '0');
}

// ==========================================
// 3. PROGRESO JÓVENES
// ==========================================
async function guardarProgresoJovenes(completado) {
    localStorage.setItem('jovenes_progreso', JSON.stringify(completado));

    if (!usuarioFirebase.uid) return;
    try {
        await db.collection('usuarios').doc(usuarioFirebase.uid).set({
            progreso_jovenes: completado,
            ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log('[Firebase] 🚀 Progreso Jóvenes guardado');
    } catch (e) {
        console.warn('[Firebase] Error progreso jóvenes:', e.message);
    }
}

async function cargarProgresoJovenes() {
    if (usuarioFirebase.uid) {
        try {
            const doc = await db.collection('usuarios').doc(usuarioFirebase.uid).get();
            if (doc.exists && doc.data().progreso_jovenes) {
                return doc.data().progreso_jovenes;
            }
        } catch (e) {
            console.warn('[Firebase] Error cargando progreso jóvenes:', e.message);
        }
    }
    const local = localStorage.getItem('jovenes_progreso');
    return local ? JSON.parse(local) : { debate: false, devocional: false, apolo: false, memoria: false };
}

// ==========================================
// 4. NOTAS PERSONALES — MÓDULO ADULTOS
// ==========================================
async function guardarNotaFirebase(textoNota, pasaje) {
    const nota = {
        texto: textoNota,
        pasaje: pasaje,
        fecha: new Date().toLocaleDateString('es-ES'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Siempre guarda en localStorage también
    const notasLocal = JSON.parse(localStorage.getItem('adultos_notas') || '[]');
    notasLocal.push({ texto: textoNota, pasaje, fecha: nota.fecha });
    localStorage.setItem('adultos_notas', JSON.stringify(notasLocal));

    if (!usuarioFirebase.uid) return;
    try {
        await db.collection('usuarios').doc(usuarioFirebase.uid)
            .collection('notas').add(nota);
        console.log('[Firebase] 📝 Nota guardada en la nube');
    } catch (e) {
        console.warn('[Firebase] Error guardando nota:', e.message);
    }
}

async function cargarNotasFirebase() {
    if (usuarioFirebase.uid) {
        try {
            const snap = await db.collection('usuarios').doc(usuarioFirebase.uid)
                .collection('notas').orderBy('timestamp', 'desc').get();

            if (!snap.empty) {
                return snap.docs.map(doc => ({
                    id: doc.id,
                    texto: doc.data().texto,
                    pasaje: doc.data().pasaje,
                    fecha: doc.data().fecha
                }));
            }
        } catch (e) {
            console.warn('[Firebase] Error cargando notas:', e.message);
        }
    }
    return JSON.parse(localStorage.getItem('adultos_notas') || '[]');
}

async function eliminarNotaFirebase(notaId, idx) {
    // Elimina de localStorage
    const notasLocal = JSON.parse(localStorage.getItem('adultos_notas') || '[]');
    notasLocal.splice(idx, 1);
    localStorage.setItem('adultos_notas', JSON.stringify(notasLocal));

    if (!usuarioFirebase.uid || !notaId) return;
    try {
        await db.collection('usuarios').doc(usuarioFirebase.uid)
            .collection('notas').doc(notaId).delete();
        console.log('[Firebase] 🗑️ Nota eliminada de la nube');
    } catch (e) {
        console.warn('[Firebase] Error eliminando nota:', e.message);
    }
}

// ==========================================
// 5. PUNTAJES — TRIVIA Y VERSUS
// ==========================================
async function guardarPuntajeFirebase(modulo, puntos, detalles = {}) {
    if (!usuarioFirebase.uid) return;
    try {
        await db.collection('puntajes').add({
            uid: usuarioFirebase.uid,
            nombre: usuarioFirebase.nombre || 'Anónimo',
            nivel: usuarioFirebase.nivel || 'general',
            modulo: modulo,
            puntos: puntos,
            ...detalles,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });

        // También actualiza el mejor puntaje del usuario
        const docRef = db.collection('usuarios').doc(usuarioFirebase.uid);
        const campoMax = `mejor_${modulo.replace(/\s/g, '_')}`;
        const docActual = await docRef.get();
        const actualMax = docActual.exists ? (docActual.data()[campoMax] || 0) : 0;

        if (puntos > actualMax) {
            await docRef.set({ [campoMax]: puntos }, { merge: true });
        }

        console.log(`[Firebase] 🏆 Puntaje guardado: ${modulo} = ${puntos}`);
    } catch (e) {
        console.warn('[Firebase] Error guardando puntaje:', e.message);
    }
}

// ==========================================
// 6. RANKING GLOBAL
// ==========================================
async function cargarRankingGlobal(modulo, limite = 10) {
    try {
        const snap = await db.collection('puntajes')
            .where('modulo', '==', modulo)
            .orderBy('puntos', 'desc')
            .limit(limite)
            .get();

        return snap.docs.map((doc, i) => ({
            posicion: i + 1,
            nombre: doc.data().nombre,
            puntos: doc.data().puntos,
            nivel: doc.data().nivel,
            uid: doc.data().uid
        }));
    } catch (e) {
        console.warn('[Firebase] Error cargando ranking:', e.message);
        return [];
    }
}

// ==========================================
// 7. INDICADOR VISUAL EN PANTALLA
// ==========================================
function mostrarToastNube(mensaje, tipo = 'exito') {
    const colores = {
        exito: { bg: '#00b894', emoji: '☁️' },
        error: { bg: '#ff6b6b', emoji: '⚠️' },
        guardando: { bg: '#6c5ce7', emoji: '💾' }
    };
    const c = colores[tipo] || colores.exito;
    const t = document.createElement('div');
    // Inyectar @keyframes fadeIn si no existe
    if (!document.getElementById('_fadeInKF')) {
        const kf = document.createElement('style');
        kf.id = '_fadeInKF';
        kf.textContent = '@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}';
        document.head.appendChild(kf);
    }
    t.style.cssText = `position:fixed;top:20px;right:20px;background:${c.bg};color:#fff;padding:10px 18px;border-radius:20px;font-size:0.8rem;font-weight:700;z-index:99999;animation:fadeIn 0.3s ease;font-family:'Segoe UI',sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.3);`;
    t.innerText = `${c.emoji} ${mensaje}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2800);
}

// ==========================================
// 8. ESTADO ONLINE/OFFLINE en tiempo real
// ==========================================
window.addEventListener('online', () => mostrarToastNube('¡Nube reconectada! Sincronizando...', 'exito'));
window.addEventListener('offline', () => mostrarToastNube('Sin internet — guardando localmente', 'error'));

console.log('[Firebase Service] ✅ Servicio de nube cargado y listo');
