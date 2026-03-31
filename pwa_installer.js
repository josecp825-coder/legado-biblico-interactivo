// ==============================================================================
// 📱 INSTALADOR INTELIGENTE (PWA SMART INSTALLER)
// Detecta si el usuario está en versión "Navegador" o "App Instalada".
// Si está en el navegador, le arroja una tarjeta Premium para enseñarle
// gráficamente cómo instalar la app según su dispositivo (Apple o Android).
// ==============================================================================

(function() {
    let deferredPrompt;
    
    // Capturamos el evento oficial de Chrome (Android) para instalar PWA
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevenir que el navegador muestre su aviso automático aburrido
        e.preventDefault();
        // Guardamos el evento para dispararlo cuando el usuario presione NUESTRO botón
        deferredPrompt = e;
    });

    document.addEventListener('DOMContentLoaded', () => {
        // 1. Validar si YA estamos dentro de la App Instalada (Standalone Mode)
        const isStandalone = window.navigator.standalone || 
                             window.matchMedia('(display-mode: standalone)').matches || 
                             window.matchMedia('(display-mode: fullscreen)').matches || 
                             window.matchMedia('(display-mode: minimal-ui)').matches;
        
        if (isStandalone) {
            console.log("🌟 PWA Smart Installer: Ejecutándose en Modo App. Nada que mostrar.");
            return;
        }

        // 2. Validar si el usuario le dio a "Omitir por ahora" hoy
        // (No queremos molestarlo infinitamente si de verdad no quiere instalar hoy)
        const omitidoFecha = localStorage.getItem('pwa_installer_omitido');
        const hoyStr = new Date().toISOString().split('T')[0];
        if (omitidoFecha === hoyStr) return;

        // 3. Detectar Sistema Operativo
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        const isAndroid = /android/i.test(ua);

        // Si es computadora de escritorio y no tiene el evento asíncrono listo, no molestamos al inicio.
        // Pero si es un celular, le damos prioridad.
        if (!isIOS && !isAndroid) return; // Mejor omitir en PC por ahora para no romper la estética

        // 4. Inyectar Estilos del Asistente
        const st = document.createElement('style');
        st.innerHTML = `
            @keyframes pwaSlideUp { from { transform: translateY(110%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes pwaFadeBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            
            #pwa-smart-banner {
                position: fixed; bottom: 0; left: 0; right: 0; 
                background: rgba(10, 22, 40, 0.95);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                border-top: 1.5px solid rgba(255,255,255,0.1);
                border-top-left-radius: 28px; border-top-right-radius: 28px;
                padding: 24px 20px; z-index: 999999;
                box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
                animation: pwaSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                font-family: system-ui, -apple-system, sans-serif;
            }
            @media all and (display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui) {
                #pwa-smart-banner { display: none !important; }
            }
            
            .pwa-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
            .pwa-logo { width: 50px; height: 50px; border-radius: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
            .pwa-title { color: #fff; font-size: 1.15rem; font-weight: 900; margin: 0 0 2px 0; }
            .pwa-desc { color: rgba(255,255,255,0.6); font-size: 0.8rem; line-height: 1.4; margin: 0; }
            
            .pwa-btn-install {
                display: block; width: 100%; padding: 14px;
                background: linear-gradient(135deg, #00b894, #55efc4);
                border: none; border-radius: 14px; color: #000; font-weight: 900;
                font-size: 0.95rem; cursor: pointer; text-align: center;
                box-shadow: 0 6px 20px rgba(0, 184, 148, 0.3); transition: transform 0.2s;
            }
            .pwa-btn-install:active { transform: scale(0.96); }
            
            .pwa-btn-skip {
                display: block; width: 100%; padding: 12px; margin-top: 8px;
                background: transparent; border: none; color: rgba(255,255,255,0.4);
                font-size: 0.75rem; font-weight: 700; cursor: pointer; text-align: center;
            }
            
            /* Flecha guía exclusiva para Apple (Apunta abajo) */
            #pwa-ios-guide {
                display: none; text-align: center; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 15px;
            }
            .pwa-ios-icon {
                display: inline-block; padding: 4px 8px; background: rgba(255,255,255,0.15); 
                border-radius: 6px; font-weight: bold; margin: 0 4px; border: 1px solid rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(st);

        // 5. Construir HTML del Panel
        const banner = document.createElement('div');
        banner.id = 'pwa-smart-banner';
        
        let html = `
            <div class="pwa-header">
                <img src="./icon-192.png" class="pwa-logo" alt="Legado Bíblico Logo">
                <div>
                    <h3 class="pwa-title">Instala la App Oficial</h3>
                    <p class="pwa-desc">Guarda en la nube, escucha música fondo y lee sin distracciones.</p>
                </div>
            </div>
        `;

        if (isIOS) {
            // VERSIÓN APPLE: Instrucciones visuales paso a paso
            html += `<button id="pwa-btn-action" class="pwa-btn-install" style="background: linear-gradient(135deg, #0984e3, #74b9ff); color: #fff;">Ver cómo instalar en iPhone 🍏</button>`;
            html += `
                <div id="pwa-ios-guide">
                    <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;line-height:1.6;margin:0 0 10px 0;">
                        1. Toca <span class="pwa-ios-icon">↑</span> el botón compartir debajo en Safari.<br>
                        2. Desliza y toca <strong>"Agregar a Inicio (+)"</strong>.
                    </p>
                    <div style="font-size:2rem; animation: pwaFadeBounce 1.5s infinite; color:#74b9ff;">👇</div>
                </div>
            `;
        } else {
            // VERSIÓN ANDROID: Uso del evento oficial o fallback
            html += `<button id="pwa-btn-action" class="pwa-btn-install">🤖 Instalar Aplicación Gratis</button>`;
        }

        html += `<button id="pwa-btn-skip" class="pwa-btn-skip">Quizás otro día</button>`;
        banner.innerHTML = html;
        document.body.appendChild(banner);

        // 6. Lógicas de los Botones
        document.getElementById('pwa-btn-skip').addEventListener('click', () => {
            localStorage.setItem('pwa_installer_omitido', hoyStr);
            banner.style.transform = 'translateY(110%)';
            banner.style.transition = 'transform 0.4s ease';
            setTimeout(() => banner.remove(), 400);
        });

        document.getElementById('pwa-btn-action').addEventListener('click', async () => {
            if (isIOS) {
                // Desplega la guía de instrucciones apuntando abajo
                document.getElementById('pwa-ios-guide').style.display = 'block';
                document.getElementById('pwa-btn-action').style.display = 'none';
            } else {
                // Es Android, lanzamos el prompt nativo
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    if (outcome === 'accepted') {
                        console.log('✅ El usuario aceptó instalar la PWA');
                        banner.remove(); // Desaparecemos el banner porque Chrome se encarga
                    }
                    deferredPrompt = null;
                } else {
                    // Fallback visual si el evento falló o ya navegó mucho (Android 3 puntos)
                    document.getElementById('pwa-btn-action').innerHTML = 'Toca los 3 puntitos (⋮) arriba a la derecha y selecciona "Instalar App" o "Añadir a Inicio" 📱';
                    document.getElementById('pwa-btn-action').style.background = 'transparent';
                    document.getElementById('pwa-btn-action').style.boxShadow = 'none';
                    document.getElementById('pwa-btn-action').style.border = '1px solid rgba(255,255,255,0.2)';
                    document.getElementById('pwa-btn-action').style.color = '#fff';
                    document.getElementById('pwa-btn-action').style.fontSize = '0.8rem';
                }
            }
        });
    });

})();
