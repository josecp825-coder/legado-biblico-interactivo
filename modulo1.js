const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const vStart = html.indexOf('const VERSICULOS = [');
const dEndStr = '];\n';
let dEnd = html.indexOf('const DEVOCIONALES = [', vStart);
if (dEnd !== -1) {
    dEnd = html.indexOf('];', dEnd) + 2; // Include the closing bracket and semi-colon
}

if (vStart !== -1 && dEnd !== -1) {
    // 1. Extraer todo el bloque de texto
    const pwaDataBlock = html.substring(vStart, dEnd);
    
    // 2. Guardarlo en el nuevo archivo js
    fs.writeFileSync('datos_devocionales.js', pwaDataBlock, 'utf8');
    console.log('Modulo datos_devocionales.js creado con exito.');
    
    // 3. Removerlo del index.html y colocar un breve comentario indicando donde estaba
    const headerInsert = '<script src="datos_devocionales.js?v=381"></script>\n    <script>';
    // The `<script>` tag originally opened right before the variables probably, let's inject earlier in the head.
    
    // Let's just remove the block from the inline script completely
    const startStr = html.substring(0, vStart);
    const endStr = html.substring(dEnd);
    
    // Add the `<script src>` right before the main script tag starts! 
    // Usually there is `<script>` just above `const VERSICULOS`.
    // We can do a string replace!
    
    let newHtml = startStr + '\n                // LOS DEVOCIONALES SE MOVIERON AL ARCHIVO: datos_devocionales.js\n' + endStr;
    
    // Inject the script tag in the document's body or head
    // Let's inject it right before `// SISTEMA DE VERSIÓN EMBEBIDA`
    // Or just after `<head>`!
    newHtml = newHtml.replace('<head>', '<head>\n    <script src="datos_devocionales.js?v=381"></script>');
    
    fs.writeFileSync('index.html', newHtml, 'utf8');
    console.log('index.html modularizado y etiquetado con exito.');
} else {
    console.log('No se pudo encontrar los límites del array.');
}
