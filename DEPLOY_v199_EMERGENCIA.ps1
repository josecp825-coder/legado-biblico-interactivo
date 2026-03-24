# DEPLOY EMERGENCIA v199 - Force cache busting + subir todos los archivos criticos
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# Subir version.json primero
$archivos = @('version.json', 'data_iglesia_v1.js', 'sw.js', 'index.html', 'legado.html')
foreach ($f in $archivos) {
    $localFile = Join-Path $localPath $f
    if (Test-Path $localFile) {
        try {
            $webclient.UploadFile("ftp://46.202.182.197/public_html/$f", $localFile)
            Write-Host "  $f [OK]"
        }
        catch {
            Write-Host "  $f [ERROR] $($_.Exception.Message)"
        }
    } else {
        Write-Host "  $f [NO EXISTE LOCALMENTE]"
    }
}
Write-Host 'v199 DEPLOY EMERGENCIA COMPLETO'
