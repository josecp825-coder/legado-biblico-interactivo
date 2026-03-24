// BANCO TRIVIA — PARTE 2: PROFECÍAS + GEOGRAFÍA + NÚMEROS Y DATOS
// Legado Bíblico | Director: Jose
const TRIVIA_BANCO_P2 = {

    'Profecías': {
        facil: [
            { p: "¿Quién profetizó que Jesús nacería en Belén?", o: ["Isaías", "Miqueas", "Daniel"], c: 1, exp: "Miqueas 5:2 profetizó el nacimiento en Belén de Judá." },
            { p: "¿De qué ciudad sería llamado el Mesías según la profecía?", o: ["Jerusalén", "Nazaret", "Capernaúm"], c: 1, exp: "Mateo 2:23 dice 'Será llamado Nazareno'." },
            { p: "¿Quién profetizó que el Mesías nacería de una virgen?", o: ["Isaías", "Ezequiel", "Moisés"], c: 0, exp: "Isaías 7:14: 'He aquí que la virgen concebirá...'" },
            { p: "¿Quién tuvo el sueño de la estatua de diferentes metales?", o: ["Faraón", "Nabucodonosor", "Belsasar"], c: 1, exp: "Nabucodonosor soñó sobre las 4 monarquías mundiales. (Daniel 2)" },
            { p: "¿Qué profeta vio un valle de huesos secos?", o: ["Jeremías", "Ezequiel", "Oseas"], c: 1, exp: "Ezequiel 37 relata la visión de la restauración de Israel." },
            { p: "¿Quién prepararía el camino del Señor según Isaías?", o: ["Pedro", "Juan el Bautista", "Elías"], c: 1, exp: "Juan el Bautista fue la voz que clama en el desierto. (Isaías 40:3)" },
            { p: "¿Durante cuántos años dijo Jeremías que Judá estaría cautiva en Babilonia?", o: ["40 años", "70 años", "100 años"], c: 1, exp: "Jeremías profetizó 70 años de cautiverio. (Jeremías 25:11)" },
            { p: "¿Quién se rebeló e hizo guerra en el cielo según Apocalipsis?", o: ["El dragón (Satanás)", "La bestia", "El falso profeta"], c: 0, exp: "Hubo una gran batalla en el cielo; Miguel y sus ángeles lucharon contra el dragón. (Apoc 12)" },
            { p: "¿De qué tribu de Israel vendría el Mesías?", o: ["Leví", "Benjamín", "Judá"], c: 2, exp: "Es llamado el León de la tribu de Judá. (Apocalipsis 5:5)" },
            { p: "¿Qué profeta predijo que Jesús entraría a Jerusalén en un burrito?", o: ["Zacarías", "Malaquías", "Daniel"], c: 0, exp: "Zacarías 9:9: 'Tu rey viene a ti... montado sobre un pollino'." },
            { p: "¿En qué libro está la profecía de los 2300 días?", o: ["Apocalipsis", "Ezequiel", "Daniel"], c: 2, exp: "Daniel 8:14 habla sobre la purificación del santuario." },
            { p: "¿Qué metal representaba a Babilonia en la estatua de Daniel?", o: ["Plata", "Oro", "Bronce"], c: 1, exp: "'Tú eres aquella cabeza de oro'. (Daniel 2:38)" },
            { p: "¿Cuál es la última promesa de Jesús en la Biblia?", o: ["Estaré con ustedes", "Ciertamente vengo en breve", "Los resucitaré"], c: 1, exp: "Apocalipsis 22:20: 'Ciertamente vengo en breve'." },
            { p: "¿Quién profetizó la caída de Nínive?", o: ["Jonás", "Nahúm", "Amós"], c: 1, exp: "Nahúm dedica su libro a la ruina de Nínive." }
        ],
        intermedio: [
            { p: "¿Qué representan los cuernos en la profecía bíblica?", o: ["Poder o reyes", "Trompetas", "Años"], c: 0, exp: "En Daniel y Apocalipsis, reyes o reinos son representados con cuernos." },
            { p: "¿Qué imperio representaba el pecho y los brazos de plata en la estatua?", o: ["Grecia", "Medo-Persia", "Roma"], c: 1, exp: "El imperio Medo-Persa siguió a Babilonia. (Daniel 2)" },
            { p: "¿Qué animal representó a Grecia en la visión de Daniel 8?", o: ["El carnero", "Un oso", "El macho cabrío"], c: 2, exp: "El macho cabrío avanzaba rápido, representando a Alejandro Magno." },
            { p: "¿Qué significa que profetizarán 1260 días simbólicos?", o: ["1260 meses", "1260 semanas", "1260 años"], c: 2, exp: "Por el principio de día por año bíblico (Ezequiel 4:6), son 1260 años." },
            { p: "¿Qué ángel explica las profecías de tiempo a Daniel?", o: ["Miguel", "Gabriel", "Lucero"], c: 1, exp: "El ángel Gabriel le dio entendimiento a Daniel. (Daniel 9:21)" },
            { p: "¿Qué libro de la Biblia promete una bendición al que lo lee?", o: ["Salmos", "Apocalipsis", "Isaías"], c: 1, exp: "Apocalipsis 1:3: 'Bienaventurado el que lee...'" },
            { p: "¿En qué isla estaba Juan cuando recibió la revelación?", o: ["Patmos", "Chipre", "Malta"], c: 0, exp: "Juan estaba exiliado en la isla de Patmos. (Apocalipsis 1:9)" },
            { p: "¿Quién es la mujer pura de Apocalipsis 12?", o: ["La virgen María", "Eva", "La verdadera iglesia de Dios"], c: 2, exp: "La mujer simboliza la iglesia fiel que es perseguida." },
            { p: "¿Qué representan las 7 trompetas en Apocalipsis?", o: ["Siete iglesias", "Juicios y advertencias de Dios", "Los galardones de los santos"], c: 1, exp: "Son juicios que Dios permite a lo largo de la historia cristiana." },
            { p: "Según Apocalipsis, ¿de dónde sube la segunda bestia?", o: ["Del mar", "De la tierra", "Del abismo"], c: 1, exp: "La segunda bestia sube de la tierra, pareciendo un cordero. (Apocalipsis 13:11)" },
            { p: "¿Qué profeta habla del derramamiento del Espíritu Santo en los últimos días?", o: ["Joel", "Amós", "Oseas"], c: 0, exp: "Joel 2:28: 'Derramaré mi Espíritu sobre toda carne'." },
            { p: "¿Por cuántas monedas profetizó Zacarías que sería vendido el Señor?", o: ["20", "30", "40"], c: 1, exp: "Zacarías 11:12 profetiza las 30 piezas de plata." },
            { p: "¿A qué periodo de la iglesia se le reprocha ser 'tibia'?", o: ["Éfeso", "Laodicea", "Sardis"], c: 1, exp: "A Laodicea se le dice que no es ni fría ni caliente. (Apocalipsis 3)" }
        ],
        avanzado: [
            { p: "¿Cuándo comenzó el periodo de los 2300 días de Daniel 8:14?", o: ["457 a.C.", "538 d.C.", "31 d.C."], c: 0, exp: "Inició en el 457 a.C. con el decreto para restaurar Jerusalén." },
            { p: "¿En qué año terminaron los 2300 días proféticos?", o: ["1798", "1844", "1914"], c: 1, exp: "Terminaron en 1844, marcando el inicio del juicio investigador." },
            { p: "¿Cuántas semanas fueron determinadas sobre el pueblo judío (Daniel 9)?", o: ["70 semanas", "69 semanas", "62 semanas"], c: 0, exp: "Setenta semanas (490 años) estaban determinadas. (Daniel 9:24)" },
            { p: "¿Qué imperio representaban las piernas de hierro en la estatua?", o: ["Grecia", "Roma", "Babilionia"], c: 1, exp: "Roma fue el imperio de 'hierro' que oprimió la tierra. (Daniel 2)" },
            { p: "¿En qué año profético finalizó el periodo de los 1260 años de persecución papal?", o: ["1798", "1844", "1517"], c: 0, exp: "En 1798 el general Berthier tomó prisionero al Papa, causando la 'herida mortal'." },
            { p: "¿A qué corresponde el número de la bestia, 666?", o: ["A un año", "A un número de hombre", "A una ciudad"], c: 1, exp: "'Es número de hombre'. (Apocalipsis 13:18)" },
            { p: "¿Qué iglesia de Apocalipsis representa el periodo de la Reforma?", o: ["Tiatira", "Sardis", "Pérgamo"], c: 1, exp: "Sardis representa la época de la reforma post-persecución medieval." },
            { p: "¿Quiénes conforman los 'tres espíritus inmundos a manera de ranas' en Apocalipsis 16?", o: ["La política, el comercio y la religión", "El dragón, la bestia y el falso profeta", "Ateísmo, espiritismo y materialismo"], c: 1, exp: "Salen de la boca del dragón, de la bestia y del falso profeta." },
            { p: "¿Dónde ocurre el conflicto final según Apocalipsis?", o: ["Meguidó (Armagedón)", "El valle de Josafat", "Jerusalén"], c: 0, exp: "El lugar se llama en hebreo Armagedón. (Apocalipsis 16:16)" },
            { p: "¿Qué ocurre al final del milenio de Apocalipsis 20?", o: ["El inicio de los cielos nuevos", "La Nueva Jerusalén desciende y ocurre la destrucción final", "Satanás es encadenado"], c: 1, exp: "Satanás es suelto un poco de tiempo antes de ser destruido en el lago de fuego." },
            { p: "¿Qué figura en el santuario terrenal representaba el Juicio Final?", o: ["El día de la Pascua", "El día de la Expiación (Yom Kippur)", "La fiesta de las Cabañas"], c: 1, exp: "La purificación del santuario era tipificada por el Día de la Expiación." },
            { p: "¿Qué ángel anuncia la caída de Babilonia en el triple mensaje angélico?", o: ["El primero", "El segundo", "El tercero"], c: 1, exp: "El segundo ángel dice: 'Ha caído, ha caído Babilonia'. (Apocalipsis 14:8)" },
            { p: "¿Quién es el único que era digno de abrir los sellos del libro?", o: ["El arcángel Miguel", "Los ancianos", "El León de Judá / El Cordero"], c: 2, exp: "El Cordero que fue inmolado fue el único digno. (Apocalipsis 5)" }
        ]
    },

    'Geografía Bíblica': {
        facil: [
            { p: "¿En qué jardín vivieron Adán y Eva?", o: ["Jardín de Getsemaní", "Jardín de Edén", "Jardín de Babilonia"], c: 1, exp: "Dios plantó un huerto en Edén, al oriente. (Génesis 2:8)" },
            { p: "¿Sobre qué monte encalló el arca de Noé?", o: ["Monte Sinaí", "Monte Ararat", "Monte Nebo"], c: 1, exp: "El arca reposó sobre los montes de Ararat. (Génesis 8:4)" },
            { p: "¿En qué río fue bautizado Jesús?", o: ["Río Nilo", "Río Éufrates", "Río Jordán"], c: 2, exp: "Juan Bautista lo bautizó en el río Jordán. (Marcos 1:9)" },
            { p: "¿De dónde tuvo que sacar Moisés al pueblo de Israel?", o: ["De Babilonia", "De Egipto", "De Asiria"], c: 1, exp: "Los israelitas eran esclavos en Egipto durante más de 400 años." },
            { p: "¿En qué monte oró Jesús antes de ser arrestado?", o: ["Monte de los Olivos", "Monte Sinaí", "Monte Carmelo"], c: 0, exp: "Jesús fue con sus discípulos al Monte de los Olivos (Getsemaní). (Mateo 26:30)" },
            { p: "¿Qué ciudad fue famosa por su torre inacabada?", o: ["Jericó", "Sodoma", "Babel"], c: 2, exp: "La torre de Babel causó la confusión de idiomas. (Génesis 11)" },
            { p: "¿Dónde se construyó el Templo de Dios?", o: ["Nazaret", "Belén", "Jerusalén"], c: 2, exp: "El templo de Salomón fue edificado en Jerusalén." },
            { p: "¿De qué ciudad venía Pablo antes de su conversión?", o: ["Damasco", "Tarso", "Antioquía"], c: 1, exp: "Pablo era ciudadano de Tarso en Cilicia. (Hechos 21:39)" },
            { p: "¿En qué ciudad nació Jesús?", o: ["Jerusalén", "Belén", "Nazaret"], c: 1, exp: "Cuna del rey David y nacimiento de Jesús. (Mateo 2)" },
            { p: "¿Dónde transcurrió la niñez de Jesús?", o: ["Nazaret", "Belén", "Egipto"], c: 0, exp: "Se crió en Nazaret de Galilea. (Mateo 2:23)" },
            { p: "¿Sobre qué mar caminó Jesús?", o: ["Mar Muerto", "Mar Rojo", "Mar de Galilea"], c: 2, exp: "Caminó sobre el Mar de Galilea durante una tormenta." },
            { p: "¿A qué ciudad huía Jonás para no ir a Nínive?", o: ["Damasco", "Tarsis", "Jope"], c: 1, exp: "Jonás tomó un barco hacia Tarsis. (Jonás 1:3)" },
            { p: "¿Qué ciudad cuyos muros cayeron rodeó Josué?", o: ["Gabaón", "Jericó", "Hai"], c: 1, exp: "Las murallas de Jericó cayeron tras darles vueltas. (Josué 6)" },
            { p: "¿En qué país estaba exiliado Daniel?", o: ["Asiria", "Babilonia", "Grecia"], c: 1, exp: "Daniel fue llevado cautivo a Babilonia en su juventud." }
        ],
        intermedio: [
            { p: "¿A dónde huyó José con María y Jesús para escapar de Herodes?", o: ["Siria", "Egipto", "Babilonia"], c: 1, exp: "Huyeron a Egipto por instrucción de un ángel. (Mateo 2:13)" },
            { p: "¿Dónde se enfrentó Elías a los profetas de Baal?", o: ["Monte Sinaí", "Monte Carmelo", "Monte de los Olivos"], c: 1, exp: "En el Monte Carmelo Dios respondió con fuego. (1 Reyes 18)" },
            { p: "¿En qué piscina lavó el ciego sus ojos por orden de Jesús?", o: ["Betesda", "Siloé", "El río Jordán"], c: 1, exp: "Jesús le mandó a lavarse en el estanque de Siloé. (Juan 9:7)" },
            { p: "¿Dónde tuvo Moisés la visión de la zarza ardiente?", o: ["Monte Nebo", "Monte Horeb (Sinaí)", "Monte Moriah"], c: 1, exp: "En Horeb, el monte de Dios. (Éxodo 3:1)" },
            { p: "¿Qué mar dividió Moisés?", o: ["Mar Rojo", "Mar Muerto", "Mar Mediterráneo"], c: 0, exp: "El Mar Rojo fue abierto para que Israel escapara." },
            { p: "¿A dónde iba Pablo cuando Jesús se le apareció ciegoando?", o: ["Jerusalén", "Antioquía", "Damasco"], c: 2, exp: "Iba a Damasco con cartas para arrestar a los cristianos. (Hechos 9)" },
            { p: "¿En qué monte Abraham iba a sacrificar a Isaac?", o: ["Monte Sinaí", "Monte Moriah", "Monte Carmelo"], c: 1, exp: "En la tierra de Moriah, el mismo lugar donde Salomón edificó el templo. (Génesis 22:2)" },
            { p: "¿A dónde huyeron Lot y sus hijas después de la destrucción de Sodoma?", o: ["A las llanuras", "A Zoar", "A Hebrón"], c: 1, exp: "Zoar era una ciudad pequeña cerca de allí. (Génesis 19:22)" },
            { p: "¿Dónde vivían Marta, María y Lázaro?", o: ["Jerusalén", "Betania", "Caná"], c: 1, exp: "Eran de Betania, aldea cerca de Jerusalén. (Juan 11:1)" },
            { p: "¿Qué región pidieron Rubén y Gad heredar por tener mucho ganado?", o: ["Canaán central", "El lado oriental del Jordán (Galaad)", "La región de los filisteos"], c: 1, exp: "Ellos no pasaron inicialmente el Jordán porque la tierra les pareció buena para ganado." },
            { p: "¿En qué isla recibió Juan el Apocalipsis?", o: ["Patmos", "Chipre", "Creta"], c: 0, exp: "Estaba desterrado por la Palabra de Dios en la isla de Patmos. (Apoc. 1:9)" },
            { p: "¿De qué pozo Jesús pidió agua a la mujer samaritana?", o: ["El pozo de Isaac", "El pozo de Agar", "El pozo de Jacob"], c: 2, exp: "Se sentó junto al pozo de Jacob en Sicar. (Juan 4:6)" },
            { p: "¿Qué ciudad fue construida sobre siete colinas según Apocalipsis?", o: ["Babilonia", "Roma", "Jericó"], c: 1, exp: "La ramera está sentada sobre siete montes que son Roma. (Apoc 17:9)" }
        ],
        avanzado: [
            { p: "¿Cuál era el puerto desde donde Jonás zarpó hacia Tarsis?", o: ["Cesarea", "Jope", "Tiro"], c: 1, exp: "Descendió a Jope y halló una nave que partía. (Jonás 1:3)" },
            { p: "¿Dónde murió Moisés y no cruzó a Canaán?", o: ["Monte Nebo", "Monte Sinaí", "Monte Carmelo"], c: 0, exp: "En el Monte Nebo, cumbre del Pisga. (Deuteronomio 34:1)" },
            { p: "¿En qué valle venció David a Goliat?", o: ["El valle de Josafat", "El valle de Ela", "El valle de Hinón"], c: 1, exp: "Los israelitas y filisteos estaban en el valle de Ela. (1 Sam 17:2)" },
            { p: "¿Qué río tuvo que cruzar Jacob antes de luchar con el ángel?", o: ["Jordán", "Jaboc", "Eufrates"], c: 1, exp: "Pasó el vado de Jaboc en la noche. (Génesis 32:22)" },
            { p: "¿Dónde fue alimentado Elías por los cuervos?", o: ["Arroyo de Querit", "Valle del Jordán", "Mar Muerto"], c: 0, exp: "Dios le mandó a esconderse y beber del arroyo de Querit. (1 Reyes 17:3)" },
            { p: "¿Cuál es la ciudad más antigua mencionada en la historia de Josué como conquistada?", o: ["Jericó", "Damasco", "Ur"], c: 0, exp: "Jericó es considerada una de las ciudades más antiguas continuadamente habitadas." },
            { p: "¿En qué valle se detuvieron el sol y la luna por Josué?", o: ["Valle de Ela", "Valle de Ajalón", "Valle de Cedrón"], c: 1, exp: "'Sol, detente en Gabaón, y tú, luna, en el valle de Ajalón'. (Josué 10:12)" },
            { p: "¿Dónde estaba la cueva de Macpela, donde fueron enterrados los patriarcas?", o: ["Siquem", "Hebrón", "Jebús"], c: 1, exp: "Abraham la compró cerca de Mamre, que es Hebrón. (Génesis 23:19)" },
            { p: "¿Dónde huyó Elías de Jezabel pidiendo la muerte?", o: ["Al monte Sinaí", "Bajo un enebro en el desierto de Beerseba", "A las cuevas de Engadi"], c: 1, exp: "Se sentó bajo un enebro y pidió morir. (1 Reyes 19:4)" },
            { p: "¿A qué ciudad fueron los discípulos donde se les llamó 'cristianos' por primera vez?", o: ["Jerusalén", "Antioquía", "Éfeso"], c: 1, exp: "Fue en Antioquía donde se usó el nombre 'cristiano' por primera vez. (Hechos 11:26)" },
            { p: "¿En qué isla naufragó Pablo de camino a Roma?", o: ["Malta", "Chipre", "Creta"], c: 0, exp: "Salvaron la vida llegando a la isla llamada Malta. (Hechos 28:1)" },
            { p: "¿Qué ciudad tenía el altar 'Al Dios no conocido'?", o: ["Atenas", "Corinto", "Éfeso"], c: 0, exp: "Pablo usó este altar en Atenas para predicar el evangelio. (Hechos 17:23)" },
            { p: "¿A qué iglesia de Apocalipsis pertenece la ciudad donde estaba 'el trono de Satanás'?", o: ["Pérgamo", "Tiatira", "Esmirna"], c: 0, exp: "Pérgamo era el centro del culto imperial y pagano. (Apocalipsis 2:13)" }
        ]
    },

    'Números y Datos': {
        facil: [
            { p: "¿Cuántos días creó Dios el mundo?", o: ["7 días", "6 días, y descansó el séptimo", "5 días"], c: 1, exp: "En seis días hizo Dios los cielos y la tierra. (Éxodo 20:11)" },
            { p: "¿Cuántos mandamientos entregó Dios en tablas de piedra?", o: ["10", "12", "7"], c: 0, exp: "Los diez mandamientos. (Éxodo 20)" },
            { p: "¿Cuántos apóstoles eligió Jesús inicialmente?", o: ["10", "12", "70"], c: 1, exp: "El número 12 representa las 12 tribus de Israel. (Mateo 10)" },
            { p: "¿A cuántas ovejas dejó el pastor para buscar a la perdida?", o: ["99", "10", "50"], c: 0, exp: "Dejó a las 99 en el rebaño. (Lucas 15:4)" },
            { p: "¿Cuántos panes usó Jesús para alimentar a 5,000 mil?", o: ["3 panes", "5 panes y 2 peces", "7 panes"], c: 1, exp: "Con 5 panes de cebada y 2 pececillos. (Juan 6:9)" },
            { p: "¿Cuántos días pasó Jesús en la tumba?", o: ["2 días", "3 días", "1 día"], c: 1, exp: "Resucitó al tercer día según las Escrituras. (1 Corintios 15:4)" },
            { p: "¿Cuántas parejas de cada animal limpio entraron al arca?", o: ["1", "2", "7"], c: 2, exp: "Dios mandó a Noé meter 7 de cada animal limpio, y 2 de los inmundos. (Génesis 7:2)" },
            { p: "¿Por cuántas monedas vendió Judas a Jesús?", o: ["10 monedas", "20 monedas", "30 monedas"], c: 2, exp: "Eran treinta piezas de plata. (Mateo 26:15)" },
            { p: "¿Cuántas plagas cayeron sobre Egipto?", o: ["7", "10", "12"], c: 1, exp: "Fueron diez plagas enviadas por medio de Moisés." },
            { p: "¿Cuántos ladrones fueron crucificados con Jesús?", o: ["Ninguno", "Uno", "Dos"], c: 2, exp: "Uno a la derecha y otro a la izquierda. (Mateo 27:38)" },
            { p: "¿Cuántas veces perdonar, según Jesús?", o: ["7 veces", "Hasta 70 veces 7", "Siempre que pida perdón"], c: 1, exp: "Esto significa perdonar sin llevar la cuenta. (Mateo 18:22)" },
            { p: "¿Cuántos libros tiene la Biblia protestante?", o: ["66", "73", "50"], c: 0, exp: "Contiene 39 del A.T. y 27 del N.T." },
            { p: "¿Cuántos años vagó Israel en el desierto?", o: ["20", "30", "40"], c: 2, exp: "Fueron 40 años por su incredulidad. (Números 14:34)" },
            { p: "¿A qué edad comenzó el ministerio de Jesús aproximadamente?", o: ["30 años", "25 años", "33 años"], c: 0, exp: "Jesús tenía como 30 años cuando empezó. (Lucas 3:23)" }
        ],
        intermedio: [
            { p: "¿Cuántas veces rodearon Jericó el séptimo día?", o: ["1 vez", "3 veces", "7 veces"], c: 2, exp: "El séptimo día le dieron siete vueltas a la ciudad. (Josué 6:15)" },
            { p: "¿Cuántos hombres componían el ejército vencedor de Gedeón?", o: ["300", "1000", "3000"], c: 0, exp: "Dios redujo el ejército a solo 300 para que la gloria fuera Suya. (Jueces 7)" },
            { p: "¿Cuántas esposas y concubinas tuvo Salomón?", o: ["300 esposas, 700 concubinas", "700 esposas, 300 concubinas", "500 y 500"], c: 1, exp: "Mil mujeres en total, y ellas desviaron su corazón. (1 Reyes 11:3)" },
            { p: "¿Cuántos gigantes se mencionan que acompañaban a Goliat?", o: ["Goliat no tenía hermanos", "Eran 4 gigantes más, hermanos suyos", "Había un ejército entero de gigantes"], c: 1, exp: "Las armas de Ishbi-benob, Saf, Goliat el geteo, y uno enorme con 6 dedos en cada extremidad. (2 Samuel 21)" },
            { p: "¿Cuánto tiempo duró la ceguera de Saulo de Tarso?", o: ["1 día", "3 días", "7 días"], c: 1, exp: "Tres días estuvo sin ver y no comió ni bebió. (Hechos 9:9)" },
            { p: "¿Cuántos años tuvo Jesús cuando se perdió y fue hallado en el Templo?", o: ["10", "12", "15"], c: 1, exp: "A los doce años de edad discutía con doctores de la ley. (Lucas 2:42)" },
            { p: "¿Cuál fue el precio que pagaron los ismaelitas por José?", o: ["20 piezas de plata", "30 piezas de plata", "15 piezas de plata"], c: 0, exp: "José fue vendido por 20 piezas de plata. (Génesis 37:28)" },
            { p: "¿Cuántos versículos tiene el salmo más largo de la Biblia (Salmo 119)?", o: ["150", "176", "200"], c: 1, exp: "Salmo 119 contiene 176 versículos y es un acróstico hebreo." },
            { p: "¿Cuántos días de ayuno realizó Elías al caminar hacia Horeb?", o: ["21 días", "40 días", "7 días"], c: 1, exp: "Con la fuerza de la comida que le dio el ángel caminó 40 días. (1 Reyes 19:8)" },
            { p: "¿Cuál era la medida del diezmo en porcentaje bíblico?", o: ["10%", "15%", "20%"], c: 0, exp: "Diezmo significa la décima parte (10%)." },
            { p: "¿Cuántos capítulos tiene el libro de Isaías?", o: ["40", "52", "66"], c: 2, exp: "Isaías es a veces llamado la 'Biblia en miniatura' por tener 66 capítulos." },
            { p: "¿Cuántas concubinas tuvo el rey David en Jerusalén?", o: ["7", "10", "300"], c: 1, exp: "En 2 Samuel 15:16 se menciona que dejó 10 concubinas cuidando la casa." },
            { p: "¿Cuántos años vivió Adán?", o: ["969", "930", "800"], c: 1, exp: "Adán vivió 930 años y murió. (Génesis 5:5)" }
        ],
        avanzado: [
            { p: "¿Cuántas personas se salvaron en el arca de Noé?", o: ["6", "8", "10"], c: 1, exp: "Noé, su esposa, y sus tres hijos (Sem, Cam, Jafet) con sus esposas = 8. (1 Pedro 3:20)" },
            { p: "¿Cuántos soldados sirios murieron en una noche por mano del ángel de Jehová?", o: ["100,000", "185,000", "200,000"], c: 1, exp: "El ángel derrotó el campamento asirio bajo Senaquerib. (2 Reyes 19:35)" },
            { p: "¿Cuántas piezas de oro era el talento, aproximadamente?", o: ["30 kilos aprox.", "10 kilos aprox.", "50 kilos aprox."], c: 0, exp: "Un talento fluctuaba, pero se estima cerca de 30-34 kilos de metal." },
            { p: "¿A qué distancia estaba Betania de Jerusalén?", o: ["15 estadios (~3 km)", "1 estadio (~200 mt)", "30 estadios (~6 km)"], c: 0, exp: "Betania estaba a quince estadios. (Juan 11:18)" },
            { p: "¿Cuántos cantores y músicos para el templo asignó David en total?", o: ["1,000", "4,000", "12,000"], c: 1, exp: "David separó 4,000 levitas para la alabanza. (1 Crónicas 23:5)" },
            { p: "¿Qué edad tenía Abraham cuando tuvo a Ismael?", o: ["86", "99", "100"], c: 0, exp: "Abraham tenía 86 años (Génesis 16:16). A Isaac lo tuvo a los 100." },
            { p: "¿Cuántos caballos podía guardar Salomón en sus caballerizas?", o: ["1,000", "4,000", "40,000"], c: 2, exp: "Tenía cuarenta mil caballos en sus caballerizas... (1 Reyes 4:26)" },
            { p: "¿Cuántos años profetizó Isaías aproximadamente?", o: ["30 años", "60 años", "10 años"], c: 1, exp: "Comenzó con el rey Uzías hasta Ezequías, un ministerio muy largo (c. 60 años)." },
            { p: "¿A qué distancia de Jerusalén es un 'camino de un día de reposo'?", o: ["1 km (2000 codos)", "3 km", "Media milla"], c: 0, exp: "La tradición rabínica fijaba unos 2000 codos, menos de 1 kilómetro. (Hechos 1:12)" },
            { p: "¿Cuántos capítulos tiene el Antiguo Testamento en total (en la versión Reina Valera)?", o: ["929", "1189", "1000"], c: 0, exp: "El AT tiene 929 capítulos y el NT tiene 260. Total: 1189." },
            { p: "¿Cuántas hijas tuvo Job al final de su aflicción?", o: ["3", "7", "10"], c: 0, exp: "Tuvo siete hijos y tres hijas: Jemima, Cesia, y Keren-hapuc. (Job 42:14)" },
            { p: "¿Cuánto midió de largo el muro que Nehemías reconstruyó?", o: ["Terminó en 52 días", "Tardó 3 años", "Terminó en 40 días"], c: 0, exp: "La reconstrucción se hizo en tiempo récord de 52 días. (Nehemías 6:15)" },
            { p: "¿Qué edad tenía Moisés al huir de Egipto, qué edad al ser llamado en la zarza y qué edad al morir?", o: ["30, 70, 110", "40, 80, 120", "50, 90, 130"], c: 1, exp: "La vida de Moisés se divide en tres periodos de 40 años." }
        ]
    }

};
