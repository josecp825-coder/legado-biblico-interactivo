const fs = require('fs');
let c = fs.readFileSync('data_iglesia_v1.js', 'utf8');

c = c.replace(/h\.id === window\._editandoCultoId/g, "String(h.id) === String(window._editandoCultoId)");
c = c.replace(/h\.id !== window\._editandoCultoId/g, "String(h.id) !== String(window._editandoCultoId)");
c = c.replace(/h\.id === id/g, "String(h.id) === String(id)");
c = c.replace(/h\.id !== id/g, "String(h.id) !== String(id)");

fs.writeFileSync('data_iglesia_v1.js', c);
console.log('Fixed ID matching logic!');
