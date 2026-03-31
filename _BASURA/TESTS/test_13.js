
            function compartirAppGeneral() {
                const mensaje =
                    `📖✨ *LEGADO B�BLICO � Experiencia Digital* ✨📖\n\n` +
                    `Te invito a explorar esta app cristiana con:\n\n` +
                    `📖 *Biblia completa* (m�ltiples versiones)\n` +
                    `� *Devocionales diarios* con reflexiones profundas\n` +
                    `📅 *A�o B�blico* (planes de lectura personalizados)\n` +
                    `⛪ *M�dulo de Iglesia* (liturgia, sermones, 28 doctrinas)\n` +
                    `🎨 *Historias B�blicas para Ni�os* (interactivas)\n` +
                    `🎮 *Trivia y Retos para Adolescentes*\n\n` +
                    `👉 *Entra aqu�:*\n` +
                    `https://agendatecnicadigital.com\n\n` +
                    `📱 �brelo en tu navegador y a��delo a tu pantalla de inicio.\n\n` +
                    `_� Legado B�blico � 2026_`;

                if (navigator.share) {
                    navigator.share({
                        title: 'Legado B�blico - Experiencia B�blica Digital',
                        text: mensaje
                    }).catch(() => { });
                } else {
                    navigator.clipboard?.writeText(mensaje).then(() => {
                        mostrarToast('✅ Invitaci�n copiada al portapapeles');
                    }).catch(() => {
                        mostrarToast('�� No se pudo compartir');
                    });
                }
            }
        