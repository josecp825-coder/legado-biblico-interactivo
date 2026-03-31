var fs = require('fs');
['index.html', 'sw.js', 'version.json'].forEach(function(fn) {
    var t = fs.readFileSync(fn, 'utf8');
    t = t.split('474').join('475').split('473').join('475');
    fs.writeFileSync(fn, t, 'utf8');
    console.log('v475 aplicado en', fn);
});
