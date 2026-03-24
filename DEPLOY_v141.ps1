# DEPLOY v141 — Librerías locales (html2canvas + jsPDF) + fix plantilla Canvas 2D
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$archivos = @(
    @{ local = '_add_eventos_especiales.js'; remote = '_add_eventos_especiales.js' },
    @{ local = '_pdf_eventos.js';            remote = '_pdf_eventos.js' },
    @{ local = 'index.html';                 remote = 'index.html' },
    @{ local = 'sw.js';                      remote = 'sw.js' },
    @{ local = 'version.json';               remote = 'version.json' },
    @{ local = 'libs\html2canvas.min.js';    remote = 'libs/html2canvas.min.js' },
    @{ local = 'libs\jspdf.umd.min.js';     remote = 'libs/jspdf.umd.min.js' }
)

foreach ($f in $archivos) {
    try {
        $webclient.UploadFile('ftp://46.202.182.197/' + $f.remote, (Join-Path $localPath $f.local))
        $webclient.UploadFile('ftp://46.202.182.197/public_html/' + $f.remote, (Join-Path $localPath $f.local))
        Write-Host "  $($f.remote) [OK]"
    }
    catch {
        Write-Host "  $($f.remote) [ERROR] $($_.Exception.Message)"
    }
}
Write-Host "v141 DESPLEGADO - Librerias locales + Canvas 2D plantilla"
