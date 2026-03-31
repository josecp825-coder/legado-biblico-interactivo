
        (function () {
            const CLAVE_PASO = 'legado_font_paso';
            const PASOS = [0.82, 0.9, 1.0, 1.1, 1.22, 1.38, 1.55, 1.75];
            let pasoActual = parseInt(localStorage.getItem(CLAVE_PASO) || '2');

            /* ── Aplica el tama�o a UN elemento ── */
            function aplicarAEl(el, tamRem) {
                el.style.setProperty('font-size', tamRem + 'rem', 'important');
            }

            /* ── Aplica a TODOS los .lectura-texto del DOM + actualiza variable ── */
            function aplicarEscala() {
                const escala = PASOS[pasoActual];
                const tamRem = parseFloat((escala * 1.08).toFixed(3));

                // Variable CSS ra�z
                document.documentElement.style.setProperty('--font-scale', escala);
                document.documentElement.style.setProperty('--font-lect', tamRem + 'rem');

                // Forzar en todos los elementos actuales (vence inline styles)
                document.querySelectorAll('.lectura-texto').forEach(el => aplicarAEl(el, tamRem));

                // Actualizar indicador
                const ind = document.getElementById('font-ind');
                if (ind) ind.textContent = Math.round(escala * 100) + '%';

                // Guardar preferencia
                localStorage.setItem(CLAVE_PASO, pasoActual);

                // Guardar tama�o actual globalmente para el Observer
                window._fontLectRem = tamRem;
            }

            /* ── MutationObserver: detecta elementos nuevos autom�ticamente ── */
            const observer = new MutationObserver(mutations => {
                const tam = window._fontLectRem;
                if (!tam) return;
                mutations.forEach(m => {
                    m.addedNodes.forEach(node => {
                        if (node.nodeType !== 1) return;
                        // El propio nodo
                        if (node.classList && node.classList.contains('lectura-texto')) {
                            aplicarAEl(node, tam);
                        }
                        // Sus hijos
                        node.querySelectorAll && node.querySelectorAll('.lectura-texto')
                            .forEach(el => aplicarAEl(el, tam));
                    });
                });
            });

            // Arrancar el observer cuando el body exista
            function iniciarObserver() {
                observer.observe(document.body, { childList: true, subtree: true });
            }

            /* ── API p�blica � SISTEMA UNIVERSAL v3 ── */
            window.fontMas = function () {
                console.log('[WIDGET] A+ pulsado');
                // 🔥 Detectar si estamos en el lector b�blico
                const vb = document.getElementById('verses-body');
                if (vb) {
                    // MANIPULACI�N DIRECTA del font-size del lector b�blico
                    let tam = parseFloat(vb.style.fontSize) || 1.15;
                    tam = Math.min(2.5, tam + 0.12);
                    vb.style.fontSize = tam + 'rem';
                    localStorage.setItem('bibleFontSize', tam);
                    mostrarToastFuente('🔤 Biblia: ' + Math.round(tam * 100) + '%');
                    pulsoWidget();
                    console.log('[WIDGET] Biblia fontSize:', tam);
                    return;
                }
                // Sistema lectura-texto (home, devocional)
                if (pasoActual < PASOS.length - 1) { pasoActual++; aplicarEscala(); }
                mostrarToastFuente(pasoActual >= PASOS.length - 1
                    ? '🔤 M�XIMO' : '🔤 ' + Math.round(PASOS[pasoActual] * 100) + '%');
                pulsoWidget();
            };

            window.fontMenos = function () {
                console.log('[WIDGET] A- pulsado');
                const vb = document.getElementById('verses-body');
                if (vb) {
                    let tam = parseFloat(vb.style.fontSize) || 1.15;
                    tam = Math.max(0.7, tam - 0.12);
                    vb.style.fontSize = tam + 'rem';
                    localStorage.setItem('bibleFontSize', tam);
                    mostrarToastFuente('🔤 Biblia: ' + Math.round(tam * 100) + '%');
                    pulsoWidget();
                    console.log('[WIDGET] Biblia fontSize:', tam);
                    return;
                }
                if (pasoActual > 0) { pasoActual--; aplicarEscala(); }
                mostrarToastFuente(pasoActual <= 0
                    ? '🔤 M�NIMO' : '🔤 ' + Math.round(PASOS[pasoActual] * 100) + '%');
                pulsoWidget();
            };

            // Llamar esto al final de cualquier funci�n de render din�mica
            window.refrescarFuente = aplicarEscala;

            /* ── Toast universal ── */
            function mostrarToastFuente(msg) {
                let toast = document.getElementById('font-toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'font-toast';
                    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) scale(0.8);background:rgba(13,10,35,0.95);color:#fff;padding:10px 24px;border-radius:30px;font-size:0.85rem;font-weight:900;z-index:100000000;opacity:0;transition:opacity 0.3s ease, transform 0.3s ease;pointer-events:none;backdrop-filter:blur(14px);box-shadow:0 4px 20px rgba(108,92,231,0.5);border:1px solid rgba(162,155,254,0.4);letter-spacing:1px;';
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(-50%) scale(1)';
                clearTimeout(window._fontToastTimer);
                window._fontToastTimer = setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(-50%) scale(0.8)';
                }, 1800);
            }

            function pulsoWidget() {
                const w = document.getElementById('font-widget');
                if (!w) return;
                w.style.transform = 'scale(1.15)';
                setTimeout(() => { w.style.transform = 'scale(1)'; }, 200);
            }

            document.addEventListener('DOMContentLoaded', () => {
                aplicarEscala();
                iniciarObserver();
            });
            if (document.readyState !== 'loading') {
                aplicarEscala();
                if (document.body) iniciarObserver();
            }
        })();
    