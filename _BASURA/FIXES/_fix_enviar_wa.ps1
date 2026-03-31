$path = "c:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\index.html"

# Windows-1252 or Latin-1 equivalent for these Spanish legacy files commonly
$enc = [System.Text.Encoding]::GetEncoding("ISO-8859-1")
$text = [IO.File]::ReadAllText($path, $enc)

$text = $text.Replace("Restaurar la pantalla que corresponde segn", "Restaurar la pantalla que corresponde según")
$text = $text.Replace("//   VERS CULOS DE ALIENTO  Acceso directo", "// 🌟 VERSÍCULOS DE ALIENTO — Acceso directo")

$func_target = @"
        function cerrarDevocionalOverlay() {
            const ov = document.getElementById('devocional-overlay');
            if (ov) ov.remove();
        }
"@

$new_func = @"
        function cerrarDevocionalOverlay() {
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
            const msg = `${icono} *DEVOCIONAL DEL DÍA — LEGADO BÍBLICO*\n*${titulo}*\n\n📖 ${vers}\n_${refLimpia}_\n\n💭 *Reflexión:*\n_${reflex}_\n\n📲 _Compartido desde Legado Bíblico App_`;

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const waUrl = isMobile 
                ? `whatsapp://send?text=${encodeURIComponent(msg)}` 
                : `https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
            
            window.open(waUrl, '_blank');
        }
"@

if ($text.Contains($func_target)) {
    $text = $text.Replace($func_target, $new_func)
    Write-Host "Function injected"
} else {
    Write-Host "Function target NOT FOUND"
}

$btn_target = @"
                        <button onclick="_compartirSoloTextoClick()" style="
                            width:100%;padding:10px;
                            background:rgba(255,255,255,0.05);
                            border:1px solid rgba(255,255,255,0.1);border-radius:14px;
                            color:rgba(255,255,255,0.7);
                            font-weight:700;font-size:0.8rem;cursor:pointer;
                        ">💬 Enviar solo como texto (Clásico)</button>
"@

$new_btn = @"
                        <button onclick="_compartirSoloTextoClick()" style="
                            width:100%;padding:14px;
                            background:linear-gradient(135deg,#25D366,#128C7E);
                            border:none;border-radius:14px;color:#fff;
                            font-weight:900;font-size:0.95rem;cursor:pointer;
                            box-shadow:0 6px 20px rgba(37,211,102,0.3);
                        ">💬 ENVIAR POR WHATSAPP</button>
"@

if ($text.Contains($btn_target)) {
    $text = $text.Replace($btn_target, $new_btn)
    Write-Host "Button injected"
} else {
    Write-Host "Button target NOT FOUND"
}

# The user is working in UTF-8 usually but we use ISO to not break other things if it's mixed
# Wait, actually Windows PowerShell requires explicitly saving
[IO.File]::WriteAllText($path, $text, $enc)
Write-Host "Saved successfully"
