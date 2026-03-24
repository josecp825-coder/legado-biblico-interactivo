---
description: Estándares de calidad UI/UX para Legado Bíblico PWA - Profesional, Funcional, Elegante, Práctico y Seguro
---

# 🛡️ Estándares y Reglas de Protección — Legado Bíblico PWA

## REGLA #1: INMUTABILIDAD DE LO APROBADO (CRÍTICA)

**Queda ESTRICTAMENTE PROHIBIDO** modificar, alterar, mover, renombrar, eliminar o "mejorar" cualquier elemento (código, diseño, función, texto, estilo, ícono, color, o funcionalidad) que ya haya sido creado, revisado y aprobado por el usuario, A MENOS que el usuario lo pida EXPLÍCITAMENTE con instrucciones precisas.

### ¿Qué se considera "aprobado"?
- Todo lo que el usuario ha visto funcionando y ha dicho "listo", "ok", "perfecto", "bien" o similar
- Todo código que ya existe en producción y no fue mencionado en la solicitud actual
- Todos los módulos, tarjetas, secciones, botones, íconos y estilos que ya funcionan
- Todas las funciones JavaScript ya existentes que no son parte del cambio solicitado

### Comportamiento obligatorio:
1. **Solo tocar lo solicitado**: Si el usuario pide cambiar el ícono de una tarjeta, SOLO cambiar ese ícono. No tocar textos, colores, posiciones u otros elementos.
2. **No reorganizar código**: No mover funciones de lugar, no reformatear código existente, no "limpiar" código que funciona.
3. **No agregar mejoras no solicitadas**: Si el usuario pide agregar un botón, agregar SOLO ese botón. No agregar animaciones, tooltips o features extra que no pidió.
4. **Preservar datos del usuario**: Al actualizar (localStorage.clear), SIEMPRE preservar datos biométricos, preferencias y datos guardados del usuario.

### Datos protegidos en localStorage (NUNCA borrar al actualizar):
- `legado_user_name` — Nombre del usuario
- `legado_cultos_semanales` — Registro de cultos
- `legado_liturgias` — Liturgias guardadas
- `legado_font_paso` — Tamaño de fuente preferido
- `cal_bio_registered` — Registro de huella digital
- `cal_bio_cred_id` — Credencial biométrica
- `cal_director` — Sesión de director

---

## REGLA #2: CONSISTENCIA VISUAL

### Paleta de colores ya establecida:
- **Naranja (#ff9f43)** → Calendario, eventos
- **Morado (#a29bfe / #6c5ce7)** → Año Bíblico, compartir
- **Verde (#2ed573)** → Iglesia
- **Rojo (#ff6b6b)** → Historial predicación
- **Amarillo (#fdcb6e)** → Fábrica IA, doxología
- **Coral (#fab1a0)** → Registro predicadores
- **Turquesa (#55efc4)** → Manual de iglesia
- **Azul (#00a8ff)** → Guía para ancianos

### Íconos ya asignados (NO CAMBIAR):
| Módulo | Ícono |
|--------|-------|
| Calendario | 📅🗓️ |
| Año Bíblico | 📖✝️ |
| Liturgia | 📋✨ |
| Doxología | 🙏 |
| Predicadores | 🎤📝 |
| Manual Iglesia | 📖🏛️ |
| Guía Ancianos | 👴📘 |
| Historial | 📊🔥📋 |
| Fábrica IA | 🤖 |
| 28 Doctrinas | ✝️📜 |
| Devocional | 📖 |
| Leer Biblia | 📖 |

---

## REGLA #3: ARQUITECTURA DE ARCHIVOS

### Archivos principales (NO crear duplicados):
- `index.html` — Pantalla principal y motor
- `data_iglesia_v1.js` — Módulo Iglesia completo
- `data_motor.js` — Motor de datos bíblicos
- `sw.js` — Service Worker
- `version.json` — Versión actual
- `firebase-config.js` — Configuración Firebase
- `teen-auth.js` — Autenticación teens

### Proceso de despliegue:
1. Modificar archivos necesarios
2. Incrementar versión en `version.json`
3. Actualizar `CACHE_NAME` en `sw.js`
4. Ejecutar script de deploy por FTP

---

## REGLA #4: FUNCIONALIDAD DEL CALENDARIO (v153+)

### Elementos ya implementados:
- ✅ CRUD de eventos con Firebase Firestore (colección: `calendario_eventos`)
- ✅ Autenticación del director (clave + huella digital WebAuthn)
- ✅ Enlace temporal de 4 horas para acceso delegado (colección: `calendario_tokens`)
- ✅ 12 meses siempre visibles (con/sin eventos se ven diferentes)
- ✅ Eventos base hardcoded (Enero-Junio) + eventos nuevos en Firebase
- ✅ Formulario overlay para agregar/editar/eliminar
- ✅ Etiqueta "NUEVO" en eventos de Firebase
- ✅ Botón ✏️ para editar eventos de Firebase

### Clave del director: `qwzx2121`
### Colores de meses:
- **Con eventos**: Borde sólido naranja, fondo naranja, sombra
- **Sin eventos (pendiente)**: Borde punteado gris, opacidad reducida, texto "PENDIENTE"

---

## REGLA #5: COMPARTIR

- SIEMPRE usar `navigator.share()` con fallback a `navigator.clipboard`
- NUNCA usar enlaces directos a WhatsApp — siempre dar opción al usuario de elegir plataforma
- Botones de compartir en color morado (#6c5ce7), NUNCA verde WhatsApp
