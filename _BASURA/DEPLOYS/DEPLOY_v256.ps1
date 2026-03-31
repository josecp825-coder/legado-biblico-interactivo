# DEPLOY v256 - FIX CRITICO: Seleccion de dias ahora funciona correctamente
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# Bug 1 corregido: _psTodosToggle ahora SIEMPRE selecciona - no hace toggle
# Bug 2 corregido: _psGenerar usa modo 'todos' cuando todos estan seleccionados (no depende de _diaSelElegir)
# Nuevo: boton Ninguno para deseleccionar todo
$filesToDeploy = @('_pdf_eventos.js', 'version.json', 'index.html')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    } catch { 
        Write-Host "  $f [ERROR] $($_.Exception.Message)" 
    }
}
Write-Host 'v256 DESPLEGADO - Fix seleccion multiple de dias'
