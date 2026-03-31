# RESTAURAR archivo v138 + agregar PDF handler limpio
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

# Descargar la version que esta en el server (v140 - rota)
# Necesitamos usar la copia local que teniamos

# Verificar si tenemos backup
$archivo = Join-Path $localPath 'data_iglesia_v1.js'
$contenido = [System.IO.File]::ReadAllText($archivo, [System.Text.Encoding]::UTF8)
$numLineas = ($contenido.Split("`n")).Count
Write-Host "Archivo actual: $numLineas lineas"

# Si esta corrupto (menos de 2500 lineas), necesitamos restaurar
if ($numLineas -lt 2500) {
    Write-Host "ARCHIVO CORRUPTO - descargando del FTP..."
    try {
        $webclient.DownloadFile('ftp://46.202.182.197/data_iglesia_v1.js', ($archivo + '.ftp'))
        $ftpContent = [System.IO.File]::ReadAllText(($archivo + '.ftp'), [System.Text.Encoding]::UTF8)
        $ftpLineas = ($ftpContent.Split("`n")).Count
        Write-Host "Archivo FTP: $ftpLineas lineas"
        
        if ($ftpLineas -gt $numLineas) {
            Write-Host "Usando version del FTP"
            [System.IO.File]::WriteAllText($archivo, $ftpContent, [System.Text.Encoding]::UTF8)
            Write-Host "Restaurado desde FTP: $ftpLineas lineas"
        }
    }
    catch {
        Write-Host "Error descargando: $($_.Exception.Message)"
    }
    
    try {
        $webclient.DownloadFile('ftp://46.202.182.197/public_html/data_iglesia_v1.js', ($archivo + '.ftp2'))
        $ftp2Content = [System.IO.File]::ReadAllText(($archivo + '.ftp2'), [System.Text.Encoding]::UTF8)
        $ftp2Lineas = ($ftp2Content.Split("`n")).Count
        Write-Host "Archivo FTP public_html: $ftp2Lineas lineas"
        
        if ($ftp2Lineas -gt $numLineas) {
            Write-Host "Usando version de public_html"
            [System.IO.File]::WriteAllText($archivo, $ftp2Content, [System.Text.Encoding]::UTF8)
            Write-Host "Restaurado desde public_html: $ftp2Lineas lineas"
        }
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)"
    }
}

$final = [System.IO.File]::ReadAllText($archivo, [System.Text.Encoding]::UTF8)
Write-Host "Archivo final: $(($final.Split("`n")).Count) lineas"
