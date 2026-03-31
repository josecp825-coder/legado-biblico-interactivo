# ==========================================
# DESPLIEGUE RÁPIDO v97 - LAYOUT COMPACTO + WIDGET FUENTE
# Solo sube los archivos modificados
# ==========================================

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$baseUrl = 'ftp://46.202.182.197/'
$baseUrl2 = 'ftp://46.202.182.197/public_html/'
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$ARCHIVOS = @('index.html', 'sw.js', 'version.json', 'style.css')

$ok = 0; $fail = 0

Write-Host "========================================="
Write-Host " LEGADO BIBLICO v97 - LAYOUT COMPACTO"
Write-Host " + Widget Fuente con feedback visual"
Write-Host "========================================="
Write-Host ""

foreach ($f in $ARCHIVOS) {
    $src = Join-Path $localPath $f
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
Write-Host " DESPLIEGUE v97 COMPLETADO"
Write-Host " Subidos: $ok | Errores: $fail"
Write-Host "========================================="
Write-Host ""
Write-Host "CAMBIOS EN ESTA VERSION:"
Write-Host "  1. Layout compacto - sin espacio vacio"
Write-Host "  2. Widget A+/A- con toast + scroll + resaltado"
Write-Host ""
Write-Host "SIGUIENTE PASO: Actualiza la PWA en el celular"
Write-Host ""
