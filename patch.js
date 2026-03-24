const fs = require('fs');

const htmlPath = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\index.html';
const fixedPath = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\fixed.js';

let html = fs.readFileSync(htmlPath, 'utf8'); // It will read invalid chars as \uFFFD
let fixed = fs.readFileSync(fixedPath, 'utf8');

let startIndex = -1;
let endIndex = -1;

const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const VERSICULOS = [')) {
        if (startIndex === -1) startIndex = i;
    }
    if (lines[i].includes('];') && i > startIndex + 100 && startIndex !== -1) {
        endIndex = i;
        break;
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    const newLines = lines.slice(0, startIndex).concat(fixed.split('\n'), lines.slice(endIndex + 1));
    fs.writeFileSync(htmlPath, newLines.join('\n'), 'utf8');
    console.log(`Patched successfully from line ${startIndex} to ${endIndex}`);
} else {
    console.log('Failed to find boundaries');
}
