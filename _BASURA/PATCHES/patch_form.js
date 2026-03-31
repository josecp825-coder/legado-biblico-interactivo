const fs = require('fs');
let c = fs.readFileSync('data_iglesia_v1.js', 'utf8');

c = c.replace(/function guardarCultoSemana\(\) \{/, 'function guardarCultoSemana(mantenerFormulario = false) {');

c = c.replace(/window\._editandoCultoId = null;/g, `if (!mantenerFormulario) {
            window._editandoCultoId = null;
        } else {
            window._editandoCultoId = datos.id;
        }`);

const clearInputsTarget = `campos.forEach(c => { const el = document.getElementById('culto-' + c); if (el) el.value = ''; });
    document.querySelectorAll('[id^="himno-titulo-"]').forEach(d => d.textContent = '');`;
const clearInputsReplace = `if (!mantenerFormulario) {
        campos.forEach(c => { const el = document.getElementById('culto-' + c); if (el) el.value = ''; });
        document.querySelectorAll('[id^="himno-titulo-"]').forEach(d => d.textContent = '');
    }`;

if (c.includes(clearInputsTarget)) {
    c = c.replace(clearInputsTarget, clearInputsReplace);
}

// Update the generated plantilla function to keep the form
c = c.replace(/guardarCultoSemana\(\);\s*\/\/ Y abrimos directamente/, `guardarCultoSemana(true);\n    // Y abrimos directamente`);

// Let's also verify compartirCultoActual keeps the form
c = c.replace(/window\.compartirCultoActual = function \(\) \{/, `window.compartirCultoActual = function () {
    guardarCultoSemana(true);`);

fs.writeFileSync('data_iglesia_v1.js', c);
console.log('Patch for keeping form on generating template applied!');
