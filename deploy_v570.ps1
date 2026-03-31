$server    = "82.25.87.104"
$user      = "u166906157"
$pass      = 'Qwzx2121#'
$remoteDir = "/domains/legadobiblicopro.com/public_html/fabrica"
$localBase = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"
$archivos = @('sw.js','index.html','version.json','_add_eventos_especiales.js')
Write-Host "DEPLOY v570 - Formulario Eventos Ampliado" -ForegroundColor Cyan
$ok=0;$fl=0
foreach($f in $archivos){$lp=Join-Path $localBase $f;if(!(Test-Path $lp)){$fl++;continue};try{$wc=New-Object System.Net.WebClient;$wc.Credentials=New-Object System.Net.NetworkCredential($user,$pass);$wc.UploadFile("ftp://$server$remoteDir/$f",$lp);$sz=[math]::Round((Get-Item $lp).Length/1024,1);Write-Host "  OK: $f ($sz KB)" -ForegroundColor Green;$ok++}catch{Write-Host "  ERR: $f" -ForegroundColor Red;$fl++}}
if($fl -eq 0){Write-Host "DEPLOY v570 OK!" -ForegroundColor Green}
