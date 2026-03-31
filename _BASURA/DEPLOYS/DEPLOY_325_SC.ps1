# ============================================================
# DEPLOY - LEGADO BÍBLICO → NUEVO HOSTINGER
# ============================================================
$ftpHost  = '82.25.87.104'
$ftpUser  = 'u166906157'
$ftpPass  = 'Qwzx2121#'
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @(
    'index.html',
    'version.json',
    'sw.js',
    '_add_eventos_especiales.js',
    '_pdf_eventos.js',
    'data_iglesia_v1.js'
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  DEPLOY v325 → legadobiblicopro.com" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

foreach ($f in $archivos) {
    $localFile = Join-Path $localPath $f
    if (Test-Path $localFile) {
        try {
            $webclient.UploadFile("$ftpBase/$f", $localFile)
            Write-Host "  [OK] $f" -ForegroundColor Green
        } catch {
            Write-Host "  [ERR] $f $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  [XX] $f" -ForegroundColor Yellow
    }
}
Write-Host "Fin de deploy." -ForegroundColor Cyan
