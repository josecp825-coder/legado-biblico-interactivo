# ================================================================
# EXTRACTOR DIRECTO DE LOCALSTORAGE - LEGADO BÍBLICO
# Lee los datos directamente desde el disco de Chrome (LevelDB)
# sin necesitar abrir el navegador ni la consola.
# ================================================================

$origen = "agendatecnicadigital.com"
$claves = @('legado_eventos', 'legado_cultos_semanales', 'legado_liturgias', 'legado_predicaciones')
$levelDbPath = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Local Storage\leveldb"
$tempDir = "$env:TEMP\legado_ls_temp"
$outputFile = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\legado_export_datos.json"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  EXTRACTOR LOCALSTORAGE - LEGADO BÍBLICO" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que Chrome LevelDB existe
if (-not (Test-Path $levelDbPath)) {
    Write-Host "ERROR: No se encontro el LevelDB de Chrome." -ForegroundColor Red
    Write-Host "Ruta buscada: $levelDbPath" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "Copiando archivos LevelDB al directorio temporal..." -ForegroundColor Yellow
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copiar todos los archivos (ignorar errores de bloqueo)
$copiados = 0
Get-ChildItem $levelDbPath -ErrorAction SilentlyContinue | ForEach-Object {
    try {
        [IO.File]::Copy($_.FullName, "$tempDir\$($_.Name)", $true)
        $copiados++
    } catch { }
}
Write-Host "Archivos copiados: $copiados" -ForegroundColor Green
Write-Host ""
Write-Host "Buscando claves para '$origen'..." -ForegroundColor Yellow
Write-Host ""

$resultados = @{}

# Obtener todos los archivos de datos LevelDB, del más reciente al más antiguo
$archivos = @()
$archivos += Get-ChildItem $tempDir -Filter "*.log" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
$archivos += Get-ChildItem $tempDir -Filter "*.ldb" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending

foreach ($archivo in $archivos) {
    if ($resultados.Keys.Count -eq $claves.Count) { break }

    try {
        $bytes = [IO.File]::ReadAllBytes($archivo.FullName)
        if ($bytes.Length -lt 20) { continue }

        # Leer como Latin-1 para buscar los nombres de clave (ASCII)
        $textoLatin = [Text.Encoding]::Latin1.GetString($bytes)

        # Solo procesar si contiene nuestro origen
        if ($textoLatin -notlike "*$origen*") { continue }

        Write-Host "  Procesando: $($archivo.Name) ($([Math]::Round($bytes.Length/1KB,1)) KB)" -ForegroundColor Gray

        foreach ($clave in $claves) {
            if ($resultados.ContainsKey($clave)) { continue }

            # Buscar el nombre de la clave en el texto
            $pos = $textoLatin.IndexOf($clave)
            if ($pos -lt 0) { continue }

            Write-Host "    Clave '$clave' encontrada en offset $pos" -ForegroundColor Green

            # Extraer la region despues de la clave (donde deberia estar el valor)
            $regionInicio = [Math]::Max(0, $pos)
            $regionFin = [Math]::Min($bytes.Length, $pos + 60000)
            $region = $textoLatin.Substring($regionInicio, $regionFin - $regionInicio)

            # Intentar Estrategia 1: JSON directo en Latin-1
            $matchJson = [regex]::Match($region, '(?s)(\[|\{).{10,}')
            if ($matchJson.Success -and $matchJson.Value.Length -gt 10) {
                $raw = $matchJson.Value
                # Limpiar caracteres de control del principio
                $limpio = ($raw.ToCharArray() | Where-Object { [int]$_ -ge 32 }) -join ''
                if ($limpio -match '^\[|^\{') {
                    $resultados[$clave] = $limpio.Substring(0, [Math]::Min(100000, $limpio.Length))
                    continue
                }
            }

            # Estrategia 2: Buscar en UTF-16 LE (Chrome puede guardar valores como UTF-16)
            $txt16 = [Text.Encoding]::Unicode.GetString($bytes)
            $pos16 = $txt16.IndexOf($clave)
            if ($pos16 -ge 0) {
                $region16 = $txt16.Substring($pos16, [Math]::Min(50000, $txt16.Length - $pos16))
                $match16 = [regex]::Match($region16, '(?s)(\[|\{).{10,}')
                if ($match16.Success) {
                    $resultados[$clave] = $match16.Value.Substring(0, [Math]::Min(100000, $match16.Value.Length))
                }
            }
        }
    } catch {
        # Archivo bloqueado o ilegible, ignorar
    }
}

# ================================================
# MOSTRAR RESULTADOS
# ================================================
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  RESULTADOS FINALES" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$hayDatos = $false
foreach ($clave in $claves) {
    Write-Host ""
    Write-Host "=== $clave ===" -ForegroundColor Yellow
    if ($resultados.ContainsKey($clave) -and $resultados[$clave].Length -gt 5) {
        $valor = $resultados[$clave]
        Write-Host $valor.Substring(0, [Math]::Min(300, $valor.Length)) -ForegroundColor White
        if ($valor.Length -gt 300) { Write-Host "  ... [truncado, total: $($valor.Length) chars]" -ForegroundColor Gray }
        $hayDatos = $true
    } else {
        Write-Host "  VACIO o NO ENCONTRADO" -ForegroundColor Red
    }
}

# Guardar en archivo JSON
$jsonSalida = [ordered]@{}
foreach ($clave in $claves) {
    $jsonSalida[$clave] = if ($resultados.ContainsKey($clave)) { $resultados[$clave] } else { $null }
}

$jsonSalida | ConvertTo-Json -Depth 5 | Out-File $outputFile -Encoding UTF8
Write-Host ""

if ($hayDatos) {
    Write-Host "DATOS GUARDADOS EN:" -ForegroundColor Green
    Write-Host $outputFile -ForegroundColor Green
} else {
    Write-Host "ATENCION: No se encontraron datos. Posibles causas:" -ForegroundColor Red
    Write-Host "  1. Los datos estan en otro perfil de Chrome (Edge, perfil secundario, etc.)" -ForegroundColor Yellow
    Write-Host "  2. La app usa IndexedDB en vez de localStorage" -ForegroundColor Yellow
    Write-Host "  3. Los datos nunca se guardaron en este PC" -ForegroundColor Yellow
}

# Limpiar
Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Read-Host "Presiona Enter para cerrar"
