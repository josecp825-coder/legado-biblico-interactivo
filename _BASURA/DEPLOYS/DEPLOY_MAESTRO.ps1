# ================================================================
# DEPLOY MAESTRO — Auto-versión + Cache Buster GARANTIZADO
# Versión: DEPLOY_MAESTRO.ps1
# 
# SOLUCIÓN AL PROBLEMA DE PWA SIN ACTUALIZAR:
# Antes de subir archivos, actualiza AUTOMÁTICAMENTE los ?v=XXX
# en index.html para que el navegador siempre descargue versión nueva.
# ================================================================

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# ========================
# LEER VERSION ACTUAL
# ========================
$versionJson = Get-Content "$localPath\version.json" -Raw | ConvertFrom-Json
$VERSION = [int]$versionJson.version

Write-Host ""
Write-Host "============================================"
Write-Host " DEPLOY MAESTRO — v$VERSION" -ForegroundColor Cyan
Write-Host "============================================"

# ========================
# PASO 1: Actualizar ?v= en index.html para los archivos que cambian
# ========================
Write-Host "`n[1/4] Actualizando cache-busters en index.html..." -ForegroundColor Yellow

$indexPath = "$localPath\index.html"
$indexContent = Get-Content $indexPath -Raw -Encoding UTF8

# Archivos que cambian frecuentemente — actualizar su ?v= al numero de version actual
$archivosActualizar = @(
    '_add_eventos_especiales.js',
    '_pdf_eventos.js',
    '_nueva_funcion.js',
    'fix_herramientas_culto.js',
    'data_iglesia_v1.js',
    'style.css',
    'mobile.css',
    'firebase-config.js'
)

$cambios = 0
foreach ($archivo in $archivosActualizar) {
    # Reemplazar cualquier ?v=NUMERO por ?v=VERSION_ACTUAL
    $patron = [regex]::Escape($archivo) + '\?v=\d+'
    $nuevoValor = $archivo + "?v=$VERSION"
    $indexNuevo = [regex]::Replace($indexContent, $patron, $nuevoValor)
    if ($indexNuevo -ne $indexContent) {
        $indexContent = $indexNuevo
        $cambios++
        Write-Host "  $archivo -> ?v=$VERSION [ACTUALIZADO]" -ForegroundColor Green
    } else {
        Write-Host "  $archivo -> sin cambio" -ForegroundColor Gray
    }
}

# Guardar index.html actualizado
[System.IO.File]::WriteAllText($indexPath, $indexContent, [System.Text.Encoding]::UTF8)
Write-Host "  Total cambios en index.html: $cambios" -ForegroundColor Cyan

# ========================
# PASO 2: Subir todos los archivos al servidor
# ========================
Write-Host "`n[2/4] Subiendo archivos al servidor..." -ForegroundColor Yellow

$archivos = @(
    @{ local = '_add_eventos_especiales.js'; remote = '_add_eventos_especiales.js' },
    @{ local = '_pdf_eventos.js';            remote = '_pdf_eventos.js' },
    @{ local = 'index.html';                 remote = 'index.html' },
    @{ local = 'sw.js';                      remote = 'sw.js' },
    @{ local = 'version.json';               remote = 'version.json' }
)

$subidos = 0
$errores = 0
foreach ($f in $archivos) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f.remote, (Join-Path $localPath $f.local))
        try { $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f.remote, (Join-Path $localPath $f.local)) } catch {}
        Write-Host "  $($f.remote) [OK]" -ForegroundColor Green
        $subidos++
    }
    catch {
        Write-Host "  $($f.remote) [ERROR] $($_.Exception.Message.Split('.')[0])" -ForegroundColor Red
        $errores++
    }
}

# ========================
# PASO 3: Verificar version.json en el servidor
# ========================
Write-Host "`n[3/4] Verificando version en servidor..." -ForegroundColor Yellow
try {
    $respuesta = (New-Object System.Net.WebClient).DownloadString('https://agendatecnicadigital.com/version.json?t=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())
    $vServ = ($respuesta | ConvertFrom-Json).version
    if ($vServ -eq "$VERSION") {
        Write-Host "  version.json en servidor: v$vServ [CONFIRMADO]" -ForegroundColor Green
    } else {
        Write-Host "  ADVERTENCIA: Servidor tiene v$vServ pero local es v$VERSION" -ForegroundColor Red
    }
} catch {
    Write-Host "  No se pudo verificar el servidor (sin conexion?)" -ForegroundColor Yellow
}

# ========================
# RESULTADO FINAL
# ========================
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " DEPLOY v$VERSION COMPLETO" -ForegroundColor Cyan
Write-Host "  Archivos subidos: $subidos" -ForegroundColor Green
if ($errores -gt 0) { Write-Host "  Errores: $errores" -ForegroundColor Red }
Write-Host "  Cache-busters actualizados: $cambios" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "PROXIMOS PASOS EN TU CELULAR:" -ForegroundColor White
Write-Host "  1. Abre Legado Biblico" -ForegroundColor White
Write-Host "  2. Presiona [Actualizar App]" -ForegroundColor White
Write-Host "  3. Confirma y la app se recarga con v$VERSION" -ForegroundColor White

Write-Host ""
