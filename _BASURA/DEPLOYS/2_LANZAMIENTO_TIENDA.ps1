$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  🛡️ LANZAMIENTO PUBLICO (TIENDA GLOBAL) 🛡️ " -ForegroundColor Red
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "ESTE SCRIPT ENVIARA TU CODIGO ACTUAL A TODOS LOS USUARIOS DEL MUNDO." -ForegroundColor Yellow

$claveString = Read-Host -Prompt "Introduzca la clave maestra de seguridad" -AsSecureString
# Convertir SecureString a string normal para comparación
$ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($claveString)
$clavePlana = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)

if ($clavePlana -ne "2525") {
    Write-Host "`n[ !! ] ACCESO DENEGADO." -ForegroundColor Red
    Write-Host "La clave es incorrecta. Abortando lanzamiento." -ForegroundColor Gray
    Read-Host "Presiona Enter para cerrar..."
    Exit
}

Write-Host "`n[ √ ] AUTORIZACION CONCEDIDA. Iniciando Subida VIP..." -ForegroundColor Green

# Extraer inteligente de archivos vitales usando index.html
$htmlContent = Get-Content -Path .\index.html -Raw
$regexMatches = [regex]::Matches($htmlContent, '(src|href)="([^"\?]+\.(js|css|html|json|png|jpg|mp3))(\?[^"]*)?"')

# Base manual
$filesToUpload = @("index.html", "manifest.json", "sw.js", "version.json")
foreach ($match in $regexMatches) {
    $file = $match.Groups[2].Value
    if ($file -notmatch "^http" -and $filesToUpload -notcontains $file) {
        $filesToUpload += $file
    }
}

$server = "82.25.87.104"
$user = "u166906157"
$pass = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html"

foreach ($file in $filesToUpload) {
    $cleanPath = $file -replace "^[./]+", ""
    
    if (Test-Path $cleanPath) {
        $uri = "ftp://$server$remoteDir/$cleanPath"
        Write-Host ">>> Lanzando a Produccion -> $cleanPath" -ForegroundColor Magenta
        
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        
        try {
            $webclient.UploadFile($uri, $cleanPath)
            Write-Host "    [OK] Exito" -ForegroundColor Green
        } catch {
            Write-Host "    [FALLO] ERROR SERVER: $_" -ForegroundColor Red
        }
    }
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host " ✅ LANZAMIENTO GLOBAL EXITOSO. ✅ " -ForegroundColor Green
Write-Host " Todos los usuarios recibiran esta version." -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Cyan
Read-Host "Presiona Enter para cerrar la boveda..."
