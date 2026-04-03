# =====================================================
# 🏪 DEPLOY COMPLETO A TIENDA (PRODUCCIÓN)
# legadobiblicopro.com → /public_html/ (RAÍZ)
# Versión: v599 — Sincronización total Fábrica → Tienda
# =====================================================

$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"

# 📋 LISTA COMPLETA de archivos necesarios para la Tienda
$archivos = @(
    # === CORE ===
    "index.html",
    "version.json",
    "sw.js",
    "manifest.json",
    "style.css",
    "mobile.css",
    "legado.html",

    # === DATOS Y DEVOCIONALES ===
    "versiculos_hero.js",
    "datos_devocionales.js",

    # === 📖 BIBLIA (los que dan 404!) ===
    "biblia_datos.js",
    "biblia_busqueda.js",
    "biblia_lector.js",
    "biblia_wizard.js",

    # === MÓDULOS PRINCIPALES ===
    "ui_core.js",
    "auth_mundial.js",
    "cba_motor.js",
    "pwa_installer.js",
    "_nueva_funcion.js",
    "versus_engine.js",
    "fix_herramientas_culto.js",

    # === ACADEMIA Y TRIVIA ===
    "data_kids_v2.js",
    "kids_cinema.js",
    "data_jovenes.js",
    "data_adultos_v37.js",
    "data_teens_v8.js",
    "trivia_parte1.js",
    "trivia_parte2.js",
    "trivia_parte3.js",
    "_juego_penal_biblico.js",
    "_penal_visual.js",

    # === IGLESIA ===
    "data_iglesia_v1.js",
    "_cultos_regulares.js",
    "_motor_plantillas_v2.js",
    "_add_eventos_especiales.js",
    "_firebase_sync_iglesia.js",
    "_pdf_eventos.js",
    "_inyectar_mayordomia.js",
    "_inyectar_santacena.js",
    "himnario_data.js",

    # === AÑO BÍBLICO ===
    "_ano_biblico_v2.js",

    # === FIREBASE ===
    "firebase-service.js",
    "firebase-config.js",
    "teen-auth.js",

    # === LIBRERÍAS ===
    "html2canvas.min.js",
    "jspdf.umd.min.js",

    # === ASSETS ===
    "icon-192.png",
    "icon-512.png",
    "logo_oficial.png",
    "musica_fondo.mp3"
)

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🏪 DEPLOY COMPLETO → TIENDA (legadobiblicopro) ║" -ForegroundColor Cyan
Write-Host "║  Versión: v599 — Sincronización total            ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$ok = 0
$fail = 0
$notFound = 0

foreach ($f in $archivos) {
    $localFile = Join-Path $localPath $f
    if (Test-Path $localFile) {
        try {
            $webclient.UploadFile("$ftpBase/$f", $localFile)
            Write-Host "  ✅ $f" -ForegroundColor Green
            $ok++
        } catch {
            $err = $_.Exception.Message
            Write-Host "  ❌ $f : $err" -ForegroundColor Red
            $fail++
        }
    } else {
        Write-Host "  ⚠️  NO EXISTE: $f" -ForegroundColor Yellow
        $notFound++
    }
}

Write-Host ""
Write-Host "══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ('  RESULTADO: ' + $ok + ' OK, ' + $fail + ' errores, ' + $notFound + ' no encontrados') -ForegroundColor White
Write-Host '  Verificar: https://legadobiblicopro.com/version.json' -ForegroundColor Yellow
Write-Host '  Tienda:    https://legadobiblicopro.com/' -ForegroundColor Green
Write-Host "══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
