# ==========================================
# 🧹 LIMPIEZA PROYECTO LEGADO BÍBLICO v83
# Mueve archivos obsoletos a carpeta _BACKUP
# NO elimina nada — todo queda en _BACKUP por seguridad
# ==========================================

$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
$backupPath = Join-Path $localPath '_BACKUP_OBSOLETOS'

# Crear carpeta de backup si no existe
if (-not (Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath | Out-Null
    Write-Host "📁 Carpeta _BACKUP_OBSOLETOS creada." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  🧹 LIMPIEZA LEGADO BÍBLICO v83" -ForegroundColor White
Write-Host "  Moviendo obsoletos a _BACKUP_OBSOLETOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

$movidos = 0
$errores = 0

function MoverArchivo($nombre) {
    $origen = Join-Path $localPath $nombre
    $destino = Join-Path $backupPath $nombre
    if (Test-Path $origen) {
        try {
            Move-Item -Path $origen -Destination $destino -Force
            Write-Host "  ✅ Movido: $nombre" -ForegroundColor Green
            $script:movidos++
        } catch {
            Write-Host "  ❌ Error moviendo $nombre : $($_.Exception.Message)" -ForegroundColor Red
            $script:errores++
        }
    } else {
        Write-Host "  ⚠️  No encontrado (ya limpio): $nombre" -ForegroundColor Yellow
    }
}

# ─────────────────────────────────────────
# 📦 1. DATOS OBSOLETOS (versiones viejas)
# ─────────────────────────────────────────
Write-Host "📦 DATOS OBSOLETOS (versiones viejas):" -ForegroundColor White
MoverArchivo "data_adultos.js"         # reemplazado por data_adultos_v37.js
MoverArchivo "data_kids.js"            # reemplazado por data_kids_v2.js
MoverArchivo "data_teens.js"           # reemplazado por data_teens_v8.js
MoverArchivo "data_teens_v2.js"
MoverArchivo "data_teens_v5.js"
MoverArchivo "data_teens_v6.js"
MoverArchivo "data_teens_v7.js"

Write-Host ""
# ─────────────────────────────────────────
# 📦 2. VARIANTES DE IGLESIA (solo activa es data_iglesia_v1.js)
# ─────────────────────────────────────────
Write-Host "📦 VARIANTES IGLESIA OBSOLETAS:" -ForegroundColor White
MoverArchivo "data_iglesia_v1_CLEAN.js"
MoverArchivo "data_iglesia_v1_SERVER.js"
MoverArchivo "data_iglesia_v1_WEB.js"

Write-Host ""
# ─────────────────────────────────────────
# 📦 3. SCRIPTS DE DEPLOY VIEJOS
# ─────────────────────────────────────────
Write-Host "📦 SCRIPTS DE DEPLOY OBSOLETOS:" -ForegroundColor White
MoverArchivo "deploy_legado_v60.ps1"
MoverArchivo "deploy_legado_v61.ps1"
MoverArchivo "deploy_legado_v62.ps1"
MoverArchivo "deploy_legado_compartir_calendario.ps1"

Write-Host ""
# ─────────────────────────────────────────
# 📦 4. SCRIPTS DE EMERGENCIA YA NO NECESARIOS
# ─────────────────────────────────────────
Write-Host "📦 SCRIPTS DE EMERGENCIA (ya resueltos):" -ForegroundColor White
MoverArchivo "BYPASS_CACHE.ps1"
MoverArchivo "REPARAR_YA.ps1"

Write-Host ""
# ─────────────────────────────────────────
# 📦 5. IMÁGENES DE CAPTURA/DEBUG (NO referenciadas en el código)
# ─────────────────────────────────────────
Write-Host "📦 IMÁGENES DE CAPTURA Y DEBUG (no usadas en producción):" -ForegroundColor White
MoverArchivo "adultos_hub_page_1772170772150.png"
MoverArchivo "adultos_hub_top_1772170785116.png"
MoverArchivo "adultos_seminario_hero_1772170415343.png"
MoverArchivo "apologetica_view_1772170231354.png"
MoverArchivo "debate_result_1772170209121.png"
MoverArchivo "debate_view_1772170180980.png"
MoverArchivo "egw_commentary_broken_image_1772170854450.png"
MoverArchivo "egw_portrait_adventista_1772170430747.png"
MoverArchivo "exegesis_text_1772170817361.png"
MoverArchivo "greek_words_section_1772170824925.png"
MoverArchivo "jovenes_hub_1772170127367.png"
MoverArchivo "jovenes_profecia_hero_1772169591746.png"
MoverArchivo "legado_biblico_icon_1772170985987.png"
MoverArchivo "saved_note_adultos_1772170881438.png"
MoverArchivo "daniel_profecia_timeline_1772169603328.png"
MoverArchivo "copy_kids_images_1772168801560.webp"
MoverArchivo "test_adultos_module_1772170744088.webp"
MoverArchivo "nino_triste.png.png"     # doble extensión, archivo corrupto

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ LIMPIEZA COMPLETADA" -ForegroundColor White
Write-Host "  Archivos movidos a _BACKUP: $movidos" -ForegroundColor Green
if ($errores -gt 0) {
    Write-Host "  Errores: $errores" -ForegroundColor Red
}
Write-Host ""
Write-Host "  📁 Backup en: _BACKUP_OBSOLETOS\" -ForegroundColor Cyan
Write-Host "  ⚠️  Nada fue eliminado — puedes restaurar cuando quieras" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "PRÓXIMO PASO: Ejecuta DEPLOY_LEGADO_v84_LIMPIO.ps1" -ForegroundColor Yellow
Write-Host ""
