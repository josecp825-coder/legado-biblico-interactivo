const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// 1. SELECT ONCHANGE
const s1 = '<select id="culto-tipo" style="flex:1;padding:9px 11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;">';
const r1 = '<select id="culto-tipo" onchange="_actualizarFormularioPorDia(this.value)" style="flex:1;padding:9px 11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;">';
if (code.includes(s1)) {
    code = code.replace(s1, r1);
    console.log('[OK] Select onchange inyectado');
} else {
    // try to find it without exact whitespaces if possible
    console.log('[WARN] Select onchange NO inyectado, quiza ya estaba');
}

// 2. autoDetectarTipoCulto
const s2 = `function autoDetectarTipoCulto(fechaStr) {
    if (!fechaStr) return;
    const select = document.getElementById('culto-tipo');
    if (!select) return;
    const partes = fechaStr.split('-');
    const fecha = new Date(partes[0], partes[1] - 1, partes[2], 12, 0, 0);
    const diaSemana = fecha.getDay();
    const diasMap = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Mi\\u00e9rcoles", 4: "Jueves", 5: "Viernes", 6: "S\\u00e1bado" };
    select.value = diasMap[diaSemana] || "Otro";
    // \\u2728 MODO S\\u00c1BADO: activa el formulario de 12 pasos de liturgia
    _actualizarFormularioPorDia(diaSemana === 6);
}`;
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

if (code.includes(s2)) {
    code = code.replace(s2, r2);
    console.log('[OK] autoDetectarTipoCulto modificado');
} else {
    console.log('[WARN] autoDetectarTipoCulto NO encontrado exactamente');
}

// 3. _actualizarFormularioPorDia
const s3 = `function _actualizarFormularioPorDia(esSabado) {
    const cont = document.getElementById('culto-campos-dinamicos');
    if (!cont) return;
    cont.innerHTML = esSabado ? _html12PasosSabado() : _htmlCamposNormal();
    iniciarAutoGuardadoCulto();
}`;
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

if (code.includes(s3)) {
    code = code.replace(s3, r3);
    console.log('[OK] _actualizarFormulario modificado');
} else {
    console.log('[WARN] _actualizarFormulario NO encontrado exactamente');
}

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('--- REPATCH COMPLETO ---');
