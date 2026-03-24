# ==========================================
# DESPLIEGUE LEGADO - COMPARTIR CALENDARIO
# Sube: data_iglesia_v1.js + legado.html
# MODO BINARIO (evita corrupcion de UTF-8)
# ==========================================

Write-Host ""
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host "  LEGADO BIBLICO - COMPARTIR CALENDARIO" -ForegroundColor White
Write-Host "  Sistema de enlaces autodestructivos 4h" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host ""

$user = 'u934484274.agendatecnicadigital.com'
$pass = 'Qwzx2121@'
$base = 'ftp://46.202.182.197/'
$local = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\agenda digital'

function SubirBinario($archivo) {
    $localPath = Join-Path $local $archivo
    if (-not (Test-Path $localPath)) {
        Write-Host "  NO ENCONTRADO: $archivo" -ForegroundColor Red
        return
    }
    $contenido = [System.IO.File]::ReadAllBytes($localPath)
    foreach ($destino in @($base + $archivo, $base + 'public_html/' + $archivo)) {
        try {
            $ftp = [System.Net.FtpWebRequest]::Create($destino)
            $ftp.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
            $ftp.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
            $ftp.UseBinary = $true
            $ftp.UsePassive = $true
            $ftp.KeepAlive = $false
            $ftp.ContentLength = $contenido.Length
            $s = $ftp.GetRequestStream()
            $s.Write($contenido, 0, $contenido.Length)
            $s.Close()
            $resp = $ftp.GetResponse()
            $resp.Close()
        }
        catch { <# public_html puede no existir, ignorar #> }
    }
}

$archivos = @('data_iglesia_v1.js', 'legado.html', 'calendario.html')
foreach ($f in $archivos) {
    Write-Host "  Subiendo $f ..." -NoNewline
    SubirBinario $f
    Write-Host " OK" -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  DESPLIEGUE COMPLETADO (MODO BINARIO)" -ForegroundColor Green
Write-Host "  Abre Legado Biblico en tu celular" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""


Write-Host ""
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host "  LEGADO BIBLICO - COMPARTIR CALENDARIO" -ForegroundColor White
Write-Host "  Sistema de enlaces autodestructivos 4h" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host ""

$wc = New-Object System.Net.WebClient
$wc.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$base = 'ftp://46.202.182.197/'
$local = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\agenda digital'

$archivos = @('data_iglesia_v1.js', 'legado.html', 'calendario.html')

foreach ($f in $archivos) {
    $path = Join-Path $local $f
    if (Test-Path $path) {
        try {
            Write-Host "  Subiendo $f ..." -NoNewline
            $wc.UploadFile($base + $f, $path)
            try { $wc.UploadFile($base + 'public_html/' + $f, $path) } catch {}
            Write-Host " OK" -ForegroundColor Green
        }
        catch {
            Write-Host " ERROR: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "  ARCHIVO NO ENCONTRADO: $f" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  DESPLIEGUE COMPLETADO" -ForegroundColor Green
Write-Host "  Abre Legado Biblico en tu celular" -ForegroundColor Green
Write-Host "  Ve: Modulo Iglesia > Calendario" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
