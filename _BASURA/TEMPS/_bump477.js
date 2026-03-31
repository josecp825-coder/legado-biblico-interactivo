var fs = require('fs');
['index.html', 'sw.js', 'version.json'].forEach(function(fn) {
    var t = fs.readFileSync(fn, 'utf8');
    t = t.split('476').join('477');
    fs.writeFileSync(fn, t, 'utf8');
    console.log('v477 aplicado en', fn);
});
