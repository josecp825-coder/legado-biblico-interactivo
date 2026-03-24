# DEPLOY v251 - EMERGENCIA: Sincronizar HTML version con servidor (fix bucle infinito carga)
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# CRITICO: index.html tenia _HTML_VERSION='248' pero servidor tenia version.json='251'
# Eso causaba bucle infinito de recargas → PWA se quedaba cargando eternamente
# Fix: _HTML_VERSION='251' ahora coincide con el servidor → sin bucle
$filesToDeploy = @('index.html')

foreach ($f in $filesToDeploy) {
    try {
        $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f))
        Write-Host "  $f [OK] - Raiz"
    } catch { 
        Write-Host "  $f [ERROR Raiz] $($_.Exception.Message)" 
    }
}
Write-Host 'v251 EMERGENCIA DESPLEGADO EXITOSAMENTE - PWA ya no deberia congelarse'
