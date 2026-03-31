# Fix: agregar boton de compartir como imagen
$archivo = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$lineas = [System.IO.File]::ReadAllLines($archivo, [System.Text.Encoding]::UTF8)
Write-Host "Archivo: $($lineas.Count) lineas"

# Reemplazar lineas 868 a 898 (0-indexed: 867 a 897)
$inicio = 867  # linea 868 (0-indexed)
$fin = 897     # linea 898 (0-indexed)

$reemplazo = @'
            // Botones
            '<div style="margin-top:25px;display:grid;gap:10px">' +
                '<button id="pdf-compartir" style="width:100%;padding:16px;background:linear-gradient(135deg,#25D366,#128C7E);border:none;color:#fff;font-weight:900;font-size:calc(1rem * var(--font-scale,1));border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 6px 20px rgba(37,211,102,0.3);-webkit-appearance:none">' + "\u{1F4AC}" + ' COMPARTIR TEXTO</button>' +
                '<button id="pdf-imagen" style="width:100%;padding:14px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;font-weight:900;font-size:calc(0.95rem * var(--font-scale,1));border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 4px 15px rgba(108,92,231,0.3);-webkit-appearance:none">' + "\u{1F4C4}" + ' COMPARTIR COMO IMAGEN</button>' +
                '<button id="pdf-copiar" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);font-weight:700;font-size:calc(0.85rem * var(--font-scale,1));border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;-webkit-appearance:none">' + "\u{1F4CB}" + ' COPIAR TEXTO</button>' +
            '</div>' +
            '<div style="text-align:center;padding:18px 0 40px;color:rgba(255,255,255,0.2);font-size:0.7rem">Iglesia Adventista del S' + "\u{00E9}" + 'ptimo D' + "\u{00ED}" + 'a ' + "\u{2014}" + ' Cypress Hills</div>' +
        '</div>';

    document.body.appendChild(overlay);

    document.getElementById('pdf-cerrar').onclick = function () { overlay.remove(); };

    document.getElementById('pdf-compartir').onclick = function () {
        var texto = _formatearLiturgiaTexto(reg);
        if (navigator.share) {
            navigator.share({ title: 'Programa de Culto', text: texto }).catch(function () { });
        } else {
            window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
        }
    };

    // COMPARTIR COMO IMAGEN
    document.getElementById('pdf-imagen').onclick = function () {
        var btn = document.getElementById('pdf-imagen');
        btn.textContent = '\u23F3 Generando imagen...';
        btn.disabled = true;

        var filaImg = function (lbl, val) {
            return (val && val !== '-') ? '<tr><td style="padding:8px 12px;color:#555;font-weight:600;border-bottom:1px solid #eee;width:42%">' + lbl + '</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;color:#222">' + val + '</td></tr>' : '';
        };

        var contenidoImg = document.createElement('div');
        contenidoImg.style.cssText = 'position:fixed;left:-9999px;top:0;width:600px;background:#fff;font-family:Segoe UI,sans-serif;padding:30px;z-index:-1;';
        contenidoImg.innerHTML =
            '<div style="text-align:center;margin-bottom:8px">' +
                '<div style="color:#888;font-size:11px;letter-spacing:3px;text-transform:uppercase">Iglesia Adventista del S\u00E9ptimo D\u00EDa</div>' +
                '<div style="color:#6c5ce7;font-weight:900;font-size:20px;margin-top:4px">\u26EA CYPRESS HILLS</div>' +
            '</div>' +
            '<div style="text-align:center;background:linear-gradient(135deg,#6c5ce7,#a29bfe);padding:16px;border-radius:12px;margin:10px 0 18px;color:#fff">' +
                '<div style="font-size:18px;font-weight:900;letter-spacing:1px">PROGRAMA DE CULTO</div>' +
                '<div style="font-size:14px;margin-top:4px;opacity:0.9">\u{1F4C5} ' + f + '</div>' +
            '</div>' +
            '<table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.08)">' +
                '<tr style="background:#f8f7ff"><td colspan="2" style="text-align:center;padding:8px;color:#6c5ce7;font-weight:900;font-size:12px;letter-spacing:2px">SERVICIO DE ADORACI\u00D3N</td></tr>' +
                filaImg('\u2728 Doxolog\u00EDa', reg.doxologia) +
                filaImg('\u{1F64F} Invocaci\u00F3n', reg.invocacion) +
                filaImg('\u{1F64C} Bienvenida', reg.bienvenida) +
                filaImg('\u{1F476} Rinc\u00F3n Infantil', reg.infantil) +
                '<tr style="background:#f8f7ff"><td colspan="2" style="text-align:center;padding:8px;color:#6c5ce7;font-weight:900;font-size:12px;letter-spacing:2px">DIEZMOS Y OFRENDAS</td></tr>' +
                filaImg('\u{1F9D4} Di\u00E1cono', reg.diacono) +
                filaImg('\u{1F469} Diaconisa', reg.diaconisa) +
                '<tr style="background:#f8f7ff"><td colspan="2" style="text-align:center;padding:8px;color:#6c5ce7;font-weight:900;font-size:12px;letter-spacing:2px">ADORACI\u00D3N Y LECTURA</td></tr>' +
                filaImg('\u{1F3B5} Himno de Adoraci\u00F3n', reg.himnoAdoracion) +
                filaImg('\u{1F4D6} Lectura B\u00EDblica', reg.lectura) +
                filaImg('\u{1F64F} Oraci\u00F3n Intercesora', reg.oracion) +
                filaImg('\u{1F3A4} M\u00FAsica Especial', reg.canto) +
                filaImg('\u{1F399}\uFE0F Presentar al Predicador(a)', reg.presentar) +
                '<tr style="background:#f8f7ff"><td colspan="2" style="text-align:center;padding:8px;color:#6c5ce7;font-weight:900;font-size:12px;letter-spacing:2px">PREDICACI\u00D3N</td></tr>' +
                '<tr style="background:#f0edff"><td style="padding:10px 12px;color:#555;font-weight:600">\u26EA Predicador</td><td style="padding:10px 12px;font-weight:900;font-size:16px;color:#6c5ce7">' + (reg.predicador || '---') + '</td></tr>' +
                (reg.tema ? '<tr style="background:#f0edff"><td style="padding:8px 12px;color:#555;font-weight:600">\u{1F4DD} Tema</td><td style="padding:8px 12px;font-weight:700;color:#e17055">' + reg.tema + '</td></tr>' : '') +
                '<tr style="background:#f8f7ff"><td colspan="2" style="text-align:center;padding:8px;color:#6c5ce7;font-weight:900;font-size:12px;letter-spacing:2px">CIERRE</td></tr>' +
                filaImg('\u{1F3B6} Himno Final', reg.himnoFinal) +
                filaImg('\u{1F932} Oraci\u00F3n Final', reg.oracionFinal) +
            '</table>' +
            '<div style="text-align:center;margin-top:15px;color:#aaa;font-size:10px;border-top:1px solid #eee;padding-top:10px">Iglesia Adventista del S\u00E9ptimo D\u00EDa \u2014 Cypress Hills \u00B7 Legado B\u00EDblico</div>';

        document.body.appendChild(contenidoImg);

        function _generarImagen() {
            html2canvas(contenidoImg, { scale: 2, backgroundColor: '#ffffff', useCORS: true }).then(function (canvas) {
                contenidoImg.remove();
                canvas.toBlob(function (blob) {
                    var archivo = new File([blob], 'Programa_Culto_' + f.replace(/\//g, '-') + '.png', { type: 'image/png' });
                    if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
                        navigator.share({
                            title: 'Programa de Culto \u2014 ' + f,
                            text: 'Programa de Culto \u2014 Iglesia Cypress Hills',
                            files: [archivo]
                        }).catch(function () { });
                    } else {
                        var link = document.createElement('a');
                        link.download = archivo.name;
                        link.href = URL.createObjectURL(blob);
                        link.click();
                        if (typeof mostrarToast === 'function') mostrarToast('\u{1F4C4} Imagen descargada');
                    }
                    btn.textContent = '\u{1F4C4} COMPARTIR COMO IMAGEN';
                    btn.disabled = false;
                }, 'image/png');
            }).catch(function (err) {
                contenidoImg.remove();
                btn.textContent = '\u{1F4C4} COMPARTIR COMO IMAGEN';
                btn.disabled = false;
                alert('Error: ' + err.message);
            });
        }

        if (typeof html2canvas === 'undefined') {
            var script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = _generarImagen;
            script.onerror = function () {
                contenidoImg.remove();
                btn.textContent = '\u{1F4C4} COMPARTIR COMO IMAGEN';
                btn.disabled = false;
                alert('No se pudo cargar. Verifica tu conexi\u00F3n.');
            };
            document.head.appendChild(script);
        } else {
            _generarImagen();
        }
    };

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
'@

$nuevasLineas = New-Object System.Collections.Generic.List[string]
# Agregar lineas antes del bloque
for ($i = 0; $i -lt $inicio; $i++) { $nuevasLineas.Add($lineas[$i]) }
# Agregar reemplazo
foreach ($l in $reemplazo.Split("`n")) { $nuevasLineas.Add($l) }
# Agregar lineas despues del bloque
for ($i = $fin + 1; $i -lt $lineas.Count; $i++) { $nuevasLineas.Add($lineas[$i]) }

[System.IO.File]::WriteAllLines($archivo, $nuevasLineas.ToArray(), [System.Text.Encoding]::UTF8)
Write-Host "OK - $($lineas.Count) -> $($nuevasLineas.Count) lineas"
