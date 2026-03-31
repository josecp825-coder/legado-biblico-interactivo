const fs = require('fs');
let c = fs.readFileSync('data_iglesia_v1.js', 'utf8').split('\n');
c[2444] = '    if(!mantenerFormulario) { ' + c[2444];
c[2445] = c[2445] + ' }';
c[2447] = '    if (typeof mostrarToast === "function" && !mantenerFormulario) mostrarToast("\\u2705 Culto registrado");';
fs.writeFileSync('data_iglesia_v1.js', c.join('\n'));
console.log('Fixed array lines');
