# DEPLOY v179 - Año Bíblico agrupado + navegación corregida
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('version.json', 'index.html')) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host 'v179 ANO-BIBLICO-AGRUPADO DESPLEGADO'
