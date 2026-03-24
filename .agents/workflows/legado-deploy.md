---
description: Cómo hacer deploy correcto de Legado Bíblico al servidor de producción
---

# ⚠️ REGLA ABSOLUTA — LEER ANTES DE CUALQUIER DEPLOY

**Legado Bíblico tiene su PROPIO servidor Hostinger.**
**JAMÁS deployes nada de Legado Bíblico a `agendatecnicadigital.com`.**
**JAMÁS uses el FTP `46.202.182.197` para archivos de Legado Bíblico.**

## ⚠️ REGLA ADICIONAL CRÍTICA (aprendida el 23/03/2026)
**ANTES de cualquier deploy, SIEMPRE ejecutar:**
```
node _sync_version.js NUMERO_VERSION
```
Este comando sincroniza `version.json`, `index.html` y `sw.js` en un solo paso.
**Si no coinciden los 3 → bucle de recarga infinita en la app. Ver `/legado-deploy-blindado`.**


---

## 🖥️ Servidor CORRECTO de Legado Bíblico

| Campo       | Valor                                                  |
|-------------|--------------------------------------------------------|
| Dominio     | `https://legadobiblicopro.com`                        |
| FTP Host    | `82.25.87.104`                                        |
| FTP Usuario | `u166906157`                                          |
| FTP Pass    | `Qwzx2121#`                                           |
| Ruta FTP    | `ftp://82.25.87.104/domains/legadobiblicopro.com/public_html` |
| Script base | `DEPLOY_NUEVO_HOSTINGER.ps1`                          |

---

## ❌ Servidor PROHIBIDO para Legado Bíblico

| Campo       | Valor                          |
|-------------|--------------------------------|
| Dominio     | `agendatecnicadigital.com`    |
| FTP Host    | `46.202.182.197`              |
| FTP Usuario | `u934484274.agendatecnicadigital.com` |

> Este servidor pertenece a **Agenda Digital / Sertec**.
> Legado Bíblico se separó completamente de este servidor.
> Nunca envíes archivos de Legado Bíblico a este FTP.

---

## 📋 Pasos para hacer deploy de Legado Bíblico

1. Edita los archivos necesarios en la carpeta local:
   `C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD`

2. **Sincronizar versión** (OBLIGATORIO — nunca saltarse este paso):
```
node _sync_version.js NUMERO_NUEVO
```
Ejemplo: `node _sync_version.js 369`

3. Crea (o reutiliza) un script de deploy apuntando AL SERVIDOR CORRECTO.
   El array de archivos **SIEMPRE** debe incluir:
   `'sw.js', 'index.html', 'version.json'` + los archivos que cambiaste.

```powershell
$ftpHost  = "82.25.87.104"
$ftpUser  = "u166906157"
$ftpPass  = "Qwzx2121#"
$ftpBase  = "ftp://$ftpHost/domains/legadobiblicopro.com/public_html"
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD'

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

foreach ($f in @('archivo1.js', 'sw.js', 'version.json')) {
    $webclient.UploadFile("$ftpBase/$f", (Join-Path $localPath $f))
    Write-Host "OK -> $f" -ForegroundColor Green
}
```

4. Ejecuta el script con:
```
powershell -ExecutionPolicy Bypass -File nombre_del_script.ps1
```

5. Verifica que el deploy llegó correctamente en:
   `https://legadobiblicopro.com/version.json`

---

## 🔄 Cómo forzar actualización en el celular

Si el celular no recibe la actualización:
1. Abre Chrome en el celular (NO el ícono de la app)
2. Ve a: `legadobiblicopro.com/reset.html`
3. Espera la pantalla verde ✅
4. Cierra esa pestaña
5. Abre la app desde el ícono en la pantalla de inicio
