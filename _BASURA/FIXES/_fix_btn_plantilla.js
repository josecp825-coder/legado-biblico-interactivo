const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');

const idx = c.indexOf('compartirCultoHistorial(${reg.id})" style="flex:1;padding:8px;background:rgba(162,155,254');
console.log('idx:', idx);

if (idx >= 0) {
    const endIdx = c.indexOf('</button>', idx) + '</button>'.length;
    const fullBtn = c.substring(idx - 'onclick="'.length, endIdx);
    console.log('Boton encontrado:', fullBtn.substring(0, 100), '...');
    
    const newBtn = fullBtn
        .replace('compartirCultoHistorial(${reg.id})', 'compartirCultoPlantilla(${reg.id})')
        .replace('\u{1F4E4} COMPARTIR', '\u{1F5BC}\uFE0F PLANTILLA');
    
    c = c.substring(0, idx - 'onclick="'.length) + newBtn + c.substring(endIdx);
    console.log('Reemplazo OK');
    console.log('compartirCultoPlantilla en botones:', c.indexOf('compartirCultoPlantilla(${reg.id})') > 0);
    fs.writeFileSync(FILE, c, 'utf8');
    console.log('Guardado');
} else {
    // Buscar mas amplio
    const idx2 = c.indexOf('compartirCultoHistorial(${reg');
    console.log('idx2:', idx2);
    if (idx2 >= 0) console.log(c.substring(idx2 - 20, idx2 + 300));
}
