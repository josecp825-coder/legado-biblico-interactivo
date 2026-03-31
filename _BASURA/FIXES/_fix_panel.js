const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_motor.js';
let c = fs.readFileSync(FILE, 'utf8');

// El bloque roto va desde linea 1761 (despues de appendChild(s)) hasta linea 1812 (cierre de funcion)
// Buscamos inicio y fin exactos
const INICIO = '    // Marcar body como lector activo (oculta el widget inferior derecho)';
const FIN = '}\n\n// ===============================================\n// \uD83E\uDD1D VERS\u00CDCULOS DE ALIENTO';

const idxIni = c.indexOf(INICIO);
const idxFin = c.indexOf('}\r\n\r\n// ===============================================\r\n// \uD83E\uDD1D VERS');
if (idxFin < 0) {
    // Intentar con LF
    const idxFin2 = c.indexOf('}\n\n// ===============================================\n// \uD83E\uDD1D VERS');
    if (idxFin2 < 0) { console.log('ERROR fin no encontrado'); process.exit(1); }
}

console.log('idxIni:', idxIni, 'idxFin buscando...');

// Buscar el cierre } de la funcion inyectarEstilosLectura
// La funcion cierra con "}\n" antes de "// === VERSICULOS"
let idxFinReal = -1;
// Buscamos "}, 500);\r\n}" o similar cerca del fin del bloque
const patterns = [
    '    }, 500);\r\n}\r\n\r\n// ===',
    '    }, 500);\n}\n\n// ===',
    '}, 500);\r\n}\r\n\r\n// ===',
];
for (var p of patterns) {
    var idx = c.indexOf(p, idxIni);
    if (idx >= 0) { idxFinReal = idx + p.indexOf('\r\n}\r\n\r\n') + 1; break; }
}

// Alternativa: buscar la siguiente funcion
if (idxFinReal < 0) {
    const sig = c.indexOf('// ===', idxIni + 100);
    // Retroceder hasta encontrar el }
    let i = sig - 1;
    while (i > idxIni && c[i] !== '}') i--;
    idxFinReal = i + 1;
    console.log('usando alternativa, idxFinReal:', idxFinReal);
}

const NUEVO_BLOQUE = `    // Marcar body como lector activo (oculta el widget inferior derecho)
    document.body.classList.add('lector-biblico-activo');

    // Panel flotante arrastrable: toggle barra + lupita buscador
    // SIN auto-scroll — el usuario controla manualmente
    setTimeout(function() {
        var navOculta = false;

        // ── Contenedor arrastrable ──
        var panel = document.createElement('div');
        panel.id = 'panel-lector-ctrl';
        panel.style.cssText = 'position:fixed;bottom:18px;right:14px;z-index:10000000;display:flex;gap:6px;align-items:center;';

        // ── Boton toggle barra (OCULTAR / MOSTRAR) ──
        var btnToggle = document.createElement('button');
        btnToggle.style.cssText = 'padding:10px 13px;background:rgba(85,239,196,0.92);border:none;border-radius:22px;color:#000;font-weight:900;font-size:0.72rem;cursor:pointer;box-shadow:0 4px 18px rgba(85,239,196,0.4);white-space:nowrap;';
        btnToggle.innerHTML = '\\u2191 OCULTAR BARRA';
        btnToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var nav = document.getElementById('floating-bible-nav');
            if (!nav) return;
            if (navOculta) {
                nav.classList.remove('nav-oculta');
                btnToggle.innerHTML = '\\u2191 OCULTAR BARRA';
                btnToggle.style.background = 'rgba(85,239,196,0.92)';
                navOculta = false;
            } else {
                nav.classList.add('nav-oculta');
                btnToggle.innerHTML = '\\u2193 MOSTRAR BARRA';
                btnToggle.style.background = 'rgba(253,203,110,0.92)';
                navOculta = true;
            }
        });

        // ── Boton lupita — volver al buscador ──
        var btnLupa = document.createElement('button');
        btnLupa.style.cssText = 'width:40px;height:40px;background:rgba(162,155,254,0.92);border:none;border-radius:50%;color:#000;font-size:1.1rem;cursor:pointer;box-shadow:0 4px 18px rgba(162,155,254,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;';
        btnLupa.innerHTML = '\\uD83D\\uDD0D';
        btnLupa.title = 'Buscador rapido';
        btnLupa.addEventListener('click', function(e) {
            e.stopPropagation();
            if (typeof abrirSelectorBiblias === 'function') abrirSelectorBiblias();
        });

        panel.appendChild(btnToggle);
        panel.appendChild(btnLupa);
        document.body.appendChild(panel);

        // ── Hacer el panel arrastrable con touch ──
        var arrastre = false, ox, oy, or_, ob_;
        panel.addEventListener('touchstart', function(e) {
            if (e.target !== panel) return; // solo arrastra el div, no los botones
            arrastre = true;
            ox = e.touches[0].clientX; oy = e.touches[0].clientY;
            or_ = parseInt(panel.style.right) || 14;
            ob_ = parseInt(panel.style.bottom) || 18;
        }, { passive: true });
        panel.addEventListener('touchmove', function(e) {
            if (!arrastre) return;
            var dx = e.touches[0].clientX - ox, dy = e.touches[0].clientY - oy;
            panel.style.right = Math.max(4, Math.min(window.innerWidth - 160, or_ - dx)) + 'px';
            panel.style.bottom = Math.max(4, Math.min(window.innerHeight - 60, ob_ - dy)) + 'px';
        }, { passive: true });
        panel.addEventListener('touchend', function() { arrastre = false; });

        // ── Limpiar al salir del lector ──
        window._limpiarBarraLector = function() {
            document.body.classList.remove('lector-biblico-activo');
            var p = document.getElementById('panel-lector-ctrl');
            if (p) p.remove();
        };
    }, 400);
`;

// Reemplazar desde idxIni hasta idxFinReal
const antes = c.substring(0, idxIni);
const despues = c.substring(idxFinReal);
c = antes + NUEVO_BLOQUE + '\n' + despues;

fs.writeFileSync(FILE, c, 'utf8');
console.log('OK. Tamano:', c.length);
