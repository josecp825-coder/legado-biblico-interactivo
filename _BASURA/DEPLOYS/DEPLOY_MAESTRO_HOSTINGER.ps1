# ================================================================
# DEPLOY MAESTRO LEGADO BIBLICO -> legadobiblicopro.com
# JAMAS usar 46.202.182.197 (agendatecnicadigital.com)
# ================================================================

$ftpHost   = "82.25.87.104"
$ftpUser   = "u166906157"
$ftpPass   = "Qwzx2121#"
$ftpBase   = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$dominio   = "https://legadobiblicopro.com"
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$wc = New-Object System.Net.WebClient
$wc.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

# 1. Leer version y sumar 1
$versionFile = "$localPath\version.json"
$vj = Get-Content $versionFile -Raw | ConvertFrom-Json
$VERSION = ([int]$vj.version) + 1
$nuevoJson = '{"version":"' + $VERSION + '","nombre":"DEPLOY-COMPLETO","fecha":"' + (Get-Date -Format "yyyy-MM-dd") + '"}'
[System.IO.File]::WriteAllText($versionFile, $nuevoJson, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  DEPLOY MAESTRO LEGADO BIBLICO -> v$VERSION"      -ForegroundColor Cyan
Write-Host "  Servidor: legadobiblicopro.com"                  -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 2. Actualizar _HTML_VERSION en index.html
$idxPath = "$localPath\index.html"
$idx = [System.IO.File]::ReadAllText($idxPath, [System.Text.Encoding]::UTF8)
$idx = [regex]::Replace($idx, "const _HTML_VERSION = '\d+';", "const _HTML_VERSION = '$VERSION';")

# Actualizar cache busters de JS
$jsFiles = @('_add_eventos_especiales.js','_pdf_eventos.js','_nueva_funcion.js',
             'fix_herramientas_culto.js','data_iglesia_v1.js','style.css',
             'mobile.css','firebase-config.js','cba_motor.js',
             '_motor_plantillas_v2.js','_cultos_regulares.js')
foreach ($j in $jsFiles) {
    $pattern = [regex]::Escape($j) + '\?v=\d+'
    $idx = [regex]::Replace($idx, $pattern, ($j + "?v=$VERSION"))
}
[System.IO.File]::WriteAllText($idxPath, $idx, [System.Text.Encoding]::UTF8)
Write-Host ""
Write-Host "[1/3] index.html actualizado -> _HTML_VERSION = '$VERSION'" -ForegroundColor Yellow

# 3. Lista completa de archivos
$archivos = @(
    'index.html', 'legado.html',
    'style.css', 'mobile.css',
    'sw.js', 'version.json', 'manifest.json',
    'icon-192.png', 'icon-512.png',
    'data_motor.js', 'cba_motor.js',
    'data_iglesia_v1.js',
    'data_kids_v2.js', 'kids_cinema.js',
    'data_jovenes.js',
    'data_adultos_v37.js',
    'data_teens_v8.js',
    'trivia_parte1.js', 'trivia_parte2.js', 'trivia_parte3.js',
    'himnario_data.js',
    '_add_eventos_especiales.js',
    '_pdf_eventos.js',
    '_nueva_funcion.js',
    'fix_herramientas_culto.js',
    '_ano_biblico_v2.js',
    '_juego_penal_biblico.js',
    '_penal_visual.js',
    '_motor_plantillas_v2.js',
    '_cultos_regulares.js',
    'firebase-config.js', 'firebase-service.js', 'teen-auth.js',
    'versus_engine.js', 'html2canvas.min.js', 'jspdf.umd.min.js',
    'reset.html'
)

Write-Host "[2/3] Subiendo $($archivos.Count) archivos..." -ForegroundColor Yellow
Write-Host ""

$ok = 0; $err = 0; $skip = 0
foreach ($f in $archivos) {
    $src = Join-Path $localPath $f
    if (-not (Test-Path $src)) {
        Write-Host "  OMITIDO: $f" -ForegroundColor Gray
        $skip++
        continue
    }
    try {
        $wc.UploadFile("$ftpBase/$f", $src)
        Write-Host "  OK  $f" -ForegroundColor Green
        $ok++
    } catch {
        $msg = $_.Exception.Message
        Write-Host "  ERR $f -> $msg" -ForegroundColor Red
        $err++
    }
}

# 4. Verificar
Write-Host ""
Write-Host "[3/3] Verificando en servidor..." -ForegroundColor Yellow
try {
    $wv = New-Object System.Net.WebClient
    $ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    $resp = $wv.DownloadString("$dominio/version.json?t=$ts")
    $vServ = ($resp | ConvertFrom-Json).version
    if ($vServ -eq "$VERSION") {
        Write-Host "  CONFIRMADO: servidor v$vServ OK" -ForegroundColor Green
    } else {
        Write-Host "  ALERTA: servidor tiene v$vServ esperaba v$VERSION" -ForegroundColor Red
    }
} catch {
    Write-Host "  No se pudo verificar online" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  DEPLOY v$VERSION COMPLETO"                        -ForegroundColor Cyan
Write-Host "  OK:$ok  ERR:$err  OMITIDOS:$skip"                -ForegroundColor White
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Verificar: $dominio/version.json"                -ForegroundColor White
Write-Host ""
