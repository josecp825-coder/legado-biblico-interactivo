const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// ============================================================
// 1. En el HTML del formulario: agregar sab_infantil_anuncia
//    justo ANTES de _campoItem('sab_infantil', ...)
// ============================================================
const OLD_INFANTIL = "_campoItem('sab_infantil', '4', '\\u{1f476}', 'RINC\\u00d3N INFANTIL', 'Nombre del responsable...', ORO)";

// Nuevo bloque: campo de anuncio + campo de quien conduce
const NEW_INFANTIL = `\`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\\u{1f476}</span>
                <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">4</span>
                RINC\\u00d3N INFANTIL
            </label>
            <input type="text" id="culto-sab_infantil_anuncia" placeholder="\\u00bfQui\\u00e9n anuncia el rinc\\u00f3n infantil?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            <input type="text" id="culto-sab_infantil" placeholder="\\u00bfQui\\u00e9n conduce el rinc\\u00f3n infantil?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\``;

if (c.includes(OLD_INFANTIL)) {
    c = c.replace(OLD_INFANTIL, NEW_INFANTIL);
    console.log('OK: HTML formulario actualizado');
} else {
    console.log('ERROR: no encontrado OLD_INFANTIL');
    const idx = c.indexOf('sab_infantil');
    console.log('sab_infantil en idx:', idx);
}

// ============================================================
// 2. Agregar sab_infantil_anuncia al camposSabadoArr
//    (antes de 'sab_infantil')
// ============================================================
const OLD_ARR = "'sab_infantil','sab_ofrendas'";
const NEW_ARR = "'sab_infantil_anuncia','sab_infantil','sab_ofrendas'";
if (c.includes(OLD_ARR)) {
    c = c.replace(OLD_ARR, NEW_ARR);
    console.log('OK: camposSabadoArr actualizado');
} else {
    console.log('ERROR: no encontrado OLD_ARR');
}

// ============================================================
// 3. Agregar sab_infantil_anuncia en el helper de compartir
//    _textoCompartirCulto - actualizar la linea de infantil
// ============================================================
const OLD_INF_SHARE = "if (reg.sab_infantil)           l.push(`\\u{1F476}  4. Rinc\\u00f3n Infantil: ${reg.sab_infantil}`);";
const NEW_INF_SHARE = `if (reg.sab_infantil_anuncia)   l.push(\`\\u{1F4E2}     Anuncia rinc\\u00f3n: \${reg.sab_infantil_anuncia}\`);
        if (reg.sab_infantil)           l.push(\`\\u{1F476}  4. Rinc\\u00f3n Infantil: \${reg.sab_infantil}\`);`;
if (c.includes(OLD_INF_SHARE)) {
    c = c.replace(OLD_INF_SHARE, NEW_INF_SHARE);
    console.log('OK: helper compartir actualizado');
} else {
    // Buscar variante
    const idx = c.indexOf('sab_infantil)           l.push');
    console.log('compartir idx:', idx);
}

// ============================================================
// 4. Agregar en compartirCultoPlantilla (imagen elegante)
//    la fila de sab_infantil_anuncia
// ============================================================
const OLD_INF_PLANT = "if (reg.sab_infantil)   aper += fila('\\u{1F476}', '4. Rinc\\u00f3n Infantil', reg.sab_infantil);";
const NEW_INF_PLANT = `if (reg.sab_infantil_anuncia) aper += fila('\\u{1F4E2}', 'Anuncia rinc\\u00f3n inf.', reg.sab_infantil_anuncia);
        if (reg.sab_infantil)   aper += fila('\\u{1F476}', '4. Rinc\\u00f3n Infantil', reg.sab_infantil);`;
if (c.includes(OLD_INF_PLANT)) {
    c = c.replace(OLD_INF_PLANT, NEW_INF_PLANT);
    console.log('OK: plantilla imagen actualizada');
} else {
    const idx = c.indexOf('sab_infantil)   aper');
    console.log('plantilla idx:', idx);
}

// ============================================================
// 5. Agregar en cargarCultosSemana (historial detalle)
// ============================================================
const OLD_INF_HIST = "reg.sab_infantil ? `\\u{1F476} 4. Rinc\\u00f3n Infantil: ${reg.sab_infantil}` : '',";
const NEW_INF_HIST = `reg.sab_infantil_anuncia ? \`\\u{1F4E2} 4. Anuncia rinc\\u00f3n: \${reg.sab_infantil_anuncia}\` : '',
                reg.sab_infantil ? \`\\u{1F476}    Conduce rinc\\u00f3n: \${reg.sab_infantil}\` : '',`;
if (c.includes(OLD_INF_HIST)) {
    c = c.replace(OLD_INF_HIST, NEW_INF_HIST);
    console.log('OK: historial detalle actualizado');
} else {
    const idx = c.indexOf('sab_infantil ? `');
    console.log('historial idx:', idx);
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== ARCHIVO GUARDADO ===');
console.log('Tamano:', c.length);
