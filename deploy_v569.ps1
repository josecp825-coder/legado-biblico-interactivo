$server    = "82.25.87.104"
$user      = "u166906157"
$pass      = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"
$localBase = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"
$archivos = @('sw.js','index.html','version.json','_motor_plantillas_v2.js')
Write-Host "DEPLOY v569 - Doxologia Himno 55" -ForegroundColor Cyan
$ok=0;$fl=0
foreach($f in $archivos){$lp=Join-Path $localBase $f;if(!(Test-Path $lp)){$fl++;continue};try{$wc=New-Object System.Net.WebClient;$wc.Credentials=New-Object System.Net.NetworkCredential($user,$pass);$wc.UploadFile("ftp://$server$remoteDir/$f",$lp);Write-Host "  OK: $f" -ForegroundColor Green;$ok++}catch{Write-Host "  ERR: $f" -ForegroundColor Red;$fl++}}
if($fl -eq 0){Write-Host "DEPLOY v569 OK!" -ForegroundColor Green}
