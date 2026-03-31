const fs = require('fs');

const path = "c:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\index.html";
let text = fs.readFileSync(path, 'latin1'); // Read in latin1 (ANSI) to preserve bytes exactly as they are

// We apply the replacements

// 1. Fix the double-added accidental bad text
const toRemove = `//                                            \r\n        //   VERS CULOS DE ALIENTO  Acceso directo\r\n        //                                            `;
text = text.replace(toRemove, "");
text = text.replace(
    "Cambiar a la pestaa ALIENTO automticamente",
    "Cambiar a la pesta\xF1a ALIENTO autom\xE1ticamente" // pestaña, automáticamente in latin1 map
);
text = text.replace(
    "Restaurar la pantalla que corresponde segn donde estaba",
    "Restaurar la pantalla que corresponde seg\xFAn donde estaba" // según
);

// 2. Add function and update button
const closingBrace = `        function cerrarDevocionalOverlay() {\r
            const ov = document.getElementById('devocional-overlay');\r
            if (ov) ov.remove();\r
        }`;

const newFuncStr = `        function cerrarDevocionalOverlay() {\r
            const ov = document.getElementById('devocional-overlay');\r
            if (ov) ov.remove();\r
        }\r
\r
        // \uD83D\uDCAC COMPARTIR DEVOCIONAL - WHATSAPP\r
        function _compartirSoloTextoClick() {\r
            const icono    = document.getElementById('dev-icon')?.textContent || '\uD83D\uDCD6';\r
            const titulo   = document.getElementById('dev-label')?.textContent || 'Devocional del D\xEDa';\r
            const vers     = document.getElementById('dev-versiculo')?.textContent || '';\r
            const ref      = document.getElementById('dev-referencia')?.textContent || '';\r
            const reflex   = document.getElementById('dev-reflexion')?.textContent || '';\r
\r
            const refLimpia = ref.replace('\uD83D\uDCD6', '').trim();\r
            const msg = \`\${icono} *DEVOCIONAL DEL D\xCDA \u2014 LEGADO B\xCDBLICO*\\n*\${titulo}*\\n\\n\uD83D\uDCD6 \${vers}\\n_\${refLimpia}_\\n\\n\uD83D\uDCAD *Reflexi\xF3n:*\\n_\${reflex}_\\n\\n\uD83D\uDCF2 _Compartido desde Legado B\xEDblico App_\`;\r
\r
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);\r
            const waUrl = isMobile \r
                ? \`whatsapp://send?text=\${encodeURIComponent(msg)}\` \r
                : \`https://web.whatsapp.com/send?text=\${encodeURIComponent(msg)}\`;\r
            \r
            window.open(waUrl, '_blank');\r
        }`;
text = text.replace(closingBrace, newFuncStr);

const oldBtnRegex = /<button onclick="_compartirSoloTextoClick\(\)" style="[\s\S]*?">.*?Enviar solo como texto.*?<\/button>/;
const newBtnStr = `<button onclick="_compartirSoloTextoClick()" style="
                            width:100%;padding:14px;
                            background:linear-gradient(135deg,#25D366,#128C7E);
                            border:none;border-radius:14px;color:#fff;
                            font-weight:900;font-size:0.95rem;cursor:pointer;
                            box-shadow:0 6px 20px rgba(37,211,102,0.3);
                        ">\uD83D\uDCAC ENVIAR POR WHATSAPP (TEXTO)</button>`;

text = text.replace(oldBtnRegex, newBtnStr);

fs.writeFileSync(path, text, 'latin1');
console.log("Fixes applied successfully.");
