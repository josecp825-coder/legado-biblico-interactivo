const fs = require('fs');
let content = fs.readFileSync('build_cultos.js', 'utf8');

// 1. Modificar "5. Lectura Bíblica" para separar libro y persona
content = content.replace(
    /<div style="background:rgba\(162,155,254,0\.04\);border:1\.5px solid rgba\(162,155,254,0\.2\);border-radius:10px;padding:12px;">\s*<label style="color:rgba\(255,255,255,0\.6\);font-size:0\.75rem;">5\. Lectura Bíblica<\/label>\s*<input type="text" id="reg-lectura-quien"[^>]+>\s*<div style="display:flex;gap:6px;">/g,
    `<div style="background:rgba(162,155,254,0.04);border:1.5px solid rgba(162,155,254,0.2);border-radius:10px;padding:12px;">\n<label style="color:#a29bfe;font-size:0.8rem;font-weight:bold;margin-bottom:8px;display:block;">5. Lectura Bíblica</label>\n<label style="color:rgba(255,255,255,0.6);font-size:0.7rem;">👤 Lector (¿Quién lee la palabra?):</label>\n<input type="text" id="reg-lectura-quien" placeholder="Nombre..." style="width:100%;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;margin-top:2px;outline:none;margin-bottom:12px;" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" autocomplete="off">\n<label style="color:#55efc4;font-size:0.7rem;">📖 Cita (Libro, Cap y Versículos):</label>\n<div style="display:flex;gap:6px;margin-top:2px;">`
);

// 2. Agregar "flecha-nombres", onfocus y onclick
content = content.replace(
    /oninput="if\(typeof autocompleteNombre==='function'\)autocompleteNombre\(this\)"/g,
    `class="flecha-nombres" oninput="if(typeof autocompleteNombre==='function')autocompleteNombre(this)" onfocus="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)" onclick="if(typeof autocompleteNombre==='function')autocompleteNombre(this, true)"`
);

// 3. Injectar CSS de .flecha-nombres
if (!content.includes('.flecha-nombres {')) {
    content = content.replace(
        /<div class="tarjeta-estudio">/,
        `<style>\n.flecha-nombres {\n    background-image: url("data:image/svg+xml;utf8,<svg fill='%23a55eea' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>") !important;\n    background-repeat: no-repeat !important;\n    background-position: right 10px center !important;\n    padding-right: 40px !important;\n    cursor: pointer;\n}\n</style>\n                        <div class="tarjeta-estudio">`
    );
}

// 4. Actualizar signature de autocompleteNombre
content = content.replace(
    /window\.autocompleteNombre\s*=\s*function\(input\)/g,
    `window.autocompleteNombre = function(input, forceShowAll = false)`
);

// 5. Modify empty guard
content = content.replace(
    /if\s*\(\s*curSearch\.length\s*<\s*1\s*\)\s*\{\s*sugDiv\.style\.display\s*=\s*'none';\s*return;\s*\}/g,
    `if (!forceShowAll && curSearch.length < 1) {\n        sugDiv.style.display = 'none';\n        return;\n    }`
);

// 6. Modify filter matches logic
content = content.replace(
    /const matches = todos\.filter\(n => \{[\s\S]*?return nStr\.includes\(curSearch\);\n\s*\}\)\.slice\(0, 6\);/g,
    `let matches = forceShowAll && curSearch.length < 1 ? todos : todos.filter(n => { let nStr = n.toLowerCase().normalize('NFD').replace(/\\u0300-\\u036f/g, ''); return nStr.includes(curSearch); }).slice(0, 8);`
);

// 6b. There was a backslash replace issue, let me ensure regex is bulletproof:
content = content.replace(
    /const matches = forceShowAll[\s\S]*?slice\(0, 8\);/, 
    `let matches = forceShowAll && curSearch.length < 1 ? todos : todos.filter(n => { let nStr = n.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, ''); return nStr.includes(curSearch); }).slice(0, 8);`
); // In case we ran it multiple times this protects it.

// But wait, the previous replace on const matches might fail if I use `[\s\S]*?`.
// Let's just use replace with string if possible.
// Actually, `todos.filter(n => { let nStr...` was:
content = content.replace(
    /const matches = todos\.filter\(n => \{\n\s+let nStr = n\.toLowerCase\(\)\.normalize\('NFD'\)\.replace\(\/\[\\\\u0300-\\\\u036f\]\/g, ''\);\n\s+\/\/ Buscar palabras parciales\n\s+return nStr\.includes\(curSearch\);\n\s+\}\)\.slice\(0, 6\);/g,
    `const matches = forceShowAll && curSearch.length < 1 ? todos : todos.filter(n => { let nStr = n.toLowerCase().normalize('NFD').replace(/[\\\\u0300-\\\\u036f]/g, ''); return nStr.includes(curSearch); }).slice(0, 8);`
);

// 7. Update sugDiv styling to have max-height and overflow-y
content = content.replace(
    /sugDiv\.style = "margin-top:2px;display:none;width:100%;border-radius:8px;";/g,
    `sugDiv.style = "margin-top:2px;display:none;width:100%;border-radius:8px;max-height:220px;overflow-y:auto;box-shadow:0 10px 15px rgba(0,0,0,0.5);";`
);

fs.writeFileSync('build_cultos.js', content);
console.log("Patch completed.");
