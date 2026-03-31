$path = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)
$newLines = New-Object System.Collections.ArrayList

$skipUntil = -1
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($i -lt $skipUntil) { continue }
    
    # Find the line with the ENVIAR PROGRAMA button
    if ($lines[$i] -match 'ENVIAR PROGRAMA.*</button>.*</div>') {
        # Replace from this line until the closing };
        $newLines.Add("    ventana.document.write('<button class=""btn"" id=""btnEnviar"">📤 ENVIAR PROGRAMA</button></div>');") | Out-Null
        $newLines.Add("    ventana.document.write('<div class=""ft"">Generado por Legado Bíblico</div></div></body></html>');") | Out-Null
        $newLines.Add("    ventana.document.close();") | Out-Null
        $newLines.Add("") | Out-Null
        $newLines.Add("    // Inyectar función directamente") | Out-Null
        $newLines.Add("    ventana.enviarForm = function() {") | Out-Null
        $newLines.Add("        var doc = ventana.document;") | Out-Null
        $newLines.Add("        var g = function(id) { var e = doc.getElementById('f-' + id); return e && e.value.trim() ? e.value.trim() : '---'; };") | Out-Null
        $newLines.Add("        var lineas = [") | Out-Null
        $newLines.Add("            '⛪ *PROGRAMA DE CULTO*',") | Out-Null
        $newLines.Add("            '📅 *Fecha:* ' + g('fecha'),") | Out-Null
        $newLines.Add("            '━━━━━━━━━━━━━━━━━',") | Out-Null
        $newLines.Add("            '✨ Doxología: ' + g('doxologia'),") | Out-Null
        $newLines.Add("            '🙏 Invocación: ' + g('invocacion'),") | Out-Null
        $newLines.Add("            '🙌 Bienvenida: ' + g('bienvenida'),") | Out-Null
        $newLines.Add("            '👶 Rincón Infantil: ' + g('infantil'),") | Out-Null
        $newLines.Add("            '💰 *Diezmos y Ofrendas:*',") | Out-Null
        $newLines.Add("            '   🧔 Diácono: ' + g('diacono'),") | Out-Null
        $newLines.Add("            '   👩 Diaconisa: ' + g('diaconisa'),") | Out-Null
        $newLines.Add("            '🎵 Himno de Adoración: ' + g('himno'),") | Out-Null
        $newLines.Add("            '📖 Lectura Bíblica: ' + g('lectura'),") | Out-Null
        $newLines.Add("            '🙏 Oración Intercesora: ' + g('oracion'),") | Out-Null
        $newLines.Add("            '🎤 Música Especial: ' + g('musica'),") | Out-Null
        $newLines.Add("            '🎙️ Presentar al Predicador(a): ' + g('presentar'),") | Out-Null
        $newLines.Add("            '━━━━━━━━━━━━━━━━━',") | Out-Null
        $newLines.Add("            '⛪ *Predicador:* ' + g('predicador'),") | Out-Null
        $newLines.Add("            '📝 *Tema:* ' + g('tema'),") | Out-Null
        $newLines.Add("            '━━━━━━━━━━━━━━━━━',") | Out-Null
        $newLines.Add("            '🎶 Himno Final: ' + g('himnoFinal'),") | Out-Null
        $newLines.Add("            '🤲 Oración Final: ' + g('oracionFinal'),") | Out-Null
        $newLines.Add("            '',") | Out-Null
        $newLines.Add("            '📱 _Legado Bíblico_'") | Out-Null
        $newLines.Add("        ].join('\n');") | Out-Null
        $newLines.Add("        if (ventana.navigator.share) {") | Out-Null
        $newLines.Add("            ventana.navigator.share({title: 'Programa de Culto', text: lineas}).catch(function(){});") | Out-Null
        $newLines.Add("        } else {") | Out-Null
        $newLines.Add("            ventana.navigator.clipboard.writeText(lineas).then(function(){") | Out-Null
        $newLines.Add("                ventana.alert('📋 Copiado! Pégalo donde quieras enviar.');") | Out-Null
        $newLines.Add("            }).catch(function(){") | Out-Null
        $newLines.Add("                ventana.prompt('Copia este texto:', lineas);") | Out-Null
        $newLines.Add("            });") | Out-Null
        $newLines.Add("        }") | Out-Null
        $newLines.Add("    };") | Out-Null
        $newLines.Add("    ventana.document.getElementById('btnEnviar').onclick = ventana.enviarForm;") | Out-Null
        $newLines.Add("};") | Out-Null
        
        # Skip until we find the closing }; of the old function
        for ($j = $i + 1; $j -lt $lines.Length; $j++) {
            if ($lines[$j] -match '^\};$' -or $lines[$j] -match '^\s*\};?\s*$' -and $lines[$j - 1] -match 'document\.close') {
                $skipUntil = $j + 1
                break
            }
            # Also check for the pattern of the ending
            if ($lines[$j].Trim() -eq '};' -and $j -gt $i + 5) {
                $skipUntil = $j + 1
                break
            }
        }
        continue
    }
    
    $newLines.Add($lines[$i]) | Out-Null
}

[System.IO.File]::WriteAllLines($path, $newLines.ToArray(), [System.Text.Encoding]::UTF8)
Write-Host "Form script fixed - $($newLines.Count) lines written"
