# DEPLOY v255 - 10 PLANTILLAS + FIX BUG "Todos muestra solo Domingo" + Banner titulo evento
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$filesToDeploy = @('_pdf_eventos.js', '_add_eventos_especiales.js', 'version.json', 'index.html')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raiz"
    } catch { 
        Write-Host "  $f [ERROR Raiz] $($_.Exception.Message)" 
    }
}
Write-Host 'v255 DESPLEGADO'
Write-Host '  - FIX: Plantilla Todos ahora muestra TODOS los dias con datos'
Write-Host '  - NUEVO: 10 plantillas de colores para elegir antes de generar imagen'
Write-Host '  - NUEVO: Boton GENERAR IMAGEN unificado (dias + plantilla en un solo modal)'
Write-Host '  - NUEVO: Banner del titulo del evento en cada dia del formulario'
