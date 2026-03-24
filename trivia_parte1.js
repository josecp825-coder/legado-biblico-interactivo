// BANCO TRIVIA — PARTE 1: PERSONAJES + HISTORIAS + MILAGROS
// Legado Bíblico | Director: Jose
const TRIVIA_BANCO_P1 = {

    'Personajes': {
        facil: [
            { p: "¿Quién construyó el arca para el diluvio?", o: ["Moisés", "Noé", "Abraham"], c: 1, exp: "Noé obedeció a Dios y construyó el arca. (Génesis 6)" },
            { p: "¿Quién mató al gigante Goliat?", o: ["Sansón", "David", "Josué"], c: 1, exp: "David lo mató con una honda y una piedra. (1 Samuel 17)" },
            { p: "¿Quién fue arrojado al foso de los leones?", o: ["Pablo", "Daniel", "José"], c: 1, exp: "Daniel fue arrojado por orar a Dios. (Daniel 6)" },
            { p: "¿Quién fue tragado por un gran pez?", o: ["Jonás", "Elías", "Ezequiel"], c: 0, exp: "Jonás huyó de Dios y fue tragado. (Jonás 1)" },
            { p: "¿Quién traicionó a Jesús por 30 monedas?", o: ["Pedro", "Tomás", "Judas Iscariote"], c: 2, exp: "Judas lo entregó a los sacerdotes. (Mateo 26:15)" },
            { p: "¿Quién era el hermano mayor de Moisés?", o: ["Aarón", "Caleb", "Josué"], c: 0, exp: "Aarón fue el portavoz de Moisés ante el Faraón." },
            { p: "¿Cómo se llamaba la madre de Jesús?", o: ["Marta", "María", "Elisabet"], c: 1, exp: "María fue escogida por Dios para ser la madre de Jesús." },
            { p: "¿Quién fue el primer rey de Israel?", o: ["David", "Salomón", "Saúl"], c: 2, exp: "Saúl fue ungido rey por Samuel. (1 Samuel 10)" },
            { p: "¿Quién interpretó los sueños del Faraón?", o: ["Moisés", "Daniel", "José"], c: 2, exp: "José interpretó 7 años de abundancia y 7 de hambre." },
            { p: "¿Quién bautizó a Jesús?", o: ["Pedro", "Juan el Bautista", "Elías"], c: 1, exp: "Juan bautizó a Jesús en el río Jordán. (Mateo 3)" },
            { p: "¿Quién negó a Jesús tres veces?", o: ["Judas", "Tomás", "Pedro"], c: 2, exp: "Pedro lo negó antes de que cantara el gallo. (Juan 18)" },
            { p: "¿Quién fue el primer hombre creado?", o: ["Abel", "Adán", "Noé"], c: 1, exp: "Dios formó a Adán del polvo de la tierra. (Génesis 2)" },
            { p: "¿Quién escribió la mayoría de los Salmos?", o: ["Moisés", "Salomón", "David"], c: 2, exp: "David escribió más de 70 salmos." },
            { p: "¿Quién fue el primer hijo de Adán?", o: ["Abel", "Set", "Caín"], c: 2, exp: "Caín fue el primer hijo, luego Abel. (Génesis 4)" }
        ],
        intermedio: [
            { p: "¿Cuántos años vivió Matusalén?", o: ["850", "969", "777"], c: 1, exp: "Matusalén vivió 969 años, el mayor de la Biblia. (Génesis 5:27)" },
            { p: "¿Quién era el suegro de Moisés?", o: ["Aarón", "Jetro", "Amram"], c: 1, exp: "Jetro era sacerdote de Madián. (Éxodo 18)" },
            { p: "¿Quién fue llamado 'amigo de Dios'?", o: ["Abraham", "Moisés", "David"], c: 0, exp: "Abraham fue llamado amigo de Dios. (2 Crónicas 20:7)" },
            { p: "¿Quién fue el primer mártir cristiano?", o: ["Pedro", "Pablo", "Esteban"], c: 2, exp: "Esteban fue apedreado por su testimonio. (Hechos 7)" },
            { p: "¿Quién fue elegido para reemplazar a Judas?", o: ["Bernabé", "Matías", "Silas"], c: 1, exp: "Matías fue elegido por suertes. (Hechos 1:26)" },
            { p: "¿Qué apóstol era recaudador de impuestos?", o: ["Lucas", "Mateo", "Juan"], c: 1, exp: "Mateo (Leví) dejó todo para seguir a Jesús. (Mateo 9:9)" },
            { p: "¿Quién sanó a Naamán de la lepra?", o: ["Eliseo", "Elías", "Samuel"], c: 0, exp: "Eliseo le dijo que se bañara 7 veces en el Jordán. (2 Reyes 5)" },
            { p: "¿Cuántos años tenía José cuando fue vendido?", o: ["12", "17", "20"], c: 1, exp: "José tenía 17 años cuando sus hermanos lo vendieron. (Génesis 37:2)" },
            { p: "¿Quién era la esposa de Isaac?", o: ["Sara", "Raquel", "Rebeca"], c: 2, exp: "Rebeca fue traída desde Mesopotamia para Isaac. (Génesis 24)" },
            { p: "¿Quién fue llevado al cielo en un torbellino?", o: ["Enoc", "Elías", "Moisés"], c: 1, exp: "Elías fue llevado en un carro de fuego. (2 Reyes 2:11)" },
            { p: "¿Cuál era la tribu del apóstol Pablo?", o: ["Judá", "Leví", "Benjamín"], c: 2, exp: "Pablo era de la tribu de Benjamín. (Filipenses 3:5)" },
            { p: "¿Quién escribió el libro de Hechos?", o: ["Pablo", "Lucas", "Pedro"], c: 1, exp: "Lucas escribió tanto el Evangelio como Hechos." },
            { p: "¿Quién era el padre de Salomón?", o: ["Saúl", "Abraham", "David"], c: 2, exp: "David fue el padre de Salomón. (2 Samuel 12:24)" }
        ],
        avanzado: [
            { p: "¿Cuántos años tenía Moisés al confrontar al Faraón?", o: ["70", "80", "60"], c: 1, exp: "Moisés tenía 80 años y Aarón 83. (Éxodo 7:7)" },
            { p: "¿En qué tribu nació Moisés?", o: ["Judá", "Benjamín", "Leví"], c: 2, exp: "Moisés nació de la tribu de Leví. (Éxodo 2:1-2)" },
            { p: "¿Cuál fue el nombre babilónico de Daniel?", o: ["Sadrac", "Baltasar", "Abednego"], c: 1, exp: "Daniel fue llamado Baltasar en Babilonia. (Daniel 1:7)" },
            { p: "¿Cuántos años tenía Josué cuando murió?", o: ["100", "110", "120"], c: 1, exp: "Josué murió a los 110 años. (Josué 24:29)" },
            { p: "¿Cuál fue el nombre original de Pedro?", o: ["Simón", "Andrés", "Felipe"], c: 0, exp: "El nombre de Pedro era Simón, hijo de Jonás. (Mateo 16:17)" },
            { p: "¿Cuántos años reinó Salomón?", o: ["30", "40", "50"], c: 1, exp: "Salomón reinó 40 años. (1 Reyes 11:42)" },
            { p: "¿Quién era el padre de Juan el Bautista?", o: ["José", "Zacarías", "Eli"], c: 1, exp: "Zacarías y Elisabet eran los padres de Juan. (Lucas 1:13)" },
            { p: "¿Qué rey mandó decapitar a Juan el Bautista?", o: ["Herodes el Grande", "Pilato", "Herodes Antipas"], c: 2, exp: "Herodes Antipas mandó decapitarlo por Herodías. (Marcos 6)" },
            { p: "¿Cuántas esposas tuvo Salomón?", o: ["300", "700", "500"], c: 1, exp: "700 esposas y 300 concubinas. (1 Reyes 11:3)" },
            { p: "¿Quién era el padre biológico de Timoteo?", o: ["Pablo", "Un griego", "Silas"], c: 1, exp: "Su padre era griego y su madre Eunice, judía. (Hechos 16:1)" },
            { p: "¿Cuántos hijos tuvo Jacob?", o: ["10", "12", "14"], c: 1, exp: "Jacob tuvo 12 hijos que formaron las 12 tribus." },
            { p: "¿Qué edad tenía Josías cuando se convirtió en rey?", o: ["8", "12", "16"], c: 0, exp: "Josías tenía 8 años cuando comenzó a reinar. (2 Reyes 22:1)" },
            { p: "¿Quién era la suegra de Rut?", o: ["Débora", "Noemí", "Ana"], c: 1, exp: "Rut dijo a Noemí: 'Tu pueblo será mi pueblo.' (Rut 1:16)" }
        ]
    },

    'Historias': {
        facil: [
            { p: "¿Cuántos días duró el diluvio de Noé?", o: ["40 días", "100 días", "7 días"], c: 0, exp: "Llovió 40 días y 40 noches. (Génesis 7:17)" },
            { p: "¿En qué mar dividió Dios a través de Moisés?", o: ["Mar Rojo", "Mar Muerto", "Mar de Galilea"], c: 0, exp: "El Mar Rojo fue dividido para que Israel cruzara. (Éxodo 14)" },
            { p: "¿Qué comió Eva que estaba prohibido?", o: ["Una manzana", "El fruto prohibido", "Una uva"], c: 1, exp: "La Biblia dice 'fruto', no especifica qué tipo. (Génesis 3)" },
            { p: "¿Dónde nació Jesús?", o: ["Nazaret", "Jerusalén", "Belén"], c: 2, exp: "Jesús nació en Belén de Judea. (Lucas 2:4-7)" },
            { p: "¿Cuánto tiempo estuvo Jonás dentro del pez?", o: ["3 días", "7 días", "40 días"], c: 0, exp: "Tres días y tres noches. (Jonás 1:17)" },
            { p: "¿Dónde tentó el diablo a Jesús?", o: ["El río Jordán", "El desierto", "El templo"], c: 1, exp: "Jesús fue tentado 40 días en el desierto. (Mateo 4)" },
            { p: "¿Cuántas plagas envió Dios a Egipto?", o: ["7", "10", "12"], c: 1, exp: "Diez plagas afectaron a Egipto. (Éxodo 7-12)" },
            { p: "¿Qué pasó con la esposa de Lot?", o: ["Enfermó", "Se convirtió en estatua de sal", "Escapó"], c: 1, exp: "Miró atrás y se convirtió en estatua de sal. (Génesis 19:26)" },
            { p: "¿Cuántos años estuvo Israel en el desierto?", o: ["20", "40", "50"], c: 1, exp: "Israel vagó 40 años en el desierto. (Números 14:34)" },
            { p: "¿Qué comían los israelitas en el desierto?", o: ["Maná", "Codornices y maná", "Pan"], c: 1, exp: "Dios les envió maná y codornices como sustento." },
            { p: "¿Por qué fue destruida Sodoma?", o: ["Por idolatría", "Por su gran maldad", "Por desobedecer a Moisés"], c: 1, exp: "Su pecado era muy grande. Dios la destruyó con fuego. (Génesis 18:20)" },
            { p: "¿Cuántos días estuvo Jesús en la tumba?", o: ["2", "3", "7"], c: 1, exp: "Jesús resucitó al tercer día. (1 Corintios 15:4)" },
            { p: "¿Quién vendió su primogenitura por un plato de lentejas?", o: ["Jacob", "Esaú", "Rubén"], c: 1, exp: "Esaú vendió su primogenitura a Jacob. (Génesis 25:33)" },
            { p: "¿En qué monte recibió Moisés los 10 mandamientos?", o: ["Monte Carmelo", "Monte Sinaí", "Monte Nebo"], c: 1, exp: "Dios entregó los mandamientos en el Sinaí. (Éxodo 19-20)" }
        ],
        intermedio: [
            { p: "¿Qué objeto cayó cuando tocaron el Arca del Pacto?", o: ["Una columna", "Uza cayó muerto", "El velo del templo"], c: 1, exp: "Uza extendió la mano para sostenerla y murió. (2 Samuel 6:7)" },
            { p: "¿Cuántos años sirvió Jacob por Raquel?", o: ["7", "14", "21"], c: 1, exp: "Sirvió 7 por Lea y 7 por Raquel = 14 años. (Génesis 29)" },
            { p: "¿Cuántos libros del AT hablan específicamente del regreso de Babilonia?", o: ["Esdras y Nehemías", "Solo Esdras", "Crónicas"], c: 0, exp: "Esdras y Nehemías documentan el regreso del exilio." },
            { p: "¿Qué pasó en Pentecostés?", o: ["Jesús ascendió", "El Espíritu Santo descendió", "Pedro fue arrestado"], c: 1, exp: "El Espíritu Santo descendió como lenguas de fuego. (Hechos 2)" },
            { p: "¿Qué hizo Gedeón con 300 hombres que venció?", o: ["Un ejército de Madián", "A los filisteos", "A los amalecitas"], c: 0, exp: "Gedeón venció a los madianitas con cántaros y antorchas. (Jueces 7)" },
            { p: "¿Cuántas veces rodearon Jericó los israelitas antes de que cayeran los muros?", o: ["7 días, 13 veces total", "7 veces el último día", "3 veces"], c: 0, exp: "6 días una vuelta y el séptimo 7 vueltas = 13 total. (Josué 6)" },
            { p: "¿Qué señal puso Dios para no volver a destruir la tierra con agua?", o: ["Una estrella", "Un arco iris", "Una paloma"], c: 1, exp: "Dios puso el arco iris como señal del pacto. (Génesis 9:13)" },
            { p: "¿Cuánto tiempo predicó Noé antes del diluvio?", o: ["40 años", "120 años", "70 años"], c: 1, exp: "Noé predicó mientras construía el arca = 120 años." },
            { p: "¿Quién compró a José en Egipto?", o: ["El Faraón", "Potifar", "Un mercader"], c: 1, exp: "Potifar, oficial del Faraón, lo compró. (Génesis 39:1)" },
            { p: "¿Cuántos años duró el reinado de David?", o: ["33", "40", "47"], c: 1, exp: "David reinó 40 años; 7 en Hebrón y 33 en Jerusalén. (2 Samuel 5:4)" },
            { p: "¿Qué profeta ungió a David como rey?", o: ["Elías", "Samuel", "Natán"], c: 1, exp: "Samuel ungió a David con aceite. (1 Samuel 16:13)" },
            { p: "¿En qué ciudad fue apresado Pablo por primera vez?", o: ["Éfeso", "Filipos", "Damasco"], c: 1, exp: "Pablo y Silas fueron encarcelados en Filipos. (Hechos 16)" },
            { p: "¿Qué sucedió cuando Pablo y Silas oraron en la cárcel?", o: ["Un ángel abrió la puerta", "Un terremoto liberó las puertas", "Fueron liberados por el juez"], c: 1, exp: "Un terremoto sacudió la cárcel y se abrieron las puertas. (Hechos 16:26)" }
        ],
        avanzado: [
            { p: "¿En qué año fue destruido el templo de Salomón?", o: ["586 a.C.", "605 a.C.", "70 d.C."], c: 0, exp: "Los babilonios destruyeron el templo en el 586 a.C." },
            { p: "¿Cuántos años estuvo José en la cárcel en Egipto?", o: ["2", "10", "12"], c: 0, exp: "José estuvo al menos 2 años en la cárcel. (Génesis 41:1)" },
            { p: "¿Cuántos capítulos tiene el libro de Salmos?", o: ["100", "150", "175"], c: 1, exp: "El libro de Salmos tiene 150 salmos." },
            { p: "¿Qué ciudad atacó primero Josué al entrar a Canaán?", o: ["Hai", "Jericó", "Gabaón"], c: 1, exp: "Jericó fue la primera ciudad conquistada. (Josué 6)" },
            { p: "¿Cuántos días oró Daniel hasta recibir respuesta del ángel?", o: ["7", "21", "40"], c: 1, exp: "Daniel ayunó y oró 21 días. (Daniel 10:13)" },
            { p: "¿Qué tribu guardaba el tabernáculo y servía en él?", o: ["Leví", "Judá", "Benjamín"], c: 0, exp: "La tribu de Leví fue designada para el servicio sagrado." },
            { p: "¿Cuántos años duró la construcción del templo de Salomón?", o: ["5", "7", "10"], c: 1, exp: "El templo tardó 7 años en construirse. (1 Reyes 6:38)" },
            { p: "¿Cuál fue el primer milagro de Jesús?", o: ["Sanar a un ciego", "Convertir agua en vino", "Expulsar demonios"], c: 1, exp: "En las bodas de Caná convirtió agua en vino. (Juan 2:11)" },
            { p: "¿Cuántos libros tiene el Nuevo Testamento?", o: ["24", "27", "29"], c: 1, exp: "El Nuevo Testamento tiene 27 libros." },
            { p: "¿Cuántos libros tiene el Antiguo Testamento?", o: ["36", "39", "42"], c: 1, exp: "El Antiguo Testamento tiene 39 libros." },
            { p: "¿Qué reina visitó a Salomón para probar su sabiduría?", o: ["Jezabel", "La reina de Saba", "Ester"], c: 1, exp: "La reina de Saba quedó maravillada. (1 Reyes 10)" },
            { p: "¿Cuántos años estuvo el templo de Herodes en construcción?", o: ["46", "60", "33"], c: 0, exp: "Los judíos dijeron 'Cuarenta y seis años has tardado.' (Juan 2:20)" },
            { p: "¿Cuántos años vivió Abraham?", o: ["150", "175", "200"], c: 1, exp: "Abraham murió a los 175 años. (Génesis 25:7)" },
            { p: "¿Qué era el 'urim y tumim'?", o: ["Una espada sagrada", "Un medio de consultar a Dios", "Un rollo de la ley"], c: 1, exp: "Era usado por el sumo sacerdote para consultar a Dios. (Levítico 8:8)" }
        ]
    },

    'Milagros': {
        facil: [
            { p: "¿En qué milagro Jesús caminó sobre el agua?", o: ["Mar de Galilea", "Mar Rojo", "Río Jordán"], c: 0, exp: "Jesús caminó sobre el Mar de Galilea. (Mateo 14:25)" },
            { p: "¿A cuántas personas alimentó Jesús con 5 panes y 2 peces?", o: ["3,000", "5,000", "10,000"], c: 1, exp: "Alimentó a 5,000 hombres sin contar mujeres y niños." },
            { p: "¿Qué pasó con el joven Lázaro?", o: ["Sanó de lepra", "Resucitó de los muertos", "Fue liberado de demonios"], c: 1, exp: "Jesús lo resucitó después de 4 días muerto. (Juan 11)" },
            { p: "¿Qué milagro hizo Dios con la zarza que vio Moisés?", o: ["Ardía sin consumirse", "Habló", "Brilló como el sol"], c: 0, exp: "La zarza ardía pero no se consumía. (Éxodo 3:2)" },
            { p: "¿Qué le pasó al sol cuando Josué lo ordenó detenerse?", o: ["Se oscureció", "Se detuvo", "Brilló más fuerte"], c: 1, exp: "El sol se detuvo casi un día entero. (Josué 10:13)" },
            { p: "¿Qué milagro ocurrió durante la crucifixión de Jesús?", o: ["Llovió 40 días", "El sol se oscureció", "El mar se partió"], c: 1, exp: "El sol se oscureció por 3 horas. (Lucas 23:44)" },
            { p: "¿Cómo cruzó Israel el río Jordán para entrar a Canaán?", o: ["En barcas", "A pie, el río se detuvo", "Por un puente"], c: 1, exp: "Las aguas se detuvieron y cruzaron en seco. (Josué 3)" },
            { p: "¿Qué milagro hizo Elías en el Monte Carmelo?", o: ["Hizo llover", "Hizo descender fuego", "Dividió el mar"], c: 1, exp: "Fuego cayó del cielo y consumió el sacrificio. (1 Reyes 18)" },
            { p: "¿A quién resucitó Pedro en Jope?", o: ["Stefana", "Dorcas (Tabita)", "Lidia"], c: 1, exp: "Pedro resucitó a Tabita (Dorcas), una discípula. (Hechos 9:36-42)" },
            { p: "¿Qué milagro acompañó el Pentecostés?", o: ["Terremotos", "Lenguas de fuego y hablar en lenguas", "Un ángel visible"], c: 1, exp: "El Espíritu Santo descendió como lenguas de fuego. (Hechos 2)" },
            { p: "¿Qué le pasó a Saulo en el camino a Damasco?", o: ["Se cayó del caballo", "Una luz lo cegó", "Un ángel lo detuvo"], c: 1, exp: "Una gran luz del cielo lo rodeó y quedó ciego. (Hechos 9:3)" },
            { p: "¿Qué hizo Jesús con los 10 leprosos?", o: ["Los sanó a todos", "Sanó a uno", "Sanó a 7"], c: 0, exp: "Jesús sanó a los 10 leprosos; solo uno regresó a dar gracias." },
            { p: "¿Cómo llamó Jesús a Lázaro para resucitarlo?", o: ["Con una oración silenciosa", "Con voz en cuello: '¡Lázaro, sal!'", "Tocando el sepulcro"], c: 1, exp: "Jesús gritó: '¡Lázaro, ven fuera!' (Juan 11:43)" },
            { p: "¿Qué milagro hizo Jesús en las bodas de Caná?", o: ["Alimentó a 5000", "Convirtió agua en vino", "Sanó a un ciego"], c: 1, exp: "Fue el primer milagro de Jesús. (Juan 2:1-11)" }
        ],
        intermedio: [
            { p: "¿Cuántas vasijas de aceite llenó Eliseo para la viuda?", o: ["Hasta que se acabaron los recipientes", "Exactamente 12", "Solo 3"], c: 0, exp: "El aceite fluyó hasta que no quedaron más vasijas. (2 Reyes 4)" },
            { p: "¿Qué milagro hizo Jesús en el estanque de Betesda?", o: ["Sanó a 5 enfermos", "Sanó a un paralítico de 38 años", "Expulsó demonios"], c: 1, exp: "Sanó al hombre que llevaba 38 años enfermo. (Juan 5)" },
            { p: "¿Cuántos panes había cuando Jesús alimentó a los 4,000?", o: ["5", "7", "12"], c: 1, exp: "7 panes y unos pocos peces con 7 cestas sobrantes. (Marcos 8)" },
            { p: "¿Qué pasó con la hija de Jairo?", o: ["Sanó de lepra", "Fue resucitada", "Fue liberada de un demonio"], c: 1, exp: "Jesús la tomó de la mano y dijo: 'Niña, levántate.' (Lucas 8:54)" },
            { p: "¿Qué milagro hizo Eliseo con el hierro del hacha?", o: ["Lo hizo brillar", "Lo hizo flotar en el agua", "Lo multiplicó"], c: 1, exp: "El hacha cayó al río y Eliseo la hizo flotar. (2 Reyes 6:6)" },
            { p: "¿Cuántos leprosos sanó Jesús en Samaria?", o: ["7", "10", "5"], c: 1, exp: "Diez leprosos, pero solo uno regresó a dar gracias. (Lucas 17)" },
            { p: "¿Qué milagro hizo Pedro en el nombre de Jesús en la puerta Hermosa?", o: ["Sanó a un ciego", "Sanó a un cojo de nacimiento", "Resucitó a un muerto"], c: 1, exp: "El cojo de nacimiento caminó y saltó. (Hechos 3:7)" },
            { p: "¿Cómo liberó Dios a Pedro de la cárcel la segunda vez?", o: ["Mediante un terremoto", "Un ángel lo sacó", "Los creyentes oraron y lo liberaron"], c: 1, exp: "Un ángel lo despertó y las puertas se abrieron solas. (Hechos 12)" },
            { p: "¿Qué milagro hizo Moisés al inicio de las plagas?", o: ["Convirtió su vara en serpiente", "Trajo langostas", "Envió granizo"], c: 0, exp: "La vara de Moisés se convirtió en serpiente ante el Faraón. (Éxodo 7)" },
            { p: "¿Qué mujer fue sanada al tocar el manto de Jesús?", o: ["Una viuda", "Una mujer con flujo de sangre 12 años", "Una paralítica"], c: 1, exp: "Doce años enferma, fue sanada con solo tocar su manto. (Marcos 5:29)" },
            { p: "¿Qué pasó con los tres jóvenes en el horno de fuego?", o: ["Salieron ilesos", "Dios los sacó antes", "El horno se apagó"], c: 0, exp: "Caminaron en el fuego y ni su ropa olía a humo. (Daniel 3)" },
            { p: "¿A quién sanó Jesús de oídos sordos usando tierra y saliva?", o: ["Un ciego en Betsaida", "Un sordomudo", "Un paralítico"], c: 1, exp: "Jesús usó saliva y dijo 'Efatá' (ábrete). (Marcos 7:34)" },
            { p: "¿Qué milagro hizo Pablo en Malta?", o: ["Resucitó a un muerto", "Sobrevivió la mordida de una víbora", "Sanó a un ciego"], c: 1, exp: "Una víbora se le pegó y no le hizo nada. (Hechos 28:5)" }
        ],
        avanzado: [
            { p: "¿Cuántos milagros de Jesús registra el Evangelio de Juan?", o: ["7 señales", "12 milagros", "9 señales"], c: 0, exp: "Juan registra 7 señales específicas de Jesús." },
            { p: "¿Qué milagro hizo Elías en Sarepta?", o: ["Multiplicó el aceite y la harina", "Hizo llover", "Resucitó al hijo de la viuda"], c: 0, exp: "La harina y el aceite no se agotaron todo el tiempo de la sequía. (1 Reyes 17:16)" },
            { p: "¿Cuál fue el milagro que convenció definitivamente a muchos en Jerusalén?", o: ["La transfiguración", "La resurrección de Lázaro", "La multiplicación de panes"], c: 1, exp: "La resurrección de Lázaro convenció a muchos. (Juan 11:45)" },
            { p: "¿Qué milagro ocurrió cuando los sacerdotes pusieron pie en el Jordán?", o: ["El río se dividió en dos", "Las aguas se detuvieron desde lejos", "El río se secó"], c: 0, exp: "Las aguas se cortaron en pie. (Josué 3:15-16)" },
            { p: "¿Cuántos hombres sanó Jesús de la legión de demonios?", o: ["Uno", "Dos", "Tres"], c: 1, exp: "En Marcos es uno, en Mateo menciona dos endemoniados. (Mateo 8:28)" },
            { p: "¿Qué dijo Jesús antes de resucitar a Lázaro para que entendieran?", o: ["Oró al Padre en voz alta para que creyeran", "Solo llamó a Lázaro", "Tocó la tumba"], c: 0, exp: "Jesús oró en voz alta para que la gente creyera. (Juan 11:42)" },
            { p: "¿Cuántos milagros registra Marcos en su evangelio capítulo 1 solo?", o: ["2", "4", "6"], c: 1, exp: "Marcos cap. 1 registra 4 milagros de Jesús." },
            { p: "¿En qué milagro Jesús mostró su gloria ante Pedro, Santiago y Juan?", o: ["La resurrección de Lázaro", "La transfiguración", "Caminar sobre el agua"], c: 1, exp: "En el monte fue transfigurado ante sus discípulos. (Mateo 17)" },
            { p: "¿Qué milagro hizo Eliseo para purificar el agua de Jericó?", o: ["Oró sobre ella", "Echó sal en el manantial", "La hirvió"], c: 1, exp: "Echó sal en el manantial de Jericó. (2 Reyes 2:21)" },
            { p: "¿Cómo fue el milagro en el naufragio de Pablo?", o: ["Un ángel calmó la tormenta", "Todos sobrevivieron como prometió Dios", "Pablo caminó sobre el agua"], c: 1, exp: "God prometió que todos llegarían sanos. (Hechos 27:44)" },
            { p: "¿Qué sucedió al velo del templo cuando murió Jesús?", o: ["Ardió", "Se rasgó en dos", "Se oscureció"], c: 1, exp: "El velo se rasgó de arriba abajo. (Mateo 27:51)" },
            { p: "¿Qué milagro hizo Moisés al golpear la roca en Meriba por segunda vez?", o: ["Salió agua", "Salió fuego", "Salió aceite"], c: 0, exp: "Salió agua abundante, pero Moisés desobedeció al golpearla dos veces. (Números 20:11)" },
            { p: "¿Cuántos peces pescaron los discípulos por orden de Jesús resucitado?", o: ["100", "153", "200"], c: 1, exp: "Ciento cincuenta y tres peces grandes. (Juan 21:11)" },
            { p: "¿En el milagro de la pesca (Lucas 5), qué hizo Pedro cuando vio el milagro?", o: ["Adoró a Jesús", "Pidió que se alejara de él", "Llamó a los otros discípulos"], c: 1, exp: "Pedro dijo: '¡Apártate de mí, Señor, porque soy hombre pecador!' (Lucas 5:8)" }
        ]
    }
};
