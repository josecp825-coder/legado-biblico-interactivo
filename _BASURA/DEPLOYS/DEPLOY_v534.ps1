$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @(
    '_cultos_regulares.js',
    'sw.js',
    'index.html',
    'version.json'
)

foreach ($f in $archivos) {
    try {
        $webclient.UploadFile("$ftpBase/$f", (Join-Path $localPath $f))
        Write-Host "OK -> $f" -ForegroundColor Green
    } catch {
        Write-Host "ERROR subiendo $f -> $_" -ForegroundColor Red
    }
}

Write-Host "=============================" -ForegroundColor Cyan
Write-Host "🚀 DEPLOY v534 COMPLETADO 🚀" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
