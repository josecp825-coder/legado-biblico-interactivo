# DEPLOY v219 - BIBLIA-BACK-FIX (v230)
# FIX RAIZ REAL: El boton <- del selector Biblia llama cerrarBibliaOverlay()
# esa funcion solo borraba el overlay sin restaurar nada -> pantalla negra.
# Ahora cerrarBibliaOverlay() limpia el lector y restaura la pantalla correcta.
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('index.html', 'version.json')) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host 'v219 BIBLIA-BACK-FIX DESPLEGADO'
