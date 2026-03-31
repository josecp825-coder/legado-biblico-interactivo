import sys
import os

FILE = r'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# Bloque a insertar ANTES de "    var dir = '';"
# dentro de compartirCultoPlantilla
# ============================================================
MARKER = "    var dir = '';"

SAB_BLOCK = r"""    // Deteccion sabado
    var esSab = (reg.tipo === 'S\u00e1bado');
    if (esSab) {
        var ancSab = '';
        if (reg.sab_anciano_tipo || reg.sab_anciano) {
            ancSab += fila('\u{1F9D3}', reg.sab_anciano_tipo || 'Anciano/a de turno', reg.sab_anciano || '', '#ffeaa7');
        }
        if (ancSab) s += '<div style="margin-bottom:10px">' + secTitulo('\u2720', 'PRESIDENCIA DEL CULTO', true) + cardStart(true) + ancSab + '</div></div>';
        var aper = '';
        if (reg.sab_doxologia)  aper += fila('\u2728', '1. Doxolog\u00eda', reg.sab_doxologia);
        if (reg.sab_invocacion) aper += fila('\u{1F64F}', '2. Invocaci\u00f3n', reg.sab_invocacion);
        if (reg.sab_bienvenida) aper += fila('\u{1F64C}', '3. Bienvenida', reg.sab_bienvenida);
        if (reg.sab_infantil)   aper += fila('\u{1F476}', '4. Rinc\u00f3n Infantil', reg.sab_infantil);
        if (reg.sab_ofrendas)   aper += fila('\u{1F4B0}', '5. Diezmos y Ofrendas', reg.sab_ofrendas);
        if (aper) s += '<div style="margin-bottom:10px">' + secTitulo('\u{1F3B5}', 'APERTURA DEL CULTO') + cardStart(false) + aper + '</div></div>';
        var himno6 = '';
        if (reg.sab_himno_anuncia) himno6 += fila('\u{1F3B5}', 'Anuncia el himno', reg.sab_himno_anuncia);
        if (reg.sab_himno6) {
            var n6 = parseInt((reg.sab_himno6||'').replace('#',''));
            himno6 += fila('\u{1F3B6}', '6. Himno de Adoraci\u00f3n', reg.sab_himno6, '#ffeaa7');
            if (typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[n6]) himno6 += '<div style="text-align:right;color:rgba(254,202,87,0.7);font-size:20px;font-style:italic;padding-bottom:6px">' + HIMNARIO_ADVENTISTA[n6] + '</div>';
        }
        if (himno6) s += '<div style="margin-bottom:10px">' + secTitulo('\u{1F3B5}', 'HIMNO DE ADORACI\u00d3N') + cardStart(false) + himno6 + '</div></div>';
        var lecSab = '';
        if (reg.sab_lectura_quien) lecSab += fila('\u{1F464}', 'Lector', reg.sab_lectura_quien);
        if (reg.sab_lectura) lecSab += fila('\u{1F4D6}', '7. Lectura B\u00edblica', reg.sab_lectura, '#7effd4');
        if (lecSab) s += '<div style="margin-bottom:10px"><div style="color:rgba(85,239,196,0.8);font-size:20px;font-weight:900;letter-spacing:2px;padding:14px 20px;background:rgba(85,239,196,0.08);border-radius:10px 10px 0 0;border-bottom:1px solid rgba(85,239,196,0.15)">\u{1F4D6} LECTURA B\u00cdBLICA</div><div style="background:rgba(85,239,196,0.05);border:1px solid rgba(85,239,196,0.15);border-radius:0 0 14px 14px;padding:20px 22px">' + lecSab + '</div></div>';
        var des2 = '';
        if (reg.sab_oracion_intercesora) des2 += fila('\u{1F64F}', '8. Oraci\u00f3n Intercesora', reg.sab_oracion_intercesora);
        if (reg.sab_musica_especial) des2 += fila('\u{1F3A4}', '9. M\u00fasica Especial', reg.sab_musica_especial);
        if (des2) s += '<div style="margin-bottom:10px">' + secTitulo('\u2B50', 'DESARROLLO') + cardStart(false) + des2 + '</div></div>';
        var predSab = '';
        if (reg.sab_pred_anuncia) predSab += fila('\u{1F3A4}', 'Presenta al predicador', reg.sab_pred_anuncia);
        if (reg.sab_predicador) predSab += fila('\u{1F399}\uFE0F', '10. Predicador/a', reg.sab_predicador, '#ffeaa7');
        if (reg.sab_tema) predSab += fila('\u{1F4CB}', 'Tema', '"' + reg.sab_tema + '"');
        if (predSab) s += '<div style="margin-bottom:10px">' + secTitulo('\u{1F3A4}', 'PREDICACI\u00d3N') + cardStart(true) + predSab + '</div></div>';
        var cieSab = '';
        if (reg.sab_himno_final_quien) cieSab += fila('\u{1F4E2}', 'Anuncia himno final', reg.sab_himno_final_quien);
        if (reg.sab_himno_final) {
            var nF = parseInt((reg.sab_himno_final||'').replace('#',''));
            cieSab += fila('\u{1F3B5}', '11. Himno Final', reg.sab_himno_final, '#ffeaa7');
            if (typeof HIMNARIO_ADVENTISTA!=='undefined' && HIMNARIO_ADVENTISTA[nF]) cieSab += '<div style="text-align:right;color:rgba(254,202,87,0.7);font-size:20px;font-style:italic;padding-bottom:6px">' + HIMNARIO_ADVENTISTA[nF] + '</div>';
        }
        if (reg.sab_oracion_final) cieSab += fila('\u{1F932}', '12. Oraci\u00f3n Final', reg.sab_oracion_final);
        if (reg.sab_sonido) cieSab += fila('\u{1F39B}\uFE0F', 'Encargado de Sonido', reg.sab_sonido);
        if (cieSab) s += '<div style="margin-bottom:10px">' + secTitulo('\u{1F3B6}', 'CIERRE DEL CULTO', true) + cardStart(false) + cieSab + '</div></div>';
        if (reg.sab_obs) s += '<div style="background:rgba(162,155,254,0.05);border:1px solid rgba(162,155,254,0.15);border-radius:12px;padding:14px;margin-bottom:10px"><div style="color:#a29bfe;font-size:15px;font-weight:900;letter-spacing:1px;margin-bottom:6px">\u{1F4DD} OBSERVACIONES</div><div style="color:rgba(255,255,255,0.7);font-size:17px">' + reg.sab_obs + '</div></div>';
    } else {
"""

CLOSE_ELSE = "    } // fin else dias normales\n    "

# ============================================================
# Localizar el punto de insercion dentro de compartirCultoPlantilla
# ============================================================
FN_START = content.find('window.compartirCultoPlantilla = function')
if FN_START < 0:
    print("ERROR: compartirCultoPlantilla no encontrada")
    sys.exit(1)

idx_dir = content.find(MARKER, FN_START)
if idx_dir < 0:
    print("ERROR: MARKER no encontrado desde FN_START")
    sys.exit(1)

print(f"FN_START={FN_START}, idx_dir={idx_dir}")

# Insertar bloque SAB antes del "var dir = '';"
content = content[:idx_dir] + SAB_BLOCK + "\n" + content[idx_dir:]

# Ahora buscar el "container.innerHTML" para cerrar el else
CONTAINER_MARKER = "    container.innerHTML = "
idx_container = content.find(CONTAINER_MARKER, FN_START)
print(f"container.innerHTML en: {idx_container}")

# Insertar cierre del else antes de container.innerHTML
content = content[:idx_container] + CLOSE_ELSE + content[idx_container:]

print(f"Nuevo tamano: {len(content)}")

# Verificaciones
print("esSab en plantilla:", "var esSab = (reg.tipo" in content)
print("PRESIDENCIA DEL CULTO:", "PRESIDENCIA DEL CULTO" in content)
print("sab_predicador:", "reg.sab_predicador" in content)
print("fin else dias normales:", "fin else dias normales" in content)

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print("=== ARCHIVO GUARDADO OK ===")
