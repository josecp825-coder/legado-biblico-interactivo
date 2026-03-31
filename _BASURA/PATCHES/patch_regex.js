const fs = require('fs');
let c = fs.readFileSync('data_iglesia_v1.js', 'utf8');

c = c.replace(/'sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_especial',/, 
    "'sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_anuncia','sab_musica_especial',");

// Find HTML target with regex for spacing
const htmlRegex = /_campoItem\('sab_musica_especial',\s*'9',\s*'\\u\{1f3a4\}',\s*'M\\u00daSICA ESPECIAL',\s*'Qui\\u00e9n o qu\\u00e9 grupo canta...',\s*ORO\)\s*\+/;
const htmlReplace = `\`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\\u{1f3a4}</span>
                <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">9</span>
                M\\u00daSICA ESPECIAL
            </label>
            <input type="text" id="culto-sab_musica_anuncia" placeholder="\\u00bfQui\\u00e9n anuncia la m\\u00fasica especial?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            <input type="text" id="culto-sab_musica_especial" placeholder="\\u00bfQui\\u00e9n o qu\\u00e9 grupo canta?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\` +`;
if(c.match(htmlRegex)) {
    c = c.replace(htmlRegex, htmlReplace);
    console.log("HTML replaced!");
}

const renderRegex = /f\('9\.\s+Oraci\\[uo\\]00f3n\s+Intercesora'[^;]+;\s*f\('Presenta\s+predicador'[^;]+;\s*f\('11\.\s+Predicador\/a'[^;]+;\s*f\('10\.\s+M\[uú\\]00daSICA\s+Especial'[^;]+;/i;
// Actually the text is f('9. Oración Intercesora' ... f('Presenta predicador', ...) etc!
// Let's just find `f('10. Música Especial', reg.sab_musica_especial);` and `f('11. Predicador/a', reg.sab_predicador);` 
const regexBlocks = /f\('Presenta predicador',\s*reg.sab_pred_anuncia\);\s+f\('11\. Predicador\/a',\s*reg.sab_predicador\);\s+f\('10\. Música Especial',\s*reg.sab_musica_especial\);/g;
const blockReplace = `// 10. Música Especial con anunciador opcional
        (function() {
            if (!reg.sab_musica_anuncia && !reg.sab_musica_especial) return;
            var partes = [];
            if (reg.sab_musica_anuncia) partes.push('Anuncia: ' + reg.sab_musica_anuncia);
            if (reg.sab_musica_especial) partes.push('Canta: ' + reg.sab_musica_especial);
            _orden++; filas.push({label:'10. Música Especial', value: partes.join('  ·  '), orden: _orden});
        })();
        f('Presenta predicador', reg.sab_pred_anuncia);
        f('11. Predicador/a', reg.sab_predicador);`;

if(c.match(regexBlocks)) {
    c = c.replace(regexBlocks, blockReplace);
    console.log("Render block replaced!");
}

// WA text logic (if exists) "10. Música Especial"
const waRegex = /'9\?\?\s+\*M\\u00fasica\s+Especial:\*\s+'\s*\+\s*\(reg\.musica/g;
// Actually let's just use what they have: Compartir txt: `9?? *Música Especial:* ' + (reg.musica || '-')` 
// I won't touch WA logic since `musica` is mapped properly from `sab_musica_especial` somewhere else?
// Let's check `compartirLiturgiaTexto` mapping.

fs.writeFileSync('data_iglesia_v1.js', c);
