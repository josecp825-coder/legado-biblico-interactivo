# DEPLOY v253 - MULTI-DIA-PICKER: Selector multiple de dias para PDF y Plantilla
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# Nuevo: elegirDiaEvento ahora muestra checkboxes para seleccionar 1, varios o todos los dias
$filesToDeploy = @('_add_eventos_especiales.js', 'version.json', 'index.html')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raiz"
    } catch { 
        Write-Host "  $f [ERROR Raiz] $($_.Exception.Message)" 
    }
}
Write-Host 'v253 DESPLEGADO - Selector multi-dia para PDF y Plantilla activo'
