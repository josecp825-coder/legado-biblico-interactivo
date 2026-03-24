---
description: Estándares de calidad UI/UX para Legado Bíblico PWA - Profesional, Funcional, Elegante, Práctico y Seguro
---

# 🏛️ Estándares de Diseño — Legado Bíblico PWA

## Principios Fundamentales (P.F.E.P.S.)

Toda modificación en la interfaz de Legado Bíblico DEBE cumplir estos 5 principios:

### 1. 🎯 PROFESIONAL
- **Cero espacio vacío innecesario**: Cada pixel debe tener propósito. Si hay espacio vacío visible sin contenido, el usuario percibe una app incompleta.
- **Densidad informativa móvil**: En una pantalla de celular (~375px), el contenido debe ser compacto y llenar la vista sin aplastar.
- **Márgenes controlados**: Nunca usar `margin-top > 20px` ni `margin-bottom > 20px` entre secciones principales en móvil.
- **No usar `justify-content: center`** en contenedores principales de página: causa espacio vacío arriba cuando el contenido es poco. Usar `flex-start`.
- **No usar `min-height: 100vh`** con centrado vertical: genera huecos vacíos en pantallas grandes.
- **Etiqueta de versión**: Siempre visible con formato `vXX` en la esquina superior derecha.

### 2. 🔧 FUNCIONAL  
- **Feedback inmediato**: TODO botón o control interactivo debe dar feedback visual al usuario. Si un botón parece que no hace nada, es un fallo grave de UX.
  - Usar **toast notifications** para confirmar acciones (font-size, actualización, etc.)
  - Usar **scroll automático** cuando el efecto ocurre fuera de la vista actual
  - Usar **flash/highlight** para señalar qué elemento cambió
- **Widget A-/A+ (Sistema Universal v3)**:
  - Debe detectar AUTOMÁTICAMENTE el contexto: lector bíblico (`#verses-body`) vs home (`.lectura-texto`)
  - **MANIPULACIÓN DOM DIRECTA**: Cambiar `vb.style.fontSize` directamente, NO depender de funciones externas de otros archivos JS (variables `let` locales no son accesibles cross-file)
  - Mostrar toast con porcentaje actual, incluso en los límites (MÁXIMO/MÍNIMO)
  - Z-index del widget: **10000001** (mayor que la barra del lector = 9999999)
  - Z-index del toast: **100000000** (siempre visible)
- **Regla de Z-index para elementos flotantes**: Cualquier widget fijo que deba ser visible SOBRE el lector bíblico necesita `z-index > 10000000`. El lector usa: barra=9999999, context-card=10000000.
- **Clase `.lectura-texto`**: Usar en TODO párrafo de contenido de lectura (versículos, devocionales, reflexiones). NO en títulos de UI ni en labels de botones.

### 3. ✨ ELEGANTE
- **Paleta de colores**: Mantener consistencia con el sistema de colores establecido:
  - Fondo principal: `#0F172A` (bg-dark)
  - Verde espiritual: `#55efc4` / `#2ed573`
  - Violeta premium: `#6c5ce7` / `#a29bfe`
  - Rojo kids: `#FF4757`
  - Texto principal: `#f5f6fa`
  - Texto secundario: `rgba(255,255,255,0.6)`
- **Glassmorphism**: Usar `backdrop-filter: blur()` + bordes semitransparentes para paneles flotantes.
- **Bordes redondeados**: 
  - Botones: `border-radius: 30px-50px` (pill shape)
  - Cards: `border-radius: 16px-24px`
  - Paneles grandes: `border-radius: 18px-28px`
- **Animaciones sutiles**: `transition: 0.15s-0.3s ease` en hover, transforms y opacidad. Nunca animaciones bruscas.
- **Tipografía**: Outfit para UI, Crimson Text para lectura bíblica.
- **Sombras**: Usar `box-shadow` con colores del tema: `rgba(108,92,231,0.X)` para violeta, `rgba(46,213,115,0.X)` para verde.

### 4. 📐 PRÁCTICO (Mobile-First)
- **Área táctil mínima**: Todo botón debe tener al mínimo `44px x 44px` de área clickeable.
- **Grid de categorías**: 2 columnas en móvil (`grid-template-columns: 1fr 1fr`).
- **Cards compactas**: Altura máxima de `130px` en móvil, `200px` en desktop.
- **Scroll vertical natural**: Nunca bloquear el scroll (`overflow-y: auto` siempre).
- **Contenido above-the-fold**: La primera vista del usuario debe mostrar:
  1. Título "LEGADO BÍBLICO" + "REINA VALERA 1960"
  2. Selector de Biblia (card compacta)
  3. Al menos 2-3 tarjetas de departamento visibles
  - Si las tarjetas no son visibles sin hacer scroll, hay demasiado espacio desperdiciado.

### 5. 🔒 SEGURO
- **Versionado estricto**: Cada cambio requiere:
  1. Incrementar versión en `version.json`
  2. Actualizar `CACHE_NAME` en `sw.js` con el nuevo número
  3. Actualizar la etiqueta `vXX` visible en la UI
- **Anti-loop de recarga**: Siempre preservar el `puedeRecargar()` cooldown de 15 segundos.
- **Muro de Contención SW**: JAMÁS tocar rutas de `/app/` (Agenda Digital) desde el Service Worker de Legado.
- **Preservar datos de usuario**: En actualizaciones, siempre preservar `legado_user_name` del localStorage.
- **Network First**: Estrategia del SW es Network First con fallback a caché. No cambiar a Cache First.

---

## Checklist Pre-Deploy

Antes de ejecutar cualquier script de deploy, verificar:

- [ ] `version.json` tiene el nuevo número de versión y descripción
- [ ] `sw.js` tiene `CACHE_NAME` actualizado con el número correcto
- [ ] Etiqueta de versión visible en `index.html` coincide (`vXX`)
- [ ] No se tocó nada de la ruta `/app/` ni archivos de Agenda Digital
- [ ] Los cambios no rompen nada marcado como "listo" o "aprobado"
- [ ] El deploy script solo sube archivos que realmente fueron modificados

---

## Estructura de Archivos Clave

```
LEGADO_BIBLICO_PROD/
├── index.html          → Página principal (home + módulos)
├── legado.html         → Página alternativa de lectura
├── style.css           → Estilos principales (desktop-first)
├── mobile.css          → Overrides responsive (mobile-first)
├── sw.js               → Service Worker (Muro de Contención)
├── version.json        → Control de versiones automático
├── manifest.json       → PWA manifest (id: legado-biblico-app)
├── data_motor.js       → Motor de lectura bíblica
├── cba_motor.js        → Comentario Bíblico Adventista
├── data_kids_v2.js     → Datos módulo Niños
├── kids_cinema.js      → Motor Biblia Viva Cinema
├── data_teens_v8.js    → Datos módulo Adolescentes
├── data_jovenes.js     → Datos módulo Jóvenes
├── data_adultos_v37.js → Datos módulo Adultos
├── data_iglesia_v1.js  → Datos módulo Iglesia
└── DEPLOY_*.ps1        → Scripts de despliegue FTP
```

---

## Patrón de Deploy Rápido

Para cambios menores (CSS, HTML, JS), crear un script `.ps1` que solo suba los archivos modificados:

```powershell
$ARCHIVOS = @('index.html', 'sw.js', 'version.json')  # Solo los que cambiaron
# Usar WebClient FTP con credenciales existentes
# Subir a AMBAS rutas: / y /public_html/
```

Para cambios mayores, usar el script `DEPLOY_LEGADO_v90_CBA.ps1` como base (incluye imágenes).
