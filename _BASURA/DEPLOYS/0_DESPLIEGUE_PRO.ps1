$ftpHost = "82.25.87.104"
$ftpUser = "u166906157"
$ftpPass = "Qwzx2121525#"
$remotePath = "/public_html/"
$localPath = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\"
$filesToUpload = @("index.html","legado.html","style.css","sw.js","manifest.json","version.json",".htaccess","firebase.js","_ano_biblico_v2.js","cba_motor.js")
Write-Host "INICIANDO SUBIDA A LEGADO PRO..." -ForegroundColor Green
foreach ($f in $filesToUpload) {
    if (Test-Path "$localPath$f") {
        Write-Host "Subiendo $f..."
        $u = "ftp://$ftpHost$remotePath$f"
        $wc = New-Object System.Net.WebClient
        $wc.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $wc.UploadFile($u, "STOR", "$localPath$f")
    }
}
Write-Host "MISION CUMPLIDA! Visita legadobiblicopro.com" -ForegroundColor Cyan
Read-Host "Presiona Enter para cerrar"
