# DEPLOY v257-FULL: Actualiza SW cache name + todos los archivos
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$files = @('sw.js', '_pdf_eventos.js', '_add_eventos_especiales.js', 'version.json', 'index.html')

foreach ($f in $files) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    } catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host 'v257 FULL RESET - CACHE INVALIDADA'
