// ==========================================
// MÓDULO IGLESIA - LEGADO BÍBLICO (v1)
// ==========================================

function renderModuloIglesia() {
    const contenedor = document.getElementById('pantalla-estudio');
    contenedor.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#120e2a,#0a0818);font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;gap:15px;border-bottom:1px solid rgba(253,203,110,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="volverMenuPrincipal()" style="background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.3);color:#fdcb6e;padding:8px 15px;border-radius:8px;cursor:pointer;font-weight:900;font-size:calc(0.8rem * var(--font-scale, 1));">&#x2B05;&#xFE0F; INICIO</button>
                <div style="flex:1;">
                    <div style="color:#fdcb6e;font-size:calc(0.9rem * var(--font-scale, 1));font-weight:900;letter-spacing:2px;">MÓDULO IGLESIA</div>
                    <div style="font-size:calc(0.6rem * var(--font-scale, 1));color:rgba(255,255,255,0.4);letter-spacing:1px;">LITURGIA Y ADMINISTRACIÓN</div>
                </div>
                <div style="font-size:calc(1.5rem * var(--font-scale, 1));">&#x26EA;</div>
            </div>

            <div style="padding:25px 20px;max-width:800px;margin:0 auto;display:grid;gap:20px;">
                
                <h2 style="color:#fff;font-size:calc(1.4rem * var(--font-scale, 1));text-align:center;font-weight:300;letter-spacing:4px;margin-top:10px;">SECCIONES</h2>
                
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:15px;">
                    <!-- 1. REGISTRO DE CULTOS -->
                    <button onclick="renderControlCultosSemana()" style="background:linear-gradient(135deg,rgba(255,107,107,0.2),rgba(255,107,107,0.1));border:1px solid rgba(255,107,107,0.3);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">&#x1F4CB;&#x26EA;</div>
                        <h3 style="color:#ff6b6b;font-size:calc(1.1rem * var(--font-scale, 1));margin-bottom:5px;letter-spacing:1px;">REGISTRO DE CULTOS</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));line-height:1.4;margin:0;">Programa completo de cada culto con historial.</p>
                    </button>

                    <!-- 3. CITAS DOXOLOGÍA -->
                    <button onclick="renderCitasDoxologia()" style="background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(255,234,167,0.1));border:1px solid rgba(253,203,110,0.3);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">&#x1F64F;&#x2728;</div>
                        <h3 style="color:#fdcb6e;font-size:calc(1.1rem * var(--font-scale, 1));margin-bottom:5px;letter-spacing:1px;">CITAS DE ADORACI&#xD3;N</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));line-height:1.4;margin:0;">Las 30 citas de majestad y adoraci&#xF3;n a Dios.</p>
                    </button>

                    <!-- 4. CALENDARIO DE IGLESIA -->
                    <button onclick="renderCalendarioIglesia()" style="background:linear-gradient(135deg,rgba(255,159,67,0.2),rgba(255,159,67,0.1));border:1px solid rgba(255,159,67,0.3);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">&#x1F4C5;&#x26EA;&#x2728;</div>
                        <h3 style="color:#ff9f43;font-size:calc(1.1rem * var(--font-scale, 1));margin-bottom:5px;letter-spacing:1px;">CALENDARIO OFICIAL</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));line-height:1.4;margin:0;">Programación mensual y anual de la iglesia.</p>
                    </button>

                    <!-- 5. FÁBRICA DE SERMONES IA -->
                    <button onclick="irAPantalla('fabrica', renderFabricaSermones)" style="background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(255,234,167,0.1));border:1px solid #fdcb6e;padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 10px 30px rgba(0,0,0,0.4);grid-column:1/-1;border-width:2px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:15px;">
                            <div style="font-size:calc(3rem * var(--font-scale, 1));">&#x1F916;&#x2728;</div>
                            <div style="background:#fdcb6e;color:#000;padding:4px 12px;border-radius:50px;font-size:0.7rem;font-weight:900;">NUEVO</div>
                        </div>
                        <h3 style="color:#fdcb6e;font-size:calc(1.3rem * var(--font-scale, 1));margin-bottom:8px;letter-spacing:2px;font-weight:900;">FÁBRICA DE SERMONES IA</h3>
                        <p style="color:rgba(255,255,255,0.8);font-size:calc(0.9rem * var(--font-scale, 1));line-height:1.6;margin:0;">Crea sermones, devocionales y servicios especiales basados en la Biblia con Inteligencia Artificial.</p>
                    </button>

                    <!-- 6. 28 DOCTRINAS FUNDAMENTALES -->
                    <button onclick="renderDoctrinas28Iglesia()" style="background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(108,92,231,0.1));border:1px solid rgba(162,155,254,0.4);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);grid-column:1/-1;">
                        <div style="display:flex;align-items:center;gap:15px;margin-bottom:12px;">
                            <div style="font-size:calc(2.8rem * var(--font-scale, 1));">&#x1F4D6;&#x271D;&#xFE0F;</div>
                            <div>
                                <h3 style="color:#a29bfe;font-size:calc(1.2rem * var(--font-scale, 1));margin:0 0 4px;letter-spacing:2px;font-weight:900;">28 DOCTRINAS FUNDAMENTALES</h3>
                                <p style="color:rgba(255,255,255,0.6);font-size:calc(0.85rem * var(--font-scale, 1));margin:0;">Creencias adventistas del Séptimo Día  Referencia doctrinal completa.</p>
                            </div>
                        </div>
                    </button>

                    <!-- 7. MANUAL DE IGLESIA -->
                    <button onclick="renderMenuDocumento('manual')" style="background:linear-gradient(135deg,rgba(0,184,148,0.2),rgba(85,239,196,0.1));border:1px solid rgba(85,239,196,0.3);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">&#x1F4DA;&#x26EA;&#x1F4C4;</div>
                        <h3 style="color:#55efc4;font-size:calc(1.1rem * var(--font-scale, 1));margin-bottom:5px;letter-spacing:1px;">MANUAL DE IGLESIA</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));line-height:1.4;margin:0;">Consultor IA y PDF oficial de la iglesia.</p>
                    </button>

                    <!-- 8. GUÍA PARA ANCIANOS -->
                    <button onclick="renderMenuDocumento('guia')" style="background:linear-gradient(135deg,rgba(0,168,255,0.2),rgba(0,168,255,0.1));border:1px solid rgba(0,168,255,0.3);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">&#x1F474;&#x1F4D6;</div>
                        <h3 style="color:#00a8ff;font-size:calc(1.1rem * var(--font-scale, 1));margin-bottom:5px;letter-spacing:1px;">GUÍA PARA ANCIANOS</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));line-height:1.4;margin:0;">Consultor IA y PDF oficial para liderazgo.</p>
                    </button>

                    <!-- 9. HIMNARIO POR CATEGORÍA -->
                    <button onclick="abrirHimnarioCategorias()" style="background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(116,185,255,0.1));border:1px solid rgba(162,155,254,0.4);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);grid-column:1/-1;">
                        <div style="display:flex;align-items:center;gap:15px;margin-bottom:12px;">
                            <div style="font-size:calc(2.8rem * var(--font-scale, 1));">&#x1F3B5;&#x1F4D6;</div>
                            <div>
                                <h3 style="color:#a29bfe;font-size:calc(1.2rem * var(--font-scale, 1));margin:0 0 4px;letter-spacing:2px;font-weight:900;">HIMNARIO POR CATEGORÍA</h3>
                                <p style="color:rgba(255,255,255,0.6);font-size:calc(0.85rem * var(--font-scale, 1));margin:0;">Busca el himno perfecto para cada parte del culto.</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <style>
            button:active { transform: scale(0.97); }
        </style>
    `;
    window.scrollTo(0, 0);
}

function renderLiturgia() {
    const contenedor = document.getElementById('pantalla-estudio');
    contenedor.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(162,155,254,0.3);">
                <button onclick="renderModuloIglesia()" style="background:rgba(162,155,254,0.1);border:1px solid #a29bfe;color:#a29bfe;padding:8px 15px;border-radius:8px;font-weight:900;">&#x2B05;&#xFE0F; VOLVER</button>
                <div style="color:#fff;font-weight:900;letter-spacing:1px;">PROGRAMA DE CULTO (SÁBADO)</div>
            </div>

            <div style="padding:20px;max-width:800px;margin:0 auto;display:grid;gap:15px;">
                <p style="color:rgba(255,255,255,0.6);font-size:calc(0.9rem * var(--font-scale, 1));text-align:center;">Completa la planilla para generar y guardar el programa oficial del sábado.</p>

                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(162,155,254,0.2);padding:20px;border-radius:15px;">
                    <div style="text-align:center;margin-bottom:15px;">
                        <div style="color:#fdcb6e;font-weight:900;font-size:calc(1rem * var(--font-scale, 1));letter-spacing:2px;">&#x26EA; IGLESIA ADVENTISTA CYPRESS HILLS</div>
                    </div>
                    <div style="display:grid;gap:15px;">
                        <input type="date" id="litur-fecha" onclick="try{this.showPicker()}catch(e){}" style="width:100%;padding:12px;background:rgba(0,0,0,0.5);border:1px solid #a29bfe80;color:#fff;border-radius:8px;outline:none;cursor:pointer;" required>
                        
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
                            💾 GUARDAR PROGRAMA
                        </button>
                        
                        <button onclick="enviarFormularioVacioWA()" style="width:100%;padding:14px;background:linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.05));border:1px solid rgba(37,211,102,0.4);color:#25D366;font-weight:900;border-radius:8px;cursor:pointer;margin-top:5px;font-size:calc(0.95rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:8px;">
                            📲 Enviar Enlace del Formulario
                        </button>
                    </div>
                </div>

                <h3 style="color:#fff;text-align:center;margin-top:20px;border-bottom:1px solid rgba(162,155,254,0.3);padding-bottom:10px;">PROGRAMAS GUARDADOS</h3>
                <div id="lista-liturgias" style="display:grid;gap:15px;margin-bottom:20px;">
                    <div style="text-align:center;color:rgba(255,255,255,0.5);font-size:calc(0.9rem * var(--font-scale, 1));">Cargando programas...</div>
                </div>
            </div>
        </div>
    `;
    cargarLiturgiasFormulario();
}

// Variable global para modo edición
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
    if (!data.fecha) { mostrarToast('⚠️ Selecciona una fecha primero'); return; }
    let registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    if (liturgiaEditandoId) {
        registros = registros.map(r => r.id === liturgiaEditandoId ? data : r);
        liturgiaEditandoId = null;
        var btn = document.getElementById('btn-guardar-liturgia');
        if (btn) { btn.innerHTML = '💾 GUARDAR PROGRAMA'; btn.style.background = 'linear-gradient(135deg,#6c5ce7,#a29bfe)'; }
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
    var reg = registros.find(function (r) { return r.id === id; });
    if (!reg) return;
    liturgiaEditandoId = id;
    document.getElementById('litur-fecha').value = reg.fecha || '';
    var campos = ['doxologia', 'invocacion', 'bienvenida', 'infantil', 'ofrendas', 'himnoAdoracion', 'lectura', 'oracion', 'musica', 'tema', 'himnoFinal', 'oracionFinal'];
    campos.forEach(function (k) {
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
    var texto = '🏩 *IGLESIA ADVENTISTA CYPRESS HILLS*\n' +
        '🕌 *PROGRAMA DE CULTO*\n' +
        '📅 *Fecha: ' + fecha + '*\n\n' +
        '───────────────\n' +
        'Por favor completa los campos y envíalo de vuelta:\n\n' +
        '1. *Doxología:* ___\n' +
        '2. *Invocación:* ___\n' +
        '3. *Bienvenida:* ___\n' +
        '4. *Rincón Infantil:* ___\n' +
        '5. *Diezmos y Ofrendas:* ___\n' +
        '6. *Himno de Adoración:* ___\n' +
        '7. *Lectura Bíblica:* ___\n' +
        '8. *Oración Intercesora:* ___\n' +
        '9. *Música Especial:* ___\n' +
        '10. *Tema / Predicador:* ___\n' +
        '11. *Himno Final:* ___\n' +
        '12. *Oración Final:* ___\n\n' +
        '───────────────\n' +
        '_Enviado desde Legado Bíblico_';
    window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
}

function cargarLiturgiasFormulario() {
    let registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const contenedor = document.getElementById('lista-liturgias');

    if (registros.length === 0) {
        contenedor.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.5);font-size:calc(0.9rem * var(--font-scale, 1));padding:20px;">No hay programas registrados.</div>`;
        return;
    }

    contenedor.innerHTML = registros.map(reg => `
        <div style="background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:5px solid #a29bfe;position:relative;">
            <button onclick="borrarLiturgiaFormulario(${reg.id})" style="position:absolute;top:15px;right:15px;background:transparent;border:none;color:#ff7675;font-size:calc(1.4rem * var(--font-scale, 1));cursor:pointer;" title="Eliminar">🗑️</button>
            <div style="color:#fdcb6e;font-weight:900;font-size:calc(0.75rem * var(--font-scale, 1));text-align:center;margin-bottom:5px;letter-spacing:1px;">⛪️ IGLESIA ADVENTISTA CYPRESS HILLS</div>
            <div style="color:#a29bfe;font-weight:900;font-size:calc(0.9rem * var(--font-scale, 1));margin-bottom:15px;border-bottom:1px dashed rgba(162,155,254,0.3);padding-bottom:10px;text-align:center;">📅 CULTO DEL ${reg.fecha.split('-').reverse().join('/')}</div>
            <div style="display:grid;gap:6px;font-size:calc(0.85rem * var(--font-scale, 1));color:#fff;">
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(253,203,110,0.08);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">1. Doxología</span><b>${reg.doxologia || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">2. Invocación</span><b>${reg.invocacion || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">3. Bienvenida</span><b>${reg.bienvenida || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">4. Rincón Infantil</span><b>${reg.infantil || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">5. Diezmos/Ofrendas</span><b>${reg.ofrendas || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">6. Himno Adoración</span><b>${reg.himnoAdoracion || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">7. Lectura Bíblica</span><b>${reg.lectura || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">8. Oración Intercesora</span><b>${reg.oracion || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">9. Música Especial</span><b>${reg.musica || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:7px 10px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.3);border-radius:6px;margin-top:4px;"><span style="color:#fdcb6e;font-weight:900;">10. Predicador</span><b style="color:#fdcb6e;">${reg.tema || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;"><span style="color:rgba(255,255,255,0.5);">11. Himno Final</span><b>${reg.himnoFinal || '-'}</b></div>
                <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;"><span style="color:rgba(255,255,255,0.5);">12. Oración Final</span><b>${reg.oracionFinal || '-'}</b></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px;">
                <button onclick="compartirLiturgiaTexto(${reg.id})" style="padding:9px;background:linear-gradient(135deg,rgba(108,92,231,0.2),rgba(108,92,231,0.1));border:1px solid rgba(162,155,254,0.5);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">📤 Compartir</button>
                <button onclick="descargarLiturgiaPDF(${reg.id})" style="padding:9px;background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">📄 PDF</button>
                <button onclick="editarLiturgiaFormulario(${reg.id})" style="padding:9px;background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(253,203,110,0.1));border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.75rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:4px;">✏️ Editar</button>
            </div>
        </div>
    `).join('');
}

function borrarLiturgiaFormulario(id) {
    mostrarConfirm('🗑️ ¿Eliminar este programa de culto?', function() {
        let registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
        registros = registros.filter(r => r.id !== id);
        localStorage.setItem('legado_liturgias', JSON.stringify(registros));
        cargarLiturgiasFormulario();
        mostrarToast('🗑️ Programa eliminado');
    });
}

function renderCitasDoxologia() {
    const contenedor = document.getElementById('pantalla-estudio');

    const citasPoderosas = [
        { cita: "1 Crónicas 29:11", texto: "Tuya es, oh Jehová, la magnificencia y el poder, la gloria, la victoria y el honor; porque todas las cosas que están en los cielos y en la tierra son tuyas. Tuyo, oh Jehová, es el reino, y tú eres excelso sobre todos." },
        { cita: "Salmo 8:1", texto: "¡Oh Jehová, Señor nuestro, cuán glorioso es tu nombre en toda la tierra! Has puesto tu gloria sobre los cielos." },
        { cita: "Salmo 19:1", texto: "Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos." },
        { cita: "Salmo 24:7, 10", texto: "Alzad, oh puertas, vuestras cabezas, y alzaos vosotras, puertas eternas, y entrará el Rey de gloria. ¿Quién es este Rey de gloria? Jehová de los ejércitos, Él es el Rey de la gloria." },
        { cita: "Salmo 29:2", texto: "Dad a Jehová la gloria debida a su nombre; adorad a Jehová en la hermosura de la santidad." },
        { cita: "Salmo 47:7-8", texto: "Porque Dios es el Rey de toda la tierra; cantad con inteligencia. Reinó Dios sobre las naciones; se sentó Dios sobre su santo trono." },
        { cita: "Salmo 93:1", texto: "Jehová reina; se vistió de magnificencia; Jehová se vistió, se ciñó de poder. Afirmó también el mundo, y no se moverá." },
        { cita: "Salmo 95:3-6", texto: "Porque Jehová es Dios grande, y Rey grande sobre todos los dioses. Venid, adoremos y postrémonos; arrodillémonos delante de Jehová nuestro Hacedor." },
        { cita: "Salmo 96:6-9", texto: "Alabanza y magnificencia delante de él; poder y gloria en su santuario. Adorad a Jehová en la hermosura de la santidad." },
        { cita: "Salmo 104:1", texto: "Bendice, alma mía, a Jehová. Jehová Dios mío, mucho te has engrandecido; te has vestido de gloria y de magnificencia." },
        { cita: "Salmo 145:3, 5", texto: "Grande es Jehová, y digno de suprema alabanza; y su grandeza es inescrutable. En la hermosura de la gloria de tu magnificencia, y en tus hechos maravillosos meditaré." },
        { cita: "Salmo 148:13", texto: "Alaben el nombre de Jehová, porque sólo su nombre es excelso. Su gloria es sobre tierra y cielos." },
        { cita: "Isaías 6:3", texto: "Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria." },
        { cita: "Isaías 40:22, 26", texto: "Él está sentado sobre el círculo de la tierra... Levantad en alto vuestros ojos, y mirad quién creó estas cosas; él saca y cuenta su ejército; a todas llama por sus nombres." },
        { cita: "Jeremías 10:6-7", texto: "No hay semejante a ti, oh Jehová; grande eres tú, y grande tu nombre en poder. ¿Quién no te temerá, oh Rey de las naciones?" },
        { cita: "Daniel 2:20", texto: "Sea bendito el nombre de Dios de siglo en siglo, porque suyos son el poder y la sabiduría." },
        { cita: "Daniel 4:34", texto: "Bendije al Altísimo, y alabé y glorifiqué al que vive para siempre, cuyo dominio es sempiterno, y su reino por todas las edades." },
        { cita: "Mateo 6:13", texto: "Porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén." },
        { cita: "Romanos 11:36", texto: "Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos. Amén." },
        { cita: "Efesios 3:20-21", texto: "Y a Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos o entendemos... a él sea gloria en la iglesia en Cristo Jesús por todas las edades." },
        { cita: "Filipenses 2:9-11", texto: "Por lo cual Dios también le exaltó hasta lo sumo, y le dio un nombre que es sobre todo nombre, para que en el nombre de Jesús se doble toda rodilla." },
        { cita: "1 Timoteo 1:17", texto: "Por tanto, al Rey de los siglos, inmortal, invisible, al único y sabio Dios, sea honor y gloria por los siglos de los siglos. Amén." },
        { cita: "1 Timoteo 6:15-16", texto: "El bienaventurado y solo Soberano, Rey de reyes, y Señor de señores, el único que tiene inmortalidad, que habita en luz inaccesible." },
        { cita: "Hebreos 1:3", texto: "El cual, siendo el resplandor de su gloria, y la imagen misma de su sustancia, y quien sustenta todas las cosas con la palabra de su poder." },
        { cita: "Apocalipsis 4:8", texto: "Santo, santo, santo es el Señor Dios Todopoderoso, el que era, el que es, y el que ha de venir." },
        { cita: "Apocalipsis 4:11", texto: "Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas." },
        { cita: "Apocalipsis 5:12", texto: "El Cordero que fue inmolado es digno de tomar el poder, las riquezas, la sabiduría, la fortaleza, la honra, la gloria y la alabanza." },
        { cita: "Apocalipsis 7:12", texto: "Amén. La bendición y la gloria y la sabiduría y la acción de gracias y la honra y el poder y la fortaleza, sean a nuestro Dios por los siglos de los siglos. Amén." },
        { cita: "Apocalipsis 11:15", texto: "Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos." },
        { cita: "Apocalipsis 15:3-4", texto: "Grandes y maravillosas son tus obras, Señor Dios Todopoderoso; justos y verdaderos son tus caminos, Rey de los santos. ¿Quién no te temerá, oh Señor, y glorificará tu nombre?" }
    ];

    let htmlCitas = citasPoderosas.map((c, i) => `
        <div style="background:rgba(255,255,255,0.03);border-left:3px solid #fdcb6e;padding:15px;border-radius:8px;margin-bottom:12px;">
            <div style="color:#fdcb6e;font-weight:900;font-size:calc(0.9rem * var(--font-scale, 1));margin-bottom:5px;">${i + 1}. ${c.cita}</div>
            <div style="color:rgba(255,255,255,0.9);font-size:calc(0.95rem * var(--font-scale, 1));line-height:1.5;">"${c.texto}"</div>
        </div>
    `).join('');

    contenedor.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(253,203,110,0.3);">
                <button onclick="renderModuloIglesia()" style="background:rgba(253,203,110,0.1);border:1px solid #fdcb6e;color:#fdcb6e;padding:8px 15px;border-radius:8px;font-weight:900;">?? VOLVER</button>
                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">DOXOLOGÍAS E INVOCACIÓN</div>
            </div>

            <div style="padding:20px;max-width:800px;margin:0 auto;">
                <h3 style="color:#fff;font-size:calc(1.4rem * var(--font-scale, 1));text-align:center;margin-bottom:5px;">30 CITAS DE MAJESTAD Y PODER</h3>
                <p style="color:rgba(255,255,255,0.5);text-align:center;font-size:calc(0.85rem * var(--font-scale, 1));margin-bottom:25px;">Selección oficial para uso en plataforma durante o previo a la liturgia del culto de sábado.</p>
                
                <div style="display:grid;gap:5px;">
                    ${htmlCitas}
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderManualIglesia() {
    const contenedor = document.getElementById('pantalla-estudio');
    contenedor.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(85,239,196,0.3);">
                <button onclick="renderModuloIglesia()" style="background:rgba(85,239,196,0.1);border:1px solid #55efc4;color:#55efc4;padding:8px 15px;border-radius:8px;font-weight:900;">?? VOLVER</button>
                <div style="color:#fff;font-weight:900;letter-spacing:1px;">MANUAL DE IGLESIA (RESUMEN)</div>
            </div>

            <div style="padding:20px;max-width:800px;margin:0 auto;color:rgba(255,255,255,0.8);">
                <p style="font-size:calc(0.85rem * var(--font-scale, 1));color:#55efc4;text-align:center;margin-bottom:20px;">*Conceptos básicos basados en el Manual oficial de la IASD.</p>
                
                <div style="margin-bottom:15px;background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:4px solid #55efc4;">
                    <h3 style="color:#fff;margin:0 0 10px 0;">1. Autoridad y Organización</h3>
                    <p style="font-size:calc(0.9rem * var(--font-scale, 1));line-height:1.5;margin:0;">La forma representativa es la base de la IASD. La autoridad reside en los miembros registrados. Los niveles son: Iglesia Local, Asociación/Misión Local, Unión, y Asociación General.</p>
                </div>

                <div style="margin-bottom:15px;background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:4px solid #0984e3;">
                    <h3 style="color:#fff;margin:0 0 10px 0;">2. Oficios Principales</h3>
                    <ul style="font-size:calc(0.9rem * var(--font-scale, 1));line-height:1.5;margin:0;padding-left:15px;">
                        <li><b>Anciano:</b> Responsable del liderazgo espiritual junto al pastor. Fomenta diezmos, evangelismo y orden en el culto.</li>
                        <li><b>Diácono/Diaconisa:</b> Cuidado del edificio local, visitas a enfermos, ministración en Santa Cena.</li>
                        <li><b>Secretario(a):</b> Registros, traslados, cartas de membresía, estadísticas.</li>
                        <li><b>Tesorero(a):</b> Recepción y custodia fiel de los diezmos (que son del Señor) y ofrendas.</li>
                    </ul>
                </div>

                <div style="margin-bottom:15px;background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:4px solid #d63031;">
                    <h3 style="color:#fff;margin:0 0 10px 0;">3. Disciplina de Iglesia</h3>
                    <p style="font-size:calc(0.9rem * var(--font-scale, 1));line-height:1.5;margin:0 0 10px 0;">Debe administrarse con espíritu de redención y amor, nunca de venganza.</p>
                    <ul style="font-size:calc(0.9rem * var(--font-scale, 1));line-height:1.5;margin:0;padding-left:15px;">
                        <li>Negación flagrante de la fe/mandamientos.</li>
                        <li>Violaciones morales (adulterio, fornicación).</li>
                        <li>Violencia física/robo/fraude.</li>
                        <li>*Todo caso pasa primero por la Junta de Iglesia y luego se vota en reunión administrativa de la iglesia.</li>
                    </ul>
                </div>
                
                <div style="margin-bottom:15px;background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;border-left:4px solid #a29bfe;">
                    <h3 style="color:#fff;margin:0 0 10px 0;">4. Matrimonio y Votos</h3>
                    <p style="font-size:calc(0.9rem * var(--font-scale, 1));line-height:1.5;margin:0;">No se realizarán matrimonios entre creyentes y no creyentes. El divorcio solo se permite bajo razones bíblicas claras (Mateo 19) y el abandono (1 Corintios 7).</p>
                </div>
            </div>
        </div>
    `;
}

// ===============================================
// LÓGICA DE REGISTRO DE PREDICACIONES (Firebase / LocalStorage)
// ===============================================

function renderRegistroPredicaciones() {
    const contenedor = document.getElementById('pantalla-estudio');
    contenedor.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(250,177,160,0.3);">
                <button onclick="renderModuloIglesia()" style="background:rgba(250,177,160,0.1);border:1px solid #fab1a0;color:#fab1a0;padding:8px 15px;border-radius:8px;font-weight:900;">?? VOLVER</button>
                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">REGISTRO DE PREDICACIONES</div>
            </div>

            <div style="padding:20px;max-width:800px;margin:0 auto;">
                
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:15px;padding:20px;margin-bottom:30px;">
                    <h3 style="color:#fab1a0;margin:0 0 15px 0;font-size:calc(1.1rem * var(--font-scale, 1));">AGREGAR NUEVO CULTO</h3>
                    
                    <div style="display:grid;gap:12px;">
                        <input type="date" id="pred-fecha" style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;outline:none;" required>
                        <input type="text" id="pred-nombre" placeholder="Nombre del Predicador..." style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;outline:none;" required>
                        <input type="text" id="pred-titulo" placeholder="Título del Sermón..." style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;outline:none;">
                        <input type="text" id="pred-cita" placeholder="Cita Bíblica Base..." style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;outline:none;">
                        <input type="text" id="pred-himnos" placeholder="Himnos cantados (#12, #55)..." style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;outline:none;">
                        
                        <button onclick="guardarPredicacion()" style="width:100%;padding:15px;background:linear-gradient(135deg,#e17055,#fab1a0);border:none;color:#000;font-weight:900;border-radius:8px;cursor:pointer;margin-top:10px;">???? GUARDAR REGISTRO</button>
                    </div>
                </div>

                <div id="lista-predicaciones" style="display:grid;gap:15px;">
                    <div style="text-align:center;color:rgba(255,255,255,0.5);font-size:calc(0.9rem * var(--font-scale, 1));">Cargando registros...</div>
                </div>
            </div>
        </div>
    `;

    cargarPredicaciones();
}

// Funciones CRUD Predicaciones (Usa LocalStorage para agilidad, ideal para PWA offline)
function guardarPredicacion() {
    const fecha = document.getElementById('pred-fecha').value;
    const nombre = document.getElementById('pred-nombre').value.trim();
    const titulo = document.getElementById('pred-titulo').value.trim();
    const cita = document.getElementById('pred-cita').value.trim();
    const himnos = document.getElementById('pred-himnos').value.trim();

    if (!fecha || !nombre) {
        mostrarToast('⚠️ Completa la fecha y el nombre del predicador');
        return;
    }

    const nuevaPredicacion = { id: Date.now(), fecha, nombre, titulo, cita, himnos };

    let registros = JSON.parse(localStorage.getItem('legado_predicaciones') || '[]');
    registros.push(nuevaPredicacion);

    // Ordenar de más reciente a más antiguo
    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    localStorage.setItem('legado_predicaciones', JSON.stringify(registros));

    // Limpiar inputs
    document.getElementById('pred-nombre').value = '';
    document.getElementById('pred-titulo').value = '';
    document.getElementById('pred-cita').value = '';
    document.getElementById('pred-himnos').value = '';

    cargarPredicaciones();
    // alert o toast visual
    if (typeof mostrarToast === 'function') mostrarToast("¡Registro guardado!");
}

function cargarPredicaciones() {
    let registros = JSON.parse(localStorage.getItem('legado_predicaciones') || '[]');
    const contenedor = document.getElementById('lista-predicaciones');

    if (registros.length === 0) {
        contenedor.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.5);font-size:calc(0.9rem * var(--font-scale, 1));padding:20px;">No hay predicaciones registradas.</div>`;
        return;
    }

    contenedor.innerHTML = registros.map(reg => `
        <div style="background:rgba(255,255,255,0.05);padding:18px;border-radius:12px;border-left:5px solid #e17055;position:relative;">
            <button onclick="borrarPredicacion(${reg.id})" style="position:absolute;top:15px;right:15px;background:transparent;border:none;color:#ff7675;font-size:calc(1.2rem * var(--font-scale, 1));cursor:pointer;">???</button>
            <div style="color:#fab1a0;font-weight:900;font-size:calc(0.8rem * var(--font-scale, 1));margin-bottom:8px;">?? ${formatearFecha(reg.fecha)}</div>
            <div style="color:#fff;font-size:calc(1.1rem * var(--font-scale, 1));font-weight:bold;margin-bottom:5px;">${reg.nombre}</div>
            ${reg.titulo ? `<div style="color:rgba(255,255,255,0.8);font-size:calc(0.9rem * var(--font-scale, 1));margin-bottom:4px;font-style:italic;">"${reg.titulo}"</div>` : ''}
            ${reg.cita ? `<div style="color:#55efc4;font-size:calc(0.85rem * var(--font-scale, 1));margin-bottom:4px;">?? Texto: ${reg.cita}</div>` : ''}
            ${reg.himnos ? `<div style="color:#a29bfe;font-size:calc(0.85rem * var(--font-scale, 1));margin-bottom:4px;">?? Himnos: ${reg.himnos}</div>` : ''}
        </div>
    `).join('');
}

function borrarPredicacion(id) {
    mostrarConfirm('🗑️ ¿Eliminar este registro pastoral?', function() {
        let registros = JSON.parse(localStorage.getItem('legado_predicaciones') || '[]');
        registros = registros.filter(r => r.id !== id);
        localStorage.setItem('legado_predicaciones', JSON.stringify(registros));
        cargarPredicaciones();
        mostrarToast('🗑️ Registro eliminado');
    });
}

function formatearFecha(fechaStr) {
    if (!fechaStr) return "Sin fecha";
    const f = new Date(fechaStr + 'T12:00:00Z'); // Evitar timezone issues 
    return f.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
}

// ===============================================
// VISOR INTEGRADO DE PDF ? PDF.js (renderiza la página en la app)
// ===============================================

function cargarPdfJs(callback) {
    if (window.pdfjsLib) { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        callback();
    };
    document.head.appendChild(script);
}

let _pdfCacheManual = null;
let _pdfCacheGuia = null;
let _visorTipo = null;   // tipo activo en el visor
let _visorPagActual = 1;      // página activa en el visor

async function obtenerPdf(tipo) {
    const url = tipo === 'manual' ? './manual-de-la-iglesia-2022.pdf' : './guia-ancianos.pdf';
    if (tipo === 'manual' && _pdfCacheManual) return _pdfCacheManual;
    if (tipo === 'guia' && _pdfCacheGuia) return _pdfCacheGuia;
    const doc = await window.pdfjsLib.getDocument(url).promise;
    if (tipo === 'manual') _pdfCacheManual = doc;
    else _pdfCacheGuia = doc;
    return doc;
}

// -- RENDERIZA UNA PÁGINA DEL PDF EN EL CANVAS DEL VISOR --
async function renderizarPagina(numPagina) {
    const canvas = document.getElementById('pdf-canvas');
    const spinner = document.getElementById('pdf-spinner');
    const infoPag = document.getElementById('pdf-info-pag');
    if (!canvas) return;

    spinner.style.display = 'flex';
    canvas.style.opacity = '0.3';

    const doc = await obtenerPdf(_visorTipo);
    const pagina = await doc.getPage(numPagina);

    // Calcular escala para que quepa en el ancho del dispositivo
    const viewport0 = pagina.getViewport({ scale: 1 });
    const contenedor = document.getElementById('pdf-visor-inner');
    const ancho = contenedor ? contenedor.clientWidth - 4 : window.innerWidth - 20;
    const escala = ancho / viewport0.width;
    const viewport = pagina.getViewport({ scale: escala });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await pagina.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

    _visorPagActual = numPagina;
    canvas.style.opacity = '1';
    spinner.style.display = 'none';

    const totalStr = `Pág. ${numPagina} / ${doc.numPages}`;
    if (infoPag) infoPag.textContent = totalStr;

    // Actualizar botones nav
    const btnPrev = document.getElementById('pdf-btn-prev');
    const btnNext = document.getElementById('pdf-btn-next');
    if (btnPrev) btnPrev.disabled = numPagina <= 1;
    if (btnNext) btnNext.disabled = numPagina >= doc.numPages;
}

// -- ABRE EL VISOR INTEGRADO EN UNA PÁGINA ESPECÍFICA --
async function abrirVisorPdf(tipo, numPagina) {
    _visorTipo = tipo;
    const color = tipo === 'manual' ? '#55efc4' : '#fdcb6e';
    const titulo = tipo === 'manual' ? 'Manual de la Iglesia' : 'Guía de Ancianos';

    // -- CREAR OVERLAY DEL VISOR --
    let overlay = document.getElementById('pdf-visor-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'pdf-visor-overlay';
        overlay.style.cssText = `
            position:fixed;inset:0;z-index:9999;background:#0a0818;
            display:flex;flex-direction:column;animation:fadeIn 0.2s;
        `;
        document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
        <!-- BARRA SUPERIOR DEL VISOR -->
        <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:12px 16px;
                    display:flex;align-items:center;gap:12px;border-bottom:1px solid ${color}30;flex-shrink:0;">
            <button onclick="cerrarVisorPdf()"
                style="background:${color}15;border:1px solid ${color}50;color:${color};
                       padding:7px 14px;border-radius:8px;font-weight:900;font-size:0.82rem;cursor:pointer;flex-shrink:0;">
                ? Volver
            </button>
            <div style="flex:1;min-width:0;">
                <div style="color:#fff;font-weight:700;font-size:0.82rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ?? ${titulo}
                </div>
                <div id="pdf-info-pag" style="color:${color};font-size:0.68rem;font-weight:700;">Cargando...</div>
            </div>
        </div>

        <!-- ÁREA DE RENDERIZADO -->
        <div id="pdf-visor-inner" style="flex:1;overflow-y:auto;overflow-x:hidden;padding:2px;position:relative;background:#1a1a2e;">
            <!-- Spinner de carga -->
            <div id="pdf-spinner" style="position:absolute;inset:0;display:flex;flex-direction:column;
                 align-items:center;justify-content:center;gap:12px;z-index:10;">
                <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.1);
                            border-top-color:${color};border-radius:50%;animation:girar 0.8s linear infinite;"></div>
                <div style="color:rgba(255,255,255,0.5);font-size:0.8rem;">Cargando página...</div>
            </div>
            <!-- Canvas donde se pinta la página del PDF -->
            <canvas id="pdf-canvas" style="display:block;width:100%;transition:opacity 0.2s;"></canvas>
        </div>

        <!-- NAVEGACIÓN DE PÁGINAS -->
        <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:10px 16px;
                    display:flex;align-items:center;justify-content:space-between;gap:10px;
                    border-top:1px solid rgba(255,255,255,0.08);flex-shrink:0;">
            <button id="pdf-btn-prev"
                onclick="renderizarPagina(_visorPagActual - 1)"
                style="padding:9px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);
                       color:#fff;border-radius:10px;font-weight:900;cursor:pointer;font-size:0.82rem;">
                ?? Anterior
            </button>

            <!-- Ir a página específica -->
            <div style="display:flex;align-items:center;gap:6px;">
                <input id="pdf-input-pag" type="number" min="1"
                    placeholder="Pág"
                    style="width:65px;padding:8px;text-align:center;background:rgba(255,255,255,0.08);
                           border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;
                           font-size:0.85rem;outline:none;"
                    onkeydown="if(event.key==='Enter'){const n=parseInt(this.value);if(n)renderizarPagina(n);}"
                >
                <button onclick="const n=parseInt(document.getElementById('pdf-input-pag').value);if(n)renderizarPagina(n);"
                    style="padding:8px 12px;background:${color}20;border:1px solid ${color}40;
                           color:${color};border-radius:8px;font-weight:900;cursor:pointer;font-size:0.78rem;">
                    Ir
                </button>
            </div>

            <button id="pdf-btn-next"
                onclick="renderizarPagina(_visorPagActual + 1)"
                style="padding:9px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);
                       color:#fff;border-radius:10px;font-weight:900;cursor:pointer;font-size:0.82rem;">
                Siguiente ??
            </button>
        </div>
    `;

    // Renderizar la página solicitada
    await new Promise(resolve => cargarPdfJs(resolve));
    await renderizarPagina(numPagina);
}

function cerrarVisorPdf() {
    const overlay = document.getElementById('pdf-visor-overlay');
    if (overlay) overlay.remove();
}

// -- BÚSQUEDA EN EL PDF (solo localiza páginas) --
async function buscarEnPdf(tipo, termino) {
    const doc = await obtenerPdf(tipo);
    const totalPaginas = doc.numPages;
    const palabras = termino.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .split(/\s+/).filter(p => p.length > 2);

    const paginasEncontradas = [];

    for (let num = 1; num <= totalPaginas; num++) {
        const pagina = await doc.getPage(num);
        const contenido = await pagina.getTextContent();
        const textoRaw = contenido.items.map(i => i.str).join('');
        const textoNorm = textoRaw.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        let hits = 0;
        palabras.forEach(p => {
            const pFlex = p.split('').join('[\\s\\-]?');
            try { if (new RegExp(pFlex).test(textoNorm)) hits++; }
            catch (e) { if (textoNorm.includes(p)) hits++; }
        });

        if (hits > 0) paginasEncontradas.push({ pagina: num, hits });
    }

    paginasEncontradas.sort((a, b) => b.hits - a.hits);
    return paginasEncontradas.slice(0, 6);
}

// -- INTERFAZ DE BÚSQUEDA --
async function buscarEnManual(tipo) {
    const input = document.getElementById('busq-input');
    const termino = input ? input.value.trim() : '';
    if (!termino) return;

    const color = tipo === 'manual' ? '#55efc4' : '#fdcb6e';
    const titulo = tipo === 'manual' ? 'Manual de la Iglesia' : 'Guía de Ancianos';

    const estadoDiv = document.getElementById('estado-busqueda');
    const resultadosDiv = document.getElementById('resultados-pdf');
    const btnBuscar = document.getElementById('btn-buscar');

    estadoDiv.style.display = 'block';
    resultadosDiv.innerHTML = '';
    if (btnBuscar) { btnBuscar.disabled = true; btnBuscar.textContent = 'Buscando...'; }
    document.getElementById('msg-busq').textContent = 'Buscando en el documento oficial...';

    try {
        await new Promise(resolve => cargarPdfJs(resolve));
        const paginas = await buscarEnPdf(tipo, termino);

        estadoDiv.style.display = 'none';
        if (btnBuscar) { btnBuscar.disabled = false; btnBuscar.textContent = '?? Buscar'; }

        if (paginas.length === 0) {
            resultadosDiv.innerHTML = `
                <div style="text-align:center;padding:30px 20px;background:rgba(255,255,255,0.03);
                            border-radius:14px;border:1px dashed rgba(255,255,255,0.1);">
                    <div style="font-size:2.2rem;margin-bottom:12px;">&#x1F3B5;&#x2728;</div>
                    <p style="color:rgba(255,255,255,0.55);font-size:calc(0.88rem * var(--font-scale,1));line-height:1.5;">
                        No se encontró <b style="color:#fff;">"${termino}"</b> en el documento.<br>
                        <span style="font-size:0.8em;opacity:0.7;">Intenta con otras palabras clave.</span>
                    </p>
                </div>`;
            return;
        }

        // ENCABEZADO
        resultadosDiv.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                <div style="background:${color}20;border:1px solid ${color}40;border-radius:20px;
                            padding:5px 14px;color:${color};font-size:calc(0.72rem * var(--font-scale,1));
                            font-weight:900;letter-spacing:0.5px;">
                    ${paginas.length} PÁGINA${paginas.length > 1 ? 'S' : ''} ENCONTRADA${paginas.length > 1 ? 'S' : ''}
                </div>
                <div style="color:rgba(255,255,255,0.35);font-size:calc(0.7rem * var(--font-scale,1));">
                    "${termino}"
                </div>
            </div>
        ` +

            // TARJETAS ? botón abre el VISOR INTEGRADO en esa página
            paginas.map((r, idx) => `
            <div style="background:rgba(255,255,255,0.03);border:1px solid ${color}${idx === 0 ? '45' : '18'};
                        border-radius:14px;overflow:hidden;">
                <div style="padding:13px 16px;display:flex;align-items:center;gap:14px;">

                    <div style="min-width:54px;height:54px;background:${idx === 0 ? color : color + '22'};
                                border-radius:12px;display:flex;flex-direction:column;align-items:center;
                                justify-content:center;flex-shrink:0;">
                        <span style="color:${idx === 0 ? '#000' : color};font-size:calc(1.05rem * var(--font-scale,1));
                                     font-weight:900;line-height:1;">${r.pagina}</span>
                        <span style="color:${idx === 0 ? 'rgba(0,0,0,0.55)' : color + '99'};font-size:0.5rem;
                                     font-weight:700;letter-spacing:0.5px;margin-top:2px;">PÁG.</span>
                    </div>

                    <div style="flex:1;min-width:0;">
                        <div style="color:#fff;font-weight:700;font-size:calc(0.83rem * var(--font-scale,1));margin-bottom:3px;">
                            ${idx === 0 ? '? Resultado principal' : 'Resultado ' + (idx + 1)}
                        </div>
                        <div style="color:rgba(255,255,255,0.4);font-size:calc(0.7rem * var(--font-scale,1));line-height:1.4;">
                            El término <b style="color:${color};">"${termino}"</b> aparece aquí.
                        </div>
                    </div>

                    <!-- BOTÓN: abre el visor DENTRO de la app, en esa página exacta -->
                    <button onclick="abrirVisorPdf('${tipo}', ${r.pagina})"
                        style="min-width:58px;padding:10px 12px;
                               background:${idx === 0 ? color : color + '18'};
                               border:1px solid ${idx === 0 ? 'transparent' : color + '40'};
                               color:${idx === 0 ? '#000' : color};
                               font-weight:900;border-radius:10px;cursor:pointer;
                               font-size:calc(0.72rem * var(--font-scale,1));text-align:center;
                               line-height:1.4;flex-shrink:0;">
                        Ver<br>aquí ??
                    </button>
                </div>
            </div>
        `).join('');

    } catch (err) {
        if (btnBuscar) { btnBuscar.disabled = false; btnBuscar.textContent = '?? Buscar'; }
        estadoDiv.style.display = 'none';
        resultadosDiv.innerHTML = `
            <div style="text-align:center;padding:25px;background:rgba(255,80,80,0.05);
                        border:1px solid rgba(255,80,80,0.2);border-radius:14px;">
                <p style="color:#ff7675;font-size:calc(0.88rem * var(--font-scale,1));">
                    ? Error al acceder al documento.<br>
                    <span style="font-size:0.85em;opacity:0.8;">Verifica tu conexión a internet.</span>
                </p>
            </div>`;
    }
}



















function renderMenuDocumento(tipo) {
    const contenedor = document.getElementById('pantalla-estudio');
    const color = tipo === 'manual' ? '#55efc4' : '#fdcb6e';
    const titulo = tipo === 'manual' ? 'MANUAL DE IGLESIA' : 'GUIA DE ANCIANOS';
    const icono = tipo === 'manual' ? '??' : '??';
    const linkPdf = tipo === 'manual' ? './manual-de-la-iglesia-2022.pdf' : './guia-ancianos.pdf';
    const totalPaginasAprox = tipo === 'manual' ? '~200 págs.' : '~150 págs.';

    contenedor.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid ${color}40;">
                <button onclick="renderModuloIglesia()" style="background:${color}10;border:1px solid ${color};color:${color};padding:8px 15px;border-radius:8px;font-weight:900;font-size:calc(0.85rem * var(--font-scale,1));">?? VOLVER</button>
                <div>
                    <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale,1));">${icono} ${titulo}</div>
                    <div style="color:rgba(255,255,255,0.4);font-size:calc(0.65rem * var(--font-scale,1));">${totalPaginasAprox} ? Búsqueda en texto real</div>
                </div>
            </div>

            <div style="padding:20px;max-width:680px;margin:0 auto;">

                <!-- BUSCADOR -->
                <div style="background:rgba(255,255,255,0.04);border:1px solid ${color}40;border-radius:18px;padding:22px;margin-bottom:20px;">
                    <p style="color:rgba(255,255,255,0.7);font-size:calc(0.88rem * var(--font-scale,1));margin-bottom:14px;line-height:1.5;">
                        Escribe un tema y el sistema buscará en el texto real del ${titulo}. Se mostrará el extracto exacto y la página donde aparece.
                    </p>
                    <div style="display:flex;gap:10px;">
                        <input id="busq-input" type="text"
                            placeholder="Ej: disciplina, matrimonio, diezmo, cena..."
                            style="flex:1;padding:13px 16px;background:rgba(0,0,0,0.5);border:1px solid ${color}50;color:#fff;border-radius:12px;outline:none;font-size:calc(0.9rem * var(--font-scale,1));font-family:'Segoe UI',sans-serif;"
                            onkeydown="if(event.key==='Enter') buscarEnManual('${tipo}')"
                        >
                        <button onclick="buscarEnManual('${tipo}')" id="btn-buscar"
                            style="padding:13px 20px;background:${color};border:none;color:#000;font-weight:900;border-radius:12px;cursor:pointer;font-size:calc(0.88rem * var(--font-scale,1));white-space:nowrap;">
                            ?? Buscar
                        </button>
                    </div>

                    <!-- Sugerencias rápidas -->
                    <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">
                        <span style="color:rgba(255,255,255,0.35);font-size:0.7rem;align-self:center;">Sugerencias:</span>
                        ${['disciplina', 'matrimonio', 'diezmo', 'bautismo', 'santa cena', 'anciano', 'divorcio', 'oración'].map(t =>
        `<button onclick="document.getElementById('busq-input').value='${t}';buscarEnManual('${tipo}')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);padding:5px 12px;border-radius:20px;font-size:0.75rem;cursor:pointer;">${t}</button>`
    ).join('')}
                    </div>
                </div>

                <!-- ESTADO / RESULTADOS -->
                <div id="estado-busqueda" style="text-align:center;color:rgba(255,255,255,0.4);font-size:0.85rem;padding:20px 0;display:none;">
                    <div id="spinner-busq" style="width:34px;height:34px;border:3px solid rgba(255,255,255,0.1);border-top-color:${color};border-radius:50%;animation:girar 0.8s linear infinite;margin:0 auto 12px;"></div>
                    <div id="msg-busq">Cargando el manual y buscando...</div>
                </div>

                <div id="resultados-pdf" style="display:grid;gap:15px;"></div>

                <!-- BOTÓN ABRIR PDF COMPLETO -->
                <div style="margin-top:25px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
                    <button onclick="window.open('${linkPdf}','_blank')" style="width:100%;padding:14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);font-weight:700;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-size:calc(0.88rem * var(--font-scale,1));">
                        ?? Abrir el ${titulo} completo (PDF)
                    </button>
                </div>
            </div>
        </div>
        <style>
            @keyframes girar { to { transform: rotate(360deg); } }
            #busq-input::placeholder { color: rgba(255,255,255,0.3); }
        </style>
    `;
    window.scrollTo(0, 0);

    // Precargar PDF en segundo plano
    cargarPdfJs(() => { obtenerPdf(tipo).catch(() => { }); });
}




// ===============================================
// SISTEMA DE COMPARTIR CALENDARIO (ENLACES 4H)
// ===============================================

async function compartirCalendario(mesFiltro) {
    // Generar un token único e irrepetible
    const token = 'cal_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    const ahora = Date.now();
    const expiracion = ahora + (4 * 60 * 60 * 1000); // 4 horas en milisegundos

    // Mostrar indicador de carga inmediatamente
    const btn = document.getElementById('btn-compartir-cal');
    const btnMes = document.getElementById('btn-compartir-mes');
    const botonActivo = btn || btnMes;
    if (botonActivo) {
        botonActivo.innerHTML = '? Generando enlace...';
        botonActivo.disabled = true;
    }

    try {
        // Guardar el token en Firestore con expiración
        await db.collection('enlaces_temporales').doc(token).set({
            mes: mesFiltro,
            creadoEn: ahora,
            expiraEn: expiracion,
            tipo: 'calendario'
        });

        // Construir el enlace compartible ? apunta a la página pública de solo calendario
        const enlace = `https://agendatecnicadigital.com/calendario.html?token=${token}`;
        const expiraHora = new Date(expiracion).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const tituloMes = mesFiltro && mesFiltro !== 'null' ? 'Mes de ' + mesFiltro : 'Calendario Anual Completo';

        // Texto del mensaje limpio (sin información de expiración ? eso es interno)
        const textoCompartir = `?? CALENDARIO IGLESIA 2026\n` +
            `?? ${tituloMes}\n\n` +
            `?? Ver calendario:\n${enlace}`;

        // Reestablecer botón
        if (botonActivo) {
            botonActivo.innerHTML = '? ¡Enlace listo!';
            setTimeout(() => {
                if (btn) btn.innerHTML = '?? Compartir Calendario';
                if (btnMes) btnMes.innerHTML = '?? Compartir este mes';
                if (botonActivo) botonActivo.disabled = false;
            }, 2500);
        }

        // ? WEB SHARE API: abre el menú nativo del celular con TODAS las apps instaladas
        // (WhatsApp, Telegram, SMS, Email, Instagram, etc.)
        if (navigator.share) {
            await navigator.share({
                title: 'Calendario Iglesia 2026 - ' + tituloMes,
                text: textoCompartir,
                url: enlace
            });
        } else {
            // FALLBACK para navegadores de escritorio: abrir WhatsApp Web
            const mensajeWa = `?? *CALENDARIO IGLESIA 2026*\n?? *${tituloMes.toUpperCase()}*\n\n?? Ver calendario:\n${enlace}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(mensajeWa)}`, '_blank');
        }

    } catch (error) {
        // Si el usuario cancela el menú nativo, no mostrar error
        if (error.name === 'AbortError') {
            if (botonActivo) {
                botonActivo.innerHTML = '?? Compartir Calendario';
                botonActivo.disabled = false;
            }
            return;
        }
        console.error('Error generando enlace:', error);
        if (botonActivo) {
            botonActivo.innerHTML = '? Error. Intenta de nuevo';
            botonActivo.disabled = false;
            setTimeout(() => {
                if (btn) btn.innerHTML = '?? Compartir Calendario';
                if (btnMes) btnMes.innerHTML = '?? Compartir este mes';
            }, 2000);
        }
    }
}

// Verificar token en la URL al cargar la app (para quien recibe el enlace)
async function verificarTokenCalendario() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token || !token.startsWith('cal_')) return false;

    try {
        const doc = await db.collection('enlaces_temporales').doc(token).get();
        if (!doc.exists) {
            mostrarEnlaceExpirado('Este enlace no existe o ya fue eliminado.');
            return true;
        }

        const data = doc.data();
        const ahora = Date.now();

        if (ahora > data.expiraEn) {
            // Enlace expirado ? eliminar de Firestore para limpieza
            db.collection('enlaces_temporales').doc(token).delete().catch(() => { });
            mostrarEnlaceExpirado('Este enlace expiró. Los calendarios compartidos son válidos por solo 4 horas.');
            return true;
        }

        // Enlace válido ? mostrar el calendario directamente
        const minRestantes = Math.floor((data.expiraEn - ahora) / 60000);
        const mesFiltro = data.mes || null;

        // Mostrar el módulo de iglesia primero y luego el calendario
        document.querySelector('.intro-container').style.display = 'none';
        const pantalla = document.getElementById('pantalla-estudio');
        pantalla.className = 'container-estudio theme-adultos is-active';

        // Pequeño aviso de que es un enlace temporal
        setTimeout(() => {
            renderCalendarioIglesia(mesFiltro);
            // Insertar banner de enlace temporal
            const banner = document.createElement('div');
            banner.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(255,159,67,0.15);border:1px solid #ff9f43;padding:10px 20px;border-radius:12px;color:#ff9f43;font-size:0.8rem;font-weight:900;z-index:9999;text-align:center;backdrop-filter:blur(10px);';
            banner.innerHTML = `?? Enlace compartido ? expira en ${minRestantes} min`;
            document.body.appendChild(banner);
        }, 300);

        return true;
    } catch (error) {
        console.error('Error verificando token:', error);
        return false;
    }
}

function mostrarEnlaceExpirado(mensaje) {
    document.querySelector('.intro-container').style.display = 'none';
    const pantalla = document.getElementById('pantalla-estudio');
    pantalla.className = 'container-estudio theme-adultos is-active';
    pantalla.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center;font-family:'Segoe UI',sans-serif;">
            <div style="font-size:4rem;margin-bottom:20px;">&#x1F3B5;&#x2728;</div>
            <h2 style="color:#ff9f43;margin-bottom:15px;font-size:1.4rem;">Enlace Expirado</h2>
            <p style="color:rgba(255,255,255,0.6);line-height:1.6;max-width:300px;margin-bottom:30px;">${mensaje}</p>
            <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;">Pídele al administrador que comparta un enlace nuevo.</p>
        </div>
    `;
}

// ===============================================
// LÓGICA DE CALENDARIO
// ===============================================

const EVENTOS_CALENDARIO = [
    // ENERO
    { fecha: "2 Ene", dia: "Vie", titulo: "Obed", tipo: "predica", mes: "Enero" },
    { fecha: "3 Ene", dia: "Sáb", titulo: "Ministerio Personal", tipo: "predica", mes: "Enero" },
    { fecha: "7 Ene", dia: "Mié", titulo: "Jose Castillo", tipo: "predica", mes: "Enero" },
    { fecha: "9 Ene", dia: "Vie", titulo: "Daniel", tipo: "predica", mes: "Enero" },
    { fecha: "10 Ene", dia: "Sáb", titulo: "Presentación PTR", tipo: "evento", mes: "Enero" },
    { fecha: "12-17 Ene", dia: "Semana", titulo: "10 días de Oración y Salud", tipo: "especial", mes: "Enero" },
    { fecha: "14 Ene", dia: "Mié", titulo: "Wanda", tipo: "predica", mes: "Enero" },
    { fecha: "16 Ene", dia: "Vie", titulo: "Wanda", tipo: "predica", mes: "Enero" },
    { fecha: "17 Ene", dia: "Sáb", titulo: "Pastor", tipo: "predica", mes: "Enero" },
    { fecha: "21 Ene", dia: "Mié", titulo: "Nerlys", tipo: "predica", mes: "Enero" },
    { fecha: "23 Ene", dia: "Vie", titulo: "Jose Lopez", tipo: "predica", mes: "Enero" },
    { fecha: "24 Ene", dia: "Sáb", titulo: "Iniciación Aventureros / Pastor", tipo: "evento", mes: "Enero" },
    { fecha: "28 Ene", dia: "Mié", titulo: "Candelario", tipo: "predica", mes: "Enero" },
    { fecha: "30 Ene", dia: "Vie", titulo: "Cecilia", tipo: "predica", mes: "Enero" },
    { fecha: "31 Ene", dia: "Sáb", titulo: "Educación", tipo: "predica", mes: "Enero" },

    // FEBRERO
    { fecha: "4 Feb", dia: "Mié", titulo: "Flavio", tipo: "predica", mes: "Febrero" },
    { fecha: "6 Feb", dia: "Vie", titulo: "Luis Troya", tipo: "predica", mes: "Febrero" },
    { fecha: "7 Feb", dia: "Sáb", titulo: "Concurso Bíblico / Iniciación Conquista", tipo: "evento", mes: "Febrero" },
    { fecha: "11 Feb", dia: "Mié", titulo: "Gilda", tipo: "predica", mes: "Febrero" },
    { fecha: "13 Feb", dia: "Vie", titulo: "H. Maria", tipo: "predica", mes: "Febrero" },
    { fecha: "14 Feb", dia: "Sáb", titulo: "Cena Amistad JA / Salud y Temperancia", tipo: "evento", mes: "Febrero" },
    { fecha: "15-17 Feb", dia: "Semana", titulo: "Capacitación NEC", tipo: "especial", mes: "Febrero" },
    { fecha: "18 Feb", dia: "Mié", titulo: "Donil", tipo: "predica", mes: "Febrero" },
    { fecha: "20 Feb", dia: "Vie", titulo: "Wanda", tipo: "predica", mes: "Febrero" },
    { fecha: "21 Feb", dia: "Sáb", titulo: "Concierto Depto. Canto / Ptr. Solano", tipo: "evento", mes: "Febrero" },
    { fecha: "25-28 Feb", dia: "Semana", titulo: "Semana de Hogar y Familia", tipo: "especial", mes: "Febrero" },
    { fecha: "28 Feb", dia: "Sáb", titulo: "Visita de Coordinación", tipo: "evento", mes: "Febrero" },

    // MARZO
    { fecha: "6 Mar", dia: "Vie", titulo: "Convención de Lideres", tipo: "evento", mes: "Marzo" },
    { fecha: "7 Mar", dia: "Sáb", titulo: "Convención Min. Mujer", tipo: "evento", mes: "Marzo" },
    { fecha: "8 Mar", dia: "Dom", titulo: "Concurso Bíblico", tipo: "evento", mes: "Marzo" },
    { fecha: "11 Mar", dia: "Mié", titulo: "Yulima", tipo: "predica", mes: "Marzo" },
    { fecha: "13 Mar", dia: "Vie", titulo: "Yeny Morales", tipo: "predica", mes: "Marzo" },
    { fecha: "14 Mar", dia: "Sáb", titulo: "Cecilia W.", tipo: "predica", mes: "Marzo" },
    { fecha: "15-21 Mar", dia: "Semana", titulo: "Semana de Mayordomía", tipo: "especial", mes: "Marzo" },
    { fecha: "15 Mar", dia: "Dom", titulo: "Revisión de Libros", tipo: "evento", mes: "Marzo" },
    { fecha: "21 Mar", dia: "Sáb", titulo: "Día Mundial de la Juventud", tipo: "evento", mes: "Marzo" },
    { fecha: "25-28 Mar", dia: "Semana", titulo: "Capacitación Diáconos y Diaconisas", tipo: "especial", mes: "Marzo" },
    { fecha: "25 Mar", dia: "Mié", titulo: "Nerlys", tipo: "predica", mes: "Marzo" },
    { fecha: "27 Mar", dia: "Vie", titulo: "Rosani", tipo: "predica", mes: "Marzo" },
    { fecha: "28 Mar", dia: "Sáb", titulo: "José López", tipo: "predica", mes: "Marzo" },
    { fecha: "29 Mar", dia: "Dom", titulo: "Desayuno para nuevos", tipo: "evento", mes: "Marzo" },

    // ABRIL
    { fecha: "1 Abr", dia: "Mié", titulo: "Daniel", tipo: "predica", mes: "Abril" },
    { fecha: "3 Abr", dia: "Vie", titulo: "Cecilia", tipo: "predica", mes: "Abril" },
    { fecha: "4 Abr", dia: "Sáb", titulo: "Juego Bíblico", tipo: "evento", mes: "Abril" },
    { fecha: "5-11 Abr", dia: "Semana", titulo: "SEMANA DE EVANGELISMO", tipo: "especial", mes: "Abril" },
    { fecha: "5 Abr", dia: "Dom", titulo: "Salida recreativa Aventureros", tipo: "evento", mes: "Abril" },
    { fecha: "12 Abr", dia: "Dom", titulo: "Honores Conquistadores", tipo: "evento", mes: "Abril" },
    { fecha: "15 Abr", dia: "Mié", titulo: "Pilar", tipo: "predica", mes: "Abril" },
    { fecha: "17 Abr", dia: "Vie", titulo: "Daniel", tipo: "predica", mes: "Abril" },
    { fecha: "18 Abr", dia: "Sáb", titulo: "Junta Administrativa / Ptr. Solano", tipo: "evento", mes: "Abril" },
    { fecha: "20-25 Abr", dia: "Semana", titulo: "Semana Ministerio Infantil", tipo: "especial", mes: "Abril" },
    { fecha: "23 Abr", dia: "Jue", titulo: "Día Mundial de la Oración", tipo: "evento", mes: "Abril" },
    { fecha: "25 Abr", dia: "Sáb", titulo: "Salida JA Interiglesia", tipo: "evento", mes: "Abril" },
    { fecha: "29 Abr", dia: "Mié", titulo: "Castillo", tipo: "predica", mes: "Abril" },

    // MAYO
    { fecha: "1 May", dia: "Vie", titulo: "Maria", tipo: "predica", mes: "Mayo" },
    { fecha: "2 May", dia: "Sáb", titulo: "Acción Misionera", tipo: "evento", mes: "Mayo" },
    { fecha: "6 May", dia: "Mié", titulo: "Juan Antigua", tipo: "predica", mes: "Mayo" },
    { fecha: "8 May", dia: "Vie", titulo: "Flavio Candelario", tipo: "predica", mes: "Mayo" },
    { fecha: "9 May", dia: "Sáb", titulo: "Programa Caballeros", tipo: "evento", mes: "Mayo" },
    { fecha: "13 May", dia: "Mié", titulo: "Obed", tipo: "predica", mes: "Mayo" },
    { fecha: "15 May", dia: "Vie", titulo: "Juan Antigua", tipo: "predica", mes: "Mayo" },
    { fecha: "16 May", dia: "Sáb", titulo: "Día Mundial del Aventurero", tipo: "evento", mes: "Mayo" },
    { fecha: "20 May", dia: "Mié", titulo: "Pastor Solano", tipo: "predica", mes: "Mayo" },
    { fecha: "22-25 May", dia: "Semana", titulo: "Campamento Hispano", tipo: "especial", mes: "Mayo" },
    { fecha: "22 May", dia: "Vie", titulo: "Castillo", tipo: "predica", mes: "Mayo" },
    { fecha: "27 May", dia: "Mié", titulo: "Wanda", tipo: "predica", mes: "Mayo" },
    { fecha: "28-31 May", dia: "Semana", titulo: "INTER CAMPOREE AVEN Y CONQ", tipo: "especial", mes: "Mayo" },
    { fecha: "29 May", dia: "Vie", titulo: "Jose Luis", tipo: "predica", mes: "Mayo" },
    { fecha: "30 May", dia: "Sáb", titulo: "Obed", tipo: "predica", mes: "Mayo" },
    { fecha: "31 May", dia: "Dom", titulo: "Retiro Dpto. Caballeros", tipo: "evento", mes: "Mayo" },

    { fecha: "7-13 Jun", dia: "Semana", titulo: "Semana de Oración", tipo: "especial", mes: "Junio" },
    { fecha: "3 Jun", dia: "Mié", titulo: "Flavio", tipo: "predica", mes: "Junio" },
    { fecha: "5 Jun", dia: "Vie", titulo: "Nerlys", tipo: "predica", mes: "Junio" },
    { fecha: "6 Jun", dia: "Sáb", titulo: "Programa Damas", tipo: "evento", mes: "Junio" },
    { fecha: "10 Jun", dia: "Mié", titulo: "Castillo", tipo: "predica", mes: "Junio" },
    { fecha: "12 Jun", dia: "Vie", titulo: "Jose Lopez", tipo: "predica", mes: "Junio" },
    { fecha: "13 Jun", dia: "Sáb", titulo: "Culto Joven / JA", tipo: "evento", mes: "Junio" },
    { fecha: "17 Jun", dia: "Mié", titulo: "Wanda", tipo: "predica", mes: "Junio" },
    { fecha: "19 Jun", dia: "Vie", titulo: "Cecilia", tipo: "predica", mes: "Junio" },
    { fecha: "20 Jun", dia: "Sáb", titulo: "Día del Padre", tipo: "evento", mes: "Junio" },
    { fecha: "24 Jun", dia: "Mié", titulo: "Daniel", tipo: "predica", mes: "Junio" },
    { fecha: "26 Jun", dia: "Vie", titulo: "Obed", tipo: "predica", mes: "Junio" },
    { fecha: "27 Jun", dia: "Sáb", titulo: "Bautismo Trimestral", tipo: "evento", mes: "Junio" }

    // JULIO a DICIEMBRE ? Se agregan desde la app con ? (se guardan en Firebase)
];

// ===============================================
// ??? CALENDARIO INTELIGENTE v2 — CRUD + FIREBASE
// ===============================================
let calAuth = { esDirector: false, esTemporal: false };
let eventosFirestore = [];

// Verificar token temporal en URL
(function checkCalToken() {
    try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('cal_token');
        if (token && typeof db !== 'undefined') {
            db.collection('calendario_tokens').doc(token).get().then(doc => {
                if (doc.exists && doc.data().expira.toDate() > new Date()) {
                    calAuth.esTemporal = true;
                }
            }).catch(() => { });
        }
    } catch (e) { }
})();

async function cargarEventosFirestore() {
    if (typeof db === 'undefined') return [];
    try {
        const snap = await db.collection('calendario_eventos').orderBy('fechaOrden').get();
        eventosFirestore = snap.docs.map(d => ({ id: d.id, ...d.data(), esFirestore: true }));
        return eventosFirestore;
    } catch (e) { return []; }
}

function obtenerTodosLosEventos() {
    const base = EVENTOS_CALENDARIO.map(e => ({ ...e, esFirestore: false }));
    return [...base, ...eventosFirestore];
}

function puedeEditarCalendario() {
    if (!calAuth.esDirector && localStorage.getItem('cal_director') === 'true') calAuth.esDirector = true;
    return calAuth.esDirector || calAuth.esTemporal;
}

async function autenticarDirectorCalendario() {
    // Verificar si tiene biometría registrada
    const tieneBio = localStorage.getItem('cal_bio_registered') === 'true';

    if (tieneBio && window.PublicKeyCredential) {
        // Ofrecer opciones: huella o clave
        const opcion = await new Promise(resolve => {
            const ov = document.createElement('div');
            ov.id = 'auth-method-overlay';
            ov.style.cssText = 'position:fixed;inset:0;z-index:10002;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;padding:20px;animation:devFadeIn 0.2s ease-out;';
            ov.innerHTML = `
                <div style="background:linear-gradient(170deg,#0f0a2a,#1a0f3c);border:1px solid rgba(255,159,67,0.3);border-radius:20px;padding:30px 24px;width:100%;max-width:360px;text-align:center;">
                    <div style="font-size:3rem;margin-bottom:14px;">&#x1F3B5;&#x2728;</div>
                    <h3 style="color:#ff9f43;margin:0 0 8px;font-size:1.1rem;">ACCESO DIRECTOR</h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0 0 24px;">Elige cómo autenticarte:</p>
                    <div style="display:grid;gap:12px;">
                        <button id="auth-bio-btn" style="padding:18px;background:linear-gradient(135deg,#ff9f43,#feca57);border:none;border-radius:14px;color:#000;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 20px rgba(255,159,67,0.3);">
                            ?? HUELLA DIGITAL
                        </button>
                        <button id="auth-clave-btn" style="padding:14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.2);border-radius:14px;color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer;">
                            ?? INGRESAR CLAVE
                        </button>
                        <button id="auth-cancel-btn" style="padding:10px;background:none;border:none;color:rgba(255,255,255,0.3);font-size:0.8rem;cursor:pointer;">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(ov);
            document.getElementById('auth-bio-btn').onclick = () => { ov.remove(); resolve('bio'); };
            document.getElementById('auth-clave-btn').onclick = () => { ov.remove(); resolve('clave'); };
            document.getElementById('auth-cancel-btn').onclick = () => { ov.remove(); resolve('cancel'); };
        });

        if (opcion === 'cancel') return false;

        if (opcion === 'bio') {
            const ok = await verificarBiometria();
            if (ok) {
                calAuth.esDirector = true;
                localStorage.setItem('cal_director', 'true');
                if (typeof mostrarToast === 'function') mostrarToast('? Autenticado con huella');
                return true;
            } else {
                if (typeof mostrarToast === 'function') mostrarToast('? Autenticación fallida');
                return false;
            }
        }
    }

    // Autenticación por clave
    const clave = prompt('?? Ingresa la clave del director:');
    if (clave === 'qwzx2121') {
        calAuth.esDirector = true;
        localStorage.setItem('cal_director', 'true');

        // Ofrecer registrar biometría si es compatible
        if (window.PublicKeyCredential && !tieneBio) {
            const quiere = confirm('? Acceso concedido\n\n?? ¿Deseas activar la HUELLA DIGITAL para la próxima vez?\n\nAsí no tendrás que recordar la clave.');
            if (quiere) await registrarBiometria();
        }
        return true;
    }
    if (clave) { if (typeof mostrarToast === 'function') mostrarToast('? Clave incorrecta'); }
    return false;
}

// Registrar credencial biométrica en el dispositivo
async function registrarBiometria() {
    try {
        const userId = new Uint8Array(16);
        crypto.getRandomValues(userId);
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const credential = await navigator.credentials.create({
            publicKey: {
                challenge,
                rp: { name: 'Legado Bíblico', id: window.location.hostname },
                user: {
                    id: userId,
                    name: 'director@legadobiblico',
                    displayName: 'Director de Iglesia'
                },
                pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
                authenticatorSelection: {
                    authenticatorAttachment: 'platform',
                    userVerification: 'required'
                },
                timeout: 60000
            }
        });

        if (credential) {
            const credId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
            localStorage.setItem('cal_bio_cred_id', credId);
            localStorage.setItem('cal_bio_registered', 'true');
            if (typeof mostrarToast === 'function') mostrarToast('?? Huella digital activada');
        }
    } catch (e) {
        console.warn('Error registrando biometría:', e);
        if (typeof mostrarToast === 'function') mostrarToast('?? No se pudo activar la huella');
    }
}

// Verificar biometría
async function verificarBiometria() {
    try {
        const credIdB64 = localStorage.getItem('cal_bio_cred_id');
        if (!credIdB64) return false;

        const credIdArray = Uint8Array.from(atob(credIdB64), c => c.charCodeAt(0));
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const assertion = await navigator.credentials.get({
            publicKey: {
                challenge,
                allowCredentials: [{
                    id: credIdArray,
                    type: 'public-key',
                    transports: ['internal']
                }],
                userVerification: 'required',
                timeout: 60000
            }
        });

        return !!assertion;
    } catch (e) {
        console.warn('Error verificando biometría:', e);
        return false;
    }
}

async function generarEnlaceTemporalCal() {
    if (!calAuth.esDirector) { if (!(await autenticarDirectorCalendario())) return; }
    const token = 'cal_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    const expira = new Date(Date.now() + 4 * 3600000);
    if (typeof db !== 'undefined') {
        try { await db.collection('calendario_tokens').doc(token).set({ expira, creado: new Date() }); } catch (e) { }
    }
    const enlace = window.location.origin + window.location.pathname + '?cal_token=' + token + '#iglesia';
    const msg = '??? *ACCESO TEMPORAL AL CALENDARIO*\n\nSe te ha dado acceso para agregar eventos.\n? Expira en 4 horas.\n\n?? ' + enlace;
    if (navigator.share) {
        navigator.share({ title: 'Acceso Calendario', text: msg }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(enlace).then(() => { if (typeof mostrarToast === 'function') mostrarToast('? Enlace copiado (4h)'); });
    }
}

function mostrarFormularioEvento(ev = null) {
    const esEd = ev !== null;
    const ov = document.createElement('div');
    ov.id = 'cal-form-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:20px;animation:devFadeIn 0.2s ease-out;';
    ov.innerHTML = `
        <div style="background:linear-gradient(170deg,#0f0a2a,#1a0f3c);border:1px solid rgba(255,159,67,0.3);border-radius:20px;padding:28px 22px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
                <h3 style="color:#ff9f43;margin:0;font-size:1rem;letter-spacing:2px;">?? ${esEd ? 'EDITAR EVENTO' : 'NUEVO EVENTO'}</h3>
                <button onclick="document.getElementById('cal-form-overlay').remove()" style="background:none;border:none;color:rgba(255,255,255,0.4);font-size:1.5rem;cursor:pointer;">?</button>
            </div>
            <div style="display:grid;gap:16px;">
                <div>
                    <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.7rem;margin-bottom:6px;font-weight:bold;letter-spacing:1px;">FECHA</label>
                    <input type="date" id="cal-ev-fecha" value="${esEd ? (ev.fechaOrden || '') : ''}" style="width:100%;padding:14px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,159,67,0.2);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;">
                </div>
                <div>
                    <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.7rem;margin-bottom:6px;font-weight:bold;letter-spacing:1px;">TÍTULO / DESCRIPCIÓN</label>
                    <input type="text" id="cal-ev-titulo" value="${esEd ? ev.titulo : ''}" placeholder="Ej: Semana de Oración, Pastor López..." style="width:100%;padding:14px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,159,67,0.2);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;">
                </div>
                <div>
                    <label style="display:block;color:rgba(255,255,255,0.5);font-size:0.7rem;margin-bottom:6px;font-weight:bold;letter-spacing:1px;">TIPO DE EVENTO</label>
                    <select id="cal-ev-tipo" style="width:100%;padding:14px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,159,67,0.2);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;">
                        <option value="predica" ${esEd && ev.tipo === 'predica' ? 'selected' : ''}>?? Prédica / Culto</option>
                        <option value="evento" ${esEd && ev.tipo === 'evento' ? 'selected' : ''}>?? Evento / Programa</option>
                        <option value="especial" ${esEd && ev.tipo === 'especial' ? 'selected' : ''}>?? Especial / Semana</option>
                    </select>
                </div>
                <button onclick="guardarEventoCalendario(${esEd ? "'" + ev.id + "'" : 'null'})" style="width:100%;padding:16px;background:linear-gradient(135deg,#ff9f43,#feca57);border:none;border-radius:14px;color:#000;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 20px rgba(255,159,67,0.3);margin-top:8px;">
                    ${esEd ? '?? GUARDAR CAMBIOS' : '? AGREGAR EVENTO'}
                </button>
                ${esEd ? '<button onclick="eliminarEventoCalendario(\'' + ev.id + '\')" style="width:100%;padding:14px;background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.4);border-radius:14px;color:#ff6b6b;font-weight:900;font-size:0.9rem;cursor:pointer;">??? ELIMINAR EVENTO</button>' : ''}
            </div>
        </div>
    `;
    document.body.appendChild(ov);
}

async function guardarEventoCalendario(idExistente) {
    const fechaInput = document.getElementById('cal-ev-fecha').value;
    const titulo = document.getElementById('cal-ev-titulo').value.trim();
    const tipo = document.getElementById('cal-ev-tipo').value;
    if (!fechaInput || !titulo) { if (typeof mostrarToast === 'function') mostrarToast('?? Completa fecha y título'); return; }

    const dt = new Date(fechaInput + 'T12:00:00');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const diasSem = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const mesCorto = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const evento = {
        fecha: dt.getDate() + ' ' + mesCorto[dt.getMonth()],
        dia: diasSem[dt.getDay()],
        titulo, tipo,
        mes: meses[dt.getMonth()],
        fechaOrden: fechaInput,
        creadoEn: new Date().toISOString()
    };
    try {
        if (idExistente) { await db.collection('calendario_eventos').doc(idExistente).update(evento); }
        else { await db.collection('calendario_eventos').add(evento); }
        if (typeof mostrarToast === 'function') mostrarToast(idExistente ? '? Evento actualizado' : '? Evento agregado');
        document.getElementById('cal-form-overlay')?.remove();
        await cargarEventosFirestore();
        renderCalendarioIglesia();
    } catch (e) { if (typeof mostrarToast === 'function') mostrarToast('? Error: ' + e.message); }
}

async function eliminarEventoCalendario(id) {
    mostrarConfirm('🗑️ ¿Eliminar este evento?', async function() {
        try {
            await db.collection('calendario_eventos').doc(id).delete();
            if (typeof mostrarToast === 'function') mostrarToast('✅ Evento eliminado');
            document.getElementById('cal-form-overlay')?.remove();
            await cargarEventosFirestore();
            renderCalendarioIglesia();
        } catch (e) { if (typeof mostrarToast === 'function') mostrarToast('❌ Error: ' + e.message); }
    });
}

async function accionAgregarEvento() {
    if (puedeEditarCalendario()) { mostrarFormularioEvento(); }
    else { if (await autenticarDirectorCalendario()) mostrarFormularioEvento(); }
}

async function accionEditarEvento(id) {
    if (!puedeEditarCalendario()) { if (!(await autenticarDirectorCalendario())) return; }
    const ev = eventosFirestore.find(e => e.id === id);
    if (ev) mostrarFormularioEvento(ev);
}

// ===============================================
// RENDER PRINCIPAL DEL CALENDARIO
// ===============================================
async function renderCalendarioIglesia(mesFiltro = null) {
    const contenedor = document.getElementById('pantalla-estudio');
    await cargarEventosFirestore();

    if (!mesFiltro) {
        const todos = obtenerTodosLosEventos();
        const ordenMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const pe = puedeEditarCalendario();

        let htmlBotones = ordenMeses.map(m => {
            const c = todos.filter(e => e.mes === m).length;
            if (c > 0) {
                return `<button onclick="renderCalendarioIglesia('${m}')" style="background:rgba(255,159,67,0.12);border:2px solid #ff9f43;padding:18px 12px;border-radius:12px;color:#fff;font-weight:bold;font-size:calc(0.95rem * var(--font-scale, 1));cursor:pointer;text-align:center;box-shadow:0 4px 15px rgba(255,159,67,0.15);">
                    ?? ${m.toUpperCase()}
                    <div style="font-size:0.65rem;color:#ff9f43;margin-top:4px;font-weight:900;">${c} eventos</div>
                </button>`;
            } else {
                return `<button onclick="renderCalendarioIglesia('${m}')" style="background:rgba(255,255,255,0.02);border:1px dashed rgba(255,255,255,0.12);padding:18px 12px;border-radius:12px;color:rgba(255,255,255,0.35);font-weight:bold;font-size:calc(0.95rem * var(--font-scale, 1));cursor:pointer;text-align:center;opacity:0.7;">
                    ??? ${m.toUpperCase()}
                    <div style="font-size:0.6rem;color:rgba(255,255,255,0.2);margin-top:4px;">PENDIENTE</div>
                </button>`;
            }
        }).join('');

        contenedor.innerHTML = `
            <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
                <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,159,67,0.3);">
                    <button onclick="renderModuloIglesia()" style="background:rgba(255,159,67,0.1);border:1px solid #ff9f43;color:#ff9f43;padding:8px 15px;border-radius:8px;font-weight:900;">?? VOLVER</button>
                    <div style="flex:1;color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">CALENDARIO OFICIAL</div>
                    ${pe ? '<button onclick="accionAgregarEvento()" style="background:linear-gradient(135deg,#ff9f43,#feca57);border:none;color:#000;padding:8px 14px;border-radius:8px;font-weight:900;font-size:0.8rem;cursor:pointer;">? NUEVO</button>' : ''}
                </div>
                <div style="padding:20px;max-width:800px;margin:0 auto;text-align:center;">
                    <div style="font-size:calc(3rem * var(--font-scale, 1));margin-bottom:10px;">?????</div>
                    <h3 style="color:#ff9f43;font-size:calc(1.3rem * var(--font-scale, 1));margin-bottom:5px;">PROGRAMACIÓN ANUAL 2026</h3>
                    <p style="color:rgba(255,255,255,0.6);font-size:calc(0.9rem * var(--font-scale, 1));margin-bottom:25px;">Selecciona el mes que deseas visualizar:</p>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:15px;margin-bottom:25px;">${htmlBotones}</div>
                    <button onclick="renderCalendarioIglesia('Todos')" style="width:100%;max-width:400px;margin:0 auto;display:block;background:linear-gradient(135deg,#ff9f43,#feca57);border:none;padding:15px;border-radius:12px;color:#000;font-weight:900;font-size:calc(0.95rem * var(--font-scale, 1));cursor:pointer;box-shadow:0 5px 15px rgba(255,159,67,0.3);">VER TODOS LOS MESES JUNTOS</button>
                    <div style="margin-top:25px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);display:grid;gap:12px;">
                        ${!pe ? '<button onclick="accionAgregarEvento()" style="width:100%;max-width:400px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(255,159,67,0.1);border:1px solid rgba(255,159,67,0.4);padding:14px 20px;border-radius:14px;color:#ff9f43;font-weight:900;font-size:calc(0.9rem * var(--font-scale, 1));cursor:pointer;">?? ACCESO DIRECTOR</button>' : '<button onclick="generarEnlaceTemporalCal()" style="width:100%;max-width:400px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(108,92,231,0.1);border:1px solid rgba(162,155,254,0.4);padding:14px 20px;border-radius:14px;color:#a29bfe;font-weight:900;font-size:calc(0.9rem * var(--font-scale, 1));cursor:pointer;">?? GENERAR ENLACE TEMPORAL (4h)</button>'}
                    </div>
                </div>
            </div>
        `;
        window.scrollTo(0, 0);
        return;
    }

    // MODO VISUALIZACIÓN DE EVENTOS
    const todos = obtenerTodosLosEventos();
    const pe = puedeEditarCalendario();
    let evs = mesFiltro === "Todos" ? todos : todos.filter(e => e.mes === mesFiltro);
    evs.sort((a, b) => (a.fechaOrden || '').localeCompare(b.fechaOrden || ''));

    // Detectar HOY y próximo evento
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const mesNum = { Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5, Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11 };
    function fechaEvento(ev) {
        const p = ev.fecha.split(' ');
        const d = parseInt(p[0].split('-')[0]);
        const m = mesNum[p[1]];
        return m !== undefined ? new Date(2026, m, d) : null;
    }

    let proximoEvento = null;
    evs.forEach(ev => {
        const d = fechaEvento(ev);
        if (d && d >= hoy && !proximoEvento) proximoEvento = { ...ev, dateObj: d };
    });

    // Banner de próximo evento
    let bannerProximo = '';
    if (proximoEvento) {
        const diasFaltan = Math.ceil((proximoEvento.dateObj - hoy) / 86400000);
        const cuando = diasFaltan === 0 ? '?? HOY' : (diasFaltan === 1 ? '? MAÑANA' : `? En ${diasFaltan} días`);
        const cbp = proximoEvento.tipo === 'predica' ? '#e74c3c' : (proximoEvento.tipo === 'evento' ? '#f39c12' : '#9b59b6');
        bannerProximo = `
            <div style="background:linear-gradient(135deg,rgba(255,159,67,0.15),rgba(255,159,67,0.05));border:1px solid rgba(255,159,67,0.4);border-radius:14px;padding:16px;margin-bottom:20px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                    <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);letter-spacing:2px;font-weight:900;">?? PRÓXIMO EVENTO</div>
                    <div style="background:${cbp};color:#fff;padding:2px 8px;border-radius:50px;font-size:0.6rem;font-weight:900;">${cuando}</div>
                </div>
                <div style="color:#fff;font-weight:900;font-size:calc(1.05rem * var(--font-scale, 1));">${proximoEvento.titulo}</div>
                <div style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));margin-top:4px;">${proximoEvento.dia} ${proximoEvento.fecha}</div>
            </div>`;
    }

    // Filtros
    const filtros = `
        <div style="display:flex;gap:6px;margin-bottom:18px;flex-wrap:wrap;" id="cal-filtros">
            <button onclick="filtrarCalEvs('todo')" class="cal-f-btn cal-f-act" style="padding:8px 14px;border-radius:50px;font-size:0.7rem;font-weight:900;cursor:pointer;border:1px solid rgba(255,159,67,0.5);background:rgba(255,159,67,0.15);color:#ff9f43;">TODO</button>
            <button onclick="filtrarCalEvs('predica')" class="cal-f-btn" style="padding:8px 14px;border-radius:50px;font-size:0.7rem;font-weight:900;cursor:pointer;border:1px solid rgba(231,76,60,0.3);background:rgba(231,76,60,0.05);color:rgba(231,76,60,0.6);">?? PRÉDICAS</button>
            <button onclick="filtrarCalEvs('evento')" class="cal-f-btn" style="padding:8px 14px;border-radius:50px;font-size:0.7rem;font-weight:900;cursor:pointer;border:1px solid rgba(243,156,18,0.3);background:rgba(243,156,18,0.05);color:rgba(243,156,18,0.6);">?? EVENTOS</button>
            <button onclick="filtrarCalEvs('especial')" class="cal-f-btn" style="padding:8px 14px;border-radius:50px;font-size:0.7rem;font-weight:900;cursor:pointer;border:1px solid rgba(155,89,182,0.3);background:rgba(155,89,182,0.05);color:rgba(155,89,182,0.6);">?? ESPECIALES</button>
        </div>`;

    // Eventos
    let html = "", cm = "";
    evs.forEach(ev => {
        if (ev.mes !== cm) {
            cm = ev.mes;
            html += `<div style="background:rgba(255,159,67,0.15);color:#ff9f43;padding:10px 15px;border-radius:8px;font-weight:900;font-size:calc(1.1rem * var(--font-scale, 1));margin-top:20px;margin-bottom:10px;text-transform:uppercase;letter-spacing:2px;border:1px solid rgba(255,159,67,0.3);">?? ${cm} 2026</div>`;
        }
        const cb = ev.tipo === 'predica' ? '#e74c3c' : (ev.tipo === 'evento' ? '#f39c12' : '#9b59b6');
        const editBtn = (ev.esFirestore && pe) ? '<button onclick="accionEditarEvento(\'' + ev.id + '\')" style="background:none;border:none;color:rgba(255,255,255,0.3);font-size:0.9rem;cursor:pointer;padding:4px;">??</button>' : '';
        const tag = ev.esFirestore ? '<span style="font-size:0.55rem;background:rgba(255,159,67,0.2);color:#ff9f43;padding:2px 6px;border-radius:4px;margin-left:6px;">NUEVO</span>' : '';

        // Detectar si es HOY
        const dEv = fechaEvento(ev);
        const esHoy = dEv && dEv.getTime() === hoy.getTime();
        const estiloHoy = esHoy ? 'border:1px solid #feca57;box-shadow:0 0 15px rgba(254,202,87,0.25);background:rgba(254,202,87,0.08);' : 'background:rgba(255,255,255,0.05);';
        const badgeHoy = esHoy ? '<span style="font-size:0.55rem;background:linear-gradient(135deg,#ff9f43,#feca57);color:#000;padding:2px 8px;border-radius:4px;margin-left:6px;font-weight:900;animation:pulseHoy 1.5s infinite;">HOY</span>' : '';

        html += `<div class="cal-ev-item" data-tipo="${ev.tipo}" style="${estiloHoy}border-left:4px solid ${cb};padding:15px;border-radius:8px;margin-bottom:8px;display:flex;align-items:center;">
            <div style="min-width:75px;text-align:center;border-right:1px solid rgba(255,255,255,0.1);padding-right:15px;margin-right:15px;">
                <div style="color:rgba(255,255,255,0.5);font-size:calc(0.75rem * var(--font-scale, 1));text-transform:uppercase;">${ev.dia}</div>
                <div style="color:${esHoy ? '#feca57' : '#fff'};font-weight:900;font-size:calc(0.95rem * var(--font-scale, 1));">${ev.fecha.split(' ')[0]}</div>
            </div>
            <div style="flex:1;"><div style="color:#fff;font-size:calc(0.95rem * var(--font-scale, 1));font-weight:bold;">${ev.titulo}${tag}${badgeHoy}</div></div>
            ${editBtn}
        </div>`;
    });

    contenedor.innerHTML = `
        <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,159,67,0.3);">
                <button onclick="renderCalendarioIglesia()" style="background:rgba(255,159,67,0.1);border:1px solid #ff9f43;color:#ff9f43;padding:8px 15px;border-radius:8px;font-weight:900;">?? MESES</button>
                <div style="flex:1;color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">${mesFiltro === "Todos" ? "CALENDARIO ANUAL" : "MES DE " + mesFiltro.toUpperCase()}</div>
                ${pe ? '<button onclick="accionAgregarEvento()" style="background:linear-gradient(135deg,#ff9f43,#feca57);border:none;color:#000;padding:8px 14px;border-radius:8px;font-weight:900;font-size:0.8rem;cursor:pointer;">?</button>' : ''}
            </div>
            <div style="padding:20px;max-width:800px;margin:0 auto;">
                ${bannerProximo}
                ${filtros}
                <div style="display:grid;gap:5px;" id="cal-eventos-lista">${html}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:25px;">
                    <button onclick="renderCalendarioIglesia()" style="padding:15px;background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:8px;font-weight:900;font-size:calc(0.85rem * var(--font-scale, 1));cursor:pointer;">?? Regresar</button>
                    <button onclick="mostrarMenuCompartir('${mesFiltro}')" style="padding:15px;background:linear-gradient(135deg,rgba(108,92,231,0.2),rgba(108,92,231,0.1));color:#fff;border:1px solid rgba(162,155,254,0.5);border-radius:8px;font-weight:900;font-size:calc(0.85rem * var(--font-scale, 1));cursor:pointer;">?? Compartir</button>
                </div>
            </div>
        </div>
        <style>
            @keyframes pulseHoy { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
        </style>
    `;
    window.scrollTo(0, 0);
}

// ===============================================
// ?? FILTROS DE EVENTOS — NIVEL 3
// ===============================================
function filtrarCalEvs(tipo) {
    const items = document.querySelectorAll('.cal-ev-item');
    items.forEach(el => {
        if (tipo === 'todo' || el.dataset.tipo === tipo) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
    // Actualizar botones activos
    const btns = document.querySelectorAll('.cal-f-btn');
    const colores = { todo: { bg: 'rgba(255,159,67,0.15)', borde: 'rgba(255,159,67,0.5)', color: '#ff9f43' }, predica: { bg: 'rgba(231,76,60,0.15)', borde: 'rgba(231,76,60,0.5)', color: '#e74c3c' }, evento: { bg: 'rgba(243,156,18,0.15)', borde: 'rgba(243,156,18,0.5)', color: '#f39c12' }, especial: { bg: 'rgba(155,89,182,0.15)', borde: 'rgba(155,89,182,0.5)', color: '#9b59b6' } };
    btns.forEach(btn => {
        const btnTipo = btn.onclick.toString().match(/'(\w+)'/)?.[1];
        if (btnTipo === tipo) {
            const c = colores[tipo];
            btn.style.background = c.bg;
            btn.style.borderColor = c.borde;
            btn.style.color = c.color;
        } else {
            const c = colores[btnTipo] || colores.todo;
            btn.style.background = c.bg.replace('0.15', '0.05');
            btn.style.borderColor = c.borde.replace('0.5', '0.3');
            btn.style.color = c.color.replace(')', ',0.6)').replace('rgb', 'rgba');
        }
    });
}

// ===============================================
// ?? COMPARTIR INTELIGENTE — NIVEL 2
// ===============================================
function mostrarMenuCompartir(mesFiltro) {
    const ov = document.createElement('div');
    ov.id = 'compartir-cal-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;padding:20px;animation:devFadeIn 0.2s ease-out;';
    ov.innerHTML = `
        <div style="background:linear-gradient(170deg,#0f0a2a,#1a0f3c);border:1px solid rgba(108,92,231,0.3);border-radius:20px;padding:28px 22px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
                <h3 style="color:#a29bfe;margin:0;font-size:1rem;letter-spacing:2px;">?? COMPARTIR</h3>
                <button onclick="document.getElementById('compartir-cal-overlay').remove()" style="background:none;border:none;color:rgba(255,255,255,0.4);font-size:1.5rem;cursor:pointer;">?</button>
            </div>
            <p style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin:0 0 16px;letter-spacing:1px;">¿QUÉ DESEAS COMPARTIR?</p>
            <div style="display:grid;gap:10px;">
                <button onclick="ejecutarCompartir('semana','${mesFiltro}')" style="padding:16px;background:rgba(108,92,231,0.1);border:1px solid rgba(162,155,254,0.3);border-radius:12px;color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;">
                    <span style="font-size:1.3rem;">??</span>
                    <div><div style="font-weight:900;">Esta Semana</div><div style="font-size:0.65rem;color:rgba(255,255,255,0.35);margin-top:2px;">Próximos 7 días</div></div>
                </button>
                <button onclick="ejecutarCompartir('2semanas','${mesFiltro}')" style="padding:16px;background:rgba(108,92,231,0.1);border:1px solid rgba(162,155,254,0.3);border-radius:12px;color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;">
                    <span style="font-size:1.3rem;">??</span>
                    <div><div style="font-weight:900;">Próximas 2 Semanas</div><div style="font-size:0.65rem;color:rgba(255,255,255,0.35);margin-top:2px;">Próximos 14 días</div></div>
                </button>
                <button onclick="ejecutarCompartir('mes','${mesFiltro}')" style="padding:16px;background:rgba(108,92,231,0.15);border:1px solid rgba(162,155,254,0.4);border-radius:12px;color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;">
                    <span style="font-size:1.3rem;">???</span>
                    <div><div style="font-weight:900;">Mes de ${mesFiltro !== 'Todos' ? mesFiltro : 'Todos'}</div><div style="font-size:0.65rem;color:rgba(255,255,255,0.35);margin-top:2px;">Todos los eventos del mes</div></div>
                </button>
                <button onclick="ejecutarCompartir('completo','${mesFiltro}')" style="padding:16px;background:rgba(255,159,67,0.1);border:1px solid rgba(255,159,67,0.3);border-radius:12px;color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;">
                    <span style="font-size:1.3rem;">??</span>
                    <div><div style="font-weight:900;">Calendario Completo</div><div style="font-size:0.65rem;color:rgba(255,255,255,0.35);margin-top:2px;">Todos los meses del año</div></div>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(ov);
}

function ejecutarCompartir(tipo, mesFiltro) {
    document.getElementById('compartir-cal-overlay')?.remove();
    const todos = obtenerTodosLosEventos();
    const hoy = new Date();
    let eventosFiltrados = [];
    let tituloCompartir = '';

    // Mapeo de meses cortos a números para comparar fechas
    const mesNum = { Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5, Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11 };

    // Función para convertir fecha del evento a Date object
    function eventoADate(ev) {
        const partes = ev.fecha.split(' ');
        const dia = parseInt(partes[0].split('-')[0]);
        const mesStr = partes[1];
        const numMes = mesNum[mesStr];
        if (numMes === undefined) return null;
        return new Date(2026, numMes, dia);
    }

    if (tipo === 'semana') {
        const fin = new Date(hoy.getTime() + 7 * 86400000);
        eventosFiltrados = todos.filter(ev => {
            const d = eventoADate(ev);
            return d && d >= hoy && d <= fin;
        });
        tituloCompartir = 'ESTA SEMANA';
    } else if (tipo === '2semanas') {
        const fin = new Date(hoy.getTime() + 14 * 86400000);
        eventosFiltrados = todos.filter(ev => {
            const d = eventoADate(ev);
            return d && d >= hoy && d <= fin;
        });
        tituloCompartir = 'PRÓXIMAS 2 SEMANAS';
    } else if (tipo === 'mes') {
        const mesTarget = mesFiltro !== 'Todos' ? mesFiltro : null;
        if (mesTarget) {
            eventosFiltrados = todos.filter(ev => ev.mes === mesTarget);
            tituloCompartir = 'MES DE ' + mesTarget.toUpperCase();
        } else {
            eventosFiltrados = todos;
            tituloCompartir = 'CALENDARIO COMPLETO';
        }
    } else {
        eventosFiltrados = todos;
        tituloCompartir = 'CALENDARIO COMPLETO 2026';
    }

    if (eventosFiltrados.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('?? No hay eventos en ese período');
        return;
    }

    // Nombres completos de días
    const diasCompletos = { Sáb: 'Sábado', Mié: 'Miércoles', Vie: 'Viernes', Dom: 'Domingo', Lun: 'Lunes', Mar: 'Martes', Jue: 'Jueves', Semana: 'Semana' };

    // Generar texto profesional
    let texto = '';
    texto += `?????????????????????\n`;
    texto += `     ?  *CYPRESS HILLS*\n`;
    texto += `  *SDA CHURCH — 2026*\n`;
    texto += `?????????????????????\n\n`;
    texto += `??  *${tituloCompartir}*\n`;
    texto += `---------------------\n\n`;

    let mesActual = '';
    let contadorMes = 0;
    eventosFiltrados.forEach((ev, i) => {
        // Separador de mes
        if (ev.mes !== mesActual) {
            if (mesActual !== '') texto += `\n`;
            mesActual = ev.mes;
            contadorMes = 0;
            const evsEnMes = eventosFiltrados.filter(e => e.mes === ev.mes).length;
            texto += `+---------------------+\n`;
            texto += `¦  ??  *${mesActual.toUpperCase()}*  ·  ${evsEnMes} actividades\n`;
            texto += `+---------------------+\n\n`;
        }

        // Ícono por tipo
        const icono = ev.tipo === 'predica' ? '??' : (ev.tipo === 'evento' ? '?' : '??');
        const diaCompleto = diasCompletos[ev.dia] || ev.dia;

        // Formato del evento
        if (ev.tipo === 'especial') {
            texto += `${icono}  *${ev.titulo}*\n`;
            texto += `     ??  ${ev.fecha} (${diaCompleto})\n\n`;
        } else {
            texto += `${icono}  ${ev.fecha}  ·  ${diaCompleto}\n`;
            texto += `     ? *${ev.titulo}*\n\n`;
        }
    });

    // Leyenda
    texto += `---------------------\n`;
    texto += `?? Prédica/Culto\n`;
    texto += `? Evento/Programa\n`;
    texto += `?? Semana Especial\n`;
    texto += `---------------------\n\n`;

    // Firma
    texto += `?? _Legado Bíblico App_\n`;
    texto += `? _Cypress Hills SDA Church_`;

    // Compartir
    if (navigator.share) {
        navigator.share({
            title: 'Calendario Iglesia — ' + tituloCompartir,
            text: texto
        }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(texto).then(() => {
            if (typeof mostrarToast === 'function') mostrarToast('? Calendario copiado al portapapeles');
        });
    }
}
// ===============================================
// CONTROL DE CULTOS SEMANALES (MIÉ / VIE)
// ===============================================

// === Helpers para campos de cita bíblica estructurada ===
function renderBibliaStructHTML(fieldId) {
    const libros = typeof TODOS_LIBROS !== 'undefined' ? TODOS_LIBROS : ['Génesis','Éxodo','Levítico','Números','Deuteronomio','Josué','Jueces','Rut','1 Samuel','2 Samuel','1 Reyes','2 Reyes','1 Crónicas','2 Crónicas','Esdras','Nehemías','Ester','Job','Salmos','Proverbios','Eclesiastés','Cantares','Isaías','Jeremías','Lamentaciones','Ezequiel','Daniel','Oseas','Joel','Amós','Abdías','Jonás','Miqueas','Nahúm','Habacuc','Sofonías','Hageo','Zacarías','Malaquías','Mateo','Marcos','Lucas','Juan','Hechos','Romanos','1 Corintios','2 Corintios','Gálatas','Efesios','Filipenses','Colosenses','1 Tesalonicenses','2 Tesalonicenses','1 Timoteo','2 Timoteo','Tito','Filemón','Hebreos','Santiago','1 Pedro','2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Apocalipsis'];
    const opciones = '<option value="">— Seleccionar libro —</option>' + libros.map(l => `<option value="${l}">${l}</option>`).join('');
    return `<div style="margin-top:8px;background:rgba(85,239,196,0.04);border:1.5px solid rgba(85,239,196,0.15);border-radius:12px;padding:12px;">
        <select id="bib-${fieldId}-libro" style="width:100%;padding:12px 10px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(85,239,196,0.35);color:#55efc4;border-radius:10px;outline:none;font-size:0.9rem;font-weight:700;appearance:auto;cursor:pointer;">
            ${opciones}
        </select>
        <div style="display:flex;gap:6px;align-items:center;margin-top:8px;">
            <div style="flex:1;text-align:center;">
                <div style="color:rgba(85,239,196,0.45);font-size:0.55rem;font-weight:900;letter-spacing:0.5px;margin-bottom:3px;">CAPÍTULO</div>
                <input type="number" id="bib-${fieldId}-cap" placeholder="—" min="1" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(85,239,196,0.3);color:#fff;border-radius:8px;outline:none;font-size:1rem;text-align:center;font-weight:700;">
            </div>
            <div style="color:rgba(85,239,196,0.3);font-size:1.2rem;font-weight:900;padding-top:14px;">:</div>
            <div style="flex:1;text-align:center;">
                <div style="color:rgba(85,239,196,0.45);font-size:0.55rem;font-weight:900;letter-spacing:0.5px;margin-bottom:3px;">VERSÍCULO</div>
                <input type="number" id="bib-${fieldId}-ver1" placeholder="—" min="1" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(85,239,196,0.3);color:#fff;border-radius:8px;outline:none;font-size:1rem;text-align:center;font-weight:700;">
            </div>
            <div style="color:rgba(85,239,196,0.3);font-size:1rem;font-weight:900;padding-top:14px;">—</div>
            <div style="flex:1;text-align:center;">
                <div style="color:rgba(85,239,196,0.45);font-size:0.55rem;font-weight:900;letter-spacing:0.5px;margin-bottom:3px;">AL VER.</div>
                <input type="number" id="bib-${fieldId}-ver2" placeholder="—" min="1" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(85,239,196,0.25);color:#fff;border-radius:8px;outline:none;font-size:1rem;text-align:center;font-weight:700;">
            </div>
        </div>
        <button type="button" onclick="buscarCitaStruct('${fieldId}')" style="width:100%;padding:11px;margin-top:8px;background:linear-gradient(135deg,rgba(85,239,196,0.15),rgba(0,184,148,0.1));border:1.5px solid rgba(85,239,196,0.4);color:#55efc4;border-radius:10px;font-weight:900;font-size:0.8rem;cursor:pointer;letter-spacing:1px;display:flex;align-items:center;justify-content:center;gap:6px;">
            ?? BUSCAR CITA
        </button>
        <div id="bib-${fieldId}-preview" style="display:none;margin-top:8px;"></div>
    </div>`;
}

window.buscarCitaStruct = async function(fieldId) {
    const libro = document.getElementById('bib-' + fieldId + '-libro')?.value?.trim() || '';
    const cap = document.getElementById('bib-' + fieldId + '-cap')?.value?.trim() || '';
    const ver1 = document.getElementById('bib-' + fieldId + '-ver1')?.value?.trim() || '';
    const ver2 = document.getElementById('bib-' + fieldId + '-ver2')?.value?.trim() || '';
    const preview = document.getElementById('bib-' + fieldId + '-preview');
    if (!libro || !cap) {
        if (preview) { preview.style.display = 'block'; preview.innerHTML = '<div style="color:#ff6b6b;font-size:0.8rem;padding:8px;text-align:center;">?? Selecciona un libro y capítulo</div>'; }
        return;
    }
    // Show loading
    if (preview) { preview.style.display = 'block'; preview.innerHTML = '<div style="text-align:center;padding:10px;color:rgba(85,239,196,0.6);font-size:0.8rem;"><div style="display:inline-block;width:18px;height:18px;border:2px solid rgba(85,239,196,0.2);border-top-color:#55efc4;border-radius:50%;animation:girar 0.8s linear infinite;margin-right:8px;vertical-align:middle;"></div>Buscando...</div>'; }
    // Ensamblar la cita
    ensamblarCitaBiblicaStruct(fieldId);
    const citaTexto = document.getElementById('culto-' + fieldId)?.value || '';
    try {
        const slug = typeof normalizarLibro === 'function' ? normalizarLibro(libro) : libro.toLowerCase().replace(/\s+/g, '-');
        const data = await buscarEnBiblia(slug, parseInt(cap));
        if (data && data.vers) {
            const v1 = parseInt(ver1) || 1;
            const v2 = parseInt(ver2) || v1;
            const versiculos = data.vers.filter(v => {
                const n = parseInt(v.number);
                return n >= v1 && n <= v2;
            });
            if (versiculos.length > 0) {
                const textoCompleto = versiculos.map(v => `<span style="color:rgba(85,239,196,0.5);font-size:0.7rem;font-weight:900;vertical-align:super;">${v.number}</span> ${v.verse}`).join(' ');
                preview.innerHTML = `<div style="background:rgba(85,239,196,0.06);border:1.5px solid rgba(85,239,196,0.2);border-radius:10px;padding:12px;">
                    <div style="color:#55efc4;font-size:0.7rem;font-weight:900;letter-spacing:1px;margin-bottom:6px;">?? ${citaTexto.toUpperCase()}</div>
                    <div style="color:rgba(255,255,255,0.9);font-size:0.88rem;line-height:1.7;font-style:italic;">"${textoCompleto}"</div>
                </div>`;
            } else {
                preview.innerHTML = '<div style="color:#fdcb6e;font-size:0.8rem;padding:8px;text-align:center;">?? Versículo no encontrado en ese capítulo</div>';
            }
        } else {
            preview.innerHTML = '<div style="color:#fdcb6e;font-size:0.8rem;padding:8px;text-align:center;">?? No se pudo cargar el capítulo</div>';
        }
    } catch(e) {
        preview.innerHTML = '<div style="color:#ff6b6b;font-size:0.8rem;padding:8px;text-align:center;">? Error al buscar. Verifica conexión.</div>';
    }
};

function ensamblarCitaBiblicaStruct(fieldId) {
    const libro = document.getElementById('bib-' + fieldId + '-libro')?.value?.trim() || '';
    const cap = document.getElementById('bib-' + fieldId + '-cap')?.value?.trim() || '';
    const ver1 = document.getElementById('bib-' + fieldId + '-ver1')?.value?.trim() || '';
    const ver2 = document.getElementById('bib-' + fieldId + '-ver2')?.value?.trim() || '';
    const hidden = document.getElementById('culto-' + fieldId);
    if (!libro) { if (hidden) hidden.value = ''; return ''; }
    let cita = libro;
    if (cap) {
        cita += ' ' + cap;
        if (ver1) {
            cita += ':' + ver1;
            if (ver2 && parseInt(ver2) > parseInt(ver1)) {
                cita += '-' + ver2;
            }
        }
    }
    if (hidden) hidden.value = cita;
    return cita;
}

function descomponerCitaBiblicaStruct(fieldId, citaStr) {
    if (!citaStr) return;
    // Parse: "Juan 15:4-8" or "Juan 15:4" or "Juan 15" or "Juan"
    const match = citaStr.match(/^(.+?)\s+(\d+)\s*:\s*(\d+)\s*(?:-\s*(\d+))?$/);
    if (match) {
        const libroEl = document.getElementById('bib-' + fieldId + '-libro');
        const capEl = document.getElementById('bib-' + fieldId + '-cap');
        const ver1El = document.getElementById('bib-' + fieldId + '-ver1');
        const ver2El = document.getElementById('bib-' + fieldId + '-ver2');
        if (libroEl) libroEl.value = match[1];
        if (capEl) capEl.value = match[2];
        if (ver1El) ver1El.value = match[3];
        if (ver2El && match[4]) ver2El.value = match[4];
    } else {
        // Formato simple: solo "Libro Cap" o "Libro"
        const match2 = citaStr.match(/^(.+?)\s+(\d+)$/);
        if (match2) {
            const libroEl = document.getElementById('bib-' + fieldId + '-libro');
            const capEl = document.getElementById('bib-' + fieldId + '-cap');
            if (libroEl) libroEl.value = match2[1];
            if (capEl) capEl.value = match2[2];
        } else {
            const libroEl = document.getElementById('bib-' + fieldId + '-libro');
            if (libroEl) libroEl.value = citaStr;
        }
    }
}

function renderControlCultosSemana() {
    const contenedor = document.getElementById('pantalla-estudio');
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

    // ---- Construccion de campos del formulario ----
    const CAMPOS_CULTO = [
        { id: 'anciano', icon: '\u{1F9D3}', label: 'ANCIANO DE TURNO', placeholder: '\u00bfQui\u00e9n es el anciano?', tipo: 'nombre' },
        { id: 'bienvenida', icon: '\u{1F91D}', label: 'BIENVENIDA', placeholder: 'Nombre del encargado...', tipo: 'nombre' },
        { id: 'oracion1', icon: '\u{1F64F}', label: 'PRIMERA ORACI\u00d3N', placeholder: '\u00bfQui\u00e9n ora?', tipo: 'nombre' },
        { id: 'himno1_quien', icon: '\u{1F3B5}', label: 'HIMNO DE APERTURA \u2014 ANUNCIA', placeholder: '\u00bfQui\u00e9n anuncia el himno?', tipo: 'nombre' },
        { id: 'himno1', icon: '\u{1F3B6}', label: 'HIMNO DE APERTURA \u2014 N\u00daMERO', placeholder: '# del himno...', tipo: 'himno' },
        { id: 'lectura', icon: '\u{1F4D6}', label: 'LECTURA B\u00cdBLICA', placeholder: '', tipo: 'biblia_struct', extra: { id: 'lectura_quien', placeholder: '\u00bfQui\u00e9n lee?' } },
        { id: 'especial', icon: '\u2B50', label: 'PARTE ESPECIAL', placeholder: '\u00bfQui\u00e9n participa?', tipo: 'nombre', extra: { id: 'especial_desc', placeholder: 'Descripci\u00f3n...' } },
        { id: 'intercesora', icon: '\u{1F64F}', label: 'ORACI\u00d3N INTERCESORA', placeholder: '\u00bfQui\u00e9n ora?', tipo: 'nombre' },
        { id: 'pred_anuncia', icon: '\u{1F3A4}', label: 'ANUNCIA AL PREDICADOR', placeholder: '\u00bfQui\u00e9n presenta al predicador?', tipo: 'nombre' },
        { id: 'predicador', icon: '\u{1F399}\uFE0F', label: 'PREDICADOR/A', placeholder: 'Nombre del predicador...', tipo: 'nombre', extra: { id: 'pred_tema', placeholder: 'Tema del serm\u00f3n...' }, extra2: { id: 'pred_texto', placeholder: '', tipo: 'biblia_struct' } },
        { id: 'himno2', icon: '\u{1F3B5}', label: 'HIMNO FINAL', placeholder: '# del himno...', tipo: 'himno', extra: { id: 'himno2_quien', placeholder: '\u00bfQui\u00e9n anuncia el himno?' } },
        { id: 'oracion_final', icon: '\u{1F64F}', label: 'ORACI\u00d3N FINAL', placeholder: '\u00bfQui\u00e9n ora?', tipo: 'nombre' },
        { id: 'sonido', icon: '\u{1F39B}\uFE0F', label: 'ENCARGADO DE SONIDO', placeholder: 'Nombre...', tipo: 'nombre' },
        { id: 'obs', icon: '\u{1F4DD}', label: 'OBSERVACIONES', placeholder: 'Notas adicionales...', tipo: 'texto' }
    ];
    const tipoColores = { nombre: '162,155,254', himno: '254,202,87', biblia: '85,239,196', biblia_struct: '85,239,196', texto: '116,185,255' };
    let camposHTML = CAMPOS_CULTO.map((c, i) => {
        const rgb = tipoColores[c.tipo] || '162,155,254';
        let extraHTML = '';
        if (c.extra) {
            if (c.extra.tipo === 'biblia_struct') { extraHTML += renderBibliaStructHTML(c.extra.id); }
            else { extraHTML += `<input type="text" id="culto-${c.extra.id}" placeholder="${c.extra.placeholder}" style="width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:8px;outline:none;margin-top:6px;font-size:0.85rem;"><div id="sug-${c.extra.id}" style="display:none;position:relative;z-index:50;"></div>`; }
        }
        if (c.extra2) {
            if (c.extra2.tipo === 'biblia_struct') { extraHTML += renderBibliaStructHTML(c.extra2.id); }
            else { extraHTML += `<input type="text" id="culto-${c.extra2.id}" placeholder="${c.extra2.placeholder}" style="width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:8px;outline:none;margin-top:6px;font-size:0.85rem;"><div id="sug-${c.extra2.id}" style="display:none;position:relative;z-index:50;"></div>`; }
        }
        if (c.tipo === 'biblia_struct') {
            return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;position:relative;"><label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;"><span style="font-size:1.1rem;">${c.icon}</span><span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${i+1}</span>${c.label}</label>${renderBibliaStructHTML(c.id)}<input type="hidden" id="culto-${c.id}" value="">${extraHTML}</div>`;
        }
        const inputEvent = c.tipo === 'himno' ? 'oninput="autocompleteHimno(this)"' : (c.tipo === 'biblia' ? 'oninput="autocompleteBiblia(this)"' : '');
        return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;position:relative;"><label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;"><span style="font-size:1.1rem;">${c.icon}</span><span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${i+1}</span>${c.label}</label><input type="text" id="culto-${c.id}" placeholder="${c.placeholder}" ${inputEvent} style="width:100%;padding:12px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;"><div id="sug-${c.id}" style="display:none;position:relative;z-index:50;"></div>${c.tipo === 'himno' ? `<div id="himno-titulo-${c.id}" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>` : ''}${extraHTML}</div>`;
    }).join('');

    // ---- Estilos de pestanas ----
    const tabStyle = (active) => active
        ? 'flex:1;padding:11px 4px;background:rgba(255,107,107,0.2);border:1.5px solid #ff6b6b;color:#ff6b6b;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;letter-spacing:0.5px;'
        : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';

    contenedor.innerHTML = `
    <div style="min-height:100vh;background:#0a0818;font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
      <!-- HEADER FIJO -->
      <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:14px 15px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,107,107,0.25);">
        <button type="button" onclick="renderModuloIglesia()" style="background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;padding:8px 14px;border-radius:8px;font-weight:900;font-size:0.85rem;">\u2B05\uFE0F</button>
        <div style="flex:1;">
          <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:0.85rem;">\u{1F4CB} REGISTRO DE CULTOS</div>
          <div style="color:rgba(255,255,255,0.3);font-size:0.58rem;">Iglesia Adventista Cypress Hills</div>
        </div>
      </div>

      <!-- PESTANAS -->
      <div style="padding:12px 14px 0;max-width:600px;margin:0 auto;">
        <div style="display:flex;gap:8px;margin-bottom:15px;" id="tabs-culto">
          <button id="tab-btn-form" onclick="cambiarTabCulto('form')" style="${tabStyle(true)}">📝<br>Formulario</button>
          <button id="tab-btn-buscar" onclick="cambiarTabCulto('buscar')" style="${tabStyle(false)}">🔍<br>Buscar</button>
          <button id="tab-btn-cultos" onclick="cambiarTabCulto('cultos')" style="${tabStyle(false)}">📋<br>Cultos</button>
          <button id="tab-btn-eventos" onclick="cambiarTabCulto('eventos')" style="${tabStyle(false)}">⭐<br>Eventos</button>
        </div>

        <!-- ======== TAB 1: FORMULARIO ======== -->
        <div id="tab-content-form">
          <style>
@keyframes pulso-fecha {
  0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,0.0),0 0 0 0 rgba(255,107,107,0.0);}
  50%{box-shadow:0 0 18px 4px rgba(255,107,107,0.55),0 0 0 6px rgba(255,107,107,0.12);}
}
@keyframes badge-glow {
  0%,100%{opacity:1;text-shadow:0 0 8px rgba(255,107,107,0.8);}
  50%{opacity:0.6;text-shadow:0 0 2px rgba(255,107,107,0.3);}
}
#fecha-wrapper{animation:pulso-fecha 2s ease-in-out infinite;}
</style>
<div id="fecha-wrapper" style="margin-bottom:14px;border-radius:16px;padding:16px;background:rgba(255,107,107,0.07);border:2px solid rgba(255,107,107,0.5);">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
    <span style="font-size:1.5rem;">&#128197;</span>
    <div style="flex:1;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="background:#ff6b6b;color:#fff;font-size:0.6rem;font-weight:900;padding:3px 9px;border-radius:20px;letter-spacing:1.5px;animation:badge-glow 1.5s ease-in-out infinite;">PASO 1</span>
        <span style="color:#ff6b6b;font-size:0.72rem;font-weight:900;letter-spacing:1px;">OBLIGATORIO</span>
      </div>
      <div style="color:#fff;font-size:1rem;font-weight:900;letter-spacing:0.5px;margin-top:2px;">Selecciona la fecha del culto</div>
    </div>
  </div>
  <input type="date" id="culto-fecha" value="${hoyStr}" onchange="autoDetectarTipoCulto(this.value)"
    style="width:100%;padding:14px;background:rgba(0,0,0,0.45);border:2px solid rgba(255,107,107,0.6);color:#fff;border-radius:12px;outline:none;font-size:1.05rem;font-weight:700;box-sizing:border-box;">
  <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
    <label style="color:rgba(255,255,255,0.45);font-size:0.65rem;font-weight:900;white-space:nowrap;">\u26EA D\u00cdA:</label>
    <select id="culto-tipo" style="flex:1;padding:9px 11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;">
      <option>Domingo</option><option>Lunes</option><option>Martes</option>
      <option>Mi\u00e9rcoles</option><option>Jueves</option><option>Viernes</option>
      <option>S\u00e1bado</option><option>Especial</option>
    </select>
  </div>
</div>
          <div id="culto-campos-dinamicos" style="display:grid;gap:10px;margin-bottom:18px;"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">
            <button onclick="guardarCultoSemana()" style="padding:15px;background:linear-gradient(135deg,#55efc4,#00b894);border:none;color:#000;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 5px 18px rgba(85,239,196,0.3);">\u{1F4BE} GUARDAR</button>
            <button onclick="compartirCultoActual()" style="padding:15px;background:linear-gradient(135deg,#a29bfe,#6c5ce7);border:none;color:#fff;border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;box-shadow:0 5px 18px rgba(108,92,231,0.3);">\u{1F4E4} COMPARTIR</button>
          </div>
        </div>

        <!-- ======== TAB 2: BUSCAR / HERRAMIENTAS ======== -->
        <div id="tab-content-buscar" style="display:none;">
          <!-- BÚSQUEDA RÁPIDA -->
          <div style="background:rgba(255,159,67,0.05);border:1px solid rgba(255,159,67,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">
            <div style="color:#ff9f43;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">\u{1F50D} B\u00daSQUEDA R\u00c1PIDA</div>
            <input type="text" id="input-busqueda-global" placeholder="Ej: Santa Cena, Bautismo..." 
                oninput="ejecutarBusquedaGlobal(this.value)" 
                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                style="width:100%;padding:13px;background:rgba(0,0,0,0.5);border:1.5px solid rgba(255,159,67,0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;margin-bottom:6px;font-weight:700;">

            <div id="resultados-busqueda-global"></div>
          </div>
          <!-- PDF por perÃ­odo -->
          <div style="background:rgba(85,239,196,0.05);border:1px solid rgba(85,239,196,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">
            <div style="color:#55efc4;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">\u{1F4C4} IMPRIMIR POR PER\u00cdODO</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
              <button onclick="generarPDFCultosPeriodo('semana')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4}<br>Esta Semana</button>
              <button onclick="generarPDFCultosPeriodo('mes')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4}<br>Este Mes</button>
              <button onclick="generarPDFCultosPeriodo('anio')" style="padding:12px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4}<br>Este A\u00f1o</button>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <input type="month" id="pdf-mes-especifico" style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1px solid rgba(85,239,196,0.2);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;">
              <button onclick="generarPDFCultosPeriodo('mes-especifico')" style="padding:9px 12px;background:rgba(85,239,196,0.12);border:1px solid rgba(85,239,196,0.35);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;white-space:nowrap;">\u{1F4C4} Mes elegido</button>
            </div>
          </div>
          <!-- EstadÃ­sticas participante -->
          <div style="background:rgba(162,155,254,0.05);border:1px solid rgba(162,155,254,0.2);border-radius:16px;padding:16px;">
            <div style="color:#a29bfe;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">\u{1F4CA} PARTICIPACI\u00d3N POR PERSONA</div>
            <select id="select-participante" onchange="mostrarEstadisticasParticipante(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(162,155,254,0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;margin-bottom:10px;">
              <option value="">â€” Elegir participante â€”</option>
            </select>
            <div id="stats-participante"></div>
          </div>
        </div>

        <!-- ======== TAB 3: CULTOS REGISTRADOS ======== -->
        <div id="tab-content-cultos" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <div style="color:#ff6b6b;font-weight:900;font-size:0.8rem;letter-spacing:1px;">\u{1F4CA} HISTORIAL</div>
            <input type="text" id="search-culto" placeholder="\u{1F50D} Buscar nombre, fecha..." 
                oninput="cargarCultosSemana()" 
                onkeydown="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                onkeypress="if(event.key==='Enter' || event.keyCode===13){ event.preventDefault(); return false; }"
                style="padding:9px 12px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:8px;outline:none;font-size:0.75rem;width:170px;">

          </div>
          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <button onclick="exportarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\u{1F4BE} EXPORTAR</button>
              <button onclick="importarCultosBackup()" style="flex:1;min-width:90px;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.25);color:#fdcb6e;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\u{1F4C2} RESTAURAR</button>
              <button onclick="sincronizarCultosDesdeFirebase()" style="flex:1;min-width:90px;padding:8px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.25);color:#ff4757;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.6rem;letter-spacing:0.5px;">\u{1F525} FIREBASE SYNC</button>
          </div>
          <div id="historico-cultos" style="display:grid;gap:10px;"></div>
        </div>
        <!-- ======== TAB 4: EVENTOS ESPECIALES ======== -->
        <div id="tab-content-eventos" style="display:none;">
          <div id="eventos-modulo-contenedor">
            <div style="text-align:center;color:rgba(255,255,255,0.3);padding:20px;font-size:0.8rem;">Toca para cargar eventos...</div>
          </div>
        </div>

      </div>
    </div>`;

    // Funciones de pestanas
    window.cambiarTabCulto = function(tab) {
        ['form','buscar','cultos','eventos'].forEach(function(t) {
            var content = document.getElementById('tab-content-' + t);
            var btn = document.getElementById('tab-btn-' + t);
            if (!content || !btn) return;
            var active = (t === tab);
            content.style.display = active ? 'block' : 'none';
            btn.style.cssText = active
                ? 'flex:1;padding:11px 4px;background:rgba(255,107,107,0.2);border:1.5px solid #ff6b6b;color:#ff6b6b;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.7rem;letter-spacing:0.5px;'
                : 'flex:1;padding:11px 4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.4);border-radius:10px;cursor:pointer;font-weight:700;font-size:0.7rem;';
        });
        if (tab === 'cultos') cargarCultosSemana();
        if (tab === 'buscar') { if(typeof actualizarListaParticipantes === 'function') actualizarListaParticipantes(); }
        if (tab === 'eventos') {
            var cont = document.getElementById('eventos-modulo-contenedor');
            if (cont && typeof renderTabEventos === 'function') {
                cont.innerHTML = renderTabEventos();
                var fEl = document.getElementById('evt-fecha-inicio');
                if (fEl && fEl.value && typeof seleccionarDuracion === 'function') {
                    seleccionarDuracion(window._duracionEvento || 7);
                }
            }
        }
    };

    autoDetectarTipoCulto(hoyStr);
    cargarCultosSemana();
    // ?? Sincronizar con Firebase al abrir el módulo
    setTimeout(function() {
        if (typeof sincronizarCultosDesdeFirebase === 'function') {
            sincronizarCultosDesdeFirebase();
        }
    }, 2000);
}

window.autocompleteHimno = function (input) {
    const val = input.value.trim().replace('#', '');
    const sugDiv = document.getElementById('sug-' + input.id.replace('culto-', ''));
    const tituloDiv = document.getElementById('himno-titulo-' + input.id.replace('culto-', ''));
    if (!val) { if (sugDiv) sugDiv.style.display = 'none'; if (tituloDiv) { tituloDiv.innerHTML = ''; tituloDiv.style.display = 'none'; } return; }
    const num = parseInt(val);
    if (!isNaN(num) && typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[num]) {
        if (tituloDiv) {
            tituloDiv.style.display = 'block';
            tituloDiv.innerHTML = `<div style="background:rgba(254,202,87,0.1);border:1.5px solid rgba(254,202,87,0.3);border-radius:10px;padding:12px;margin-top:8px;"><div style="color:rgba(254,202,87,0.5);font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:4px;">HIMNO #${num}</div><div style="color:#feca57;font-size:1.1rem;font-weight:900;">${HIMNARIO_ADVENTISTA[num]}</div></div>`;
        }
        if (sugDiv) sugDiv.style.display = 'none'; return;
    }
    if (tituloDiv) { tituloDiv.innerHTML = ''; tituloDiv.style.display = 'none'; }
    if (isNaN(num) && typeof buscarHimnosPorTexto === 'function') {
        const res = buscarHimnosPorTexto(val);
        if (res.length > 0 && sugDiv) { sugDiv.style.display = 'block'; sugDiv.innerHTML = res.map(r => `<button onclick="document.getElementById('${input.id}').value='#${r.num}';autocompleteHimno(document.getElementById('${input.id}'));this.parentElement.style.display='none';" style="display:block;width:100%;text-align:left;padding:8px 12px;background:rgba(254,202,87,0.08);border:1px solid rgba(254,202,87,0.15);color:#feca57;border-radius:6px;cursor:pointer;font-size:0.75rem;margin-top:3px;">#${r.num} — ${r.titulo}</button>`).join(''); } else if (sugDiv) { sugDiv.style.display = 'none'; }
    }
};

window._bibliaDebounce = null;
window.autocompleteBiblia = function (input) {
    const rawVal = input.value.trim();
    const val = rawVal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sugId = 'sug-' + input.id.replace('culto-', '');
    const sugDiv = document.getElementById(sugId);
    if (!val || val.length < 1 || !sugDiv) { if (sugDiv) sugDiv.style.display = 'none'; return; }

    // Detectar si ya tiene formato completo: "Libro Cap:Ver"
    const citaMatch = rawVal.match(/^(.+?)\s+(\d+)\s*:\s*(\d+)/);
    if (citaMatch) {
        sugDiv.style.display = 'none';
        // Buscar el versículo real con debounce
        clearTimeout(window._bibliaDebounce);
        window._bibliaDebounce = setTimeout(async () => {
            const libro = citaMatch[1].trim();
            const cap = parseInt(citaMatch[2]);
            const ver = parseInt(citaMatch[3]);
            const slug = typeof normalizarLibro === 'function' ? normalizarLibro(libro) : libro.toLowerCase().replace(/\s+/g, '-');
            try {
                const data = await buscarEnBiblia(slug, cap);
                if (data && data.vers) {
                    const versiculo = data.vers.find(v => parseInt(v.number) === ver);
                    if (versiculo) {
                        sugDiv.style.display = 'block';
                        sugDiv.innerHTML = `<div style="background:rgba(85,239,196,0.08);border:1.5px solid rgba(85,239,196,0.25);border-radius:10px;padding:12px;margin-top:8px;"><div style="color:rgba(85,239,196,0.5);font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:4px;">?? ${rawVal.toUpperCase()}</div><div style="color:#fff;font-size:0.9rem;line-height:1.6;font-style:italic;">"${versiculo.verse}"</div></div>`;
                    }
                }
            } catch (e) { }
        }, 600);
        return;
    }

    // Si tiene libro + número sin versículo, no sugerir libros
    if (/[a-z]\s+\d/.test(val)) { sugDiv.style.display = 'none'; return; }

    const libros = typeof TODOS_LIBROS !== 'undefined' ? TODOS_LIBROS : ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut', '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemías', 'Ester', 'Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares', 'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós', 'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías', 'Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis'];
    const matches = libros.filter(l => { const n = l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return n.startsWith(val) || n.includes(val); }).slice(0, 6);
    if (matches.length > 0) { sugDiv.style.display = 'block'; sugDiv.innerHTML = matches.map(m => `<button onclick="document.getElementById('${input.id}').value='${m} ';document.getElementById('${input.id}').focus();this.parentElement.style.display='none';" style="display:inline-block;padding:6px 12px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.2);color:#55efc4;border-radius:6px;cursor:pointer;font-size:0.72rem;margin:2px;font-weight:700;">${m}</button>`).join(''); } else { sugDiv.style.display = 'none'; }
};

window.autocompleteHimno = function (input) {
    const val = input.value.trim().replace('#', '');
    const sugDiv = document.getElementById('sug-' + input.id.replace('culto-', ''));
    const tituloDiv = document.getElementById('himno-titulo-' + input.id.replace('culto-', ''));
    if (!val) { if (sugDiv) sugDiv.style.display = 'none'; if (tituloDiv) { tituloDiv.innerHTML = ''; tituloDiv.style.display = 'none'; } return; }
    const num = parseInt(val);
    if (!isNaN(num) && typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[num]) {
        if (tituloDiv) {
            tituloDiv.style.display = 'block';
            tituloDiv.innerHTML = `<div style="background:rgba(254,202,87,0.1);border:1.5px solid rgba(254,202,87,0.3);border-radius:10px;padding:12px;margin-top:8px;"><div style="color:rgba(254,202,87,0.5);font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:4px;">HIMNO #${num}</div><div style="color:#feca57;font-size:1.1rem;font-weight:900;">${HIMNARIO_ADVENTISTA[num]}</div></div>`;
        }
        if (sugDiv) sugDiv.style.display = 'none'; return;
    }
    if (tituloDiv) { tituloDiv.innerHTML = ''; tituloDiv.style.display = 'none'; }
    if (isNaN(num) && typeof buscarHimnosPorTexto === 'function') {
        const res = buscarHimnosPorTexto(val);
        if (res.length > 0 && sugDiv) { sugDiv.style.display = 'block'; sugDiv.innerHTML = res.map(r => `<button onclick="document.getElementById('${input.id}').value='#${r.num}';autocompleteHimno(document.getElementById('${input.id}'));this.parentElement.style.display='none';" style="display:block;width:100%;text-align:left;padding:8px 12px;background:rgba(254,202,87,0.08);border:1px solid rgba(254,202,87,0.15);color:#feca57;border-radius:6px;cursor:pointer;font-size:0.75rem;margin-top:3px;">#${r.num} — ${r.titulo}</button>`).join(''); } else if (sugDiv) { sugDiv.style.display = 'none'; }
    }
};

window._bibliaDebounce = null;
window.autocompleteBiblia = function (input) {
    const rawVal = input.value.trim();
    const val = rawVal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sugId = 'sug-' + input.id.replace('culto-', '');
    const sugDiv = document.getElementById(sugId);
    if (!val || val.length < 1 || !sugDiv) { if (sugDiv) sugDiv.style.display = 'none'; return; }

    // Detectar si ya tiene formato completo: "Libro Cap:Ver"
    const citaMatch = rawVal.match(/^(.+?)\s+(\d+)\s*:\s*(\d+)/);
    if (citaMatch) {
        sugDiv.style.display = 'none';
        // Buscar el versículo real con debounce
        clearTimeout(window._bibliaDebounce);
        window._bibliaDebounce = setTimeout(async () => {
            const libro = citaMatch[1].trim();
            const cap = parseInt(citaMatch[2]);
            const ver = parseInt(citaMatch[3]);
            const slug = typeof normalizarLibro === 'function' ? normalizarLibro(libro) : libro.toLowerCase().replace(/\s+/g, '-');
            try {
                const data = await buscarEnBiblia(slug, cap);
                if (data && data.vers) {
                    const versiculo = data.vers.find(v => parseInt(v.number) === ver);
                    if (versiculo) {
                        sugDiv.style.display = 'block';
                        sugDiv.innerHTML = `<div style="background:rgba(85,239,196,0.08);border:1.5px solid rgba(85,239,196,0.25);border-radius:10px;padding:12px;margin-top:8px;"><div style="color:rgba(85,239,196,0.5);font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:4px;">?? ${rawVal.toUpperCase()}</div><div style="color:#fff;font-size:0.9rem;line-height:1.6;font-style:italic;">"${versiculo.verse}"</div></div>`;
                    }
                }
            } catch (e) { }
        }, 600);
        return;
    }

    // Si tiene libro + número sin versículo, no sugerir libros
    if (/[a-z]\s+\d/.test(val)) { sugDiv.style.display = 'none'; return; }

    const libros = typeof TODOS_LIBROS !== 'undefined' ? TODOS_LIBROS : ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut', '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemías', 'Ester', 'Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares', 'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós', 'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías', 'Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis'];
    const matches = libros.filter(l => { const n = l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return n.startsWith(val) || n.includes(val); }).slice(0, 6);
    if (matches.length > 0) { sugDiv.style.display = 'block'; sugDiv.innerHTML = matches.map(m => `<button onclick="document.getElementById('${input.id}').value='${m} ';document.getElementById('${input.id}').focus();this.parentElement.style.display='none';" style="display:inline-block;padding:6px 12px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.2);color:#55efc4;border-radius:6px;cursor:pointer;font-size:0.72rem;margin:2px;font-weight:700;">${m}</button>`).join(''); } else { sugDiv.style.display = 'none'; }
};


// ================================================================
// ?? FIREBASE SYNC — Cultos sincronizados con Firestore
// Los datos de cultos son el tesoro de la iglesia.
// Se guardan en localStorage Y en Firebase simultáneamente.
// ================================================================

// Nombre de la iglesia como "namespace" en Firestore
const IGLESIA_ID = 'cypress_hills_brooklyn';

// Guardar un culto en Firestore
async function _syncCultoFirebase(datos) {
    try {
        if (typeof db === 'undefined') return;
        const docId = String(datos.id || Date.now());
        await db.collection('iglesias').doc(IGLESIA_ID)
            .collection('cultos').doc(docId).set(datos);
        console.log('[FIREBASE] Culto guardado en Firestore:', docId);
    } catch(e) {
        console.warn('[FIREBASE] No se pudo sincronizar culto:', e.message);
    }
}

// Eliminar un culto de Firestore
async function _deleteCultoFirebase(id) {
    try {
        if (typeof db === 'undefined') return;
        await db.collection('iglesias').doc(IGLESIA_ID)
            .collection('cultos').doc(String(id)).delete();
        console.log('[FIREBASE] Culto eliminado de Firestore:', id);
    } catch(e) {
        console.warn('[FIREBASE] Error eliminando de Firestore:', e.message);
    }
}

// Cargar cultos desde Firestore y combinar con localStorage
async function sincronizarCultosDesdeFirebase() {
    try {
        if (typeof db === 'undefined') {
            console.warn('[FIREBASE] db no disponible');
            return;
        }
        const snap = await db.collection('iglesias').doc(IGLESIA_ID)
            .collection('cultos').orderBy('fecha', 'desc').get();
        
        if (snap.empty) {
            console.log('[FIREBASE] Sin cultos en Firestore aún');
            return;
        }
        
        const cultosFirebase = snap.docs.map(d => d.data());
        const cultosLocales = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
        
        // Combinar: Firebase tiene prioridad, agregar los locales que no están en Firebase
        const idsFirebase = new Set(cultosFirebase.map(c => String(c.id)));
        const soloLocales = cultosLocales.filter(c => !idsFirebase.has(String(c.id)));
        
        // Subir los locales que no están en Firebase
        for (const culto of soloLocales) {
            await _syncCultoFirebase(culto);
        }
        
        // Combinar y ordenar
        const todos = [...cultosFirebase, ...soloLocales]
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        localStorage.setItem('legado_cultos_semanales', JSON.stringify(todos));
        console.log('[FIREBASE] Sincronizados', todos.length, 'cultos');
        
        // Refrescar el historial si está visible
        if (typeof cargarCultosSemana === 'function') {
            cargarCultosSemana();
        }
        
        if (typeof mostrarToast === 'function') {
            mostrarToast('\u{1F525} ' + todos.length + ' cultos sincronizados con Firebase');
        }
    } catch(e) {
        console.warn('[FIREBASE] Error al sincronizar:', e.message);
    }
}

// Exponer para llamar desde el módulo de iglesia
window.sincronizarCultosDesdeFirebase = sincronizarCultosDesdeFirebase;

function guardarCultoSemana() {
    const fecha = document.getElementById('culto-fecha')?.value;
    const tipo = document.getElementById('culto-tipo')?.value;
    if (!fecha) {
        const fechaEl = document.getElementById('culto-fecha');
        if (fechaEl) {
            fechaEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            fechaEl.style.border = '2px solid #ff6b6b';
            fechaEl.style.boxShadow = '0 0 15px rgba(255,107,107,0.5)';
            fechaEl.focus();
            setTimeout(() => { fechaEl.style.border = '1px solid rgba(255,255,255,0.1)'; fechaEl.style.boxShadow = 'none'; }, 2500);
        }
        if (typeof mostrarToast === 'function') mostrarToast('\u26A0\uFE0F Selecciona una fecha primero');
        return;
    }
    const _esSab = document.getElementById('culto-tipo')?.value === 'S\u00e1bado';
    const camposSabadoArr = ['sab_doxologia','sab_invocacion','sab_bienvenida','sab_infantil_anuncia','sab_infantil','sab_ofrendas',
        'sab_anciano_tipo','sab_anciano','sab_llamado','sab_himno_anuncia','sab_himno6','sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_especial',
        'sab_pred_anuncia','sab_predicador','sab_tema','sab_himno_final_quien','sab_himno_final',
        'sab_oracion_final','sab_sonido','sab_obs'];
    const camposNormalArr = ['anciano', 'bienvenida', 'oracion1', 'himno1_quien', 'himno1', 'lectura', 'lectura_quien',
        'especial', 'especial_desc', 'intercesora', 'pred_anuncia', 'predicador', 'pred_tema', 'pred_texto',
        'himno2', 'himno2_quien', 'oracion_final', 'sonido', 'obs'];
    const campos = _esSab ? camposSabadoArr : camposNormalArr;
    const datos = { id: Date.now(), fecha, tipo };
    // Ensamblar citas bíblicas estructuradas antes de guardar
    ensamblarCitaBiblicaStruct('lectura');
    ensamblarCitaBiblicaStruct('pred_texto');
    ensamblarCitaBiblicaStruct('sab_lectura');
    campos.forEach(c => { const el = document.getElementById('culto-' + c); datos[c] = el ? el.value.trim() : ''; });
    if (datos.himno1 && typeof HIMNARIO_ADVENTISTA !== 'undefined') { const n = parseInt(datos.himno1.replace('#', '')); if (HIMNARIO_ADVENTISTA[n]) datos.himno1_titulo = HIMNARIO_ADVENTISTA[n]; }
    if (datos.himno2 && typeof HIMNARIO_ADVENTISTA !== 'undefined') { const n = parseInt(datos.himno2.replace('#', '')); if (HIMNARIO_ADVENTISTA[n]) datos.himno2_titulo = HIMNARIO_ADVENTISTA[n]; }
    let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    // Si estamos editando, reemplazar el registro antiguo
    if (window._editandoCultoId) {
        const registroAntiguo = historial.find(h => h.id === window._editandoCultoId);
        // ? MERGE: si un campo quedó vacío en el formulario, preservar el valor antiguo
        // Esto evita que editar un campo borre otros campos que no se tocaron
        if (registroAntiguo) {
            campos.forEach(c => {
                if ((!datos[c] || datos[c] === '') && registroAntiguo[c]) {
                    datos[c] = registroAntiguo[c];
                }
            });
            // Preservar también títulos de himnos del registro antiguo
            if (!datos.himno1_titulo && registroAntiguo.himno1_titulo) datos.himno1_titulo = registroAntiguo.himno1_titulo;
            if (!datos.himno2_titulo && registroAntiguo.himno2_titulo) datos.himno2_titulo = registroAntiguo.himno2_titulo;
        }
        historial = historial.filter(h => h.id !== window._editandoCultoId);
        datos.id = window._editandoCultoId; // Preservar el ID original
        window._editandoCultoId = null;
        if (typeof mostrarToast === 'function') mostrarToast('\u2705 Culto actualizado');
    }
    historial.unshift(datos);
    historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));
    // ?? Sincronizar con Firebase (en segundo plano, sin bloquear)
    _syncCultoFirebase(datos).catch(e => console.warn('Firebase sync error:', e));
    campos.forEach(c => { const el = document.getElementById('culto-' + c); if (el) el.value = ''; });
    document.querySelectorAll('[id^="himno-titulo-"]').forEach(d => d.textContent = '');
    cargarCultosSemana();
    if (typeof mostrarToast === 'function') mostrarToast("\u2705 Culto registrado");
}

// ============================================================
// HELPER: genera el texto de WhatsApp para cualquier culto
// Soporta tanto cultos normales como cultos de Sabado (sab_*)
// ============================================================
function _textoCompartirCulto(reg) {
    const esSab = (reg.tipo === 'S\u00e1bado');
    const sep = '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550';
    const l = [];
    l.push(sep);
    l.push(`  \u26EA CULTO DE ${(reg.tipo || '').toUpperCase()}`);
    l.push(`  \u{1F4C5} ${formatearFechaCulto(reg.fecha)}`);
    l.push(sep);
    l.push('');
    if (esSab) {
        // ---- CAMPOS SABADO ----
        if (reg.sab_anciano_tipo || reg.sab_anciano) l.push(`\u{1F9D3} ${reg.sab_anciano_tipo || 'Anciano/a de turno'}: ${reg.sab_anciano || ''}`);
        if (reg.sab_llamado)            l.push(`\u{1F4EF}  0. Llamado adoraci\u00f3n: ${reg.sab_llamado}`);
        if (reg.sab_doxologia)          l.push(`\u2728  1. Doxolog\u00eda: ${reg.sab_doxologia}`);
        if (reg.sab_invocacion)         l.push(`\u{1F64F}  2. Invocaci\u00f3n: ${reg.sab_invocacion}`);
        if (reg.sab_bienvenida)         l.push(`\u{1F64C}  3. Bienvenida: ${reg.sab_bienvenida}`);
        if (reg.sab_infantil_anuncia)   l.push(`\u{1F4E2}     Anuncia rinc\u00f3n: ${reg.sab_infantil_anuncia}`);
        if (reg.sab_infantil)           l.push(`\u{1F476}  4. Rinc\u00f3n Infantil: ${reg.sab_infantil}`);
        if (reg.sab_ofrendas)           l.push(`\u{1F4B0}  5. Diezmos y Ofrendas: ${reg.sab_ofrendas}`);
        if (reg.sab_himno_anuncia || reg.sab_himno6) {
            l.push(`\u{1F3B5}  6. Himno de Adoraci\u00f3n:`);
            if (reg.sab_himno_anuncia)  l.push(`     Anuncia: ${reg.sab_himno_anuncia}`);
            if (reg.sab_himno6) {
                const n = parseInt((reg.sab_himno6 || '').replace('#',''));
                const titulo = (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[n]) ? ` \u2014 ${HIMNARIO_ADVENTISTA[n]}` : '';
                l.push(`     Himno: ${reg.sab_himno6}${titulo}`);
            }
        }
        if (reg.sab_lectura_quien || reg.sab_lectura) {
            l.push(`\u{1F4D6}  7. Lectura B\u00edblica:`);
            if (reg.sab_lectura_quien)  l.push(`     Lector: ${reg.sab_lectura_quien}`);
            if (reg.sab_lectura)        l.push(`     Cita: ${reg.sab_lectura}`);
        }
        if (reg.sab_oracion_intercesora) l.push(`\u{1F64F}  8. Oraci\u00f3n Intercesora: ${reg.sab_oracion_intercesora}`);
        if (reg.sab_musica_especial)    l.push(`\u{1F3A4}  9. M\u00fasica Especial: ${reg.sab_musica_especial}`);
        if (reg.sab_pred_anuncia || reg.sab_predicador || reg.sab_tema) {
            l.push(`\u{1F399}\uFE0F 10. Tema / Predicador:`);
            if (reg.sab_pred_anuncia)   l.push(`     Presenta: ${reg.sab_pred_anuncia}`);
            if (reg.sab_predicador)     l.push(`     Predicador: ${reg.sab_predicador}`);
            if (reg.sab_tema)           l.push(`     Tema: \u201C${reg.sab_tema}\u201D`);
        }
        if (reg.sab_himno_final_quien || reg.sab_himno_final) {
            l.push(`\u{1F3B6} 11. Himno Final:`);
            if (reg.sab_himno_final_quien) l.push(`     Anuncia: ${reg.sab_himno_final_quien}`);
            if (reg.sab_himno_final) {
                const n = parseInt((reg.sab_himno_final || '').replace('#',''));
                const titulo = (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[n]) ? ` \u2014 ${HIMNARIO_ADVENTISTA[n]}` : '';
                l.push(`     Himno: ${reg.sab_himno_final}${titulo}`);
            }
        }
        if (reg.sab_oracion_final)      l.push(`\u{1F932} 12. Oraci\u00f3n Final: ${reg.sab_oracion_final}`);
        if (reg.sab_sonido)             l.push(`\u{1F39B}\uFE0F  Sonido: ${reg.sab_sonido}`);
        if (reg.sab_obs)                l.push(`\u{1F4DD}  Obs: ${reg.sab_obs}`);
    } else {
        // ---- CAMPOS NORMALES ----
        if (reg.anciano)        l.push(`\u{1F9D3} Anciano de turno: ${reg.anciano}`);
        if (reg.bienvenida)     l.push(`\u{1F91D} Bienvenida: ${reg.bienvenida}`);
        if (reg.oracion1)       l.push(`\u{1F64F} Oraci\u00f3n: ${reg.oracion1}`);
        if (reg.himno1_quien)   l.push(`\u{1F3B5} Anuncia himno: ${reg.himno1_quien}`);
        if (reg.himno1) {
            const n = parseInt((reg.himno1||'').replace('#','')); const t = (typeof HIMNARIO_ADVENTISTA!=='undefined'&&HIMNARIO_ADVENTISTA[n])?' \u2014 '+HIMNARIO_ADVENTISTA[n]:'';
            l.push(`\u{1F3B6} Himno: ${reg.himno1}${t}`);
        }
        if (reg.lectura)        l.push(`\u{1F4D6} Lectura: ${reg.lectura}${reg.lectura_quien ? ' ('+reg.lectura_quien+')' : ''}`);
        if (reg.especial)       l.push(`\u2B50 Parte Especial: ${reg.especial}${reg.especial_desc ? ' \u2014 '+reg.especial_desc : ''}`);
        if (reg.intercesora)    l.push(`\u{1F64F} Oraci\u00f3n Intercesora: ${reg.intercesora}`);
        if (reg.pred_anuncia)   l.push(`\u{1F3A4} Presenta al predicador: ${reg.pred_anuncia}`);
        if (reg.predicador)     l.push(`\u{1F399}\uFE0F Predicador: ${reg.predicador}`);
        if (reg.pred_tema)      l.push(`\u{1F4D1} Tema: \u201C${reg.pred_tema}\u201D`);
        if (reg.pred_texto)     l.push(`\u{1F4D6} Texto Base: ${reg.pred_texto}`);
        if (reg.himno2) {
            const n = parseInt((reg.himno2||'').replace('#','')); const t = (typeof HIMNARIO_ADVENTISTA!=='undefined'&&HIMNARIO_ADVENTISTA[n])?' \u2014 '+HIMNARIO_ADVENTISTA[n]:'';
            l.push(`\u{1F3B5} Himno Final: ${reg.himno2}${t}${reg.himno2_quien?' (Anuncia: '+reg.himno2_quien+')':''}`);
        }
        if (reg.oracion_final)  l.push(`\u{1F64F} Oraci\u00f3n Final: ${reg.oracion_final}`);
        if (reg.sonido)         l.push(`\u{1F39B}\uFE0F Sonido: ${reg.sonido}`);
        if (reg.obs)            l.push(`\u{1F4DD} ${reg.obs}`);
    }
    l.push('');
    l.push(sep);
    l.push('  \u{1F4F1} Legado B\u00edblico');
    l.push(sep);
    return l.join('\n');
}
window.compartirCultoActual = function () {
    const tipo = document.getElementById('culto-tipo')?.value || '';
    const fecha = document.getElementById('culto-fecha')?.value || '';
    const esSab = tipo === 'S\u00e1bado';
    const ids = esSab
        ? ['sab_anciano_tipo','sab_anciano','sab_llamado','sab_doxologia','sab_invocacion','sab_bienvenida','sab_infantil_anuncia','sab_infantil','sab_ofrendas',
           'sab_himno_anuncia','sab_himno6','sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_especial',
           'sab_pred_anuncia','sab_predicador','sab_tema','sab_himno_final_quien','sab_himno_final',
           'sab_oracion_final','sab_sonido','sab_obs']
        : ['anciano','bienvenida','oracion1','himno1_quien','himno1','lectura','lectura_quien',
           'especial','especial_desc','intercesora','pred_anuncia','predicador','pred_tema','pred_texto',
           'himno2','himno2_quien','oracion_final','sonido','obs'];
    const reg = { tipo, fecha };
    ids.forEach(id => {
        const el = document.getElementById('culto-' + id);
        if (el) reg[id] = el.value?.trim() || '';
    });
    // ? FALLBACK: Si el formulario fue limpiado tras guardar, leer desde localStorage
    const camposConDatos = ids.filter(id => reg[id] && reg[id].length > 0).length;
    if (camposConDatos === 0 && fecha) {
        const historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
        const regGuardado = historial.find(h => h.fecha === fecha && h.tipo === tipo);
        if (regGuardado) {
            const texto = _textoCompartirCulto(regGuardado);
            if (navigator.share) { navigator.share({ text: texto }).catch(() => {}); }
            else if (navigator.clipboard) { navigator.clipboard.writeText(texto); if(typeof mostrarToast==='function') mostrarToast('\u{1F4CB} Copiado al portapapeles'); }
            return;
        }
    }
    const texto = _textoCompartirCulto(reg);
    if (navigator.share) { navigator.share({ text: texto }).catch(() => {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(texto); if(typeof mostrarToast==='function') mostrarToast('\u{1F4CB} Copiado'); }
};

window.compartirCultoHistorial = function (id) {
    const historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    const reg = historial.find(h => h.id === id);
    if (!reg) return;
    const texto = _textoCompartirCulto(reg);
    if (navigator.share) { navigator.share({ text: texto }).catch(() => {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(texto); if(typeof mostrarToast==='function') mostrarToast('\u{1F4CB} Copiado'); }
};



// ================================================================
// ??? PROTECCION DE DATOS - RESPALDO Y RESTAURACION DE CULTOS
// Los registros de cultos son el tesoro historico de la iglesia.
// ================================================================
window.exportarCultosBackup = function() {
    const datos = localStorage.getItem('legado_cultos_semanales') || '[]';
    const cultos = JSON.parse(datos);
    if (cultos.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('\u26A0\uFE0F No hay cultos para exportar');
        return;
    }
    const fecha = new Date().toISOString().split('T')[0];
    const blob = new Blob([JSON.stringify(cultos, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'LegadoBiblico_Cultos_Respaldo_' + fecha + '.json';
    a.click();
    if (typeof mostrarToast === 'function') mostrarToast('\u{1F4BE} Respaldo de ' + cultos.length + ' cultos descargado');
};

window.importarCultosBackup = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const datos = JSON.parse(ev.target.result);
                if (!Array.isArray(datos)) throw new Error('Formato invalido');
                const existing = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
                // Combinar sin duplicados (por ID)
                const existingIds = new Set(existing.map(c => c.id));
                const nuevos = datos.filter(c => !existingIds.has(c.id));
                const combined = [...existing, ...nuevos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                localStorage.setItem('legado_cultos_semanales', JSON.stringify(combined));
                if (typeof cargarCultosSemana === 'function') cargarCultosSemana();
                if (typeof mostrarToast === 'function') mostrarToast('\u2705 ' + nuevos.length + ' cultos importados correctamente');
            } catch(err) {
                if (typeof mostrarToast === 'function') mostrarToast('\u274C Error: archivo invalido');
            }
        };
        reader.readAsText(file);
    };
    input.click();
};

function cargarCultosSemana() {
    let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    const query = document.getElementById('search-culto')?.value?.toLowerCase() || '';
    const contenedor = document.getElementById('historico-cultos');
    if (!contenedor) return;
    if (historial.length === 0) {
        contenedor.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.3);padding:40px;">No hay cultos registrados.</div>`;
        return;
    }
    const filtrados = historial.filter(h => JSON.stringify(h).toLowerCase().includes(query));
    if (filtrados.length === 0) {
        contenedor.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.3);padding:30px;">Sin resultados.</div>`;
        return;
    }
    contenedor.innerHTML = filtrados.map(reg => {
        const esSab = reg.tipo === 'S\u00e1bado';
        const color = reg.tipo === 'Mi\u00e9rcoles' ? '#55efc4' : (esSab ? '#fdcb6e' : (reg.tipo === 'Viernes' ? '#ff6b6b' : '#a29bfe'));
        const camposCheck = esSab
            ? ['sab_doxologia','sab_invocacion','sab_bienvenida','sab_predicador','sab_tema','sab_himno6','sab_himno_final','sab_oracion_final']
            : ['anciano','bienvenida','oracion1','himno1','lectura','especial','intercesora','predicador','pred_tema','himno2','oracion_final'];
        const llenos = camposCheck.filter(c => reg[c] && reg[c].trim()).length;
        const estado = llenos >= camposCheck.length * 0.7 ? '\u2705 Completo' : `\u26A0\uFE0F ${llenos}/${camposCheck.length}`;
        const estadoColor = llenos >= camposCheck.length * 0.7 ? '#55efc4' : '#fdcb6e';
        let resumen = '';
        if (esSab) {
            const predicador = reg.sab_predicador || '';
            const tema = reg.sab_tema || '';
            const anciano = reg.sab_anciano ? `${reg.sab_anciano_tipo || '\u{1F9D3}'}: ${reg.sab_anciano}` : '';
            resumen = [
                anciano ? `<div style="color:rgba(255,107,107,0.8);font-size:0.72rem;font-weight:700;margin-bottom:3px;">\u{1F9D3} ${anciano}</div>` : '',
                predicador ? `<div style="color:#fff;font-weight:900;font-size:0.9rem;margin-bottom:2px;">\u{1F399}\uFE0F ${predicador}</div>` : '',
                tema ? `<div style="color:rgba(255,255,255,0.55);font-size:0.78rem;font-style:italic;margin-bottom:8px;">\u{1F4D1} &ldquo;${tema}&rdquo;</div>` : ''
            ].join('');
        } else {
            const predicador = reg.predicador || '';
            const tema = reg.pred_tema || '';
            resumen = [
                predicador ? `<div style="color:#fff;font-weight:900;font-size:0.95rem;margin-bottom:4px;">\u{1F3A4} ${predicador}</div>` : '',
                tema ? `<div style="color:rgba(255,255,255,0.6);font-size:0.8rem;font-style:italic;margin-bottom:10px;">\u{1F4D1} &ldquo;${tema}&rdquo;</div>` : ''
            ].join('');
        }
        // Detalles expandibles
        let det = '';
        if (esSab) {
            det = [
                reg.sab_anciano ? `\u{1F9D3} ${reg.sab_anciano_tipo||'Anciano/a'}: ${reg.sab_anciano}` : '',
                reg.sab_llamado ? `\u{1F4EF} 0. Llamado adoraci\u00f3n: ${reg.sab_llamado}` : '',
                reg.sab_doxologia ? `\u2728 1. Doxolog\u00eda: ${reg.sab_doxologia}` : '',
                reg.sab_invocacion ? `\u{1F64F} 2. Invocaci\u00f3n: ${reg.sab_invocacion}` : '',
                reg.sab_bienvenida ? `\u{1F64C} 3. Bienvenida: ${reg.sab_bienvenida}` : '',
                reg.sab_infantil_anuncia ? `\u{1F4E2} 4. Anuncia rinc\u00f3n: ${reg.sab_infantil_anuncia}` : '',
                reg.sab_infantil ? `\u{1F476}    Conduce rinc\u00f3n: ${reg.sab_infantil}` : '',
                reg.sab_ofrendas ? `\u{1F4B0} 5. Ofrendas: ${reg.sab_ofrendas}` : '',
                reg.sab_himno_anuncia ? `\u{1F3B5} 6. Anuncia himno: ${reg.sab_himno_anuncia}` : '',
                reg.sab_himno6 ? `\u{1F3B6} Himno adoraci\u00f3n: ${reg.sab_himno6}` : '',
                reg.sab_lectura_quien ? `\u{1F4D6} 7. Lector: ${reg.sab_lectura_quien}` : '',
                reg.sab_lectura ? `   Cita: ${reg.sab_lectura}` : '',
                reg.sab_oracion_intercesora ? `\u{1F64F} 8. Intercesora: ${reg.sab_oracion_intercesora}` : '',
                reg.sab_musica_especial ? `\u{1F3A4} 9. M\u00fasica: ${reg.sab_musica_especial}` : '',
                reg.sab_pred_anuncia ? `\u{1F3A4} 10. Presenta: ${reg.sab_pred_anuncia}` : '',
                reg.sab_predicador ? `\u{1F399}\uFE0F Predicador: ${reg.sab_predicador}` : '',
                reg.sab_tema ? `\u{1F4D1} Tema: &ldquo;${reg.sab_tema}&rdquo;` : '',
                reg.sab_himno_final_quien ? `\u{1F3B5} 11. Anuncia final: ${reg.sab_himno_final_quien}` : '',
                reg.sab_himno_final ? `\u{1F3B6} Himno final: ${reg.sab_himno_final}` : '',
                reg.sab_oracion_final ? `\u{1F932} 12. Oraci\u00f3n final: ${reg.sab_oracion_final}` : '',
                reg.sab_sonido ? `\u{1F39B}\uFE0F Sonido: ${reg.sab_sonido}` : ''
            ].filter(d => d).join('<br>');
        } else {
            det = [
                reg.anciano ? `\u{1F9D3} ${reg.anciano}` : '',
                reg.bienvenida ? `\u{1F91D} ${reg.bienvenida}` : '',
                reg.oracion1 ? `\u{1F64F} ${reg.oracion1}` : '',
                reg.himno1_quien ? `\u{1F3B5} Anuncia himno: ${reg.himno1_quien}` : '',
                reg.himno1 ? `\u{1F3B6} ${reg.himno1}${reg.himno1_titulo ? ' \u2014 ' + reg.himno1_titulo : ''}` : '',
                reg.lectura ? `\u{1F4D6} ${reg.lectura}${reg.lectura_quien ? ' (' + reg.lectura_quien + ')' : ''}` : '',
                reg.especial ? `\u2B50 ${reg.especial}` : '',
                reg.intercesora ? `\u{1F64F} Intercesora: ${reg.intercesora}` : '',
                reg.pred_anuncia ? `\u{1F3A4} Presenta: ${reg.pred_anuncia}` : '',
                reg.predicador ? `\u{1F399}\uFE0F ${reg.predicador}` : '',
                reg.pred_tema ? `\u{1F4D1} &ldquo;${reg.pred_tema}&rdquo;` : '',
                reg.pred_texto ? `\u{1F4D6} ${reg.pred_texto}` : '',
                reg.himno2 ? `\u{1F3B5} Final: ${reg.himno2}${reg.himno2_titulo ? ' \u2014 ' + reg.himno2_titulo : ''}${reg.himno2_quien ? ' (Anuncia: ' + reg.himno2_quien + ')' : ''}` : '',
                reg.oracion_final ? `\u{1F64F} Oraci\u00f3n final: ${reg.oracion_final}` : '',
                reg.sonido ? `\u{1F39B}\uFE0F Sonido: ${reg.sonido}` : ''
            ].filter(d => d).join('<br>');
        }
        return `<div style="background:rgba(255,255,255,0.04);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.08);border-left:5px solid ${color};">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="background:rgba(255,255,255,0.08);padding:3px 10px;border-radius:12px;font-size:0.6rem;color:${color};font-weight:900;letter-spacing:1px;">${reg.tipo}</span>
                    <span style="color:rgba(255,255,255,0.4);font-size:0.7rem;font-weight:700;">${formatearFechaCulto(reg.fecha)}</span>
                </div>
                <span style="font-size:0.6rem;color:${estadoColor};font-weight:900;">${estado}</span>
            </div>
            ${resumen}
            <details style="margin-top:6px;">
                <summary style="color:rgba(255,255,255,0.4);font-size:0.7rem;cursor:pointer;font-weight:700;">Ver programa completo</summary>
                <div style="color:rgba(255,255,255,0.55);font-size:0.75rem;line-height:1.8;margin-top:10px;padding:10px;background:rgba(0,0,0,0.2);border-radius:10px;">${det || '<span style="opacity:0.3">Sin datos</span>'}</div>
            </details>
            <div style="display:flex;gap:6px;margin-top:10px;">
                <button onclick="editarCulto(${reg.id})" style="flex:1;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.2);color:#fdcb6e;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u270F\uFE0F EDITAR</button>
                <button onclick="descargarCultoPDF(${reg.id})" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.2);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4} PDF</button>
                <button onclick="compartirCultoPlantilla(${reg.id})" style="flex:1;padding:8px;background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.2);color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4E4} COMPARTIR</button>
                <button onclick="borrarCultoSemana(${reg.id})" style="padding:8px 12px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.2);color:#ff6b6b;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F5D1}\uFE0F</button>
            </div>
        </div>`;
    }).join('');
}

window.editarCulto = function (id) {
    const historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    const culto = historial.find(h => h.id === id);
    if (!culto) return;
    document.getElementById('culto-fecha').value = culto.fecha || '';
    const tipoSelect = document.getElementById('culto-tipo');
    if (tipoSelect) tipoSelect.value = culto.tipo || 'Domingo';
    // Disparar el cambio para que se regeneren los campos dinamicos
    autoDetectarTipoCulto(culto.fecha || '');
    // Esperar breve para que el DOM se regenere
    setTimeout(function() {
        const esSab = culto.tipo === 'S\u00e1bado';
        const campos = esSab
            ? ['sab_anciano_tipo','sab_anciano','sab_llamado','sab_doxologia','sab_invocacion','sab_bienvenida','sab_infantil_anuncia','sab_infantil','sab_ofrendas',
               'sab_himno_anuncia','sab_himno6','sab_lectura_quien','sab_lectura','sab_oracion_intercesora','sab_musica_especial',
               'sab_pred_anuncia','sab_predicador','sab_tema','sab_himno_final_quien','sab_himno_final',
               'sab_oracion_final','sab_sonido','sab_obs']
            : ['anciano','bienvenida','oracion1','himno1_quien','himno1','lectura','lectura_quien',
               'especial','especial_desc','intercesora','pred_anuncia','predicador','pred_tema','pred_texto',
               'himno2','himno2_quien','oracion_final','sonido','obs'];
        campos.forEach(c => {
            const el = document.getElementById('culto-' + c);
            if (el && culto[c] !== undefined) el.value = culto[c];
        });
        descomponerCitaBiblicaStruct('lectura', culto.lectura);
        descomponerCitaBiblicaStruct('pred_texto', culto.pred_texto);
        descomponerCitaBiblicaStruct('sab_lectura', culto.sab_lectura);
        if (culto.sab_himno6) {
            const n = parseInt((culto.sab_himno6||'').replace('#',''));
            const d = document.getElementById('himno-titulo-sab_himno6');
            if (d && typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n]) d.textContent = `\u{1F3B5} #${n} \u2014 ${HIMNARIO_ADVENTISTA[n]}`;
        }
        if (culto.sab_himno_final) {
            const n = parseInt((culto.sab_himno_final||'').replace('#',''));
            const d = document.getElementById('himno-titulo-sab_himno_final');
            if (d && typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n]) d.textContent = `\u{1F3B5} #${n} \u2014 ${HIMNARIO_ADVENTISTA[n]}`;
        }
        if (culto.himno1) {
            const n = parseInt((culto.himno1||'').replace('#',''));
            const d = document.getElementById('himno-titulo-himno1');
            if (d && typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n]) d.textContent = `\u{1F3B5} #${n} \u2014 ${HIMNARIO_ADVENTISTA[n]}`;
        }
        if (culto.himno2) {
            const n = parseInt((culto.himno2||'').replace('#',''));
            const d = document.getElementById('himno-titulo-himno2');
            if (d && typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n]) d.textContent = `\u{1F3B5} #${n} \u2014 ${HIMNARIO_ADVENTISTA[n]}`;
        }
        cambiarTabCulto('form');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof mostrarToast === 'function') mostrarToast('\u270F\uFE0F Editando culto \u2014 modifica y guarda');
    }, 120);
    // Guardar el ID en edicion (NO eliminar hasta que el usuario guarde)
    window._editandoCultoId = id;
    cargarCultosSemana();
};
function borrarCultoSemana(id) {
    mostrarConfirm('🗑️ ¿Eliminar este registro de culto?', function() {
        let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
        historial = historial.filter(h => h.id !== id);
        localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));
        _deleteCultoFirebase(id).catch(e => console.warn('Firebase delete error:', e));
        cargarCultosSemana();
        mostrarToast('🗑️ Culto eliminado');
    });
}

function autoDetectarTipoCulto(fechaStr) {
    if (!fechaStr) return;
    const select = document.getElementById('culto-tipo');
    if (!select) return;
    const partes = fechaStr.split('-');
    const fecha = new Date(partes[0], partes[1] - 1, partes[2], 12, 0, 0);
    const diaSemana = fecha.getDay();
    const diasMap = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Mi\u00e9rcoles", 4: "Jueves", 5: "Viernes", 6: "S\u00e1bado" };
    select.value = diasMap[diaSemana] || "Otro";
    // \u2728 MODO S\u00c1BADO: activa el formulario de 12 pasos de liturgia
    _actualizarFormularioPorDia(diaSemana === 6);
}

// =================================================================
// FORMULARIO DIN\u00c1MICO: S\u00e1bado = 12 pasos liturg\u00eda \u26ea
//                 Otro d\u00eda = formulario est\u00e1ndar de culto
// =================================================================
function _actualizarFormularioPorDia(esSabado) {
    const cont = document.getElementById('culto-campos-dinamicos');
    if (!cont) return;
    cont.innerHTML = esSabado ? _html12PasosSabado() : _htmlCamposNormal();
}

function _campoItem(id, num, icon, label, ph, rgb, esHimno, extra) {
    rgb = rgb || '162,155,254';
    extra = extra || '';
    const onInput = esHimno ? ' oninput="if(typeof autocompleteHimno===\'function\')autocompleteHimno(this)"' : '';
    const himnoDiv = esHimno ? `<div id="himno-titulo-${id}" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>` : '';
    return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">${icon}</span>
            <span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${num}</span>
            ${label}
        </label>
        <input type="text" id="culto-${id}" placeholder="${ph}"${onInput}
            style="width:100%;padding:12px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;">
        ${himnoDiv}${extra}
    </div>`;
}

function _html12PasosSabado() {
    const ORO = '253,203,110';
    const banner = `<div style="background:rgba(${ORO},0.08);border:1.5px solid rgba(${ORO},0.35);border-radius:16px;padding:14px;">
        <div style="color:#fdcb6e;font-weight:900;font-size:0.72rem;letter-spacing:2px;text-align:center;">\u26ea CULTO DE S\u00c1BADO \u2014 PROGRAMA LIT\u00daRGICO</div>
        <div style="color:rgba(255,255,255,0.3);font-size:0.62rem;text-align:center;margin-top:3px;">12 pasos del programa oficial</div>
    </div>`;
    const himnoAdoracion = `<div style="background:rgba(${ORO},0.04);border:1.5px solid rgba(${ORO},0.2);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">\u{1f3b5}</span>
            <span style="color:rgba(${ORO},0.6);font-size:0.6rem;background:rgba(${ORO},0.1);padding:2px 8px;border-radius:6px;">6</span>
            HIMNO DE ADORACI\u00d3N
        </label>
        <input type="text" id="culto-sab_himno_anuncia" placeholder="\u00bfQui\u00e9n anuncia el himno?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
        <input type="text" id="culto-sab_himno6" placeholder="# del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.4);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:bold;">
        <div id="himno-titulo-sab_himno6" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
    </div>`;
    const predicador = `<div style="background:rgba(${ORO},0.1);border:2px solid rgba(${ORO},0.5);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:#fdcb6e;font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">\u{1f3a4}</span>
            <span style="color:rgba(0,0,0,0.7);font-size:0.6rem;background:#fdcb6e;padding:2px 8px;border-radius:6px;">10</span>
            TEMA / PREDICADOR
        </label>
        <input type="text" id="culto-sab_pred_anuncia" placeholder="\u00bfQui\u00e9n presenta al predicador?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
        <input type="text" id="culto-sab_predicador" placeholder="Nombre del predicador..."
            style="width:100%;padding:11px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.5);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:900;margin-bottom:6px;">
        <input type="text" id="culto-sab_tema" placeholder="T\u00edtulo del serm\u00f3n..."
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;font-style:italic;">
    </div>`;
    const himnoFinal = `<div style="background:rgba(${ORO},0.04);border:1.5px solid rgba(${ORO},0.2);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">\u{1f3b6}</span>
            <span style="color:rgba(${ORO},0.6);font-size:0.6rem;background:rgba(${ORO},0.1);padding:2px 8px;border-radius:6px;">11</span>
            HIMNO FINAL
        </label>
        <input type="text" id="culto-sab_himno_final_quien" placeholder="\u00bfQui\u00e9n anuncia el himno final?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
        <input type="text" id="culto-sab_himno_final" placeholder="# del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.4);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:bold;">
        <div id="himno-titulo-sab_himno_final" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
    </div>`;
    return banner +
        `<div style="background:rgba(255,107,107,0.07);border:2px solid rgba(255,107,107,0.45);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(255,107,107,0.9);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">&#x1F9D3;</span>
                <span style="color:rgba(0,0,0,0.7);font-size:0.6rem;background:#ff6b6b;padding:2px 8px;border-radius:6px;font-weight:900;">&#x2605;</span>
                ANCIANO(S) DE TURNO
            </label>
            <select id="culto-sab_anciano_tipo"
                style="width:100%;padding:11px 12px;background:rgba(0,0,0,0.45);border:1.5px solid rgba(255,107,107,0.6);color:#ff6b6b;border-radius:10px;outline:none;font-size:0.88rem;font-weight:900;margin-bottom:8px;cursor:pointer;">
                <option value="">&#x2014; Seleccionar categor&#237;a &#x2014;</option>
                <option value="Anciano de Turno">&#x1F9D3; Anciano de Turno</option>
                <option value="Ancianos de Turno">&#x1F9D3;&#x1F9D3; Ancianos de Turno</option>
                <option value="Anciana de Turno">&#x1F9D2; Anciana de Turno</option>
                <option value="Ancianas de Turno">&#x1F9D2;&#x1F9D2; Ancianas de Turno</option>
                <option value="Anciano y Anciana de Turno">&#x1F9D3;&#x1F9D2; Anciano y Anciana de Turno</option>
            </select>
            <input type="text" id="culto-sab_anciano" placeholder="Nombre(s) del anciano/a de turno..."
                style="width:100%;padding:12px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(255,107,107,0.5);color:#fff;border-radius:10px;outline:none;font-size:0.95rem;font-weight:700;">
        </div>` +
        `<div style="background:rgba(${ORO},0.04);border:1.5px solid rgba(${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\u{1f4ef}</span>
                <span style="color:rgba(${ORO},0.6);font-size:0.6rem;background:rgba(${ORO},0.1);padding:2px 8px;border-radius:6px;">0</span>
                LLAMADO A LA ADORACI\u00d3N
            </label>
            <input type="text" id="culto-sab_llamado" placeholder="\u00bfQui\u00e9n hace el llamado a la adoraci\u00f3n?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>` +
        _campoItem('sab_doxologia', '1', '\u2728', 'DOXOLOG\u00cdA', '# del himno de doxolog\u00eda...', ORO, true) +
        _campoItem('sab_invocacion', '2', '\u{1f64f}', 'INVOCACI\u00d3N', 'Nombre del responsable...', ORO) +
        _campoItem('sab_bienvenida', '3', '\u{1f64c}', 'BIENVENIDA', 'Nombre del responsable...', ORO) +
        `<div style="background:rgba(${ORO},0.04);border:1.5px solid rgba(${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\u{1f476}</span>
                <span style="color:rgba(${ORO},0.6);font-size:0.6rem;background:rgba(${ORO},0.1);padding:2px 8px;border-radius:6px;">4</span>
                RINC\u00d3N INFANTIL
            </label>
            <input type="text" id="culto-sab_infantil_anuncia" placeholder="\u00bfQui\u00e9n anuncia el rinc\u00f3n infantil?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            <input type="text" id="culto-sab_infantil" placeholder="\u00bfQui\u00e9n conduce el rinc\u00f3n infantil?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>` +
        _campoItem('sab_ofrendas', '5', '\u{1f4b0}', 'DIEZMOS Y OFRENDAS', 'Nombre del encargado...', ORO) +
        himnoAdoracion +
        `<div style="background:rgba(${ORO},0.04);border:1.5px solid rgba(${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\u{1f4d6}</span>
                <span style="color:rgba(${ORO},0.6);font-size:0.6rem;background:rgba(${ORO},0.1);padding:2px 8px;border-radius:6px;">7</span>
                LECTURA B\u00cdBLICA
            </label>
            <input type="text" id="culto-sab_lectura_quien" placeholder="\u00bfQui\u00e9n lee la cita?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            ${renderBibliaStructHTML('sab_lectura')}
            <input type="hidden" id="culto-sab_lectura" value="">
        </div>` +
        _campoItem('sab_oracion_intercesora', '8', '\u{1f64f}', 'ORACI\u00d3N INTERCESORA', 'Nombre del responsable...', ORO) +
        _campoItem('sab_musica_especial', '9', '\u{1f3a4}', 'M\u00daSICA ESPECIAL', 'Qui\u00e9n o qu\u00e9 grupo canta...', ORO) +
        predicador +
        himnoFinal +
        _campoItem('sab_oracion_final', '12', '\u{1f932}', 'ORACI\u00d3N FINAL', 'Nombre del responsable...', ORO) +
        _campoItem('sab_sonido', '\u{1f39b}\ufe0f', '\u{1f39b}\ufe0f', 'ENCARGADO DE SONIDO', 'Nombre...', ORO) +
        _campoItem('sab_obs', '\u{1f4dd}', '\u{1f4dd}', 'OBSERVACIONES', 'Notas adicionales...', '116,185,255');
}

function _htmlCamposNormal() {
    const defs = [
        ['anciano','1','\u{1f9d3}','ANCIANO DE TURNO','\u00bfQui\u00e9n es el anciano?','162,155,254',false],
        ['bienvenida','2','\u{1f91d}','BIENVENIDA','Nombre del encargado...','162,155,254',false],
        ['oracion1','3','\u{1f64f}','PRIMERA ORACI\u00d3N','\u00bfQui\u00e9n ora?','162,155,254',false],
        ['himno1_quien','4','\u{1f3b5}','HIMNO DE APERTURA \u2014 ANUNCIA','\u00bfQui\u00e9n anuncia el himno?','162,155,254',false],
        ['himno1','5','\u{1f3b6}','HIMNO DE APERTURA \u2014 N\u00daMERO','# del himno...','254,202,87',true],
        ['lectura','6','\u{1f4d6}','LECTURA B\u00cdBLICA','\u00bfQui\u00e9n lee?','85,239,196',false],
        ['especial','7','\u2b50','PARTE ESPECIAL','\u00bfQui\u00e9n participa?','162,155,254',false],
        ['especial_desc','8','\u{1f4dd}','DESCRIPCI\u00d3N PARTE ESPECIAL','Descripci\u00f3n...','116,185,255',false],
        ['intercesora','9','\u{1f64f}','ORACI\u00d3N INTERCESORA','\u00bfQui\u00e9n ora?','162,155,254',false],
        ['pred_anuncia','10','\u{1f3a4}','ANUNCIA AL PREDICADOR','\u00bfQui\u00e9n presenta al predicador?','162,155,254',false],
        ['predicador','11','\u{1f399}\ufe0f','PREDICADOR/A','Nombre del predicador...','253,203,110',false],
        ['pred_tema','12','\u{1f4d1}','TEMA DEL SERM\u00d3N','T\u00edtulo del serm\u00f3n...','116,185,255',false],
        ['himno2','13','\u{1f3b5}','HIMNO FINAL','# del himno...','254,202,87',true],
        ['himno2_quien','14','\u{1f3b5}','HIMNO FINAL \u2014 ANUNCIA','\u00bfQui\u00e9n anuncia el himno?','162,155,254',false],
        ['oracion_final','15','\u{1f64f}','ORACI\u00d3N FINAL','\u00bfQui\u00e9n ora?','162,155,254',false],
        ['sonido','16','\u{1f39b}\ufe0f','ENCARGADO DE SONIDO','Nombre...','162,155,254',false],
        ['obs','17','\u{1f4dd}','OBSERVACIONES','Notas adicionales...','116,185,255',false]
    ];
    return defs.map(([id,num,icon,label,ph,rgb,esHimno]) => _campoItem(id,num,icon,label,ph,rgb,esHimno)).join('');
}

function formatearFechaCulto(fechaStr) {
    if (!fechaStr) return "Sin fecha";
    const partes = fechaStr.split('-');
    const f = new Date(partes[0], partes[1] - 1, partes[2]);
    return f.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
}

// ===============================================
// FABRICA DE SERMONES IA : WIZARD 3 PASOS
// ===============================================

function renderFabricaSermones() {
    const contenedor = document.getElementById('pantalla-estudio');
    contenedor.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#0a0818);font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(253,203,110,0.3);">
                <button onclick="irAPantalla('iglesia', renderModuloIglesia)" style="background:rgba(253,203,110,0.1);border:1px solid #fdcb6e;color:#fdcb6e;padding:8px 15px;border-radius:8px;font-weight:900;cursor:pointer;">&#8592; VOLVER</button>
                <div>
                    <div style="color:#fdcb6e;font-weight:900;font-size:0.9rem;">FABRICA DE SERMONES IA</div>
                    <div id="wizard-subtitulo" style="color:rgba(255,255,255,0.4);font-size:0.65rem;letter-spacing:1px;">PASO 1 DE 3</div>
                </div>
            </div>
            <div style="height:4px;background:rgba(255,255,255,0.1);">
                <div id="wizard-barra" style="height:4px;background:linear-gradient(90deg,#fdcb6e,#f1c40f);width:33%;transition:width 0.4s ease;"></div>
            </div>
            <div style="padding:20px;max-width:700px;margin:0 auto;">

                <div id="wizard-paso1">
                    <h2 style="color:#fff;text-align:center;font-weight:300;letter-spacing:3px;font-size:1.2rem;margin:20px 0 8px 0;">QUE NECESITAS HOY?</h2>
                    <p style="color:rgba(255,255,255,0.4);text-align:center;font-size:0.85rem;margin-bottom:25px;">Toca la opcion que mejor describe lo que vas a preparar</p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                        <button onclick="sermonWizardElegirTipo('sermon')" style="background:linear-gradient(145deg,rgba(108,92,231,0.25),rgba(162,155,254,0.1));border:2px solid rgba(162,155,254,0.4);border-radius:20px;padding:28px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2.5rem;margin-bottom:10px;">&#127908;</div>
                            <div style="color:#a29bfe;font-weight:900;font-size:1rem;margin-bottom:4px;">SERMON</div>
                            <div style="color:rgba(255,255,255,0.4);font-size:0.75rem;">30 a 45 minutos</div>
                        </button>
                        <button onclick="sermonWizardElegirTipo('devocional')" style="background:linear-gradient(145deg,rgba(253,203,110,0.2),rgba(241,196,15,0.1));border:2px solid rgba(253,203,110,0.4);border-radius:20px;padding:28px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2.5rem;margin-bottom:10px;">&#128214;</div>
                            <div style="color:#fdcb6e;font-weight:900;font-size:1rem;margin-bottom:4px;">DEVOCIONAL</div>
                            <div style="color:rgba(255,255,255,0.4);font-size:0.75rem;">15 minutos</div>
                        </button>
                        <button onclick="sermonWizardElegirTipo('boda')" style="background:linear-gradient(145deg,rgba(255,107,107,0.2),rgba(255,107,107,0.05));border:2px solid rgba(255,107,107,0.3);border-radius:20px;padding:22px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:8px;">&#128141;</div>
                            <div style="color:#ff6b6b;font-weight:900;font-size:0.9rem;">BODA</div>
                        </button>
                        <button onclick="sermonWizardElegirTipo('nino')" style="background:linear-gradient(145deg,rgba(0,184,148,0.2),rgba(85,239,196,0.05));border:2px solid rgba(85,239,196,0.3);border-radius:20px;padding:22px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:8px;">&#128118;</div>
                            <div style="color:#55efc4;font-weight:900;font-size:0.85rem;">PRESENTACION<br>DE NINO</div>
                        </button>
                        <button onclick="sermonWizardElegirTipo('funeral')" style="background:linear-gradient(145deg,rgba(99,110,114,0.3),rgba(99,110,114,0.1));border:2px solid rgba(255,255,255,0.15);border-radius:20px;padding:22px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:8px;">&#128367;</div>
                            <div style="color:rgba(255,255,255,0.7);font-weight:900;font-size:0.85rem;">SERVICIO<br>FUNEBRE</div>
                        </button>
                        <button onclick="sermonWizardElegirTipo('cena')" style="background:linear-gradient(145deg,rgba(156,39,176,0.2),rgba(156,39,176,0.05));border:2px solid rgba(206,147,216,0.3);border-radius:20px;padding:22px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:8px;">&#127863;</div>
                            <div style="color:#ce93d8;font-weight:900;font-size:0.9rem;">SANTA CENA</div>
                        </button>
                        <button onclick="sermonWizardElegirTipo('dificil')" style="grid-column:1/-1;background:linear-gradient(145deg,rgba(255,159,67,0.15),rgba(255,159,67,0.05));border:2px solid rgba(255,159,67,0.3);border-radius:20px;padding:20px 15px;color:#fff;cursor:pointer;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:6px;">&#9928;</div>
                            <div style="color:#ff9f43;font-weight:900;font-size:0.9rem;">TIEMPOS DIFICILES / CRISIS</div>
                        </button>
                    </div>
                </div>

                <div id="wizard-paso2" style="display:none;">
                    <div style="text-align:center;margin-bottom:25px;padding-top:15px;">
                        <div id="wizard2-icono" style="font-size:3.5rem;margin-bottom:10px;"></div>
                        <h2 id="wizard2-titulo" style="color:#fff;font-weight:300;letter-spacing:2px;font-size:1.2rem;margin-bottom:5px;"></h2>
                        <p style="color:rgba(255,255,255,0.4);font-size:0.85rem;">Elige un tema de la lista, o escribe el tuyo abajo</p>
                    </div>
                    <div id="wizard2-chips" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:25px;justify-content:center;"></div>
                    <div style="display:flex;align-items:center;gap:15px;margin:20px 0;">
                        <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
                        <span style="color:rgba(255,255,255,0.3);font-size:0.8rem;">O escribe tu propio tema</span>
                        <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
                    </div>
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(253,203,110,0.2);border-radius:18px;padding:20px;margin-bottom:15px;">
                        <label style="color:rgba(255,255,255,0.5);font-size:0.75rem;font-weight:bold;margin-bottom:10px;display:block;">TEMA, IDEA O PERSONAJE BIBLICO</label>
                        <input type="text" id="sermon-idea" placeholder="Ej: Daniel en el foso, El amor de Dios, Las 2300 tardes..." style="width:100%;padding:14px;background:rgba(0,0,0,0.4);border:1px solid rgba(253,203,110,0.3);color:#fff;border-radius:12px;outline:none;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="background:rgba(255,255,255,0.02);border:1px dashed rgba(255,255,255,0.08);border-radius:15px;padding:15px;margin-bottom:25px;">
                        <label style="color:rgba(255,255,255,0.3);font-size:0.7rem;font-weight:bold;margin-bottom:8px;display:block;">NOTA O PARRAFO ADICIONAL (opcional)</label>
                        <textarea id="sermon-input" placeholder="Si tienes un texto biblico extra, escribelo aqui..." style="width:100%;height:80px;background:transparent;border:none;color:rgba(255,255,255,0.7);outline:none;resize:none;font-size:0.9rem;box-sizing:border-box;"></textarea>
                    </div>
                    <input type="hidden" id="sermon-tipo">
                    <input type="hidden" id="sermon-nombre-biblico" value="">
                    <div style="display:grid;grid-template-columns:1fr 2fr;gap:12px;">
                        <button onclick="sermonWizardVolver()" style="padding:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:14px;cursor:pointer;font-weight:bold;">&#8592; Atras</button>
                        <button onclick="generarSermonIA()" id="btn-generar-sermon" style="padding:16px;background:linear-gradient(135deg,#fdcb6e,#f1c40f);border:none;color:#000;font-weight:900;border-radius:14px;cursor:pointer;font-size:1rem;box-shadow:0 8px 20px rgba(253,203,110,0.3);">&#128640; CREAR BOSQUEJO</button>
                    </div>
                </div>

                <div id="wizard-paso3" style="display:none;">
                    <div id="resultado-sermon" style="background:white;color:#333;padding:25px;border-radius:20px;box-shadow:0 15px 40px rgba(0,0,0,0.5);">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;border-bottom:2px solid #fdcb6e;padding-bottom:15px;">
                            <div style="flex:1;">
                                <div style="color:#fdcb6e;font-weight:900;font-size:0.65rem;letter-spacing:2px;">IA GENERATIVA - FILOSOFIA ADVENTISTA</div>
                                <h2 id="tit-sermon" style="margin:5px 0;color:#1a1a2e;font-size:1.3rem;font-weight:900;"></h2>
                            </div>
                            <button onclick="compartirSermonIA()" style="background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:white;border:none;padding:10px 14px;border-radius:10px;font-weight:bold;cursor:pointer;margin-left:10px;flex-shrink:0;">&#128228; Compartir</button>
                        </div>
                        <div id="cuerpo-sermon" style="line-height:1.8;font-size:0.95rem;color:#444;"></div>
                        <div style="margin-top:25px;border-top:1px dashed #ddd;padding-top:15px;text-align:center;font-size:0.7rem;color:#aaa;">
                            Basado en los principios biblicos y la fe adventista del septimo dia.
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;">
                        <button onclick="sermonWizardVolver2()" style="padding:15px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:14px;cursor:pointer;font-weight:bold;">&#8592; Cambiar tema</button>
                        <button onclick="irAPantalla('fabrica', renderFabricaSermones)" style="padding:15px;background:linear-gradient(135deg,rgba(108,92,231,0.3),rgba(162,155,254,0.2));border:1px solid #a29bfe;color:#a29bfe;border-radius:14px;cursor:pointer;font-weight:bold;">&#128260; Crear otro</button>
                    </div>
                </div>

            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function sermonWizardElegirTipo(tipo) {
    const iconos = { sermon: '&#127908;', devocional: '&#128214;', boda: '&#128141;', nino: '&#128118;', funeral: '&#128367;', cena: '&#127863;', dificil: '&#9928;' };
    const titulos = { sermon: 'SERMON COMPLETO (30-45 MIN)', devocional: 'DEVOCIONAL (15 MIN)', boda: 'SERVICIO DE BODA', nino: 'PRESENTACION DE NINO', funeral: 'SERVICIO FUNEBRE', cena: 'SANTA CENA', dificil: 'TIEMPOS DIFICILES' };
    const chipSermon = [
        { label: 'El Amor de Dios', valor: 'El Amor Incondicional de Dios' },
        { label: 'Las 2300 Tardes', valor: 'Las 2300 Tardes y Mananas' },
        { label: 'El Origen del Mal', valor: 'El Origen del Mal y el Gran Conflicto' },
        { label: 'La Segunda Venida', valor: 'La Segunda Venida de Cristo' },
        { label: 'El Sabado de Dios', valor: 'El Sabado: Sello de Dios' },
        { label: 'Victoria sobre el pecado', valor: 'Victoria sobre el pecado' }
    ];
    const mapaChips = {
        sermon: chipSermon, devocional: chipSermon,
        boda: [{ label: 'El amor del matrimonio', valor: 'El amor del matrimonio cristiano' }, { label: 'El hogar cristiano', valor: 'El hogar cristiano fundado en Dios' }],
        nino: [{ label: 'Dedicar el nino a Dios', valor: 'La dedicacion del nino a Dios' }, { label: 'Responsabilidad de los padres', valor: 'La responsabilidad de los padres' }],
        funeral: [{ label: 'La resurreccion', valor: 'La resurreccion y la esperanza' }, { label: 'El estado de los muertos', valor: 'El estado de los muertos segun la Biblia' }],
        cena: [{ label: 'El significado de la Cena', valor: 'El significado de la Santa Cena' }, { label: 'El lavamiento y la humildad', valor: 'El lavamiento de pies y la humildad' }],
        dificil: [{ label: 'Fe en la tormenta', valor: 'Fe en los tiempos dificiles' }, { label: 'Dios es mi fuerza', valor: 'La fortaleza de Dios en la prueba' }]
    };
    document.getElementById('sermon-tipo').value = tipo;
    document.getElementById('wizard2-icono').innerHTML = iconos[tipo] || '';
    document.getElementById('wizard2-titulo').innerText = titulos[tipo] || '';
    const chips = mapaChips[tipo] || chipSermon;
    document.getElementById('wizard2-chips').innerHTML = chips.map(c =>
        '<button onclick="sermonSeleccionarChip(this,\'' + c.valor + '\')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);padding:10px 16px;border-radius:50px;cursor:pointer;font-size:0.85rem;transition:all 0.2s;">' + c.label + '</button>'
    ).join('');
    document.getElementById('wizard-paso1').style.display = 'none';
    document.getElementById('wizard-paso2').style.display = 'block';
    document.getElementById('wizard-barra').style.width = '66%';
    document.getElementById('wizard-subtitulo').innerText = 'PASO 2 DE 3 ? EL TEMA';
    window.scrollTo(0, 0);
}

function sermonSeleccionarChip(btn, valor) {
    document.querySelectorAll('#wizard2-chips button').forEach(b => {
        b.style.background = 'rgba(255,255,255,0.06)';
        b.style.borderColor = 'rgba(255,255,255,0.15)';
        b.style.color = 'rgba(255,255,255,0.8)';
    });
    btn.style.background = 'rgba(253,203,110,0.2)';
    btn.style.borderColor = '#fdcb6e';
    btn.style.color = '#fdcb6e';
    document.getElementById('sermon-idea').value = valor;
}

function sermonWizardVolver() {
    document.getElementById('wizard-paso2').style.display = 'none';
    document.getElementById('wizard-paso1').style.display = 'block';
    document.getElementById('wizard-barra').style.width = '33%';
    document.getElementById('wizard-subtitulo').innerText = 'PASO 1 DE 3';
    window.scrollTo(0, 0);
}

function sermonWizardVolver2() {
    document.getElementById('wizard-paso3').style.display = 'none';
    document.getElementById('wizard-paso2').style.display = 'block';
    document.getElementById('wizard-barra').style.width = '66%';
    document.getElementById('wizard-subtitulo').innerText = 'PASO 2 DE 3 ? EL TEMA';
    window.scrollTo(0, 0);
}

function actualizarInputPorTema(val) {
    if (val) document.getElementById('sermon-idea').value = val;
}


function generarSermonIA() {
    const tipo = document.getElementById('sermon-tipo').value;
    const idea = document.getElementById('sermon-idea').value.trim();
    const nombre = document.getElementById('sermon-nombre-biblico').value.trim();
    const parrafo = document.getElementById('sermon-input').value.trim();
    const btn = document.getElementById('btn-generar-sermon');
    const tituloEl = document.getElementById('tit-sermon');
    const cuerpo = document.getElementById('cuerpo-sermon');

    if (!idea && !nombre && !parrafo) {
        mostrarToast('⚠️ Escribe o elige un tema para continuar');
        return;
    }

    btn.innerHTML = 'Generando bosquejo...';
    btn.disabled = true;

    setTimeout(() => {
        let tituloFinal = idea || (nombre ? `El Legado de ${nombre}` : 'Mensaje de Esperanza');
        tituloEl.innerText = tituloFinal.toUpperCase();

        const uIdea = idea.toUpperCase();
        let puntos = '';
        if (uIdea.includes('2300')) {
            puntos = '<li><b>La Purificacion del Santuario:</b> Daniel 8:14. El juicio investigador y nuestra preparacion.</li>' +
                '<li><b>Las 70 Semanas:</b> Conexion entre el bautismo de Cristo (27 d.C.) y la profecia mas larga de la Biblia.</li>' +
                '<li><b>Nuestra Mision Hoy:</b> El llamado al pueblo del remanente en el tiempo del fin.</li>';
        } else if (uIdea.includes('AMOR')) {
            puntos = '<li><b>Amor Agape:</b> Juan 3:16. Un amor que se entrega por el enemigo.</li>' +
                '<li><b>La Cruz como Centro:</b> La mayor demostracion de justicia y misericordia.</li>' +
                '<li><b>Viviendo en Amor:</b> Como el amor de Dios nos capacita para amar al projimo.</li>';
        } else if (uIdea.includes('ORIGEN') || uIdea.includes('MAL')) {
            puntos = '<li><b>Lucifer y la Caida:</b> Ezequiel 28 e Isaias 14. El inicio del conflicto en el cielo.</li>' +
                '<li><b>El Gran Conflicto:</b> Como el pecado afecto el Eden y nuestra naturaleza actual.</li>' +
                '<li><b>El Fin del Mal:</b> La promesa de un mundo donde el pecado no se levantara dos veces.</li>';
        } else if (nombre) {
            puntos = `<li><b>El Llamado de ${nombre}:</b> Como Dios eligio a este personaje en un momento critico.</li>` +
                `<li><b>La Prueba de Fe:</b> El desafio que enfrento ${nombre} y como su fe le dio la victoria.</li>` +
                `<li><b>Leccion para Nosotros:</b> Que nos ensena ${nombre} sobre la perseverancia hoy?</li>`;
        } else {
            puntos = `<li><b>Fundamento:</b> El plan de Dios para tu vida en medio de ${idea || 'la situacion actual'}.</li>` +
                '<li><b>Accion:</b> Pasos practicos para fortalecer nuestra relacion con el Espiritu Santo.</li>' +
                '<li><b>Promesa:</b> La seguridad de que Cristo esta al control de la historia.</li>';
        }

        let html = '';
        if (tipo === 'sermon') {
            html = '<p><b>Duracion estimada: 40 minutos</b></p>';
            html += '<h4 style="color:#e67e22;margin-top:20px;border-left:4px solid #fdcb6e;padding-left:10px;">I. INTRODUCCION</h4>';
            html += '<p>' + (parrafo ? `La reflexion: "${parrafo}" nos abre a este tema.` : `"${tituloFinal}" nos ancla a la verdad de la Palabra de Dios.`) + '</p>';
            html += '<h4 style="color:#e67e22;margin-top:20px;border-left:4px solid #fdcb6e;padding-left:10px;">II. FUNDAMENTO BIBLICO</h4>';
            html += '<p>Dios nos invita a estudiar con diligencia Su revelacion.</p>';
            html += '<h4 style="color:#e67e22;margin-top:20px;border-left:4px solid #fdcb6e;padding-left:10px;">III. DESARROLLO DOCTRINAL</h4>';
            html += '<ol>' + puntos + '</ol>';
            html += '<h4 style="color:#e67e22;margin-top:20px;border-left:4px solid #fdcb6e;padding-left:10px;">IV. CONCLUSION Y LLAMADO</h4>';
            html += '<p>Hoy el Senor te invita a tomar una decision por el Reino de Dios.</p>';
        } else if (tipo === 'devocional') {
            html = '<p><b>Duracion: 15 minutos</b></p>';
            html += '<div style="background:#fdf9f0;padding:15px;border-radius:15px;margin:15px 0;border-left:4px solid #f1c40f;">';
            html += '<p style="font-style:italic;margin:0;">Lampara es a mis pies tu palabra. &mdash; Salmos 119:105</p></div>';
            html += '<p><b>Reflexion:</b> ' + (parrafo || 'La gracia de Dios es suficiente para cada desafio.') + '</p>';
        } else {
            const tits = { boda: 'Servicio de Boda', nino: 'Presentacion de Nino', funeral: 'Servicio de Esperanza', cena: 'Santa Cena', dificil: 'Fortaleza en la Prueba' };
            html = '<h3 style="text-align:center;color:#1a1a2e;">' + (tits[tipo] || 'Servicio Especial') + '</h3>';
            html += '<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">';
            html += '<p><b>Bosquejo:</b></p><ul>';
            html += '<li>Bienvenida y Oracion inicial.</li>';
            html += '<li>Lectura relativa a ' + (idea || 'la ocasion') + '.</li>';
            html += '<li>Sermon breve centrado en la esperanza biblica.' + (nombre ? ` Ejemplo de fe: ${nombre}.` : '') + '</li>';
            html += '<li>Ceremonia especifica.</li>';
            html += '<li>Bendicion final.</li></ul>';
        }

        cuerpo.innerHTML = html;
        document.getElementById('wizard-paso2').style.display = 'none';
        document.getElementById('wizard-paso3').style.display = 'block';
        document.getElementById('wizard-barra').style.width = '100%';
        document.getElementById('wizard-subtitulo').innerText = 'PASO 3 DE 3 - TU BOSQUEJO ESTA LISTO';
        btn.innerHTML = 'CREAR BOSQUEJO';
        btn.disabled = false;
        window.scrollTo(0, 0);
        if (typeof mostrarToast === 'function') mostrarToast('Sermon generado!');
    }, 2500);
}

function compartirSermonIA() {
    const titulo = document.getElementById('tit-sermon').innerText;
    const cuerpo = document.getElementById('cuerpo-sermon');

    // Formatear el texto para WhatsApp (limpio de etiquetas HTML si es posible, o simple)
    let mensaje = `?? *${titulo}*\n`;
    mensaje += `???????????????\n\n`;
    mensaje += cuerpo.innerText;
    mensaje += `\n\n???????????????\n`;
    mensaje += `_?? Generado por IA - Legado Bíblico_`;

    // ?? Compartir con menú nativo del celular
    if (navigator.share) {
        navigator.share({ title: titulo, text: mensaje }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(mensaje).then(() => {
            if (typeof mostrarToast === 'function') mostrarToast('? Sermón copiado al portapapeles');
        });
    }
}

// ===============================================
// 28 DOCTRINAS FUNDAMENTALES - MODULO IGLESIA
// Legado Bíblico
// ===============================================

const IGLESIA_DOCTRINAS = [
    { num: 1, cat: "DIOS", titulo: "Las Sagradas Escrituras", icono: "??", ref: "Sal 119:105; 2 Tim 3:16-17", resumen: "La Palabra escrita de Dios, guia infalible de fe.", detalle: "Las Sagradas Escrituras, Antiguo y Nuevo Testamento, son la Palabra escrita de Dios, dada por inspiracion divina. Los autores inspirados hablaron y escribieron movidos por el Espiritu Santo. En esta Palabra, Dios ha confiado a la humanidad el conocimiento necesario para la salvacion. Las Sagradas Escrituras son la suprema, autoritaria e infalible revelacion de Su voluntad. Son la norma de caracter, la prueba de la experiencia, el revelador definitivo de las doctrinas, y el registro fiable de los actos de Dios en la historia." },
    { num: 2, cat: "DIOS", titulo: "La Deidad", icono: "?", ref: "Mat 28:19; 2 Cor 13:14", resumen: "Unidad de tres Personas coeternales.", detalle: "Hay un solo Dios: Padre, Hijo, y Espiritu Santo, una unidad de tres Personas coeternales. Dios es inmortal, todopoderoso, omnisciente, sobre todo, y omnipresente. Es infinito y mas alla de la comprension humana, pero conocido a traves de su auto-revelacion. Dios, que es amor, es por siempre digno de adoracion y servicio por parte de toda la creacion." },
    { num: 3, cat: "DIOS", titulo: "Dios Padre", icono: "??", ref: "Juan 3:16; Apoc 4:11", resumen: "Creador, Proveedor y Sustentador eterno.", detalle: "Dios el Padre eterno es el Creador, Proveedor, Sustentador y Soberano de toda la creacion. El es justo y santo, misericordioso y gentil, lento para la ira, y abundante en amor y fidelidad. Las cualidades y poderes exhibidos en el Hijo y el Espiritu Santo son tambien las del Padre." },
    { num: 4, cat: "DIOS", titulo: "Dios Hijo (Jesucristo)", icono: "??", ref: "Juan 1:1-3; Heb 8:1-2", resumen: "Dios encarnado para nuestra salvacion.", detalle: "Dios Hijo encarnó en Jesucristo. A traves de El todas las cosas fueron creadas, el caracter de Dios es revelado, la salvacion de la humanidad es alcanzada, y el mundo es enjuiciado. Vivio y experimento la tentacion como un ser humano, pero ejemplifico perfectamente la justicia y el amor de Dios. Sufrio y murio voluntariamente en la cruz en lugar nuestro, resucito de entre los muertos y subio al cielo para ministrar en el santuario celestial en nuestro favor." },
    { num: 5, cat: "DIOS", titulo: "Dios Espiritu Santo", icono: "?????", ref: "Juan 16:7-13; Hechos 1:8", resumen: "Persona activa en la Creacion y Redencion.", detalle: "Dios Espiritu Santo fue parte activa con el Padre y el Hijo en la Creacion, la encarnacion y la redencion. El es tan persona como lo son el Padre y el Hijo. El inspiro a los autores de las Escrituras. Fue enviado por el Padre y el Hijo para estar siempre con sus hijos, extiende los dones espirituales a la iglesia y la conduce a toda la verdad." },
    { num: 6, cat: "HUMANIDAD", titulo: "Creacion", icono: "??", ref: "Gen 1-2; Ex 20:8-11", resumen: "Relato historico de la actividad creativa de Dios.", detalle: "Dios ha revelado en las Escrituras el autentico e historico relato de su actividad creativa. El creo el universo en seis dias literales y descanso en el septimo dia. Asi establecio el sabado como un recordatorio perpetuo de su obra. El hombre y la mujer fueron hechos a imagen de Dios como obra cumbre." },
    { num: 7, cat: "HUMANIDAD", titulo: "Naturaleza de la Humanidad", icono: "??", ref: "Gen 1:26-28; 1 Tes 5:23", resumen: "Unidad indivisible de cuerpo, mente y espiritu.", detalle: "El hombre y la mujer fueron hechos a imagen de Dios con individualidad, el poder y la libertad de pensar y hacer. Cada uno es una unidad indivisible de cuerpo, mente y espiritu, que depende de Dios para la vida, el aliento y todo lo demas. Cuando nuestros primeros padres desobedecieron a Dios, cayeron de su alta posicion." },
    { num: 8, cat: "SALVACION", titulo: "La Gran Controversia", icono: "??", ref: "Apoc 12:4-9; Job 1:6-12", resumen: "Conflicto universal sobre el caracter de Dios.", detalle: "Toda la humanidad esta ahora involucrada en una gran controversia entre Cristo y Satanas con respecto al caracter de Dios, su ley y su soberania sobre el universo. Este conflicto se origino en el cielo cuando un ser creado se convirtio en Satanas. Introdujo el espiritu de rebelion en este mundo. El Dios de amor sera finalmente reivindicado." },
    { num: 9, cat: "SALVACION", titulo: "Vida, Muerte y Resurreccion de Cristo", icono: "??", ref: "Isa 53; 1 Cor 15:3-4", resumen: "Unico medio de expiacion por el pecado.", detalle: "En la vida de Cristo de perfecta obediencia a la voluntad de Dios, su sufrimiento, muerte y resurreccion, Dios proporciono el unico medio de expiacion por el pecado humano. Esta expiacion perfecta vindica la justicia de la ley de Dios y la gracia de su caracter. La resurrecccion corporal de Cristo proclama el triunfo de Dios sobre las fuerzas del mal." },
    { num: 10, cat: "SALVACION", titulo: "Experiencia de la Salvacion", icono: "????", ref: "Juan 3:16; Ef 2:4-10", resumen: "Justificados y adoptados por gracia.", detalle: "Guiados por el Espiritu Santo sentimos nuestra necesidad, reconocemos nuestra pecaminosidad, nos arrepentimos de nuestras transgresiones y ejercemos la fe en Jesus como Salvador y Senor. A traves de Cristo somos justificados, adoptados como hijos e hijas de Dios, y liberados del senorio del pecado." },
    { num: 11, cat: "SALVACION", titulo: "Creciendo en Cristo", icono: "??", ref: "Sal 1:1-2; Col 2:6", resumen: "Victoria sobre las fuerzas del mal.", detalle: "Con su muerte en la cruz, Jesus triunfo sobre las fuerzas del mal. Estamos llamados a crecer a semejanza de su caracter, comulgando con el diariamente en la oracion, alimentandonos de su Palabra y participando en la mision de la Iglesia." },
    { num: 12, cat: "IGLESIA", titulo: "La Iglesia", icono: "???", ref: "Mat 28:19-20; Ef 1:22", resumen: "Comunidad de creyentes en Jesucristo.", detalle: "La iglesia es la comunidad de creyentes que confiesan a Jesucristo como Senor y Salvador. Somos llamados a diferenciarnos del mundo y nos reunimos para la adoracion, la comunion, la instruccion en la Palabra, para la celebracion de la Cena del Senor, para el servicio a la humanidad y para la proclamacion mundial del evangelio." },
    { num: 13, cat: "IGLESIA", titulo: "El Remanente y su Mision", icono: "??", ref: "Apoc 12:17; 14:6-12", resumen: "Llamados a guardar los mandamientos en el tiempo del fin.", detalle: "En los ultimos dias, un remanente ha sido llamado a guardar los mandamientos de Dios y la fe de Jesus. Este remanente anuncia la llegada de la hora del juicio, proclama la salvacion a traves de Cristo y anuncia la llegada de su segundo advenimiento, simbolizado por los tres angeles de Apocalipsis 14." },
    { num: 14, cat: "IGLESIA", titulo: "Unidad en el Cuerpo de Cristo", icono: "??", ref: "Juan 17:20-23; Gal 3:27-29", resumen: "Un cuerpo con muchos miembros sin distinciones.", detalle: "La iglesia es un cuerpo con muchos miembros, llamados de todas las naciones, tribus, lenguas, y pueblos. En Cristo somos una nueva creacion; las distinciones de raza, cultura, nacionalidad no deben ser divisorias entre nosotros. Todos somos iguales en Cristo." },
    { num: 15, cat: "IGLESIA", titulo: "Bautismo", icono: "??", ref: "Mat 28:19; Rom 6:1-6", resumen: "Simbolo de union con Cristo y perdon de pecados.", detalle: "Por el bautismo confesamos nuestra fe en la muerte y resurreccion de Jesucristo, y damos testimonio de nuestra muerte al pecado. Es un simbolo de nuestra union con Cristo, el perdon de nuestros pecados y la recepcion del Espiritu Santo. Es por inmersion en el agua." },
    { num: 16, cat: "IGLESIA", titulo: "La Cena del Senor", icono: "??", ref: "1 Cor 11:23-30; Juan 13:1-17", resumen: "Participacion en los emblemas del sacrificio de Cristo.", detalle: "La Cena del Senor es una participacion en los emblemas del cuerpo y la sangre de Jesus como expresion de la fe en El. La preparacion incluye el auto-examen, el arrepentimiento y la confesion. El Maestro ordeno el servicio del lavado de pies para significar una renovada limpieza y humildad de Cristo." },
    { num: 17, cat: "VIDA DIARIA", titulo: "Dones y Ministerios Espirituales", icono: "??", ref: "1 Cor 12:7-11; Ef 4:11", resumen: "Habilidades otorgadas por el Espiritu para el servicio.", detalle: "Dios otorga a todos los miembros de su iglesia los dones espirituales que cada miembro debe emplear en un ministerio amoroso para el bienestar general de la iglesia y de la humanidad. Los dones incluyen ministerios como la fe, la sanacion, la profecia, la proclamacion, la ensenanza, la administracion y el servicio abnegado." },
    { num: 18, cat: "VIDA DIARIA", titulo: "El Don de la Profecia", icono: "??", ref: "Apoc 12:17; 19:10", resumen: "Autoridad profetica manifestada en Ellen G. White.", detalle: "Las Escrituras testifican que uno de los dones del Espiritu Santo es la profecia. Este don es una marca identificadora de la iglesia remanente y creemos que se manifesto en el ministerio de Ellen G. White. Sus escritos hablan con autoridad profetica y proveen consuelo, guia, instruccion, y correccion a la iglesia." },
    { num: 19, cat: "VIDA DIARIA", titulo: "La Ley de Dios", icono: "??", ref: "Ex 20:1-17; Rom 8:3-4", resumen: "Los Diez Mandamientos como expresion del amor divino.", detalle: "Los grandes principios de la ley de Dios estan encarnados en los Diez Mandamientos y ejemplificados en la vida de Cristo. Expresan el amor, la voluntad y los propositos de Dios en relacion con la conducta humana. Son la base del pacto de Dios y la norma en el juicio. La salvacion es enteramente por gracia." },
    { num: 20, cat: "VIDA DIARIA", titulo: "El Sabado", icono: "???", ref: "Gen 2:1-3; Ex 20:8-11", resumen: "Memorial perpetuo de la Creacion y Redencion.", detalle: "El amable Creador, despues de los seis dias de la Creacion, descanso en el septimo dia e instituyo el Sabado para todas las personas como un memorial de la Creacion. El cuarto mandamiento requiere la observancia del septimo dia como dia de descanso, adoracion y ministerio. Su alegre observancia es de tarde a tarde." },
    { num: 21, cat: "VIDA DIARIA", titulo: "Mayordoma", icono: "??", ref: "Mal 3:8-12; 2 Cor 9:7", resumen: "Administradores fieles del tiempo y recursos de Dios.", detalle: "Somos los mayordomos de Dios, a quienes El ha confiado tiempo y oportunidades, habilidades y posesiones. Somos responsables ante El por su uso apropiado. Reconocemos la propiedad de Dios por medio del servicio fiel y devolviendo el diezmo y dando ofrendas para la proclamacion de su evangelio." },
    { num: 22, cat: "VIDA DIARIA", titulo: "Conducta Cristiana", icono: "??", ref: "1 Cor 6:19-20; Rom 12:1-2", resumen: "Viviendo en armonia con los principios biblicos.", detalle: "Estamos llamados a ser un pueblo santo que piensa, siente, y actua en armonia con los principios biblicos. Nos involucramos solo en aquellas cosas que produciran la pureza, la salud y la alegria de Cristo. Como nuestros cuerpos son templos del Espiritu Santo, debemos cuidarlos inteligentemente con dieta saludable." },
    { num: 23, cat: "VIDA DIARIA", titulo: "El Matrimonio y la Familia", icono: "??", ref: "Gen 2:18-25; Mat 19:3-9", resumen: "Union de por vida establecida por Dios.", detalle: "El matrimonio fue divinamente establecido en el Eden y afirmado por Jesus como una union de por vida entre un hombre y una mujer. El amor mutuo, el honor y el respeto son el tejido de esta relacion. Los padres deben educar a sus hijos en el amor al Senor." },
    { num: 24, cat: "RESTAURACION", titulo: "Ministerio de Cristo en el Santuario Celestial", icono: "?????", ref: "Dan 8:14; Heb 8:1-5", resumen: "Juicio investigador iniciado en 1844.", detalle: "Hay un santuario en el cielo donde Cristo ministra en nuestro nombre. En 1844, al final del periodo profetico de 2300 dias, entro en la segunda y ultima fase de su ministerio expiatorio. Es un trabajo de juicio investigativo que revela quienes entre los muertos y los vivos permanecen en Cristo." },
    { num: 25, cat: "RESTAURACION", titulo: "La Segunda Venida de Cristo", icono: "??", ref: "Juan 14:1-3; 1 Tes 4:13-18", resumen: "El gran climax del evangelio y esperanza de la iglesia.", detalle: "La segunda venida de Cristo es la bendita esperanza de la iglesia. La venida del Salvador sera literal, personal, visible y mundial. Cuando regrese, los justos muertos resucitaran, y junto con los justos vivos seran glorificados y llevados al cielo. El cumplimiento de la profecia indica que la venida de Cristo esta cerca." },
    { num: 26, cat: "RESTAURACION", titulo: "Muerte y Resurreccion", icono: "?", ref: "Ecl 9:5; 1 Cor 15:51-54", resumen: "Estado inconsciente hasta la glorificacion final.", detalle: "La paga del pecado es la muerte. Pero Dios concedera la vida eterna a sus redimidos. Hasta ese dia la muerte es un estado inconsciente para todas las personas. Cuando Cristo aparezca, los justos resucitados y los justos vivos seran glorificados y arrebatados al encuentro de su Senor." },
    { num: 27, cat: "RESTAURACION", titulo: "El Milenio y el Fin del Pecado", icono: "??", ref: "Apoc 20; 21:1-5", resumen: "Reinado de mil anos y erradicacion del mal.", detalle: "El milenio es el reino de mil anos de Cristo con sus santos en el cielo entre la primera y la segunda resurreccion. Al final, la Ciudad Santa descendera y el fuego de Dios limpiara la tierra, liberando al universo del pecado para siempre." },
    { num: 28, cat: "RESTAURACION", titulo: "La Nueva Tierra", icono: "??", ref: "Isa 65:17-25; Apoc 21:1-7", resumen: "Hogar eterno de los redimidos en presencia de Dios.", detalle: "En la nueva tierra, en la que habita la justicia, Dios proveera un hogar eterno para los redimidos. Alli Dios mismo morara con su pueblo, y el sufrimiento y la muerte habran pasado. La gran controversia terminara, y el pecado ya no existira. Todas las cosas declararan que Dios es amor." }
];

const IGLESIA_DOCTRINAS_INTROS = {
    "DIOS": "Nuestro Dios Creador es amor, poder y esplendor. El es tres en uno, misterioso e infinito, y sin embargo desea una conexion intima con la humanidad.",
    "HUMANIDAD": "Amorosamente disenados como seres perfectos, Dios creo a los humanos a su propia imagen. Pero el pecado se colo. Afortunadamente, Dios tenia un plan para redimirnos.",
    "SALVACION": "Satanas acuso a Dios de ser injusto. Pero Dios demostro cuanto nos ama enviando a su propio Hijo, Jesucristo, a morir en nuestro lugar.",
    "IGLESIA": "Jesus comisiono a sus seguidores para contar a otros sobre su amor. Dios nos da el privilegio de ser parte de su ministerio.",
    "VIDA DIARIA": "La ley de Dios nos muestra el camino a seguir. Responder a su llamada significa ser administradores de la tierra y cuidar de nuestras mentes y cuerpos.",
    "RESTAURACION": "Antes de la Segunda Venida, Dios esta investigando toda la tierra. Disfrutaremos de un milenio en el cielo y la restauracion de nuestra tierra al paraiso que una vez fue."
};

function renderDoctrinas28Iglesia() {
    const contenedor = document.getElementById('pantalla-estudio');
    const categorias = ["DIOS", "HUMANIDAD", "SALVACION", "IGLESIA", "VIDA DIARIA", "RESTAURACION"];

    contenedor.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#130f2e,#0d0a22);font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(162,155,254,0.3);">
                <button onclick="renderModuloIglesia()" style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.3);color:#a29bfe;padding:8px 15px;border-radius:8px;font-weight:900;cursor:pointer;">&#8592; MODULO</button>
                <div>
                    <div style="color:#a29bfe;font-weight:900;letter-spacing:2px;font-size:0.9rem;">???? 28 DOCTRINAS</div>
                    <div style="color:rgba(255,255,255,0.4);font-size:0.65rem;letter-spacing:1px;">CREENCIAS FUNDAMENTALES ADVENTISTAS</div>
                </div>
            </div>

            <div style="padding:20px;max-width:750px;margin:0 auto;">
                <p style="color:rgba(255,255,255,0.35);text-align:center;font-size:0.8rem;margin:0 0 30px;">Toca cualquier doctrina para leerla completa</p>

                ${categorias.map(cat => `
                    <div style="margin-bottom:35px;">
                        <div style="background:rgba(162,155,254,0.05);border-left:4px solid #a29bfe;padding:18px;border-radius:10px;margin-bottom:15px;">
                            <h2 style="color:#a29bfe;font-size:1rem;letter-spacing:3px;margin:0 0 8px;">${cat}</h2>
                            <p style="color:rgba(255,255,255,0.55);font-size:0.82rem;line-height:1.5;margin:0;">${IGLESIA_DOCTRINAS_INTROS[cat] || ""}</p>
                        </div>
                        <div style="display:grid;gap:10px;">
                            ${IGLESIA_DOCTRINAS.filter(d => d.cat === cat).map(d => `
                                <div onclick="abrirDoctrinaIglesia(${d.num})"
                                    style="background:rgba(255,255,255,0.03);border:1px solid rgba(162,155,254,0.12);border-radius:12px;padding:18px;cursor:pointer;transition:0.3s;"
                                    onmouseover="this.style.borderColor='rgba(162,155,254,0.35)';this.style.background='rgba(255,255,255,0.06)'"
                                    onmouseout="this.style.borderColor='rgba(162,155,254,0.12)';this.style.background='rgba(255,255,255,0.03)'">
                                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                                        <span style="background:rgba(162,155,254,0.15);color:#a29bfe;width:30px;height:30px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.78rem;flex-shrink:0;">${d.num}</span>
                                        <span style="font-size:1.3rem;">${d.icono}</span>
                                        <h3 style="color:#fff;font-size:0.92rem;margin:0;">${d.titulo}</h3>
                                    </div>
                                    <p style="color:rgba(255,255,255,0.65);font-size:0.83rem;line-height:1.6;margin:0 0 10px;">${d.resumen}</p>
                                    <div style="display:flex;justify-content:space-between;align-items:center;">
                                        <span style="color:#a29bfe;font-size:0.72rem;font-weight:700;">?? ${d.ref}</span>
                                        <span style="color:#a29bfe;font-size:0.75rem;font-weight:900;">LEER ?</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}

                <div style="text-align:center;padding:20px;background:rgba(212,175,55,0.05);border-radius:15px;border:1px dashed rgba(212,175,55,0.2);">
                    <p style="color:#d4af37;font-size:0.82rem;margin:0;">"Y estas palabras que yo te mando hoy, estaran sobre tu corazon..." ? Deuteronomio 6:6</p>
                </div>
            </div>
        </div>

        <!-- PANEL DOCTRINA DETALLE -->
        <div id="doctrina-panel-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;overflow-y:auto;padding:20px;box-sizing:border-box;" onclick="cerrarDoctrinaPanel(event)">
            <div id="doctrina-panel-card" style="background:linear-gradient(170deg,#130f2e,#0d0a22);border:1px solid rgba(162,155,254,0.3);border-radius:20px;max-width:700px;margin:0 auto;padding:30px;position:relative;">
                <button onclick="cerrarDoctrinaPanel(null,true)" style="position:absolute;top:15px;right:15px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:1rem;">?</button>
                <div id="doctrina-panel-num" style="color:#a29bfe;font-size:0.7rem;letter-spacing:3px;margin-bottom:8px;">DOCTRINA N°</div>
                <h2 id="doctrina-panel-titulo" style="color:#fff;margin:0 0 20px;font-size:1.3rem;"></h2>
                <div id="doctrina-panel-cuerpo" style="color:rgba(255,255,255,0.8);line-height:1.85;font-size:0.95rem;"></div>
                <div id="doctrina-panel-ref" style="margin-top:20px;padding-top:15px;border-top:1px solid rgba(162,155,254,0.2);color:#a29bfe;font-size:0.8rem;"></div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function abrirDoctrinaIglesia(num) {
    const d = IGLESIA_DOCTRINAS.find(x => x.num === num);
    if (!d) return;
    document.getElementById('doctrina-panel-num').innerText = 'DOCTRINA N° ' + d.num + ' ? ' + d.cat;
    document.getElementById('doctrina-panel-titulo').innerText = d.icono + ' ' + d.titulo;
    document.getElementById('doctrina-panel-cuerpo').innerText = d.detalle;
    document.getElementById('doctrina-panel-ref').innerText = '?? Referencias: ' + d.ref;
    document.getElementById('doctrina-panel-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarDoctrinaPanel(event, forzar) {
    if (forzar || (event && event.target === document.getElementById('doctrina-panel-overlay'))) {
        document.getElementById('doctrina-panel-overlay').style.display = 'none';
        document.body.style.overflow = '';
    }
}


// ===============================================
// COMPARTIR Y DESCARGAR PDF DE LITURGIA
// ===============================================

function compartirLiturgiaTexto(id) {
    var registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    var reg = registros.find(function (r) { return r.id === id; });
    if (!reg) return;
    var f = reg.fecha.split('-').reverse().join('/');
    var t = '? *IGLESIA ADVENTISTA CYPRESS HILLS*\n' +
        '?? *PROGRAMA DE CULTO*\n?? *' + f + '*\n' +
        '???????????????\n\n' +
        '1?? *Doxología:* ' + (reg.doxologia || '-') + '\n' +
        '2?? *Invocación:* ' + (reg.invocacion || '-') + '\n' +
        '3?? *Bienvenida:* ' + (reg.bienvenida || '-') + '\n' +
        '4?? *Rincón Infantil:* ' + (reg.infantil || '-') + '\n' +
        '5?? *Diezmos y Ofrendas:* ' + (reg.ofrendas || '-') + '\n' +
        '6?? *Himno de Adoración:* ' + (reg.himnoAdoracion || '-') + '\n' +
        '7?? *Lectura Bíblica:* ' + (reg.lectura || '-') + '\n' +
        '8?? *Oración Intercesora:* ' + (reg.oracion || '-') + '\n' +
        '9?? *Música Especial:* ' + (reg.musica || '-') + '\n' +
        '?? *Tema / Predicador:* ' + (reg.tema || '-') + '\n' +
        '1??1?? *Himno Final:* ' + (reg.himnoFinal || '-') + '\n' +
        '1??2?? *Oración Final:* ' + (reg.oracionFinal || '-') + '\n\n' +
        '???????????????\n_Generado por Legado Bíblico_';
    if (navigator.share) {
        navigator.share({ title: 'Programa Culto - Cypress Hills - ' + f, text: t }).catch(function () { });
    } else {
        navigator.clipboard?.writeText(t).then(function () {
            if (typeof mostrarToast === 'function') mostrarToast('? Liturgia copiada al portapapeles');
        });
    }
}

function descargarLiturgiaPDF(id) {
    var registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    var reg = registros.find(function (r) { return r.id === id; });
    if (!reg) return;
    var f = reg.fecha.split('-').reverse().join('/');
    var iglesia = 'IGLESIA ADVENTISTA CYPRESS HILLS';
    var cargar = function () {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();

        // === HEADER ELEGANTE ===
        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, 210, 50, 'F');
        // Línea decorativa dorada
        doc.setFillColor(253, 203, 110);
        doc.rect(0, 50, 210, 2, 'F');

        doc.setTextColor(253, 203, 110);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(iglesia, 105, 17, { align: 'center' });

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text('PROGRAMA DE CULTO', 105, 30, { align: 'center' });

        doc.setTextColor(200, 195, 240);
        doc.setFontSize(11);
        doc.text('Fecha: ' + f, 105, 42, { align: 'center' });

        // === DOS COLUMNAS - DISEÑO LEGIBLE ===
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

        var colIzq = 18;
        var colDer = 112;
        var anchoCol = 82;
        var yBase = 64;
        var alturaCampo = 28;

        // Función para dibujar un campo
        function dibujarCampo(x, y, titulo, valor, esTema) {
            // Fondo del campo
            if (esTema) {
                doc.setFillColor(255, 245, 215);
                doc.roundedRect(x - 3, y - 5, anchoCol + 6, alturaCampo - 2, 3, 3, 'F');
                doc.setDrawColor(220, 170, 50);
                doc.setLineWidth(0.8);
                doc.roundedRect(x - 3, y - 5, anchoCol + 6, alturaCampo - 2, 3, 3, 'S');
            } else {
                doc.setFillColor(248, 246, 255);
                doc.roundedRect(x - 3, y - 5, anchoCol + 6, alturaCampo - 2, 3, 3, 'F');
                doc.setDrawColor(220, 215, 245);
                doc.setLineWidth(0.3);
                doc.roundedRect(x - 3, y - 5, anchoCol + 6, alturaCampo - 2, 3, 3, 'S');
            }

            // TITULO - Grande y colorido
            doc.setFont('helvetica', 'bold');
            if (esTema) {
                doc.setFontSize(11);
                doc.setTextColor(180, 120, 0);
            } else {
                doc.setFontSize(10);
                doc.setTextColor(90, 60, 200);
            }
            doc.text(titulo, x, y + 3);

            // VALOR - Negro grande y claro
            doc.setFont('helvetica', 'bold');
            if (esTema) {
                doc.setFontSize(14);
                doc.setTextColor(120, 80, 0);
            } else {
                doc.setFontSize(13);
                doc.setTextColor(20, 20, 40);
            }
            doc.text(String(valor || '-'), x, y + 15);
        }

        // Columna IZQUIERDA (campos 1-6)
        for (var i = 0; i < 6; i++) {
            dibujarCampo(colIzq, yBase + i * alturaCampo, campos[i][0], campos[i][1], false);
        }

        // Columna DERECHA (campos 7-12)
        for (var i = 6; i < 12; i++) {
            var esTema = (i === 9);
            dibujarCampo(colDer, yBase + (i - 6) * alturaCampo, campos[i][0], campos[i][1], esTema);
        }

        // Línea vertical separadora
        doc.setDrawColor(200, 195, 235);
        doc.setLineWidth(0.4);
        doc.line(108, yBase - 8, 108, yBase + 6 * alturaCampo - 5);

        // === FOOTER ===
        doc.setFontSize(8);
        doc.setTextColor(170, 170, 185);
        doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico', 105, 280, { align: 'center' });

        // === COMPARTIR O DESCARGAR ===
        var blob = doc.output('blob');
        var fileName = 'Programa_Culto_' + reg.fecha + '.pdf';
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: 'application/pdf' })] })) {
            var file = new File([blob], fileName, { type: 'application/pdf' });
            navigator.share({
                title: 'Programa de Culto - Cypress Hills - ' + f,
                text: 'Programa de Culto del ' + f,
                files: [file]
            }).catch(function () { doc.save(fileName); });
        } else {
            doc.save(fileName);
        }
        if (typeof mostrarToast === 'function') mostrarToast('PDF generado!');
    };
    if (window.jspdf) { cargar(); } else {
        var s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        s.onload = cargar;
        s.onerror = function () { alert('Error cargando PDF. Verifica conexion.'); };
        document.head.appendChild(s);
    }
}

// ===============================================
// PDF PROFESIONAL PARA REGISTRO DE CULTOS
// ===============================================
window.descargarCultoPDF = function(id) {
    var historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    var reg = historial.find(function(h) { return h.id === id; });
    if (!reg) return;
    var fechaF = formatearFechaCulto(reg.fecha);
    var iglesia = 'IGLESIA ADVENTISTA DEL SEPTIMO DIA';
    var subIglesia = 'CYPRESS HILLS - BROOKLYN, NY';
    function generarPDF() {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF('p', 'mm', 'letter');
        var W = 216, H = 279;
        doc.setFillColor(15, 12, 35); doc.rect(0, 0, W, 52, 'F');
        doc.setFillColor(253, 203, 110); doc.rect(0, 52, W, 1.5, 'F');
        doc.setFillColor(253, 203, 110); doc.rect(W/2 - 0.8, 6, 1.6, 12, 'F'); doc.rect(W/2 - 5, 10, 10, 1.6, 'F');
        doc.setTextColor(253, 203, 110); doc.setFontSize(13); doc.setFont('helvetica', 'bold');
        doc.text(iglesia, W/2, 26, { align: 'center' });
        doc.setFontSize(9); doc.setTextColor(200, 195, 240); doc.text(subIglesia, W/2, 33, { align: 'center' });
        doc.setFontSize(12); doc.setTextColor(255, 255, 255); doc.text('CULTO DE ' + (reg.tipo || '').toUpperCase(), W/2, 42, { align: 'center' });
        doc.setFontSize(9); doc.setTextColor(180, 175, 210); doc.text(fechaF, W/2, 48, { align: 'center' });
        var yStart = 62, mx = 12, aT = W - mx * 2, cW = (aT - 8) / 3;
        var cX = [mx, mx + cW + 4, mx + (cW + 4) * 2];
        var col1 = [], col2 = [], col3 = [];
        if (reg.anciano) col1.push({ t: 'ANCIANO DE TURNO', v: reg.anciano, e: true });
        col1.push({ t: 'BIENVENIDA', v: reg.bienvenida || '-' });
        col1.push({ t: 'PRIMERA ORACION', v: reg.oracion1 || '-' });
        col1.push({ t: 'HIMNO APERTURA', v: reg.himno1 ? (reg.himno1 + (reg.himno1_titulo ? '\n' + reg.himno1_titulo : '')) : '-' });
        col1.push({ t: 'LECTURA BIBLICA', v: reg.lectura || '-' });
        col2.push({ t: 'LECTURA BIBLICA', v: reg.lectura_quien || '-' });
        col2.push({ t: 'PARTE ESPECIAL', v: reg.especial || '-' });
        if (reg.especial_desc) col2.push({ t: 'DESCRIPCION', v: reg.especial_desc });
        col2.push({ t: 'ORACION INTERCESORA', v: reg.intercesora || '-' });
        col2.push({ t: 'ENC. DE SONIDO', v: reg.sonido || '-' });
        col3.push({ t: 'PREDICADOR/A', v: reg.predicador || '-', e: true });
        if (reg.pred_tema) col3.push({ t: 'TEMA', v: '"' + reg.pred_tema + '"' });
        if (reg.pred_texto) col3.push({ t: 'TEXTO BASE', v: reg.pred_texto });
        col3.push({ t: 'HIMNO FINAL', v: reg.himno2 ? (reg.himno2 + (reg.himno2_titulo ? '\n' + reg.himno2_titulo : '')) : '-' });
        if (reg.himno2_quien) col3.push({ t: 'ANUNCIA HIMNO', v: reg.himno2_quien });
        col3.push({ t: 'ORACION FINAL', v: reg.oracion_final || '-' });
        doc.setFontSize(10); doc.setTextColor(90, 60, 200); doc.setFont('helvetica', 'bold');
        doc.text('PROGRAMA DEL SERVICIO', W/2, yStart - 4, { align: 'center' });
        doc.setDrawColor(200, 195, 235); doc.setLineWidth(0.3); doc.line(mx, yStart - 1, W - mx, yStart - 1);
        yStart += 4;
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(253, 203, 110);
        var hdrs = ['INICIO DEL CULTO', 'DESARROLLO', 'PREDICACION Y CIERRE'];
        for (var h = 0; h < 3; h++) { doc.setFillColor(30, 25, 55); doc.roundedRect(cX[h], yStart - 4, cW, 7, 2, 2, 'F'); doc.text(hdrs[h], cX[h] + cW/2, yStart, { align: 'center' }); }
        yStart += 6;
        function dibujarCol(campos, x, yI) {
            var y = yI;
            for (var i = 0; i < campos.length; i++) {
                var c = campos[i], lv = String(c.v).split('\n'), alto = 22 + (lv.length > 1 ? 6 : 0);
                if (c.e) { doc.setFillColor(255, 248, 225); doc.roundedRect(x, y, cW, alto, 3, 3, 'F'); doc.setDrawColor(253, 203, 110); doc.setLineWidth(0.6); doc.roundedRect(x, y, cW, alto, 3, 3, 'S'); }
                else { doc.setFillColor(248, 247, 255); doc.roundedRect(x, y, cW, alto, 3, 3, 'F'); doc.setDrawColor(230, 225, 250); doc.setLineWidth(0.2); doc.roundedRect(x, y, cW, alto, 3, 3, 'S'); }
                doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5); doc.setTextColor(c.e ? 180 : 110, c.e ? 120 : 80, c.e ? 0 : 200); doc.text(c.t, x + 4, y + 6);
                doc.setFont('helvetica', 'bold'); doc.setFontSize(c.e ? 10 : 9); doc.setTextColor(c.e ? 120 : 30, c.e ? 80 : 30, c.e ? 0 : 50);
                for (var li = 0; li < lv.length; li++) { var tx = lv[li]; if (tx.length > 22) tx = tx.substring(0, 21) + '...'; doc.text(tx, x + 4, y + 13 + (li * 5)); }
                y += alto + 3;
            }
        }
        dibujarCol(col1, cX[0], yStart); dibujarCol(col2, cX[1], yStart); dibujarCol(col3, cX[2], yStart);
        if (reg.obs) {
            doc.setFillColor(245, 245, 250); doc.roundedRect(mx, 235, aT, 14, 3, 3, 'F');
            doc.setDrawColor(220, 215, 245); doc.setLineWidth(0.3); doc.roundedRect(mx, 235, aT, 14, 3, 3, 'S');
            doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(110, 80, 200); doc.text('OBSERVACIONES', mx + 5, 240);
            doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(50, 50, 70);
            doc.text((reg.obs.length > 100 ? reg.obs.substring(0, 97) + '...' : reg.obs), mx + 5, 246);
        }
        doc.setDrawColor(230, 225, 250); doc.setLineWidth(0.3); doc.line(mx, H - 18, W - mx, H - 18);
        doc.setFontSize(7); doc.setTextColor(160, 155, 185); doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico  |  ' + iglesia, W/2, H - 12, { align: 'center' });
        var blob = doc.output('blob');
        var fN = 'Culto_' + (reg.tipo || 'Registro') + '_' + reg.fecha + '.pdf';
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], fN, { type: 'application/pdf' })] })) {
            navigator.share({ title: 'Registro de Culto', files: [new File([blob], fN, { type: 'application/pdf' })] }).catch(function() { doc.save(fN); });
        } else { doc.save(fN); }
        if (typeof mostrarToast === 'function') mostrarToast('PDF generado!');
    }
    if (window.jspdf) { generarPDF(); } else {
        var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        s.onload = generarPDF; s.onerror = function() { alert('Error cargando PDF.'); }; document.head.appendChild(s);
    }
};

// ===============================================
// PLANTILLA COMO IMAGEN PNG - COMPARTIR DIRECTO
// ===============================================
window.compartirCultoPlantilla = function(id) {
    // ============================================================
    // PLANTILLA CON CANVAS 2D NATIVO — SIN html2canvas
    // Funciona correctamente en móvil (iOS/Android)
    // ============================================================
    var historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    var reg = historial.find(function(h) { return h.id === id; });
    if (!reg) return;
    if (typeof mostrarToast === 'function') mostrarToast('Generando imagen...');

    var esSab = (reg.tipo === 'Sábado');
    var tipo  = (reg.tipo || 'Culto').toUpperCase();
    var fechaF = (typeof formatearFechaCulto === 'function') ? formatearFechaCulto(reg.fecha) : reg.fecha;

    // Color principal según tipo de día
    var colorMap = {
        'Domingo':   '#ff6b6b',
        'Lunes':     '#74b9ff',
        'Martes':    '#55efc4',
        'Miércoles': '#a29bfe',
        'Jueves':    '#fdcb6e',
        'Viernes':   '#fd79a8',
        'Sábado':    '#f9ca24',
        'Especial':  '#00cec9'
    };
    var C = colorMap[reg.tipo] || '#a29bfe';

    function hexRgb(hex) {
        var h = (hex || '#888888').replace('#','');
        if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
        return [parseInt(h.slice(0,2),16)||128, parseInt(h.slice(2,4),16)||128, parseInt(h.slice(4,6),16)||128];
    }
    function rr(ctx, x, y, w, h, r) {
        if (typeof r === 'number') r = [r,r,r,r];
        ctx.beginPath();
        ctx.moveTo(x+r[0], y);
        ctx.lineTo(x+w-r[1], y); ctx.arcTo(x+w, y, x+w, y+r[1], r[1]);
        ctx.lineTo(x+w, y+h-r[2]); ctx.arcTo(x+w, y+h, x+w-r[2], y+h, r[2]);
        ctx.lineTo(x+r[3], y+h); ctx.arcTo(x, y+h, x, y+h-r[3], r[3]);
        ctx.lineTo(x, y+r[0]); ctx.arcTo(x, y, x+r[0], y, r[0]);
        ctx.closePath();
    }

    var cRGB = hexRgb(C);
    var cR = cRGB[0], cG = cRGB[1], cB = cRGB[2];

    var W = 1080, PAD = 44, GAP = 8;
    var LBL_FONT = 'bold 26px Arial,sans-serif';
    var VAL_FONT = 'bold 30px Arial,sans-serif';
    var LBL_H = 30, VAL_H = 36;
    var CAMPOw = W - PAD*2 - 16;

    // Medir texto
    var mCvs = document.createElement('canvas');
    var mCtx = mCvs.getContext('2d');
    function splitLines(txt, font, maxW) {
        mCtx.font = font;
        var words = String(txt||'').split(' '), lines = [], cur = '';
        words.forEach(function(w) {
            var t = cur ? cur+' '+w : w;
            if (mCtx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; }
            else cur = t;
        });
        if (cur) lines.push(cur);
        return lines.length ? lines : [''];
    }

    // Construir lista de filas: { label, value } segun tipo de culto
    var filas = [];
    if (esSab) {
        var f = function(l,v){ if(v) filas.push({label:l, value:v}); };
        f('Anciano de turno', reg.sab_anciano_tipo ? reg.sab_anciano_tipo+': '+(reg.sab_anciano||'') : reg.sab_anciano);
        f('0. Llamado adoración', reg.sab_llamado);
        f('1. Doxología', reg.sab_doxologia);
        f('2. Invocación', reg.sab_invocacion);
        f('3. Bienvenida', reg.sab_bienvenida);
        f('Anuncia rincón inf.', reg.sab_infantil_anuncia);
        f('4. Rincón Infantil', reg.sab_infantil);
        f('5. Diezmos y Ofrendas', reg.sab_ofrendas);
        f('Anuncia himno', reg.sab_himno_anuncia);
        f('6. Himno Adoración', reg.sab_himno6);
        f('Lector', reg.sab_lectura_quien);
        f('7. Lectura Bíblica', reg.sab_lectura);
        f('8. Oración Intercesora', reg.sab_oracion_intercesora);
        f('9. Música Especial', reg.sab_musica_especial);
        f('Presenta predicador', reg.sab_pred_anuncia);
        f('10. Predicador/a', reg.sab_predicador);
        f('Tema', reg.sab_tema ? '"'+reg.sab_tema+'"' : '');
        f('Anuncia himno final', reg.sab_himno_final_quien);
        f('11. Himno Final', reg.sab_himno_final);
        f('12. Oración Final', reg.sab_oracion_final);
        f('Sonido', reg.sab_sonido);
        f('Observaciones', reg.sab_obs);
    } else {
        var g = function(l,v){ if(v) filas.push({label:l, value:v}); };
        g('Anciano de turno', reg.anciano);
        g('Bienvenida', reg.bienvenida);
        g('1ra Oración', reg.oracion1);
        g('Anuncia himno', reg.himno1_quien);
        var h1 = reg.himno1 ? ('#'+reg.himno1+(reg.himno1_titulo?' — '+reg.himno1_titulo:'')) : '';
        g('Himno apertura', h1);
        g('Lectura Bíblica', reg.lectura);
        g('Lector', reg.lectura_quien);
        g('Parte especial', reg.especial);
        g('Descripción', reg.especial_desc);
        g('Oración intercesora', reg.intercesora);
        g('Presenta predicador', reg.pred_anuncia);
        g('Predicador/a', reg.predicador);
        g('Tema', reg.pred_tema ? '"'+reg.pred_tema+'"' : '');
        g('Texto base', reg.pred_texto);
        var h2 = reg.himno2 ? ('#'+reg.himno2+(reg.himno2_titulo?' — '+reg.himno2_titulo:'')) : '';
        g('Himno final', h2);
        g('Anuncia himno final', reg.himno2_quien);
        g('Oración final', reg.oracion_final);
        g('Sonido', reg.sonido);
        g('Observaciones', reg.obs);
    }

    // Pre-calcular altura
    var HDR_H = 195, FOOTER_H = 65;
    var bodyH = 0;
    filas.forEach(function(f) {
        var lines = splitLines(f.value, VAL_FONT, CAMPOw);
        bodyH += LBL_H + lines.length * VAL_H + 14 + GAP;
    });
    if (filas.length === 0) bodyH = 120;
    var H = HDR_H + bodyH + FOOTER_H + 20;

    var canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext('2d');

    // FONDO
    var bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'rgb('+Math.round(cR*0.12)+','+Math.round(cG*0.10)+','+Math.round(cB*0.18)+')');
    bg.addColorStop(1,'rgb(8,5,20)');
    ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

    // Borde izquierdo
    ctx.fillStyle = C; ctx.fillRect(0,0,7,H);

    // Header
    var hdr = ctx.createLinearGradient(0,0,W,HDR_H);
    hdr.addColorStop(0,'rgba('+cR+','+cG+','+cB+',0.28)');
    hdr.addColorStop(1,'rgba('+cR+','+cG+','+cB+',0.04)');
    ctx.fillStyle = hdr; ctx.fillRect(0,0,W,HDR_H);

    // Nombre iglesia
    ctx.textAlign='center'; ctx.fillStyle='rgba(255,255,255,0.88)';
    ctx.font='bold 28px Arial,sans-serif';
    ctx.fillText('IGLESIA ADVENTISTA CYPRESS HILLS', W/2, 46);
    ctx.strokeStyle='rgba('+cR+','+cG+','+cB+',0.5)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(W/2-230,54); ctx.lineTo(W/2+230,54); ctx.stroke();

    // Tipo de culto
    ctx.fillStyle='#ffffff'; ctx.font='bold 56px Arial,sans-serif';
    ctx.fillText('CULTO DE '+tipo, W/2, 115);

    // Fecha
    ctx.fillStyle='rgba('+cR+','+cG+','+cB+',0.9)';
    ctx.font='bold 28px Arial,sans-serif';
    ctx.fillText(fechaF, W/2, 158);

    // Separador
    ctx.strokeStyle='rgba('+cR+','+cG+','+cB+',0.3)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(PAD,HDR_H-6); ctx.lineTo(W-PAD,HDR_H-6); ctx.stroke();

    ctx.textAlign='left';
    var y = HDR_H + 14;
    var barraIdx = 0;

    if (filas.length === 0) {
        ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='bold 28px Arial,sans-serif'; ctx.textAlign='center';
        ctx.fillText('Sin datos registrados', W/2, y+50);
        ctx.textAlign='left';
    }

    filas.forEach(function(fila) {
        var lines = splitLines(fila.value, VAL_FONT, CAMPOw);
        var cardH = LBL_H + lines.length*VAL_H + 14;
        var esTema = (fila.label === 'Tema');

        // Fondo tarjeta
        ctx.fillStyle = esTema ? 'rgba(212,175,55,0.12)' : 'rgba('+cR+','+cG+','+cB+',0.06)';
        rr(ctx,PAD,y,W-PAD*2,cardH,12); ctx.fill();

        // Borde izquierdo alternado
        ctx.fillStyle = esTema ? '#d4af37' : (barraIdx%2===0 ? C : '#ffffff');
        rr(ctx,PAD,y,6,cardH,[12,0,0,12]); ctx.fill();
        barraIdx++;

        // Label
        ctx.fillStyle = esTema ? 'rgba(212,175,55,0.95)' : 'rgba('+cR+','+cG+','+cB+',0.85)';
        ctx.font = LBL_FONT;
        ctx.fillText(fila.label.toUpperCase()+':', PAD+20, y+LBL_H-2);

        // Valor
        ctx.fillStyle = esTema ? '#ffe082' : '#ffffff';
        ctx.font = esTema ? 'bold 32px Arial,sans-serif' : VAL_FONT;
        lines.forEach(function(line, li) {
            ctx.fillText(line, PAD+20, y+LBL_H+VAL_H*(li+1)-2);
        });

        y += cardH + GAP;
    });

    // Footer
    ctx.fillStyle='rgba('+cR+','+cG+','+cB+',0.10)'; ctx.fillRect(0,H-FOOTER_H,W,FOOTER_H);
    ctx.fillStyle='rgba('+cR+','+cG+','+cB+',0.7)'; ctx.font='bold 22px Arial,sans-serif';
    ctx.fillText('Legado Biblico — Iglesia Adventista Cypress Hills — Brooklyn, NY', PAD, H-22);

    // Mostrar modal de vista previa
    canvas.toBlob(function(blob) {
        if (!blob) {
            if (typeof mostrarToast === 'function') mostrarToast('Error generando imagen');
            return;
        }
        var blobUrl = URL.createObjectURL(blob);
        var fN = 'Culto_'+(reg.tipo||'').replace(/[^a-zA-Z0-9]/g,'')+'_'+reg.fecha+'.png';

        var old = document.getElementById('culto-plantilla-preview');
        if (old) old.remove();

        var modal = document.createElement('div');
        modal.id = 'culto-plantilla-preview';
        modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.97);display:flex;flex-direction:column;align-items:center;';
        modal.innerHTML =
            '<div style="width:100%;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;">'
          +   '<div style="color:'+C+';font-weight:900;font-size:0.85rem;">✅ PLANTILLA LISTA</div>'
          +   '<button id="clt-close-prev" style="background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.7);padding:7px 14px;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:900;">✕ Cerrar</button>'
          + '</div>'
          + '<div style="flex:1;overflow-y:auto;width:100%;display:flex;justify-content:center;padding:10px 0;">'
          +   '<img src="'+blobUrl+'" style="max-width:100%;height:auto;display:block;">'
          + '</div>'
          + '<div style="width:100%;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:10px;border-top:1px solid rgba(255,255,255,0.08);flex-shrink:0;">'
          +   '<button id="clt-share-btn" style="padding:14px;background:linear-gradient(135deg,rgba('+cR+','+cG+','+cB+',0.3),rgba('+cR+','+cG+','+cB+',0.12));border:1.5px solid rgba('+cR+','+cG+','+cB+',0.6);color:'+C+';border-radius:14px;cursor:pointer;font-weight:900;font-size:0.9rem;">📤 Compartir</button>'
          +   '<button id="clt-save-btn" style="padding:14px;background:linear-gradient(135deg,rgba(116,185,255,0.3),rgba(116,185,255,0.12));border:1.5px solid rgba(116,185,255,0.5);color:#74b9ff;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.9rem;">💾 Guardar</button>'
          + '</div>';

        document.body.appendChild(modal);

        document.getElementById('clt-close-prev').onclick = function() {
            modal.remove(); URL.revokeObjectURL(blobUrl);
        };
        document.getElementById('clt-share-btn').onclick = function() {
            var file = new File([blob], fN, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ title: 'Culto de '+tipo, files: [file] })
                    .then(function() { modal.remove(); URL.revokeObjectURL(blobUrl); })
                    .catch(function(e) { if (e.name !== 'AbortError') window.open(blobUrl, '_blank'); });
            } else {
                window.open(blobUrl, '_blank');
            }
        };
        document.getElementById('clt-save-btn').onclick = function() {
            var a = document.createElement('a'); a.href = blobUrl; a.download = fN;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            if (typeof mostrarToast === 'function') mostrarToast('Guardando...');
        };

        if (typeof mostrarToast === 'function') mostrarToast('✅ ¡Lista! Toca Compartir o Guardar');
    }, 'image/png', 0.92);
};


