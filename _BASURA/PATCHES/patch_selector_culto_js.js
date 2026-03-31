const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// Insertar las funciones JS despues de cambiarTabCulto
const TARGET = 'window.cambiarTabCulto = function(tab) {';

const FUNCIONES = `// ===== SELECTOR DE TIPO DE CULTO =====
    window.elegirTipoCulto = function(tipo) {
        const selector = document.getElementById('selector-tipo-culto');
        const wrapperSab = document.getElementById('formulario-sabado-wrapper');

        if (tipo === 'sabado') {
            if (selector) selector.style.display = 'none';
            if (wrapperSab) wrapperSab.style.display = 'block';
            // Asegurarse que el selector de día apunte a Sábado
            const tipoCulto = document.getElementById('culto-tipo');
            if (tipoCulto) {
                tipoCulto.value = 'Sábado';
                if (typeof _actualizarFormularioPorDia === 'function') _actualizarFormularioPorDia(true);
            }
        } else if (tipo === 'semana') {
            // Ir al formulario de culto de semana (Miércoles/Viernes)
            if (typeof renderCultosRegulares === 'function') {
                renderCultosRegulares();
            } else {
                alert('El módulo de Cultos de Semana no está disponible.');
            }
        }
    };

    window.volverSelectorCulto = function() {
        const selector = document.getElementById('selector-tipo-culto');
        const wrapperSab = document.getElementById('formulario-sabado-wrapper');
        if (selector) selector.style.display = 'block';
        if (wrapperSab) wrapperSab.style.display = 'none';
    };

    window.cambiarTabCulto = function(tab) {`;

// Asegurarnos de no duplicar
if (code.includes('window.elegirTipoCulto')) {
    console.log('[SKIP] elegirTipoCulto ya existe.');
} else {
    code = code.replace(TARGET, FUNCIONES);
    console.log('[OK] Funciones elegirTipoCulto y volverSelectorCulto insertadas.');
}

// Tambien: cuando se cambie a tab 'form', mostrar el selector por defecto (no el formulario)
// Modificar cambiarTabCulto para que al ir a 'form' muestre el selector
code = code.replace(
    "if (tab === 'cultos') cargarCultosSemana();",
    "if (tab === 'cultos') cargarCultosSemana();\n        if (tab === 'form') { const s=document.getElementById('selector-tipo-culto'); const w=document.getElementById('formulario-sabado-wrapper'); if(s) s.style.display='block'; if(w) w.style.display='none'; }"
);

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('[DONE] Listo.');
