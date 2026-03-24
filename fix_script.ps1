$content = [System.IO.File]::ReadAllText("C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js", [System.Text.Encoding]::UTF8)

# Fix 1: Replace the join line
$content = $content -replace "\].join\('\\\\n'\);", "].join(String.fromCharCode(10));"

# Fix 2: Replace the window.open line with the complex replace
$content = $content -replace "window\.open\('https://wa\.me/\?text=' \+ encodeURIComponent\(lineas\.replace\([^)]+\)[^)]+\), '_blank'\);", "window.open('https://wa.me/?text=' + encodeURIComponent(lineas), '_blank');"

# Fix 3: Fix the closing script tag
$content = $content -replace '<\\/script>', '</script>'

[System.IO.File]::WriteAllText("C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js", $content, [System.Text.Encoding]::UTF8)
Write-Host "Script fixes applied"
