---
description: Reglas inviolables para proteger la edición de eventos en Legado Bíblico
---

# 🛡️ SKILL INVIOLABLE — EDICIÓN DE EVENTOS PROTEGIDA

> **ESTA FUNCIONALIDAD COSTÓ MUCHAS HORAS. NUNCA LA TOQUES SIN LEER ESTO PRIMERO.**

---

## ✅ Estado actual (v309 — FUNCIONA CORRECTAMENTE)

La edición de eventos funciona gracias a **3 fixes críticos** que deben permanecer intactos:

---

## 🔒 FIX #1 — `generarTabsDias` preserva datos al editar

**Archivo:** `_add_eventos_especiales.js` — función `generarTabsDias`

**Regla:** Esta función SIEMPRE crea slots vacíos. El siguiente bloque DEBE estar después de `window._diasEvento = _generarDiasEvento(...)`:

```javascript
// ✅ PRESERVAR DATOS si estamos en modo edición
if (window._eventoEditandoId) {
    const evts = JSON.parse(localStorage.getItem('legado_eventos') || '[]');
    const evEdit = evts.find(function(e) { return e.id === window._eventoEditandoId; });
    if (evEdit && evEdit.dias) {
        // ... restaurar datos del evento
    }
}
```

**⚠️ JAMÁS elimines este bloque.** Sin él, al editar cualquier evento los campos aparecen vacíos.

---

## 🔒 FIX #2 — `editarEvento` activa el DOM en orden correcto

**Archivo:** `_add_eventos_especiales.js` — función `editarEvento`

**Regla:** El orden de operaciones es:
1. `cambiarTabCulto('eventos')` — activa el panel de eventos en el DOM
2. `setTimeout(100ms)` → `cambiarSubTabEvento('nuevo')` — muestra el formulario
3. Rellenar tipo/título/fecha
4. `actualizarTituloEvento()` → `seleccionarDuracion(n)`
5. `setTimeout(250ms)` → restaurar datos → `_renderFormDia(0)`

**⚠️ JAMÁS uses `cambiarDiaEvento(0)` para mostrar datos al editar.** Esta función guarda el formulario vacío ANTES de renderizar, pisando los datos.

---

## 🔒 FIX #3 — Deploy SIEMPRE al servidor correcto de Hostinger

**⚠️ JAMÁS uses el FTP 46.202.182.197 (ese es Agenda Digital/Sertec).**

| Campo | Valor CORRECTO |
|-------|---------------|
| FTP Host | `82.25.87.104` |
| FTP User | `u166906157` |
| FTP Pass | `Qwzx2121#` |
| Ruta | `ftp://82.25.87.104/domains/legadobiblicopro.com/public_html` |

---

## 🔒 FIX #4 — Sincronizar `_HTML_VERSION` con `version.json`

**Archivo:** `index.html` línea ~44

```javascript
const _HTML_VERSION = '309'; // ← DEBE COINCIDIR con version.json
```

**Regla:** Cada vez que cambies `version.json`, debes actualizar también `_HTML_VERSION` en `index.html` al mismo número. Si no coinciden → **bucle de recarga infinita**.

---

## 📋 Checklist de deploy correcto (OBLIGATORIO)

Antes de cada deploy, verifica:

- [ ] `version.json` tiene el número nuevo
- [ ] `_HTML_VERSION` en `index.html` tiene el MISMO número
- [ ] El script de deploy apunta a `82.25.87.104` (NO a `46.202.182.197`)
- [ ] Se suben: `index.html`, `sw.js`, `version.json`, y los JS modificados
- [ ] Después del deploy: ir a `legadobiblicopro.com/version.json` y confirmar el número

---

## 🚨 Si el historial aparece vacío tras un reset

1. Navega a: `https://legadobiblicopro.com/restaurar-santa-cena.html`
2. Espera 2 segundos — redirige automáticamente con los datos

---

## 🚨 Si la app entra en bucle de recarga

1. `legadobiblicopro.com/reset.html` → esperar pantalla verde
2. Verificar que `_HTML_VERSION` en `index.html` == `version` en `version.json`
3. Si no coinciden → actualizar `index.html` y deploy

---

## 📌 Archivos críticos (NO modificar sin leer este skill)

| Archivo | Función crítica | Línea aprox. |
|---------|----------------|-------------|
| `_add_eventos_especiales.js` | `generarTabsDias` — preserva datos | ~294 |
| `_add_eventos_especiales.js` | `editarEvento` — orden DOM correcto | ~1770 |
| `index.html` | `_HTML_VERSION` — sincronizar con version.json | ~44 |
| `sw.js` | `CACHE_NAME` — cambiar en cada deploy | ~9 |
| `restaurar-santa-cena.html` | Restauración de emergencia de datos | completo |
