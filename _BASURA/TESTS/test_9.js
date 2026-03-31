
    (function() {
        function initDragWidget() {
            var w = document.getElementById('font-widget');
            var btnMenos = document.getElementById('fw-btn-menos');
            var btnMas   = document.getElementById('fw-btn-mas');
            if (!w) return;

            // Restaurar posicion guardada
            try {
                var saved = localStorage.getItem('fw_pos');
                if (saved) {
                    var p = JSON.parse(saved);
                    var maxT = window.innerHeight - 60, maxL = window.innerWidth - 140;
                    if (p.top >= 0 && p.top <= maxT && p.left >= 0 && p.left <= maxL) {
                        w.style.bottom = 'auto'; w.style.right = 'auto';
                        w.style.top = p.top + 'px'; w.style.left = p.left + 'px';
                    } else { localStorage.removeItem('fw_pos'); }
                }
            } catch(e) { localStorage.removeItem('fw_pos'); }

            var sx = 0, sy = 0, ol = 0, ot = 0, moved = false;
            var lastTap = 0;

            // ---- Botones A- / A+ con proteccion anti-drag ----
            btnMenos.addEventListener('click', function() { if (!moved && typeof fontMenos === 'function') fontMenos(); });
            btnMas.addEventListener('click',   function() { if (!moved && typeof fontMas   === 'function') fontMas();   });

            // ---- Drag con Pointer Events (no afecta otros toques) ----
            w.addEventListener('pointerdown', function(e) {
                // Doble toque para reset
                var now = Date.now();
                if (now - lastTap < 320) {
                    localStorage.removeItem('fw_pos');
                    w.style.cssText = w.style.cssText; // no-op forzar repaint
                    w.style.bottom = '22px'; w.style.left = '14px';
                    w.style.top = ''; w.style.right = '';
                    if (typeof mostrarToast === 'function') mostrarToast('Widget reseteado al lugar original');
                    lastTap = 0; return;
                }
                lastTap = now;
                var rect = w.getBoundingClientRect();
                sx = e.clientX; sy = e.clientY;
                ol = rect.left; ot = rect.top; moved = false;
                w.style.bottom = 'auto'; w.style.right = 'auto';
                w.style.left = rect.left + 'px'; w.style.top = rect.top + 'px';
                w.setPointerCapture(e.pointerId); // <-- solo captura ESTE dedo
            });

            w.addEventListener('pointermove', function(e) {
                var dx = e.clientX - sx, dy = e.clientY - sy;
                if (!moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
                moved = true;
                w.classList.add('dragging');
                var nx = Math.max(0, Math.min(window.innerWidth - w.offsetWidth,  ol + dx));
                var ny = Math.max(0, Math.min(window.innerHeight - w.offsetHeight, ot + dy));
                w.style.left = nx + 'px'; w.style.top = ny + 'px';
            });

            w.addEventListener('pointerup', function() {
                w.classList.remove('dragging');
                if (moved) {
                    localStorage.setItem('fw_pos', JSON.stringify({
                        top: parseInt(w.style.top), left: parseInt(w.style.left)
                    }));
                }
                setTimeout(function() { moved = false; }, 80);
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initDragWidget);
        } else { initDragWidget(); }
    })();
    