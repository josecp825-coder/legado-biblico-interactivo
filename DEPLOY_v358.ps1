# DEPLOY v358 - MEGA ACTUALIZAR
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u166906157', 'Qwzx2121#')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$filesToUpload = @(
    'index.html',
    'version.json',
    'sw.js'
)

foreach ($f in $filesToUpload) {
    try {
        $webclient.UploadFile("ftp://82.25.87.104/domains/legadobiblicopro.com/public_html/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host "v358 - Mega Actualizar DESPLEGADO"
