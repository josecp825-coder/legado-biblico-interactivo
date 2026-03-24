# DEPLOY v218 - PANTALLA-NEGRA-FIX (v229)
# FIX REAL: floating-bible-nav vive DENTRO de biblia-overlay.
# Al presionar ATRAS desde el lector Biblico, Check2 borraba el overlay
# pero no restauraba nada debajo → pantalla negra.
# Ahora Check2 limpia el panel OCULTAR BARRA Y re-renderiza la pantalla correcta.
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
Write-Host 'v218 PANTALLA-NEGRA-FIX DESPLEGADO'
