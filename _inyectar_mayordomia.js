// ═══════════════════════════════════════════════════════════════
// INYECCIÓN ÚNICA — Semana de Mayordomía 2026
// Se ejecuta UNA VEZ al cargar y luego se auto-desactiva
// ═══════════════════════════════════════════════════════════════
(function _inyectarSemMayordomia2026() {
    // Evitar doble inyección
    if (localStorage.getItem('_mayordomia2026_v3')) return;

    const ID = 1742220000000; // ID fijo para este evento

    // Borrar TODAS las versiones anteriores (por ID y por título)
    let existentes = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    existentes = existentes.filter(e => e.id !== ID && !(e.titulo && e.titulo.indexOf('Mayordom') !== -1 && e.titulo.indexOf('2026') !== -1));

    const h204 = 'A Jesús Entregarle Todo';

    const evento = {
        id: ID,
        tipo: 'semana_mayordomia',
        emoji: '🙏👪⌚💰',
        color: '#00b894',
        titulo: 'Semana de Mayordomía 2026',
        fechaInicio: '2026-03-15',
        duracion: 6,
        dias: [
            // ── DOMINGO 15 DE MARZO ──────────────────────────
            {
                fecha: '2026-03-15', diaSemana: 0,
                datos: {
                    maestro_ceremonia: 'Patricia Fajardo',
                    alabanza_director: 'José Cardón',
                    alabanza_himno1: '204', titulo_alabanza_himno1: h204,
                    himno_apertura: '204', titulo_himno_apertura: h204,
                    anuncia_lectura: 'Flavio Candelario',
                    cita_biblica: '2 Reyes 6:8-15',
                    oracion_inicial: 'Omar López',
                    tema: 'El Mayordomo Bíblico',
                    orador: 'Pr. Rafael Solano',
                    presenta_himno_final: 'José Cardón',
                    himno_final: '204', titulo_himno_final: h204,
                    gen_sonido: 'Pr. Rafael Solano'
                }
            },
            // ── LUNES 16 DE MARZO ──────────────────────────
            {
                fecha: '2026-03-16', diaSemana: 1,
                datos: {
                    maestro_ceremonia: 'José López',
                    alabanza_director: 'Luis López',
                    alabanza_himno1: '204', titulo_alabanza_himno1: h204,
                    himno_apertura: '204', titulo_himno_apertura: h204,
                    anuncia_lectura: 'Yuliana Meza',
                    cita_biblica: 'Éxodos 4:1-2',
                    tema: 'El Mayordomo sirve a través del diezmo cedido',
                    orador: 'Pr. Rhankel Solano',
                    presenta_himno_final: 'José Cardón',
                    himno_final: '204', titulo_himno_final: h204,
                    gen_sonido: 'Pr. Rafael Solano'
                }
            },
            // ── MARTES 17 DE MARZO ──────────────────────────
            {
                fecha: '2026-03-17', diaSemana: 2,
                datos: {
                    maestro_ceremonia: 'José Luis Candelario',
                    alabanza_director: 'Angel Candelario',
                    alabanza_himno1: '204', titulo_alabanza_himno1: h204,
                    himno_apertura: '204', titulo_himno_apertura: h204,
                    anuncia_lectura: 'Marisol Martínez',
                    cita_biblica: 'Colosenses 3:1-4',
                    tema: 'El Mayordomo sirve a través del tiempo cedido',
                    orador: 'Pr. Rhankel Solano',
                    presenta_himno_final: 'José Cardón',
                    himno_final: '204', titulo_himno_final: h204,
                    gen_sonido: 'Pr. Rafael Solano'
                }
            },
            // ── MIERCOLES 18 DE MARZO ──────────────────────────
            {
                fecha: '2026-03-18', diaSemana: 3,
                datos: {
                    maestro_ceremonia: 'José Lopez (Abuelo) / Luis Lopez (Escucha)',
                    alabanza_director: 'Luis López',
                    alabanza_himno1: '204', titulo_alabanza_himno1: h204,
                    himno_apertura: '204', titulo_himno_apertura: h204,
                    anuncia_lectura: 'Yuliana Meza',
                    cita_biblica: 'San Mateo 6:19',
                    tema: 'Donde está tu tesoro ahí está tu corazón',
                    orador: 'Joel Jordán',
                    presenta_himno_final: 'José Cardón',
                    himno_final: '204', titulo_himno_final: h204,
                    gen_sonido: 'Pr. Rafael Solano'
                }
            },
            // ── JUEVES 19 DE MARZO ──────────────────────────
            {
                fecha: '2026-03-19', diaSemana: 4,
                datos: {
                    maestro_ceremonia: 'Derecho Valencia / Olive o Orestina',
                    alabanza_director: 'Fundación Billboard',
                    alabanza_himno1: '204', titulo_alabanza_himno1: h204,
                    himno_apertura: '204', titulo_himno_apertura: h204,
                    cita_biblica: 'Santiago 4:17',
                    tema: 'Vive lo que profesas',
                    orador: 'Pr. Rafael Solano',
                    presenta_himno_final: 'José Cardón',
                    himno_final: '204', titulo_himno_final: h204,
                    gen_sonido: 'Pr. Rafael Solano'
                }
            },
            // ── VIERNES 20 DE MARZO ──────────────────────────
            {
                fecha: '2026-03-20', diaSemana: 5,
                datos: {
                    maestro_ceremonia: 'Aldrea A. (Mamá) / Juan A. (Abuelo)',
                    alabanza_director: 'Maribel Amador',
                    alabanza_himno1: '204', titulo_alabanza_himno1: h204,
                    himno_apertura: '204', titulo_himno_apertura: h204,
                    cita_biblica: '1 Corintios 4:2',
                    tema: 'Dios es el dueño y quiere mayordomos fieles',
                    orador: 'Patricia Amador',
                    presenta_himno_final: 'José Cardón',
                    himno_final: '204', titulo_himno_final: h204,
                    gen_sonido: 'Pr. Rafael Solano'
                }
            }
        ],
        creadoEn: new Date().toISOString()
    };

    existentes.unshift(evento);
    existentes.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
    localStorage.setItem('legado_eventos', JSON.stringify(existentes));
    localStorage.setItem('_mayordomia2026_v3', '1');

    // Firebase backup
    if (typeof _syncEventoFirebase === 'function') {
        _syncEventoFirebase(evento).catch(e => console.warn('[Firebase] Error sync mayordomía:', e));
    }

    console.log('✅ Semana de Mayordomía 2026 inyectada correctamente');
    if (typeof mostrarToast === 'function') {
        mostrarToast('📋 Semana de Mayordomía 2026 restaurada');
    }
})();
