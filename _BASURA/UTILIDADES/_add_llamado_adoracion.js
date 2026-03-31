const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

// ============================================================
// CAMBIO 1: Agregar LLAMADO A LA ADORACION entre anciano y doxologia
//           + Convertir DOXOLOGIA a campo de himno con autocomplete
// ============================================================

// El bloque actual es:
// `</div>` +   (cierre del bloque anciano)
//  _campoItem('sab_doxologia', '1', '\u2728', 'DOXOLOGÍA', 'Nombre del responsable...', ORO) +

const OLD_DOX = `        _campoItem('sab_doxologia', '1', '\\u2728', 'DOXOLOG\\u00cdA', 'Nombre del responsable...', ORO) +`;

const NEW_DOX = `        \`<div style="background:rgba(${'{'}ORO},0.04);border:1.5px solid rgba(${'{'}ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(${'{'}ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\\u{1f4ef}</span>
                <span style="color:rgba(${'{'}ORO},0.6);font-size:0.6rem;background:rgba(${'{'}ORO},0.1);padding:2px 8px;border-radius:6px;">0</span>
                LLAMADO A LA ADORACI\\u00d3N
            </label>
            <input type="text" id="culto-sab_llamado" placeholder="\\u00bfQui\\u00e9n hace el llamado a la adoraci\\u00f3n?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${'{'}ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\` +
        _campoItem('sab_doxologia', '1', '\\u2728', 'DOXOLOG\\u00cdA', '# del himno de doxolog\\u00eda...', ORO, true) +`;

if (c.includes(OLD_DOX)) {
    c = c.replace(OLD_DOX, NEW_DOX);
    console.log('OK: LLAMADO + DOXOLOGIA himno añadidos');
} else {
    console.log('ERROR: no encontrado OLD_DOX');
    const idx = c.indexOf("sab_doxologia', '1'");
    console.log('idx sab_doxologia:', idx);
    if (idx >= 0) console.log(c.substring(idx - 10, idx + 120));
}

// ============================================================
// CAMBIO 2: Agregar sab_llamado al camposSabadoArr
// ============================================================
const OLD_ARR = "'sab_anciano_tipo','sab_anciano','sab_himno_anuncia'";
const NEW_ARR = "'sab_anciano_tipo','sab_anciano','sab_llamado','sab_himno_anuncia'";
if (c.includes(OLD_ARR)) {
    c = c.replace(OLD_ARR, NEW_ARR);
    console.log('OK: camposSabadoArr actualizado con sab_llamado');
} else {
    console.log('ERROR: no encontrado OLD_ARR');
}

// ============================================================
// CAMBIO 3: Agregar sab_llamado en el helper _textoCompartirCulto
// ============================================================
const OLD_SHARE_DOX = "if (reg.sab_doxologia)  l.push(`\\u2728  1. Doxolog\\u00eda: ${reg.sab_doxologia}`);";
const NEW_SHARE_DOX = `if (reg.sab_llamado)     l.push(\`\\u{1F4EF}  0. Llamado a la adoraci\\u00f3n: \${reg.sab_llamado}\`);
        if (reg.sab_doxologia)  l.push(\`\\u2728  1. Doxolog\\u00eda: \${reg.sab_doxologia}\`);`;
if (c.includes(OLD_SHARE_DOX)) {
    c = c.replace(OLD_SHARE_DOX, NEW_SHARE_DOX);
    console.log('OK: helper compartir actualizado');
} else {
    console.log('ERROR: no encontrado OLD_SHARE_DOX');
}

// ============================================================
// CAMBIO 4: Agregar sab_llamado en compartirCultoPlantilla
// ============================================================
const OLD_PLANT_DOX = "if (reg.sab_doxologia)  aper += fila('\\u2728', '1. Doxolog\\u00eda', reg.sab_doxologia);";
const NEW_PLANT_DOX = `if (reg.sab_llamado)    aper += fila('\\u{1F4EF}', '0. Llamado a la adoraci\\u00f3n', reg.sab_llamado);
        if (reg.sab_doxologia)  aper += fila('\\u2728', '1. Doxolog\\u00eda', reg.sab_doxologia, '#ffeaa7');`;
if (c.includes(OLD_PLANT_DOX)) {
    c = c.replace(OLD_PLANT_DOX, NEW_PLANT_DOX);
    console.log('OK: plantilla imagen actualizada');
} else {
    console.log('ERROR: no encontrado OLD_PLANT_DOX');
}

// ============================================================
// CAMBIO 5: Agregar sab_llamado en cargarCultosSemana (historial)
// ============================================================
const OLD_HIST_DOX = "reg.sab_doxologia ? `\\u2728 1. Doxolog\\u00eda: ${reg.sab_doxologia}` : '',";
const NEW_HIST_DOX = `reg.sab_llamado ? \`\\u{1F4EF} 0. Llamado adoraci\\u00f3n: \${reg.sab_llamado}\` : '',
                reg.sab_doxologia ? \`\\u2728 1. Doxolog\\u00eda: \${reg.sab_doxologia}\` : '',`;
if (c.includes(OLD_HIST_DOX)) {
    c = c.replace(OLD_HIST_DOX, NEW_HIST_DOX);
    console.log('OK: historial actualizado');
} else {
    console.log('ERROR: no encontrado OLD_HIST_DOX');
}

fs.writeFileSync(FILE, c, 'utf8');
console.log('=== GUARDADO. Tamano:', c.length);
