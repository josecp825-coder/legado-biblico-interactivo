# DEPLOY v268 - Firebase Sync para Eventos Especiales (NUNCA MAS SE PIERDEN DATOS)
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('_add_eventos_especiales.js','export-datos.html','version.json')) {
    try { $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f)); Write-Host "  $f [OK]" }
    catch { Write-Host "  $f [ERROR] $_" }
}
Write-Host 'v268 - FIREBASE SYNC EVENTOS + EXPORT-DATOS - LISTO'
