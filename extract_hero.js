const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const strToFind = `        const VERSICULOS_BANCO = [
            { t: "Limpia mi camino con tu palabra.", r: "Salmos 119:9" },
            { t: "Porque yo sé los pensamientos que tengo acerca de vosotros...", r: "Jeremías 29:11" },
            { t: "Todo lo puedo en Cristo que me fortalece.", r: "Filipenses 4:13" },
            { t: "No temas, porque yo estoy contigo.", r: "Isaías 41:10" },
            { t: "El Señor es mi pastor, nada me faltará.", r: "Salmos 23:1" },
            { t: "Sean vuestras costumbres sin avaricia, contentos con lo que tenéis.", r: "Hebreos 13:5" },
            { t: "Busquen primeramente el reino de Dios y su justicia.", r: "Mateo 6:33" }
        ];

        function cargarVersiculoDelDia() {
            // BUG-1 FIX: Proteccion null-check — evita error si los IDs no existen en el DOM
            const el1 = document.getElementById('main-verse-text');
            const el2 = document.getElementById('main-verse-ref');
            if (!el1 || !el2) return; // Los elementos no existen en esta version del HTML
            const dia = new Date().getDate();
            const index = dia % VERSICULOS_BANCO.length;
            const item = VERSICULOS_BANCO[index];
            el1.innerText = \`"\${item.t}"\`;
            el2.innerText = item.r;
        }

        function copiarVersiculo() {
            const texto = document.getElementById('main-verse-text').innerText;
            const ref = document.getElementById('main-verse-ref').innerText;
            navigator.clipboard.writeText(\`\${texto} - \${ref}\\n\\nEnviado desde Legado Bíblico App\`).then(() => {
                alert("🎁 ¡Versículo copiado para compartir!");
            });
        }`;

if(html.includes(strToFind)) {
    // 1. Escribir modulo
    const modContent = strToFind.replace('const VERSICULOS_BANCO', 'var VERSICULOS_BANCO');
    fs.writeFileSync('versiculos_hero.js', modContent, 'utf8');
    
    // 2. Extraer del index
    let newHtml = html.replace(strToFind, '// LOGICA MOVIDA A versiculos_hero.js');
    newHtml = newHtml.replace('<head>', '<head>\n    <script src="versiculos_hero.js?v=381"></script>');
    fs.writeFileSync('index.html', newHtml, 'utf8');
    
    console.log('Modulo extraido con exito.');
} else {
    console.log('No se encontro la cabecera exacta de Versiculos Banco.');
}
