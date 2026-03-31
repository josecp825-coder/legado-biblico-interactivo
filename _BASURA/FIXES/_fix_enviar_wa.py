import codecs
import re

path = r'c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\index.html'
try:
    with codecs.open(path, 'r', 'utf-8') as f:
        text = f.read()
except UnicodeDecodeError:
    with codecs.open(path, 'r', 'latin-1') as f:
        text = f.read()

# Fix the broken text from earlier replacement if it exists
text = text.replace('Restaurar la pantalla que corresponde segn', 'Restaurar la pantalla que corresponde según')
text = text.replace('//   VERS CULOS DE ALIENTO  Acceso directo', '// 🌟 VERSÍCULOS DE ALIENTO — Acceso directo')

# Add the function _compartirSoloTextoClick()
func_target = """        function cerrarDevocionalOverlay() {
            const ov = document.getElementById('devocional-overlay');
            if (ov) ov.remove();
        }"""

new_func = """        function cerrarDevocionalOverlay() {
            const ov = document.getElementById('devocional-overlay');
            if (ov) ov.remove();
        }

        // 💬 COMPARTIR DEVOCIONAL - WHATSAPP
        function _compartirSoloTextoClick() {
            const icono    = document.getElementById('dev-icon')?.textContent || '📖';
            const titulo   = document.getElementById('dev-label')?.textContent || 'Devocional del Día';
            const vers     = document.getElementById('dev-versiculo')?.textContent || '';
            const ref      = document.getElementById('dev-referencia')?.textContent || '';
            const reflex   = document.getElementById('dev-reflexion')?.textContent || '';

            const refLimpia = ref.replace('📖', '').trim();
            const msg = `${icono} *DEVOCIONAL DEL DÍA — LEGADO BÍBLICO*\\n*${titulo}*\\n\\n📖 ${vers}\\n_${refLimpia}_\\n\\n💭 *Reflexión:*\\n_${reflex}_\\n\\n📲 _Compartido desde Legado Bíblico App_`;

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const waUrl = isMobile 
                ? `whatsapp://send?text=${encodeURIComponent(msg)}` 
                : `https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
            
            window.open(waUrl, '_blank');
        }"""

if func_target in text:
    text = text.replace(func_target, new_func)
    print('Function injected successfully')
else:
    print('Function injection FAILED - target not found')

# Update the button
btn_regex = r'<button onclick=\"_compartirSoloTextoClick\(\)\" style=\"[\s\S]*?\">💬 Enviar solo como texto \(Clásico\)</button>'
new_btn = r'''<button onclick="_compartirSoloTextoClick()" style="
                            width:100%;padding:14px;
                            background:linear-gradient(135deg,#25D366,#128C7E);
                            border:none;border-radius:14px;color:#fff;
                            font-weight:900;font-size:0.95rem;cursor:pointer;
                            box-shadow:0 6px 20px rgba(37,211,102,0.3);
                        ">💬 ENVIAR POR WHATSAPP</button>'''

if re.search(btn_regex, text):
    text = re.sub(btn_regex, new_btn, text)
    print('Button replaced successfully')
else:
    print('Button target not found')

# Save back
# We know the original HTML should be utf-8 or latin-1. Let's force utf-8 so emojis render well natively.
with codecs.open(path, 'w', 'utf-8-sig') as f:
    f.write(text)
print('File saved')
