$server    = "82.25.87.104"
$user      = "u166906157"
$pass      = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"
$localBase = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$archivos = @('sw.js','index.html','version.json','_motor_plantillas_v2.js')

Write-Host "DEPLOY v566 - Plantilla Sabado Rediseño" -ForegroundColor Cyan
$ok = 0; $fail = 0
foreach ($f in $archivos) {
    $localPath = Join-Path $localBase $f
    if (!(Test-Path $localPath)) { Write-Host ("  FALTA: " + $f) -ForegroundColor Red; $fail++; continue }
    try {
        $uri = "ftp://$server$remoteDir/$f"
        $wc = New-Object System.Net.WebClient
        $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        $wc.UploadFile($uri, $localPath)
        $sizeKB = [math]::Round((Get-Item $localPath).Length / 1024, 1)
        Write-Host ("  OK: " + $f + " (" + $sizeKB + " KB)") -ForegroundColor Green
        $ok++
    } catch { Write-Host ("  ERROR: " + $f + " - " + $_.Exception.Message) -ForegroundColor Red; $fail++ }
}
Write-Host ("Resultado: " + $ok + " OK, " + $fail + " fallos")
if ($fail -eq 0) { Write-Host "DEPLOY v566 COMPLETADO!" -ForegroundColor Green }
