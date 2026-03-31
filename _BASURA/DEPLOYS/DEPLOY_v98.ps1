# DEPLOY v98 - LAYOUT BIBLICO COMPACTO
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$baseUrl = 'ftp://46.202.182.197/'
$baseUrl2 = 'ftp://46.202.182.197/public_html/'
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$ARCHIVOS = @('index.html', 'sw.js', 'version.json', 'style.css')
$ok = 0

Write-Host "=== LEGADO BIBLICO v98 - LAYOUT BIBLICO ==="
foreach ($f in $ARCHIVOS) {
    $src = Join-Path $localPath $f
    try {
        $webclient.UploadFile($baseUrl + $f, $src)
        $webclient.UploadFile($baseUrl2 + $f, $src)
        Write-Host "  $f [OK]"
        $ok++
    }
    catch {
        Write-Host "  $f [ERROR]"
    }
}
Write-Host "=== v98 DESPLEGADO - $ok archivos OK ==="
