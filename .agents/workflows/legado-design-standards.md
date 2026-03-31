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

---

## 🔒 REGLA #6: PLANTILLA OFICIAL CULTO DIVINO — BLOQUEADA

**Aprobada el: 2026-03-28**  
**Versión de aprobación: v479**  
**Función protegida: `window.compartirCultoPlantilla()` en `data_iglesia_v1.js`**

### Diseño OFICIAL (NO CAMBIAR):
- 🟥 **Cabecera Full-Width**: Ancianas/Anciano de Turno — fondo oscuro vino, borde rojo
- 📐 **Dos columnas** para todos los servicios del programa
- 🎯 **Tema del Sermón**: fila completa, ancho total, color dorado
- 📋 **Observaciones**: fila completa al final si hay datos
- 🔢 **Número de orden** en círculo (esquina superior derecha de cada tarjeta)
- 🌙 **Fondo oscuro** (`#05160E`) con tarjetas `#0C2419`

### Campos con formato especial (NO simplificar):
| Campo | Formato en plantilla |
|-------|---------------------|
| Doxología | `#55 — Grande, Señor, es tu misericordia` |
| Himno Adoración | `[Anuncia] · #[n] — [Título]` |
| Himno Final | `[Anuncia] · #[n] — [Título]` |
| Lectura Bíblica | `[Lector] — [Cita]` (una sola tarjeta) |
| Rincón Infantil | `Anuncia: [X]  ·  Historia: [Y]` |

### Para modificar esta plantilla:
1. El usuario debe pedirlo EXPLÍCITAMENTE con instrucciones exactas
2. Documentar el cambio en este workflow con nueva fecha y versión
3. Actualizar el comentario de bloqueo en el código (`data_iglesia_v1.js` línea ~3632)

---

## 🔒🔒🔒🔒🔒 REGLA #7: PLANTILLA VISUAL SÁBADO (IMAGEN) — BLINDADA CON 5 CANDADOS

### 📛 Nombre oficial: **"Plantilla Zonas Litúrgicas"**
> Si el usuario dice "Recrea la Plantilla Zonas Litúrgicas", se debe reconstruir este diseño exacto.

**Aprobada el: 2026-03-31**  
**Versión de aprobación: v569**  
**Archivo protegido: `_motor_plantillas_v2.js`**  
**Funciones protegidas:**
- `_buildSabadoHTML()` — Constructor HTML del diseño por zonas
- `convertirRegistroADatos()` — Mapeo de campos desde localStorage (sección sábado)
- `extraerDatosCompletos()` — Mapeo de campos desde DOM activo (sección sábado)
- `generarPlantillaDesdeRegistro()` — Generador desde historial
- `generarPlantillaCultoHistorial()` — Función puente en `data_iglesia_v1.js`

### Diseño OFICIAL por ZONAS (NO CAMBIAR):

| Zona | Layout | Contenido |
|------|--------|-----------|
| **Cabecera** | Centrado | Fecha + "† CULTO DIVINO" + Anciano de Turno |
| **Servidores** | 2 columnas | Diáconos Puerta / Diaconisas Puerta / Diáconos Ofrendas / Diaconisas Ofrendas |
| **🎵 Alabanza Musical** | Banner centrado, ancho completo | Director + himnos separados por `•` en una sola línea |
| **Programa (0-8)** | **3 columnas** | Llamado → Doxología → Invocación → Bienvenida → Rincón Infantil → Ofrendas → Himno Adoración → Lectura → Oración Intercesora |
| **🎤 Predicación** | Banner destacado, dorado | Presenta: [nombre] / Predicador (grande) / "Tema" (cursiva) |
| **Cierre (9-12)** | Centrado dinámico | Música Especial + Himno Final + Oración Final |
| **Sonido** | Centrado sutil | 🎛️ Sonido: [nombre] |
| **Footer** | Centrado | Legado Bíblico — Cypress Hills — Brooklyn, NY |

### Tema Visual Sábado (NO CAMBIAR):
| Token | Valor | Uso |
|-------|-------|-----|
| `bg` | `#08140C` | Fondo verde musgo oscuro |
| `cardBg` | `#112217` | Tarjetas |
| `textTitle` | `#FFE484` | Títulos dorados |
| `border1` | `#E74C3C` | Rojo (ciclo 1) |
| `border2` | `#2ECC71` | Verde (ciclo 2) |
| `border3` | `#F1C40F` | Amarillo (ciclo 3) |
| Alabanza banner | `#74b9ff` | Azul cielo |
| Predicación banner | `#fdcb6e` | Dorado |

### Campos con formato especial (NO simplificar):
| Campo | Formato |
|-------|---------|
| Doxología | Siempre `#55 — [título del himnario]` |
| Himno Adoración | `#[n] — [Título]` (busca en HIMNARIO_ADVENTISTA) |
| Himno Final | `#[n] — [Título]` (busca en HIMNARIO_ADVENTISTA) |
| Alabanza Musical | Dirige: [nombre] + himnos `#n — Título • #n — Título` |
| Rincón Infantil | `Anuncia: [nombre]` como descripción |
| Música Especial | `Anuncia: [nombre]` como descripción |

### Mapeo de campos localStorage → motor (NO CAMBIAR):
| Campo guardado | Uso en plantilla |
|----------------|------------------|
| `sab_diaconos_puerta` | Zona Servidores |
| `sab_diaconisas_puerta` | Zona Servidores |
| `sab_diaconos_ofrendas` | Zona Servidores |
| `sab_diaconisas_ofrendas` | Zona Servidores |
| `sab_musica_ante_quien` | Alabanza Musical → Director |
| `sab_musica_himno1..4` | Alabanza Musical → Himnos |
| `sab_llamado` | Paso 0 |
| `sab_doxologia` | Paso 1 (+ #55 automático) |
| `sab_invocacion` | Paso 2 |
| `sab_bienvenida` | Paso 3 |
| `sab_infantil` + `sab_infantil_anuncia` | Paso 4 |
| `sab_ofrendas` | Paso 5 |
| `sab_himno_anuncia` + `sab_himno6` | Paso 6 |
| `sab_lectura_quien` + `sab_lectura` | Paso 7 |
| `sab_oracion_intercesora` | Paso 8 |
| `sab_musica_especial` + `sab_musica_especial_anuncia` | Paso 9 |
| `sab_pred_anuncia` | Predicación → Presenta |
| `sab_predicador` | Predicación → Nombre |
| `sab_tema` | Predicación → Tema |
| `sab_himno_final_quien` + `sab_himno_final` | Paso 11 |
| `sab_oracion_final` | Paso 12 |
| `sab_sonido` | Zona Sonido |

### ⛔ Para modificar esta plantilla:
1. El usuario debe pedirlo **EXPLÍCITAMENTE** con instrucciones exactas
2. **NUNCA** cambiar nombres de campos, orden de zonas, ni colores
3. Documentar el cambio en este workflow con nueva fecha y versión
4. Si en 5 años se busca un culto de hoy (2026-03-31), la plantilla debe generar el mismo resultado visual
5. Los datos históricos en `legado_cultos_semanales` son **SAGRADOS** — nunca migrar, renombrar ni eliminar campos

