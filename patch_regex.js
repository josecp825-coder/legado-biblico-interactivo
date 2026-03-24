const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the specific problem area using a very generous Regex that captures the entire block of 5 document.getElementById lines
const blockRegex = /document\.getElementById\('dev-icon'\)\.textContent = d\.icon;[\s\S]*?document\.getElementById\('dev-reflexion'\)\.textContent = d\.reflexion;/;

const newBlock = `                    document.getElementById('dev-icon').textContent = d.icon || '📖';
                    document.getElementById('dev-label').textContent = d.titulo || 'Devocional del Día';
                    
                    let versiculoTexto = d.ref || '';
                    let refTexto = '';
                    if (versiculoTexto.includes('—')) {
                        const partes = versiculoTexto.split('—');
                        versiculoTexto = partes[0].trim();
                        refTexto = partes[1] ? '📖 ' + partes[1].trim() : '';
                    } else if (versiculoTexto.includes('-')) {
                        const partes = versiculoTexto.split('-');
                        versiculoTexto = partes[0].trim();
                        refTexto = partes[1] ? '📖 ' + partes[1].trim() : '';
                    } else {
                        refTexto = ''; // No delimiter found
                    }
                    
                    document.getElementById('dev-versiculo').textContent = versiculoTexto;
                    document.getElementById('dev-referencia').textContent = refTexto;
                    document.getElementById('dev-reflexion').textContent = d.reflexion || '';`;

if(blockRegex.test(html)) {
    html = html.replace(blockRegex, newBlock);
    console.log('Block replaced completely!');
} else {
    console.log('Regex failed to match the block!');
}

// 2. Fix the static texts in the Overlay HTML
html = html.replace(/DEVOCIONAL DEL D.A/g, 'DEVOCIONAL DEL DÍA');
html = html.replace(/REFLEXI.N DIARIA/g, 'REFLEXIÓN DIARIA');
html = html.replace(/Devocional del D.a/g, 'Devocional del Día');
html = html.replace(/REFLEXI.N/g, 'REFLEXIÓN');

// 3. Guarantee 'dev-icon' rendering in opening
html = html.replace(/document\.getElementById\('dev-icon'\)\?\.textContent \|\| ' .';/, "document.getElementById('dev-icon')?.textContent || '📖';");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Finished text patching');
