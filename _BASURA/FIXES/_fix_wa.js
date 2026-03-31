const fs = require('fs');

const path = "c:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\index.html";
let text = fs.readFileSync(path, 'utf8');

// The file contains corrupted `Botn compartir` due to previous operations, we just match what is actually there!

const buttonTarget = `                    <!-- Bot\uFFFDn compartir -->
                    <button onclick="compartirDevocional()" style="
                        width:100%;padding:14px;
                        background:linear-gradient(135deg,#6c5ce7,#a29bfe);
                        border:none;border-radius:14px;color:#fff;
                        font-weight:900;font-size:0.9rem;cursor:pointer;
                        box-shadow:0 6px 20px rgba(108,92,231,0.3);
                    ">\u{1F4E4} COMPARTIR DEVOCIONAL</button>
                </div>`;

const buttonTargetFallback = `                    <!-- Bot\uFFFDn compartir -->\n                    <button onclick="compartirDevocional()" style="\n                        width:100%;padding:14px;\n                        background:linear-gradient(135deg,#6c5ce7,#a29bfe);\n                        border:none;border-radius:14px;color:#fff;\n                        font-weight:900;font-size:0.9rem;cursor:pointer;\n                        box-shadow:0 6px 20px rgba(108,92,231,0.3);\n                    ">\u{1F4E4} COMPARTIR DEVOCIONAL</button>\n                </div>`;

const newButton = `                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <button onclick="compartirDevocional()" style="
                            width:100%;padding:14px;
                            background:linear-gradient(135deg,#6c5ce7,#a29bfe);
                            border:none;border-radius:14px;color:#fff;
                            font-weight:900;font-size:0.95rem;cursor:pointer;
                            box-shadow:0 6px 20px rgba(108,92,231,0.3);
                        ">\u{1F5BC}\uFE0F COMPARTIR (PLANTILLA)</button>
                        
                        <button onclick="_compartirSoloTextoClick()" style="
                            width:100%;padding:10px;
                            background:rgba(37,211,102,0.15);
                            border:1px solid rgba(37,211,102,0.3);border-radius:14px;
                            color:#25D366;
                            font-weight:900;font-size:0.85rem;cursor:pointer;
                        ">\uD83D\uDCAC WhatsApp (TRADICIONAL)</button>
                    </div>
                </div>`;

if (text.includes(buttonTarget)) {
    text = text.replace(buttonTarget, newButton);
    console.log("Button target replaced successfully.");
} else if (text.includes(buttonTargetFallback)) {
     text = text.replace(buttonTargetFallback, newButton);
     console.log("Button target fallback replaced successfully.");
} else {
    // Brute force regex just in case
    const regexBtn = /<!-- Bot.*?n compartir -->\s*<button onclick="compartirDevocional\(\)" style="\s*width:100%;padding:14px;\s*background:linear-gradient\(135deg,#6c5ce7,#a29bfe\);\s*border:none;border-radius:14px;color:#fff;\s*font-weight:900;font-size:0.9rem;cursor:pointer;\s*box-shadow:0 6px 20px rgba\(108,92,231,0.3\);\s*">.*?COMPARTIR DEVOCIONAL<\/button>\s*<\/div>/;
    if (regexBtn.test(text)) {
        text = text.replace(regexBtn, newButton);
        console.log("Button regex replaced successfully.");
    } else {
        console.log("BUTTON NOT FOUND!");
    }
}

// Target function injection
const funcTarget = `        function cerrarDevocionalOverlay() {
            const ov = document.getElementById('devocional-overlay');
            if (ov) ov.remove();
        }`;

const funcTargetFallback = `        function cerrarDevocionalOverlay() {\r\n            const ov = document.getElementById('devocional-overlay');\r\n            if (ov) ov.remove();\r\n        }`;

const newFuncStr = `        function cerrarDevocionalOverlay() {
            const ov = document.getElementById('devocional-overlay');
            if (ov) ov.remove();
        }

        // \uD83D\uDCAC COMPARTIR DEVOCIONAL - WHATSAPP TRADICIONAL
        function _compartirSoloTextoClick() {
            const icono    = document.getElementById('dev-icon')?.textContent || '\uD83D\uDCD6';
            const titulo   = document.getElementById('dev-label')?.textContent || 'Devocional del D\xEDa';
            const vers     = document.getElementById('dev-versiculo')?.textContent || '';
            const ref      = document.getElementById('dev-referencia')?.textContent || '';
            const reflex   = document.getElementById('dev-reflexion')?.textContent || '';

            const refLimpia = ref.replace('\uD83D\uDCD6', '').trim();
            const msg = \`\${icono} *DEVOCIONAL DEL D\xCDA \u2014 LEGADO B\xCDBLICO*\\n*\${titulo}*\\n\\n\uD83D\uDCD6 \${vers}\\n_\${refLimpia}_\\n\\n\uD83D\uDCAD *Reflexi\xF3n:*\\n_\${reflex}_\\n\\n\uD83D\uDCF2 _Compartido desde Legado B\xEDblico App_\`;

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const waUrl = isMobile 
                ? \`whatsapp://send?text=\${encodeURIComponent(msg)}\` 
                : \`https://web.whatsapp.com/send?text=\${encodeURIComponent(msg)}\`;
            
            window.open(waUrl, '_blank');
        }`;

if (text.includes(funcTarget)) {
    text = text.replace(funcTarget, newFuncStr);
    console.log("Function injected successfully.");
} else if (text.includes(funcTargetFallback)) {
    text = text.replace(funcTargetFallback, newFuncStr);
    console.log("Function fallback injected successfully.");
}  else {
    const regexFunc = /function cerrarDevocionalOverlay\(\) \{\s*const ov = document.getElementById\('devocional-overlay'\);\s*if \(ov\) ov.remove\(\);\s*\}/;
    if (regexFunc.test(text)) {
        text = text.replace(regexFunc, newFuncStr);
        console.log("Function regex replaced successfully.");
    } else {
         console.log("FUNCTION TARGET NOT FOUND!");
    }
}

fs.writeFileSync(path, text, 'utf8');
