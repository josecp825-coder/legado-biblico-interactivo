# DEPLOY v139 — Mejoras Módulo Eventos Especiales
# Cambios: Himno→Título auto, Cita Bíblica+Búsqueda, Vista Previa del documento
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('_add_eventos_especiales.js', 'sw.js', 'version.json')) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host "v139 DESPLEGADO - Eventos: Himno Auto + Biblia + Vista Previa"
