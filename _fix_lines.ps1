$lines = Get-Content 'c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\_add_eventos_especiales.js' -Encoding UTF8
$clean = New-Object System.Collections.ArrayList
for ($i = 0; $i -lt $lines.Count; $i++) {
    # Skip corrupt lines 1340-1344 (0-indexed: 1339-1343)
    if ($i -ge 1339 -and $i -le 1343) {
        Write-Host "  REMOVING line $($i+1): $($lines[$i].Substring(0, [Math]::Min(60, $lines[$i].Length)))..."
        continue
    }
    [void]$clean.Add($lines[$i])
}
$clean | Set-Content 'c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\_add_eventos_especiales.js' -Encoding UTF8
Write-Host "Done. Removed 5 lines. Total now: $($clean.Count)"
