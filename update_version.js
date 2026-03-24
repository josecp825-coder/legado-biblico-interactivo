const fs = require('fs');

let f = fs.readFileSync('index.html', 'utf8');
f = f.replace(/const _HTML_VERSION = '\d+';[^\n]*/g, "const _HTML_VERSION = '377'; // CORREGIDO");
fs.writeFileSync('index.html', f, 'utf8');

console.log('Fixed index.html version');
