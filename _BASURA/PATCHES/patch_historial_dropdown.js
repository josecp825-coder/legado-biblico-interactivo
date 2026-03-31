const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

const targetHTML = `<div style="color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;">\\u{1F4CA} HISTORIAL</div>`;
const replaceHTML = `<select id="tipo-historial-select" onchange="cargarCultosSemana()" style="background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;padding:6px;border-radius:6px;outline:none;cursor:pointer;">
              <option value="sabado">\u{1F4CA} CULTO DE SÁBADO</option>
              <option value="semana">\u{1F4CA} CULTO DE SEMANA</option>
            </select>`;

code = code.replace(targetHTML, replaceHTML);

const rgFunc = /function cargarCultosSemana\(\) \{\s*let historial\s*=\s*JSON\.parse\(localStorage\.getItem\('legado_cultos_semanales'\) \|\| '\[\]'\);/;

const injectJS = `
window.manejarEdicionExternaRegular = function(id) {
    if (typeof renderCultosRegulares === 'function') {
        renderCultosRegulares();
        setTimeout(() => {
            if (typeof editarCultoRegular === 'function') {
                editarCultoRegular(id);
            }
        }, 500);
    } else {
        alert("El módulo de Cultos Regulares no está cargado.");
    }
};

function cargarCultosSemana() {
    const selector = document.getElementById('tipo-historial-select');
    const esSemana = selector && selector.value === 'semana';
    
    if (esSemana) {
        document.getElementById('search-culto').style.display = 'none';
        let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
        const contenedor = document.getElementById('historico-cultos');
        if (!contenedor) return;

        if (registros.length === 0) {
            contenedor.innerHTML = '<div style="text-align:center;color:rgba(255,255,255,0.4);padding:20px;">No hay cultos de semana registrados.</div>';
            return;
        }

        contenedor.innerHTML = registros.map(reg => {
            const diaMayus = reg.dia.toUpperCase();
            const fechaFormateada = reg.fecha.split('-').reverse().join('/');
            const colorTema = reg.dia === 'miercoles' || reg.dia === 'mi\\u00e9rcoles' ? '#0984e3' : '#e84393'; 
            
            return \`
                <div style="background:rgba(255,255,255,0.05);padding:18px;border-radius:12px;border-left:5px solid \${colorTema};position:relative;margin-bottom:10px;">
                    <button onclick="borrarCultoRegular(\${reg.id}); setTimeout(cargarCultosSemana, 500);" style="position:absolute;top:15px;right:15px;background:transparent;border:none;color:#ff7675;font-size:1.2rem;cursor:pointer;" title="Eliminar">🗑️</button>
                    
                    <div style="color:\${colorTema};font-weight:900;font-size:0.9rem;margin-bottom:10px;">📅 CULTO DE \${diaMayus} - \${fechaFormateada}</div>
                    
                    <div style="font-size:0.85rem;color:#fff;display:grid;gap:6px;">
                        <div style="display:flex;justify-content:space-between;padding:4px 0;"><span style="color:rgba(255,255,255,0.5);">P. Mensaje:</span><b style="color:#2ed573;">\${reg.mensaje || "-"}</b></div>
                        <div style="display:flex;justify-content:space-between;padding:4px 0;border-top:1px dashed rgba(255,255,255,0.1);"><span style="color:rgba(255,255,255,0.5);">Ancianato:</span><b>\${reg.anciano || "-"}</b></div>
                    </div>

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:15px;">
                        <button onclick="compartirPlantillaRegular(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.4);color:#2ed573;font-weight:900;border-radius:8px;cursor:pointer;font-size:0.8rem;">📲 WhatsApp</button>
                        <button onclick="manejarEdicionExternaRegular(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(253,203,110,0.1));border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:900;border-radius:8px;cursor:pointer;font-size:0.8rem;">✏️ Editar</button>
                    </div>
                </div>
            \`;
        }).join('');
        return;
    }

    if(document.getElementById('search-culto')) document.getElementById('search-culto').style.display = 'block';

    let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');`;

code = code.replace(rgFunc, injectJS);

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('[OK] Parche Historial Desplegable Aplicado Exitosamente.');
