# DEPLOY v182 - Himnario por Categoría
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('version.json', 'himnario_data.js', 'data_iglesia_v1.js')) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host 'v182 HIMNARIO-CATEGORIAS DESPLEGADO'
