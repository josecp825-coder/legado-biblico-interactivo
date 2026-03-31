---
description: Plan de modularización del módulo Biblia en Legado Bíblico PWA
---

## Módulos propuestos

| Archivo nuevo | Líneas (~) | Contenido |
|---|---|---|
| biblia_datos.js | 1-107 | Constantes: ESTRUCTURA_BIBLIA, BIBLE_INSIGHTS, CONTEO_CAPITULOS, LIBROS_AT/NT, ABREVIACIONES_BIBLIA, colores |
| biblia_busqueda.js | 108-875 | Barra Relámpago, parsear cita, fuzzy matching, micrófono, selector de versión |
| biblia_lector.js | 876-2499 | Lector principal, abrirLibroPrincipal, renderizar capítulos, notas, compartir |
| biblia_wizard.js | 2500-2727 | Wizard buscar libro, buscador inteligente, abrirCitaDesdeBuscador |

## Archivos actuales que se mantienen sin cambio
- data_motor.js → será reemplazado por los 4 módulos
- index.html → agregar los 4 `<script>` en orden

## Orden de carga en index.html
```html
<script src="biblia_datos.js?v=XXX"></script>
<script src="biblia_busqueda.js?v=XXX"></script>
<script src="biblia_lector.js?v=XXX"></script>
<script src="biblia_wizard.js?v=XXX"></script>
```
