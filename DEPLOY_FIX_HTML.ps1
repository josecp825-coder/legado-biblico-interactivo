$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html" 
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @(
    'index.html',
    'version.json',
    'sw.js',
    '_firebase_sync_iglesia.js',
    '_add_eventos_especiales.js',
    '_pdf_eventos.js',
    'data_iglesia_v1.js'
)

Write-Host "Subiendo index y version FIX..." -ForegroundColor Cyan
foreach ($f in $archivos) {
    try {
        $webclient.UploadFile("$ftpBase/$f", (Join-Path $localPath $f))
        Write-Host "  [OK] $f subido" -ForegroundColor Green
    } catch {
        Write-Host "  [ERROR] $_" -ForegroundColor Red
    }
}
