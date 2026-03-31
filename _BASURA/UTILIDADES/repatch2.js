const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

const s2Regex = /function autoDetectarTipoCulto\(fechaStr\) \{\s*if \(\!fechaStr\) return;\s*const select = document\.getElementById\('culto-tipo'\);\s*if \(\!select\) return;\s*const partes = fechaStr\.split\('-'\);\s*const fecha = new Date\(partes\[0\], partes\[1\] - 1, partes\[2\], 12, 0, 0\);\s*const diaSemana = fecha\.getDay\(\);\s*const diasMap = \{ 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Mi\\u00e9rcoles", 4: "Jueves", 5: "Viernes", 6: "S\\u00e1bado" \};\s*select\.value = diasMap\[diaSemana\] \|\| "Otro";\s*\/\/[^\n]*\s*_actualizarFormularioPorDia\(diaSemana === 6\);\s*\}/;

const r2 = `function autoDetectarTipoCulto(fechaStr) {
    if (!fechaStr) return;
    const select = document.getElementById('culto-tipo');
    if (!select) return;
    const partes = fechaStr.split('-');
    const fecha = new Date(partes[0], partes[1] - 1, partes[2], 12, 0, 0);
    const diaSemana = fecha.getDay();
    const diasMap = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Mi\\u00e9rcoles", 4: "Jueves", 5: "Viernes", 6: "S\\u00e1bado" };
    select.value = diasMap[diaSemana] || "Otro";
    _actualizarFormularioPorDia(diaSemana === 6 ? true : diasMap[diaSemana]);
}`;

if (s2Regex.test(code)) {
    code = code.replace(s2Regex, r2);
    console.log('[OK] autoDetectarTipoCulto con regex');
} else {
    console.log('[FAIL] autoDetectar no matcheo');
}

const s3Regex = /function _actualizarFormularioPorDia\(esSabado\) \{\s*const cont = document\.getElementById\('culto-campos-dinamicos'\);\s*if \(\!cont\) return;\s*cont\.innerHTML = esSabado \? _html12PasosSabado\(\) : _htmlCamposNormal\(\);\s*iniciarAutoGuardadoCulto\(\);\s*\}/;

const r3 = `function _actualizarFormularioPorDia(esSabado) {
    const cont = document.getElementById('culto-campos-dinamicos');
    if (!cont) return;
    
    const select = document.getElementById('culto-tipo');
    const dStr = select ? select.value : '';
    
    // REDIRECCIÓN A PLANTILLA SIMPLIFICADA
    if (dStr === 'Miércoles' || dStr === 'Viernes' || dStr === 'Mi\\u00e9rcoles') {
        if (typeof renderCultosRegulares === 'function') {
            return renderCultosRegulares();
        }
    }
    
    // De lo contrario cargar plantilla normal o sábado
    const realSab = (esSabado === true || dStr === 'Sábado' || dStr === 'S\\u00e1bado');
    cont.innerHTML = realSab ? _html12PasosSabado() : _htmlCamposNormal();
    iniciarAutoGuardadoCulto();
}`;

if (s3Regex.test(code)) {
    code = code.replace(s3Regex, r3);
    console.log('[OK] _actualizarFormulario con regex');
} else {
    console.log('[FAIL] _actualizarFormulario no matcheo');
}

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('TERMINE repatch2.js');
