import re

path = r"C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the section to replace: from the btn-enviar line to the closing };
old_pattern = r"(    ventana\.document\.write\('<button class=\"btn\".*?ENVIAR PROGRAMA.*?\n)(.*?)(^\};$)"
# This won't work well with regex. Let's do it by finding markers.

lines = content.split('\n')
new_lines = []
skip = False
found = False

for i, line in enumerate(lines):
    if skip:
        # Look for the closing }; of enviarFormularioVacioWA
        if line.strip() == '};':
            skip = False
            found = True
            # Write replacement
            new_lines.append("    ventana.document.write('<button class=\"btn\" id=\"btnEnviar\">\U0001f4e4 ENVIAR PROGRAMA</button></div>');")
            new_lines.append("    ventana.document.write('<div class=\"ft\">Generado por Legado B\u00edblico</div></div></body></html>');")
            new_lines.append("    ventana.document.close();")
            new_lines.append("")
            new_lines.append("    // Inyectar funci\u00f3n directamente (sin script embebido)")
            new_lines.append("    ventana.enviarForm = function() {")
            new_lines.append("        var doc = ventana.document;")
            new_lines.append("        var g = function(id) { var e = doc.getElementById('f-' + id); return e && e.value.trim() ? e.value.trim() : '---'; };")
            new_lines.append("        var lineas = [")
            new_lines.append("            '\u26ea *PROGRAMA DE CULTO*',")
            new_lines.append("            '\U0001f4c5 *Fecha:* ' + g('fecha'),")
            new_lines.append("            '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',")
            new_lines.append("            '\u2728 Doxolog\u00eda: ' + g('doxologia'),")
            new_lines.append("            '\U0001f64f Invocaci\u00f3n: ' + g('invocacion'),")
            new_lines.append("            '\U0001f64c Bienvenida: ' + g('bienvenida'),")
            new_lines.append("            '\U0001f476 Rinc\u00f3n Infantil: ' + g('infantil'),")
            new_lines.append("            '\U0001f4b0 *Diezmos y Ofrendas:*',")
            new_lines.append("            '   \U0001f9d4 Di\u00e1cono: ' + g('diacono'),")
            new_lines.append("            '   \U0001f469 Diaconisa: ' + g('diaconisa'),")
            new_lines.append("            '\U0001f3b5 Himno de Adoraci\u00f3n: ' + g('himno'),")
            new_lines.append("            '\U0001f4d6 Lectura B\u00edblica: ' + g('lectura'),")
            new_lines.append("            '\U0001f64f Oraci\u00f3n Intercesora: ' + g('oracion'),")
            new_lines.append("            '\U0001f3a4 M\u00fasica Especial: ' + g('musica'),")
            new_lines.append("            '\U0001f399\ufe0f Presentar al Predicador(a): ' + g('presentar'),")
            new_lines.append("            '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',")
            new_lines.append("            '\u26ea *Predicador:* ' + g('predicador'),")
            new_lines.append("            '\U0001f4dd *Tema:* ' + g('tema'),")
            new_lines.append("            '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',")
            new_lines.append("            '\U0001f3b6 Himno Final: ' + g('himnoFinal'),")
            new_lines.append("            '\U0001f932 Oraci\u00f3n Final: ' + g('oracionFinal'),")
            new_lines.append("            '',")
            new_lines.append("            '\U0001f4f1 _Legado B\u00edblico_'")
            new_lines.append("        ].join('\\n');")
            new_lines.append("        if (ventana.navigator.share) {")
            new_lines.append("            ventana.navigator.share({title: 'Programa de Culto', text: lineas}).catch(function(){});")
            new_lines.append("        } else {")
            new_lines.append("            ventana.navigator.clipboard.writeText(lineas).then(function(){")
            new_lines.append("                ventana.alert('\U0001f4cb Copiado! P\u00e9galo donde quieras enviar.');")
            new_lines.append("            }).catch(function(){")
            new_lines.append("                ventana.prompt('Copia este texto:', lineas);")
            new_lines.append("            });")
            new_lines.append("        }")
            new_lines.append("    };")
            new_lines.append("    ventana.document.getElementById('btnEnviar').onclick = ventana.enviarForm;")
            new_lines.append("};")
        continue
    
    # Detect the button line (start of section to replace)  
    if 'ENVIAR PROGRAMA' in line and 'ventana.document.write' in line and 'btn' in line:
        skip = True
        continue
    
    new_lines.append(line)

if found:
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"OK - {len(new_lines)} lines written")
else:
    print("ERROR - pattern not found")
