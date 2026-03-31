const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The sharing function ends right before "function cerrarContexto() {"
// Let's replace the canvas sharing logic perfectly.
const regex = /function compartirDevocional\(\) \{[\s\S]*?(?=\/\/ === A.*?B.*?LICO v2 ===|function cerrarContexto\(\))/;

const newFunc = `function compartirDevocional() {
            const icono    = document.getElementById('dev-icon')?.textContent || '📖';
            const titulo   = document.getElementById('dev-label')?.textContent || 'Devocional del Día';
            const vers     = document.getElementById('dev-versiculo')?.textContent || '';
            const ref      = document.getElementById('dev-referencia')?.textContent || '';
            const reflex   = document.getElementById('dev-reflexion')?.textContent || '';

            _compartirTextoDevocional(icono, titulo, vers, ref, reflex);
        }

        // ─── FALLBACK TEXTO ──────────────────────────────────────────
        function _compartirTextoDevocional(ic, tit, v, r2, rx) {
            const msg = \`\${ic} *DEVOCIONAL DEL DÍA — LEGADO BÍBLICO*\\n*\${tit}*\\n\\n📖 \${v}\\n\${r2}\\n\\n💭 _\${rx}_\\n\\n_📱 Compartido desde Legado Bíblico_\`;
            if (navigator.share) {
                navigator.share({ title: 'Devocional del Día - Legado Bíblico', text: msg }).catch(() => {});
            } else {
                navigator.clipboard?.writeText(msg).then(() => mostrarToast('✅ Devocional copiado'));
            }
        }

        `;

if (regex.test(html)) {
    html = html.replace(regex, newFunc);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Canvas template removed successfully!');
} else {
    console.log('Error: Regex didn\'t match compartirDevocional() block!');
}
