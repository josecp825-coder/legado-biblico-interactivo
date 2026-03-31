const fs = require('fs');
let c = fs.readFileSync('data_iglesia_v1.js', 'utf8');

const startMarker = 'window.manejarEdicionExternaRegular = function(id) {';
const si = c.indexOf(startMarker);
if (si === -1) { console.log('ERROR: start not found'); process.exit(1); }

// Find the closing }; of the function - it ends with "}, 250);\n};"
const endPattern = '}, 250);';
let ei = c.indexOf(endPattern, si);
if (ei === -1) { console.log('ERROR: end pattern not found'); process.exit(1); }

// Move past the endPattern to the closing };
ei = ei + endPattern.length;
// Find the next }; which closes the function
const closingBrace = c.indexOf('};', ei);
if (closingBrace === -1) { console.log('ERROR: closing }; not found'); process.exit(1); }
ei = closingBrace + 2; // include the };

console.log('Old function length:', ei - si, 'chars');

const newFunc = `window.manejarEdicionExternaRegular = function(id) {
    if (typeof renderCultosRegulares !== 'function') {
        alert("El m\u00f3dulo de Cultos Regulares no est\u00e1 cargado.");
        return;
    }
    
    // 1. Marcar que estamos editando ANTES de renderizar
    //    Esto bloquea a precargarUltimoCultoSemanal() que chequea este flag
    window.regularEditandoId = id;
    
    // 2. Renderizar el formulario (crea los elementos del DOM)
    //    renderCultosRegulares() detecta window.regularEditandoId y llama
    //    editarCultoRegular(id) sincr\u00f3nicamente - NO hay race condition
    renderCultosRegulares();
};`;

c = c.substring(0, si) + newFunc + c.substring(ei);
fs.writeFileSync('data_iglesia_v1.js', c, 'utf8');
console.log('OK - Funcion reemplazada');
console.log('Nuevo tamano:', c.length, 'chars');
