const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// El problema: \u{1F50D} dentro del HTML que está dentro de un template literal
// Este escapeado no funciona dentro de template literals en el navegador.
// Hay que reemplazarlo por el emoji directamente.

code = code.replace(
    'placeholder="\\u{1F50D} Buscar..."',
    'placeholder="🔍 Buscar..."'
);

// También agregar cargarCultosSemana() como llamada directo al abrir el tab 'cultos'
// verificando que el elemento existe. El problema puede ser un timing issue.
// Asegurarnos que cargarCultosSemana llame sin error cuando search-culto no existe:
code = code.replace(
    'document.getElementById(\'search-culto\').style.display = \'none\';',
    'const sEl = document.getElementById(\'search-culto\'); if(sEl) sEl.style.display = \'none\';'
);

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('[OK] Fix emoji placeholder y null-check aplicado.');
