// ================================================================
// HERRAMIENTAS AVANZADAS - REGISTRO DE CULTOS
// PDF por Período + Estadísticas por Participante
// ================================================================

window.inicializarHerramientasExtra = function() {
    if (document.getElementById('panel-herramientas-culto')) return;
    var contenedor = document.getElementById('pantalla-estudio');
    if (!contenedor) return;
    var historialDiv = contenedor.querySelector('[style*="border-radius:18px"][style*="padding:18px"]');
    if (!historialDiv) return;

    var panel = document.createElement('div');
    panel.id = 'panel-herramientas-culto';
    panel.style.cssText = 'display:grid;gap:12px;margin-bottom:18px;';
    panel.innerHTML = [
        // ---------- BÚSQUEDA GLOBAL ----------
        '<div style="background:rgba(255,159,67,0.05);border:1px solid rgba(255,159,67,0.2);border-radius:16px;padding:16px;">',
          '<div style="color:#ff9f43;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">🔍 BÚSQUEDA RÁPIDA</div>',
          '<input type="text" id="input-busqueda-global" placeholder="Ej: Santa Cena, 2026-03-21, Bautismo..." oninput="ejecutarBusquedaGlobal(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,159,67,0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;margin-bottom:10px;">',
          '<div id="resultados-busqueda-global"></div>',
        '</div>',
        // ---------- PDF POR PERÍODO ----------
        '<div style="background:rgba(85,239,196,0.05);border:1px solid rgba(85,239,196,0.2);border-radius:16px;padding:16px;">',
          '<div style="color:#55efc4;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">📄 IMPRIMIR POR PERÍODO</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">',
            '<button onclick="generarPDFCultosPeriodo(\'semana\')" style="padding:10px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">📄 Esta<br>Semana</button>',
            '<button onclick="generarPDFCultosPeriodo(\'mes\')" style="padding:10px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">📄 Este<br>Mes</button>',
            '<button onclick="generarPDFCultosPeriodo(\'anio\')" style="padding:10px 4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);color:#55efc4;border-radius:10px;cursor:pointer;font-weight:900;font-size:0.65rem;">📄 Este<br>Año</button>',
          '</div>',
          '<div style="display:flex;gap:8px;align-items:center;">',
            '<input type="month" id="pdf-mes-especifico" style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1px solid rgba(85,239,196,0.2);color:#fff;border-radius:8px;outline:none;font-size:0.8rem;">',
            '<button onclick="generarPDFCultosPeriodo(\'mes-especifico\')" style="padding:9px 14px;background:rgba(85,239,196,0.12);border:1px solid rgba(85,239,196,0.35);color:#55efc4;border-radius:8px;cursor:pointer;font-weight:900;font-size:0.7rem;white-space:nowrap;">📄 Imprimir mes</button>',
          '</div>',
        '</div>',
        // ---------- ESTADÍSTICAS POR PARTICIPANTE ----------
        '<div style="background:rgba(162,155,254,0.05);border:1px solid rgba(162,155,254,0.2);border-radius:16px;padding:16px;">',
          '<div style="color:#a29bfe;font-weight:900;font-size:0.75rem;letter-spacing:1.5px;margin-bottom:12px;">📊 PARTICIPACIÓN POR PERSONA</div>',
          '<select id="select-participante" onchange="mostrarEstadisticasParticipante(this.value)" style="width:100%;padding:11px;background:rgba(0,0,0,0.4);border:1px solid rgba(162,155,254,0.3);color:#fff;border-radius:10px;outline:none;font-size:0.85rem;margin-bottom:10px;">',
            '<option value="">— Elegir participante —</option>',
          '</select>',
          '<div id="stats-participante"></div>',
        '</div>'
    ].join('');

    historialDiv.parentElement.insertBefore(panel, historialDiv);
    actualizarListaParticipantes();
};

// ---- Campos rastreados para estadísticas ----
var _CAMPOS_PARTICIPACION = [
    { campo: 'anciano',       label: '🧓 Anciano de turno' },
    { campo: 'bienvenida',    label: '🤝 Bienvenida' },
    { campo: 'oracion1',      label: '🙏 Primera Oración' },
    { campo: 'himno1_quien',  label: '🎵 Anuncia Himno Apertura' },
    { campo: 'lectura_quien', label: '📖 Lector Bíblico' },
    { campo: 'especial',      label: '⭐ Parte Especial' },
    { campo: 'intercesora',   label: '🙏 Oración Intercesora' },
    { campo: 'pred_anuncia',  label: '🎤 Presenta al Predicador' },
    { campo: 'predicador',    label: '🎙️ Predicador/a' },
    { campo: 'himno2_quien',  label: '🎵 Anuncia Himno Final' },
    { campo: 'oracion_final', label: '🙏 Oración Final' },
    { campo: 'sonido',        label: '🎛️ Sonido' }
];

window.actualizarListaParticipantes = function() {
    var historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    var nombres = {};
    historial.forEach(function(reg) {
        _CAMPOS_PARTICIPACION.forEach(function(c) {
            var val = (reg[c.campo] || '').trim();
            if (val && val !== '-') {
                val.split(/[,;\/]/).forEach(function(n) {
                    var nombre = n.trim();
                    if (nombre.length > 1) nombres[nombre.toLowerCase()] = nombre;
                });
            }
        });
    });
    var lista = Object.values(nombres).sort(function(a,b){ return a.localeCompare(b); });
    var sel = document.getElementById('select-participante');
    if (!sel) return;
    sel.innerHTML = '<option value="">— Elegir participante (' + lista.length + ' personas) —</option>' +
        lista.map(function(n){ return '<option value="' + n + '">' + n + '</option>'; }).join('');
};

window.mostrarEstadisticasParticipante = function(nombre) {
    var div = document.getElementById('stats-participante');
    if (!div || !nombre) { if(div) div.innerHTML=''; return; }
    var historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    var nombreLow = nombre.toLowerCase();
    var stats = {};
    var totalParticipaciones = 0;
    _CAMPOS_PARTICIPACION.forEach(function(c){ stats[c.campo] = []; });

    historial.forEach(function(reg) {
        _CAMPOS_PARTICIPACION.forEach(function(c) {
            var val = (reg[c.campo] || '').trim();
            if (val && val.toLowerCase().includes(nombreLow)) {
                stats[c.campo].push(reg.fecha);
                totalParticipaciones++;
            }
        });
    });

    var html = '<div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:14px;">' +
        '<div style="color:#fff;font-weight:900;font-size:1rem;margin-bottom:4px;">' + nombre + '</div>' +
        '<div style="color:rgba(255,255,255,0.4);font-size:0.7rem;margin-bottom:14px;">' + totalParticipaciones + ' participaciones en total</div>';

    if (totalParticipaciones === 0) {
        html += '<div style="color:rgba(255,255,255,0.3);text-align:center;padding:20px;">Sin participaciones registradas</div>';
    } else {
        _CAMPOS_PARTICIPACION.forEach(function(c) {
            if (stats[c.campo].length === 0) return;
            var fechas = stats[c.campo].map(function(f){
                return f ? f.split('-').reverse().join('/') : '?';
            }).join(', ');
            html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);gap:10px;">' +
                '<div>' +
                  '<div style="color:rgba(255,255,255,0.7);font-size:0.78rem;font-weight:700;">' + c.label + '</div>' +
                  '<div style="color:rgba(255,255,255,0.3);font-size:0.62rem;margin-top:2px;">' + fechas + '</div>' +
                '</div>' +
                '<div style="background:rgba(162,155,254,0.2);border:1px solid rgba(162,155,254,0.4);color:#a29bfe;font-weight:900;font-size:0.9rem;padding:4px 12px;border-radius:20px;white-space:nowrap;flex-shrink:0;">' + stats[c.campo].length + 'x</div>' +
            '</div>';
        });
    }

    html += '</div>';
    div.innerHTML = html;
};

// ---- PDF POR PERÍODO ----
window.generarPDFCultosPeriodo = function(tipo) {
    var historial = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    var hoy = new Date();
    var filtrados = [];
    var titulo = '';

    if (tipo === 'semana') {
        var lunes = new Date(hoy); lunes.setDate(hoy.getDate() - hoy.getDay() + 1);
        var domingo = new Date(lunes); domingo.setDate(lunes.getDate() + 6);
        filtrados = historial.filter(function(r){ var d = new Date(r.fecha+'T12:00:00Z'); return d >= lunes && d <= domingo; });
        titulo = 'Semana del ' + lunes.toLocaleDateString('es-ES') + ' al ' + domingo.toLocaleDateString('es-ES');
    } else if (tipo === 'mes') {
        filtrados = historial.filter(function(r){ return r.fecha && r.fecha.startsWith(hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).padStart(2,'0'))); });
        titulo = 'Mes de ' + hoy.toLocaleDateString('es-ES',{month:'long',year:'numeric'}).toUpperCase();
    } else if (tipo === 'anio') {
        filtrados = historial.filter(function(r){ return r.fecha && r.fecha.startsWith(''+hoy.getFullYear()); });
        titulo = 'Año ' + hoy.getFullYear();
    } else if (tipo === 'mes-especifico') {
        var mesEl = document.getElementById('pdf-mes-especifico');
        var mes = mesEl ? mesEl.value : '';
        if (!mes) { if(typeof mostrarToast==='function') mostrarToast('⚠️ Elige un mes primero'); return; }
        filtrados = historial.filter(function(r){ return r.fecha && r.fecha.startsWith(mes); });
        var d = new Date(mes+'-01T12:00:00Z');
        titulo = 'Mes de ' + d.toLocaleDateString('es-ES',{month:'long',year:'numeric'}).toUpperCase();
    }

    if (filtrados.length === 0) { if(typeof mostrarToast==='function') mostrarToast('Sin cultos en ese período'); return; }
    if(typeof mostrarToast==='function') mostrarToast('Generando PDF...');

    function buildPDF() {
        var jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
        var doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        var pw = 210; var ph = 297; var mx = 14; var my = 14; var y = my;

        // Encabezado
        doc.setFillColor(10,8,24); doc.rect(0,0,pw,ph,'F');
        doc.setFontSize(13); doc.setTextColor(253,203,110); doc.setFont('helvetica','bold');
        doc.text('IGLESIA ADVENTISTA CYPRESS HILLS', pw/2, y, {align:'center'}); y += 7;
        doc.setFontSize(9); doc.setTextColor(180,170,220);
        doc.text('REGISTRO DE CULTOS — ' + titulo, pw/2, y, {align:'center'}); y += 5;
        doc.setDrawColor(253,203,110); doc.setLineWidth(0.4); doc.line(mx, y, pw-mx, y); y += 6;

        var etiquetas = {
            anciano: 'Anciano', bienvenida: 'Bienvenida', oracion1: 'Primera Oración',
            himno1_quien: 'Anuncia Himno', himno1: 'Himno Apertura',
            lectura: 'Lectura Bíblica', lectura_quien: 'Lector',
            especial: 'Parte Especial', intercesora: 'Oración Intercesora',
            pred_anuncia: 'Presenta Predicador', predicador: 'Predicador',
            pred_tema: 'Tema', himno2: 'Himno Final', himno2_quien: 'Anuncia H.Final',
            oracion_final: 'Oración Final', sonido: 'Sonido'
        };

        filtrados.sort(function(a,b){return new Date(a.fecha)-new Date(b.fecha);}).forEach(function(reg) {
            if (y > ph - 40) { doc.addPage(); doc.setFillColor(10,8,24); doc.rect(0,0,pw,ph,'F'); y = my; }
            var fechaStr = reg.fecha ? reg.fecha.split('-').reverse().join('/') : '??';
            doc.setFontSize(9); doc.setTextColor(162,155,254); doc.setFont('helvetica','bold');
            doc.text('⛪ CULTO DEL ' + fechaStr + ' — ' + (reg.tipo||'').toUpperCase(), mx, y); y += 5;
            doc.setDrawColor(100,92,200); doc.setLineWidth(0.2); doc.line(mx, y, pw-mx, y); y += 4;

            Object.keys(etiquetas).forEach(function(k) {
                var val = reg[k];
                if (!val || val === '-' || val.trim() === '') return;
                if (k === 'himno1' && reg.himno1_titulo) val = val + ' — ' + reg.himno1_titulo;
                if (k === 'himno2' && reg.himno2_titulo) val = val + ' — ' + reg.himno2_titulo;
                if (y > ph - 15) { doc.addPage(); doc.setFillColor(10,8,24); doc.rect(0,0,pw,ph,'F'); y = my; }
                doc.setFontSize(7.5); doc.setTextColor(160,180,200); doc.setFont('helvetica','normal');
                doc.text(etiquetas[k] + ':', mx+2, y);
                doc.setTextColor(240,240,255); doc.setFont('helvetica','bold');
                var lines = doc.splitTextToSize(val, pw - mx - 55);
                doc.text(lines, 55, y); y += Math.max(4.5, lines.length * 4.5);
            });
            y += 5;
            doc.setDrawColor(50,50,80); doc.setLineWidth(0.1); doc.line(mx, y-2, pw-mx, y-2);
        });

        // Pie
        doc.setFontSize(7); doc.setTextColor(80,80,100); doc.setFont('helvetica','normal');
        doc.text('Generado por Legado Bíblico — ' + new Date().toLocaleDateString('es-ES'), pw/2, ph-8, {align:'center'});

        var fileName = 'CultosRegistro_' + tipo.replace('mes-especifico','Mes') + '_' + new Date().toISOString().slice(0,10) + '.pdf';
        var pdfBlob = doc.output('blob');
        var file = new File([pdfBlob], fileName, {type:'application/pdf'});
        if (navigator.canShare && navigator.canShare({files:[file]})) {
            navigator.share({title:titulo, files:[file]}).catch(function(){
                var a=document.createElement('a'); a.href=URL.createObjectURL(pdfBlob); a.download=fileName; a.click();
            });
        } else {
            var a=document.createElement('a'); a.href=URL.createObjectURL(pdfBlob); a.download=fileName; a.click();
        }
        if(typeof mostrarToast==='function') mostrarToast('✅ PDF listo — ' + filtrados.length + ' cultos');
    }

    if (window.jspdf || window.jsPDF) {
        buildPDF();
    } else {
        var sc = document.createElement('script');
        sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        sc.onload = buildPDF;
        sc.onerror = function(){ if(typeof mostrarToast==='function') mostrarToast('Error cargando librería PDF'); };
        document.head.appendChild(sc);
    }
};

window.ejecutarBusquedaGlobal = function(termino) {
    try {
        var resDiv = document.getElementById('resultados-busqueda-global');
        if (!resDiv) return;
        
        var term = (termino || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (term.length < 2) {
            resDiv.innerHTML = '';
            return;
        }
        
        var cultos = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
        var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
        
        var matches = [];
        
        // Buscar en Eventos
        eventos.forEach(function(e) {
            var str = ((e.tipo||'') + ' ' + (e.titulo||'') + ' ' + (e.fechaInicio || '')).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (str.includes(term)) {
                matches.push({ type: 'evento', data: e, date: new Date(e.creadoEn || e.fechaInicio || Date.now()) });
            }
        });
        
        // Buscar en Cultos
        cultos.forEach(function(c) {
            var str = ((c.tipo||'') + ' ' + (c.fecha||'') + ' ' + (c.predicador || '') + ' ' + (c.tema || '')).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (str.includes(term)) {
                matches.push({ type: 'culto', data: c, date: new Date(c.fecha || Date.now()) });
            }
        });
        
        matches.sort(function(a,b){ return b.date - a.date; });
        
        if (matches.length === 0) {
            resDiv.innerHTML = '<div style="color:rgba(255,255,255,0.4);font-size:0.75rem;padding:10px;text-align:center;">No se encontraron resultados para "'+termino+'"</div>';
            return;
        }
        
        var html = '<div style="display:grid;gap:8px;max-height:300px;overflow-y:auto;padding-right:4px;">';
        matches.forEach(function(m) {
            if (m.type === 'evento') {
                html += '<div onclick="cambiarTabCulto(\'eventos\'); if(typeof cambiarSubTabEvento === \'function\') cambiarSubTabEvento(\'lista\'); setTimeout(()=>window.location.hash=\'evt-\'+'+m.data.id+', 500);" style="background:linear-gradient(135deg,rgba(253,203,110,0.1),rgba(253,203,110,0.05));border:1px solid rgba(253,203,110,0.3);padding:12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:10px;animation:fadeIn 0.3s ease;">' +
                       '<span style="font-size:1.6rem;">' + (m.data.emoji || '⭐') + '</span>' +
                       '<div style="flex:1;"><div style="color:#fdcb6e;font-weight:900;font-size:0.8rem;margin-bottom:2px;">' + (m.data.titulo || 'Evento').toUpperCase() + '</div>' +
                       '<div style="color:rgba(255,255,255,0.4);font-size:0.65rem;">' + (m.data.fechaInicio ? m.data.fechaInicio.split('-').reverse().join('/') : '') + '</div></div>' +
                       '<div style="color:rgba(253,203,110,0.4);font-size:1.2rem;font-weight:900;">›</div>' +
                       '</div>';
            } else {
                html += '<div onclick="cambiarTabCulto(\'cultos\'); document.getElementById(\'search-culto\').value=\''+m.data.fecha+'\'; cargarCultosSemana();" style="background:linear-gradient(135deg,rgba(85,239,196,0.08),rgba(85,239,196,0.02));border:1px solid rgba(85,239,196,0.3);padding:12px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:10px;animation:fadeIn 0.3s ease;">' +
                       '<span style="font-size:1.6rem;">⛪</span>' +
                       '<div style="flex:1;"><div style="color:#55efc4;font-weight:900;font-size:0.8rem;margin-bottom:2px;">CULTO DE ' + (m.data.tipo || '').toUpperCase() + '</div>' +
                       '<div style="color:rgba(255,255,255,0.4);font-size:0.65rem;">' + (m.data.fecha ? m.data.fecha.split('-').reverse().join('/') : '') + '</div></div>' +
                       '<div style="color:rgba(85,239,196,0.4);font-size:1.2rem;font-weight:900;">›</div>' +
                       '</div>';
            }
        });
        html += '</div>';
        
        resDiv.innerHTML = html;
    } catch(err) {
        console.error("Error en busqueda global:", err);
    }
};
