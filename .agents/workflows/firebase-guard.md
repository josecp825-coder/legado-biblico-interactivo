---
description: Regla inviolable — Todo cambio en Legado Bíblico se guarda en Firebase. Al final de cada sesión de trabajo se debe confirmar el deploy y el backup.
---

# 🔥 FIREBASE GUARD — PROTECCIÓN TOTAL DE DATOS
## ⛔ ESTE WORKFLOW ES INVIOLABLE. NUNCA SE OMITE. NUNCA SE SALTA UN PASO.

> Los datos de la Iglesia Adventista Cypress Hills son sagrados.
> Cada culto, evento y liturgia registrado representa el trabajo real de la iglesia.
> **NINGÚN cambio de código puede omitir el backup en Firebase.**

---

## 📋 CLAVES DE localStorage Y SUS COLECCIONES EN FIREBASE

| Clave localStorage          | Colección Firestore                          |
|----------------------------|----------------------------------------------|
| `legado_cultos_semanales`  | `iglesias/cypress_hills_brooklyn/cultos`     |
| `legado_eventos`           | `iglesias/cypress_hills_brooklyn/eventos`    |
| `legado_liturgias`         | `iglesias/cypress_hills_brooklyn/liturgias`  |
| `legado_predicaciones`     | `iglesias/cypress_hills_brooklyn/predicaciones` |

---

## ⚛️ REGLA CERO — INMUTABLE

**Antes de cualquier modificación a los módulos de datos (cultos, eventos, liturgias, predicaciones), verificar que:**

1. La función que guarda en `localStorage.setItem(...)` también llama a `_sync[Modulo]Firebase(datos)`
2. El botón del historial tiene el botón **"🔥 FIREBASE SYNC"** visible
3. Existe función de **EXPORTAR JSON** para backup manual

Si alguna de estas tres condiciones no se cumple → **AGREGAR ANTES DE CUALQUIER OTRA MODIFICACIÓN**.

---

## 🔄 FLUJO DE TRABAJO OBLIGATORIO EN CADA SESIÓN

### PASO 1 — Al iniciar la sesión
Verificar qué módulos tienen Firebase sync activo:

```javascript
// Pegar en consola del navegador para diagnóstico rápido
['legado_cultos_semanales','legado_eventos','legado_liturgias','legado_predicaciones']
  .forEach(k => {
    const d = localStorage.getItem(k);
    console.log(k + ':', d ? JSON.parse(d).length + ' registros' : 'VACÍO');
  });
```

### PASO 2 — Durante el trabajo
- Todo cambio a funciones `guardar*()` o `_autoGuardar*()` DEBE incluir la llamada Firebase
- Todo módulo nuevo DEBE tener su función `_sync[Modulo]Firebase(datos)`
- El historial de cada módulo DEBE tener botón **"🔥 FIREBASE SYNC"**

### PASO 3 — Al finalizar cambios de código

**Antigravity DEBE preguntar al usuario:**

> "✅ Los cambios están listos. Antes de hacer deploy, ¿confirmas que quieres guardar todo en Firebase y subir al servidor?"

El usuario responde SÍ → proceder con deploy.
El usuario responde NO → NO hacer deploy hasta confirmación.

### PASO 4 — Deploy con verificación

```powershell
# Siempre actualizar version.json antes del deploy
# Siempre subir los archivos modificados
# Siempre confirmar OK en cada archivo
```

### PASO 5 — Confirmación post-deploy

Después del deploy, Antigravity DEBE notificar:
- ✅ Archivos subidos
- 🔢 Versión nueva del sistema
- 🔥 Firebase sync activo para: [lista de módulos]

---

## 🛡️ FUNCIONES FIREBASE SYNC REQUERIDAS POR MÓDULO

### Módulo Cultos ✅ (YA IMPLEMENTADO)
```javascript
async function _syncCultoFirebase(datos) { /* ✅ */ }
async function _deleteCultoFirebase(id) { /* ✅ */ }
window.sincronizarCultosDesdeFirebase = async function() { /* ✅ */ }
```

### Módulo Eventos ✅ (IMPLEMENTADO EN v268)
```javascript
async function _syncEventoFirebase(evento) { /* ✅ */ }
async function _deleteEventoFirebase(id) { /* ✅ */ }
window.sincronizarEventosDesdeFirebase = async function() { /* ✅ */ }
window.exportarEventosBackup = function() { /* ✅ */ }
```

### Módulo Liturgias ⚠️ (PENDIENTE — AGREGAR EN PRÓXIMA SESIÓN)
```javascript
async function _syncLiturgiaFirebase(datos) { /* PENDIENTE */ }
window.sincronizarLiturgiasDesdeFirebase = async function() { /* PENDIENTE */ }
```

### Módulo Predicaciones ⚠️ (PENDIENTE — AGREGAR EN PRÓXIMA SESIÓN)
```javascript
async function _syncPredicacionFirebase(datos) { /* PENDIENTE */ }
window.sincronizarPredicacionesDesdeFirebase = async function() { /* PENDIENTE */ }
```

---

## 🚨 PROTOCOLO DE EMERGENCIA SI SE PIERDEN DATOS

### Paso 1 — Verificar Firebase directamente
Abrir: `https://legadobiblicopro.com/export-datos.html`
→ Presionar "🔍 Leer Datos" → ver qué hay en localStorage

### Paso 2 — Recuperar desde Firebase
En la app: Módulo Iglesia → Registro de Cultos → pestaña "Cultos" → botón **"🔥 FIREBASE SYNC"**
En la app: Módulo Iglesia → Registro de Cultos → pestaña "Eventos" → pestaña "Historial" → botón **"🔥 FIREBASE SYNC"**

### Paso 3 — Recuperación manual por consola
```javascript
// Para CULTOS — recuperar desde Firebase via REST
window.sincronizarCultosDesdeFirebase();

// Para EVENTOS — recuperar desde Firebase
window.sincronizarEventosDesdeFirebase();
```

---

## 📌 RECORDATORIO PERMANENTE PARA ANTIGRAVITY

> Antes de cerrar cualquier sesión de trabajo en Legado Bíblico,
> Antigravity DEBE preguntar:
>
> **"¿Deseas confirmar y guardar todos los cambios en Firebase antes de terminar?"**
>
> Si el usuario dice SÍ → ejecutar deploy y confirmar sync.
> Si el usuario dice NO → recordar en el próximo mensaje.
>
> ESTE RECORDATORIO NO PUEDE OMITIRSE.

---

## 📊 ESTADO ACTUAL DE PROTECCIÓN (actualizado 2026-03-20)

| Módulo         | localStorage       | Firebase Sync | Botón Historial | Export JSON |
|----------------|--------------------|---------------|-----------------|-------------|
| Cultos         | ✅ legado_cultos_semanales | ✅ v261+  | ✅              | ✅          |
| Eventos        | ✅ legado_eventos   | ✅ v268       | ✅              | ✅          |
| Liturgias      | ✅ legado_liturgias | ❌ PENDIENTE  | ❌ PENDIENTE    | ❌          |
| Predicaciones  | ✅ legado_predicaciones | ❌ PENDIENTE | ❌ PENDIENTE   | ❌          |
