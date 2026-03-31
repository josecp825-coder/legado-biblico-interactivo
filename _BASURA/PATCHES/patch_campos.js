const fs = require('fs');
let c = fs.readFileSync('data_iglesia_v1.js', 'utf8').split('\n');
c[2782] = c[2782].replace(
    "'sab_oracion_intercesora','sab_musica_especial'", 
    "'sab_oracion_intercesora','sab_musica_anuncia','sab_musica_especial'"
);
fs.writeFileSync('data_iglesia_v1.js', c.join('\n'));
console.log('Fixed editarCulto missing field');
