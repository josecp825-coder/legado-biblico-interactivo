---
description: Reglas y pasos para proteger el historial de cultos (datos sagrados de la iglesia)
---

# 🛡️ PROTECCIÓN DE DATOS DE CULTOS — LEGADO BÍBLICO

> Los registros de cultos son el tesoro histórico de la Iglesia Adventista Cypress Hills.
> JAMÁS se deben perder. Este skill define las reglas y pasos para protegerlos.

---

## ⛔ REGLAS ABSOLUTAS DE CÓDIGO

### R1 — editarCulto NO elimina hasta que se guarde
El registro del historial NUNCA debe ser eliminado de `localStorage` al pulsar EDITAR.
Solo se elimina cuando `guardarCultoSemana()` confirma el guardado:
```javascript
window._editandoCultoId = id;  // ← Solo guardar el ID, NO eliminar el registro
```

### R2 — borrarCultoSemana requiere confirmación doble
```javascript
function borrarCultoSemana(id) {
    if (!confirm("¿Eliminar este registro?")) return;
    // NUNCA borrar sin doble confirmación
}
```

### R3 — El SW NUNCA debe borrar localStorage
El Service Worker solo controla caché de archivos JS/CSS/HTML.
El localStorage del navegador es INDEPENDIENTE del caché del SW.
Limpiar el CACHÉ del SW/Chrome NO borra el localStorage.
Limpiar "Todos los datos del sitio" en Chrome SÍ borra el localStorage.
**⚠️ Advertir al usuario: NUNCA usar "Borrar todos los datos" solo "Caché".**

---

## 📦 RESPALDO DE EMERGENCIA (Manual)

### Exportar todos los cultos desde la consola del navegador:
```javascript
// Pegar en la consola de Chrome (F12)
const datos = localStorage.getItem('legado_cultos_semanales');
const blob = new Blob([datos], {type:'application/json'});
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'cultos_backup_' + new Date().toISOString().split('T')[0] + '.json';
a.click();
```

### Restaurar cultos desde un backup:
```javascript
// Pegar en la consola con el JSON del backup
const backup = `[PEGAR_JSON_AQUI]`;
localStorage.setItem('legado_cultos_semanales', backup);
location.reload();
```

---

## 🔄 PROCEDIMIENTO SEGURO PARA ACTUALIZAR LA PWA

### ✅ Lo que SÍ es seguro (NO borra datos):
1. Recargar la página (F5 o pull-to-refresh)
2. Cerrar y reabrir la PWA
3. Limpiar solo el "Caché" (no datos del sitio)
4. Desinstalar y reinstalar la PWA (los datos de localStorage PERSISTEN en Chrome Android)

### ❌ Lo que NO se debe hacer:
- "Borrar todos los datos del sitio" en Chrome → **ESTO SÍ BORRA localStorage**
- Factory reset del teléfono sin backup previo
- Limpiar "Almacenamiento" completo de Chrome en Ajustes del teléfono

---

## 💾 FUNCIÓN DE RESPALDO AUTOMÁTICO (en la app)

La función `exportarCultosBackup()` debe existir en la app y ser accesible desde:
- El historial de cultos (botón "📥 Exportar")
- O desde configuración

---

## 🚨 SI SE PIERDEN LOS DATOS

1. Los datos NO están en el servidor (son locales del dispositivo)
2. Se pueden recuperar si el usuario hizo un backup previo
3. Si hay otro dispositivo donde se usó la misma app, los datos están allí
4. Como medida futura: implementar sincronización con Firebase (pendiente)
