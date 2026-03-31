const fs = require('fs');

let content = fs.readFileSync('build_cultos.js', 'utf8');

const t = '\\\\';  // Doble backslash -> '\\' (equivale a un escape real en el string)
const q = '\\`';     // Escape de backtick literal -> '\`'

// 1. Delegar Formulario Regular
const re1 = /function delegarFormularioRegular\(\) \{[\s\S]*?window\.open\('https:\/\/wa\.me\/\?text=' \+ encodeURIComponent\(texto\), '_blank'\);\s*\}/;

let str1 = "function delegarFormularioRegular() {\\n";
str1 += "    const dia = document.getElementById('reg-dia').value;\\n";
str1 += "    const diaMayus = dia.toUpperCase();\\n";
str1 += "    let texto = "+q+"🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\\n"+q+";\\n";
str1 += "    texto += "+q+"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n"+q+";\\n";
str1 += "    texto += "+q+"📝 *PROGRAMA DE CULTO* | *\\${diaMayus}*\\n"+q+";\\n";
str1 += "    texto += "+q+"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n"+q+";\\n";
str1 += "    texto += "+q+"👋 _Por favor completa los espacios en blanco y reenvíamelo:_ \\n\\n"+q+";\\n";
str1 += "    texto += "+q+"👑 *OFICIALES DE TURNO*\\n"+q+";\\n";
str1 += "    texto += "+q+"🔹 *Ancianato:* ___\\n"+q+";\\n";
str1 += "    texto += "+q+"🔹 *Diácono(s):* ___\\n"+q+";\\n";
str1 += "    texto += "+q+"🔹 *Diaconisa(s):* ___\\n\\n"+q+";\\n";
str1 += "    texto += "+q+"📖 *ORDEN DEL SERVICIO*\\n"+q+";\\n";
str1 += "    texto += "+q+"1️⃣ *Servicio de Alabanza:* ___\\n"+q+";\\n";
str1 += "    texto += "+q+"2️⃣ *Palabras de Bienvenida:* ___\\n"+q+";\\n";
str1 += "    texto += "+q+"3️⃣ *Oración de Invocación:* ___\\n"+q+";\\n";
str1 += "    texto += "+q+"4️⃣ *Himno Inicial* (Dirige ___): Himno #___\\n"+q+";\\n";
str1 += "    texto += "+q+"5️⃣ *Lectura Bíblica* (Lector ___): ___\\n"+q+";\\n";
str1 += "    let nextNum = 6;\\n";
str1 += "    if (dia === 'miercoles') {\\n";
str1 += "        texto += "+q+"\\${nextNum++}️⃣ *Momento de Testimonios:* ___\\n"+q+";\\n";
str1 += "    }\\n";
str1 += "    texto += "+q+"\\${nextNum++}️⃣ *Alabanza Especial* (Presenta ___): ___\\n"+q+";\\n";
str1 += "    texto += "+q+"\\${nextNum++}️⃣ *Mensajes de la Palabra* (Predicador ___): ___\\n"+q+";\\n";
str1 += "    texto += "+q+"      📌 *Tema:* ___\\n"+q+";\\n";
str1 += "    texto += "+q+"\\${nextNum++}️⃣ *Himno Final* (Dirige ___): Himno #___\\n"+q+";\\n";
str1 += "    texto += "+q+"🔟 *Oración de Despedida:* ___\\n\\n"+q+";\\n";
str1 += "    texto += "+q+"✨ _\"Todo hágase decentemente y con orden.\"_\\n"+q+";\\n";
str1 += "    window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');\\n";
str1 += "}";


// 2. Compartir Lleno Actual
const re2 = /function compartirLlenoActual\(\) \{[\s\S]*?window\.open\('https:\/\/wa\.me\/\?text=' \+ encodeURIComponent\(texto\), '_blank'\);\s*\}\s*\}/;

let str2 = "function compartirLlenoActual() {\\n";
str2 += "    const dia = document.getElementById('reg-dia').value;\\n";
str2 += "    const diaMayus = dia.toUpperCase();\\n";
str2 += "    const getVal = (id) => document.getElementById(id) ? (document.getElementById(id).value.trim() || \"-\") : \"-\";\\n";
str2 += "    const libro = document.getElementById('reg-lectura-libro') ? document.getElementById('reg-lectura-libro').value.trim() : '';\\n";
str2 += "    const cap = document.getElementById('reg-lectura-capitulo') ? document.getElementById('reg-lectura-capitulo').value.trim() : '';\\n";
str2 += "    const ver = document.getElementById('reg-lectura-versiculos') ? document.getElementById('reg-lectura-versiculos').value.trim() : '';\\n";
str2 += "    const reqLectura = "+q+"\\${libro} \\${cap}:\\${ver}"+q+".trim().replace(/^:\\s*|:$/g, '').replace(/\\s+/g, ' ');\\n";

str2 += "    let texto = "+q+"🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\\n"+q+";\\n";
str2 += "    texto += "+q+"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n"+q+";\\n";
str2 += "    texto += "+q+"🕊️ *PROGRAMA DE CULTO* | *\\${diaMayus}*\\n"+q+";\\n";
str2 += "    texto += "+q+"📅 *Fecha:* \\${document.getElementById('reg-fecha').value.split('-').reverse().join('/')}\\n"+q+";\\n";
str2 += "    texto += "+q+"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\\n"+q+";\\n";
str2 += "    texto += "+q+"👑 *OFICIALES DE TURNO*\\n"+q+";\\n";
str2 += "    texto += "+q+"🔹 *Ancianato:* \\${getVal('reg-anciano')}\\n"+q+";\\n";
str2 += "    texto += "+q+"🔹 *Diácono(s):* \\${getVal('reg-diacono')}\\n"+q+";\\n";
str2 += "    texto += "+q+"🔹 *Diaconisa(s):* \\${getVal('reg-diaconisa')}\\n\\n"+q+";\\n";

str2 += "    texto += "+q+"📖 *ORDEN DEL SERVICIO*\\n"+q+";\\n";
str2 += "    texto += "+q+"1️⃣ *Servicio de Alabanza:* \\${getVal('reg-alabanza')}\\n"+q+";\\n";
str2 += "    texto += "+q+"2️⃣ *Palabras de Bienvenida:* \\${getVal('reg-bienvenida')}\\n"+q+";\\n";
str2 += "    texto += "+q+"3️⃣ *Oración de Invocación:* \\${getVal('reg-oracionIni')}\\n"+q+";\\n";

str2 += "    const h1Tit = document.getElementById('himno-titulo-reg-himnoIni');\\n";
str2 += "    let h1 = getVal('reg-himnoIni');\\n";
str2 += "    if (h1Tit && h1Tit.textContent && h1 !== \"-\") h1 += "+q+" (\\${h1Tit.textContent.replace(/^.*?—\\s*/, '')})"+q+";\\n";
str2 += "    let valH1Q = getVal('reg-himnoIni-quien');\\n";
str2 += "    const preH1 = valH1Q !== \"-\" ? "+q+" (Dirige: \\${valH1Q})"+q+" : \"\";\\n";
str2 += "    texto += "+q+"4️⃣ *Himno Inicial\\${preH1}:* \\${h1}\\n"+q+";\\n";

str2 += "    let valLecQ = getVal('reg-lectura-quien');\\n";
str2 += "    const preLec = valLecQ !== \"-\" ? "+q+" (Lector: \\${valLecQ})"+q+" : \"\";\\n";
str2 += "    texto += "+q+"5️⃣ *Lectura Bíblica\\${preLec}:* \\${reqLectura || \"-\"}\\n"+q+";\\n";

str2 += "    const tEspecial = getVal('reg-especial');\\n";
str2 += "    let valEspQ = getVal('reg-especial-quien');\\n";
str2 += "    const pEspecial = valEspQ !== \"-\" ? "+q+" (Presenta: \\${valEspQ})"+q+" : \"\";\\n";

str2 += "    const tPredicador = getVal('reg-mensaje');\\n";
str2 += "    let valPredQ = getVal('reg-predicador-quien');\\n";
str2 += "    const pPredicador = valPredQ !== \"-\" ? "+q+" (Predicador: \\${valPredQ})"+q+" : \"\";\\n";
str2 += "    const tema = getVal('reg-mensaje-tema');\\n";
str2 += "    const strTema = (tema && tema !== \"-\") ? "+q+"\\n      📌 *Tema:* \\\"\\${tema}\\\""+q+" : \"\";\\n";

str2 += "    const h2Tit = document.getElementById('himno-titulo-reg-himnoFin');\\n";
str2 += "    let h2 = getVal('reg-himnoFin');\\n";
str2 += "    if (h2Tit && h2Tit.textContent && h2 !== \"-\") h2 += "+q+" (\\${h2Tit.textContent.replace(/^.*?—\\s*/, '')})"+q+";\\n";
str2 += "    let valH2Q = getVal('reg-himnoFin-quien');\\n";
str2 += "    const preH2 = valH2Q !== \"-\" ? "+q+" (Dirige: \\${valH2Q})"+q+" : \"\";\\n";

str2 += "    let nextNum = 6;\\n";
str2 += "    if (dia === 'miercoles') {\\n";
str2 += "        texto += "+q+"\\${nextNum++}️⃣ *Momento de Testimonios:* \\${getVal('reg-testimonios')}\\n"+q+";\\n";
str2 += "    }\\n";
str2 += "    texto += "+q+"\\${nextNum++}️⃣ *Alabanza Especial\\${pEspecial}:* \\${tEspecial}\\n"+q+";\\n";
str2 += "    texto += "+q+"\\${nextNum++}️⃣ *Mensaje de la Palabra\\${pPredicador}:* \\${tPredicador}\\${strTema}\\n"+q+";\\n";
str2 += "    texto += "+q+"\\${nextNum++}️⃣ *Himno Final\\${preH2}:* \\${h2}\\n"+q+";\\n";
str2 += "    texto += "+q+"🔟 *Oración de Despedida:* \\${getVal('reg-oracionFin')}\\n\\n"+q+";\\n";

str2 += "    texto += "+q+"✨ _\"Yo me alegré con los que me decían: A la casa de Jehová iremos.\"_\\n"+q+";\\n";
str2 += "    if (navigator.share) { navigator.share({ title: "+q+"Culto de \\${diaMayus}"+q+", text: texto }).catch(() => {}); } else { window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank'); }\\n";
str2 += "}";

// 3. Compartir Plantilla Regular
const re3 = /function compartirPlantillaRegular\(id\) \{[\s\S]*?window\.open\('https:\/\/wa\.me\/\?text=' \+ encodeURIComponent\(texto\), '_blank'\);\s*\}\s*\}/;

let str3 = "function compartirPlantillaRegular(id) {\\n";
str3 += "    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');\\n";
str3 += "    let reg = registros.find(r => r.id === id);\\n";
str3 += "    if (!reg) return;\\n";
str3 += "    let texto = "+q+"🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\\n"+q+";\\n";
str3 += "    texto += "+q+"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n"+q+";\\n";
str3 += "    texto += "+q+"🕊️ *PROGRAMA DE CULTO* | *\\${reg.dia.toUpperCase()}*\\n"+q+";\\n";
str3 += "    texto += "+q+"📅 *Fecha:* \\${reg.fecha.split('-').reverse().join('/')}\\n"+q+";\\n";
str3 += "    texto += "+q+"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\\n"+q+";\\n";
str3 += "    texto += "+q+"👑 *OFICIALES DE TURNO*\\n"+q+";\\n";
str3 += "    texto += "+q+"🔹 *Ancianato:* \\${reg.anciano && reg.anciano!==\"-\" ? reg.anciano : \"-\"}\\n"+q+";\\n";
str3 += "    texto += "+q+"🔹 *Diácono(s):* \\${reg.diacono && reg.diacono!==\"-\" ? reg.diacono : \"-\"}\\n"+q+";\\n";
str3 += "    texto += "+q+"🔹 *Diaconisa(s):* \\${reg.diaconisa && reg.diaconisa!==\"-\" ? reg.diaconisa : \"-\"}\\n\\n"+q+";\\n";
str3 += "    texto += "+q+"📖 *ORDEN DEL SERVICIO*\\n"+q+";\\n";
str3 += "    texto += "+q+"1️⃣ *Servicio de Alabanza:* \\${reg.alabanza || \"-\"}\\n"+q+";\\n";
str3 += "    texto += "+q+"2️⃣ *Palabras de Bienvenida:* \\${reg.bienvenida || \"-\"}\\n"+q+";\\n";
str3 += "    texto += "+q+"3️⃣ *Oración de Invocación:* \\${reg.oracionIni || \"-\"}\\n"+q+";\\n";
str3 += "    let strH1 = reg.himnoIni || \"-\";\\n";
str3 += "    if (reg.himnoIni_titulo) strH1 += "+q+" (\\${reg.himnoIni_titulo})"+q+";\\n";
str3 += "    let preH1 = reg.himnoIni_quien && reg.himnoIni_quien !== \"-\" ? "+q+" (Dirige: \\${reg.himnoIni_quien})"+q+" : \"\";\\n";
str3 += "    texto += "+q+"4️⃣ *Himno Inicial\\${preH1}:* \\${strH1}\\n"+q+";\\n";
str3 += "    let preLec = reg.lectura_quien && reg.lectura_quien !== \"-\" ? "+q+" (Lector: \\${reg.lectura_quien})"+q+" : \"\";\\n";
str3 += "    texto += "+q+"5️⃣ *Lectura Bíblica\\${preLec}:* \\${reg.lectura || \"-\"}\\n"+q+";\\n";
str3 += "    const prePred = reg.predicador_quien && reg.predicador_quien !== \"-\" ? "+q+" (Predicador: \\${reg.predicador_quien})"+q+" : \"\";\\n";
str3 += "    const strTema = reg.mensaje_tema && reg.mensaje_tema !== \"-\" ? "+q+"\\n      📌 *Tema:* \\\"\\${reg.mensaje_tema}\\\""+q+" : \"\";\\n";
str3 += "    let strH2 = reg.himnoFin || \"-\";\\n";
str3 += "    if (reg.himnoFin_titulo) strH2 += "+q+" (\\${reg.himnoFin_titulo})"+q+";\\n";
str3 += "    let preH2 = reg.himnoFin_quien && reg.himnoFin_quien !== \"-\" ? "+q+" (Dirige: \\${reg.himnoFin_quien})"+q+" : \"\";\\n";
str3 += "    const pEspecial = reg.especial_quien && reg.especial_quien !== \"-\" ? "+q+" (Presenta: \\${reg.especial_quien})"+q+" : \"\";\\n";

str3 += "    let nextNum = 6;\\n";
str3 += "    if (reg.dia === 'miercoles') {\\n";
str3 += "        texto += "+q+"\\${nextNum++}️⃣ *Momento de Testimonios:* \\${reg.testimonios || \"-\"}\\n"+q+";\\n";
str3 += "    }\\n";
str3 += "    texto += "+q+"\\${nextNum++}️⃣ *Alabanza Especial\\${pEspecial}:* \\${reg.especial || \"-\"}\\n"+q+";\\n";
str3 += "    texto += "+q+"\\${nextNum++}️⃣ *Mensaje de la Palabra\\${prePred}:* \\${reg.mensaje || \"-\"}\\${strTema}\\n"+q+";\\n";
str3 += "    texto += "+q+"\\${nextNum++}️⃣ *Himno Final\\${preH2}:* \\${strH2}\\n"+q+";\\n";
str3 += "    texto += "+q+"🔟 *Oración de Despedida:* \\${reg.oracionFin || \"-\"}\\n\\n"+q+";\\n";
str3 += "    texto += "+q+"✨ _\"Yo me alegré con los que me decían: A la casa de Jehová iremos.\"_\\n"+q+";\\n";
str3 += "    if (navigator.share) { navigator.share({ title: "+q+"Culto de \\${reg.dia.toUpperCase()}"+q+", text: texto }).catch(() => {}); } else { window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank'); }\\n";
str3 += "}";

content = content.replace(re1, str1);
content = content.replace(re2, str2);
content = content.replace(re3, str3);

fs.writeFileSync('build_cultos.js', content);
console.log("Patch exitoso usando reemplazo directo!");
