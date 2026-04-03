$server    = "82.25.87.104"
$user      = "u166906157"
$pass      = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"
$localBase = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$archivos = @(
    'sw.js',
    'version.json',
    '_cultos_regulares.js',
    'data_iglesia_v1.js'
)

Write-Host "DEPLOY v598 - FIX VOLVER DEFINITIVO" -ForegroundColor Cyan

foreach($f in $archivos) {
    $lp = Join-Path $localBase $f
    $size = (Get-Item $lp).Length
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        $wc.UploadFile("ftp://$server$remoteDir/$f", $lp)
        Write-Host "  OK: $f ($size bytes)" -ForegroundColor Green
    } catch {
        Write-Host "  ERR: $f - $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host "DEPLOY v598 OK!" -ForegroundColor Green
