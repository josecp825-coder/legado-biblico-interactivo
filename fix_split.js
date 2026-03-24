const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The multi_replace tool wrongly matched lines around line 1058.
// I will just use regex to fix the Devocional rendering logic.

html = html.replace(/document\.getElementById\('dev-versiculo'\)\.textContent = d\.ref\.split\('[\s\S]*?'\)\[0\]\.trim\(\);/, "document.getElementById('dev-versiculo').textContent = d.ref.split('—')[0].trim();");

html = html.replace(/document\.getElementById\('dev-referencia'\)\.textContent =  '[\s\S]*?' \+ d\.ref\.split\('[\s\S]*?'\)\[1\]\?\.trim\(\);/, "document.getElementById('dev-referencia').textContent = '📖 ' + (d.ref.split('—')[1] || '').trim();");

html = html.replace(/if \(heroRef\) heroRef\.textContent = '[\s\S]*?' \+ v\.r;/, "if (heroRef) heroRef.textContent = '📖 ' + v.r;");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Split fixes applied successfully!');
