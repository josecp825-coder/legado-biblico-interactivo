# 🩹 REPARACIÓN RÁPIDA — LEGADO BÍBLICO (AISLAMIENTO TOTAL v83)
# ESTE SCRIPT SOLO TOCA LA RAÍZ (/)

$ftpUser = 'u934484274.agendatecnicadigital.com'
$ftpPass = 'Qwzx2121@'
$baseUri = 'ftp://46.202.182.197/'
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$filesToUpload = @(
    "index.html",
    "legado.html",
    "sw.js",
    "manifest.json",
    "version.json",
    "firebase-config.js"
)

# NUEVA RUTA AISLADA
$basePath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\"

foreach ($fileName in $filesToUpload) {
    Write-Host "Subiendo $fileName a la raíz (/) ..."
    try {
        $webclient.UploadFile($baseUri + $fileName, $basePath + $fileName)
        Write-Host "¡$fileName OK!" -ForegroundColor Green
    }
    catch {
        Write-Host "Error en $fileName : $_" -ForegroundColor Red
    }
}

Write-Host "--- REPARACIÓN DE LEGADO BÍBLICO FINALIZADA ---" -ForegroundColor Cyan
