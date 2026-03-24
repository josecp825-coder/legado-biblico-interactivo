# DEPLOY v252 - Fix vista previa plantilla: imagen scrollable y completa en movil
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# Fix: la imagen de la plantilla ahora ocupa width:100% con scroll correcto
# Antes: max-width:100% con flex justify-content:center → se veia cortada verticalmente
$filesToDeploy = @('_pdf_eventos.js', 'version.json', 'index.html')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raiz"
    } catch { 
        Write-Host "  $f [ERROR Raiz] $($_.Exception.Message)" 
    }
}
Write-Host 'v252 DESPLEGADO - Vista previa plantilla corregida'
