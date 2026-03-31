$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localFile = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\export-datos.html'

Write-Host "Subiendo export-datos.html al servidor..." -ForegroundColor Cyan

try {
    $webclient.UploadFile('ftp://46.202.182.197/public_html/export-datos.html', $localFile)
    Write-Host "OK - Subido a public_html/export-datos.html" -ForegroundColor Green
} catch {
    Write-Host "ERROR public_html: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $webclient.UploadFile('ftp://46.202.182.197/export-datos.html', $localFile)
    Write-Host "OK - Subido a raiz/export-datos.html" -ForegroundColor Green
} catch {
    Write-Host "ERROR raiz: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Listo. Abre en tu navegador:" -ForegroundColor Yellow
Write-Host "https://agendatecnicadigital.com/export-datos.html" -ForegroundColor Cyan
