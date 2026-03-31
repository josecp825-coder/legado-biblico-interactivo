$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html" 
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

Write-Host "Subiendo _pdf_eventos.js..." -ForegroundColor Cyan
try {
    $webclient.UploadFile("$ftpBase/_pdf_eventos.js", (Join-Path $localPath '_pdf_eventos.js'))
    Write-Host "  [OK] _pdf_eventos.js subido" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] $_" -ForegroundColor Red
}
