const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// ============================================================
// FIX 1: editarCulto NO debe eliminar el registro hasta que
//         el usuario GUARDE. Solo almacenamos el ID en edicion.
// ============================================================
const OLD_EDITAR_DELETE = `    // Quitar del historial para que al guardar sea una actualizacion
    const historialMod = historial.filter(h => h.id !== id);
    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historialMod));
    cargarCultosSemana();`;

const NEW_EDITAR_DELETE = `    // Guardar el ID en edicion (NO eliminar hasta que el usuario guarde)
    window._editandoCultoId = id;
    cargarCultosSemana();`;

if (c.includes(OLD_EDITAR_DELETE)) {
    c = c.replace(OLD_EDITAR_DELETE, NEW_EDITAR_DELETE);
    console.log('OK: editarCulto ya no elimina al abrir');
} else {
    console.log('ERROR: no encontrado OLD_EDITAR_DELETE');
    const idx = c.indexOf('_editandoCultoId');
    console.log('_editandoCultoId ya existe en idx:', idx);
}

// ============================================================
// FIX 2: guardarCultoSemana debe REEMPLAZAR el registro antiguo
//         si estamos en modo edicion (_editandoCultoId)
// ============================================================
// Buscar la linea donde se hace historial.unshift(datos)
const OLD_GUARDAR_SAVE = `    let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    historial.unshift(datos);
    historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));`;

const NEW_GUARDAR_SAVE = `    let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    // Si estamos editando, reemplazar el registro antiguo
    if (window._editandoCultoId) {
        historial = historial.filter(h => h.id !== window._editandoCultoId);
        datos.id = window._editandoCultoId; // Preservar el ID original
        window._editandoCultoId = null;
        if (typeof mostrarToast === 'function') mostrarToast('\\u2705 Culto actualizado');
    }
    historial.unshift(datos);
    historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));`;

if (c.includes(OLD_GUARDAR_SAVE)) {
    c = c.replace(OLD_GUARDAR_SAVE, NEW_GUARDAR_SAVE);
    console.log('OK: guardarCultoSemana maneja edicion correctamente');
} else {
    console.log('ERROR: no encontrado OLD_GUARDAR_SAVE');
    // Ver contexto
    const idx = c.indexOf('historial.unshift(datos)');
    console.log('historial.unshift idx:', idx);
    if (idx >= 0) console.log(c.substring(idx - 100, idx + 300));
}

// ============================================================
// FIX 3: Indicador visual en el boton GUARDAR cuando se edita
// ============================================================
// Buscar el boton guardar para agregar indicador (opcional, si existe)

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== ARCHIVO GUARDADO ===');
console.log('_editandoCultoId occurrences:', (c.match(/_editandoCultoId/g)||[]).length);
