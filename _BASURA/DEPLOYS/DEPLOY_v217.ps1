# DEPLOY v217 - BUGFIX-NAV (v228)
# Correcciones aplicadas:
#   BUG-1: Pantalla negra al regresar del lector biblico (popstate fix)
#   BUG-2: App recordaba modulo activo al reabrir (hash limpieza en onload)
#   M2: Panel flotante del lector se limpia correctamente al salir
#   M3: Guard en abrirSelectorBiblias si modulo Biblia no esta lista
#   M5+M6: _ano_biblico_v2.js, fix_herramientas_culto.js, _nueva_funcion.js ahora en cache SW
#   M8: Guard en boton Ano Biblico si el modulo tarda en cargar
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('index.html', 'sw.js', 'version.json')) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host 'v217 BUGFIX-NAV DESPLEGADO'
