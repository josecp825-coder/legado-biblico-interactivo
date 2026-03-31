// fix_all_liturgia.js - Reestructurar liturgia + 4 mejoras + quitar Eliteservic
// Trabaja sobre el archivo que ya tiene emojis fijos pero el formulario viejo
const fs = require('fs');

const FILE = 'data_iglesia_v1.js';
let c = fs.readFileSync(FILE, 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
console.log('Leído:', c.length);

// Normalizar CRLF a LF para facilitar reemplazos
c = c.replace(/\r\n/g, '\n');

// ============ ELIMINAR ELITESERVIC ============
c = c.replace('_🤖 Generado por IA - Legado Bíblico (Eliteservic)_', '_🤖 Generado por IA - Legado Bíblico_');
c = c.replace('// Agenda Digital - Eliteservic', '// Legado Bíblico');
console.log('✅ Eliteservic eliminado');

// ============ REEMPLAZAR FORMULARIO COMPLETO ============
// Old form: from line 114 to line 167 (old structure)
const oldFormStart = `                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(162,155,254,0.2);padding:20px;border-radius:15px;">
                    <div style="display:grid;gap:15px;">
                        <input type="date" id="litur-fecha"`;
const oldFormEnd = `                            💾✨ GUARDAR PROGRAMA
                        </button>
                    </div>
                </div>`;

const newForm = `                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(162,155,254,0.2);padding:20px;border-radius:15px;">
                    <div style="text-align:center;margin-bottom:15px;">
                        <div style="color:#fdcb6e;font-weight:900;font-size:calc(1rem * var(--font-scale, 1));letter-spacing:2px;">⛪ IGLESIA ADVENTISTA CYPRESS HILLS</div>
                    </div>
                    <div style="display:grid;gap:15px;">
                        <input type="date" id="litur-fecha" style="width:100%;padding:12px;background:rgba(0,0,0,0.5);border:1px solid #a29bfe80;color:#fff;border-radius:8px;outline:none;" required>
                        
                        <div>
                            <label style="color:#fdcb6e;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">1. Doxología</label>
                            <input type="text" id="litur-doxologia" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">2. Invocación</label>
                            <input type="text" id="litur-invocacion" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">3. Bienvenida</label>
                            <input type="text" id="litur-bienvenida" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">4. Rincón Infantil</label>
                            <input type="text" id="litur-infantil" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">5. Diezmos y Ofrendas</label>
                            <input type="text" id="litur-ofrendas" placeholder="Nombre del encargado..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">6. Himno de Adoración</label>
                            <input type="text" id="litur-himnoAdoracion" placeholder="Himno #..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">7. Lectura Bíblica</label>
                            <input type="text" id="litur-lectura" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">8. Oración Intercesora</label>
                            <input type="text" id="litur-oracion" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">9. Música Especial</label>
                            <input type="text" id="litur-musica" placeholder="Quién cantará..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#fdcb6e;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">10. Tema / Predicador</label>
                            <input type="text" id="litur-tema" placeholder="Nombre del predicador..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(253,203,110,0.3);color:#fff;border-radius:8px;margin-top:5px;outline:none;font-weight:bold;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">11. Himno Final</label>
                            <input type="text" id="litur-himnoFinal" placeholder="Himno #..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        <div>
                            <label style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));font-weight:bold;">12. Oración Final</label>
                            <input type="text" id="litur-oracionFinal" placeholder="Nombre..." style="width:100%;padding:10px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;">
                        </div>
                        
                        <button id="btn-guardar-liturgia" onclick="guardarLiturgiaFormulario()" style="width:100%;padding:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;font-weight:900;border-radius:8px;cursor:pointer;margin-top:10px;font-size:calc(1.1rem * var(--font-scale, 1));box-shadow:0 5px 15px rgba(108,92,231,0.4);">
                            💾✨ GUARDAR PROGRAMA
                        </button>
                        
                        <button onclick="enviarFormularioVacio()" style="width:100%;padding:14px;background:linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.05));border:1px solid rgba(37,211,102,0.4);color:#25D366;font-weight:900;border-radius:8px;cursor:pointer;margin-top:5px;font-size:calc(0.95rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:8px;">
                            📨 Enviar Formulario Vacío por WhatsApp
                        </button>
                    </div>
                </div>`;

let i1 = c.indexOf(oldFormStart);
let i2 = c.indexOf(oldFormEnd);
if (i1 >= 0 && i2 >= 0) {
    c = c.substring(0, i1) + newForm + c.substring(i2 + oldFormEnd.length);
    console.log('✅ Formulario reestructurado (12 campos + botón enviar vacío)');
} else {
    console.log('⚠️ Form not found, i1=' + i1 + ' i2=' + i2);
}

// ============ REEMPLAZAR guardarLiturgiaFormulario + borrar ============
const oldGuardarBlock = `function guardarLiturgiaFormulario() {
    const data = {
        id: Date.now(),
        fecha: document.getElementById('litur-fecha').value,
        bienvenida: document.getElementById('litur-bienvenida').value.trim() || "-",
        himnos: document.getElementById('litur-himnos').value.trim() || "-",
        oracion: document.getElementById('litur-oracion').value.trim() || "-",
        diacono: document.getElementById('litur-diacono').value.trim() || "-",
        diaconisa: document.getElementById('litur-diaconisa').value.trim() || "-",
        infantil: document.getElementById('litur-infantil').value.trim() || "-",
        canto: document.getElementById('litur-canto').value.trim() || "-",
        lectura: document.getElementById('litur-lectura').value.trim() || "-",
        predicador: document.getElementById('litur-predicador').value.trim() || "-"
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

const newGuardarBlock = `// Variable global para modo edición
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
    if (!data.fecha) { alert("Por favor selecciona una fecha."); return; }
    let registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    if (liturgiaEditandoId) {
        registros = registros.map(r => r.id === liturgiaEditandoId ? data : r);
        liturgiaEditandoId = null;
        var btn = document.getElementById('btn-guardar-liturgia');
        if (btn) { btn.innerHTML = '💾✨ GUARDAR PROGRAMA'; btn.style.background = 'linear-gradient(135deg,#6c5ce7,#a29bfe)'; }
        if (typeof mostrarToast === 'function') mostrarToast("¡Programa Actualizado!");
    } else {
        registros.push(data);
        if (typeof mostrarToast === 'function') mostrarToast("¡Programa Guardado!");
    }
    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_liturgias', JSON.stringify(registros));
    document.querySelectorAll("input[id^='litur-']").forEach(i => { if (i.id !== 'litur-fecha') i.value = ''; });
    cargarLiturgiasFormulario();
}

function editarLiturgiaFormulario(id) {
    var registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    var reg = registros.find(function(r) { return r.id === id; });
    if (!reg) return;
    liturgiaEditandoId = id;
    document.getElementById('litur-fecha').value = reg.fecha || '';
    var campos = ['doxologia','invocacion','bienvenida','infantil','ofrendas','himnoAdoracion','lectura','oracion','musica','tema','himnoFinal','oracionFinal'];
    campos.forEach(function(k) {
        var el = document.getElementById('litur-' + k);
        if (el) el.value = (reg[k] && reg[k] !== '-') ? reg[k] : '';
    });
    var btn = document.getElementById('btn-guardar-liturgia');
    if (btn) { btn.innerHTML = '✏️ ACTUALIZAR PROGRAMA'; btn.style.background = 'linear-gradient(135deg,#e17055,#fdcb6e)'; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof mostrarToast === 'function') mostrarToast("Editando programa...");
}

function enviarFormularioVacio() {
    var fechaHoy = new Date().toISOString().split('T')[0];
    var fecha = fechaHoy.split('-').reverse().join('/');
    var texto = '⛪ *IGLESIA ADVENTISTA CYPRESS HILLS*\\n' +
        '📋 *PROGRAMA DE CULTO*\\n' +
        '📅 *Fecha: ' + fecha + '*\\n\\n' +
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

if (c.includes(oldGuardarBlock)) {
    c = c.replace(oldGuardarBlock, newGuardarBlock);
    console.log('✅ guardar/editar/enviarVacío reemplazados');
} else {
    console.log('⚠️ No se encontró guardarLiturgiaFormulario viejo');
}

// ============ REEMPLAZAR cargarLiturgiasFormulario (tarjetas) ============
const oldListaStart = `    contenedor.innerHTML = registros.map(reg => \`
        <div style="background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:5px solid #a29bfe;position:relative;">
            <button onclick="borrarLiturgiaFormulario(\${reg.id})"`;
const oldListaEnd = `    \`).join('');
}`;

const newLista = `    contenedor.innerHTML = registros.map(reg => \`
        <div style="background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:5px solid #a29bfe;position:relative;">
            <button onclick="borrarLiturgiaFormulario(\${reg.id})" style="position:absolute;top:15px;right:15px;background:transparent;border:none;color:#ff7675;font-size:calc(1.4rem * var(--font-scale, 1));cursor:pointer;">🗑️</button>
            <div style="color:#fdcb6e;font-weight:900;font-size:calc(0.75rem * var(--font-scale, 1));text-align:center;margin-bottom:5px;letter-spacing:1px;">⛪ IGLESIA ADVENTISTA CYPRESS HILLS</div>
            <div style="color:#a29bfe;font-weight:900;font-size:calc(0.9rem * var(--font-scale, 1));margin-bottom:15px;border-bottom:1px dashed rgba(162,155,254,0.3);padding-bottom:10px;text-align:center;">📌 CULTO DEL \${reg.fecha.split('-').reverse().join('/')}</div>
            <div style="display:grid;gap:6px;font-size:calc(0.85rem * var(--font-scale, 1));color:#fff;">
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(253,203,110,0.08);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">1. Doxología</span><b>\${reg.doxologia||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">2. Invocación</span><b>\${reg.invocacion||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">3. Bienvenida</span><b>\${reg.bienvenida||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">4. Rincón Infantil</span><b>\${reg.infantil||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">5. Diezmos/Ofrendas</span><b>\${reg.ofrendas||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">6. Himno Adoración</span><b>\${reg.himnoAdoracion||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">7. Lectura Bíblica</span><b>\${reg.lectura||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">8. Oración Intercesora</span><b>\${reg.oracion||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">9. Música Especial</span><b>\${reg.musica||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:7px 10px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.3);border-radius:6px;margin-top:4px;"><span style="color:#fdcb6e;font-weight:900;">10. Predicador</span><b style="color:#fdcb6e;">\${reg.tema||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">11. Himno Final</span><b>\${reg.himnoFinal||'-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">12. Oración Final</span><b>\${reg.oracionFinal||'-'}</b></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px;">
                <button onclick="compartirLiturgiaTexto(\${reg.id})" style="padding:9px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.5);color:#25D366;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">📤 WhatsApp</button>
                <button onclick="descargarLiturgiaPDF(\${reg.id})" style="padding:9px;background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">📄 PDF</button>
                <button onclick="editarLiturgiaFormulario(\${reg.id})" style="padding:9px;background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(253,203,110,0.1));border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">✏️ Editar</button>
            </div>
        </div>
    \`).join('');
}`;

let li1 = c.indexOf(oldListaStart);
let li2 = c.indexOf(oldListaEnd, li1);
if (li1 >= 0 && li2 >= 0) {
    c = c.substring(0, li1) + newLista + c.substring(li2 + oldListaEnd.length);
    console.log('✅ Tarjetas guardadas actualizadas (12 campos + 3 botones)');
} else {
    console.log('⚠️ Lista no encontrada li1=' + li1 + ' li2=' + li2);
}

// ============ REEMPLAZAR compartirLiturgiaTexto ============
let cti = c.indexOf('function compartirLiturgiaTexto(id)');
if (cti >= 0) {
    let braces = 0, found = false, end = cti;
    for (let i = cti; i < c.length; i++) {
        if (c[i] === '{') { braces++; found = true; }
        if (c[i] === '}') { braces--; }
        if (found && braces === 0) { end = i + 1; break; }
    }
    const newCompartir = `function compartirLiturgiaTexto(id) {
    var registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    var reg = registros.find(function(r) { return r.id === id; });
    if (!reg) return;
    var f = reg.fecha.split('-').reverse().join('/');
    var t = '⛪ *IGLESIA ADVENTISTA CYPRESS HILLS*\\n' +
        '📋 *PROGRAMA DE CULTO*\\n📅 *' + f + '*\\n' +
        '━━━━━━━━━━━━━━━\\n\\n' +
        '1️⃣ *Doxología:* ' + (reg.doxologia||'-') + '\\n' +
        '2️⃣ *Invocación:* ' + (reg.invocacion||'-') + '\\n' +
        '3️⃣ *Bienvenida:* ' + (reg.bienvenida||'-') + '\\n' +
        '4️⃣ *Rincón Infantil:* ' + (reg.infantil||'-') + '\\n' +
        '5️⃣ *Diezmos y Ofrendas:* ' + (reg.ofrendas||'-') + '\\n' +
        '6️⃣ *Himno de Adoración:* ' + (reg.himnoAdoracion||'-') + '\\n' +
        '7️⃣ *Lectura Bíblica:* ' + (reg.lectura||'-') + '\\n' +
        '8️⃣ *Oración Intercesora:* ' + (reg.oracion||'-') + '\\n' +
        '9️⃣ *Música Especial:* ' + (reg.musica||'-') + '\\n' +
        '🔟 *Tema / Predicador:* ' + (reg.tema||'-') + '\\n' +
        '1️⃣1️⃣ *Himno Final:* ' + (reg.himnoFinal||'-') + '\\n' +
        '1️⃣2️⃣ *Oración Final:* ' + (reg.oracionFinal||'-') + '\\n\\n' +
        '━━━━━━━━━━━━━━━\\n_Generado por Legado Bíblico_';
    if (navigator.share) {
        navigator.share({ title: 'Programa Culto - Cypress Hills - ' + f, text: t }).catch(function(){});
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(t), '_blank');
    }
}`;
    c = c.substring(0, cti) + newCompartir + c.substring(end);
    console.log('✅ compartirLiturgiaTexto actualizado');
}

// ============ REEMPLAZAR descargarLiturgiaPDF (DOS COLUMNAS + WhatsApp) ============
let pi = c.indexOf('function descargarLiturgiaPDF(id)');
if (pi >= 0) {
    let braces = 0, found = false, end = pi;
    for (let i = pi; i < c.length; i++) {
        if (c[i] === '{') { braces++; found = true; }
        if (c[i] === '}') { braces--; }
        if (found && braces === 0) { end = i + 1; break; }
    }
    const newPDF = `function descargarLiturgiaPDF(id) {
    var registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    var reg = registros.find(function(r) { return r.id === id; });
    if (!reg) return;
    var f = reg.fecha.split('-').reverse().join('/');
    var nombre = 'IGLESIA ADVENTISTA CYPRESS HILLS';
    var cargar = function() {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        // HEADER
        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, 210, 48, 'F');
        doc.setTextColor(253, 203, 110);
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        doc.text(nombre, 105, 15, { align: 'center' });
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.text('PROGRAMA DE CULTO', 105, 27, { align: 'center' });
        doc.setTextColor(180, 175, 220);
        doc.setFontSize(10);
        doc.text('Fecha: ' + f, 105, 37, { align: 'center' });
        doc.setDrawColor(162, 155, 254);
        doc.setLineWidth(0.5);
        doc.line(15, 52, 195, 52);
        // DOS COLUMNAS
        var campos = [
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
        var colIzq = 18, colDer = 110, ancho = 82, yBase = 62;
        for (var i = 0; i < 6; i++) {
            var y = yBase + i * 24;
            var campo = campos[i];
            if (i % 2 === 0) { doc.setFillColor(245, 243, 255); doc.roundedRect(colIzq - 3, y - 4, ancho + 6, 22, 2, 2, 'F'); }
            doc.setFontSize(7); doc.setTextColor(140, 130, 170); doc.setFont('helvetica', 'normal');
            doc.text(campo[0], colIzq, y);
            doc.setFontSize(11); doc.setTextColor(30, 30, 50); doc.setFont('helvetica', 'bold');
            doc.text(String(campo[1] || '-'), colIzq, y + 10);
        }
        for (var i = 6; i < 12; i++) {
            var y = yBase + (i - 6) * 24;
            var campo = campos[i];
            var esTema = (i === 9);
            if (esTema) {
                doc.setFillColor(255, 248, 225); doc.roundedRect(colDer - 3, y - 4, ancho + 6, 22, 2, 2, 'F');
                doc.setDrawColor(253, 203, 110); doc.setLineWidth(0.5); doc.roundedRect(colDer - 3, y - 4, ancho + 6, 22, 2, 2, 'S');
            } else if ((i - 6) % 2 === 0) {
                doc.setFillColor(245, 243, 255); doc.roundedRect(colDer - 3, y - 4, ancho + 6, 22, 2, 2, 'F');
            }
            doc.setFontSize(7); doc.setTextColor(esTema?180:140, esTema?140:130, esTema?40:170); doc.setFont('helvetica', 'normal');
            doc.text(campo[0], colDer, y);
            doc.setFontSize(esTema ? 12 : 11); doc.setTextColor(esTema?80:30, esTema?60:30, esTema?20:50); doc.setFont('helvetica', 'bold');
            doc.text(String(campo[1] || '-'), colDer, y + 10);
        }
        doc.setDrawColor(200, 195, 230); doc.setLineWidth(0.3);
        doc.line(105, yBase - 6, 105, yBase + 140);
        // FOOTER
        doc.setFontSize(7); doc.setTextColor(180, 180, 190); doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico', 105, 280, { align: 'center' });
        // Compartir o descargar
        var blob = doc.output('blob');
        var fileName = 'Programa_Culto_' + reg.fecha + '.pdf';
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: 'application/pdf' })] })) {
            var file = new File([blob], fileName, { type: 'application/pdf' });
            navigator.share({ title: 'Programa de Culto - Cypress Hills', files: [file] }).catch(function() { doc.save(fileName); });
        } else {
            doc.save(fileName);
        }
        if (typeof mostrarToast === 'function') mostrarToast('PDF generado!');
    };
    if (window.jspdf) { cargar(); } else {
        var s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        s.onload = cargar;
        s.onerror = function() { alert('Error cargando PDF. Verifica conexión.'); };
        document.head.appendChild(s);
    }
}`;
    c = c.substring(0, pi) + newPDF + c.substring(end);
    console.log('✅ descargarLiturgiaPDF: DOS COLUMNAS + WhatsApp share');
}

// Convertir de vuelta a CRLF
c = c.replace(/\n/g, '\r\n');

fs.writeFileSync(FILE, c, 'utf8');
console.log('\n✅ LISTO! 5 mejoras aplicadas.');
