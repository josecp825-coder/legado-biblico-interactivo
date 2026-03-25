    // 🛡️ CONFIRMAR GLOBAL — Redirigido desde data_motor
    window.mostrarConfirm = function(mensaje, onConfirm) {
        try {
            const prev = document.getElementById('_confirm-modal-legado');
            if (prev) prev.remove();
            const modal = document.createElement('div');
            modal.id = '_confirm-modal-legado';
            modal.style.cssText = 'position:fixed;inset:0;z-index:9999999;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);animation:fadeIn 0.15s ease;';
            modal.innerHTML = '<div style="background:#0f172a;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px 24px;max-width:320px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.7);text-align:center;">' +
                '<div style="font-size:2rem;margin-bottom:10px;">⚠️</div>' +
                '<div style="color:#fff;font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:24px;">' + mensaje + '</div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
                '<button id="_confirm-no" style="padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);border-radius:12px;cursor:pointer;font-weight:700;font-size:0.9rem;">Cancelar</button>' +
                '<button id="_confirm-si" style="padding:12px;background:linear-gradient(135deg,#e17055,#ff6b6b);border:none;color:#fff;border-radius:12px;cursor:pointer;font-weight:900;font-size:0.9rem;">Confirmar</button>' +
                '</div></div>';
            document.body.appendChild(modal);
            document.getElementById('_confirm-no').onclick = function() { modal.remove(); };
            document.getElementById('_confirm-si').onclick = function() {
                try {
                    modal.remove();
                    if (typeof onConfirm === 'function') onConfirm();
                } catch(fatal1) { alert("X1 -> " + fatal1.message); }
            };
            modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
        } catch(fatal0) { alert("X0 -> " + fatal0.message); }
    };

    let usuarioActual = { nombre: localStorage.getItem('legado_user_name') || "Invitado", nivel: "" };

        window.onload = () => {
            // 🔧 BUG-2 FIX: Limpiar hash al abrir la app — siempre mostrar la pantalla de inicio
            if (location.hash && location.hash.length > 1) {
                history.replaceState(null, '', location.pathname);
            }
            const savedName = localStorage.getItem('legado_user_name');
            if (savedName) document.getElementById('nombre-usuario').value = savedName;

            // v149: Ya no mostramos el selector compacto visible, se carga bajo demanda
            // Precargamos la lógica de la Biblia para que esté lista
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

        // ═══════════════════════════════════════════
        // 📖 LEER LA BIBLIA — Abre el selector de versiones
        // ═══════════════════════════════════════════
        function abrirSelectorBiblias() {
            // Por ahora abre directamente el selector de libros RVR60
            // En el futuro aquí irá el selector de versiones
            const sel = document.getElementById('bible-home-selector');
            if (sel) sel.style.display = 'none';
            // M3 FIX: Guard si expandirSelectorBiblia no está lista aún
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
            // Limpiar pantalla-estudio para que no quede contenido detrás
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

        // ════════════════════════���══════════════════
        // 🤝 VERSÍCULOS DE ALIENTO — Acceso directo
        // ═══════════════════════════════════════════
        function abrirAliento() {
            // Abrir el selector de Biblia primero
            abrirSelectorBiblias();
            // Cambiar a la pestaña ALIENTO automáticamente
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
            // Restaurar la pantalla que corresponde según donde estaba el usuario
            const pa = window._pantallaActual;
            if      (pa === 'iglesia')      renderModuloIglesia();
            else if (pa === 'adolescentes') renderModuloAdolescentes();
            else if (pa === 'kids')         renderModuloNinos();
            else if (pa === 'jovenes')      renderModuloJovenes();
            else if (pa === 'adultos')      renderModuloAdultos();
            else                            volverMenuPrincipal(); // 'inicio' = home
        }

        // ═══════════════════════════════════════════
        // 🙏 DEVOCIONAL — Abre overlay con devocional completo
        // ═══════════════════════════════════════════
        function abrirDevocional() {
            const icono = document.getElementById('dev-icon')?.textContent || '🙏';
            const titulo = document.getElementById('dev-label')?.textContent || 'Devocional del Día';
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
                        <div style="color:rgba(253,203,110,0.6);font-size:0.55rem;letter-spacing:3px;">LEGADO BÍBLICO</div>
                        <div style="color:#fdcb6e;font-weight:900;font-size:0.85rem;letter-spacing:1px;">DEVOCIONAL DEL DÍA</div>
                    </div>
                </div>

                <div style="padding:24px 20px;max-width:600px;margin:0 auto;">
                    <!-- Ícono y título -->
                    <div style="text-align:center;margin-bottom:28px;">
                        <div style="font-size:3.5rem;margin-bottom:12px;">${icono}</div>
                        <h1 style="color:#fff;font-size:1.2rem;font-weight:900;margin:0 0 6px;line-height:1.4;">${titulo}</h1>
                        <div style="color:rgba(255,255,255,0.3);font-size:0.65rem;letter-spacing:2px;">REFLEXIÓN DIARIA</div>
                    </div>

                    <!-- Versículo -->
                    <div style="background:rgba(253,203,110,0.06);border:1px solid rgba(253,203,110,0.2);border-radius:16px;padding:20px;margin-bottom:20px;">
                        <p style="font-family:'Crimson Text',serif;font-size:1.1rem;line-height:1.7;color:#f0f0ff;font-style:italic;margin:0 0 10px;border-left:3px solid #fdcb6e;padding-left:14px;">${vers}</p>
                        <div style="font-size:0.7rem;color:#fdcb6e;font-weight:900;letter-spacing:2px;">${ref}</div>
                    </div>

                    <!-- Reflexión -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px;margin-bottom:24px;">
                        <div style="color:rgba(162,155,254,0.7);font-size:0.6rem;letter-spacing:3px;margin-bottom:12px;">💭 REFLEXIÓN</div>
                        <p style="color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.85;margin:0;">${reflex}</p>
                    </div>

                    <!-- Botones de compartir dual -->
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button id="btn-comp-texto" onclick="compartirDevocionalTexto()" style="
                            flex:1; padding:14px;
                            background:linear-gradient(135deg,#25D366,#128C7E);
                            border:none; border-radius:14px; color:#fff;
                            font-weight:900; font-size:0.85rem; cursor:pointer;
                            box-shadow:0 6px 20px rgba(37,211,102,0.3);
                        ">💬 SOLO TEXTO</button>

                        <button id="btn-comp-img" onclick="compartirDevocionalImagen()" style="
                            flex:1; padding:14px;
                            background:linear-gradient(135deg,#6c5ce7,#a29bfe);
                            border:none; border-radius:14px; color:#fff;
                            font-weight:900; font-size:0.85rem; cursor:pointer;
                            box-shadow:0 6px 20px rgba(108,92,231,0.3);
                        ">📸 TARJETA VISUAL</button>
                    </div>
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

        function compartirDevocionalTexto() {
            const icono = document.getElementById('dev-icon')?.textContent || '🙏';
            const titulo = document.getElementById('dev-label')?.textContent || 'Devocional del Día';
            const vers = document.getElementById('dev-versiculo')?.textContent || '';
            const ref = document.getElementById('dev-referencia')?.textContent || '';
            const reflex = document.getElementById('dev-reflexion')?.textContent || '';

            const mensaje =
                `${icono} *DEVOCIONAL DEL DÍA — LEGADO BÍBLICO*\n` +
                `*${titulo}*\n\n` +
                `📖 ${vers}\n` +
                `${ref}\n\n` +
                `💭 _${reflex}_\n\n` +
                `_— Compartido desde Legado Bíblico App 📱_`;

            if (navigator.share) {
                navigator.share({ title: 'Devocional del Día - Legado Bíblico', text: mensaje }).catch(() => { });
            } else {
                navigator.clipboard?.writeText(mensaje).then(() => {
                    mostrarToast('✅ Devocional copiado al portapapeles');
                });
            }
        }

        async function compartirDevocionalImagen() {
            const fBtn = document.getElementById('btn-comp-img');
            const originalText = fBtn.innerText;
            fBtn.innerText = "⏳ CREANDO TARJETA...";
            fBtn.disabled = true;
            
            const icono = document.getElementById('dev-icon')?.textContent || '🙏';
            const titulo = document.getElementById('dev-label')?.textContent || 'Devocional del Día';
            
            // Limpiar comillas repetidas y guiones repetidos
            let vers = document.getElementById('dev-versiculo')?.textContent || '';
            vers = vers.replace(/^["“”']+|["“”']+$/g, '').trim(); 
            
            let ref = document.getElementById('dev-referencia')?.textContent || '';
            ref = ref.replace(/^[-—\s]+/, '').trim(); 
            
            const reflex = document.getElementById('dev-reflexion')?.textContent || '';

            // Crear un contenedor temporal moderno en el DOM (Ancho ampliado para mejor legibilidad)
            const tarjContainer = document.createElement('div');
            // Fondo intermedio elegante: Slate Gray (#1E293B) - Ni tan claro como el blanco, ni tan oscuro como el negro
            tarjContainer.style.cssText = "position:absolute; left:-9999px; top:-9999px; width:800px; background:#1E293B; color:#F8FAFC; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding:55px; overflow:hidden;";
            
            // =========================================================================
            // 🔒 [CANDADO REGLA GLOBAL] - PLANTILLA OFICIAL DEVOCIONALES
            // Esta plantilla HTML de la Tarjeta Visual ha sido aprobada como la versión 
            // FINAL Y OFICIAL (v396). NO debe ser alterada, mejorada ni modificada por 
            // la IA a menos que el Creador lo ordene con instrucciones explícitas.
            // =========================================================================
            tarjContainer.innerHTML = `
                <div style="position:relative; z-index:2; border-radius:16px; background:#1E293B; border:1px solid rgba(255,255,255,0.1); text-align:left;">
                    
                    <!-- ENCABEZADO FINAL: LOGO PNG TRANSPARENTE GIGANTE SOBRE FONDO PIZARRA -->
                    <div style="text-align:center; margin-bottom:10px; padding:10px 20px 20px 20px;">
                        <img src="logo_oficial.png" style="width:500px; height:auto; margin:-20px auto 25px auto; display:block;" />
                        <h1 style="font-size:48px; margin:0; color:#F1F5F9; font-weight:900; line-height:1.2;">${titulo}</h1>
                    </div>
                    
                    <!-- CONTENIDO DE LECTURA (PIZARRA OSCURO) -->
                    <div style="padding:10px 40px 40px 40px;">
                        <!-- VERSICULO GIGANTE -->
                        <div style="font-size:38px; font-style:italic; line-height:1.4; color:#E2E8F0; border-left:8px solid #fdcb6e; padding-left:35px; margin-bottom:20px; font-family:'Georgia', serif;">
                            "${vers}"
                        </div>
                        <div style="color:#fdcb6e; font-size:26px; font-weight:bold; margin-bottom:50px; margin-left:40px;">— ${ref}</div>
                        
                        <!-- REFLEXION (MÁS GRANDE) -->
                        <div style="margin-top:20px; background:rgba(255,255,255,0.03); border-radius:12px; padding:30px;">
                            <p style="font-size:38px; line-height:1.6; color:#F8FAFC; margin:0; font-weight:400;">
                                ${reflex}
                            </p>
                        </div>
                        
                        <!-- FOOTER -->
                        <div style="text-align:center; margin-top:60px; padding-top:40px; border-top:1px solid rgba(255,255,255,0.1);">
                            <span style="font-size:24px; font-weight:700; color:#94A3B8; letter-spacing:2px;">COMPARTIDO DESDE LA APP OFICIAL</span>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(tarjContainer);

            try {
                // Esperamos activamente a que el Logo se haya descargado al DOM antes del pantallazo
                await new Promise((resolve) => {
                    const imgTest = new Image();
                    imgTest.onload = resolve;
                    imgTest.onerror = resolve; 
                    imgTest.src = 'logo_oficial.png';
                    setTimeout(resolve, 2000); // 2 segundos de timeout si hay red lenta
                });

                // Generar Canvas rápido (useCORS asegura la imagen cruzada)
                const canvas = await html2canvas(tarjContainer, { scale: 2, backgroundColor: '#1E293B', useCORS: true });
                document.body.removeChild(tarjContainer); // Limpieza instantánea para evitar lag
                
                canvas.toBlob(async (blob) => {
                    const file = new File([blob], 'devocional.jpg', { type: 'image/jpeg', lastModified: Date.now() });
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        try {
                            await navigator.share({
                                files: [file],
                                title: titulo,
                                text: '📖 Reflexión diaria de Legado Bíblico'
                            });
                        } catch(e) { }
                    } else {
                        // Fallback: Descargar
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = 'devocional.jpg';
                        a.click();
                        mostrarToast('📸 Imagen descargada. ¡Adjúntala a WhatsApp!');
                    }
                    fBtn.innerText = "📸 TARJETA VISUAL";
                    fBtn.disabled = false;
                }, 'image/jpeg', 0.95);
            } catch(e) {
                console.error("Error canvas", e);
                document.body.removeChild(tarjContainer);
                fBtn.innerText = "📸 TARJETA VISUAL";
                fBtn.disabled = false;
                mostrarToast('❌ Error creando imagen');
            }
        }

        // === AÑO BÍBLICO v2 === Ver: _ano_biblico_v2.js ===

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

        // Función central de navegación: registra y renderiza
        window.irAPantalla = function (nombre, fnRender) {
            window._pantallaActual = nombre;
            history.pushState({ p: nombre }, '', location.pathname + '#' + nombre);
            fnRender();
        };

        // El boton ATRAS del celular/navegador
        // BUG-2 FIX: Ahora cubre TODOS los modulos correctamente
        window.addEventListener('popstate', function (e) {
            // Primero: ¿Hay un context-card abierto? Cerrarlo sin destruir nada
            const ctxCard = document.querySelector('#context-card.active, .context-card.active');
            if (ctxCard) {
                cerrarContexto();
                history.pushState({ p: window._pantallaActual }, '');
                return;
            }
            // Segundo: ¿Hay un overlay de Biblia abierto? Cerrarlo
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
            // Tercero: ¿Estamos en el reader de Biblia? Volver al selector
            // BUG-1+M2 FIX: Limpiar estado del lector ANTES de abrir el selector
            const floatingNav = document.getElementById('floating-bible-nav');
            if (floatingNav) {
                // Limpiar panel flotante y clase del body
                if (typeof window._limpiarBarraLector === 'function') {
                    window._limpiarBarraLector();
                }
                document.body.classList.remove('lector-biblico-activo');
                // Pequeño delay para que el DOM procese la limpieza antes del render
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
            { t: "Porque yo sé los pensamientos que tengo acerca de vosotros...", r: "Jeremías 29:11" },
            { t: "Todo lo puedo en Cristo que me fortalece.", r: "Filipenses 4:13" },
            { t: "No temas, porque yo estoy contigo.", r: "Isaías 41:10" },
            { t: "El Señor es mi pastor, nada me faltará.", r: "Salmos 23:1" },
            { t: "Sean vuestras costumbres sin avaricia, contentos con lo que tenéis.", r: "Hebreos 13:5" },
            { t: "Busquen primeramente el reino de Dios y su justicia.", r: "Mateo 6:33" }
        ];

        function cargarVersiculoDelDia() {
            // BUG-1 FIX: Proteccion null-check — evita error si los IDs no existen en el DOM
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
            const texto = document.getElementById('main-verse-text').innerText;
            const ref = document.getElementById('main-verse-ref').innerText;
            navigator.clipboard.writeText(`${texto} - ${ref}\n\nEnviado desde Legado Bíblico App`).then(() => {
                alert("🎁 ¡Versículo copiado para compartir!");
            });
        }

        // superHuracanUpdate() definida al inicio del body - versión atómica única

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Registrar SW — solo cachear archivos, NO disparar recargas extras
                navigator.serviceWorker.register('/sw.js').then(reg => {
                    reg.update();
                    // ✅ Sin onupdatefound, sin controllerchange, sin message listener
                    // El ÚNICO mecanismo de actualización es checkVersion() (al inicio del HEAD)
                }).catch(e => console.warn('[SW] Error registro:', e));
            });
        }