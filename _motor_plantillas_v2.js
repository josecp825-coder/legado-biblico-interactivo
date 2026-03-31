// ========================================================
// MOTOR VISUAL DE PLANTILLAS V2 (IMG / HTML2CANVAS)
// ========================================================
// 🔒🔒🔒🔒🔒 ARCHIVO BLINDADO — APROBADO 2026-03-31 (v569)
// La plantilla de SÁBADO (_buildSabadoHTML) está BLOQUEADA.
// NO modificar diseño por zonas, campos, colores ni orden.
// NO renombrar campos de localStorage (sab_*).
// Cualquier cambio requiere aprobación EXPLÍCITA del usuario.
// Ver: .agents/workflows/legado-design-standards.md → REGLA #7
// ========================================================

window.accionGuardarRegistro = function(tipoCulto) {
    if (tipoCulto === 'semana') {
        if (typeof guardarCultoRegular === 'function') guardarCultoRegular();
    } else if (tipoCulto === 'sabado') {
        if (typeof guardarCulto === 'function') guardarCulto();
    }
};

// ========================================================
// TEMAS VISUALES
// ========================================================
function _getTheme(tipoCulto) {
    if (tipoCulto === 'sabado') {
        return {
            bg: '#08140C',
            cardBg: '#112217',
            dateGrad: 'linear-gradient(135deg, #1A3423, #152B1D)',
            titleGrad: 'linear-gradient(135deg, #244931, #1C3926)',
            textTitle: '#FFE484',
            textMain: '#FFFFFF',
            textDetail: '#B2D8C3',
            border1: '#E74C3C',
            border2: '#2ECC71',
            border3: '#F1C40F'
        };
    }
    return {
        bg: '#0A0818',
        cardBg: '#120F2B',
        dateGrad: 'linear-gradient(135deg, #1C1645, #151034)',
        titleGrad: 'linear-gradient(135deg, #2A216A, #1F184E)',
        textTitle: '#74B9FF',
        textMain: '#FFFFFF',
        textDetail: '#A29BFE',
        border1: '#A55EEA',
        border2: '#00CEC9',
        border3: '#FF9F43'
    };
}

// ========================================================
// 🏗️ BUILDER HTML — SÁBADO (Layout por Zonas)
// Diseño compacto: Servidores 2-col, Alabanza centrada,
// Programa litúrgico 3-col, Predicador destacado
// ========================================================
function _buildSabadoHTML(datos, theme) {
    const fechaText = formatearFechaAgradable(datos.fechaStr);
    const nombreAncianas = datos.ancianas || '—';

    let html = `
    <div style="font-family:'Segoe UI',sans-serif;background-color:${theme.bg};padding:28px;min-height:600px;">
        <div style="display:flex;flex-direction:column;gap:14px;">

            <!-- FECHA -->
            <div style="background:${theme.dateGrad};color:${theme.textTitle};text-align:center;padding:16px;border-radius:14px;font-size:1.5rem;font-weight:900;letter-spacing:1px;box-shadow:0 8px 16px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.06);">
                ${fechaText}
            </div>

            <!-- TITULO -->
            <div style="background:${theme.titleGrad};color:${theme.textTitle};text-align:center;padding:18px;border-radius:14px;font-size:1.8rem;font-weight:900;box-shadow:0 8px 16px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.08);">
                † CULTO DIVINO
            </div>

            <!-- ANCIANO DE TURNO -->
            <div style="background:rgba(255,255,255,0.03);text-align:center;padding:12px;border-radius:12px;border-top:3px solid ${theme.border1};">
                <div style="color:${theme.border1};font-size:1rem;font-weight:900;letter-spacing:1px;">ANCIANO(S) DE TURNO</div>
                <div style="color:${theme.textMain};font-size:1.4rem;font-weight:700;margin-top:4px;">${nombreAncianas}</div>
            </div>`;

    // ── ZONA: SERVIDORES (Diáconos/Diaconisas) ── 2 columnas compactas
    if (datos.servidores && datos.servidores.length > 0) {
        html += `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">`;
        datos.servidores.forEach(s => {
            html += `
                <div style="background-color:${theme.cardBg};border-radius:10px;padding:14px;border-left:6px solid ${theme.border2};text-align:center;box-shadow:0 4px 10px rgba(0,0,0,0.3);">
                    <div style="color:${theme.border2};font-size:0.8rem;font-weight:900;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;">${s.rol}</div>
                    <div style="color:${theme.textMain};font-size:1.1rem;font-weight:700;">${s.nombre || '—'}</div>
                </div>`;
        });
        html += `</div>`;
    }

    // ── ZONA: ALABANZA MUSICAL ── Banner centrado
    if (datos.alabanza && (datos.alabanza.director || datos.alabanza.himnos.length > 0)) {
        const himnos = datos.alabanza.himnos;
        let himnosTexto = himnos.map(h => h.texto).join('  •  ');

        html += `
            <div style="background:linear-gradient(135deg,rgba(116,185,255,0.12),rgba(116,185,255,0.04));border:2px solid rgba(116,185,255,0.4);border-radius:14px;padding:18px;text-align:center;">
                <div style="color:#74b9ff;font-size:1.3rem;font-weight:900;letter-spacing:2px;margin-bottom:8px;">🎵 ALABANZA MUSICAL</div>`;
        if (datos.alabanza.director) {
            html += `<div style="color:${theme.textMain};font-size:1.15rem;font-weight:700;margin-bottom:6px;">Dirige: ${datos.alabanza.director}</div>`;
        }
        if (himnosTexto) {
            html += `<div style="color:rgba(116,185,255,0.85);font-size:1rem;font-weight:600;line-height:1.6;font-style:italic;">${himnosTexto}</div>`;
        }
        html += `</div>`;
    }

    // ── ZONA: PROGRAMA LITÚRGICO (Pasos 0-8) ── 3 columnas
    const pasosAntes = (datos.pasos || []).filter(r => parseInt(r.num) <= 8);
    const pasosDespues = (datos.pasos || []).filter(r => parseInt(r.num) >= 9);

    if (pasosAntes.length > 0) {
        html += `
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">`;
        let idxColor = 0;
        pasosAntes.forEach(r => {
            let bColor = idxColor === 0 ? theme.border1 : (idxColor === 1 ? theme.border2 : theme.border3);
            idxColor = (idxColor + 1) % 3;

            const burbujaHtml = r.num ?
                `<div style="position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:11px;background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.85);font-size:0.72rem;display:flex;align-items:center;justify-content:center;font-weight:900;border:1px solid rgba(255,255,255,0.2);">${r.num}</div>`
                : '';
            let detailHtml = r.descripcion ? `<div style="color:${theme.textDetail};font-size:0.85rem;margin-top:4px;font-style:italic;line-height:1.2;text-align:center;">${r.descripcion}</div>` : '';
            let finalName = (r.nombre && r.nombre.trim() !== '') ? r.nombre : '—';

            html += `
                <div style="background-color:${theme.cardBg};border-radius:10px;padding:14px 10px;border-left:6px solid ${bColor};position:relative;display:flex;flex-direction:column;justify-content:center;min-height:70px;box-shadow:0 4px 10px rgba(0,0,0,0.35);">
                    ${burbujaHtml}
                    <div style="color:${theme.textTitle};font-size:0.78rem;font-weight:900;text-transform:uppercase;text-align:center;letter-spacing:0.3px;margin-bottom:5px;">
                        ${r.rol}
                    </div>
                    <div style="color:${theme.textMain};font-size:1.05rem;font-weight:800;text-align:center;line-height:1.1;">
                        ${finalName}
                    </div>
                    ${detailHtml}
                </div>`;
        });
        html += `</div>`;
    }

    // ── ZONA: PREDICADOR / TEMA ── Banner destacado (después del paso 9)
    if (datos.predicacion && (datos.predicacion.predicador || datos.predicacion.tema)) {
        html += `
            <div style="background:linear-gradient(135deg,rgba(253,203,110,0.15),rgba(253,203,110,0.05));border:2px solid rgba(253,203,110,0.5);border-radius:14px;padding:20px;text-align:center;box-shadow:0 6px 20px rgba(253,203,110,0.1);">
                <div style="color:#fdcb6e;font-size:1.3rem;font-weight:900;letter-spacing:2px;margin-bottom:10px;">🎤 PREDICACIÓN</div>`;
        if (datos.predicacion.presenta) {
            html += `<div style="color:rgba(255,255,255,0.5);font-size:0.95rem;margin-bottom:4px;">Presenta: <span style="color:${theme.textMain};font-weight:600;">${datos.predicacion.presenta}</span></div>`;
        }
        if (datos.predicacion.predicador) {
            html += `<div style="color:${theme.textMain};font-size:1.6rem;font-weight:900;margin-bottom:6px;">${datos.predicacion.predicador}</div>`;
        }
        if (datos.predicacion.tema) {
            html += `<div style="color:rgba(253,203,110,0.8);font-size:1.15rem;font-style:italic;line-height:1.3;">"${datos.predicacion.tema}"</div>`;
        }
        html += `</div>`;
    }

    // ── ZONA: DESPUÉS DE PREDICACIÓN (Música Especial + Himno Final + Oración Final) ── Centrado
    if (pasosDespues.length > 0) {
        // Calcular columnas: si son 3 usar 3-col, si 2 usar 2-col centrado, si 1 centrar solo
        const colCount = Math.min(pasosDespues.length, 3);
        const gridMax = colCount === 1 ? 'max-width:60%;margin:0 auto;' : (colCount === 2 ? 'max-width:85%;margin:0 auto;' : '');
        html += `
            <div style="display:grid;grid-template-columns:repeat(${colCount},1fr);gap:10px;${gridMax}">`;
        let idxC2 = 0;
        pasosDespues.forEach((r, idx) => {
            let bColor = idxC2 === 0 ? theme.border1 : (idxC2 === 1 ? theme.border2 : theme.border3);
            idxC2 = (idxC2 + 1) % 3;
            const burbujaHtml = r.num ?
                `<div style="position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:11px;background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.85);font-size:0.72rem;display:flex;align-items:center;justify-content:center;font-weight:900;border:1px solid rgba(255,255,255,0.2);">${r.num}</div>`
                : '';
            let detailHtml = r.descripcion ? `<div style="color:${theme.textDetail};font-size:0.85rem;margin-top:4px;font-style:italic;line-height:1.2;text-align:center;">${r.descripcion}</div>` : '';
            let finalName = (r.nombre && r.nombre.trim() !== '') ? r.nombre : '—';

            // Si es el último y queda impar, centrar
            let extraStyle = '';
            if (idx === pasosDespues.length - 1 && pasosDespues.length % colCount !== 0) {
                extraStyle = 'grid-column: 1 / -1; max-width:60%; margin:0 auto; width:100%; box-sizing:border-box;';
            }

            html += `
                <div style="background-color:${theme.cardBg};border-radius:10px;padding:14px 10px;border-left:6px solid ${bColor};position:relative;display:flex;flex-direction:column;justify-content:center;min-height:70px;box-shadow:0 4px 10px rgba(0,0,0,0.35);${extraStyle}">
                    ${burbujaHtml}
                    <div style="color:${theme.textTitle};font-size:0.78rem;font-weight:900;text-transform:uppercase;text-align:center;letter-spacing:0.3px;margin-bottom:5px;">
                        ${r.rol}
                    </div>
                    <div style="color:${theme.textMain};font-size:1.05rem;font-weight:800;text-align:center;line-height:1.1;">
                        ${finalName}
                    </div>
                    ${detailHtml}
                </div>`;
        });
        html += `</div>`;
    }

    // ── ZONA: SONIDO ──
    if (datos.sonido) {
        html += `
            <div style="background-color:${theme.cardBg};border-radius:10px;padding:12px;text-align:center;border:1px solid rgba(255,255,255,0.08);">
                <span style="color:rgba(255,255,255,0.4);font-size:0.9rem;font-weight:700;">🎛️ Sonido:</span>
                <span style="color:${theme.textMain};font-size:1rem;font-weight:700;margin-left:6px;">${datos.sonido}</span>
            </div>`;
    }

    // ── FOOTER ──
    html += `
            <div style="text-align:center;color:rgba(255,255,255,0.35);font-size:0.95rem;font-weight:800;margin-top:20px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);">
                Legado Bíblico — Iglesia Adventista Cypress Hills — Brooklyn, NY
            </div>
        </div>
    </div>`;

    return html;
}

// ========================================================
// 🏗️ BUILDER HTML — SEMANA (2 columnas clásico)
// ========================================================
function _buildSemanaHTML(datos, theme) {
    const fechaText = formatearFechaAgradable(datos.fechaStr);
    const nombreAncianas = datos.ancianas || '—';
    const tipoTitulo = '✝ CULTO DE ' + datos.tipo.toUpperCase();

    let html = `
    <div style="font-family:'Segoe UI',sans-serif;background-color:${theme.bg};padding:30px;min-height:1000px;">
        <div style="display:flex;flex-direction:column;gap:15px;">
            <div style="background:${theme.dateGrad};color:${theme.textTitle};text-align:center;padding:18px;border-radius:14px;font-size:1.6rem;font-weight:900;letter-spacing:1px;box-shadow:0 8px 16px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.06);">
                ${fechaText}
            </div>
            <div style="background:${theme.titleGrad};color:${theme.textTitle};text-align:center;padding:20px;border-radius:14px;font-size:1.9rem;font-weight:900;box-shadow:0 8px 16px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.08);">
                ${tipoTitulo}
            </div>
            <div style="background:rgba(255,255,255,0.03);text-align:center;padding:12px;border-radius:12px;border-top:3px solid ${theme.border1};margin-bottom:10px;">
                <div style="color:${theme.border1};font-size:1.1rem;font-weight:900;letter-spacing:1px;">ANCIANO(S) DE TURNO</div>
                <div style="color:${theme.textMain};font-size:1.5rem;font-weight:700;margin-top:4px;">${nombreAncianas}</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">`;

    let idxColor = 0;
    const totalRoles = datos.roles.length;

    datos.roles.forEach((r, idx) => {
        let bColor = idxColor === 0 ? theme.border1 : (idxColor === 1 ? theme.border2 : theme.border3);
        idxColor = (idxColor + 1) % 3;

        const burbujaHtml = r.num ?
            `<div style="position:absolute;top:10px;right:10px;width:24px;height:24px;border-radius:12px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);font-size:0.8rem;display:flex;align-items:center;justify-content:center;font-weight:900;border:1px solid rgba(255,255,255,0.2);">${r.num}</div>`
            : '';
        let detailHtml = r.descripcion ? `<div style="color:${theme.textDetail};font-size:1.1rem;margin-top:6px;font-style:italic;line-height:1.3;text-align:center;">${r.descripcion}</div>` : '';
        let finalName = (r.nombre && r.nombre.trim() !== '') ? r.nombre : '—';

        let extraStyle = '';
        if (idx === totalRoles - 1 && totalRoles % 2 !== 0) {
            extraStyle = 'grid-column: 1 / -1; max-width: 80%; margin: 0 auto; width: 100%; box-sizing: border-box;';
        }

        html += `
            <div style="background-color:${theme.cardBg};border-radius:12px;padding:22px;border-left:8px solid ${bColor};position:relative;display:flex;flex-direction:column;justify-content:center;min-height:90px;box-shadow:0 6px 12px rgba(0,0,0,0.4);${extraStyle}">
                ${burbujaHtml}
                <div style="color:${theme.textTitle};font-size:1.05rem;font-weight:900;text-transform:uppercase;text-align:center;letter-spacing:0.5px;margin-bottom:8px;">
                    ${r.rol}
                </div>
                <div style="color:${theme.textMain};font-size:1.4rem;font-weight:800;text-align:center;line-height:1.2;">
                    ${finalName}
                </div>
                ${detailHtml}
            </div>`;
    });

    html += `
            </div>
            <div style="text-align:center;color:rgba(255,255,255,0.4);font-size:1.1rem;font-weight:800;margin-top:30px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.1);">
                Legado Biblico — Iglesia Adventista Cypress Hills — Brooklyn, NY
            </div>
        </div>
    </div>`;

    return html;
}

// ========================================================
// MOTOR DE RENDERIZADO COMPARTIDO
// ========================================================
async function _renderizarPlantilla(datos, tipoCulto) {
    const theme = _getTheme(tipoCulto);
    const esSabado = (tipoCulto === 'sabado' || datos.tipo === 'SÁBADO');

    const div = document.createElement('div');
    document.body.appendChild(div);
    div.id = 'plantilla-temp-render';
    div.style.position = 'absolute';
    div.style.left = '-9999px';
    div.style.top = '0px';
    div.style.width = '700px';

    div.innerHTML = esSabado ? _buildSabadoHTML(datos, theme) : _buildSemanaHTML(datos, theme);

    try {
        if (typeof html2canvas === 'undefined') {
            alert('Librería de imágenes no disponible. Refresca la página.');
            div.remove();
            return;
        }
        const canvas = await html2canvas(div, { scale: 2, useCORS: true, backgroundColor: theme.bg });
        div.remove();
        mostrarModalImagenRenderizada(canvas, tipoCulto, datos.fechaStr);
    } catch (e) {
        console.error("Error html2canvas", e);
        if (typeof mostrarToast === 'function') mostrarToast('Hubo un problema al dibujar la imagen', 3000);
        div.remove();
    }
}

/**
 * Función principal activada por el botón "✨ PLANTILLA"
 */
window.accionGenerarPlantilla = async function(tipoCulto) {
    if (typeof mostrarToast === 'function') mostrarToast('Generando plantilla de alta resolución...', 1000);
    const datos = extraerDatosCompletos(tipoCulto);
    if (!datos) return;
    await _renderizarPlantilla(datos, tipoCulto);
};

/**
 * Muestra un modal elegante que permite previsualizar la imagen generada
 * y compartirla o guardarla igual que con el motor anterior.
 */
function mostrarModalImagenRenderizada(canvas, tipoCulto, fechaTxt) {
    canvas.toBlob(function(blob) {
        if (!blob) {
            if (typeof mostrarToast === 'function') mostrarToast('Error comprimiendo la imagen');
            return;
        }

        const blobUrl = URL.createObjectURL(blob);
        const fileName = 'Culto_' + tipoCulto.toUpperCase() + '_' + fechaTxt + '.png';

        const old = document.getElementById('visor-plantilla-v2');
        if (old) old.remove();

        const bgBtn = tipoCulto === 'sabado' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(162, 155, 254, 0.2)';
        const cBtn = tipoCulto === 'sabado' ? '#2ecc71' : '#a29bfe';

        const modal = document.createElement('div');
        modal.id = 'visor-plantilla-v2';
        modal.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;';
        modal.innerHTML = `
            <div style="width:100%;padding:18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);background:#000;">
                <div style="color:${cBtn};font-weight:900;font-size:1.1rem;letter-spacing:1px;">✅ PLANTILLA LISTA</div>
                <button id="cerrar-visor-plantilla" style="background:rgba(255,255,255,0.1);border:none;color:white;padding:8px 16px;border-radius:8px;font-weight:900;font-size:1rem;cursor:pointer;">✕ CERRAR</button>
            </div>
            <div style="flex:1;overflow-y:auto;width:100%;display:flex;justify-content:center;padding:15px;box-sizing:border-box;">
                <img src="${blobUrl}" style="max-width:100%;height:auto;object-fit:contain;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            </div>
            <div style="width:100%;padding:15px;display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#000;border-top:1px solid rgba(255,255,255,0.08);">
                <button id="btn-share-img" style="padding:16px;background:${bgBtn};border:1.5px solid ${cBtn};color:${cBtn};border-radius:14px;cursor:pointer;font-weight:900;font-size:1.1rem;box-shadow:0 4px 15px ${bgBtn};">📤 ENVIAR</button>
                <button id="btn-save-img" style="padding:16px;background:rgba(116,185,255,0.15);border:1.5px solid #74b9ff;color:#74b9ff;border-radius:14px;cursor:pointer;font-weight:900;font-size:1.1rem;">💾 GUARDAR FOTO</button>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('cerrar-visor-plantilla').onclick = () => {
            modal.remove(); URL.revokeObjectURL(blobUrl);
        };

        const executeShare = () => {
            const file = new File([blob], fileName, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ title: 'Programa ' + tipoCulto, files: [file] })
                    .then(() => { modal.remove(); URL.revokeObjectURL(blobUrl); })
                    .catch(e => { if (e.name !== 'AbortError') window.open(blobUrl, '_blank'); });
            } else {
                window.open(blobUrl, '_blank');
            }
        };

        document.getElementById('btn-share-img').onclick = executeShare;

        document.getElementById('btn-save-img').onclick = () => {
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            a.click();
        };
    }, 'image/png', 0.95);
}

// ========================================================
// EXTRACTOR DE DATOS — DOM ACTIVO
// ========================================================
function extraerDatosCompletos(tipoCulto) {
    const val = id => {
        const el = document.getElementById(id);
        if (!el) return '';
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
            return el.value.trim();
        }
        return el.innerText.trim();
    };

    let p = {
        fechaStr: '',
        tipo: '',
        ancianas: '',
        roles: [],
        // Zonas para sábado
        servidores: [],
        alabanza: { director: '', himnos: [] },
        pasos: [],
        predicacion: { presenta: '', predicador: '', tema: '' },
        sonido: ''
    };

    if (tipoCulto === 'sabado') {
        p.fechaStr = val('culto-fecha');
        p.tipo = 'SÁBADO';
        p.ancianas = val('culto-sab_anciano');

        // SERVIDORES
        if (val('culto-sab_diaconos_puerta')) p.servidores.push({ rol: 'Diáconos (Puerta)', nombre: val('culto-sab_diaconos_puerta') });
        if (val('culto-sab_diaconisas_puerta')) p.servidores.push({ rol: 'Diaconisas (Puerta)', nombre: val('culto-sab_diaconisas_puerta') });
        if (val('culto-sab_diaconos_ofrendas')) p.servidores.push({ rol: 'Diáconos (Ofrendas)', nombre: val('culto-sab_diaconos_ofrendas') });
        if (val('culto-sab_diaconisas_ofrendas')) p.servidores.push({ rol: 'Diaconisas (Ofrendas)', nombre: val('culto-sab_diaconisas_ofrendas') });

        // ALABANZA MUSICAL
        p.alabanza.director = val('culto-sab_musica_ante_quien');
        for (var _hi = 1; _hi <= 4; _hi++) {
            var _hv = val('culto-sab_musica_himno' + _hi);
            if (_hv) {
                var _hn = parseInt(String(_hv).replace('#',''));
                var _ht = (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[_hn]) ? HIMNARIO_ADVENTISTA[_hn] : '';
                p.alabanza.himnos.push({ texto: '#' + _hv + (_ht ? ' — ' + _ht : '') });
            }
        }

        // PASOS LITÚRGICOS
        const pushP = (n, r, v, d) => {
            if(v) p.pasos.push({num: n, rol: r, nombre: v, descripcion: d||''});
        };
        pushP('0', 'Llamado Adoración', val('culto-sab_llamado'));
        var doxDesc = '#55';
        if (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[55]) doxDesc += ' — ' + HIMNARIO_ADVENTISTA[55];
        pushP('1', 'Doxología', val('culto-sab_doxologia'), doxDesc);
        pushP('2', 'Invocación', val('culto-sab_invocacion'));
        pushP('3', 'Bienvenida', val('culto-sab_bienvenida'));
        pushP('4', 'Rincón Infantil', val('culto-sab_infantil'), val('culto-sab_infantil_anuncia') ? 'Anuncia: ' + val('culto-sab_infantil_anuncia') : '');
        pushP('5', 'Diezmos y Ofrendas', val('culto-sab_ofrendas'));
        // Himno Adoración
        var h6Desc = '';
        var h6Val = val('culto-sab_himno6');
        if (h6Val) {
            var _h6n = parseInt(String(h6Val).replace('#',''));
            h6Desc = '#' + h6Val;
            if (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[_h6n]) h6Desc += ' — ' + HIMNARIO_ADVENTISTA[_h6n];
        }
        pushP('6', 'Himno Adoración', val('culto-sab_himno_anuncia'), h6Desc);
        pushP('7', 'Lectura Bíblica', val('culto-sab_lectura_quien'), val('culto-sab_lectura'));
        pushP('8', 'Oración Intercesora', val('culto-sab_oracion_intercesora'));
        pushP('9', 'Música Especial', val('culto-sab_musica_especial'), val('culto-sab_musica_especial_anuncia') ? 'Anuncia: ' + val('culto-sab_musica_especial_anuncia') : '');
        // Himno Final
        var hfDesc = '';
        var hfVal = val('culto-sab_himno_final');
        if (hfVal) {
            var _hfn = parseInt(String(hfVal).replace('#',''));
            hfDesc = '#' + hfVal;
            if (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[_hfn]) hfDesc += ' — ' + HIMNARIO_ADVENTISTA[_hfn];
        }
        pushP('11', 'Himno Final', val('culto-sab_himno_final_quien'), hfDesc);
        pushP('12', 'Oración Final', val('culto-sab_oracion_final'));

        // PREDICACIÓN
        p.predicacion.presenta = val('culto-sab_pred_anuncia');
        p.predicacion.predicador = val('culto-sab_predicador');
        p.predicacion.tema = val('culto-sab_tema');

        // SONIDO
        p.sonido = val('culto-sab_sonido');

        // Backward compat: roles = pasos
        p.roles = p.pasos;

    } else {
        // SEMANAL (sin cambios)
        p.fechaStr = val('reg-fecha');
        p.tipo = val('reg-dia') || 'SEMANAL';
        p.ancianas = val('reg-anciano');

        const pushR = (n, r, v, d) => {
            if(v) p.roles.push({num: n, rol: r, nombre: v, descripcion: d||''});
        };

        const lecturaTxt = val('reg-lectura-libro') ? `${val('reg-lectura-libro')} ${val('reg-lectura-capitulo')}:${val('reg-lectura-versiculos')}` : '';

        let i = 1;
        pushR('', 'Diácono(s)', val('reg-diacono'));
        pushR('', 'Diaconisa(s)', val('reg-diaconisa'));
        pushR(i++, 'Alabanza', val('reg-alabanza'));
        pushR(i++, 'Bienvenida', val('reg-bienvenida'));
        pushR(i++, 'Oración Inicial', val('reg-oracionIni'));
        pushR(i++, 'Himno Inicial', val('reg-himnoIni-quien'), val('reg-himnoIni') ? '#' + val('reg-himnoIni') + (val('himno-titulo-reg-himnoIni') ? ' — ' + val('himno-titulo-reg-himnoIni') : '') : '');
        pushR(i++, 'Lectura Bíblica', val('reg-lectura-quien'), lecturaTxt);

        if (val('reg-testimonios') !== '') {
            pushR(i++, 'Testimonios', val('reg-testimonios'));
        }

        pushR(i++, 'Música Especial', val('reg-especial'), val('reg-especial-quien') ? 'Anuncia: '+val('reg-especial-quien') : '');

        if (val('reg-predicador-quien')) {
            pushR(i++, 'Presenta al Predicador', val('reg-predicador-quien'));
        }

        let descMensaje = '';
        if (val('reg-mensaje-tema')) descMensaje = '📌 Tema: "' + val('reg-mensaje-tema') + '"';
        pushR(i++, 'Predicador', val('reg-mensaje'), descMensaje);

        pushR(i++, 'Himno Final', val('reg-himnoFin-quien') || val('reg-himnoFin'), val('reg-himnoFin-quien') && val('reg-himnoFin') ? '#' + val('reg-himnoFin') + (val('himno-titulo-reg-himnoFin') ? ' — ' + val('himno-titulo-reg-himnoFin') : '') : '');
        pushR(i++, 'Oración Final', val('reg-oracionFin'));

        if (val('reg-sonido')) {
            pushR(i++, 'Encargado de Sonido', val('reg-sonido'));
        }
    }

    return p;
}

function formatearFechaAgradable(fechaStr) {
    if (!fechaStr) return "Sábado, Próximo";
    try {
        const p = fechaStr.split('-');
        const f = new Date(p[0], p[1]-1, p[2]);
        const req = f.toLocaleDateString('es-ES', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
        return req.toUpperCase();
    } catch(e) {
        return fechaStr;
    }
}

// ==========================================
// 📄 MOTOR DE EXPORTACIÓN PDF
// ==========================================
window.accionGenerarPDF = async function(tipoCulto) {
    if (typeof mostrarToast === 'function') mostrarToast('Armando documento PDF...', 2000);

    const viejaFn = mostrarModalImagenRenderizada;

    mostrarModalImagenRenderizada = function(canvas, t, fTxt) {
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
            alert('Librería PDF no cargada. Refresca e intenta de nuevo.');
            mostrarModalImagenRenderizada = viejaFn;
            return;
        }

        try {
            const doc = new window.jspdf.jsPDF('p', 'mm', 'letter');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const imgData = canvas.toDataURL('image/png', 1.0);
            const margin = 10;
            const w = pageWidth - (margin * 2);
            const h = (canvas.height * w) / canvas.width;
            const finalBg = tipoCulto === 'sabado' ? '#08140C' : '#0A0818';
            doc.setFillColor(finalBg);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            doc.addImage(imgData, 'PNG', margin, margin, w, h);
            doc.save('Culto_' + t.toUpperCase() + '_' + fTxt + '.pdf');
            if (typeof mostrarToast === 'function') mostrarToast('✅ PDF Descargado Exitosamente', 2000);
        } catch(e) {
            console.error('Error generando PDF', e);
            alert('Hubo un problema procesando el PDF.');
        }

        mostrarModalImagenRenderizada = viejaFn;
    };

    await window.accionGenerarPlantilla(tipoCulto);
};

// ==========================================
// 🎯 FUNCIONES DIRECTAS DESDE REGISTRO (SIN DOM)
// Para uso desde el historial — lee de localStorage
// ==========================================

/**
 * Convierte un objeto de registro de culto en la estructura
 * que usa el motor de plantillas, SIN leer del DOM.
 */
function convertirRegistroADatos(reg) {
    let p = {
        fechaStr: reg.fecha || '',
        tipo: reg.dia || reg.tipo || 'SEMANAL',
        ancianas: reg.anciano || reg.sab_anciano || '—',
        roles: [],
        servidores: [],
        alabanza: { director: '', himnos: [] },
        pasos: [],
        predicacion: { presenta: '', predicador: '', tema: '' },
        sonido: ''
    };

    const pushR = (n, r, v, d) => {
        if(v && v !== '-' && v.trim() !== '') p.roles.push({num: n, rol: r, nombre: v, descripcion: d||''});
    };

    if (p.tipo.toUpperCase() === 'SÁBADO' || p.tipo.toUpperCase() === 'SABADO') {
        p.tipo = 'SÁBADO';

        // SERVIDORES
        if (reg.sab_diaconos_puerta) p.servidores.push({ rol: 'Diáconos (Puerta)', nombre: reg.sab_diaconos_puerta });
        if (reg.sab_diaconisas_puerta) p.servidores.push({ rol: 'Diaconisas (Puerta)', nombre: reg.sab_diaconisas_puerta });
        if (reg.sab_diaconos_ofrendas) p.servidores.push({ rol: 'Diáconos (Ofrendas)', nombre: reg.sab_diaconos_ofrendas });
        if (reg.sab_diaconisas_ofrendas) p.servidores.push({ rol: 'Diaconisas (Ofrendas)', nombre: reg.sab_diaconisas_ofrendas });

        // ALABANZA MUSICAL
        p.alabanza.director = reg.sab_musica_ante_quien || '';
        for (var _hi = 1; _hi <= 4; _hi++) {
            var _hv = reg['sab_musica_himno' + _hi];
            if (_hv) {
                var _hn = parseInt(String(_hv).replace('#',''));
                var _ht = (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[_hn]) ? HIMNARIO_ADVENTISTA[_hn] : '';
                p.alabanza.himnos.push({ texto: '#' + _hv + (_ht ? ' — ' + _ht : '') });
            }
        }

        // PASOS LITÚRGICOS
        const pushP = (n, r, v, d) => {
            if(v && v !== '-' && v.trim() !== '') p.pasos.push({num: n, rol: r, nombre: v, descripcion: d||''});
        };
        pushP('0', 'Llamado Adoración', reg.sab_llamado);
        var doxDescH = '#55';
        if (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[55]) doxDescH += ' — ' + HIMNARIO_ADVENTISTA[55];
        pushP('1', 'Doxología', reg.sab_doxologia, doxDescH);
        pushP('2', 'Invocación', reg.sab_invocacion);
        pushP('3', 'Bienvenida', reg.sab_bienvenida);
        pushP('4', 'Rincón Infantil', reg.sab_infantil, reg.sab_infantil_anuncia ? 'Anuncia: ' + reg.sab_infantil_anuncia : '');
        pushP('5', 'Diezmos y Ofrendas', reg.sab_ofrendas);
        // Himno Adoración
        var h6Desc = '';
        if (reg.sab_himno6) {
            var h6n = parseInt(String(reg.sab_himno6).replace('#',''));
            h6Desc = '#' + reg.sab_himno6;
            if (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[h6n]) h6Desc += ' — ' + HIMNARIO_ADVENTISTA[h6n];
        }
        pushP('6', 'Himno Adoración', reg.sab_himno_anuncia, h6Desc);
        pushP('7', 'Lectura Bíblica', reg.sab_lectura_quien, reg.sab_lectura);
        pushP('8', 'Oración Intercesora', reg.sab_oracion_intercesora);
        pushP('9', 'Música Especial', reg.sab_musica_especial, reg.sab_musica_especial_anuncia ? 'Anuncia: ' + reg.sab_musica_especial_anuncia : '');
        // Himno Final
        var hfDesc = '';
        if (reg.sab_himno_final) {
            var hfn = parseInt(String(reg.sab_himno_final).replace('#',''));
            hfDesc = '#' + reg.sab_himno_final;
            if (typeof HIMNARIO_ADVENTISTA !== 'undefined' && HIMNARIO_ADVENTISTA[hfn]) hfDesc += ' — ' + HIMNARIO_ADVENTISTA[hfn];
        }
        pushP('11', 'Himno Final', reg.sab_himno_final_quien, hfDesc);
        pushP('12', 'Oración Final', reg.sab_oracion_final);

        // PREDICACIÓN
        p.predicacion.presenta = reg.sab_pred_anuncia || '';
        p.predicacion.predicador = reg.sab_predicador || '';
        p.predicacion.tema = reg.sab_tema || '';

        // SONIDO
        p.sonido = reg.sab_sonido || '';

        // Backward compat: roles = pasos
        p.roles = p.pasos;
        return p;
    }

    // ── SEMANAL (sin cambios) ──
    const lecturaTxt = reg.lectura || '';

    let h1Desc = '';
    if (reg.himnoIni && reg.himnoIni !== '-') {
        h1Desc = '#' + reg.himnoIni;
        if (reg.himnoIni_titulo) h1Desc += ' — ' + reg.himnoIni_titulo;
    }
    let h2Desc = '';
    if (reg.himnoFin && reg.himnoFin !== '-') {
        h2Desc = '#' + reg.himnoFin;
        if (reg.himnoFin_titulo) h2Desc += ' — ' + reg.himnoFin_titulo;
    }

    let i = 1;
    pushR('', 'Diácono(s)', reg.diacono);
    pushR('', 'Diaconisa(s)', reg.diaconisa);
    pushR(i++, 'Alabanza', reg.alabanza);
    pushR(i++, 'Bienvenida', reg.bienvenida);
    pushR(i++, 'Oración Inicial', reg.oracionIni);
    pushR(i++, 'Himno Inicial', reg.himnoIni_quien || reg.himnoIni, h1Desc || '');
    pushR(i++, 'Lectura Bíblica', reg.lectura_quien, lecturaTxt !== '-' ? lecturaTxt : '');

    if (reg.dia === 'miercoles' && reg.testimonios && reg.testimonios !== '-') {
        pushR(i++, 'Testimonios', reg.testimonios);
    }

    pushR(i++, 'Música Especial', reg.especial, reg.especial_quien && reg.especial_quien !== '-' ? 'Anuncia: '+reg.especial_quien : '');

    if (reg.predicador_quien && reg.predicador_quien !== '-') {
        pushR(i++, 'Presenta al Predicador', reg.predicador_quien);
    }

    let descMensajeHist = '';
    if (reg.mensaje_tema && reg.mensaje_tema !== '-') descMensajeHist = '📌 Tema: "' + reg.mensaje_tema + '"';
    pushR(i++, 'Predicador', reg.mensaje, descMensajeHist);

    pushR(i++, 'Himno Final', reg.himnoFin_quien || reg.himnoFin, (reg.himnoFin_quien && reg.himnoFin && reg.himnoFin !== '-' && h2Desc) ? h2Desc : '');
    pushR(i++, 'Oración Final', reg.oracionFin);

    if (reg.sonido && reg.sonido !== '-') {
        pushR(i++, 'Encargado de Sonido', reg.sonido);
    }

    return p;
}

/**
 * Genera la plantilla visual (imagen) directamente desde un registro de localStorage.
 * NO abre el formulario. NO depende del DOM.
 */
window.generarPlantillaDesdeRegistro = async function(reg) {
    if (typeof mostrarToast === 'function') mostrarToast('Generando plantilla de alta resolución...', 1000);

    const datos = convertirRegistroADatos(reg);
    if (!datos || (datos.roles.length === 0 && datos.pasos.length === 0)) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay datos suficientes para generar plantilla');
        return;
    }

    const esSab = datos.tipo === 'SÁBADO';
    await _renderizarPlantilla(datos, esSab ? 'sabado' : 'semana');
};

/**
 * Genera PDF directamente desde un registro de localStorage.
 * NO abre el formulario. NO depende del DOM.
 */
window.generarPDFDesdeRegistro = async function(reg) {
    if (typeof mostrarToast === 'function') mostrarToast('Armando documento PDF...', 2000);

    const datos = convertirRegistroADatos(reg);
    if (!datos || (datos.roles.length === 0 && datos.pasos.length === 0)) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ No hay datos suficientes para generar PDF');
        return;
    }

    const esSab = datos.tipo === 'SÁBADO';
    const viejaFn = mostrarModalImagenRenderizada;

    mostrarModalImagenRenderizada = function(canvas, t, fTxt) {
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
            alert('Librería PDF no cargada. Refresca e intenta de nuevo.');
            mostrarModalImagenRenderizada = viejaFn;
            return;
        }
        try {
            const doc = new window.jspdf.jsPDF('p', 'mm', 'letter');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const imgData = canvas.toDataURL('image/png', 1.0);
            const margin = 10;
            const w = pageWidth - (margin * 2);
            const h = (canvas.height * w) / canvas.width;
            const bgColor = esSab ? '#08140C' : '#0A0818';
            doc.setFillColor(bgColor);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            doc.addImage(imgData, 'PNG', margin, margin, w, h);
            doc.save('Culto_' + (esSab ? 'SABADO' : 'SEMANA') + '_' + fTxt + '.pdf');
            if (typeof mostrarToast === 'function') mostrarToast('✅ PDF Descargado', 2000);
        } catch(e) {
            console.error('Error generando PDF', e);
            alert('Hubo un problema procesando el PDF.');
        }
        mostrarModalImagenRenderizada = viejaFn;
    };

    await _renderizarPlantilla(datos, esSab ? 'sabado' : 'semana');
};

// ==========================================
// 📲 DELEGAR CULTO (Enviar Plantilla Base)
// ==========================================
window.accionDelegarCulto = function(tipoCulto) {
    const datos = extraerDatosCompletos(tipoCulto);
    if (!datos) return;

    let txt = `🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\n`;
    txt += `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n`;
    txt += `📝 *PROGRAMA A DELEGAR* | *${datos.tipo}*\n`;
    txt += `📅 *Fecha:* ${formatearFechaAgradable(datos.fechaStr)}\n`;
    txt += `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`;
    txt += `_(Por favor copiar este formato, completar los nombres al lado del guión y enviarlo de vuelta al grupo)_\n\n`;
    txt += `*Anciano(a) de Turno:* —\n`;

    datos.roles.forEach(r => {
        let n = r.num ? r.num + '. ' : '';
        txt += `*${n}${r.rol}:* —\n`;
    });

    txt += `\n*Observaciones Adicionales:* —\n`;
    txt += `\n*Aprobado Por:* —\n`;

    const wUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(txt);
    window.open(wUrl, '_blank');
};
