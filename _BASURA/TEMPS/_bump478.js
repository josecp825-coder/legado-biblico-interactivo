var fs = require('fs');
['index.html', 'sw.js', 'version.json'].forEach(function(fn) {
    var t = fs.readFileSync(fn, 'utf8');
    t = t.split('477').join('478');
    fs.writeFileSync(fn, t, 'utf8');
    console.log('v478 aplicado en', fn);
});
