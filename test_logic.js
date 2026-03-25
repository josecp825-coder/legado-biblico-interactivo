const fs = require('fs');

let code = fs.readFileSync('_ano_biblico_v2.js', 'utf8');

// Strip IIFE
code = code.replace('(function () {', '').replace(/}\)\(\);/g, '');

// Create fake localStorage
const ls = {};
global.localStorage = {
  getItem: k => ls[k] || null,
  setItem: (k,v) => ls[k] = v,
  removeItem: k => delete ls[k]
};

global.document = {
  getElementById: function(id) {
    if (id === 'ano-biblico-v2') {
      return { id: 'ano-biblico-v2', innerHTML: '', style: {}, scrollTop: 0 };
    }
    return null;
  }
};
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.history = { pushState: () => {} };
global.toast = function() {};

// Evaluate the file's logic
eval(code);

// Simulate the start clicking
try {
  // Mock 'anual' click
  const planKey = 'anual';
  localStorage.setItem('plan_ano_biblico',  planKey);
  localStorage.setItem('plan_fecha_inicio', new Date().toISOString().split('T')[0]);
  localStorage.setItem('plan_dias_leidos',  '[]');
  localStorage.removeItem('ab_caps_leidos');
  
  var datos = obtenerDatos();
  console.log('DATOS:', datos);
  
  if (datos) {
      _renderDashboard(datos, datos.diaEnCurso);
      console.log('SUCCESS! _renderDashboard finished execution');
  } else {
      console.log('obtenerDatos returned null');
  }
} catch(e) {
  console.log('ERROR:', e.stack);
}
