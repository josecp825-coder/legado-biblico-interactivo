$file = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$idx = $content.IndexOf('function cargarCultosSemana()')
Write-Host "Indice de funcion: $idx"
Write-Host "Fragmento encontrado:"
Write-Host $content.Substring($idx, 200)
