// PATCH: Reescribir renderSelectorLibrosPrincipal limpiamente
const fs = require('fs');
const FILE = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_motor.js';
let c = fs.readFileSync(FILE, 'utf8');

// Encontrar el inicio y fin de la funcion rota
const START = 'function renderSelectorLibrosPrincipal';
const END_MARKER = 'function cambiarModoSelectorBiblia';

const idxStart = c.indexOf(START);
const idxEnd = c.indexOf(END_MARKER);

if (idxStart < 0 || idxEnd < 0) {
    console.log('ERROR: no encontradas las funciones');
    process.exit(1);
}

console.log('Reemplazando desde', idxStart, 'hasta', idxEnd);

const NUEVA_FUNCION = `function renderSelectorLibrosPrincipal(containerId) {
    containerId = containerId || 'bible-home-selector';
    var area = document.getElementById(containerId);
    if (!area) return;

    // Ultimo libro leido
    var ultimaVisita = localStorage.getItem('legado_ultima_visita');
    var ultimaBtn = '';
    if (ultimaVisita) {
        try {
            var u = JSON.parse(ultimaVisita);
            ultimaBtn = '<button onclick="abrirLibroPrincipal(\\''+u.libro+'\\','+u.cap+',null)" ' +
                'style="width:100%;padding:12px 16px;background:linear-gradient(135deg,rgba(85,239,196,0.15),rgba(85,239,196,0.05));' +
                'border:1.5px solid rgba(85,239,196,0.4);border-radius:14px;color:#fff;cursor:pointer;' +
                'display:flex;align-items:center;gap:12px;margin-bottom:10px;text-align:left">' +
                '<span style="font-size:1.5rem">\\u{1F4D6}</span>' +
                '<div style="flex:1"><div style="font-size:0.55rem;color:#55efc4;font-weight:900;letter-spacing:2px">SEGUIR LEYENDO</div>' +
                '<div style="font-size:0.95rem;font-weight:900;color:#fff;margin-top:2px">'+u.libro+' '+u.cap+'</div></div>' +
                '<span style="color:#55efc4;font-size:1.4rem">&#8250;</span></button>';
        } catch(e) {}
    }

    // Libros populares
    var POPULARES = [
        {n:'Salmos',e:'&#127925;',c:'#fdcb6e'},{n:'Juan',e:'&#9997;&#65039;',c:'#a29bfe'},
        {n:'Proverbios',e:'&#128161;',c:'#55efc4'},{n:'Mateo',e:'&#128220;',c:'#74b9ff'},
        {n:'Romanos',e:'&#128140;',c:'#ff7675'},{n:'Genesis',e:'&#127749;',c:'#00cec9'},
        {n:'Apocalipsis',e:'&#9889;',c:'#fd79a8'},{n:'Isaias',e:'&#128293;',c:'#e17055'},
        {n:'Hebreos',e:'&#128737;&#65039;',c:'#6c5ce7'},{n:'Filipenses',e:'&#128153;',c:'#74b9ff'},
        {n:'Santiago',e:'&#9875;&#65039;',c:'#00b894'},{n:'Daniel',e:'&#129409;',c:'#fdcb6e'}
    ];

    var popHTML = POPULARES.map(function(p) {
        var nombre = p.n.length > 9 ? p.n.substring(0,8)+'.' : p.n;
        return '<button onclick="seleccionarCapitulos(\\''+p.n+'\\')\\u0022' +
            ' style=\\"padding:10px 4px;background:rgba(255,255,255,0.04);border:1.5px solid '+p.c+'50;' +
            'border-radius:12px;color:'+p.c+';font-weight:800;font-size:0.7rem;cursor:pointer;' +
            'display:flex;flex-direction:column;align-items:center;gap:4px;min-height:70px;justify-content:center;line-height:1.2\\">' +
            '<span style=\\"font-size:1.3rem\\">'+p.e+'</span>'+nombre+'</button>';
    }).join('');

    // HTML principal - SIN template literals para evitar errores de anidamiento
    var html = '<div>';
    // Header
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">';
    html += '<button onclick="if(typeof cerrarBibliaOverlay===\\'function\\'){cerrarBibliaOverlay()}else{mostrarBibleCompacto(\\''+containerId+'\\')}" ';
    html += 'style="padding:10px 14px;background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.15);color:#fff;border-radius:12px;cursor:pointer;font-weight:700;font-size:0.85rem">';
    html += '<span style="font-size:1.1rem">&#8592;</span></button>';
    html += '<div style="flex:1;text-align:center"><div style="font-size:0.65rem;color:#55efc4;font-weight:900;letter-spacing:2px">LEGADO B&#205;BLICO</div>';
    html += '<div style="font-size:0.7rem;color:rgba(255,255,255,0.5);margin-top:1px">Reina Valera 1960</div></div>';
    html += '<div style="display:flex;align-items:center;gap:4px;background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.2);border-radius:20px;padding:4px 8px">';
    html += '<button onclick="ajustarFuenteLibros(-0.1)" style="background:none;border:none;color:#55efc4;padding:2px 5px;font-weight:900;font-size:0.85rem;cursor:pointer">A-</button>';
    html += '<span id="lf-size-ind" style="color:#fff;font-size:0.65rem;font-weight:700;min-width:26px;text-align:center">'+Math.round(_libFontSize * 100)+'%</span>';
    html += '<button onclick="ajustarFuenteLibros(0.1)" style="background:none;border:none;color:#55efc4;padding:2px 5px;font-weight:900;font-size:0.95rem;cursor:pointer">A+</button>';
    html += '</div></div>';

    // Seguir leyendo
    html += ultimaBtn;

    // Busqueda rapida
    html += '<div style="background:rgba(253,203,110,0.07);border:1.5px solid rgba(253,203,110,0.3);border-radius:16px;padding:14px;margin-bottom:12px">';
    html += '<div style="font-size:0.58rem;color:#fdcb6e;font-weight:900;letter-spacing:2px;margin-bottom:8px">&#9889; B&#218;SQUEDA R&#193;PIDA &#8212; Escribe o dicta</div>';
    html += '<div style="display:flex;gap:7px">';
    html += '<input id="relampago-input" type="text" placeholder="Ej: Jn 3:16 o Sal 23" ';
    html += 'oninput="onInputRelampago(this.value)" ';
    html += 'onkeydown="if(event.key===\\'Enter\\'){event.preventDefault();irCitaRelampago()}" ';
    html += 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ';
    html += 'style="flex:1;padding:13px 14px;background:rgba(0,0,0,0.5);border:1.5px solid rgba(253,203,110,0.5);color:#fff;border-radius:12px;font-size:1.05rem;font-weight:700;outline:none">';
    html += '<button id="btn-mic-relampago" onclick="activarMicrofonoBiblia()" ';
    html += 'style="padding:13px;background:rgba(162,155,254,0.15);border:1.5px solid rgba(162,155,254,0.5);color:#fff;border-radius:12px;cursor:pointer;font-size:1.2rem;min-width:50px">&#127908;</button>';
    html += '<button onclick="irCitaRelampago()" ';
    html += 'style="padding:13px 16px;background:linear-gradient(135deg,#fdcb6e,#e17055);border:none;color:#000;font-weight:900;border-radius:12px;cursor:pointer;font-size:0.9rem;white-space:nowrap">IR &#9889;</button>';
    html += '</div>';
    html += '<div id="relampago-sugerencias" style="display:none;grid-template-columns:repeat(2,1fr);gap:5px;margin-top:8px"></div>';
    html += '<div id="relampago-confirmacion" style="display:none;background:rgba(0,184,148,0.08);border:1.5px solid rgba(85,239,196,0.4);border-radius:14px;padding:12px;margin-top:8px"></div>';
    html += '</div>';

    // Historial
    html += '<div id="relampago-historial" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:14px;min-height:24px">';
    html += '<span style="color:rgba(255,255,255,0.2);font-size:0.6rem;font-style:italic">Las citas del serm&#243;n aparecer&#225;n aqu&#237;</span>';
    html += '</div>';

    // Populares
    html += '<div style="margin-bottom:14px">';
    html += '<div style="font-size:0.55rem;color:rgba(255,255,255,0.35);font-weight:900;letter-spacing:2px;margin-bottom:8px">&#128218; ACCESO R&#193;PIDO</div>';
    html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">'+popHTML+'</div>';
    html += '</div>';

    // Tabs principales
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-bottom:10px">';
    html += '<button id="tab-genero" onclick="cambiarModoSelectorBiblia(\\'genero\\')" style="padding:10px 4px;border-radius:14px;border:2px solid #55efc4;background:rgba(85,239,196,0.18);color:#55efc4;font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span style="font-size:1.1rem">&#128218;</span>TODOS</button>';
    html += '<button id="tab-at" onclick="cambiarModoSelectorBiblia(\\'at\\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(85,239,196,0.3);background:rgba(85,239,196,0.05);color:rgba(85,239,196,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span style="font-size:1.1rem">&#128220;</span>AT</button>';
    html += '<button id="tab-nt" onclick="cambiarModoSelectorBiblia(\\'nt\\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(162,155,254,0.3);background:rgba(162,155,254,0.05);color:rgba(162,155,254,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span style="font-size:1.1rem">&#9997;&#65039;</span>NT</button>';
    html += '<button id="tab-buscar" onclick="cambiarModoSelectorBiblia(\\'buscar\\')" style="padding:10px 4px;border-radius:14px;border:2px solid rgba(253,203,110,0.3);background:rgba(253,203,110,0.05);color:rgba(253,203,110,0.55);font-weight:900;font-size:0.62rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px"><span style="font-size:1.1rem">&#128269;</span>BUSCAR</button>';
    html += '</div>';

    // Tabs secundarios
    html += '<div style="display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px">';
    html += '<button id="tab-favs" onclick="cambiarModoSelectorBiblia(\\'favs\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(253,203,110,0.3);background:rgba(253,203,110,0.05);color:rgba(253,203,110,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#11088; FAVS</button>';
    html += '<button id="tab-aliento" onclick="cambiarModoSelectorBiblia(\\'aliento\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(255,159,67,0.3);background:rgba(255,159,67,0.05);color:rgba(255,159,67,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#129309; ALIENTO</button>';
    html += '<button id="tab-historial" onclick="cambiarModoSelectorBiblia(\\'historial\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(116,185,255,0.3);background:rgba(116,185,255,0.05);color:rgba(116,185,255,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#128202; LE&#205;DOS</button>';
    html += '<button id="tab-notas" onclick="cambiarModoSelectorBiblia(\\'notas\\')" style="padding:7px 12px;border-radius:20px;border:1.5px solid rgba(254,202,87,0.3);background:rgba(254,202,87,0.05);color:rgba(254,202,87,0.6);font-weight:900;font-size:0.6rem;cursor:pointer;white-space:nowrap;flex-shrink:0">&#128221; NOTAS</button>';
    html += '</div>';

    // Contenido dinamico
    html += '<div id="libros-dinamicos-root"></div>';
    html += '</div>';

    area.innerHTML = html;

    // Auto-foco y render
    setTimeout(function() {
        var inp = document.getElementById('relampago-input');
        if (inp) { try { inp.focus(); } catch(e) {} }
        renderHistorialRelampago();
        cambiarModoSelectorBiblia(_modoSelectorBiblia);
    }, 150);
}

`;

// Reemplazar la funcion rota
const antes = c.substring(0, idxStart);
const despues = c.substring(idxEnd);
c = antes + NUEVA_FUNCION + despues;

fs.writeFileSync(FILE, c, 'utf8');
console.log('OK: funcion reescrita. Tamano:', c.length);
