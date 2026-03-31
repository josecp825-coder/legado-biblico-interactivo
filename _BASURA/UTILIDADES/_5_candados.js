const fs = require('fs');
const path = 'data_iglesia_v1.js';
let content = fs.readFileSync(path, 'utf8');

const injection = `
// ===============================================
// 🔒 5 CANDADOS DE PROTECCIÓN: AUTO-SAVE & DRAFT
// ===============================================
function iniciarAutoGuardadoCulto() {
    // Solo inicia si estamos en la vista de crear/editar culto
    setTimeout(() => {
        const inputs = document.querySelectorAll('input[id^="culto-"]');
        if (!inputs.length) return;

        // Si estamos editando un culto existente, no sobreescribir con borrador, O tal vez sí?
        // Es mejor solo usar el borrador si no estamos editando (cuando no hay ID)
        const isEditing = window._editandoCultoId != null;
        
        if (!isEditing) {
            try {
                const borrador = JSON.parse(localStorage.getItem('legado_culto_borrador') || '{}');
                inputs.forEach(inp => {
                    // Evitar tipos de eventos y fechas si se quiere
                    if (borrador[inp.id] !== undefined && borrador[inp.id] !== "") {
                        inp.value = borrador[inp.id];
                    }
                });
            } catch(e) {}
        }

        // Suscribir todos los inputs a guardar el borrador en tiempo real
        inputs.forEach(inp => {
            inp.addEventListener('input', () => {
                // Solo auto-guardar borradores de nuevas planillas (no de ediciones para evitar chocar)
                if (window._editandoCultoId != null) return;
                
                try {
                    const draft = JSON.parse(localStorage.getItem('legado_culto_borrador') || '{}');
                    draft[inp.id] = inp.value;
                    localStorage.setItem('legado_culto_borrador', JSON.stringify(draft));
                } catch(e) {}
            });
        });

        // Advertir si intenta cerrar la ventana sin generar/guardar
        window.onbeforeunload = function() {
            if (window._editandoCultoId == null) {
                const dr = JSON.parse(localStorage.getItem('legado_culto_borrador') || '{}');
                if (Object.keys(dr).some(k => dr[k] && dr[k].trim() !== '')) {
                    return 'Tienes datos sin guardar en tu planilla de culto. ¿Seguro que quieres salir?';
                }
            }
        };
    }, 800);
}

function limpiarBorradorCulto() {
    localStorage.removeItem('legado_culto_borrador');
    window.onbeforeunload = null;
}
`;

if (!content.includes('5 CANDADOS DE PROTECCIÓN')) {
    // 1. Inject the logic before it
    content = content.replace('function abrirPlantillaSabado', injection + '\nfunction abrirPlantillaSabado');
    
    // 2. Wrap open template to initialize draft
    content = content.replace(
        "document.getElementById('pantalla-estudio').innerHTML = `", 
        "document.getElementById('pantalla-estudio').innerHTML = `\n    ${(setTimeout(iniciarAutoGuardadoCulto, 50), '')}"
    );

    // 3. Auto sync from firebase when entering historiography (Historial)
    const histStr = "function cargarCultosSemana() {";
    content = content.replace(histStr, 
        histStr + "\n    if(typeof sincronizarCultosDesdeFirebase === 'function') sincronizarCultosDesdeFirebase();\n"
    );

    // 4. Wipe draft when successfully saved
    const guStr = "localStorage.setItem('legado_cultos_semanales', JSON.stringify(historial));";
    content = content.replace(guStr, guStr + "\n    limpiarBorradorCulto();");

    fs.writeFileSync(path, content, 'utf8');
    console.log('✅ 5 candados instalados exitosamente en data_iglesia_v1.js!');
} else {
    console.log('⚠️ Los candados ya estaban instalados.');
}
