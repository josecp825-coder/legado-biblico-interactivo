# DEPLOY v250 - PLANTILLA-MOBILE-FIX
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$filesToDeploy = @('version.json', 'sw.js', 'data_iglesia_v1.js')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raíz"
    } catch { 
        Write-Host "  $f [ERROR Raíz] $($_.Exception.Message)" 
    }
}
Write-Host 'v250 DESPLEGADO EXITOSAMENTE'
