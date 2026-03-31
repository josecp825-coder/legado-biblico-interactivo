import re

path = r"C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\data_iglesia_v1.js"

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Encontrar la línea de inicio y fin de la función enviarFormularioVacioWA
start_line = None
end_line = None

for i, line in enumerate(lines):
    if 'window.enviarFormularioVacioWA = function' in line:
        start_line = i
    # Después de encontrar el inicio, buscar el cierre };
    if start_line is not None and i > start_line:
        if line.strip() == '};':
            end_line = i
            break

if start_line is None or end_line is None:
    print(f"ERROR: No se encontró la función. start={start_line}, end={end_line}")
    exit(1)

print(f"Función encontrada: líneas {start_line+1} a {end_line+1}")
print(f"Reemplazando {end_line - start_line + 1} líneas...")

new_function = r'''window.enviarFormularioVacioWA = function () {
    // Calcular próximo sábado
    var hoy = new Date();
    var diasParaSabado = (6 - hoy.getDay() + 7) % 7 || 7;
    var proxSabado = new Date(hoy);
    proxSabado.setDate(hoy.getDate() + diasParaSabado);
    var fechaISO = proxSabado.toISOString().split('T')[0];

    var campos = [
        { id: 'doxologia', lbl: '\u2728 Doxolog\u00eda', ph: 'Nombre...' },
        { id: 'invocacion', lbl: '\ud83d\ude4f Invocaci\u00f3n', ph: 'Nombre...' },
        { id: 'bienvenida', lbl: '\ud83d\ude4c Bienvenida', ph: 'Nombre...' },
        { id: 'infantil', lbl: '\ud83d\udc76 Rinc\u00f3n Infantil', ph: 'Nombre...' },
        { id: 'diacono', lbl: '\ud83e\uddd4 Di\u00e1cono (Ofrenda)', ph: 'Nombre...' },
        { id: 'diaconisa', lbl: '\ud83d\udc69 Diaconisa (Ofrenda)', ph: 'Nombre...' },
        { id: 'himno', lbl: '\ud83c\udfb5 Himno de Adoraci\u00f3n', ph: 'N\u00famero o nombre...' },
        { id: 'lectura', lbl: '\ud83d\udcd6 Lectura B\u00edblica', ph: 'Qui\u00e9n lee \u2014 Cita' },
        { id: 'oracion', lbl: '\ud83d\ude4f Oraci\u00f3n Intercesora', ph: 'Nombre...' },
        { id: 'musica', lbl: '\ud83c\udfa4 M\u00fasica Especial', ph: 'Qui\u00e9n cantar\u00e1...' },
        { id: 'presentar', lbl: '\ud83c\udf99\ufe0f Presentar al Predicador(a)', ph: 'Qui\u00e9n presenta...' },
        { id: 'predicador', lbl: '\u26ea Predicador', ph: 'Nombre del predicador...' },
        { id: 'tema', lbl: '\ud83d\udcdd Tema del Serm\u00f3n', ph: 'Tema...' },
        { id: 'himnoFinal', lbl: '\ud83c\udfb6 Himno Final', ph: 'N\u00famero o nombre...' },
        { id: 'oracionFinal', lbl: '\ud83e\udd32 Oraci\u00f3n Final', ph: 'Nombre...' }
    ];

    // Eliminar overlay anterior si existe
    var viejo = document.getElementById('form-culto-overlay');
    if (viejo) viejo.remove();

    // Generar HTML de campos
    var camposHtml = '';
    campos.forEach(function (c) {
        camposHtml += '<div style="margin-bottom:12px">' +
            '<label style="display:block;font-weight:700;color:#a29bfe;font-size:calc(0.82rem * var(--font-scale,1));margin-bottom:4px">' + c.lbl + '</label>' +
            '<input type="text" id="fv-' + c.id + '" placeholder="' + c.ph + '" ' +
            'style="width:100%;padding:11px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(162,155,254,0.25);border-radius:10px;color:#fff;font-size:calc(0.95rem * var(--font-scale,1));outline:none;box-sizing:border-box">' +
            '</div>';
    });

    // Crear el overlay fullscreen
    var overlay = document.createElement('div');
    overlay.id = 'form-culto-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:linear-gradient(170deg,#0a0818,#120e2a);z-index:10000;overflow-y:auto;font-family:Segoe UI,sans-serif;';

    overlay.innerHTML =
        // Header fijo
        '<div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:10001;border-bottom:1px solid rgba(162,155,254,0.3)">' +
            '<button id="fv-cerrar" style="background:rgba(255,118,117,0.15);border:1px solid #ff767550;color:#ff7675;padding:8px 15px;border-radius:8px;font-weight:900;font-size:calc(0.8rem * var(--font-scale,1));cursor:pointer">\u2715 CERRAR</button>' +
            '<div style="flex:1"><div style="color:#fff;font-weight:900;letter-spacing:1.5px;font-size:calc(0.85rem * var(--font-scale,1));">\ud83d\udccb PLANILLA DE CULTO</div>' +
            '<div style="color:rgba(255,255,255,0.4);font-size:calc(0.65rem * var(--font-scale,1))">Completa y env\u00eda por WhatsApp</div></div>' +
        '</div>' +

        // Cuerpo del formulario
        '<div style="padding:20px;max-width:560px;margin:0 auto">' +
            // Fecha
            '<div style="margin-bottom:18px;padding:14px;background:linear-gradient(135deg,rgba(108,92,231,0.15),rgba(162,155,254,0.1));border-radius:14px;border:1px solid rgba(162,155,254,0.3)">' +
                '<label style="font-weight:700;color:#a29bfe;font-size:calc(0.85rem * var(--font-scale,1));display:block;margin-bottom:6px">\ud83d\udcc5 Fecha del Culto</label>' +
                '<input type="date" id="fv-fecha" value="' + fechaISO + '" style="width:100%;padding:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(162,155,254,0.3);border-radius:10px;color:#fff;font-size:calc(1rem * var(--font-scale,1));font-weight:600;outline:none;box-sizing:border-box">' +
            '</div>' +

            // Campos
            camposHtml +

            // Botones de env\u00edo
            '<div style="margin-top:25px;display:grid;gap:10px">' +
                // Bot\u00f3n WhatsApp
                '<button id="fv-enviar-wa" style="width:100%;padding:16px;background:linear-gradient(135deg,#25D366,#128C7E);border:none;color:#fff;font-weight:900;font-size:calc(1.05rem * var(--font-scale,1));border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 6px 20px rgba(37,211,102,0.3);letter-spacing:0.5px">' +
                    '\ud83d\udcac ENVIAR POR WHATSAPP' +
                '</button>' +
                // Bot\u00f3n compartir otras apps
                '<button id="fv-compartir" style="width:100%;padding:14px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;font-weight:900;font-size:calc(0.95rem * var(--font-scale,1));border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 4px 15px rgba(108,92,231,0.3)">' +
                    '\ud83d\udce4 COMPARTIR (otras apps)' +
                '</button>' +
                // Bot\u00f3n copiar
                '<button id="fv-copiar" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);font-weight:700;font-size:calc(0.85rem * var(--font-scale,1));border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">' +
                    '\ud83d\udccb COPIAR TEXTO' +
                '</button>' +
            '</div>' +
            '<div style="text-align:center;padding:18px 0 40px;color:rgba(255,255,255,0.2);font-size:0.7rem">Generado por Legado B\u00edblico</div>' +
        '</div>';

    document.body.appendChild(overlay);

    // Funci\u00f3n para obtener el texto formateado
    function _obtenerTextoFormulario() {
        var g = function (id) {
            var e = document.getElementById('fv-' + id);
            return e && e.value.trim() ? e.value.trim() : '---';
        };
        var lineas = [
            '\u26ea *PROGRAMA DE CULTO*',
            '\ud83d\udcc5 *Fecha:* ' + g('fecha'),
            '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
            '\u2728 Doxolog\u00eda: ' + g('doxologia'),
            '\ud83d\ude4f Invocaci\u00f3n: ' + g('invocacion'),
            '\ud83d\ude4c Bienvenida: ' + g('bienvenida'),
            '\ud83d\udc76 Rinc\u00f3n Infantil: ' + g('infantil'),
            '\ud83d\udcb0 *Diezmos y Ofrendas:*',
            '   \ud83e\uddd4 Di\u00e1cono: ' + g('diacono'),
            '   \ud83d\udc69 Diaconisa: ' + g('diaconisa'),
            '\ud83c\udfb5 Himno de Adoraci\u00f3n: ' + g('himno'),
            '\ud83d\udcd6 Lectura B\u00edblica: ' + g('lectura'),
            '\ud83d\ude4f Oraci\u00f3n Intercesora: ' + g('oracion'),
            '\ud83c\udfa4 M\u00fasica Especial: ' + g('musica'),
            '\ud83c\udf99\ufe0f Presentar al Predicador(a): ' + g('presentar'),
            '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
            '\u26ea *Predicador:* ' + g('predicador'),
            '\ud83d\udcdd *Tema:* ' + g('tema'),
            '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501',
            '\ud83c\udfb6 Himno Final: ' + g('himnoFinal'),
            '\ud83e\udd32 Oraci\u00f3n Final: ' + g('oracionFinal'),
            '',
            '\ud83d\udcf1 _Legado B\u00edblico_'
        ];
        return lineas.join('\n');
    }

    // Cerrar
    document.getElementById('fv-cerrar').onclick = function () {
        overlay.remove();
    };

    // ENVIAR POR WHATSAPP
    document.getElementById('fv-enviar-wa').onclick = function () {
        var texto = _obtenerTextoFormulario();
        var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(texto);
        window.open(url, '_blank');
    };

    // COMPARTIR (navigator.share)
    document.getElementById('fv-compartir').onclick = function () {
        var texto = _obtenerTextoFormulario();
        if (navigator.share) {
            navigator.share({ title: 'Programa de Culto', text: texto }).catch(function () { });
        } else {
            var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(texto);
            window.open(url, '_blank');
        }
    };

    // COPIAR TEXTO
    document.getElementById('fv-copiar').onclick = function () {
        var texto = _obtenerTextoFormulario();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).then(function () {
                if (typeof mostrarToast === 'function') mostrarToast('\ud83d\udccb \u00a1Texto copiado! P\u00e9galo donde quieras');
                else alert('\ud83d\udccb \u00a1Copiado al portapapeles!');
            }).catch(function () {
                prompt('Copia este texto:', texto);
            });
        } else {
            prompt('Copia este texto:', texto);
        }
    };
};
'''

# Reemplazar las líneas
new_lines = lines[:start_line] + [new_function + '\n'] + lines[end_line+1:]

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"✅ OK - Función reemplazada. {len(lines)} líneas -> {len(new_lines)} líneas")
