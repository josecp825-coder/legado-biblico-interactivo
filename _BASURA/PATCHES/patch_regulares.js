const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// 1. Agregar onchange al select
code = code.replace(
    '<select id="culto-tipo" style="flex:1;padding:9px 11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;">',
    '<select id="culto-tipo" onchange="_actualizarFormularioPorDia(this.value)" style="flex:1;padding:9px 11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;">'
);

// 2. Modificar autoDetectarTipoCulto
const targetAuto = /function autoDetectarTipoCulto\(fechaStr\) \{[\s\S]*?_actualizarFormularioPorDia\(diaSemana === 6\);\s*\}/;
const newAuto = `function autoDetectarTipoCulto(fechaStr) {
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

// 3. Modificar _actualizarFormularioPorDia
const targetActualizar = /function _actualizarFormularioPorDia\(esSabado\) \{[\s\S]*?iniciarAutoGuardadoCulto\(\);\s*\}/;
const newActualizar = `function _actualizarFormularioPorDia(esSabado) {
    const cont = document.getElementById('culto-campos-dinamicos');
    if (!cont) return;

    const select = document.getElementById('culto-tipo');
    const diaString = select ? select.value : '';
    
    // REDIRECCION A PLANTILLA SIMPLIFICADA "CULTOS REGULARES"
    if (diaString === 'Miércoles' || diaString === 'Viernes' || diaString === 'Mi\\u00e9rcoles') {
        if (typeof renderCultosRegulares === 'function') {
            return renderCultosRegulares();
        }
    }

    const isSabadoReal = (esSabado === true || diaString === 'Sábado' || diaString === 'S\\u00e1bado');
    cont.innerHTML = isSabadoReal ? _html12PasosSabado() : _htmlCamposNormal();
    iniciarAutoGuardadoCulto();
}`;

if (targetAuto.test(code)) {
    code = code.replace(targetAuto, newAuto);
} else {
    console.error("No se encontro autoDetectarTipoCulto");
}

if (targetActualizar.test(code)) {
    code = code.replace(targetActualizar, newActualizar);
} else {
    console.error("No se encontro _actualizarFormularioPorDia");
}

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('PATCH APLICADO a data_iglesia_v1.js');
