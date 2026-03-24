// ==========================================
// LEGADO BIBLICO - MOTOR ADOLESCENTES v15.0
// Misión: Formar jóvenes en Fe, Valores y Buena Conducta
// ==========================================

const JUEGOS_BANCO = [
    { p: "¿Cuál es el Sábado bíblico según el 4to mandamiento?", o: ["Viernes", "Sábado", "Domingo"], c: 1 },
    { p: "¿En qué capítulo de Apocalipsis está el mensaje de los Tres Ángeles?", o: ["Capítulo 7", "Capítulo 14", "Capítulo 12"], c: 1 },
    { p: "¿Qué significa la palabra 'Adventista'?", o: ["Creyente en el Sábado", "Creyente en la Segunda Venida", "Creyente en el bautismo"], c: 1 },
    { p: "¿Qué dice Eclesiastés 9:5 sobre el estado de los muertos?", o: ["Van al cielo inmediatamente", "No saben nada – duermen", "Se comunican con los vivos"], c: 1 },
    { p: "¿Cuántos mandamientos tiene la Ley de Dios?", o: ["7", "10", "12"], c: 1 },
    { p: "¿Quién fue arrojado al foso de los leones por orar a Dios?", o: ["Josué", "Daniel", "Pablo"], c: 1 },
    { p: "¿Qué mandamiento habla de honrar a tu padre y tu madre?", o: ["El 2do", "El 5to", "El 8vo"], c: 1 },
    { p: "¿Qué versículo dice 'No se amolden al mundo, sino transfórmense...'?", o: ["Romanos 12:2", "Mateo 5:1", "Juan 3:16"], c: 0 },
    { p: "¿Qué joven en la Biblia resistió la tentación de Potifar?", o: ["David", "Sansón", "José"], c: 2 },
    { p: "¿Qué proverbio dice 'instruye al niño en su camino...'?", o: ["Prov. 22:6", "Sal. 119:11", "Ecl. 12:1"], c: 0 },
    { p: "¿Qué dijo Jesús que debían hacer los jóvenes para ser grandes?", o: ["Acumular riquezas", "Servir a los demás", "Estudiar mucho"], c: 1 },
    { p: "¿Qué libro de la Biblia fue escrito por el joven Jeremías?", o: ["Isaías", "Ezequiel", "Jeremías"], c: 2 }
];

// Banco de Valores y Conducta
const VALORES_BANCO = [
    {
        icono: "🤝", titulo: "El Respeto a los Mayores",
        versiculo: "Levántate ante las canas, y honra el rostro del anciano.",
        ref: "Levítico 19:32",
        leccion: "Respetar a los mayores no es una regla anticuada — es sabiduría. Ellos han vivido lo que tú apenas estás comenzando. Cuando los escuchas, recibes años de experiencia en minutos.",
        reto: "Esta semana: saluda al adulto mayor más cercano a ti y pregúntale una historia de su vida.",
        color: "#a29bfe"
    },
    {
        icono: "💬", titulo: "El Poder de las Palabras",
        versiculo: "La muerte y la vida están en poder de la lengua.",
        ref: "Proverbios 18:21",
        leccion: "Cada palabra que dices tiene peso. Una palabra puede destruir la autoestima de alguien o levantarla para siempre. Tú decides qué tipo de persona eres con lo que dices cada día.",
        reto: "Hoy: Di una palabra de aliento genuina a alguien que lo necesite. No en redes — en persona.",
        color: "#fd79a8"
    },
    {
        icono: "⚔️", titulo: "La Integridad — Ser el Mismo en Privado",
        versiculo: "El que camina en integridad anda confiado.",
        ref: "Proverbios 10:9",
        leccion: "Integridad no es ser bueno cuando te ven — es ser bueno cuando nadie te está mirando. El carácter que construyes en silencio es el que define quién eres realmente.",
        reto: "Haz algo bueno hoy sin contárselo a nadie. Sin foto. Sin historia. Solo hazlo.",
        color: "#00cec9"
    },
    {
        icono: "📵", titulo: "Cuidar tu Mente Digital",
        versiculo: "Todo lo que es verdadero, todo lo honesto... en esto pensad.",
        ref: "Filipenses 4:8",
        leccion: "Lo que ves en pantallas forma tu forma de pensar. Las redes sociales te muestran lo que te hace querer más, envidiar más, sentirte menos. Tu mente es un jardín — tú eliges qué plantas ahí.",
        reto: "Pon tu celular a un lado por 30 minutos hoy y haz algo con tus manos o habla con alguien cara a cara.",
        color: "#e17055"
    },
    {
        icono: "🌱", titulo: "La Humildad — No es Debilidad",
        versiculo: "Dios resiste a los soberbios, pero da gracia a los humildes.",
        ref: "Santiago 4:6",
        leccion: "La humildad no significa que te creas inferior. Significa que no necesitas demostrar nada. Las personas más fuertes que conocerás en la vida son humildes — porque no necesitan que nadie las valide.",
        reto: "Admite hoy un error que cometiste sin excusas. Solo: 'Me equivoqué, lo siento'.",
        color: "#55efc4"
    },
    {
        icono: "🔥", titulo: "El Propósito — ¿Para qué estás aquí?",
        versiculo: "Acuérdate de tu Creador en los días de tu juventud.",
        ref: "Eclesiastés 12:1",
        leccion: "Hay jóvenes que van por la vida sin saber a dónde van. Tú tienes un Creador que te hizo con un propósito específico. No estás aquí por accidente. Tu vida tiene dirección cuando la entregas a Él.",
        reto: "Escribe en papel: ¿Cuál crees que es tu talento principal? ¿Cómo puedes usarlo para servir a otros?",
        color: "#fdcb6e"
    }
];

// Devocionales Teen
const DEVOCIONALES_TEEN = [
    {
        dia: "LUNES", icono: "🌅",
        titulo: "Comenzar el día con propósito",
        versiculo: "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.",
        ref: "Salmo 118:24",
        mensaje: "Cada mañana es una segunda oportunidad. No importa cómo fue ayer — hoy puedes comenzar diferente. Antes de revisar tu celular, habla unos segundos con Dios. Ese orden cambia todo."
    },
    {
        dia: "MARTES", icono: "⚡",
        titulo: "Cuando la presión de grupo te empuje",
        versiculo: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento.",
        ref: "Romanos 12:2",
        mensaje: "Tus amigos te dirán que hagas cosas que en tu corazón sabes que no están bien. Esa incomodidad que sientes es tu conciencia. Es Dios hablándote. Escúchalo — Él siempre tiene razón."
    },
    {
        dia: "MIÉRCOLES", icono: "🛡️",
        titulo: "Cuando te sientas solo o diferente",
        versiculo: "Nunca te dejaré, ni te abandonaré.",
        ref: "Hebreos 13:5",
        mensaje: "Hay días en que sientes que no encajas en ningún lado. Que nadie realmente te entiende. Dios dice: Yo sí. Y Él no cambia, no falla, no abandona. Eso vale más que cualquier grupo de amigos."
    },
    {
        dia: "JUEVES", icono: "💪",
        titulo: "El coraje de hacer lo correcto",
        versiculo: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo.",
        ref: "Deuteronomio 31:6",
        mensaje: "Hacer lo correcto muchas veces requiere más valentía que pelear. Decir no cuando todos dicen sí, defender al débil cuando nadie más lo hace — eso es verdadero coraje."
    },
    {
        dia: "VIERNES", icono: "🌿",
        titulo: "El regalo del Sábado",
        versiculo: "Y bendijo Dios al día séptimo, y lo santificó.",
        ref: "Génesis 2:3",
        mensaje: "Dios mismo descansó y creó un día especial para ti. El Sábado no es una carga — es un regalo. Un día sin la presión de producir, sin redes, sin logros. Solo tú, tu familia y tu Creador."
    },
    {
        dia: "SÁBADO", icono: "✨",
        titulo: "Eres creado para algo grande",
        versiculo: "Porque somos hechura suya, creados en Cristo Jesús para buenas obras.",
        ref: "Efesios 2:10",
        mensaje: "No eres un accidente. No eres un error. Fuiste diseñado con precisión por el Dios del universo. Eso significa que tienes valor antes de lograr cualquier cosa. Tu dignidad no depende de tus seguidores, tus notas ni tu ropa."
    },
    {
        dia: "DOMINGO", icono: "🌎",
        titulo: "Deja un legado donde estás",
        versiculo: "Nadie tenga en poco tu juventud, sino sé ejemplo de los creyentes.",
        ref: "1 Timoteo 4:12",
        mensaje: "No esperes crecer para hacer algo importante. Los jóvenes de la Biblia cambiaron el mundo: José, Daniel, David, Timoteo. ¿Qué estás dejando en tu escuela, tu barrio, tu familia? Eso es tu legado."
    }
];

let preguntasRepetir = null;
let ultimoLibroTrivia = "";
let ultimoRangoTrivia = "";

let juegoState = {
    preguntaIdx: 0, vidas: 3, puntos: 0, total: 0,
    preguntas: [], timer: null, tiempoRestante: 20, tiempoConfig: 20, aprobado: false
};

// ==========================================
// HUB PRINCIPAL ADOLESCENTES
// ==========================================
function renderModuloAdolescentes() {
    // ── Verificar sesión Teen ──
    const sesion = (typeof TEEN_AUTH !== 'undefined') ? TEEN_AUTH.obtenerSesion() : null;
    if (!sesion) {
        if (typeof renderLoginTeen === 'function') {
            renderLoginTeen(() => renderModuloAdolescentes());
        }
        return;
    }

    const container = document.getElementById('pantalla-estudio');
    const devTeen = DEVOCIONALES_TEEN[new Date().getDay()];

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0020,#1a0035,#0d001a);font-family:'Segoe UI',sans-serif;padding-bottom:80px;">

            <!-- HEADER -->
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(162,155,254,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="volverMenuPrincipal()" style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.25);color:#a29bfe;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← INICIO</button>
                <div style="text-align:center;">
                    <div style="color:rgba(162,155,254,0.55);font-size:0.58rem;letter-spacing:4px;">LEGADO BÍBLICO</div>
                    <div style="color:#a29bfe;font-weight:900;font-size:0.88rem;letter-spacing:2px;">ADOLESCENTES</div>
                </div>
                <div style="background:rgba(255,200,0,0.1);border:1px solid rgba(255,200,0,0.3);border-radius:8px;padding:6px 10px;color:#feca57;font-size:0.7rem;font-weight:900;">🔥 Zona Teen</div>
            </div>

            <!-- BANNER DEVOCIONAL DEL DÍA -->
            <div style="margin:18px 18px 0;background:linear-gradient(135deg,rgba(162,155,254,0.12),rgba(253,121,168,0.08));border:1px solid rgba(162,155,254,0.2);border-radius:16px;padding:18px 20px;">
                <div style="font-size:0.58rem;letter-spacing:3px;color:rgba(162,155,254,0.6);margin-bottom:6px;">✨ DEVO DEL DÍA — ${devTeen.dia}</div>
                <div style="font-size:1.6rem;margin-bottom:6px;">${devTeen.icono}</div>
                <h2 style="color:#fff;font-size:1rem;margin:0 0 8px;font-weight:900;">${devTeen.titulo}</h2>
                <p class="lectura-texto" style="color:rgba(255,255,255,0.65);font-size:0.82rem;line-height:1.6;margin:0 0 10px;font-style:italic;">"${devTeen.versiculo}" — <span style="color:#a29bfe;">${devTeen.ref}</span></p>
                <button onclick="verDevoTeen()" style="background:rgba(162,155,254,0.15);border:1px solid rgba(162,155,254,0.3);color:#a29bfe;padding:8px 16px;border-radius:20px;font-size:0.72rem;font-weight:900;cursor:pointer;">LEER REFLEXIÓN →</button>
            </div>

            <!-- MENÚ PRINCIPAL -->
            <div style="padding:18px;display:grid;gap:12px;">

                <!-- ZONA DE JUEGOS -->
                <div onclick="renderJuegoTeens()" style="background:linear-gradient(135deg,rgba(254,202,87,0.12),rgba(255,107,107,0.08));border:1px solid rgba(254,202,87,0.25);border-radius:16px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;transition:0.3s;"
                    onmouseover="this.style.borderColor='rgba(254,202,87,0.5)'" onmouseout="this.style.borderColor='rgba(254,202,87,0.25)'">
                    <div style="font-size:2.4rem;">🎮</div>
                    <div style="flex:1;">
                        <h3 style="color:#feca57;font-size:1rem;margin:0 0 4px;font-weight:900;">ZONA DE RETOS BÍBLICOS</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.78rem;margin:0;">Trivia rápida · Trivia por libro · Modo Versus PVP</p>
                    </div>
                    <div style="color:rgba(254,202,87,0.6);font-size:1.4rem;">›</div>
                </div>

                <!-- ⚽ PENALES BÍBLICOS — Tarjeta directa -->
                <div onclick="window.abrirPenalesBiblicos()" style="background:linear-gradient(135deg,rgba(45,158,61,0.2),rgba(26,107,42,0.1));border:1.5px solid rgba(85,239,196,0.35);border-radius:16px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;transition:0.3s;"
                    onmouseover="this.style.borderColor='rgba(85,239,196,0.7)'" onmouseout="this.style.borderColor='rgba(85,239,196,0.35)'">
                    <div style="font-size:2.4rem;">⚽</div>
                    <div style="flex:1;">
                        <h3 style="color:#55efc4;font-size:1rem;margin:0 0 4px;font-weight:900;">PENALES BÍBLICOS</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.78rem;margin:0;">Responde y mete el gol · 2-4 jugadores · 11 categorías</p>
                    </div>
                    <div style="color:rgba(85,239,196,0.6);font-size:1.4rem;">›</div>
                </div>

                <!-- VALORES Y CONDUCTA -->
                <div onclick="renderValoresTeens()" style="background:linear-gradient(135deg,rgba(0,206,201,0.12),rgba(85,239,196,0.06));border:1px solid rgba(0,206,201,0.25);border-radius:16px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;transition:0.3s;"
                    onmouseover="this.style.borderColor='rgba(0,206,201,0.5)'" onmouseout="this.style.borderColor='rgba(0,206,201,0.25)'">
                    <div style="font-size:2.4rem;">⭐</div>
                    <div style="flex:1;">
                        <h3 style="color:#00cec9;font-size:1rem;margin:0 0 4px;font-weight:900;">VALORES Y CONDUCTA</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.78rem;margin:0;">Respeto · Integridad · Propósito · Carácter</p>
                    </div>
                    <div style="color:rgba(0,206,201,0.6);font-size:1.4rem;">›</div>
                </div>

                <!-- DEVOCIONALES TEEN -->
                <div onclick="renderDevcionalesTeens()" style="background:linear-gradient(135deg,rgba(253,121,168,0.12),rgba(162,155,254,0.06));border:1px solid rgba(253,121,168,0.25);border-radius:16px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;transition:0.3s;"
                    onmouseover="this.style.borderColor='rgba(253,121,168,0.5)'" onmouseout="this.style.borderColor='rgba(253,121,168,0.25)'">
                    <div style="font-size:2.4rem;">📖</div>
                    <div style="flex:1;">
                        <h3 style="color:#fd79a8;font-size:1rem;margin:0 0 4px;font-weight:900;">DEVOCIONAL TEEN</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.78rem;margin:0;">7 devocionales semanales para tu vida real</p>
                    </div>
                    <div style="color:rgba(253,121,168,0.6);font-size:1.4rem;">›</div>
                </div>

                <!-- MATERIAL DE ESTUDIO -->
                <div onclick="renderMaterialTeens()" style="background:linear-gradient(135deg,rgba(108,92,231,0.12),rgba(162,155,254,0.06));border:1px solid rgba(108,92,231,0.25);border-radius:16px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;transition:0.3s;"
                    onmouseover="this.style.borderColor='rgba(108,92,231,0.5)'" onmouseout="this.style.borderColor='rgba(108,92,231,0.25)'">
                    <div style="font-size:2.4rem;">🏛️</div>
                    <div style="flex:1;">
                        <h3 style="color:#a29bfe;font-size:1rem;margin:0 0 4px;font-weight:900;">MATERIAL DE DOCTRINA</h3>
                        <p style="color:rgba(255,255,255,0.5);font-size:0.78rem;margin:0;">Fe Adventista · Creencias básicas · Bautismo</p>
                    </div>
                    <div style="color:rgba(162,155,254,0.6);font-size:1.4rem;">›</div>
                </div>
            </div>

            <!-- VERSÍCULO MOTIVACIONAL -->
            <div style="margin:0 18px;background:rgba(255,255,255,0.02);border:1px dashed rgba(255,200,0,0.2);border-radius:14px;padding:16px;text-align:center;">
                <p style="color:rgba(255,200,0,0.7);font-size:0.8rem;margin:0;font-style:italic;">"Nadie tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza." — <strong>1 Timoteo 4:12</strong></p>
            </div>
        </div>
    `;
}

function verDevoTeen() {
    const devTeen = DEVOCIONALES_TEEN[new Date().getDay()];
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0020,#1a0035,#0d001a);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(162,155,254,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdolescentes()" style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.25);color:#a29bfe;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#a29bfe;font-size:0.8rem;letter-spacing:2px;">✨ DEVO DEL DÍA</span>
            </div>
            <div style="padding:28px 22px;max-width:600px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:24px;">
                    <div style="font-size:3rem;margin-bottom:10px;">${devTeen.icono}</div>
                    <div style="font-size:0.6rem;letter-spacing:4px;color:rgba(162,155,254,0.5);margin-bottom:6px;">${devTeen.dia}</div>
                    <h1 style="color:#fff;font-size:1.3rem;margin:0;font-weight:900;">${devTeen.titulo}</h1>
                </div>
                <div style="background:rgba(162,155,254,0.08);border-left:3px solid #a29bfe;padding:16px 18px;border-radius:0 12px 12px 0;margin-bottom:22px;">
                    <p class="lectura-texto" style="color:rgba(255,255,255,0.85);font-size:1rem;font-style:italic;line-height:1.7;margin:0 0 8px;">"${devTeen.versiculo}"</p>
                    <span style="color:#a29bfe;font-size:0.7rem;font-weight:900;letter-spacing:1.5px;">— ${devTeen.ref}</span>
                </div>
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px;margin-bottom:20px;">
                    <div style="font-size:0.58rem;letter-spacing:3px;color:rgba(253,121,168,0.7);margin-bottom:10px;">💬 REFLEXIÓN PARA TI</div>
                    <p class="lectura-texto" style="color:rgba(255,255,255,0.8);font-size:0.92rem;line-height:1.75;margin:0;">${devTeen.mensaje}</p>
                </div>
                <button onclick="renderModuloAdolescentes()" style="width:100%;background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:none;color:white;padding:16px;border-radius:12px;font-weight:900;font-size:0.9rem;cursor:pointer;letter-spacing:1px;">← VOLVER AL MENÚ</button>
            </div>
        </div>
    `;
}

function renderValoresTeens() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#001a1a,#00332a,#001a1a);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(0,206,201,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdolescentes()" style="background:rgba(0,206,201,0.1);border:1px solid rgba(0,206,201,0.25);color:#00cec9;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#00cec9;font-size:0.8rem;letter-spacing:2px;">⭐ VALORES Y CONDUCTA</span>
            </div>
            <div style="padding:20px;max-width:650px;margin:0 auto;">
                <p style="color:rgba(255,255,255,0.4);font-size:0.78rem;text-align:center;margin:0 0 20px;">Principios que forman el carácter de por vida</p>
                <div style="display:grid;gap:14px;">
                    ${VALORES_BANCO.map((v, i) => `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;">
                            <div onclick="toggleValor(${i})" style="padding:18px 20px;cursor:pointer;display:flex;align-items:center;gap:14px;">
                                <span style="font-size:1.8rem;">${v.icono}</span>
                                <div style="flex:1;">
                                    <h3 style="color:#fff;font-size:0.9rem;margin:0 0 3px;font-weight:900;">${v.titulo}</h3>
                                    <span style="color:rgba(255,255,255,0.4);font-size:0.72rem;font-style:italic;">"${v.versiculo.substring(0, 55)}..."</span>
                                </div>
                                <span id="arr-${i}" style="color:rgba(255,255,255,0.3);font-size:1.2rem;transition:0.2s;">›</span>
                            </div>
                            <div id="val-panel-${i}" style="display:none;padding:0 20px 18px;">
                                <div style="background:rgba(0,0,0,0.3);border-left:3px solid ${v.color};padding:12px 15px;border-radius:0 10px 10px 0;margin-bottom:12px;">
                                    <p class="lectura-texto" style="color:rgba(255,255,255,0.85);font-size:0.88rem;font-style:italic;margin:0 0 6px;">"${v.versiculo}"</p>
                                    <span style="color:${v.color};font-size:0.65rem;font-weight:900;letter-spacing:1.5px;">— ${v.ref}</span>
                                </div>
                                <p class="lectura-texto" style="color:rgba(255,255,255,0.75);font-size:0.85rem;line-height:1.7;margin:0 0 12px;">${v.leccion}</p>
                                <div style="background:rgba(255,200,0,0.06);border:1px solid rgba(255,200,0,0.2);border-radius:10px;padding:12px 14px;">
                                    <div style="font-size:0.58rem;letter-spacing:2px;color:rgba(254,202,87,0.7);margin-bottom:6px;">🎯 RETO DE LA SEMANA</div>
                                    <p class="lectura-texto" style="color:#feca57;font-size:0.82rem;line-height:1.55;margin:0;">${v.reto}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function toggleValor(i) {
    const panel = document.getElementById('val-panel-' + i);
    const arr = document.getElementById('arr-' + i);
    const abierto = panel.style.display !== 'none';
    document.querySelectorAll('[id^="val-panel-"]').forEach(p => p.style.display = 'none');
    document.querySelectorAll('[id^="arr-"]').forEach(a => a.textContent = '›');
    if (!abierto) { panel.style.display = 'block'; arr.textContent = '↓'; }
}

function renderDevcionalesTeens() {
    const container = document.getElementById('pantalla-estudio');
    const hoy = new Date().getDay();
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#1a0020,#2d003a,#1a0020);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(253,121,168,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdolescentes()" style="background:rgba(253,121,168,0.1);border:1px solid rgba(253,121,168,0.25);color:#fd79a8;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#fd79a8;font-size:0.8rem;letter-spacing:2px;">📖 DEVOCIONALES TEEN</span>
            </div>
            <div style="padding:20px;max-width:650px;margin:0 auto;">
                <p style="color:rgba(255,255,255,0.4);font-size:0.78rem;text-align:center;margin:0 0 20px;">Un mensaje diario para tu vida real</p>
                <div style="display:grid;gap:12px;">
                    ${DEVOCIONALES_TEEN.map((d, i) => `
                        <div onclick="verDevoTeen${i}()" style="background:${i === hoy ? 'rgba(162,155,254,0.1)' : 'rgba(255,255,255,0.03)'};border:1px solid ${i === hoy ? 'rgba(162,155,254,0.4)' : 'rgba(255,255,255,0.07)'};border-radius:14px;padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:14px;transition:0.3s;"
                            onmouseover="this.style.borderColor='rgba(253,121,168,0.4)'" onmouseout="this.style.borderColor='${i === hoy ? 'rgba(162,155,254,0.4)' : 'rgba(255,255,255,0.07)'}'" >
                            <span style="font-size:1.8rem;">${d.icono}</span>
                            <div style="flex:1;">
                                <div style="font-size:0.58rem;letter-spacing:2px;color:${i === hoy ? '#a29bfe' : 'rgba(255,255,255,0.35)'};margin-bottom:3px;">${d.dia}${i === hoy ? ' — HOY' : ''}</div>
                                <h3 style="color:#fff;font-size:0.88rem;margin:0;font-weight:900;">${d.titulo}</h3>
                            </div>
                            <span style="color:rgba(253,121,168,0.5);font-size:1.2rem;">›</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    // Inyectar funciones de apertura de cada devocional
    DEVOCIONALES_TEEN.forEach((d, i) => {
        window['verDevoTeen' + i] = function () {
            const c = document.getElementById('pantalla-estudio');
            c.innerHTML = `
                <div style="min-height:100vh;background:linear-gradient(170deg,#1a0020,#2d003a,#1a0020);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
                    <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(253,121,168,0.2);position:sticky;top:0;z-index:100;">
                        <button onclick="renderDevcionalesTeens()" style="background:rgba(253,121,168,0.1);border:1px solid rgba(253,121,168,0.25);color:#fd79a8;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← DEVOCIONALES</button>
                    </div>
                    <div style="padding:28px 22px;max-width:600px;margin:0 auto;">
                        <div style="text-align:center;margin-bottom:24px;">
                            <div style="font-size:3rem;margin-bottom:10px;">${d.icono}</div>
                            <div style="font-size:0.6rem;letter-spacing:4px;color:rgba(253,121,168,0.5);margin-bottom:6px;">${d.dia}</div>
                            <h1 style="color:#fff;font-size:1.22rem;margin:0;font-weight:900;">${d.titulo}</h1>
                        </div>
                        <div style="background:rgba(253,121,168,0.07);border-left:3px solid #fd79a8;padding:16px 18px;border-radius:0 12px 12px 0;margin-bottom:22px;">
                            <p class="lectura-texto" style="color:rgba(255,255,255,0.85);font-size:1rem;font-style:italic;line-height:1.7;margin:0 0 8px;">"${d.versiculo}"</p>
                            <span style="color:#fd79a8;font-size:0.7rem;font-weight:900;letter-spacing:1.5px;">— ${d.ref}</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px;">
                            <div style="font-size:0.58rem;letter-spacing:3px;color:rgba(253,121,168,0.7);margin-bottom:10px;">💬 PARA TI HOY</div>
                            <p class="lectura-texto" style="color:rgba(255,255,255,0.8);font-size:0.92rem;line-height:1.75;margin:0;">${d.mensaje}</p>
                        </div>
                    </div>
                </div>
            `;
        };
    });
}

function renderMaterialTeens() {
    const container = document.getElementById('pantalla-estudio');
    const TEMAS = [
        {
            icono: "✝️", titulo: "¿Quién es Jesús?", sub: "La vida, muerte y resurrección de Cristo", color: "#a29bfe",
            contenido: "Jesús no fue solo un maestro o un profeta. Él es el Hijo de Dios que eligió hacerse humano para salvarnos. Vivió sin pecado, murió en la cruz en nuestro lugar y resucitó al tercer día. Hoy intercede por nosotros en el Santuario Celestial. Creer en Él es el comienzo de todo.",
            citas: ["Juan 3:16 — Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito...", "Hebreos 4:15 — Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades.", "1 Corintios 15:3-4 — Cristo murió por nuestros pecados... fue sepultado y resucitó al tercer día."]
        },
        {
            icono: "📖", titulo: "La Biblia — Tu Manual de Vida", sub: "Por qué confiar en la Palabra de Dios", color: "#00cec9",
            contenido: "La Biblia no es un libro religioso cualquiera. Fue escrita por más de 40 autores en 3 idiomas durante 1,500 años — y aun así tiene un solo mensaje: Dios te ama y tiene un plan para salvarte. Sus principios funcionan en cada generación porque vienen del Creador que te diseñó.",
            citas: ["2 Timoteo 3:16 — Toda la Escritura es inspirada por Dios y útil para enseñar...", "Salmo 119:105 — Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", "Isaías 40:8 — Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre."]
        },
        {
            icono: "🕊️", titulo: "El Espíritu Santo — Tu Mejor Aliado", sub: "Quién es y cómo te ayuda cada día", color: "#fd79a8",
            contenido: "El Espíritu Santo no es una fuerza abstracta — es una Persona real que vive en ti cuando aceptas a Cristo. Él te da convicción cuando haces algo malo, te da paz en momentos difíciles y te da dones para servir a otros. Nunca estás solo.",
            citas: ["Juan 16:13 — El Espíritu de verdad os guiará a toda la verdad.", "Romanos 8:26 — El Espíritu nos ayuda en nuestra debilidad.", "Hechos 1:8 — Recibiréis poder cuando haya venido sobre vosotros el Espíritu Santo."]
        },
        {
            icono: "🌅", titulo: "El Sábado — No es una Regla, es un Regalo", sub: "Por qué el séptimo día importa hoy", color: "#feca57",
            contenido: "Dios descansó el séptimo día no porque estuviera cansado — sino para celebrar lo que había creado. El Sábado es un símbolo de relación, no de religión. Es un recordatorio semanal de que eres más que tu productividad. Tienes valor porque fuiste creado, no porque produces.",
            citas: ["Génesis 2:2-3 — Reposó Dios en el día séptimo... y santificó al día séptimo.", "Éxodo 20:8 — Acuérdate del día de reposo para santificarlo.", "Marcos 2:27 — El día de reposo fue hecho para el hombre, no el hombre para el día de reposo."]
        },
        {
            icono: "🏛️", titulo: "La Iglesia — No es Perfecta, pero es de Él", sub: "Por qué necesitas una comunidad de fe", color: "#6c5ce7",
            contenido: "Tal vez has visto personas en la iglesia que te han decepcionado. La iglesia no es un club de perfectos — es un hospital de personas que reconocen que necesitan a Dios. Estar en comunidad te protege, te corrige y te hace crecer. Ningún árbol sobrevive solo.",
            citas: ["Hebreos 10:25 — No dejando de congregarnos, como algunos tienen por costumbre.", "Efesios 4:15-16 — Todo el cuerpo... va creciendo para edificarse en amor.", "Hechos 2:42 — Se mantenían firmes en la doctrina de los apóstoles, en la comunión unos con otros."]
        },
        {
            icono: "🎺", titulo: "La Segunda Venida — La Esperanza Real", sub: "Por qué el regreso de Cristo cambia todo", color: "#e17055",
            contenido: "Vivimos en un mundo lleno de malas noticias. Pero hay una noticia que vence a todas: Jesús viene de vuelta. No como bebé — como Rey. Vendrá a buscar a los que lo esperan. Esa esperanza no es escapismo — es el motor que te da fuerzas para vivir bien hoy.",
            citas: ["Juan 14:3 — Vendré otra vez, y os tomaré a mí mismo.", "1 Tesalonicenses 4:16-17 — El Señor mismo... descenderá del cielo.", "Apocalipsis 22:20 — Sí, vengo en breve. ¡Amén! Ven, Señor Jesús."]
        }
    ];

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#130f2e,#0a0818);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(162,155,254,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdolescentes()" style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.25);color:#a29bfe;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#a29bfe;font-size:0.8rem;letter-spacing:2px;">🏛️ DOCTRINA TEEN</span>
            </div>
            <div style="padding:20px;max-width:650px;margin:0 auto;">
                <p style="color:rgba(255,255,255,0.4);font-size:0.78rem;text-align:center;margin:0 0 20px;">Las verdades fundamentales explicadas para tu generación</p>
                <div style="display:grid;gap:14px;">
                    ${TEMAS.map((t, i) => `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;">
                            <div onclick="toggleMaterialTeen(${i})" style="padding:18px 20px;cursor:pointer;display:flex;align-items:center;gap:14px;">
                                <span style="font-size:1.8rem;">${t.icono}</span>
                                <div style="flex:1;">
                                    <h3 style="color:#fff;font-size:0.9rem;margin:0 0 3px;font-weight:900;">${t.titulo}</h3>
                                    <span style="color:rgba(255,255,255,0.4);font-size:0.72rem;">${t.sub}</span>
                                </div>
                                <span id="mat-arr-${i}" style="color:rgba(255,255,255,0.3);font-size:1.2rem;transition:0.2s;">›</span>
                            </div>
                            <div id="mat-panel-${i}" style="display:none;padding:0 20px 18px;">
                                <p class="lectura-texto" style="color:rgba(255,255,255,0.78);font-size:0.88rem;line-height:1.72;margin:0 0 14px;">${t.contenido}</p>
                                <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:12px;">
                                    <div style="font-size:0.58rem;letter-spacing:2px;color:${t.color};margin-bottom:8px;font-weight:900;">📖 CITAS BÍBLICAS</div>
                                    ${t.citas.map(c => `
                                        <div style="background:rgba(0,0,0,0.2);border-left:2px solid ${t.color};padding:8px 12px;border-radius:0 8px 8px 0;margin-bottom:6px;">
                                            <p class="lectura-texto" style="color:rgba(255,255,255,0.7);font-size:0.78rem;line-height:1.5;margin:0;">${c}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function toggleMaterialTeen(i) {
    const panel = document.getElementById('mat-panel-' + i);
    const arr = document.getElementById('mat-arr-' + i);
    const abierto = panel.style.display !== 'none';
    document.querySelectorAll('[id^="mat-panel-"]').forEach(p => p.style.display = 'none');
    document.querySelectorAll('[id^="mat-arr-"]').forEach(a => a.textContent = '›');
    if (!abierto) { panel.style.display = 'block'; arr.textContent = '↓'; setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100); }
}

function cambiarSeccionTeen(seccion) {
    if (seccion === 'jugar') renderJuegoTeens();
    else if (seccion === 'material') renderMaterialTeens();
}

function renderJuegoTeens() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#1a1000,#2d1f00,#1a1000);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(254,202,87,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdolescentes()" style="background:rgba(254,202,87,0.1);border:1px solid rgba(254,202,87,0.25);color:#feca57;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#feca57;font-size:0.8rem;letter-spacing:2px;">🎮 ZONA DE RETOS</span>
            </div>
            <div style="padding:24px 18px;display:grid;gap:14px;">
                <button onclick="renderVersusLobby()" style="width:100%;padding:28px;background:linear-gradient(135deg,#ff6b6b,#feca57);color:#000;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;">🆚 MODO VERSUS — PVP</button>
                <button onclick="iniciarTriviaRapida()" style="width:100%;padding:28px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:#fff;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;">⚡ TRIVIA RÁPIDA</button>
                <button onclick="renderConfiguradorTrivia()" style="width:100%;padding:28px;background:linear-gradient(135deg,#00b894,#55efc4);color:#000;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;">📚 TRIVIA POR LIBRO</button>
            </div>
        </div>
    `;
}


// Re-incorporamos la lógica de trivia necesaria para que el módulo funcione
function renderConfiguradorTrivia() {
    const area = document.getElementById('pantalla-estudio');
    const grupos = Object.entries(ESTRUCTURA_BIBLIA).map(([test, info]) => ({
        nombre: test, color: info.color, categorias: info.categorias
    }));
    area.innerHTML = `
        <style>
             .libro-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.13);color:#fff;padding:8px 4px;border-radius:10px;cursor:pointer;font-size:0.78rem;min-height:44px;display:flex;align-items:center;justify-content:center;font-weight:700;transition:all 0.2s;text-align:center; }
             .libro-card:active { transform:scale(0.93); }
             .libro-card.sel-verde { border-color:#55efc4;color:#55efc4;background:rgba(85,239,196,0.18); }
             .libro-card.sel-morado { border-color:#a29bfe;color:#a29bfe;background:rgba(162,155,254,0.18); }
             .cat-header { display:flex;padding:12px 14px;cursor:pointer;color:#55efc4;border:1px solid rgba(85,239,196,0.2);background:rgba(85,239,196,0.05);margin-top:8px;border-radius:10px 10px 0 0; }
             .cat-body { display:none;padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-top:none;border-radius:0 0 10px 10px;margin-bottom:8px; }
             .cat-body.open { display:block; }
             .test-tab { padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(0,0,0,0.3);color:rgba(255,255,255,0.7);margin-right:8px;flex:1;font-weight:900;cursor:pointer; }
             .test-tab.active { background:#55efc4;color:#000;border-color:#55efc4; }
        </style>
        <div style="min-height:100vh;background:linear-gradient(170deg,#001a10,#002d1a,#001a10);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(85,239,196,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderJuegoTeens()" style="background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">&#8592; ATRÁS</button>
                <span style="color:#55efc4;font-size:0.8rem;letter-spacing:2px;">&#128218; TRIVIA POR LIBRO</span>
            </div>
            <div style="padding:18px;">
                <div style="text-align:center;margin-bottom:18px;">
                    <div style="color:rgba(255,255,255,0.4);font-size:0.72rem;margin-bottom:4px;">Selecciona un libro y genera preguntas sobre él</div>
                </div>
                <div style="display:flex;margin-bottom:16px;gap:8px;">
                    <button onclick="mostrarTestamentoTrivia('ANTIGUO TESTAMENTO')" class="test-tab active" id="tab-ANTIGUO_TESTAMENTO">ANTIGUO</button>
                    <button onclick="mostrarTestamentoTrivia('NUEVO TESTAMENTO')" class="test-tab" id="tab-NUEVO_TESTAMENTO">NUEVO</button>
                </div>
                <div id="libros-trivia-grid">
                    ${grupos.map((g, gi) => `
                        <div class="testamento-panel" id="panel-${g.nombre.replace(/\s/g, '_')}" style="${gi > 0 ? 'display:none' : ''}">
                            ${Object.entries(g.categorias).map(([cat, libros]) => `
                                <div>
                                    <div class="cat-header" onclick="toggleCat(this)">
                                         <span style="flex:1;font-weight:900;font-size:0.85rem;">${cat.toUpperCase()}</span>
                                         <span style="color:rgba(255,255,255,0.4);">&#9660;</span>
                                    </div>
                                    <div class="cat-body">
                                         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:7px">
                                             ${libros.map(l => `<button id="libtrivia-${l.replace(/\s/g, '_')}" class="libro-card" data-color="${g.color === '#55efc4' ? 'verde' : 'morado'}" onclick="seleccionarLibroTrivia('${l}')">${l}</button>`).join('')}
                                         </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:20px;background:rgba(0,0,0,0.4);padding:18px;border-radius:16px;border:1px solid rgba(85,239,196,0.2);">
                    <div id="libro-sel-label" style="color:#55efc4;font-weight:900;font-size:0.8rem;margin-bottom:10px;min-height:20px;">&#128218; Ninguno seleccionado</div>
                    <select id="trivia-rango" style="width:100%;padding:12px;background:rgba(0,0,0,0.5);color:#fff;border:1px solid rgba(85,239,196,0.4);border-radius:10px;margin-bottom:12px;font-size:0.85rem;">
                        <option value="rapido">RÁPIDA (6 preguntas)</option>
                        <option value="normal" selected>NORMAL (10 preguntas)</option>
                        <option value="completo">COMPLETA (todas las disponibles)</option>
                    </select>
                    <button onclick="comenzarTriviaPorLibro()" style="width:100%;padding:16px;background:linear-gradient(135deg,#00b894,#55efc4);color:#000;font-weight:900;border:none;border-radius:12px;font-size:0.95rem;cursor:pointer;">&#9654; ¡COMENZAR EXAMEN!</button>
                </div>
            </div>
        </div>
    `;
}

function toggleCat(el) { const panel = el.nextElementSibling; panel.classList.toggle('open'); }

function mostrarTestamentoTrivia(test) {
    document.querySelectorAll('.testamento-panel').forEach(p => p.style.display = 'none');
    document.getElementById(`panel-${test.replace(/\s/g, '_')}`).style.display = 'block';
    document.querySelectorAll('.test-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${test.replace(/\s/g, '_')}`).classList.add('active');
}

function seleccionarLibroTrivia(l) {
    document.querySelectorAll('.libro-card').forEach(c => c.classList.remove('sel-verde', 'sel-morado'));
    const btn = document.getElementById(`libtrivia-${l.replace(/\s/g, '_')}`);
    btn.classList.add(btn.dataset.color === 'verde' ? 'sel-verde' : 'sel-morado');
    ultimoLibroTrivia = l;
}

// Base de datos de hechos clave — LOS 66 LIBROS DE LA BIBLIA
const DATOS_LIBRO = {
    // ══════════════ ANTIGUO TESTAMENTO ══════════════
    // PENTATEUCO
    'Génesis':       { autor:'Moisés', tema:'La creación y los orígenes del mundo', personaje:'Abraham', evento:'La creación del mundo en 6 días y el llamado de Abram de Ur', lugar:'Edén, Canaán y Egipto', clave:'El primer hombre, Adán, fue creado del polvo de la tierra' },
    'Éxodo':         { autor:'Moisés', tema:'La liberación de Egipto y la ley de Dios', personaje:'Moisés', evento:'Las 10 plagas, el cruce del Mar Rojo y la entrega de los 10 Mandamientos', lugar:'Egipto y el desierto del Sinaí', clave:'Dios dio los 10 Mandamientos en el Monte Sinaí' },
    'Levítico':      { autor:'Moisés', tema:'La santidad del pueblo de Dios', personaje:'Aarón', evento:'Las leyes de los sacrificios, la pureza ritual y el Día de la Expiación', lugar:'En el desierto cerca del Tabernáculo', clave:'El libro que más detalla el sistema de sacrificios y el sacerdocio' },
    'Números':       { autor:'Moisés', tema:'Los 40 años de peregrinación en el desierto', personaje:'Moisés y Caleb', evento:'El censo del pueblo y la rebelión en Cades-barnea que causó 40 años de desierto', lugar:'El desierto del Sinaí y las llanuras de Moab', clave:'Los israelitas tardaron 40 años en el desierto por su incredulidad' },
    'Deuteronomio':  { autor:'Moisés', tema:'La renovación del pacto con Israel', personaje:'Moisés', evento:'El último discurso de Moisés y su muerte en el Monte Nebo', lugar:'Las llanuras de Moab frente a Canaán', clave:'Deuteronomio significa "segunda ley": Moisés repite la ley a la nueva generación' },
    // HISTÓRICOS
    'Josué':         { autor:'Josué', tema:'La conquista de la tierra prometida', personaje:'Josué', evento:'La milagrosa caída de los muros de Jericó y la conquista de Canaán', lugar:'Canaán (la tierra prometida al este del Jordán)', clave:'Los muros de Jericó cayeron después de que Israel le dio 7 vueltas en silencio' },
    'Jueces':        { autor:'Samuel', tema:'Los ciclos de pecado, opresión y salvación', personaje:'Gedeón, Sansón y Débora', evento:'Los 12 jueces que Dios levantó para liberar a Israel de sus enemigos', lugar:'La tierra de Canaán después de la conquista', clave:'Gedeón venció a 135,000 madianitas con solo 300 soldados' },
    'Rut':           { autor:'Samuel', tema:'La fidelidad y la redención de Dios', personaje:'Rut y Booz', evento:'Rut, la moabita, dejó su pueblo para acompañar a su suegra Noemí hacia Belén', lugar:'Moab y Belén', clave:'Rut es bisabuela del rey David y antepasada de Jesucristo' },
    '1 Samuel':      { autor:'Samuel', tema:'El establecimiento de la monarquía en Israel', personaje:'Samuel, Saúl y David', evento:'La unción de Saúl como primer rey de Israel y el surgimiento de David', lugar:'Israel durante el período de los jueces y primeros reyes', clave:'Saúl fue el primer rey de Israel; David lo sucedió' },
    '2 Samuel':      { autor:'Desconocido', tema:'El reinado glorioso y los fracasos de David', personaje:'David', evento:'David conquistó Jerusalén y pecó con Betsabé, provocando grandes consecuencias', lugar:'Jerusalén y todo Israel', clave:'David es llamado "varón conforme al corazón de Dios"' },
    '1 Reyes':       { autor:'Jeremías (probable)', tema:'La gloria de Salomón y la división del reino', personaje:'Salomón y Elías', evento:'La construcción del Templo de Salomón y la división de Israel en dos reinos', lugar:'Jerusalén e Israel', clave:'El Templo de Salomón tardó 7 años en construirse' },
    '2 Reyes':       { autor:'Jeremías (probable)', tema:'La caída de Israel y Judá ante los imperios', personaje:'Elíseo y Ezequías', evento:'El cautiverio de Israel por Asiria y de Judá por Babilonia', lugar:'Israel, Judá, Asiria y Babilonia', clave:'Eliseo hizo el doble de milagros que Elías' },
    '1 Crónicas':    { autor:'Esdras (probable)', tema:'Las genealogías y el reinado de David', personaje:'David', evento:'Las listas genealógicas de Israel y los preparativos de David para el Templo', lugar:'Israel', clave:'1 Crónicas se centra en el aspecto espiritual del reinado de David' },
    '2 Crónicas':    { autor:'Esdras (probable)', tema:'Los reyes de Judá hasta el cautiverio', personaje:'Salomón y Josías', evento:'Desde la construcción del Templo de Salomón hasta la destrucción de Jerusalén', lugar:'El reino de Judá', clave:'Termina con el decreto de Ciro que permite volver a Jerusalén' },
    'Esdras':        { autor:'Esdras', tema:'El regreso del exilio y la restauración', personaje:'Esdras', evento:'El regreso de los judíos de Babilonia y la reconstrucción del Templo bajo Ciro', lugar:'Babilonia y Jerusalén', clave:'Esdras fue sacerdote y escriba que enseñó la ley de Moisés al pueblo' },
    'Nehemías':      { autor:'Nehemías', tema:'La reconstrucción del muro de Jerusalén', personaje:'Nehemías', evento:'La reconstrucción del muro de Jerusalén en solo 52 días pese a la oposición', lugar:'Jerusalén', clave:'El muro de Jerusalén fue reconstruido en tiempo récord de 52 días' },
    'Ester':         { autor:'Mardoqueo (probable)', tema:'La providencia de Dios protegiendo a su pueblo', personaje:'Ester y Mardoqueo', evento:'Ester salvó al pueblo judío del genocidio planeado por Amán', lugar:'El palacio de Susa en Persia', clave:'Es el único libro bíblico que no menciona el nombre de Dios directamente' },
    // POÉTICOS
    'Job':           { autor:'Desconocido', tema:'El sufrimiento del justo y la soberanía de Dios', personaje:'Job', evento:'Job perdió todo (familia, riqueza y salud) pero mantuvo su fe en Dios', lugar:'La tierra de Uz', clave:'Job 19:25 dice: "Yo sé que mi Redentor vive"' },
    'Salmos':        { autor:'David y otros', tema:'La alabanza, oración y adoración a Dios', personaje:'David', evento:'150 poemas e himnos que expresan toda la gama de emociones del pueblo de Dios', lugar:'Israel en diversas épocas', clave:'El Salmo 119 es el capítulo más largo de toda la Biblia (176 versículos)' },
    'Proverbios':    { autor:'Salomón', tema:'La sabiduría práctica para vivir en el temor de Dios', personaje:'Salomón', evento:'Colección de dichos y enseñanzas sabias sobre la vida cotidiana', lugar:'Israel', clave:'Proverbios 3:5 dice: "Confía en el Señor con todo tu corazón"' },
    'Eclesiastés':   { autor:'Salomón', tema:'La vanidad de la vida sin Dios', personaje:'El Predicador (Salomón)', evento:'Salomón reflexiona sobre la vida y concluye que solo Dios da sentido real', lugar:'Israel', clave:'La frase "vanidad de vanidades" aparece 38 veces en este libro' },
    'Cantares':      { autor:'Salomón', tema:'El amor puro y el romance del matrimonio', personaje:'Salomón y la Sulamita', evento:'Un poema lírico sobre el amor entre el amado y la amada', lugar:'Israel', clave:'También llamado "Cantar de los Cantares" o "El mejor de los poemas"' },
    // PROFETAS MAYORES
    'Isaías':        { autor:'Isaías', tema:'La redención de Israel y la venida del Mesías', personaje:'Isaías', evento:'Las 66 capítulos que van del juicio a la restauración y el Siervo Sufriente', lugar:'Judá', clave:'Isaías 53 describe la pasión de Cristo 700 años antes de que ocurriera' },
    'Jeremías':      { autor:'Jeremías', tema:'El juicio sobre Judá y la esperanza de restauración', personaje:'Jeremías', evento:'Profetizó 70 años de cautiverio babilónico y prometió el nuevo pacto', lugar:'Judá y Egipto', clave:'Jeremías es conocido como "el profeta llorón" por su angustia por Israel' },
    'Lamentaciones': { autor:'Jeremías', tema:'El lamento por la destrucción de Jerusalén', personaje:'Jeremías', evento:'Cinco poemas de luto por la caída de Jerusalén ante Babilonia', lugar:'Jerusalén destruida', clave:'Es un acróstico hebreo: cada versículo comienza con una letra del alefato' },
    'Ezequiel':      { autor:'Ezequiel', tema:'La gloria de Dios, el juicio y la restauración de Israel', personaje:'Ezequiel', evento:'Las visiones del carro de la gloria de Dios y el valle de los huesos secos', lugar:'Babilonia (durante el exilio)', clave:'Ezequiel profetizó sobre el valle de los huesos secos que representaba la restauración de Israel' },
    'Daniel':        { autor:'Daniel', tema:'La fidelidad en cautiverio y las profecías del tiempo final', personaje:'Daniel', evento:'El foso de los leones, el horno ardiente y las visiones proféticas de los reinos mundiales', lugar:'Babilonia', clave:'Daniel 8:14 profetiza los 2300 días y el inicio del juicio investigador' },
    // PROFETAS MENORES
    'Oseas':         { autor:'Oseas', tema:'El amor fiel de Dios a su pueblo infiel', personaje:'Oseas y Gomer', evento:'Oseas casó con una esposa infiel como símbolo del amor de Dios hacia Israel', lugar:'Israel del norte', clave:'El libro usa el matrimonio de Oseas como metáfora del amor de Dios' },
    'Joel':          { autor:'Joel', tema:'El arrepentimiento y el derramamiento del Espíritu Santo', personaje:'Joel', evento:'La plaga de langostas como imagen del juicio y la promesa del Espíritu Santo', lugar:'Judá', clave:'Joel 2:28: "Derramaré mi Espíritu sobre toda carne" — citado en Pentecostés' },
    'Amós':          { autor:'Amós', tema:'La justicia social y el juicio sobre Israel', personaje:'Amós', evento:'El profeta pastor denunció la injusticia social y la hipocresía religiosa', lugar:'Israel del norte (Samaria)', clave:'Amós era pastor y cultivador de higos antes de ser profeta' },
    'Abdías':        { autor:'Abdías', tema:'El juicio sobre Edom por traicionar a Israel', personaje:'Abdías', evento:'Dios anunció el castigo de Edom por celebrar la caída de Jerusalén', lugar:'Edom (Esaú)', clave:'Es el libro más corto del Antiguo Testamento con solo 21 versículos' },
    'Jonás':         { autor:'Jonás', tema:'La misericordia de Dios para todos los pueblos', personaje:'Jonás', evento:'Jonás huyó de Dios, fue tragado por un gran pez, y luego predicó en Nínive', lugar:'Nínive y el mar Mediterráneo', clave:'Jonás estuvo 3 días en el vientre del pez, prefigurando la resurrección de Cristo' },
    'Miqueas':       { autor:'Miqueas', tema:'La justicia, el arrepentimiento y la promesa del Mesías', personaje:'Miqueas', evento:'Profetizó el nacimiento del Mesías en Belén 700 años antes', lugar:'Judá', clave:'Miqueas 5:2 profetizó que el Mesías nacería en Belén de Judá' },
    'Nahúm':         { autor:'Nahúm', tema:'El juicio final y destrucción de Nínive', personaje:'Nahúm', evento:'Profetizó la caída total de Nínive por su maldad y crueldad', lugar:'Nínive (Asiria)', clave:'Complementa a Jonás: Nínive se arrepintió con Jonás pero luego volvió al mal' },
    'Habacuc':       { autor:'Habacuc', tema:'La fe en Dios cuando la justicia parece ausente', personaje:'Habacuc', evento:'El profeta dialogó con Dios cuestionando por qué permite el mal en Israel', lugar:'Judá', clave:'Habacuc 2:4: "El justo por su fe vivirá" — citado 3 veces en el Nuevo Testamento' },
    'Sofonías':      { autor:'Sofonías', tema:'El día del juicio y la restauración del remanente', personaje:'Sofonías', evento:'Profetizó el juicio sobre Judá y las naciones y la restauración del remanente fiel', lugar:'Judá', clave:'Sofonías fue bisnieto del rey Ezequías' },
    'Hageo':         { autor:'Hageo', tema:'La reconstrucción del Templo después del exilio', personaje:'Hageo y Zorobabel', evento:'Hageo motivó al pueblo a reconstruir el Templo de Jerusalén tras el regreso del exilio', lugar:'Jerusalén (después del exilio)', clave:'Hageo es uno de los libros más cortos del A.T. con solo 2 capítulos' },
    'Zacarías':      { autor:'Zacarías', tema:'Las visiones y profecías sobre el Mesías y el tiempo final', personaje:'Zacarías', evento:'8 visiones nocturnas y profecías sobre el Mesías, incluyendo su entrada en burro', lugar:'Jerusalén (después del exilio)', clave:'Zacarías 9:9 profetizó que el Mesías entraría a Jerusalén montado en un burro' },
    'Malaquías':     { autor:'Malaquías', tema:'El último llamado al arrepentimiento antes del silencio profético', personaje:'Malaquías', evento:'Dios confronta a Israel por diezmos, matrimonios mixtos y sacerdocio corrupto', lugar:'Judá', clave:'Es el último libro del A.T.; después hubo 400 años de silencio profético' },

    // ══════════════ NUEVO TESTAMENTO ══════════════
    // EVANGELIOS
    'Mateo':         { autor:'Mateo (apóstol)', tema:'Jesús como el Mesías prometido al pueblo judío', personaje:'Jesús', evento:'El Sermón del Monte con las Bienaventuranzas y el ministerio de Jesús en Galilea', lugar:'Israel (principalmente Galilea y Judea)', clave:'Mateo usa la frase "para que se cumpliera la profecía" más de 10 veces' },
    'Marcos':        { autor:'Marcos (Juan Marcos)', tema:'Jesús como el Siervo poderoso y activo', personaje:'Jesús', evento:'Los numerosos milagros y sanidades de Jesús, descritos de forma dinámica', lugar:'Israel', clave:'Marcos es el Evangelio más corto y usa la palabra "enseguida/luego" 42 veces' },
    'Lucas':         { autor:'Lucas (médico)', tema:'Jesús como el Salvador universal para todo ser humano', personaje:'Jesús', evento:'El nacimiento de Jesús y su ministerio de compasión especial hacia los pobres', lugar:'Palestina', clave:'Lucas es el único Evangelio que narra los 12 años de Jesús en el Templo' },
    'Juan':          { autor:'Juan el apóstol', tema:'Jesús como el Hijo eterno de Dios encarnado', personaje:'Jesús', evento:'Las 7 señales de Jesús que prueban su divinidad y los discursos del Aposento Alto', lugar:'Israel', clave:'Juan es el único evangelio que no incluye el bautismo ni la transfiguración de Jesús' },
    // HISTÓRICOS NT
    'Hechos':        { autor:'Lucas', tema:'El nacimiento y expansión de la iglesia cristiana', personaje:'Pedro y Pablo', evento:'El Pentecostés y los tres viajes misioneros de Pablo hasta Roma', lugar:'Desde Jerusalén hasta Roma', clave:'En Hechos 11:26 se usó por primera vez el nombre "cristiano" en Antioquía' },
    // EPÍSTOLAS PAULINAS
    'Romanos':       { autor:'Pablo', tema:'La justificación por la fe en Jesucristo', personaje:'Pablo', evento:'La explicación más completa del evangelio: salvación por gracia a través de la fe', lugar:'Escrito desde Corinto para la iglesia en Roma', clave:'Romanos 1:16-17 contiene el texto que transformó a Martín Lutero' },
    '1 Corintios':   { autor:'Pablo', tema:'La unidad y los dones espirituales en la iglesia', personaje:'Pablo', evento:'Pablo corrige divisiones y desórdenes en la iglesia de Corinto', lugar:'Escrito desde Éfeso para Corinto', clave:'1 Corintios 13 es el capítulo del amor; el 15 explica la resurrección' },
    '2 Corintios':   { autor:'Pablo', tema:'La autoridad apostólica y el poder en la debilidad', personaje:'Pablo', evento:'Pablo defiende su ministerio y habla de las pruebas que ha sufrido por Cristo', lugar:'Escrito desde Macedonia para Corinto', clave:'Pablo menciona que fue arrebatado al tercer cielo en 2 Corintios 12' },
    'Gálatas':       { autor:'Pablo', tema:'La libertad de la gracia frente al legalismo', personaje:'Pablo', evento:'Pablo reprende a los gálatas por volver a las obras de la ley y apartarse de la gracia', lugar:'Escrito para las iglesias de Galacia', clave:'Lutero llamó a Gálatas "su Epístola" porque lo liberó del legalismo' },
    'Efesios':       { autor:'Pablo', tema:'La iglesia como cuerpo de Cristo y la armadura de Dios', personaje:'Pablo', evento:'La descripción de la iglesia y el llamado a ponerse la armadura de Dios', lugar:'Escrito desde la prisión para Éfeso', clave:'Efesios 6:11-17 describe los 6 componentes de la armadura espiritual' },
    'Filipenses':    { autor:'Pablo', tema:'El gozo en Cristo a pesar de las circunstancias', personaje:'Pablo', evento:'Pablo escribe desde la prisión una carta llena de gozo y gratitud', lugar:'Escrito desde la prisión romana para Filipos', clave:'Es la carta más alegre de Pablo aunque fue escrita desde la cárcel' },
    'Colosenses':    { autor:'Pablo', tema:'La supremacía de Cristo sobre todo', personaje:'Pablo', evento:'Pablo exalta a Cristo como la cabeza de toda la creación y la iglesia', lugar:'Escrito desde la prisión romana para Colosas', clave:'Colosenses 1:16-17 dice que todo fue creado por Cristo y para Cristo' },
    '1 Tesalonicenses':{ autor:'Pablo', tema:'La segunda venida de Cristo y la vida cristiana', personaje:'Pablo', evento:'Pablo anima a la joven iglesia de Tesalónica y explica la segunda venida', lugar:'Escrito desde Corinto para Tesalónica', clave:'1 Tesalonicenses 4:16-17 describe la resurrección en la segunda venida' },
    '2 Tesalonicenses':{ autor:'Pablo', tema:'El día del Señor y la apostasía final', personaje:'Pablo', evento:'Pablo corrige malentendidos sobre la segunda venida y el hombre de pecado', lugar:'Escrito desde Corinto para Tesalónica', clave:'2 Tesalonicenses 2 habla del "hombre de pecado" que se opone a Dios' },
    '1 Timoteo':     { autor:'Pablo', tema:'La organización y el liderazgo de la iglesia local', personaje:'Pablo y Timoteo', evento:'Pablo instruye a Timoteo sobre los líderes, la doctrina y el culto en la iglesia', lugar:'Escrito desde Macedonia para Éfeso', clave:'Pablo llama a Timoteo "verdadero hijo en la fe"' },
    '2 Timoteo':     { autor:'Pablo', tema:'La fidelidad hasta el final y el legado de la fe', personaje:'Pablo y Timoteo', evento:'La última carta de Pablo desde la prisión antes de su martirio', lugar:'Escrito desde Roma para Timoteo', clave:'2 Timoteo 3:16 dice que "toda la Escritura es inspirada por Dios"' },
    'Tito':          { autor:'Pablo', tema:'El orden en la iglesia y las buenas obras', personaje:'Pablo y Tito', evento:'Pablo instruye a Tito sobre cómo establecer la iglesia en Creta', lugar:'Escrito para Tito en la isla de Creta', clave:'Pablo describe a los cretenses y cómo Tito debe corregirlos y organizarlos' },
    'Filemón':       { autor:'Pablo', tema:'El perdón y la igualdad en Cristo', personaje:'Pablo, Filemón y Onésimo', evento:'Pablo pide a Filemón que perdone y reciba como hermano a su esclavo Onésimo', lugar:'Escrito desde la prisión romana a Filemón en Colosas', clave:'Es la carta más personal y más corta de Pablo (25 versículos)' },
    // EPÍSTOLA GENERAL
    'Hebreos':       { autor:'Desconocido (Pablo o Apolos)', tema:'Jesús como el Sumo Sacerdote superior al sistema levítico', personaje:'Jesús', evento:'La demostración de que Jesús es superior a los ángeles, a Moisés y al sacerdocio levítico', lugar:'Escrito para judíos cristianos', clave:'Hebreos 11 es el "capítulo de los héroes de la fe"' },
    'Santiago':      { autor:'Santiago (hermano de Jesús)', tema:'La fe que se demuestra con obras', personaje:'Santiago', evento:'Santiago enseña que una fe sin obras está muerta', lugar:'Escrito para los judíos dispersos', clave:'Santiago 2:26: "la fe sin obras es muerta"' },
    '1 Pedro':       { autor:'Pedro', tema:'El sufrimiento por Cristo y la esperanza viva', personaje:'Pedro', evento:'Pedro alienta a los creyentes que sufren persecución a mantenerse firmes', lugar:'Escrito desde Roma para los creyentes dispersos en Asia Menor', clave:'1 Pedro 2:9 llama a los creyentes "real sacerdocio y nación santa"' },
    '2 Pedro':       { autor:'Pedro', tema:'La falsa doctrina y la promesa del regreso de Cristo', personaje:'Pedro', evento:'Pedro advierte sobre los falsos profetas y confirma la segunda venida de Cristo', lugar:'Escrito antes de la muerte de Pedro para la iglesia', clave:'2 Pedro 3:8: "Para el Señor un día es como mil años"' },
    '1 Juan':        { autor:'Juan el apóstol', tema:'El amor, la comunión y el conocimiento de Dios verdadero', personaje:'Juan', evento:'Juan enseña sobre el amor de Dios y las marcas del verdadero creyente', lugar:'Escrito para la iglesia general', clave:'1 Juan 4:8: "Dios es amor" — aparece dos veces en este libro' },
    '2 Juan':        { autor:'Juan el apóstol', tema:'La advertencia contra los falsos maestros', personaje:'Juan y la "señora elegida"', evento:'Juan advierte sobre los que niegan que Jesús vino en carne humana', lugar:'Escrito para una iglesia local específica', clave:'Es una de las cartas más cortas de la Biblia (13 versículos)' },
    '3 Juan':        { autor:'Juan el apóstol', tema:'La hospitalidad cristiana y el liderazgo fiel', personaje:'Juan y Gayo', evento:'Juan alaba a Gayo por su hospitalidad y condena el orgullo de Diótrefes', lugar:'Escrito para Gayo', clave:'Es el libro más corto del Nuevo Testamento con 14 versículos' },
    'Judas':         { autor:'Judas (hermano de Jesús)', tema:'La defensa de la fe frente a los falsos maestros', personaje:'Judas', evento:'Judas urge a los creyentes a "contender ardientemente por la fe"', lugar:'Escrito para la iglesia general', clave:'Judas cita al libro no bíblico de Enoc en los versículos 14-15' },
    'Apocalipsis':   { autor:'Juan el apóstol', tema:'La victoria final de Cristo sobre el mal y el mundo nuevo', personaje:'Juan y Jesús resucitado', evento:'Las visiones de los 7 sellos, 7 trompetas, la bestia y el regreso glorioso de Cristo', lugar:'Recibido en la isla de Patmos', clave:'Apocalipsis 1:3 promete bendición especial al que lee y guarda este libro' }
};

// Función que mezcla las opciones de una pregunta para que la correcta no sea siempre la opción A
function mezclarOpciones(q) {
    const correcta = q.o[q.c];
    const mezcladas = [...q.o].sort(() => 0.5 - Math.random());
    return { ...q, o: mezcladas, c: mezcladas.indexOf(correcta) };
}

async function comenzarTriviaPorLibro() {
    if (!ultimoLibroTrivia) return mostrarToast('⚠️ Selecciona un libro primero');
    const rango = document.getElementById('trivia-rango').value;
    const libro = ultimoLibroTrivia;

    // 1. Buscar en los bancos de trivia preguntas que MENCIONEN el libro
    const todosLosBancos = { ...TRIVIA_BANCO_P1, ...TRIVIA_BANCO_P2, ...TRIVIA_BANCO_P3 };
    const relacionadas = [];
    Object.values(todosLosBancos).forEach(cat => {
        ['facil', 'intermedio', 'avanzado'].forEach(nivel => {
            if (cat[nivel]) {
                cat[nivel].forEach(q => {
                    if (q.p.includes(libro) || (q.exp && q.exp.includes(libro))) {
                        relacionadas.push(mezclarOpciones(q));
                    }
                });
            }
        });
    });

    // 2. Generar preguntas específicas del libro con opciones MEZCLADAS
    const datos = DATOS_LIBRO[libro];
    const especificas = datos ? [
        mezclarOpciones({ p: `¿Cuál es el tema central del libro de ${libro}?`,      o: [datos.tema,      'Las genealogías de Israel',       'Las leyes del sacerdocio'], c: 0 }),
        mezclarOpciones({ p: `¿Quién es el personaje principal del libro de ${libro}?`, o: [datos.personaje, 'El rey Herodes',                   'Judas Iscariote'],          c: 0 }),
        mezclarOpciones({ p: `¿Dónde transcurre principalmente el libro de ${libro}?`, o: [datos.lugar,     'En Roma bajo el Imperio',          'En el Monte Sinaí'],        c: 0 }),
        mezclarOpciones({ p: `¿Cuál es el evento más importante del libro de ${libro}?`, o: [datos.evento,    'El diluvio universal de Noé',       'La resurrección de Lázaro'],c: 0 }),
        mezclarOpciones({ p: `¿Quién escribió el libro de ${libro}?`,                  o: [datos.autor,     'El rey Herodes el Grande',         'Poncio Pilato'],            c: 0 }),
        mezclarOpciones({ p: `¿Cuál es un dato clave sobre el libro de ${libro}?`,    o: [datos.clave,     'Es el libro más corto de la Biblia','Fue escrito en latín'],     c: 0 }),
        mezclarOpciones({ p: `El libro de ${libro} nos enseña principalmente sobre...`, o: [datos.tema,     'El Imperio Romano en el siglo I',   'La historia de Egipto'],   c: 0 })
    ] : [
        mezclarOpciones({ p: `¿A qué testamento pertenece el libro de ${libro}?`,  o: ['Al Antiguo Testamento', 'Al Nuevo Testamento', 'A los apócrifos'], c: 0 }),
        mezclarOpciones({ p: `¿Para qué nos sirve estudiar el libro de ${libro}?`, o: ['Para conocer la voluntad de Dios', 'Para historia del Imperio Romano', 'Para mitología judía'], c: 0 })
    ];

    // 3. Combinar: primero las del banco (más precisas), luego las generadas
    let bancoPrincipal = [...relacionadas, ...especificas];
    bancoPrincipal = bancoPrincipal.sort(() => 0.5 - Math.random());

    const total = rango === 'rapido' ? Math.min(6, bancoPrincipal.length) :
                  rango === 'normal' ? Math.min(10, bancoPrincipal.length) :
                  bancoPrincipal.length;

    if (total < 1) {
        mostrarToast(`⚠️ Sin preguntas para ${libro}. Intenta otro.`);
        return;
    }

    juegoState = { preguntaIdx: 0, vidas: 3, puntos: 0, total, preguntas: bancoPrincipal.slice(0, total) };
    mostrarPantallaJuego();
}



// ==========================================
// MOTOR DEL JUEGO — Trivia por Libro
// ==========================================
function mostrarPantallaJuego() {
    const area = document.getElementById('pantalla-estudio');
    area.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#001a10,#002d1a,#001a10);font-family:'Segoe UI',sans-serif;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(85,239,196,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderConfiguradorTrivia()" style="background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);color:#55efc4;padding:7px 12px;border-radius:8px;cursor:pointer;font-size:0.75rem;font-weight:700;">&#8592; LIBROS</button>
                <div style="text-align:center;">
                    <div id="progreso-txt" style="color:#55efc4;font-size:0.65rem;letter-spacing:2px;">PREGUNTA 1 DE ${juegoState.total}</div>
                </div>
                <div id="vidas-txt" style="font-size:1.1rem;">&#10084;&#65039;&#10084;&#65039;&#10084;&#65039;</div>
            </div>
            <div style="padding:20px;max-width:640px;margin:0 auto;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <div style="background:rgba(85,239,196,0.1);border:1px solid rgba(85,239,196,0.25);border-radius:8px;padding:6px 12px;">
                        <span id="score-txt" style="color:#55efc4;font-weight:900;font-size:0.85rem;">0 PTS</span>
                    </div>
                    <div style="color:rgba(255,255,255,0.35);font-size:0.7rem;">&#128218; ${ultimoLibroTrivia || 'Biblia'}</div>
                </div>
                <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(85,239,196,0.2);border-radius:16px;padding:24px;margin-bottom:20px;">
                    <h3 id="pregunta-text" style="color:#fff;font-size:1.1rem;margin:0;line-height:1.6;text-align:center;"></h3>
                </div>
                <div id="opciones-grid" style="display:grid;gap:10px;"></div>
                <div id="resultado-panel" style="display:none;margin-top:16px;background:rgba(0,0,0,0.4);border-left:4px solid #55efc4;padding:16px;border-radius:12px;">
                    <div id="resultado-texto" style="color:rgba(255,255,255,0.85);font-size:0.9rem;margin-bottom:12px;"></div>
                    <button onclick="siguientePregunta()" style="width:100%;padding:14px;background:linear-gradient(135deg,#00b894,#55efc4);color:#000;border:none;border-radius:10px;font-weight:900;cursor:pointer;">SIGUIENTE &#8594;</button>
                </div>
            </div>
        </div>
    `;
    cargarPreguntaActual();
}

function cargarPreguntaActual() {
    const p = juegoState.preguntas[juegoState.preguntaIdx];
    if (!p) return finalizarJuego();

    document.getElementById('progreso-txt').innerText = `PREGUNTA ${juegoState.preguntaIdx + 1} DE ${juegoState.total}`;
    document.getElementById('pregunta-text').innerText = p.p;
    document.getElementById('resultado-panel').style.display = 'none';

    const grid = document.getElementById('opciones-grid');
    const letras = ['A', 'B', 'C', 'D'];
    grid.innerHTML = p.o.map((op, i) => `
        <button onclick="verificarRespuesta(${i})"
            style="background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.12);color:#fff;padding:16px 18px;border-radius:14px;font-size:0.9rem;font-weight:600;text-align:left;display:flex;align-items:center;gap:12px;cursor:pointer;transition:0.2s;">
            <span style="background:rgba(255,255,255,0.1);min-width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:900;">${letras[i]}</span>
            ${op}
        </button>
    `).join('');
}

function verificarRespuesta(idx) {
    const p = juegoState.preguntas[juegoState.preguntaIdx];
    const botones = document.querySelectorAll('#opciones-grid button');
    botones.forEach(b => b.style.pointerEvents = 'none');

    const esCorrecta = idx === p.c;
    if (esCorrecta) {
        juegoState.puntos += 100;
        botones[idx].style.background = 'rgba(85,239,196,0.3)';
        botones[idx].style.borderColor = '#55efc4';
        document.getElementById('resultado-texto').innerHTML = '&#9989; ¡CORRECTO! +100 puntos';
        document.getElementById('resultado-panel').style.borderLeftColor = '#55efc4';
        mostrarToast('¡Correcto! 🌟');
    } else {
        juegoState.vidas--;
        botones[idx].style.background = 'rgba(255,107,107,0.3)';
        botones[idx].style.borderColor = '#ff6b6b';
        botones[p.c].style.background = 'rgba(85,239,196,0.15)';
        botones[p.c].style.borderColor = '#55efc4';
        document.getElementById('resultado-texto').innerHTML = `❌ Incorrecto. La respuesta era: <strong style="color:#55efc4">${p.o[p.c]}</strong>`;
        document.getElementById('resultado-panel').style.borderLeftColor = '#ff6b6b';
        mostrarToast('Casi... 😔');
    }

    document.getElementById('score-txt').innerText = `${juegoState.puntos} PTS`;
    document.getElementById('vidas-txt').innerText = '❤️'.repeat(Math.max(0, juegoState.vidas));
    document.getElementById('resultado-panel').style.display = 'block';

    if (juegoState.vidas <= 0) {
        document.querySelector('#resultado-panel button').textContent = 'VER RESULTADOS 🏆';
        document.querySelector('#resultado-panel button').onclick = finalizarJuego;
    }
}

function siguientePregunta() {
    juegoState.preguntaIdx++;
    if (juegoState.preguntaIdx >= juegoState.total || juegoState.vidas <= 0) {
        finalizarJuego();
    } else {
        cargarPreguntaActual();
    }
}

function finalizarJuego() {
    const area = document.getElementById('pantalla-estudio');
    const pct = Math.round((juegoState.puntos / (juegoState.total * 100)) * 100);
    const medalla = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '📚';
    const msg = pct >= 90 ? '¡EXPERTO BÍBLICO!' : pct >= 70 ? '¡Casi experto!' : pct >= 50 ? '¡Buen intento!' : '¡Sigue estudiando!';
    area.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#001a10,#002d1a,#001a10);font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center;">
            <div style="font-size:4rem;margin-bottom:12px;">${medalla}</div>
            <h1 style="color:#55efc4;font-size:1.6rem;font-weight:900;margin:0 0 6px;">${msg}</h1>
            <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;margin-bottom:28px;">Libro: ${ultimoLibroTrivia || 'Biblia'}</p>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(85,239,196,0.3);border-radius:20px;padding:28px;width:100%;max-width:320px;margin-bottom:24px;">
                <div style="font-size:3rem;color:#55efc4;font-weight:900;font-family:monospace;">${juegoState.puntos}</div>
                <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;letter-spacing:3px;margin-bottom:16px;">PUNTOS TOTALES</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                    <div style="background:rgba(85,239,196,0.08);border-radius:10px;padding:10px;">
                        <div style="color:#55efc4;font-size:1.2rem;font-weight:900;">${juegoState.preguntaIdx}</div>
                        <div style="color:rgba(255,255,255,0.4);font-size:0.65rem;">RESPONDIDAS</div>
                    </div>
                    <div style="background:rgba(255,107,107,0.08);border-radius:10px;padding:10px;">
                        <div style="color:#ff6b6b;font-size:1.2rem;font-weight:900;">${3 - Math.max(0, juegoState.vidas)}</div>
                        <div style="color:rgba(255,255,255,0.4);font-size:0.65rem;">ERRORES</div>
                    </div>
                </div>
            </div>
            <button onclick="renderConfiguradorTrivia()" style="width:100%;max-width:320px;padding:16px;background:linear-gradient(135deg,#00b894,#55efc4);color:#000;border:none;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.95rem;margin-bottom:10px;">&#128218; ELEGIR OTRO LIBRO</button>
            <button onclick="renderJuegoTeens()" style="width:100%;max-width:320px;padding:14px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:14px;cursor:pointer;font-size:0.85rem;">&#127918; ZONA DE RETOS</button>
        </div>
    `;
}

// ==========================================
// --- NUEVO SISTEMA MEGA TRIVIA ---
let estadoMegaTrivia = {
    categoria: '',
    nivel: '',
    preguntas: [],
    indiceActual: 0,
    puntos: 0,
    vidas: 3,
    errores: 0
};

function renderConfiguracionMegaTrivia() {
    const area = document.getElementById('pantalla-estudio');
    const todosLosBancos = { ...TRIVIA_BANCO_P1, ...TRIVIA_BANCO_P2, ...TRIVIA_BANCO_P3 };
    const categorias = Object.keys(todosLosBancos);

    // Mapa de iconos y colores por categoría
    const CATMETA = {
        'Personajes':          { icon: '👤', color: '#feca57', bg: 'rgba(254,202,87,0.15)',  desc: '14 héroes de la Biblia' },
        'Historias':           { icon: '📜', color: '#a29bfe', bg: 'rgba(162,155,254,0.15)', desc: 'Eventos que cambiaron el mundo' },
        'Milagros':            { icon: '✨', color: '#55efc4', bg: 'rgba(85,239,196,0.15)',  desc: 'Señales y maravillas divinas' },
        'Profecías':           { icon: '🔮', color: '#e17055', bg: 'rgba(225,112,85,0.15)',  desc: 'Palabras que se cumplieron' },
        'Geografía Bíblica':   { icon: '🗺️', color: '#00cec9', bg: 'rgba(0,206,201,0.15)', desc: 'Tierras y ciudades sagradas' },
        'Números y Datos':     { icon: '🔢', color: '#48dbfb', bg: 'rgba(72,219,251,0.15)', desc: 'Cifras y datos memorables' },
        '¿Quién lo dijo?':    { icon: '💬', color: '#fd79a8', bg: 'rgba(253,121,168,0.15)', desc: 'Identifica las voces bíblicas' },
        'Doctrina Adventista': { icon: '🏛️', color: '#6c5ce7', bg: 'rgba(108,92,231,0.15)', desc: 'Fe que mueve montañas' },
        'Historia Adventista': { icon: '⛪', color: '#ff6b6b', bg: 'rgba(255,107,107,0.15)', desc: 'Pioneros y momentos clave' }
    };

    area.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#0a0818);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(162,155,254,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderJuegoTeens()" style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.25);color:#a29bfe;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#a29bfe;font-size:0.8rem;letter-spacing:2px;">⚡ MEGA TRIVIA BÍBLICA</span>
            </div>

            <div style="padding:20px;max-width:650px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:22px;">
                    <h2 style="color:#fff;font-size:1.1rem;font-weight:900;margin:0 0 4px;">1. ELIGE UNA CATEGORÍA</h2>
                    <p style="color:rgba(255,255,255,0.35);font-size:0.72rem;margin:0;">360 preguntas · 3 niveles de dificultad</p>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:28px;">
                    ${categorias.map(cat => {
                        const m = CATMETA[cat] || { icon: '📖', color: '#fff', bg: 'rgba(255,255,255,0.08)', desc: '' };
                        return `<button onclick="seleccionarCatMegaTrivia(this, '${cat.replace(/'/g,"\\'")}')"
                            class="btn-cat-mega"
                            style="background:${m.bg};border:2px solid ${m.color}33;border-radius:16px;padding:18px 12px;cursor:pointer;text-align:center;transition:0.25s;">
                            <div style="font-size:2rem;margin-bottom:6px;">${m.icon}</div>
                            <div style="color:${m.color};font-weight:900;font-size:0.82rem;margin-bottom:3px;line-height:1.2;">${cat}</div>
                            <div style="color:rgba(255,255,255,0.4);font-size:0.65rem;">${m.desc}</div>
                        </button>`;
                    }).join('')}
                </div>

                <div id="niveles-panel" style="display:none;animation:fadeIn 0.3s forwards;">
                    <h2 style="color:#fff;text-align:center;font-size:1rem;margin-bottom:16px;font-weight:900;">2. ELIGE TU NIVEL</h2>
                    <div style="display:grid;gap:10px;">
                        <button onclick="iniciarMegaTrivia('facil')" style="background:linear-gradient(135deg,#00b894,#55efc4);color:#000;border:none;padding:18px;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.95rem;display:flex;align-items:center;justify-content:center;gap:10px;">🟢 NIVEL FÁCIL — Solo los básicos</button>
                        <button onclick="iniciarMegaTrivia('intermedio')" style="background:linear-gradient(135deg,#f39c12,#f1c40f);color:#000;border:none;padding:18px;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.95rem;display:flex;align-items:center;justify-content:center;gap:10px;">🟡 NIVEL INTERMEDIO — Vidas en juego</button>
                        <button onclick="iniciarMegaTrivia('avanzado')" style="background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;border:none;padding:18px;border-radius:14px;cursor:pointer;font-weight:900;font-size:0.95rem;display:flex;align-items:center;justify-content:center;gap:10px;">🔴 NIVEL AVANZADO — Solo expertos 🔥</button>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
            .btn-cat-mega.activa { transform:scale(0.97); filter:brightness(1.3); border-width:3px !important; }
        </style>
    `;
}

function seleccionarCatMegaTrivia(btn, cat) {
    document.querySelectorAll('.btn-cat-mega').forEach(b => b.classList.remove('activa'));
    btn.classList.add('activa');
    estadoMegaTrivia.categoria = cat;
    document.getElementById('niveles-panel').style.display = 'block';
    document.getElementById('niveles-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function iniciarMegaTrivia(nivel) {
    const todosLosBancos = { ...TRIVIA_BANCO_P1, ...TRIVIA_BANCO_P2, ...TRIVIA_BANCO_P3 };
    const bancoCategoria = todosLosBancos[estadoMegaTrivia.categoria][nivel];

    // Aleatorizar hasta 12 preguntas
    let mezcladas = [...bancoCategoria].sort(() => 0.5 - Math.random()).slice(0, 12);

    estadoMegaTrivia.nivel = nivel;
    estadoMegaTrivia.preguntas = mezcladas;
    estadoMegaTrivia.indiceActual = 0;
    estadoMegaTrivia.puntos = 0;
    estadoMegaTrivia.vidas = 3;
    estadoMegaTrivia.errores = 0;

    mostrarToast(`Generando trivia: ${estadoMegaTrivia.categoria} (${nivel.toUpperCase()})`);
    renderPantallaMegaTrivia();
}

function renderPantallaMegaTrivia() {
    const p = estadoMegaTrivia.preguntas[estadoMegaTrivia.indiceActual];
    if (!p) return finalizarMegaTrivia();

    const area = document.getElementById('pantalla-estudio');

    // Opciones desordenadas para que la correcta no siempre esté en el mismo lugar
    let indicesCorrectos = p.o.map((_, i) => i);
    indicesCorrectos.sort(() => 0.5 - Math.random());

    let htmlOpciones = indicesCorrectos.map(i_original => {
        return `<button onclick="evaluarMegaTrivia(${i_original}, this)" class="btn-opcion-mega" style="display:block;width:100%;margin-bottom:12px;padding:18px 20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:15px;font-weight:700;font-size:0.95rem;text-align:left;transition:0.2s;cursor:pointer;">
                    ${p.o[i_original]}
                </button>`;
    }).join('');

    let ptsPorRespond = estadoMegaTrivia.nivel === 'facil' ? 50 : (estadoMegaTrivia.nivel === 'intermedio' ? 100 : 200);

    area.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#130f2e,#0a0818);font-family:'Segoe UI',sans-serif;padding-bottom:100px;">
            <div style="padding:15px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.5);border-bottom:1px solid rgba(255,255,255,0.1);">
                <span id="vidas-mega" style="font-size:1.2rem;">${'❤️'.repeat(Math.max(0, estadoMegaTrivia.vidas))}</span>
                <div style="text-align:center;">
                    <div style="font-size:0.6rem;color:#a29bfe;letter-spacing:2px;">PREGUNTA ${estadoMegaTrivia.indiceActual + 1} DE ${estadoMegaTrivia.preguntas.length}</div>
                    <div style="font-size:0.7rem;color:rgba(255,255,255,0.5);">${estadoMegaTrivia.categoria} - ${estadoMegaTrivia.nivel.toUpperCase()}</div>
                </div>
                <span id="pts-mega" style="color:#feca57;font-weight:900;font-size:1.1rem;font-family:monospace;">${estadoMegaTrivia.puntos} PTS</span>
            </div>

            <div style="padding:25px 20px;max-width:600px;margin:0 auto;">
                <div style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.3);border-radius:16px;padding:24px;margin-bottom:30px;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                    <h3 style="color:#fff;font-size:1.2rem;margin:0;line-height:1.5;text-align:center;">${p.p}</h3>
                </div>

                <div id="opciones-mega-container">
                    ${htmlOpciones}
                </div>

                <div id="explicacion-panel" style="display:none;background:rgba(0,0,0,0.4);border-left:4px solid #a29bfe;padding:20px;border-radius:12px;margin-top:20px;animation:fadeIn 0.3s forwards;">
                    <div id="explicacion-titulo" style="font-weight:900;font-size:0.8rem;letter-spacing:2px;margin-bottom:8px;"></div>
                    <p id="explicacion-texto" style="color:rgba(255,255,255,0.85);font-size:0.95rem;line-height:1.6;margin:0;"></p>
                    <button onclick="continuarMegaTrivia()" style="width:100%;margin-top:20px;padding:16px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:#fff;font-weight:900;border:none;border-radius:12px;cursor:pointer;">CONTINUAR →</button>
                </div>
            </div>
        </div>
    `;
}

function evaluarMegaTrivia(idxElegido, btnDOM) {
    if (document.getElementById('explicacion-panel').style.display === 'block') return; // Bloquear si ya respondió

    const p = estadoMegaTrivia.preguntas[estadoMegaTrivia.indiceActual];
    const botones = document.querySelectorAll('.btn-opcion-mega');
    let ptsGain = estadoMegaTrivia.nivel === 'facil' ? 50 : (estadoMegaTrivia.nivel === 'intermedio' ? 100 : 200);

    const esCorrecta = (idxElegido === p.c);

    if (esCorrecta) {
        btnDOM.style.background = 'rgba(85,239,196,0.3)';
        btnDOM.style.borderColor = '#55efc4';
        btnDOM.style.color = '#55efc4';
        estadoMegaTrivia.puntos += ptsGain;
        document.getElementById('explicacion-titulo').innerHTML = '✅ ¡CORRECTO!';
        document.getElementById('explicacion-titulo').style.color = '#55efc4';
        mostrarToast("¡Respuesta Correcta! 🌟");
    } else {
        btnDOM.style.background = 'rgba(255,107,107,0.3)';
        btnDOM.style.borderColor = '#ff6b6b';
        btnDOM.style.color = '#ff6b6b';
        estadoMegaTrivia.errores++;

        if (estadoMegaTrivia.nivel !== 'facil') {
            estadoMegaTrivia.vidas--;
        }

        // Resaltar también la correcta
        botones.forEach(b => {
            if (b.innerText.trim() === p.o[p.c].trim()) {
                b.style.background = 'rgba(85,239,196,0.1)';
                b.style.borderColor = '#55efc4';
            }
        });

        document.getElementById('explicacion-titulo').innerHTML = '❌ RESPUESTA INCORRECTA';
        document.getElementById('explicacion-titulo').style.color = '#ff6b6b';
        mostrarToast("Casi... sigue intentando");
    }

    // Actualizar marcadores
    document.getElementById('pts-mega').innerText = `${estadoMegaTrivia.puntos} PTS`;
    document.getElementById('vidas-mega').innerText = '❤️'.repeat(Math.max(0, estadoMegaTrivia.vidas));

    // Mostrar explicación
    document.getElementById('explicacion-texto').innerText = p.exp;
    document.getElementById('explicacion-panel').style.display = 'block';
    // Ocultar opciones restantes para enfocar
    document.getElementById('opciones-mega-container').style.opacity = '0.5';
    document.getElementById('opciones-mega-container').style.pointerEvents = 'none';
}

function continuarMegaTrivia() {
    estadoMegaTrivia.indiceActual++;

    if (estadoMegaTrivia.nivel !== 'facil' && estadoMegaTrivia.vidas <= 0) {
        return finalizarMegaTrivia(true); // Game Over por vidas
    }

    renderPantallaMegaTrivia();
}

function finalizarMegaTrivia(porVidas = false) {
    const area = document.getElementById('pantalla-estudio');
    const mensajeVidas = porVidas ? '<p style="color:#ff6b6b;font-weight:900;margin-bottom:10px;">💀 TE QUEDASTE SIN VIDAS</p>' : '';

    // Guardar actividad detallada en firebase
    let metadataLvl = `[${estadoMegaTrivia.categoria}] Nivel: ${estadoMegaTrivia.nivel.toUpperCase()}`;
    registrarActividadTeen('trivia', { tipo: 'Mega Trivia ' + metadataLvl, puntos: estadoMegaTrivia.puntos });

    area.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#002d20,#0a0818);font-family:'Segoe UI',sans-serif;padding:60px 20px;text-align:center;">
            <div style="font-size:4rem;margin-bottom:20px;">🏆</div>
            <h1 style="color:#fff;font-size:1.8rem;margin-bottom:10px;">¡RESUMEN DE TRIVIA!</h1>
            <p style="color:#a29bfe;letter-spacing:1px;font-size:0.8rem;margin-bottom:30px;">${estadoMegaTrivia.categoria.toUpperCase()} — NIVEL ${estadoMegaTrivia.nivel.toUpperCase()}</p>
            
            ${mensajeVidas}
            
            <div style="background:rgba(255,255,255,0.05);border:1px dashed rgba(85,239,196,0.3);border-radius:20px;padding:30px;max-width:400px;margin:0 auto 40px;">
                <div style="font-size:3.5rem;color:#55efc4;font-weight:900;font-family:monospace;">${estadoMegaTrivia.puntos}</div>
                <div style="color:rgba(255,255,255,0.5);font-size:0.8rem;letter-spacing:3px;">PUNTOS OBTENIDOS</div>
            </div>

            <button onclick="renderConfiguracionMegaTrivia()" style="width:100%;max-width:400px;padding:18px;margin-bottom:15px;background:linear-gradient(135deg,#00b894,#55efc4);color:#000;border:none;border-radius:14px;cursor:pointer;font-weight:900;font-size:1rem;">🕹️ JUGAR OTRA CATEGORÍA</button>
            <button onclick="renderJuegoTeens()" style="width:100%;max-width:400px;padding:18px;background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:14px;cursor:pointer;font-weight:900;font-size:0.9rem;">VOLVER AL MENÚ PRINCIPAL</button>
        </div>
    `;
}

// Re-escritura del botón del menú de Juegos (Línea 461 de data_teens actual)
function renderJuegoTeens() {
    const container = document.getElementById('pantalla-estudio');
    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#1a1000,#2d1f00,#1a1000);font-family:'Segoe UI',sans-serif;padding-bottom:60px;">
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(254,202,87,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="renderModuloAdolescentes()" style="background:rgba(254,202,87,0.1);border:1px solid rgba(254,202,87,0.25);color:#feca57;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← ATRÁS</button>
                <span style="color:#feca57;font-size:0.8rem;letter-spacing:2px;">🎮 ZONA DE RETOS</span>
            </div>
            <div style="padding:24px 18px;display:grid;gap:14px;">
                <button onclick="renderVersusLobby()" style="width:100%;padding:28px;background:linear-gradient(135deg,#ff6b6b,#feca57);color:#000;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;box-shadow:0 8px 15px rgba(0,0,0,0.3);">🆚 MODO VERSUS — PVP</button>
                <button onclick="renderConfiguracionMegaTrivia()" style="width:100%;padding:28px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);color:#fff;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;box-shadow:0 8px 15px rgba(0,0,0,0.3);">⚡ MEGA TRIVIA (360 PREGUNTAS)</button>
                <button onclick="renderConfiguradorTrivia()" style="width:100%;padding:28px;background:linear-gradient(135deg,#00b894,#55efc4);color:#000;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;box-shadow:0 8px 15px rgba(0,0,0,0.3);">📚 TRIVIA POR LIBRO DE LA BIBLIA</button>
                <button onclick="window.abrirPenalesBiblicos()" style="width:100%;padding:28px;background:linear-gradient(135deg,#1a6b2a,#2d9e3d);color:#fff;font-weight:900;font-size:1rem;border:none;border-radius:18px;cursor:pointer;letter-spacing:1px;box-shadow:0 8px 25px rgba(45,158,61,0.5);position:relative;overflow:hidden;">⚽ PENALES BÍBLICOS</button>
            </div>
        </div>
    `;
}

// Jose - Funciones de compatibilidad
function renderExplorador() { mostrarToast("Buscador próximamente en este módulo"); }
