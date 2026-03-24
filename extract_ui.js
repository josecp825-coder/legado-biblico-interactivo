const fs = require('fs');

const lines = fs.readFileSync('index.html', 'utf8').split('\n');

// Find the last <script> tag which encloses the UI logic
let scriptStart = -1;
let scriptEnd = -1;

for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('</script>') && scriptEnd === -1) {
        scriptEnd = i;
    } else if (lines[i].includes('<script>') && scriptEnd !== -1 && scriptStart === -1) {
        scriptStart = i;
        break;
    }
}

if (scriptStart !== -1 && scriptEnd !== -1) {
    // Extraer todo el contenido y ajustar la identacion
    const uiCodeLines = lines.slice(scriptStart + 1, scriptEnd);
    const modContent = uiCodeLines.join('\n');
    
    fs.writeFileSync('ui_core.js', modContent, 'utf8');
    
    // Remplazar en index.html
    const newLines = [
        ...lines.slice(0, scriptStart),
        '    <script src="ui_core.js?v=381"></script>',
        ...lines.slice(scriptEnd + 1)
    ];
    
    fs.writeFileSync('index.html', newLines.join('\n'), 'utf8');
    console.log('Modulo ui_core.js extraido y linkeado con exito.');
} else {
    console.log('No se encontro el bloque script final.', scriptStart, scriptEnd);
}
