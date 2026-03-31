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
    const container = document.getElementById('pantalla-estudio');
    const devTeen = DEVOCIONALES_TEEN[new Date().getDay()];

    container.innerHTML = `
        <div style="min-height:100vh;background:linear-gradient(170deg,#0d0020,#1a0035,#0d001a);font-family:'Segoe UI',sans-serif;padding-bottom:80px;">

            <!-- HEADER -->
            <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(162,155,254,0.2);position:sticky;top:0;z-index:100;">
                <button onclick="window.location.reload()" style="background:rgba(162,155,254,0.1);border:1px solid rgba(162,155,254,0.25);color:#a29bfe;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:0.78rem;font-weight:700;">← INICIO</button>
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
    const area = document.getElementById('teen-content-area');
    const grupos = Object.entries(ESTRUCTURA_BIBLIA).map(([test, info]) => ({
        nombre: test, color: info.color, categorias: info.categorias
    }));
    area.innerHTML = `
        <style>
             .libro-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 10px; border-radius: 12px; cursor: pointer; font-size: 0.85rem; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: 700; transition: all 0.2s; }
             .libro-card:active { transform: scale(0.95); }
             .libro-card.sel-verde { border-color: #55efc4; color: #55efc4; background: rgba(85,239,196,0.2); }
             .libro-card.sel-morado { border-color: #a29bfe; color: #a29bfe; background: rgba(162,155,254,0.2); }
             .cat-header { display: flex; padding: 15px; cursor: pointer; color: #55efc4; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); margin-top: 10px; border-radius: 10px 10px 0 0; }
             .cat-body { display: none; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 0 0 10px 10px; margin-bottom: 10px; }
             .cat-body.open { display: block; }
             .test-tab { padding: 12px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.3); color: #fff; margin-right: 8px; flex: 1; font-weight: 900; }
             .test-tab.active { background: #fff; color: #000; border-color: #fff; }
        </style>
        <div style="padding:20px">
            <h2 style="text-align:center;color:#55efc4">CONFIGURA TU EXAMEN</h2>
            <div style="display:flex;margin-bottom:25px;margin-top:20px">
                <button onclick="mostrarTestamentoTrivia('ANTIGUO TESTAMENTO')" class="test-tab active" id="tab-ANTIGUO_TESTAMENTO">ANTIGUO</button>
                <button onclick="mostrarTestamentoTrivia('NUEVO TESTAMENTO')" class="test-tab" id="tab-NUEVO_TESTAMENTO">NUEVO</button>
            </div>
            <div id="libros-trivia-grid">
                ${grupos.map((g, gi) => `
                    <div class="testamento-panel" id="panel-${g.nombre.replace(/\s/g, '_')}" style="${gi > 0 ? 'display:none' : ''}">
                        ${Object.entries(g.categorias).map(([cat, libros]) => `
                            <div>
                                <div class="cat-header" onclick="toggleCat(this)">
                                     <span style="flex:1; font-weight:900">${cat.toUpperCase()}</span>
                                     <span>v</span>
                                </div>
                                <div class="cat-body">
                                     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:8px">
                                         ${libros.map(l => `<button id="libtrivia-${l.replace(/\s/g, '_')}" class="libro-card" data-color="${g.color === '#55efc4' ? 'verde' : 'morado'}" onclick="seleccionarLibroTrivia('${l}')">${l}</button>`).join('')}
                                     </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            <div style="margin-top:25px;background:rgba(0,0,0,0.4);padding:20px;border-radius:20px;border:1px solid #333">
                <p style="margin-bottom:10px;opacity:0.5;font-size:0.8rem">CONFIGURACIÓN FINAL:</p>
                <select id="trivia-rango" style="width:100%;padding:15px;background:#000;color:#fff;border:1px solid #55efc4;border-radius:12px;margin-bottom:15px">
                    <option value="1-20">CAPÍTULOS 1 AL 20</option>
                    <option value="1-50">CAPÍTULOS 1 AL 50</option>
                    <option value="completo">LIBRO COMPLETO</option>
                </select>
                <button onclick="comenzarTriviaPorLibro()" style="width:100%;padding:20px;background:#55efc4;color:#000;font-weight:900;border:none;border-radius:12px">¡COMENZAR EXAMEN!</button>
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

async function comenzarTriviaPorLibro() {
    if (!ultimoLibroTrivia) return mostrarToast("⚠️ Selecciona un libro primero");
    const rango = document.getElementById('trivia-rango').value;
    mostrarToast(`Generando trivia de ${ultimoLibroTrivia} (${rango})...`);

    // Simulación de generación de preguntas basadas en el libro
    const mockup = [
        { p: `¿Quién escribió el libro de ${ultimoLibroTrivia}?`, o: ["Pablo", "Moisés", "Un Profeta"], c: 2 },
        { p: `¿Cuál es el mensaje principal de ${ultimoLibroTrivia}?`, o: ["La Ley", "El Amor", "La Profecía"], c: 1 }
    ];

    juegoState = { ...juegoState, preguntaIdx: 0, vidas: 3, puntos: 0, total: mockup.length, preguntas: mockup };
    mostrarPantallaJuego();
}

// ... (El resto de funciones de trivia se mantienen igual si son necesarias, pero conectando con el nuevo flujo)
function mostrarPantallaJuego() {
    const area = document.getElementById('teen-content-area');
    area.innerHTML = `
        <div style="padding:20px">
            <div style="display:flex;justify-content:space-between;margin-bottom:20px">
                <span class="score">PUNTOS: 0</span>
                <span class="vidas" style="color:#ff6b6b">❤️❤️❤️</span>
            </div>
            <div id="trivia-body" class="glass-panel" style="padding:30px;text-align:center">
                <h3 id="pregunta-text" style="font-size:1.4rem;margin-bottom:30px"></h3>
                <div id="opciones-grid" style="display:grid;gap:10px"></div>
            </div>
        </div>
     `;
    siguientePregunta();
}

function siguientePregunta() {
    const p = juegoState.preguntas[juegoState.preguntaIdx];
    if (!p) return finalizarJuego();

    document.getElementById('pregunta-text').innerText = p.p;
    const grid = document.getElementById('opciones-grid');
    grid.innerHTML = p.o.map((o, i) => `<button onclick="verificarRespuesta(${i})" style="padding:20px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:15px;font-weight:700">${o}</button>`).join('');
}

function verificarRespuesta(idx) {
    const p = juegoState.preguntas[juegoState.preguntaIdx];
    if (idx === p.c) {
        juegoState.puntos += 100;
        mostrarToast("¡CORRECTO! 🌟");
    } else {
        juegoState.vidas--;
        mostrarToast("FALLASTE... 😢");
    }

    juegoState.preguntaIdx++;
    actualizarVidasUI();
    if (juegoState.vidas > 0) siguientePregunta();
    else finalizarJuego();
}

function actualizarVidasUI() {
    const v = document.querySelector('.vidas');
    if (v) v.innerText = '❤️'.repeat(juegoState.vidas);
    const s = document.querySelector('.score');
    if (s) s.innerText = `PUNTOS: ${juegoState.puntos}`;
}

function finalizarJuego() {
    document.getElementById('teen-content-area').innerHTML = `
        <div style="padding:40px;text-align:center">
            <h1>¡FIN DEL JUEGO!</h1>
            <p style="font-size:2rem;color:#55efc4;margin:20px 0">${juegoState.puntos} PUNTOS</p>
            <button onclick="renderModuloAdolescentes()" style="width:100%;padding:20px;background:#55efc4;color:#000;border:none;border-radius:15px;font-weight:900">VOLVER A JUEGOS</button>
        </div>
    `;
}

async function iniciarTriviaRapida() {
    mostrarToast("Generando trivia rápida Adventista...");
    const mockup = JUEGOS_BANCO;
    juegoState = { ...juegoState, preguntaIdx: 0, vidas: 3, puntos: 0, total: mockup.length, preguntas: mockup };
    mostrarPantallaJuego();
}

// Jose - Funciones de compatibilidad
function renderExplorador() { mostrarToast("Buscador próximamente en este módulo"); }
