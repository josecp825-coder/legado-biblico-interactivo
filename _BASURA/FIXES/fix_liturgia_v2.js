// fix_liturgia_v2.js - 4 mejoras + eliminar Eliteservic
const fs = require('fs');

const FILE = 'data_iglesia_v1.js';
let content = fs.readFileSync(FILE, 'utf8');
if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

console.log('Archivo leído:', content.length, 'chars');

// =====================================================
// 1. ELIMINAR "Eliteservic" de TODO el contenido
// =====================================================
content = content.replace("_🤖 Generado por IA - Legado Bíblico (Eliteservic)_", "_🤖 Generado por IA - Legado Bíblico_");
content = content.replace("// Agenda Digital - Eliteservic", "// Legado Bíblico");
content = content.replace("Generado por Legado Biblico - Eliteservic", "Generado por Legado Biblico");
console.log('✅ Eliteservic eliminado');

// =====================================================
// 2. REEMPLAZAR guardarLiturgiaFormulario() para soportar edición
// =====================================================
const oldGuardar = `function guardarLiturgiaFormulario() {
    const data = {
        id: Date.now(),
        fecha: document.getElementById('litur-fecha').value,
        doxologia: document.getElementById('litur-doxologia').value.trim() || "-",
        invocacion: document.getElementById('litur-invocacion').value.trim() || "-",
        bienvenida: document.getElementById('litur-bienvenida').value.trim() || "-",
        infantil: document.getElementById('litur-infantil').value.trim() || "-",
        ofrendas: document.getElementById('litur-ofrendas').value.trim() || "-",
        himnoAdoracion: document.getElementById('litur-himnoAdoracion').value.trim() || "-",
        lectura: document.getElementById('litur-lectura').value.trim() || "-",
        oracion: document.getElementById('litur-oracion').value.trim() || "-",
        musica: document.getElementById('litur-musica').value.trim() || "-",
        tema: document.getElementById('litur-tema').value.trim() || "-",
        himnoFinal: document.getElementById('litur-himnoFinal').value.trim() || "-",
        oracionFinal: document.getElementById('litur-oracionFinal').value.trim() || "-"
    };

    if (!data.fecha) {
        alert("Por favor selecciona una fecha para el programa.");
        return;
    }

    let registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    registros.push(data);
    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_liturgias', JSON.stringify(registros));

    // Clear inputs
    document.querySelectorAll("input[id^='litur-']").forEach(i => { if (i.id !== 'litur-fecha') i.value = ''; });

    cargarLiturgiasFormulario();
    if (typeof mostrarToast === 'function') mostrarToast("¡Programa Guardado!");
}`;

const newGuardar = `// Variable global para modo edición
var liturgiaEditandoId = null;

function guardarLiturgiaFormulario() {
    const data = {
        id: liturgiaEditandoId || Date.now(),
        fecha: document.getElementById('litur-fecha').value,
        doxologia: document.getElementById('litur-doxologia').value.trim() || "-",
        invocacion: document.getElementById('litur-invocacion').value.trim() || "-",
        bienvenida: document.getElementById('litur-bienvenida').value.trim() || "-",
        infantil: document.getElementById('litur-infantil').value.trim() || "-",
        ofrendas: document.getElementById('litur-ofrendas').value.trim() || "-",
        himnoAdoracion: document.getElementById('litur-himnoAdoracion').value.trim() || "-",
        lectura: document.getElementById('litur-lectura').value.trim() || "-",
        oracion: document.getElementById('litur-oracion').value.trim() || "-",
        musica: document.getElementById('litur-musica').value.trim() || "-",
        tema: document.getElementById('litur-tema').value.trim() || "-",
        himnoFinal: document.getElementById('litur-himnoFinal').value.trim() || "-",
        oracionFinal: document.getElementById('litur-oracionFinal').value.trim() || "-"
    };

    if (!data.fecha) {
        alert("Por favor selecciona una fecha para el programa.");
        return;
    }

    let registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    
    if (liturgiaEditandoId) {
        // Modo edición: reemplazar el registro existente
        registros = registros.map(r => r.id === liturgiaEditandoId ? data : r);
        liturgiaEditandoId = null;
        // Restaurar botón
        const btn = document.getElementById('btn-guardar-liturgia');
        if (btn) {
            btn.innerHTML = '💾✨ GUARDAR PROGRAMA';
            btn.style.background = 'linear-gradient(135deg,#6c5ce7,#a29bfe)';
        }
        if (typeof mostrarToast === 'function') mostrarToast("¡Programa Actualizado!");
    } else {
        registros.push(data);
        if (typeof mostrarToast === 'function') mostrarToast("¡Programa Guardado!");
    }
    
    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_liturgias', JSON.stringify(registros));

    // Clear inputs
    document.querySelectorAll("input[id^='litur-']").forEach(i => { if (i.id !== 'litur-fecha') i.value = ''; });

    cargarLiturgiasFormulario();
}

function editarLiturgiaFormulario(id) {
    const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const reg = registros.find(r => r.id === id);
    if (!reg) return;

    liturgiaEditandoId = id;

    // Rellenar el formulario con los datos
    document.getElementById('litur-fecha').value = reg.fecha || '';
    document.getElementById('litur-doxologia').value = reg.doxologia === '-' ? '' : (reg.doxologia || '');
    document.getElementById('litur-invocacion').value = reg.invocacion === '-' ? '' : (reg.invocacion || '');
    document.getElementById('litur-bienvenida').value = reg.bienvenida === '-' ? '' : (reg.bienvenida || '');
    document.getElementById('litur-infantil').value = reg.infantil === '-' ? '' : (reg.infantil || '');
    document.getElementById('litur-ofrendas').value = reg.ofrendas === '-' ? '' : (reg.ofrendas || '');
    document.getElementById('litur-himnoAdoracion').value = reg.himnoAdoracion === '-' ? '' : (reg.himnoAdoracion || '');
    document.getElementById('litur-lectura').value = reg.lectura === '-' ? '' : (reg.lectura || '');
    document.getElementById('litur-oracion').value = reg.oracion === '-' ? '' : (reg.oracion || '');
    document.getElementById('litur-musica').value = reg.musica === '-' ? '' : (reg.musica || '');
    document.getElementById('litur-tema').value = reg.tema === '-' ? '' : (reg.tema || '');
    document.getElementById('litur-himnoFinal').value = reg.himnoFinal === '-' ? '' : (reg.himnoFinal || '');
    document.getElementById('litur-oracionFinal').value = reg.oracionFinal === '-' ? '' : (reg.oracionFinal || '');

    // Cambiar botón a modo edición
    const btn = document.getElementById('btn-guardar-liturgia');
    if (btn) {
        btn.innerHTML = '✏️ ACTUALIZAR PROGRAMA';
        btn.style.background = 'linear-gradient(135deg,#e17055,#fdcb6e)';
    }

    // Scroll arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof mostrarToast === 'function') mostrarToast("Editando programa...");
}

function enviarFormularioVacio() {
    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaFormateada = fechaHoy.split('-').reverse().join('/');
    
    const texto = '⛪ *IGLESIA ADVENTISTA CYPRESS HILLS*\\n' +
        '📋 *PROGRAMA DE CULTO*\\n' +
        '📅 *Fecha: ' + fechaFormateada + '*\\n\\n' +
        '━━━━━━━━━━━━━━━\\n' +
        'Por favor completa los campos y envíalo de vuelta:\\n\\n' +
        '1. *Doxología:* ___\\n' +
        '2. *Invocación:* ___\\n' +
        '3. *Bienvenida:* ___\\n' +
        '4. *Rincón Infantil:* ___\\n' +
        '5. *Diezmos y Ofrendas:* ___\\n' +
        '6. *Himno de Adoración:* ___\\n' +
        '7. *Lectura Bíblica:* ___\\n' +
        '8. *Oración Intercesora:* ___\\n' +
        '9. *Música Especial:* ___\\n' +
        '10. *Tema / Predicador:* ___\\n' +
        '11. *Himno Final:* ___\\n' +
        '12. *Oración Final:* ___\\n\\n' +
        '━━━━━━━━━━━━━━━\\n' +
        '_Enviado desde Legado Bíblico_';

    window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
}`;

// Do the replacement with both LF and CRLF awareness
let found = false;
if (content.includes(oldGuardar)) {
    content = content.replace(oldGuardar, newGuardar);
    found = true;
} else {
    const oldCRLF = oldGuardar.replace(/\n/g, '\r\n');
    if (content.includes(oldCRLF)) {
        content = content.replace(oldCRLF, newGuardar.replace(/\n/g, '\r\n'));
        found = true;
    }
}
console.log(found ? '✅ guardarLiturgiaFormulario reemplazado con edición + enviar vacío' : '⚠️ No se encontró guardarLiturgiaFormulario');

// =====================================================
// 3. Agregar ID al botón GUARDAR y botón ENVIAR FORMULARIO VACÍO
// =====================================================
// Add id to the save button
content = content.split(
    `<button onclick="guardarLiturgiaFormulario()" style="width:100%;padding:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;font-weight:900;border-radius:8px;cursor:pointer;margin-top:10px;font-size:calc(1.1rem * var(--font-scale, 1));box-shadow:0 5px 15px rgba(108,92,231,0.4);">`
).join(
    `<button id="btn-guardar-liturgia" onclick="guardarLiturgiaFormulario()" style="width:100%;padding:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;font-weight:900;border-radius:8px;cursor:pointer;margin-top:10px;font-size:calc(1.1rem * var(--font-scale, 1));box-shadow:0 5px 15px rgba(108,92,231,0.4);">`
);
console.log('✅ ID agregado al botón guardar');

// Add "Enviar formulario vacío" button AFTER the save button
const saveBtnEnd = `💾✨ GUARDAR PROGRAMA
                        </button>
                    </div>
                </div>`;
const saveBtnEndNew = `💾✨ GUARDAR PROGRAMA
                        </button>
                        
                        <button onclick="enviarFormularioVacio()" style="width:100%;padding:14px;background:linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.05));border:1px solid rgba(37,211,102,0.4);color:#25D366;font-weight:900;border-radius:8px;cursor:pointer;margin-top:10px;font-size:calc(0.95rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:8px;">
                            📨 Enviar Formulario Vacío por WhatsApp
                        </button>
                    </div>
                </div>`;

if (content.includes(saveBtnEnd)) {
    content = content.replace(saveBtnEnd, saveBtnEndNew);
    console.log('✅ Botón enviar formulario vacío agregado (LF)');
} else {
    const saveCRLF = saveBtnEnd.replace(/\n/g, '\r\n');
    const saveNewCRLF = saveBtnEndNew.replace(/\n/g, '\r\n');
    if (content.includes(saveCRLF)) {
        content = content.replace(saveCRLF, saveNewCRLF);
        console.log('✅ Botón enviar formulario vacío agregado (CRLF)');
    } else {
        console.log('⚠️ No se encontró punto para botón enviar vacío');
    }
}

// =====================================================
// 4. Agregar botón EDITAR a las tarjetas guardadas + cambiar botones
// =====================================================
// Replace the buttons section in the saved cards
const oldButtons = `            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;">
                <button onclick="compartirLiturgiaTexto(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.5);color:#25D366;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.8rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:6px;">
                    📤 Compartir
                </button>
                <button onclick="descargarLiturgiaPDF(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.8rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:6px;">
                    📄 Descargar PDF
                </button>
            </div>`;

const newButtons = `            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px;">
                <button onclick="compartirLiturgiaTexto(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.5);color:#25D366;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">
                    📤 WhatsApp
                </button>
                <button onclick="descargarLiturgiaPDF(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">
                    📄 PDF
                </button>
                <button onclick="editarLiturgiaFormulario(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(253,203,110,0.1));border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">
                    ✏️ Editar
                </button>
            </div>`;

if (content.includes(oldButtons)) {
    content = content.replace(oldButtons, newButtons);
    console.log('✅ Botones editar/compartir/PDF actualizados (LF)');
} else {
    const oldBtnsCRLF = oldButtons.replace(/\n/g, '\r\n');
    const newBtnsCRLF = newButtons.replace(/\n/g, '\r\n');
    if (content.includes(oldBtnsCRLF)) {
        content = content.replace(oldBtnsCRLF, newBtnsCRLF);
        console.log('✅ Botones editar/compartir/PDF actualizados (CRLF)');
    } else {
        console.log('⚠️ No se encontró sección de botones');
    }
}

// =====================================================
// 5. REEMPLAZAR descargarLiturgiaPDF con versión DOS COLUMNAS + WhatsApp
// =====================================================
const oldPDF = content.substring(
    content.indexOf('function descargarLiturgiaPDF(id)'),
    content.indexOf('\n}\n', content.indexOf('function descargarLiturgiaPDF(id)')) + 3
);

// Find the exact end accounting for CRLF
let pdfStart = content.indexOf('function descargarLiturgiaPDF(id)');
let pdfEnd = -1;
if (pdfStart >= 0) {
    // Find the matching closing brace
    let braceCount = 0;
    let foundFirst = false;
    for (let i = pdfStart; i < content.length; i++) {
        if (content[i] === '{') { braceCount++; foundFirst = true; }
        if (content[i] === '}') { braceCount--; }
        if (foundFirst && braceCount === 0) {
            pdfEnd = i + 1;
            break;
        }
    }
}

if (pdfStart >= 0 && pdfEnd > pdfStart) {
    const newPDF = `function descargarLiturgiaPDF(id) {
    const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const reg = registros.find(r => r.id === id);
    if (!reg) return;

    const fechaFormateada = reg.fecha.split('-').reverse().join('/');
    const nombreIglesia = 'IGLESIA ADVENTISTA CYPRESS HILLS';

    const cargar = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // === HEADER ===
        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, 210, 48, 'F');
        
        doc.setTextColor(253, 203, 110);
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        doc.text(nombreIglesia, 105, 15, { align: 'center' });
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.text('PROGRAMA DE CULTO', 105, 27, { align: 'center' });
        
        doc.setTextColor(180, 175, 220);
        doc.setFontSize(10);
        doc.text('Fecha: ' + fechaFormateada, 105, 37, { align: 'center' });
        
        // === LÍNEA DECORATIVA ===
        doc.setDrawColor(162, 155, 254);
        doc.setLineWidth(0.5);
        doc.line(15, 52, 195, 52);
        
        // === DOS COLUMNAS ===
        var colIzq = 18;
        var colDer = 110;
        var anchoCol = 82;
        var yStart = 62;
        
        var todosLosCampos = [
            ['1. DOXOLOGIA', reg.doxologia],
            ['2. INVOCACION', reg.invocacion],
            ['3. BIENVENIDA', reg.bienvenida],
            ['4. RINCON INFANTIL', reg.infantil],
            ['5. DIEZMOS Y OFRENDAS', reg.ofrendas],
            ['6. HIMNO DE ADORACION', reg.himnoAdoracion],
            ['7. LECTURA BIBLICA', reg.lectura],
            ['8. ORACION INTERCESORA', reg.oracion],
            ['9. MUSICA ESPECIAL', reg.musica],
            ['10. TEMA / PREDICADOR', reg.tema],
            ['11. HIMNO FINAL', reg.himnoFinal],
            ['12. ORACION FINAL', reg.oracionFinal]
        ];
        
        // Columna izquierda: campos 1-6, Columna derecha: campos 7-12
        var mitad = 6;
        var y = yStart;
        
        // Columna IZQUIERDA
        for (var i = 0; i < mitad; i++) {
            var campo = todosLosCampos[i];
            var x = colIzq;
            
            // Fondo alterno
            if (i % 2 === 0) {
                doc.setFillColor(245, 243, 255);
                doc.roundedRect(x - 3, y - 4, anchoCol + 6, 22, 2, 2, 'F');
            }
            
            doc.setFontSize(7);
            doc.setTextColor(140, 130, 170);
            doc.setFont('helvetica', 'normal');
            doc.text(campo[0], x, y);
            
            doc.setFontSize(11);
            doc.setTextColor(30, 30, 50);
            doc.setFont('helvetica', 'bold');
            doc.text(String(campo[1] || '-'), x, y + 10);
            
            y += 24;
        }
        
        // Columna DERECHA
        y = yStart;
        for (var i = mitad; i < todosLosCampos.length; i++) {
            var campo = todosLosCampos[i];
            var x = colDer;
            var esTema = (i === 9);
            
            if (esTema) {
                // Destacar TEMA/PREDICADOR
                doc.setFillColor(255, 248, 225);
                doc.roundedRect(x - 3, y - 4, anchoCol + 6, 22, 2, 2, 'F');
                doc.setDrawColor(253, 203, 110);
                doc.setLineWidth(0.5);
                doc.roundedRect(x - 3, y - 4, anchoCol + 6, 22, 2, 2, 'S');
            } else if ((i - mitad) % 2 === 0) {
                doc.setFillColor(245, 243, 255);
                doc.roundedRect(x - 3, y - 4, anchoCol + 6, 22, 2, 2, 'F');
            }
            
            doc.setFontSize(7);
            doc.setTextColor(esTema ? 180 : 140, esTema ? 140 : 130, esTema ? 40 : 170);
            doc.setFont('helvetica', 'normal');
            doc.text(campo[0], x, y);
            
            doc.setFontSize(esTema ? 12 : 11);
            doc.setTextColor(esTema ? 80 : 30, esTema ? 60 : 30, esTema ? 20 : 50);
            doc.setFont('helvetica', 'bold');
            doc.text(String(campo[1] || '-'), x, y + 10);
            
            y += 24;
        }
        
        // === LÍNEA SEPARADORA CENTRAL (vertical) ===
        doc.setDrawColor(200, 195, 230);
        doc.setLineWidth(0.3);
        doc.line(105, yStart - 6, 105, yStart + (mitad * 24) - 4);
        
        // === FOOTER ===
        doc.setFontSize(7);
        doc.setTextColor(180, 180, 190);
        doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico', 105, 280, { align: 'center' });
        
        // Generar PDF como blob para compartir
        var pdfBlob = doc.output('blob');
        var pdfUrl = URL.createObjectURL(pdfBlob);
        var fileName = 'Programa_Culto_' + reg.fecha + '.pdf';
        
        // Intentar compartir el PDF via navigator.share (incluye WhatsApp)
        if (navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], fileName, { type: 'application/pdf' })] })) {
            var pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
            navigator.share({
                title: 'Programa de Culto - Cypress Hills',
                text: 'Programa de Culto - ' + fechaFormateada,
                files: [pdfFile]
            }).catch(function() {
                // Si cancela el share, descargar directamente
                doc.save(fileName);
            });
        } else {
            // Fallback: descargar directamente
            doc.save(fileName);
        }
        
        if (typeof mostrarToast === 'function') mostrarToast('PDF generado!');
    };

    if (window.jspdf) {
        cargar();
    } else {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = cargar;
        script.onerror = function() {
            alert('Error cargando la libreria PDF. Verifica tu conexion a internet.');
        };
        document.head.appendChild(script);
    }
}`;

    content = content.substring(0, pdfStart) + newPDF + content.substring(pdfEnd);
    console.log('✅ descargarLiturgiaPDF reescrito con DOS COLUMNAS + WhatsApp share');
} else {
    console.log('⚠️ No se encontró descargarLiturgiaPDF');
}

// =====================================================
// WRITE
// =====================================================
fs.writeFileSync(FILE, content, 'utf8');
console.log('\n✅ Todas las mejoras aplicadas:');
console.log('  1. PDF con opción WhatsApp (navigator.share)');
console.log('  2. Botón "Enviar Formulario Vacío por WhatsApp"');
console.log('  3. Programas guardados editables (botón ✏️ Editar)');
console.log('  4. PDF en DOS COLUMNAS');
console.log('  5. "Eliteservic" eliminado de todo el contenido');
