// fix_emojis_iglesia.js - Restaurar emojis y agregar botones compartir/PDF
const fs = require('fs');

const FILE = 'data_iglesia_v1.js';
let content = fs.readFileSync(FILE, 'utf8');

// Remove BOM if present
if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

console.log('Archivo leído:', content.length, 'caracteres');

// =====================================================
// REEMPLAZOS CONTEXTUALES
// =====================================================
const replacements = [
    // HEADER
    ['">? INICIO</button>', '">🏠 INICIO</button>'],

    // Icono iglesia top-right (single ?)
    ['var(--font-scale, 1));">?</div>\n            </div>', 'var(--font-scale, 1));">⛪</div>\n            </div>'],

    // TARJETA 1: Liturgia (doble ??)
    ['var(--font-scale, 1));margin-bottom:15px;">??</div>\n                        <h3 style="color:#a29bfe',
        'var(--font-scale, 1));margin-bottom:15px;">📋✨</div>\n                        <h3 style="color:#a29bfe'],

    // TARJETA 2: Doxología (single ?)
    ['var(--font-scale, 1));margin-bottom:15px;">?</div>\n                        <h3 style="color:#fdcb6e',
        'var(--font-scale, 1));margin-bottom:15px;">🙏</div>\n                        <h3 style="color:#fdcb6e'],

    // TARJETA 3: Registro Predicadores
    ['var(--font-scale, 1));margin-bottom:15px;">??</div>\n                        <h3 style="color:#fab1a0',
        'var(--font-scale, 1));margin-bottom:15px;">🎤📝</div>\n                        <h3 style="color:#fab1a0'],

    // TARJETA 4: Calendario
    ['var(--font-scale, 1));margin-bottom:15px;">??</div>\n                        <h3 style="color:#ff9f43',
        'var(--font-scale, 1));margin-bottom:15px;">📅🗓️</div>\n                        <h3 style="color:#ff9f43'],

    // TARJETA 5: Manual
    ['var(--font-scale, 1));margin-bottom:15px;">??</div>\n                        <h3 style="color:#55efc4',
        'var(--font-scale, 1));margin-bottom:15px;">📖🏛️</div>\n                        <h3 style="color:#55efc4'],

    // TARJETA 6: Guía Ancianos
    ['var(--font-scale, 1));margin-bottom:15px;">??</div>\n                        <h3 style="color:#00a8ff',
        'var(--font-scale, 1));margin-bottom:15px;">👴📘</div>\n                        <h3 style="color:#00a8ff'],

    // TARJETA 7: Historial
    ['var(--font-scale, 1));margin-bottom:15px;">???</div>\n                        <h3 style="color:#ff6b6b',
        'var(--font-scale, 1));margin-bottom:15px;">📊🔥📋</div>\n                        <h3 style="color:#ff6b6b'],

    // TARJETA 8: Fábrica Sermones  
    ['var(--font-scale, 1));">?</div>\n                            <div style="background:#fdcb6e',
        'var(--font-scale, 1));">🤖</div>\n                            <div style="background:#fdcb6e'],

    // TARJETA 9: 28 Doctrinas
    ['var(--font-scale, 1));">??</div>\n                            <div>',
        'var(--font-scale, 1));">✝️📜</div>\n                            <div>'],

    // Botón guardar programa liturgia
    ['            ?? GUARDAR PROGRAMA', '            💾✨ GUARDAR PROGRAMA'],

    // Botón borrar (trash icon - multiple)
    // Will handle with replaceAll below

    // Culto del (fecha)  
    ['>?? CULTO DEL', '>📌 CULTO DEL'],

    // REGISTRO PREDICACIONES guardar
    ['>?? GUARDAR REGISTRO</button>', '>💾📋 GUARDAR REGISTRO</button>'],

    // Fecha predicación
    ['>?? ${formatearFecha(reg.fecha)}</div>', '>📅 ${formatearFecha(reg.fecha)}</div>'],

    // Cita bíblica predicaciones
    ['>?? Texto: ${reg.cita}</div>', '>📖 Texto: ${reg.cita}</div>'],

    // Himnos predicaciones 
    ['>?? Himnos: ${reg.himnos}</div>', '>🎵 Himnos: ${reg.himnos}</div>'],

    // VISOR PDF
    ['>?? ${titulo}<', '>📄 ${titulo}<'],
    ['>?? Buscar<', '>🔍 Buscar<'],
    ["btnBuscar.textContent = '?? Buscar'", "btnBuscar.textContent = '🔍 Buscar'"],
    ['? Anterior', '⬅️ Anterior'],
    ['Siguiente ?', 'Siguiente ➡️'],
    ['? Resultado principal', '⭐ Resultado principal'],
    ['Ver<br>aquí ??', 'Ver<br>aquí 📖'],
    ['>?? Abrir el ${titulo} completo (PDF)<', '>📥 Abrir el ${titulo} completo (PDF)<'],

    // Calendario
    ['var(--font-scale, 1));margin-bottom:10px;">??</div>', 'var(--font-scale, 1));margin-bottom:10px;">📅🗓️</div>'],
    ['>?? ${m.toUpperCase()}<', '>📅 ${m.toUpperCase()}<'],
    ['>?? Compartir Calendario<', '>📤 Compartir Calendario<'],
    ['>?? El enlace expira en 4 horas', '>🔒 El enlace expira en 4 horas'],
    ['>?? ${currentMonth} 2026', '>📅 ${currentMonth} 2026'],
    ['>?? Compartir este mes<', '>📤 Compartir este mes<'],
    ['>?? El enlace se autodestruye en 4 horas', '>🔒 El enlace se autodestruye en 4 horas'],

    // Compartir calendario funciones JS
    ["botonActivo.innerHTML = '? Generando enlace...'", "botonActivo.innerHTML = '⏳ Generando enlace...'"],
    ["botonActivo.innerHTML = '? ¡Enlace listo!'", "botonActivo.innerHTML = '✅ ¡Enlace listo!'"],
    ["btn.innerHTML = '?? Compartir Calendario'", "btn.innerHTML = '📤 Compartir Calendario'"],
    ["btnMes.innerHTML = '?? Compartir este mes'", "btnMes.innerHTML = '📤 Compartir este mes'"],
    ["botonActivo.innerHTML = '? Error. Intenta de nuevo'", "botonActivo.innerHTML = '❌ Error. Intenta de nuevo'"],

    // Compartir texto calendario
    ['`?? CALENDARIO IGLESIA 2026', '`📅 CALENDARIO IGLESIA 2026'],
    ['`?? ${tituloMes}', '`📌 ${tituloMes}'],
    ['`?? Ver calendario:', '`👉 Ver calendario:'],
    ['`?? *CALENDARIO IGLESIA 2026*', '`📅 *CALENDARIO IGLESIA 2026*'],
    ['`?? *${tituloMes.toUpperCase()}*', '`📌 *${tituloMes.toUpperCase()}*'],

    // Banner enlace temporal
    ['>?? Enlace compartido', '>⏰ Enlace compartido'],

    // Enlace expirado
    ['font-size:4rem;margin-bottom:20px;">?</div>', 'font-size:4rem;margin-bottom:20px;">⏱️</div>'],

    // CONTROL DE CULTOS
    ['<span>??</span> REGISTRO DE PREDICACIÓN', '<span>📝✨</span> REGISTRO DE PREDICACIÓN'],
    ['>?? GUARDAR EN HISTORIAL<', '>💾 GUARDAR EN HISTORIAL<'],
    ['font-size:1.2rem;">??</span>', 'font-size:1.2rem;">🔍📋</span>'],
    ['>?? Predicador: <b>${reg.predicador}</b><', '>🎤 Predicador: <b>${reg.predicador}</b><'],
    ['>?? ${reg.cita}</span>', '>📖 ${reg.cita}</span>'],
    ['>?? ${reg.himnos}</span>', '>🎵 ${reg.himnos}</span>'],

    // COMPARTIR SERMÓN IA
    ["let mensaje = `?? *${titulo}*", "let mensaje = `🎤 *${titulo}*"],
    ['`???????????????', '`━━━━━━━━━━━━━━━'],
    ['`_?? Generado por IA - Legado Bíblico (Eliteservic)_`', '`_🤖 Generado por IA - Legado Bíblico (Eliteservic)_`'],

    // 28 DOCTRINAS
    ['>?? 28 DOCTRINAS<', '>✝️📜 28 DOCTRINAS<'],
    ['>?? ${d.ref}<', '>📖 ${d.ref}<'],
    ['>LEER ?<', '>LEER →<'],
    ["'?? Referencias: ' + d.ref", "'📖 Referencias: ' + d.ref"],

    // Panel cerrar
    ['font-size:1rem;">?</button>', 'font-size:1rem;">✕</button>'],

    // Error al acceder PDF
    ['? Error al acceder al documento.', '❌ Error al acceder al documento.'],

    // No results (double ??)
    ['margin-bottom:12px;">??</div>\n', 'margin-bottom:12px;">🔎</div>\n'],
];

let count = 0;
for (const [oldStr, newStr] of replacements) {
    // Try with both \n and \r\n
    if (content.includes(oldStr)) {
        content = content.replace(oldStr, newStr);
        count++;
    } else {
        const oldCRLF = oldStr.replace(/\n/g, '\r\n');
        if (content.includes(oldCRLF)) {
            content = content.replace(oldCRLF, newStr.replace(/\n/g, '\r\n'));
            count++;
        }
    }
}

console.log(`Reemplazos contextuales aplicados: ${count}`);

// === Fix remaining generic VOLVER/MESES buttons ===
content = content.split('">? VOLVER</button>').join('">⬅️ VOLVER</button>');
content = content.split('">? MESES</button>').join('">⬅️ MESES</button>');
content = content.split('">? Volver').join('">⬅️ Volver');

// === Fix trash/delete buttons (global) ===
content = content.split('>???</button>').join('>🗑️</button>');

// === Fix doctrine icons in IGLESIA_DOCTRINAS array ===
const doctrineIcons = {
    1: "📖", 2: "✨", 3: "👑", 4: "✝️", 5: "🕊️🔥",
    6: "🌍", 7: "🧬", 8: "⚔️", 9: "✝️", 10: "💝🔥",
    11: "🌱", 12: "⛪🌍", 13: "🏴", 14: "🤝", 15: "💧",
    16: "🍞", 17: "🎁", 18: "📜", 19: "📋", 20: "🕯️",
    21: "💰", 22: "🙏", 23: "💍", 24: "🏛️⚖️", 25: "☁️",
    26: "⏳", 27: "🔥", 28: "🌅"
};

for (const [num, icon] of Object.entries(doctrineIcons)) {
    // Match pattern: num: X, cat: "...", titulo: "...", icono: "??" or "?" or "???"
    const regex = new RegExp(`(num: ${num}, cat: "[^"]+", titulo: "[^"]+", icono: ")[?]+"`, 'g');
    content = content.replace(regex, `$1${icon}"`);
}

// === AGREGAR BOTONES COMPARTIR/PDF A PROGRAMAS GUARDADOS ===
const oldCard = `<div style="grid-column:1/-1;background:rgba(162,155,254,0.1);padding:10px;border-radius:8px;margin-top:5px;border:1px solid rgba(162,155,254,0.3);">
                    <span style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));">Predicador Inivitado:</span><br>
                    <span style="font-size:calc(1.1rem * var(--font-scale, 1));font-weight:bold;">\${reg.predicador}</span>
                </div>
            </div>
        </div>`;

const newCard = `<div style="grid-column:1/-1;background:rgba(162,155,254,0.1);padding:10px;border-radius:8px;margin-top:5px;border:1px solid rgba(162,155,254,0.3);">
                    <span style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));">Predicador Invitado:</span><br>
                    <span style="font-size:calc(1.1rem * var(--font-scale, 1));font-weight:bold;">\${reg.predicador}</span>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;">
                <button onclick="compartirLiturgiaTexto(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.5);color:#25D366;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.8rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:6px;">
                    📤 Compartir
                </button>
                <button onclick="descargarLiturgiaPDF(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.8rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:6px;">
                    📄 Descargar PDF
                </button>
            </div>
        </div>`;

// Handle both LF and CRLF
if (content.includes(oldCard)) {
    content = content.replace(oldCard, newCard);
    console.log('✅ Botones compartir/PDF agregados (LF)');
} else {
    const oldCRLF = oldCard.replace(/\n/g, '\r\n');
    const newCRLF = newCard.replace(/\n/g, '\r\n');
    if (content.includes(oldCRLF)) {
        content = content.replace(oldCRLF, newCRLF);
        console.log('✅ Botones compartir/PDF agregados (CRLF)');
    } else {
        console.log('⚠️ No se encontró el punto de inserción para botones compartir/PDF');
    }
}

// === AGREGAR FUNCIONES compartirLiturgiaTexto y descargarLiturgiaPDF ===
const sharingFunctions = `

// ===============================================
// COMPARTIR Y DESCARGAR PDF DE LITURGIA
// ===============================================

function compartirLiturgiaTexto(id) {
    const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const reg = registros.find(r => r.id === id);
    if (!reg) return;

    const fechaFormateada = reg.fecha.split('-').reverse().join('/');
    const nombreIglesia = localStorage.getItem('legado_nombre_iglesia') || 'Nuestra Iglesia';
    
    const texto = \`📋 *PROGRAMA DE CULTO*\\n\` +
        \`⛪ *\${nombreIglesia}*\\n\` +
        \`📅 *\${fechaFormateada}*\\n\` +
        \`━━━━━━━━━━━━━━━\\n\\n\` +
        \`👋 *Bienvenida:* \${reg.bienvenida}\\n\` +
        \`🎵 *Dir. Himnos:* \${reg.himnos}\\n\` +
        \`🙏 *Oración:* \${reg.oracion}\\n\` +
        \`👶 *Rincón Infantil:* \${reg.infantil}\\n\` +
        \`🧑 *Diácono Ofrenda:* \${reg.diacono}\\n\` +
        \`👩 *Diaconisa Ofrenda:* \${reg.diaconisa}\\n\` +
        \`🎤 *Canto Especial:* \${reg.canto}\\n\` +
        \`📖 *Cita Bíblica:* \${reg.lectura}\\n\\n\` +
        \`━━━━━━━━━━━━━━━\\n\` +
        \`🎤 *PREDICADOR INVITADO:*\\n\` +
        \`✨ *\${reg.predicador}*\\n\\n\` +
        \`_Generado por Legado Bíblico_\`;

    if (navigator.share) {
        navigator.share({
            title: 'Programa de Culto - ' + fechaFormateada,
            text: texto
        }).catch(() => {});
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
}

function descargarLiturgiaPDF(id) {
    const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const reg = registros.find(r => r.id === id);
    if (!reg) return;

    const fechaFormateada = reg.fecha.split('-').reverse().join('/');
    const nombreIglesia = localStorage.getItem('legado_nombre_iglesia') || 'Nuestra Iglesia';

    const cargar = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const margenIzq = 20;
        let y = 25;
        
        // Header
        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, 210, 45, 'F');
        
        doc.setTextColor(253, 203, 110);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('PROGRAMA DE CULTO', 105, 18, { align: 'center' });
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text(nombreIglesia, 105, 28, { align: 'center' });
        
        doc.setTextColor(162, 155, 254);
        doc.setFontSize(11);
        doc.text('Fecha: ' + fechaFormateada, 105, 36, { align: 'center' });
        
        y = 55;
        
        doc.setDrawColor(162, 155, 254);
        doc.setLineWidth(0.5);
        doc.line(margenIzq, y, 190, y);
        y += 12;
        
        const campos = [
            ['Bienvenida / Inicio', reg.bienvenida],
            ['Director de Himnos', reg.himnos],
            ['Oracion Intercesora', reg.oracion],
            ['Rincon Infantil', reg.infantil],
            ['Diacono (Ofrenda)', reg.diacono],
            ['Diaconisa (Ofrenda)', reg.diaconisa],
            ['Musica Especial', reg.canto],
            ['Lectura Biblica', reg.lectura]
        ];
        
        campos.forEach(function(campo) {
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 140);
            doc.setFont('helvetica', 'normal');
            doc.text(campo[0].toUpperCase(), margenIzq, y);
            
            doc.setFontSize(12);
            doc.setTextColor(40, 40, 60);
            doc.setFont('helvetica', 'bold');
            doc.text(campo[1] || '-', margenIzq, y + 6);
            
            doc.setDrawColor(230, 230, 240);
            doc.setLineWidth(0.2);
            doc.line(margenIzq, y + 10, 190, y + 10);
            
            y += 16;
        });
        
        y += 5;
        
        doc.setFillColor(240, 237, 255);
        doc.roundedRect(margenIzq - 5, y - 5, 175, 25, 3, 3, 'F');
        doc.setDrawColor(162, 155, 254);
        doc.setLineWidth(0.5);
        doc.roundedRect(margenIzq - 5, y - 5, 175, 25, 3, 3, 'S');
        
        doc.setFontSize(9);
        doc.setTextColor(120, 100, 200);
        doc.setFont('helvetica', 'normal');
        doc.text('PREDICADOR INVITADO', margenIzq, y + 3);
        
        doc.setFontSize(14);
        doc.setTextColor(60, 40, 120);
        doc.setFont('helvetica', 'bold');
        doc.text(reg.predicador || '-', margenIzq, y + 14);
        
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 190);
        doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico - Eliteservic', 105, 280, { align: 'center' });
        
        doc.save('Programa_Culto_' + reg.fecha + '.pdf');
        
        if (typeof mostrarToast === 'function') mostrarToast('PDF descargado!');
    };

    if (window.jspdf) {
        cargar();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = cargar;
        script.onerror = function() {
            alert('Error cargando la librería PDF. Verifica tu conexión a internet.');
        };
        document.head.appendChild(script);
    }
}
`;

// Insert sharing functions at the end of the file (after cerrarDoctrinaPanel)
const insertMarker = 'function cerrarDoctrinaPanel(event, forzar) {';
const insertIdx = content.lastIndexOf(insertMarker);
if (insertIdx >= 0) {
    // Find the closing brace of this function
    let braceCount = 0;
    let foundStart = false;
    let endIdx = insertIdx;
    for (let i = insertIdx; i < content.length; i++) {
        if (content[i] === '{') { braceCount++; foundStart = true; }
        if (content[i] === '}') { braceCount--; }
        if (foundStart && braceCount === 0) {
            endIdx = i + 1;
            break;
        }
    }
    content = content.slice(0, endIdx) + '\n' + sharingFunctions + content.slice(endIdx);
    console.log('✅ Funciones compartir/PDF insertadas');
} else {
    // Append at the end
    content += sharingFunctions;
    console.log('✅ Funciones compartir/PDF agregadas al final');
}

// Check for any remaining lone ? that should be emojis
const remainingQMarks = (content.match(/[>"](\?{1,3})[<"]/g) || []);
console.log('Signos ? restantes en contextos HTML:', remainingQMarks.length);
if (remainingQMarks.length > 0 && remainingQMarks.length < 20) {
    remainingQMarks.forEach(m => console.log('  ->', m));
}

// Write the fixed file
fs.writeFileSync(FILE, content, 'utf8');
console.log('\n✅ Archivo corregido exitosamente!');
console.log('  - Emojis restaurados');
console.log('  - Botones de Compartir y PDF agregados');
console.log('  - Funciones compartirLiturgiaTexto() y descargarLiturgiaPDF() agregadas');
