$path = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

for ($i = 0; $i -lt $lines.Length; $i++) {
    # Fix line with window.open and complex replace
    if ($lines[$i] -match "encodeURIComponent\(lineas\.replace") {
        $lines[$i] = "        window.open('https://wa.me/?text=' + encodeURIComponent(lineas), '_blank');"
        Write-Host "Fixed line $($i+1): window.open simplified"
    }
    # Fix closing script tag - make it safe for template literal
    if ($lines[$i] -match '^\s+</script>$') {
        $lines[$i] = "    </`+`script>"
        Write-Host "Fixed line $($i+1): script tag"
    }
}

[System.IO.File]::WriteAllLines($path, $lines, [System.Text.Encoding]::UTF8)
Write-Host "Done"
