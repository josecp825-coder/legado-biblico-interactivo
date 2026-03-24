// ==========================================
// 📜 MÓDULO ADULTOS — SEMINARIO DIGITAL SDA
// Filosofía Adventista del Séptimo Día
// ==========================================

const ADULTOS_DATA = {
    estudioDelDia: {
        obtenerActual: function () {
            const diaDelAnio = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const indice = diaDelAnio % this.temas.length;
            return this.temas[indice];
        },
        temas: [
            {
                pasaje: "Hebreos 8:1-6",
                titulo: "El Sumo Sacerdote en el Santuario Celestial",
                subtitulo: "La Gran Controversia — Capítulo Doctrinal",
                versos: [
                    { v: 1, heb: "archiereus", gr: "ἀρχιερεύς", texto: "Ahora bien, el punto principal de lo que venimos diciendo es este: tenemos tal sumo sacerdote, el cual se sentó a la diestra del trono de la Majestad en los cielos," },
                    { v: 2, heb: "leitourgos", gr: "λειτουργός", texto: "ministro del santuario, y de aquel verdadero tabernáculo que levantó el Señor, y no el hombre." },
                    { v: 4, heb: "", gr: "", texto: "Así que, si estuviese sobre la tierra, ni siquiera sería sacerdote, habiendo aún sacerdotes que presentan las ofrendas según la ley;" },
                    { v: 5, heb: "hypodeigma", gr: "ὑπόδειγμα", texto: "los cuales sirven a lo que es figura y sombra de las cosas celestiales, como se le advirtió a Moisés cuando iba a erigir el tabernáculo..." },
                    { v: 6, heb: "diatheke", gr: "διαθήκη", texto: "Pero ahora tanto mejor ministerio es el suyo, cuanto es mediador de un mejor pacto, establecido sobre mejores promesas." }
                ],
                exegesis: {
                    contexto: "El Libro de Hebreos fue escrito circa 60-70 d.C. a creyentes judíos en riesgo de apostasía. El autor establece la superioridad del sacerdocio de Cristo sobre el levítico mediante una tipología directa del santuario mosaico.",
                    palabrasClave: [
                        { palabra: "ἀρχιερεύς (archiereús)", significado: "Sumo Sacerdote — título reservado para el oficio más alto del sacerdocio levítico." },
                        { palabra: "ὑπόδειγμα (hypódeigma)", significado: "Copia, modelo, ejemplo. El santuario terrenal era una COPIA del celestial." }
                    ],
                    estructuraSantuario: [
                        { lugar: "Atrio", objeto: "Altar de holocausto", representacion: "La cruz — lugar de expiación", ref: "Lev 1" },
                        { lugar: "Lugar Santo", objeto: "Incienso / Pan", representacion: "Intercesión de Cristo", ref: "Heb 7:25" },
                        { lugar: "Lugar Santísimo", objeto: "Arca del Pacto", representacion: "Juicio Investigador (1844)", ref: "Dan 8:14" }
                    ]
                },
                comentarioSDA: "El Santuario Celestial es el fundamento de la doctrina adventista: el Juicio Investigador. En 1844 iniciamos la fase final del ministerio sacerdotal.",
                ellenGWhite: { cita: "Cristo es el mediador del nuevo pacto... intercede por nosotros.", obra: "El Conflicto de los Siglos, pág. 415", imagen: "egw_portrait_adventista_1772170430747.png" },
                traducciones: [{ sigla: "RV1960", texto: "Ahora bien, el punto principal..." }, { sigla: "NVI", texto: "Ahora bien, el punto principal..." }]
            },
            {
                pasaje: "Daniel 8:14",
                titulo: "La Profecía de las 2,300 Tardes y Mañanas",
                subtitulo: "Nuestra Ubicación en el Tiempo Profético",
                versos: [
                    { v: 14, heb: "nisdaq", gr: "", texto: "Y él dijo: Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado." }
                ],
                exegesis: {
                    contexto: "Daniel recibe una visión sobre el tiempo del fin. La purificación del santuario (Tiqqun) se refiere al Juicio Investigador.",
                    palabrasClave: [{ palabra: "נִצְדַּק (Nitsdaq)", significado: "Restaurar, purificar, vindicar. Usado en Dan 8:14." }],
                    estructuraSantuario: [{ lugar: "Última Fase", objeto: "Juicio", representacion: "Purificación", ref: "Dan 8:14" }]
                },
                comentarioSDA: "Esta es la profecía de tiempo más larga de la Biblia. Nos indica que desde 1844 vivimos en el tiempo del fin.",
                ellenGWhite: { cita: "La profecía de Daniel 8:14 es el ancla de nuestra fe.", obra: "Primeros Escritos", imagen: "egw_portrait_adventista_1772170430747.png" },
                traducciones: [{ sigla: "RV1960", texto: "Hasta dos mil trescientas tardes y mañanas..." }]
            }
        ]
    },

    doctrinasIntros: {
        "DIOS": "Nuestro Dios Creador es amor, poder y esplendor. Él es tres en uno, misterioso e infinito, y sin embargo desea una conexión íntima con la humanidad. Nos dio la Biblia como su Santa Palabra.",
        "HUMANIDAD": "Amorosamente diseñados como seres perfectos, Dios creó a los humanos a su propia imagen. Pero el pecado se coló... Afortunadamente, Dios tenía un plan para redimirnos.",
        "SALVACIÓN": "Satanás acusó a Dios de ser injusto y descarrió a una porción de los ángeles. Pero Dios demostró cuánto nos ama enviando a su propio Hijo, Jesucristo, a morir en nuestro lugar.",
        "IGLESIA": "Jesús comisionó a sus seguidores para contar a otros sobre su amor. A pesar de lo imperfecta que es la humanidad, Dios nos da el privilegio de ser parte de su ministerio.",
        "VIDA DIARIA": "La ley de Dios nos muestra el camino a seguir y los escollos a evitar. Responder a su llamada significa ser administradores de la tierra y cuidar de nuestras mentes y cuerpos.",
        "RESTAURACIÓN": "Antes de la Segunda Venida, Dios está investigando toda la tierra. Disfrutaremos de un milenio en el cielo y la restauración de nuestra tierra al paraíso que una vez fue."
    },

    doctrinas28: [
        { num: 1, cat: "DIOS", titulo: "Las Sagradas Escrituras", icono: "📖", resumen: "La Palabra escrita de Dios, guía infalible de fe.", ref: "Sal 119:105; 2 Tim 3:16-17", detalle: "Las Sagradas Escrituras, Antiguo y Nuevo Testamento, son la Palabra escrita de Dios, dada por inspiración divina. Los autores inspirados hablaron y escribieron movidos por el Espíritu Santo. En esta Palabra, Dios ha confiado a la humanidad el conocimiento necesario para la salvación. Las Sagradas Escrituras son la suprema, autoritaria e infalible revelación de Su voluntad. Son la norma de carácter, la prueba de la experiencia, el revelador definitivo de las doctrinas, y el registro fiable de los actos de Dios en la historia." },
        { num: 2, cat: "DIOS", titulo: "La Deidad", icono: "⚛️", resumen: "Unidad de tres Personas coeternales.", ref: "Mat 28:19; 2 Cor 13:14", detalle: "Hay un solo Dios: Padre, Hijo, y Espíritu Santo, una unidad de tres Personas coeternales. Dios es inmortal, todopoderoso, omnisciente, sobre todo, y omnipresente. Es infinito y más allá de la comprensión humana, pero conocido a través de su auto-revelación. Dios, que es amor, es por siempre digno de adoración y servicio por parte de toda la creación." },
        { num: 3, cat: "DIOS", titulo: "Dios Padre", icono: "👑", resumen: "Creador, Proveedor y Sustentador eterno.", ref: "Juan 3:16; Apoc 4:11", detalle: "Dios el Padre eterno es el Creador, Proveedor, Sustentador y Soberano de toda la creación. Él es justo y santo, misericordioso y gentil, lento para la ira, y abundante en amor y fidelidad. Las cualidades y poderes exhibidos en el Hijo y el Espíritu Santo son también las del Padre." },
        { num: 4, cat: "DIOS", titulo: "Dios Hijo (Jesucristo)", icono: "✝️", resumen: "Dios encarnado para nuestra salvación.", ref: "Juan 1:1-3; Heb 8:1-2", detalle: "Dios Hijo encarnó en Jesucristo. A través de Él todas las cosas fueron creadas, el carácter de Dios es revelado, la salvación de la humanidad es alcanzada, y el mundo es enjuiciado. Dios siendo eterno y verdadero, se convirtió también en un verdadero humano, Jesús el Cristo. Fue concebido por el Espíritu Santo y nació de la virgen María. Vivió y experimentó la tentación como un ser humano, pero ejemplificó perfectamente la justicia y el amor de Dios. Sufrió y murió voluntariamente en la cruz en lugar nuestro a causa de nuestros pecados, resucitó de entre los muertos y subió al cielo para ministrar en el santuario celestial en nuestro favor." },
        { num: 5, cat: "DIOS", titulo: "Dios Espíritu Santo", icono: "🕊️", resumen: "Persona activa en la Creación y Redención.", ref: "Juan 16:7-13; Hechos 1:8", detalle: "Dios Espíritu Santo fue parte activa con el Padre y el Hijo en la Creación, la encarnación y la redención. Él es tan persona como lo son el Padre y el Hijo. Él inspiró a los autores de las Escrituras. Llenó la vida de Cristo con poder. Él atrae y convence a los seres humanos; y a aquellos que responden, Él los renueva y transforma a la imagen de Dios. Fue enviado por el Padre y el Hijo para estar siempre con sus hijos, extiende los dones espirituales a la iglesia, la capacita para dar testimonio de Cristo, y en armonía con las Escrituras la conduce a toda la verdad." },
        { num: 6, cat: "HUMANIDAD", titulo: "Creación", icono: "🌍", resumen: "Relato histórico de la actividad creativa de Dios.", ref: "Gén 1-2; Éx 20:8-11", detalle: "Dios ha revelado en las Escrituras el auténtico e histórico relato de su actividad creativa. Él creó el universo, y en una reciente creación de seis días el Señor hizo «los cielos y la tierra, el mar y todo lo que hay en ellos» y descansó en el séptimo día. Así estableció el sábado como un recordatorio perpetuo de la obra que realizó y completó durante seis días literales que junto con el sábado constituyeron la misma unidad de tiempo que hoy llamamos una semana. El hombre y la mujer fueron hechos a imagen de Dios como obra cumbre." },
        { num: 7, cat: "HUMANIDAD", titulo: "Naturaleza de la Humanidad", icono: "🧬", resumen: "Unidad indivisible de cuerpo, mente y espíritu.", ref: "Gén 1:26-28; 1 Tes 5:23", detalle: "El hombre y la mujer fueron hechos a imagen de Dios con individualidad, el poder y la libertad de pensar y hacer. Aunque fueron creados como seres libres, cada uno es una unidad indivisible de cuerpo, mente y espíritu, que depende de Dios para la vida, el aliento y todo lo demás. Cuando nuestros primeros padres desobedecieron a Dios, negaron su dependencia de Él y cayeron de su alta posición. Sus descendientes comparten esta naturaleza caída y sus consecuencias. Pero Dios en Cristo reconcilió al mundo consigo mismo y por su Espíritu restaura en los mortales penitentes la imagen de su Creador." },
        { num: 8, cat: "SALVACIÓN", titulo: "La Gran Controversia", icono: "⚔️", resumen: "Conflicto universal sobre el carácter de Dios.", ref: "Apoc 12:4-9; Job 1:6-12", detalle: "Toda la humanidad está ahora involucrada en una gran controversia entre Cristo y Satanás con respecto al carácter de Dios, su ley y su soberanía sobre el universo. Este conflicto se originó en el cielo cuando un ser creado, dotado de libertad de elección, en exaltación propia se convirtió en Satanás. Llevó a la rebelión a una porción de los ángeles. Introdujo el espíritu de rebelión en este mundo cuando llevó a Adán y Eva al pecado. Este mundo se convirtió en la arena del conflicto universal, del cual el Dios de amor será finalmente reivindicado." },
        { num: 9, cat: "SALVACIÓN", titulo: "Vida, Muerte y Resurrección de Cristo", icono: "🌅", resumen: "Único medio de expiación por el pecado.", ref: "Isa 53; 1 Cor 15:3-4", detalle: "En la vida de Cristo, de perfecta obediencia a la voluntad de Dios, su sufrimiento, muerte y resurrección, Dios proporcionó el único medio de expiación por el pecado humano, para que aquellos que por fe acepten esta expiación puedan tener vida eterna. Esta expiación perfecta vindica la justicia de la ley de Dios y la gracia de su carácter. La muerte de Cristo es sustitutiva y expiatoria, reconciliadora y transformadora. La resurrección corporal de Cristo proclama el triunfo de Dios sobre las fuerzas del mal." },
        { num: 10, cat: "SALVACIÓN", titulo: "Experiencia de la Salvación", icono: "🕊️", resumen: "Justificados y adoptados por gracia.", ref: "Juan 3:16; Ef 2:4-10", detalle: "En infinito amor y misericordia Dios hizo a Cristo, que no conocía el pecado, para que fuera para nosotros pecado, para que en Él pudiéramos experimentar la justicia de Dios. Guiados por el Espíritu Santo sentimos nuestra necesidad, reconocemos nuestra pecaminosidad, nos arrepentimos de nuestras transgresiones y ejercemos la fe en Jesús como Salvador y Señor. A través de Cristo somos justificados, adoptados como hijos e hijas de Dios, y liberados del señorío del pecado. El Espíritu renueva nuestras mentes y escribe la ley de amor de Dios en nuestros corazones." },
        { num: 11, cat: "SALVACIÓN", titulo: "Creciendo en Cristo", icono: "🌱", resumen: "Victoria sobre las fuerzas del mal.", ref: "Sal 1:1-2; Col 2:6", detalle: "Con su muerte en la cruz, Jesús triunfó sobre las fuerzas del mal. La victoria de Jesús nos da la victoria sobre las fuerzas del mal que aún buscan controlarnos, mientras caminamos con él en paz, alegría y seguros de su amor. Ahora el Espíritu Santo mora en nosotros y nos da poder. Estamos llamados a crecer a semejanza de su carácter, comulgando con él diariamente en la oración, alimentándonos de su Palabra, meditando en ella y participando en la misión de la Iglesia." },
        { num: 12, cat: "IGLESIA", titulo: "La Iglesia", icono: "🏛️", resumen: "Comunidad de creyentes en Jesucristo.", ref: "Mat 28:19-20; Ef 1:22", detalle: "La iglesia es la comunidad de creyentes que confiesan a Jesucristo como Señor y Salvador. Somos llamados a diferenciarnos del mundo; y nos reunimos para la adoración, para la comunión, para la instrucción en la Palabra, para la celebración de la Cena del Señor, para el servicio a la humanidad y para la proclamación mundial del evangelio. La iglesia es la familia de Dios; es el cuerpo de Cristo, una comunidad de fe de la cual Cristo mismo es la cabeza. Es la novia por la que Cristo murió para santificarla." },
        { num: 13, cat: "IGLESIA", titulo: "El Remanente y su Misión", icono: "🎺", resumen: "Llamados a guardar los mandamientos en el tiempo del fin.", ref: "Apoc 12:17; 14:6-12", detalle: "La iglesia universal está compuesta por todos los que creen verdaderamente en Cristo, pero en los últimos días, un tiempo de apostasía generalizada, un remanente ha sido llamado a guardar los mandamientos de Dios y la fe de Jesús. Este remanente anuncia la llegada de la hora del juicio, proclama la salvación a través de Cristo y anuncia la llegada de su segundo advenimiento. Esta proclamación está simbolizada por los tres ángeles de Apocalipsis 14." },
        { num: 14, cat: "IGLESIA", titulo: "Unidad en el Cuerpo de Cristo", icono: "🤝", resumen: "Un cuerpo con muchos miembros sin distinciones.", ref: "Juan 17:20-23; Gál 3:27-29", detalle: "La iglesia es un cuerpo con muchos miembros, llamados de todas las naciones, tribus, lenguas, y pueblos. En Cristo somos una nueva creación; las distinciones de raza, cultura, nacionalidad, y las diferencias entre altos y bajos, ricos y pobres, hombres y mujeres, no deben ser divisorias entre nosotros. Todos somos iguales en Cristo, que por un solo Espíritu nos ha unido en una comunión con Él y con los demás. Esta unidad tiene su fuente en la unidad del Dios trino." },
        { num: 15, cat: "IGLESIA", titulo: "Bautismo", icono: "💧", resumen: "Símbolo de unión con Cristo y perdón de pecados.", ref: "Mat 28:19; Rom 6:1-6", detalle: "Por el bautismo confesamos nuestra fe en la muerte y resurrección de Jesucristo, y damos testimonio de nuestra muerte al pecado y de nuestro propósito de caminar en la novedad de la vida. Es un símbolo de nuestra unión con Cristo, el perdón de nuestros pecados y la recepción del Espíritu Santo. Es por inmersión en el agua y depende de la afirmación de la fe en Jesús y la evidencia del arrepentimiento del pecado." },
        { num: 16, cat: "IGLESIA", titulo: "La Cena del Señor", icono: "🍷", resumen: "Participación en los emblemas del sacrificio de Cristo.", ref: "1 Cor 11:23-30; Juan 13:1-17", detalle: "La Cena del Señor es una participación en los emblemas del cuerpo y la sangre de Jesús como expresión de la fe en Él. En esta experiencia de comunión, Cristo está presente para encontrar y fortalecer a su pueblo. La preparación incluye el auto-examen, el arrepentimiento y la confesión. El Maestro ordenó el servicio del lavado de pies para significar una renovada limpieza y humildad de Cristo." },
        { num: 17, cat: "VIDA DIARIA", titulo: "Dones y Ministerios Espirituales", icono: "🎁", resumen: "Habilidades otorgadas por el Espíritu para el servicio.", ref: "1 Cor 12:7-11; Ef 4:11", detalle: "Dios otorga a todos los miembros de su iglesia en todas las épocas los dones espirituales que cada miembro debe emplear en un ministerio amoroso para el bienestar general de la iglesia y de la humanidad. Dados por la agencia del Espíritu Santo, los dones proveen todas las habilidades necesarias. Incluyen ministerios como la fe, la sanación, la profecía, la proclamación, la enseñanza, la administración, la reconciliación y el servicio abnegado." },
        { num: 18, cat: "VIDA DIARIA", titulo: "El Don de la Profecía", icono: "🔮", resumen: "Autoridad profética manifestada en Ellen G. White.", ref: "Apoc 12:17; 19:10", detalle: "Las Escrituras testifican que uno de los dones del Espíritu Santo es la profecía. Este don es una marca identificadora de la iglesia remanente y creemos que se manifestó en el ministerio de Ellen G. White. Sus escritos hablan con autoridad profética y proveen consuelo, guía, instrucción, y corrección a la iglesia. También dejan claro que la Biblia es el estándar por el cual toda enseñanza debe ser probada." },
        { num: 19, cat: "VIDA DIARIA", titulo: "La Ley de Dios", icono: "📜", resumen: "Los Diez Mandamientos como expresión del amor divino.", ref: "Éx 20:1-17; Rom 8:3-4", detalle: "Los grandes principios de la ley de Dios están encarnados en los Diez Mandamientos y ejemplificados en la vida de Cristo. Expresan el amor, la voluntad y los propósitos de Dios en relación con la conducta humana. Estos preceptos son la base del pacto de Dios y la norma en el juicio. La salvación es enteramente por gracia y no por obras, y su fruto es la obediencia a los mandamientos que desarrolla el carácter cristiano." },
        { num: 20, cat: "VIDA DIARIA", titulo: "El Sábado", icono: "🌅", resumen: "Memorial perpetuo de la Creación y Redención.", ref: "Gén 2:1-3; Éx 20:8-11", detalle: "El amable Creador, después de los seis días de la Creación, descansó en el séptimo día e instituyó el Sábado para todas las personas como un memorial de la Creación. El cuarto mandamiento requiere la observancia del séptimo día como día de descanso, adoración y ministerio en armonía con Jesús. Es un símbolo de nuestra redención en Cristo y un signo de nuestra santificación. Su alegre observancia es de tarde a tarde." },
        { num: 21, cat: "VIDA DIARIA", titulo: "Mayordomía", icono: "💰", resumen: "Administradores fieles del tiempo y recursos de Dios.", ref: "Mal 3:8-12; 2 Cor 9:7", detalle: "Somos los mayordomos de Dios, a quienes Él ha confiado tiempo y oportunidades, habilidades y posesiones. Somos responsables ante Él por su uso apropiado. Reconocemos la propiedad de Dios por medio del servicio fiel y devolviendo el diezmo y dando ofrendas para la proclamación de su evangelio. La mayordomía es un privilegio dado para nutrirnos en el amor y la victoria sobre el egoísmo." },
        { num: 22, cat: "VIDA DIARIA", titulo: "Conducta Cristiana", icono: "✨", resumen: "Viviendo en armonía con los principios bíblicos.", ref: "1 Cor 6:19-20; Rom 12:1-2", detalle: "Estamos llamados a ser un pueblo santo que piensa, siente, y actúa en armonía con los principios bíblicos. Nos involucramos sólo en aquellas cosas que producirán la pureza, la salud y la alegría de Cristo. Nuestra vestimenta debe ser sencilla, modesta y pulcra. Como nuestros cuerpos son templos del Espíritu Santo, debemos cuidarlos inteligentemente con dieta saludable y absteniéndonos de alimentos impuros y sustancias dañinas." },
        { num: 23, cat: "VIDA DIARIA", titulo: "El Matrimonio y la Familia", icono: "🏠", resumen: "Unión de por vida establecida por Dios.", ref: "Gén 2:18-25; Mat 19:3-9", detalle: "El matrimonio fue divinamente establecido en el Edén y afirmado por Jesús como una unión de por vida entre un hombre y una mujer. El amor mutuo, el honor y el respeto son el tejido de esta relación, que debe reflejar la relación entre Cristo y su iglesia. Dios bendice a la familia y pretende que sus miembros se ayuden mutuamente para alcanzar una completa madurez. Los padres deben educar a sus hijos en el amor al Señor." },
        { num: 24, cat: "RESTAURACIÓN", titulo: "Ministerio de Cristo en el Santuario Celestial", icono: "🏛️", resumen: "Juicio investigador iniciado en 1844.", ref: "Dan 8:14; Heb 8:1-5", detalle: "Hay un santuario en el cielo donde Cristo ministra en nuestro nombre. En 1844, al final del período profético de 2300 días, entró en la segunda y última fase de su ministerio expiatorio. Es un trabajo de juicio investigativo que revela quiénes entre los muertos y los vivos permanecen en Cristo, guardando los mandamientos de Dios y la fe de Jesús. Este juicio reivindica la justicia de Dios al salvar a los que creen en Él." },
        { num: 25, cat: "RESTAURACIÓN", titulo: "La Segunda Venida de Cristo", icono: "🎺", resumen: "El gran clímax del evangelio y esperanza de la iglesia.", ref: "Juan 14:1-3; 1 Tes 4:13-18", detalle: "La segunda venida de Cristo es la bendita esperanza de la iglesia. La venida del Salvador será literal, personal, visible y mundial. Cuando regrese, los justos muertos resucitarán, y junto con los justos vivos serán glorificados y llevados al cielo. El cumplimiento casi completo de la profecía indica que la venida de Cristo está cerca, y se nos exhorta a estar listos en todo momento." },
        { num: 26, cat: "RESTAURACIÓN", titulo: "Muerte y Resurrección", icono: "😴", resumen: "Estado inconsciente hasta la glorificación final.", ref: "Ecl 9:5; 1 Cor 15:51-54", detalle: "La paga del pecado es la muerte. Pero Dios concederá la vida eterna a sus redimidos. Hasta ese día la muerte es un estado inconsciente para todas las personas. Cuando Cristo aparezca, los justos resucitados y los justos vivos serán glorificados y arrebatados al encuentro de su Señor. La segunda resurrección, la de los injustos, tendrá lugar mil años después." },
        { num: 27, cat: "RESTAURACIÓN", titulo: "El Milenio y el Fin del Pecado", icono: "🌌", resumen: "Reinado de mil años y erradicación del mal.", ref: "Apoc 20; 21:1-5", detalle: "El milenio es el reino de mil años de Cristo con sus santos en el cielo entre la primera y la segunda resurrección. Durante este tiempo los malvados muertos serán juzgados; la tierra estará desolada y ocupada por Satanás. Al final, la Ciudad Santa descenderá, los muertos injustos resucitarán para el juicio final y el fuego de Dios limpiará la tierra, liberando al universo del pecado para siempre." },
        { num: 28, cat: "RESTAURACIÓN", titulo: "La Nueva Tierra", icono: "🌏", resumen: "Hogar eterno de los redimidos en presencia de Dios.", ref: "Isa 65:17-25; Apoc 21:1-7", detalle: "En la nueva tierra, en la que habita la justicia, Dios proveerá un hogar eterno para los redimidos y un ambiente perfecto para la vida eterna, el amor, la alegría y el aprendizaje en su presencia. Allí Dios mismo morará con su pueblo, y el sufrimiento y la muerte habrán pasado. La gran controversia terminará, y el pecado ya no existirá. Todas las cosas declararán que Dios es amor." }
    ],

    notasPersonales: [],

    planEstudio: [
        { semana: 1, tema: "El Santuario — Tipología y Antitipo", textos: ["Éx 25-27", "Lev 16", "Heb 8-10"] },
        { semana: 2, tema: "Daniel 8 y las 2,300 tardes", textos: ["Dan 8:14", "Dan 9:24-27", "Esd 7:7-26"] },
        { semana: 3, tema: "El Juicio Investigador — ¿Bíblico?", textos: ["Dan 7:9-14", "Ap 14:6-7", "1 Pe 4:17"] },
        { semana: 4, tema: "La Nueva Tierra y el Sábado Eterno", textos: ["Is 66:22-23", "Ap 21-22", "Gén 2:1-3"] }
    ]
};

// --- ESTADO MÓDULO ADULTOS ---
let adultosState = {
    seccion: "hub",
    tabExeg: "texto",
    doctrinaIdx: 0,
    notaTexto: "",
    planSemana: 0,
    cargandoNube: true,
    notas: []
};

// ==========================================
// HUB PRINCIPAL ADULTOS
// ==========================================
function renderModuloAdultos() {
    const container = document.getElementById("pantalla-estudio");
    const est = ADULTOS_DATA.estudioDelDia.obtenerActual();

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#1a0a00,#2d1a00,#1a1200);font-family:'Georgia',serif;padding-bottom:50px;">

            <!-- HEADER ELEGANTE -->
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);border-bottom:1px solid rgba(212,175,55,0.2);padding:16px 22px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;">
                <button onclick="window.location.reload()" style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Georgia',serif;letter-spacing:1px;">← INICIO</button>
                <div style="text-align:center;">
                    <div style="color:rgba(212,175,55,0.6);font-size:0.65rem;letter-spacing:4px;font-family:'Segoe UI',sans-serif;">LEGADO BÍBLICO</div>
                    <div style="color:#d4af37;font-weight:700;font-size:0.9rem;letter-spacing:2px;">SEMINARIO DIGITAL SDA</div>
                </div>
                <div style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:6px;padding:6px 12px;color:#d4af37;font-size:0.78rem;font-family:'Segoe UI',sans-serif;">📜 Nivel: Avanzado</div>
            </div>

            <!-- HERO BANNER -->
            <div style="position:relative;margin:20px;border-radius:12px;overflow:hidden;box-shadow:0 25px 80px rgba(0,0,0,0.8);border:1px solid rgba(212,175,55,0.2);">
                <img src="adultos_seminario_hero_1772170415343.png" style="width:100%;height:260px;object-fit:cover;object-position:center;display:block;">
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(26,10,0,0.97) 0%,rgba(26,10,0,0.5) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:28px;">
                    <div style="color:rgba(212,175,55,0.7);font-size:0.65rem;letter-spacing:5px;margin-bottom:8px;font-family:'Segoe UI',sans-serif;">ESTUDIO DEL DÍA</div>
                    <h1 style="color:#fff;font-size:1.6rem;font-weight:700;margin:0 0 6px;line-height:1.3;">${est.titulo}</h1>
                    <p style="color:rgba(255,255,255,0.55);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">${est.pasaje} — ${est.subtitulo}</p>
                </div>
            </div>

            <!-- MENÚ SECCIONES -->
            <div style="padding:0 20px;display:grid;gap:12px;">

                <!-- ESTUDIO EXEGÉTICO -->
                <div onclick="renderExegesisAdultos()" style="background:linear-gradient(135deg,rgba(212,175,55,0.08),rgba(180,130,20,0.04));border:1px solid rgba(212,175,55,0.2);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(212,175,55,0.5)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(212,175,55,0.2)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">🏛️</div>
                    <div style="flex:1;">
                        <h3 style="color:#d4af37;font-size:1rem;margin:0 0 4px;letter-spacing:1px;">Estudio Exegético</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Hebreos 8 — Análisis griego, contexto y estructura del Santuario</p>
                    </div>
                    <div style="color:rgba(212,175,55,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- COMENTARIO SDA -->
                <div onclick="renderComentarioSDA()" style="background:linear-gradient(135deg,rgba(139,90,43,0.15),rgba(100,60,20,0.08));border:1px solid rgba(139,90,43,0.3);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(139,90,43,0.6)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(139,90,43,0.3)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">📖</div>
                    <div style="flex:1;">
                        <h3 style="color:#cd853f;font-size:1rem;margin:0 0 4px;">Comentario Bíblico SDA</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Perspectiva adventista + Cita de Elena G. de White</p>
                    </div>
                    <div style="color:rgba(205,133,63,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- 28 DOCTRINAS -->
                <div onclick="renderDoctrinas28()" style="background:linear-gradient(135deg,rgba(70,50,120,0.15),rgba(50,30,90,0.08));border:1px solid rgba(100,80,160,0.3);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(150,120,210,0.6)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(100,80,160,0.3)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">📋</div>
                    <div style="flex:1;">
                        <h3 style="color:#a29bfe;font-size:1rem;margin:0 0 4px;">28 Doctrinas Fundamentales</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Referencia rápida de las creencias adventistas esenciales</p>
                    </div>
                    <div style="color:rgba(162,155,254,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- TRADUCCIONES -->
                <div onclick="renderTraduccionesAdultos()" style="background:linear-gradient(135deg,rgba(0,140,130,0.12),rgba(0,100,95,0.06));border:1px solid rgba(0,180,165,0.25);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(0,206,201,0.5)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(0,180,165,0.25)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">🔄</div>
                    <div style="flex:1;">
                        <h3 style="color:#00cec9;font-size:1rem;margin:0 0 4px;">Traducciones en Paralelo</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">RV1960 · NVI · DHH — Versículo a versículo</p>
                    </div>
                    <div style="color:rgba(0,206,201,0.6);font-size:1.3rem;">›</div>
                </div>

                <!-- NOTAS PERSONALES -->
                <div onclick="renderNotasAdultos()" style="background:liner-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(255,255,255,0.25)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(255,255,255,0.1)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">✏️</div>
                    <div style="flex:1;">
                        <h3 style="color:rgba(255,255,255,0.8);font-size:1rem;margin:0 0 4px;">Notas Personales</h3>
                        <p style="color:rgba(255,255,255,0.35);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Tu bloc de estudio — guardado permanentemente en tu dispositivo</p>
                    </div>
                    <div style="color:rgba(255,255,255,0.3);font-size:1.3rem;">›</div>
                </div>

                <!-- PLAN DE ESTUDIO -->
                <div onclick="renderPlanEstudio()" style="background:linear-gradient(135deg,rgba(255,100,50,0.1),rgba(200,60,20,0.05));border:1px solid rgba(255,120,50,0.25);border-radius:12px;padding:20px;cursor:pointer;transition:0.3s;display:flex;align-items:center;gap:16px;"
                    onmouseover="this.style.borderColor='rgba(255,150,80,0.5)';this.style.transform='translateX(4px)'"
                    onmouseout="this.style.borderColor='rgba(255,120,50,0.25)';this.style.transform='translateX(0)'">
                    <div style="font-size:2.2rem;">📅</div>
                    <div style="flex:1;">
                        <h3 style="color:#fd9644;font-size:1rem;margin:0 0 4px;">Plan de Estudio — 4 Semanas</h3>
                        <p style="color:rgba(255,255,255,0.45);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">El Santuario — Daniel 8 — Juicio Investigador — Nueva Tierra</p>
                    </div>
                    <div style="color:rgba(253,150,68,0.6);font-size:1.3rem;">›</div>
                </div>
            </div>
        </div>
    `;

    // 🔥 SINCRONIZACIÓN NUBE
    if (adultosState.cargandoNube) {
        cargarNotasFirebase().then(notas => {
            adultosState.notas = notas;
            adultosState.cargandoNube = false;
        });
    }
}

// ==========================================
// EXÉGESIS
// ==========================================
function renderExegesisAdultos() {
    const est = ADULTOS_DATA.estudioDelDia.obtenerActual();
    const container = document.getElementById("pantalla-estudio");
    let tab = adultosState.tabExeg;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0800,#1e1200,#120d00);font-family:'Georgia',serif;padding-bottom:40px;">
            <div id="floating-bible-nav" class="floating-nav-panel">
                <div class="nav-brand-area">
                    <button class="btn-home-back" onclick="renderModuloAdultos()">←</button>
                    <span class="current-ref-text">ESTUDIO EXEGÉTICO</span>
                    <button class="btn-arrow" onclick="renderModuloAdultos()">🏠</button>
                </div>
                <div class="nav-controls-grid">
                    <button onclick="window.abrirSelectorRapidoLibros()" class="btn-nav-dynamic">📖 LIBRO</button>
                    <button onclick="window.abrirSelectorRapidoCaps('Hebreos')" class="btn-nav-dynamic">📑 CAP</button>
                    <button onclick="window.abrirSelectorRapidoVersos()" class="btn-nav-dynamic">🔢 VERSO</button>
                </div>
            </div>
            
            <div style="padding-top:115px;"></div>

            <!-- TABS -->
            <div style="display:flex;border-bottom:1px solid rgba(212,175,55,0.12);background:rgba(0,0,0,0.3);">
                ${[
            { id: "texto", label: "Texto" },
            { id: "palabras", label: "Palabras Clave" },
            { id: "santuario", label: "Estructura" }
        ].map(t => `
                    <button onclick="adultosState.tabExeg='${t.id}';renderExegesisAdultos();"
                        style="flex:1;padding:14px;font-size:0.8rem;font-family:'Segoe UI',sans-serif;font-weight:${tab === t.id ? '700' : '400'};
                        color:${tab === t.id ? '#d4af37' : 'rgba(255,255,255,0.4)'};background:transparent;border:none;
                        border-bottom:${tab === t.id ? '2px solid #d4af37' : '2px solid transparent'};cursor:pointer;letter-spacing:1px;">
                        ${t.label}
                    </button>
                `).join('')}
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                ${tab === 'texto' ? `
                    <div style="background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.15);border-radius:10px;padding:22px;margin-bottom:16px;">
                        <div style="color:rgba(212,175,55,0.6);font-size:0.68rem;letter-spacing:4px;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">${est.pasaje} — REINA-VALERA 1960</div>
                        ${est.versos.map(v => `
                            <div style="display:flex;gap:14px;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid rgba(212,175,55,0.08);">
                                <span style="background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.3);color:#d4af37;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.82rem;font-weight:700;flex-shrink:0;font-family:'Segoe UI',sans-serif;">${v.v}</span>
                                <div>
                                    <p style="color:rgba(255,255,255,0.9);font-size:0.95rem;margin:0 0 6px;line-height:1.7;font-style:italic;">${v.texto}</p>
                                    ${v.gr ? `<span style="background:rgba(162,155,254,0.12);border:1px solid rgba(162,155,254,0.2);color:#a29bfe;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-family:'Segoe UI',sans-serif;cursor:pointer;" onclick="renderExegesisAdultos()">${v.gr} · ${v.heb}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="background:rgba(255,255,255,0.03);border-left:3px solid #d4af37;padding:18px 20px;border-radius:0 8px 8px 0;">
                        <div style="color:#d4af37;font-size:0.68rem;letter-spacing:3px;margin-bottom:10px;font-family:'Segoe UI',sans-serif;">📚 CONTEXTO HISTÓRICO</div>
                        <p style="color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.75;margin:0;">${est.exegesis.contexto}</p>
                    </div>
                ` : ''}

                ${tab === 'palabras' ? `
                    <div style="display:grid;gap:14px;">
                        ${est.exegesis.palabrasClave.map(p => `
                            <div style="background:rgba(162,155,254,0.06);border:1px solid rgba(162,155,254,0.15);border-radius:10px;padding:20px;">
                                <div style="color:#a29bfe;font-size:0.9rem;font-weight:700;margin-bottom:8px;font-family:'Courier New',monospace;">${p.palabra}</div>
                                <p style="color:rgba(255,255,255,0.75);font-size:0.85rem;line-height:1.7;margin:0;font-family:'Segoe UI',sans-serif;">${p.significado}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${tab === 'santuario' ? `
                    <div style="margin-bottom:16px;">
                        <h3 style="color:#d4af37;font-size:0.9rem;letter-spacing:2px;margin:0 0 16px;font-family:'Segoe UI',sans-serif;">ESTRUCTURA DEL SANTUARIO — TIPOLOGÍA</h3>
                        ${est.exegesis.estructuraSantuario.map((s, i) => `
                            <div style="background:${['rgba(255,107,107,0.08)', 'rgba(249,202,36,0.08)', 'rgba(85,239,196,0.08)'][i]};border:1px solid ${['rgba(255,107,107,0.2)', 'rgba(249,202,36,0.2)', 'rgba(85,239,196,0.2)'][i]};border-radius:10px;padding:18px;margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;">
                                <div style="background:${['#ff6b6b', '#f9ca24', '#55efc4'][i]};color:#000;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.75rem;flex-shrink:0;font-family:'Segoe UI',sans-serif;">${i + 1}</div>
                                <div>
                                    <h4 style="color:${['#ff6b6b', '#f9ca24', '#55efc4'][i]};font-size:0.92rem;margin:0 0 4px;">${s.lugar}</h4>
                                    <p style="color:rgba(255,255,255,0.6);font-size:0.78rem;margin:0 0 6px;font-family:'Segoe UI',sans-serif;">${s.objeto}</p>
                                    <p style="color:rgba(255,255,255,0.85);font-size:0.85rem;margin:0 0 6px;line-height:1.5;font-family:'Segoe UI',sans-serif;">${s.representacion}</p>
                                    <span style="color:rgba(255,255,255,0.35);font-size:0.72rem;font-family:'Segoe UI',sans-serif;">${s.ref}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <button onclick="renderModuloAdultos()" style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);color:#d4af37;padding:12px;border-radius:8px;cursor:pointer;width:100%;font-family:'Georgia',serif;letter-spacing:1px;margin-top:8px;">← Volver al Seminario</button>
            </div>
        </div>
    `;
}

// ==========================================
// COMENTARIO SDA + ELENA G. WHITE
// ==========================================
function renderComentarioSDA() {
    const est = ADULTOS_DATA.estudioDelDia.obtenerActual();
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0800,#1a1000,#0a0800);font-family:'Georgia',serif;padding-bottom:40px;">
            <div id="floating-bible-nav" class="floating-nav-panel">
                <div class="nav-brand-area">
                    <button class="btn-home-back" onclick="renderModuloAdultos()">←</button>
                    <span class="current-ref-text">COMENTARIO SDA</span>
                    <button class="btn-arrow" onclick="renderModuloAdultos()">🏠</button>
                </div>
                <div class="nav-controls-grid">
                    <button onclick="window.abrirSelectorRapidoLibros()" class="btn-nav-dynamic">📖 LIBRO</button>
                    <button onclick="window.abrirSelectorRapidoCaps('Hebreos')" class="btn-nav-dynamic">📑 CAP</button>
                    <button onclick="window.abrirSelectorRapidoVersos()" class="btn-nav-dynamic">🔢 VERSO</button>
                </div>
            </div>
            
            <div style="padding-top:115px;"></div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <!-- COMENTARIO PRINCIPAL -->
                <div style="background:rgba(139,90,43,0.08);border:1px solid rgba(139,90,43,0.2);border-radius:12px;padding:24px;margin-bottom:20px;">
                    <div style="color:#cd853f;font-size:0.68rem;letter-spacing:4px;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">COMENTARIO BÍBLICO ADVENTISTA — ${est.pasaje}</div>
                    <p style="color:rgba(255,255,255,0.88);font-size:0.94rem;line-height:1.85;margin:0;">${est.comentarioSDA}</p>
                </div>

                <!-- ELENA G. WHITE -->
                <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(212,175,55,0.2);border-radius:12px;overflow:hidden;margin-bottom:20px;">
                    <div style="display:flex;align-items:center;gap:0;">
                        <div style="flex:1;padding:24px;">
                            <div style="color:rgba(212,175,55,0.7);font-size:0.65rem;letter-spacing:4px;margin-bottom:12px;font-family:'Segoe UI',sans-serif;">✨ ELENA G. DE WHITE</div>
                            <p style="color:rgba(255,255,255,0.85);font-size:0.9rem;font-style:italic;line-height:1.75;margin:0 0 14px;">"${est.ellenGWhite.cita}"</p>
                            <span style="color:rgba(212,175,55,0.6);font-size:0.78rem;font-family:'Segoe UI',sans-serif;">— ${est.ellenGWhite.obra}</span>
                        </div>
                        <div style="width:130px;flex-shrink:0;height:200px;overflow:hidden;">
                            <img src="${est.ellenGWhite.imagen}" style="width:100%;height:100%;object-fit:cover;object-position:top;">
                        </div>
                    </div>
                </div>

                <!-- TEXTOS CONEXOS -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;">
                    <div style="color:rgba(255,255,255,0.4);font-size:0.68rem;letter-spacing:3px;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">📚 TEXTOS CONEXOS DE ESTUDIO</div>
                    <div style="display:flex;flex-wrap:wrap;gap:10px;">
                        ${["Daniel 8:14", "Hebreos 9:24-28", "Levítico 16", "Apocalipsis 11:19", "1 Juan 2:1"].map(t => `
                            <span style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.2);color:#d4af37;padding:6px 14px;border-radius:4px;font-size:0.8rem;font-family:'Segoe UI',sans-serif;cursor:pointer;">${t}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 28 DOCTRINAS
// ==========================================
function renderDoctrinas28() {
    const container = document.getElementById("pantalla-estudio");
    const docs = ADULTOS_DATA.doctrinas28;
    const intros = ADULTOS_DATA.doctrinasIntros;
    const categorias = ["DIOS", "HUMANIDAD", "SALVACIÓN", "IGLESIA", "VIDA DIARIA", "RESTAURACIÓN"];

    // Mapa de resúmenes intermedios por número de doctrina
    const RESUMENES_MEDIOS = {
        1: "Las Sagradas Escrituras, Antiguo y Nuevo Testamento, son la Palabra escrita de Dios, dada por inspiración divina. El Espíritu Santo movió a los autores para hablar y escribir la verdad divina. La Biblia es la suprema, autoritaria e infalible revelación de la voluntad de Dios. Es la norma del carácter cristiano, la prueba de toda experiencia espiritual y el revelador final de las doctrinas.",
        2: "Existe un solo Dios: Padre, Hijo y Espíritu Santo — una unidad de tres Personas coeternales. Dios es inmortal, todopoderoso, omnisciente y omnipresente. Es infinito y trasciende la comprensión humana, pero se revela a través de su Palabra y sus actos. Dios, que es amor en esencia, es eternamente digno de adoración y servicio por parte de toda la creación.",
        3: "Dios el Padre eterno es el Creador, Proveedor, Sustentador y Soberano de toda la creación. Él es justo y santo, misericordioso y gentil, lento para la ira y abundante en amor y fidelidad. A través de su Hijo, Él revela su carácter más plenamente. Todo lo que el Hijo y el Espíritu Santo son en carácter y poder, también lo es el Padre.",
        4: "Dios el Hijo encarnó en Jesucristo. A través de Él todas las cosas fueron creadas y el carácter de Dios fue revelado plenamente. Siendo Dios eterno, se hizo también verdadero hombre, concebido por el Espíritu Santo y nacido de la virgen María. Vivió la tentación como humano, pero sin pecado. Sufrió y murió voluntariamente en la cruz en nuestro lugar, resucitó y ahora ministra en el Santuario Celestial.",
        5: "Dios el Espíritu Santo fue parte activa con el Padre y el Hijo en la Creación, la Encarnación y la Redención. Es tan persona como el Padre y el Hijo. Inspiró a los autores de las Escrituras, llenó la vida de Cristo con poder, atrae y convence a los seres humanos. En los que responden, los renueva y transforma a la imagen de Dios, extendiéndoles dones espirituales para el servicio.",
        6: "Dios reveló en las Escrituras el auténtico relato histórico de su obra creativa. En seis días literales creó «los cielos y la tierra, el mar y todo lo que hay en ellos», y descansó el séptimo día. Así instituyó el sábado como recordatorio perpetuo de la creación completa. El ser humano fue creado como obra cumbre de Dios, hecho a su imagen, distinto de todos los demás seres vivientes.",
        7: "El hombre y la mujer fueron creados a imagen de Dios con individualidad, libertad de pensar y actuar. Como seres libres, son una unidad indivisible de cuerpo, mente y espíritu, que depende completamente de Dios para la vida. Cuando los primeros padres desobedecieron, negaron esta dependencia y cayeron de su alta posición. Sus descendientes compartimos esta naturaleza caída, pero Dios en Cristo ofrece restaurar la imagen de su Creador.",
        8: "Toda la humanidad está envuelta en una gran controversia entre Cristo y Satanás sobre el carácter de Dios, su ley y su soberanía. Este conflicto se originó en el cielo cuando Lucifer, dotado de libertad, se exaltó a sí mismo y se convirtió en Satanás. Introdujo la rebelión en la tierra llevando a Adán y Eva al pecado. Este mundo se convirtió en la arena del conflicto universal, del cual Dios será finalmente reivindicado.",
        9: "En la vida perfecta de Cristo, su sufrimiento y su resurrección, Dios proporcionó el único medio de expiación por el pecado humano. Quienes aceptan esta expiación por fe tienen vida eterna. Este sacrificio vindicó la justicia de la ley de Dios y manifestó la gracia de su carácter. La muerte de Cristo es sustitutiva, expiatoria y reconciliadora. Su resurrección corporal proclama el triunfo de Dios sobre las fuerzas del mal.",
        10: "En infinito amor, Dios hizo a Cristo pecado en nuestro lugar, para que pudiéramos experimentar su justicia. Guiados por el Espíritu Santo, reconocemos nuestra pecaminosidad, nos arrepentimos y ejercemos fe en Jesús. A través de Cristo somos justificados, adoptados como hijos de Dios y liberados del señorío del pecado. El Espíritu renueva nuestras mentes y escribe la ley de amor de Dios en nuestros corazones.",
        11: "Con su muerte en la cruz, Jesús triunfó sobre las fuerzas del mal, y esa victoria nos pertenece ahora. El Espíritu Santo mora en nosotros y nos da poder para resistir. Estamos llamados a crecer en semejanza del carácter de Cristo, comulgando diariamente con Él en la oración, alimentándonos de su Palabra y participando activamente en la misión de la Iglesia.",
        12: "La iglesia es la comunidad de creyentes que confiesan a Jesucristo como Señor y Salvador. Llamados a diferenciarse del mundo, se reúnen para adoración, comunión, instrucción en la Palabra y celebración de la Cena del Señor. La iglesia es la familia de Dios, el cuerpo de Cristo y la novia por quien Él murió para santificarla y presentarla sin mancha.",
        13: "En los últimos días, un remanente ha sido llamado a guardar los mandamientos de Dios y la fe de Jesús ante la apostasía generalizada. Este remanente anuncia la hora del juicio, proclama la salvación a través de Cristo y el inminente segundo advenimiento. Esta proclamación triple está simbolizada por los tres ángeles de Apocalipsis 14, con un llamado a adorar al Creador.",
        14: "La iglesia es un cuerpo con muchos miembros llamados de todas las naciones, tribus, lenguas y pueblos. En Cristo somos una nueva creación donde las distinciones de raza, cultura, género o condición social no son divisorias. Todos somos iguales en Cristo, united por un solo Espíritu en comunión con Él y entre sí, reflejando la unidad del Dios trino.",
        15: "Por el bautismo confesamos fe en la muerte y resurrección de Jesucristo, dando testimonio de nuestra muerte al pecado y propósito de caminar en nueva vida. Es símbolo de la unión con Cristo, el perdón de pecados y la recepción del Espíritu Santo. El bautismo es por inmersión, dependiendo de la afirmación de fe en Jesús y evidencia de arrepentimiento.",
        16: "La Cena del Señor es participación en los emblemas del cuerpo y la sangre de Jesús como expresión de fe en Él. En esta comunión, Cristo está presente para encontrar y fortalecer a su pueblo. La preparación incluye auto-examen, arrepentimiento y confesión. El lavado de pies, ordenado por el Maestro, significa limpieza renovada, humildad y quebrantamiento.",
        17: "Dios otorga a todos los miembros de su iglesia dones espirituales para el ministerio amoroso en beneficio general de la iglesia y la humanidad. Dados por el Espíritu Santo, proveen todas las habilidades necesarias: fe, sanación, profecía, proclamación, enseñanza, administración, reconciliación y servicio. Dios los distribuye soberanamente para edificar el cuerpo de Cristo.",
        18: "Las Escrituras testifican que la profecía es un don del Espíritu Santo y una marca identificadora de la iglesia remanente. Creemos que este don se manifestó en el ministerio de Ellen G. White. Sus escritos hablan con autoridad profética y proveen consuelo, guía, instrucción y corrección. Sin embargo, la Biblia permanece como estándar supremo por el cual toda enseñanza debe ser probada.",
        19: "Los grandes principios de la ley de Dios están encarnados en los Diez Mandamientos y ejemplificados en la vida de Cristo. Expresan el amor, la voluntad y los propósitos de Dios en relación con la conducta humana, y son la base del pacto y la norma en el juicio. La salvación es enteramente por gracia, pero su fruto es la obediencia que desarrolla el carácter cristiano.",
        20: "El amable Creador descansó en el séptimo día e instituyó el sábado para toda la humanidad como memorial de la creación. El cuarto mandamiento requiere la observancia del séptimo día como día de descanso, adoración y ministerio. El sábado es también símbolo de nuestra redención en Cristo y signo de santificación. Su alegre observancia va de puesta de sol a puesta de sol.",
        21: "Somos mayordomos de Dios, a quienes Él confiió tiempo, habilidades y posesiones. Reconocemos la propiedad de Dios devolviendo el diezmo y dando ofrendas para la proclamación del evangelio. La mayordomía es un privilegio que nos nutre en el amor y la victoria sobre el egoísmo, transformando nuestra relación con los bienes materiales.",
        22: "Estamos llamados a ser un pueblo santo que piensa, siente y actúa en armonía con los principios bíblicos. Nos involucramos sólo en aquellas cosas que producirán la pureza, la salud y la alegría de Cristo. Como templos del Espíritu Santo, cuidamos nuestros cuerpos con dieta saludable y absteniéndonos de sustancias dañinas y alimentos impuros.",
        23: "El matrimonio fue divinamente establecido en el Edén y afirmado por Jesús como unión de por vida entre un hombre y una mujer. El amor mutuo, el honor y el respeto son el tejido de esta relación, que debe reflejar la relación entre Cristo y su iglesia. Los padres tienen el privilegio sagrado de educar a sus hijos en el amor al Señor.",
        24: "Hay un santuario en el cielo donde Cristo ministra en nuestro nombre. En 1844, al final del período profético de 2,300 días, Él entró en la segunda y última fase de su ministerio expiatorio — el juicio investigador. Este trabajo revela quiénes han permanecido en Cristo, guardando los mandamientos de Dios y la fe de Jesús, vindicando así la justicia divina.",
        25: "La segunda venida de Cristo es la bendita esperanza de la iglesia. Su venida será literal, personal, visible y mundial. Los justos muertos resucitarán, y junto con los vivos justos serán glorificados y arrebatados al cielo. El cumplimiento casi completo de la profecía indica la inminencia de la venida de Cristo, y se nos exhorta a estar listos en todo momento.",
        26: "La paga del pecado es la muerte. Hasta el día de la resurrección, la muerte es un estado inconsciente para todas las personas. Cuando Cristo aparezca, los justos resucitados y los vivos serán glorificados y arrebatados al encuentro de su Señor. La segunda resurrección, la de los injustos, tendrá lugar mil años después de la primera.",
        27: "El milenio es el reino de mil años de Cristo con sus santos en el cielo entre la primera y la segunda resurrección. Durante este tiempo los malvados muertos serán juzgados y la tierra estará desolada. Al final, la Ciudad Santa descenderá, los muertos injustos resucitarán para el juicio final y el fuego de Dios limpiará la tierra, erradicando el pecado para siempre.",
        28: "En la nueva tierra, donde habita la justicia, Dios proveerá un hogar eterno para los redimidos en un ambiente perfecto de vida, amor, alegría y aprendizaje en su presencia. Dios mismo morará con su pueblo, el sufrimiento y la muerte habrán pasado y la gran controversia habrá terminado. El pecado no existirá más, y todas las cosas declararán que Dios es amor."
    };

    // Mapa de citas bíblicas completas por doctrina
    const CITAS_BIBLICAS = {
        1: ["2 Tim. 3:16-17 — Toda la Escritura es inspirada por Dios y útil para enseñar, para redargüir, para corregir, para instruir en justicia.", "2 Ped. 1:20-21 — Entendiendo primero esto, que ninguna profecía de la Escritura es de interpretación privada.", "Sal. 119:105 — Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", "Isa. 8:20 — ¡A la ley y al testimonio! Si no dijeren conforme a esto, es porque no les ha amanecido.", "Juan 17:17 — Santifícalos en tu verdad; tu palabra es verdad.", "Heb. 4:12 — Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos."],
        2: ["Mat. 28:19 — Id y haced discípulos... bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.", "2 Cor. 13:14 — La gracia del Señor Jesucristo, el amor de Dios, y la comunión del Espíritu Santo sean con todos vosotros.", "1 Juan 4:8 — El que no ama, no ha conocido a Dios; porque Dios es amor.", "Dt. 6:4 — Oye, Israel: Jehová nuestro Dios, Jehová uno es.", "Juan 4:24 — Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren."],
        3: ["Juan 3:16 — Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito...", "Apoc. 4:11 — Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas.", "1 Cor. 8:6 — Para nosotros, sin embargo, sólo hay un Dios, el Padre, del cual proceden todas las cosas.", "Gén. 1:1 — En el principio creó Dios los cielos y la tierra.", "Sal. 68:5 — Padre de huérfanos y defensor de viudas es Dios en su santa morada."],
        4: ["Juan 1:1-3 — En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", "Luc. 1:35 — El Espíritu Santo vendrá sobre ti, y el poder del Altísimo te cubrirá con su sombra.", "Filip. 2:5-7 — Cristo Jesús, siendo en forma de Dios... se despojó a sí mismo, tomando forma de siervo.", "Heb. 4:15 — Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades.", "Heb. 8:1-2 — Tenemos tal sumo sacerdote, ministro del santuario y de aquel verdadero tabernáculo.", "Rom. 3:25 — A Cristo Jesús, a quien Dios puso como propiciación por medio de la fe en su sangre."],
        5: ["Juan 16:13 — ...el Espíritu de verdad, él os guiará a toda la verdad.", "Gén. 1:1-2 — Y el Espíritu de Dios se movía sobre la faz de las aguas.", "Hechos 1:8 — Recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo.", "1 Cor. 12:7-11 — A cada uno le es dada la manifestación del Espíritu para provecho.", "Rom. 8:14 — Todos los que son guiados por el Espíritu de Dios, éstos son hijos de Dios.", "Ef. 4:30 — Y no contristéis al Espíritu Santo de Dios, con el cual fuisteis sellados para el día de la redención."],
        6: ["Gén. 1:1 — En el principio creó Dios los cielos y la tierra.", "Éx. 20:8-11 — Acuérdate del día de reposo para santificarlo. Seis días trabajarás... porque en seis días hizo Jehová los cielos y la tierra.", "Gén. 2:1-3 — Fueron, pues, acabados los cielos y la tierra... Y bendijo Dios al día séptimo.", "Col. 1:16 — Porque en él fueron creadas todas las cosas... Todo fue creado por medio de él y para él.", "Sal. 33:6,9 — Por la palabra de Jehová fueron hechos los cielos... porque él lo dijo, y fue hecho."],
        7: ["Gén. 1:26-28 — Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza.", "Gén. 2:7 — Entonces Jehová Dios formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida.", "Sal. 8:3-5 — ¿Qué es el hombre, para que tengas de él memoria?... Le has hecho poco menor que los ángeles.", "Hechos 17:28 — Porque en él vivimos, y nos movemos, y somos.", "Rom. 5:12 — El pecado entró en el mundo por un hombre, y por el pecado la muerte."],
        8: ["Apoc. 12:7-9 — Después hubo una gran batalla en el cielo: Miguel y sus ángeles luchaban contra el dragón.", "Isa. 14:12-14 — ¡Cómo caíste del cielo, oh Lucero, hijo de la mañana!", "Gén. 3:1-19 — La serpiente le dijo a la mujer: No moriréis.", "Job 1:6-12 — Un día vinieron a presentarse delante de Jehová los hijos de Dios, entre los cuales vino también Satanás.", "Juan 17:15 — No ruego que los quites del mundo, sino que los guardes del mal."],
        9: ["Isa. 53:4-6 — Ciertamente llevó él nuestras enfermedades, y sufrió nuestros dolores... Mas él herido fue por nuestras rebeliones.", "1 Cor. 15:3-4 — Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día.", "Rom. 5:6-8 — Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.", "1 Pet. 2:24 — Quien llevó él mismo nuestros pecados en su cuerpo sobre el madero.", "2 Cor. 5:21 — Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos justicia de Dios en él."],
        10: ["Juan 3:16 — Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito.", "Ef. 2:4-8 — Dios, que es rico en misericordia... por gracia sois salvos por medio de la fe.", "Gál. 2:20 — Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí.", "Rom. 8:1 — Ninguna condenación hay para los que están en Cristo Jesús.", "Tito 3:5 — Nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia."],
        11: ["Col. 2:6-7 — Por tanto, de la manera que habéis recibido al Señor Jesucristo, andad en él.", "Gal. 5:16 — Digo pues: Andad en el Espíritu, y no satisfagáis los deseos de la carne.", "Sal. 1:1-2 — Bienaventurado el varón que... en la ley de Jehová está su delicia.", "Rom. 8:37 — Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó.", "2 Pet. 3:18 — Antes bien, creced en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo."],
        12: ["Mat. 28:19-20 — Id, y haced discípulos a todas las naciones.", "Ef. 1:22-23 — Y sometió todas las cosas bajo sus pies, y lo dio por cabeza sobre todas las cosas a la iglesia.", "Col. 1:18 — Y él es la cabeza del cuerpo que es la iglesia.", "1 Cor. 12:27 — Vosotros, pues, sois el cuerpo de Cristo, y miembros cada uno en particular.", "Apoc. 21:9 — Ven acá, yo te mostraré la desposada, la esposa del Cordero."],
        13: ["Apoc. 12:17 — Entonces el dragón se llenó de ira contra la mujer; y se fue a hacer guerra contra el resto de la descendencia de ella, los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo.", "Apoc. 14:6-12 — Y vi volar por en medio del cielo a otro ángel... diciendo a gran voz: Temed a Dios, y dadle gloria.", "Apoc. 18:4 — Salid de ella, pueblo mío, para que no seáis partícipes de sus pecados.", "Dan. 7:27 — Y el reino, y el dominio y la majestad de los reinos debajo de todo el cielo, sea dado al pueblo de los santos del Altísimo."],
        14: ["Juan 17:20-23 — No ruego solamente por éstos, sino también por los que han de creer en mí por la palabra de ellos; para que todos sean uno.", "Gal. 3:27-29 — Porque todos los que habéis sido bautizados en Cristo, de Cristo estáis revestidos.", "Ef. 4:4-6 — Un cuerpo, y un Espíritu... un Señor, una fe, un bautismo, un Dios y Padre de todos.", "Col. 3:11 — No hay griego ni judío... esclavo ni libre, sino que Cristo es el todo, y en todos."],
        15: ["Mat. 28:19 — Bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.", "Rom. 6:1-6 — ¿O no sabéis que todos los que hemos sido bautizados en Cristo Jesús, hemos sido bautizados en su muerte?", "Hechos 2:38 — Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados.", "Juan 3:5 — Jesús respondió: De cierto, de cierto te digo, que el que no naciere de agua y del Espíritu, no puede entrar en el reino de Dios.", "Gál. 3:27 — Porque todos los que habéis sido bautizados en Cristo, de Cristo estáis revestidos."],
        16: ["1 Cor. 11:23-26 — El Señor Jesús, la noche que fue entregado, tomó pan... Haced esto en memoria de mí.", "Juan 13:1-17 — Sabiendo Jesús que su hora había llegado... se levantó de la cena, y... comenzó a lavar los pies de los discípulos.", "Mat. 26:26-28 — Tomad, comed; esto es mi cuerpo... Esto es mi sangre del nuevo pacto.", "Juan 6:53-56 — El que come mi carne y bebe mi sangre, tiene vida eterna; y yo le resucitaré en el día postrero."],
        17: ["1 Cor. 12:7-11 — A cada uno le es dada la manifestación del Espíritu para provecho... distribuyendo a cada uno en particular como él quiere.", "Ef. 4:11-13 — Y él mismo constituyó a unos, apóstoles; a otros, profetas; a otros, evangelistas; a otros, pastores y maestros.", "Rom. 12:4-8 — Porque de la manera que en un cuerpo tenemos muchos miembros — los miembros no tienen todos la misma función.", "1 Pet. 4:10 — Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios."],
        18: ["Apoc. 12:17 — Los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo.", "Apoc. 19:10 — El testimonio de Jesús es el espíritu de la profecía.", "Amós 3:7 — Porque no hará nada Jehová el Señor, sin que revele su secreto a sus siervos los profetas.", "Joel 2:28-29 — Y vuestros hijos y vuestras hijas profetizarán... sobre mis siervos y sobre mis siervas derramaré mi Espíritu.", "1 Tes. 5:20-21 — No menospreciéis las profecías. Examinadlo todo; retened lo bueno."],
        19: ["Éx. 20:1-17 — Y habló Dios todas estas palabras, diciendo: Yo soy Jehová tu Dios... No tendrás dioses ajenos delante de mí.", "Rom. 7:12 — De manera que la ley a la verdad es santa, y el mandamiento santo, justo y bueno.", "Mat. 22:37-40 — Amarás al Señor tu Dios con todo tu corazón... Este es el primero y grande mandamiento.", "1 Juan 5:3 — Pues este es el amor a Dios, que guardemos sus mandamientos.", "Sal. 19:7 — La ley de Jehová es perfecta, que convierte el alma."],
        20: ["Gén. 2:1-3 — Y bendijo Dios al día séptimo, y lo santificó, porque en él reposó de toda la obra que había hecho.", "Éx. 20:8-11 — Acuérdate del día de reposo para santificarlo.", "Luc. 4:16 — Y vino a Nazaret, donde se había criado; y en el día de reposo entró en la sinagoga, conforme a su costumbre.", "Isa. 58:13-14 — Si retrajeres del día de reposo tu pie... entonces te deleitarás en Jehová.", "Heb. 4:9-10 — Por tanto, queda un reposo para el pueblo de Dios."],
        21: ["Mal. 3:10 — Traed todos los diezmos al alfolí y haya alimento en mi casa.", "Luc. 21:1-4 — Miró, y vio a los ricos que echaban sus ofrendas en el arca de las ofrendas.", "2 Cor. 9:6-7 — El que siembra escasamente, también segará escasamente... Dios ama al dador alegre.", "Prov. 3:9 — Honra a Jehová con tus bienes, y con las primicias de todos tus frutos.", "Gen. 14:20 — Y Abram le dio los diezmos de todo."],
        22: ["1 Cor. 6:19-20 — ¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo?", "Rom. 12:1-2 — Presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", "3 Juan 2 — Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud.", "Lev. 11 — Los animales impuros... no comeréis.", "1 Tim. 4:4-5 — Todo lo que Dios creó es bueno... santificado por la palabra de Dios y por la oración."],
        23: ["Gén. 2:18-24 — Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.", "Mat. 19:4-6 — El que los hizo al principio, varón y hembra los hizo... lo que Dios juntó, no lo separe el hombre.", "Ef. 5:25-28 — Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia.", "Heb. 13:4 — Honroso sea en todos el matrimonio, y el lecho sin mancilla.", "Dt. 6:6-7 — Estas palabras que yo te mando hoy, estarán sobre tu corazón; y las repetirás a tus hijos."],
        24: ["Dan. 8:14 — Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado.", "Heb. 8:1-2 — Tenemos tal sumo sacerdote... ministro del santuario, y de aquel verdadero tabernáculo que levantó el Señor.", "Heb. 9:12 — No por sangre de machos cabríos ni de becerros, sino por su propia sangre, entró una vez para siempre en el Lugar Santísimo.", "Dan. 7:9-10 — Mientras yo miraba, se pusieron tronos, y un Anciano de días se sentó... el Tribunal se asentó, y los libros fueron abiertos.", "1 Juan 2:1 — Abogado tenemos para con el Padre, a Jesucristo el justo."],
        25: ["Juan 14:1-3 — En la casa de mi Padre muchas moradas hay... voy, pues, a preparar lugar para vosotros.", "1 Tes. 4:16-17 — El Señor mismo con voz de mando... descenderá del cielo.", "Mat. 24:36 — Pero del día y la hora nadie sabe, ni aun los ángeles de los cielos, sino sólo mi Padre.", "Apoc. 1:7 — He aquí que viene con las nubes, y todo ojo le verá.", "Hechos 1:11 — Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo."],
        26: ["Ecl. 9:5 — Los que viven saben que han de morir; pero los muertos nada saben.", "1 Cor. 15:51-54 — No todos dormiremos; pero todos seremos transformados, en un momento, en un abrir y cerrar de ojos.", "Juan 5:28-29 — ...viene la hora cuando todos los que están en los sepulcros oirán su voz.", "1 Tes. 4:13-15 — Tampoco queremos, hermanos, que ignoréis acerca de los que duermen.", "Sal. 146:4 — Sale su aliento, y vuelve a la tierra; en ese mismo día perecen sus pensamientos."],
        27: ["Apoc. 20:1-6 — Vi a un ángel que descendía del cielo... y ató al dragón, la serpiente antigua, que es el diablo y Satanás, y lo encadenó por mil años.", "Isa. 24:22 — Y serán amontonados como se amontona a los encarcelados en mazmorra.", "Jer. 4:23-26 — Miré a la tierra, y he aquí que estaba asolada y vacía.", "Apoc. 21:8 — Los incrédulos, los abominables, los homicidas... tendrán su parte en el lago que arde con fuego y azufre.", "2 Ped. 3:10 — El día del Señor vendrá como ladrón en la noche; en el cual los cielos pasarán con grande estruendo."],
        28: ["Isa. 65:17-25 — Porque he aquí que yo crearé nuevos cielos y nueva tierra; y de lo pasado no habrá memoria.", "Apoc. 21:1-5 — Vi un cielo nuevo y una tierra nueva... Enjugará Dios toda lágrima de los ojos de ellos.", "Apoc. 22:3-5 — Y sus siervos le servirán... y reinarán por los siglos de los siglos.", "Miq. 4:4 — Y se sentará cada uno debajo de su vid y debajo de su higuera, y no habrá quien los amedrente.", "1 Cor. 2:9 — Cosas que ojo no vio, ni oído oyó, ni han subido en corazón de hombre, son las que Dios ha preparado para los que le aman."]
    };

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#130f2e,#0d0a22);font-family:'Georgia',serif;padding-bottom:100px;">
            <!-- HEADER -->
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(162,155,254,0.15);position:sticky;top:0;z-index:1000;">
                <button onclick="renderModuloAdultos()" style="background:rgba(162,155,254,0.08);border:1px solid rgba(162,155,254,0.2);color:#a29bfe;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#a29bfe;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">📋 28 DOCTRINAS</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:750px;margin:0 auto;">
                <p style="color:rgba(255,255,255,0.4);font-size:0.78rem;margin:0 0 6px;font-family:'Segoe UI',sans-serif;text-align:center;">Creencias Fundamentales — Stone Oak Spanish SDA Church</p>
                <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:28px;font-family:'Segoe UI',sans-serif;font-size:0.65rem;color:rgba(255,255,255,0.3);">
                    <span style="padding:3px 9px;border-radius:10px;background:rgba(162,155,254,0.07);border:1px solid rgba(162,155,254,0.12);">Vista = Resumen + 3 citas</span>
                    <span style="padding:3px 9px;border-radius:10px;background:rgba(0,206,201,0.07);border:1px solid rgba(0,206,201,0.12);">📄 = Doctrina completa</span>
                    <span style="padding:3px 9px;border-radius:10px;background:rgba(212,175,55,0.07);border:1px solid rgba(212,175,55,0.12);">📚 = Completo + todas las citas</span>
                    <span style="padding:3px 9px;border-radius:10px;background:rgba(255,100,100,0.07);border:1px solid rgba(255,100,100,0.12);">✕ = Colapsar</span>
                </div>

                ${categorias.map(cat => `
                    <div style="margin-bottom:40px;">
                        <div style="background:rgba(162,155,254,0.05);border-left:4px solid #a29bfe;padding:16px 20px;border-radius:10px;margin-bottom:15px;">
                            <h2 style="color:#a29bfe;font-size:1.0rem;letter-spacing:3px;margin:0 0 6px;">${cat}</h2>
                            <p style="color:rgba(255,255,255,0.55);font-size:0.82rem;line-height:1.55;margin:0;font-family:'Segoe UI',sans-serif;">${intros[cat] || ""}</p>
                        </div>
                        <div style="display:grid;gap:14px;">
                            ${docs.filter(d => d.cat === cat).map(d => `
                                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(162,155,254,0.12);border-radius:14px;padding:20px;transition:0.3s;"
                                    id="doc-card-${d.num}">

                                    <!-- Cabecera -->
                                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                                        <span style="background:rgba(162,155,254,0.15);color:#a29bfe;width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.8rem;font-family:'Segoe UI',sans-serif;flex-shrink:0;">${d.num}</span>
                                        <span style="font-size:1.3rem;">${d.icono}</span>
                                        <h3 style="color:#fff;font-size:0.95rem;margin:0;letter-spacing:0.5px;flex:1;">${d.titulo}</h3>
                                    </div>

                                    <!-- RESUMEN CORTO (siempre visible) -->
                                    <p class="lectura-texto" style="color:rgba(255,255,255,0.8);font-size:0.88rem;line-height:1.65;margin:0 0 10px;font-family:'Segoe UI',sans-serif;">
                                        ${d.resumen}
                                    </p>

                                    <!-- 3 CITAS BÍBLICAS BASE (siempre visibles, compactas) -->
                                    <div style="margin-bottom:12px;display:flex;flex-direction:column;gap:4px;">
                                        ${(CITAS_BIBLICAS[d.num] || []).slice(0, 3).map(c => `
                                            <div style="display:flex;gap:6px;align-items:flex-start;">
                                                <span style="color:#a29bfe;font-size:0.7rem;flex-shrink:0;margin-top:2px;">📖</span>
                                                <span style="color:rgba(162,155,254,0.75);font-size:0.72rem;font-family:'Segoe UI',sans-serif;line-height:1.45;">${c.split('—')[0].trim()}</span>
                                            </div>
                                        `).join('')}
                                    </div>

                                    <!-- PANEL EXPANDIBLE (oculto por defecto) -->
                                    <div id="panel-${d.num}" style="display:none;margin-bottom:12px;padding:14px;background:rgba(0,0,0,0.28);border-radius:10px;border:1px solid rgba(255,255,255,0.08);"></div>

                                    <!-- BOTONES DE NIVEL -->
                                    <div style="display:flex;gap:8px;">
                                        <button onclick="mostrarNivelDoctrina(${d.num}, 'intermedio')"
                                            style="flex:1;background:rgba(0,206,201,0.1);border:1px solid rgba(0,206,201,0.3);color:#00cec9;padding:9px 8px;border-radius:8px;cursor:pointer;font-size:0.72rem;font-weight:900;font-family:'Segoe UI',sans-serif;letter-spacing:0.5px;transition:0.2s;"
                                            onmouseover="this.style.background='rgba(0,206,201,0.2)'"
                                            onmouseout="this.style.background='rgba(0,206,201,0.1)'">
                                            📄 INTERMEDIO
                                        </button>
                                        <button onclick="mostrarNivelDoctrina(${d.num}, 'completo')"
                                            style="flex:1;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:9px 8px;border-radius:8px;cursor:pointer;font-size:0.72rem;font-weight:900;font-family:'Segoe UI',sans-serif;letter-spacing:0.5px;transition:0.2s;"
                                            onmouseover="this.style.background='rgba(212,175,55,0.2)'"
                                            onmouseout="this.style.background='rgba(212,175,55,0.1)'">
                                            📚 COMPLETO + CITAS
                                        </button>
                                    </div>
                                </div>
            `).join('')}
                        </div>
                    </div>
                `).join('')}

                <div style="text-align:center;padding:20px;background:rgba(212,175,55,0.05);border-radius:15px;border:1px dashed rgba(212,175,55,0.2);">
                    <p style="color:#d4af37;font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">"Y estas palabras que yo te mando hoy, estarán sobre tu corazón..." — Deuteronomio 6:6</p>
                </div>
            </div>
        </div>
    `;

    // Almacenar los datos en variables accesibles
    window._docData28 = ADULTOS_DATA.doctrinas28;
    window._resumenesMedios28 = RESUMENES_MEDIOS;
    window._citasBiblicas28 = CITAS_BIBLICAS;
}

// ==========================================
// MANEJADOR DE NIVELES DE DOCTRINA
// ==========================================
function mostrarNivelDoctrina(num, nivel) {
    const panel = document.getElementById('panel-' + num);
    const docs = window._docData28 || ADULTOS_DATA.doctrinas28;
    const doc = docs.find(d => d.num === num);
    const citasBib = window._citasBiblicas28 || {};

    if (!panel || !doc) return;

    // Si ya está mostrando este nivel, colapsar
    const yaActivo = panel.style.display !== 'none' && panel.dataset.nivel === nivel;
    if (yaActivo) {
        panel.style.display = 'none';
        panel.dataset.nivel = '';
        return;
    }

    panel.dataset.nivel = nivel;
    panel.style.display = 'block';

    // Botón colapsador — siempre al final del panel
    function crearBtnColapsar(num, color) {
        return `<button onclick="cerrarPanelDoctrina(${num})" style="
            display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);
            padding:7px 14px;border-radius:7px;cursor:pointer;font-size:0.68rem;
            font-family:'Segoe UI',sans-serif;font-weight:700;width:100%;
            justify-content:center;margin-top:12px;letter-spacing:0.5px;transition:0.2s;"
            onmouseover="this.style.background='rgba(255,80,80,0.12)';this.style.color='#ff6b6b'"
            onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.color='rgba(255,255,255,0.5)'"
        >✕ COLAPSAR</button>`;
    }

    if (nivel === 'intermedio') {
        panel.innerHTML = `
            <div style="margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;">
                <span style="font-size:0.6rem;letter-spacing:3px;color:#00cec9;font-weight:900;font-family:'Segoe UI',sans-serif;">📄 DOCTRINA COMPLETA</span>
            </div>
            <p class="lectura-texto" style="color:rgba(255,255,255,0.85);font-size:0.9rem;line-height:1.78;margin:0;font-family:'Georgia',serif;font-style:italic;">
                ${doc.detalle}
            </p>
            ${crearBtnColapsar(num)}
        `;
    } else {
        const citas = citasBib[num] || [];
        panel.innerHTML = `
            <div style="margin-bottom:12px;display:flex;align-items:center;">
                <span style="font-size:0.6rem;letter-spacing:3px;color:#d4af37;font-weight:900;font-family:'Segoe UI',sans-serif;">📚 DOCTRINA COMPLETA + TODAS LAS CITAS</span>
            </div>
            <p class="lectura-texto" style="color:rgba(255,255,255,0.85);font-size:0.9rem;line-height:1.78;margin:0 0 16px;font-family:'Georgia',serif;font-style:italic;">
                ${doc.detalle}
            </p>
            ${citas.length > 0 ? `
            <div style="border-top:1px solid rgba(212,175,55,0.15);padding-top:12px;margin-top:4px;">
                <div style="font-size:0.6rem;letter-spacing:3px;color:rgba(212,175,55,0.7);font-weight:900;font-family:'Segoe UI',sans-serif;margin-bottom:10px;">📖 TODAS LAS CITAS BÍBLICAS</div>
                ${citas.map(c => `
                    <div style="background:rgba(212,175,55,0.05);border-left:2px solid rgba(212,175,55,0.3);padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:8px;">
                        <p class="lectura-texto" style="color:rgba(255,255,255,0.75);font-size:0.82rem;line-height:1.6;margin:0;font-family:'Segoe UI',sans-serif;">${c}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            ${crearBtnColapsar(num)}
        `;
    }

    // Scroll suave hacia el panel
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

function cerrarPanelDoctrina(num) {
    const panel = document.getElementById('panel-' + num);
    if (!panel) return;
    panel.style.transition = 'opacity 0.2s ease';
    panel.style.opacity = '0';
    setTimeout(() => {
        panel.style.display = 'none';
        panel.style.opacity = '1';
        panel.dataset.nivel = '';
        panel.innerHTML = '';
    }, 200);
}


// ==========================================
// TRADUCCIONES EN PARALELO
// ==========================================
function renderTraduccionesAdultos() {
    const trad = ADULTOS_DATA.estudioDelDia.obtenerActual().traducciones;
    const container = document.getElementById("pantalla-estudio");

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#001a1a,#003333,#001a1a);font-family:'Georgia',serif;padding-bottom:40px;">
            <div id="floating-bible-nav" class="floating-nav-panel">
                <div class="nav-brand-area">
                    <button class="btn-home-back" onclick="renderModuloAdultos()">←</button>
                    <span class="current-ref-text">TRADUCCIONES</span>
                    <button class="btn-arrow" onclick="renderModuloAdultos()">🏠</button>
                </div>
                <div class="nav-controls-grid">
                    <button onclick="window.abrirSelectorRapidoLibros()" class="btn-nav-dynamic">📖 LIBRO</button>
                    <button onclick="window.abrirSelectorRapidoCaps('Hebreos')" class="btn-nav-dynamic">📑 CAP</button>
                    <button onclick="window.abrirSelectorRapidoVersos()" class="btn-nav-dynamic">🔢 VERSO</button>
                </div>
            </div>
            
            <div style="padding-top:115px;"></div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <div style="background:rgba(0,206,201,0.05);border:1px solid rgba(0,206,201,0.12);border-radius:10px;padding:16px 20px;margin-bottom:20px;text-align:center;">
                    <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:0;font-family:'Segoe UI',sans-serif;">Hebreos 8:1 en 3 traducciones — comparación versículo por versículo</p>
                </div>

                <div style="display:grid;gap:14px;">
                    ${trad.map((t, i) => `
                        <div style="background:rgba(0,206,201,${[0.06, 0.04, 0.03][i]});border:1px solid rgba(0,206,201,${[0.25, 0.18, 0.12][i]});border-radius:12px;padding:22px;">
                            <div style="background:rgba(0,206,201,0.15);color:#00cec9;font-size:0.72rem;font-weight:900;letter-spacing:3px;padding:4px 12px;border-radius:4px;display:inline-block;margin-bottom:14px;font-family:'Segoe UI',sans-serif;">${t.sigla}</div>
                            <p style="color:rgba(255,255,255,0.88);font-size:0.92rem;line-height:1.75;margin:0;font-style:italic;">${t.texto}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// NOTAS PERSONALES
// ==========================================
function renderNotasAdultos() {
    const container = document.getElementById("pantalla-estudio");
    const notas = adultosState.notas;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#111,#1a1a1a,#111);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:rgba(255,255,255,0.7);font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">✏️ NOTAS PERSONALES</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <!-- EDITOR -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:20px;margin-bottom:16px;">
                    <div style="color:rgba(255,255,255,0.4);font-size:0.68rem;letter-spacing:3px;margin-bottom:12px;font-family:'Segoe UI',sans-serif;">NUEVA NOTA — ${ADULTOS_DATA.estudioDelDia.obtenerActual().pasaje}</div>
                    <textarea id="nota-input" placeholder="Escribe tus observaciones, reflexiones o preguntas sobre el pasaje de hoy..."
                        style="width:100%;min-height:120px;background:transparent;border:none;color:#fff;font-family:'Georgia',serif;font-size:0.9rem;resize:vertical;outline:none;line-height:1.7;box-sizing:border-box;"></textarea>
                    <button onclick="guardarNota()" style="background:linear-gradient(135deg,rgba(212,175,55,0.2),rgba(180,130,20,0.15));border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:10px 24px;border-radius:6px;cursor:pointer;font-family:'Georgia',serif;letter-spacing:1px;margin-top:8px;">💾 Guardar Nota</button>
                </div>

                <!-- NOTAS GUARDADAS -->
                ${notas.length > 0 ? `
                    <h3 style="color:rgba(255,255,255,0.4);font-size:0.72rem;letter-spacing:3px;margin:0 0 14px;font-family:'Segoe UI',sans-serif;">NOTAS GUARDADAS (${notas.length})</h3>
                    <div style="display:grid;gap:10px;">
                        ${notas.slice().reverse().map((n, i) => `
                            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:16px;position:relative;">
                                <div style="color:rgba(212,175,55,0.5);font-size:0.7rem;margin-bottom:8px;font-family:'Segoe UI',sans-serif;">${n.fecha} · ${n.pasaje}</div>
                                <p style="color:rgba(255,255,255,0.75);font-size:0.87rem;margin:0;line-height:1.65;">${n.texto}</p>
                                <button onclick="eliminarNota(${notas.length - 1 - i})" style="position:absolute;top:10px;right:12px;background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.2);color:#ff7675;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:0.7rem;font-family:'Segoe UI',sans-serif;">✕</button>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="color:rgba(255,255,255,0.2);text-align:center;font-family:\'Segoe UI\',sans-serif;font-size:0.85rem;">No hay notas guardadas aún. Empieza a escribir arriba.</p>'}
            </div>
        </div>
    `;
}

async function guardarNota() {
    const input = document.getElementById('nota-input').value.trim();
    if (!input) return;

    // Guardar en Firebase (el servicio ya maneja localStorage)
    await guardarNotaFirebase(input, ADULTOS_DATA.estudioDelDia.obtenerActual().pasaje);

    // Recargar notas y limpiar input
    adultosState.notas = await cargarNotasFirebase();
    renderNotasAdultos();
}

async function eliminarNota(idx) {
    const nota = adultosState.notas[idx];
    if (!nota) return;

    await eliminarNotaFirebase(nota.id, idx);
    adultosState.notas = await cargarNotasFirebase();
    renderNotasAdultos();
}

// ==========================================
// PLAN DE ESTUDIO 4 SEMANAS
// ==========================================
function renderPlanEstudio() {
    const container = document.getElementById("pantalla-estudio");
    const plan = ADULTOS_DATA.planEstudio;

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0f0800,#1e0f00,#0f0a00);font-family:'Georgia',serif;padding-bottom:40px;">
            <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);padding:15px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(253,150,68,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdultos()" style="background:rgba(253,150,68,0.08);border:1px solid rgba(253,150,68,0.2);color:#fd9644;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:'Segoe UI',sans-serif;">← SEMINARIO</button>
                <span style="color:#fd9644;font-size:0.82rem;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">📅 PLAN DE ESTUDIO</span>
                <div style="width:80px;"></div>
            </div>

            <div style="padding:22px 20px;max-width:700px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:24px;">
                    <h2 style="color:#fd9644;font-size:1.2rem;margin:0 0 6px;">El Santuario y el Juicio</h2>
                    <p style="color:rgba(255,255,255,0.4);font-size:0.82rem;margin:0;font-family:'Segoe UI',sans-serif;">Plan de estudio intensivo — 4 semanas</p>
                </div>

                <div style="display:grid;gap:14px;">
                    ${plan.map((s, i) => `
                        <div style="background:rgba(253,150,68,0.05);border:1px solid rgba(253,150,68,0.15);border-radius:12px;padding:20px;transition:0.3s;"
                            onmouseover="this.style.borderColor='rgba(253,150,68,0.35)'"
                            onmouseout="this.style.borderColor='rgba(253,150,68,0.15)'">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                                <div style="background:rgba(253,150,68,0.2);color:#fd9644;border:1px solid rgba(253,150,68,0.3);border-radius:6px;padding:4px 12px;font-size:0.75rem;font-weight:700;font-family:'Segoe UI',sans-serif;white-space:nowrap;">SEMANA ${s.semana}</div>
                                <h3 style="color:#fff;font-size:0.92rem;margin:0;line-height:1.3;">${s.tema}</h3>
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:8px;">
                                ${s.textos.map(t => `
                                    <span style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);color:rgba(212,175,55,0.8);padding:4px 12px;border-radius:4px;font-size:0.78rem;font-family:'Segoe UI',sans-serif;">${t}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.15);border-radius:10px;padding:18px;margin-top:20px;text-align:center;">
                    <p style="color:rgba(212,175,55,0.8);font-size:0.85rem;margin:0;font-family:'Segoe UI',sans-serif;font-style:italic;">"El estudio de la Biblia exige nuestros más vigorosos esfuerzos mentales y perseverancia en la oración." — Elena G. de White</p>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// PANTALLA ESTUDIO PROFUNDO DOCTRINA
// ==========================================
function abrirEstudioDoctrina(num) {
    const d = ADULTOS_DATA.doctrinas28.find(x => x.num === num);
    if (!d) return;

    // Abrir Card de Contexto (Modo Estudio)
    const card = document.getElementById('context-card');
    const body = document.getElementById('context-body');
    const title = document.getElementById('context-ref');

    // Inyectar Estilos si no están
    inyectarEstilosDoctrinaPro();
    inyectarEstilosLecturaGlobal();

    title.innerText = d.titulo.toUpperCase();
    title.style.color = "#a29bfe";

    // Contenido Completo
    body.innerHTML = `
        <div style="max-height: 60vh; overflow-y: auto; padding-right: 5px; font-family:'Segoe UI', sans-serif;">
            <div style="background: rgba(162,155,254, 0.1); padding: 15px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #a29bfe;">
                <p style="color: #fff; line-height: 1.8; font-size: 1rem; margin:0;">${d.detalle}</p>
            </div>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
                <h4 style="color: #a29bfe; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">📖 FUNDAMENTO BÍBLICO</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">${d.ref}</p>
            </div>
        </div>
    `;

    // Área de Notas específica para esta doctrina
    const noteArea = document.getElementById('note-edit-area');
    const noteInput = document.getElementById('personal-note');

    noteArea.style.display = 'block';
    const key = `nota_doctrina_${d.num}`;
    noteInput.value = localStorage.getItem(key) || "";
    noteInput.placeholder = `¿Qué aprendiste sobre ${d.titulo}?`;

    // Sobrescribir función de Guardado para Doctrina
    window.guardarNotaGlobal = function () {
        const note = noteInput.value;
        localStorage.setItem(key, note);
        mostrarToast("✅ Reflexión Guardada");
        setTimeout(() => cerrarContexto(), 400);
    };

    card.classList.add('active');
}
