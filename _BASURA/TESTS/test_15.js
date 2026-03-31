
        function cerrarContextoDoctrinas() {
            const el = document.getElementById('context-card-doctrinas');
            if (el) el.classList.remove('active');
        }

        // ✅ GUARDAR NOTA GLOBAL � Panel Estudio Profundo
        function guardarNotaGlobal() {
            const textarea = document.getElementById('personal-note-doctrinas');
            const ref = document.getElementById('context-ref-doctrinas');
            if (!textarea) return;
            const texto = textarea.value.trim();
            if (!texto) { mostrarToast('⚠� Escribe tu reflexi�n primero'); return; }
            const pasaje = ref ? ref.textContent : 'Estudio';
            // Guardar en Firebase + localStorage via guardarNotaFirebase
            if (typeof guardarNotaFirebase === 'function') {
                guardarNotaFirebase(texto, pasaje).then(() => {
                    mostrarToast('✅ Reflexi�n guardada');
                    textarea.value = '';
                }).catch(() => mostrarToast('✅ Guardado localmente'));
            } else {
                // Fallback solo localStorage
                const notas = JSON.parse(localStorage.getItem('adultos_notas') || '[]');
                notas.push({ texto, pasaje, fecha: new Date().toLocaleDateString('es-ES') });
                localStorage.setItem('adultos_notas', JSON.stringify(notas));
                mostrarToast('✅ Reflexi�n guardada localmente');
                textarea.value = '';
            }
        }
    