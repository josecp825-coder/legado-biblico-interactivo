var fs = require('fs');
var t = fs.readFileSync('index.html', 'utf8');
t = t.split("_HTML_VERSION = '473'").join("_HTML_VERSION = '474'");
t = t.split("v=473").join("v=474");
fs.writeFileSync('index.html', t, 'utf8');

var sw = fs.readFileSync('sw.js', 'utf8');
sw = sw.split('legado-biblico-v473').join('legado-biblico-v474');
sw = sw.split('v=473').join('v=474');
fs.writeFileSync('sw.js', sw, 'utf8');

var vj = fs.readFileSync('version.json', 'utf8');
vj = vj.split('473').join('474');
fs.writeFileSync('version.json', vj, 'utf8');

console.log('v474 aplicado en index.html, sw.js y version.json');
