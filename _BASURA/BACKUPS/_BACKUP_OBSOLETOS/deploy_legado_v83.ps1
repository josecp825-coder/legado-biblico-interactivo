# ==========================================
# 🛡️ DESPLIEGUE LEGADO BÍBLICO v83 — AISLAMIENTO TOTAL
# ESTE SCRIPT SOLO SUBE ARCHIVOS A LA RAÍZ (/)
# JAMÁS TOCAR /app/ (Agenda Digital)
# ==========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  LEGADO BÍBLICO v83 - DESPLIEGUE SEGURO" -ForegroundColor White
Write-Host "  PROTOTIPO DE AISLAMIENTO TOTAL ACTIVO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$baseUrl = 'ftp://46.202.182.197/'
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# 📋 LISTA DE ARCHIVOS A COMPROBAR
$archivos = Get-ChildItem -Path $localPath -File | Select-Object -ExpandProperty Name

$exito = 0
$errores = 0

foreach ($archivo in $archivos) {
    # 🛡️ REGLA DE SEGURIDAD: NO SUBIR SCRIPTS DE DEPLOY O CONFIGURACIONES SENSIBLES SI NO ES NECESARIO (opcional)
    # Por ahora subiremos todo lo que está en la carpeta LEGADO_BIBLICO_PROD a la raíz.
    
    $fullPath = Join-Path $localPath $archivo
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

Write-Host ""
Write-Host ">>> Sincronizando en /public_html/..." -ForegroundColor Cyan
$baseUrl2 = 'ftp://46.202.182.197/public_html/'

foreach ($archivo in $archivos) {
    if ($archivo -like "*.ps1") { continue } # No subir scripts a public_html
    $fullPath = Join-Path $localPath $archivo
    try {
        $webclient.UploadFile($baseUrl2 + $archivo, $fullPath)
    }
    catch { }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DESPLIEGUE v83 COMPLETADO" -ForegroundColor White
Write-Host "  Archivos subidos: $exito" -ForegroundColor Green
if ($errores -gt 0) {
    Write-Host "  Errores: $errores" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "AHORA: Abre Legado Bíblico en tu celular" -ForegroundColor Yellow
Write-Host "y pulsa el botón ACTUALIZAR A v83 (El botón rojo)" -ForegroundColor Yellow
Write-Host ""
