// =====================================================
// BIBLIA WIZARD — Wizard, buscador inteligente
// =====================================================

window.borrarNotaDesdePanel = function (key) {
    mostrarConfirm('🗑️ ¿Borrar esta reflexión?', function() {
        localStorage.removeItem(key);
        cambiarModoSelectorBiblia('notas');
        mostrarToast('🗑️ Reflexión eliminada');
    });
};

window.compartirNota = function (ref, nota) {
    const texto = `📖 ${ref}\n\n📝 Mi reflexión:\n"${nota}"\n\n— Legado Bíblico`;
    if (navigator.share) {
        navigator.share({ text: texto }).catch(() => { });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto);
        mostrarToast('📋 Copiado al portapapeles');
    }
};


// =====================================================
// WIZARD BIBLIA — Flujo 3 pasos: Libro → Cap/Vers → Leer
// =====================================================

var _wizardLibroSeleccionado = null;

window.wizardBuscarLibro = function(texto) {
    var sug = document.getElementById('wizard-sugerencias');
    if (!sug) return;
    var t = texto.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (!t || t.length < 1) {
        sug.innerHTML = '';
        sug.style.display = 'none';
        return;
    }

    var resultados = [];
    // Buscar por abreviaciones
    Object.entries(ABREVIACIONES_BIBLIA).forEach(function(par) {
        if (par[0].startsWith(t)) {
            if (resultados.indexOf(par[1]) < 0) resultados.push(par[1]);
        }
    });
    // Buscar por nombre del libro
    TODOS_LIBROS.forEach(function(l) {
        var norm = l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (norm.startsWith(t) || norm.includes(t)) {
            if (resultados.indexOf(l) < 0) resultados.push(l);
        }
    });

    resultados = resultados.slice(0, 8);

    if (resultados.length === 0) {
        sug.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:0.75rem;padding:8px;grid-column:1/-1">No encontrado. Intenta con m&aacute;s letras.</div>';
        sug.style.display = 'grid';
        return;
    }

    sug.innerHTML = resultados.map(function(l) {
        var esAT = LIBROS_AT.indexOf(l) >= 0;
        var color = esAT ? '#55efc4' : '#a29bfe';
        var caps = CONTEO_CAPITULOS[l] || 1;
        return '<button onclick="wizardSeleccionarLibro(\'' + l + '\')" ' +
            'style="padding:14px 10px;background:rgba(255,255,255,0.05);border:2px solid ' + color + '60;' +
            'color:' + color + ';border-radius:14px;font-weight:900;font-size:0.9rem;cursor:pointer;' +
            'display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.15s">' +
            l + '<span style="font-size:0.55rem;opacity:0.5;font-weight:400">' + caps + ' cap.</span></button>';
    }).join('');
    sug.style.display = 'grid';
};

window.wizardSeleccionarLibro = function(libro) {
    _wizardLibroSeleccionado = libro;
    // Ocultar paso 1, mostrar paso 2
    var p1 = document.getElementById('wizard-paso1');
    var p2 = document.getElementById('wizard-paso2');
    var lbl = document.getElementById('wizard-libro-seleccionado');
    if (p1) p1.style.display = 'none';
    if (p2) p2.style.display = 'block';
    if (lbl) {
        var esAT = LIBROS_AT.indexOf(libro) >= 0;
        var color = esAT ? '#55efc4' : '#a29bfe';
        lbl.innerHTML = '<span style="color:rgba(255,255,255,0.5);font-size:0.6rem;display:block;letter-spacing:2px;margin-bottom:4px">' +
            (esAT ? 'ANTIGUO TESTAMENTO' : 'NUEVO TESTAMENTO') + '</span>' +
            '<span style="color:' + color + '">' + libro + '</span>';
        lbl.style.borderColor = color + '50';
    }
    // Auto-foco en capitulo
    setTimeout(function() {
        var cap = document.getElementById('wizard-cap');
        if (cap) { try { cap.focus(); } catch(e) {} }
    }, 100);
};

window.wizardVolver = function() {
    _wizardLibroSeleccionado = null;
    var p1 = document.getElementById('wizard-paso1');
    var p2 = document.getElementById('wizard-paso2');
    if (p1) { p1.style.display = 'block'; }
    if (p2) { p2.style.display = 'none'; }
    var inp = document.getElementById('wizard-input-libro');
    if (inp) { inp.value = ''; try { inp.focus(); } catch(e) {} }
    var sug = document.getElementById('wizard-sugerencias');
    if (sug) { sug.innerHTML = ''; sug.style.display = 'none'; }
};

window.wizardIrALeer = function() {
    if (!_wizardLibroSeleccionado) return;
    var capEl = document.getElementById('wizard-cap');
    var versEl = document.getElementById('wizard-vers');
    var cap = capEl ? parseInt(capEl.value) || 1 : 1;
    var vers = versEl ? parseInt(versEl.value) || null : null;
    var maxCap = CONTEO_CAPITULOS[_wizardLibroSeleccionado] || 1;
    cap = Math.min(Math.max(cap, 1), maxCap);
    guardarCitaHistorial(_wizardLibroSeleccionado, cap, vers);
    renderHistorialRelampago();
    var overlay = document.getElementById('biblia-overlay');
    if (overlay) overlay.remove();
    mostrarToast('\u25B6 ' + _wizardLibroSeleccionado + ' ' + cap + (vers ? ':' + vers : ''));
    abrirLibroPrincipal(_wizardLibroSeleccionado, cap, vers);
    _wizardLibroSeleccionado = null;
};

// =====================================================
// 🛡️ CONFIRMAR — Modal no bloqueante (reemplaza confirm())
// Uso: mostrarConfirm('¿Eliminar?', function() { ... });
// =====================================================
window.mostrarConfirm = function(mensaje, onConfirm) {
    // Eliminar instancia previa si existe
    const prev = document.getElementById('_confirm-modal-legado');
    if (prev) prev.remove();

    const modal = document.createElement('div');
    modal.id = '_confirm-modal-legado';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999999;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);animation:fadeIn 0.15s ease;';

    modal.innerHTML = `
        <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px 24px;max-width:320px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.7);text-align:center;">
            <div style="font-size:2rem;margin-bottom:10px;">⚠️</div>
            <div style="color:#fff;font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:24px;">${mensaje}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <button id="_confirm-no" style="padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);border-radius:12px;cursor:pointer;font-weight:700;font-size:0.9rem;">Cancelar</button>
                <button id="_confirm-si" style="padding:12px;background:linear-gradient(135deg,#e17055,#ff6b6b);border:none;color:#fff;border-radius:12px;cursor:pointer;font-weight:900;font-size:0.9rem;">Eliminar</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('_confirm-no').onclick = function() { modal.remove(); };
    document.getElementById('_confirm-si').onclick = function() {
        modal.remove();
        if (typeof onConfirm === 'function') onConfirm();
    };

    // Cerrar al tocar fuera del cuadro
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
};


// ===============================================
// 🧠 BUSCADOR INTELIGENTE API (Concordancia)
// ===============================================
window.ejecutarBuscadorInteligente = async function() {
    const input = document.getElementById('smart-search-input');
    const container = document.getElementById('smart-search-results');
    if (!input || !container) return;
    const q = input.value.trim();
    if (q.length < 3) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Escribe al menos 3 letras para buscar');
        return;
    }
    
    // Cierra el teclado en movil si estamos en PWA
    input.blur();
    
    container.style.display = 'flex';
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#74b9ff"><div class="loader-spinner" style="margin:0 auto;border-color:#74b9ff;border-bottom-color:transparent;width:28px;height:28px"></div><div style="margin-top:12px;font-size:0.8rem;font-weight:900;letter-spacing:1px">Buscando en toda la Biblia...</div></div>';
    
    try {
        const apiUrl = typeof BIBLIA_API_URL !== 'undefined' ? BIBLIA_API_URL : 'https://bible-api.deno.dev/api/read/';
        const res = await fetch(apiUrl + 'rv1960/search?q=' + encodeURIComponent(q));
        if (!res.ok) throw new Error('API Error');
        const d = await res.json();
        
        if (!d || !d.data || d.data.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:16px;color:rgba(255,255,255,0.5);font-size:0.9rem;border:1px dashed rgba(255,255,255,0.1);border-radius:12px">No se encontraron resultados bíblicos para "<b style="color:#74b9ff">'+q+'</b>"</div>';
            return;
        }
        
        let html = '<div style="font-size:0.75rem;color:#74b9ff;font-weight:900;margin-bottom:6px;letter-spacing:1px;padding-left:4px">' + d.data.length + ' RESULTADO' + (d.data.length === 1 ? '' : 'S') + ' ENCONTRADO' + (d.data.length === 1 ? '' : 'S') + '</div>';
        
        d.data.forEach(function(v) {
            // Highlight regex
            let highlightStr = q.replace(/[.*+?^\$\{\}()|[\[\]\\]/g, '\\$&');
            let regex = new RegExp('(' + highlightStr + ')', 'gi');
            let highlightedVerse = v.verse.replace(regex, '<span style="color:#0984e3;background:rgba(116,185,255,0.2);padding:0 2px;border-radius:3px">$1</span>');
            html += '<button onclick="abrirCitaDesdeBuscador(\'' + v.book + '\', ' + v.chapter + ', ' + v.number + ')" style="text-align:left;padding:16px;background:rgba(0,0,0,0.4);border:1px solid rgba(116,185,255,0.3);border-radius:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 12px rgba(0,0,0,0.2)">';
            html += '<div style="font-size:0.7rem;color:#74b9ff;font-weight:900;margin-bottom:8px;letter-spacing:1.5px;display:flex;align-items:center;gap:6px"><span>📖</span> ' + v.book.toUpperCase() + ' ' + v.chapter + ':' + v.number + '</div>';
            html += '<div style="font-size:0.95rem;color:#e2e8f0;line-height:1.5">' + highlightedVerse + '</div>';
            html += '</button>';
        });
        container.innerHTML = html;
    } catch(e) {
        container.innerHTML = '<div style="text-align:center;padding:16px;color:#ff7675;font-size:0.9rem;border:1px dashed rgba(255,118,117,0.3);border-radius:12px;background:rgba(255,118,117,0.05)">Hubo un error de conexión al buscar. Revisa tu internet.</div>';
    }
};

window.abrirCitaDesdeBuscador = function(libro, cap, vers) {
    const overlay = document.getElementById('biblia-overlay');
    const p1 = document.getElementById('wizard-paso1');
    if (p1) p1.style.display = 'block';
    const sr = document.getElementById('smart-search-results');
    if (sr) sr.style.display = 'none';
    
    if (overlay) overlay.remove();
    if (typeof guardarCitaHistorial === 'function') guardarCitaHistorial(libro, cap, vers);
    if (typeof mostrarToast === 'function') mostrarToast('\u25B6 Abriendo ' + libro + ' ' + cap + ':' + vers);
    
    if (typeof abrirLibroPrincipal === 'function') {
        abrirLibroPrincipal(libro, cap, vers);
    }
};
