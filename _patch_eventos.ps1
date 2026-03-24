# ================================================================
# PATCH: Módulo Eventos Especiales → data_iglesia_v1.js
# v215 - Legado Bíblico
# ================================================================

$file = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js"

# Leer el archivo como bytes y decodificar UTF-8
$bytes  = [System.IO.File]::ReadAllBytes($file)
$texto  = [System.Text.Encoding]::UTF8.GetString($bytes)

# ----------------------------------------------------------------
# VERIFICAR QUE NO SE APLICÓ ANTES
# ----------------------------------------------------------------
if ($texto.Contains('tab-btn-eventos')) {
    Write-Host "[OK] El parche ya fue aplicado anteriormente. Nada que hacer." -ForegroundColor Yellow
    exit 0
}

# ----------------------------------------------------------------
# CAMBIO 1: Agregar botón de pestaña Eventos
# Buscamos la línea del botón Cultos y el cierre del div
# ----------------------------------------------------------------
$TARGET1 = "onclick=""cambiarTabCulto('cultos')"" style=""`${tabStyle(false)}""></button>`n        </div>"
# No podemos comparar directamente. Usamos una estrategia diferente:
# Buscamos la secuencia fija de texto ASCII que rodea el botón cultos

$MARKER1 = "tab-btn-cultos"
$idx1    = $texto.IndexOf($MARKER1)
if ($idx1 -lt 0) {
    Write-Host "[ERROR] No se encontró 'tab-btn-cultos' en el archivo." -ForegroundColor Red
    exit 1
}

# Encontrar fin del botón de cultos (</button>) después del marcador
$endBtn1 = $texto.IndexOf('</button>', $idx1)
if ($endBtn1 -lt 0) { Write-Host "[ERROR] No se encontró </button> después de tab-btn-cultos" -ForegroundColor Red; exit 1 }
$endBtn1 += 9  # Incluir '</button>'

# Encontrar </div> después
$endDiv1 = $texto.IndexOf('</div>', $endBtn1)
if ($endDiv1 -lt 0) { Write-Host "[ERROR] No se encontró </div> después del botón cultos" -ForegroundColor Red; exit 1 }
$endDiv1 += 6  # Incluir '</div>'

# El texto a reemplazar es desde endBtn1 hasta endDiv1
$fragmentoViejo1 = $texto.Substring($endBtn1, $endDiv1 - $endBtn1)
Write-Host "Fragmento a reemplazar (CAMBIO 1):"
Write-Host "  '$($fragmentoViejo1.Substring(0, [Math]::Min($fragmentoViejo1.Length, 50)))'"

$nuevoBotonEvt = "`n          <button id=""tab-btn-eventos"" onclick=""cambiarTabCulto('eventos')"" style=""`${tabStyle(false)}"">&#11088;<br>Eventos</button>`n        </div>"
$texto = $texto.Substring(0, $endBtn1) + $nuevoBotonEvt + $texto.Substring($endDiv1)

Write-Host "[OK] CAMBIO 1 aplicado: Botón Eventos agregado." -ForegroundColor Green

# ----------------------------------------------------------------
# CAMBIO 2: Agregar el contenedor tab-content-eventos
# Buscamos el cierre del div tab-content-cultos y añadimos después
# ----------------------------------------------------------------
$MARKER2 = 'id="historico-cultos"'
$idx2 = $texto.IndexOf($MARKER2)
if ($idx2 -lt 0) { Write-Host "[ERROR] No se encontró 'historico-cultos'" -ForegroundColor Red; exit 1 }

# El contenedor tab-content-cultos termina con:
# </div>  ← cierra historico-cultos
# </div>  ← cierra tab-content-cultos
$endHistorico = $texto.IndexOf('</div>', $idx2)
if ($endHistorico -lt 0) { Write-Host "[ERROR] No se encontró cierre de historico-cultos" -ForegroundColor Red; exit 1 }
$endHistorico += 6

$endTabCultos = $texto.IndexOf('</div>', $endHistorico)
if ($endTabCultos -lt 0) { Write-Host "[ERROR] No se encontró cierre de tab-content-cultos" -ForegroundColor Red; exit 1 }
$endTabCultos += 6

$contenedorEvt = @"

        <!-- ======== TAB 4: EVENTOS ESPECIALES ======== -->
        <div id="tab-content-eventos" style="display:none;">
          <div id="eventos-modulo-contenedor">
            <div style="text-align:center;color:rgba(255,255,255,0.3);padding:20px;font-size:0.8rem;">Toca para cargar eventos...</div>
          </div>
        </div>
"@

$texto = $texto.Substring(0, $endTabCultos) + $contenedorEvt + $texto.Substring($endTabCultos)

Write-Host "[OK] CAMBIO 2 aplicado: Contenedor tab-content-eventos agregado." -ForegroundColor Green

# ----------------------------------------------------------------
# CAMBIO 3: Actualizar cambiarTabCulto para incluir 'eventos'
# ----------------------------------------------------------------
$MARKER3 = "['form','buscar','cultos']"
$idx3 = $texto.IndexOf($MARKER3)
if ($idx3 -lt 0) {
    Write-Host "[ERROR] No se encontró ['form','buscar','cultos']" -ForegroundColor Red
    exit 1
}

# También buscamos el bloque completo de la función
$OLD3 = "['form','buscar','cultos']"
$NEW3 = "['form','buscar','cultos','eventos']"
$texto = $texto.Replace($OLD3, $NEW3)
Write-Host "[OK] CAMBIO 3a aplicado: Array de tabs actualizado." -ForegroundColor Green

# Agregar el manejador del tab eventos dentro de cambiarTabCulto
# Buscamos: if (tab === 'buscar') ...
$OLD3b = "        if (tab === 'buscar') { if(typeof actualizarListaParticipantes === 'function') actualizarListaParticipantes(); }"
$NEW3b = "        if (tab === 'buscar') { if(typeof actualizarListaParticipantes === 'function') actualizarListaParticipantes(); }`n        if (tab === 'eventos') {`n            var cont = document.getElementById('eventos-modulo-contenedor');`n            if (cont && typeof renderTabEventosEspeciales === 'function') {`n                cont.innerHTML = renderTabEventosEspeciales();`n                var fEl = document.getElementById('evt-fecha-inicio');`n                if (fEl && fEl.value && typeof seleccionarDuracionEvento === 'function') {`n                    seleccionarDuracionEvento(window._duracionEvento || 7);`n                }`n            }`n        }"

if ($texto.Contains($OLD3b)) {
    $texto = $texto.Replace($OLD3b, $NEW3b)
    Write-Host "[OK] CAMBIO 3b aplicado: Manejador de tab eventos agregado." -ForegroundColor Green
} else {
    Write-Host "[WARN] No se encontró el patrón de buscar para CAMBIO 3b - se omite." -ForegroundColor Yellow
}

# ----------------------------------------------------------------
# Escribir resultado
# ----------------------------------------------------------------
$bytesOut = [System.Text.Encoding]::UTF8.GetBytes($texto)
[System.IO.File]::WriteAllBytes($file, $bytesOut)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PARCHE APLICADO EXITOSAMENTE" -ForegroundColor Cyan
Write-Host "Verificando contenido..." -ForegroundColor Cyan
if ($texto.Contains('tab-btn-eventos')) { Write-Host "  [OK] tab-btn-eventos presente" -ForegroundColor Green } else { Write-Host "  [FAIL] tab-btn-eventos AUSENTE" -ForegroundColor Red }
if ($texto.Contains('tab-content-eventos')) { Write-Host "  [OK] tab-content-eventos presente" -ForegroundColor Green } else { Write-Host "  [FAIL] tab-content-eventos AUSENTE" -ForegroundColor Red }
if ($texto.Contains("'eventos'")) { Write-Host "  [OK] 'eventos' en array de tabs presente" -ForegroundColor Green } else { Write-Host "  [FAIL] 'eventos' AUSENTE en array" -ForegroundColor Red }
Write-Host "========================================" -ForegroundColor Cyan
