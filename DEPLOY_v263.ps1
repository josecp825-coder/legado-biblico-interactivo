# DEPLOY v263 - FIX REAL: Imagen Todos muestra SOLO días con datos
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('_pdf_eventos.js','_add_eventos_especiales.js','index.html','version.json')) {
    try { $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f)); Write-Host "  $f [OK]" }
    catch { Write-Host "  $f [ERROR]" }
}
Write-Host 'v263 LISTO - Imagen Todos = solo dias con datos (Dom15, Lun16, Mar17)'
