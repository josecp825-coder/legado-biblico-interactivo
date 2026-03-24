// ═══════════════════════════════════════════════════════
// 📨 ENVIAR ENLACE FORMULARIO VACÍO (navigator.share)
// ═══════════════════════════════════════════════════════

window.enviarFormularioVacioWA = function () {
    var hoy = new Date();
    var diasParaSabado = (6 - hoy.getDay() + 7) % 7 || 7;
    var proxSabado = new Date(hoy);
    proxSabado.setDate(hoy.getDate() + diasParaSabado);
    var fechaStr = proxSabado.toISOString().split('T')[0].split('-').reverse().join('/');

    var mensaje = '⛪ *IGLESIA ADVENTISTA CYPRESS HILLS*\n' +
        '📋 *PLANILLA DE CULTO*\n' +
        '📅 Sábado ' + fechaStr + '\n\n' +
        'Completa el programa del culto tocando este enlace:\n' +
        '👉 https://agendatecnicadigital.com/#planilla\n\n' +
        '_Legado Bíblico_';

    if (navigator.share) {
        navigator.share({ title: 'Planilla de Culto - Cypress Hills', text: mensaje }).catch(function () { });
    } else {
        // Fallback: copiar al portapapeles
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(mensaje).then(function () {
                if (typeof mostrarToast === 'function') mostrarToast('📋 Enlace copiado! Pégalo donde quieras');
            });
        } else {
            prompt('Copia este mensaje:', mensaje);
        }
    }
};

// ═══════════════════════════════════════════════════════
// 📋 ABRIR PLANILLA EDITABLE (desde link compartido)
// ═══════════════════════════════════════════════════════

window.abrirPlanillaEditable = function () {
    var hoy = new Date();
    var diasParaSabado = (6 - hoy.getDay() + 7) % 7 || 7;
    var proxSabado = new Date(hoy);
    proxSabado.setDate(hoy.getDate() + diasParaSabado);
    var fechaISO = proxSabado.toISOString().split('T')[0];

    var campos = [
        { id: 'doxologia', lbl: '1. ✨ Doxología', ph: 'Nombre...' },
        { id: 'invocacion', lbl: '2. 🙏 Invocación', ph: 'Nombre...' },
        { id: 'bienvenida', lbl: '3. 🙌 Bienvenida', ph: 'Nombre...' },
        { id: 'infantil', lbl: '4. 👶 Rincón Infantil', ph: 'Nombre...' },
        { id: 'ofrendas', lbl: '5. 💰 Diezmos y Ofrendas', ph: 'Nombre del encargado...' },
        { id: 'himnoAdoracion', lbl: '6. 🎵 Himno de Adoración', ph: 'Himno #...' },
        { id: 'lectura', lbl: '7. 📖 Lectura Bíblica', ph: 'Nombre...' },
        { id: 'oracion', lbl: '8. 🙏 Oración Intercesora', ph: 'Nombre...' },
        { id: 'musica', lbl: '9. 🎤 Música Especial', ph: 'Quién cantará...' },
        { id: 'tema', lbl: '10. ⛪ Tema / Predicador', ph: 'Nombre del predicador...' },
        { id: 'himnoFinal', lbl: '11. 🎶 Himno Final', ph: 'Himno #...' },
        { id: 'oracionFinal', lbl: '12. 🤲 Oración Final', ph: 'Nombre...' }
    ];

    var viejo = document.getElementById('form-culto-overlay');
    if (viejo) viejo.remove();

    var camposHtml = '';
    campos.forEach(function (c, i) {
        var esTema = (i === 9);
        var borderColor = esTema ? 'rgba(253,203,110,0.4)' : 'rgba(162,155,254,0.3)';
        var lblColor = esTema ? '#fdcb6e' : '#a29bfe';
        camposHtml += '<div style="margin-bottom:12px">' +
            '<label style="display:block;font-weight:700;color:' + lblColor + ';font-size:calc(0.82rem * var(--font-scale,1));margin-bottom:4px">' + c.lbl + '</label>' +
            '<input type="text" id="fv-' + c.id + '" placeholder="' + c.ph + '" autocomplete="off" autocorrect="on" ' +
            'style="width:100%;padding:12px 14px;background:rgba(255,255,255,0.08);border:1px solid ' + borderColor + ';border-radius:10px;color:#fff;font-size:16px;outline:none;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;touch-action:manipulation">' +
            '</div>';
    });

    var overlay = document.createElement('div');
    overlay.id = 'form-culto-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:linear-gradient(170deg,#0a0818,#120e2a);z-index:10000;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:Segoe UI,sans-serif;';

    overlay.innerHTML =
        '<div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:10001;border-bottom:1px solid rgba(162,155,254,0.3)">' +
        '<button id="fv-cerrar" style="background:rgba(255,118,117,0.15);border:1px solid #ff767550;color:#ff7675;padding:8px 15px;border-radius:8px;font-weight:900;font-size:calc(0.8rem * var(--font-scale,1));cursor:pointer;-webkit-appearance:none">✕ CERRAR</button>' +
        '<div style="flex:1"><div style="color:#fdcb6e;font-weight:900;letter-spacing:1.5px;font-size:calc(0.85rem * var(--font-scale,1));">⛪ IGLESIA ADVENTISTA CYPRESS HILLS</div>' +
        '<div style="color:rgba(255,255,255,0.4);font-size:calc(0.65rem * var(--font-scale,1))">Llena los campos y envía el programa</div></div>' +
        '</div>' +
        '<div style="padding:20px;max-width:560px;margin:0 auto;padding-bottom:80px">' +
        '<div style="text-align:center;margin-bottom:18px;"><div style="color:#fff;font-weight:900;font-size:calc(1.1rem * var(--font-scale,1));letter-spacing:1px;">📋 PLANILLA DE CULTO</div></div>' +
        '<div style="margin-bottom:18px;padding:14px;background:linear-gradient(135deg,rgba(108,92,231,0.15),rgba(162,155,254,0.1));border-radius:14px;border:1px solid rgba(162,155,254,0.3)">' +
        '<label style="font-weight:700;color:#a29bfe;font-size:calc(0.85rem * var(--font-scale,1));display:block;margin-bottom:6px">📅 Fecha del Culto</label>' +
        '<input type="date" id="fv-fecha" value="' + fechaISO + '" style="width:100%;padding:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(162,155,254,0.3);border-radius:10px;color:#fff;font-size:16px;font-weight:600;outline:none;box-sizing:border-box;-webkit-appearance:none;color-scheme:dark">' +
        '</div>' +
        camposHtml +
        '<div style="margin-top:25px;display:grid;gap:10px">' +
        '<button id="fv-enviar" style="width:100%;padding:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:#fff;font-weight:900;font-size:calc(1.05rem * var(--font-scale,1));border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 6px 20px rgba(108,92,231,0.3);letter-spacing:0.5px;-webkit-appearance:none">' +
        '📤 ENVIAR PROGRAMA LLENADO' +
        '</button>' +
        '<button id="fv-copiar" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);font-weight:700;font-size:calc(0.85rem * var(--font-scale,1));border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;-webkit-appearance:none">' +
        '📋 COPIAR TEXTO' +
        '</button>' +
        '</div>' +
        '<div style="text-align:center;padding:18px 0 40px;color:rgba(255,255,255,0.2);font-size:0.7rem">Generado por Legado Bíblico</div>' +
        '</div>';

    document.body.appendChild(overlay);

    var todosInputs = overlay.querySelectorAll('input');
    todosInputs.forEach(function (inp) {
        inp.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });
        inp.addEventListener('focus', function () {
            this.style.borderColor = '#a29bfe';
            this.style.background = 'rgba(255,255,255,0.12)';
        });
        inp.addEventListener('blur', function () {
            this.style.borderColor = 'rgba(162,155,254,0.3)';
            this.style.background = 'rgba(255,255,255,0.08)';
        });
    });

    function _obtenerTextoFormulario() {
        var g = function (id) {
            var e = document.getElementById('fv-' + id);
            return e && e.value.trim() ? e.value.trim() : '---';
        };
        var lineas = [
            '⛪ *IGLESIA ADVENTISTA CYPRESS HILLS*',
            '📋 *PROGRAMA DE CULTO*',
            '📅 *Fecha:* ' + g('fecha'),
            '━━━━━━━━━━━━━━━━━',
            '1. Doxología: ' + g('doxologia'),
            '2. Invocación: ' + g('invocacion'),
            '3. Bienvenida: ' + g('bienvenida'),
            '4. Rincón Infantil: ' + g('infantil'),
            '5. Diezmos y Ofrendas: ' + g('ofrendas'),
            '6. Himno de Adoración: ' + g('himnoAdoracion'),
            '7. Lectura Bíblica: ' + g('lectura'),
            '8. Oración Intercesora: ' + g('oracion'),
            '9. Música Especial: ' + g('musica'),
            '━━━━━━━━━━━━━━━━━',
            '⛪ *10. Tema / Predicador:* ' + g('tema'),
            '━━━━━━━━━━━━━━━━━',
            '11. Himno Final: ' + g('himnoFinal'),
            '12. Oración Final: ' + g('oracionFinal'),
            '',
            '📱 _Legado Bíblico_'
        ];
        return lineas.join('\n');
    }

    document.getElementById('fv-cerrar').onclick = function () {
        overlay.remove();
        if (window.location.hash === '#planilla') {
            history.replaceState(null, '', window.location.pathname);
        }
    };

    // ENVIAR usa navigator.share para elegir app
    document.getElementById('fv-enviar').onclick = function () {
        var texto = _obtenerTextoFormulario();
        if (navigator.share) {
            navigator.share({ title: 'Programa de Culto - Cypress Hills', text: texto }).catch(function () { });
        } else {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(texto).then(function () {
                    if (typeof mostrarToast === 'function') mostrarToast('📋 ¡Texto copiado! Pégalo donde quieras');
                });
            } else {
                prompt('Copia este texto:', texto);
            }
        }
    };

    // COPIAR TEXTO
    document.getElementById('fv-copiar').onclick = function () {
        var texto = _obtenerTextoFormulario();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).then(function () {
                if (typeof mostrarToast === 'function') mostrarToast('📋 ¡Texto copiado! Pégalo donde quieras');
            }).catch(function () {
                prompt('Copia este texto:', texto);
            });
        } else {
            prompt('Copia este texto:', texto);
        }
    };
};

// ═══════════════════════════════════════════════════════
// 🔗 DETECTOR DE LINK #planilla — abre el formulario automáticamente
// ═══════════════════════════════════════════════════════

(function () {
    function _verificarHashPlanilla() {
        if (window.location.hash === '#planilla') {
            setTimeout(function () {
                if (typeof window.abrirPlanillaEditable === 'function') {
                    window.abrirPlanillaEditable();
                }
            }, 800);
        }
    }
    if (document.readyState === 'complete') {
        _verificarHashPlanilla();
    } else {
        window.addEventListener('load', _verificarHashPlanilla);
    }
    window.addEventListener('hashchange', _verificarHashPlanilla);
})();
