# ============================================================
# FUSIÓN: Liturgia Sábado → Registro de Cultos
# Integra el formulario de 12 pasos de liturgia dentro del
# Registro de Cultos, activado automáticamente al elegir Sábado
# ============================================================

$path = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$original = $content

Write-Host "=== PASO 1: Eliminar tarjeta de Liturgia de Cultos del menú ===" -ForegroundColor Cyan

# Eliminar el botón de Liturgia de Cultos del menú (bloque completo)
$targetLiturgia = @'
                    <!-- 2. LITURGIA DE CULTOS -->
                    <button onclick="renderLiturgia()" style="background:linear-gradient(135deg,rgba(108,92,231,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.3);padding:25px;border-radius:20px;color:#fff;text-align:left;cursor:pointer;transition:transform 0.2s;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">📋✨</div>
                        <h3 style="color:#a29bfe;font-size:calc(1.1rem * var(--font-scale, 1));margin-bottom:5px;letter-spacing:1px;">LITURGIA DE CULTOS</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:calc(0.8rem * var(--font-scale, 1));line-height:1.4;margin:0;">Organizar programa de Sábado (Diáconos, Cantos, etc)</p>
                    </button>
'@

if ($content.Contains($targetLiturgia)) {
    $content = $content.Replace($targetLiturgia, '')
    Write-Host "  [OK] Tarjeta Liturgia eliminada del menú" -ForegroundColor Green
} else {
    Write-Host "  [WARN] No se encontró la tarjeta exacta — buscando variante..." -ForegroundColor Yellow
    # Intentar busqueda mas flexible
    $idx = $content.IndexOf('renderLiturgia()')
    if ($idx -ge 0) {
        Write-Host "  [INFO] Función renderLiturgia() encontrada en posición $idx" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== PASO 2: Expandir autoDetectarTipoCulto para Sábado ===" -ForegroundColor Cyan

$oldAutoDetectar = @'
function autoDetectarTipoCulto(fechaStr) {
    if (!fechaStr) return;
    const select = document.getElementById('culto-tipo');
    if (!select) return;
    const partes = fechaStr.split('-');
    const fecha = new Date(partes[0], partes[1] - 1, partes[2], 12, 0, 0);
    const diaSemana = fecha.getDay();
    const diasMap = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado" };
    select.value = diasMap[diaSemana] || "Otro";
}
'@

$newAutoDetectar = @'
function autoDetectarTipoCulto(fechaStr) {
    if (!fechaStr) return;
    const select = document.getElementById('culto-tipo');
    if (!select) return;
    const partes = fechaStr.split('-');
    const fecha = new Date(partes[0], partes[1] - 1, partes[2], 12, 0, 0);
    const diaSemana = fecha.getDay();
    const diasMap = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado" };
    select.value = diasMap[diaSemana] || "Otro";

    // ✨ MODO SÁBADO: muestra formulario de 12 pasos de liturgia
    const esSabado = diaSemana === 6;
    _actualizarFormularioPorDia(esSabado);
}

function _actualizarFormularioPorDia(esSabado) {
    const contenedorCampos = document.getElementById('culto-campos-dinamicos');
    if (!contenedorCampos) return;

    const rgb_sab = '253,203,110'; // dorado sábado
    const rgb_norm = '162,155,254'; // morado normal

    if (esSabado) {
        // ===== FORMULARIO DE 12 PASOS PARA SÁBADO =====
        contenedorCampos.innerHTML = `
            <div style="background:rgba(253,203,110,0.06);border:1.5px solid rgba(253,203,110,0.3);border-radius:16px;padding:14px;margin-bottom:16px;">
                <div style="color:#fdcb6e;font-weight:900;font-size:0.72rem;letter-spacing:2px;margin-bottom:4px;text-align:center;">⛪ CULTO DE SÁBADO — PROGRAMA LITÚRGICO</div>
                <div style="color:rgba(255,255,255,0.3);font-size:0.62rem;text-align:center;">12 pasos del programa oficial</div>
            </div>

            ${_campoLiturgia('sab_doxologia', '1', '✨', 'DOXOLOGÍA', 'Nombre del responsable...')}
            ${_campoLiturgia('sab_invocacion', '2', '🙏', 'INVOCACIÓN', 'Nombre del responsable...')}
            ${_campoLiturgia('sab_bienvenida', '3', '🙌', 'BIENVENIDA', 'Nombre del responsable...')}
            ${_campoLiturgia('sab_infantil', '4', '👶', 'RINCÓN INFANTIL', 'Nombre del responsable...')}
            ${_campoLiturgia('sab_ofrendas', '5', '💰', 'DIEZMOS Y OFRENDAS', 'Nombre del encargado...')}

            <div style="background:rgba(253,203,110,0.04);border:1.5px solid rgba(253,203,110,0.2);border-radius:14px;padding:14px;position:relative;">
                <label style="display:flex;align-items:center;gap:8px;color:rgba(253,203,110,0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                    <span style="font-size:1.1rem;">🎵</span>
                    <span style="color:rgba(253,203,110,0.6);font-size:0.6rem;background:rgba(253,203,110,0.1);padding:2px 8px;border-radius:6px;">6</span>
                    HIMNO DE ADORACIÓN
                </label>
                <input type="text" id="culto-sab_himno_anuncia" placeholder="¿Quién anuncia el himno?" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
                <input type="text" id="culto-sab_himno6" placeholder="# del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.4);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.85rem;font-weight:bold;">
                <div id="himno-titulo-sab_himno6" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
            </div>

            ${_campoLiturgia('sab_lectura', '7', '📖', 'LECTURA BÍBLICA', 'Nombre del lector...')}
            ${_campoLiturgia('sab_oracion_intercesora', '8', '🙏', 'ORACIÓN INTERCESORA', 'Nombre del responsable...')}
            ${_campoLiturgia('sab_musica_especial', '9', '🎤', 'MÚSICA ESPECIAL', 'Quién o qué grupo canta...')}

            <div style="background:rgba(253,203,110,0.1);border:2px solid rgba(253,203,110,0.5);border-radius:14px;padding:14px;position:relative;">
                <label style="display:flex;align-items:center;gap:8px;color:#fdcb6e;font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                    <span style="font-size:1.1rem;">🎙️</span>
                    <span style="color:rgba(0,0,0,0.6);font-size:0.6rem;background:#fdcb6e;padding:2px 8px;border-radius:6px;">10</span>
                    TEMA / PREDICADOR
                </label>
                <input type="text" id="culto-sab_pred_anuncia" placeholder="¿Quién presenta al predicador?" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
                <input type="text" id="culto-sab_predicador" placeholder="Nombre del predicador..." style="width:100%;padding:11px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.5);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:900;margin-bottom:6px;">
                <input type="text" id="culto-sab_tema" placeholder="Título del sermón..." style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;font-style:italic;">
            </div>

            <div style="background:rgba(253,203,110,0.04);border:1.5px solid rgba(253,203,110,0.2);border-radius:14px;padding:14px;position:relative;">
                <label style="display:flex;align-items:center;gap:8px;color:rgba(253,203,110,0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                    <span style="font-size:1.1rem;">🎶</span>
                    <span style="color:rgba(253,203,110,0.6);font-size:0.6rem;background:rgba(253,203,110,0.1);padding:2px 8px;border-radius:6px;">11</span>
                    HIMNO FINAL
                </label>
                <input type="text" id="culto-sab_himno_final_quien" placeholder="¿Quién anuncia el himno final?" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
                <input type="text" id="culto-sab_himno_final" placeholder="# del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)" style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(253,203,110,0.4);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.85rem;font-weight:bold;">
                <div id="himno-titulo-sab_himno_final" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
            </div>

            ${_campoLiturgia('sab_oracion_final', '12', '🤲', 'ORACIÓN FINAL', 'Nombre del responsable...')}
            ${_campoLiturgia('sab_sonido', '🎛️', '🎛️', 'ENCARGADO DE SONIDO', 'Nombre...')}
            ${_campoLiturgia('sab_obs', '📝', '📝', 'OBSERVACIONES', 'Notas adicionales...')}
        `;
    } else {
        // ===== FORMULARIO REGULAR PARA OTROS DÍAS =====
        const CAMPOS_CULTO = [
            { id: 'anciano', icon: '🧓', label: 'ANCIANO DE TURNO', placeholder: '¿Quién es el anciano?', tipo: 'nombre' },
            { id: 'bienvenida', icon: '🤝', label: 'BIENVENIDA', placeholder: 'Nombre del encargado...', tipo: 'nombre' },
            { id: 'oracion1', icon: '🙏', label: 'PRIMERA ORACIÓN', placeholder: '¿Quién ora?', tipo: 'nombre' },
            { id: 'himno1_quien', icon: '🎵', label: 'HIMNO DE APERTURA — ANUNCIA', placeholder: '¿Quién anuncia el himno?', tipo: 'nombre' },
            { id: 'himno1', icon: '🎶', label: 'HIMNO DE APERTURA — NÚMERO', placeholder: '# del himno...', tipo: 'himno' },
            { id: 'lectura', icon: '📖', label: 'LECTURA BÍBLICA', placeholder: '¿Quién lee?', tipo: 'nombre' },
            { id: 'especial', icon: '⭐', label: 'PARTE ESPECIAL', placeholder: '¿Quién participa?', tipo: 'nombre' },
            { id: 'especial_desc', icon: '📝', label: 'DESCRIPCIÓN PARTE ESPECIAL', placeholder: 'Descripción...', tipo: 'texto' },
            { id: 'intercesora', icon: '🙏', label: 'ORACIÓN INTERCESORA', placeholder: '¿Quién ora?', tipo: 'nombre' },
            { id: 'pred_anuncia', icon: '🎤', label: 'ANUNCIA AL PREDICADOR', placeholder: '¿Quién presenta al predicador?', tipo: 'nombre' },
            { id: 'predicador', icon: '🎙️', label: 'PREDICADOR/A', placeholder: 'Nombre del predicador...', tipo: 'nombre' },
            { id: 'pred_tema', icon: '📑', label: 'TEMA DEL SERMÓN', placeholder: 'Título del sermón...', tipo: 'texto' },
            { id: 'himno2', icon: '🎵', label: 'HIMNO FINAL', placeholder: '# del himno...', tipo: 'himno' },
            { id: 'himno2_quien', icon: '🎵', label: 'HIMNO FINAL — ANUNCIA', placeholder: '¿Quién anuncia el himno?', tipo: 'nombre' },
            { id: 'oracion_final', icon: '🙏', label: 'ORACIÓN FINAL', placeholder: '¿Quién ora?', tipo: 'nombre' },
            { id: 'sonido', icon: '🎛️', label: 'ENCARGADO DE SONIDO', placeholder: 'Nombre...', tipo: 'nombre' },
            { id: 'obs', icon: '📝', label: 'OBSERVACIONES', placeholder: 'Notas adicionales...', tipo: 'texto' }
        ];
        const tipoColores = { nombre: '162,155,254', himno: '254,202,87', texto: '116,185,255' };
        contenedorCampos.innerHTML = CAMPOS_CULTO.map((c, i) => {
            const rgb = tipoColores[c.tipo] || '162,155,254';
            const inputEvent = c.tipo === 'himno' ? 'oninput="autocompleteHimno(this)"' : '';
            return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;position:relative;">
                <label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                    <span style="font-size:1.1rem;">${c.icon}</span>
                    <span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${i+1}</span>
                    ${c.label}
                </label>
                <input type="text" id="culto-${c.id}" placeholder="${c.placeholder}" ${inputEvent}
                    style="width:100%;padding:12px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;">
                <div id="sug-${c.id}" style="display:none;position:relative;z-index:50;"></div>
                ${c.tipo === 'himno' ? `<div id="himno-titulo-${c.id}" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>` : ''}
            </div>`;
        }).join('');
    }
}

function _campoLiturgia(id, num, icon, label, placeholder) {
    const rgb = '253,203,110';
    return `<div style="background:rgba(${rgb},0.04);border:1.5px solid rgba(${rgb},0.2);border-radius:14px;padding:14px;position:relative;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(${rgb},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">${icon}</span>
            <span style="color:rgba(${rgb},0.6);font-size:0.6rem;background:rgba(${rgb},0.1);padding:2px 8px;border-radius:6px;">${num}</span>
            ${label}
        </label>
        <input type="text" id="culto-${id}" placeholder="${placeholder}"
            style="width:100%;padding:12px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(${rgb},0.4);color:#fff;border-radius:10px;outline:none;font-size:0.9rem;">
    </div>`;
}
'@

if ($content.Contains($oldAutoDetectar)) {
    $content = $content.Replace($oldAutoDetectar, $newAutoDetectar)
    Write-Host "  [OK] autoDetectarTipoCulto expandido con lógica de Sábado" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] No se encontró la función autoDetectarTipoCulto exacta" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== PASO 3: Agregar contenedor dinámico al formulario ===" -ForegroundColor Cyan

# Reemplazar los campos estáticos del formulario con un contenedor dinámico
$oldCampoHTML = '          <div style="display:grid;gap:10px;margin-bottom:18px;">${camposHTML}</div>'
$newCampoHTML = '          <div id="culto-campos-dinamicos" style="display:grid;gap:10px;margin-bottom:18px;"></div>'

if ($content.Contains($oldCampoHTML)) {
    $content = $content.Replace($oldCampoHTML, $newCampoHTML)
    Write-Host "  [OK] Contenedor dinámico insertado" -ForegroundColor Green
} else {
    Write-Host "  [WARN] No se encontró marcador de campos exacto. Buscando alternativa..." -ForegroundColor Yellow
    # busqueda alternativa
    $idxCampos = $content.IndexOf('camposHTML}</div>')
    if ($idxCampos -ge 0) {
        Write-Host "  [INFO] camposHTML encontrado en posición $idxCampos" -ForegroundColor Yellow
        $content = $content.Replace('gap:10px;margin-bottom:18px;">${camposHTML}</div>', 'gap:10px;margin-bottom:18px;" id="culto-campos-dinamicos"></div>')
        Write-Host "  [OK] Reemplazo alternativo aplicado en camposHTML" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] No se pudo localizar el punto de inserción del contenedor" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== PASO 4: Actualizar guardarCultoSemana para campos de Sábado ===" -ForegroundColor Cyan

$oldGuardar = "    const campos = ['anciano', 'bienvenida', 'oracion1', 'himno1_quien', 'himno1', 'lectura', 'lectura_quien', 'especial', 'especial_desc', 'intercesora', 'pred_anuncia', 'predicador', 'pred_tema', 'pred_texto', 'himno2', 'himno2_quien', 'oracion_final', 'sonido', 'obs'];"
$newGuardar = @"
    const esSabado = document.getElementById('culto-tipo')?.value === 'Sábado';
    const camposSabado = ['sab_doxologia','sab_invocacion','sab_bienvenida','sab_infantil','sab_ofrendas','sab_himno_anuncia','sab_himno6','sab_lectura','sab_oracion_intercesora','sab_musica_especial','sab_pred_anuncia','sab_predicador','sab_tema','sab_himno_final_quien','sab_himno_final','sab_oracion_final','sab_sonido','sab_obs'];
    const camposNormal = ['anciano', 'bienvenida', 'oracion1', 'himno1_quien', 'himno1', 'lectura', 'lectura_quien', 'especial', 'especial_desc', 'intercesora', 'pred_anuncia', 'predicador', 'pred_tema', 'pred_texto', 'himno2', 'himno2_quien', 'oracion_final', 'sonido', 'obs'];
    const campos = esSabado ? camposSabado : camposNormal;
"@

if ($content.Contains($oldGuardar)) {
    $content = $content.Replace($oldGuardar, $newGuardar)
    Write-Host "  [OK] guardarCultoSemana actualizado para detectar Sábado" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] No se encontró lista de campos en guardarCultoSemana" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== PASO 5: Actualizar versión y guardar ===" -ForegroundColor Cyan

# Verificar que hubo cambios
if ($content -ne $original) {
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "  [OK] data_iglesia_v1.js guardado con cambios" -ForegroundColor Green
    
    # Actualizar version.json
    $versionPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\version.json'
    $version = '{"version":"189","nombre":"LITURGIA-INTEGRADA-SABADO","fecha":"2026-03-13"}'
    [System.IO.File]::WriteAllText($versionPath, $version, [System.Text.Encoding]::UTF8)
    Write-Host "  [OK] version.json → v189 LITURGIA-INTEGRADA-SABADO" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] No se realizaron cambios en el archivo" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== VERIFICACIÓN ===" -ForegroundColor Cyan
$verifica = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
Write-Host "  renderLiturgia en menú: $($verifica.Contains('onclick=""renderLiturgia()""'))" -ForegroundColor $(if (-not $verifica.Contains('onclick=""renderLiturgia()""')) { 'Green' } else { 'Red' })
Write-Host "  Lógica sábado: $($verifica.Contains('_actualizarFormularioPorDia'))" -ForegroundColor $(if ($verifica.Contains('_actualizarFormularioPorDia')) { 'Green' } else { 'Red' })
Write-Host "  Contenedor dinámico: $($verifica.Contains('culto-campos-dinamicos'))" -ForegroundColor $(if ($verifica.Contains('culto-campos-dinamicos')) { 'Green' } else { 'Red' })
Write-Host ""
Write-Host "✅ Script completado" -ForegroundColor Green
