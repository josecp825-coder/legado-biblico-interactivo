# ============================================================
# LIMPIEZA TOTAL - Legado Bíblico
# Mueve ~370 archivos obsoletos a _BASURA/
# ============================================================

$base = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'
$basura = Join-Path $base '_BASURA'

# Crear carpeta _BASURA y subcarpetas
New-Item -ItemType Directory -Force -Path "$basura\DEPLOYS" | Out-Null
New-Item -ItemType Directory -Force -Path "$basura\FIXES" | Out-Null
New-Item -ItemType Directory -Force -Path "$basura\PATCHES" | Out-Null
New-Item -ItemType Directory -Force -Path "$basura\TESTS" | Out-Null
New-Item -ItemType Directory -Force -Path "$basura\TEMPS" | Out-Null
New-Item -ItemType Directory -Force -Path "$basura\BACKUPS" | Out-Null
New-Item -ItemType Directory -Force -Path "$basura\UTILIDADES" | Out-Null

$movidos = 0
$errores = 0

function Mover($archivo, $subcarpeta) {
    $src = Join-Path $base $archivo
    $dest = Join-Path "$basura\$subcarpeta" $archivo
    if (Test-Path $src) {
        try {
            Move-Item -Path $src -Destination $dest -Force
            $script:movidos++
        } catch {
            Write-Host "  ERROR: $archivo - $($_.Exception.Message)" -ForegroundColor Red
            $script:errores++
        }
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " LIMPIEZA TOTAL - Legado Biblico" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# ── CATEGORÍA 1: DEPLOY scripts obsoletos ──────────────────
Write-Host "[1/7] Moviendo DEPLOY scripts obsoletos..." -ForegroundColor Yellow

# Todos los DEPLOY_v*.ps1
Get-ChildItem -Path $base -Name 'DEPLOY_v*.ps1' | ForEach-Object {
    # Conservar DEPLOY_NUEVO_HOSTINGER.ps1 y DEPLOY_FIX_LOOP.ps1 (no matchean este patrón)
    Mover $_ 'DEPLOYS'
}

# Deploy scripts con nombres especiales
$deploysEspeciales = @(
    'DEPLOY_325_SC.ps1', 'DEPLOY_ADD_EVE.ps1', 'DEPLOY_FABRICA_UPDATE.ps1',
    'DEPLOY_FIX_HTML.ps1', 'DEPLOY_LEGADO_v84_LIMPIO.ps1', 'DEPLOY_LEGADO_v90_CBA.ps1',
    'DEPLOY_LOGO.ps1', 'DEPLOY_MAESTRO.ps1', 'DEPLOY_MAESTRO_HOSTINGER.ps1',
    'DEPLOY_PDF.ps1', 'DEPLOY_RESTORE_SC.ps1', 'DEPLOY_SW_URGENTE.ps1',
    'DEPLOY_share_fix.ps1',
    '0_DESPLIEGUE_PRO.ps1', '1_SUBIR_FABRICA.ps1', '2_LANZAMIENTO_TIENDA.ps1'
)
foreach ($f in $deploysEspeciales) { Mover $f 'DEPLOYS' }
Write-Host "  Deploys movidos: $movidos" -ForegroundColor Green

# ── CATEGORÍA 2: FIX scripts ──────────────────
Write-Host "[2/7] Moviendo FIX scripts..." -ForegroundColor Yellow
$fixes = @(
    '_fix_abrir.js', '_fix_biblia_lector.js', '_fix_biblia_wizard.js',
    '_fix_btn_plantilla.js', '_fix_check_v3.js', '_fix_check_version.js',
    '_fix_editar_culto.js', '_fix_enviar.ps1', '_fix_enviar.py',
    '_fix_enviar_wa.js', '_fix_enviar_wa.ps1', '_fix_enviar_wa.py',
    '_fix_nombre.ps1', '_fix_panel.js', '_fix_pdf_imagen.ps1',
    '_fix_pdf_real.ps1', '_fix_version.js', '_fix_wa.js',
    'fix.py', 'fix_all_liturgia.js', 'fix_emojis_iglesia.js', 'fix_emojis_iglesia.py',
    'fix_encoding.cs', 'fix_encoding.exe', 'fix_encoding_index.py',
    'fix_form.js', 'fix_form.ps1', 'fix_form.py',
    'fix_split.js', 'fix_script.ps1', 'fix_script2.ps1',
    'fixed.js'
)
foreach ($f in $fixes) { Mover $f 'FIXES' }

# ── CATEGORÍA 3: PATCH scripts ──────────────────
Write-Host "[3/7] Moviendo PATCH scripts..." -ForegroundColor Yellow
$patches = @(
    'patch.js', 'patch.py', 'patch_arrow.js', 'patch_beauty.js', 'patch_beauty2.js',
    'patch_beauty_fix.js', 'patch_campos.js', 'patch_especial.js',
    'patch_fix_historial.js', 'patch_fix_tab3.js', 'patch_fix_tabs_final.js',
    'patch_form.js', 'patch_form_sabado.js', 'patch_historial_dropdown.js',
    'patch_label_select.js', 'patch_lines.js', 'patch_locks.js',
    'patch_nombres_cultos.js', 'patch_regex.js', 'patch_regulares.js',
    'patch_repair_tabs.js', 'patch_selector_culto.js', 'patch_selector_culto_js.js',
    'patch_tabs_orden.js', 'patch_texts.js', 'patch_types.js',
    '_patch_eventos.ps1', '_patch_init.ps1', '_patch_plantilla_sab.js', '_patch_plantilla_sab.py'
)
foreach ($f in $patches) { Mover $f 'PATCHES' }

# ── CATEGORÍA 4: TEST / DEBUG scripts ──────────────────
Write-Host "[4/7] Moviendo TEST/DEBUG scripts..." -ForegroundColor Yellow
$tests = @(
    'test.js', 'test_0.js', 'test_10.js', 'test_11.js', 'test_12.js',
    'test_13.js', 'test_14.js', 'test_15.js', 'test_41.js',
    'test_5.js', 'test_6.js', 'test_7.js', 'test_8.js', 'test_9.js',
    'test_dashboard.js', 'test_logic.js', 'test_canvas_preview.html',
    'tmp_check.js',
    '_debug.ps1', '_diag.ps1', '_inspect.ps1'
)
foreach ($f in $tests) { Mover $f 'TESTS' }

# ── CATEGORÍA 5: TEMPORALES ──────────────────
Write-Host "[5/7] Moviendo archivos temporales..." -ForegroundColor Yellow
$temps = @(
    '_tmp_12pasos.txt', '_tmp_auto.txt', '_tmp_carga.txt',
    '_tmp_chunk.txt', '_tmp_chunk2.txt', '_tmp_chunk3.txt',
    '_tmp_inf.txt', '_tmp_plantilla.txt', '_tmp_plantilla_full.txt',
    '_carga_fn.txt',
    '_bump474.js', '_bump475.js', '_bump476.js', '_bump477.js', '_bump478.js', '_bump479.js',
    'winscp_log.txt', 'winscp_v545b.txt'
)
foreach ($f in $temps) { Mover $f 'TEMPS' }

# ── CATEGORÍA 6: BACKUPS obsoletos ──────────────────
Write-Host "[6/7] Moviendo backups obsoletos..." -ForegroundColor Yellow
$backups = @(
    'data_iglesia_v1.js.BACKUP_PRE_FIX',
    'data_iglesia_v1.js.CORRUPTO_BACKUP',
    'data_iglesia_v1.js.ftp',
    'data_iglesia_v1.js.ftp2',
    'data_iglesia_v1_BACKUP_LATIN1.js',
    'index.html.BACKUP_ENCODING_FIX',
    'LEGADO_HOY.zip',
    'legado_export_datos.json'
)
foreach ($f in $backups) { Mover $f 'BACKUPS' }

# Mover carpetas obsoletas
if (Test-Path "$base\_BACKUP_OBSOLETOS") {
    Move-Item -Path "$base\_BACKUP_OBSOLETOS" -Destination "$basura\BACKUPS\_BACKUP_OBSOLETOS" -Force
    Write-Host "  Carpeta _BACKUP_OBSOLETOS movida" -ForegroundColor Green
}
if (Test-Path "$base\temp_backup") {
    Move-Item -Path "$base\temp_backup" -Destination "$basura\BACKUPS\temp_backup" -Force
    Write-Host "  Carpeta temp_backup movida" -ForegroundColor Green
}

# ── CATEGORÍA 7: UTILIDADES de un solo uso ──────────────────
Write-Host "[7/7] Moviendo utilidades obsoletas..." -ForegroundColor Yellow
$utils = @(
    '_gen_icons.js', '_inject_finder.js', '_verify.js',
    'update_version.js', 'extract_hero.js', 'extract_ui.js',
    'remove_canvas.js', 'repatch.js', 'repatch2.js', 'repatch3.js', 'final_repatch.js',
    '_subir_export.ps1', '_subir_firebase_tool.ps1',
    '_restaurar.ps1', '_rebuild_culto_tabs.ps1', '_reparar_funcion.ps1',
    '_fusionar_liturgia_culto.ps1', 'extraer_localstorage.ps1', 'analyze_cba.ps1',
    'build_cultos.js', 'modulo1.js',
    '_5_candados.js', '_add_backup_cultos.js', '_add_firebase_btn.js',
    '_add_firebase_cultos.js', '_add_infantil_anuncia.js', '_add_llamado_adoracion.js',
    'data_motor.js'
)
foreach ($f in $utils) { Mover $f 'UTILIDADES' }

# ── RESULTADO ──────────────────
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " RESULTADO DE LIMPIEZA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Archivos movidos: $movidos" -ForegroundColor Green
if ($errores -gt 0) { Write-Host "  Errores: $errores" -ForegroundColor Red }
Write-Host "  Destino: _BASURA\" -ForegroundColor Yellow

# Contar archivos restantes (sin contar _BASURA, node_modules, .git, .agent)
$restantes = (Get-ChildItem -Path $base -File | Where-Object { $_.Name -ne '_LIMPIEZA_TOTAL.ps1' }).Count
Write-Host "  Archivos restantes en raiz: $restantes" -ForegroundColor Cyan
Write-Host "`n  NOTA: Revisa _BASURA\ y eliminala cuando estes seguro." -ForegroundColor White
Write-Host ""
