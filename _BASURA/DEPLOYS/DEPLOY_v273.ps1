# DEPLOY v273 - FIX editar evento + Calendario en fecha (3 fixes en 1)
# Fix 1: Editar evento Santa Cena ahora carga los datos correctamente
# Fix 2: Titulo doxologia se guarda correctamente
# Fix 3: Campo de fecha usa calendario del dispositivo (sin fecha fija)
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('_add_eventos_especiales.js','version.json')) {
    try { $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f)); Write-Host "  $f [OK]" }
    catch { Write-Host "  $f [ERROR] $_" }
}
Write-Host ''
Write-Host '========================================='
Write-Host 'v305 - 3 FIXES INCLUIDOS'
Write-Host '1. Editar evento carga los datos'
Write-Host '2. Titulo doxologia se guarda'
Write-Host '3. Fecha abre calendario del dispositivo'
Write-Host '========================================='
