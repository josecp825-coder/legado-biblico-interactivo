var fs = require('fs');
['index.html', 'sw.js', 'version.json'].forEach(function(fn) {
    var t = fs.readFileSync(fn, 'utf8');
    t = t.split('478').join('479');
    fs.writeFileSync(fn, t, 'utf8');
    console.log('v479 aplicado en', fn);
});
