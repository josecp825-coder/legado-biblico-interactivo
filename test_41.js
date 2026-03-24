
        let usuarioActual = { nombre: localStorage.getItem('legado_user_name') || "Invitado", nivel: "" };

        window.onload = () => {
            // 🔧 BUG-2 FIX: Limpiar hash al abrir la app � siempre mostrar la pantalla de inicio
            if (location.hash && location.hash.length > 1) {
                history.replaceState(null, '', location.pathname);
            }
            const savedName = localStorage.getItem('legado_user_name');
            if (savedName) document.getElementById('nombre-usuario').value = savedName;

            // v149: Ya no mostramos el selector compacto visible, se carga bajo demanda
            // Precargamos la l�gica de la Biblia para que est� lista
            if (typeof mostrarBibleCompacto === 'function') {
                mostrarBibleCompacto(); // Carga en el contenedor oculto
            }
            cargarVersiculoDelDia();

            db.collection(".health_check").doc("status").get().then(() => {
                document.getElementById('db-dot').style.backgroundColor = '#2ed573';
                document.getElementById('db-text').innerText = 'CONECTADO A LA NUBE';
            }).catch(() => {
                document.getElementById('db-text').innerText = 'MODO LOCAL PROTEGIDO';
            });
        };

        // �������������������������������������������
        // 📖 LEER LA BIBLIA � Abre el selector de versiones
        // �������������������������������������������
        function abrirSelectorBiblias() {
            // Por ahora abre directamente el selector de libros RVR60
            // En el futuro aqu� ir� el selector de versiones
            const sel = document.getElementById('bible-home-selector');
            if (sel) sel.style.display = 'none';
            // M3 FIX: Guard si expandirSelectorBiblia no est� lista a�n
            if (typeof expandirSelectorBiblia !== 'function') {
                mostrarToast('📖 Cargando Biblia...');
                return;
            }
            // Eliminar overlay existente si hay uno (evitar apilar)
            const existente = document.getElementById('biblia-overlay');
            if (existente) existente.remove();

            // Limpiar la barra flotante del lector que se queda encima
            const barraNav = document.getElementById('floating-bible-nav');
            if (barraNav) barraNav.remove();
            // Limpiar pantalla-estudio para que no quede contenido detr�s
            const pantalla = document.getElementById('pantalla-estudio');
            if (pantalla) pantalla.innerHTML = '';

            // Mostramos el selector en un overlay fullscreen
            const overlay = document.createElement('div');
            overlay.id = 'biblia-overlay';
            overlay.style.cssText = `
                position:fixed; top:0; left:0; width:100%; height:100%;
                background:#0F172A; z-index:50000; overflow-y:auto;
                padding:20px; box-sizing:border-box;
                animation: devFadeIn 0.3s ease-out;
            `;
            overlay.innerHTML = `
                <div style="max-width:600px; margin:0 auto;">
                    <div id="biblia-overlay-selector"></div>
                </div>
            `;
            document.body.appendChild(overlay);
            history.pushState({ overlay: 'biblia' }, '');

            // Renderizar el selector dentro del overlay
            setTimeout(() => {
                if (typeof renderSelectorLibrosPrincipal === 'function') {
                    renderSelectorLibrosPrincipal('biblia-overlay-selector');
                }
                if (typeof renderHistorialRelampago === 'function') {
                    renderHistorialRelampago();
                }
            }, 100);
        }

        // �������������������������������������������
        // � VERS�CULOS DE ALIENTO � Acceso directo
        // �������������������������������������������
        function abrirAliento() {
            // Abrir el selector de Biblia primero
            abrirSelectorBiblias();
            // Cambiar a la pesta�a ALIENTO autom�ticamente
            setTimeout(() => {
                if (typeof cambiarModoSelectorBiblia === 'function') {
                    cambiarModoSelectorBiblia('aliento');
                }
            }, 200);
        }

        function cerrarBibliaOverlay() {
            const ov = document.getElementById('biblia-overlay');
            if (ov) ov.remove();
            // BUG-1 FIX FINAL: limpiar el lector y restaurar la pantalla debajo
            if (typeof window._limpiarBarraLector === 'function') {
                window._limpiarBarraLector();
            }
            document.body.classList.remove('lector-biblico-activo');
            // Restaurar la pantalla que corresponde seg�n donde estaba el usuario
            const pa = window._pantallaActual;
            if      (pa === 'iglesia')      renderModuloIglesia();
            else if (pa === 'adolescentes') renderModuloAdolescentes();
            else if (pa === 'kids')         renderModuloNinos();
            else if (pa === 'jovenes')      renderModuloJovenes();
            else if (pa === 'adultos')      renderModuloAdultos();
            else                            volverMenuPrincipal(); // 'inicio' = home
        }

        // �������������������������������������������
        // � DEVOCIONAL � Abre overlay con devocional completo
        // �������������������������������������������
        function abrirDevocional() {
            const icono = document.getElementById('dev-icon')?.textContent || '�';
            const titulo = document.getElementById('dev-label')?.textContent || 'Devocional del D�a';
            const vers = document.getElementById('dev-versiculo')?.textContent || '';
            const ref = document.getElementById('dev-referencia')?.textContent || '';
            const reflex = document.getElementById('dev-reflexion')?.textContent || '';

            const overlay = document.createElement('div');
            overlay.id = 'devocional-overlay';
            overlay.style.cssText = `
                position:fixed;inset:0;z-index:10000;
                background:linear-gradient(170deg,#0a0818,#1a0f3c,#0a0818);
                overflow-y:auto;padding:0;
                animation:devFadeIn 0.3s ease-out;
            `;
            overlay.innerHTML = `
                <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(253,203,110,0.25);position:sticky;top:0;z-index:101;">
                    <button onclick="cerrarDevocionalOverlay()" style="background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.3);color:#fdcb6e;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:700;">✕ CERRAR</button>
                    <div style="flex:1;">
                        <div style="color:rgba(253,203,110,0.6);font-size:0.55rem;letter-spacing:3px;">LEGADO B�BLICO</div>
                        <div style="color:#fdcb6e;font-weight:900;font-size:0.85rem;letter-spacing:1px;">DEVOCIONAL DEL D�A</div>
                    </div>
                </div>

                <div style="padding:24px 20px;max-width:600px;margin:0 auto;">
                    <!-- �cono y t�tulo -->
                    <div style="text-align:center;margin-bottom:28px;">
                        <div style="font-size:3.5rem;margin-bottom:12px;">${icono}</div>
                        <h1 style="color:#fff;font-size:1.2rem;font-weight:900;margin:0 0 6px;line-height:1.4;">${titulo}</h1>
                        <div style="color:rgba(255,255,255,0.3);font-size:0.65rem;letter-spacing:2px;">REFLEXI�N DIARIA</div>
                    </div>

                    <!-- Vers�culo -->
                    <div style="background:rgba(253,203,110,0.06);border:1px solid rgba(253,203,110,0.2);border-radius:16px;padding:20px;margin-bottom:20px;">
                        <p style="font-family:'Crimson Text',serif;font-size:1.1rem;line-height:1.7;color:#f0f0ff;font-style:italic;margin:0 0 10px;border-left:3px solid #fdcb6e;padding-left:14px;">${vers}</p>
                        <div style="font-size:0.7rem;color:#fdcb6e;font-weight:900;letter-spacing:2px;">${ref}</div>
                    </div>

                    <!-- Reflexi�n -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px;margin-bottom:24px;">
                        <div style="color:rgba(162,155,254,0.7);font-size:0.6rem;letter-spacing:3px;margin-bottom:12px;">💭 REFLEXI�N</div>
                        <p style="color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.85;margin:0;">${reflex}</p>
                    </div>

                    <!-- Bot�n compartir -->
                    <button onclick="compartirDevocional()" style="
                        width:100%;padding:14px;
                        background:linear-gradient(135deg,#6c5ce7,#a29bfe);
                        border:none;border-radius:14px;color:#fff;
                        font-weight:900;font-size:0.9rem;cursor:pointer;
                        box-shadow:0 6px 20px rgba(108,92,231,0.3);
                    ">📤 COMPARTIR DEVOCIONAL</button>
                </div>
            `;
            document.body.appendChild(overlay);
            history.pushState({ devocional: true }, '');
            window.addEventListener('popstate', function devPop() {
                cerrarDevocionalOverlay();
                window.removeEventListener('popstate', devPop);
            }, { once: true });
        }

        function cerrarDevocionalOverlay() {
            const ov = document.getElementById('devocional-overlay');
            if (ov) ov.remove();
        }

        // ���������������������������������������������������������������
        // 📤 COMPARTIR DEVOCIONAL � Genera imagen visual premium v369
        // Genera tarjeta PNG con logo, vers�culo y reflexi�n usando Canvas
        // ���������������������������������������������������������������
        function compartirDevocional() {
            const icono    = document.getElementById('dev-icon')?.textContent || '📖';
            const titulo   = document.getElementById('dev-label')?.textContent || 'Devocional del Día';
            const vers     = document.getElementById('dev-versiculo')?.textContent || '';
            const ref      = document.getElementById('dev-referencia')?.textContent || '';
            const reflex   = document.getElementById('dev-reflexion')?.textContent || '';

            _compartirTextoDevocional(icono, titulo, vers, ref, reflex);
        }

        // ─── FALLBACK TEXTO ──────────────────────────────────────────
        function _compartirTextoDevocional(ic, tit, v, r2, rx) {
            const msg = `${ic} *DEVOCIONAL DEL DÍA — LEGADO BÍBLICO*\n*${tit}*\n\n📖 ${v}\n${r2}\n\n💭 _${rx}_\n\n_📱 Compartido desde Legado Bíblico_`;
            if (navigator.share) {
                navigator.share({ title: 'Devocional del Día - Legado Bíblico', text: msg }).catch(() => {});
            } else {
                navigator.clipboard?.writeText(msg).then(() => mostrarToast('✅ Devocional copiado'));
            }
        }

        // === A�O B�BLICO v2 === Ver: _ano_biblico_v2.js ===

        function cerrarContexto() {
            document.querySelectorAll('#context-card, .context-card, #context-card-doctrinas').forEach(el => el.classList.remove('active'));
        }

        function mostrarToast(msg) {
            const t = document.createElement('div');
            t.className = 'toast-msg';
            t.innerText = msg;
            document.body.appendChild(t);
            setTimeout(() => {
                t.style.opacity = '0';
                setTimeout(() => t.remove(), 500);
            }, 3000);
        }

        function inyectarEstilosDoctrinaPro() {
            if (!document.getElementById('estilo-doctrina-pro')) {
                const style = document.createElement('style');
                style.id = 'estilo-doctrina-pro';
                style.innerHTML = `
                    .card-doctrina-v28 { transition: 0.3s; }
                    .card-doctrina-v28:hover { transform: translateY(-5px); border-color: #a29bfe !important; }
                `;
                document.head.appendChild(style);
            }
        }

        function seleccionarNivel(nivel) {
            let nombre = document.getElementById('nombre-usuario').value.trim() || 'Invitado' + Math.floor(Math.random() * 900 + 100);
            localStorage.setItem('legado_user_name', nombre);
            usuarioActual.nombre = nombre;
            usuarioActual.nivel = nivel;

            iniciarSesionFirebase(nombre, nivel);

            const intro = document.querySelector('.intro-container');
            intro.style.opacity = '0';
            setTimeout(() => {
                intro.style.display = 'none';
                const pantalla = document.getElementById('pantalla-estudio');
                pantalla.className = `container-estudio theme-${nivel} is-active`;

                // BUG-2 FIX: Todos los modulos registran su pantalla en el historial
                // para que el boton ATRAS del celular funcione correctamente en todos
                if (nivel === 'adolescentes') irAPantalla('adolescentes', renderModuloAdolescentes);
                else if (nivel === 'kids') irAPantalla('kids', renderModuloNinos);
                else if (nivel === 'jovenes') irAPantalla('jovenes', renderModuloJovenes);
                else if (nivel === 'adultos') irAPantalla('adultos', renderModuloAdultos);
                else if (nivel === 'iglesia') irAPantalla('iglesia', renderModuloIglesia);
                window.scrollTo(0, 0);
            }, 500);
        }

        function entrarComoInvitado() {
            document.getElementById('nombre-usuario').value = 'Invitado' + Math.floor(Math.random() * 900 + 100);
        }

        function volverMenuPrincipal() {
            // Limpiar overlays que puedan estar encima
            const bibliaOv = document.getElementById('biblia-overlay');
            if (bibliaOv) bibliaOv.remove();

            const pantalla = document.getElementById('pantalla-estudio');
            const intro = document.querySelector('.intro-container');
            if (!pantalla || !intro) return;
            pantalla.innerHTML = '';
            pantalla.className = 'container-estudio';
            intro.style.transition = 'none';
            intro.style.opacity = '0';
            intro.style.display = '';
            requestAnimationFrame(() => {
                intro.style.transition = 'opacity 0.4s ease';
                intro.style.opacity = '1';
            });
            window.scrollTo(0, 0);
        }


        // =============================================
        // SISTEMA DE NAVEGACION - BOTON ATRAS FISICO
        // =============================================
        // Pantalla actual registrada globalmente
        window._pantallaActual = 'inicio';

        // Funci�n central de navegaci�n: registra y renderiza
        window.irAPantalla = function (nombre, fnRender) {
            window._pantallaActual = nombre;
            history.pushState({ p: nombre }, '', location.pathname + '#' + nombre);
            fnRender();
        };

        // El boton ATRAS del celular/navegador
        // BUG-2 FIX: Ahora cubre TODOS los modulos correctamente
        window.addEventListener('popstate', function (e) {
            // Primero: �Hay un context-card abierto? Cerrarlo sin destruir nada
            const ctxCard = document.querySelector('#context-card.active, .context-card.active');
            if (ctxCard) {
                cerrarContexto();
                history.pushState({ p: window._pantallaActual }, '');
                return;
            }
            // Segundo: �Hay un overlay de Biblia abierto? Cerrarlo
            // BUG-1 FIX REAL: floating-bible-nav vive DENTRO de biblia-overlay,
            // por eso el Check3 (floatingNav) nunca se ejecutaba.
            // Al borrar el overlay hay que limpiar el lector Y restaurar la pantalla debajo.
            const bibliaOv = document.getElementById('biblia-overlay');
            if (bibliaOv) {
                bibliaOv.remove();
                // Limpiar el panel flotante "OCULTAR BARRA" que queda en el body
                if (typeof window._limpiarBarraLector === 'function') {
                    window._limpiarBarraLector();
                }
                document.body.classList.remove('lector-biblico-activo');
                // Restaurar la pantalla correcta debajo del overlay
                const pa = window._pantallaActual;
                if      (pa === 'iglesia')      renderModuloIglesia();
                else if (pa === 'adolescentes') renderModuloAdolescentes();
                else if (pa === 'kids')         renderModuloNinos();
                else if (pa === 'jovenes')      renderModuloJovenes();
                else if (pa === 'adultos')      renderModuloAdultos();
                else                            volverMenuPrincipal(); // 'inicio' = home
                history.pushState({ p: window._pantallaActual }, '');
                return;
            }
            // Tercero: �Estamos en el reader de Biblia? Volver al selector
            // BUG-1+M2 FIX: Limpiar estado del lector ANTES de abrir el selector
            const floatingNav = document.getElementById('floating-bible-nav');
            if (floatingNav) {
                // Limpiar panel flotante y clase del body
                if (typeof window._limpiarBarraLector === 'function') {
                    window._limpiarBarraLector();
                }
                document.body.classList.remove('lector-biblico-activo');
                // Peque�o delay para que el DOM procese la limpieza antes del render
                setTimeout(() => abrirSelectorBiblias(), 50);
                history.pushState({ p: window._pantallaActual }, '');
                return;
            }

            const p = e.state ? e.state.p : 'inicio';
            window._pantallaActual = p;
            // Renderizar la pantalla correcta sin volver a empujar historial
            if (p === 'iglesia') { renderModuloIglesia(); }
            else if (p === 'adolescentes') { renderModuloAdolescentes(); }
            else if (p === 'kids') { renderModuloNinos(); }
            else if (p === 'jovenes') { renderModuloJovenes(); }
            else if (p === 'adultos') { renderModuloAdultos(); }
            else { volverMenuPrincipal(); } // 'inicio' o cualquier otro = menu
        });


        const VERSICULOS_BANCO = [
            { t: "Limpia mi camino con tu palabra.", r: "Salmos 119:9" },
            { t: "Porque yo s� los pensamientos que tengo acerca de vosotros...", r: "Jerem�as 29:11" },
            { t: "Todo lo puedo en Cristo que me fortalece.", r: "Filipenses 4:13" },
            { t: "No temas, porque yo estoy contigo.", r: "Isa�as 41:10" },
            { t: "El Se�or es mi pastor, nada me faltar�.", r: "Salmos 23:1" },
            { t: "Sean vuestras costumbres sin avaricia, contentos con lo que ten�is.", r: "Hebreos 13:5" },
            { t: "Busquen primeramente el reino de Dios y su justicia.", r: "Mateo 6:33" }
        ];

        function cargarVersiculoDelDia() {
            // BUG-1 FIX: Proteccion null-check � evita error si los IDs no existen en el DOM
            const el1 = document.getElementById('main-verse-text');
            const el2 = document.getElementById('main-verse-ref');
            if (!el1 || !el2) return; // Los elementos no existen en esta version del HTML
            const dia = new Date().getDate();
            const index = dia % VERSICULOS_BANCO.length;
            const item = VERSICULOS_BANCO[index];
            el1.innerText = `"${item.t}"`;
            el2.innerText = item.r;
        }

        function copiarVersiculo() {
            const el1 = document.getElementById('main-verse-text');
            const el2 = document.getElementById('main-verse-ref');
            if (!el1 || !el2) { mostrarToast('⚠� Vers�culo no disponible'); return; }
            const texto = el1.innerText;
            const ref = el2.innerText;
            navigator.clipboard.writeText(`${texto} - ${ref}\n\nEnviado desde Legado B�blico App`).then(() => {
                mostrarToast('� �Vers�culo copiado para compartir!');
            }).catch(() => mostrarToast('�� No se pudo copiar el vers�culo'));
        }

        // superHuracanUpdate() definida al inicio del body - versi�n at�mica �nica

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Registrar SW � solo cachear archivos, NO disparar recargas extras
                navigator.serviceWorker.register('/sw.js').then(reg => {
                    reg.update();
                    // ✅ Sin onupdatefound, sin controllerchange, sin message listener
                    // El �NICO mecanismo de actualizaci�n es checkVersion() (al inicio del HEAD)
                }).catch(e => console.warn('[SW] Error registro:', e));
            });
        }
    