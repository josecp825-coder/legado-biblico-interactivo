// ================================================
// PENALES BIBLICOS - Legado Biblico v2.0
// Modulo Adolescentes - Juego por turnos
// ================================================
(function(win) {
'use strict';

var CATS = [
  { id:'milagros',  nom:'MILAGROS EN LA BIBLIA',    col:'#fdcb6e' },
  { id:'profetas',  nom:'PROFETAS DE LA BIBLIA',     col:'#74b9ff' },
  { id:'segundos',  nom:'QUIEN LE SIGUIO?',          col:'#a29bfe' },
  { id:'libros',    nom:'LIBROS DE LA BIBLIA',       col:'#55efc4' },
  { id:'apostoles', nom:'LOS APOSTOLES',             col:'#e17055' },
  { id:'reyes',     nom:'REYES DE ISRAEL',           col:'#ffeaa7' },
  { id:'parabolas', nom:'PARABOLAS DE JESUS',        col:'#00cec9' },
  { id:'mezcla',    nom:'MEZCLA BIBLICA',            col:'#6c5ce7' },
  { id:'jovenes',   nom:'JOVENES EN LA BIBLIA',      col:'#00cec9' },
  { id:'ninos',     nom:'NINOS EN LA BIBLIA',        col:'#ff9f43' },
  { id:'mujeres',   nom:'MUJERES DE LA BIBLIA',      col:'#fd79a8' }
];

var BANCO = {
milagros:[
  {p:'Cuantos panes y peces uso Jesus para alimentar a 5,000 personas?',o:['5 panes y 2 peces','7 panes y 3 peces','3 panes y 5 peces','10 panes y 1 pez'],c:0},
  {p:'A quien resucito Jesus en Betania?',o:['Lazaro','Jairo','Tabita','Eutico'],c:0},
  {p:'Que milagro hizo Jesus en las bodas de Cana?',o:['Convirtio agua en vino','Multiplico el pan','Sano a un cojo','Calmo una tormenta'],c:0},
  {p:'Como cayeron las murallas de Jerico?',o:['Al sonido de trompetas y gritos','Con un terremoto','Con fuego del cielo','Con catapultas'],c:0},
  {p:'Cuantas plagas sufrio Egipto?',o:['10','7','12','9'],c:0},
  {p:'En que subio Elias al cielo?',o:['Un torbellino de viento','Un carro de caballos','Una nube blanca','Alas de angel'],c:0},
  {p:'Que milagro hizo Eliseo con el hacha de hierro?',o:['La hizo flotar en el agua','La multiplico','La convirtio en oro','Partio el rio'],c:0},
  {p:'Que le paso a Naaman al sumergirse 7 veces en el Jordan?',o:['Fue sanado de lepra','Vio a Dios','Recibio el Espiritu Santo','Se convirtio en profeta'],c:0},
  {p:'Que ocurrio cuando Pablo y Silas oraban en la carcel?',o:['Un terremoto abrio las puertas','Un angel los saco','Se volvieron invisibles','Las cadenas se derritieron'],c:0},
  {p:'A quien libero un angel de la carcel mientras la iglesia oraba?',o:['Pedro','Pablo','Bernabe','Silas'],c:0},
  {p:'Cuanto tiempo estuvo Jonas en el vientre del pez?',o:['Tres dias y tres noches','Siete dias','Un mes','Cuarenta dias'],c:0},
  {p:'Que milagro hizo Jesus en el estanque de Betesda?',o:['Sano a un paralitico de 38 anos','Resucito a un hombre','Dio vista a un ciego','Multiplico panes'],c:0},
  {p:'Cuantos dias estuvo Lazaro en el sepulcro?',o:['4 dias','1 dia','3 dias','7 dias'],c:0},
  {p:'Que paso al Mar Rojo cuando Moises extendio su mano?',o:['Se dividio en dos','Se seco','Se helo','Se volvio sangre'],c:0},
  {p:'Que milagro ocurrio cuando Moises golpeo la roca en el desierto?',o:['Broto agua','Salio fuego','Cayo mana','Cayo oro'],c:0}
],
profetas:[
  {p:'Que profeta fue arrojado al foso de los leones?',o:['Daniel','Jeremias','Ezequiel','Amos'],c:0},
  {p:'Que profeta vivia en el desierto y comia langostas y miel?',o:['Juan el Bautista','Elias','Ezequiel','Amos'],c:0},
  {p:'A que profeta se le llama el profeta lloron?',o:['Jeremias','Isaias','Oseas','Sofonias'],c:0},
  {p:'Que profeta se caso con una mujer infiel como simbolo de Israel?',o:['Oseas','Jeremias','Amos','Miqueas'],c:0},
  {p:'Quien fue el profeta que ungio a David como rey?',o:['Samuel','Natan','Elias','Eliseo'],c:0},
  {p:'Cuanto tiempo duro la sequia anunciada por Elias?',o:['3 anos y medio','7 anos','40 anos','1 ano'],c:0},
  {p:'En que profeta se narra la vision de los huesos secos?',o:['Ezequiel','Daniel','Isaias','Zacarias'],c:0},
  {p:'Que profeta interpreto el sueno de la estatua de Nabucodonosor?',o:['Daniel','Jose','Isaias','Jeremias'],c:0},
  {p:'Que profeta anuncio el nacimiento de Jesus en Belen?',o:['Miqueas','Isaias','Jeremias','Zacarias'],c:0},
  {p:'Que le paso a Jonas cuando huyo de Dios en un barco?',o:['Un gran pez lo trago','Murio en el mar','Lo capturaron soldados','Llego a Ninive igual'],c:0},
  {p:'Que profeta fue llevado al cielo en un torbellino?',o:['Elias','Eliseo','Moises','Ezequiel'],c:0},
  {p:'A que nacion fue enviado el profeta Jonas?',o:['Ninive','Babilonia','Egipto','Moab'],c:0},
  {p:'Que profeta anuncio que una virgen concebiria y daria a luz un hijo?',o:['Isaias','Miqueas','Jeremias','Daniel'],c:0},
  {p:'Cuantos capitulos tiene el libro de Isaias?',o:['66','52','48','39'],c:0},
  {p:'Que profeta vio la vision de la rueda con cuatro seres vivientes?',o:['Ezequiel','Daniel','Isaias','Zacarias'],c:0}
],
segundos:[
  {p:'Quien siguio a Moises como lider de Israel?',o:['Josue','Caleb','Aaron','Eleazar'],c:0},
  {p:'Quien reino despues del rey Saul?',o:['David','Salomon','Jonatan','Abner'],c:0},
  {p:'Quien fue el sucesor de Elias como profeta?',o:['Eliseo','Samuel','Natan','Miqueas'],c:0},
  {p:'Quien reino despues de David?',o:['Salomon','Roboam','Abias','Joab'],c:0},
  {p:'Quien sucedio a Judas Iscariote como apostol?',o:['Matias','Bernabe','Silas','Pablo'],c:0},
  {p:'Quien fue el primer juez de Israel despues de Josue?',o:['Otoniel','Gedeon','Samson','Debora'],c:0},
  {p:'Quien tomo el manto de Elias despues que subiera al cielo?',o:['Eliseo','Jeremias','Isaias','Miqueas'],c:0},
  {p:'Quien siguio a Adan como patriarca en el linaje biblico?',o:['Set','Abel','Cain','Enoc'],c:0},
  {p:'Quien fue el rey que siguio a Salomon y dividio el reino?',o:['Roboam','Jeroboam','Abias','Asa'],c:0},
  {p:'Quien siguio a Abraham como patriarca del pueblo elegido?',o:['Isaac','Jacob','Jose','Ismael'],c:0},
  {p:'Cual fue el hijo de Noe de quien desciende el pueblo hebreo?',o:['Sem','Cam','Jafet','Gomer'],c:0},
  {p:'Quien tomo el lugar de Moises para guiar al pueblo a la Tierra Prometida?',o:['Josue','Caleb','Eleazar','Finees'],c:0},
  {p:'Quien siguio a Eli como juez y profeta de Israel?',o:['Samuel','Saul','David','Natan'],c:0},
  {p:'Quien reino despues de Salomon en el norte (Israel)?',o:['Jeroboam','Roboam','Asa','Baasa'],c:0},
  {p:'Quien fue el segundo hombre de la Biblia en no ver la muerte?',o:['Elias','Enoc','Moises','Josue'],c:0}
],
libros:[
  {p:'Cuantos libros tiene la Biblia en total?',o:['66','60','72','39'],c:0},
  {p:'Cuantos libros tiene el Antiguo Testamento?',o:['39','27','33','40'],c:0},
  {p:'Cuantos libros tiene el Nuevo Testamento?',o:['27','39','21','30'],c:0},
  {p:'Cual es el libro mas largo de la Biblia?',o:['Salmos','Jeremias','Isaias','Genesis'],c:0},
  {p:'Quien escribio el libro de Hechos?',o:['Lucas','Pablo','Pedro','Juan'],c:0},
  {p:'Cuantos Salmos tiene la Biblia?',o:['150','120','138','160'],c:0},
  {p:'Quien escribio la mayoria de los Salmos?',o:['David','Moises','Salomon','Asaf'],c:0},
  {p:'Cual es el primer libro del Nuevo Testamento?',o:['Mateo','Marcos','Lucas','Juan'],c:0},
  {p:'Cual es el ultimo libro de la Biblia?',o:['Apocalipsis','Judas','3 Juan','Hebreos'],c:0},
  {p:'Quien escribio el libro de Apocalipsis?',o:['Juan','Pablo','Pedro','Santiago'],c:0},
  {p:'Cuantos libros escribio el apostol Pablo?',o:['13','7','10','4'],c:0},
  {p:'En que libro no se menciona directamente el nombre de Dios?',o:['Ester','Rut','Jonas','Job'],c:0},
  {p:'Cuantos libros de la Biblia llevan nombre de mujer?',o:['2 (Rut y Ester)','1','3','4'],c:0},
  {p:'Quien escribio el libro de Proverbios?',o:['Salomon','David','Moises','Ezra'],c:0},
  {p:'Que libro narra la salida de los israelitas de Egipto?',o:['Exodo','Levitico','Genesis','Numeros'],c:0}
],
apostoles:[
  {p:'Cuantos apostoles eligio Jesus?',o:['12','70','7','10'],c:0},
  {p:'Cual apostol nego a Jesus tres veces?',o:['Pedro','Juan','Santiago','Tomas'],c:0},
  {p:'Quien fue el apostol que traiciono a Jesus?',o:['Judas Iscariote','Simon el Zelote','Bartolome','Mateo'],c:0},
  {p:'Cual apostol era cobrador de impuestos?',o:['Mateo','Lucas','Juan','Marcos'],c:0},
  {p:'Quien fue llamado el apostol de los gentiles?',o:['Pablo','Pedro','Juan','Bernabe'],c:0},
  {p:'Cual fue el primer apostol en morir como martir?',o:['Santiago (Jacobo)','Pedro','Esteban','Juan'],c:0},
  {p:'Quien fue llamado Cefas que significa Roca?',o:['Pedro','Juan','Santiago','Andres'],c:0},
  {p:'Cual apostol dudo de la resurreccion de Jesus?',o:['Tomas','Felipe','Bartolome','Tadeo'],c:0},
  {p:'Quien era el hermano de Pedro entre los apostoles?',o:['Andres','Juan','Santiago','Felipe'],c:0},
  {p:'Como se llamaba Pablo antes de convertirse?',o:['Saulo','Simon','Matias','Silas'],c:0},
  {p:'Donde fue Pablo convertido?',o:['Camino a Damasco','Jerusalen','Antioquia','Roma'],c:0},
  {p:'Que apostol era hijo de Zebedeo junto con Juan?',o:['Santiago','Felipe','Andres','Tomas'],c:0},
  {p:'Que escritor del Nuevo Testamento escribio mas libros?',o:['Pablo','Juan','Pedro','Mateo'],c:0},
  {p:'Que hizo Pedro cuando camino sobre el agua?',o:['Se hundio por dudar','Llego hasta Jesus','Se quedo en el bote','Grito de miedo'],c:0},
  {p:'Cual apostol era medico segun la tradicion?',o:['Lucas','Marcos','Timoteo','Bernabe'],c:0}
],
reyes:[
  {p:'Quien fue el primer rey de Israel?',o:['Saul','David','Salomon','Samuel'],c:0},
  {p:'Cuantos anos reino Salomon?',o:['40 anos','20 anos','70 anos','33 anos'],c:0},
  {p:'Que rey construyo el primer templo en Jerusalen?',o:['Salomon','David','Roboam','Josafat'],c:0},
  {p:'Que rey dividio el reino de Israel por su mal gobierno?',o:['Roboam','Jeroboam','Salomon','David'],c:0},
  {p:'Cuantos anos reino David en total?',o:['40 anos','33 anos','20 anos','50 anos'],c:0},
  {p:'Que rey construyo un templo a Baal siguiendo a su esposa Jezabel?',o:['Acab','Jeroboam','Omri','Basa'],c:0},
  {p:'Que rey reformo a Juda y encontro el libro de la ley en el templo?',o:['Josias','Ezequias','Asa','Josafat'],c:0},
  {p:'Quien ungio a Saul como primer rey de Israel?',o:['Samuel','Elias','Natan','Gad'],c:0},
  {p:'Como murio el rey Saul?',o:['Cayo sobre su propia espada','Lo mato David','Lo mato un filisteo','Enfermo'],c:0},
  {p:'Que rey tuvo 700 esposas y 300 concubinas?',o:['Salomon','David','Roboam','Acab'],c:0},
  {p:'Cuantos anos reino Saul?',o:['40 anos','20 anos','33 anos','10 anos'],c:0},
  {p:'Que rey de Juda tuvo el reinado mas largo (55 anos) y fue muy malvado?',o:['Manases','Acaz','Joram','Asa'],c:0},
  {p:'Que rey es considerado el mas justo de Juda?',o:['Josias','David','Salomon','Ezequias'],c:0},
  {p:'A quien derroto David siendo aun un joven pastor?',o:['Goliat','Saul','Absalon','Joab'],c:0},
  {p:'Que rey de Israel fue tomado cautivo a Babilonia?',o:['Sedequias','Josias','Joacim','Ezequias'],c:0}
],
parabolas:[
  {p:'Cuantas monedas tenia la mujer que perdio una?',o:['10','5','100','50'],c:0},
  {p:'Que hizo el hijo prodigo cuando le entro hambre?',o:['Volvio a su padre','Robo comida','Se quedo con los cerdos','Busco trabajo en otra ciudad'],c:0},
  {p:'Quien ayudo al herido en la parabola del buen samaritano?',o:['Un samaritano','Un sacerdote','Un levita','Un fariseo'],c:0},
  {p:'Cuantas virgenes habia y cuantas eran sabias?',o:['10 virgenes y 5 sabias','7 virgenes y 3 sabias','12 virgenes y 6 sabias','8 virgenes y 4 sabias'],c:0},
  {p:'Que semilla crecio tan grande que los pajaros anidaban en sus ramas?',o:['Semilla de mostaza','Trigo','Vid','Olivo'],c:0},
  {p:'Cuantas ovejas tenia el pastor de la parabola?',o:['100','10','50','99'],c:0},
  {p:'Que vio el padre cuando el hijo prodigo regreso?',o:['Lo vio desde lejos y corrio a recibirlo','Espero en la puerta','Mando a un siervo','No quiso verlo'],c:0},
  {p:'Que cayo en buena tierra en la parabola del sembrador?',o:['La semilla que dio fruto','La que cayo en piedras','La que cayo en el camino','La que cayo en espinos'],c:0},
  {p:'En que lugar estaba construida la casa del hombre necio?',o:['Sobre arena','Sobre roca','Junto al rio','En el desierto'],c:0},
  {p:'Cuantos talentos recibio el siervo que los entero?',o:['1','2','5','10'],c:0},
  {p:'Que recibio cada obrero en la parabola de los obreros de la vina?',o:['Un denario cada uno','Diferente pago','Lo que trabajaron','La mitad del dia'],c:0},
  {p:'De que trata la parabola de la perla de gran precio?',o:['Un hombre que lo vendio todo por ella','Un rey que la regalo','Un pescador que la hallo','Un comerciante que la perdio'],c:0},
  {p:'Que le pidio el hijo prodigo a su padre antes de irse?',o:['Su herencia anticipada','Un trabajo','Permiso para viajar','Dinero prestado'],c:0},
  {p:'A quien le dijo Jesus la parabola del buen samaritano?',o:['A un interprete de la ley','A un fariseo','A sus discipulos','A un sacerdote'],c:0},
  {p:'Que representa la levadura en la parabola del reino?',o:['El crecimiento del reino de Dios','El pecado','El pan de vida','La oracion'],c:0}
],
jovenes:[
  {p:'Cuantos anos tenia Jose cuando fue vendido por sus hermanos?',o:['17 anos','12 anos','20 anos','15 anos'],c:0},
  {p:'Que joven pastor mato al gigante Goliat con una honda?',o:['David','Jonatan','Josue','Samson'],c:0},
  {p:'Que joven se nego a comer la comida del rey Nabucodonosor en Babilonia?',o:['Daniel','Sadrac','Mesac','Abed-nego'],c:0},
  {p:'Que joven fue llamado por Dios de noche y penso que era el sacerdote Eli?',o:['Samuel','Jonatan','Josias','Timoteo'],c:0},
  {p:'Que joven fue hijo de Saul y mejor amigo de David?',o:['Jonatan','Abner','Absalon','Isboset'],c:0},
  {p:'Cuantos anos tenia Jesus cuando sus padres lo hallaron debatiendo en el templo?',o:['12 anos','10 anos','15 anos','8 anos'],c:0},
  {p:'Que joven del NT acompano a Pablo en sus viajes misioneros?',o:['Timoteo','Tito','Silas','Lucas'],c:0},
  {p:'Que joven fue escogido rey aunque era el menor de sus hermanos?',o:['David','Salomon','Josias','Samuel'],c:0},
  {p:'Cuantos anos tenia Josias cuando comenzo a reinar?',o:['8 anos','12 anos','16 anos','20 anos'],c:0},
  {p:'Que joven interpreto los suenos de los companeros de carcel del Faraon?',o:['Jose','Daniel','Samuel','Moises'],c:0},
  {p:'A que joven resucito Jesus cerca de la ciudad de Nain?',o:['El hijo de una viuda','Lazaro','La hija de Jairo','El hijo de la sunamita'],c:0},
  {p:'Que joven fue el hijo prometido a Abraham cuando ya era viejo?',o:['Isaac','Ismael','Jacob','Esau'],c:0},
  {p:'Que joven fue ordenado ministro por Pablo aunque era muy joven?',o:['Timoteo','Tito','Marcos','Silas'],c:0},
  {p:'Que joven fue llevado como esclavo a Egipto pero termino siendo gobernador?',o:['Jose','Benjamin','Ruben','Juda'],c:0},
  {p:'Que joven fue pastor de ovejas antes de ser rey de Israel?',o:['David','Saul','Salomon','Josias'],c:0}
],
ninos:[
  {p:'Que nino fue puesto en una canasta en el rio Nilo para salvarlo?',o:['Moises','Isaac','Samuel','Jose'],c:0},
  {p:'Que nino fue ofrecido en sacrificio por su padre pero fue librado por un angel?',o:['Isaac','Ismael','Moises','Samuel'],c:0},
  {p:'Que nina fue resucitada por Jesus cuando todos creian que estaba muerta?',o:['La hija de Jairo','La hija de la sunamita','Tabita','Maria'],c:0},
  {p:'Que nino comparttio su merienda para alimentar a 5,000 personas?',o:['Un nino anonimo','Santiago','Juan','Pedro'],c:0},
  {p:'A que nino llamo Dios tres veces de noche en el templo?',o:['Samuel','Josias','Joas','Daniel'],c:0},
  {p:'Cuantos anos tenia Joas cuando comenzo a reinar como rey de Juda?',o:['7 anos','12 anos','5 anos','10 anos'],c:0},
  {p:'Que nino fue llevado al templo por su madre para ser consagrado a Dios?',o:['Samuel','Juan el Bautista','Jesus','Josias'],c:0},
  {p:'Que nina esclava israelita le hablo de Eliseo al general Naaman?',o:['Una nina sin nombre','Miriam','Debora','Ester'],c:0},
  {p:'Que nino fue resucitado por Eliseo estornudando sobre el siete veces?',o:['El hijo de la sunamita','El hijo de la viuda','Lazaro','El hijo de Jairo'],c:0},
  {p:'Que nino fue el favorito de su padre Jacob y le regalaron una tunica especial?',o:['Jose','Benjamin','Ruben','Juda'],c:0},
  {p:'Cuantos anos tenia Jesus cuando fue al templo y se quedo debatiendo?',o:['12 anos','8 anos','10 anos','15 anos'],c:0},
  {p:'Que nino fue salvado por su madre que lo escondio tres meses?',o:['Moises','Josue','Samuel','Isaac'],c:0},
  {p:'Que nino vivio con su abuela Loida y su madre Eunice, fieles creyentes?',o:['Timoteo','Marcos','Tito','Silas'],c:0},
  {p:'Que nino fue adoptado por la hija del Faraon y criado como principe?',o:['Moises','Jose','Josue','Samuel'],c:0},
  {p:'A cuantos ninos mando matar el rey Herodes buscando a Jesus?',o:['A todos los menores de 2 anos en Belen','A los primogenitos','A 12 ninos','A los menores de 5 anos'],c:0}
],
mujeres:[
  {p:'Quien fue la primera mujer en la Biblia?',o:['Eva','Sara','Rebeca','Lea'],c:0},
  {p:'Que mujer fue jueza y profetisa de Israel?',o:['Debora','Ester','Rut','Miriam'],c:0},
  {p:'De que nacion provenia Rut?',o:['Moab','Canaan','Egipto','Babilonia'],c:0},
  {p:'Que mujer salvo a su pueblo siendo reina de Persia?',o:['Ester','Dalila','Rut','Betsabe'],c:0},
  {p:'Quien fue la primera mujer en ver a Jesus resucitado?',o:['Maria Magdalena','Marta','Maria de Betania','Salome'],c:0},
  {p:'Como se llamaba la suegra de Rut?',o:['Noemi','Ester','Dalila','Raquel'],c:0},
  {p:'Quien fue la esposa de Abraham?',o:['Sara','Lea','Raquel','Rebeca'],c:0},
  {p:'Que mujer engano a Samson para quitarle su fuerza?',o:['Dalila','Jezabel','Atalia','Rahab'],c:0},
  {p:'Que mujer escondio a los espias hebreos en Jerico?',o:['Rahab','Debora','Rut','Ana'],c:0},
  {p:'Como se llamaba la madre de Samuel?',o:['Ana','Noemi','Sara','Elisabet'],c:0},
  {p:'Que reina malvada mando matar a los profetas de Dios?',o:['Jezabel','Atalia','Ester','Dalila'],c:0},
  {p:'Quien fue la hermana de Moises?',o:['Miriam','Debora','Ester','Rahab'],c:0},
  {p:'Como se llamaba la madre de Juan el Bautista?',o:['Elisabet','Ana','Maria','Noemi'],c:0},
  {p:'Que mujer de NT era vendedora de telas de purpura?',o:['Lidia','Priscila','Dorcas','Febe'],c:0},
  {p:'Quien fue la madre adoptiva de Moises?',o:['La hija del Faraon','Noemi','Sara','Miriam'],c:0}
]
};

function getBancoMezcla() {
  var todas = [];
  Object.keys(BANCO).forEach(function(k){ BANCO[k].forEach(function(q){ todas.push(q); }); });
  return todas;
}

var G = null;
var COLORES_J = ['#55efc4','#fd79a8','#fdcb6e','#74b9ff'];

function getC(){ return document.getElementById('pantalla-estudio'); }

function shuffle(arr){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var t=a[i];a[i]=a[j];a[j]=t;
  }
  return a;
}

function getPregunta(){
  var pool=G.catId==='mezcla'?getBancoMezcla():(BANCO[G.catId]||[]);
  var disp=pool.filter(function(q,i){return G.usadas.indexOf(i)===-1;});
  if(!disp.length){G.usadas=[];disp=pool.slice();}
  var q=disp[Math.floor(Math.random()*disp.length)];
  G.usadas.push(pool.indexOf(q));
  var ops=shuffle(q.o);
  var cTxt=q.o[q.c];
  return {p:q.p,o:ops,c:ops.indexOf(cTxt)};
}

function injStyle(){
  if(document.getElementById('penal-css')) return;
  var s=document.createElement('style');
  s.id='penal-css';
  s.textContent=[
    '@keyframes pb-bounce{0%{transform:translateY(0)}100%{transform:translateY(-8px)}}',
    '@keyframes pb-gol{0%{transform:translate(0,0) rotate(0deg) scale(1)}100%{transform:translate(0,-120px) rotate(720deg) scale(0.3);opacity:0}}',
    '@keyframes pb-fallo{0%{transform:translate(0,0) rotate(0deg)}100%{transform:translate(140px,-30px) rotate(360deg);opacity:0}}'
  ].join('');
  document.head.appendChild(s);
}

// ── SETUP ─────────────────────────────────────────
win.abrirPenalesBiblicos = function(){
  var c=getC(); if(!c) return;
  document.body.classList.remove('lector-biblico-activo');
  injStyle();
  win._catSel='milagros';
  win._metaSel=5;

  var wrap=document.createElement('div');
  wrap.style.cssText='padding:20px;max-width:500px;margin:0 auto;min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#0a0818);box-sizing:border-box';

  // Header
  var hdr=document.createElement('div');
  hdr.style.cssText='display:flex;align-items:center;gap:12px;margin-bottom:24px';
  hdr.innerHTML='<button onclick="volverModuloAdolescentes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:1.1rem">&#8592;</button>'+
    '<div style="text-align:center;flex:1"><div style="font-size:2rem">&#9917;</div>'+
    '<div style="color:#55efc4;font-weight:900;font-size:1.1rem;letter-spacing:2px">PENALES BIBLICOS</div>'+
    '<div style="color:rgba(255,255,255,0.4);font-size:0.65rem">Responde y mete el gol</div></div><div style="width:40px"></div>';
  wrap.appendChild(hdr);

  // Jugadores
  var jBox=_seccion('#fdcb6e','&#128101; JUGADORES (2 a 4)');
  var jGrid=document.createElement('div');
  jGrid.style.cssText='display:flex;flex-direction:column;gap:8px';
  ['j1','j2','j3','j4'].forEach(function(id,i){
    var inp=document.createElement('input');
    inp.id=id;
    inp.placeholder=['Jugador 1','Jugador 2','Jugador 3 (opcional)','Jugador 4 (opcional)'][i];
    inp.style.cssText='width:100%;padding:12px 14px;background:rgba(0,0,0,0.4);border:1.5px solid '+COLORES_J[i]+'44;color:#fff;border-radius:10px;font-size:0.95rem;outline:none;box-sizing:border-box;font-family:inherit';
    jGrid.appendChild(inp);
  });
  jBox.appendChild(jGrid);
  wrap.appendChild(jBox);

  // Meta
  var mBox=_seccion('#a29bfe','&#127941; META DE GOLES');
  var mGrid=document.createElement('div');
  mGrid.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px';
  [3,5,7,10].forEach(function(n){
    var b=document.createElement('button');
    b.textContent=n;
    b.dataset.meta=n;
    b.style.cssText='padding:12px;border-radius:12px;cursor:pointer;font-weight:900;font-size:1rem;transition:0.15s;'+
      (n===5?'background:rgba(162,155,254,0.3);border:1.5px solid #a29bfe;color:#a29bfe':'background:rgba(162,155,254,0.08);border:1.5px solid rgba(162,155,254,0.2);color:#a29bfe');
    b.onclick=function(){
      mGrid.querySelectorAll('button').forEach(function(x){
        x.style.background='rgba(162,155,254,0.08)';
        x.style.borderColor='rgba(162,155,254,0.2)';
      });
      b.style.background='rgba(162,155,254,0.3)';
      b.style.borderColor='#a29bfe';
      win._metaSel=n;
    };
    mGrid.appendChild(b);
  });
  mBox.appendChild(mGrid);
  wrap.appendChild(mBox);

  // Categoria
  var catBox=_seccion('#74b9ff','&#128203; CATEGORIA');
  CATS.forEach(function(cat){
    var d=document.createElement('div');
    d.dataset.catid=cat.id;
    d.style.cssText='display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:12px;cursor:pointer;margin-bottom:6px;transition:0.15s';
    d.innerHTML='<span style="font-size:0.9rem;font-weight:700;color:#fff">'+cat.nom+'</span>';
    d.onclick=function(){
      catBox.querySelectorAll('[data-catid]').forEach(function(x){
        x.style.borderColor='rgba(255,255,255,0.1)';
        x.style.background='rgba(255,255,255,0.04)';
      });
      d.style.borderColor=cat.col;
      d.style.background='rgba(255,255,255,0.12)';
      win._catSel=cat.id;
    };
    catBox.appendChild(d);
  });
  wrap.appendChild(catBox);

  // Boton iniciar
  var btnIni=document.createElement('button');
  btnIni.textContent='&#9917; COMENZAR PARTIDO!';
  btnIni.innerHTML='&#9917; COMENZAR PARTIDO!';
  btnIni.style.cssText='width:100%;padding:18px;background:linear-gradient(135deg,#55efc4,#00b894);border:none;border-radius:16px;color:#000;font-weight:900;font-size:1.1rem;cursor:pointer;box-shadow:0 8px 30px rgba(85,239,196,0.4);letter-spacing:1px;margin-top:4px';
  btnIni.onclick=win._iniciarPenal;
  wrap.appendChild(btnIni);

  c.innerHTML='';
  c.appendChild(wrap);
};

function _seccion(col,titulo){
  var box=document.createElement('div');
  box.style.cssText='background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px;margin-bottom:16px';
  var tit=document.createElement('div');
  tit.innerHTML=titulo;
  tit.style.cssText='color:'+col+';font-weight:900;font-size:0.75rem;letter-spacing:2px;margin-bottom:12px';
  box.appendChild(tit);
  return box;
}

// ── INICIAR ───────────────────────────────────────
win._iniciarPenal=function(){
  var j1=document.getElementById('j1').value.trim();
  var j2=document.getElementById('j2').value.trim();
  var j3=document.getElementById('j3').value.trim();
  var j4=document.getElementById('j4').value.trim();
  if(!j1||!j2){alert('Ingresa al menos 2 jugadores');return;}
  var jgs=[j1,j2];
  if(j3) jgs.push(j3);
  if(j4) jgs.push(j4);
  G={jugadores:jgs.map(function(n,i){return{nom:n,goles:0,col:COLORES_J[i]};}),
    meta:win._metaSel||5,catId:win._catSel||'milagros',turno:0,usadas:[],pregActual:null};
  (win._renderTurnoV3||_renderTurno)();
};

// ── TURNO ─────────────────────────────────────────
function _renderTurno(){
  if(win._renderTurnoV3){win._renderTurnoV3();return;}
  var c=getC();
  var jug=G.jugadores[G.turno];
  var cat=CATS.find(function(x){return x.id===G.catId;})||CATS[0];

  var scorHTML=G.jugadores.map(function(j){
    var a=j===jug;
    return '<div style="text-align:center;padding:8px 10px;border-radius:10px;background:'+(a?'rgba(255,255,255,0.15)':'transparent')+'">'+
      '<div style="font-size:'+(a?'1.5rem':'1.1rem')+';font-weight:900;color:'+j.col+'">'+j.goles+'</div>'+
      '<div style="font-size:0.6rem;color:rgba(255,255,255,'+(a?'0.9':'0.4')+');font-weight:700;max-width:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+j.nom+'</div>'+
      (a?'<div style="width:6px;height:6px;background:'+j.col+';border-radius:50%;margin:3px auto 0"></div>':'')+'</div>';
  }).join('');

  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#050310);display:flex;flex-direction:column;align-items:center">'+
    '<div style="width:100%;background:rgba(0,0,0,0.5);padding:10px 20px;border-bottom:1px solid rgba(255,255,255,0.08);box-sizing:border-box">'+
    '<div style="display:flex;justify-content:center;gap:6px;align-items:center">'+scorHTML+'</div>'+
    '<div style="text-align:center;margin-top:4px;font-size:0.55rem;color:rgba(255,255,255,0.3);letter-spacing:2px">META: '+G.meta+' GOLES — '+cat.nom+'</div></div>'+
    '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px">'+
    // Porteria
    '<div style="width:200px;margin-bottom:0">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start">'+
    '<div style="width:8px;height:80px;background:linear-gradient(180deg,#fff,#ccc);border-radius:4px;box-shadow:0 0 15px rgba(255,255,255,0.5)"></div>'+
    '<div style="flex:1;height:8px;background:linear-gradient(90deg,#fff,#ccc);box-shadow:0 0 15px rgba(255,255,255,0.5)"></div>'+
    '<div style="width:8px;height:80px;background:linear-gradient(180deg,#fff,#ccc);border-radius:4px;box-shadow:0 0 15px rgba(255,255,255,0.5)"></div></div>'+
    '<div style="height:60px;background:repeating-linear-gradient(90deg,rgba(255,255,255,0.07) 0,rgba(255,255,255,0.07) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(180deg,rgba(255,255,255,0.07) 0,rgba(255,255,255,0.07) 1px,transparent 1px,transparent 15px);border:1px solid rgba(255,255,255,0.1)"></div></div>'+
    // Campo
    '<div style="width:220px;height:120px;background:linear-gradient(180deg,#1a6b2a,#2d9e3d);border-radius:0 0 20px 20px;border:2px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center">'+
    '<div style="width:80px;height:80px;border:2px solid rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center">'+
    '<div id="pb-balon" style="font-size:2.5rem">&#9917;</div></div></div>'+
    // Jugador
    '<div style="margin-top:28px;text-align:center">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:'+jug.col+';display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:900;color:#000;margin:0 auto 8px;box-shadow:0 0 25px '+jug.col+'80;animation:pb-bounce 1s infinite alternate">'+
    jug.nom.charAt(0).toUpperCase()+'</div>'+
    '<div style="color:'+jug.col+';font-weight:900;font-size:1.1rem">'+jug.nom+'</div>'+
    '<div style="color:rgba(255,255,255,0.5);font-size:0.7rem;margin-top:4px">Tu turno - Responde para meter el gol</div></div></div>'+
    '<div style="padding:20px;width:100%;box-sizing:border-box">'+
    '<button onclick="window._mostrarPregunta()" style="width:100%;padding:18px;background:linear-gradient(135deg,'+jug.col+','+jug.col+'aa);border:none;border-radius:16px;color:#000;font-weight:900;font-size:1.1rem;cursor:pointer;box-shadow:0 8px 30px '+jug.col+'50">&#9917; PATEAR!</button></div></div>';
}

// ── PREGUNTA ──────────────────────────────────────
win._mostrarPregunta=function(){
  G.pregActual=getPregunta();
  var q=G.pregActual;
  var jug=G.jugadores[G.turno];
  var c=getC();

  var opcs=q.o.map(function(op,i){
    return '<button id="pb-op'+i+'" onclick="window._responder('+i+')" style="width:100%;padding:14px 12px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.15);color:#fff;border-radius:14px;cursor:pointer;text-align:left;font-size:0.88rem;display:flex;align-items:center;gap:10px;font-family:inherit;box-sizing:border-box;margin-bottom:8px">'+
      '<span style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:0.8rem;flex-shrink:0">'+['A','B','C','D'][i]+'</span>'+op+'</button>';
  }).join('');

  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#050310);display:flex;flex-direction:column">'+
    '<div style="padding:14px 20px;background:rgba(0,0,0,0.4);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:10px">'+
    '<div style="width:36px;height:36px;border-radius:50%;background:'+jug.col+';display:flex;align-items:center;justify-content:center;font-weight:900;color:#000;font-size:1rem">'+jug.nom.charAt(0).toUpperCase()+'</div>'+
    '<div><div style="color:'+jug.col+';font-weight:900;font-size:0.85rem">'+jug.nom+'</div>'+
    '<div style="color:rgba(255,255,255,0.35);font-size:0.6rem">'+jug.goles+' goles de '+G.meta+'</div></div>'+
    '<div style="margin-left:auto;font-size:1.5rem">&#9917;</div></div>'+
    '<div style="flex:1;padding:20px;display:flex;flex-direction:column;justify-content:center">'+
    '<div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:20px;padding:22px;margin-bottom:20px;text-align:center">'+
    '<div style="color:rgba(255,255,255,0.4);font-size:0.6rem;letter-spacing:2px;margin-bottom:10px">PREGUNTA BIBLICA</div>'+
    '<div style="color:#fff;font-size:1rem;font-weight:700;line-height:1.6">'+q.p+'</div></div>'+
    '<div>'+opcs+'</div></div></div>';
};

// ── RESPONDER ─────────────────────────────────────
win._responder=function(idx){
  var q=G.pregActual;
  var ok=(idx===q.c);
  for(var i=0;i<4;i++){
    var b=document.getElementById('pb-op'+i);
    if(!b) continue;
    b.disabled=true;
    b.style.pointerEvents='none';
    if(i===q.c){b.style.background='rgba(85,239,196,0.25)';b.style.borderColor='#55efc4';b.style.color='#55efc4';}
    else if(i===idx&&!ok){b.style.background='rgba(255,100,100,0.2)';b.style.borderColor='#ff6b6b';b.style.color='#ff6b6b';}
  }
  setTimeout(function(){ok?_animGol():_animFallo();},700);
};

// ── GOL ───────────────────────────────────────────
function _animGol(){
  var jug=G.jugadores[G.turno];
  var c=getC();
  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a2a14,#1a4a28,#0a2a14);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px">'+
    '<div style="font-size:4rem;animation:pb-gol 0.9s ease-out forwards">&#9917;</div>'+
    '<div style="font-size:4rem;margin:10px 0;animation:pb-bounce 0.3s infinite alternate">&#127949;</div>'+
    '<div style="font-size:3rem;font-weight:900;color:#55efc4;letter-spacing:4px;margin:16px 0;text-shadow:0 0 30px #55efc4">GOL!</div>'+
    '<div style="color:'+jug.col+';font-weight:900;font-size:1.2rem">'+jug.nom+'</div>'+
    '<div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-top:6px">Respuesta correcta!</div></div>';
  jug.goles++;
  if(jug.goles>=G.meta){setTimeout(_renderGanador,1400);}
  else{setTimeout(function(){G.turno=(G.turno+1)%G.jugadores.length;_renderTurno();},1800);}
}

// ── FALLO ─────────────────────────────────────────
function _animFallo(){
  var jug=G.jugadores[G.turno];
  var q=G.pregActual;
  var c=getC();
  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#2a0a0a,#3c1010,#1a0505);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px">'+
    '<div style="font-size:4rem;animation:pb-fallo 0.8s ease-out forwards">&#9917;</div>'+
    '<div style="font-size:3rem;margin:10px 0">&#10060;</div>'+
    '<div style="font-size:2rem;font-weight:900;color:#ff6b6b;letter-spacing:3px;margin:12px 0">FALLADO</div>'+
    '<div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-bottom:20px">'+jug.nom+' fallo el penal</div>'+
    '<div style="background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.3);border-radius:14px;padding:16px;max-width:320px">'+
    '<div style="color:#55efc4;font-size:0.6rem;font-weight:900;letter-spacing:2px;margin-bottom:8px">RESPUESTA CORRECTA</div>'+
    '<div style="color:#fff;font-size:0.9rem;font-weight:700">'+q.o[q.c]+'</div></div></div>';
  setTimeout(function(){G.turno=(G.turno+1)%G.jugadores.length;_renderTurno();},2400);
}

// ── GANADOR ───────────────────────────────────────
function _renderGanador(){
  var jug=G.jugadores[G.turno];
  var c=getC();
  var sc=G.jugadores.map(function(j){
    return '<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;margin-bottom:8px">'+
      '<div style="width:36px;height:36px;border-radius:50%;background:'+j.col+';display:flex;align-items:center;justify-content:center;font-weight:900;color:#000;font-size:1rem">'+j.nom.charAt(0).toUpperCase()+'</div>'+
      '<div style="flex:1;color:#fff;font-weight:700">'+j.nom+'</div>'+
      '<div style="color:'+j.col+';font-weight:900;font-size:1.2rem">'+j.goles+' &#9917;</div></div>';
  }).join('');

  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#050310);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center">'+
    '<div style="font-size:5rem;margin-bottom:10px;animation:pb-bounce 0.5s infinite alternate">&#127942;</div>'+
    '<div style="width:80px;height:80px;border-radius:50%;background:'+jug.col+';display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;color:#000;margin:0 auto 12px;box-shadow:0 0 40px '+jug.col+'80">'+jug.nom.charAt(0).toUpperCase()+'</div>'+
    '<div style="color:'+jug.col+';font-weight:900;font-size:1.8rem;text-shadow:0 0 20px '+jug.col+'">'+jug.nom+'</div>'+
    '<div style="color:#fff;font-size:1rem;margin:8px 0 24px;opacity:0.7">CAMPEON BIBLICO!</div>'+
    '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px;width:100%;max-width:340px;margin-bottom:28px;box-sizing:border-box">'+
    '<div style="color:rgba(255,255,255,0.4);font-size:0.6rem;letter-spacing:2px;margin-bottom:12px">RESULTADO FINAL</div>'+sc+'</div>'+
    '<div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:340px">'+
    '<button onclick="window._revancha()" style="width:100%;padding:14px;background:linear-gradient(135deg,#55efc4,#00b894);border:none;border-radius:14px;color:#000;font-weight:900;font-size:1rem;cursor:pointer">&#9917; REVANCHA</button>'+
    '<button onclick="window.abrirPenalesBiblicos()" style="width:100%;padding:14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:14px;color:#fff;font-weight:900;font-size:0.9rem;cursor:pointer">&#128260; NUEVO PARTIDO</button>'+
    '<button onclick="volverModuloAdolescentes()" style="width:100%;padding:14px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:rgba(255,255,255,0.5);font-weight:700;font-size:0.85rem;cursor:pointer">&#8592; Volver</button></div></div>';
}

win._revancha=function(){
  if(!G) return;
  var jgs=G.jugadores.map(function(j){return j.nom;});
  var m=G.meta;var ci=G.catId;
  G={jugadores:jgs.map(function(n,i){return{nom:n,goles:0,col:COLORES_J[i]};}),meta:m,catId:ci,turno:0,usadas:[]};
  (win._renderTurnoV3||_renderTurno)();
};

function volverModuloAdolescentes(){
  if(typeof renderModuloAdolescentes==='function') renderModuloAdolescentes();
}

// Exponer estado para capa visual
win._CATS=CATS;
win._BANCO=BANCO;
win._shuffle=shuffle;
win._getBancoMezcla=getBancoMezcla;
Object.defineProperty(win,'_G',{get:function(){return G;},set:function(v){G=v;},configurable:true});
win._renderGanadorV3=function(){_renderGanador();};

})(window);
