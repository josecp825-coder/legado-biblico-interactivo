# Fix PDF v2: reemplazar por numero de linea exacto (1072 a 1207)
$archivo = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'
$lineas = [System.IO.File]::ReadAllLines($archivo, [System.Text.Encoding]::UTF8)
Write-Host "Lineas: $($lineas.Count)"

$inicio = 1071  # linea 1072 (0-indexed)
$fin = 1206     # linea 1207 (0-indexed)

Write-Host "Reemplazando lineas $($inicio+1) a $($fin+1)"
Write-Host "Primera: $($lineas[$inicio].Substring(0, [Math]::Min(60, $lineas[$inicio].Length)))"
Write-Host "Ultima: $($lineas[$fin].Substring(0, [Math]::Min(60, $lineas[$fin].Length)))"

$reemplazo = @'
    // COMPARTIR COMO PDF REAL
    document.getElementById('pdf-archivo').onclick = function () {
        var btn = document.getElementById('pdf-archivo');
        btn.textContent = '\u23F3 Generando PDF...';
        btn.disabled = true;

        function _crearPDF() {
            try {
                var JsPDF = jspdf.jsPDF || jsPDF;
                var doc = new JsPDF('p', 'mm', 'a4');
                var w = doc.internal.pageSize.getWidth();
                var y = 15;

                doc.setFontSize(12);
                doc.setTextColor(108, 92, 231);
                doc.text('IGLESIA ADVENTISTA CYPRESS HILLS', w / 2, y, { align: 'center' });
                y += 10;

                doc.setFillColor(108, 92, 231);
                doc.roundedRect(15, y, w - 30, 18, 4, 4, 'F');
                doc.setFontSize(14);
                doc.setTextColor(255, 255, 255);
                doc.text('PROGRAMA DE CULTO', w / 2, y + 8, { align: 'center' });
                doc.setFontSize(10);
                doc.text('Fecha: ' + f, w / 2, y + 14, { align: 'center' });
                y += 25;

                var seccion = function (titulo) {
                    doc.setFillColor(248, 247, 255);
                    doc.rect(15, y, w - 30, 8, 'F');
                    doc.setFontSize(8);
                    doc.setTextColor(108, 92, 231);
                    doc.text(titulo, w / 2, y + 5.5, { align: 'center' });
                    y += 10;
                };

                var campo = function (lbl, val) {
                    if (!val || val === '-') return;
                    doc.setFontSize(9);
                    doc.setTextColor(120, 120, 120);
                    doc.text(lbl + ':', 20, y);
                    doc.setTextColor(30, 30, 30);
                    doc.setFont(undefined, 'bold');
                    doc.text(String(val).substring(0, 60), 80, y);
                    doc.setFont(undefined, 'normal');
                    doc.setDrawColor(238, 238, 238);
                    doc.line(20, y + 2, w - 20, y + 2);
                    y += 7;
                };

                seccion('SERVICIO DE ADORACION');
                campo('Doxologia', reg.doxologia);
                campo('Invocacion', reg.invocacion);
                campo('Bienvenida', reg.bienvenida);
                campo('Rincon Infantil', reg.infantil);

                seccion('DIEZMOS Y OFRENDAS');
                campo('Diacono', reg.diacono);
                campo('Diaconisa', reg.diaconisa);

                seccion('ADORACION Y LECTURA');
                campo('Himno de Adoracion', reg.himnoAdoracion);
                campo('Lectura Biblica', reg.lectura);
                campo('Oracion Intercesora', reg.oracion);
                campo('Musica Especial', reg.canto);
                campo('Presentar al Predicador(a)', reg.presentar);

                seccion('PREDICACION');
                doc.setFillColor(240, 237, 255);
                doc.rect(15, y, w - 30, 14, 'F');
                doc.setFontSize(9);
                doc.setTextColor(120, 120, 120);
                doc.text('Predicador:', 20, y + 5);
                doc.setFontSize(12);
                doc.setTextColor(108, 92, 231);
                doc.setFont(undefined, 'bold');
                doc.text(String(reg.predicador || '---').substring(0, 50), 80, y + 5);
                doc.setFont(undefined, 'normal');
                if (reg.tema) {
                    doc.setFontSize(9);
                    doc.setTextColor(120, 120, 120);
                    doc.text('Tema:', 20, y + 11);
                    doc.setTextColor(225, 112, 85);
                    doc.setFont(undefined, 'bold');
                    doc.text(String(reg.tema).substring(0, 60), 80, y + 11);
                    doc.setFont(undefined, 'normal');
                }
                y += 18;

                seccion('CIERRE');
                campo('Himno Final', reg.himnoFinal);
                campo('Oracion Final', reg.oracionFinal);

                y += 5;
                doc.setDrawColor(238, 238, 238);
                doc.line(20, y, w - 20, y);
                y += 5;
                doc.setFontSize(7);
                doc.setTextColor(170, 170, 170);
                doc.text('Iglesia Adventista Cypress Hills - Legado Biblico', w / 2, y, { align: 'center' });

                doc.save('Programa_Culto_' + f.replace(/\//g, '-') + '.pdf');
                if (typeof mostrarToast === 'function') mostrarToast('\u{1F4C4} PDF descargado!');
            } catch (err) {
                alert('Error al crear PDF: ' + err.message);
            }
            btn.textContent = '\u{1F4C4} COMPARTIR COMO PDF';
            btn.disabled = false;
        }

        if (typeof jspdf === 'undefined') {
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = function() { setTimeout(_crearPDF, 500); };
            script.onerror = function () {
                btn.textContent = '\u{1F4C4} COMPARTIR COMO PDF';
                btn.disabled = false;
                alert('No se pudo cargar. Verifica tu conexion a internet.');
            };
            document.head.appendChild(script);
        } else {
            _crearPDF();
        }
    };
'@

$nuevas = New-Object System.Collections.Generic.List[string]
for ($i = 0; $i -lt $lineas.Count; $i++) {
    if ($i -ge $inicio -and $i -le $fin) {
        if ($i -eq $inicio) {
            foreach ($l in $reemplazo.Split("`n")) { $nuevas.Add($l) }
        }
    }
    else {
        $nuevas.Add($l)
    }
}

[System.IO.File]::WriteAllLines($archivo, $nuevas.ToArray(), [System.Text.Encoding]::UTF8)
Write-Host "OK - $($lineas.Count) -> $($nuevas.Count) lineas"
