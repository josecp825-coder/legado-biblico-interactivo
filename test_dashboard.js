const fs = require('fs');
const { JSDOM } = require('jsdom');

let code = fs.readFileSync('_ano_biblico_v2.js', 'utf8');

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="ano-biblico-v2"></div></body></html>`);
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = {
  store: {},
  getItem: function(k) { return this.store[k] || null; },
  setItem: function(k, v) { this.store[k] = v; },
  removeItem: function(k) { delete this.store[k]; }
};

global.history = { pushState: function(){} };
window.toast = function(){};
window.mostrarConfirm = function(msg, fn) { fn(); }; // Simulate pressing 'Confirmar'

eval(code);

try {
  global.window._AB_iniciarPlan('desafio45');
  const d = global.document.getElementById('ano-biblico-v2');
  console.log('SUCCESS! HTML Length:', d.innerHTML.length);
  // console.log(d.innerHTML.substring(0, 500));
} catch(e) {
  console.log('ERROR THROWN:', e.stack);
}
