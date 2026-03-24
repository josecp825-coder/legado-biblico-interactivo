# -*- coding: utf-8 -*-
"""
Script para restaurar TODOS los emojis del archivo data_iglesia_v1.js
y agregar botones de Compartir/PDF a los programas de liturgia guardados.
"""

import re

FILE = "data_iglesia_v1.js"

with open(FILE, "r", encoding="utf-8-sig") as f:
    content = f.read()

# =====================================================
# REEMPLAZOS CONTEXTUALES DE EMOJIS
# Cada tupla: (texto_roto, texto_correcto)
# =====================================================

replacements = [
    # === HEADER / MENÚ PRINCIPAL (renderModuloIglesia) ===
    ('>\u2190 INICIO</button>', '>🏠 INICIO</button>'),
    # Icono iglesia top-right
    ("""<div style="font-size:calc(1.5rem * var(--font-scale, 1));">?</div>""",
     """<div style="font-size:calc(1.5rem * var(--font-scale, 1));">⛪</div>"""),
    
    # === TARJETAS SECCIONES ===
    # 1. Liturgia de Cultos
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">??</div>
                        <h3 style="color:#a29bfe""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">📋✨</div>
                        <h3 style="color:#a29bfe"""),
    
    # 2. Citas Doxología
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">?</div>
                        <h3 style="color:#fdcb6e""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">🙏</div>
                        <h3 style="color:#fdcb6e"""),
    
    # 3. Registro de Predicadores
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">??</div>
                        <h3 style="color:#fab1a0""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">🎤📝</div>
                        <h3 style="color:#fab1a0"""),
    
    # 4. Calendario Oficial
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">??</div>
                        <h3 style="color:#ff9f43""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">📅🗓️</div>
                        <h3 style="color:#ff9f43"""),
    
    # 5. Manual de Iglesia
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">??</div>
                        <h3 style="color:#55efc4""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">📖🏛️</div>
                        <h3 style="color:#55efc4"""),
    
    # 6. Guía para Ancianos
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">??</div>
                        <h3 style="color:#00a8ff""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">👴📘</div>
                        <h3 style="color:#00a8ff"""),
    
    # 7. Historial de Predicación (3 emojis)
    ("""<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">???</div>
                        <h3 style="color:#ff6b6b""",
     """<div style="font-size:calc(2.5rem * var(--font-scale, 1));margin-bottom:15px;">📊🔥📋</div>
                        <h3 style="color:#ff6b6b"""),
    
    # 8. Fábrica de Sermones
    ("""<div style="font-size:calc(3rem * var(--font-scale, 1));">?</div>
                            <div style="background:#fdcb6e""",
     """<div style="font-size:calc(3rem * var(--font-scale, 1));">🤖</div>
                            <div style="background:#fdcb6e"""),
    
    # 9. 28 Doctrinas icon
    ("""<div style="font-size:calc(2.8rem * var(--font-scale, 1));">??</div>""",
     """<div style="font-size:calc(2.8rem * var(--font-scale, 1));">✝️📜</div>"""),
    
    # === LITURGIA DE CULTOS (renderLiturgia) ===
    ('>\u2190 VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;">PROGRAMA DE CULTO', 
     '>⬅️ VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;">PROGRAMA DE CULTO'),
    
    # Botón guardar programa
    ('💾✨ GUARDAR PROGRAMA', '💾✨ GUARDAR PROGRAMA'),  # already has entities? let me check
    ("""            ?? GUARDAR PROGRAMA""", """            💾✨ GUARDAR PROGRAMA"""),
    
    # Programas guardados - botón borrar
    ('cursor:pointer;">???</button>', 'cursor:pointer;">🗑️❌</button>'),
    
    # Culto del (fecha)
    ('padding-bottom:10px;">\u2197\ufe0f CULTO DEL', 'padding-bottom:10px;">📌 CULTO DEL'),
    ('>?? CULTO DEL', '>📌 CULTO DEL'),
    
    # === CITAS DOXOLOGÍA ===
    ('font-weight:900;">\u2190 VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">DOXOLOG',
     'font-weight:900;">⬅️ VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">DOXOLOG'),
    
    # === MANUAL DE IGLESIA ===
    ('font-weight:900;">\u2190 VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;">MANUAL DE IGLESIA',
     'font-weight:900;">⬅️ VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;">MANUAL DE IGLESIA'),
    
    # === REGISTRO PREDICACIONES ===
    ('font-weight:900;">\u2190 VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">REGISTRO DE PREDICACIONES',
     'font-weight:900;">⬅️ VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">REGISTRO DE PREDICACIONES'),
    
    # Guardar registro
    ('>?? GUARDAR REGISTRO</button>', '>💾📋 GUARDAR REGISTRO</button>'),
    
    # En predicaciones guardadas - borrar
    # (already handled by generic ???)
    
    # Fecha predicación
    ('>?? ${formatearFecha(reg.fecha)}</div>', '>📅 ${formatearFecha(reg.fecha)}</div>'),
    
    # Cita bíblica en predicaciones
    ('>?? Texto: ${reg.cita}</div>', '>📖 Texto: ${reg.cita}</div>'),
    
    # Himnos en predicaciones
    ('>?? Himnos: ${reg.himnos}</div>', '>🎵 Himnos: ${reg.himnos}</div>'),
    
    # === VISOR PDF ===
    ('? Volver', '⬅️ Volver'),
    ('>?? ${titulo}</div>', '>📄 ${titulo}</div>'),
    ('? Anterior', '⬅️ Anterior'),
    ('Siguiente ?', 'Siguiente ➡️'),
    ('>?? Buscar</button>', '>🔍 Buscar</button>'),
    ("btnBuscar.textContent = '?? Buscar'", "btnBuscar.textContent = '🔍 Buscar'"),
    ('>??</div>', '>🔎</div>'),  # no-results icon
    ('? Resultado principal', '⭐ Resultado principal'),
    # "Ver aquí" button
    ("""Ver<br>aquí ??""", """Ver<br>aquí 📖"""),
    # abrir pdf completo
    ('>?? Abrir el ${titulo} completo (PDF)</button>', '>📥 Abrir el ${titulo} completo (PDF)</button>'),
    
    # === CALENDARIO ===
    ('font-weight:900;">\u2190 VOLVER</button>\n                    <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">CALENDARIO OFICIAL',
     'font-weight:900;">⬅️ VOLVER</button>\n                    <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">CALENDARIO OFICIAL'),
    
    # Calendario icon
    ("""<div style="font-size:calc(3rem * var(--font-scale, 1));margin-bottom:10px;">??</div>""",
     """<div style="font-size:calc(3rem * var(--font-scale, 1));margin-bottom:10px;">📅🗓️</div>"""),
    
    # Mes selector buttons
    ('>?? ${m.toUpperCase()}', '>📅 ${m.toUpperCase()}'),
    
    # Compartir calendario
    ('>?? Compartir Calendario</button>', '>📤 Compartir Calendario</button>'),
    ('>?? El enlace expira en 4 horas', '>🔒 El enlace expira en 4 horas'),
    
    # Back to months
    ('font-weight:900;">\u2190 MESES</button>', 'font-weight:900;">⬅️ MESES</button>'),
    
    # Month headers
    ('>?? ${currentMonth} 2026', '>📅 ${currentMonth} 2026'),
    
    # Compartir mes
    ('>?? Compartir este mes</button>', '>📤 Compartir este mes</button>'),
    ('>?? El enlace se autodestruye en 4 horas', '>🔒 El enlace se autodestruye en 4 horas'),
    
    # === COMPARTIR CALENDARIO (función JS) ===
    ("botonActivo.innerHTML = '? Generando enlace...'", "botonActivo.innerHTML = '⏳ Generando enlace...'"),
    ("""const textoCompartir = `?? CALENDARIO IGLESIA 2026\\n` +
            `?? ${tituloMes}\\n\\n` +
            `?? Ver calendario:\\n${enlace}`""",
     """const textoCompartir = `📅 CALENDARIO IGLESIA 2026\\n` +
            `📌 ${tituloMes}\\n\\n` +
            `👉 Ver calendario:\\n${enlace}`"""),
    
    ("botonActivo.innerHTML = '? ¡Enlace listo!'", "botonActivo.innerHTML = '✅ ¡Enlace listo!'"),
    ("btn.innerHTML = '?? Compartir Calendario'", "btn.innerHTML = '📤 Compartir Calendario'"),
    ("btnMes.innerHTML = '?? Compartir este mes'", "btnMes.innerHTML = '📤 Compartir este mes'"),
    
    ("""const mensajeWa = `?? *CALENDARIO IGLESIA 2026*\\n?? *${tituloMes.toUpperCase()}*\\n\\n?? Ver calendario:\\n${enlace}`""",
     """const mensajeWa = `📅 *CALENDARIO IGLESIA 2026*\\n📌 *${tituloMes.toUpperCase()}*\\n\\n👉 Ver calendario:\\n${enlace}`"""),
    
    ("botonActivo.innerHTML = '? Error. Intenta de nuevo'", "botonActivo.innerHTML = '❌ Error. Intenta de nuevo'"),
    
    # Banner enlace temporal
    (""">?? Enlace compartido""", """>⏰ Enlace compartido"""),
    
    # Enlace expirado
    ("""<div style="font-size:4rem;margin-bottom:20px;">?</div>""",
     """<div style="font-size:4rem;margin-bottom:20px;">⏱️</div>"""),
    
    # === CONTROL DE CULTOS ===
    ('font-weight:900;">\u2190 VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">CONTROL TOTAL DE CULTOS',
     'font-weight:900;">⬅️ VOLVER</button>\n                <div style="color:#fff;font-weight:900;letter-spacing:1px;font-size:calc(0.9rem * var(--font-scale, 1));">CONTROL TOTAL DE CULTOS'),
    
    # Registro icon
    ("""<span>??</span> REGISTRO DE PREDICACIÓN""",
     """<span>📝✨</span> REGISTRO DE PREDICACIÓN"""),
    
    # Guardar en historial
    ('>?? GUARDAR EN HISTORIAL</button>', '>💾 GUARDAR EN HISTORIAL</button>'),
    
    # Buscador
    ("""><span style="font-size:1.2rem;">??</span>""",
     """><span style="font-size:1.2rem;">🔍📋</span>"""),
    
    # Predicador en historial
    ('>?? Predicador: <b>${reg.predicador}</b></div>', '>🎤 Predicador: <b>${reg.predicador}</b></div>'),
    
    # Cita bíblica en historial
    ('>?? ${reg.cita}</span>', '>📖 ${reg.cita}</span>'),
    
    # Himnos en historial
    ('>?? ${reg.himnos}</span>', '>🎵 ${reg.himnos}</span>'),
    
    # === COMPARTIR SERMON IA ===
    ("let mensaje = `?? *${titulo}*\\n`", "let mensaje = `🎤 *${titulo}*\\n`"),
    ("mensaje += `???????????????\\n\\n`", "mensaje += `━━━━━━━━━━━━━━━\\n\\n`"),
    ("mensaje += `\\n\\n???????????????\\n`", "mensaje += `\\n\\n━━━━━━━━━━━━━━━\\n`"),
    ("mensaje += `_?? Generado por IA - Legado Bíblico (Eliteservic)_`",
     "mensaje += `_🤖 Generado por IA - Legado Bíblico (Eliteservic)_`"),
    
    # === 28 DOCTRINAS ===
    (""">?? 28 DOCTRINAS</div>""", """>✝️📜 28 DOCTRINAS</div>"""),
    
    # Referencias en doctrinas
    (""">?? ${d.ref}</span>""", """>📖 ${d.ref}</span>"""),
    
    # Leer más
    (""">LEER ?</span>""", """>LEER →</span>"""),
    
    # Panel doctrina cerrar
    ('border-radius:50%;cursor:pointer;font-size:1rem;">?</button>', 'border-radius:50%;cursor:pointer;font-size:1rem;">✕</button>'),
    
    # Detalle doctrina referencia
    ("'?? Referencias: ' + d.ref", "'📖 Referencias: ' + d.ref"),
    
    # === ICONOS DE DOCTRINAS (en el array IGLESIA_DOCTRINAS) ===
    # These need special handling - the icono field
]

# Apply all contextual replacements
for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)  # Replace first occurrence
    else:
        # Try with \r\n line endings
        old_crlf = old.replace('\n', '\r\n')
        if old_crlf in content:
            content = content.replace(old_crlf, new.replace('\n', '\r\n'), 1)

# === Fix doctrine icons ===
# The IGLESIA_DOCTRINAS array has icono fields with ?? patterns
doctrine_icons = {
    1: "📖", 2: "✨", 3: "👑", 4: "✝️", 5: "🕊️🔥",
    6: "🌍", 7: "🧬", 8: "⚔️", 9: "✝️", 10: "💝🔥",
    11: "🌱", 12: "⛪🌍", 13: "🏴", 14: "🤝", 15: "💧",
    16: "🍞", 17: "🎁", 18: "📜", 19: "📋", 20: "🕯️",
    21: "💰", 22: "🙏", 23: "💍👨‍👩‍👧‍👦", 24: "🏛️⚖️", 25: "☁️",
    26: "⏳", 27: "🔥", 28: "🌅"
}

for num, icon in doctrine_icons.items():
    # Replace the icono field in the IGLESIA_DOCTRINAS array
    # Pattern: icono: "??" or icono: "?" or icono: "???"
    pattern = f'num: {num}, cat: "'
    idx = content.find(pattern)
    if idx >= 0:
        # Find the icono field after this
        icono_start = content.find('icono: "', idx)
        if icono_start >= 0 and icono_start < idx + 300:
            icono_end = content.find('"', icono_start + 8)
            if icono_end >= 0:
                old_icon = content[icono_start:icono_end + 1]
                new_icon = f'icono: "{icon}"'
                content = content[:icono_start] + new_icon + content[icono_end + 1:]

# === Remaining generic ? → fix any isolated single ? that are clearly broken emojis ===
# Fix the VOLVER buttons that we may have missed
content = content.replace('">? VOLVER</button>', '">⬅️ VOLVER</button>')
content = content.replace('">? INICIO</button>', '">🏠 INICIO</button>')
content = content.replace('">? MESES</button>', '">⬅️ MESES</button>')
content = content.replace('">? MODULO</button>', '">⬅️ MODULO</button>')

# Fix menu documento buttons  
content = content.replace('">? VOLVER</button>', '">⬅️ VOLVER</button>')

# Fix "? Error" patterns
content = content.replace("'? Error al acceder", "'❌ Error al acceder")

# =====================================================
# AGREGAR BOTONES COMPARTIR/PDF A PROGRAMAS GUARDADOS
# =====================================================
# The cargarLiturgiasFormulario function needs sharing buttons

old_liturgia_card = """            <div style="grid-column:1/-1;background:rgba(162,155,254,0.1);padding:10px;border-radius:8px;margin-top:5px;border:1px solid rgba(162,155,254,0.3);">
                    <span style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));">Predicador Inivitado:</span><br>
                    <span style="font-size:calc(1.1rem * var(--font-scale, 1));font-weight:bold;">${reg.predicador}</span>
                </div>
            </div>
        </div>"""

new_liturgia_card = """            <div style="grid-column:1/-1;background:rgba(162,155,254,0.1);padding:10px;border-radius:8px;margin-top:5px;border:1px solid rgba(162,155,254,0.3);">
                    <span style="color:#a29bfe;font-size:calc(0.8rem * var(--font-scale, 1));">Predicador Invitado:</span><br>
                    <span style="font-size:calc(1.1rem * var(--font-scale, 1));font-weight:bold;">${reg.predicador}</span>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;">
                <button onclick="compartirLiturgiaTexto(${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(37,211,102,0.2),rgba(37,211,102,0.1));border:1px solid rgba(37,211,102,0.5);color:#25D366;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.8rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:6px;">
                    📤 Compartir
                </button>
                <button onclick="descargarLiturgiaPDF(${reg.id})" style="padding:10px;background:linear-gradient(135deg,rgba(162,155,254,0.2),rgba(162,155,254,0.1));border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;border-radius:10px;cursor:pointer;font-size:calc(0.8rem * var(--font-scale, 1));display:flex;align-items:center;justify-content:center;gap:6px;">
                    📄 Descargar PDF
                </button>
            </div>
        </div>"""

content = content.replace(old_liturgia_card, new_liturgia_card)
# Try CRLF version
content = content.replace(old_liturgia_card.replace('\n', '\r\n'), new_liturgia_card.replace('\n', '\r\n'))

# =====================================================
# AGREGAR FUNCIONES compartirLiturgiaTexto y descargarLiturgiaPDF
# =====================================================

sharing_functions = """

// ===============================================
// COMPARTIR Y DESCARGAR PDF DE LITURGIA
// ===============================================

function compartirLiturgiaTexto(id) {
    const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const reg = registros.find(r => r.id === id);
    if (!reg) return;

    const fechaFormateada = reg.fecha.split('-').reverse().join('/');
    
    // Obtener nombre de iglesia del localStorage o usar default
    const nombreIglesia = localStorage.getItem('legado_nombre_iglesia') || 'Nuestra Iglesia';
    
    const texto = `📋 *PROGRAMA DE CULTO*\\n` +
        `⛪ *${nombreIglesia}*\\n` +
        `📅 *${fechaFormateada}*\\n` +
        `━━━━━━━━━━━━━━━\\n\\n` +
        `👋 *Bienvenida:* ${reg.bienvenida}\\n` +
        `🎵 *Dir. Himnos:* ${reg.himnos}\\n` +
        `🙏 *Oración:* ${reg.oracion}\\n` +
        `👶 *Rincón Infantil:* ${reg.infantil}\\n` +
        `🧑 *Diácono Ofrenda:* ${reg.diacono}\\n` +
        `👩 *Diaconisa Ofrenda:* ${reg.diaconisa}\\n` +
        `🎤 *Canto Especial:* ${reg.canto}\\n` +
        `📖 *Cita Bíblica:* ${reg.lectura}\\n\\n` +
        `━━━━━━━━━━━━━━━\\n` +
        `🎤 *PREDICADOR INVITADO:*\\n` +
        `✨ *${reg.predicador}*\\n\\n` +
        `_Generado por Legado Bíblico_`;

    if (navigator.share) {
        navigator.share({
            title: 'Programa de Culto - ' + fechaFormateada,
            text: texto
        }).catch(() => {});
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
}

function descargarLiturgiaPDF(id) {
    const registros = JSON.parse(localStorage.getItem('legado_liturgias') || '[]');
    const reg = registros.find(r => r.id === id);
    if (!reg) return;

    const fechaFormateada = reg.fecha.split('-').reverse().join('/');
    const nombreIglesia = localStorage.getItem('legado_nombre_iglesia') || 'Nuestra Iglesia';

    // Cargar jsPDF desde CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const margenIzq = 20;
        let y = 25;
        
        // Header
        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, 210, 45, 'F');
        
        doc.setTextColor(253, 203, 110);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('PROGRAMA DE CULTO', 105, 18, { align: 'center' });
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text(nombreIglesia, 105, 28, { align: 'center' });
        
        doc.setTextColor(162, 155, 254);
        doc.setFontSize(11);
        doc.text('Fecha: ' + fechaFormateada, 105, 36, { align: 'center' });
        
        y = 55;
        
        // Línea decorativa
        doc.setDrawColor(162, 155, 254);
        doc.setLineWidth(0.5);
        doc.line(margenIzq, y, 190, y);
        y += 12;
        
        // Campos del programa
        const campos = [
            ['Bienvenida / Inicio', reg.bienvenida],
            ['Director de Himnos', reg.himnos],
            ['Oracion Intercesora', reg.oracion],
            ['Rincon Infantil', reg.infantil],
            ['Diacono (Ofrenda)', reg.diacono],
            ['Diaconisa (Ofrenda)', reg.diaconisa],
            ['Musica Especial', reg.canto],
            ['Lectura Biblica', reg.lectura]
        ];
        
        campos.forEach(function(campo) {
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 140);
            doc.setFont('helvetica', 'normal');
            doc.text(campo[0].toUpperCase(), margenIzq, y);
            
            doc.setFontSize(12);
            doc.setTextColor(40, 40, 60);
            doc.setFont('helvetica', 'bold');
            doc.text(campo[1] || '-', margenIzq, y + 6);
            
            doc.setDrawColor(230, 230, 240);
            doc.setLineWidth(0.2);
            doc.line(margenIzq, y + 10, 190, y + 10);
            
            y += 16;
        });
        
        y += 5;
        
        // Predicador destacado
        doc.setFillColor(240, 237, 255);
        doc.roundedRect(margenIzq - 5, y - 5, 175, 25, 3, 3, 'F');
        doc.setDrawColor(162, 155, 254);
        doc.setLineWidth(0.5);
        doc.roundedRect(margenIzq - 5, y - 5, 175, 25, 3, 3, 'S');
        
        doc.setFontSize(9);
        doc.setTextColor(120, 100, 200);
        doc.setFont('helvetica', 'normal');
        doc.text('PREDICADOR INVITADO', margenIzq, y + 3);
        
        doc.setFontSize(14);
        doc.setTextColor(60, 40, 120);
        doc.setFont('helvetica', 'bold');
        doc.text(reg.predicador || '-', margenIzq, y + 14);
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 190);
        doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico - Eliteservic', 105, 280, { align: 'center' });
        
        // Descargar
        doc.save('Programa_Culto_' + reg.fecha + '.pdf');
        
        if (typeof mostrarToast === 'function') mostrarToast('PDF descargado!');
    };
    script.onerror = function() {
        alert('Error cargando la libreria PDF. Verifica tu conexion a internet.');
    };
    
    // Check if jsPDF is already loaded
    if (window.jspdf) {
        script.onload();
    } else {
        document.head.appendChild(script);
    }
}
"""

# Add the sharing functions before the last closing bracket area
# Insert them after cerrarDoctrinaPanel function
insert_marker = "function cerrarDoctrinaPanel(event, forzar) {"
insert_idx = content.find(insert_marker)
if insert_idx >= 0:
    # Find the end of this function
    end_of_func = content.find("\n}", insert_idx)
    if end_of_func >= 0:
        insert_point = end_of_func + 2
        content = content[:insert_point] + sharing_functions + content[insert_point:]

# =====================================================
# WRITE THE FIXED FILE
# =====================================================
with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Archivo corregido exitosamente!")
print("  - Emojis restaurados")
print("  - Botones de Compartir y PDF agregados a programas guardados")
print("  - Funciones compartirLiturgiaTexto() y descargarLiturgiaPDF() agregadas")
