# DEPLOY v140 — PDF + Plantilla HTML para Eventos Especiales
# Cambios: Nuevo modulo _pdf_eventos.js con PDF profesional e imagen WhatsApp
#          Selector de dias (todos o elegir cuales), botones en historial de eventos
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
$archivos = @('_add_eventos_especiales.js', '_pdf_eventos.js', 'index.html', 'sw.js', 'version.json')
foreach ($f in $archivos) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host "v140 DESPLEGADO - PDF + Plantilla Imagen para Eventos Especiales"
