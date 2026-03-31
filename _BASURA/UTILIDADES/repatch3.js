const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

const targetActualizar = `function _actualizarFormularioPorDia(esSabado) {
    const cont = document.getElementById('culto-campos-dinamicos');
    if (!cont) return;
    cont.innerHTML = esSabado ? _html12PasosSabado() : _htmlCamposNormal();
    iniciarAutoGuardadoCulto();
}`;

let targetClean = targetActualizar.replace(/\r\n/g, '\n');
let codeClean = code.replace(/\r\n/g, '\n');

const newActualizar = `function _actualizarFormularioPorDia(esSabado) {
    const cont = document.getElementById('culto-campos-dinamicos');
    if (!cont) return;
    
    const select = document.getElementById('culto-tipo');
    const dStr = select ? select.value : '';
    
    if (dStr === 'Miércoles' || dStr === 'Viernes' || dStr === 'Mi\\u00e9rcoles') {
        if (typeof renderCultosRegulares === 'function') {
            const fechaStr = document.getElementById('culto-fecha') ? document.getElementById('culto-fecha').value : '';
            renderCultosRegulares();
            // Pre-seleccionar la fecha y dia en el nuevo formulario
            setTimeout(() => {
                if (document.getElementById('reg-dia')) {
                    document.getElementById('reg-dia').value = (dStr.toLowerCase() === 'viernes') ? 'viernes' : 'miercoles';
                    actualizarVisibilidadTestimonios();
                }
                if (document.getElementById('reg-fecha') && fechaStr) document.getElementById('reg-fecha').value = fechaStr;
            }, 100);
            return;
        }
    }
    
    const realSab = (esSabado === true || dStr === 'Sábado' || dStr === 'S\\u00e1bado');
    cont.innerHTML = realSab ? _html12PasosSabado() : _htmlCamposNormal();
    iniciarAutoGuardadoCulto();
}`;

if (codeClean.includes(targetClean)) {
    codeClean = codeClean.replace(targetClean, newActualizar);
    fs.writeFileSync('data_iglesia_v1.js', codeClean, 'utf8');
    console.log('[OK] _actualizarFormularioPorDia Reemplazado correctamente.');
} else {
    console.log('[FAIL] No se encontró el texto exacto.');
}
