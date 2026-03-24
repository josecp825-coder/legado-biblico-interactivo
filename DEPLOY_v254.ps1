# DEPLOY v254 - AUTOGUARDADO: Guarda datos de cada dia al cambiar de pestaña
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# Fix critico: al cambiar de dia en el editor, ahora se guarda automaticamente en localStorage
# Antes: solo se guardaba en memoria → si el usuario no presionaba GUARDAR al final, se perdia
$filesToDeploy = @('_add_eventos_especiales.js', 'version.json', 'index.html')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raiz"
    } catch { 
        Write-Host "  $f [ERROR Raiz] $($_.Exception.Message)" 
    }
}
Write-Host 'v254 DESPLEGADO - Autoguardado por dia activo'
