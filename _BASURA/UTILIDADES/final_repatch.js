const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

const minimalAuto = `    _actualizarFormularioPorDia(diaSemana === 6);\r\n}`;
const rAuto = `    _actualizarFormularioPorDia(diaSemana === 6 ? true : diasMap[diaSemana]);\r\n}`;
if (code.includes(minimalAuto)) {
    code = code.replace(minimalAuto, rAuto);
    console.log('[OK] Minimal autoDetectarTipoCulto (CRLF)');
} else if (code.includes(minimalAuto.replace(/\r/g, ''))) {
    code = code.replace(minimalAuto.replace(/\r/g, ''), rAuto.replace(/\r/g, ''));
    console.log('[OK] Minimal autoDetectarTipoCulto (LF)');
} else {
    // maybe there's a comment before the call? let's do a strict regex match!
    const r = /(_actualizarFormularioPorDia\(diaSemana === 6\);\s*\})/;
    if (r.test(code)) {
        code = code.replace(r, "_actualizarFormularioPorDia(diaSemana === 6 ? true : diasMap[diaSemana]);\n}");
        console.log('[OK] autoDetectarTipoCulto regex fallback');
    } else {
        console.log('[FAIL] autoDetectarTipoCulto');
    }
}

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
