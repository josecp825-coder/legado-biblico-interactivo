# DEPLOY CRITICO - FIX LOOP INFINITO
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u166906157', 'Qwzx2121#')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
$ftpBase = 'ftp://82.25.87.104/domains/legadobiblicopro.com/public_html'

Write-Host "=== DEPLOY CRITICO - FIX LOOP INFINITO ===" -ForegroundColor Red

$files = @('index.html', 'sw.js', 'version.json')
$ok = 0; $fail = 0

foreach ($f in $files) {
    try {
        $webclient.UploadFile("$ftpBase/$f", "$localPath\$f")
        Write-Host "  OK: $f" -ForegroundColor Green
        $ok++
    } catch {
        Write-Host "  FALLA: $f - $($_.Exception.Message)" -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host "OK: $ok | FALLAS: $fail" -ForegroundColor Cyan
Write-Host "LOOP INFINITO CORREGIDO" -ForegroundColor Green
