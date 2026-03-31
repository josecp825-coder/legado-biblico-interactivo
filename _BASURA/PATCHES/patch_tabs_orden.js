const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// Insertar contenedor.innerHTML y pestanas entre tabStyle y el tab-content-form
// El problema: falta la linea contenedor.innerHTML = ` con el header y las pestanas
// Buscar exactamente: tabStyle y luego el TAB 1 comentario

const TARGET = `        : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';\r\n\r\n        <!-- ======== TAB 1: FORMULARIO ======== -->`;

const REPLACEMENT = `        : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';\r\n\r\n    contenedor.innerHTML = \`\r\n    <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">\r\n      <!-- HEADER FIJO -->\r\n      <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:14px 15px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,107,107,0.25);">\r\n        <button type="button" onclick="renderModuloIglesia()" style="background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;padding:8px 14px;border-radius:8px;font-weight:900;font-size:0.85rem;">\\u2B05\\uFE0F</button>\r\n        <div style="flex:1;">\r\n          <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:0.85rem;">\\u{1F4CB} REGISTRO DE CULTOS</div>\r\n          <div style="color:rgba(255,255,255,0.3);font-size:0.58rem;">Iglesia Adventista Cypress Hills</div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- PESTANAS -->\r\n      <div style="padding:12px 14px 0;max-width:600px;margin:0 auto;">\r\n        <div style="display:flex;gap:8px;margin-bottom:15px;" id="tabs-culto">\r\n          <button id="tab-btn-form" onclick="cambiarTabCulto('form')" style="\${tabStyle(true)}">📝<br>Formulario</button>\r\n          <button id="tab-btn-cultos" onclick="cambiarTabCulto('cultos')" style="\${tabStyle(false)}">📋<br>Historial<br>de Culto</button>\r\n          <button id="tab-btn-eventos" onclick="cambiarTabCulto('eventos')" style="\${tabStyle(false)}">⭐<br>Programas<br>Especiales</button>\r\n          <button id="tab-btn-buscar" onclick="cambiarTabCulto('buscar')" style="\${tabStyle(false)}">🔍<br>Buscar</button>\r\n        </div>\r\n\r\n        <!-- ======== TAB 1: FORMULARIO ======== -->`;

if (code.includes(TARGET)) {
    code = code.replace(TARGET, REPLACEMENT);
    fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
    console.log('[OK] contenedor.innerHTML y pestanas insertados correctamente con CRLF.');
} else {
    // Probar con LF
    const TARGET_LF = TARGET.replace(/\r\n/g, '\n');
    const REPLACEMENT_LF = REPLACEMENT.replace(/\r\n/g, '\n');
    if (code.includes(TARGET_LF)) {
        code = code.replace(TARGET_LF, REPLACEMENT_LF);
        fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
        console.log('[OK] contenedor.innerHTML insertado con LF.');
    } else {
        // Buscar sin el comentario, solo el tabStyle final
        const idx = code.indexOf("'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04)");
        const idx2 = code.indexOf('<!-- ======== TAB 1: FORMULARIO', idx);
        if (idx > 0 && idx2 > 0) {
            // Insertar entre tabStyle y el comentario TAB 1
            const inserta = `\n\n    contenedor.innerHTML = \`\n    <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">\n      <!-- HEADER FIJO -->\n      <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:14px 15px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,107,107,0.25);">\n        <button type="button" onclick="renderModuloIglesia()" style="background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;padding:8px 14px;border-radius:8px;font-weight:900;font-size:0.85rem;">\\u2B05\\uFE0F</button>\n        <div style="flex:1;">\n          <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:0.85rem;">\\u{1F4CB} REGISTRO DE CULTOS</div>\n          <div style="color:rgba(255,255,255,0.3);font-size:0.58rem;">Iglesia Adventista Cypress Hills</div>\n        </div>\n      </div>\n      <!-- PESTANAS -->\n      <div style="padding:12px 14px 0;max-width:600px;margin:0 auto;">\n        <div style="display:flex;gap:8px;margin-bottom:15px;" id="tabs-culto">\n          <button id="tab-btn-form" onclick="cambiarTabCulto('form')" style="\${tabStyle(true)}">📝<br>Formulario</button>\n          <button id="tab-btn-cultos" onclick="cambiarTabCulto('cultos')" style="\${tabStyle(false)}">📋<br>Historial<br>de Culto</button>\n          <button id="tab-btn-eventos" onclick="cambiarTabCulto('eventos')" style="\${tabStyle(false)}">⭐<br>Programas<br>Especiales</button>\n          <button id="tab-btn-buscar" onclick="cambiarTabCulto('buscar')" style="\${tabStyle(false)}">🔍<br>Buscar</button>\n        </div>\n\n        `;
            code = code.slice(0, idx2) + inserta + code.slice(idx2);
            fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
            console.log('[OK] Insertado con splice en ' + idx2);
        } else {
            console.log('[FAIL] No se encontro punto de insercion. idx:', idx, 'idx2:', idx2);
        }
    }
}
