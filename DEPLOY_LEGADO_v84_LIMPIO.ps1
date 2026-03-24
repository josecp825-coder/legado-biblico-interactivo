# ==========================================
# DESPLIEGUE LEGADO BIBLICO v84 - LISTA BLANCA
# Solo sube los archivos necesarios al servidor
# JAMAS TOCAR /app/ (Agenda Digital)
# ==========================================

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$baseUrl = 'ftp://46.202.182.197/'
$baseUrl2 = 'ftp://46.202.182.197/public_html/'
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# ============================================
# LISTA BLANCA - SOLO ESTOS ARCHIVOS SE SUBEN
# ============================================
$CORE = @(
    'index.html', 'legado.html',
    'style.css', 'mobile.css',
    'manifest.json', 'sw.js', 'version.json',
    'icon-192.png', 'icon-512.png',
    'firebase-config.js', 'firebase-service.js',
    'data_motor.js', 'teen-auth.js', 'versus_engine.js',
    'data_kids_v2.js', 'kids_cinema.js',
    'data_jovenes.js',
    'data_adultos_v37.js',
    'data_teens_v8.js', 'trivia_parte1.js', 'trivia_parte2.js', 'trivia_parte3.js',
    'data_iglesia_v1.js'
)

# Imagenes de historias (todas las .png que NO tienen timestamp de 13 digitos, excepto las 3 usadas)
$IMGS = Get-ChildItem -Path $localPath -Filter '*.png' |
Where-Object { $_.Name -notmatch '_\d{13}\.png$' -or
    $_.Name -eq 'noe_arca_cartoon_1772168653149.png' -or
    $_.Name -eq 'daniel_leones_cartoon_1772168642765.png' -or
    $_.Name -eq 'biblia_ninos_hero_1772168630395.png' } |
Select-Object -ExpandProperty Name

$TODO = $CORE + $IMGS

$ok = 0; $fail = 0; $skip = 0

Write-Host "========================================="
Write-Host " LEGADO BIBLICO v84 - DESPLIEGUE LIMPIO"
Write-Host " Archivos core: $($CORE.Count) | Imagenes: $($IMGS.Count)"
Write-Host "========================================="
Write-Host ""

foreach ($f in $TODO) {
    $src = Join-Path $localPath $f
    if (-not (Test-Path $src)) {
        Write-Host "  OMITIDO (no existe): $f"
        $skip++
        continue
    }
    try {
        Write-Host "  Subiendo: $f" -NoNewline
        $webclient.UploadFile($baseUrl + $f, $src)
        $webclient.UploadFile($baseUrl2 + $f, $src)
        Write-Host " [OK]"
        $ok++
    }
    catch {
        Write-Host " [ERROR] $($_.Exception.Message)"
        $fail++
    }
}

Write-Host ""
Write-Host "========================================="
Write-Host " DESPLIEGUE v84 COMPLETADO"
Write-Host " Subidos   : $ok"
Write-Host " Omitidos  : $skip"
Write-Host " Errores   : $fail"
Write-Host "========================================="
Write-Host ""
Write-Host "SIGUIENTE PASO: Abre la app en el celular"
Write-Host "y pulsa el boton de actualizar (circulo con flecha)"
Write-Host ""
