const fs = require('fs');
let code = fs.readFileSync('data_iglesia_v1.js', 'utf8');
code = code.replace(/\r\n/g, '\n');

// Reemplazar la funcion _html12PasosSabado completa con la version mejorada
// que incluye: Diaconos Puerta, Diaconisas Puerta, Diaconos Ofrendas, Diaconisas Ofrendas
// y el nuevo "MINISTERIO DE MUSICA" con conductor + 4 himnos

const OLD_START = 'function _html12PasosSabado() {';
const OLD_END = '\nfunction _htmlCamposNormal()';

const idxStart = code.indexOf(OLD_START);
const idxEnd = code.indexOf(OLD_END, idxStart);

if (idxStart < 0 || idxEnd < 0) {
    console.log('[FAIL] No encontrada la funcion. idxStart:', idxStart, 'idxEnd:', idxEnd);
    process.exit(1);
}

const NEW_FUNC = `function _html12PasosSabado() {
    const ORO = '253,203,110';
    const VERDE = '85,239,196';
    const AZUL = '116,185,255';
    const ROJO = '255,107,107';
    const MORADO = '162,155,254';

    // Helper: campo de diacono/diaconisa (titulo especial en verde-azul)
    function campoDiacono(id, num, icon, titulo, placeholder, color) {
        const C = color || '85,239,196';
        return \`<div style="background:rgba(\${C},0.06);border:1.5px solid rgba(\${C},0.3);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${C},0.9);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">\${icon}</span>
                <span style="color:rgba(\${C},0.7);font-size:0.6rem;background:rgba(\${C},0.15);padding:2px 8px;border-radius:6px;">\${num}</span>
                \${titulo}
            </label>
            <input type="text" id="culto-\${id}" placeholder="\${placeholder}"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${C},0.35);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\`;
    }

    const banner = \`<div style="background:rgba(\${ORO},0.08);border:1.5px solid rgba(\${ORO},0.35);border-radius:16px;padding:14px;">
        <div style="color:#fdcb6e;font-weight:900;font-size:0.72rem;letter-spacing:2px;text-align:center;">⛪ CULTO DE SÁBADO — PROGRAMA LITÚRGICO</div>
        <div style="color:rgba(255,255,255,0.3);font-size:0.62rem;text-align:center;margin-top:3px;">Programa completo del servicio</div>
    </div>\`;

    // ANCIANO DE TURNO
    const anciano = \`<div style="background:rgba(\${ROJO},0.07);border:2px solid rgba(\${ROJO},0.45);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ROJO},0.9);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">&#x1F9D3;</span>
            <span style="color:rgba(0,0,0,0.7);font-size:0.6rem;background:#ff6b6b;padding:2px 8px;border-radius:6px;font-weight:900;">★</span>
            ANCIANO(S) DE TURNO
        </label>
        <select id="culto-sab_anciano_tipo"
            style="width:100%;padding:11px 12px;background:rgba(0,0,0,0.45);border:1.5px solid rgba(\${ROJO},0.6);color:#ff6b6b;border-radius:10px;outline:none;font-size:0.88rem;font-weight:900;margin-bottom:8px;cursor:pointer;">
            <option value="">— Seleccionar categoría —</option>
            <option value="Anciano de Turno">&#x1F9D3; Anciano de Turno</option>
            <option value="Ancianos de Turno">&#x1F9D3;&#x1F9D3; Ancianos de Turno</option>
            <option value="Anciana de Turno">&#x1F9D2; Anciana de Turno</option>
            <option value="Ancianas de Turno">&#x1F9D2;&#x1F9D2; Ancianas de Turno</option>
            <option value="Anciano y Anciana de Turno">&#x1F9D3;&#x1F9D2; Anciano y Anciana de Turno</option>
        </select>
        <input type="text" id="culto-sab_anciano" placeholder="Nombre(s) del anciano/a de turno..."
            style="width:100%;padding:12px;background:rgba(0,0,0,0.4);border:1.5px solid rgba(\${ROJO},0.5);color:#fff;border-radius:10px;outline:none;font-size:0.95rem;font-weight:700;">
    </div>\`;

    // DIACONOS / DIACONISAS (PUERTA)
    const diaconosPuerta = campoDiacono('sab_diaconos_puerta', '🚪', '🧑‍⚖️', 'DIÁCONOS (PUERTA)', '¿Quién(es) atienden la puerta?', VERDE);
    const diaconisasPuerta = campoDiacono('sab_diaconisas_puerta', '🚪', '👩‍⚖️', 'DIACONISAS (PUERTA)', '¿Quién(es) atienden la puerta?', VERDE);

    // DIACONOS / DIACONISAS (OFRENDAS)
    const diaconosOfrendas = campoDiacono('sab_diaconos_ofrendas', '🙏', '🧑‍⚖️', 'DIÁCONOS (OFRENDAS)', '¿Quién(es) recogen las ofrendas?', AZUL);
    const diaconisasOfrendas = campoDiacono('sab_diaconisas_ofrendas', '🙏', '👩‍⚖️', 'DIACONISAS (OFRENDAS)', '¿Quién(es) recogen las ofrendas?', AZUL);

    // MINISTERIO DE MUSICA (nuevo - hasta 4 himnos)
    const ministerioMusica = \`<div style="background:rgba(116,185,255,0.07);border:2px solid rgba(116,185,255,0.4);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(116,185,255,0.9);font-size:0.68rem;margin-bottom:10px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">🎵</span>
            <span style="color:rgba(0,0,0,0.7);font-size:0.6rem;background:#74b9ff;padding:2px 8px;border-radius:6px;">♪</span>
            MINISTERIO DE MÚSICA — ANTE EL CULTO
        </label>
        <input type="text" id="culto-sab_musica_ante_quien" placeholder="¿Quién dirige/conduce el ministerio de música?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(116,185,255,0.35);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:10px;">
        <div style="color:rgba(116,185,255,0.6);font-size:0.62rem;font-weight:900;letter-spacing:1px;margin-bottom:8px;">HIMNOS A CANTAR (1–4):</div>
        <!-- Himno 1 -->
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="color:rgba(116,185,255,0.8);font-size:0.7rem;font-weight:900;min-width:16px;">1.</span>
            <input type="text" id="culto-sab_musica_himno1" placeholder="# o nombre del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
                style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(116,185,255,0.3);color:#74b9ff;border-radius:8px;outline:none;font-size:0.82rem;font-weight:bold;">
        </div>
        <div id="himno-titulo-sab_musica_himno1" style="color:#74b9ff;font-size:0.72rem;margin-bottom:6px;font-style:italic;padding-left:22px;"></div>
        <!-- Himno 2 -->
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="color:rgba(116,185,255,0.8);font-size:0.7rem;font-weight:900;min-width:16px;">2.</span>
            <input type="text" id="culto-sab_musica_himno2" placeholder="# o nombre del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
                style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(116,185,255,0.3);color:#74b9ff;border-radius:8px;outline:none;font-size:0.82rem;font-weight:bold;">
        </div>
        <div id="himno-titulo-sab_musica_himno2" style="color:#74b9ff;font-size:0.72rem;margin-bottom:6px;font-style:italic;padding-left:22px;"></div>
        <!-- Himno 3 -->
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="color:rgba(116,185,255,0.8);font-size:0.7rem;font-weight:900;min-width:16px;">3.</span>
            <input type="text" id="culto-sab_musica_himno3" placeholder="# o nombre del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
                style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(116,185,255,0.25);color:#74b9ff;border-radius:8px;outline:none;font-size:0.82rem;font-weight:bold;">
        </div>
        <div id="himno-titulo-sab_musica_himno3" style="color:#74b9ff;font-size:0.72rem;margin-bottom:6px;font-style:italic;padding-left:22px;"></div>
        <!-- Himno 4 -->
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="color:rgba(116,185,255,0.8);font-size:0.7rem;font-weight:900;min-width:16px;">4.</span>
            <input type="text" id="culto-sab_musica_himno4" placeholder="# o nombre del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
                style="flex:1;padding:9px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(116,185,255,0.2);color:#74b9ff;border-radius:8px;outline:none;font-size:0.82rem;font-weight:bold;">
        </div>
        <div id="himno-titulo-sab_musica_himno4" style="color:#74b9ff;font-size:0.72rem;font-style:italic;padding-left:22px;"></div>
    </div>\`;

    // HIMNO ADORACION (paso 6)
    const himnoAdoracion = \`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">🎵</span>
            <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">6</span>
            HIMNO DE ADORACIÓN
        </label>
        <input type="text" id="culto-sab_himno_anuncia" placeholder="¿Quién anuncia el himno?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
        <input type="text" id="culto-sab_himno6" placeholder="# del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.4);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:bold;">
        <div id="himno-titulo-sab_himno6" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
    </div>\`;

    // PREDICADOR
    const predicador = \`<div style="background:rgba(\${ORO},0.1);border:2px solid rgba(\${ORO},0.5);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:#fdcb6e;font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">🎤</span>
            <span style="color:rgba(0,0,0,0.7);font-size:0.6rem;background:#fdcb6e;padding:2px 8px;border-radius:6px;">10</span>
            TEMA / PREDICADOR
        </label>
        <input type="text" id="culto-sab_pred_anuncia" placeholder="¿Quién presenta al predicador?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
        <input type="text" id="culto-sab_predicador" placeholder="Nombre del predicador..."
            style="width:100%;padding:11px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.5);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:900;margin-bottom:6px;">
        <input type="text" id="culto-sab_tema" placeholder="Título del sermón..."
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;font-style:italic;">
    </div>\`;

    // HIMNO FINAL
    const himnoFinal = \`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
        <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
            <span style="font-size:1.1rem;">🎶</span>
            <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">11</span>
            HIMNO FINAL
        </label>
        <input type="text" id="culto-sab_himno_final_quien" placeholder="¿Quién anuncia el himno final?"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
        <input type="text" id="culto-sab_himno_final" placeholder="# del himno..." oninput="if(typeof autocompleteHimno==='function')autocompleteHimno(this)"
            style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.4);color:#fdcb6e;border-radius:8px;outline:none;font-size:0.9rem;font-weight:bold;">
        <div id="himno-titulo-sab_himno_final" style="color:#feca57;font-size:0.75rem;margin-top:5px;font-style:italic;"></div>
    </div>\`;

    return banner +
        anciano +
        diaconosPuerta +
        diaconisasPuerta +
        \`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">📯</span>
                <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">0</span>
                LLAMADO A LA ADORACIÓN
            </label>
            <input type="text" id="culto-sab_llamado" placeholder="¿Quién hace el llamado a la adoración?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\` +
        _campoItem('sab_doxologia', '1', '✨', 'DOXOLOGÍA', '# del himno de doxología...', ORO, true) +
        _campoItem('sab_invocacion', '2', '🙏', 'INVOCACIÓN', 'Nombre del responsable...', ORO) +
        _campoItem('sab_bienvenida', '3', '🤗', 'BIENVENIDA', 'Nombre del responsable...', ORO) +
        \`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">👶</span>
                <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">4</span>
                RINCÓN INFANTIL
            </label>
            <input type="text" id="culto-sab_infantil_anuncia" placeholder="¿Quién anuncia el rincón infantil?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.25);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            <input type="text" id="culto-sab_infantil" placeholder="¿Quién conduce el rincón infantil?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;">
        </div>\` +
        _campoItem('sab_ofrendas', '5', '💰', 'DIEZMOS Y OFRENDAS', 'Nombre del encargado...', ORO) +
        diaconosOfrendas +
        diaconisasOfrendas +
        ministerioMusica +
        himnoAdoracion +
        \`<div style="background:rgba(\${ORO},0.04);border:1.5px solid rgba(\${ORO},0.2);border-radius:14px;padding:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:rgba(\${ORO},0.8);font-size:0.68rem;margin-bottom:8px;font-weight:900;letter-spacing:1px;">
                <span style="font-size:1.1rem;">📖</span>
                <span style="color:rgba(\${ORO},0.6);font-size:0.6rem;background:rgba(\${ORO},0.1);padding:2px 8px;border-radius:6px;">7</span>
                LECTURA BÍBLICA
            </label>
            <input type="text" id="culto-sab_lectura_quien" placeholder="¿Quién lee la cita?"
                style="width:100%;padding:10px;background:rgba(0,0,0,0.35);border:1.5px solid rgba(\${ORO},0.3);color:#fff;border-radius:8px;outline:none;font-size:0.85rem;margin-bottom:6px;">
            \${renderBibliaStructHTML('sab_lectura')}
            <input type="hidden" id="culto-sab_lectura" value="">
        </div>\` +
        _campoItem('sab_oracion_intercesora', '8', '🙏', 'ORACIÓN INTERCESORA', 'Nombre del responsable...', ORO) +
        _campoItem('sab_musica_especial', '9', '🎤', 'MÚSICA ESPECIAL', 'Quién o qué grupo canta...', ORO) +
        predicador +
        himnoFinal +
        _campoItem('sab_oracion_final', '12', '🙌', 'ORACIÓN FINAL', 'Nombre del responsable...', ORO) +
        _campoItem('sab_sonido', '🎛️', '🎛️', 'ENCARGADO DE SONIDO', 'Nombre...', ORO) +
        _campoItem('sab_obs', '📝', '📝', 'OBSERVACIONES', 'Notas adicionales...', AZUL);
}
`;

code = code.slice(0, idxStart) + NEW_FUNC + code.slice(idxEnd + OLD_END.length);

// Restaurar CRLF
code = code.replace(/\n/g, '\r\n');
fs.writeFileSync('data_iglesia_v1.js', code, 'utf8');
console.log('[OK] _html12PasosSabado reconstruida con nuevos campos.');
