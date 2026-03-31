$ruta = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$f = [System.IO.File]::ReadAllText($ruta, [System.Text.Encoding]::UTF8)

# Mostrar los 900 chars a partir de la posicion 1847 (primera seccion del menu)
Write-Host "BLOQUE MENU COMPLETO (pos 1700 a 10500):"
Write-Host $f.Substring(1700, [Math]::Min(8800, $f.Length - 1700))
