# Script para reemplazar la función enviarFormularioVacioWA
# Lee el archivo principal y la nueva función, hace la sustitución por línea

$basePath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD"
$mainFile = Join-Path $basePath "data_iglesia_v1.js"
$newFuncFile = Join-Path $basePath "_nueva_funcion.js"

# Leer ambos archivos con UTF-8
$mainLines = [System.IO.File]::ReadAllLines($mainFile, [System.Text.Encoding]::UTF8)
$newFunc = [System.IO.File]::ReadAllText($newFuncFile, [System.Text.Encoding]::UTF8)

Write-Host "Archivo principal: $($mainLines.Length) lineas"

# Encontrar inicio de la función (línea que contiene 'enviarFormularioVacioWA = function')
$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $mainLines.Length; $i++) {
    if ($mainLines[$i] -match 'window\.enviarFormularioVacioWA\s*=\s*function') {
        $startLine = $i
        Write-Host "Inicio encontrado en linea $($i + 1)"
        break
    }
}

if ($startLine -eq -1) {
    Write-Host "ERROR: No se encontro la funcion"
    exit 1
}

# Encontrar el cierre de la función (}; solo en la línea)
$braceCount = 0
$started = $false
for ($i = $startLine; $i -lt $mainLines.Length; $i++) {
    foreach ($ch in $mainLines[$i].ToCharArray()) {
        if ($ch -eq '{') { $braceCount++; $started = $true }
        if ($ch -eq '}') { $braceCount-- }
    }
    if ($started -and $braceCount -eq 0) {
        $endLine = $i
        Write-Host "Fin encontrado en linea $($i + 1)"
        break
    }
}

if ($endLine -eq -1) {
    Write-Host "ERROR: No se encontro el cierre de la funcion"
    exit 1
}

Write-Host "Reemplazando lineas $($startLine + 1) a $($endLine + 1)..."

# Construir el nuevo contenido
$before = $mainLines[0..($startLine - 1)]
$after = if ($endLine + 1 -lt $mainLines.Length) { $mainLines[($endLine + 1)..($mainLines.Length - 1)] } else { @() }

# Juntar: antes + nueva función + después
$newContent = ($before -join "`n") + "`n" + $newFunc + "`n" + ($after -join "`n")

# Escribir el archivo
[System.IO.File]::WriteAllText($mainFile, $newContent, [System.Text.Encoding]::UTF8)

$newLines = [System.IO.File]::ReadAllLines($mainFile, [System.Text.Encoding]::UTF8)
Write-Host "OK - Archivo actualizado: $($mainLines.Length) -> $($newLines.Length) lineas"
