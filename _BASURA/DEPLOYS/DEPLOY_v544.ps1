$version = "544"
$hostName = "ftp.legadobiblicopro.com"
$username = "legado_sync@legadobiblicopro.com"
$password = "LegadoSync2025!"
$remoteDir = "/fabrica/"

Write-Host "Iniciando despliegue de version v$version a Legado Pro (Fabrica)..." -ForegroundColor Cyan

# 1. Update Service Worker Cache
$swPath = "sw.js"
if (Test-Path $swPath) {
    $swContent = Get-Content $swPath -Raw
    $swContent = $swContent -replace "const CACHE_NAME = 'legadobusca-v\d+';", "const CACHE_NAME = 'legadobusca-v$version';"
    Set-Content -Path $swPath -Value $swContent
    Write-Host "sw.js actualizado a version v$version" -ForegroundColor Green
}

# 2. Upload script via WinSCP
$winscpPath = "C:\Program Files (x86)\WinSCP\WinSCP.com"
$localDir = (Get-Location).Path

$script = @"
open ftp://$username`:$password`@$hostName/
cd $remoteDir
put index.html
put data_iglesia_v1.js
put _cultos_regulares.js
put _motor_plantillas_v2.js
put sw.js
exit
"@

$scriptPath = "winscp_deploy_script.txt"
Set-Content -Path $scriptPath -Value $script

Write-Host "Subiendo archivos..."
if (Test-Path $winscpPath) {
    & $winscpPath /script=$scriptPath
} else {
    Write-Host "WinSCP no encontrado, usando ftp nativo" -ForegroundColor Yellow
    
    $ftpScript = @"
open $hostName
$username
$password
cd $remoteDir
put index.html
put data_iglesia_v1.js
put _cultos_regulares.js
put _motor_plantillas_v2.js
put sw.js
quit
"@
    Set-Content -Path "ftp_script.txt" -Value $ftpScript
    ftp -s:ftp_script.txt
    Remove-Item "ftp_script.txt"
}

Remove-Item $scriptPath
Write-Host "Despliegue de la versión v$version completado." -ForegroundColor Green
