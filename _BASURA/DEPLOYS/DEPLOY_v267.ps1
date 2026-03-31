# DEPLOY v267 - Selector de dias multiples para WhatsApp en eventos especiales
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('_add_eventos_especiales.js','version.json')) {
    try { $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f)); Write-Host "  $f [OK]" }
    catch { Write-Host "  $f [ERROR]" }
}
Write-Host 'v267 - SELECTOR DIAS WHATSAPP - LISTO'
