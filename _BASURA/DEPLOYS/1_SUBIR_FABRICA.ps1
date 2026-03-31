$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ENTORNO DE PRUEBAS BETA (FABRICA)       " -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

$deployFile = ".last_deploy_time"
$lastDeploy = [datetime]::MinValue

# Si es la primera vez, subiremos solo lo modificado en las ultimas 24 horas para evitar subir los 100+ archivos multimedia
if (Test-Path $deployFile) {
    try {
        $dateStr = Get-Content $deployFile
        $lastDeploy = [datetime]::Parse($dateStr)
    } catch {
        $lastDeploy = (Get-Date).AddHours(-24)
    }
} else {
    $lastDeploy = (Get-Date).AddHours(-24)
}

# Siempre forzamos a subir los motores clave de la app por si acaso
$archivosFijos = @("index.html", "sw.js", "_sync_version.js", "version.json")

# Recolectar SOLO los archivos recientemente modificados o fijos
$filesToUpload = @()
Get-ChildItem -File | Where-Object { 
    $_.Extension -in '.html','.css','.js','.json','.png','.jpg','.webp','.mp3' -and 
    $_.Name -notmatch '^(' + 'test' + '|' + 'DEPLOY' + ')'
} | ForEach-Object {
    if ($_.Name -in $archivosFijos -or $_.LastWriteTime -ge $lastDeploy.AddMinutes(-1)) {
        $filesToUpload += $_.Name
    }
}

$server = "82.25.87.104"
$user = "u166906157"
$pass = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"

Write-Host "Verificando inteligentemente modificados desde: $lastDeploy..." -ForegroundColor Gray
Write-Host "Cantidad a subir: $($filesToUpload.Count) archivos." -ForegroundColor Yellow
Write-Host ""

try {
    $req = [System.Net.WebRequest]::Create("ftp://$server$remoteDir")
    $req.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
    $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    $req.GetResponse().Close()
} catch {}

foreach ($file in $filesToUpload) {
    $cleanPath = $file -replace "^[./]+", ""
    if (Test-Path $cleanPath) {
        $uri = "ftp://$server$remoteDir/$cleanPath"
        Write-Host "Enviando acelerado -> $cleanPath" -ForegroundColor DarkCyan
        
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        try {
            $webclient.UploadFile($uri, $cleanPath)
            Write-Host "[OK] $cleanPath" -ForegroundColor Green
        } catch {
            Write-Host "[FALLO] Error al subir $cleanPath : $_" -ForegroundColor Red
        }
    }
}

# Registrar momento exacto del despliegue exitoso para el futuro
(Get-Date).ToString("yyyy-MM-ddTHH:mm:ss") | Out-File $deployFile

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " EXITO: Entorno Beta actualizado. (FAST DEPLOY)" -ForegroundColor Green
Write-Host " En tu celular Android entra a: " -ForegroundColor Yellow
Write-Host " https://legadobiblicopro.com/fabrica/" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Cyan
Read-Host "Presiona Enter para cerrar..."
