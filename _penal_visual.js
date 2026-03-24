// PENALES BIBLICOS v4.0 - Avatar SVG Profesional
(function(win){
'use strict';

// 8 avatares: combos piel + cabello
var AVATARES=[
  {s:'#FFCC88',h:'#1a0800'},{s:'#FFCC88',h:'#c86e00'},
  {s:'#F0A868',h:'#1a0500'},{s:'#D4935E',h:'#1a0300'},
  {s:'#C0784A',h:'#0d0100'},{s:'#8B5535',h:'#080100'},
  {s:'#5C3318',h:'#050100'},{s:'#FFCC88',h:'#e0e080'}
];
var COLJ=['#ff0000','#0044cc','#008800','#ddaa00'];
var GENJUG=['M','M','M','M'];
var AVATARES_F=[
  {s:'#FFCC88',h:'#1a0800'},{s:'#FFCC88',h:'#800020'},
  {s:'#FFCC88',h:'#c86e00'},{s:'#F0A868',h:'#1a0500'},
  {s:'#D4935E',h:'#1a0300'},{s:'#C0784A',h:'#0d0100'},
  {s:'#5C3318',h:'#050100'},{s:'#FFCC88',h:'#c060c0'}
];

// SVG JUGADOR FEMENINO
function svgJugF(av,jc,num,w,h){
  var s=av.s,ha=av.h;
  return '<svg viewBox="0 0 70 130" width="'+(w||52)+'" height="'+(h||90)+'" xmlns="http://www.w3.org/2000/svg">'+
  '<ellipse cx="35" cy="128" rx="12" ry="2.5" fill="rgba(0,0,0,0.2)"/>'+
  '<path d="M22 14 Q14 45 17 72 Q21 70 23 62 Q27 42 35 38 Q43 42 47 62 Q49 70 53 72 Q56 45 48 14 Z" fill="'+ha+'"/>'+
  '<rect x="37" y="74" width="10" height="26" rx="4" fill="#1a2980"/><rect x="37" y="95" width="10" height="9" rx="2" fill="white"/>'+
  '<ellipse cx="42" cy="106" rx="8" ry="3.5" fill="#111"/>'+
  '<rect x="23" y="74" width="10" height="26" rx="4" fill="#1a2980"/><rect x="23" y="95" width="10" height="9" rx="2" fill="white"/>'+
  '<ellipse cx="28" cy="106" rx="8" ry="3.5" fill="#111"/>'+
  '<rect x="22" y="66" width="26" height="13" rx="4" fill="#112070"/>'+
  '<rect x="21" y="33" width="28" height="34" rx="7" fill="'+jc+'"/>'+
  '<rect x="49" y="33" width="7" height="19" rx="4" fill="'+jc+'" transform="rotate(16 49 33)"/>'+
  '<rect x="14" y="33" width="7" height="19" rx="4" fill="'+jc+'" transform="rotate(-16 21 33)"/>'+
  '<circle cx="54" cy="50" r="4" fill="'+s+'"/><circle cx="16" cy="50" r="4" fill="'+s+'"/>'+
  '<rect x="31" y="23" width="8" height="12" rx="3" fill="'+s+'"/>'+
  '<ellipse cx="35" cy="14" rx="13" ry="15" fill="'+s+'"/>'+
  '<path d="M22 11 Q35 1 48 11 Q45 5 35 3 Q25 5 22 11 Z" fill="'+ha+'"/>'+
  '<ellipse cx="22" cy="14" rx="3" ry="4" fill="'+s+'"/><ellipse cx="48" cy="14" rx="3" ry="4" fill="'+s+'"/>'+
  '<ellipse cx="29" cy="14" rx="3.5" ry="4" fill="white"/><ellipse cx="41" cy="14" rx="3.5" ry="4" fill="white"/>'+
  '<circle cx="29" cy="15" r="2.5" fill="#111"/><circle cx="41" cy="15" r="2.5" fill="#111"/>'+
  '<circle cx="30" cy="13.5" r="0.8" fill="rgba(255,255,255,0.8)"/><circle cx="42" cy="13.5" r="0.8" fill="rgba(255,255,255,0.8)"/>'+
  '<line x1="26" y1="10" x2="25" y2="7.5" stroke="'+ha+'" stroke-width="1.2" stroke-linecap="round"/>'+
  '<line x1="29" y1="9.5" x2="29" y2="7" stroke="'+ha+'" stroke-width="1.2" stroke-linecap="round"/>'+
  '<line x1="32" y1="10" x2="33" y2="7.5" stroke="'+ha+'" stroke-width="1.2" stroke-linecap="round"/>'+
  '<line x1="38" y1="10" x2="37" y2="7.5" stroke="'+ha+'" stroke-width="1.2" stroke-linecap="round"/>'+
  '<line x1="41" y1="9.5" x2="41" y2="7" stroke="'+ha+'" stroke-width="1.2" stroke-linecap="round"/>'+
  '<line x1="44" y1="10" x2="45" y2="7.5" stroke="'+ha+'" stroke-width="1.2" stroke-linecap="round"/>'+
  '<path d="M26 9 Q29 7.5 32 9" stroke="'+ha+'" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
  '<path d="M38 9 Q41 7.5 44 9" stroke="'+ha+'" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
  '<path d="M30 22 Q35 25.5 40 22" stroke="#c06060" stroke-width="2" fill="none" stroke-linecap="round"/>'+
  '<path d="M32 46 Q33 44 35 46 Q37 44 38 46 Q38 48 35 51 Q32 48 32 46 Z" fill="rgba(255,255,255,0.65)"/>'+
  '</svg>';
}

// SVG helper: elige masculino o femenino segun genero
function svgPlayer(jug,w,h){
  var av=(jug.gen==='F'?AVATARES_F:AVATARES)[jug.avIdx||0]||AVATARES[0];
  var num=COLJ.indexOf(jug.col)+1;
  return jug.gen==='F'?svgJugF(av,jug.col,num,w,h):svgJug(av,jug.col,num,w,h);
}

// Toggle genero por jugador
win._pbToggleGen=function(pi,gen){
  GENJUG[pi]=gen;
  var mBtn=document.getElementById('gbtn-M-'+pi);
  var fBtn=document.getElementById('gbtn-F-'+pi);
  if(mBtn){mBtn.style.background=gen==='M'?'rgba(0,68,204,0.3)':'rgba(255,255,255,0.06)';mBtn.style.borderColor=gen==='M'?'#0044cc':'rgba(255,255,255,0.15)';}
  if(fBtn){fBtn.style.background=gen==='F'?'rgba(204,0,100,0.3)':'rgba(255,255,255,0.06)';fBtn.style.borderColor=gen==='F'?'#cc0064':'rgba(255,255,255,0.15)';}
  var avRow=document.getElementById('av-row-'+pi);
  if(!avRow)return;
  avRow.innerHTML='';
  var avs=gen==='F'?AVATARES_F:AVATARES;
  var col=COLJ[pi];
  avs.forEach(function(av,ai){
    var btn=document.createElement('div');
    btn.id='av-'+pi+'-'+ai;
    btn.style.cssText='width:44px;height:66px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:0.15s;'+
      (win._avSel[pi]===ai?'border:2.5px solid #55efc4;background:rgba(85,239,196,0.15)':'border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03)');
    btn.innerHTML=gen==='F'?svgJugF(av,col,pi+1,32,52):svgJug(av,col,pi+1,32,52);
    btn.onclick=(function(p,a){return function(){win._pbPickAv(p,a);};})(pi,ai);
    avRow.appendChild(btn);
  });
};

// === SVG JUGADOR ===
function svgJug(av,jc,num,w,h){
  var s=av.s,ha=av.h;
  return '<svg viewBox="0 0 70 120" width="'+(w||52)+'" height="'+(h||90)+'" xmlns="http://www.w3.org/2000/svg">'+
  '<ellipse cx="35" cy="118" rx="14" ry="3" fill="rgba(0,0,0,0.2)"/>'+
  '<rect x="37" y="70" width="11" height="27" rx="4" fill="#1a2980"/>'+
  '<rect x="37" y="92" width="11" height="10" rx="2" fill="white"/>'+
  '<ellipse cx="43" cy="105" rx="9" ry="4" fill="#111"/>'+
  '<rect x="22" y="70" width="11" height="27" rx="4" fill="#1a2980"/>'+
  '<rect x="22" y="92" width="11" height="10" rx="2" fill="white"/>'+
  '<ellipse cx="27" cy="105" rx="9" ry="4" fill="#111"/>'+
  '<rect x="21" y="62" width="28" height="13" rx="4" fill="#112070"/>'+
  '<rect x="18" y="30" width="34" height="35" rx="8" fill="'+jc+'"/>'+
  '<rect x="52" y="30" width="8" height="22" rx="4" fill="'+jc+'" transform="rotate(22 52 30)"/>'+
  '<rect x="10" y="30" width="8" height="22" rx="4" fill="'+jc+'" transform="rotate(-22 18 30)"/>'+
  '<circle cx="58" cy="50" r="5" fill="'+s+'"/>'+
  '<circle cx="12" cy="50" r="5" fill="'+s+'"/>'+
  '<rect x="30" y="21" width="10" height="12" rx="3" fill="'+s+'"/>'+
  '<ellipse cx="35" cy="13" rx="13" ry="15" fill="'+s+'"/>'+
  '<ellipse cx="22" cy="13" rx="3" ry="4.5" fill="'+s+'"/>'+
  '<ellipse cx="48" cy="13" rx="3" ry="4.5" fill="'+s+'"/>'+
  '<path d="M22 10 Q35 -1 48 10 L48 4 Q35 -6 22 4 Z" fill="'+ha+'"/>'+
  '<ellipse cx="29" cy="13" rx="3" ry="3.5" fill="white"/>'+
  '<ellipse cx="41" cy="13" rx="3" ry="3.5" fill="white"/>'+
  '<circle cx="29" cy="14" r="2" fill="#1a1a1a"/>'+
  '<circle cx="41" cy="14" r="2" fill="#1a1a1a"/>'+
  '<circle cx="30" cy="13" r="0.8" fill="rgba(255,255,255,0.75)"/>'+
  '<circle cx="42" cy="13" r="0.8" fill="rgba(255,255,255,0.75)"/>'+
  '<path d="M26 8 Q29 6.5 32 8" stroke="'+ha+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
  '<path d="M38 8 Q41 6.5 44 8" stroke="'+ha+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
  '<circle cx="35" cy="17" r="1.8" fill="rgba(0,0,0,0.07)"/>'+
  '<path d="M30 22 Q35 26 40 22" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
  '<text x="35" y="51" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-size="10" font-weight="bold" font-family="Arial,sans-serif">'+num+'</text>'+
  '</svg>';
}

// === SVG PORTERO ===
function svgPortero(w,h){
  var jc='#d4a000',s='#FFCC88',ha='#1a0800';
  return '<svg viewBox="0 0 100 120" width="'+(w||68)+'" height="'+(h||90)+'" xmlns="http://www.w3.org/2000/svg">'+
  '<ellipse cx="50" cy="118" rx="18" ry="3" fill="rgba(0,0,0,0.2)"/>'+
  '<rect x="41" y="70" width="11" height="27" rx="4" fill="#1a5a1a"/>'+
  '<rect x="41" y="92" width="11" height="10" rx="2" fill="white"/>'+
  '<ellipse cx="47" cy="105" rx="9" ry="4" fill="#111"/>'+
  '<rect x="48" y="70" width="11" height="27" rx="4" fill="#1a5a1a"/>'+
  '<rect x="48" y="92" width="11" height="10" rx="2" fill="white"/>'+
  '<ellipse cx="54" cy="105" rx="9" ry="4" fill="#111"/>'+
  '<rect x="40" y="62" width="20" height="13" rx="4" fill="#0e400e"/>'+
  '<rect x="33" y="30" width="34" height="35" rx="8" fill="'+jc+'"/>'+
  '<rect x="9" y="28" width="28" height="9" rx="4" fill="'+jc+'"/>'+
  '<rect x="63" y="28" width="28" height="9" rx="4" fill="'+jc+'"/>'+
  '<ellipse cx="8" cy="33" rx="9" ry="6" fill="#e8d200"/>'+
  '<ellipse cx="92" cy="33" rx="9" ry="6" fill="#e8d200"/>'+
  '<rect x="44" y="21" width="12" height="12" rx="3" fill="'+s+'"/>'+
  '<ellipse cx="50" cy="13" rx="13" ry="15" fill="'+s+'"/>'+
  '<ellipse cx="37" cy="13" rx="3" ry="4.5" fill="'+s+'"/>'+
  '<ellipse cx="63" cy="13" rx="3" ry="4.5" fill="'+s+'"/>'+
  '<path d="M37 10 Q50 -1 63 10 L63 4 Q50 -6 37 4 Z" fill="'+ha+'"/>'+
  '<ellipse cx="44" cy="13" rx="3" ry="3.5" fill="white"/>'+
  '<ellipse cx="56" cy="13" rx="3" ry="3.5" fill="white"/>'+
  '<circle cx="44" cy="14" r="2" fill="#1a1a1a"/>'+
  '<circle cx="56" cy="14" r="2" fill="#1a1a1a"/>'+
  '<circle cx="45" cy="13" r="0.8" fill="rgba(255,255,255,0.75)"/>'+
  '<circle cx="57" cy="13" r="0.8" fill="rgba(255,255,255,0.75)"/>'+
  '<path d="M40 8 Q44 6.5 47 8" stroke="'+ha+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
  '<path d="M53 8 Q56 6.5 60 8" stroke="'+ha+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
  '<circle cx="50" cy="17" r="1.8" fill="rgba(0,0,0,0.07)"/>'+
  '<path d="M44 22 Q50 25 56 22" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
  '<text x="50" y="51" text-anchor="middle" fill="rgba(0,0,0,0.45)" font-size="9" font-weight="bold" font-family="Arial,sans-serif">GK</text>'+
  '</svg>';
}

// === SONIDOS ===
function sndGol(){try{var A=win.AudioContext||win.webkitAudioContext;if(!A)return;var ctx=new A();[523,659,784,1047,1319].forEach(function(f,i){var o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0.35,ctx.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+i*0.12+0.35);o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime+i*0.12);o.stop(ctx.currentTime+i*0.12+0.4);});}catch(e){}}
function sndFallo(){try{var A=win.AudioContext||win.webkitAudioContext;if(!A)return;var ctx=new A();var o=ctx.createOscillator(),g=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(380,ctx.currentTime);o.frequency.linearRampToValueAtTime(100,ctx.currentTime+0.7);g.gain.setValueAtTime(0.3,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.7);o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime);o.stop(ctx.currentTime+0.7);}catch(e){}}
function sndPatear(){try{var A=win.AudioContext||win.webkitAudioContext;if(!A)return;var ctx=new A();var o=ctx.createOscillator(),g=ctx.createGain();o.type='square';o.frequency.value=80;g.gain.setValueAtTime(0.4,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.15);o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime);o.stop(ctx.currentTime+0.15);}catch(e){}}
function vibrar(){try{if(navigator.vibrate)navigator.vibrate([100,50,200]);}catch(e){}}

// === CONFETTI ===
function confeti(){var cols=['#55efc4','#fdcb6e','#fd79a8','#74b9ff','#fff','#a29bfe'];for(var i=0;i<50;i++){(function(){var d=document.createElement('div');var sz=(4+Math.random()*8)+'px';d.style.cssText='position:fixed;width:'+sz+';height:'+sz+';border-radius:'+(Math.random()>0.5?'50%':'2px')+';background:'+cols[Math.floor(Math.random()*cols.length)]+';left:'+(Math.random()*100)+'vw;top:-10px;z-index:9999;pointer-events:none;animation:pb-confeti '+(1+Math.random()*1.5)+'s ease-in '+(Math.random()*0.6)+'s forwards';document.body.appendChild(d);setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d);},3500);})();}}

// === CSS ===
function injCSS(){
  if(document.getElementById('pbv4-css'))return;
  var s=document.createElement('style');s.id='pbv4-css';
  s.textContent=
    '@keyframes pb-confeti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(90vh) rotate(720deg);opacity:0}}'+
    '@keyframes pb-kick{0%{transform:rotate(0deg)}50%{transform:rotate(-15deg)}100%{transform:rotate(22deg)}}'+
    '@keyframes pb-kickleg{0%{transform:rotate(0deg)}100%{transform:rotate(45deg)}}'+
    '@keyframes pb-ball-gol{0%{transform:translate(-50%,0) rotate(0deg) scale(1);opacity:1}100%{transform:translate(calc(-50% - 55px),-220px) rotate(720deg) scale(0.4);opacity:1}}'+
    '@keyframes pb-ball-fallo{0%{transform:translate(-50%,0) rotate(0deg) scale(1)}100%{transform:translate(-50%,-150px) rotate(360deg) scale(0.7)}}'+
    '@keyframes pb-gk-dive{0%{transform:translateX(0) rotate(0deg)}100%{transform:translateX(55px) rotate(35deg)}}'+
    '@keyframes pb-gk-catch{0%{transform:scale(1) translateY(0)}50%{transform:scale(1.1) translateY(-10px)}100%{transform:scale(1) translateY(0)}}'+
    '@keyframes pb-gk-idle{0%{transform:translateX(-5px)}100%{transform:translateX(5px)}}'+
    '@keyframes pb-bounce{0%{transform:translateY(0)}100%{transform:translateY(-8px)}}'+
    '@keyframes pb-pulse{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0.75;transform:translate(-50%,-50%) scale(1.05)}}'+
    '@keyframes pb-net-shake{0%,100%{transform:none}25%{transform:skewX(4deg)}75%{transform:skewX(-4deg)}}'+
    '@keyframes pb-flash{0%,100%{background:transparent}50%{background:rgba(85,239,196,0.2)}}';
  document.head.appendChild(s);
}

function getC(){return document.getElementById('pantalla-estudio');}

// === SCOREBAR ===
function scorebar(G){
  var jug=G.jugadores[G.turno];
  return G.jugadores.map(function(j){
    var a=j===jug,av=AVATARES[j.avIdx||0];
    return '<div style="text-align:center;padding:4px 8px;border-radius:10px;background:'+(a?'rgba(255,255,255,0.15)':'transparent')+'">'+
      svgPlayer(j,28,42)+
      '<div style="font-size:'+(a?'1.2rem':'0.95rem')+';font-weight:900;color:'+j.col+'">'+j.goles+'</div>'+
      '<div style="font-size:0.52rem;color:rgba(255,255,255,'+(a?'0.9':'0.4')+');font-weight:700;max-width:52px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+j.nom+'</div>'+
      '</div>';
  }).join('');
}

// === ESTADIO ===
function buildEstadio(G,ballAnim,gkAnim){
  var jug=G.jugadores[G.turno];
  var av=AVATARES[jug.avIdx||0];
  var num=COLJ.indexOf(jug.col)+1;
  return '<div style="min-height:100vh;background:linear-gradient(180deg,#03071e 0%,#0d1535 38%,#1a5c1a 38%,#2d9e2d 100%);position:relative;overflow:hidden;display:flex;flex-direction:column">'+
  '<div style="background:rgba(0,0,0,0.6);padding:8px 20px;border-bottom:1px solid rgba(255,255,255,0.1);flex-shrink:0">'+
  '<div style="display:flex;justify-content:center;gap:2px;align-items:center">'+scorebar(G)+'</div></div>'+
  '<div style="position:absolute;top:0;left:0;right:0;height:38%;overflow:hidden;pointer-events:none">'+
  '<div style="position:absolute;top:12%;left:10%;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:65px 18px 0 #fff,130px 8px 0 #fff,35px 42px 0 #fff,180px 14px 0 #fff,210px 28px 0 #fff"></div>'+
  '<div style="position:absolute;top:8px;left:16px;width:4px;height:55px;background:rgba(255,255,255,0.75);box-shadow:0 0 20px 10px rgba(255,255,220,0.35)"></div>'+
  '<div style="position:absolute;top:8px;right:16px;width:4px;height:55px;background:rgba(255,255,255,0.75);box-shadow:0 0 20px 10px rgba(255,255,220,0.35)"></div>'+
  '<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:170px">'+
  '<div style="height:7px;background:#fff;box-shadow:0 0 12px rgba(255,255,255,0.6)"></div>'+
  '<div id="pb-red" style="height:92px;border:3px solid #fff;border-top:none;background:rgba(15,15,15,0.8);background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.07) 0,rgba(255,255,255,0.07) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(180deg,rgba(255,255,255,0.07) 0,rgba(255,255,255,0.07) 1px,transparent 1px,transparent 14px);display:flex;align-items:center;justify-content:center;position:relative">'+
  '<div id="pb-gk" style="display:inline-block;animation:'+gkAnim+'">'+svgPortero(65,88)+'</div>'+
  '</div>'+
  '<div style="position:absolute;top:0;left:-5px;width:7px;height:99px;background:#fff;border-radius:4px;box-shadow:0 0 12px rgba(255,255,255,0.5)"></div>'+
  '<div style="position:absolute;top:0;right:-5px;width:7px;height:99px;background:#fff;border-radius:4px;box-shadow:0 0 12px rgba(255,255,255,0.5)"></div>'+
  '</div></div>'+
  '<div style="position:absolute;bottom:0;left:0;right:0;height:62%;pointer-events:none">'+
  '<div style="position:absolute;top:0;left:0;right:0;height:1px;background:rgba(255,255,255,0.25)"></div>'+
  '<div style="position:absolute;top:14%;left:50%;transform:translateX(-50%);width:120px;height:52px;border:1.5px solid rgba(255,255,255,0.2);border-bottom:none;border-radius:60px 60px 0 0"></div>'+
  '<div style="position:absolute;top:20%;left:50%;transform:translateX(-50%);width:8px;height:8px;background:rgba(255,255,255,0.45);border-radius:50%"></div>'+
  '</div>'+
  '<div id="pb-ball" style="position:absolute;bottom:30%;left:50%;font-size:2.6rem;animation:'+ballAnim+';z-index:10">&#9917;</div>'+
  '<div style="position:absolute;bottom:3%;left:50%;transform:translateX(-50%);text-align:center">'+
  '<div style="animation:pb-kick 0.6s 0.3s ease-out forwards;display:inline-block">'+svgPlayer(jug,60,96)+'</div>'+
  '<div style="color:'+jug.col+';font-weight:900;font-size:0.85rem;margin-top:4px;text-shadow:0 2px 8px rgba(0,0,0,0.9)">'+jug.nom+'</div></div>'+
  '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-weight:900;font-size:1.3rem;letter-spacing:3px;text-shadow:0 0 20px rgba(255,255,255,0.7);animation:pb-pulse 0.5s ease infinite alternate;white-space:nowrap">PATEANDO...</div>'+
  '</div>';
}

// === SELECCION AVATAR ===
win._avSel=[0,1,2,3];
win._pbPickAv=function(pi,ai){
  win._avSel[pi]=ai;
  for(var i=0;i<8;i++){
    var el=document.getElementById('av-'+pi+'-'+i);
    if(el){
      el.style.border=i===ai?'2.5px solid #55efc4':'2px solid rgba(255,255,255,0.1)';
      el.style.background=i===ai?'rgba(85,239,196,0.15)':'rgba(255,255,255,0.03)';
    }
  }
};

// === SETUP CON AVATARES ===
win.abrirPenalesBiblicos=function(){
  injCSS();
  var c=getC();if(!c)return;
  document.body.classList.remove('lector-biblico-activo');
  win._catSel='milagros';win._metaSel=5;win._avSel=[0,1,2,3];GENJUG=['M','M','M','M'];

  function sec(col,tit){
    var b=document.createElement('div');
    b.style.cssText='background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:14px;margin-bottom:14px';
    var t=document.createElement('div');t.innerHTML=tit;
    t.style.cssText='color:'+col+';font-weight:900;font-size:0.7rem;letter-spacing:2px;margin-bottom:10px';
    b.appendChild(t);return b;
  }

  var wrap=document.createElement('div');
  wrap.style.cssText='padding:16px;max-width:500px;margin:0 auto;min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#0a0818);box-sizing:border-box';

  // Header
  var hdr=document.createElement('div');
  hdr.style.cssText='display:flex;align-items:center;gap:12px;margin-bottom:20px';
  hdr.innerHTML='<button onclick="volverModuloAdolescentes()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;width:38px;height:38px;border-radius:50%;cursor:pointer;font-size:1rem">&#8592;</button>'+
    '<div style="text-align:center;flex:1"><div style="font-size:1.8rem">&#9917;</div>'+
    '<div style="color:#55efc4;font-weight:900;font-size:1rem;letter-spacing:2px">PENALES BIBLICOS</div>'+
    '<div style="color:rgba(255,255,255,0.4);font-size:0.6rem">Elige tu avatar y juega</div></div>'+
    '<div style="width:38px"></div>';
  wrap.appendChild(hdr);

  // Jugadores + avatares
  var pBox=sec('#fdcb6e','&#128101; JUGADORES — ELIGE TU PERSONAJE');
  [0,1,2,3].forEach(function(pi){
    var col=COLJ[pi];
    var row=document.createElement('div');
    row.style.cssText='margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.06)';

    var inp=document.createElement('input');
    inp.id='j'+(pi+1);
    inp.placeholder=['Jugador 1','Jugador 2','Jugador 3 (opcional)','Jugador 4 (opcional)'][pi];
    inp.style.cssText='width:100%;padding:10px 12px;background:rgba(0,0,0,0.4);border:1.5px solid '+col+'44;color:#fff;border-radius:10px;font-size:0.9rem;outline:none;box-sizing:border-box;font-family:inherit;margin-bottom:10px';
    row.appendChild(inp);

    // Toggle masculino / femenino
    var tRow=document.createElement('div');
    tRow.style.cssText='display:flex;gap:8px;margin-bottom:10px';
    var mBtn=document.createElement('button');
    mBtn.id='gbtn-M-'+pi;
    mBtn.innerHTML='&#9794; VARON';
    mBtn.style.cssText='flex:1;padding:7px;border-radius:8px;cursor:pointer;font-size:0.72rem;font-weight:900;letter-spacing:1px;background:rgba(0,68,204,0.3);border:1.5px solid #0044cc;color:#fff;transition:0.15s';
    mBtn.onclick=(function(p){return function(){win._pbToggleGen(p,'M');};})(pi);
    var fBtn=document.createElement('button');
    fBtn.id='gbtn-F-'+pi;
    fBtn.innerHTML='&#9793; MUJER';
    fBtn.style.cssText='flex:1;padding:7px;border-radius:8px;cursor:pointer;font-size:0.72rem;font-weight:900;letter-spacing:1px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);transition:0.15s';
    fBtn.onclick=(function(p){return function(){win._pbToggleGen(p,'F');};})(pi);
    tRow.appendChild(mBtn);tRow.appendChild(fBtn);
    row.appendChild(tRow);

    var lbl=document.createElement('div');
    lbl.style.cssText='color:rgba(255,255,255,0.4);font-size:0.58rem;letter-spacing:1px;margin-bottom:8px';
    lbl.textContent='TU PERSONAJE:';
    row.appendChild(lbl);

    var avRow=document.createElement('div');
    avRow.id='av-row-'+pi;
    avRow.style.cssText='display:flex;gap:5px;flex-wrap:wrap';

    AVATARES.forEach(function(av,ai){
      var btn=document.createElement('div');
      btn.id='av-'+pi+'-'+ai;
      btn.style.cssText='width:46px;height:70px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:0.15s;'+
        (ai===pi?'border:2.5px solid #55efc4;background:rgba(85,239,196,0.15)':'border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03)');
      btn.innerHTML=svgJug(av,col,pi+1,34,54);
      btn.onclick=(function(p,a){return function(){win._pbPickAv(p,a);};})(pi,ai);
      avRow.appendChild(btn);
    });
    row.appendChild(avRow);
    pBox.appendChild(row);
  });
  wrap.appendChild(pBox);

  // Meta goles
  var mBox=sec('#a29bfe','&#127941; META DE GOLES');
  var mGrid=document.createElement('div');
  mGrid.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px';
  [3,5,7,10].forEach(function(n){
    var b=document.createElement('button');b.textContent=n;
    b.style.cssText='padding:12px;border-radius:12px;cursor:pointer;font-weight:900;font-size:1rem;transition:0.15s;'+
      (n===5?'background:rgba(162,155,254,0.3);border:1.5px solid #a29bfe;color:#a29bfe':'background:rgba(162,155,254,0.08);border:1.5px solid rgba(162,155,254,0.2);color:#a29bfe');
    b.onclick=function(){
      mGrid.querySelectorAll('button').forEach(function(x){x.style.background='rgba(162,155,254,0.08)';x.style.borderColor='rgba(162,155,254,0.2)';});
      b.style.background='rgba(162,155,254,0.3)';b.style.borderColor='#a29bfe';win._metaSel=n;
    };
    mGrid.appendChild(b);
  });
  mBox.appendChild(mGrid);wrap.appendChild(mBox);

  // Categoria
  var catBox=sec('#74b9ff','&#128203; CATEGORIA');
  (win._CATS||[]).forEach(function(cat){
    var d=document.createElement('div');d.dataset.catid=cat.id;
    d.style.cssText='display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:10px;cursor:pointer;margin-bottom:6px;transition:0.15s';
    d.innerHTML='<span style="font-size:0.85rem;font-weight:700;color:#fff">'+cat.nom+'</span>';
    d.onclick=function(){
      catBox.querySelectorAll('[data-catid]').forEach(function(x){x.style.borderColor='rgba(255,255,255,0.1)';x.style.background='rgba(255,255,255,0.04)';});
      d.style.borderColor=cat.col;d.style.background='rgba(255,255,255,0.12)';win._catSel=cat.id;
    };
    catBox.appendChild(d);
  });
  wrap.appendChild(catBox);

  var btnIni=document.createElement('button');
  btnIni.innerHTML='&#9917; COMENZAR PARTIDO!';
  btnIni.style.cssText='width:100%;padding:18px;background:linear-gradient(135deg,#55efc4,#00b894);border:none;border-radius:16px;color:#000;font-weight:900;font-size:1.1rem;cursor:pointer;box-shadow:0 8px 30px rgba(85,239,196,0.4);letter-spacing:1px;margin-top:4px';
  btnIni.onclick=win._iniciarPenal;
  wrap.appendChild(btnIni);

  c.innerHTML='';c.appendChild(wrap);
};

// === INICIAR (captura avatares) ===
win._iniciarPenal=function(){
  function gv(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  var j1=gv('j1'),j2=gv('j2'),j3=gv('j3'),j4=gv('j4');
  if(!j1||!j2){alert('Ingresa al menos 2 jugadores');return;}
  var jgs=[j1,j2];if(j3)jgs.push(j3);if(j4)jgs.push(j4);
  win._G={
    jugadores:jgs.map(function(n,i){return{nom:n,goles:0,col:COLJ[i],avIdx:win._avSel&&win._avSel[i]!==undefined?win._avSel[i]:i,gen:GENJUG[i]||'M'};}),
    meta:win._metaSel||5,catId:win._catSel||'milagros',turno:0,usadas:[],pregActual:null
  };
  win._renderTurnoV3();
};

// === TURNO ===
win._renderTurnoV3=function(){
  injCSS();
  var G=win._G;if(!G)return;
  var jug=G.jugadores[G.turno];
  var av=AVATARES[jug.avIdx||0];
  var num=COLJ.indexOf(jug.col)+1;
  var cat=(win._CATS||[]).find(function(x){return x.id===G.catId;})||{nom:G.catId};
  var c=getC();
  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(180deg,#03071e 0%,#0d1535 38%,#1a5c1a 38%,#2d9e2d 100%);display:flex;flex-direction:column">'+
    '<div style="background:rgba(0,0,0,0.6);padding:8px 20px;border-bottom:1px solid rgba(255,255,255,0.1)">'+
    '<div style="display:flex;justify-content:center;gap:2px;align-items:center">'+scorebar(G)+'</div>'+
    '<div style="text-align:center;margin-top:4px;font-size:0.5rem;color:rgba(255,255,255,0.3);letter-spacing:2px">META: '+G.meta+' GOLES | '+cat.nom+'</div></div>'+
    '<div style="position:relative;height:42%;flex-shrink:0">'+
    '<div style="position:absolute;top:8px;left:16px;width:4px;height:50px;background:rgba(255,255,255,0.75);box-shadow:0 0 18px 10px rgba(255,255,220,0.3)"></div>'+
    '<div style="position:absolute;top:8px;right:16px;width:4px;height:50px;background:rgba(255,255,255,0.75);box-shadow:0 0 18px 10px rgba(255,255,220,0.3)"></div>'+
    '<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:155px">'+
    '<div style="height:7px;background:#fff;box-shadow:0 0 12px rgba(255,255,255,0.6)"></div>'+
    '<div style="height:86px;border:3px solid #fff;border-top:none;background:rgba(15,15,15,0.75);background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.06) 0,rgba(255,255,255,0.06) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(180deg,rgba(255,255,255,0.06) 0,rgba(255,255,255,0.06) 1px,transparent 1px,transparent 14px);display:flex;align-items:center;justify-content:center">'+
    '<div style="animation:pb-gk-idle 1s ease-in-out infinite alternate">'+svgPortero(62,82)+'</div></div>'+
    '<div style="position:absolute;top:0;left:-5px;width:7px;height:93px;background:#fff;border-radius:4px"></div>'+
    '<div style="position:absolute;top:0;right:-5px;width:7px;height:93px;background:#fff;border-radius:4px"></div>'+
    '</div></div>'+
    '<div style="flex:1;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:20px">'+
    '<div style="position:absolute;top:0;left:0;right:0;height:1px;background:rgba(255,255,255,0.2)"></div>'+
    '<div style="position:absolute;top:28%;width:8px;height:8px;background:rgba(255,255,255,0.4);border-radius:50%"></div>'+
    '<div style="text-align:center;margin-bottom:12px;animation:pb-bounce 0.9s infinite alternate">'+
    svgPlayer(jug,58,90)+
    '<div style="color:'+jug.col+';font-weight:900;font-size:1rem;margin-top:4px">'+jug.nom+'</div>'+
    '<div style="color:rgba(255,255,255,0.45);font-size:0.65rem;margin-top:2px">Tu turno &#9917; Elige y patea</div></div>'+
    '<button onclick="window._mostrarPregunta()" style="padding:15px 38px;background:linear-gradient(135deg,'+jug.col+','+jug.col+'cc);border:none;border-radius:16px;color:#000;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 8px 25px '+jug.col+'50;letter-spacing:1px">&#9917; ELEGIR PREGUNTA</button>'+
    '</div></div>';
};

// === PREGUNTA CON CONFIRMAR ===
var _opSel=-1;
win._mostrarPregunta=function(){
  injCSS();_opSel=-1;
  var G=win._G;if(!G)return;
  var pool=G.catId==='mezcla'?win._getBancoMezcla():(win._BANCO[G.catId]||[]);
  var disp=pool.filter(function(q,i){return G.usadas.indexOf(i)===-1;});
  if(!disp.length){G.usadas=[];disp=pool.slice();}
  var q=disp[Math.floor(Math.random()*disp.length)];
  G.usadas.push(pool.indexOf(q));
  var ops=win._shuffle(q.o.slice());
  var cTxt=q.o[q.c];
  G.pregActual={p:q.p,o:ops,c:ops.indexOf(cTxt)};

  var jug=G.jugadores[G.turno];
  var av=AVATARES[jug.avIdx||0];
  var c=getC();
  var opcsHTML=G.pregActual.o.map(function(op,i){
    return '<div id="pbop'+i+'" onclick="window._pbSelOp('+i+')" style="padding:12px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.15);color:#fff;border-radius:12px;cursor:pointer;font-size:0.86rem;display:flex;align-items:center;gap:10px;margin-bottom:8px;transition:0.15s">'+
      '<span style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:0.75rem;flex-shrink:0">'+['A','B','C','D'][i]+'</span><span>'+op+'</span></div>';
  }).join('');

  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#050310);display:flex;flex-direction:column">'+
    '<div style="padding:10px 16px;background:rgba(0,0,0,0.4);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:10px;flex-shrink:0">'+
    svgPlayer(jug,38,56)+
    '<div><div style="color:'+jug.col+';font-weight:900;font-size:0.82rem">'+jug.nom+'</div>'+
    '<div style="color:rgba(255,255,255,0.35);font-size:0.58rem">'+jug.goles+' goles de '+G.meta+'</div></div>'+
    '<div style="margin-left:auto;font-size:1.3rem">&#9917;</div></div>'+
    '<div style="flex:1;padding:16px;display:flex;flex-direction:column;overflow-y:auto">'+
    '<div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:16px;padding:18px;margin-bottom:16px;text-align:center">'+
    '<div style="color:rgba(255,255,255,0.4);font-size:0.58rem;letter-spacing:2px;margin-bottom:8px">PREGUNTA BIBLICA</div>'+
    '<div style="color:#fff;font-size:1rem;font-weight:700;line-height:1.65">'+G.pregActual.p+'</div></div>'+
    opcsHTML+
    '<button id="pb-confirmar" onclick="window._pbConfirmar()" disabled style="width:100%;padding:15px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);border-radius:14px;color:rgba(255,255,255,0.35);font-weight:900;font-size:0.95rem;cursor:not-allowed;transition:0.3s;letter-spacing:1px;margin-top:4px">&#128683; ELIGE UNA RESPUESTA</button>'+
    '</div></div>';
};

win._pbSelOp=function(i){
  _opSel=i;
  for(var j=0;j<4;j++){
    var el=document.getElementById('pbop'+j);if(!el)continue;
    if(j===i){el.style.background='rgba(85,239,196,0.2)';el.style.borderColor='#55efc4';el.style.color='#55efc4';}
    else{el.style.background='rgba(255,255,255,0.06)';el.style.borderColor='rgba(255,255,255,0.15)';el.style.color='#fff';}
  }
  var btn=document.getElementById('pb-confirmar');
  if(btn){btn.disabled=false;btn.style.background='linear-gradient(135deg,#55efc4,#00b894)';btn.style.borderColor='#55efc4';btn.style.color='#000';btn.style.cursor='pointer';btn.innerHTML='&#9917; PATEAR!';}
};

win._pbConfirmar=function(){
  if(_opSel===-1)return;
  var G=win._G;if(!G)return;
  _animarPenal(_opSel===G.pregActual.c);
};

// === ANIMACION ===
function _animarPenal(esCorrecta){
  injCSS();
  var G=win._G;if(!G)return;
  sndPatear();
  var bA=esCorrecta?'pb-ball-gol 1.8s 0.4s ease-out forwards':'pb-ball-fallo 1.6s 0.4s ease-out forwards';
  var gkA=esCorrecta?
    'pb-gk-idle 0.4s ease-in-out infinite alternate, pb-gk-dive 0.6s 1.6s ease-in forwards':
    'pb-gk-idle 0.5s ease-in-out infinite alternate, pb-gk-catch 0.5s 1.5s ease-out forwards';
  getC().innerHTML=buildEstadio(G,bA,gkA);
  setTimeout(function(){
    if(esCorrecta){sndGol();vibrar();confeti();var r=document.getElementById('pb-red');if(r)r.style.animation='pb-net-shake 0.3s ease 3,pb-flash 0.5s ease 0.3s 2';setTimeout(function(){_showGol(G);},900);}
    else{sndFallo();setTimeout(function(){_showFallo(G);},900);}
  },2600);
}

// === GOL ===
function _showGol(G){
  var jug=G.jugadores[G.turno];
  var av=AVATARES[jug.avIdx||0];
  jug.goles++;
  var c=getC();
  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a2a14,#1a4a28,#0a2a14);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px">'+
    '<div style="font-size:4.5rem;animation:pb-bounce 0.4s infinite alternate">&#127881;</div>'+
    '<div style="font-size:3rem;font-weight:900;color:#55efc4;letter-spacing:5px;margin:12px 0;text-shadow:0 0 30px #55efc4;animation:pb-bounce 0.5s infinite alternate">GOL!!!</div>'+
    '<div style="margin:0 auto 10px;animation:pb-bounce 0.6s 0.1s infinite alternate">'+svgPlayer(jug,65,96)+'</div>'+
    '<div style="color:'+jug.col+';font-weight:900;font-size:1.2rem">'+jug.nom+'</div>'+
    '<div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-top:4px">Respuesta correcta &#9917;</div></div>';
  if(jug.goles>=G.meta){setTimeout(function(){_renderGanador(G);},1600);}
  else{setTimeout(function(){G.turno=(G.turno+1)%G.jugadores.length;win._renderTurnoV3();},2000);}
}

// === FALLO ===
function _showFallo(G){
  var jug=G.jugadores[G.turno];
  var q=G.pregActual;
  var c=getC();
  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#2a0a0a,#3c1010,#1a0505);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px">'+
    '<div style="margin-bottom:10px">'+svgPortero(80,100)+'</div>'+
    '<div style="font-size:2.5rem;font-weight:900;color:#ff6b6b;letter-spacing:3px;margin:10px 0">ATAJADO!</div>'+
    '<div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-bottom:18px">El portero detuvo el penal</div>'+
    '<div style="background:rgba(85,239,196,0.08);border:1px solid rgba(85,239,196,0.35);border-radius:14px;padding:14px;max-width:320px">'+
    '<div style="color:#55efc4;font-size:0.58rem;font-weight:900;letter-spacing:2px;margin-bottom:8px">RESPUESTA CORRECTA</div>'+
    '<div style="color:#fff;font-size:0.95rem;font-weight:700">'+q.o[q.c]+'</div></div></div>';
  setTimeout(function(){G.turno=(G.turno+1)%G.jugadores.length;win._renderTurnoV3();},2800);
}

// === GANADOR ===
function _renderGanador(G){
  var jug=G.jugadores[G.turno];
  var av=AVATARES[jug.avIdx||0];
  var c=getC();
  var sc=G.jugadores.map(function(j){
    var a2=AVATARES[j.avIdx||0];
    return '<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;margin-bottom:8px">'+
      svgPlayer(j,32,48)+
      '<div style="flex:1;color:#fff;font-weight:700;font-size:0.9rem">'+j.nom+'</div>'+
      '<div style="color:'+j.col+';font-weight:900;font-size:1.1rem">'+j.goles+' &#9917;</div></div>';
  }).join('');
  c.innerHTML='<div style="min-height:100vh;background:linear-gradient(170deg,#0a0818,#1a0f3c,#050310);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;text-align:center">'+
    '<div style="font-size:4rem;margin-bottom:8px;animation:pb-bounce 0.5s infinite alternate">&#127942;</div>'+
    '<div style="animation:pb-bounce 0.6s 0.1s infinite alternate">'+svgPlayer(jug,70,105)+'</div>'+
    '<div style="color:'+jug.col+';font-weight:900;font-size:1.8rem;margin:8px 0;text-shadow:0 0 20px '+jug.col+'">'+jug.nom+'</div>'+
    '<div style="color:#fff;font-size:0.9rem;margin-bottom:22px;opacity:0.7">CAMPEON BIBLICO &#127942;</div>'+
    '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:14px;width:100%;max-width:320px;margin-bottom:22px;box-sizing:border-box">'+
    '<div style="color:rgba(255,255,255,0.4);font-size:0.58rem;letter-spacing:2px;margin-bottom:10px">RESULTADO FINAL</div>'+sc+'</div>'+
    '<div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:320px">'+
    '<button onclick="window._pbRevancha()" style="width:100%;padding:14px;background:linear-gradient(135deg,#55efc4,#00b894);border:none;border-radius:14px;color:#000;font-weight:900;font-size:1rem;cursor:pointer">&#9917; REVANCHA</button>'+
    '<button onclick="window.abrirPenalesBiblicos()" style="width:100%;padding:14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:14px;color:#fff;font-weight:900;font-size:0.9rem;cursor:pointer">&#128260; NUEVO PARTIDO</button>'+
    '<button onclick="volverModuloAdolescentes()" style="width:100%;padding:14px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:rgba(255,255,255,0.5);font-weight:700;font-size:0.85rem;cursor:pointer">&#8592; Volver</button></div></div>';
}

win._pbRevancha=function(){
  var G=win._G;if(!G)return;
  var jgs=G.jugadores.map(function(j){return{nom:j.nom,goles:0,col:j.col,avIdx:j.avIdx};});
  win._G={jugadores:jgs,meta:G.meta,catId:G.catId,turno:0,usadas:[],pregActual:null};
  win._renderTurnoV3();
};

win._renderTurno=win._renderTurnoV3;
win._renderGanadorV3=function(){var G=win._G;if(G)_renderGanador(G);};

console.log('[PenalesV4] SVG Avatares OK');
})(window);
