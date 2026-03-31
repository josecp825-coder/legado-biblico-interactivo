$path = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\_add_eventos_especiales.js"
$c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$old = "generarPlantillaEvento(' + ev.id + ')"
$new = "_abrirSelectorDias(' + ev.id + ')"
$c2 = $c.Replace($old, $new)
[System.IO.File]::WriteAllText($path, $c2, [System.Text.Encoding]::UTF8)
Write-Host "Reemplazos hechos" -ForegroundColor Green
