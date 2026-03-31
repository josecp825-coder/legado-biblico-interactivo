$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

foreach ($f in @('data_iglesia_v1.js', 'index.html', 'sw.js', 'version.json')) {
    try {
        $webclient.UploadFile("$ftpBase/$f", (Join-Path $localPath $f))
        Write-Host "OK -> $f" -ForegroundColor Green
    } catch {
        Write-Host "ERROR -> $f : $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host "`nv548 DESPLEGADO - Fix boton Editar historial Culto de Semana"
