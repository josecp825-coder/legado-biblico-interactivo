const fs = require('fs');
let code = fs.readFileSync('data_motor.js', 'utf8');

const newFuncs = `

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
            let highlightStr = q.replace(/[.*+?^\\$\\{\\}()|[\\[\\]\\\\]/g, '\\\\$&');
            let regex = new RegExp('(' + highlightStr + ')', 'gi');
            let highlightedVerse = v.verse.replace(regex, '<span style="color:#0984e3;background:rgba(116,185,255,0.2);padding:0 2px;border-radius:3px">$1</span>');
            html += '<button onclick="abrirCitaDesdeBuscador(\\'' + v.book + '\\', ' + v.chapter + ', ' + v.number + ')" style="text-align:left;padding:16px;background:rgba(0,0,0,0.4);border:1px solid rgba(116,185,255,0.3);border-radius:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 12px rgba(0,0,0,0.2)">';
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
    if (typeof mostrarToast === 'function') mostrarToast('\\u25B6 Abriendo ' + libro + ' ' + cap + ':' + vers);
    
    if (typeof abrirLibroPrincipal === 'function') {
        abrirLibroPrincipal(libro, cap, vers);
    }
};
`;

if (!code.includes('window.ejecutarBuscadorInteligente')) {
    code += newFuncs;
    fs.writeFileSync('data_motor.js', code, 'utf8');
    console.log("Funciones de buscador inyectadas exitosamente.");
} else {
    console.log("Las funciones ya existian.");
}
