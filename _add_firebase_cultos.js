const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// ============================================================
// FIREBASE SYNC PARA CULTOS
// Guardar en Firestore: coleccion 'cultos' con documentos por ID
// Leer al iniciar: sincronizar desde Firestore al localStorage
// ============================================================

const FIREBASE_SYNC = `
// ================================================================
// 🔥 FIREBASE SYNC — Cultos sincronizados con Firestore
// Los datos de cultos son el tesoro de la iglesia.
// Se guardan en localStorage Y en Firebase simultáneamente.
// ================================================================

// Nombre de la iglesia como "namespace" en Firestore
const IGLESIA_ID = 'cypress_hills_brooklyn';

// Guardar un culto en Firestore
async function _syncCultoFirebase(datos) {
    try {
        if (typeof db === 'undefined') return;
        const docId = String(datos.id || Date.now());
        await db.collection('iglesias').doc(IGLESIA_ID)
            .collection('cultos').doc(docId).set(datos);
        console.log('[FIREBASE] Culto guardado en Firestore:', docId);
    } catch(e) {
        console.warn('[FIREBASE] No se pudo sincronizar culto:', e.message);
    }
}

// Eliminar un culto de Firestore
async function _deleteCultoFirebase(id) {
    try {
        if (typeof db === 'undefined') return;
        await db.collection('iglesias').doc(IGLESIA_ID)
            .collection('cultos').doc(String(id)).delete();
        console.log('[FIREBASE] Culto eliminado de Firestore:', id);
    } catch(e) {
        console.warn('[FIREBASE] Error eliminando de Firestore:', e.message);
    }
}

// Cargar cultos desde Firestore y combinar con localStorage
async function sincronizarCultosDesdeFirebase() {
    try {
        if (typeof db === 'undefined') {
            console.warn('[FIREBASE] db no disponible');
            return;
        }
        const snap = await db.collection('iglesias').doc(IGLESIA_ID)
            .collection('cultos').orderBy('fecha', 'desc').get();
        
        if (snap.empty) {
            console.log('[FIREBASE] Sin cultos en Firestore aún');
            return;
        }
        
        const cultosFirebase = snap.docs.map(d => d.data());
        const cultosLocales = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
        
        // Combinar: Firebase tiene prioridad, agregar los locales que no están en Firebase
        const idsFirebase = new Set(cultosFirebase.map(c => String(c.id)));
        const soloLocales = cultosLocales.filter(c => !idsFirebase.has(String(c.id)));
        
        // Subir los locales que no están en Firebase
        for (const culto of soloLocales) {
            await _syncCultoFirebase(culto);
        }
        
        // Combinar y ordenar
        const todos = [...cultosFirebase, ...soloLocales]
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        localStorage.setItem('legado_cultos_semanales', JSON.stringify(todos));
        console.log('[FIREBASE] Sincronizados', todos.length, 'cultos');
        
        // Refrescar el historial si está visible
        if (typeof cargarCultosSemana === 'function') {
            cargarCultosSemana();
        }
        
        if (typeof mostrarToast === 'function') {
            mostrarToast('\\u{1F525} ' + todos.length + ' cultos sincronizados con Firebase');
        }
    } catch(e) {
        console.warn('[FIREBASE] Error al sincronizar:', e.message);
    }
}

// Exponer para llamar desde el módulo de iglesia
window.sincronizarCultosDesdeFirebase = sincronizarCultosDesdeFirebase;

`;

// Insertar antes de guardarCultoSemana
const anchor = 'function guardarCultoSemana()';
const idx = c.indexOf(anchor);
if (idx >= 0) {
    c = c.substring(0, idx) + FIREBASE_SYNC + c.substring(idx);
    console.log('OK: funciones Firebase sync insertadas');
} else {
    console.log('ERROR: no encontrado anchor');
}

// ==============================================================
// Modificar guardarCultoSemana para que TAMBIÉN guarde en Firebase
// ==============================================================
// Buscar donde se llama cargarCultosSemana() después de guardar
const OLD_GUARDAR_END = `    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));`;
const NEW_GUARDAR_END = `    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));
    // 🔥 Sincronizar con Firebase (en segundo plano, sin bloquear)
    _syncCultoFirebase(datos).catch(e => console.warn('Firebase sync error:', e));`;

if (c.includes(OLD_GUARDAR_END)) {
    c = c.replace(OLD_GUARDAR_END, NEW_GUARDAR_END);
    console.log('OK: guardarCultoSemana ahora sincroniza con Firebase');
} else {
    console.log('ERROR: no encontrado en guardarCultoSemana');
}

// ==============================================================
// Modificar borrarCultoSemana para que TAMBIÉN borre en Firebase
// ==============================================================
const OLD_BORRAR = `    historial = historial.filter(h => h.id !== id);
    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));
    cargarCultosSemana();`;
const NEW_BORRAR = `    historial = historial.filter(h => h.id !== id);
    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));
    // 🔥 Eliminar de Firebase también
    _deleteCultoFirebase(id).catch(e => console.warn('Firebase delete error:', e));
    cargarCultosSemana();`;

if (c.includes(OLD_BORRAR)) {
    c = c.replace(OLD_BORRAR, NEW_BORRAR);
    console.log('OK: borrarCultoSemana también elimina de Firebase');
} else {
    console.log('ERROR: no encontrado en borrarCultoSemana');
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== GUARDADO. Tamano:', c.length);
