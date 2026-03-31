const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');

// Insertar la pantalla de seleccion al inicio de tab-content-form
// El formulario de Sabado queda envuelto en un div que se muestra/oculta

const TARGET = '<div id="tab-content-form">\r\n          <style>';

const REPLACEMENT = `<div id="tab-content-form">

          <!-- ===== PANTALLA DE SELECCION DE TIPO DE CULTO ===== -->
          <div id="selector-tipo-culto" style="display:block;">
            <div style="text-align:center;padding:10px 0 20px;">
              <div style="color:rgba(255,255,255,0.35);font-size:0.6rem;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">PASO 1</div>
              <div style="color:#fff;font-weight:900;font-size:1rem;letter-spacing:0.5px;">¿Qué tipo de culto vas a registrar?</div>
            </div>

            <!-- CARD SÁBADO -->
            <div onclick="elegirTipoCulto('sabado')" style="cursor:pointer;background:linear-gradient(135deg,rgba(253,203,110,0.15),rgba(253,203,110,0.05));border:2px solid rgba(253,203,110,0.5);border-radius:18px;padding:22px 18px;margin-bottom:14px;display:flex;align-items:center;gap:16px;transition:all 0.2s;" 
                 onmouseover="this.style.background='linear-gradient(135deg,rgba(253,203,110,0.3),rgba(253,203,110,0.1))';this.style.transform='scale(1.02)'"
                 onmouseout="this.style.background='linear-gradient(135deg,rgba(253,203,110,0.15),rgba(253,203,110,0.05))';this.style.transform='scale(1)'">
              <div style="font-size:2.8rem;line-height:1;">⛪</div>
              <div style="flex:1;">
                <div style="color:#fdcb6e;font-weight:900;font-size:1rem;letter-spacing:0.5px;margin-bottom:4px;">CULTO DE SÁBADO</div>
                <div style="color:rgba(255,255,255,0.45);font-size:0.72rem;">Programa completo — 12 pasos litúrgicos</div>
              </div>
              <div style="color:#fdcb6e;font-size:1.4rem;">›</div>
            </div>

            <!-- CARD SEMANA -->
            <div onclick="elegirTipoCulto('semana')" style="cursor:pointer;background:linear-gradient(135deg,rgba(116,185,255,0.15),rgba(116,185,255,0.05));border:2px solid rgba(116,185,255,0.5);border-radius:18px;padding:22px 18px;display:flex;align-items:center;gap:16px;transition:all 0.2s;"
                 onmouseover="this.style.background='linear-gradient(135deg,rgba(116,185,255,0.3),rgba(116,185,255,0.1))';this.style.transform='scale(1.02)'"
                 onmouseout="this.style.background='linear-gradient(135deg,rgba(116,185,255,0.15),rgba(116,185,255,0.05))';this.style.transform='scale(1)'">
              <div style="font-size:2.8rem;line-height:1;">📅</div>
              <div style="flex:1;">
                <div style="color:#74b9ff;font-weight:900;font-size:1rem;letter-spacing:0.5px;margin-bottom:4px;">CULTO DE SEMANA</div>
                <div style="color:rgba(255,255,255,0.45);font-size:0.72rem;">Miércoles o Viernes — Culto regular</div>
              </div>
              <div style="color:#74b9ff;font-size:1.4rem;">›</div>
            </div>
          </div>

          <!-- ===== FORMULARIO SÁBADO (oculto hasta elegir) ===== -->
          <div id="formulario-sabado-wrapper" style="display:none;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <button onclick="volverSelectorCulto()" style="background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;padding:7px 14px;border-radius:8px;font-weight:900;font-size:0.8rem;cursor:pointer;">← Volver</button>
              <div style="color:#fdcb6e;font-weight:900;font-size:0.85rem;">⛪ CULTO DE SÁBADO</div>
            </div>
          <style>`;

if (code.includes(TARGET)) {
    code = code.replace(TARGET, REPLACEMENT);
    console.log('[OK] Selector de tipo de culto insertado.');
} else {
    // Intentar sin \r\n
    const TARGET2 = '<div id="tab-content-form">\n          <style>';
    if (code.includes(TARGET2)) {
        code = code.replace(TARGET2, REPLACEMENT.replace(/\r\n/g, '\n'));
        console.log('[OK] Insertado con LF.');
    } else {
        console.log('[FAIL] No se encontro TARGET. Buscando alternativa...');
        const idx = code.indexOf('<div id="tab-content-form">');
        const idx2 = code.indexOf('<style>', idx);
        console.log('idx form:', idx, 'idx style:', idx2);
    }
}

// Ahora necesitamos cerrar el formulario-sabado-wrapper
// Buscar el cierre del tab-content-form y añadir </div> antes
const CLOSE_TARGET = '        </div>\r\n\r\n        <!-- ======== TAB 2: BUSCAR';
const CLOSE_REPLACEMENT = '          </div><!-- /formulario-sabado-wrapper -->\r\n        </div>\r\n\r\n        <!-- ======== TAB 2: BUSCAR';

if (code.includes(CLOSE_TARGET)) {
    code = code.replace(CLOSE_TARGET, CLOSE_REPLACEMENT);
    console.log('[OK] Cierre formulario-sabado-wrapper insertado.');
} else {
    const CLOSE_TARGET2 = '        </div>\n\n        <!-- ======== TAB 2: BUSCAR';
    if (code.includes(CLOSE_TARGET2)) {
        code = code.replace(CLOSE_TARGET2, '          </div><!-- /formulario-sabado-wrapper -->\n        </div>\n\n        <!-- ======== TAB 2: BUSCAR');
        console.log('[OK] Cierre insertado con LF.');
    } else {
        console.log('[WARN] No se encontro cierre exacto para wrapper. Buscar manualmente.');
    }
}

fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('[DONE] Archivo guardado.');
