// ================================================================
// 🔥 FIREBASE SYNC — LITURGIAS Y PREDICACIONES
// Archivo: _firebase_sync_iglesia.js
// Protección total de todos los datos del módulo Iglesia
// ================================================================

// ================================================================
// 🔥 MÓDULO 1: LITURGIAS (legado_liturgias)
// Colección: iglesias/cypress_hills_brooklyn/liturgias
// ================================================================

async function _syncLiturgiaFirebase(datos) {
    try {
        if (typeof db === 'undefined') return;
        const docId = String(datos.id);
        await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('liturgias').doc(docId).set(datos);
        console.log('[Firebase Liturgias] ✅ Guardado en nube:', datos.fecha);
    } catch(e) {
        console.warn('[Firebase Liturgias] Error sync:', e.message);
    }
}

async function _deleteLiturgiaFirebase(id) {
    try {
        if (typeof db === 'undefined') return;
        await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('liturgias').doc(String(id)).delete();
        console.log('[Firebase Liturgias] 🗑️ Eliminado:', id);
    } catch(e) {
        console.warn('[Firebase Liturgias] Error eliminando:', e.message);
    }
}

window.sincronizarLiturgiasDesdeFirebase = async function() {
    try {
        if (typeof db === 'undefined') {
            if (typeof mostrarToast === 'function') mostrarToast('⚠️ Firebase no disponible');
            return;
        }
        if (typeof mostrarToast === 'function') mostrarToast('⏳ Sincronizando liturgias...');
        const snap = await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('liturgias').orderBy('fecha', 'desc').get();
        if (snap.empty) {
            if (typeof mostrarToast === 'function') mostrarToast('ℹ️ No hay liturgias en Firebase aún');
            return;
        }
        const fbDatos = snap.docs.map(d => d.data());
        const locales = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
        const idsLocales = new Set(locales.map(r => String(r.id)));
        const soloFB = fbDatos.filter(r => !idsLocales.has(String(r.id)));
        const combinados = [...locales, ...soloFB].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
        localStorage.setItem('legado_liturgias', JSON.stringify(combinados));
        if (typeof mostrarToast === 'function') mostrarToast('🔥 ' + combinados.length + ' liturgias sincronizadas');
        if (typeof cargarLiturgiasFormulario === 'function') cargarLiturgiasFormulario();
        console.log('[Firebase Liturgias] Sincronizadas:', combinados.length);
    } catch(e) {
        console.warn('[Firebase Liturgias] Error sincronizando:', e.message);
        // Silenciado para no asustar al usuario con "Missing or insufficient permissions"
    }
};

window.exportarLiturgiasBackup = function() {
    const datos = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    if (datos.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay liturgias para exportar');
        return;
    }
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'liturgias_backup_' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    if (typeof mostrarToast === 'function') mostrarToast('💾 ' + datos.length + ' liturgias exportadas');
};

// ================================================================
// 🔥 MÓDULO 2: PREDICACIONES (legado_predicaciones)
// Colección: iglesias/cypress_hills_brooklyn/predicaciones
// ================================================================

async function _syncPredicacionFirebase(datos) {
    try {
        if (typeof db === 'undefined') return;
        const docId = String(datos.id);
        await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('predicaciones').doc(docId).set(datos);
        console.log('[Firebase Predicaciones] ✅ Guardado en nube:', datos.nombre, datos.fecha);
    } catch(e) {
        console.warn('[Firebase Predicaciones] Error sync:', e.message);
    }
}

async function _deletePredicacionFirebase(id) {
    try {
        if (typeof db === 'undefined') return;
        await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('predicaciones').doc(String(id)).delete();
        console.log('[Firebase Predicaciones] 🗑️ Eliminado:', id);
    } catch(e) {
        console.warn('[Firebase Predicaciones] Error eliminando:', e.message);
    }
}

window.sincronizarPredicacionesDesdeFirebase = async function() {
    try {
        if (typeof db === 'undefined') {
            if (typeof mostrarToast === 'function') mostrarToast('⚠️ Firebase no disponible');
            return;
        }
        if (typeof mostrarToast === 'function') mostrarToast('⏳ Sincronizando predicaciones...');
        const snap = await db.collection('iglesias').doc('cypress_hills_brooklyn')
            .collection('predicaciones').orderBy('fecha', 'desc').get();
        if (snap.empty) {
            if (typeof mostrarToast === 'function') mostrarToast('ℹ️ No hay predicaciones en Firebase aún');
            return;
        }
        const fbDatos = snap.docs.map(d => d.data());
        const locales = JSON.parse(localStorage.getItem('legado_predicaciones') || '[]');
        const idsLocales = new Set(locales.map(r => String(r.id)));
        const soloFB = fbDatos.filter(r => !idsLocales.has(String(r.id)));
        const combinados = [...locales, ...soloFB].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
        localStorage.setItem('legado_predicaciones', JSON.stringify(combinados));
        if (typeof mostrarToast === 'function') mostrarToast('🔥 ' + combinados.length + ' predicaciones sincronizadas');
        if (typeof cargarPredicaciones === 'function') cargarPredicaciones();
        console.log('[Firebase Predicaciones] Sincronizadas:', combinados.length);
    } catch(e) {
        console.warn('[Firebase Predicaciones] Error sincronizando:', e.message);
        // Silenciado para no asustar al usuario con "Missing or insufficient permissions"
    }
};

window.exportarPredicacionesBackup = function() {
    const datos = JSON.parse(localStorage.getItem('legado_predicaciones') || '[]');
    if (datos.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay predicaciones para exportar');
        return;
    }
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'predicaciones_backup_' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    if (typeof mostrarToast === 'function') mostrarToast('💾 ' + datos.length + ' predicaciones exportadas');
};

// ================================================================
// 🔄 PATCH: Inyectar Firebase sync en las funciones de data_iglesia_v1.js
// Se ejecuta después que data_iglesia_v1.js cargue completamente
// ================================================================
(function patchFirebaseSyncIglesia() {
    // --- PATCH guardarLiturgiaFormulario ---
    const origGuardarLiturgia = window.guardarLiturgiaFormulario;
    if (typeof origGuardarLiturgia === 'function') {
        window.guardarLiturgiaFormulario = function() {
            origGuardarLiturgia.apply(this, arguments);
            // Después de guardar, sincronizar el último registro con Firebase
            try {
                const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
                if (registros.length > 0) {
                    _syncLiturgiaFirebase(registros[0]).catch(e => console.warn('[Firebase Liturgias] Patch error:', e));
                }
            } catch(e) { console.warn('[Firebase Liturgias] Patch error:', e); }
        };
        console.log('[Firebase Sync] ✅ guardarLiturgiaFormulario parcheado');
    }

    // --- PATCH borrarLiturgiaFormulario ---
    const origBorrarLiturgia = window.borrarLiturgiaFormulario;
    if (typeof origBorrarLiturgia === 'function') {
        window.borrarLiturgiaFormulario = function(id) {
            origBorrarLiturgia.apply(this, arguments);
            _deleteLiturgiaFirebase(id).catch(e => console.warn('[Firebase Liturgias] Delete error:', e));
        };
        console.log('[Firebase Sync] ✅ borrarLiturgiaFormulario parcheado');
    }

    // --- PATCH guardarPredicacion ---
    const origGuardarPredicacion = window.guardarPredicacion;
    if (typeof origGuardarPredicacion === 'function') {
        window.guardarPredicacion = function() {
            origGuardarPredicacion.apply(this, arguments);
            try {
                const registros = JSON.parse(localStorage.getItem('legado_predicaciones') || '[]');
                if (registros.length > 0) {
                    _syncPredicacionFirebase(registros[0]).catch(e => console.warn('[Firebase Predicaciones] Patch error:', e));
                }
            } catch(e) { console.warn('[Firebase Predicaciones] Patch error:', e); }
        };
        console.log('[Firebase Sync] ✅ guardarPredicacion parcheado');
    }

    // --- PATCH borrarPredicacion ---
    const origBorrarPredicacion = window.borrarPredicacion;
    if (typeof origBorrarPredicacion === 'function') {
        window.borrarPredicacion = function(id) {
            origBorrarPredicacion.apply(this, arguments);
            _deletePredicacionFirebase(id).catch(e => console.warn('[Firebase Predicaciones] Delete error:', e));
        };
        console.log('[Firebase Sync] ✅ borrarPredicacion parcheado');
    }

    // --- Sincronización automática al abrir el módulo Iglesia ---
    // Si hay conexión, traer datos de Firebase al localStorage
    if (navigator.onLine) {
        setTimeout(() => {
            if (typeof db !== 'undefined') {
                sincronizarLiturgiasDesdeFirebase().catch(() => {});
                sincronizarPredicacionesDesdeFirebase().catch(() => {});
                if (typeof sincronizarEventosDesdeFirebase === 'function') {
                    sincronizarEventosDesdeFirebase(true).catch(() => {});
                }
            }
        }, 3000); // 3 segundos después de cargar
    }
})();

console.log('[Firebase Sync Iglesia] 🔥 Módulos Liturgias + Predicaciones activados');
