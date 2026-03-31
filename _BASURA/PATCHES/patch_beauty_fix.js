const fs = require('fs');
let content = fs.readFileSync('build_cultos.js', 'utf8');

// Regex para encontrar cada una de las 3 funciones y escapar los acentos graves ` a \`
const funcNames = ['delegarFormularioRegular', 'compartirLlenoActual', 'compartirPlantillaRegular'];

funcNames.forEach(fn => {
    // Matchea desde "function fnName(" hasta "window.open('...', '_blank'); }" O "navigator.share...catch... }"
    let re = new RegExp(`function ${fn}[\\s\\S]*?_blank'\\);\\s*\\}`, 'g');
    content = content.replace(re, match => {
        // En el match, si un ` no esta seguido o precedido del inicio de la funcion (que no aplica) y no esta ya escapado, lo escapamos.
        // Como sabemos que todo lo que inyecte tiene ` sin escapar, los reemplazamos por \\\`
        // Pero OJO, no afectar comillas simples o dobles.
        // Simplemente reemplazar ` por \\\` a todo el texto en la funcion.
        return match.replace(/\\`/g, '`').replace(/`/g, '\\\`');
    });
});

fs.writeFileSync('build_cultos.js', content);
console.log("Fix aplicado!");
