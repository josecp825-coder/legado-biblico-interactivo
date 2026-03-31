$file = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Insertar la llamada a inicializarHerramientasExtra() despues de cargarCultosSemana
$old = "    autoDetectarTipoCulto(hoyStr);`r`n    cargarCultosSemana();`r`n}"
$new = "    autoDetectarTipoCulto(hoyStr);`r`n    cargarCultosSemana();`r`n    setTimeout(function(){ if(typeof inicializarHerramientasExtra === 'function') inicializarHerramientasExtra(); }, 200);`r`n}"

if ($content.Contains($old)) {
    $content = $content.Replace($old, $new)
    [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
    Write-Host "OK: inicializarHerramientasExtra agregado"
} else {
    Write-Host "ERROR: patron no encontrado"
    # Buscar las lineas para diagnostico
    $idx = $content.IndexOf('cargarCultosSemana();')
    Write-Host "Posicion cargarCultosSemana: $idx"
    Write-Host "Contexto: " + $content.Substring($idx-50, 150)
}
