@echo off
echo ==========================================
echo  LIMPIEZA LEGADO BIBLICO - Moviendo obsoletos
echo ==========================================

set RUTA=C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD
set BAK=%RUTA%\_BACKUP_OBSOLETOS

if not exist "%BAK%" mkdir "%BAK%"
echo Carpeta backup creada: _BACKUP_OBSOLETOS

echo.
echo -- Datos obsoletos (versiones viejas) --
if exist "%RUTA%\data_adultos.js"           move "%RUTA%\data_adultos.js"           "%BAK%\" && echo OK: data_adultos.js
if exist "%RUTA%\data_kids.js"              move "%RUTA%\data_kids.js"              "%BAK%\" && echo OK: data_kids.js
if exist "%RUTA%\data_teens.js"             move "%RUTA%\data_teens.js"             "%BAK%\" && echo OK: data_teens.js
if exist "%RUTA%\data_teens_v2.js"          move "%RUTA%\data_teens_v2.js"          "%BAK%\" && echo OK: data_teens_v2.js
if exist "%RUTA%\data_teens_v5.js"          move "%RUTA%\data_teens_v5.js"          "%BAK%\" && echo OK: data_teens_v5.js
if exist "%RUTA%\data_teens_v6.js"          move "%RUTA%\data_teens_v6.js"          "%BAK%\" && echo OK: data_teens_v6.js
if exist "%RUTA%\data_teens_v7.js"          move "%RUTA%\data_teens_v7.js"          "%BAK%\" && echo OK: data_teens_v7.js

echo.
echo -- Variantes de Iglesia obsoletas --
if exist "%RUTA%\data_iglesia_v1_CLEAN.js"  move "%RUTA%\data_iglesia_v1_CLEAN.js"  "%BAK%\" && echo OK: data_iglesia_v1_CLEAN.js
if exist "%RUTA%\data_iglesia_v1_SERVER.js" move "%RUTA%\data_iglesia_v1_SERVER.js" "%BAK%\" && echo OK: data_iglesia_v1_SERVER.js
if exist "%RUTA%\data_iglesia_v1_WEB.js"    move "%RUTA%\data_iglesia_v1_WEB.js"    "%BAK%\" && echo OK: data_iglesia_v1_WEB.js

echo.
echo -- Scripts de deploy viejos --
if exist "%RUTA%\deploy_legado_v60.ps1"                 move "%RUTA%\deploy_legado_v60.ps1"                 "%BAK%\" && echo OK: deploy_legado_v60
if exist "%RUTA%\deploy_legado_v61.ps1"                 move "%RUTA%\deploy_legado_v61.ps1"                 "%BAK%\" && echo OK: deploy_legado_v61
if exist "%RUTA%\deploy_legado_v62.ps1"                 move "%RUTA%\deploy_legado_v62.ps1"                 "%BAK%\" && echo OK: deploy_legado_v62
if exist "%RUTA%\deploy_legado_compartir_calendario.ps1" move "%RUTA%\deploy_legado_compartir_calendario.ps1" "%BAK%\" && echo OK: deploy_legado_compartir_calendario
if exist "%RUTA%\deploy_legado_v83.ps1"                 move "%RUTA%\deploy_legado_v83.ps1"                 "%BAK%\" && echo OK: deploy_legado_v83

echo.
echo -- Scripts de emergencia ya resueltos --
if exist "%RUTA%\BYPASS_CACHE.ps1" move "%RUTA%\BYPASS_CACHE.ps1" "%BAK%\" && echo OK: BYPASS_CACHE.ps1
if exist "%RUTA%\REPARAR_YA.ps1"   move "%RUTA%\REPARAR_YA.ps1"   "%BAK%\" && echo OK: REPARAR_YA.ps1
if exist "%RUTA%\LIMPIAR_PROYECTO.ps1" move "%RUTA%\LIMPIAR_PROYECTO.ps1" "%BAK%\" && echo OK: LIMPIAR_PROYECTO.ps1
if exist "%RUTA%\_limpiar.ps1" move "%RUTA%\_limpiar.ps1" "%BAK%\" && echo OK: _limpiar.ps1

echo.
echo -- Imagenes de captura y debug (no usadas en produccion) --
if exist "%RUTA%\adultos_hub_page_1772170772150.png"         move "%RUTA%\adultos_hub_page_1772170772150.png"         "%BAK%\" && echo OK: adultos_hub_page
if exist "%RUTA%\adultos_hub_top_1772170785116.png"          move "%RUTA%\adultos_hub_top_1772170785116.png"          "%BAK%\" && echo OK: adultos_hub_top
if exist "%RUTA%\adultos_seminario_hero_1772170415343.png"   move "%RUTA%\adultos_seminario_hero_1772170415343.png"   "%BAK%\" && echo OK: adultos_seminario_hero
if exist "%RUTA%\apologetica_view_1772170231354.png"         move "%RUTA%\apologetica_view_1772170231354.png"         "%BAK%\" && echo OK: apologetica_view
if exist "%RUTA%\debate_result_1772170209121.png"            move "%RUTA%\debate_result_1772170209121.png"            "%BAK%\" && echo OK: debate_result
if exist "%RUTA%\debate_view_1772170180980.png"              move "%RUTA%\debate_view_1772170180980.png"              "%BAK%\" && echo OK: debate_view
if exist "%RUTA%\egw_commentary_broken_image_1772170854450.png" move "%RUTA%\egw_commentary_broken_image_1772170854450.png" "%BAK%\" && echo OK: egw_commentary
if exist "%RUTA%\egw_portrait_adventista_1772170430747.png"  move "%RUTA%\egw_portrait_adventista_1772170430747.png"  "%BAK%\" && echo OK: egw_portrait
if exist "%RUTA%\exegesis_text_1772170817361.png"            move "%RUTA%\exegesis_text_1772170817361.png"            "%BAK%\" && echo OK: exegesis_text
if exist "%RUTA%\greek_words_section_1772170824925.png"      move "%RUTA%\greek_words_section_1772170824925.png"      "%BAK%\" && echo OK: greek_words
if exist "%RUTA%\jovenes_hub_1772170127367.png"              move "%RUTA%\jovenes_hub_1772170127367.png"              "%BAK%\" && echo OK: jovenes_hub
if exist "%RUTA%\jovenes_profecia_hero_1772169591746.png"    move "%RUTA%\jovenes_profecia_hero_1772169591746.png"    "%BAK%\" && echo OK: jovenes_profecia_hero
if exist "%RUTA%\legado_biblico_icon_1772170985987.png"      move "%RUTA%\legado_biblico_icon_1772170985987.png"      "%BAK%\" && echo OK: legado_biblico_icon
if exist "%RUTA%\saved_note_adultos_1772170881438.png"       move "%RUTA%\saved_note_adultos_1772170881438.png"       "%BAK%\" && echo OK: saved_note_adultos
if exist "%RUTA%\daniel_profecia_timeline_1772169603328.png" move "%RUTA%\daniel_profecia_timeline_1772169603328.png" "%BAK%\" && echo OK: daniel_profecia_timeline
if exist "%RUTA%\copy_kids_images_1772168801560.webp"        move "%RUTA%\copy_kids_images_1772168801560.webp"        "%BAK%\" && echo OK: copy_kids_images
if exist "%RUTA%\test_adultos_module_1772170744088.webp"     move "%RUTA%\test_adultos_module_1772170744088.webp"     "%BAK%\" && echo OK: test_adultos_module
if exist "%RUTA%\nino_triste.png.png"                        move "%RUTA%\nino_triste.png.png"                        "%BAK%\" && echo OK: nino_triste.png.png

echo.
echo ==========================================
echo  LIMPIEZA COMPLETADA
echo  Todo movido a: _BACKUP_OBSOLETOS
echo  Nada fue eliminado - puedes recuperarlo
echo ==========================================
pause
