// ═══════════════════════════════════════════════════════════════
// INYECCIÓN ÚNICA — Santa Cena — Sábado 21 de Marzo 2026
// Se ejecuta UNA VEZ al cargar y luego se auto-desactiva
// ═══════════════════════════════════════════════════════════════
(function _inyectarSantaCena2026() {
    if (localStorage.getItem('_santacena2026_v1')) return;

    const ID = 1742500000000;

    // Borrar versión anterior si existe
    let existentes = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    existentes = existentes.filter(e => e.id !== ID && !(e.titulo && e.titulo.toLowerCase().indexOf('santa cena') !== -1 && e.titulo.indexOf('2026') !== -1));

    const evento = {
        id: ID,
        tipo: 'santa_cena',
        emoji: '🍞🍷',
        color: '#fdcb6e',
        titulo: 'Santa Cena 2026',
        fechaInicio: '2026-03-21',
        duracion: 1,
        dias: [
            {
                fecha: '2026-03-21', diaSemana: 6,
                datos: {
                    // ═══ CULTO DIVINO (columna izquierda) ═══
                    anciano: 'Nerilys Maza / Cecilia Wilson',
                    ev_diaconos: 'Marcos Figueroa',
                    ev_diaconisas: 'Yulima Maza',
                    ev_llamado: 'Haston Vargas',
                    ev_doxologia: '#55 — Grande, Señor, es tu misericordia',
                    ev_invocacion: 'Pr. Rafael Solano',
                    ev_bienvenida: 'Cecilia Wilson',
                    ev_ofrendas_anuncia: 'Haston Tomas',
                    ev_ofrendas: 'Logan Vargas',
                    ev_ofrendas_diaconisa: 'Fermín Hernández',
                    ev_himno_adoracion: 'Cecilia Wilson\n#248 — Que mi vida entera esté',
                    ev_lectura_cita: 'Luz Lopez\nJuan 6: 48-50',
                    ev_oracion_intercesora: 'Nerilys Maza',
                    ev_pred_anuncia: 'Cecilia Wilson',
                    ev_predicador: 'Pr. Rafael Solano',
                    ev_tema: 'El Pan De Vida',
                    ev_himno_final: 'Nerilys Maza\n#293 — ¿Quieres ser salvo de toda maldad?',
                    ev_oracion_final: 'Pr. Rafael Solano',
                    ev_sonido: 'Freddy',

                    // ═══ SANTA CENA (columna derecha) ═══
                    sc_diacono_1_nombre: 'Flavio Candelario\nEntregar el Pan',
                    sc_diacono_2_nombre: 'Juan Gutiérrez\nEntregar el Pan',
                    sc_diacono_3_nombre: 'Juan Antigua\nEntregar el Vino',
                    sc_diacono_4_nombre: 'Ernesto Valencia\nEntregar el Vino',
                    sc_diaconiza_1_nombre: 'Doral Ortega\nDescubrimiento de la Mesa',
                    sc_diaconiza_2_nombre: 'Wanda Núñez\nDescubrimiento de la Mesa',
                    sc_diaconiza_3_nombre: 'Luz López\nCubrimiento de la Mesa',
                    sc_diaconiza_4_nombre: 'Maria Tomas\nCubrimiento de la Mesa',
                    sc_lectura_pan: 'José López',
                    sc_oracion_pan: 'José Castillo',
                    sc_lectura_vino: 'José Luis Candelario',
                    sc_oracion_vino: 'Obed Lopez',
                    sc_ordenador: 'Pr. Rafael Solano',
                    sc_oracion_final: 'Pr. Rafael Solano'
                }
            }
        ]
    };

    existentes.unshift(evento);
    existentes.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
    localStorage.setItem('legado_eventos', JSON.stringify(existentes));
    localStorage.setItem('_santacena2026_v1', '1');

    // Firebase backup
    if (typeof _syncEventoFirebase === 'function') {
        try { _syncEventoFirebase(evento); } catch(e) { console.warn('SC Firebase sync:', e); }
    }

    console.log('✅ Santa Cena 2026 inyectada correctamente');
})();
