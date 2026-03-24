# ==========================================
# DESPLIEGUE LEGADO BIBLICO v61
# SOLO archivos de la RAIZ
# JAMAS tocar /app/ (Agenda Digital)
# ==========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  LEGADO BIBLICO v61 - DESPLIEGUE" -ForegroundColor White
Write-Host "  ID UNICO + SCOPE ABSOLUTO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$baseUrl = 'ftp://46.202.182.197/'
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\agenda digital'

$archivos = @(
    'index.html',
    'sw.js',
    'version.json',
    'manifest.json',
    'style.css',
    'mobile.css',
    'data_kids_v2.js',
    'kids_cinema.js',
    'data_motor.js',
    'data_jovenes.js',
    'data_adultos_v37.js',
    'data_teens_v8.js',
    'data_iglesia_v1.js',
    'trivia_parte1.js',
    'trivia_parte2.js',
    'trivia_parte3.js',
    'versus_engine.js',
    'firebase-service.js',
    'firebase-config.js',
    'teen-auth.js',
    'icon-192.png',
    'icon-512.png'
)

$exito = 0
$errores = 0

foreach ($archivo in $archivos) {
    $fullPath = Join-Path $localPath $archivo
    if (Test-Path $fullPath) {
        try {
            Write-Host "  Subiendo $archivo..." -NoNewline
            $webclient.UploadFile($baseUrl + $archivo, $fullPath)
            Write-Host " OK" -ForegroundColor Green
            $exito++
        }
        catch {
            Write-Host " ERROR: $($_.Exception.Message)" -ForegroundColor Red
            $errores++
        }
    }
    else {
        Write-Host "  OMITIDO (no existe): $archivo" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host ">>> Sincronizando en /public_html/..." -ForegroundColor Cyan
$baseUrl2 = 'ftp://46.202.182.197/public_html/'

foreach ($archivo in $archivos) {
    $fullPath = Join-Path $localPath $archivo
    if (Test-Path $fullPath) {
        try {
            $webclient.UploadFile($baseUrl2 + $archivo, $fullPath)
        }
        catch {
            # Silencioso
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DESPLIEGUE v61 COMPLETADO" -ForegroundColor White
Write-Host "  Archivos subidos: $exito" -ForegroundColor Green
if ($errores -gt 0) {
    Write-Host "  Errores: $errores" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "AHORA: Abre Legado Biblico en tu celular" -ForegroundColor Yellow
Write-Host "y pulsa el boton ACTUALIZAR (rojo)" -ForegroundColor Yellow
Write-Host ""
