# ==========================================
# DESPLIEGUE LEGADO BIBLICO v62
# CINEMA NIÑOS: 7 DÍAS CREACIÓN + IMÁGENES
# SOLO archivos de la RAIZ
# JAMAS tocar /app/ (Agenda Digital)
# ==========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  LEGADO BIBLICO v62 - DESPLIEGUE" -ForegroundColor White
Write-Host "  CINEMA NINOS + IMAGENES POR ESCENA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential('u934484274.agendatecnicadigital.com', 'Qwzx2121@')
$baseUrl = 'ftp://46.202.182.197/'
$localPath = 'C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\agenda digital'

$archivos = @(
    'index.html',
    'sw.js',
    'version.json',
    'manifest.json',
    'style.css',
    'mobile.css',
    'data_kids_v2.js',
    'kids_cinema.js',
    'data_motor.js',
    'data_jovenes.js',
    'data_adultos_v37.js',
    'data_teens_v8.js',
    'data_iglesia_v1.js',
    'trivia_parte1.js',
    'trivia_parte2.js',
    'trivia_parte3.js',
    'versus_engine.js',
    'firebase-service.js',
    'firebase-config.js',
    'teen-auth.js',
    'icon-192.png',
    'icon-512.png',
    # NUEVAS IMAGENES - Cinema Creacion (7 dias)
    'creacion_dia1_luz.png',
    'creacion_dia2_cielo.png',
    'creacion_dia3_plantas.png',
    'creacion_dia4_astros.png',
    'creacion_dia5_peces_aves.png',
    'creacion_dia6_animales_humanos.png',
    'creacion_dia7_reposo.png',
    # IMAGENES - Jardin del Eden (5 escenas)
    'eden_jardin_hermoso.png',
    'eden_adan_creacion.png',
    'eden_adan_eva_juntos.png',
    'eden_serpiente_fruto.png',
    'eden_expulsion_esperanza.png',
    # IMAGENES - Noe (5 escenas)
    'noe_mundo_malo.png',
    'noe_construyendo.png',
    'noe_animales_entrando.png',
    'noe_diluvio_lluvia.png',
    'noe_arcoiris_promesa.png',
    # IMAGENES - Babel (4 escenas)
    'babel_un_idioma.png',
    'babel_torre_orgullo.png',
    'babel_confusion.png',
    'babel_separacion.png',
    # IMAGENES - Abraham (4 escenas)
    'abraham_triste_sin_hijos.png',
    'abraham_estrellas.png',
    'abraham_promesa_dios.png',
    'abraham_isaac_bebe.png',
    # IMAGENES - Jose (5 escenas)
    'jose_tunica_colores.png',
    'jose_suenos.png',
    'jose_vendido.png',
    'jose_faraon.png',
    'jose_gobernador.png',
    # IMAGENES - Moises bebe (5 escenas)
    'moises_bebe_peligro.png',
    'moises_canasta_rio.png',
    'moises_miriam_vigila.png',
    'moises_princesa.png',
    'moises_palacio.png',
    # IMAGENES - Plagas (5 escenas)
    'plagas_moises_faraon.png',
    'plagas_ranas.png',
    'plagas_oscuridad.png',
    'plagas_sangre_agua.png',
    'plagas_cordero_puerta.png',
    # IMAGENES - Mar Rojo (5 escenas)
    'marrojo_atrapados.png',
    'marrojo_abierto.png',
    'marrojo_cruzando.png',
    'marrojo_ejercito.png',
    'marrojo_celebracion.png',
    # IMAGENES - Mandamientos (5 escenas)
    'mandamientos_sinai.png',
    'mandamientos_moises_sube.png',
    'mandamientos_dedo_dios.png',
    'mandamientos_tablas.png',
    'mandamientos_sabado.png',
    # IMAGENES - Mana (5 escenas)
    'mana_pueblo_hambre.png',
    'mana_cayendo.png',
    'mana_recogiendo.png',
    'mana_viernes_doble.png',
    'mana_sabado_descanso.png',
    # IMAGENES - Jerico (5 escenas)
    'jerico_murallas.png',
    'jerico_marchando.png',
    'jerico_gritando.png',
    'jerico_murallas_caen.png',
    'jerico_victoria.png',
    # IMAGENES - Gedeon (4 escenas)
    'gedeon_sencillo.png',
    'gedeon_ejercito_grande.png',
    'gedeon_300_cantaros.png',
    'gedeon_victoria.png',
    # IMAGENES - Sanson (5 escenas)
    'sanson_fuerza.png',
    'sanson_leon.png',
    'sanson_pelo_cortado.png',
    'sanson_debil.png',
    'sanson_final_oracion.png',
    # IMAGENES - Rut (5 escenas)
    'rut_noemi.png',
    'rut_recogiendo_granos.png',
    'rut_booz.png',
    'rut_boda.png',
    'rut_bisabuelos_david.png',
    # IMAGENES - David y Goliat (5 escenas)
    'david_pastor.png',
    'david_goliat_gigante.png',
    'david_honda.png',
    'david_goliat_dios.png',
    'david_victoria_goliat.png',
    # IMAGENES - Daniel (4 escenas)
    'daniel_orando.png',
    'daniel_ley_mala.png',
    'daniel_foso_leones.png',
    'daniel_rescatado.png',
    # IMAGENES - Jonas (5 escenas)
    'jonas_barco.png',
    'jonas_pez_grande.png',
    'jonas_dentro_pez.png',
    'jonas_escupido.png',
    'jonas_ninive.png',
    # IMAGENES - Horno de Fuego (4 escenas)
    'horno_estatua.png',
    'horno_tres_amigos.png',
    'horno_fuego.png',
    'horno_salen_ilesos.png',
    # IMAGENES - Elias (4 escenas)
    'elias_profetas_baal.png',
    'elias_altar_agua.png',
    'elias_fuego_cielo.png',
    'elias_pueblo_grita.png',
    # IMAGENES - David Arpa (5 escenas)
    'david_arpa_ovejas.png',
    'david_arpa_salmos.png',
    'david_arpa_palacio.png',
    'david_arpa_pastor.png',
    'david_arpa_rey.png'
)

$exito = 0
$errores = 0

foreach ($archivo in $archivos) {
    $fullPath = Join-Path $localPath $archivo
    if (Test-Path $fullPath) {
        try {
            Write-Host "  Subiendo $archivo..." -NoNewline
            $webclient.UploadFile($baseUrl + $archivo, $fullPath)
            Write-Host " OK" -ForegroundColor Green
            $exito++
        }
        catch {
            Write-Host " ERROR: $($_.Exception.Message)" -ForegroundColor Red
            $errores++
        }
    }
    else {
        Write-Host "  OMITIDO (no existe): $archivo" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host ">>> Sincronizando en /public_html/..." -ForegroundColor Cyan
$baseUrl2 = 'ftp://46.202.182.197/public_html/'

foreach ($archivo in $archivos) {
    $fullPath = Join-Path $localPath $archivo
    if (Test-Path $fullPath) {
        try {
            $webclient.UploadFile($baseUrl2 + $archivo, $fullPath)
        }
        catch {
            # Silencioso
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DESPLIEGUE v62 COMPLETADO" -ForegroundColor White
Write-Host "  Archivos subidos: $exito" -ForegroundColor Green
if ($errores -gt 0) {
    Write-Host "  Errores: $errores" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "AHORA: Abre Legado Biblico en tu celular" -ForegroundColor Yellow
Write-Host "y pulsa el boton ACTUALIZAR (rojo)" -ForegroundColor Yellow
Write-Host ""
