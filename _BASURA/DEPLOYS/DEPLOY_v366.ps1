# DEPLOY v366 - AUDITORIA FULL FIX - 2026-03-23
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u166906157', 'Qwzx2121#')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
$ftpBase = 'ftp://82.25.87.104/domains/legadobiblicopro.com/public_html'

$filesToUpload = @(
    'index.html',
    'sw.js',
    'manifest.json',
    'firebase-service.js',
    'version.json'
)

Write-Host "=== DEPLOY v366 - AUDITORIA FULL FIX ===" -ForegroundColor Cyan
$ok = 0
$fail = 0

foreach ($f in $filesToUpload) {
    try {
        $localFile = Join-Path $localPath $f
        $ftpUrl = "$ftpBase/$f"
        $webclient.UploadFile($ftpUrl, $localFile)
        Write-Host "  OK: $f" -ForegroundColor Green
        $ok++
    }
    catch {
        Write-Host "  FALLA: $f - $($_.Exception.Message)" -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host "OK: $ok | FALLAS: $fail" -ForegroundColor Cyan
Write-Host "v366 DESPLEGADO" -ForegroundColor Green
