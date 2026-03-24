# DEPLOY v271 - FIX: titulo_ev_doxologia se guardaba (solo salia el numero 55)
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('_add_eventos_especiales.js','version.json')) {
    try { $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f)); Write-Host "  $f [OK]" }
    catch { Write-Host "  $f [ERROR] $_" }
}
Write-Host 'v271 - FIX TITULO DOXOLOGIA - LISTO'
