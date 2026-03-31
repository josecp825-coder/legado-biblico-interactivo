# DEPLOY v220 - PENALES BIBLICOS (v231)
# Nuevo juego: Penales Biblicos para Adolescentes
# - 11 categorias, 165+ preguntas, 2-4 jugadores
# - Meta configurable: 3, 5, 7 o 10 goles
# - Animaciones de gol y fallo, marcador en vivo
# - Jovenes en la Biblia + Ninos en la Biblia agregados
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
foreach ($f in @('index.html', 'sw.js', 'version.json', 'data_teens_v8.js', '_juego_penal_biblico.js')) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f, (Join-Path $localPath $f))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f, (Join-Path $localPath $f))
        Write-Host "  $f [OK]"
    }
    catch {
        Write-Host "  $f [ERROR] $($_.Exception.Message)"
    }
}
Write-Host 'v220 PENALES-BIBLICOS DESPLEGADO'
