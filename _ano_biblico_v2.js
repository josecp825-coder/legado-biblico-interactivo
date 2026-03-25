// ═══════════════════════════════════════════════════════════════
// 📅 AÑO BÍBLICO v2.1 — Seguimiento por capítulo individual
// Versión: 2.1 | Fecha: 2026-03-15
// Cada capítulo se marca leído → cambia de color en el dashboard
// ═══════════════════════════════════════════════════════════════

(function () {

    // ─── DATOS DEL PLAN ─────────────────────────────────────────
    var BIBLIA_AB = [
        ['Genesis',50],['Exodo',40],['Levitico',27],['Numeros',36],['Deuteronomio',34],
        ['Josue',24],['Jueces',21],['Rut',4],['1 Samuel',31],['2 Samuel',24],
        ['1 Reyes',22],['2 Reyes',25],['1 Cronicas',29],['2 Cronicas',36],['Esdras',10],
        ['Nehemias',13],['Ester',10],['Job',42],['Salmos',150],['Proverbios',31],
        ['Eclesiastes',12],['Cantares',8],['Isaias',66],['Jeremias',52],['Lamentaciones',5],
        ['Ezequiel',48],['Daniel',12],['Oseas',14],['Joel',3],['Amos',9],
        ['Abdias',1],['Jonas',4],['Miqueas',7],['Nahum',3],['Habacuc',3],
        ['Sofonias',3],['Hageo',2],['Zacarias',14],['Malaquias',4],
        ['Mateo',28],['Marcos',16],['Lucas',24],['Juan',21],['Hechos',28],
        ['Romanos',16],['1 Corintios',16],['2 Corintios',13],['Galatas',6],['Efesios',6],
        ['Filipenses',4],['Colosenses',4],['1 Tesalonicenses',5],['2 Tesalonicenses',3],
        ['1 Timoteo',6],['2 Timoteo',4],['Tito',3],['Filemon',1],['Hebreos',13],
        ['Santiago',5],['1 Pedro',5],['2 Pedro',3],['1 Juan',5],['2 Juan',1],
        ['3 Juan',1],['Judas',1],['Apocalipsis',22]
    ];

    var PLANES = {
        sprint:    { dias:7,   nombre:'Sprint Intensivo',    ico:'⚡', color:'#ff4757', desc:'~170 cap/día · 1 semana' },
        desafio45: { dias:45,  nombre:'Desafío 45 Días',     ico:'🔥', color:'#fdcb6e', desc:'~26 cap/día · 45 días' },
        trimestral:{ dias:90,  nombre:'Trimestral',          ico:'🚀', color:'#55efc4', desc:'~13 cap/día · 3 meses' },
        anual:     { dias:365, nombre:'Año Bíblico Clásico', ico:'📖', color:'#a29bfe', desc:'~3-4 cap/día · 1 año ⭐', popular:true },
        bianual:   { dias:730, nombre:'Paso a Paso',         ico:'🕊️', color:'#74b9ff', desc:'~1-2 cap/día · 2 años' }
    };

    var FRASES = [
        '"La Palabra de Dios es viva y eficaz." — Heb 4:12',
        '"Lámpara es tu Palabra a mis pies." — Sal 119:105',
        '"En el principio era el Verbo." — Juan 1:1',
        '"No solo de pan vivirá el hombre." — Mat 4:4',
        '"Toda Escritura es inspirada por Dios." — 2 Tim 3:16',
        '"Tu Palabra me ha vivificado." — Sal 119:50'
    ];

    var _abFontSize = parseFloat(localStorage.getItem('ab_font_size')) || 1.1;

    // ─── HELPERS MARCADOR DE VERSÍCULO ──────────────────────────
    // Guarda por dónde iba el usuario dentro de un capítulo

    function _getMarcador() {
        try { return JSON.parse(localStorage.getItem('ab_marcador') || 'null'); }
        catch(e) { return null; }
    }

    function _setMarcador(libro, cap, verso) {
        localStorage.setItem('ab_marcador', JSON.stringify({ libro:libro, cap:cap, verso:verso }));
    }

    function _quitarMarcador() {
        localStorage.removeItem('ab_marcador');
    }

    // ─── HELPERS NOTAS POR VERSÍCULO ──────────────────────────────

    function _notaKey(libro, cap, verso) { return 'ab_nota_' + libro + '|' + cap + '|' + verso; }

    function _getNota(libro, cap, verso) {
        return localStorage.getItem(_notaKey(libro, cap, verso)) || '';
    }

    function _setNota(libro, cap, verso, texto) {
        if (texto.trim()) localStorage.setItem(_notaKey(libro, cap, verso), texto.trim());
        else              localStorage.removeItem(_notaKey(libro, cap, verso));
    }

    function _tieneNota(libro, cap, verso) {
        var n = localStorage.getItem(_notaKey(libro, cap, verso));
        return !!(n && n.trim());
    }

    // ─── HELPERS CAPÍTULOS ────────────────────────────────────────

    // Clave única por capítulo: "Genesis|5"
    function _capKey(libro, cap) { return libro + '|' + cap; }

    function _getCapsLeidos() {
        try { return JSON.parse(localStorage.getItem('ab_caps_leidos') || '[]'); }
        catch(e) { return []; }
    }

    function _estaCapLeido(libro, cap) {
        return _getCapsLeidos().indexOf(_capKey(libro, cap)) !== -1;
    }

    function _marcarCapLeido(libro, cap) {
        var lista = _getCapsLeidos();
        var k = _capKey(libro, cap);
        if (lista.indexOf(k) === -1) {
            lista.push(k);
            localStorage.setItem('ab_caps_leidos', JSON.stringify(lista));
        }
    }

    function _desmarcarCapLeido(libro, cap) {
        var lista = _getCapsLeidos().filter(function(k) { return k !== _capKey(libro, cap); });
        localStorage.setItem('ab_caps_leidos', JSON.stringify(lista));
    }

    // Verifica si TODOS los capítulos del día están leídos → auto-completa el día
    function _verificarDiaCompleto(planKey, dia) {
        var caps = capitulosDia(planKey, dia);
        var todosLeidos = caps.every(function(c) { return _estaCapLeido(c.libro, c.cap); });
        if (todosLeidos) {
            var leidos = JSON.parse(localStorage.getItem('plan_dias_leidos') || '[]');
            if (leidos.indexOf(dia) === -1) {
                leidos.push(dia);
                localStorage.setItem('plan_dias_leidos', JSON.stringify(leidos));
                var racha = calcularRacha(leidos, dia);
                toast(racha >= 7 ? '🔥🔥 ¡' + racha + ' días! ¡IMPARABLE!' :
                      racha >= 3 ? '🔥 ¡Racha de ' + racha + ' días! ' :
                      '🎉 ¡Día ' + dia + ' completado! Todos los capítulos leídos');
            }
        }
        return todosLeidos;
    }

    // ─── HELPERS GENERALES ────────────────────────────────────────

    function slugLibro(l) {
        var m = {
            '1 Samuel':'1-samuel','2 Samuel':'2-samuel',
            '1 Reyes':'1-reyes','2 Reyes':'2-reyes',
            '1 Cronicas':'1-cronicas','2 Cronicas':'2-cronicas',
            '1 Tesalonicenses':'1-tesalonicenses','2 Tesalonicenses':'2-tesalonicenses',
            '1 Timoteo':'1-timoteo','2 Timoteo':'2-timoteo',
            '1 Pedro':'1-pedro','2 Pedro':'2-pedro',
            '1 Juan':'1-juan','2 Juan':'2-juan','3 Juan':'3-juan',
            '1 Corintios':'1-corintios','2 Corintios':'2-corintios'
        };
        return m[l] || l.toLowerCase().replace(/\s+/g,'-');
    }

    function totalCapsLibro(nombre) {
        for (var i=0; i<BIBLIA_AB.length; i++) {
            if (BIBLIA_AB[i][0] === nombre) return BIBLIA_AB[i][1];
        }
        return 1;
    }

    function generarTodosLosCapitulos() {
        var caps = [];
        BIBLIA_AB.forEach(function(b) {
            for (var c=1; c<=b[1]; c++) caps.push({ libro:b[0], cap:c });
        });
        return caps;
    }

    function capitulosDia(planKey, numeroDia) {
        var caps = generarTodosLosCapitulos();
        var cpd  = Math.ceil(caps.length / PLANES[planKey].dias);
        return caps.slice((numeroDia-1)*cpd, (numeroDia-1)*cpd + cpd);
    }

    function obtenerDatos() {
        var plan   = localStorage.getItem('plan_ano_biblico');
        var inicio = localStorage.getItem('plan_fecha_inicio');
        var leidos = JSON.parse(localStorage.getItem('plan_dias_leidos') || '[]');
        if (!plan || !inicio || !PLANES[plan]) return null;
        var hoy = new Date(); hoy.setHours(0,0,0,0);
        var fi  = new Date(inicio); fi.setHours(0,0,0,0);
        var diff = Math.floor((hoy - fi) / 86400000) + 1;
        var totalDias = PLANES[plan].dias;
        var diaCalendario = Math.max(1, Math.min(diff, totalDias));

        // Día en curso = primer día NO leído (donde el usuario se quedó)
        var diaEnCurso = 1;
        for (var d = 1; d <= totalDias; d++) {
            if (leidos.indexOf(d) === -1) { diaEnCurso = d; break; }
            diaEnCurso = d + 1; // todos leídos hasta aquí
        }
        diaEnCurso = Math.min(diaEnCurso, totalDias);

        return { plan, inicio:fi, leidos, diaActual:diaCalendario, diaCalendario:diaCalendario, diaEnCurso:diaEnCurso, totalDias };
    }

    function calcularRacha(leidos, diaActual) {
        var racha = 0;
        for (var d=diaActual; d>=1; d--) {
            if (leidos.indexOf(d) !== -1) racha++;
            else if (d < diaActual) break;
        }
        return racha;
    }

    function overlay() { return document.getElementById('ano-biblico-v2'); }
    function toast(msg) { if (typeof mostrarToast === 'function') mostrarToast(msg); }

    // ─── ESTILOS ──────────────────────────────────────────────────

    function _inyectarEstilos() {
        if (document.getElementById('ab-v2-styles')) return;
        var s = document.createElement('style');
        s.id = 'ab-v2-styles';
        s.textContent = `
            @keyframes ab_fadein { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
            @keyframes ab_slidein{ from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
            @keyframes ab_pulse  { 0%,100%{opacity:1} 50%{opacity:.5} }
            .ab-page { padding:20px;max-width:520px;margin:0 auto; }
            .ab-btn-primary { display:block;width:100%;padding:15px;
                background:linear-gradient(135deg,#00b894,#55efc4);
                border:none;border-radius:14px;color:#000;font-weight:900;
                font-size:.95rem;cursor:pointer;letter-spacing:.5px;
                box-shadow:0 6px 18px rgba(0,184,148,.3);
                transition:transform .15s; }
            .ab-btn-primary:active { transform:scale(.96); }
            .ab-btn-sec { display:block;width:100%;padding:13px;
                background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.15);
                border-radius:14px;color:rgba(255,255,255,.7);font-weight:700;
                font-size:.9rem;cursor:pointer; }
            .ab-card { background:rgba(255,255,255,.04);
                border:1.5px solid rgba(255,255,255,.09);
                border-radius:18px;padding:18px; }
            .ab-vers { display:flex;gap:10px;padding:10px 0;
                border-bottom:1px solid rgba(255,255,255,.06); }
            .ab-vers:last-child { border-bottom:none; }
            .ab-num { color:rgba(255,255,255,.3);font-size:.75rem;
                font-weight:900;min-width:26px;padding-top:2px;text-align:right; }
            .ab-txt { color:rgba(255,255,255,.88);line-height:1.65;flex:1; }

            /* Tarjeta de capítulo individual */
            .ab-cap-card {
                display:flex;align-items:center;gap:12px;
                padding:13px 16px;border-radius:14px;cursor:pointer;
                border:1.5px solid;margin-bottom:8px;
                transition:background .2s,border-color .2s,transform .12s;
            }
            .ab-cap-card:active { transform:scale(.98); }
            .ab-cap-card.leido {
                background:rgba(85,239,196,0.10);
                border-color:rgba(85,239,196,0.40);
            }
            .ab-cap-card.pendiente {
                background:rgba(255,255,255,0.04);
                border-color:rgba(255,255,255,0.12);
            }
            .ab-cap-icon { font-size:1.3rem;min-width:28px;text-align:center; }
            .ab-cap-info { flex:1; }
            .ab-cap-titulo { font-size:.9rem;font-weight:900; }
            .ab-cap-sub { font-size:.68rem;margin-top:2px;color:rgba(255,255,255,.4); }
            .ab-cap-check { font-size:1rem;font-weight:900; }

            /* Plan selector */
            .ab-plan-btn { padding:18px 20px;border-radius:18px;cursor:pointer;
                display:flex;align-items:center;gap:14px;
                border:2px solid transparent;
                transition:transform .15s; }
            .ab-plan-btn:active { transform:scale(.97); }
            .ab-stat { background:rgba(255,255,255,.04);
                border:1px solid rgba(255,255,255,.08);
                border-radius:14px;padding:14px;text-align:center; }
            .ab-cal-dia { text-align:center;flex:1;max-width:44px; }
            .ab-cal-circulo { width:38px;height:38px;border-radius:50%;
                display:flex;align-items:center;justify-content:center;
                margin:0 auto;font-size:.8rem;font-weight:900; }

            /* Loading spinner */
            .ab-loading { text-align:center;padding:50px 0; }
            .ab-loading-ico { font-size:2rem;animation:ab_pulse 1s infinite; }
        `;
        document.head.appendChild(s);
    }

    // ─── OVERLAY ──────────────────────────────────────────────────

    window.abrirAnoBiblico = function () {
        var datos = obtenerDatos();
        var ov = overlay();
        if (!ov) {
            ov = document.createElement('div');
            ov.id = 'ano-biblico-v2';
            ov.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#0a1628;z-index:60000;overflow-y:auto;box-sizing:border-box;animation:ab_fadein 0.25s ease-out;';
            _inyectarEstilos();
            document.body.appendChild(ov);
            history.pushState({ overlay:'ano-biblico-v2' }, '');
            window.addEventListener('popstate', function _closeAB() {
                var o = overlay(); if (o) o.remove();
                window.removeEventListener('popstate', _closeAB);
            });
        }
        if (datos) _renderDashboard(datos);
        else        _renderBienvenida();
    };

    // ─── PANTALLA 1: BIENVENIDA ────────────────────────────────────

    function _renderBienvenida() {
        var ov = overlay(); if (!ov) return;
        var frase = FRASES[Math.floor(Math.random() * FRASES.length)];
        var h = '<div class="ab-page">';
        h += '<div style="text-align:center;padding:32px 0 24px;">';
        h += '<div style="font-size:3.5rem;margin-bottom:10px;">🕊️</div>';
        h += '<h1 style="color:#a29bfe;font-size:1.7rem;font-weight:900;letter-spacing:1px;margin:0 0 8px;">RETO BÍBLICO ESPIRITUAL</h1>';
        h += '<p style="color:rgba(255,255,255,.45);font-size:.78rem;font-style:italic;max-width:280px;margin:0 auto;">' + frase + '</p>';
        h += '</div>';
        h += '<p style="color:rgba(255,255,255,.45);font-size:.8rem;font-weight:700;text-align:center;letter-spacing:1px;margin-bottom:16px;">ELIGE TU MISIÓN DE FE 🎯</p>';
        h += '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">';
        Object.keys(PLANES).forEach(function(k) {
            var p = PLANES[k];
            var esPop = !!p.popular;
            h += '<div class="ab-plan-btn" onclick="_AB_iniciarPlan(\'' + k + '\')" ';
            h += 'style="background:linear-gradient(135deg,rgba(255,255,255,' + (esPop?'.07':'.03') + '),rgba(0,0,0,0));';
            h += 'border-color:' + p.color + (esPop?'':' 44') + ';">';
            h += '<div style="font-size:1.7rem;">' + p.ico + '</div>';
            h += '<div style="flex:1;">';
            h += '<div style="color:' + p.color + ';font-weight:900;font-size:.95rem;">' + p.nombre.toUpperCase() + (esPop?' ⭐':'') + '</div>';
            h += '<div style="color:rgba(255,255,255,.4);font-size:.7rem;margin-top:2px;">' + p.desc + '</div>';
            h += '</div>';
            if (esPop) h += '<div style="background:' + p.color + '22;color:' + p.color + ';font-size:.58rem;font-weight:900;padding:3px 8px;border-radius:8px;">POPULAR</div>';
            h += '</div>';
        });
        h += '</div>';
        h += '<button class="ab-btn-sec" onclick="document.getElementById(\'ano-biblico-v2\').remove()">✕ Cerrar</button>';
        h += '</div>';
        ov.innerHTML = h;
        ov.scrollTop = 0;
    }

    window._AB_iniciarPlan = function(planKey) {
        if (!PLANES[planKey]) return;
        mostrarConfirm('📚 Iniciar "' + PLANES[planKey].nombre + '"', function() {
            localStorage.setItem('plan_ano_biblico',  planKey);
            localStorage.setItem('plan_fecha_inicio', new Date().toISOString().split('T')[0]);
            localStorage.setItem('plan_dias_leidos',  '[]');
            localStorage.removeItem('ab_caps_leidos');
            var datos = obtenerDatos();
            if (datos) _renderDashboard(datos, datos.diaEnCurso);
        });
    };

    // ─── PANTALLA 2: DASHBOARD ─────────────────────────────────────

    function _renderDashboard(datos, diaVer) {
        var ov = overlay(); if (!ov) return;
        // Por defecto abre donde el usuario se quedó (no el día de calendario)
        diaVer = (diaVer !== undefined) ? diaVer : datos.diaEnCurso;
        var p       = PLANES[datos.plan];
        var col     = p.color;
        var leidos  = datos.leidos;
        var pct     = Math.round((leidos.length / datos.totalDias) * 100);
        var racha   = calcularRacha(leidos, datos.diaActual);
        var caps    = capitulosDia(datos.plan, diaVer);
        var esHoy   = diaVer === datos.diaCalendario; // HOY = el día real del calendario
        var diaLeido = leidos.indexOf(diaVer) !== -1;

        // Calcular atraso
        var diasAtrasado = datos.diaCalendario - diaVer;
        var cpd = Math.ceil(1189 / datos.totalDias);
        var capsAtrasadas = diasAtrasado * cpd;

        // Cuenta cuántos capítulos del día ya están leídos
        var capsLeidos = caps.filter(function(c) { return _estaCapLeido(c.libro, c.cap); }).length;
        var capsTotal  = caps.length;
        var todoLeido  = capsLeidos === capsTotal;

        var h = '<div class="ab-page" style="animation:ab_slidein .2s;">';

        // ── BANNER DE ATRASO (si el día calendario > día donde se quedó) ──
        if (diasAtrasado > 0) {
            h += '<div style="display:flex;align-items:flex-start;gap:10px;padding:14px 16px;background:rgba(255,107,107,0.1);border:1.5px solid rgba(255,107,107,0.3);border-radius:14px;margin-bottom:16px;">';
            h += '<span style="font-size:1.4rem;line-height:1;">⏰</span>';
            h += '<div style="flex:1;">';
            h += '<div style="color:#ff6b6b;font-weight:900;font-size:.85rem;margin-bottom:3px;">¡La Palabra de Dios te espera! 💪</div>';
            h += '<div style="color:rgba(255,255,255,.5);font-size:.72rem;line-height:1.4;">El calendario marca la <b style="color:#ff6b6b;">misión ' + datos.diaCalendario + '</b>, pero vas en la <b style="color:#fff;">misión ' + diaVer + '</b>.<br>';
            h += 'Te faltan ~<b style="color:#fdcb6e;">' + capsAtrasadas + ' misiones</b> para ponerte al día.</div>';
            h += '</div>';
            h += '<button onclick="_AB_verDia(' + datos.diaCalendario + ')" style="padding:8px 10px;background:rgba(255,107,107,0.15);border:1px solid rgba(255,107,107,0.4);border-radius:10px;color:#ff6b6b;font-size:.7rem;font-weight:700;cursor:pointer;white-space:nowrap;">Ver hoy</button>';
            h += '</div>';
        }

        // Botón cambiar plan
        h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">';
        h += '<button onclick="_AB_confirmarCambiarPlan()" style="padding:10px 16px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.15);border-radius:12px;color:rgba(255,255,255,.6);font-size:.8rem;font-weight:700;cursor:pointer;">← Cambiar plan</button>';
        h += '</div>';

        // Nombre del plan + barra progreso
        h += '<div style="text-align:center;margin-bottom:20px;">';
        h += '<div style="font-size:2.2rem;margin-bottom:6px;">' + p.ico + '</div>';
        h += '<h2 style="color:' + col + ';font-size:1.1rem;font-weight:900;letter-spacing:2px;margin:0 0 4px;">' + p.nombre.toUpperCase() + '</h2>';
        h += '<p style="color:rgba(255,255,255,.35);font-size:.75rem;margin:0 0 14px;font-weight:700;">Misión ' + diaVer + ' de ' + datos.totalDias + (esHoy?' · HOY':'') + '</p>';
        h += '<div style="background:rgba(255,255,255,.06);border-radius:20px;height:24px;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);">';
        h += '<div style="background:linear-gradient(90deg,' + col + ',' + col + 'aa);height:100%;border-radius:20px;width:' + pct + '%;min-width:' + (pct>0?'28px':'0') + ';"></div>';
        h += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:.7rem;font-weight:900;text-shadow:0 1px 3px rgba(0,0,0,.6);">' + pct + '% de Victoria 🏆</div>';
        h += '</div>';
        h += '</div>';

        // Stats
        h += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px;">';
        h += '<div class="ab-stat"><div style="color:' + col + ';font-size:1.35rem;font-weight:900;">' + leidos.length + '</div><div style="color:rgba(255,255,255,.35);font-size:.58rem;margin-top:2px;">VICTORIAS 🌟</div></div>';
        h += '<div class="ab-stat"><div style="font-size:1.35rem;font-weight:900;">' + (racha>0?'🔥':'🧊') + ' ' + racha + '</div><div style="color:rgba(255,255,255,.35);font-size:.58rem;margin-top:2px;">FUEGO 🔥</div></div>';
        h += '<div class="ab-stat"><div style="color:#55efc4;font-size:1.35rem;font-weight:900;">' + (datos.totalDias-leidos.length) + '</div><div style="color:rgba(255,255,255,.35);font-size:.58rem;margin-top:2px;">MISIONES 🎯</div></div>';
        h += '</div>';

        // Lectura del día — cabecera
        h += '<div class="ab-card" style="border-color:' + (todoLeido?'rgba(85,239,196,.4)':col+'33') + ';background:rgba(' + (todoLeido?'85,239,196,0.07':'255,255,255,0.03') + ');margin-bottom:14px;">';
        h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">';
        h += '<div style="color:' + col + ';font-weight:900;font-size:.68rem;letter-spacing:2px;">' + (esHoy?'👑 MISIÓN DE HOY — ':'🎯 MISIÓN ') + diaVer + '</div>';
        h += '<div style="color:' + (todoLeido?'#55efc4':'rgba(255,255,255,.4)') + ';font-size:.7rem;font-weight:900;">' + capsLeidos + '/' + capsTotal + (todoLeido?' ✅':'') + '</div>';
        h += '</div>';

        // ── TARJETAS INDIVIDUALES POR CAPÍTULO ──
        caps.forEach(function(c) {
            var leido = _estaCapLeido(c.libro, c.cap);
            h += '<div class="ab-cap-card ' + (leido?'leido':'pendiente') + '" ';
            h += 'onclick="_AB_leerDesde(\'' + c.libro + '\',' + c.cap + ',' + diaVer + ')">';
            h += '<div class="ab-cap-icon">' + (leido ? '🏆' : '📜') + '</div>';
            h += '<div class="ab-cap-info">';
            h += '<div class="ab-cap-titulo" style="color:' + (leido?'#55efc4':'#fff') + ';">' + c.libro + '</div>';
            h += '<div class="ab-cap-sub">Capítulo ' + c.cap + '</div>';
            h += '</div>';
            h += '<div class="ab-cap-check" style="color:' + (leido?'#55efc4':col) + ';font-weight:' + (leido?'900':'700') + ';">' + (leido?'Cumplida ✅':'Cumplir →') + '</div>';
            h += '</div>';
        });

        h += '</div>'; // cierra ab-card

        // Navegación días
        h += '<div style="display:flex;gap:8px;margin-bottom:14px;">';
        if (diaVer > 1) h += '<button onclick="_AB_verDia(' + (diaVer-1) + ')" style="flex:1;padding:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:rgba(255,255,255,.5);font-size:.75rem;font-weight:700;cursor:pointer;">← Día ' + (diaVer-1) + '</button>';
        if (diaVer < datos.totalDias) h += '<button onclick="_AB_verDia(' + (diaVer+1) + ')" style="flex:1;padding:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:rgba(255,255,255,.5);font-size:.75rem;font-weight:700;cursor:pointer;">Día ' + (diaVer+1) + ' →</button>';
        h += '</div>';

        // Mini calendario
        h += '<div class="ab-card" style="margin-bottom:14px;">';
        h += '<div style="color:rgba(255,255,255,.3);font-size:.58rem;letter-spacing:2px;margin-bottom:12px;">ÚLTIMOS 7 DÍAS</div>';
        h += '<div style="display:flex;gap:5px;justify-content:center;">';
        var diasSem = ['D','L','M','X','J','V','S'];
        for (var i=6; i>=0; i--) {
            var d = datos.diaActual - i;
            if (d < 1) continue;
            var leidoD = leidos.indexOf(d) !== -1;
            var esEsteHoy = i === 0;
            var fd = new Date(datos.inicio); fd.setDate(fd.getDate() + d - 1);
            h += '<div class="ab-cal-dia">';
            h += '<div style="color:rgba(255,255,255,.3);font-size:.52rem;margin-bottom:3px;">' + diasSem[fd.getDay()] + '</div>';
            h += '<div class="ab-cal-circulo" style="background:' + (leidoD?col+'22':'rgba(255,255,255,.04)') + ';border:2px solid ' + (esEsteHoy?col:leidoD?col+'60':'rgba(255,255,255,.1)') + ';">';
            h += '<span style="color:' + (leidoD?'#55efc4':'rgba(255,255,255,.3)') + ';font-size:' + (leidoD?'.75rem':'.6rem') + ';">' + (leidoD?'✓':d) + '</span>';
            h += '</div></div>';
        }
        h += '</div></div>';

        // Cerrar
        h += '<button class="ab-btn-sec" onclick="document.getElementById(\'ano-biblico-v2\').remove()">✕ Cerrar</button>';
        h += '</div>';
        ov.innerHTML = h;
        ov.scrollTop = 0;
    }

    window._AB_verDia = function(dia) {
        var datos = obtenerDatos();
        if (datos) _renderDashboard(datos, dia);
    };

    window._AB_confirmarCambiarPlan = function() {
        mostrarConfirm('⚠️ ¿Cambiar de plan? Se perderá tu progreso.', function() {
            localStorage.removeItem('plan_ano_biblico');
            localStorage.removeItem('plan_fecha_inicio');
            localStorage.removeItem('plan_dias_leidos');
            localStorage.removeItem('ab_caps_leidos');
            _renderBienvenida();
        });
    };

    // ─── PANTALLA 3: LECTOR INTEGRADO ────────────────────────────

    window._AB_leerDesde = function(libro, cap, diaRef) {
        _renderLector(libro, parseInt(cap), parseInt(diaRef));
    };

    function _renderLector(libro, cap, diaRef) {
        var ov = overlay(); if (!ov) return;
        var totalCaps = totalCapsLibro(libro);
        var yaLeido   = _estaCapLeido(libro, cap);

        // Header pegado arriba
        function headerHTML() {
            return [
                '<div id="ab-lector-header" style="position:sticky;top:0;background:#0a1628;padding-bottom:12px;z-index:10;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:16px;">',
                '<button onclick="_AB_volverDashboard(' + diaRef + ')" style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.15);border-radius:12px;color:rgba(255,255,255,.7);font-size:.8rem;font-weight:700;cursor:pointer;margin-bottom:12px;width:100%;">← Volver a Misiones</button>',
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">',
                '<div>',
                '<div style="color:#fff;font-size:1.05rem;font-weight:900;">' + libro + ' ' + cap + '</div>',
                '<div style="color:rgba(255,255,255,.4);font-size:.68rem;">Misión ' + cap + ' de ' + totalCaps + '</div>',
                '</div>',
                '<div style="display:flex;gap:5px;">',
                '<button id="ab-btn-zen" onclick="window._AB_toggleZen()" style="display:flex;align-items:center;gap:4px;padding:0 10px;height:32px;background:linear-gradient(135deg,#a29bfe,#6c5ce7);border:none;border-radius:8px;color:#fff;font-weight:900;cursor:pointer;font-size:.75rem;transition:all 0.3s;box-shadow:0 3px 10px rgba(108,92,231,0.4);">🎧 Zen</button>',
                '<button onclick="_AB_fuenteMenos()" style="width:32px;height:32px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#fff;font-weight:900;cursor:pointer;font-size:.8rem;">A-</button>',
                '<button onclick="_AB_fuenteMas()" style="width:32px;height:32px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#fff;font-weight:900;cursor:pointer;font-size:.8rem;">A+</button>',
                '</div>',
                '</div>',
                '</div>'
            ].join('');
        }

        ov.innerHTML = '<div class="ab-page" style="animation:ab_slidein .2s;">' +
            headerHTML() +
            '<div id="ab-lector-body" class="ab-loading"><div class="ab-loading-ico">📜</div><div style="color:rgba(255,255,255,.4);font-size:.8rem;margin-top:10px;">Cargando misión ' + libro + ' ' + cap + '...</div></div>' +
            '</div>';
        ov.scrollTop = 0;

        // Fetch
        var slug = slugLibro(libro);
        var url  = (typeof BIBLIA_API_URL !== 'undefined' ? BIBLIA_API_URL : 'https://bible-api.deno.dev/api/read/') + 'rv1960/' + slug + '/' + cap;

        fetch(url).then(function(r) { return r.ok ? r.json() : null; })
        .then(function(data) {
            var body = document.getElementById('ab-lector-body');
            if (!body) return;
            if (!data || !data.vers || data.vers.length === 0) {
                body.innerHTML = '<div style="color:#ff6b6b;text-align:center;padding:40px;">No se pudo cargar.<br>Verifica tu conexión.</div>';
                return;
            }
            var yaLeidoNow = _estaCapLeido(libro, cap);
            var marcador   = _getMarcador();
            var versoMarcado = (marcador && marcador.libro === libro && marcador.cap === cap) ? marcador.verso : null;

            // ── Banner de retorno si hay marcador en este capítulo ──
            var banner = '';
            if (versoMarcado) {
                banner = '<div id="ab-banner-marcador" style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(253,203,110,0.12);border:1.5px solid rgba(253,203,110,0.4);border-radius:14px;margin-bottom:16px;">';
                banner += '<span style="font-size:1.3rem;">📌</span>';
                banner += '<div style="flex:1;">';
                banner += '<div style="color:#fdcb6e;font-weight:900;font-size:.85rem;">Te quedaste en el versículo ' + versoMarcado + '</div>';
                banner += '<div style="color:rgba(255,255,255,.4);font-size:.68rem;margin-top:1px;">Toca el versículo marcado para quitarlo</div>';
                banner += '</div>';
                banner += '<button onclick="_AB_irAVersiculo(' + versoMarcado + ')" style="padding:8px 14px;background:linear-gradient(135deg,#fdcb6e,#f39c12);border:none;border-radius:10px;color:#000;font-weight:900;font-size:.8rem;cursor:pointer;white-space:nowrap;">Ir aquí →</button>';
                banner += '</div>';
            }

            var versos = '';
            data.vers.forEach(function(v) {
                var esMarcado  = (v.number == versoMarcado);
                var tieneNota  = _tieneNota(libro, cap, v.number);
                // Estilo del versículo
                var estilo = 'cursor:pointer;';
                if (esMarcado) estilo = 'background:rgba(253,203,110,0.12);border-left:3px solid #fdcb6e;padding-left:10px;border-radius:8px;cursor:pointer;';
                else if (tieneNota) estilo = 'background:rgba(162,155,254,0.08);border-left:3px solid #a29bfe44;padding-left:10px;border-radius:8px;cursor:pointer;';

                versos += '<div class="ab-vers" id="av-' + v.number + '" onclick="_AB_abrirPanel(\'' + libro + '\',' + cap + ',' + v.number + ',' + diaRef + ')" style="' + estilo + '">';
                // Número / ícono
                if (esMarcado) versos += '<span class="ab-num" style="color:#fdcb6e;">📌</span>';
                else           versos += '<span class="ab-num">' + v.number + '</span>';
                versos += '<span class="ab-txt" style="font-size:' + _abFontSize + 'rem;">' + (v.verse || v.text || '') + '</span>';
                // Indicadores derechos
                versos += '<span style="min-width:20px;text-align:right;font-size:.75rem;">';
                if (tieneNota) versos += '📝';
                versos += '</span>';
                versos += '</div>';
                // Placeholder del panel de acción (se rellena dinámicamente)
                versos += '<div id="ab-panel-' + v.number + '" style="display:none;"></div>';
            });

            // Navegación capítulo
            var nav = '<div style="display:flex;gap:8px;margin-top:22px;justify-content:center;">';
            if (cap > 1) nav += '<button onclick="_AB_leerDesde(\'' + libro + '\',' + (cap-1) + ',' + diaRef + ')" style="padding:10px 18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:10px;color:rgba(255,255,255,.6);font-size:.8rem;font-weight:700;cursor:pointer;">← Cap ' + (cap-1) + '</button>';
            if (cap < totalCaps) nav += '<button onclick="_AB_leerDesde(\'' + libro + '\',' + (cap+1) + ',' + diaRef + ')" style="padding:10px 18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:10px;color:rgba(255,255,255,.6);font-size:.8rem;font-weight:700;cursor:pointer;">Cap ' + (cap+1) + ' →</button>';
            nav += '</div>';

            // Botón LEÍDO / estado
            var accion = '';
            if (!yaLeidoNow) {
                accion = '<button id="ab-btn-leido" class="ab-btn-primary" onclick="_AB_marcarCapituloLeido(\'' + libro + '\',' + cap + ',' + diaRef + ')" style="margin-top:20px;">✅ LEÍDO — ' + libro + ' ' + cap + '</button>';
            } else {
                accion = '<div style="display:flex;align-items:center;gap:10px;margin-top:20px;padding:14px 18px;background:rgba(85,239,196,.09);border:1.5px solid rgba(85,239,196,.3);border-radius:14px;">';
                accion += '<span style="font-size:1.3rem;">✅</span>';
                accion += '<div><div style="color:#55efc4;font-weight:900;font-size:.9rem;">' + libro + ' ' + cap + ' — Leído</div>';
                accion += '<div style="color:rgba(255,255,255,.4);font-size:.68rem;margin-top:2px;">Ya leíste este capítulo</div></div>';
                accion += '<button onclick="_AB_desmarcarCap(\'' + libro + '\',' + cap + ',' + diaRef + ')" style="margin-left:auto;padding:6px 12px;background:rgba(255,100,100,.1);border:1px solid rgba(255,100,100,.3);border-radius:8px;color:#ff6b6b;font-size:.7rem;font-weight:700;cursor:pointer;">↩ Quitar</button>';
                accion += '</div>';
            }

            body.innerHTML = banner + versos + nav + accion;
            body.style.textAlign = '';
            body.style.padding = '';
        })
        .catch(function() {
            var body = document.getElementById('ab-lector-body');
            if (body) body.innerHTML = '<div style="color:#ff6b6b;text-align:center;padding:40px;">Sin conexión a internet.</div>';
        });
    }

    // Toggle marcador de versículo (toca → marca, toca de nuevo → quita)
    window._AB_toggleMarcadorVerso = function(libro, cap, verso, diaRef) {
        var m = _getMarcador();
        var yaEste = m && m.libro === libro && m.cap === cap && m.verso == verso;
        if (yaEste) {
            _quitarMarcador();
            toast('📌 Marcador quitado');
        } else {
            _setMarcador(libro, cap, verso);
            toast('📌 Guardado en versículo ' + verso + ' — ' + libro + ' ' + cap);
        }
        // Actualizar el versículo visualmente sin recargar todo el capítulo
        var el = document.getElementById('av-' + verso);
        if (el) {
            if (yaEste) {
                // Quitar highlight
                el.style.background = '';
                el.style.borderLeft = '';
                el.style.paddingLeft = '';
                el.style.borderRadius = '';
                var numEl = el.querySelector('.ab-num');
                if (numEl) { numEl.style.color = ''; numEl.textContent = verso; }
            } else {
                // Poner highlight
                el.style.background = 'rgba(253,203,110,0.12)';
                el.style.borderLeft = '3px solid #fdcb6e';
                el.style.paddingLeft = '10px';
                el.style.borderRadius = '8px';
                var numEl = el.querySelector('.ab-num');
                if (numEl) { numEl.style.color = '#fdcb6e'; numEl.textContent = '📌'; }
            }
        }
        // Actualizar el banner superior
        var bannerEl = document.getElementById('ab-banner-marcador');
        if (yaEste) {
            if (bannerEl) bannerEl.remove();
        } else if (!bannerEl) {
            var body2 = document.getElementById('ab-lector-body');
            if (body2) {
                var nb = document.createElement('div');
                nb.id = 'ab-banner-marcador';
                nb.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(253,203,110,0.12);border:1.5px solid rgba(253,203,110,0.4);border-radius:14px;margin-bottom:16px;';
                nb.innerHTML = '<span style="font-size:1.3rem;">📌</span><div style="flex:1;"><div style="color:#fdcb6e;font-weight:900;font-size:.85rem;">Te quedaste en el versículo ' + verso + '</div><div style="color:rgba(255,255,255,.4);font-size:.68rem;margin-top:1px;">Toca el versículo para opciones</div></div>' +
                    '<button onclick="_AB_irAVersiculo(' + verso + ')" style="padding:8px 14px;background:linear-gradient(135deg,#fdcb6e,#f39c12);border:none;border-radius:10px;color:#000;font-weight:900;font-size:.8rem;cursor:pointer;white-space:nowrap;">Ir aquí →</button>';
                body2.insertBefore(nb, body2.firstChild);
            }
        }
    };

    // Scroll al versículo marcado
    window._AB_irAVersiculo = function(verso) {
        var el = document.getElementById('av-' + verso);
        if (el) el.scrollIntoView({ behavior:'smooth', block:'center' });
    };

    // ─── PANEL DE ACCIONES POR VERSÍCULO ──────────────────────────

    window._AB_abrirPanel = function(libro, cap, verso, diaRef) {
        // Cierra cualquier panel abierto
        document.querySelectorAll('[id^="ab-panel-"]').forEach(function(p) {
            p.style.display = 'none'; p.innerHTML = '';
        });
        var panelEl = document.getElementById('ab-panel-' + verso);
        if (!panelEl) return;

        var marcador = _getMarcador();
        var esMarcado = marcador && marcador.libro === libro && marcador.cap === cap && marcador.verso == verso;
        var nota = _getNota(libro, cap, verso);

        var h = '<div style="margin:4px 0 10px 0;padding:14px 16px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.12);border-radius:14px;animation:ab_fadein .15s;">';
        h += '<div style="color:rgba(255,255,255,.5);font-size:.65rem;letter-spacing:1.5px;margin-bottom:10px;">' + libro + ' ' + cap + ':' + verso + '</div>';
        h += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';

        // Botón marcador
        if (esMarcado) {
            h += '<button onclick="_AB_accionMarcador(\'' + libro + '\',' + cap + ',' + verso + ',false)" style="flex:1;padding:10px;background:rgba(253,203,110,0.15);border:1.5px solid rgba(253,203,110,0.4);border-radius:10px;color:#fdcb6e;font-size:.78rem;font-weight:800;cursor:pointer;">📌 Quitar marcador</button>';
        } else {
            h += '<button onclick="_AB_accionMarcador(\'' + libro + '\',' + cap + ',' + verso + ',true)" style="flex:1;padding:10px;background:rgba(253,203,110,0.08);border:1.5px solid rgba(253,203,110,0.2);border-radius:10px;color:rgba(253,203,110,0.8);font-size:.78rem;font-weight:800;cursor:pointer;">📌 Marcar aquí</button>';
        }
        // Botón nota
        h += '<button onclick="_AB_abrirEditor(\'' + libro + '\',' + cap + ',' + verso + ')" style="flex:1;padding:10px;background:rgba(162,155,254,0.1);border:1.5px solid rgba(162,155,254,' + (nota?'0.4':'0.2') + ');border-radius:10px;color:rgba(162,155,254,' + (nota?'1':'0.7') + ');font-size:.78rem;font-weight:800;cursor:pointer;">' + (nota ? '📝 Ver / Editar nota' : '📝 Añadir nota') + '</button>';

        h += '</div>';

        // Mostrar nota guardada
        if (nota) {
            h += '<div style="margin-top:10px;padding:10px 12px;background:rgba(162,155,254,0.08);border-radius:10px;border-left:3px solid #a29bfe;">';
            h += '<div style="color:rgba(255,255,255,.5);font-size:.6rem;letter-spacing:1px;margin-bottom:4px;">MI REFLEXIÓN</div>';
            h += '<div style="color:rgba(255,255,255,.8);font-size:.82rem;line-height:1.5;white-space:pre-wrap;">' + nota + '</div>';
            h += '</div>';
        }

        h += '<div id="ab-editor-' + verso + '" style="display:none;margin-top:10px;"></div>';
        h += '<button onclick="document.getElementById(\'ab-panel-' + verso + '\').style.display=\'none\'" style="width:100%;padding:8px;background:none;border:none;color:rgba(255,255,255,.25);font-size:.7rem;cursor:pointer;margin-top:8px;">✕ Cerrar</button>';
        h += '</div>';

        panelEl.innerHTML = h;
        panelEl.style.display = 'block';
        panelEl.scrollIntoView({ behavior:'smooth', block:'nearest' });
    };

    // Acción marcador desde el panel
    window._AB_accionMarcador = function(libro, cap, verso, poner) {
        if (poner) {
            _setMarcador(libro, cap, verso);
            toast('📌 Guardado en versículo ' + verso);
        } else {
            _quitarMarcador();
            toast('📌 Marcador quitado');
        }
        // Actualizar estilo del versículo
        var el = document.getElementById('av-' + verso);
        if (el) {
            el.style.background   = poner ? 'rgba(253,203,110,0.12)' : '';
            el.style.borderLeft   = poner ? '3px solid #fdcb6e' : '';
            el.style.paddingLeft  = poner ? '10px' : '';
            el.style.borderRadius = poner ? '8px' : '';
            var numEl = el.querySelector('.ab-num');
            if (numEl) { numEl.style.color = poner?'#fdcb6e':''; numEl.textContent = poner?'📌':verso; }
        }
        // Cerrar panel
        var panelEl = document.getElementById('ab-panel-' + verso);
        if (panelEl) { panelEl.style.display = 'none'; panelEl.innerHTML = ''; }
        // Banner
        var bannerEl = document.getElementById('ab-banner-marcador');
        if (!poner) { if (bannerEl) bannerEl.remove(); }
        else if (!bannerEl) {
            var body3 = document.getElementById('ab-lector-body');
            if (body3) {
                var nb2 = document.createElement('div');
                nb2.id = 'ab-banner-marcador';
                nb2.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(253,203,110,0.12);border:1.5px solid rgba(253,203,110,0.4);border-radius:14px;margin-bottom:16px;';
                nb2.innerHTML = '<span style="font-size:1.3rem;">📌</span><div style="flex:1;"><div style="color:#fdcb6e;font-weight:900;font-size:.85rem;">Te quedaste en el versículo ' + verso + '</div></div>' +
                    '<button onclick="_AB_irAVersiculo(' + verso + ')" style="padding:8px 14px;background:linear-gradient(135deg,#fdcb6e,#f39c12);border:none;border-radius:10px;color:#000;font-weight:900;font-size:.8rem;cursor:pointer;">Ir aquí →</button>';
                body3.insertBefore(nb2, body3.firstChild);
            }
        }
    };

    // Abrir editor de nota inline
    window._AB_abrirEditor = function(libro, cap, verso) {
        var editorEl = document.getElementById('ab-editor-' + verso);
        if (!editorEl) return;
        var notaActual = _getNota(libro, cap, verso);
        editorEl.innerHTML = [
            '<textarea id="ab-ta-' + verso + '" placeholder="Escribe tu reflexión sobre este versículo..." ',
            'style="width:100%;min-height:100px;background:rgba(255,255,255,.07);border:1.5px solid rgba(162,155,254,0.4);',
            'border-radius:10px;color:#fff;padding:12px;font-size:.85rem;line-height:1.6;resize:vertical;box-sizing:border-box;',
            'font-family:inherit;">' + notaActual + '</textarea>',
            '<div style="display:flex;gap:8px;margin-top:8px;">',
            '<button onclick="_AB_guardarNota(\'' + libro + '\',' + cap + ',' + verso + ')" class="ab-btn-primary" style="flex:1;padding:12px;font-size:.85rem;">💾 Guardar nota</button>',
            notaActual ? '<button onclick="_AB_borrarNota(\'' + libro + '\',' + cap + ',' + verso + ')" style="padding:12px 16px;background:rgba(255,100,100,.1);border:1px solid rgba(255,100,100,.3);border-radius:12px;color:#ff6b6b;font-weight:700;font-size:.8rem;cursor:pointer;">🗑️</button>' : '',
            '</div>'
        ].join('');
        editorEl.style.display = 'block';
        var ta = document.getElementById('ab-ta-' + verso);
        if (ta) ta.focus();
    };

    // Guardar nota
    window._AB_guardarNota = function(libro, cap, verso) {
        var ta = document.getElementById('ab-ta-' + verso);
        if (!ta) return;
        _setNota(libro, cap, verso, ta.value);
        toast('📝 Nota guardada — ' + libro + ' ' + cap + ':' + verso);
        // Actualizar indicador 📝 en el versículo
        var el = document.getElementById('av-' + verso);
        if (el) {
            var ind = el.querySelector('span:last-child');
            if (ind) ind.textContent = ta.value.trim() ? '📝' : '';
            if (ta.value.trim() && !el.style.borderLeft.includes('fdcb6e')) {
                el.style.background   = 'rgba(162,155,254,0.08)';
                el.style.borderLeft   = '3px solid #a29bfe44';
                el.style.paddingLeft  = '10px';
                el.style.borderRadius = '8px';
            }
        }
        var panelEl = document.getElementById('ab-panel-' + verso);
        if (panelEl) { panelEl.style.display = 'none'; panelEl.innerHTML = ''; }
    };

    // Borrar nota
    window._AB_borrarNota = function(libro, cap, verso) {
        mostrarConfirm('🗑️ ¿Eliminar esta reflexión?', function() {
            _setNota(libro, cap, verso, '');
            toast('🗑️ Nota eliminada');
            var el = document.getElementById('av-' + verso);
            if (el) {
                var ind = el.querySelector('span:last-child');
                if (ind) ind.textContent = '';
                el.style.background = ''; el.style.borderLeft = '';
                el.style.paddingLeft = ''; el.style.borderRadius = '';
            }
            var panelEl = document.getElementById('ab-panel-' + verso);
            if (panelEl) { panelEl.style.display = 'none'; panelEl.innerHTML = ''; }
        });
        return; // la lógica de eliminación visual ya está dentro del callback
        var el = document.getElementById('av-' + verso);
        if (el) {
            var ind = el.querySelector('span:last-child');
            if (ind) ind.textContent = '';
            el.style.background = ''; el.style.borderLeft = '';
            el.style.paddingLeft = ''; el.style.borderRadius = '';
        }
        var panelEl = document.getElementById('ab-panel-' + verso);
        if (panelEl) { panelEl.style.display = 'none'; panelEl.innerHTML = ''; }
    };

    window._AB_marcarCapituloLeido = function(libro, cap, diaRef) {
        _marcarCapLeido(libro, cap);
        // Verificar si el día entero está completo
        var datos = obtenerDatos();
        if (datos) _verificarDiaCompleto(datos.plan, diaRef);
        // Actualizar el botón inline sin recargar toda la pantalla
        var btn = document.getElementById('ab-btn-leido');
        if (btn) {
            var contenedor = btn.parentNode;
            var nuevo = document.createElement('div');
            nuevo.style.cssText = 'display:flex;align-items:center;gap:10px;margin-top:20px;padding:14px 18px;background:rgba(85,239,196,.09);border:1.5px solid rgba(85,239,196,.3);border-radius:14px;';
            nuevo.innerHTML = '<span style="font-size:1.3rem;">✅</span><div><div style="color:#55efc4;font-weight:900;font-size:.9rem;">' + libro + ' ' + cap + ' — Leído</div><div style="color:rgba(255,255,255,.4);font-size:.68rem;margin-top:2px;">¡Excelente!</div></div>' +
                '<button onclick="_AB_desmarcarCap(\'' + libro + '\',' + cap + ',' + diaRef + ')" style="margin-left:auto;padding:6px 12px;background:rgba(255,100,100,.1);border:1px solid rgba(255,100,100,.3);border-radius:8px;color:#ff6b6b;font-size:.7rem;font-weight:700;cursor:pointer;">↩ Quitar</button>';
            contenedor.replaceChild(nuevo, btn);
        }
        toast('✅ ' + libro + ' ' + cap + ' marcado como leído');
    };

    window._AB_desmarcarCap = function(libro, cap, diaRef) {
        _desmarcarCapLeido(libro, cap);
        // Quitar el día si estaba completo
        var leidos = JSON.parse(localStorage.getItem('plan_dias_leidos') || '[]');
        leidos = leidos.filter(function(d) { return d !== diaRef; });
        localStorage.setItem('plan_dias_leidos', JSON.stringify(leidos));
        _renderLector(libro, parseInt(cap), parseInt(diaRef));
    };

    window._AB_volverDashboard = function(diaRef) {
        var datos = obtenerDatos();
        if (datos) _renderDashboard(datos, diaRef);
    };

    window._AB_navCap = function(libro, cap, diaRef) {
        _renderLector(libro, cap, diaRef);
    };

    window._AB_fuenteMenos = function() {
        _abFontSize = Math.max(0.8, _abFontSize - 0.1);
        localStorage.setItem('ab_font_size', _abFontSize);
        document.querySelectorAll('.ab-txt').forEach(function(el) { el.style.fontSize = _abFontSize + 'rem'; });
    };

    window._AB_fuenteMas = function() {
        _abFontSize = Math.min(1.9, _abFontSize + 0.1);
        localStorage.setItem('ab_font_size', _abFontSize);
        document.querySelectorAll('.ab-txt').forEach(function(el) { el.style.fontSize = _abFontSize + 'rem'; });
    };

    // 🎧 LÓGICA DEL MODO ZEN (INMERSIÓN)
    var zenAudio = null;
    window._AB_toggleZen = function() {
        if (!zenAudio) {
            zenAudio = new Audio('musica_fondo.mp3');
            zenAudio.loop = true;
            zenAudio.volume = 0.4; // Volumen suave para no interrumpir lectura
        }
        
        var btn = document.getElementById('ab-btn-zen');
        if (zenAudio.paused) {
            zenAudio.play().then(function() {
                if(btn) {
                    btn.innerHTML = '⏸️ Zen';
                    btn.style.boxShadow = '0 0 15px rgba(108,92,231,0.8)';
                    btn.style.transform = 'scale(1.05)';
                }
                toast('🎧 Modo Zen Activado. Disfruta tu lectura.');
            }).catch(function(e) {
                toast('⚠️ No se encontró la pista. Sube "musica_fondo.mp3" al servidor.');
            });
        } else {
            zenAudio.pause();
            if(btn) {
                btn.innerHTML = '🎧 Zen';
                btn.style.boxShadow = '0 3px 10px rgba(108,92,231,0.4)';
                btn.style.transform = 'scale(1)';
            }
            toast('🔇 Modo Zen Pausado.');
        }
    };

})(); // fin módulo
