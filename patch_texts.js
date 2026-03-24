const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The multi_replace tool wrongly matched things.
// I will just use EXACT string index replacement to fix the Devocional rendering block.

const exactStr = `                    document.getElementById('dev-icon').textContent = d.icon;
                    document.getElementById('dev-label').textContent = d.titulo;
                    document.getElementById('dev-versiculo').textContent = d.ref.split('—')[0].trim();
                    document.getElementById('dev-referencia').textContent = ' ' + d.ref.split('')[1]?.trim();
                    document.getElementById('dev-reflexion').textContent = d.reflexion;`;

const newStr = `                    document.getElementById('dev-icon').textContent = d.icon || '📖';
                    document.getElementById('dev-label').textContent = d.titulo || 'Devocional del Día';
                    
                    // Manejo seguro del split (guion largo '—' vs guion normal '-' vs caracteres corruptos)
                    let versiculoTexto = d.ref || '';
                    let refTexto = '';
                    if (versiculoTexto.includes('—')) {
                        const partes = versiculoTexto.split('—');
                        versiculoTexto = partes[0].trim();
                        refTexto = partes[1].trim();
                    } else if (versiculoTexto.includes('-')) {
                        const partes = versiculoTexto.split('-');
                        versiculoTexto = partes[0].trim();
                        refTexto = partes[1].trim();
                    }
                    
                    document.getElementById('dev-versiculo').textContent = versiculoTexto;
                    document.getElementById('dev-referencia').textContent = refTexto ? '📖 ' + refTexto : '';
                    document.getElementById('dev-reflexion').textContent = d.reflexion || '';`;

html = html.replace(exactStr, newStr);

// Let's also replace the corrupted `Devocional del Da` and `REFLEXIN DIARIA` inside the overlay HTML!
html = html.replace(/DEVOCIONAL DEL D.A/g, 'DEVOCIONAL DEL DÍA');
html = html.replace(/REFLEXI.N DIARIA/g, 'REFLEXIÓN DIARIA');
html = html.replace(/Devocional del D.a/g, 'Devocional del Día');
html = html.replace(/REFLEXI.N/g, 'REFLEXIÓN');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed rendering logic and overlay texts successfully!');
