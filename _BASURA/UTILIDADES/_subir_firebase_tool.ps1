$wc = New-Object System.Net.WebClient
$wc.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$f = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\recuperar-firebase.html'

foreach ($ruta in @('ftp://46.202.182.197/recuperar-firebase.html', 'ftp://46.202.182.197/public_html/recuperar-firebase.html')) {
    try {
        $wc.UploadFile($ruta, $f)
        Write-Host "SUBIDO OK -> $ruta" -ForegroundColor Green
    } catch {
        Write-Host "ERROR $ruta : $($_.Exception.Message)" -ForegroundColor Red
    }
}
