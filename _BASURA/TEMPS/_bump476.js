var fs = require('fs');
['index.html', 'sw.js', 'version.json'].forEach(function(fn) {
    var t = fs.readFileSync(fn, 'utf8');
    t = t.split('475').join('476');
    fs.writeFileSync(fn, t, 'utf8');
    console.log('v476 aplicado en', fn);
});
