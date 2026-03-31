$file = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$startMarker = 'function cargarCultosSemana() {'
$endMarker = "    }).join('');" + "`r`n}"

$idx1 = $content.IndexOf($startMarker)
$idx2 = $content.IndexOf($endMarker, $idx1)
if ($idx1 -lt 0 -or $idx2 -lt 0) {
    # Try with just \n
    $endMarker = "    }).join('');" + "`n}"
    $idx2 = $content.IndexOf($endMarker, $idx1)
}
Write-Host "Start: $idx1, End: $idx2"
if ($idx1 -lt 0 -or $idx2 -lt 0) { Write-Host "Markers not found"; exit }

$endIdx = $idx2 + $endMarker.Length
$before = $content.Substring(0, $idx1)
$after = $content.Substring($endIdx)

$newFunc = @'
function cargarCultosSemana() {
    let historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    const query = document.getElementById('search-culto')?.value?.toLowerCase() || "";
    const contenedor = document.getElementById('historico-cultos');
    if (!contenedor) return;
    if (historial.length === 0) { contenedor.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.3);padding:40px;">No hay cultos registrados.</div>`; return; }
    const filtrados = historial.filter(h => JSON.stringify(h).toLowerCase().includes(query));
    if (filtrados.length === 0) { contenedor.innerHTML = `<div style="text-align:center;color:rgba(255,255,255,0.3);padding:30px;">Sin resultados.</div>`; return; }
    contenedor.innerHTML = filtrados.map(reg => {
        const color = reg.tipo === 'Mi\u00e9rcoles' ? '#55efc4' : (reg.tipo === 'S\u00e1bado' ? '#fdcb6e' : (reg.tipo === 'Viernes' ? '#ff6b6b' : '#a29bfe'));
        const camposCheck = ['anciano', 'bienvenida', 'oracion1', 'himno1', 'lectura', 'especial', 'intercesora', 'predicador', 'pred_tema', 'himno2', 'oracion_final'];
        const llenos = camposCheck.filter(c => reg[c] && reg[c].trim()).length;
        const estado = llenos >= 8 ? '\u2705 Completo' : `\u26A0\uFE0F ${llenos}/${camposCheck.length}`;
        const estadoColor = llenos >= 8 ? '#55efc4' : '#fdcb6e';
        const detalles = [reg.anciano ? `\u{1F9D3} ${reg.anciano}` : '', reg.bienvenida ? `\u{1F91D} ${reg.bienvenida}` : '', reg.oracion1 ? `\u{1F64F} ${reg.oracion1}` : '', reg.himno1_quien ? `\u{1F3B5} Anuncia himno: ${reg.himno1_quien}` : '', reg.himno1 ? `\u{1F3B6} ${reg.himno1}${reg.himno1_titulo ? ' \u2014 ' + reg.himno1_titulo : ''}` : '', reg.lectura ? `\u{1F4D6} ${reg.lectura}${reg.lectura_quien ? ' (' + reg.lectura_quien + ')' : ''}` : '', reg.especial ? `\u2B50 ${reg.especial}` : '', reg.intercesora ? `\u{1F64F} Intercesora: ${reg.intercesora}` : '', reg.pred_anuncia ? `\u{1F3A4} Presenta: ${reg.pred_anuncia}` : '', reg.predicador ? `\u{1F399}\uFE0F ${reg.predicador}` : '', reg.pred_tema ? `\u{1F4D1} "${reg.pred_tema}"` : '', reg.pred_texto ? `\u{1F4D6} ${reg.pred_texto}` : '', reg.himno2 ? `\u{1F3B5} Final: ${reg.himno2}${reg.himno2_titulo ? ' \u2014 ' + reg.himno2_titulo : ''}${reg.himno2_quien ? ' (Anuncia: ' + reg.himno2_quien + ')' : ''}` : '', reg.oracion_final ? `\u{1F64F} Oraci\u00f3n final: ${reg.oracion_final}` : '', reg.sonido ? `\u{1F39B}\uFE0F Sonido: ${reg.sonido}` : ''
        ].filter(d => d).join('<br>');
        return `<div style="background:rgba(255,255,255,0.04);border-radius:16px;padding:16px;border:1px solid rgba(255,255,255,0.08);border-left:5px solid ${color};"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:8px;"><span style="background:rgba(255,255,255,0.08);padding:3px 10px;border-radius:12px;font-size:0.6rem;color:${color};font-weight:900;letter-spacing:1px;">${reg.tipo}</span><span style="color:rgba(255,255,255,0.4);font-size:0.7rem;font-weight:700;">${formatearFechaCulto(reg.fecha)}</span></div><span style="font-size:0.6rem;color:${estadoColor};font-weight:900;">${estado}</span></div>${reg.predicador ? `<div style="color:#fff;font-weight:900;font-size:0.95rem;margin-bottom:4px;">\u{1F3A4} ${reg.predicador}</div>` : ''}${reg.pred_tema ? `<div style="color:rgba(255,255,255,0.6);font-size:0.8rem;font-style:italic;margin-bottom:10px;">\u{1F4D1} "${reg.pred_tema}"</div>` : ''}<details style="margin-top:8px;"><summary style="color:rgba(255,255,255,0.4);font-size:0.7rem;cursor:pointer;font-weight:700;">Ver programa completo</summary><div style="color:rgba(255,255,255,0.55);font-size:0.75rem;line-height:1.8;margin-top:10px;padding:10px;background:rgba(0,0,0,0.2);border-radius:10px;">${detalles || '<span style="opacity:0.3">Sin datos</span>'}</div></details><div style="display:flex;gap:6px;margin-top:10px;"><button onclick="editarCulto(${reg.id})" style="flex:1;padding:8px;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.2);color:#fdcb6e;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u270F\uFE0F EDITAR</button><button onclick="descargarCultoPDF(${reg.id})" style="flex:1;padding:8px;background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.2);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4C4} PDF</button><button onclick="compartirCultoPlantilla(${reg.id})" style="flex:1;padding:8px;background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.2);color:#a29bfe;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F4E4} PLANTILLA</button><button onclick="borrarCultoSemana(${reg.id})" style="padding:8px 12px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.2);color:#ff6b6b;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.65rem;">\u{1F5D1}\uFE0F</button></div></div>`;
    }).join('');
}
'@

$newContent = $before + $newFunc + $after
[System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "Funcion reparada. Verificando..."
$verify = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$checkIdx = $verify.IndexOf('function cargarCultosSemana()')
$snippet = $verify.Substring($checkIdx, 150)
Write-Host $snippet
