# DEPLOY v269 - Firebase Sync TOTAL Iglesia (Liturgias + Predicaciones + Eventos + Cultos)
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
$archivos = @(
    '_firebase_sync_iglesia.js',
    '_add_eventos_especiales.js',
    'index.html',
    'version.json'
)
foreach ($f in $archivos) {
    try { $webclient.UploadFile("ftp://46.202.182.197/$f", (Join-Path $localPath $f)); Write-Host "  $f [OK]" }
    catch { Write-Host "  $f [ERROR] $_" }
}
Write-Host ''
Write-Host '========================================='
Write-Host 'v269 - FIREBASE SYNC COMPLETO - LISTO'
Write-Host 'Modulos protegidos: Cultos + Eventos + Liturgias + Predicaciones'
Write-Host '========================================='
