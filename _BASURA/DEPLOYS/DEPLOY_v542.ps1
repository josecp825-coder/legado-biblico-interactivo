$ErrorActionPreference = "Stop"

$version = "542"
Write-Host "Iniciando Despliegue v$version a Fabrica (BETA EXCLUSIVO)"

# 1. Update version.json
$vPath = "version.json"
Set-Content -Path $vPath -Value "{`"version`":`"$version`",`"nombre`":`"DEPLOY-COMPLETO`",`"fecha`":`"$(Get-Date -f "yyyy-MM-dd")`"}"

# 2. Update sw.js CACHE_NAME
$swPath = "sw.js"
$swContent = Get-Content $swPath -Raw
$swContent = $swContent -replace "const CACHE_NAME = 'legadobusca-v\d+';", "const CACHE_NAME = 'legadobusca-v$version';"
Set-Content $swPath -Value $swContent

Write-Host "Cache Name y Version actualizados a v$version!"

$filesToUpload = @(
    "index.html",
    "_motor_plantillas_v2.js",
    "version.json",
    "sw.js"
)

$server = "82.25.87.104"
$user = "u166906157"
$pass = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"

foreach ($f in $filesToUpload) {
    if (Test-Path $f) {
        $uri = "ftp://$server$remoteDir/$f"
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        try {
            $webclient.UploadFile($uri, $f)
            Write-Host "[OK] $f subido a fabrica" -ForegroundColor Green
        } catch {
            Write-Host "[FALLO] $f : $_" -ForegroundColor Red
        }
    }
}
Write-Host "DEPLOY COMPLETADO v$version" -ForegroundColor Cyan
