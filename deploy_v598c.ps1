$wc = New-Object System.Net.WebClient
$wc.Credentials = New-Object System.Net.NetworkCredential('u166906157','Qwzx2121#')
$wc.UploadFile('ftp://82.25.87.104/domains/legadobiblicopro.com/public_html/fabrica/index.html','c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\index.html')
Write-Host "OK: index.html" -ForegroundColor Green
