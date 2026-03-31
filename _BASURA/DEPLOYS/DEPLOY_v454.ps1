$filesToUpload = @(
    "auth_mundial.js",
    "version.json",
    "index.html",
    "sw.js"
)

$server = "82.25.87.104"
$user = "u166906157"
$pass = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html"

foreach ($file in $filesToUpload) {
    if (Test-Path $file) {
        $uri = "ftp://$server$remoteDir/$file"
        Write-Host "Subiendo: $file"
        
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        
        try {
            $webclient.UploadFile($uri, $file)
            Write-Host "Subido con exito: $file" -ForegroundColor Green
        } catch {
            Write-Host "Error al subir $file" -ForegroundColor Red
            Write-Host $_.Exception.Message
        }
    } else {
        Write-Host "Archivo NO encontrado localmente: $file" -ForegroundColor Yellow
    }
}

Write-Host "DESPLIEGUE COMPLETADO v454. (5 Candados de Seguridad Inmutables)" -ForegroundColor Cyan
