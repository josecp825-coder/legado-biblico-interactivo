# ============================================
# DEPLOY v564 - Legado Biblico
# Fix: Boton editar culto sabado en historial
# ============================================

$server    = "82.25.87.104"
$user      = "u166906157"
$pass      = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"
$localBase = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$archivos = @(
    'sw.js',
    'index.html',
    'version.json',
    'data_iglesia_v1.js'
)

Write-Host ""
Write-Host "DEPLOY v564 - Fix Editar Culto Sabado" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor DarkCyan
Write-Host ""

$ok = 0
$fail = 0

foreach ($f in $archivos) {
    $localPath = Join-Path $localBase $f

    if (!(Test-Path $localPath)) {
        Write-Host ("  FALTA: " + $f) -ForegroundColor Red
        $fail++
        continue
    }

    try {
        $uri = "ftp://$server$remoteDir/$f"
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        $webclient.UploadFile($uri, $localPath)
        
        $sizeKB = [math]::Round((Get-Item $localPath).Length / 1024, 1)
        Write-Host ("  OK: " + $f + " (" + $sizeKB + " KB)") -ForegroundColor Green
        $ok++
    }
    catch {
        Write-Host ("  ERROR: " + $f + " - " + $_.Exception.Message) -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor DarkCyan
Write-Host ("Resultado: " + $ok + " OK, " + $fail + " fallos") -ForegroundColor Cyan

if ($fail -eq 0) {
    Write-Host "DEPLOY v564 COMPLETADO!" -ForegroundColor Green
} else {
    Write-Host "Algunos archivos fallaron." -ForegroundColor Yellow
}
