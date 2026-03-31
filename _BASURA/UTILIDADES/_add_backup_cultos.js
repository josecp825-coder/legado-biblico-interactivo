const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// ============================================================
// Agregar funcion exportarCultosBackup e importarCultosBackup
// Y un boton de RESPALDO en el historial de cultos
// ============================================================

const BACKUP_FNS = `
// ================================================================
// 🛡️ PROTECCION DE DATOS - RESPALDO Y RESTAURACION DE CULTOS
// Los registros de cultos son el tesoro historico de la iglesia.
// ================================================================
window.exportarCultosBackup = function() {
    const datos = localStorage.getItem('legado_cultos_semanales') || '[]';
    const cultos = JSON.parse(datos);
    if (cultos.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('\\u26A0\\uFE0F No hay cultos para exportar');
        return;
    }
    const fecha = new Date().toISOString().split('T')[0];
    const blob = new Blob([JSON.stringify(cultos, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'LegadoBiblico_Cultos_Respaldo_' + fecha + '.json';
    a.click();
    if (typeof mostrarToast === 'function') mostrarToast('\\u{1F4BE} Respaldo de ' + cultos.length + ' cultos descargado');
};

window.importarCultosBackup = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const datos = JSON.parse(ev.target.result);
                if (!Array.isArray(datos)) throw new Error('Formato invalido');
                const existing = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
                // Combinar sin duplicados (por ID)
                const existingIds = new Set(existing.map(c => c.id));
                const nuevos = datos.filter(c => !existingIds.has(c.id));
                const combined = [...existing, ...nuevos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                localStorage.setItem('legado_cultos_semanales', JSON.stringify(combined));
                if (typeof cargarCultosSemana === 'function') cargarCultosSemana();
                if (typeof mostrarToast === 'function') mostrarToast('\\u2705 ' + nuevos.length + ' cultos importados correctamente');
            } catch(err) {
                if (typeof mostrarToast === 'function') mostrarToast('\\u274C Error: archivo invalido');
            }
        };
        reader.readAsText(file);
    };
    input.click();
};

`;

// Insertar las funciones antes de cargarCultosSemana
const anchor = 'function cargarCultosSemana()';
const idx = c.indexOf(anchor);
if (idx >= 0) {
    c = c.substring(0, idx) + BACKUP_FNS + c.substring(idx);
    console.log('OK: funciones de respaldo insertadas');
} else {
    console.log('ERROR: no encontrado anchor cargarCultosSemana');
}

// ============================================================
// Agregar botones de EXPORTAR/IMPORTAR en el header del historial
// Buscar el div de busqueda del historial para agregar botones
// ============================================================
const OLD_SEARCH = 'id="search-culto"';
const OLD_SEARCH_CONTEXT = c.indexOf(OLD_SEARCH);
console.log('search-culto en idx:', OLD_SEARCH_CONTEXT);

// Buscar el div que contiene el input de busqueda para agregar botones despues
// Patron tipico: <input ... id="search-culto" ...>
// Queremos agregar botones despues del input de busqueda

// Buscar el boton EXPORTAR que podria ya existir
console.log('exportarCultosBackup ya en HTML:', c.includes("exportarCultosBackup()\" ") || c.includes('onclick="exportarCultosBackup'));

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== GUARDADO. Tamano:', c.length);
