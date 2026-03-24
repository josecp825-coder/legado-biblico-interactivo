const fs = require('fs');
const path = 'C:\\Users\\jhose\\OneDrive\\Desktop\\PROYECTO DE CODIGO\\LEGADO_BIBLICO_PROD\\data_iglesia_v1.js';

let content = fs.readFileSync(path, 'utf-8');

// The old code to replace (from the button write to the closing };)
const oldCode = content.substring(
    content.indexOf("    ventana.document.write('<button class=\"btn\" id=\"btnEnviar\">"),
    content.indexOf("};", content.indexOf("ventana.document.getElementById('btnEnviar')")) + 2
);

const newCode = `    ventana.document.write('<button class="btn" id="btnEnviar">\u{1f4e4} ENVIAR PROGRAMA</button></div>');
    ventana.document.write('<div class="ft">Generado por Legado B\u00edblico</div></div></body></html>');
    ventana.document.close();

    // Inyectar script con createElement (funciona cross-window)
    var sc = ventana.document.createElement('script');
    sc.textContent = 'function enviarForm(){' +
        'var g=function(i){var e=document.getElementById("f-"+i);return e&&e.value.trim()?e.value.trim():"---"};' +
        'var L="\\n";' +
        'var t="\\u26ea *PROGRAMA DE CULTO*"+L' +
        '+"\\ud83d\\udcc5 *Fecha:* "+g("fecha")+L' +
        '+"\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501"+L' +
        '+"\\u2728 Doxolog\\u00eda: "+g("doxologia")+L' +
        '+"\\ud83d\\ude4f Invocaci\\u00f3n: "+g("invocacion")+L' +
        '+"\\ud83d\\ude4c Bienvenida: "+g("bienvenida")+L' +
        '+"\\ud83d\\udc76 Rinc\\u00f3n Infantil: "+g("infantil")+L' +
        '+"\\ud83d\\udcb0 *Diezmos y Ofrendas:*"+L' +
        '+"   \\ud83e\\uddd4 Di\\u00e1cono: "+g("diacono")+L' +
        '+"   \\ud83d\\udc69 Diaconisa: "+g("diaconisa")+L' +
        '+"\\ud83c\\udfb5 Himno de Adoraci\\u00f3n: "+g("himno")+L' +
        '+"\\ud83d\\udcd6 Lectura B\\u00edblica: "+g("lectura")+L' +
        '+"\\ud83d\\ude4f Oraci\\u00f3n Intercesora: "+g("oracion")+L' +
        '+"\\ud83c\\udfa4 M\\u00fasica Especial: "+g("musica")+L' +
        '+"\\ud83c\\udf99\\ufe0f Presentar al Predicador(a): "+g("presentar")+L' +
        '+"\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501"+L' +
        '+"\\u26ea *Predicador:* "+g("predicador")+L' +
        '+"\\ud83d\\udcdd *Tema:* "+g("tema")+L' +
        '+"\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501"+L' +
        '+"\\ud83c\\udfb6 Himno Final: "+g("himnoFinal")+L' +
        '+"\\ud83e\\udd32 Oraci\\u00f3n Final: "+g("oracionFinal")+L' +
        '+L+"\\ud83d\\udcf1 _Legado B\\u00edblico_";' +
        'if(navigator.share){navigator.share({title:"Programa de Culto",text:t}).catch(function(){})}' +
        'else{navigator.clipboard.writeText(t).then(function(){alert("\\ud83d\\udccb Copiado! Pegalo donde quieras.")}).catch(function(){prompt("Copia este texto:",t)})}' +
        '}';
    ventana.document.body.appendChild(sc);
    ventana.document.getElementById('btnEnviar').addEventListener('click', function(){ ventana.enviarForm(); });
};`;

if (oldCode.length > 50) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(path, content, 'utf-8');
    console.log('OK - replaced ' + oldCode.length + ' chars with ' + newCode.length + ' chars');
} else {
    console.log('ERROR - old code not found (length: ' + oldCode.length + ')');
}
