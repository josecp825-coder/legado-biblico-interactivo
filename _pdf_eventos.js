// ================================================================
// PDF + PLANTILLA IMAGEN - MODULO EVENTOS ESPECIALES v255
// Autor: Antigravity / Cypress Hills Adventist Church
// ================================================================

// ================================================================
// 10 PLANTILLAS VISUALES DISPONIBLES
// ================================================================
var PLANTILLAS_CANVAS = [
    { id: 'esmeralda',  nombre: 'Esmeralda',    emoji: '💚', color: '#00b894' },
    { id: 'zafiro',     nombre: 'Zafiro',        emoji: '💙', color: '#74b9ff' },
    { id: 'purpura',    nombre: 'Púrpura Real',  emoji: '💜', color: '#a29bfe' },
    { id: 'dorado',     nombre: 'Dorado',        emoji: '✨', color: '#fdcb6e' },
    { id: 'rojo',       nombre: 'Rojo Pasión',   emoji: '❤️', color: '#ff6b6b' },
    { id: 'celestial',  nombre: 'Celestial',     emoji: '🌌', color: '#6c5ce7' },
    { id: 'coral',      nombre: 'Coral',         emoji: '🌸', color: '#fd79a8' },
    { id: 'aguamarina', nombre: 'Aguamarina',    emoji: '🩵', color: '#00cec9' },
    { id: 'fuego',      nombre: 'Fuego Sagrado', emoji: '🔥', color: '#e17055' },
    { id: 'bosque',     nombre: 'Bosque Vivo',   emoji: '🌿', color: '#55efc4' }
];

// ================================================================
// SELECTOR COMBINADO: Días + Plantilla en un solo modal
// ================================================================
window.abrirSelectorPlantilla = function(eventoId) {
    // Sincronizar datos de memoria antes de leer
    if (window._diasEvento && typeof _guardarDatosFormDia === 'function') {
        _guardarDatosFormDia(window._eventoEditorDiaActivo);
        if (typeof _autoGuardarEventoEnMemoria === 'function') _autoGuardarEventoEnMemoria();
    }

    var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    var ev = eventos.find(function(e) { return e.id === eventoId; });
    if (!ev || !ev.dias) return;

    var colorEv = ev.color || '#74b9ff';
    var rgbEv = (function(hex) {
        var h = hex.replace('#','');
        return parseInt(h.slice(0,2),16)+','+parseInt(h.slice(2,4),16)+','+parseInt(h.slice(4,6),16);
    })(colorEv);

    var old = document.getElementById('evt-plantilla-selector');
    if (old) old.remove();

    // Respetar preselección del editor (_exportDiasChecked o _diaSelElegir)
    var diasInicialesChecked;
    if (window._exportDiasChecked && window._exportDiasChecked.length === ev.dias.length) {
        // Viene del editor: usar la selección del editor
        diasInicialesChecked = window._exportDiasChecked.slice();
    } else if (window._diaSelElegir) {
        // Viene con preselección parcial
        diasInicialesChecked = new Array(ev.dias.length).fill(false);
        window._diaSelElegir.forEach(function(i) { diasInicialesChecked[i] = true; });
        window._diaSelElegir = null;
    } else {
        diasInicialesChecked = new Array(ev.dias.length).fill(true);
    }

    // Estado interno
    window._psState = {
        eventoId: eventoId,
        diasChecked: diasInicialesChecked,
        plantillaIdx: 0,
        total: ev.dias.length
    };


    // HTML de días
    var diasHtml = ev.dias.map(function(dia, i) {
        var col = (typeof COLORES_DIA !== 'undefined') ? COLORES_DIA[dia.diaSemana] : {hex:'#74b9ff',rgb:'116,185,255',nombre:''};
        var f = (typeof _fechaCorta === 'function') ? _fechaCorta(dia.fecha) : dia.fecha;
        var tieneDatos = dia.datos && Object.keys(dia.datos).some(function(k){ return k !== 'anciano_tipo' && !!dia.datos[k]; });
        return '<span id="ps-dia-'+i+'" onclick="_psDiaToggle('+i+',\''+col.rgb+'\')" '
            + 'style="display:inline-flex;align-items:center;gap:4px;padding:6px 10px;'
            + 'background:rgba('+col.rgb+',0.25);border:2px solid rgba('+col.rgb+',0.9);'
            + 'color:'+col.hex+';border-radius:10px;cursor:pointer;font-weight:900;font-size:0.68rem;margin:3px;position:relative;">'
            + '<span id="ps-ck-'+i+'" style="font-size:0.8rem;">✓</span> '+f
            + (tieneDatos ? '<span style="position:absolute;top:-5px;right:-3px;background:#2ed573;width:8px;height:8px;border-radius:50%;"></span>' : '')
            + '</span>';
    }).join('');

    // HTML de plantillas (2 filas × 5 cols)
    var plantillasHtml = PLANTILLAS_CANVAS.map(function(p, pi) {
        var isFirst = (pi === 0);
        return '<div id="ps-plt-'+pi+'" onclick="_psPlantillaSelect('+pi+')" '
            + 'style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:9px 4px;'
            + 'background:rgba(0,0,0,0.4);border:2px solid '+(isFirst ? p.color : 'rgba(255,255,255,0.1)')+';'
            + 'border-radius:12px;cursor:pointer;transition:all 0.15s;'
            + (isFirst ? 'box-shadow:0 0 14px '+p.color+'55;' : '') + '">'
            + '<div style="width:32px;height:32px;border-radius:50%;background:'+p.color+';box-shadow:0 2px 8px '+p.color+'66;"></div>'
            + '<div style="color:rgba(255,255,255,0.75);font-size:0.52rem;font-weight:700;text-align:center;line-height:1.3;">'
            +   p.emoji+'<br>'+p.nombre
            + '</div>'
            + '</div>';
    }).join('');

    var modal = document.createElement('div');
    modal.id = 'evt-plantilla-selector';
    modal.style.cssText = 'position:fixed;inset:0;z-index:10006;background:rgba(0,0,0,0.93);display:flex;align-items:flex-end;justify-content:center;';

    modal.innerHTML = '<div style="background:linear-gradient(180deg,#0d0b22,#05040f);border-radius:24px 24px 0 0;width:100%;max-width:500px;max-height:92vh;display:flex;flex-direction:column;border-top:2px solid '+colorEv+';">'
        // Header
        + '<div style="padding:14px 18px 10px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">'
        +   '<div>'
        +     '<div style="color:'+colorEv+';font-size:0.62rem;font-weight:900;letter-spacing:1.5px;">🖼️ GENERAR IMAGEN DEL EVENTO</div>'
        +     '<div style="color:#fff;font-weight:700;font-size:0.82rem;">'+ev.titulo+'</div>'
        +   '</div>'
        +   '<button onclick="document.getElementById(\'evt-plantilla-selector\').remove()" style="background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.5);padding:6px 10px;border-radius:8px;cursor:pointer;font-size:1rem;">✕</button>'
        + '</div>'
        // Contenido scrollable
        + '<div style="flex:1;overflow-y:auto;padding:12px 16px;">'
        // Sección: Días
        + '<div style="margin-bottom:14px;">'
        +   '<div style="color:rgba(255,255,255,0.5);font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">'
        +     '<span>📅 SELECCIONAR DÍAS (🟢 = con datos)</span>'
        +     '<span style="display:flex;gap:8px;">'
        +       '<span onclick="_psTodosToggle()" style="color:'+colorEv+';cursor:pointer;font-weight:900;font-size:0.68rem;">✅ Todos</span>'
        +       '<span onclick="_psNingunoToggle()" style="color:rgba(255,255,255,0.35);cursor:pointer;font-weight:900;font-size:0.68rem;">☐ Ninguno</span>'
        +     '</span>'
        +   '</div>'
        +   '<div style="line-height:2;">'+diasHtml+'</div>'
        + '</div>'
        // Sección: Plantillas
        + '<div>'
        +   '<div style="color:rgba(255,255,255,0.5);font-size:0.6rem;font-weight:900;letter-spacing:1px;margin-bottom:10px;">🎨 ELEGIR DISEÑO DE PLANTILLA</div>'
        +   '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px;">'+plantillasHtml+'</div>'
        + '</div>'
        + '</div>'
        // Botón generar
        + '<div style="padding:12px 16px;border-top:1px solid rgba(255,255,255,0.07);flex-shrink:0;">'
        +   '<div style="color:rgba(255,255,255,0.4);font-size:0.55rem;font-weight:700;letter-spacing:1px;margin-bottom:8px;text-align:center;">\uD83C\uDFA8 ELIGE FORMATO Y GENERA</div>'
        +   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">'
        +     '<button onclick="_psGenerar(' + eventoId + ',\'imagen\')" style="padding:14px;background:linear-gradient(135deg,' + colorEv + ',rgba(' + rgbEv + ',0.6));border:none;color:#000;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.85rem;">\uD83D\uDDBC\uFE0F IMAGEN</button>'
        +     '<button onclick="_psGenerar(' + eventoId + ',\'pdf\')" style="padding:14px;background:linear-gradient(135deg,rgba(116,185,255,0.35),rgba(116,185,255,0.15));border:1.5px solid rgba(116,185,255,0.6);color:#74b9ff;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.85rem;">\uD83D\uDCC4 PDF</button>'
        +   '</div>'
        + '</div>'
        + '</div>';


    document.body.appendChild(modal);
    modal.addEventListener('click', function(e){ if (e.target === modal) modal.remove(); });
};

// Toggle plantilla seleccionada
window._psPlantillaSelect = function(idx) {
    var prev = window._psState.plantillaIdx;
    var prevEl = document.getElementById('ps-plt-'+prev);
    var newEl  = document.getElementById('ps-plt-'+idx);
    var p = PLANTILLAS_CANVAS[idx];
    if (prevEl) { prevEl.style.border='2px solid rgba(255,255,255,0.1)'; prevEl.style.boxShadow='none'; }
    if (newEl)  { newEl.style.border='2px solid '+p.color; newEl.style.boxShadow='0 0 14px '+p.color+'55'; }
    window._psState.plantillaIdx = idx;
};

// Toggle día individual
window._psDiaToggle = function(idx, rgb) {
    window._psState.diasChecked[idx] = !window._psState.diasChecked[idx];
    var span = document.getElementById('ps-dia-'+idx);
    var ck   = document.getElementById('ps-ck-'+idx);
    var on   = window._psState.diasChecked[idx];
    if (ck)   ck.textContent = on ? '✓' : '';
    if (span) {
        span.style.background  = 'rgba('+rgb+','+(on?'0.25':'0.05')+')';
        span.style.border      = (on?'2px':'1px')+' solid rgba('+rgb+','+(on?'0.9':'0.2')+')';
        span.style.opacity     = on ? '1' : '0.45';
    }
};

// Siempre SELECCIONA TODOS (no hace toggle para evitar confusion)
window._psTodosToggle = function() {
    for (var i = 0; i < window._psState.total; i++) {
        if (!window._psState.diasChecked[i]) {
            _psDiaToggle(i, '116,185,255');
        }
    }
};

// Deseleccionar todos
window._psNingunoToggle = function() {
    for (var i = 0; i < window._psState.total; i++) {
        if (window._psState.diasChecked[i]) {
            _psDiaToggle(i, '116,185,255');
        }
    }
};

// Generar con los días y plantilla seleccionados
window._psGenerar = function(eventoId, tipo) {
    tipo = tipo || 'imagen';
    var sel = [];
    (window._psState.diasChecked || []).forEach(function(v, i){ if (v) sel.push(i); });
    if (sel.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Selecciona al menos un día');
        return;
    }
    var colorPlantilla = PLANTILLAS_CANVAS[window._psState.plantillaIdx || 0].color;
    document.getElementById('evt-plantilla-selector').remove();

    var esTotal = (sel.length === window._psState.total);

    if (tipo === 'pdf') {
        if (esTotal) {
            generarPlantillaEvento(eventoId, 'todos', colorPlantilla, true);
        } else {
            window._diaSelElegir = sel;
            generarPlantillaEvento(eventoId, 'seleccion', colorPlantilla, true);
        }
    } else {
        // IMAGEN → usa el color de la plantilla elegida
        if (esTotal) {
            generarPlantillaEvento(eventoId, 'todos', colorPlantilla, false);
        } else {
            window._diaSelElegir = sel;
            generarPlantillaEvento(eventoId, 'seleccion', colorPlantilla, false);
        }
    }
};

function _evtDatosDia(dia) {
    var d = dia.datos || {};
    var col = (typeof COLORES_DIA !== 'undefined') ? COLORES_DIA[dia.diaSemana] : { hex: '#74b9ff', nombre: '' };
    return { d: d, col: col };
}

window.abrirOpcionesExportEvento = function(eventoId) {
    if (typeof mostrarToast === 'function') mostrarToast('Usa los botones directos del evento');
};

window._evtSelAll = function(val) {
    document.querySelectorAll('[id^="evt-chk-dia-"]').forEach(function(chk) { chk.checked = val; });
};

function _evtGetDiasSeleccionados() {
    var chks = document.querySelectorAll('[id^="evt-chk-dia-"]:checked');
    if (chks.length > 0) {
        var sel = [];
        chks.forEach(function(chk) { sel.push(parseInt(chk.value)); });
        return sel;
    }
    if (window._diaSelElegir) {
        var r = window._diaSelElegir;
        window._diaSelElegir = null;
        return r;
    }
    return [0];
}


// ----------------------------------------------------------------
// GENERAR PDF DEL EVENTO (jsPDF)
// ----------------------------------------------------------------
window.generarPDFEvento = function(eventoId, modo) {
    var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    var ev = eventos.find(function(e) { return e.id === eventoId; });
    if (!ev) return;

    // ✅ Enriquecer días con datos del culto diario (igual que en imagen)
    var cultosSemanales = JSON.parse(localStorage.getItem('legado_cultos_semanales') || '[]');
    (ev.dias || []).forEach(function(dia) {
        var tieneDatos = dia.datos && Object.keys(dia.datos).some(function(k){ return k !== 'anciano_tipo' && !!dia.datos[k]; });
        if (!tieneDatos) {
            var c = cultosSemanales.find(function(x){ return x.fecha === dia.fecha; });
            if (c) {
                var h1 = c.himno1 ? ('#'+c.himno1+(c.himno1_titulo?' — '+c.himno1_titulo:'')) : '';
                var h2 = c.himno2 ? ('#'+c.himno2+(c.himno2_titulo?' — '+c.himno2_titulo:'')) : '';
                dia.datos = {
                    apertura: c.bienvenida||c.anciano||'', anuncia_himno: c.himno1_quien||'',
                    himno_apertura: h1, lectura_biblica: c.lectura_quien||'', cita: c.lectura||'',
                    musica_especial: c.especial||'', orador: c.predicador||'',
                    presenta_orador: c.pred_anuncia||'', tema: c.pred_tema||'',
                    presenta_himno_final: c.himno2_quien||'', himno_final: h2,
                    orador_oracion: c.oracion_final||'',
                    observaciones: c.sonido?('🎛️ Sonido: '+c.sonido):''
                };
            }
        }
    });

    var diasAExportar;
    if (modo === 'seleccion') {
        var idxSel = _evtGetDiasSeleccionados();
        diasAExportar = (ev.dias || []).filter(function(_, i) { return idxSel.includes(i); });
    } else {
        // Modo todos: SOLO días con datos
        diasAExportar = (ev.dias || []).filter(function(d) {
            return d.datos && Object.keys(d.datos).some(function(k){ return k !== 'anciano_tipo' && !!d.datos[k]; });
        });
    }
    if (diasAExportar.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay días con datos aún.');
        return;
    }
    if (typeof mostrarToast === 'function') mostrarToast('📄 Generando PDF con ' + diasAExportar.length + ' día(s)...');

    function hacerPDF() {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF('p', 'mm', 'letter');
        var W = 216, H = 279;
        var COLOR_EV = ev.color || '#74b9ff';

        function hexRgb(hex) {
            return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
        }
        var eRGB = hexRgb(COLOR_EV);
        var eR = eRGB[0], eG = eRGB[1], eB = eRGB[2];

        doc.setFillColor(15, 12, 35);
        doc.rect(0, 0, W, 48, 'F');
        doc.setFillColor(eR, eG, eB);
        doc.rect(0, 48, W, 1.8, 'F');
        doc.rect(W/2 - 0.8, 6, 1.6, 10, 'F');
        doc.rect(W/2 - 5, 9, 10, 1.6, 'F');

        doc.setTextColor(eR, eG, eB);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('IGLESIA ADVENTISTA DEL SEPTIMO DIA', W/2, 22, { align: 'center' });
        doc.setTextColor(200, 195, 240);
        doc.setFontSize(8);
        doc.text('CYPRESS HILLS - BROOKLYN, NY', W/2, 28, { align: 'center' });
        // Título: para Santa Cena quitar el año
        var tituloDisplay = ev.titulo;
        if (ev.tipo === 'santa_cena' || tituloDisplay.toLowerCase().indexOf('santa cena') !== -1) {
            tituloDisplay = tituloDisplay.replace(/\s*\d{4}\s*/g, '').trim();
        }
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.text(tituloDisplay.toUpperCase(), W/2, 38, { align: 'center' });

        // Fecha: para Santa Cena solo mostrar el Sábado
        var esSantaCena = ev.tipo === 'santa_cena' || ev.titulo.toLowerCase().indexOf('santa cena') !== -1;
        if (esSantaCena) {
            // Buscar el Sábado (diaSemana === 6)
            var diaScFecha = diasAExportar.find(function(d) { return d.diaSemana === 6; })
                || diasAExportar.find(function(d) { return d.diaSemana !== undefined; })
                || diasAExportar[0];
            if (diaScFecha) {
                var fechaSab = (typeof _fechaLarga === 'function') ? _fechaLarga(diaScFecha.fecha) : diaScFecha.fecha;
                doc.setTextColor(180, 175, 210);
                doc.setFontSize(8);
                doc.text(fechaSab.toUpperCase(), W/2, 44, { align: 'center' });
            }
        } else if (diasAExportar.length > 1) {
            var f1 = diasAExportar[0].fecha.split('-').reverse().join('/');
            var f2 = diasAExportar[diasAExportar.length-1].fecha.split('-').reverse().join('/');
            doc.setTextColor(180, 175, 210);
            doc.setFontSize(8);
            doc.text(f1 + ' al ' + f2, W/2, 44, { align: 'center' });
        }

        var y = 56, mx = 12;
        var colW = (W - mx * 2 - 6) / 2;

        diasAExportar.forEach(function(dia, di) {
            var d = dia.datos || {};
            var fechaStr = (typeof _fechaLarga === 'function') ? _fechaLarga(dia.fecha) : dia.fecha;
            var alturaEstimada = 14 + Object.keys(d).filter(function(k) { return d[k]; }).length * 10 + 10;
            if (y + alturaEstimada > H - 20 && di > 0) {
                doc.addPage();
                doc.setFillColor(15, 12, 35);
                doc.rect(0, 0, W, 14, 'F');
                doc.setTextColor(eR, eG, eB);
                doc.setFontSize(7);
                doc.setFont('helvetica', 'bold');
                doc.text(ev.titulo.toUpperCase(), W/2, 9, { align: 'center' });
                y = 20;
            }

            doc.setFillColor(30, 25, 60);
            doc.roundedRect(mx, y, W - mx*2, 9, 2, 2, 'F');
            doc.setDrawColor(eR, eG, eB);
            doc.setLineWidth(0.5);
            doc.roundedRect(mx, y, W - mx*2, 9, 2, 2, 'S');
            doc.setTextColor(eR, eG, eB);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text(fechaStr.toUpperCase(), W/2, y + 6, { align: 'center' });
            y += 12;

            var filas = [];
            // ── Detectar tipo de evento ──
            var esSantaCena = (ev.tipo === 'santa_cena')
                || (ev.titulo && ev.titulo.toLowerCase().indexOf('santa cena') !== -1);
            var esSabado    = (dia.diaSemana === 6);

            if (esSantaCena && esSabado) {
                // ═══ PRIMERA PARTE: CULTO DIVINO ═══
                filas.push(['━━━ PRIMERA PARTE: CULTO DIVINO ━━━', '', 'seccion']);
                if (d.anciano_tipo || d.anciano) filas.push(['ANCIANO(S) DE TURNO', (d.anciano_tipo||'') + (d.anciano?' — '+d.anciano:''), true]);
                if (d.ev_llamado)    filas.push(['0. LLAMADO A LA ADORACION', d.ev_llamado, false]);
                if (d.ev_doxologia)  filas.push(['1. DOXOLOGIA',              '#'+d.ev_doxologia+(d['titulo_ev_doxologia']?' - '+d['titulo_ev_doxologia']:''), false]);
                if (d.ev_invocacion) filas.push(['2. INVOCACION',             d.ev_invocacion, false]);
                if (d.ev_bienvenida) filas.push(['3. BIENVENIDA',             d.ev_bienvenida, false]);
                if (d.infantil||d.infantil_anuncia) filas.push(['4. RINCON INFANTIL', (d.infantil_anuncia?d.infantil_anuncia+' / ':'')+(d.infantil||''), false]);
                if (d.ev_ofrendas)   filas.push(['5. DIEZMOS Y OFRENDAS',    d.ev_ofrendas, false]);
                function _tH(n) { var num=parseInt(String(n||'').replace('#','')); return (typeof HIMNARIO_ADVENTISTA!=='undefined'&&HIMNARIO_ADVENTISTA[num])||''; }
                if (d.ev_himno_anuncia||d.ev_himno_adoracion) { var _tHA=d['titulo_ev_himno_adoracion']||_tH(d.ev_himno_adoracion); filas.push(['6. HIMNO DE ADORACION', (d.ev_himno_anuncia?d.ev_himno_anuncia+' — ':'')+'#'+(d.ev_himno_adoracion||'')+(_tHA?' — '+_tHA:''), false]); }
                if (d.ev_lectura_quien||d.ev_lectura_cita) filas.push(['7. LECTURA BIBLICA', (d.ev_lectura_quien?d.ev_lectura_quien+' — ':'')+( d.ev_lectura_cita||''), false]);
                if (d.ev_oracion_intercesora) filas.push(['8. ORACION INTERCESORA', d.ev_oracion_intercesora, false]);
                if (d.ev_musica_especial)     filas.push(['9. MUSICA ESPECIAL',     d.ev_musica_especial, false]);
                var predStr = [d.ev_pred_anuncia, d.ev_predicador, d.ev_tema ? '"'+d.ev_tema+'"' : ''].filter(Boolean).join(' / ');
                if (predStr) filas.push(['10. PREDICADOR', predStr, true]);
                if (d.ev_himno_final_quien||d.ev_himno_final) { var _tHF=d['titulo_ev_himno_final']||_tH(d.ev_himno_final); filas.push(['11. HIMNO FINAL', (d.ev_himno_final_quien?d.ev_himno_final_quien+' — ':'')+'#'+(d.ev_himno_final||'')+(_tHF?' — '+_tHF:''), false]); }
                if (d.ev_oracion_final) filas.push(['12. ORACION FINAL',  d.ev_oracion_final, false]);
                if (d.ev_sonido)        filas.push(['ENCARGADO DE SONIDO', d.ev_sonido, false]);
                if (d.observaciones)    filas.push(['OBSERVACIONES',       d.observaciones, false]);

                // ═══ SEGUNDA PARTE: SANTA CENA ═══
                filas.push(['━━━ SEGUNDA PARTE: SANTA CENA ━━━', '', 'seccion']);
                // Diáconos
                var diaconos = [];
                for (var ri = 1; ri <= 6; ri++) { var fn = d['sc_diacono_'+ri+'_nombre']; var ff = d['sc_diacono_'+ri+'_funcion']; if (fn||ff) diaconos.push((fn||'?') + (ff?' — '+ff:'')); }
                if (diaconos.length) filas.push(['DIACONOS OFICIALES', diaconos.join('  |  '), false]);
                // Diaconizas
                var diaconizas = [];
                for (var ri = 1; ri <= 6; ri++) { var fn = d['sc_diaconiza_'+ri+'_nombre']; var ff = d['sc_diaconiza_'+ri+'_funcion']; if (fn||ff) diaconizas.push((fn||'?') + (ff?' — '+ff:'')); }
                if (diaconizas.length) filas.push(['DIACONIZAS',         diaconizas.join('  |  '), false]);
                if (d.sc_lectura_pan)  filas.push(['LECTURA POR EL PAN',  d.sc_lectura_pan, false]);
                if (d.sc_oracion_pan)  filas.push(['ORACION POR EL PAN',  d.sc_oracion_pan, false]);
                if (d.sc_lectura_vino) filas.push(['LECTURA POR EL VINO', d.sc_lectura_vino, false]);
                if (d.sc_oracion_vino) filas.push(['ORACION POR EL VINO', d.sc_oracion_vino, false]);
                if (d.sc_ordenador)    filas.push(['ORADOR / PREDICADOR',  d.sc_ordenador, true]);
                if (d.sc_oracion_final) filas.push(['ORACION FINAL',  d.sc_oracion_final, false]);
            } else {
                // ── Evento genérico (semana) ──
                if (d.tema)                   filas.push(['TEMA DEL SERVICIO',       d.tema,        true]);
                if (d.orador)                 filas.push(['ORADOR / PREDICADOR',      d.orador,      true]);
                if (d.presenta_orador)        filas.push(['PRESENTA AL ORADOR',       d.presenta_orador, false]);
                if (d.orador_apertura)        filas.push(['BIENVENIDA / APERTURA',    d.orador_apertura, false]);
                if (d.anuncia_himno_apertura) filas.push(['ANUNCIA HIMNO APERTURA',  d.anuncia_himno_apertura, false]);
                if (d.himno_apertura)         filas.push(['HIMNO APERTURA', '#' + d.himno_apertura + (d.titulo_himno_apertura ? ' - ' + d.titulo_himno_apertura : ''), false]);
                if (d.anuncia_lectura)        filas.push(['ANUNCIA LECTURA BIBLICA',  d.anuncia_lectura, false]);
                if (d.cita_biblica)           filas.push(['CITA BIBLICA',             d.cita_biblica, false]);
                if (d.anuncia_especial)       filas.push(['ANUNCIA PARTE ESPECIAL',   d.anuncia_especial, false]);
                if (d.musica_especial)        filas.push(['MUSICA ESPECIAL',          d.musica_especial, false]);
                if (d.presenta_himno_final)   filas.push(['PRESENTA HIMNO FINAL',     d.presenta_himno_final, false]);
                if (d.himno_final)            filas.push(['HIMNO FINAL', '#' + d.himno_final + (d.titulo_himno_final ? ' - ' + d.titulo_himno_final : ''), false]);
                if (d.orador_oracion)         filas.push(['ORACION FINAL',            d.orador_oracion, false]);
                if (d.observaciones)          filas.push(['OBSERVACIONES',            d.observaciones, false]);
            }

            if (filas.length === 0) {
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(7);
                doc.setTextColor(150, 145, 175);
                doc.text('(Sin informacion registrada para este dia)', W/2, y + 5, { align: 'center' });
                y += 12;
            } else {
                var alturaCampo = 14;
                function dibujarCampoEvt(fila) {
                    var label = fila[0], valor = fila[1], destacado = fila[2];
                    // Sección separadora
                    if (destacado === 'seccion') {
                        if (y + 10 > H - 20) { doc.addPage(); doc.setFillColor(15,12,35); doc.rect(0,0,W,14,'F'); y = 20; }
                        doc.setFillColor(eR, eG, eB);
                        doc.rect(mx, y, W - mx*2, 8, 'F');
                        doc.setTextColor(0, 0, 0);
                        doc.setFont('helvetica', 'bold');
                        doc.setFontSize(7);
                        doc.text(label, W/2, y + 5.5, { align: 'center' });
                        y += 12;
                        return;
                    }
                    // Estimacion de altura (puede ser multilínea)
                    var altFila = alturaCampo;
                    if (valor.length > 45) altFila = alturaCampo + 6;
                    if (valor.length > 90) altFila = alturaCampo + 12;
                    if (y + altFila > H - 20) {
                        doc.addPage();
                        doc.setFillColor(15, 12, 35);
                        doc.rect(0, 0, W, 14, 'F');
                        doc.setTextColor(eR, eG, eB);
                        doc.setFontSize(7);
                        doc.setFont('helvetica', 'bold');
                        doc.text(ev.titulo.toUpperCase(), W/2, 9, { align: 'center' });
                        y = 20;
                    }
                    if (destacado === true) {
                        doc.setFillColor(255, 248, 220);
                        doc.roundedRect(mx, y, W - mx*2, altFila, 2, 2, 'F');
                        doc.setDrawColor(eR, eG, eB);
                        doc.setLineWidth(0.6);
                        doc.roundedRect(mx, y, W - mx*2, altFila, 2, 2, 'S');
                        doc.setTextColor(eR, eG, eB);
                    } else {
                        doc.setFillColor(248, 247, 255);
                        doc.roundedRect(mx, y, W - mx*2, altFila, 2, 2, 'F');
                        doc.setDrawColor(220, 215, 245);
                        doc.setLineWidth(0.2);
                        doc.roundedRect(mx, y, W - mx*2, altFila, 2, 2, 'S');
                        doc.setTextColor(60, 40, 140);
                    }
                    doc.setFillColor(eR, eG, eB);
                    doc.rect(mx, y, 3, altFila, 'F');
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(5);
                    doc.setTextColor(destacado===true ? eR : 100, destacado===true ? eG : 80, destacado===true ? eB : 180);
                    doc.text(label, mx + 6, y + 4.5);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(destacado===true ? 9 : 8);
                    doc.setTextColor(destacado===true ? 100 : 25, destacado===true ? 60 : 20, destacado===true ? 0 : 60);
                    // Texto con wrap manual si es muy largo
                    var v = valor;
                    if (v.length > 55 && altFila > alturaCampo) {
                        var mid = Math.floor(v.length / 2);
                        var sp = v.lastIndexOf(' ', mid);
                        if (sp > 0) {
                            doc.text(v.substring(0, sp), mx + 6, y + 9);
                            doc.text(v.substring(sp+1), mx + 6, y + 9 + (altFila > alturaCampo+6 ? 5 : 4.5));
                        } else {
                            var vShort = v.length > 55 ? v.substring(0,54)+'...' : v;
                            doc.text(vShort, mx + 6, y + 9);
                        }
                    } else {
                        var vShort = v.length > 70 ? v.substring(0,69)+'...' : v;
                        doc.text(vShort, mx + 6, y + 9);
                    }
                    y += altFila + 2;
                }

                filas.forEach(function(f) { dibujarCampoEvt(f); });
                y += 4;
            }

            if (di < diasAExportar.length - 1) {
                doc.setDrawColor(eR, eG, eB);
                doc.setLineWidth(0.3);
                doc.line(mx + 20, y, W - mx - 20, y);
                y += 6;
            }
        });

        doc.setDrawColor(200, 195, 235);
        doc.setLineWidth(0.3);
        doc.line(mx, H - 14, W - mx, H - 14);
        doc.setFontSize(6.5);
        doc.setTextColor(160, 155, 185);
        doc.setFont('helvetica', 'italic');
        doc.text('Generado por Legado Biblico | Iglesia Adventista Cypress Hills', W/2, H - 9, { align: 'center' });

        var blob = doc.output('blob');
        var fName = 'Evento_' + ev.titulo.replace(/[^a-z0-9]/gi,'_').substring(0,20) + '.pdf';
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], fName, { type: 'application/pdf' })] })) {
            navigator.share({ title: ev.titulo, files: [new File([blob], fName, { type: 'application/pdf' })] })
                .catch(function() { doc.save(fName); });
        } else {
            doc.save(fName);
        }
        if (typeof mostrarToast === 'function') mostrarToast('PDF generado!');
    }

    if (window.jspdf) {
        hacerPDF();
    } else {
        var s = document.createElement('script');
        s.src = './jspdf.umd.min.js';
        s.onload = hacerPDF;
        s.onerror = function() {
            var s2 = document.createElement('script');
            s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            s2.onload = hacerPDF;
            document.head.appendChild(s2);
        };
        document.head.appendChild(s);
    }
};

// ─────────────────────────────────────────────────────────────
// Pre-carga de imagen artística de Santa Cena (background load)
// ─────────────────────────────────────────────────────────────
if (!window._scArtPreload) {
    window._scArtPreload = new Image();
    window._scArtPreload.src = './santa_cena_art.png?bust=' + Date.now();
}

// ----------------------------------------------------------------
// GENERAR PLANTILLA IMAGEN - Canvas 2D nativo - Multi-plantilla v255
// Acepta colorOverride (3er param) para las 10 plantillas visuales
// ----------------------------------------------------------------
window.generarPlantillaEvento = function(eventoId, modo, colorOverride, isPdfFormat) {
    // ✅ FIX BUG: Fusionar datos en memoria con localStorage ANTES de leer
    // (Esto arregla "Plantilla Todos muestra solo el Domingo")
    var eventos = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    var ev = eventos.find(function(e) { return e.id === eventoId; });
    if (!ev) return;

    // Merge con datos en memoria si el editor está abierto (sesión activa)
    if (window._diasEvento && window._diasEvento.length === (ev.dias || []).length) {
        window._diasEvento.forEach(function(dMem, i) {
            if (!ev.dias[i]) return;
            if (dMem.datos && Object.keys(dMem.datos).some(function(k){ return k !== 'anciano_tipo' && !!dMem.datos[k]; })) {
                ev.dias[i].datos = Object.assign({}, ev.dias[i].datos || {}, dMem.datos);
            }
        });
    }

    var dias;
    if (modo === 'seleccion') {
        // Modo manual: usar días seleccionados por el usuario
        var idxSel = _evtGetDiasSeleccionados();
        dias = (ev.dias || []).filter(function(_, i) { return idxSel.includes(i); });
    } else {
        // Modo 'todos': SOLO mostrar días que tengan datos llenados
        dias = (ev.dias || []).filter(function(d) {
            return d.datos && Object.keys(d.datos).some(function(k){ return k !== 'anciano_tipo' && !!d.datos[k]; });
        });
    }

    if (dias.length === 0) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay días con datos. Llena al menos un día en el editor.');
        return;
    }
    if (typeof mostrarToast === 'function') mostrarToast('🖼️ Generando imagen con ' + dias.length + ' día(s)...');


    try {
        var C = colorOverride || ev.color || '#00b894'; // ← Plantilla elegida
        var W      = 1080;
    var PAD    = 48;
    var GAP    = 8;
    var LBL_H  = 32;  // altura label (26px bold)
    var VAL_H  = 34;  // altura valor (por linea)

    function hexRgb(hex) {
        var h = hex.replace('#','');
        return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    }
    function rr(ctx, x, y, w, h, r) {
        if (typeof r === 'number') r = [r,r,r,r];
        ctx.beginPath();
        ctx.moveTo(x+r[0], y);
        ctx.lineTo(x+w-r[1], y); ctx.arcTo(x+w, y, x+w, y+r[1], r[1]);
        ctx.lineTo(x+w, y+h-r[2]); ctx.arcTo(x+w, y+h, x+w-r[2], y+h, r[2]);
        ctx.lineTo(x+r[3], y+h); ctx.arcTo(x, y+h, x, y+h-r[3], r[3]);
        ctx.lineTo(x, y+r[0]); ctx.arcTo(x, y, x+r[0], y, r[0]);
        ctx.closePath();
    }

    var cRGB = hexRgb(C);
    var cR = cRGB[0], cG = cRGB[1], cB = cRGB[2];

    // CANVAS AUXILIAR para medir texto antes de definir el alto final
    var mCtx = document.createElement('canvas').getContext('2d');

    // Funcion para dividir texto en lineas que quepan en maxW
    function splitLines(txt, font, maxW) {
        mCtx.font = font;
        var lines = [];
        String(txt).split('\n').forEach(function(el) {
            var words = el.split(' ');
            var cur = '';
            words.forEach(function(w) {
                var t = cur ? cur + ' ' + w : w;
                if (mCtx.measureText(t).width > maxW && cur) {
                    lines.push(cur); cur = w;
                } else { cur = t; }
            });
            if (cur) lines.push(cur);
        });
        return lines.length ? lines : [''];
    }

    // Ajustar font size del titulo para que quepa en una linea
    function titleFont(txt, maxW) {
        var sz = 54;
        mCtx.font = 'bold ' + sz + 'px Arial,sans-serif';
        while (mCtx.measureText(txt).width > maxW && sz > 28) {
            sz -= 2;
            mCtx.font = 'bold ' + sz + 'px Arial,sans-serif';
        }
        return sz;
    }

    var VAL_FONT  = 'bold 28px Arial,sans-serif';
    var LBL_FONT  = 'bold 26px Arial,sans-serif';  // mas grande y legible
    var PILL_H    = 64;
    var HDR_H     = 200;  // header compacto: iglesia + titulo + fecha
    var FOOTER_H  = 70;
    var CAMPO_MAX = W - PAD*2 - 20;  // ancho maximo del valor de texto

    var CAMPOS_SABADO = [
        'anciano','ev_diaconos','ev_diaconisas','ev_llamado',
        'ev_doxologia','ev_invocacion','ev_bienvenida','infantil_anuncia','infantil','ev_ofrendas_anuncia','ev_ofrendas','ev_ofrendas_diaconisa',
        'ev_himno_adoracion','ev_lectura_cita',
        'ev_oracion_intercesora','ev_pred_anuncia','ev_musica_especial','ev_predicador','ev_tema',
        'ev_himno_final','ev_oracion_final','ev_sonido',
        'observaciones'
    ];
    var CAMPOS_SC = [
        'sc_diacono_1_nombre','sc_diacono_2_nombre','sc_diacono_3_nombre',
        'sc_diacono_4_nombre','sc_diacono_5_nombre','sc_diacono_6_nombre',
        'sc_diaconiza_1_nombre','sc_diaconiza_2_nombre','sc_diaconiza_3_nombre',
        'sc_diaconiza_4_nombre','sc_diaconiza_5_nombre','sc_diaconiza_6_nombre',
        'sc_lectura_pan','sc_cita_pan','sc_oracion_pan',
        'sc_lectura_vino','sc_cita_vino','sc_oracion_vino','sc_ordenador','sc_oracion_final'
    ];
    var CAMPOS_GENERICO = ['orador_apertura','anuncia_himno_apertura','himno_apertura',
        'anuncia_lectura','cita_biblica','orador','presenta_orador','tema',
        'anuncia_especial','musica_especial','presenta_himno_final',
        'himno_final','orador_oracion','observaciones'];

    var esSantaCenaCanvas = (ev.tipo === 'santa_cena')
        || (ev.titulo && ev.titulo.toLowerCase().indexOf('santa cena') !== -1);
    var CAMPOS = esSantaCenaCanvas
        ? ['__div_culto__'].concat(CAMPOS_SABADO).concat(['__div_sc__']).concat(CAMPOS_SC)
        : CAMPOS_GENERICO;

    var LABELS = {
        // Culto de Sábado — empieza en 1
        'anciano':               'Anciano(s) de Turno',
        'ev_diaconos':           'Diáconos (Puerta y Orden)',
        'ev_diaconisas':         'Diaconisas (Puerta y Orden)',
        'ev_llamado':            '1. Llamado a la Adoracion',
        'ev_doxologia':          '2. Doxologia',
        'ev_invocacion':         '3. Invocacion',
        'ev_bienvenida':         '4. Bienvenida',
        'infantil_anuncia':      '5. Rincon Infantil (Anuncia)',
        'infantil':              'Rincon Infantil (Conduce)',
        'ev_ofrendas_anuncia':   '6. Diezmos y Ofrendas (Anuncia)',
        'ev_ofrendas':           'Diáconos (Ofrendas)',
        'ev_ofrendas_diaconisa': 'Diaconisas (Ofrendas)',
        'ev_himno_adoracion':    '7. Himno de Adoracion',
        'ev_lectura_cita':       '8. Lectura Biblica',
        'ev_oracion_intercesora':'9. Oracion Intercesora',
        'ev_pred_anuncia':       'Presenta al Predicador',
        'ev_musica_especial':    '10. Musica Especial',
        'ev_predicador':         '11. Predicador/a',
        'ev_tema':               'Tema del Sermon',
        'ev_himno_final':        '12. Himno Final',
        'ev_oracion_final':      '13. Oracion Final',
        'ev_sonido':             '14. Encargado de Sonido',
        // Santa Cena — Diáconos 1-6
        'sc_diacono_1_nombre':   '1. Diacono',
        'sc_diacono_2_nombre':   '2. Diacono',
        'sc_diacono_3_nombre':   '3. Diacono',
        'sc_diacono_4_nombre':   '4. Diacono',
        'sc_diacono_5_nombre':   '5. Diacono',
        'sc_diacono_6_nombre':   '6. Diacono',
        // Santa Cena — Diaconizas 1-6
        'sc_diaconiza_1_nombre': '1. Diaconiza',
        'sc_diaconiza_2_nombre': '2. Diaconiza',
        'sc_diaconiza_3_nombre': '3. Diaconiza',
        'sc_diaconiza_4_nombre': '4. Diaconiza',
        'sc_diaconiza_5_nombre': '5. Diaconiza',
        'sc_diaconiza_6_nombre': '6. Diaconiza',
        // Santa Cena — Lecturas y Oraciones
        'sc_lectura_pan':        'Lectura por el Pan',
        'sc_cita_pan':           'Cita Biblica (Pan)',
        'sc_oracion_pan':        'Oracion por el Pan',
        'sc_lectura_vino':       'Lectura por el Vino',
        'sc_cita_vino':          'Cita Biblica (Vino)',
        'sc_oracion_vino':       'Oracion por el Vino',
        'sc_ordenador':          'Orador / Predicador',
        'sc_oracion_final':      'Oracion Final',
        // Generico
        'orador_apertura':       'Apertura',
        'anuncia_himno_apertura':'Anuncia himno',
        'himno_apertura':        'Himno apertura',
        'anuncia_lectura':       'Lectura biblica',
        'cita_biblica':          'Cita',
        'orador':                'Orador / Predicador',
        'presenta_orador':       'Presenta orador',
        'tema':                  'Tema',
        'anuncia_especial':      'Parte especial',
        'musica_especial':       'Musica especial',
        'presenta_himno_final':  'Presenta himno final',
        'himno_final':           'Himno final',
        'orador_oracion':        'Oracion final',
        'observaciones':         'Notas'
    };

    // Helper para obtener titulo de himno desde el himnario
    function _tituloHimno(num) {
        var n = parseInt(String(num || '').replace('#',''));
        if (!n || isNaN(n)) return '';
        return (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[n]) || '';
    }

    function getValor(campo, d) {
        if (campo === '__div_culto__' || campo === '__div_sc__') return '__separator__';
        // Doxología (evento Sábado)
        if (campo === 'ev_doxologia' && d.ev_doxologia) {
            var t0 = d.titulo_ev_doxologia || _tituloHimno(d.ev_doxologia);
            return '#' + d.ev_doxologia + (t0 ? ' \u2014 ' + t0 : '');
        }
        // Himno de Adoración (evento Sábado)
        if (campo === 'ev_himno_adoracion' && (d.ev_himno_adoracion || d.ev_himno_anuncia)) {
            var t1 = d.titulo_ev_himno_adoracion || _tituloHimno(d.ev_himno_adoracion);
            var strHA = '';
            if (d.ev_himno_anuncia) strHA += d.ev_himno_anuncia;
            if (d.ev_himno_adoracion) strHA += (strHA ? '\n' : '') + '#' + d.ev_himno_adoracion;
            if (t1) strHA += (strHA && !d.ev_himno_adoracion ? '\n' : (d.ev_himno_adoracion ? ' \u2014 ' : '')) + t1;
            return strHA;
        }
        // Himno Final (evento Sábado)
        if (campo === 'ev_himno_final' && (d.ev_himno_final || d.ev_himno_final_quien)) {
            var t2 = d.titulo_ev_himno_final || _tituloHimno(d.ev_himno_final);
            var strHF = '';
            if (d.ev_himno_final_quien) strHF += d.ev_himno_final_quien;
            if (d.ev_himno_final) strHF += (strHF ? '\n' : '') + '#' + d.ev_himno_final;
            if (t2) strHF += (strHF && !d.ev_himno_final ? '\n' : (d.ev_himno_final ? ' \u2014 ' : '')) + t2;
            return strHF;
        }
        // Lectura Bíblica (evento Sábado)
        if (campo === 'ev_lectura_cita' && (d.ev_lectura_cita || d.ev_lectura_quien)) {
            var strLec = '';
            if (d.ev_lectura_quien) strLec += d.ev_lectura_quien;
            if (d.ev_lectura_cita) strLec += (strLec ? '\n' : '') + d.ev_lectura_cita;
            return strLec;
        }


        // Campos genéricos de himno
        if (campo === 'himno_apertura' && d.himno_apertura) {
            var t3 = d.titulo_himno_apertura || _tituloHimno(d.himno_apertura);
            return '#' + d.himno_apertura + (t3 ? ' \u2014 ' + t3 : '');
        }
        if (campo === 'himno_final' && d.himno_final) {
            var t4 = d.titulo_himno_final || _tituloHimno(d.himno_final);
            return '#' + d.himno_final + (t4 ? ' \u2014 ' + t4 : '');
        }
        // Nombre diácono/diaconiza + función
        var _scDnMatch = campo.match(/^sc_(diacono|diaconiza)_(\d)_nombre$/);
        if (_scDnMatch && d[campo]) {
            var _scFunKey = 'sc_' + _scDnMatch[1] + '_' + _scDnMatch[2] + '_funcion';
            var _scFun = d[_scFunKey];
            return d[campo] + (_scFun ? '\n' + _scFun : '');
        }
        return d[campo] || '';
    }

    // Constantes para layout de dos columnas (Santa Cena)
    var COL_2GAP = 24;
    var COL_2W = Math.floor((W - PAD*2 - COL_2GAP) / 2);
    var CAMPO_MAX_COL = COL_2W - 28;
    var LBL_H_COL = 26, VAL_H_COL = 28;
    var LBL_FONT_COL = 'bold 21px Arial,sans-serif';
    var VAL_FONT_COL_S = 'bold 23px Arial,sans-serif';
    var COL_HDR_H = 52;

    // Pre-calcular altura total
    var bodyH = 0;
    dias.forEach(function(dia) {
        var d = dia.datos || {};
        bodyH += PILL_H + GAP + 4;
        var dia2col = esSantaCenaCanvas && dia.diaSemana === 6;
        if (dia2col) {
            // Dos columnas: equalizar con fichas vacias
            var cHL = COL_HDR_H + GAP;
            var cHR = COL_HDR_H + GAP;
            var cntL = 0, cntR = 0;
            var fillerCardH = LBL_H_COL + VAL_H_COL + 10 + GAP; // altura fija de ficha vacia
            CAMPOS_SABADO.forEach(function(campo) {
                var v = getValor(campo, d);
                if (!v) return;
                var lines = splitLines(v, VAL_FONT_COL_S, CAMPO_MAX_COL);
                cHL += LBL_H_COL + lines.length * VAL_H_COL + 10 + GAP;
                cntL++;
            });
            CAMPOS_SC.forEach(function(campo) {
                var v = getValor(campo, d);
                if (!v) return;
                var lines = splitLines(v, VAL_FONT_COL_S, CAMPO_MAX_COL);
                cHR += LBL_H_COL + lines.length * VAL_H_COL + 10 + GAP;
                cntR++;
            });
            // La izquierda puede recibir fillers; la derecha NO (el espacio lo usa la imagen)
            cHL += Math.max(0, cntR - cntL) * fillerCardH;
            // cHR NO suma fillers: la imagen ocupa ese espacio
            bodyH += Math.max(cHL, cHR); // la columna izquierda domina la altura
        } else {
            CAMPOS.forEach(function(campo) {
                if (campo === '__div_culto__' || campo === '__div_sc__') { bodyH += 70; return; }
                var v = getValor(campo, d);
                if (!v || v === '__separator__') return;
                var lines = splitLines(v, VAL_FONT, CAMPO_MAX);
                bodyH += LBL_H + lines.length * VAL_H + 10 + GAP;
            });
        }
        bodyH += 20;
    });
    var H = HDR_H + bodyH + FOOTER_H + 20;

    // Crear canvas final
    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');

    // FONDO
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, 'rgb(' + Math.round(cR*0.10) + ',' + Math.round(cG*0.14) + ',' + Math.round(cB*0.10) + ')');
    bg.addColorStop(1, 'rgb(3,8,6)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Borde izquierdo
    ctx.fillStyle = C;
    ctx.fillRect(0, 0, 7, H);

    // CABECERA
    var hdr = ctx.createLinearGradient(0, 0, W, HDR_H);
    hdr.addColorStop(0, 'rgba(' + cR + ',' + cG + ',' + cB + ',0.30)');
    hdr.addColorStop(1, 'rgba(' + cR + ',' + cG + ',' + cB + ',0.04)');
    ctx.fillStyle = hdr;
    ctx.fillRect(0, 0, W, HDR_H);

    // ══════════════════════════════════════════════════
    // CABECERA — Nuevo orden aprobado:
    // 1. Nombre iglesia  2. Titulo  3. Emojis  4. Fecha
    // ══════════════════════════════════════════════════

    // 1. NOMBRE DE LA IGLESIA — letras blancas más claras y visibles
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.font = 'bold 28px Arial,sans-serif';
    ctx.fillText('IGLESIA ADVENTISTA CYPRESS HILLS', W / 2, 46);
    // Sublinea decorativa
    ctx.strokeStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W/2 - 220, 54); ctx.lineTo(W/2 + 220, 54); ctx.stroke();

    // 2. TÍTULO DEL EVENTO — grande, blanco brillante, fuente auto-ajustable
    var titMaxW = W - 80;
    // Para Santa Cena: quitar el año del título
    var tituloCanvas = ev.titulo;
    var esSC = ev.tipo === 'santa_cena' || tituloCanvas.toLowerCase().indexOf('santa cena') !== -1;
    if (esSC) tituloCanvas = tituloCanvas.replace(/\s*\d{4}\s*/g, '').trim();
    var titTxt  = tituloCanvas.toUpperCase();
    var titSz   = titleFont(titTxt, titMaxW);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold ' + titSz + 'px Arial,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(titTxt, W / 2, 72 + titSz);

    // Fecha del evento
    var DIAS_BADGE  = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    var MESES_BADGE = ['enero','febrero','marzo','abril','mayo','junio','julio',
                       'agosto','septiembre','octubre','noviembre','diciembre'];
    var fechaStr;
    if (esSC) {
        // Santa Cena: solo mostrar el Sábado
        var diaSab = dias.find(function(d) { return d.diaSemana === 6; }) || dias[0];
        var fSab = new Date(diaSab.fecha + 'T12:00:00');
        var mesSab = (MESES_BADGE[fSab.getMonth()] || '').toUpperCase();
        fechaStr = 'SABADO ' + fSab.getDate() + ' DE ' + mesSab;
    } else {
        var allEvDias  = (ev.dias && ev.dias.length > 0) ? ev.dias : dias;
        var firstEvDia = allEvDias[0];
        var lastEvDia  = allEvDias[allEvDias.length - 1];
        var fFirst = new Date(firstEvDia.fecha + 'T12:00:00');
        var fLast  = new Date(lastEvDia.fecha  + 'T12:00:00');
        var dFName = (DIAS_BADGE[firstEvDia.diaSemana] || '').toUpperCase();
        var dLName = (DIAS_BADGE[lastEvDia.diaSemana]  || '').toUpperCase();
        var mesNom = (MESES_BADGE[fFirst.getMonth()]   || '').toUpperCase();
        fechaStr = allEvDias.length === 1
            ? dFName + ' ' + fFirst.getDate() + ' DE ' + mesNom
            : dFName + ' ' + fFirst.getDate() + ' - ' + dLName + ' ' + fLast.getDate() + ' DE ' + mesNom;
    }

    // Solo texto de fecha — solo para eventos NO Santa Cena (en SC la fecha aparece en el chip)
    if (!esSC) {
        var fechaY = 72 + titSz + 60;
        ctx.font = 'bold 26px Arial,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.90)';
        ctx.fillText(fechaStr, W / 2, fechaY);
    }
    ctx.textAlign = 'left'; // restaurar


    // Linea separadora del header
    ctx.strokeStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, HDR_H - 4); ctx.lineTo(W - PAD, HDR_H - 4); ctx.stroke();

    // Fondo sutil para toda el area del cuerpo (evita que quede negro al final de las columnas)
    ctx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.07)';
    ctx.fillRect(0, HDR_H, W, H - HDR_H - FOOTER_H);


    // DIAS
    var DIAS_N = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    var MESES  = ['enero','febrero','marzo','abril','mayo','junio','julio',
                  'agosto','septiembre','octubre','noviembre','diciembre'];
    var y = HDR_H + 16;

    dias.forEach(function(dia) {
        var d = dia.datos || {};
        var col = (typeof COLORES_DIA !== 'undefined' && COLORES_DIA[dia.diaSemana]) ? COLORES_DIA[dia.diaSemana]
                                                       : { hex: C, nombre: DIAS_N[dia.diaSemana] || 'Día' };
        var dRGB = hexRgb(col.hex);
        var dR = dRGB[0], dG = dRGB[1], dB = dRGB[2];
        var fObj = new Date(dia.fecha + 'T12:00:00');
        var textodia = (DIAS_N[dia.diaSemana] || col.nombre || '').toUpperCase()
                     + ' ' + fObj.getDate() + ' DE '
                     + (MESES[fObj.getMonth()] || '').toUpperCase();
        if (esSantaCenaCanvas) textodia += ' ' + fObj.getFullYear();

        // Pill del dia — texto centrado para SC, alineado izq para otros
        ctx.fillStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.20)';
        rr(ctx, PAD, y, W - PAD*2, PILL_H, 20); ctx.fill();
        ctx.strokeStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.55)';
        ctx.lineWidth = 1.5;
        rr(ctx, PAD, y, W - PAD*2, PILL_H, 20); ctx.stroke();
        ctx.fillStyle = col.hex;
        ctx.font = 'bold 30px Arial,sans-serif';
        if (esSantaCenaCanvas) {
            ctx.textAlign = 'center';
            ctx.fillText(textodia, W / 2, y + 40);
            ctx.textAlign = 'left';
        } else {
            ctx.fillText(textodia, PAD + 28, y + 40);
        }
        y += PILL_H + GAP + 4;

        var dia2col = esSantaCenaCanvas && dia.diaSemana === 6;

        if (dia2col) {
            // ═══════════════════════════════════════════════════════
            // DOS COLUMNAS: Culto Divino | Santa Cena
            // ═══════════════════════════════════════════════════════
            var xL = PAD, xR = PAD + COL_2W + COL_2GAP;
            var yL = y, yR = y;
            var bL = 0, bR = 0;

            // Cabecera columna izquierda — CULTO DIVINO
            ctx.fillStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.18)';
            rr(ctx, xL, yL, COL_2W, COL_HDR_H, 14); ctx.fill();
            ctx.strokeStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.65)';
            ctx.lineWidth = 2;
            rr(ctx, xL, yL, COL_2W, COL_HDR_H, 14); ctx.stroke();
            ctx.fillStyle = col.hex;
            ctx.font = 'bold 25px Arial,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('\u271D\uFE0F CULTO DIVINO', xL + COL_2W/2, yL + 34);
            ctx.textAlign = 'left';
            yL += COL_HDR_H + GAP;

            // Cabecera columna derecha — SANTA CENA
            ctx.fillStyle = 'rgba(250,177,160,0.22)';
            rr(ctx, xR, yR, COL_2W, COL_HDR_H, 14); ctx.fill();
            ctx.strokeStyle = 'rgba(250,177,160,0.75)';
            ctx.lineWidth = 2;
            rr(ctx, xR, yR, COL_2W, COL_HDR_H, 14); ctx.stroke();
            ctx.fillStyle = '#fab1a0';
            ctx.font = 'bold 25px Arial,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('\uD83C\uDF5E SANTA CENA', xR + COL_2W/2, yR + 34);
            ctx.textAlign = 'left';
            yR += COL_HDR_H + GAP;

            // ── Construir datos para cada columna ─────────────────────────
            var dataLeft = [], dataRight = [];
            var fillerSzH = LBL_H_COL + VAL_H_COL + 10;
            CAMPOS_SABADO.forEach(function(campo) {
                var v = getValor(campo, d);
                if (!v || v === '__separator__') return;
                var label = LABELS[campo] || campo;
                var esTema = (campo === 'ev_tema');
                var lines = splitLines(v, VAL_FONT_COL_S, CAMPO_MAX_COL);
                dataLeft.push({ label:label, lines:lines, cardH: LBL_H_COL + lines.length*VAL_H_COL + 10, esTema:esTema });
            });
            CAMPOS_SC.forEach(function(campo) {
                var v = getValor(campo, d);
                if (!v || v === '__separator__') return;
                var label = LABELS[campo] || campo;
                var lines = splitLines(v, VAL_FONT_COL_S, CAMPO_MAX_COL);
                dataRight.push({ label:label, lines:lines, cardH: LBL_H_COL + lines.length*VAL_H_COL + 10, esTema:false });
            });
            // Solo la columna izquierda recibe fillers (la derecha la llena la imagen)
            var maxCards = Math.max(dataLeft.length, dataRight.length);
            while (dataLeft.length < maxCards) dataLeft.push({ filler:true, cardH:fillerSzH });
            // NO agregar fillers a dataRight: el espacio sobrante lo ocupa la imagen artística

            // ── Dibujar columna izquierda ──────────────────────────────────
            dataLeft.forEach(function(item) {
                if (item.filler) {
                    ctx.fillStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.04)';
                    rr(ctx, xL, yL, COL_2W, item.cardH, 12); ctx.fill();
                    ctx.fillStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.15)';
                    rr(ctx, xL, yL, 6, item.cardH, [12,0,0,12]); ctx.fill();
                    yL += item.cardH + GAP; return;
                }
                ctx.fillStyle = item.esTema ? 'rgba(212,175,55,0.13)' : 'rgba(' + dR + ',' + dG + ',' + dB + ',0.08)';
                rr(ctx, xL, yL, COL_2W, item.cardH, 12); ctx.fill();
                ctx.fillStyle = item.esTema ? '#d4af37' : (bL % 2 === 0) ? '#e74c3c' : '#00b894';
                rr(ctx, xL, yL, 6, item.cardH, [12,0,0,12]); ctx.fill();
                bL++;
                ctx.fillStyle = item.esTema ? 'rgba(212,175,55,0.95)' : 'rgba(' + dR + ',' + dG + ',' + dB + ',0.85)';
                ctx.font = LBL_FONT_COL;
                ctx.textAlign = 'center';
                ctx.fillText(item.label.toUpperCase(), xL + COL_2W/2, yL + LBL_H_COL - 2);
                ctx.fillStyle = item.esTema ? '#ffe082' : '#ffffff';
                ctx.font = VAL_FONT_COL_S;
                item.lines.forEach(function(line, li) {
                    ctx.fillText(line, xL + COL_2W/2, yL + LBL_H_COL + VAL_H_COL * (li+1) - 4);
                });
                ctx.textAlign = 'left';
                yL += item.cardH + GAP;
            });

            // ── Dibujar columna derecha ────────────────────────────────────
            dataRight.forEach(function(item) {
                if (item.filler) {
                    ctx.fillStyle = 'rgba(250,177,160,0.04)';
                    rr(ctx, xR, yR, COL_2W, item.cardH, 12); ctx.fill();
                    ctx.fillStyle = 'rgba(253,121,168,0.15)';
                    rr(ctx, xR, yR, 6, item.cardH, [12,0,0,12]); ctx.fill();
                    yR += item.cardH + GAP; return;
                }
                ctx.fillStyle = 'rgba(250,177,160,0.08)';
                rr(ctx, xR, yR, COL_2W, item.cardH, 12); ctx.fill();
                ctx.fillStyle = (bR % 2 === 0) ? '#fd79a8' : '#a29bfe';
                rr(ctx, xR, yR, 6, item.cardH, [12,0,0,12]); ctx.fill();
                bR++;
                ctx.fillStyle = 'rgba(250,177,160,0.85)';
                ctx.font = LBL_FONT_COL;
                ctx.textAlign = 'center';
                ctx.fillText(item.label.toUpperCase(), xR + COL_2W/2, yR + LBL_H_COL - 2);
                ctx.fillStyle = '#ffffff';
                ctx.font = VAL_FONT_COL_S;
                item.lines.forEach(function(line, li) {
                    ctx.fillText(line, xR + COL_2W/2, yR + LBL_H_COL + VAL_H_COL * (li+1) - 4);
                });
                ctx.textAlign = 'left';
                yR += item.cardH + GAP;
            });

            // ── Imagen artística en espacio vacío de la columna derecha ──
            var espacioLibreR = yL - yR - GAP;
            window._scCanvasPendingDraw = null; // reset
            if (espacioLibreR > 80) {
                var _imgX = xR, _imgY = yR;
                var _imgW = COL_2W;
                var _imgH = Math.min(espacioLibreR - 8, COL_2W * 0.75); // max ratio 4:3
                var _drawSCImg = function(imgEl) {
                    ctx.save();
                    rr(ctx, _imgX, _imgY, _imgW, _imgH, 14); ctx.clip();
                    ctx.drawImage(imgEl, _imgX, _imgY, _imgW, _imgH);
                    // Gradiente de integración (oscuro arriba y abajo)
                    var _grad = ctx.createLinearGradient(_imgX, _imgY, _imgX, _imgY + _imgH);
                    _grad.addColorStop(0,   'rgba(0,0,0,0.30)');
                    _grad.addColorStop(0.4, 'rgba(0,0,0,0.05)');
                    _grad.addColorStop(1,   'rgba(0,0,0,0.65)');
                    ctx.fillStyle = _grad;
                    ctx.fillRect(_imgX, _imgY, _imgW, _imgH);
                    ctx.restore();
                    // Borde color Santa Cena
                    ctx.strokeStyle = 'rgba(250,177,160,0.55)';
                    ctx.lineWidth = 2.5;
                    rr(ctx, _imgX, _imgY, _imgW, _imgH, 14); ctx.stroke();
                    // Texto debajo
                    ctx.fillStyle = 'rgba(255,215,180,0.90)';
                    ctx.font = 'bold 20px Arial,sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('\uD83C\uDF5E EL APOSENTO ALTO', _imgX + _imgW/2, _imgY + _imgH - 14);
                    ctx.textAlign = 'left';
                };
                window._drawSCImgMemo = _drawSCImg;
                var _preImg = window._scArtPreload;
                if (_preImg && _preImg.complete && _preImg.naturalWidth > 0) {
                    // Ya cargada — pintar de inmediato (sincrónico)
                    _drawSCImg(_preImg);
                } else {
                    // Aún cargando — guardar callback para ejecutar antes del export
                    if (!_preImg) { _preImg = new Image(); window._scArtPreload = _preImg; }
                    window._scCanvasPendingDraw = { img: _preImg, fn: _drawSCImg };
                    if (!_preImg.src) _preImg.src = './santa_cena_art.png?bust=' + Date.now();
                }
            }

            y = Math.max(yL, yR) + 20;
        } else {
            // ═══════════════════════════════════════════════════════
            // COLUMNA ÚNICA (eventos NO santa cena)
            // ═══════════════════════════════════════════════════════
            var barraIdx = 0;
            CAMPOS.forEach(function(campo) {
                if (campo === '__div_culto__') {
                    var sepTxt = '\u271D\uFE0F PRIMER SERVICIO \u2014 CULTO DIVINO';
                    y += 10;
                    ctx.fillStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.18)';
                    rr(ctx, PAD, y, W - PAD*2, 58, 16); ctx.fill();
                    ctx.strokeStyle = 'rgba(' + dR + ',' + dG + ',' + dB + ',0.6)';
                    ctx.lineWidth = 2;
                    rr(ctx, PAD, y, W - PAD*2, 58, 16); ctx.stroke();
                    ctx.fillStyle = col.hex;
                    ctx.font = 'bold 30px Arial,sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(sepTxt, W/2, y + 38);
                    ctx.textAlign = 'left';
                    y += 58 + GAP + 4; barraIdx = 0; return;
                }
                if (campo === '__div_sc__') {
                    y += 14;
                    ctx.fillStyle = 'rgba(250,177,160,0.22)';
                    rr(ctx, PAD, y, W - PAD*2, 60, 16); ctx.fill();
                    ctx.strokeStyle = 'rgba(250,177,160,0.75)';
                    ctx.lineWidth = 2.5;
                    rr(ctx, PAD, y, W - PAD*2, 60, 16); ctx.stroke();
                    ctx.fillStyle = '#fab1a0';
                    ctx.font = 'bold 30px Arial,sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('\uD83C\uDF5E SEGUNDO SERVICIO \u2014 SANTA CENA', W/2, y + 40);
                    ctx.textAlign = 'left';
                    y += 60 + GAP + 8; barraIdx = 0; return;
                }
                var v = getValor(campo, d);
                if (!v || v === '__separator__') return;
                var label = LABELS[campo] || campo;
                var lines = splitLines(v, VAL_FONT, CAMPO_MAX);
                var cardH = LBL_H + lines.length * VAL_H + 10;
                var esTema = (campo === 'tema' || campo === 'ev_tema');
                ctx.fillStyle = esTema ? 'rgba(212,175,55,0.13)' : 'rgba(' + dR + ',' + dG + ',' + dB + ',0.07)';
                rr(ctx, PAD, y, W - PAD*2, cardH, 12); ctx.fill();
                ctx.fillStyle = esTema ? '#d4af37' : (barraIdx % 2 === 0) ? '#e74c3c' : '#00b894';
                rr(ctx, PAD, y, 6, cardH, [12,0,0,12]); ctx.fill();
                barraIdx++;
                ctx.fillStyle = esTema ? 'rgba(212,175,55,0.95)' : 'rgba(' + dR + ',' + dG + ',' + dB + ',0.85)';
                ctx.font = LBL_FONT;
                ctx.fillText(label.toUpperCase() + ':', PAD + 22, y + LBL_H - 2);
                ctx.fillStyle = esTema ? '#ffe082' : '#ffffff';
                ctx.font = esTema ? 'bold 30px Arial,sans-serif' : VAL_FONT;
                lines.forEach(function(line, li) {
                    ctx.fillText(line, PAD + 22, y + LBL_H + VAL_H * (li + 1) - 4);
                });
                y += cardH + GAP;
            });
            y += 20;
        }
    });

    // FOOTER
    ctx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.10)';
    ctx.fillRect(0, H - FOOTER_H, W, FOOTER_H);
    ctx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.7)';
    ctx.font = 'bold 22px Arial,sans-serif';
    ctx.fillText('Legado Biblico - Iglesia Adventista Cypress Hills - Brooklyn, NY', PAD, H - 26);

    // ============================================================
    // VISTA PREVIA MODAL con botones Compartir / Guardar
    // (Esperar imagen pendiente si aún no cargó)
    // ============================================================
    var _doExport = function() {
        if (isPdfFormat) {
            // Aplicar inversion y B/N para ahorro de tinta (Modo Word)
            var pCtx = canvas.getContext('2d');
            var imgData = pCtx.getImageData(0, 0, W, H);
            var data = imgData.data;
            for(var i = 0; i < data.length; i += 4) {
                var r = 255 - data[i];
                var g = 255 - data[i+1];
                var b = 255 - data[i+2];
                var gris = 0.299 * r + 0.587 * g + 0.114 * b;
                // Dejar el fondo blanco puro si es casi blanco
                if (gris > 240) gris = 255;
                // Dejar el texto negro puro si es casi negro
                if (gris < 15) gris = 0;
                data[i] = gris; data[i+1] = gris; data[i+2] = gris;
            }
            pCtx.putImageData(imgData, 0, 0);

            // Repintar arte de Santa Cena para mantener su estetica original
            if (typeof window._drawSCImgMemo === 'function' && window._scArtPreload && window._scArtPreload.complete) {
                window._drawSCImgMemo(window._scArtPreload);
            }

            var fName = 'Evento_' + (ev.titulo||'evento').replace(/[^a-z0-9]/gi,'_').substring(0,30) + '.pdf';
            var pdfDataUrl = canvas.toDataURL('image/png', 1.0);
            var jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
            if (jsPDF) {
                var doc = new jsPDF({ orientation: 'portrait', unit: 'px', format: [W, H] });
                doc.addImage(pdfDataUrl, 'PNG', 0, 0, W, H);
                doc.save(fName);
                if (typeof mostrarToast === 'function') mostrarToast('📄 PDF Blanco y Negro generado (Modo Word)');
                return;
            } else {
                if (typeof mostrarToast === 'function') mostrarToast('⚠️ Falta jsPDF, guardando imagen...');
            }
        }
        canvas.toBlob(function(blob) {
        if (!blob) {
            if (typeof mostrarToast === 'function') mostrarToast('Error al crear imagen');
            return;
        }
        var blobUrl = URL.createObjectURL(blob);
        var fName = 'Evento_' + (ev.titulo||'evento').replace(/[^a-z0-9]/gi,'_').substring(0,30) + '.png';

        var old = document.getElementById('evt-img-preview');
        if (old) { old.remove(); }

        var modal = document.createElement('div');
        modal.id = 'evt-img-preview';
        modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.97);display:flex;flex-direction:column;align-items:center;overflow:hidden;';

        modal.innerHTML =
            '<div style="width:100%;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;box-sizing:border-box;">'
          +   '<div style="color:#00b894;font-weight:900;font-size:0.85rem;">VISTA PREVIA \u2014 LISTA PARA COMPARTIR</div>'
          +   '<button id="evt-close-prev" style="background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.6);padding:7px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;">X Cerrar</button>'
          + '</div>'
          + '<div style="flex:1;overflow-y:auto;overflow-x:hidden;width:100%;-webkit-overflow-scrolling:touch;padding:10px 8px;box-sizing:border-box;">'
          +   '<img id="evt-prev-img" src="' + blobUrl + '" style="width:100%;height:auto;display:block;border-radius:8px;box-shadow:0 4px 24px rgba(0,0,0,0.6);">'
          + '</div>'
          + '<div style="width:100%;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:10px;border-top:1px solid rgba(255,255,255,0.08);flex-shrink:0;box-sizing:border-box;">'
          +   '<button id="evt-share-btn" style="padding:14px;background:linear-gradient(135deg,rgba(0,184,148,0.3),rgba(0,184,148,0.15));border:1.5px solid rgba(0,184,148,0.5);color:#00b894;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.9rem;">\uD83D\uDD17 Compartir</button>'
          +   '<button id="evt-save-btn" style="padding:14px;background:linear-gradient(135deg,rgba(116,185,255,0.3),rgba(116,185,255,0.15));border:1.5px solid rgba(116,185,255,0.5);color:#74b9ff;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.9rem;">\uD83D\uDCBE Guardar</button>'
          + '</div>';

        document.body.appendChild(modal);

        document.getElementById('evt-close-prev').onclick = function() {
            modal.remove(); URL.revokeObjectURL(blobUrl);
        };

        document.getElementById('evt-share-btn').onclick = function() {
            var file = new File([blob], fName, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ title: ev.titulo, files: [file] })
                    .then(function() {
                        modal.remove(); URL.revokeObjectURL(blobUrl);
                        if (typeof mostrarToast === 'function') mostrarToast('Imagen compartida!');
                    })
                    .catch(function(e) {
                        if (e.name !== 'AbortError' && typeof mostrarToast === 'function')
                            mostrarToast('Error: ' + e.message);
                    });
            } else {
                window.open(blobUrl, '_blank');
            }
        };

        document.getElementById('evt-save-btn').onclick = function() {
            var a = document.createElement('a');
            a.href = blobUrl; a.download = fName;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            if (typeof mostrarToast === 'function') mostrarToast('Guardando en Descargas...');
        };

        if (typeof mostrarToast === 'function') mostrarToast('Lista! Elige Compartir o Guardar');
    }, 'image/png');
    }; // fin _doExport

    // Si hay imagen pendiente de la Santa Cena, pintar ANTES de exportar
    var _pending = window._scCanvasPendingDraw;
    window._scCanvasPendingDraw = null;
    if (_pending && _pending.img) {
        if (_pending.img.complete && _pending.img.naturalWidth > 0) {
            _pending.fn(_pending.img);
            _doExport();
        } else {
            _pending.img.onload  = function() { _pending.fn(_pending.img); _doExport(); };
            _pending.img.onerror = function() { _doExport(); };
        }
    } else {
        _doExport();
    }

    } catch(e) {
        console.error('Error generando plantilla:', e);
        if (typeof mostrarToast === 'function') mostrarToast('HTML Plantilla Error: ' + e.message);
    }
};



