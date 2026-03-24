const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/const _HTML_VERSION\s*=\s*['"]\d+['"].*/g, "const _HTML_VERSION = '376'; // ← CAMBIAR EN CADA DEPLOY");
fs.writeFileSync('index.html', html, 'utf8');
console.log('Index.html version forceful sync complete.');
