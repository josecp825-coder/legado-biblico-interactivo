# DEPLOY v249 - EVENTOS-MONDAY (Fix plantilla Lunes/Martes)
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$filesToDeploy = @('version.json', 'sw.js', '_add_eventos_especiales.js', '_pdf_eventos.js')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raíz"
    } catch { 
        Write-Host "  $f [ERROR Raíz] $($_.Exception.Message)" 
    }
}
Write-Host 'v249 DESPLEGADO EXITOSAMENTE'
