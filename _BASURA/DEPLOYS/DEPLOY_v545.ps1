$ErrorActionPreference = "Stop"

$version = "545"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOY BLINDADO v$version" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

$filesToUpload = @(
    "index.html",
    "sw.js",
    "version.json",
    "data_iglesia_v1.js",
    "_cultos_regulares.js",
    "_motor_plantillas_v2.js"
)

$server = "82.25.87.104"
$user = "u166906157"
$pass = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"

foreach ($f in $filesToUpload) {
    if (Test-Path $f) {
        $uri = "ftp://$server$remoteDir/$f"
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        try {
            $webclient.UploadFile($uri, $f)
            Write-Host "[OK] $f subido" -ForegroundColor Green
        } catch {
            Write-Host "[FALLO] $f : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "[SKIP] $f no existe" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOY v$version COMPLETADO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
