const fs = require('fs');
const filepath = 'data_iglesia_v1.js';
let content = fs.readFileSync(filepath, 'utf8');

const lockMethods = `
// ===============================================
// 🔒 5 CANDADOS DE PROTECCIÓN: AUTO-SAVE & DRAFT
// ===============================================
function iniciarAutoGuardadoCulto() {
    setTimeout(() => {
        const inputs = document.querySelectorAll('input[id^="culto-"]');
        if (!inputs.length) return;

        const isEditing = window._editandoCultoId != null;
        if (!isEditing) {
            try {
                const borrador = JSON.parse(localStorage.getItem('legado_culto_borrador') || '{}');
                inputs.forEach(inp => {
                    if (borrador[inp.id] !== undefined && borrador[inp.id] !== "") {
                        inp.value = borrador[inp.id];
                    }
                });
            } catch(e) {}
        }

        inputs.forEach(inp => {
            inp.addEventListener('input', () => {
                if (window._editandoCultoId != null) return;
                try {
                    const draft = JSON.parse(localStorage.getItem('legado_culto_borrador') || '{}');
                    draft[inp.id] = inp.value;
                    localStorage.setItem('legado_culto_borrador', JSON.stringify(draft));
                } catch(e) {}
            });
        });

        window.onbeforeunload = function() {
            if (window._editandoCultoId == null) {
                const dr = JSON.parse(localStorage.getItem('legado_culto_borrador') || '{}');
                if (Object.keys(dr).some(k => dr[k] && dr[k].trim() !== '')) {
                    return 'Tienes datos sin guardar en la planilla del culto. ¿Seguro que quieres salir?';
                }
            }
        };
    }, 400);
}

function limpiarBorradorCulto() {
    localStorage.removeItem('legado_culto_borrador');
    window.onbeforeunload = null;
}
`;

// 1. Inject methods before `window.sincronizarCultosDesdeFirebase`
content = content.replace('window.sincronizarCultosDesdeFirebase = sincronizarCultosDesdeFirebase;', lockMethods + '\nwindow.sincronizarCultosDesdeFirebase = sincronizarCultosDesdeFirebase;');

// 2. Call limpiarBorradorCulto when the form is fully generated or saved
content = content.replace('function guardarCultoSemana() {', 'function guardarCultoSemana() {\n    if (typeof limpiarBorradorCulto === "function") limpiarBorradorCulto();');

// 3. Hook into Form Generation
// Find the exact line cont.innerHTML = esSabado ? _html12PasosSabado() : _htmlCamposNormal();
const hookStr = "cont.innerHTML = esSabado ? _html12PasosSabado() : _htmlCamposNormal();";
content = content.replace(hookStr, hookStr + "\n    iniciarAutoGuardadoCulto();");

fs.writeFileSync(filepath, content, 'utf8');
console.log('✅ Auto-save patch and locks applied successfully!');
