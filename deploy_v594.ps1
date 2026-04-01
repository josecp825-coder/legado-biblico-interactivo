$server    = "82.25.87.104"
$user      = "u166906157"
$pass      = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"
$localBase = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$archivos = @(
    'index.html',
    'sw.js',
    'version.json',
    '_cultos_regulares.js'
)

Write-Host "DEPLOY v594 - FORMULARIO LIMPIO + NO DUPLICAR" -ForegroundColor Cyan

foreach($f in $archivos) {
    $lp = Join-Path $localBase $f;
    try {
        $wc = New-Object System.Net.WebClient;
        $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pass);
        $wc.UploadFile("ftp://$server$remoteDir/$f", $lp);
        Write-Host "  OK: $f" -ForegroundColor Green
    } catch {
        Write-Host "  ERR: $f" -ForegroundColor Red
    }
}
Write-Host "DEPLOY v594 OK!" -ForegroundColor Green
