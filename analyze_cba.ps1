# Buscar como estan delimitados los capitulos
$h = (Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/adventistaio/comentario-biblico-adventista-html/master/antiguo-testamento/01-genesis.html' -UseBasicParsing).Content

# Buscar los IDs de pagina (pf...)
Write-Host "=== Page IDs ==="
$pfMatches = [regex]::Matches($h, 'id="(pf[0-9a-f]+)"')
for ($i = 0; $i -lt [Math]::Min(10, $pfMatches.Count); $i++) {
    Write-Host "[$i] $($pfMatches[$i].Groups[1].Value)"
}

# Buscar "CAPITULO" o "CAPÍTULO" en texto de div.t
Write-Host ""
Write-Host "=== Texto con CAPITULO en div.t ==="
$capDivs = [regex]::Matches($h, '<div class="t [^"]*"[^>]*>[^<]*CAP[^<]*', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
for ($i = 0; $i -lt [Math]::Min(10, $capDivs.Count); $i++) {
    Write-Host "[$i] $($capDivs[$i].Value.Substring(0, [Math]::Min(200, $capDivs[$i].Value.Length)))"
}

# Buscar el texto que sigue a "id='pf8'" (primer capitulo)
Write-Host ""
Write-Host "=== Contenido despues de pf8 (cap 1) ==="
$idx = $h.IndexOf('id="pf8"')
if ($idx -ge 0) {
    $subAfterPf8 = $h.Substring($idx, [Math]::Min(2000, $h.Length - $idx))
    $textsAfter = [regex]::Matches($subAfterPf8, '<div class="t [^"]*"[^>]*>([^<]{1,200})')
    for ($i = 0; $i -lt [Math]::Min(15, $textsAfter.Count); $i++) {
        Write-Host "[$i] $($textsAfter[$i].Groups[1].Value)"
    }
}
