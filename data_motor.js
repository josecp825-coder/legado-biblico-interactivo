const CONTENIDO_DIRECCIONADO = {
    isaias_1: {
        texto_biblico: [
            { v: 1, texto: "Visión de Isaías hijo de Amoz, la cual vio acerca de Judá y de Jerusalén en los días de Uzías, Jotam, Acaz y Ezequías, reyes de Judá." },
            { v: 2, texto: "Oíd, cielos, y escucha tú, tierra; porque habla Jehová: Crié hijos, y los engrandecí, y ellos se rebelaron contra mí." }
        ],
        niños: {
            titulo: "🏠 EL PAPÁ QUE NUNCA SE RINDE",
            explicacion: "Imagina que haces un dibujo hermoso y se lo das a alguien, ¡y esa persona lo rompe! Dios se siente así porque Él nos hizo con mucho amor, pero a veces nos portamos mal. ¡Pero Él siempre nos espera con un abrazo!",
            actividad: "Dibuja un corazón gigante y dentro escribe 'DIOS ME AMA'."
        },
        adolescentes: {
            titulo: "🚫 REBELDE SIN CAUSA (S01E01)",
            explicacion: "En este capítulo, Isaías nos muestra una nación que tiene 'todo' pero se siente vacía. Dios los confronta como un Padre que ve a su hijo tomando malas decisiones. Es el inicio de una transformación radical.",
            actividad: "Busca 'Isaías 1' en tu playlist y reflexiona: ¿Qué cosas te alejan de tu verdadera identidad?"
        },
        jovenes: {
            titulo: "⚖️ MÁSCARAS Y RELIGIÓN",
            explicacion: "Dios no quiere rituales vacíos, quiere justicia real. Isaías 1 es un manifiesto contra la hipocresía. Es un llamado a que nuestra fe se vea en la calle, no solo en el templo.",
            actividad: "Debate: ¿En qué áreas de nuestra sociedad actual hace falta el mensaje de Isaías?"
        },
        adultos: {
            titulo: "📜 EL PLEITO DIVINO (EL RIB)",
            explicacion: "Análisis exegético del juicio que Dios establece contra Judá. Se explora la estructura legal del pacto y el contraste entre la gracia divina y el endurecimiento del corazón nacional bajo los reyes de Judá.",
            actividad: "Estudio Profundo: Compara este capítulo con las advertencias de Deuteronomio 28."
        }
    }
};

function cargarContenidoPorNivel(nivel) {
    const data = CONTENIDO_DIRECCIONADO.isaias_1;
    const info = data[nivel];
    const container = document.getElementById('pantalla-estudio');

    // Cambiar la clase del container para los colores
    container.className = `container-estudio theme-${nivel}`;

    let html = `
        <div class="content-wrapper">
            <header class="estudio-header">
                <button class="btn-volver" onclick="window.location.reload()">← VOLVER</button>
                <div class="header-info">
                    <span class="badget-nivel">${nivel.toUpperCase()}</span>
                    <h1>${info.titulo}</h1>
                </div>
            </header>

            <main class="estudio-body">
                <section class="seccion-biblica glass-panel">
                    <h2><span class="icon">📖</span> Isaías 1:1-2</h2>
                    <div class="texto-sagrado">
                        ${data.texto_biblico.map(t => `<p><span class="v-num">${t.v}</span> ${t.texto}</p>`).join('')}
                    </div>
                </section>

                <section class="seccion-ia glass-panel">
                    <h2><span class="icon">💡</span> Lo que Dios nos dice</h2>
                    <p class="explicacion-texto">${info.explicacion}</p>
                </section>

                <section class="seccion-accion glass-panel">
                    <h2><span class="icon">⚡</span> Misión del Día</h2>
                    <p class="actividad-texto">${info.actividad}</p>
                </section>
            </main>
        </div>
    `;

    container.innerHTML = html;
}
