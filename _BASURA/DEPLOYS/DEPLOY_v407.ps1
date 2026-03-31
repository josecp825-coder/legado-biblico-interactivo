# DEPLOY v407 - LEGADO BIBLICO (HOSTINGER)
# ESTE SCRIPT SUBE LOS 3 ARCHIVOS CRITICOS MAS LOS AFECTADOS PARA EL CACHING
$ftpHost   = "82.25.87.104"
$ftpUser   = "u166906157"
$ftpPass   = "Qwzx2121#"
$ftpBase   = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$wc = New-Object System.Net.WebClient
$wc.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @(
    'index.html',
    'sw.js',
    'version.json'
)

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host " SUBIENDO ACTUALIZACION BLINDADA v407" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$ok = 0; $err = 0;
foreach ($f in $archivos) {
    $src = Join-Path $localPath $f
    try {
        $wc.UploadFile("$ftpBase/$f", $src)
        Write-Host "  OK  $f" -ForegroundColor Green
        $ok++
    } catch {
        Write-Host "  ERR $f -> $($_.Exception.Message)" -ForegroundColor Red
        $err++
    }
}

Write-Host "Comprueba en: https://legadobiblicopro.com/version.json" -ForegroundColor White
Write-Host "Hecho!" -ForegroundColor Yellow
Start-Sleep -Seconds 5
