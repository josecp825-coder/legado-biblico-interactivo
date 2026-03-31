const fs = require('fs');

const content = `// ==========================================
// MÓDULO: CULTOS REGULARES (MIÉRCOLES Y VIERNES)
// ==========================================

// Variable global para modo edición
var regularEditandoId = null;

function renderCultosRegulares() {
    const contenedor = document.getElementById('pantalla-estudio');
    const hoyStr = new Date().toISOString().split('T')[0];

    contenedor.innerHTML = \`
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#0d1117,#0a0818);font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:15px;display:flex;align-items:center;gap:15px;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(136, 84, 208, 0.4);">
                <button onclick="renderModuloIglesia()" style="background:rgba(136, 84, 208, 0.15);border:1px solid #8854d0;color:#a55eea;padding:8px 15px;border-radius:8px;font-weight:900;">&#x2B05;&#xFE0F; VOLVER</button>
                <div style="flex:1;">
                    <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:0.9rem;">CULTOS SEMANALES</div>
                    <div style="color:#a55eea;font-size:0.6rem;letter-spacing:1px;font-weight:bold;">MIÉRCOLES Y VIERNES</div>
                </div>
            </div>

            <div style="padding:20px;max-width:700px;margin:0 auto;display:grid;gap:20px;">
                <div style="text-align:center;">
                    <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin:0;">Llene la información del servicio. Use el botón "Delegar" para enviar el formulario en blanco a la persona encargada.</p>
                </div>

                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(136, 84, 208, 0.3);padding:25px;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
                    <div style="display:grid;gap:15px;">
                        
                        <!-- CONFIGURACIÓN DEL DÍA -->
                        <div style="display:flex;gap:10px;">
                            <input type="date" id="reg-fecha" value="\${hoyStr}" style="flex:2;padding:12px;background:rgba(0,0,0,0.5);border:1px solid rgba(136, 84, 208, 0.5);color:#fff;border-radius:8px;outline:none;" required>
                            
                            <select id="reg-dia" onchange="actualizarVisibilidadTestimonios()" style="flex:1;padding:12px;background:rgba(0,0,0,0.5);border:1px solid rgba(136, 84, 208, 0.5);color:#fff;border-radius:8px;outline:none;font-weight:bold;">
                                <option value="miercoles">Miércoles</option>
                                <option value="viernes">Viernes</option>
                            </select>
                        </div>

                        <hr style="border:none;border-top:1px dashed rgba(255,255,255,0.1);margin:5px 0;">
                        <div style="color:#fed330;font-weight:bold;font-size:0.8rem;letter-spacing:1px;text-align:center;">👥 ANCIANO(S) DE TURNO</div>
                        
                        <input type="text" id="reg-anciano" placeholder="Anciano / Anciana de Turno (o Equipo)..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        <input type="text" id="reg-diacono" placeholder="Diácono de Turno..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        <input type="text" id="reg-diaconisa" placeholder="Diaconisa de Turno..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">

                        <hr style="border:none;border-top:1px dashed rgba(255,255,255,0.1);margin:5px 0;">
                        <div style="color:#a55eea;font-weight:bold;font-size:0.8rem;letter-spacing:1px;text-align:center;">📖 ORDEN DEL SERVICIO</div>

                        <div>
                            <label style="color:rgba(255,255,255,0.6);font-size:0.75rem;">1. Servicio de Alabanza (7:25 a 7:35 PM)</label>
                            <input type="text" id="reg-alabanza" placeholder="Encargado de Alabanza..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        </div>
                        <div>
                            <label style="color:rgba(255,255,255,0.6);font-size:0.75rem;">2. Bienvenida</label>
                            <input type="text" id="reg-bienvenida" placeholder="Nombre..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        </div>
                        <div>
                            <label style="color:rgba(255,255,255,0.6);font-size:0.75rem;">3. Oración Inicial</label>
                            <input type="text" id="reg-oracionIni" placeholder="Nombre..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        </div>
                        <div style="background:rgba(162,155,254,0.04);border:1.5px solid rgba(162,155,254,0.2);border-radius:10px;padding:12px;">
                            <label style="color:rgba(255,255,255,0.6);font-size:0.75rem;">4. Himno Inicial</label>
                            <input type="text" id="reg-himnoIni-quien" placeholder="¿Quién anuncia el himno?" style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;margin-bottom:8px;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                            <input type="text" id="reg-himnoIni" oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)" placeholder="Himno # o título..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fdcb6e;font-weight:bold;border-radius:8px;outline:none;">
                            <div id="himno-titulo-reg-himnoIni" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
                        </div>
                        <div style="background:rgba(162,155,254,0.04);border:1.5px solid rgba(162,155,254,0.2);border-radius:10px;padding:12px;">
<label style="color:#a29bfe;font-size:0.8rem;font-weight:bold;margin-bottom:8px;display:block;">5. Lectura Bíblica</label>
<label style="color:rgba(255,255,255,0.6);font-size:0.7rem;">👤 Lector (¿Quién lee la palabra?):</label>
<input type="text" id="reg-lectura-quien" placeholder="Nombre..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:2px;outline:none;margin-bottom:12px;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
<label style="color:#55efc4;font-size:0.7rem;">📖 Cita (Libro, Cap y Versículos):</label>
<div style="display:flex;gap:6px;margin-top:2px;">
                                <input type="text" id="reg-lectura-libro" placeholder="Ej: Juan" style="flex:2;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(162,155,254,0.3);color:#fff;border-radius:8px;outline:none;" oninput="if(typeof autocompleteBiblia==='function')autocompleteBiblia(this)">
                                <input type="number" id="reg-lectura-capitulo" placeholder="Cap." style="flex:1;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(162,155,254,0.3);color:#fff;border-radius:8px;outline:none;">
                                <input type="text" id="reg-lectura-versiculos" placeholder="Vers." style="flex:1;padding:10px;background:rgba(0,0,0,0.3);border:1.5px solid rgba(162,155,254,0.3);color:#fff;border-radius:8px;outline:none;">
                                <input type="hidden" id="reg-lectura">
                            </div>
                            <div id="sug-reg-lectura-libro" style="margin-top:5px;display:none;"></div>
                        </div>
                        
                        <div id="contenedor-testimonios">
                            <label style="color:#fdcb6e;font-size:0.75rem;font-weight:bold;" id="lbl-testimonios">6. Momento de Testimonios</label>
                            <input type="text" id="reg-testimonios" placeholder="Encargado de recoger testimonios..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(253,203,110,0.4);color:#fff;border-radius:8px;margin-top:5px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        </div>

                        <div>
                            <label id="lbl-especial" style="color:rgba(255,255,255,0.6);font-size:0.75rem;">7. Parte Especial</label>
                            <input type="text" id="reg-especial-quien" placeholder="¿Quién anuncia la parte especial?" style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;margin-bottom:6px;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                            <input type="text" id="reg-especial" placeholder="Nombre de la participación especial..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;outline:none;">
                        </div>
                        <div style="background:rgba(46,213,115,0.04);border:1.5px solid rgba(46,213,115,0.2);border-radius:10px;padding:12px;">
                            <label id="lbl-mensaje" style="color:#2ed573;font-size:0.8rem;font-weight:bold;">8. Mensaje de la Palabra (Predicador)</label>
                            <input type="text" id="reg-predicador-quien" placeholder="¿Quién lo presenta?" style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;margin-bottom:8px;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                            <input type="text" id="reg-mensaje" placeholder="Nombre del Predicador/a..." style="width:100%;padding:14px;background:rgba(0,0,0,0.4);border:1px solid rgba(46,213,115,0.5);color:#fff;border-radius:8px;outline:none;font-size:1rem;font-weight:bold;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                            <input type="text" id="reg-mensaje-tema" placeholder="Título del mensaje..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(46,213,115,0.3);color:rgba(255,255,255,0.8);border-radius:8px;margin-top:6px;outline:none;font-style:italic;">
                        </div>
                        <div style="background:rgba(162,155,254,0.04);border:1.5px solid rgba(162,155,254,0.2);border-radius:10px;padding:12px;">
                            <label id="lbl-himnoFin" style="color:rgba(255,255,255,0.6);font-size:0.75rem;">9. Himno Final</label>
                            <input type="text" id="reg-himnoFin-quien" placeholder="¿Quién anuncia el himno final?" style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;margin-bottom:8px;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                            <input type="text" id="reg-himnoFin" oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)" placeholder="Himno # o título..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fdcb6e;border-radius:8px;font-weight:bold;outline:none;">
                            <div id="himno-titulo-reg-himnoFin" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
                        </div>
                        <div>
                            <label id="lbl-oracionFin" style="color:rgba(255,255,255,0.6);font-size:0.75rem;">10. Oración Final</label>
                            <input type="text" id="reg-oracionFin" placeholder="Nombre..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:5px;outline:none;" class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" autocomplete="off">
                        </div>
                        
                        <!-- BOTONES DE ACCIÓN (EN ORDEN) -->
                        <div style="display:grid;grid-template-columns:1fr;gap:12px;margin-top:25px;">
                            <button id="btn-guardar-reg" onclick="guardarCultoRegular()" style="padding:16px;background:linear-gradient(135deg,#8854d0,#a55eea);border:none;color:#fff;font-weight:900;border-radius:12px;cursor:pointer;font-size:1rem;box-shadow:0 6px 20px rgba(136,84,208,0.4);border:1px solid rgba(255,255,255,0.1);">
                                1. 💾 GUARDAR REGISTRO
                            </button>

                            <button onclick="compartirLlenoActual()" style="padding:14px;background:linear-gradient(135deg,#0984e3,#74b9ff);border:none;color:#fff;font-weight:900;border-radius:12px;cursor:pointer;font-size:0.95rem;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 20px rgba(9,132,227,0.3);border:1px solid rgba(255,255,255,0.2);">
                                2. ✨ PLANTILLA
                            </button>
                            
                            <button onclick="delegarFormularioRegular()" style="padding:14px;background:linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.05));border:1px dashed rgba(37,211,102,0.5);color:#2ed573;font-weight:900;border-radius:12px;cursor:pointer;font-size:0.95rem;display:flex;align-items:center;justify-content:center;gap:8px;">
                                3. 📲 DELEGAR CULTO (Mandar en blanco)
                            </button>
                        </div>
                    </div>
                </div>

                <div id="lista-cultos-regulares" style="display:grid;gap:15px;margin-bottom:20px;">
                    <!-- Aquí se cargan los registros previos -->
                </div>
            </div>
        </div>
    \`;

    // Evaluar inicialmente la visibilidad de testimonios
    actualizarVisibilidadTestimonios();
    // Cargar historial
    cargarListaCultosRegulares();
    window.scrollTo(0, 0);
}

// ==========================================
// LÓGICA DE INTERFAZ Y DATOS
// ==========================================

function actualizarVisibilidadTestimonios() {
    const dia = document.getElementById('reg-dia').value;
    const contTestimonios = document.getElementById('contenedor-testimonios');
    
    // Labels para renumerar dinámicamente
    const lblEsp = document.getElementById('lbl-especial');
    const lblMen = document.getElementById('lbl-mensaje');
    const lblHfi = document.getElementById('lbl-himnoFin');
    const lblOFi = document.getElementById('lbl-oracionFin');

    if (dia === 'viernes') {
        contTestimonios.style.display = 'none';
        document.getElementById('reg-testimonios').value = ''; // Limpiar
        
        // Ajustar números si se quita el 6
        if(lblEsp) lblEsp.innerText = "6. Parte Especial";
        if(lblMen) lblMen.innerText = "7. Mensaje de la Palabra (Predicador)";
        if(lblHfi) lblHfi.innerText = "8. Himno Final";
        if(lblOFi) lblOFi.innerText = "9. Oración Final";
    } else {
        contTestimonios.style.display = 'block';
        
        // Restaurar números
        if(lblEsp) lblEsp.innerText = "7. Parte Especial";
        if(lblMen) lblMen.innerText = "8. Mensaje de la Palabra (Predicador)";
        if(lblHfi) lblHfi.innerText = "9. Himno Final";
        if(lblOFi) lblOFi.innerText = "10. Oración Final";
    }
}

function delegarFormularioRegular() {\n    const dia = document.getElementById('reg-dia').value;\n    const diaMayus = dia.toUpperCase();\n    let texto = \`🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\n\`;\n    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\`;\n    texto += \`📝 *PROGRAMA DE CULTO* | *\${diaMayus}*\n\`;\n    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\`;\n    texto += \`👋 _Por favor completa los espacios en blanco y reenvíamelo:_ \n\n\`;\n    texto += \`👑 *OFICIALES DE TURNO*\n\`;\n    texto += \`🔹 *Ancianato:* ___\n\`;\n    texto += \`🔹 *Diácono(s):* ___\n\`;\n    texto += \`🔹 *Diaconisa(s):* ___\n\n\`;\n    texto += \`📖 *ORDEN DEL SERVICIO*\n\`;\n    texto += \`1️⃣ *Servicio de Alabanza:* ___\n\`;\n    texto += \`2️⃣ *Palabras de Bienvenida:* ___\n\`;\n    texto += \`3️⃣ *Oración de Invocación:* ___\n\`;\n    texto += \`4️⃣ *Himno Inicial* (Dirige ___): Himno #___\n\`;\n    texto += \`5️⃣ *Lectura Bíblica* (Lector ___): ___\n\`;\n    let nextNum = 6;\n    if (dia === 'miercoles') {\n        texto += \`\${nextNum++}️⃣ *Momento de Testimonios:* ___\n\`;\n    }\n    texto += \`\${nextNum++}️⃣ *Alabanza Especial* (Presenta ___): ___\n\`;\n    texto += \`\${nextNum++}️⃣ *Mensajes de la Palabra* (Predicador ___): ___\n\`;\n    texto += \`      📌 *Tema:* ___\n\`;\n    texto += \`\${nextNum++}️⃣ *Himno Final* (Dirige ___): Himno #___\n\`;\n    texto += \`🔟 *Oración de Despedida:* ___\n\n\`;\n    texto += \`✨ _"Todo hágase decentemente y con orden."_\n\`;\n    window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');\n}

function compartirLlenoActual() {\n    const dia = document.getElementById('reg-dia').value;\n    const diaMayus = dia.toUpperCase();\n    const getVal = (id) => document.getElementById(id) ? (document.getElementById(id).value.trim() || "-") : "-";\n    const libro = document.getElementById('reg-lectura-libro') ? document.getElementById('reg-lectura-libro').value.trim() : '';\n    const cap = document.getElementById('reg-lectura-capitulo') ? document.getElementById('reg-lectura-capitulo').value.trim() : '';\n    const ver = document.getElementById('reg-lectura-versiculos') ? document.getElementById('reg-lectura-versiculos').value.trim() : '';\n    const reqLectura = \`\${libro} \${cap}:\${ver}\`.trim().replace(/^:\s*|:$/g, '').replace(/\s+/g, ' ');\n    let texto = \`🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\n\`;\n    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\`;\n    texto += \`🕊️ *PROGRAMA DE CULTO* | *\${diaMayus}*\n\`;\n    texto += \`📅 *Fecha:* \${document.getElementById('reg-fecha').value.split('-').reverse().join('/')}\n\`;\n    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n\`;\n    texto += \`👑 *OFICIALES DE TURNO*\n\`;\n    texto += \`🔹 *Ancianato:* \${getVal('reg-anciano')}\n\`;\n    texto += \`🔹 *Diácono(s):* \${getVal('reg-diacono')}\n\`;\n    texto += \`🔹 *Diaconisa(s):* \${getVal('reg-diaconisa')}\n\n\`;\n    texto += \`📖 *ORDEN DEL SERVICIO*\n\`;\n    texto += \`1️⃣ *Servicio de Alabanza:* \${getVal('reg-alabanza')}\n\`;\n    texto += \`2️⃣ *Palabras de Bienvenida:* \${getVal('reg-bienvenida')}\n\`;\n    texto += \`3️⃣ *Oración de Invocación:* \${getVal('reg-oracionIni')}\n\`;\n    const h1Tit = document.getElementById('himno-titulo-reg-himnoIni');\n    let h1 = getVal('reg-himnoIni');\n    if (h1Tit && h1Tit.textContent && h1 !== "-") h1 += \` (\${h1Tit.textContent.replace(/^.*?—\s*/, '')})\`;\n    let valH1Q = getVal('reg-himnoIni-quien');\n    const preH1 = valH1Q !== "-" ? \` (Dirige: \${valH1Q})\` : "";\n    texto += \`4️⃣ *Himno Inicial\${preH1}:* \${h1}\n\`;\n    let valLecQ = getVal('reg-lectura-quien');\n    const preLec = valLecQ !== "-" ? \` (Lector: \${valLecQ})\` : "";\n    texto += \`5️⃣ *Lectura Bíblica\${preLec}:* \${reqLectura || "-"}\n\`;\n    const tEspecial = getVal('reg-especial');\n    let valEspQ = getVal('reg-especial-quien');\n    const pEspecial = valEspQ !== "-" ? \` (Presenta: \${valEspQ})\` : "";\n    const tPredicador = getVal('reg-mensaje');\n    let valPredQ = getVal('reg-predicador-quien');\n    const pPredicador = valPredQ !== "-" ? \` (Predicador: \${valPredQ})\` : "";\n    const tema = getVal('reg-mensaje-tema');\n    const strTema = (tema && tema !== "-") ? \`\n      📌 *Tema:* \"\${tema}\"\` : "";\n    const h2Tit = document.getElementById('himno-titulo-reg-himnoFin');\n    let h2 = getVal('reg-himnoFin');\n    if (h2Tit && h2Tit.textContent && h2 !== "-") h2 += \` (\${h2Tit.textContent.replace(/^.*?—\s*/, '')})\`;\n    let valH2Q = getVal('reg-himnoFin-quien');\n    const preH2 = valH2Q !== "-" ? \` (Dirige: \${valH2Q})\` : "";\n    let nextNum = 6;\n    if (dia === 'miercoles') {\n        texto += \`\${nextNum++}️⃣ *Momento de Testimonios:* \${getVal('reg-testimonios')}\n\`;\n    }\n    texto += \`\${nextNum++}️⃣ *Alabanza Especial\${pEspecial}:* \${tEspecial}\n\`;\n    texto += \`\${nextNum++}️⃣ *Mensaje de la Palabra\${pPredicador}:* \${tPredicador}\${strTema}\n\`;\n    texto += \`\${nextNum++}️⃣ *Himno Final\${preH2}:* \${h2}\n\`;\n    texto += \`🔟 *Oración de Despedida:* \${getVal('reg-oracionFin')}\n\n\`;\n    texto += \`✨ _"Yo me alegré con los que me decían: A la casa de Jehová iremos."_\n\`;\n    if (navigator.share) { navigator.share({ title: \`Culto de \${diaMayus}\`, text: texto }).catch(() => {}); } else { window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank'); }\n}

function guardarCultoRegular() {
    const libro = document.getElementById('reg-lectura-libro') ? document.getElementById('reg-lectura-libro').value : '';
    const cap = document.getElementById('reg-lectura-capitulo') ? document.getElementById('reg-lectura-capitulo').value : '';
    const ver = document.getElementById('reg-lectura-versiculos') ? document.getElementById('reg-lectura-versiculos').value : '';
    const citaCompleta = \`\${libro} \${cap}:\${ver}\`.trim().replace(/^:\\s*|:$/g, '').replace(/\\s+/g, ' ');

    const himno1 = document.getElementById('reg-himnoIni') ? document.getElementById('reg-himnoIni').value.trim() : '';
    const d1 = document.getElementById('himno-titulo-reg-himnoIni');
    const titulo1 = (d1 && d1.textContent && himno1) ? d1.textContent.replace(/^.*?—\\s*/, '') : '';

    const himno2 = document.getElementById('reg-himnoFin') ? document.getElementById('reg-himnoFin').value.trim() : '';
    const d2 = document.getElementById('himno-titulo-reg-himnoFin');
    const titulo2 = (d2 && d2.textContent && himno2) ? d2.textContent.replace(/^.*?—\\s*/, '') : '';

    const data = {
        id: regularEditandoId || Date.now(),
        fecha: document.getElementById('reg-fecha').value,
        dia: document.getElementById('reg-dia').value,
        anciano: document.getElementById('reg-anciano').value.trim() || "-",
        diacono: document.getElementById('reg-diacono').value.trim() || "-",
        diaconisa: document.getElementById('reg-diaconisa').value.trim() || "-",
        alabanza: document.getElementById('reg-alabanza').value.trim() || "-",
        bienvenida: document.getElementById('reg-bienvenida').value.trim() || "-",
        oracionIni: document.getElementById('reg-oracionIni').value.trim() || "-",
        
        himnoIni_quien: document.getElementById('reg-himnoIni-quien') ? document.getElementById('reg-himnoIni-quien').value.trim() : "",
        himnoIni: himno1 || "-",
        himnoIni_titulo: titulo1,
        
        lectura_quien: document.getElementById('reg-lectura-quien') ? document.getElementById('reg-lectura-quien').value.trim() : "",
        lectura: citaCompleta || "-",
        
        testimonios: document.getElementById('reg-dia').value === 'miercoles' ? (document.getElementById('reg-testimonios') ? document.getElementById('reg-testimonios').value.trim() : "-") : "",
        
        especial_quien: document.getElementById('reg-especial-quien') ? document.getElementById('reg-especial-quien').value.trim() : "",
        especial: document.getElementById('reg-especial').value.trim() || "-",
        
        predicador_quien: document.getElementById('reg-predicador-quien') ? document.getElementById('reg-predicador-quien').value.trim() : "",
        mensaje: document.getElementById('reg-mensaje').value.trim() || "-",
        mensaje_tema: document.getElementById('reg-mensaje-tema') ? document.getElementById('reg-mensaje-tema').value.trim() : "",
        
        himnoFin_quien: document.getElementById('reg-himnoFin-quien') ? document.getElementById('reg-himnoFin-quien').value.trim() : "",
        himnoFin: himno2 || "-",
        himnoFin_titulo: titulo2,
        
        oracionFin: document.getElementById('reg-oracionFin').value.trim() || "-"
    };

    if (!data.fecha) { 
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Selecciona una fecha válida'); 
        return; 
    }

    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
    
    if (regularEditandoId) {
        registros = registros.map(r => r.id === regularEditandoId ? data : r);
        regularEditandoId = null;
        const btn = document.getElementById('btn-guardar-reg');
        if(btn) {
            btn.innerHTML = '💾 GUARDAR REGISTRO';
            btn.style.background = 'linear-gradient(135deg,#8854d0,#a55eea)';
        }
        if (typeof mostrarToast === 'function') mostrarToast("¡Culto Actualizado Exitosamente!");
    } else {
        registros.push(data);
        if (typeof mostrarToast === 'function') mostrarToast("¡Culto Guardado Exitosamente!");
    }

    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('legado_cultos_regulares', JSON.stringify(registros));
    
    // Limpiar campos
    document.querySelectorAll("input[id^='reg-']").forEach(i => {
        if (i.id !== 'reg-fecha' && i.id !== 'reg-dia') i.value = '';
    });
    const d1_el = document.getElementById('himno-titulo-reg-himnoIni');
    if (d1_el) d1_el.textContent = '';
    const d2_el = document.getElementById('himno-titulo-reg-himnoFin');
    if (d2_el) d2_el.textContent = '';
    
    cargarListaCultosRegulares();
}

function cargarListaCultosRegulares() {
    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
    const contenedor = document.getElementById('lista-cultos-regulares');

    if (!contenedor) return;

    if (registros.length === 0) {
        contenedor.innerHTML = \`<div style="text-align:center;color:rgba(255,255,255,0.4);padding:20px;">No hay cultos regulares registrados.</div>\`;
        return;
    }

    contenedor.innerHTML = registros.map(reg => {
        const diaMayus = reg.dia.toUpperCase();
        const fechaFormateada = reg.fecha.split('-').reverse().join('/');
        const colorTema = reg.dia === 'miercoles' ? '#0984e3' : '#e84393'; 
        
        return \`
            <div style="background:rgba(255,255,255,0.05);padding:18px;border-radius:12px;border-left:5px solid \${colorTema};position:relative;">
                <button onclick="borrarCultoRegular(\${reg.id})" style="position:absolute;top:15px;right:15px;background:transparent;border:none;color:#ff7675;font-size:1.2rem;cursor:pointer;" title="Eliminar">🗑️</button>
                
                <div style="color:\${colorTema};font-weight:900;font-size:0.9rem;margin-bottom:10px;">📅 CULTO DE \${diaMayus} - \${fechaFormateada}</div>
                
                <div style="font-size:0.85rem;color:#fff;display:grid;gap:6px;">
                    <div style="display:flex;justify-content:space-between;padding:4px 0;"><span style="color:rgba(255,255,255,0.5);">P. Mensaje:</span><b style="color:#2ed573;">\${reg.mensaje}</b></div>
                    <div style="display:flex;justify-content:space-between;padding:4px 0;border-top:1px dashed rgba(255,255,255,0.1);"><span style="color:rgba(255,255,255,0.5);">Ancianato:</span><b>\${reg.anciano}</b></div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:15px;">
                    <button onclick="compartirPlantillaRegular(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.4);color:#2ed573;font-weight:900;border-radius:8px;cursor:pointer;font-size:0.8rem;">📲 Compartir Programa</button>
                    <button onclick="editarCultoRegular(\${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(253,203,110,0.2),rgba(253,203,110,0.1));border:1px solid rgba(253,203,110,0.4);color:#fdcb6e;font-weight:900;border-radius:8px;cursor:pointer;font-size:0.8rem;">✏️ Editar</button>
                </div>
            </div>
        \`;
    }).join('');
}

function editarCultoRegular(id) {
    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
    let reg = registros.find(r => r.id === id);
    if (!reg) return;

    regularEditandoId = id;
    
    document.getElementById('reg-fecha').value = reg.fecha || '';
    document.getElementById('reg-dia').value = reg.dia || 'miercoles';
    actualizarVisibilidadTestimonios();

    const mapaInput = {
        'reg-anciano': reg.anciano,
        'reg-diacono': reg.diacono,
        'reg-diaconisa': reg.diaconisa,
        'reg-alabanza': reg.alabanza,
        'reg-bienvenida': reg.bienvenida,
        'reg-oracionIni': reg.oracionIni,
        'reg-himnoIni-quien': reg.himnoIni_quien,
        'reg-himnoIni': reg.himnoIni,
        'reg-lectura-quien': reg.lectura_quien,
        'reg-especial-quien': reg.especial_quien,
        'reg-especial': reg.especial,
        'reg-predicador-quien': reg.predicador_quien,
        'reg-mensaje': reg.mensaje,
        'reg-mensaje-tema': reg.mensaje_tema,
        'reg-himnoFin-quien': reg.himnoFin_quien,
        'reg-himnoFin': reg.himnoFin,
        'reg-oracionFin': reg.oracionFin,
        'reg-testimonios': reg.testimonios
    };

    for (const [key, val] of Object.entries(mapaInput)) {
        const el = document.getElementById(key);
        if (el) el.value = (val && val !== '-') ? val : '';
    }

    // Descomponer lectura
    if (typeof descomponerCitaBiblicaStruct === 'function') {
        descomponerCitaBiblicaStruct('reg-lectura', reg.lectura);
    } else {
        // Fallback básico si la función global no está lista
        let cita = reg.lectura || '';
        if (cita && cita !== '-') {
            const elL = document.getElementById('reg-lectura-libro');
            const elC = document.getElementById('reg-lectura-capitulo');
            const elV = document.getElementById('reg-lectura-versiculos');
            const match = cita.match(/^([^0-9]+)\\s*(\\d+)?(?:\\s*:\\s*(.*))?$/);
            if (match) {
                if(elL) elL.value = match[1].trim();
                if(elC) elC.value = match[2] || '';
                if(elV) elV.value = match[3] || '';
            } else {
                if(elL) elL.value = cita;
            }
        }
    }

    // Títulos de himnos
    if (reg.himnoIni) {
        const n = parseInt((reg.himnoIni||'').replace('#',''));
        const d = document.getElementById('himno-titulo-reg-himnoIni');
        if (d && typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n]) {
            d.textContent = \`🎵 #\${n} — \${HIMNARIO_ADVENTISTA[n]}\`;
        } else if (reg.himnoIni_titulo && d) {
            d.textContent = \`🎵 — \${reg.himnoIni_titulo}\`;
        }
    }
    if (reg.himnoFin) {
        const n = parseInt((reg.himnoFin||'').replace('#',''));
        const d = document.getElementById('himno-titulo-reg-himnoFin');
        if (d && typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n]) {
            d.textContent = \`🎵 #\${n} — \${HIMNARIO_ADVENTISTA[n]}\`;
        } else if (reg.himnoFin_titulo && d) {
            d.textContent = \`🎵 — \${reg.himnoFin_titulo}\`;
        }
    }

    const btn = document.getElementById('btn-guardar-reg');
    if (btn) {
        btn.innerHTML = '✏️ ACTUALIZAR REGISTRO';
        btn.style.background = 'linear-gradient(135deg,#e17055,#fdcb6e)';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof mostrarToast === 'function') mostrarToast("Editando registro...");
}

function borrarCultoRegular(id) {
    if (typeof mostrarConfirm === 'function') {
        mostrarConfirm('🗑️ ¿Estás seguro de eliminar este culto?', function() {
            ejecutarBorradoRegular(id);
        });
    } else if (confirm('¿Eliminar este culto?')) {
        ejecutarBorradoRegular(id);
    }
}

function ejecutarBorradoRegular(id) {
    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
    registros = registros.filter(r => r.id !== id);
    localStorage.setItem('legado_cultos_regulares', JSON.stringify(registros));
    cargarListaCultosRegulares();
    if (typeof mostrarToast === 'function') mostrarToast('🗑️ Registro eliminado');
}

function compartirPlantillaRegular(id) {\n    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');\n    let reg = registros.find(r => r.id === id);\n    if (!reg) return;\n    let texto = \`🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\n\`;\n    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\`;\n    texto += \`🕊️ *PROGRAMA DE CULTO* | *\${reg.dia.toUpperCase()}*\n\`;\n    texto += \`📅 *Fecha:* \${reg.fecha.split('-').reverse().join('/')}\n\`;\n    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n\`;\n    texto += \`👑 *OFICIALES DE TURNO*\n\`;\n    texto += \`🔹 *Ancianato:* \${reg.anciano && reg.anciano!=="-" ? reg.anciano : "-"}\n\`;\n    texto += \`🔹 *Diácono(s):* \${reg.diacono && reg.diacono!=="-" ? reg.diacono : "-"}\n\`;\n    texto += \`🔹 *Diaconisa(s):* \${reg.diaconisa && reg.diaconisa!=="-" ? reg.diaconisa : "-"}\n\n\`;\n    texto += \`📖 *ORDEN DEL SERVICIO*\n\`;\n    texto += \`1️⃣ *Servicio de Alabanza:* \${reg.alabanza || "-"}\n\`;\n    texto += \`2️⃣ *Palabras de Bienvenida:* \${reg.bienvenida || "-"}\n\`;\n    texto += \`3️⃣ *Oración de Invocación:* \${reg.oracionIni || "-"}\n\`;\n    let strH1 = reg.himnoIni || "-";\n    if (reg.himnoIni_titulo) strH1 += \` (\${reg.himnoIni_titulo})\`;\n    let preH1 = reg.himnoIni_quien && reg.himnoIni_quien !== "-" ? \` (Dirige: \${reg.himnoIni_quien})\` : "";\n    texto += \`4️⃣ *Himno Inicial\${preH1}:* \${strH1}\n\`;\n    let preLec = reg.lectura_quien && reg.lectura_quien !== "-" ? \` (Lector: \${reg.lectura_quien})\` : "";\n    texto += \`5️⃣ *Lectura Bíblica\${preLec}:* \${reg.lectura || "-"}\n\`;\n    const prePred = reg.predicador_quien && reg.predicador_quien !== "-" ? \` (Predicador: \${reg.predicador_quien})\` : "";\n    const strTema = reg.mensaje_tema && reg.mensaje_tema !== "-" ? \`\n      📌 *Tema:* \"\${reg.mensaje_tema}\"\` : "";\n    let strH2 = reg.himnoFin || "-";\n    if (reg.himnoFin_titulo) strH2 += \` (\${reg.himnoFin_titulo})\`;\n    let preH2 = reg.himnoFin_quien && reg.himnoFin_quien !== "-" ? \` (Dirige: \${reg.himnoFin_quien})\` : "";\n    const pEspecial = reg.especial_quien && reg.especial_quien !== "-" ? \` (Presenta: \${reg.especial_quien})\` : "";\n    let nextNum = 6;\n    if (reg.dia === 'miercoles') {\n        texto += \`\${nextNum++}️⃣ *Momento de Testimonios:* \${reg.testimonios || "-"}\n\`;\n    }\n    texto += \`\${nextNum++}️⃣ *Alabanza Especial\${pEspecial}:* \${reg.especial || "-"}\n\`;\n    texto += \`\${nextNum++}️⃣ *Mensaje de la Palabra\${prePred}:* \${reg.mensaje || "-"}\${strTema}\n\`;\n    texto += \`\${nextNum++}️⃣ *Himno Final\${preH2}:* \${strH2}\n\`;\n    texto += \`🔟 *Oración de Despedida:* \${reg.oracionFin || "-"}\n\n\`;\n    texto += \`✨ _"Yo me alegré con los que me decían: A la casa de Jehová iremos."_\n\`;\n    if (navigator.share) { navigator.share({ title: \`Culto de \${reg.dia.toUpperCase()}\`, text: texto }).catch(() => {}); } else { window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank'); }\n}

// ==========================================
// EXPOSICIÓN GLOBAL
// ==========================================

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

window.autocompleteNombre = function(input, forceShowAll = false) {
    let todos = getNombresGlobales();
    let rawVal = input.value;
    
    // Buscar la ultima ocurrencia de cualquiera de los separadores
    let lastY = rawVal.toLowerCase().lastIndexOf(' y ');
    let lastComma = rawVal.lastIndexOf(',');
    let lastSlash = rawVal.lastIndexOf('/');
    
    let sepIndex = Math.max(
        lastY > -1 ? lastY + 3 : -1, 
        lastComma > -1 ? lastComma + 1 : -1, 
        lastSlash > -1 ? lastSlash + 1 : -1
    );
    
    let currentVal = sepIndex > -1 ? rawVal.substring(sepIndex).trim() : rawVal.trim();
    let curSearch = currentVal.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    
    const sugId = 'sug-' + input.id;
    let sugDiv = document.getElementById(sugId);
    if (!sugDiv) {
        sugDiv = document.createElement('div');
        sugDiv.id = sugId;
        sugDiv.style = "margin-top:2px;display:none;width:100%;border-radius:8px;max-height:220px;overflow-y:auto;box-shadow:0 10px 15px rgba(0,0,0,0.5);";
        // Insert it right after the input
        input.parentNode.insertBefore(sugDiv, input.nextSibling);
    }
    
    if (!forceShowAll && curSearch.length < 1) {
        sugDiv.style.display = 'none';
        return;
    }
    
    let matches = forceShowAll && curSearch.length < 1 ? todos : todos.filter(n => { let nStr = n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return nStr.includes(curSearch); }).slice(0, 8);
    
    // Evitar loop si la ultima entrada es exactamente la sugerencia (sin importar mayúsculas)
    if (matches.length === 1 && matches[0].toLowerCase() === currentVal.toLowerCase()) {
        sugDiv.style.display = 'none';
        return;
    }
    
    if (matches.length > 0) {
        sugDiv.style.display = 'block';
        sugDiv.innerHTML = matches.map(m => {
            let prefLen = sepIndex > -1 ? sepIndex : 0;
            return '<button type="button" onclick="seleccionarNombre(\\'' + input.id + '\\', \\'' + m + '\\', ' + prefLen + ')" style="display:block;width:100%;text-align:left;padding:12px 14px;background:rgba(15,23,42,0.98);border:1px solid rgba(136,84,208,0.5);color:#a55eea;cursor:pointer;font-size:0.95rem;margin-bottom:2px;font-weight:bold;">👤 ' + m + '</button>';
        }).join('');
    } else {
        sugDiv.style.display = 'none';
    }
}

window.seleccionarNombre = function(inputId, seleccionado, prefixLength) {
    const input = document.getElementById(inputId);
    let rawVal = input.value;
    let prefix = rawVal.substring(0, prefixLength);
    
    // Preservar los espacios despues del separador si los habia
    let spaceMatch = rawVal.substring(prefixLength).match(/^\\s+/);
    if(spaceMatch) prefix += spaceMatch[0];
    else if(prefixLength > 0 && !prefix.endsWith(' ')) prefix += ' ';
    
    input.value = prefix + seleccionado; 
    document.getElementById('sug-' + inputId).style.display = 'none';
    input.focus();
}

// Ocultar sugerencias si se da click afuera
document.addEventListener('click', function(e) {
    if(!e.target.closest('div[id^="sug-"]') && !e.target.closest('input[id^="reg-"]')) {
        document.querySelectorAll('div[id^="sug-"]').forEach(d => d.style.display = 'none');
    }
});

window.renderCultosRegulares = renderCultosRegulares;
window.actualizarVisibilidadTestimonios = actualizarVisibilidadTestimonios;
window.delegarFormularioRegular = delegarFormularioRegular;
window.compartirLlenoActual = compartirLlenoActual;
window.guardarCultoRegular = guardarCultoRegular;
window.editarCultoRegular = editarCultoRegular;
window.borrarCultoRegular = borrarCultoRegular;
window.compartirPlantillaRegular = compartirPlantillaRegular;
`;

fs.writeFileSync('_cultos_regulares.js', content, 'utf8');
console.log('Script guardado exitosamente');
