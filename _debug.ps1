# RECONSTRUIR: archivo actual + pdf-copiar handler + resto del backup
$archivo = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$backup = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1_BACKUP_LATIN1.js'

# Leer actual (bueno)
$actual = [System.IO.File]::ReadAllText($archivo, [System.Text.Encoding]::UTF8)
Write-Host "Actual: $($actual.Length) chars"

# Leer backup como Latin1
$backupBytes = [System.IO.File]::ReadAllBytes($backup)
$backupTexto = [System.Text.Encoding]::GetEncoding('iso-8859-1').GetString($backupBytes)
$backupLineas = $backupTexto -split "`n"
Write-Host "Backup: $($backupLineas.Count) lineas"

# Del backup, tomar desde renderCitasDoxologia hasta el final
$inicioResto = -1
for ($i = 0; $i -lt $backupLineas.Count; $i++) {
    if ($backupLineas[$i] -match 'function renderCitasDoxologia') {
        $inicioResto = $i
        break
    }
}
Write-Host "Backup: renderCitasDoxologia en linea $($inicioResto+1)"

$resto = @()
for ($i = $inicioResto; $i -lt $backupLineas.Count; $i++) {
    $resto += $backupLineas[$i].TrimEnd("`r")
}
Write-Host "Resto del backup: $($resto.Count) lineas"

# Construir archivo completo:
# 1. Codigo actual (hasta };)
# 2. Handler pdf-copiar (nuevo)
# 3. Cierre de imprimirLiturgiaPDF (};)
# 4. Funciones del backup (renderCitasDoxologia, etc.)

$handlerCopiar = @"

    document.getElementById('pdf-copiar').onclick = function () {
        var texto = _formatearLiturgiaTexto(reg);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).then(function () {
                if (typeof mostrarToast === 'function') mostrarToast('\u{1F4CB} \u00A1Programa copiado!');
                else alert('\u{1F4CB} \u00A1Copiado!');
            }).catch(function () { prompt('Copia este texto:', texto); });
        } else { prompt('Copia este texto:', texto); }
    };
};

"@

$reconstruido = $actual.TrimEnd() + "`r`n" + $handlerCopiar + "`r`n" + ($resto -join "`r`n")

[System.IO.File]::WriteAllText($archivo, $reconstruido, [System.Text.Encoding]::UTF8)
$lineasFinal = ($reconstruido -split "`n").Count
Write-Host "RECONSTRUIDO: $lineasFinal lineas, $($reconstruido.Length) chars"
