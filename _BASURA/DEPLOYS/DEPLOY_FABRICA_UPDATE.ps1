$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html/fabrica"
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @(
    '_motor_plantillas_v2.js',
    '_cultos_regulares.js',
    'sw.js',
    'index.html',
    'version.json'
)

foreach ($f in $archivos) {
    try {
        $webclient.UploadFile("$ftpBase/$f", (Join-Path $localPath $f))
        Write-Host "OK subido a FABRICA -> $f" -ForegroundColor Green
    } catch {
        Write-Host "ERROR -> $_" -ForegroundColor Red
    }
}
Write-Host ">>> DEPLOY EN FABRICA COMPLETADO <<<" -ForegroundColor Cyan
