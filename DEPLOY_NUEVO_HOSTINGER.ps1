$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @("index.html", "version.json", "sw.js", "manifest.json", "data_iglesia_v1.js")

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  DEPLOY -> legadobiblicopro.com" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

foreach ($f in $archivos) {
    $localFile = Join-Path $localPath $f
    if (Test-Path $localFile) {
        try {
            $webclient.UploadFile("$ftpBase/$f", $localFile)
            Write-Host "  [OK] $f" -ForegroundColor Green
        } catch {
            Write-Host "  [ERROR] $f : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  [NOT FOUND] $f" -ForegroundColor Yellow
    }
}

Write-Host "Deploy complete." -ForegroundColor Cyan
Write-Host "Verify at: https://legadobiblicopro.com/version.json" -ForegroundColor White
