const fs = require('fs');
let content = fs.readFileSync('build_cultos.js', 'utf8');

// Identificar los IDs de los campos que deben llevar autocompletado de nombres
const ids = ['reg-anciano', 'reg-diacono', 'reg-diaconisa', 'reg-alabanza', 'reg-bienvenida', 'reg-oracionIni', 'reg-himnoIni-quien', 'reg-lectura-quien', 'reg-testimonios', 'reg-especial-quien', 'reg-predicador-quien', 'reg-mensaje', 'reg-himnoFin-quien', 'reg-oracionFin'];

ids.forEach(id => {
    const regex = new RegExp(`(<input type="text" id="${id}"[^>]*)(>)`, "g");
    content = content.replace(regex, (match, p1, p2) => {
        if(p1.includes('autocompleteNombre')) return match; 
        return `${p1} oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" autocomplete="off"${p2}`;
    });
});

const functionsStr = `
// ==========================================
// AUTOCOMPLETADO DE NOMBRES INTELIGENTE
// ==========================================
function getNombresGlobales() {
    const base = [
        'Jose Castillo', 'Jose Luis Candelario', 'Jose Lopez', 'Luz Lopez', 'Nerlys Maza', 'Cecilia Wilson', 'Daniel Marque', // Ancianos
        'Juan Ernesto', 'Juan Antigua', 'John Chica', 'Flavio Candelario', 'Freddy Varga', 'Engel Candelario', 'Logan Varga', // Diaconos
        'Donil Ortega', 'Carina Antigua', 'Maria Tomas', 'Fermina Hernandez', 'Grinilda Guzman' // Ujieres/Diaconisas
    ];
    let pool = new Set(base);
    // Recuperar historial para fusionar dinamicamente cualquier nombre no estandar previamente escrito
    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
    let campos = ['anciano', 'diacono', 'diaconisa', 'alabanza', 'bienvenida', 'oracionIni', 'himnoIni_quien', 'lectura_quien', 'especial_quien', 'predicador_quien', 'mensaje', 'himnoFin_quien', 'oracionFin'];
    registros.forEach(r => {
        campos.forEach(c => {
            if (r[c] && r[c] !== '-' && r[c].trim().length > 0) {
                let tokens = r[c].split(/\\s*\\/\\s*|\\s+y\\s+|,\\s*/);
                tokens.forEach(t => {
                    if (t.trim().length > 2 && isNaN(t.trim())) pool.add(t.trim());
                });
            }
        });
    });
    return Array.from(pool);
}

window.autocompleteNombre = function(input) {
    let todos = getNombresGlobales();
    let rawVal = input.value;
    
    // Separamos por un '/' para soportar multiples encargados
    let tokens = rawVal.split(/\\s*\\/\\s*/);
    let currentVal = tokens[tokens.length - 1].toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    
    const sugId = 'sug-' + input.id;
    let sugDiv = document.getElementById(sugId);
    if (!sugDiv) {
        sugDiv = document.createElement('div');
        sugDiv.id = sugId;
        sugDiv.style = "margin-top:2px;display:none;position:absolute;z-index:900;width:calc(100% - 24px);max-width:400px;box-shadow:0 8px 16px rgba(0,0,0,0.6);border-radius:8px;";
        input.parentNode.style.position = 'relative'; 
        input.parentNode.appendChild(sugDiv);
    }
    
    if (currentVal.length < 1) {
        sugDiv.style.display = 'none';
        return;
    }
    
    const matches = todos.filter(n => {
        let nStr = n.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
        // Buscar palabras parciales
        return nStr.includes(currentVal);
    }).slice(0, 6);
    
    if (matches.length > 0) {
        sugDiv.style.display = 'block';
        sugDiv.innerHTML = matches.map(m => {
            return '<button type="button" onclick="seleccionarNombre(\\'' + input.id + '\\', \\'' + m + '\\')" style="display:block;width:100%;text-align:left;padding:12px 14px;background:rgba(15,23,42,0.98);border:1px solid rgba(136,84,208,0.5);color:#a55eea;cursor:pointer;font-size:0.95rem;margin-bottom:2px;font-weight:bold;">👤 ' + m + '</button>';
        }).join('');
    } else {
        sugDiv.style.display = 'none';
    }
}

window.seleccionarNombre = function(inputId, seleccionado) {
    const input = document.getElementById(inputId);
    let tokens = input.value.split(/\\s*\\/\\s*/);
    tokens[tokens.length - 1] = seleccionado;
    input.value = tokens.join(' / ') + ' '; // Dejamos un espacio listo para seguir
    document.getElementById('sug-' + inputId).style.display = 'none';
    input.focus();
}

// Ocultar sugerencias si se da click afuera
document.addEventListener('click', function(e) {
    if(!e.target.closest('div[id^="sug-"]') && !e.target.closest('input[id^="reg-"]')) {
        document.querySelectorAll('div[id^="sug-"]').forEach(d => d.style.display = 'none');
    }
});
`;

if(!content.includes('function getNombresGlobales')) {
    content = content.replace('window.renderCultosRegulares = renderCultosRegulares;', functionsStr + '\nwindow.renderCultosRegulares = renderCultosRegulares;');
}

fs.writeFileSync('build_cultos.js', content, 'utf8');
console.log('Script patched successfully');
