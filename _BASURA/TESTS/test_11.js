
            window.superGuardarNubeUniversal = async function() {
                const btn = document.getElementById('btn-guardar-universal');
                if (!btn) return;
                const oldHtml = btn.innerHTML;
                const oldBg = btn.style.background;
                btn.innerHTML = '�� Guardando Nube...';
                btn.disabled = true;

                try {
                    const colecciones = {
                        'legado_cultos_semanales': 'cultos',
                        'legado_eventos': 'eventos',
                        'legado_liturgias': 'liturgias',
                        'legado_predicaciones': 'predicaciones'
                    };

                    for (const [clave, colName] of Object.entries(colecciones)) {
                        const dataStr = localStorage.getItem(clave);
                        if (!dataStr) continue;
                        try {
                            const arr = JSON.parse(dataStr);
                            if (!Array.isArray(arr)) continue;
                            
                            for (const item of arr) {
                                if (!item.id) continue;
                                await db.collection('iglesias')
                                    .doc('cypress_hills_brooklyn')
                                    .collection(colName)
                                    .doc(item.id.toString())
                                    .set(item, { merge: true });
                            }
                        } catch(e) { console.warn('[GuardarUniversal] Error con', clave, e); }
                    }

                    btn.innerHTML = '✅ �Seguro en la Nube!';
                    btn.style.background = 'linear-gradient(135deg,#00b894,#55efc4)';
                    setTimeout(() => {
                        btn.innerHTML = oldHtml;
                        btn.disabled = false;
                        btn.style.background = oldBg;
                    }, 3500);

                } catch (e) {
                    console.error('[GuardarUniversal] Error:', e);
                    btn.innerHTML = '�� Error Nube';
                    btn.style.background = 'linear-gradient(135deg,#d63031,#e17055)';
                    setTimeout(() => { btn.innerHTML = oldHtml; btn.disabled = false; btn.style.background = oldBg; }, 3500);
                }
            };
        