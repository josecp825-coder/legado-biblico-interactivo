const fs = require('fs');
const filepath = 'data_iglesia_v1.js';
let content = fs.readFileSync(filepath, 'utf8');

// 1. ADD 'sab_musica_anuncia' to fields array
const arrTarget = "'sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_especial',";
const arrReplace = "'sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_anuncia','sab_musica_especial',";
content = content.replace(arrTarget, arrReplace);

// 2. HTML GENERATOR REPLACEMENT
const htmlTarget = "_campoItem('sab_musica_especial', '9', '\\u{1f3a4}', 'M\\u00daSICA ESPECIAL', 'Qui\\u00e9n o qu\\u00e9 grupo canta...', ORO) +";
const htmlReplace = `\`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\\u{1f3a4}</span>
                <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">9</span>
                M\\u00daSICA ESPECIAL
            </label>
            <input type="text" id="culto-sab_musica_anuncia" placeholder="\\u00bfQui\\u00e9n anuncia la parte especial?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            <input type="text" id="culto-sab_musica_especial" placeholder="\\u00bfQui\\u00e9n o qu\\u00e9 grupo canta?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\` +`;
if (content.includes(htmlTarget)) {
    content = content.replace(htmlTarget, htmlReplace);
}

// 3. RENDER FIX & REORDERING
const renderTarget = `        f('Presenta predicador', reg.sab_pred_anuncia);
        f('11. Predicador/a', reg.sab_predicador);
        f('10. Música Especial', reg.sab_musica_especial);`;
const renderReplace = `        // 9. Música Especial con anunciador opcional
        (function() {
            if (!reg.sab_musica_anuncia && !reg.sab_musica_especial) return;
            var partes = [];
            if (reg.sab_musica_anuncia) partes.push('Anuncia: ' + reg.sab_musica_anuncia);
            if (reg.sab_musica_especial) partes.push('Canta: ' + reg.sab_musica_especial);
            _orden++; filas.push({label:'10. Música Especial', value: partes.join('  ·  '), orden: _orden});
        })();
        f('Presenta predicador', reg.sab_pred_anuncia);
        f('11. Predicador/a', reg.sab_predicador);`;
if (content.includes(renderTarget)) {
    content = content.replace(renderTarget, renderReplace);
}

// Also doing the WA export logic for Sabato
const waTarget = "if (reg.sab_musica_especial) { obj['10. Música Especial'] = reg.sab_musica_especial; txt += `🎙️ 10. Música Especial: ${reg.sab_musica_especial}\\n`; }";
const waReplace = "if (reg.sab_musica_anuncia || reg.sab_musica_especial) { const mTxt = (reg.sab_musica_anuncia ? 'Anuncia: '+reg.sab_musica_anuncia+' · ' : '') + (reg.sab_musica_especial||''); obj['10. Música Especial'] = mTxt; txt += `🎙️ 10. Música Especial: ${mTxt}\\n`; }";
if (content.includes(waTarget)) {
    content = content.replace(waTarget, waReplace);
}

fs.writeFileSync(filepath, content, 'utf8');

console.log('Patch complete.');
