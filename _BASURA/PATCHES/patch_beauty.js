const fs = require('fs');
let content = fs.readFileSync('build_cultos.js', 'utf8');

// 1. Rename Button
content = content.replace(
    /2\.\s*✨\s*CREAR PLANTILLA \(Elegante\)/,
    `2. ✨ PLANTILLA (WhatsApp)`
);

// 2. Replace delegarFormularioRegular
const deG = /function delegarFormularioRegular\(\) \{[\s\S]*?window\.open\('https:\/\/wa\.me\/\?text=' \+ encodeURIComponent\(texto\), '_blank'\);\s*\}/;
const repDe = `function delegarFormularioRegular() {
    const dia = document.getElementById('reg-dia').value;
    const diaMayus = dia.toUpperCase();
    
    let texto = \`🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\\n\`;
    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\`;
    texto += \`📝 *PROGRAMA DE CULTO* | *\${diaMayus}*\\n\`;
    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\`;
    texto += \`👋 _Por favor completa los espacios en blanco y reenvíamelo:_ \\n\\n\`;
    
    texto += \`👑 *OFICIALES DE TURNO*\\n\`;
    texto += \`🔹 *Ancianato:* ___\\n\`;
    texto += \`🔹 *Diácono(s):* ___\\n\`;
    texto += \`🔹 *Diaconisa(s):* ___\\n\\n\`;

    texto += \`📖 *ORDEN DEL SERVICIO*\\n\`;
    texto += \`1️⃣ *Servicio de Alabanza:* ___\\n\`;
    texto += \`2️⃣ *Palabras de Bienvenida:* ___\\n\`;
    texto += \`3️⃣ *Oración de Invocación:* ___\\n\`;
    texto += \`4️⃣ *Himno Inicial* (Dirige ___): Himno #___\\n\`;
    texto += \`5️⃣ *Lectura Bíblica* (Lector ___): ___\\n\`;
    
    let nextNum = 6;
    if (dia === 'miercoles') {
        texto += \`\${nextNum++}️⃣ *Momento de Testimonios:* ___\\n\`;
    }
    texto += \`\${nextNum++}️⃣ *Alabanza Especial* (Presenta ___): ___\\n\`;
    texto += \`\${nextNum++}️⃣ *Mensajes de la Palabra* (Predicador ___): ___\\n\`;
    texto += \`      📌 *Tema:* ___\\n\`;
    texto += \`\${nextNum++}️⃣ *Himno Final* (Dirige ___): Himno #___\\n\`;
    texto += \`🔟 *Oración de Despedida:* ___\\n\\n\`;
    
    texto += \`✨ _"Todo hágase decentemente y con orden."_\\n\`;
    
    window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
}`;
content = content.replace(deG, repDe);

// 3. Replace compartirLlenoActual
const compG = /function compartirLlenoActual\(\) \{[\s\S]*?window\.open\('https:\/\/wa\.me\/\?text=' \+ encodeURIComponent\(texto\), '_blank'\);\s*\}\s*\}/;
const compG2 = /function compartirLlenoActual\(\) \{[\s\S]*?\}\s*(?=\n\nfunction guardarCultoRegular)/;
const repComp = `function compartirLlenoActual() {
    const dia = document.getElementById('reg-dia').value;
    const diaMayus = dia.toUpperCase();
    
    const getVal = (id) => document.getElementById(id) ? (document.getElementById(id).value.trim() || "-") : "-";
    
    const libro = document.getElementById('reg-lectura-libro') ? document.getElementById('reg-lectura-libro').value.trim() : '';
    const cap = document.getElementById('reg-lectura-capitulo') ? document.getElementById('reg-lectura-capitulo').value.trim() : '';
    const ver = document.getElementById('reg-lectura-versiculos') ? document.getElementById('reg-lectura-versiculos').value.trim() : '';
    const reqLectura = \`\${libro} \${cap}:\${ver}\`.trim().replace(/^:\\s*|:$/g, '').replace(/\\s+/g, ' ');

    let texto = \`🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\\n\`;
    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\`;
    texto += \`🕊️ *PROGRAMA DE CULTO* | *\${diaMayus}*\\n\`;
    texto += \`📅 *Fecha:* \${document.getElementById('reg-fecha').value.split('-').reverse().join('/')}\\n\`;
    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\\n\`;
    
    texto += \`👑 *OFICIALES DE TURNO*\\n\`;
    texto += \`🔹 *Ancianato:* \${getVal('reg-anciano')}\\n\`;
    texto += \`🔹 *Diácono(s):* \${getVal('reg-diacono')}\\n\`;
    texto += \`🔹 *Diaconisa(s):* \${getVal('reg-diaconisa')}\\n\\n\`;

    texto += \`📖 *ORDEN DEL SERVICIO*\\n\`;
    texto += \`1️⃣ *Servicio de Alabanza:* \${getVal('reg-alabanza')}\\n\`;
    texto += \`2️⃣ *Palabras de Bienvenida:* \${getVal('reg-bienvenida')}\\n\`;
    texto += \`3️⃣ *Oración de Invocación:* \${getVal('reg-oracionIni')}\\n\`;
    
    const h1Tit = document.getElementById('himno-titulo-reg-himnoIni');
    let h1 = getVal('reg-himnoIni');
    if (h1Tit && h1Tit.textContent && h1 !== "-") h1 += \` (\${h1Tit.textContent.replace(/^.*?—\\s*/, '')})\`;
    let valH1Q = getVal('reg-himnoIni-quien');
    const preH1 = valH1Q !== "-" ? \` (Dirige: \${valH1Q})\` : "";
    texto += \`4️⃣ *Himno Inicial\${preH1}:* \${h1}\\n\`;

    let valLecQ = getVal('reg-lectura-quien');
    const preLec = valLecQ !== "-" ? \` (Lector: \${valLecQ})\` : "";
    texto += \`5️⃣ *Lectura Bíblica\${preLec}:* \${reqLectura || "-"}\\n\`;
    
    const tEspecial = getVal('reg-especial');
    let valEspQ = getVal('reg-especial-quien');
    const pEspecial = valEspQ !== "-" ? \` (Presenta: \${valEspQ})\` : "";
    
    const tPredicador = getVal('reg-mensaje');
    let valPredQ = getVal('reg-predicador-quien');
    const pPredicador = valPredQ !== "-" ? \` (Predicador: \${valPredQ})\` : "";
    const tema = getVal('reg-mensaje-tema');
    const strTema = (tema && tema !== "-") ? \`\\n      📌 *Tema:* "\${tema}"\` : "";

    const h2Tit = document.getElementById('himno-titulo-reg-himnoFin');
    let h2 = getVal('reg-himnoFin');
    if (h2Tit && h2Tit.textContent && h2 !== "-") h2 += \` (\${h2Tit.textContent.replace(/^.*?—\\s*/, '')})\`;
    let valH2Q = getVal('reg-himnoFin-quien');
    const preH2 = valH2Q !== "-" ? \` (Dirige: \${valH2Q})\` : "";

    let nextNum = 6;
    if (dia === 'miercoles') {
        texto += \`\${nextNum++}️⃣ *Momento de Testimonios:* \${getVal('reg-testimonios')}\\n\`;
    }
    texto += \`\${nextNum++}️⃣ *Alabanza Especial\${pEspecial}:* \${tEspecial}\\n\`;
    texto += \`\${nextNum++}️⃣ *Mensaje de la Palabra\${pPredicador}:* \${tPredicador}\${strTema}\\n\`;
    texto += \`\${nextNum++}️⃣ *Himno Final\${preH2}:* \${h2}\\n\`;
    texto += \`🔟 *Oración de Despedida:* \${getVal('reg-oracionFin')}\\n\\n\`;

    texto += \`✨ _"Yo me alegré con los que me decían: A la casa de Jehová iremos."_\\n\`;

    if (navigator.share) {
        navigator.share({
            title: \`Culto de \${diaMayus}\`,
            text: texto
        }).catch(() => {});
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
}`;
content = content.replace(compG2, repComp);

// 4. Replace compartirPlantillaRegular
const ptG = /function compartirPlantillaRegular\(id\) \{[\s\S]*?window\.open\('https:\/\/wa\.me\/\?text=' \+ encodeURIComponent\(texto\), '_blank'\);\s*\}\s*\}/;
const repPt = `function compartirPlantillaRegular(id) {
    let registros = JSON.parse(localStorage.getItem('legado_cultos_regulares') || '[]');
    let reg = registros.find(r => r.id === id);
    if (!reg) return;

    let texto = \`🌟 *IGLESIA ADVENTISTA CYPRESS HILLS* 🌟\\n\`;
    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\`;
    texto += \`🕊️ *PROGRAMA DE CULTO* | *\${reg.dia.toUpperCase()}*\\n\`;
    texto += \`📅 *Fecha:* \${reg.fecha.split('-').reverse().join('/')}\\n\`;
    texto += \`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\n\\n\`;
    
    texto += \`👑 *OFICIALES DE TURNO*\\n\`;
    texto += \`🔹 *Ancianato:* \${reg.anciano && reg.anciano!=="-" ? reg.anciano : "-"}\\n\`;
    texto += \`🔹 *Diácono(s):* \${reg.diacono && reg.diacono!=="-" ? reg.diacono : "-"}\\n\`;
    texto += \`🔹 *Diaconisa(s):* \${reg.diaconisa && reg.diaconisa!=="-" ? reg.diaconisa : "-"}\\n\\n\`;

    texto += \`📖 *ORDEN DEL SERVICIO*\\n\`;
    texto += \`1️⃣ *Servicio de Alabanza:* \${reg.alabanza || "-"}\\n\`;
    texto += \`2️⃣ *Palabras de Bienvenida:* \${reg.bienvenida || "-"}\\n\`;
    texto += \`3️⃣ *Oración de Invocación:* \${reg.oracionIni || "-"}\\n\`;
    
    let strH1 = reg.himnoIni || "-";
    if (reg.himnoIni_titulo) strH1 += \` (\${reg.himnoIni_titulo})\`;
    let preH1 = reg.himnoIni_quien && reg.himnoIni_quien !== "-" ? \` (Dirige: \${reg.himnoIni_quien})\` : \`\`;
    texto += \`4️⃣ *Himno Inicial\${preH1}:* \${strH1}\\n\`;

    let preLec = reg.lectura_quien && reg.lectura_quien !== "-" ? \` (Lector: \${reg.lectura_quien})\` : \`\`;
    texto += \`5️⃣ *Lectura Bíblica\${preLec}:* \${reg.lectura || "-"}\\n\`;
    
    const prePred = reg.predicador_quien && reg.predicador_quien !== "-" ? \` (Predicador: \${reg.predicador_quien})\` : \`\`;
    const strTema = reg.mensaje_tema && reg.mensaje_tema !== "-" ? \`\\n      📌 *Tema:* "\${reg.mensaje_tema}"\` : \`\`;

    let strH2 = reg.himnoFin || "-";
    if (reg.himnoFin_titulo) strH2 += \` (\${reg.himnoFin_titulo})\`;
    let preH2 = reg.himnoFin_quien && reg.himnoFin_quien !== "-" ? \` (Dirige: \${reg.himnoFin_quien})\` : \`\`;

    const pEspecial = reg.especial_quien && reg.especial_quien !== "-" ? \` (Presenta: \${reg.especial_quien})\` : \`\`;

    let nextNum = 6;
    if (reg.dia === 'miercoles') {
        texto += \`\${nextNum++}️⃣ *Momento de Testimonios:* \${reg.testimonios || "-"}\\n\`;
    }
    texto += \`\${nextNum++}️⃣ *Alabanza Especial\${pEspecial}:* \${reg.especial || "-"}\\n\`;
    texto += \`\${nextNum++}️⃣ *Mensaje de la Palabra\${prePred}:* \${reg.mensaje || "-"}\${strTema}\\n\`;
    texto += \`\${nextNum++}️⃣ *Himno Final\${preH2}:* \${strH2}\\n\`;
    texto += \`🔟 *Oración de Despedida:* \${reg.oracionFin || "-"}\\n\\n\`;

    texto += \`✨ _"Yo me alegré con los que me decían: A la casa de Jehová iremos."_\\n\`;

    if (navigator.share) {
        navigator.share({
            title: \`Culto de \${reg.dia.toUpperCase()}\`,
            text: texto
        }).catch(() => {});
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank');
    }
}`;
content = content.replace(ptG, repPt);

fs.writeFileSync('build_cultos.js', content);
console.log("Template patching successful.");
