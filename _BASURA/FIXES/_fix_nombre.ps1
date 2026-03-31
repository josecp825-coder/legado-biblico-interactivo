# Fix footers
$archivo = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$contenido = [System.IO.File]::ReadAllText($archivo, [System.Text.Encoding]::UTF8)

# Reemplazar el footer del overlay (usa escapes unicode)
$oldFooter = "Iglesia Adventista del S' + ""\u{00E9}"" + 'ptimo D' + ""\u{00ED}"" + 'a ' + ""\u{2014}"" + ' Cypress Hills"
$newFooter = "Iglesia Adventista Cypress Hills"
$contenido = $contenido.Replace($oldFooter, $newFooter)

# Reemplazar el footer de la imagen
$oldFooterImg = 'Iglesia Adventista del S\u00E9ptimo D\u00EDa \u2014 Cypress Hills \u00B7 Legado B\u00EDblico'
$newFooterImg = 'Iglesia Adventista Cypress Hills \u00B7 Legado B\u00EDblico'
$contenido = $contenido.Replace($oldFooterImg, $newFooterImg)

# Verificar si queda algo con "Septimo Dia" en el archivo
$matches = [regex]::Matches($contenido, 'ptimo D')
Write-Host "Ocurrencias restantes de 'ptimo D': $($matches.Count)"

[System.IO.File]::WriteAllText($archivo, $contenido, [System.Text.Encoding]::UTF8)
Write-Host "OK - Footers actualizados"
