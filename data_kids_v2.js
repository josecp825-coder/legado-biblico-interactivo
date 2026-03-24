// ==========================================
// 🎨 MÓDULO NIÑOS — BIBLIA VIVA CINEMA v2
// 30 Historias Bíblicas Animadas
// Filosofía Adventista del Séptimo Día
// ==========================================

const HISTORIAS_NINOS = [
    // ═══════════════════════════════════════
    // 📖 ANTIGUO TESTAMENTO
    // ═══════════════════════════════════════

    // 1. LA CREACIÓN — 7 DÍAS BÍBLICOS (Génesis 1-2:3)
    {
        id: "creacion", titulo: "¡Dios Creó el Mundo!", emoji: "🌍",
        categoria: "AT", color: "#00b894", colorOscuro: "#00a885",
        cssGradient: "linear-gradient(135deg, #00b894, #55efc4, #81ecec)",
        cssEmoji: "🌍🌸🦋🌈",
        imagen: "creacion_dia1_luz.png",
        imagenes: [
            "creacion_dia1_luz.png",
            "creacion_dia2_cielo.png",
            "creacion_dia3_plantas.png",
            "creacion_dia4_astros.png",
            "creacion_dia5_peces_aves.png",
            "creacion_dia6_animales_humanos.png",
            "creacion_dia7_reposo.png"
        ],
        versiculo: { ref: "Génesis 1:1", texto: "En el principio creó Dios los cielos y la tierra." },
        cuento: [
            "✨ DÍA 1: Al principio todo estaba oscuro y vacío. Entonces Dios dijo: ¡Que haya LUZ! Y una luz hermosa y brillante apareció. Dios separó la luz de la oscuridad. A la luz la llamó DÍA y a la oscuridad la llamó NOCHE. ¡Y fue el primer día!",
            "🌊 DÍA 2: Dios dijo: ¡Que haya un espacio entre las aguas! Y creó el cielo azul hermoso. Separó las aguas de arriba (las nubes) de las aguas de abajo (los mares). ¡El cielo se extendió como una gran cúpula sobre todo! ¡Y fue el segundo día!",
            "🌿 DÍA 3: Dios dijo: ¡Que las aguas se junten y aparezca tierra seca! Y así fue. Aparecieron montañas, valles y playas. Luego dijo: ¡Que la tierra produzca plantas! Y brotaron flores de todos los colores, árboles con frutas deliciosas y pasto verde. ¡Y fue el tercer día!",
            "☀️ DÍA 4: Dios dijo: ¡Que haya luces en el cielo! Y creó el sol grande y brillante para alumbrar el día, y la luna plateada y miles de estrellas para alumbrar la noche. ¡El cielo se llenó de luces maravillosas! ¡Y fue el cuarto día!",
            "🐟 DÍA 5: Dios dijo: ¡Que las aguas se llenen de peces y el cielo de aves! Y creó delfines, ballenas, peces de colores, águilas, palomas, colibríes... ¡todos nadando y volando felices! Dios los bendijo y dijo: ¡Multiplíquense! ¡Y fue el quinto día!",
            "🐘 DÍA 6: Dios dijo: ¡Que la tierra produzca animales! Y aparecieron elefantes, leones, conejos, mariposas y jirafas. Luego Dios hizo su OBRA MAESTRA: tomó polvo de la tierra y formó al ser humano, a Adán y a Eva, a su imagen y semejanza. ¡Les dio dominio sobre toda la creación! ¡Y fue el sexto día!",
            "🕊️ DÍA 7: Dios terminó toda su obra y vio que todo era MUY BUENO. Entonces, en el séptimo día, Dios descansó. No porque estuviera cansado, sino para dejarnos un regalo especial: ¡el SÁBADO! Dios bendijo el séptimo día y lo hizo santo. Es un día para descansar, estar con la familia y adorar a Dios. ¡El Sábado es el regalo de amor de Dios para ti cada semana!"
        ],
        leccion: "Dios creó todo en 6 días con amor y descansó el séptimo día, el Sábado. ¡Cada cosa que hizo es especial, incluyéndote a ti! El Sábado es el regalo de Dios para recordar que Él es nuestro Creador.",
        miniJuego: [
            { pregunta: "¿Qué fue lo primero que Dios creó?", opciones: ["Los animales", "La luz", "El agua"], correcta: 1 },
            { pregunta: "¿Qué creó Dios en el cuarto día?", opciones: ["Las plantas", "El sol, la luna y las estrellas", "Los peces"], correcta: 1 },
            { pregunta: "¿A imagen de quién fue creado el ser humano?", opciones: ["De los ángeles", "De los animales", "De Dios"], correcta: 2 },
            { pregunta: "¿Qué hizo Dios en el séptimo día?", opciones: ["Creó más animales", "Descansó y bendijo el Sábado", "Creó las estrellas"], correcta: 1 },
            { pregunta: "¿En qué día creó Dios los peces y las aves?", opciones: ["Día 3", "Día 5", "Día 6"], correcta: 1 }
        ], estrellas: 5
    },
    // 2. ADÁN Y EVA
    {
        id: "adan_eva", titulo: "¡El Jardín del Edén!", emoji: "🌿",
        categoria: "AT", color: "#00cec9", colorOscuro: "#00b5b1",
        cssGradient: "linear-gradient(135deg, #00cec9, #55efc4, #a8e6cf)",
        cssEmoji: "🌿🍎🦜🌺",
        imagen: "eden_jardin_hermoso.png",
        imagenes: [
            "eden_jardin_hermoso.png",
            "eden_adan_creacion.png",
            "eden_adan_eva_juntos.png",
            "eden_serpiente_fruto.png",
            "eden_expulsion_esperanza.png"
        ],
        versiculo: { ref: "Génesis 2:8", texto: "Y Jehová Dios plantó un huerto en Edén, al oriente; y puso allí al hombre que había formado." },
        cuento: [
            "🌸 Dios creó un jardín hermoso llamado Edén. ¡Tenía ríos cristalinos, frutas mágicas y animales de todo tipo!",
            "👨 Dios formó al primer hombre, Adán, del polvo de la tierra y sopló vida en él. ¡Adán abrió los ojos y vio la belleza del mundo!",
            "👩 Pero Adán estaba solito, así que Dios creó a Eva, su compañera perfecta. ¡Se amaban mucho!",
            "🍎 Dios les dijo que podían comer de TODOS los árboles excepto uno. La serpiente engañó a Eva para que comiera del fruto prohibido.",
            "😢 Adán y Eva desobedecieron a Dios y tuvieron que salir del jardín. Pero Dios los seguía amando y prometió un Salvador."
        ],
        leccion: "Obedecer a Dios nos protege. Cuando nos equivocamos, Dios sigue amándonos.",
        miniJuego: [
            { pregunta: "¿De qué formó Dios al hombre?", opciones: ["De agua", "Del polvo de la tierra", "De piedra"], correcta: 1 },
            { pregunta: "¿Cómo se llamaba el jardín donde vivían?", opciones: ["Paraíso", "Edén", "Jerusalén"], correcta: 1 },
            { pregunta: "¿Qué fruto no podían comer?", opciones: ["Las manzanas", "El del árbol prohibido", "Las uvas"], correcta: 1 },
            { pregunta: "¿Quién engañó a Eva?", opciones: ["Un león", "La serpiente", "Un ángel"], correcta: 1 },
            { pregunta: "¿Qué prometió Dios después de su desobediencia?", opciones: ["Destruir todo", "Un Salvador", "Olvidarlos"], correcta: 1 }
        ], estrellas: 5
    },
    // 3. NOÉ Y SU ARCA
    {
        id: "noe", titulo: "¡Noé y su Arca Gigante!", emoji: "🚢",
        categoria: "AT", color: "#48dbfb", colorOscuro: "#0abde3",
        cssGradient: "linear-gradient(135deg, #48dbfb, #0abde3, #74b9ff)",
        cssEmoji: "🚢🐘🦒🌈",
        imagen: "noe_arca_cartoon_1772168653149.png",
        imagenes: [
            "noe_mundo_malo.png",
            "noe_construyendo.png",
            "noe_animales_entrando.png",
            "noe_diluvio_lluvia.png",
            "noe_arcoiris_promesa.png"
        ],
        versiculo: { ref: "Génesis 6:22", texto: "Y lo hizo así Noé; hizo conforme a todo lo que Dios le mandó." },
        cuento: [
            "🌍 Hace mucho tiempo, las personas se olvidaron de Dios y hacían cosas malas.",
            "👴 Pero Noé era diferente. ¡Él amaba a Dios y obedecía todo lo que Dios decía!",
            "🔨 Dios le dijo a Noé que construyera un arca gigante... ¡del tamaño de un edificio! Sus vecinos se reían de él.",
            "🐘🦒 Dios envió dos animales de cada especie: elefantes, jirafas, leones, palomas... ¡todos entraron al arca!",
            "🌈 Llovió 40 días y 40 noches. Cuando todo terminó, Dios puso un arco iris como promesa de amor para siempre."
        ],
        leccion: "¡Obedecer a Dios siempre vale la pena! Aunque los demás se rían, Dios tiene el mejor plan.",
        miniJuego: [
            { pregunta: "¿Por qué Dios envió el diluvio?", opciones: ["Por diversión", "Porque la gente era muy mala", "Por accidente"], correcta: 1 },
            { pregunta: "¿Cuántos días llovió?", opciones: ["20 días", "40 días", "100 días"], correcta: 1 },
            { pregunta: "¿Cuántos animales de cada especie entraron?", opciones: ["Uno", "Dos", "Diez"], correcta: 1 },
            { pregunta: "¿Qué puso Dios en el cielo como promesa?", opciones: ["Una estrella", "Un arco iris", "La luna"], correcta: 1 },
            { pregunta: "¿Qué hacían los vecinos de Noé?", opciones: ["Le ayudaban", "Se reían de él", "Oraban"], correcta: 1 }
        ], estrellas: 5
    },
    // 4. LA TORRE DE BABEL
    {
        id: "babel", titulo: "¡La Torre hasta el Cielo!", emoji: "🏗️",
        categoria: "AT", color: "#fdcb6e", colorOscuro: "#e17055",
        cssGradient: "linear-gradient(135deg, #fdcb6e, #e17055, #fab1a0)",
        cssEmoji: "🏗️🧱🗼🌤️",
        imagen: "babel_un_idioma.png",
        imagenes: [
            "babel_un_idioma.png",
            "babel_torre_orgullo.png",
            "babel_torre_orgullo.png",
            "babel_confusion.png",
            "babel_separacion.png"
        ],
        versiculo: { ref: "Génesis 11:9", texto: "Por eso fue llamado el nombre de ella Babel, porque allí confundió Jehová el lenguaje de toda la tierra." },
        cuento: [
            "🌍 Después del diluvio, las personas hablaban un solo idioma. ¡Todos se entendían perfectamente!",
            "💪 Pero se volvieron orgullosos y dijeron: ¡Hagamos una torre tan alta que llegue hasta el cielo!",
            "🧱 Empezaron a construir y construir. Querían ser famosos y no necesitar a Dios.",
            "😵 Dios vio su orgullo y confundió sus idiomas. ¡De repente nadie entendía lo que el otro decía!",
            "🌎 Las personas se separaron por todo el mundo hablando diferentes idiomas. Dios quiere que seamos humildes."
        ],
        leccion: "El orgullo nos aleja de Dios. Ser humildes nos acerca a Él y a los demás.",
        miniJuego: [
            { pregunta: "¿Qué querían construir?", opciones: ["Un castillo", "Una torre hasta el cielo", "Un barco"], correcta: 1 },
            { pregunta: "¿Cuántos idiomas hablaban antes?", opciones: ["Muchos", "Uno solo", "Tres"], correcta: 1 },
            { pregunta: "¿Por qué querían hacer la torre?", opciones: ["Para estar cerca de Dios", "Por orgullo y fama", "Para ver mejor"], correcta: 1 },
            { pregunta: "¿Qué hizo Dios para detenerlos?", opciones: ["La destruyó", "Confundió los idiomas", "Envió lluvia"], correcta: 1 },
            { pregunta: "¿Qué nos enseña esta historia?", opciones: ["Ser más fuertes", "Ser humildes", "Construir más alto"], correcta: 1 }
        ], estrellas: 5
    },
    // 5. ABRAHAM Y LAS ESTRELLAS
    {
        id: "abraham", titulo: "¡Abraham Cuenta Estrellas!", emoji: "⭐",
        categoria: "AT", color: "#6c5ce7", colorOscuro: "#5f27cd",
        cssGradient: "linear-gradient(135deg, #0c0c3a, #6c5ce7, #a29bfe)",
        cssEmoji: "⭐🌙✨🌌",
        imagen: "abraham_triste_sin_hijos.png",
        imagenes: [
            "abraham_triste_sin_hijos.png",
            "abraham_estrellas.png",
            "abraham_estrellas.png",
            "abraham_promesa_dios.png",
            "abraham_isaac_bebe.png"
        ],
        versiculo: { ref: "Génesis 15:5", texto: "Mira ahora los cielos, y cuenta las estrellas, si las puedes contar. Así será tu descendencia." },
        cuento: [
            "👴 Abraham era un hombre que amaba mucho a Dios, pero tenía una tristeza: no tenía hijos.",
            "🌙 Una noche, Dios lo sacó afuera y le dijo: ¡Mira las estrellas! ¿Puedes contarlas?",
            "⭐ Abraham miró el cielo lleno de miles y miles de estrellas brillantes. ¡Eran incontables!",
            "🤰 Dios le prometió: Así de grande será tu familia. ¡Abraham creyó en Dios con todo su corazón!",
            "👶 Y aunque Abraham ya era muy viejito, Dios cumplió su promesa: nació Isaac, su hijo. ¡Dios SIEMPRE cumple!"
        ],
        leccion: "Las promesas de Dios siempre se cumplen, aunque a veces hay que esperar con paciencia.",
        miniJuego: [
            { pregunta: "¿Qué tristeza tenía Abraham?", opciones: ["No tenía casa", "No tenía hijos", "No tenía amigos"], correcta: 1 },
            { pregunta: "¿Qué le pidió Dios que mirara?", opciones: ["El mar", "Las estrellas", "Las montañas"], correcta: 1 },
            { pregunta: "¿Cómo se llamó su hijo?", opciones: ["Moisés", "Isaac", "David"], correcta: 1 },
            { pregunta: "¿Abraham era joven o viejito?", opciones: ["Muy joven", "Muy viejito", "Adolescente"], correcta: 1 },
            { pregunta: "¿Qué hizo Abraham con la promesa?", opciones: ["Se rió", "Creyó con todo su corazón", "Se fue"], correcta: 1 }
        ], estrellas: 5
    },
    // 6. JOSÉ EL SOÑADOR
    {
        id: "jose", titulo: "¡José el de los Sueños!", emoji: "🌈",
        categoria: "AT", color: "#e056a0", colorOscuro: "#c44569",
        cssGradient: "linear-gradient(135deg, #e056a0, #f78fb3, #f8a5c2)",
        cssEmoji: "🌈👘💭👑",
        imagen: "jose_tunica_colores.png",
        imagenes: [
            "jose_tunica_colores.png",
            "jose_suenos.png",
            "jose_vendido.png",
            "jose_faraon.png",
            "jose_gobernador.png"
        ],
        versiculo: { ref: "Génesis 50:20", texto: "Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien." },
        cuento: [
            "🌈 José tenía una túnica de muchos colores que su papá le regaló. ¡Era su favorito entre 12 hermanos!",
            "💭 José tenía sueños especiales de Dios. Soñó que las estrellas y el sol se inclinaban ante él.",
            "😡 Sus hermanos se pusieron celosos y lo vendieron como esclavo a Egipto. ¡Qué triste!",
            "🏛️ Pero Dios estaba con José. En Egipto, Dios le dio sabiduría para interpretar los sueños del Faraón.",
            "👑 José se convirtió en el segundo hombre más poderoso de Egipto y salvó a su familia del hambre. ¡Dios convierte lo malo en bueno!"
        ],
        leccion: "Aunque pasen cosas difíciles, Dios puede convertir lo malo en algo maravilloso.",
        miniJuego: [
            { pregunta: "¿Cuántos hermanos tenía José?", opciones: ["5", "11", "3"], correcta: 1 },
            { pregunta: "¿De qué colores era su túnica?", opciones: ["Solo roja", "Muchos colores", "Blanca"], correcta: 1 },
            { pregunta: "¿Qué hicieron sus hermanos?", opciones: ["Lo abrazaron", "Lo vendieron como esclavo", "Lo coronaron"], correcta: 1 },
            { pregunta: "¿A dónde fue llevado José?", opciones: ["Babilonia", "Egipto", "Roma"], correcta: 1 },
            { pregunta: "¿Qué le dio Dios a José?", opciones: ["Canciones", "Sabiduría para los sueños", "Fuerza"], correcta: 1 }
        ], estrellas: 5
    },
    // 7. MOISÉS EN LA CANASTA
    {
        id: "moises_bebe", titulo: "¡El Bebé en el Río!", emoji: "🧒",
        categoria: "AT", color: "#0984e3", colorOscuro: "#0652DD",
        cssGradient: "linear-gradient(135deg, #0984e3, #74b9ff, #a8d8ea)",
        cssEmoji: "🧒🧺🌿👸",
        imagen: "moises_bebe_peligro.png",
        imagenes: [
            "moises_bebe_peligro.png",
            "moises_canasta_rio.png",
            "moises_miriam_vigila.png",
            "moises_princesa.png",
            "moises_palacio.png"
        ],
        versiculo: { ref: "Éxodo 2:10", texto: "Y le puso por nombre Moisés, diciendo: Porque de las aguas lo saqué." },
        cuento: [
            "😢 El malvado Faraón de Egipto quería hacer daño a los bebés israelitas. ¡Qué miedo!",
            "👩 La mamá de Moisés lo amaba tanto que hizo un plan valiente: puso al bebé en una canasta flotando en el río.",
            "👧 Su hermana Miriam lo vigilaba escondida entre las plantas. ¡No dejaba de cuidarlo!",
            "👸 La princesa de Egipto encontró la canasta y vio al bebé llorando. ¡Su corazón se llenó de amor por él!",
            "🌟 La princesa adoptó a Moisés y creció en el palacio. ¡Dios lo estaba preparando para un gran plan!"
        ],
        leccion: "Dios tiene un plan para cada uno de nosotros, incluso desde que somos bebés.",
        miniJuego: [
            { pregunta: "¿Por qué escondieron a Moisés?", opciones: ["Lloraba mucho", "El Faraón quería dañar a los bebés", "Un juego"], correcta: 1 },
            { pregunta: "¿Dónde pusieron al bebé?", opciones: ["En una cueva", "En una canasta en el río", "En el palacio"], correcta: 1 },
            { pregunta: "¿Quién lo vigilaba escondida?", opciones: ["Su mamá", "Su hermana Miriam", "Su papá"], correcta: 1 },
            { pregunta: "¿Quién encontró la canasta?", opciones: ["Un pescador", "La princesa de Egipto", "Un soldado"], correcta: 1 },
            { pregunta: "¿Dónde creció Moisés?", opciones: ["En el río", "En el palacio", "En el desierto"], correcta: 1 }
        ], estrellas: 5
    },
    // 8. LAS 10 PLAGAS
    {
        id: "plagas", titulo: "¡Las Plagas de Egipto!", emoji: "🐸",
        categoria: "AT", color: "#d63031", colorOscuro: "#c0392b",
        cssGradient: "linear-gradient(135deg, #d63031, #e17055, #fab1a0)",
        cssEmoji: "🐸🦟💧🔥",
        imagen: "plagas_moises_faraon.png",
        imagenes: [
            "plagas_moises_faraon.png",
            "plagas_ranas.png",
            "plagas_oscuridad.png",
            "plagas_sangre_agua.png",
            "plagas_cordero_puerta.png"
        ],
        versiculo: { ref: "Éxodo 7:5", texto: "Y sabrán los egipcios que yo soy Jehová." },
        cuento: [
            "⛓️ El pueblo de Dios estaba esclavo en Egipto. Dios envió a Moisés a decirle al Faraón: ¡Deja ir a mi pueblo!",
            "👿 Pero el Faraón dijo: ¡NO! Entonces Dios envió señales increíbles para mostrar su poder.",
            "🐸 El agua se convirtió en sangre, vinieron ranas por TODAS partes, mosquitos, moscas... ¡el Faraón seguía diciendo NO!",
            "🌑 Vinieron más plagas: granizo de fuego, langostas, ¡y una oscuridad total por tres días!",
            "🚪 Finalmente, Dios protegió a su pueblo con la sangre del cordero en las puertas. ¡El Faraón los dejó ir!"
        ],
        leccion: "Nadie es más poderoso que Dios. Él siempre protege y libera a los que confían en Él.",
        miniJuego: [
            { pregunta: "¿Quién le dijo al Faraón que dejara ir al pueblo?", opciones: ["Daniel", "Moisés", "Abraham"], correcta: 1 },
            { pregunta: "¿Qué animales invadieron Egipto?", opciones: ["Elefantes", "Ranas", "Leones"], correcta: 1 },
            { pregunta: "¿Cuántos días duró la oscuridad?", opciones: ["1 día", "3 días", "7 días"], correcta: 1 },
            { pregunta: "¿En qué se convirtió el agua?", opciones: ["En leche", "En sangre", "En miel"], correcta: 1 },
            { pregunta: "¿Qué protegió a los israelitas?", opciones: ["Un muro", "La sangre del cordero en las puertas", "Un escudo"], correcta: 1 }
        ], estrellas: 5
    },
    // 9. EL MAR ROJO
    {
        id: "mar_rojo", titulo: "¡El Mar se Abre en Dos!", emoji: "🌊",
        categoria: "AT", color: "#0652DD", colorOscuro: "#1B1464",
        cssGradient: "linear-gradient(135deg, #0652DD, #1B1464, #3742fa)",
        cssEmoji: "🌊🚶‍♂️🔥✨",
        imagen: "marrojo_atrapados.png",
        imagenes: [
            "marrojo_atrapados.png",
            "marrojo_abierto.png",
            "marrojo_cruzando.png",
            "marrojo_ejercito.png",
            "marrojo_celebracion.png"
        ],
        versiculo: { ref: "Éxodo 14:21", texto: "Jehová hizo que el mar se retirase por recio viento oriental toda aquella noche." },
        cuento: [
            "🏃 ¡El pueblo de Israel por fin era libre! Salieron corriendo de Egipto con todo lo que tenían.",
            "😱 Pero el Faraón cambió de opinión y envió su ejército con carros de guerra para atraparlos.",
            "🌊 El pueblo llegó al Mar Rojo. ¡Estaban atrapados! El mar adelante y el ejército atrás.",
            "🪄 Moisés levantó su vara y Dios abrió el mar en DOS partes. ¡El pueblo caminó por tierra seca en medio del mar!",
            "💪 Cuando todos pasaron, el mar se cerró sobre el ejército del Faraón. ¡Dios salvó a su pueblo con su gran poder!"
        ],
        leccion: "Cuando parece que no hay salida, Dios puede abrir un camino donde no lo hay.",
        miniJuego: [
            { pregunta: "¿Qué mar abrió Dios?", opciones: ["Mar Muerto", "Mar Rojo", "Mediterráneo"], correcta: 1 },
            { pregunta: "¿Quién levantó la vara?", opciones: ["Aarón", "Moisés", "Josué"], correcta: 1 },
            { pregunta: "¿Cómo caminó el pueblo?", opciones: ["Nadando", "Por tierra seca", "En barcos"], correcta: 1 },
            { pregunta: "¿Quién perseguía al pueblo?", opciones: ["Los romanos", "El ejército del Faraón", "Los filisteos"], correcta: 1 },
            { pregunta: "¿Qué pasó cuando cruzaron?", opciones: ["El mar se secó", "Se cerró sobre el ejército", "Nada"], correcta: 1 }
        ], estrellas: 5
    },
    // 10. LOS 10 MANDAMIENTOS
    {
        id: "mandamientos", titulo: "¡Las Reglas de Oro de Dios!", emoji: "⛰️",
        categoria: "AT", color: "#ffeaa7", colorOscuro: "#d4a017",
        cssGradient: "linear-gradient(135deg, #d4a017, #ffeaa7, #f9ca24)",
        cssEmoji: "⛰️📋⚡✋",
        imagen: "mandamientos_sinai.png",
        imagenes: [
            "mandamientos_sinai.png",
            "mandamientos_moises_sube.png",
            "mandamientos_dedo_dios.png",
            "mandamientos_tablas.png",
            "mandamientos_sabado.png"
        ],
        versiculo: { ref: "Éxodo 20:3", texto: "No tendrás dioses ajenos delante de mí." },
        cuento: [
            "⛰️ Después de cruzar el mar, el pueblo llegó al Monte Sinaí. ¡La montaña temblaba y había fuego!",
            "⚡ Dios llamó a Moisés a la cima de la montaña. Truenos y relámpagos cubrían todo.",
            "📋 Dios escribió con su propio dedo 10 reglas en tablas de piedra. ¡Son las reglas más importantes del mundo!",
            "❤️ Las primeras 4 reglas son sobre amar a Dios: no tener otros dioses, no adorar imágenes, respetar su nombre y guardar el Sábado.",
            "🤝 Las otras 6 son sobre amar a las personas: honrar a tus padres, no mentir, no robar, no envidiar... ¡reglas perfectas para vivir feliz!"
        ],
        leccion: "Los 10 Mandamientos son las instrucciones de Dios para una vida feliz y llena de amor.",
        miniJuego: [
            { pregunta: "¿En qué montaña recibió Moisés los mandamientos?", opciones: ["Everest", "Monte Sinaí", "Ararat"], correcta: 1 },
            { pregunta: "¿Cuántos mandamientos escribió Dios?", opciones: ["5", "10", "20"], correcta: 1 },
            { pregunta: "¿Con qué los escribió Dios?", opciones: ["Un lápiz", "Su propio dedo", "Una pluma"], correcta: 1 },
            { pregunta: "¿En qué estaban escritos?", opciones: ["Papel", "Tablas de piedra", "Madera"], correcta: 1 },
            { pregunta: "¿Qué día guarda el 4to mandamiento?", opciones: ["Domingo", "El Sábado", "Viernes"], correcta: 1 }
        ], estrellas: 5
    },
    // 11. EL MANÁ DEL CIELO
    {
        id: "mana", titulo: "¡Pan que Cae del Cielo!", emoji: "🍞",
        categoria: "AT", color: "#ffeaa7", colorOscuro: "#fdcb6e",
        cssGradient: "linear-gradient(135deg, #ffeaa7, #fdcb6e, #f8e8b0)",
        cssEmoji: "🍞☁️✨🥣",
        imagen: "mana_cayendo.png",
        imagenes: [
            "mana_pueblo_hambre.png",
            "mana_cayendo.png",
            "mana_recogiendo.png",
            "mana_viernes_doble.png",
            "mana_sabado_descanso.png"
        ],
        versiculo: { ref: "Éxodo 16:4", texto: "He aquí yo os haré llover pan del cielo." },
        cuento: [
            "😫 El pueblo de Israel caminaba por el desierto y tenía mucha hambre. ¡No había tiendas ni supermercados!",
            "😤 Empezaron a quejarse: ¡Teníamos comida en Egipto! ¿Por qué nos trajiste aquí?",
            "☁️ Pero Dios escuchó y dijo: ¡Yo les daré pan del cielo cada mañana! Se llamará MANÁ.",
            "🌅 Cada mañana, el suelo amanecía cubierto de cositas blancas que sabían a galleta con miel. ¡Delicioso!",
            "🌟 El viernes caía el doble para que descansaran el Sábado. ¡Dios les enseñaba a confiar en Él cada día!"
        ],
        leccion: "Dios siempre provee lo que necesitamos. ¡Confía en Él día a día!",
        miniJuego: [
            { pregunta: "¿Dónde estaba el pueblo?", opciones: ["En Egipto", "En el desierto", "En Canaán"], correcta: 1 },
            { pregunta: "¿A qué sabía el maná?", opciones: ["Chocolate", "Galleta con miel", "Pizza"], correcta: 1 },
            { pregunta: "¿Cuándo aparecía el maná?", opciones: ["En la tarde", "Cada mañana", "Una vez a la semana"], correcta: 1 },
            { pregunta: "¿Qué pasaba el viernes?", opciones: ["No caía", "Caía el doble", "Caía menos"], correcta: 1 },
            { pregunta: "¿Por qué caía doble el viernes?", opciones: ["Para vender", "Para descansar el Sábado", "Para guardar"], correcta: 1 }
        ], estrellas: 5
    },
    // 12. JOSUÉ Y JERICÓ
    {
        id: "jerico", titulo: "¡Las Murallas que Cayeron!", emoji: "🎺",
        categoria: "AT", color: "#e17055", colorOscuro: "#d63031",
        cssGradient: "linear-gradient(135deg, #e17055, #d63031, #ff7675)",
        cssEmoji: "🎺🧱💥🏰",
        imagen: "jerico_murallas.png",
        imagenes: [
            "jerico_murallas.png",
            "jerico_marchando.png",
            "jerico_gritando.png",
            "jerico_murallas_caen.png",
            "jerico_victoria.png"
        ],
        versiculo: { ref: "Josué 6:20", texto: "El muro se derrumbó." },
        cuento: [
            "🏰 La ciudad de Jericó tenía murallas enormes e imposibles de derribar. ¡Nadie podía entrar!",
            "💪 Dios le dijo a Josué un plan muy extraño: ¡Marchen alrededor de la ciudad por 7 días!",
            "🚶 El pueblo obedeció. Marcharon en silencio alrededor de Jericó una vez al día durante 6 días.",
            "🎺 El séptimo día marcharon 7 veces. Luego los sacerdotes tocaron las trompetas y el pueblo gritó con TODA su fuerza.",
            "💥 ¡BOOM! ¡Las murallas gigantes se derrumbaron! ¡El plan de Dios siempre funciona, aunque parezca loco!"
        ],
        leccion: "Los planes de Dios pueden parecer raros, pero siempre funcionan. ¡Confía y obedece!",
        miniJuego: [
            { pregunta: "¿Cuántos días marcharon?", opciones: ["3 días", "7 días", "10 días"], correcta: 1 },
            { pregunta: "¿Quién lideró al pueblo?", opciones: ["Moisés", "Josué", "David"], correcta: 1 },
            { pregunta: "¿Cuántas veces marcharon el 7mo día?", opciones: ["1 vez", "3 veces", "7 veces"], correcta: 2 },
            { pregunta: "¿Qué hicieron después de marchar?", opciones: ["Corrieron", "Gritaron con fuerza", "Se sentaron"], correcta: 1 },
            { pregunta: "¿Qué pasó con las murallas?", opciones: ["Se abrieron", "Se derrumbaron", "Nada"], correcta: 1 }
        ], estrellas: 5
    },
    // 13. GEDEÓN Y SUS 300
    {
        id: "gedeon", titulo: "¡Gedeón y los 300 Valientes!", emoji: "🔦",
        categoria: "AT", color: "#f39c12", colorOscuro: "#e67e22",
        cssGradient: "linear-gradient(135deg, #f39c12, #e67e22, #f1c40f)",
        cssEmoji: "🔦🏺🎺⚔️",
        imagen: "gedeon_sencillo.png",
        imagenes: [
            "gedeon_sencillo.png",
            "gedeon_ejercito_grande.png",
            "gedeon_ejercito_grande.png",
            "gedeon_300_cantaros.png",
            "gedeon_victoria.png"
        ],
        versiculo: { ref: "Jueces 7:7", texto: "Con estos trescientos hombres os salvaré." },
        cuento: [
            "😰 Los enemigos de Israel eran tantos como la arena del mar. ¡El pueblo tenía mucho miedo!",
            "👨‍🌾 Dios eligió a Gedeón, un hombre sencillo que no se creía valiente. Pero Dios le dijo: ¡Tú eres un guerrero!",
            "📉 Gedeón reunió 32,000 soldados pero Dios dijo: ¡Son demasiados! Quiero que sepan que YO los salvo, no ustedes.",
            "💧 Dios redujo el ejército a solo 300 hombres. ¡Contra miles y miles de enemigos!",
            "🔦 Los 300 rompieron sus cántaros, encendieron antorchas y gritaron: ¡Por la espada de Jehová y de Gedeón! ¡Los enemigos huyeron aterrados!"
        ],
        leccion: "Dios no necesita mucho para hacer grandes cosas. ¡Con Él, lo imposible es posible!",
        miniJuego: [
            { pregunta: "¿Cuántos hombres usó Dios?", opciones: ["32,000", "300", "1,000"], correcta: 1 },
            { pregunta: "¿Qué trabajo tenía Gedeón?", opciones: ["Rey", "Hombre sencillo", "Soldado"], correcta: 1 },
            { pregunta: "¿Qué usaron los 300?", opciones: ["Espadas", "Cántaros y antorchas", "Arcos"], correcta: 1 },
            { pregunta: "¿Por qué Dios redujo el ejército?", opciones: ["Ruidosos", "Para que supieran que Él los salvó", "Débiles"], correcta: 1 },
            { pregunta: "¿Qué gritaron los 300?", opciones: ["¡Auxilio!", "¡Por Jehová y Gedeón!", "¡Victoria!"], correcta: 1 }
        ], estrellas: 5
    },
    // 14. SANSÓN EL FUERTE  
    {
        id: "sanson", titulo: "¡Sansón el Súper Fuerte!", emoji: "💪",
        categoria: "AT", color: "#e74c3c", colorOscuro: "#c0392b",
        cssGradient: "linear-gradient(135deg, #e74c3c, #c0392b, #ff6b6b)",
        cssEmoji: "💪🦁🏛️⛓️",
        imagen: "sanson_fuerza.png",
        imagenes: [
            "sanson_fuerza.png",
            "sanson_leon.png",
            "sanson_pelo_cortado.png",
            "sanson_debil.png",
            "sanson_final_oracion.png"
        ],
        versiculo: { ref: "Jueces 16:28", texto: "Señor Jehová, acuérdate ahora de mí, y fortaléceme." },
        cuento: [
            "👶 Antes de nacer, un ángel anunció que Sansón sería especial. ¡Dios le daría una fuerza INCREÍBLE!",
            "🦁 Sansón creció y era tan fuerte que podía pelear contra un león con sus propias manos. ¡Su fuerza venía de Dios!",
            "💇 Su secreto era que nunca debía cortarse el pelo. Pero contó su secreto a la persona equivocada.",
            "⛓️ Sus enemigos le cortaron el pelo mientras dormía y Sansón perdió su fuerza. Lo capturaron y lo encadenaron.",
            "🙏 Pero Sansón oró a Dios una última vez y recuperó su fuerza. Aprendió que sin Dios no somos nada."
        ],
        leccion: "Nuestra verdadera fuerza viene de Dios. Sin Él no podemos hacer nada grande.",
        miniJuego: [
            { pregunta: "¿De dónde venía su fuerza?", opciones: ["Ejercicio", "De Dios", "Comer mucho"], correcta: 1 },
            { pregunta: "¿Contra qué animal peleó?", opciones: ["Un oso", "Un león", "Un elefante"], correcta: 1 },
            { pregunta: "¿Cuál era su secreto?", opciones: ["Su comida", "Su pelo largo", "Su armadura"], correcta: 1 },
            { pregunta: "¿Qué pasó cuando le cortaron el pelo?", opciones: ["Más fuerte", "Perdió su fuerza", "Nada"], correcta: 1 },
            { pregunta: "¿Qué hizo al final?", opciones: ["Escapó", "Oró y recuperó su fuerza", "Se rindió"], correcta: 1 }
        ], estrellas: 5
    },
    // 15. RUT LA FIEL
    {
        id: "rut", titulo: "¡Rut, la Amiga Fiel!", emoji: "🌾",
        categoria: "AT", color: "#e8a87c", colorOscuro: "#c38d6b",
        cssGradient: "linear-gradient(135deg, #e8a87c, #c38d6b, #f3d9c6)",
        cssEmoji: "🌾👩‍❤️‍👩🏠💛",
        imagen: "rut_noemi.png",
        imagenes: [
            "rut_noemi.png",
            "rut_recogiendo_granos.png",
            "rut_booz.png",
            "rut_boda.png",
            "rut_bisabuelos_david.png"
        ],
        versiculo: { ref: "Rut 1:16", texto: "Tu pueblo será mi pueblo, y tu Dios mi Dios." },
        cuento: [
            "😢 Noemí perdió a su esposo y a sus dos hijos en una tierra lejana. Estaba muy triste y sola.",
            "👩 Rut era su nuera y la amaba mucho. Cuando Noemí decidió regresar a su tierra, Rut dijo: ¡Yo voy contigo!",
            "💛 Rut le dijo las palabras más bonitas: Tu pueblo será mi pueblo y tu Dios será mi Dios. ¡Nunca te dejaré!",
            "🌾 En la nueva tierra, Rut trabajaba recogiendo granos en los campos para alimentar a Noemí. Era muy trabajadora.",
            "💍 Dios recompensó su fidelidad: Rut conoció a Booz, se casaron, ¡y fueron los bisabuelos del rey David!"
        ],
        leccion: "La lealtad y el amor fiel son premiados por Dios. ¡Sé fiel a quienes amas!",
        miniJuego: [
            { pregunta: "¿A quién le dijo 'Tu pueblo será mi pueblo'?", opciones: ["Booz", "Noemí", "David"], correcta: 1 },
            { pregunta: "¿Qué hacía Rut para alimentar a Noemí?", opciones: ["Cocinaba", "Recogía granos", "Pescaba"], correcta: 1 },
            { pregunta: "¿Con quién se casó Rut?", opciones: ["David", "Booz", "Moisés"], correcta: 1 },
            { pregunta: "¿De quién fueron bisabuelos?", opciones: ["Salomón", "Del rey David", "Moisés"], correcta: 1 },
            { pregunta: "¿Qué cualidad premió Dios?", opciones: ["Su belleza", "Su fidelidad", "Su inteligencia"], correcta: 1 }
        ], estrellas: 5
    },
    // 16. DAVID Y GOLIAT
    {
        id: "david", titulo: "¡David contra el Gigante!", emoji: "🗡️",
        categoria: "AT", color: "#3498db", colorOscuro: "#2980b9",
        cssGradient: "linear-gradient(135deg, #3498db, #2980b9, #74b9ff)",
        cssEmoji: "🗡️🧑🏻‍🦱🪨💎",
        imagen: "david_pastor.png",
        imagenes: [
            "david_pastor.png",
            "david_goliat_gigante.png",
            "david_honda.png",
            "david_goliat_dios.png",
            "david_victoria_goliat.png"
        ],
        versiculo: { ref: "1 Samuel 17:47", texto: "Jehová no salva con espada y con lanza; porque de Jehová es la batalla." },
        cuento: [
            "👹 Goliat era un gigante de casi 3 metros de alto. ¡Todos los soldados de Israel le tenían terror!",
            "🧑 David era solo un pastorcito joven que cuidaba ovejas. Pero amaba a Dios con todo su corazón.",
            "😤 Cuando David escuchó a Goliat burlarse de Dios, dijo: ¡Yo pelearé contra él! ¡Dios está conmigo!",
            "🪨 David tomó 5 piedras lisas del río y su honda. No necesitaba armadura porque tenía la armadura de Dios.",
            "💥 ¡ZOOM! La piedra voló y golpeó a Goliat en la frente. ¡El gigante cayó! ¡Con Dios, lo pequeño vence a lo grande!"
        ],
        leccion: "No importa lo pequeño que seas. ¡Con Dios de tu lado puedes vencer cualquier gigante!",
        miniJuego: [
            { pregunta: "¿Qué trabajo tenía David?", opciones: ["Soldado", "Pastor de ovejas", "Carpintero"], correcta: 1 },
            { pregunta: "¿Cuántas piedras tomó?", opciones: ["Tres", "Cinco", "Diez"], correcta: 1 },
            { pregunta: "¿Qué arma usó David?", opciones: ["Espada", "Una honda", "Arco"], correcta: 1 },
            { pregunta: "¿Cuánto medía Goliat?", opciones: ["1 metro", "Casi 3 metros", "5 metros"], correcta: 1 },
            { pregunta: "¿Por qué enfrentó a Goliat?", opciones: ["Quería fama", "Se burlaba de Dios", "Le pagaron"], correcta: 1 }
        ], estrellas: 5
    },
    // 17. DANIEL Y LOS LEONES
    {
        id: "daniel", titulo: "¡Daniel y los Leones!", emoji: "🦁",
        categoria: "AT", color: "#f9ca24", colorOscuro: "#f0932b",
        cssGradient: "linear-gradient(135deg, #f9ca24, #f0932b, #ffbe76)",
        cssEmoji: "🦁😇🙏✨",
        imagen: "daniel_leones_cartoon_1772168642765.png",
        imagenes: [
            "daniel_orando.png",
            "daniel_ley_mala.png",
            "daniel_foso_leones.png",
            "daniel_foso_leones.png",
            "daniel_rescatado.png"
        ],
        versiculo: { ref: "Daniel 6:22", texto: "Mi Dios envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño." },
        cuento: [
            "🌟 Daniel amaba a Dios con todo su corazón. ¡Oraba tres veces al día sin importar lo que pasara!",
            "😈 Unos hombres malos hicieron una ley para que nadie orara a Dios. ¡Querían atrapar a Daniel!",
            "🙏 Pero Daniel siguió orando con valentía. ¡Dios era más importante que cualquier ley!",
            "🦁 El rey tuvo que echarlo a los leones... ¡pero Dios envió un ángel que cerró las bocas de todos los leones!",
            "✨ A la mañana siguiente, Daniel estaba perfectamente bien. ¡El rey le dijo a todos que adoraran al Dios de Daniel!"
        ],
        leccion: "¡Dios cuida a quienes confían en Él! No importa qué tan difícil sea, sigue orando.",
        miniJuego: [
            { pregunta: "¿Cuántas veces al día oraba?", opciones: ["Una", "Tres", "Siete"], correcta: 1 },
            { pregunta: "¿Qué ley hicieron los malos?", opciones: ["No comer", "No orar a Dios", "No cantar"], correcta: 1 },
            { pregunta: "¿Dónde tiraron a Daniel?", opciones: ["Al río", "Al foso de los leones", "A la cárcel"], correcta: 1 },
            { pregunta: "¿Quién cerró la boca de los leones?", opciones: ["Daniel", "Un ángel de Dios", "El rey"], correcta: 1 },
            { pregunta: "¿Cómo estaba Daniel al día siguiente?", opciones: ["Herido", "Perfectamente bien", "Asustado"], correcta: 1 }
        ], estrellas: 5
    },
    // 18. JONÁS Y LA BALLENA
    {
        id: "jonas", titulo: "¡Jonás y el Pez Gigante!", emoji: "🐋",
        categoria: "AT", color: "#00b4d8", colorOscuro: "#0077b6",
        cssGradient: "linear-gradient(135deg, #00b4d8, #0077b6, #90e0ef)",
        cssEmoji: "🐋🌊🚢🙏",
        imagen: "jonas_barco.png",
        imagenes: [
            "jonas_barco.png",
            "jonas_pez_grande.png",
            "jonas_dentro_pez.png",
            "jonas_escupido.png",
            "jonas_ninive.png"
        ],
        versiculo: { ref: "Jonás 2:10", texto: "Y mandó Jehová al pez, y vomitó a Jonás en tierra." },
        cuento: [
            "📢 Dios le dijo a Jonás: ¡Ve a la ciudad de Nínive y diles que se arrepientan! Pero Jonás tenía miedo.",
            "🚢 En vez de obedecer, Jonás se subió a un barco y huyó en dirección contraria. ¡Quería escapar de Dios!",
            "⛈️ Dios envió una tormenta terrible. Los marineros descubrieron que era por Jonás y lo tiraron al mar.",
            "🐋 ¡Un pez GIGANTE se tragó a Jonás! Dentro del pez, Jonás oró durante 3 días y 3 noches.",
            "🙏 Jonás se arrepintió y el pez lo escupió en la playa. Esta vez, ¡Jonás obedeció a Dios y fue a Nínive!"
        ],
        leccion: "No podemos escapar de Dios. Es mejor obedecer a la primera que aprender por las malas.",
        miniJuego: [
            { pregunta: "¿A qué ciudad debía ir?", opciones: ["Jerusalén", "Nínive", "Babilonia"], correcta: 1 },
            { pregunta: "¿Qué hizo Jonás en vez de obedecer?", opciones: ["Oró", "Huyó en un barco", "Se escondió"], correcta: 1 },
            { pregunta: "¿Cuántos días estuvo en el pez?", opciones: ["1 día", "3 días", "7 días"], correcta: 1 },
            { pregunta: "¿Qué hizo dentro del pez?", opciones: ["Durmió", "Oró y se arrepintió", "Nadó"], correcta: 1 },
            { pregunta: "¿Qué hizo al salir del pez?", opciones: ["Huyó otra vez", "Obedeció y fue a Nínive", "Se quedó"], correcta: 1 }
        ], estrellas: 5
    },
    // 19. LOS TRES AMIGOS EN EL HORNO
    {
        id: "horno", titulo: "¡3 Amigos en el Fuego!", emoji: "🔥",
        categoria: "AT", color: "#ff6348", colorOscuro: "#ee5a24",
        cssGradient: "linear-gradient(135deg, #ff6348, #ee5a24, #ffbe76)",
        cssEmoji: "🔥👦👦👦😇",
        imagen: "horno_estatua.png",
        imagenes: [
            "horno_estatua.png",
            "horno_tres_amigos.png",
            "horno_fuego.png",
            "horno_fuego.png",
            "horno_salen_ilesos.png"
        ],
        versiculo: { ref: "Daniel 3:25", texto: "He aquí yo veo cuatro varones sueltos, que se pasean en medio del fuego sin sufrir ningún daño." },
        cuento: [
            "👑 El rey Nabucodonosor hizo una estatua de oro gigante y ordenó que todos se arrodillaran ante ella.",
            "🙅 Tres amigos valientes — Sadrac, Mesac y Abed-nego — dijeron: ¡NO! Solo adoramos al Dios verdadero.",
            "😡 El rey se puso furioso y mandó a calentar un horno de fuego 7 veces más de lo normal.",
            "🔥 Los tiraron al horno... ¡pero el rey vio CUATRO personas caminando en el fuego! ¡El cuarto parecía un ángel!",
            "😲 Los tres amigos salieron sin un solo rasguño. ¡Ni su ropa olía a humo! El rey tuvo que reconocer al Dios verdadero."
        ],
        leccion: "Cuando defendemos a Dios con valentía, Dios camina con nosotros en medio del fuego.",
        miniJuego: [
            { pregunta: "¿Cuántos amigos se negaron a adorar?", opciones: ["Uno", "Dos", "Tres"], correcta: 2 },
            { pregunta: "¿Cómo se llamaban?", opciones: ["Pedro, Juan y Santiago", "Sadrac, Mesac y Abed-nego", "David, Salomón y Moisés"], correcta: 1 },
            { pregunta: "¿Cuántas personas vio el rey?", opciones: ["Tres", "Cuatro", "Dos"], correcta: 1 },
            { pregunta: "¿Cuántas veces más calentaron el horno?", opciones: ["3 veces", "7 veces más", "10 veces"], correcta: 1 },
            { pregunta: "¿Cómo salieron los tres amigos?", opciones: ["Quemados", "Sin rasguño ni olor a humo", "Heridos"], correcta: 1 }
        ], estrellas: 5
    },
    // 20. ELÍAS Y EL FUEGO DEL CIELO
    {
        id: "elias", titulo: "¡Fuego del Cielo!", emoji: "⚡",
        categoria: "AT", color: "#f39c12", colorOscuro: "#d35400",
        cssGradient: "linear-gradient(135deg, #f39c12, #d35400, #e74c3c)",
        cssEmoji: "⚡🔥⛰️🙏",
        imagen: "elias_profetas_baal.png",
        imagenes: [
            "elias_profetas_baal.png",
            "elias_altar_agua.png",
            "elias_altar_agua.png",
            "elias_fuego_cielo.png",
            "elias_pueblo_grita.png"
        ],
        versiculo: { ref: "1 Reyes 18:38", texto: "Entonces cayó fuego de Jehová, y consumió el holocausto." },
        cuento: [
            "😔 El pueblo de Israel estaba confundido. Adoraban al falso dios Baal en vez del Dios verdadero.",
            "💪 El profeta Elías retó a 450 profetas de Baal: ¡Vamos a ver quién es el Dios verdadero!",
            "🗣️ Los profetas de Baal gritaron, bailaron y pidieron a su dios que mandara fuego... ¡pero nada pasó!",
            "💧 Elías construyó un altar, lo mojó con MUCHA agua y oró con calma a Dios.",
            "🔥 ¡WHOOSH! ¡Cayó fuego del cielo que quemó todo, incluso las piedras mojadas! ¡Todo el pueblo gritó: ¡JEHOVÁ ES DIOS!"
        ],
        leccion: "El Dios verdadero siempre responde. No hay ningún dios como nuestro Dios.",
        miniJuego: [
            { pregunta: "¿Cuántos profetas de Baal retó?", opciones: ["50", "450", "100"], correcta: 1 },
            { pregunta: "¿Qué le pidieron a Baal?", opciones: ["Agua", "Que mandara fuego", "Comida"], correcta: 1 },
            { pregunta: "¿Respondió Baal?", opciones: ["Sí, con fuego", "No, nada pasó", "Sí, con lluvia"], correcta: 1 },
            { pregunta: "¿Qué hizo Elías con el altar?", opciones: ["Lo pintó", "Lo mojó con mucha agua", "Lo cubrió"], correcta: 1 },
            { pregunta: "¿Qué gritó el pueblo?", opciones: ["¡Baal es dios!", "¡Jehová es Dios!", "¡Elías es dios!"], correcta: 1 }
        ], estrellas: 5
    },
    // 21. DAVID Y SU ARPA
    {
        id: "david_arpa", titulo: "¡David, el Pastor Musical!", emoji: "🎵",
        categoria: "AT", color: "#9b59b6", colorOscuro: "#8e44ad",
        cssGradient: "linear-gradient(135deg, #9b59b6, #8e44ad, #be95c4)",
        cssEmoji: "🎵🐑🎶👑",
        imagen: "david_arpa_ovejas.png",
        imagenes: [
            "david_arpa_ovejas.png",
            "david_arpa_pastor.png",
            "david_arpa_salmos.png",
            "david_arpa_palacio.png",
            "david_arpa_rey.png"
        ],
        versiculo: { ref: "Salmos 23:1", texto: "Jehová es mi pastor; nada me faltará." },
        cuento: [
            "🐑 David era un joven pastor que cuidaba las ovejas de su papá en los campos verdes.",
            "🎶 Mientras cuidaba las ovejas, David tocaba su arpa y cantaba canciones hermosas para Dios. ¡Eran los Salmos!",
            "🐻 Un día vino un oso y otro día un león a atacar sus ovejas. ¡David los enfrentó con valentía porque Dios estaba con él!",
            "🎵 Su canción más famosa dice: El Señor es mi pastor, nada me faltará. Me lleva a aguas tranquilas.",
            "👑 Dios vio el corazón de David y lo eligió para ser rey de Israel. ¡Un simple pastor se convirtió en el rey más famoso!"
        ],
        leccion: "Dios ve tu corazón, no tu apariencia. ¡Cuando adoras a Dios, cosas increíbles pasan!",
        miniJuego: [
            { pregunta: "¿Qué instrumento tocaba?", opciones: ["Guitarra", "Arpa", "Piano"], correcta: 1 },
            { pregunta: "¿Qué animales cuidaba?", opciones: ["Vacas", "Ovejas", "Caballos"], correcta: 1 },
            { pregunta: "¿Cómo se llaman sus canciones?", opciones: ["Himnos", "Los Salmos", "Coros"], correcta: 1 },
            { pregunta: "¿Qué dice el Salmo 23?", opciones: ["Dios es grande", "Jehová es mi pastor", "Alabad al Señor"], correcta: 1 },
            { pregunta: "¿En qué se convirtió David?", opciones: ["Profeta", "Rey de Israel", "Sacerdote"], correcta: 1 }
        ], estrellas: 5
    },
    // 22. ESTER LA REINA VALIENTE
    {
        id: "ester", titulo: "¡Ester, la Reina Valiente!", emoji: "👑",
        categoria: "AT", color: "#e84393", colorOscuro: "#c73b7e",
        cssGradient: "linear-gradient(135deg, #e84393, #fd79a8, #fab1a0)",
        cssEmoji: "👑💎🏰💜",
        versiculo: { ref: "Ester 4:14", texto: "¿Y quién sabe si para esta hora has llegado al reino?" },
        cuento: [
            "👧 Ester era una joven judía muy hermosa que vivía con su primo Mardoqueo. Eran parte del pueblo de Dios.",
            "👑 El rey de Persia buscaba una nueva reina y eligió a Ester. ¡Se convirtió en reina del imperio más grande!",
            "😈 Un hombre malvado llamado Amán quería destruir a todo el pueblo de Dios. ¡Hizo un plan terrible!",
            "😰 Mardoqueo le dijo a Ester: ¡Tú eres la única que puede salvar a nuestro pueblo! Quizás Dios te hizo reina para esto.",
            "💪 Ester fue valiente, habló con el rey y salvó a todo su pueblo. ¡Dios la puso en el lugar correcto en el momento perfecto!"
        ],
        leccion: "Dios te pone donde estás por una razón. ¡Sé valiente y haz lo correcto!",
        miniJuego: [
            { pregunta: "¿Qué era Ester?", opciones: ["Princesa", "Reina de Persia", "Pastora"], correcta: 1 },
            { pregunta: "¿Quién era su primo?", opciones: ["Amán", "Mardoqueo", "David"], correcta: 1 },
            { pregunta: "¿Quién quería destruir al pueblo?", opciones: ["El rey", "Amán", "Mardoqueo"], correcta: 1 },
            { pregunta: "¿Qué hizo Ester?", opciones: ["Huyó", "Habló con el rey con valentía", "Se escondió"], correcta: 1 },
            { pregunta: "¿Por qué Dios la hizo reina?", opciones: ["Su belleza", "Para salvar a su pueblo", "Suerte"], correcta: 1 }
        ], estrellas: 5
    },
    // 23. EL SÁBADO
    {
        id: "sabado", titulo: "¡El Día Especial de Dios!", emoji: "🌟",
        categoria: "AT", color: "#a29bfe", colorOscuro: "#6c5ce7",
        cssGradient: "linear-gradient(135deg, #a29bfe, #6c5ce7, #dcd6f7)",
        cssEmoji: "🌟🕯️🤗❤️",
        imagen: "biblia_ninos_hero_1772168630395.png",
        versiculo: { ref: "Génesis 2:3", texto: "Y bendijo Dios al día séptimo, y lo santificó, porque en él reposó de toda la obra que había hecho." },
        cuento: [
            "🌅 En el principio, Dios creó el cielo y la tierra en 6 días increíbles. ¡Hizo el sol, la luna, los océanos y los animales!",
            "🌿 El día 1 hizo la luz. El día 3 hizo las plantas. El día 5 los peces y pájaros. El día 6 ¡los animales y al ser humano!",
            "😴 El día 7... Dios descansó. ¡No porque estuviera cansado, sino para darnos un regalo especial!",
            "🎁 El Sábado es como un abrazo de Dios cada semana. Es el día para estar con la familia, cantar y hablar con Él.",
            "💜 Dios puso el Sábado en el corazón de los 10 mandamientos porque lo ama mucho. ¡Es el día del Señor!"
        ],
        leccion: "El Sábado es el regalo de Dios para ti cada semana. ¡Es un día especial para descansar y estar con Él!",
        miniJuego: [
            { pregunta: "¿En qué día descansó Dios?", opciones: ["El 5to", "El 7mo día", "El 1er día"], correcta: 1 },
            { pregunta: "¿Por qué descansó Dios?", opciones: ["Estaba cansado", "Para dejarnos un regalo", "Se aburrió"], correcta: 1 },
            { pregunta: "¿En qué mandamiento está el Sábado?", opciones: ["El 1ro", "El 4to", "El 10mo"], correcta: 1 },
            { pregunta: "¿Qué hizo Dios con el 7mo día?", opciones: ["Lo ignoró", "Lo bendijo y santificó", "Lo eliminó"], correcta: 1 },
            { pregunta: "¿Para qué es el Sábado?", opciones: ["Trabajar más", "Descansar y adorar a Dios", "Jugar todo el día"], correcta: 1 }
        ], estrellas: 5
    },

    // ═══════════════════════════════════════
    // ✝️ NUEVO TESTAMENTO
    // ═══════════════════════════════════════

    // 24. EL NACIMIENTO DE JESÚS
    {
        id: "nacimiento", titulo: "¡Nació el Rey Jesús!", emoji: "👶",
        categoria: "NT", color: "#ffeaa7", colorOscuro: "#d4a017",
        cssGradient: "linear-gradient(135deg, #1a1a4e, #2c2c6e, #ffeaa7)",
        cssEmoji: "👶⭐🐑🎶",
        versiculo: { ref: "Lucas 2:11", texto: "Os ha nacido hoy, en la ciudad de David, un Salvador, que es Cristo el Señor." },
        cuento: [
            "💫 Un ángel visitó a María y le dijo: ¡No tengas miedo! Vas a tener un hijo muy especial: ¡el Hijo de Dios!",
            "🫏 María y José viajaron a Belén. Estaba lleno de gente y no encontraron hotel. Solo un establo con animales.",
            "👶 Esa noche nació Jesús, el Salvador del mundo. María lo envolvió en telas y lo puso en un pesebre.",
            "🌟 Una estrella brillantísima apareció en el cielo. Los ángeles cantaron: ¡Gloria a Dios en las alturas!",
            "🐑 Los pastores corrieron a ver al bebé. Reyes magos vinieron desde lejos con regalos. ¡El Rey del universo nació en un establo!"
        ],
        leccion: "Dios eligió nacer humilde para enseñarnos que el amor es más grande que la riqueza.",
        miniJuego: [
            { pregunta: "¿Dónde nació Jesús?", opciones: ["Un palacio", "Un establo", "Un hospital"], correcta: 1 },
            { pregunta: "¿Quién le anunció a María?", opciones: ["José", "Un ángel", "Un profeta"], correcta: 1 },
            { pregunta: "¿En qué ciudad nació?", opciones: ["Jerusalén", "Belén", "Nazaret"], correcta: 1 },
            { pregunta: "¿Quiénes lo visitaron primero?", opciones: ["Los reyes", "Los pastores", "Los soldados"], correcta: 1 },
            { pregunta: "¿Qué apareció en el cielo?", opciones: ["Un arco iris", "Una estrella brillante", "La luna llena"], correcta: 1 }
        ], estrellas: 5
    },
    // 25. JESÚS EN EL TEMPLO
    {
        id: "jesus_templo", titulo: "¡Jesús Niño en el Templo!", emoji: "🏛️",
        categoria: "NT", color: "#00cec9", colorOscuro: "#00b4b4",
        cssGradient: "linear-gradient(135deg, #00cec9, #00b4b4, #81ecec)",
        cssEmoji: "🏛️📖🧒💡",
        versiculo: { ref: "Lucas 2:49", texto: "¿No sabíais que en los negocios de mi Padre me es necesario estar?" },
        cuento: [
            "👦 Cuando Jesús tenía 12 años, su familia viajó a Jerusalén para una fiesta especial.",
            "😰 De regreso, María y José notaron que ¡Jesús no estaba! Lo buscaron por todas partes durante 3 días.",
            "🏛️ ¡Lo encontraron en el templo! Estaba sentado con los maestros más sabios, haciéndoles preguntas.",
            "😲 Todos estaban asombrados por la sabiduría de ese niño. ¡Les enseñaba cosas que ni ellos sabían!",
            "❤️ Jesús les dijo a sus padres: Debo estar en la casa de mi Padre. Pero volvió con ellos y fue un hijo obediente."
        ],
        leccion: "Nunca somos muy jóvenes para aprender sobre Dios. ¡Jesús amaba estudiar la Biblia desde niño!",
        miniJuego: [
            { pregunta: "¿Cuántos años tenía Jesús?", opciones: ["8", "12", "15"], correcta: 1 },
            { pregunta: "¿Cuántos días lo buscaron?", opciones: ["1 día", "3 días", "7 días"], correcta: 1 },
            { pregunta: "¿Qué hacía en el templo?", opciones: ["Jugaba", "Hablaba con los maestros", "Dormía"], correcta: 1 },
            { pregunta: "¿Cómo reaccionaron los maestros?", opciones: ["Se enojaron", "Estaban asombrados", "Lo ignoraron"], correcta: 1 },
            { pregunta: "¿Qué dijo Jesús del templo?", opciones: ["Es bonito", "Es la casa de mi Padre", "No me gusta"], correcta: 1 }
        ], estrellas: 5
    },
    // 26. EL BAUTISMO DE JESÚS
    {
        id: "bautismo", titulo: "¡Jesús se Bautiza!", emoji: "💧",
        categoria: "NT", color: "#48dbfb", colorOscuro: "#0abde3",
        cssGradient: "linear-gradient(135deg, #48dbfb, #0abde3, #dff9fb)",
        cssEmoji: "💧🕊️☀️🌊",
        versiculo: { ref: "Mateo 3:17", texto: "Este es mi Hijo amado, en quien tengo complacencia." },
        cuento: [
            "🏜️ Juan el Bautista predicaba en el desierto y bautizaba a las personas en el río Jordán.",
            "🚶 Un día Jesús vino caminando hacia el río. Juan dijo: ¡Yo debería ser bautizado por ti, no tú por mí!",
            "💧 Pero Jesús dijo: Así debe ser. Y Juan lo bautizó sumergiéndolo completamente en el agua.",
            "🕊️ Cuando Jesús salió del agua, el cielo se abrió y el Espíritu Santo bajó como una paloma sobre Él.",
            "🗣️ Una voz del cielo dijo: ¡Este es mi Hijo amado, en quien tengo complacencia! ¡Dios mismo habló desde el cielo!"
        ],
        leccion: "El bautismo es un paso hermoso de amor. Jesús nos dio el ejemplo para que nosotros también lo sigamos.",
        miniJuego: [
            { pregunta: "¿Quién bautizó a Jesús?", opciones: ["Pedro", "Juan el Bautista", "Pablo"], correcta: 1 },
            { pregunta: "¿En qué río fue bautizado?", opciones: ["Nilo", "Jordán", "Éufrates"], correcta: 1 },
            { pregunta: "¿Qué bajó como paloma?", opciones: ["Un ángel", "El Espíritu Santo", "Una nube"], correcta: 1 },
            { pregunta: "¿Qué dijo la voz del cielo?", opciones: ["Bien hecho", "Este es mi Hijo amado", "Amén"], correcta: 1 },
            { pregunta: "¿Cómo fue bautizado Jesús?", opciones: ["Agua en la cabeza", "Sumergido completamente", "Con aceite"], correcta: 1 }
        ], estrellas: 5
    },
    // 27. JESÚS CALMA LA TORMENTA
    {
        id: "tormenta", titulo: "¡Jesús Calma la Tormenta!", emoji: "⛈️",
        categoria: "NT", color: "#636e72", colorOscuro: "#2d3436",
        cssGradient: "linear-gradient(135deg, #636e72, #2d3436, #74b9ff)",
        cssEmoji: "⛈️🚣✋🌤️",
        versiculo: { ref: "Marcos 4:39", texto: "Y levantándose, reprendió al viento, y dijo al mar: Calla, enmudece." },
        cuento: [
            "⛵ Jesús y sus discípulos navegaban en un barco por el lago. Jesús estaba tan cansado que se quedó dormido.",
            "⛈️ De repente una tormenta terrible apareció. ¡Las olas eran gigantes y el barco se llenaba de agua!",
            "😱 Los discípulos tenían MUCHO miedo y gritaron: ¡Jesús, despierta! ¡Nos vamos a hundir!",
            "✋ Jesús se levantó con calma y dijo al viento y al mar: ¡CALLA! ¡SILENCIO! Y todo quedó en perfecta paz.",
            "😲 Los discípulos se preguntaban: ¿Quién es este hombre que hasta el viento y el mar le obedecen?"
        ],
        leccion: "Con Jesús en tu barco, ninguna tormenta puede hundirte. Él tiene poder sobre todo.",
        miniJuego: [
            { pregunta: "¿Dónde estaba Jesús cuando empezó?", opciones: ["Orando", "Durmiendo en el barco", "Pescando"], correcta: 1 },
            { pregunta: "¿Qué le dijo a la tormenta?", opciones: ["¡Vete!", "¡Calla, enmudece!", "¡Para!"], correcta: 1 },
            { pregunta: "¿Qué pasó cuando habló?", opciones: ["Llovió más", "Todo quedó en paz", "El barco se hundió"], correcta: 1 },
            { pregunta: "¿Cómo se sentían los discípulos?", opciones: ["Contentos", "Tenían mucho miedo", "Tranquilos"], correcta: 1 },
            { pregunta: "¿Qué preguntaron después?", opciones: ["¿Dónde estamos?", "¿Quién es este que el viento obedece?", "¿Podemos irnos?"], correcta: 1 }
        ], estrellas: 5
    },
    // 28. JESÚS ALIMENTA A 5000
    {
        id: "cinco_mil", titulo: "¡5 Panes y 2 Peces!", emoji: "🐟",
        categoria: "NT", color: "#2ecc71", colorOscuro: "#27ae60",
        cssGradient: "linear-gradient(135deg, #2ecc71, #27ae60, #a8e6cf)",
        cssEmoji: "🐟🍞👦🧺",
        versiculo: { ref: "Juan 6:11", texto: "Y Jesús tomó aquellos panes, y habiendo dado gracias, los repartió." },
        cuento: [
            "👥 Miles y miles de personas seguían a Jesús para escucharlo. ¡Había más de 5,000 personas y tenían hambre!",
            "😰 Los discípulos dijeron: No tenemos dinero para alimentar a tanta gente. ¿Qué hacemos?",
            "🧒 Un niño pequeño se acercó con su almuerzo: solo tenía 5 panes y 2 peces. ¡Era muy poquito!",
            "🙏 Jesús tomó el almuerzo del niño, dio gracias a Dios, y empezó a repartir. ¡La comida no se acababa NUNCA!",
            "🧺 ¡Todos comieron hasta llenarse y sobraron 12 canastas llenas! Lo poco en las manos de Dios se convierte en mucho."
        ],
        leccion: "No importa lo poco que tengas. Si lo pones en las manos de Jesús, Él hace milagros.",
        miniJuego: [
            { pregunta: "¿Cuántas personas alimentó Jesús?", opciones: ["100", "Más de 5,000", "500"], correcta: 1 },
            { pregunta: "¿Cuántos panes y peces tenía el niño?", opciones: ["3 y 1", "5 panes y 2 peces", "7 y 5"], correcta: 1 },
            { pregunta: "¿Quién trajo el almuerzo?", opciones: ["Un discípulo", "Un niño pequeño", "Un ángel"], correcta: 1 },
            { pregunta: "¿Qué hizo Jesús antes de repartir?", opciones: ["Compró más", "Dio gracias a Dios", "Llamó gente"], correcta: 1 },
            { pregunta: "¿Cuántas canastas sobraron?", opciones: ["5", "12", "3"], correcta: 1 }
        ], estrellas: 5
    },
    // 29. EL BUEN SAMARITANO
    {
        id: "samaritano", titulo: "¡El Vecino que Ayudó!", emoji: "🤝",
        categoria: "NT", color: "#e17055", colorOscuro: "#d63031",
        cssGradient: "linear-gradient(135deg, #e17055, #d63031, #fab1a0)",
        cssEmoji: "🤝🩹❤️🫏",
        versiculo: { ref: "Lucas 10:27", texto: "Amarás a tu prójimo como a ti mismo." },
        cuento: [
            "🚶 Un hombre caminaba solo por un camino peligroso. ¡Unos ladrones lo atacaron y lo dejaron herido!",
            "🚶‍♂️ Un sacerdote pasó por allí, vio al hombre herido... ¡y siguió de largo! No quiso ayudar.",
            "🚶‍♀️ Después pasó otro hombre religioso... ¡y también se fue sin ayudar! Qué triste.",
            "💛 Pero luego pasó un samaritano (alguien que los demás despreciaban). Él SÍ se detuvo y curó las heridas del hombre.",
            "🫏 Lo subió a su burro, lo llevó a un hotel y pagó por su cuidado. ¡ESO es ser un buen prójimo!"
        ],
        leccion: "Dios quiere que ayudemos a TODOS los que necesitan ayuda, sin importar quiénes son.",
        miniJuego: [
            { pregunta: "¿Quién ayudó al hombre herido?", opciones: ["El sacerdote", "El samaritano", "El levita"], correcta: 1 },
            { pregunta: "¿Quiénes pasaron de largo?", opciones: ["Pastores", "El sacerdote y otro religioso", "Soldados"], correcta: 1 },
            { pregunta: "¿Qué hizo el samaritano?", opciones: ["Lo ignoró", "Curó sus heridas", "Lo regañó"], correcta: 1 },
            { pregunta: "¿En qué animal lo llevó?", opciones: ["Caballo", "Burro", "Camello"], correcta: 1 },
            { pregunta: "¿Qué nos enseña?", opciones: ["Ser fuertes", "Ayudar a todos", "Caminar rápido"], correcta: 1 }
        ], estrellas: 5
    },
    // 30. JESÚS Y LOS NIÑOS
    {
        id: "jesus_ninos", titulo: "¡Jesús Ama a los Niños!", emoji: "👫",
        categoria: "NT", color: "#fd79a8", colorOscuro: "#e84393",
        cssGradient: "linear-gradient(135deg, #fd79a8, #e84393, #fab1a0)",
        cssEmoji: "👫❤️😊🌸",
        versiculo: { ref: "Marcos 10:14", texto: "Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos." },
        cuento: [
            "👨‍👩‍👧 Las mamás y papás querían llevar a sus hijos a ver a Jesús. ¡Los niños estaban emocionadísimos!",
            "🚫 Pero los discípulos dijeron: ¡No molesten a Jesús! ¡Él está muy ocupado para niños!",
            "😠 Jesús se enojó con sus discípulos y dijo: ¡DEJEN que los niños vengan a mí! ¡No se lo impidan!",
            "🤗 Jesús sentó a los niños en su regazo, los abrazó y puso sus manos sobre ellos para bendecirlos.",
            "❤️ Jesús dijo: El reino de los cielos es de los que son como niños. ¡Tú eres SUPER importante para Jesús!"
        ],
        leccion: "¡Jesús te ama MUCHO! Tú eres importantísimo para Él. Siempre puedes acercarte a Jesús.",
        miniJuego: [
            { pregunta: "¿Qué dijo Jesús sobre los niños?", opciones: ["Que esperen", "Que vengan a Él", "Que se callen"], correcta: 1 },
            { pregunta: "¿Qué dijeron los discípulos?", opciones: ["Vengan", "No molesten a Jesús", "Jueguen"], correcta: 1 },
            { pregunta: "¿Cómo reaccionó Jesús?", opciones: ["Les dio la razón", "Se enojó con ellos", "Los ignoró"], correcta: 1 },
            { pregunta: "¿Qué hizo Jesús con los niños?", opciones: ["Los mandó a casa", "Los abrazó y bendijo", "Los puso a trabajar"], correcta: 1 },
            { pregunta: "¿De quién es el Reino según Jesús?", opciones: ["De los adultos", "De los como niños", "De los ricos"], correcta: 1 }
        ], estrellas: 5
    }
];

// --- ESTADO DEL MÓDULO NIÑOS ---
let kidsState = {
    historiaActual: 0,
    seccion: "hub",
    estrellasTotales: 0,
    paginaCuento: 0,
    cargandoNube: true,
    cinemaActivo: false,
    cinemaTimer: null,
    cinemaPausado: false,
    categoriaFiltro: "todas", // todas | AT | NT
    narrandoActivo: false,    // true = auto-narración activa
    vozHablando: false        // true = la voz está hablando ahora
};

// Pre-cargar voces del sistema
if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
