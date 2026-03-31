$user = 'u934484274.agendatecnicadigital.com'
$pass = 'Qwzx2121@'
$baseUri = 'ftp://46.202.182.197/'
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)

$filesToUpload = @(
    "index.html",
    "legado.html",
    "v19.html",
    "v19_legado.html",
    "legado_v19.html",
    "v19_final_boss.html",
    ".htaccess",
    "style.css",
    "mobile.css",
    "forzar.html",
    "sw.js",
    "manifest.json",
    "data_teens_v5.js",
    "data_kids.js",
    "data_jovenes.js",
    "data_adultos.js",
    "data_motor.js"
)

$basePath = "C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\agenda digital\"

foreach ($fileName in $filesToUpload) {
    Write-Host "Subiendo $fileName al servidor (BYPASS CACHE)..."
    try {
        $webclient.UploadFile($baseUri + $fileName, $basePath + $fileName)
        Write-Host "¡$fileName OK!"
    }
    catch {
        Write-Host "Error en $fileName : $_"
    }
}

Write-Host "--- ACTUALIZACION BYPASS TERMINADA ---"
