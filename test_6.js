
        // Funci�n global para ocultar el splash (llamada por checkVersion())
        window._ocultarSplash = function() {
            const splash = document.getElementById('pwa-splash');
            if (splash) {
                splash.classList.add('oculto');
                setTimeout(() => splash.remove(), 500);
            }
        };
        // Seguro m�ximo: si checkVersion() tarda m�s de 4s (sin internet), ocultar igual
        setTimeout(window._ocultarSplash, 4000);
    