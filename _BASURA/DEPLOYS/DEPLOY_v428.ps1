$ftpHost   = "82.25.87.104"
$ftpUser   = "u166906157"
$ftpPass   = "Qwzx2121#"
$ftpBase   = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

$wc = New-Object System.Net.WebClient
$wc.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

$archivos = @(
    'index.html',
    'legado.html',
    'sw.js',
    'version.json',
    'manifest.json',
    'style.css',
    'mobile.css',
    'auth_mundial.js',
    'data_motor.js',
    'cba_motor.js',
    'data_iglesia_v1.js',
    'data_kids_v2.js',
    'kids_cinema.js',
    'data_jovenes.js',
    'data_adultos_v37.js',
    'data_teens_v8.js',
    'trivia_parte1.js',
    'trivia_parte2.js',
    'trivia_parte3.js',
    'himnario_data.js',
    '_add_eventos_especiales.js',
    '_pdf_eventos.js',
    '_nueva_funcion.js',
    'fix_herramientas_culto.js',
    '_ano_biblico_v2.js',
    '_juego_penal_biblico.js',
    '_penal_visual.js',
    'firebase-config.js',
    'firebase-service.js',
    'teen-auth.js',
    'versus_engine.js',
    'html2canvas.min.js',
    'jspdf.umd.min.js',
    'reset.html',
    'ui_core.js',
    'test_logic.js',
    'test_dashboard.js',
    'extract_ui.js',
    'extract_hero.js',
    'datos_devocionales.js',
    'modulo1.js',
    'patch_regex.js', 'pwa_installer.js', 'musica_fondo.mp3'
)

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host " SUBIENDO FASE 1 MUNDIAL v428" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$ok = 0; $err = 0;
foreach ($f in $archivos) {
    if (Test-Path "$localPath\$f") {
        try {
            $wc.UploadFile("$ftpBase/$f", "$localPath\$f")
            Write-Host "  OK  $f" -ForegroundColor Green
            $ok++
        } catch {
            Write-Host "  ERR $f -> $($_.Exception.Message)" -ForegroundColor Red
            $err++
        }
    } else {
        Write-Host "  WARN $f -> Archivo no existe localmente" -ForegroundColor Yellow
    }
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host " COMPLETADO: $ok subidos, $err errores" -ForegroundColor Cyan
Write-Host " Verifica en: https://legadobiblicopro.com/version.json" -ForegroundColor White
Start-Sleep -Seconds 3
