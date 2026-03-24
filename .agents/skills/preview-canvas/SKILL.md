# Skill: Preview Canvas — Verificar Antes de Desplegar

## Nombre
`preview-canvas`

## Descripción
Antes de hacer deploy de cualquier cambio en el canvas de plantillas (`_pdf_eventos.js`), este skill crea una página HTML de prueba que ejecuta el código en un navegador real y captura capturas de pantalla para verificar visualmente que el resultado es correcto.

**USO OBLIGATORIO antes de cada deploy de `_pdf_eventos.js`.**

---

## Cuándo Usar Este Skill

Siempre que vayas a modificar y desplegar:
- `_pdf_eventos.js` (especialmente `generarPlantillaEvento`)
- Cualquier código que genere imágenes con Canvas 2D
- Cualquier código de rendering visual

---

## Pasos del Skill

### PASO 1 — Leer el código actual

Lee las funciones clave del archivo que vas a modificar:
- `generarPlantillaEvento` en `_pdf_eventos.js`
- Identifica los valores de: `HDR_H`, `W`, `PAD`, `PILL_H`, `GAP`, `LBL_H`, `VAL_H`

### PASO 2 — Crear archivo de prueba HTML

Crea un archivo en `C:/tmp/test_canvas_preview.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Preview Canvas Test</title>
  <style>
    body { background: #111; margin: 0; padding: 20px; }
    canvas { border: 2px solid #00b894; display: block; max-width: 100%; }
    #info { color: #00b894; font-family: monospace; padding: 10px; }
    #checks { color: white; font-family: monospace; padding: 10px; }
    .ok { color: #00b894; }
    .fail { color: #ff6b6b; }
  </style>
</head>
<body>
  <div id="info">Generando canvas...</div>
  <div id="checks"></div>
  <canvas id="test-canvas"></canvas>
  <script>
  // ========================================
  // DATOS DE PRUEBA — Semana de Mayordomia
  // ========================================
  var EV_TEST = {
    id: 'test-001',
    titulo: 'Semana de Mayordomia',
    color: '#00b894',
    emoji: '\uD83D\uDE4F\uD83D\uDC6A\u231A\uD83D\uDCB0',
    dias: [
      {
        fecha: '2026-03-15',
        diaSemana: 0,
        datos: {
          orador_apertura: 'Obed Lopez',
          anuncia_himno_apertura: 'Jose Castillo',
          himno_apertura: '236',
          titulo_himno_apertura: 'A Jesus entregame todo',
          cita_biblica: '2 Reyes 4:8-11',
          orador: 'PR. Rafael Solano',
          tema: 'El Mayordomo siervo'
        }
      }
    ]
  };

  // COLORES_DIA simulado
  var COLORES_DIA = [
    {hex:'#e74c3c', nombre:'Domingo'},
    {hex:'#e67e22', nombre:'Lunes'},
    {hex:'#f1c40f', nombre:'Martes'},
    {hex:'#2ecc71', nombre:'Miercoles'},
    {hex:'#1abc9c', nombre:'Jueves'},
    {hex:'#3498db', nombre:'Viernes'},
    {hex:'#9b59b6', nombre:'Sabado'}
  ];

  // localStorage simulado
  var _localStorage = {
    getItem: function(k) {
      if (k === 'legado_eventos') return JSON.stringify([EV_TEST]);
      return null;
    }
  };
  var _origLS = window.localStorage;
  // Override temporal de localStorage
  Object.defineProperty(window, 'localStorage', {value: _localStorage, configurable: true});

  // ========================================
  // PEGAR AQUI EL CODIGO COMPLETO DE
  // generarPlantillaEvento DE _pdf_eventos.js
  // ========================================
  // [CODIGO_AQUI]

  // ========================================
  // EJECUTAR Y VERIFICAR
  // ========================================
  function verificar(canvas) {
    var checks = document.getElementById('checks');
    var resultados = [];
    var ok = true;

    // CHECK 1: Canvas existe y tiene dimensiones
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      resultados.push('<span class="fail">FAIL: Canvas sin dimensiones</span>');
      ok = false;
    } else {
      resultados.push('<span class="ok">OK: Canvas ' + canvas.width + 'x' + canvas.height + '</span>');
    }

    // CHECK 2: Ancho correcto (1080px)
    if (canvas && canvas.width !== 1080) {
      resultados.push('<span class="fail">FAIL: Ancho esperado 1080, obtenido ' + canvas.width + '</span>');
      ok = false;
    } else if (canvas) {
      resultados.push('<span class="ok">OK: Ancho 1080px correcto</span>');
    }

    // CHECK 3: Pixel en zona del header (x=540, y=30) no es negro puro
    if (canvas) {
      var ctx = canvas.getContext('2d');
      var px = ctx.getImageData(540, 30, 1, 1).data;
      if (px[0] === 0 && px[1] === 0 && px[2] === 0) {
        resultados.push('<span class="fail">FAIL: Header negro puro — fondo no se dibujo</span>');
        ok = false;
      } else {
        resultados.push('<span class="ok">OK: Header con color visible (R:'+px[0]+' G:'+px[1]+' B:'+px[2]+')</span>');
      }
    }

    // CHECK 4: Pixel en zona de contenido (x=100, y=HDR_H+50) no es negro puro
    if (canvas) {
      var ctx2 = canvas.getContext('2d');
      var py = ctx2.getImageData(100, 400, 1, 1).data;
      if (py[0] === 0 && py[1] === 0 && py[2] === 0) {
        resultados.push('<span class="fail">WARN: Zona de contenido negra pura — revisar cards de datos</span>');
      } else {
        resultados.push('<span class="ok">OK: Zona de contenido con pixels (R:'+py[0]+' G:'+py[1]+' B:'+py[2]+')</span>');
      }
    }

    checks.innerHTML = '<b>VERIFICACIONES:</b><br>' + resultados.join('<br>');
    document.getElementById('info').textContent = ok ? '✅ Canvas OK — listo para deploy' : '❌ Canvas tiene problemas — NO desplegar';
    return ok;
  }

  // Interceptar el canvas generado
  var _origToBlob = HTMLCanvasElement.prototype.toBlob;
  HTMLCanvasElement.prototype.toBlob = function(callback, type) {
    var self = this;
    // Mostrar canvas en pantalla
    document.getElementById('test-canvas').width = self.width;
    document.getElementById('test-canvas').height = self.height;
    document.getElementById('test-canvas').getContext('2d').drawImage(self, 0, 0);
    verificar(self);
    // Restaurar localStorage
    Object.defineProperty(window, 'localStorage', {value: _origLS, configurable: true});
  };

  // EJECUTAR
  setTimeout(function() {
    if (typeof window.generarPlantillaEvento === 'function') {
      window.generarPlantillaEvento('test-001', 'todos');
    } else {
      document.getElementById('info').textContent = 'ERROR: generarPlantillaEvento no encontrada';
    }
  }, 100);
  </script>
</body>
</html>
```

### PASO 3 — Inyectar el código real

En el archivo HTML creado, reemplaza el comentario `// [CODIGO_AQUI]` con el contenido COMPLETO de la función `window.generarPlantillaEvento` extraída de `_pdf_eventos.js`.

**IMPORTANTE**: También copia las funciones auxiliares que necesita:
- `hexRgb`
- `rr` (rounded rect)
- `splitLines`
- `titleFont`

### PASO 4 — Abrir en navegador y verificar

Usa el `browser_subagent` para:
1. Abrir `file:///C:/tmp/test_canvas_preview.html`
2. Tomar captura de pantalla
3. Verificar visualmente que:
   - ✅ El header muestra: Nombre iglesia, Título, Elementos decorativos, Fecha
   - ✅ Los elementos de programa se muestran correctamente
   - ✅ No hay zonas completamente negras donde no deberían
   - ✅ El texto no está truncado
   - ✅ Las 4 tarjetas de concepto (si es Mayordomía) son visibles
4. Leer el resultado de los CHECKs automáticos en la página

### PASO 5 — Decisión

| Resultado | Acción |
|-----------|--------|
| ✅ Todos los checks OK + se ve bien visualmente | Proceder con deploy |
| ❌ Algún check falla O algo se ve mal | DETENER — corregir el código y repetir desde PASO 2 |
| ⚠️ Algo sospechoso | Explicar al usuario qué se ve antes de preguntar si proceder |

### PASO 6 — Reportar al usuario

Antes de hacer deploy, mostrar al usuario:
1. Captura de pantalla del canvas de prueba
2. Lista de checks pasados/fallados
3. Descripción de lo que se ve
4. Confirmación explícita de que el resultado es correcto

---

## Reglas Críticas

1. **NUNCA hacer deploy sin haber ejecutado este skill primero** cuando se modifica `_pdf_eventos.js`
2. **Si el test falla, NO desplegar** — corregir primero
3. **Mostrar siempre la captura al usuario** para que él también confirme
4. **Si hay dudas visuales**, preguntar al usuario antes de continuar

---

## Archivos que crea este skill

- `C:/tmp/test_canvas_preview.html` — página de prueba (se sobreescribe en cada uso)

## Notas técnicas

- El skill usa `toBlob` interceptado para capturar el canvas sin compartir
- Los datos de prueba usan el evento "Semana de Mayordomía" como caso de referencia
- `localStorage` se simula para no depender de datos reales del dispositivo
