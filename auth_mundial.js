// ==============================================================================
// 🌍 MOTOR DE AUTENTICACIÓN MUNDIAL (FASE 1) - LEGADO BÍBLICO
// Lógica de Registro, Login con Google y renderizado del Santuario Personal
// ==============================================================================

const AuthGlobal = {
    user: null,
    clickCount: 0,
    
    // Iniciar Motor
    init: function() {
        console.log("🛡️ Motor AuthGlobal Iniciando...");
        
        // 1. Inyectar estilos del Santuario y Onboarding dinámicamente
        this._inyectarEstilos();
        
        // 2. Crear los contenedores principales si no existen
        if (!document.getElementById('lb-onboarding-layer')) {
            const ob = document.createElement('div');
            ob.id = 'lb-onboarding-layer';
            ob.style.display = 'none';
            document.body.appendChild(ob);
        }
        
        if (!document.getElementById('lb-santuario-layer')) {
            const st = document.createElement('div');
            st.id = 'lb-santuario-layer';
            st.style.display = 'none';
            document.body.appendChild(st);
        }

        // 3. Suscribirse a cambios de estado de Firebase
        
        // 3. Capturar errores silenciosos si viene de un Redirect (típico en WhatsApp In-App Browser)
        firebase.auth().getRedirectResult().catch((error) => {
            console.error("Error al procesar Redirect In-App:", error);
            alert("Error al iniciar sesión desde el navegador interno. Por favor, abre el enlace en Chrome o Safari e intenta de nuevo. \nDetalle: " + error.message);
        });

        // --- MODO MASTER BYPASS ---
        if (localStorage.getItem('lb_master_key') === 'true') {
            console.log("👑 MODO MASTER ACTIVADO. Saltando muro y restaurando login anónimo para Firebase.");
            this.user = { uid: 'master_admin', displayName: 'Administrador Maestro', email: 'master@legadobiblico.com' };
            
            // 🔥 FIRMA ANÓNIMA SECRETA: El administrador obtiene un token válido para que Firestore NO de "Permission Denied"
            firebase.auth().signInAnonymously().catch(e => console.warn("[Master Bypass] Error Auth:", e));
            
            // Ocultar cualquier UI de bloqueo
            const ob = document.getElementById('lb-onboarding-layer');
            if (ob) ob.style.display = 'none';
            
            // 🛑 CRÍTICO: DEVOLVER LA FACHADA AL ADMINISTRADOR
            const intro = document.querySelector('.intro-container');
            if (intro) intro.style.display = 'block';
            
            // 🛑 CRÍTICO: NO llamamos a _mostrarSantuario(). Dejamos que el Master vea la "Aplicación Madre" intacta.
            return; // Detiene el onAuthStateChanged
        }

        firebase.auth().onAuthStateChanged((user) => {
            // EXIGENCIA: Tiene que ser un usuario válido y NO anónimo
            if (user && !user.isAnonymous) {
                console.log("✅ Usuario mundial detectado:", user.email);
                this.user = user;
                this._prepararDatosUsuario(user);
            } else {
                console.log("❌ Usuario anónimo o sin sesión. Exigiendo registro mundial.");
                this.user = null;
                this._mostrarOnboarding();
            }
        });
    },

    // Iniciar sesión con Google (Adaptado para celulares/PWA y Redes Sociales)
    loginConGoogle: async function() {
        const btn = document.querySelector('.ob-btn-google');
        if (btn && btn.dataset.loading === '1') return; // Previene doble clic

        try {
            // Dar feedback visual inmediato
            if(btn) {
                btn.innerHTML = '⏳ Conectando con Google...';
                btn.dataset.loading = '1';
                btn.style.opacity = '0.7';
            }
            
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            
            // Intentamos Popup porque es mejor para WhatsApp In-App Browser y soluciona el ciclo infinito
            try {
                await firebase.auth().signInWithPopup(provider);
                console.log("✅ Login exitoso vía Popup");
            } catch (popupError) {
                // Si bloquean el popup, modo PWA iOS estricto, o choques por toques rápidos
                const fallbacks = ['auth/popup-blocked', 'auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/web-storage-unsupported'];
                
                if (fallbacks.includes(popupError.code)) {
                    console.warn("⚠️ Popup rechazado (" + popupError.code + "), cambiando modo a Redirect seguro...");
                    if(btn) btn.innerHTML = '🔄 Abriendo Google seguro...';
                    await firebase.auth().signInWithRedirect(provider);
                } else {
                    throw popupError;
                }
            }
        } catch (error) {
            console.error("Error al iniciar con Google:", error);
            alert("Error Google (" + error.code + "): " + error.message + "\n\nPor favor, toca el botón una sola vez suavemente.");
            if(btn) {
                btn.innerHTML = 'Continuar con Google';
                btn.dataset.loading = '0';
                btn.style.opacity = '1';
            }
        }
    },

    // Cerrar sesión
    logout: async function() {
        try {
            await firebase.auth().signOut();
            window.location.reload(); // Recargar limpia el estado y vuelve al muro
        } catch (error) {
            console.error(error);
        }
    },

    // Verifica si el usuario existe en Firestore, si no, lo crea.
    _prepararDatosUsuario: async function(user) {
        try {
            const db = firebase.firestore();
            const userRef = db.collection('usuarios_app').doc(user.uid);
            const doc = await userRef.get();
            
            // Construir perfil base con lo que existe en localStorage por ahora
            let fuegoLocal = localStorage.getItem('ab_racha_fuego') || 0;
            let planLocal = localStorage.getItem('ab_plan_actual') || 'Ninguno';
            
            if (!doc.exists) {
                console.log("✨ Creando nuevo perfil mundial en Firestore...");
                await userRef.set({
                    uid: user.uid,
                    nombre: user.displayName || 'Hermano(a)',
                    email: user.email,
                    fecha_registro: firebase.firestore.FieldValue.serverTimestamp(),
                    rol: 'usuario_standard',
                    estadisticas: {
                        racha_fuego: parseInt(fuegoLocal),
                        plan_actual: planLocal,
                        puntos_victoria: 0
                    }
                });
            } else {
                // Actualizar info con lo que tenga el cel
                await userRef.update({
                    'estadisticas.racha_fuego': parseInt(fuegoLocal),
                    ultimo_acceso: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            
            this._mostrarSantuario();

        } catch(e) {
            console.error("Error en _prepararDatosUsuario", e);
            // Fallback: mostrar santuario aunque falle la BD por problemas de red
            this._mostrarSantuario(); 
        }
    },

    // Detonador secreto del Modo Master
    attemptMaster: function() {
        this.clickCount++;
        if (this.clickCount >= 7) {
            alert('👑 MODO MASTER ACTIVADO. Acceso Total Concedido al Administrador.');
            localStorage.setItem('lb_master_key', 'true');
            window.location.reload();
        }
    },

    // Dibuja la pantalla de Bloqueo (Onboarding Premium)
    _mostrarOnboarding: function() {
        // Ocultar menú viejo si existe y ocultar la fachada entera para evitar bugs de visualización
        this._ocultarLegacyMenu();
        const intro = document.querySelector('.intro-container');
        if (intro) intro.style.display = 'none';
        
        const capa = document.getElementById('lb-onboarding-layer');
        // Usar estilos inline críticos por si falla el Head
        capa.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; padding:20px; background-color:#050505; z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow-y:auto;';
        
        capa.innerHTML = `
            <div class="ob-bg"></div>
            <div class="ob-container">
                <div class="ob-icon-circle" style="background: transparent; border: none; box-shadow: none; width: 140px; height: 140px; animation: ob-floating 6s ease-in-out infinite;" onclick="AuthGlobal.attemptMaster()">
                    <img src="https://legadobiblicopro.com/logo_oficial.png" alt="Legado Bíblico Logo" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));">
                </div>
                
                <h1 class="ob-title" onclick="AuthGlobal.attemptMaster()">Legado Bíblico</h1>
                <p class="ob-subtitle">Formación integral a imagen del Creador.<br><strong>Sé parte del legado.</strong></p>

                <div class="ob-glass-box">
                    <button class="ob-btn-google" onclick="AuthGlobal.loginConGoogle()">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.72 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.57C14.74 18.23 13.48 18.63 12 18.63C9.13 18.63 6.7 16.69 5.81 14.07H2.14V16.92C3.96 20.53 7.69 23 12 23Z" fill="#34A853"/>
                            <path d="M5.81 14.07C5.58 13.39 5.45 12.67 5.45 11.93C5.45 11.19 5.58 10.47 5.81 9.79V6.94H2.14C1.39 8.44 0.96 10.13 0.96 11.93C0.96 13.73 1.39 15.42 2.14 16.92L5.81 14.07Z" fill="#FBBC05"/>
                            <path d="M12 5.23C13.62 5.23 15.06 5.79 16.2 6.89L19.35 3.74C17.45 1.97 14.97 0.86 12 0.86C7.69 0.86 3.96 3.33 2.14 6.94L5.81 9.79C6.7 7.17 9.13 5.23 12 5.23Z" fill="#EA4335"/>
                        </svg>
                        Continuar con Google
                    </button>
                    <p style="text-align:center; font-size:0.7rem; color:rgba(255,255,255,0.4); margin-top:15px; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
                        Al iniciar sesión, tu progreso físico, mental y espiritual quedará guardado para siempre de forma segura.
                    </p>
                </div>
            </div>
        `;
        document.getElementById('lb-santuario-layer').style.display = 'none';
        capa.style.display = 'flex';
    },

    // =========================================================================
    // 🔒🔒🔒🔒🔒 [5 CANDADOS DE DISEÑO - DISEÑO ESTRICTAMENTE TERMINADO Y APROBADO] 
    // ESTE DISEÑO DE LA TIENDA (EL SANTUARIO) Y SUS TARJETAS NO DEBEN SER ALTERADOS, 
    // MEJORADOS NI MODIFICADOS POR IA. SÓLO SE CAMBIARÁ SI EL CREADOR LO ORDENA EXPLÍCITAMENTE.
    // =========================================================================
    
    // Dibuja el Dashboard Premium (Santuario)
    _mostrarSantuario: function() {
        this._ocultarLegacyMenu();
        const intro = document.querySelector('.intro-container');
        if (intro) intro.style.display = 'none';

        const capa = document.getElementById('lb-santuario-layer');
        capa.style.cssText = 'background-color:#09090e; min-height:100vh; overflow-x:hidden; padding-bottom:50px; display:block;';
        
        let nombre = this.user.displayName || "Hermano(a)";
        let avatarInicial = nombre.charAt(0).toUpperCase();
        let email = this.user.email || "";
        let fuegoLocal = localStorage.getItem('ab_racha_fuego') || 0;
        let porcentajeVictoria = parseInt(fuegoLocal) * 2; // Simulado
        if(porcentajeVictoria > 100) porcentajeVictoria = 100;
        
        let planActual = localStorage.getItem('ab_plan_actual') || 'Libre / Ninguno';
        
        let depoHoy = localStorage.getItem('devocional_completado_hoy') === new Date().toDateString();
        let badgeDevo = depoHoy ? '<div class="st-badge st-done">✅ Completado</div>' : '';

        // Array de 90 Gemas Diarias (Rota automáticamente cada día)
        const gemasDiarias = [
            { v: '"Jehová es mi pastor; nada me faltará."', r: 'Salmos 23:1' },
            { v: '"Todo lo puedo en Cristo que me fortalece."', r: 'Filipenses 4:13' },
            { v: '"El Señor es mi luz y mi salvación; ¿de quién temeré?"', r: 'Salmos 27:1' },
            { v: '"Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes..."', r: 'Josué 1:9' },
            { v: '"Mas los que esperan a Jehová tendrán nuevas fuerzas..."', r: 'Isaías 40:31' },
            { v: '"Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia."', r: 'Proverbios 3:5' },
            { v: '"Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones."', r: 'Salmos 46:1' },
            { v: '"Porque yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz..."', r: 'Jeremías 29:11' },
            { v: '"Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."', r: 'Mateo 11:28' },
            { v: '"Encomienda a Jehová tu camino, Y confía en él; y él hará."', r: 'Salmos 37:5' },
            { v: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios..."', r: 'Isaías 41:10' },
            { v: '"El que habita al abrigo del Altísimo Morará bajo la sombra del Omnipotente."', r: 'Salmos 91:1' },
            { v: '"Lámpara es a mis pies tu palabra, Y lumbrera a mi camino."', r: 'Salmos 119:105' },
            { v: '"Buscad a Jehová mientras puede ser hallado, llamadle en tanto que está cercano."', r: 'Isaías 55:6' },
            { v: '"A Jehová he puesto siempre delante de mí; Porque está a mi diestra, no seré conmovido."', r: 'Salmos 16:8' },
            { v: '"Cercano está Jehová a todos los que le invocan, A todos los que le invocan de veras."', r: 'Salmos 145:18' },
            { v: '"Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces."', r: 'Jeremías 33:3' },
            { v: '"Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti..."', r: 'Números 6:24-25' },
            { v: '"Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios..."', r: 'Filipenses 4:6' },
            { v: '"Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien..."', r: 'Romanos 8:28' },
            { v: '"Deléitate asimismo en Jehová, Y él te concederá las peticiones de tu corazón."', r: 'Salmos 37:4' },
            { v: '"Acerquémonos, pues, confiadamente al trono de la gracia, para alcanzar misericordia..."', r: 'Hebreos 4:16' },
            { v: '"Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados..."', r: '1 Juan 1:9' },
            { v: '"Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción..."', r: 'Juan 16:33' },
            { v: '"Crea en mí, oh Dios, un corazón limpio, Y renueva un espíritu recto dentro de mí."', r: 'Salmos 51:10' },
            { v: '"La exposición de tus palabras alumbra; Hace entender a los simples."', r: 'Salmos 119:130' },
            { v: '"Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él."', r: 'Salmos 118:24' },
            { v: '"Gozosos en la esperanza; sufridos en la tribulación; constantes en la oración."', r: 'Romanos 12:12' },
            { v: '"El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso..."', r: '1 Corintios 13:4' },
            { v: '"He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él..."', r: 'Apocalipsis 3:20' },
            { v: '"Enséñame a hacer tu voluntad, porque tú eres mi Dios; Tu buen espíritu me guíe..."', r: 'Salmos 143:10' },
            { v: '"Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera..."', r: 'Isaías 26:3' },
            { v: '"Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados."', r: 'Proverbios 16:3' },
            { v: '"Sean gratos los dichos de mi boca y la meditación de mi corazón delante de ti..."', r: 'Salmos 19:14' },
            { v: '"Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros."', r: '1 Pedro 5:7' },
            { v: '"Gustad, y ved que es bueno Jehová; Dichoso el hombre que confía en él."', r: 'Salmos 34:8' },
            { v: '"Y el Dios de esperanza os llene de todo gozo y paz en el creer..."', r: 'Romanos 15:13' },
            { v: '"Alzaré mis ojos a los montes; ¿De dónde vendrá mi socorro? Mi socorro viene de Jehová..."', r: 'Salmos 121:1-2' },
            { v: '"De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron..."', r: '2 Corintios 5:17' },
            { v: '"Echa sobre Jehová tu carga, y él te sustentará; No dejará para siempre caído al justo."', r: 'Salmos 55:22' },
            { v: '"¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?"', r: 'Romanos 8:31' },
            { v: '"Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas."', r: 'Mateo 6:33' },
            { v: '"Jehová será refugio del pobre, Refugio para el tiempo de angustia."', r: 'Salmos 9:9' },
            { v: '"Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te anegarán..."', r: 'Isaías 43:2' },
            { v: '"No se turbe vuestro corazón; creéis en Dios, creed también en mí."', r: 'Juan 14:1' },
            { v: '"Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados... nos podrá separar del amor de Dios."', r: 'Romanos 8:38-39' },
            { v: '"Y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén."', r: 'Mateo 28:20' },
            { v: '"Cercano está Jehová a los quebrantados de corazón; Y salva a los contritos de espíritu."', r: 'Salmos 34:18' },
            { v: '"Jehová está en medio de ti, poderoso, él salvará; se gozará sobre ti con alegría..."', r: 'Sofonías 3:17' },
            { v: '"Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios."', r: 'Efesios 2:8' },
            { v: '"Buscad a Jehová y su poder; Buscad su rostro continuamente."', r: '1 Crónicas 16:11' },
            { v: '"Bendice, alma mía, a Jehová, Y bendiga todo mi ser su santo nombre."', r: 'Salmos 103:1' },
            { v: '"Y la paz de Dios gobierne en vuestros corazones, a la que asimismo fuisteis llamados..."', r: 'Colosenses 3:15' },
            { v: '"Sean vuestras costumbres sin avaricia, contentos con lo que tenéis ahora; porque él dijo: No te desampararé..."', r: 'Hebreos 13:5' },
            { v: '"En mi corazón he guardado tus dichos, Para no pecar contra ti."', r: 'Salmos 119:11' },
            { v: '"Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve."', r: 'Hebreos 11:1' },
            { v: '"Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente..."', r: 'Santiago 1:5' },
            { v: '"Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida."', r: 'Proverbios 4:23' },
            { v: '"Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio."', r: '2 Timoteo 1:7' },
            { v: '"Jehová, roca mía y castillo mío, y mi libertador; Dios mío, fortaleza mía, en él confiaré..."', r: 'Salmos 18:2' },
            { v: '"La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón..."', r: 'Juan 14:27' },
            { v: '"En el amor no hay temor, sino que el perfecto amor echa fuera el temor..."', r: '1 Juan 4:18' },
            { v: '"Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe..."', r: 'Gálatas 5:22' },
            { v: '"Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros."', r: 'Romanos 5:8' },
            { v: '"Alabad a Jehová, porque él es bueno; Porque para siempre es su misericordia."', r: 'Salmos 107:1' },
            { v: '"Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora."', r: 'Eclesiastés 3:1' },
            { v: '"Y conoceréis la verdad, y la verdad os hará libres."', r: 'Juan 8:32' },
            { v: '"Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón... serás salvo."', r: 'Romanos 10:9' },
            { v: '"Torre fuerte es el nombre de Jehová; A él correrá el justo, y será levantado."', r: 'Proverbios 18:10' },
            { v: '"Te haré entender, y te enseñaré el camino en que debes andar; Sobre ti fijaré mis ojos."', r: 'Salmos 32:8' },
            { v: '"Estad siempre gozosos. Orad sin cesar. Dad gracias en todo..."', r: '1 Tesalonicenses 5:16-18' },
            { v: '"Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad."', r: '2 Corintios 12:9' },
            { v: '"Y esta es la confianza que tenemos en él, que si pedimos alguna cosa conforme a su voluntad, él nos oye."', r: '1 Juan 5:14' },
            { v: '"Por lo demás, hermanos míos, fortaleceos en el Señor, y en el poder de su fuerza."', r: 'Efesios 6:10' },
            { v: '"Bendito el varón que confía en Jehová, y cuya confianza es Jehová."', r: 'Jeremías 17:7' },
            { v: '"Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia..."', r: 'Miqueas 6:8' },
            { v: '"En Dios solamente está acallada mi alma; De él viene mi salvación."', r: 'Salmos 62:1' },
            { v: '"Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias."', r: 'Lamentaciones 3:22' },
            { v: '"El que encubre sus pecados no prosperará; Mas el que los confiesa y se aparta alcanzará misericordia."', r: 'Proverbios 28:13' },
            { v: '"He aquí Dios es salvación mía; me aseguraré y no temeré; porque mi fortaleza y mi canción es JAH..."', r: 'Isaías 12:2' },
            { v: '"Pero fiel es el Señor, que os afirmará y guardará del mal."', r: '2 Tesalonicenses 3:3' },
            { v: '"Porque sol y escudo es Jehová Dios; Gracia y gloria dará Jehová. No quitará el bien a los que andan en integridad."', r: 'Salmos 84:11' },
            { v: '"Todas vuestras cosas sean hechas con amor."', r: '1 Corintios 16:14' },
            { v: '"Te alabaré; porque formidables, maravillosas son tus obras; Estoy maravillado, y mi alma lo sabe muy bien."', r: 'Salmos 139:14' },
            { v: '"No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento..."', r: 'Romanos 12:2' },
            { v: '"Mas él herido fue por nuestras rebeliones, molido por nuestros pecados... y por su llaga fuimos nosotros curados."', r: 'Isaías 53:5' },
            { v: '"No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos."', r: 'Zacarías 4:6' },
            { v: '"Porque nada hay imposible para Dios."', r: 'Lucas 1:37' },
            { v: '"Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, este lleva mucho fruto..."', r: 'Juan 15:5' },
            { v: '"Una cosa he demandado a Jehová, ésta buscaré; Que esté yo en la casa de Jehová todos los días de mi vida..."', r: 'Salmos 27:4' }
        ];

        // Calcular la fecha con un offset de -5 horas para que el día "cambie" a las 5:00 AM
        let offsetDate = new Date(Date.now() - (5 * 60 * 60 * 1000));
        // Generar un índice basado en el día del año para que rote todos los días secuencialmente
        let diaDelAnio = Math.floor((offsetDate - new Date(offsetDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        let gemaSeleccionada = gemasDiarias[diaDelAnio % gemasDiarias.length];

        let mainVerse = gemaSeleccionada.v;
        let mainRef = gemaSeleccionada.r;

        // Ocultar iglesia para usuarios normales que no sean los de prueba / de la congregacion (ej: admin logic si fuese necesario)
        
        capa.innerHTML = `
            <div class="st-bg"></div>
            
            <div class="st-brand-header">
                <img src="https://legadobiblicopro.com/logo_oficial.png" alt="Logo" class="st-brand-logo">
                <h1 class="st-brand-title">Legado Bíblico</h1>
            </div>

            <div class="st-header">
                <div class="st-user">
                    <div class="st-avatar">${avatarInicial}</div>
                    <div>
                        <div class="st-greet">Bendecido día, <span style="background:rgba(255,107,107,0.2);color:#ff6b6b;font-size:0.5rem;padding:2px 6px;border-radius:6px;margin-left:4px;font-weight:900;letter-spacing:1px;border:1px solid rgba(255,107,107,0.4);">TESTER VIP</span></div>
                        <div class="st-name">${this.user.displayName || 'Legado'}</div>
                    </div>
                </div>
                <div class="st-settings" onclick="AuthGlobal.logout()" title="Cerrar sesión">🚪</div>
            </div>

            <!-- CARA DE LA APLICACIÓN: GEMA DIARIA -->
            <div class="st-gema-diaria">
                <div class="st-gema-badge">✨ GEMA DIARIA</div>
                <div class="st-gema-verse">${mainVerse}</div>
                <div class="st-gema-ref">${mainRef}</div>
            </div>

            <!-- Las Stats fueron integradas directamente en las tarjetas de Mision correspondientes -->

            <!-- 👑 LA REINA: LEER LA BIBLIA (PREMIUM CARD) -->
            <div id="lb-royal-card" onclick="abrirSelectorBiblias()" style="
                margin-top: 24px;
                background: linear-gradient(135deg, #130f2e 0%, #1a163b 100%);
                border: 1px solid rgba(241, 196, 15, 0.3);
                border-radius: 20px;
                padding: 18px 20px;
                display: flex;
                align-items: center;
                gap: 16px;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                position: relative;
                overflow: hidden;">
                
                <!-- Efecto de brillo de fondo dorado -->
                <div style="position:absolute; top:-50%; right:-10%; width:160px; height:160px; background:radial-gradient(circle, rgba(241,196,15,0.15) 0%, transparent 70%); border-radius:50%; pointer-events:none;"></div>

                <div style="font-size: 2.2rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); transform: translateY(-2px);">
                    📖
                </div>
                
                <div style="flex: 1; z-index: 1;">
                    <div style="color: #f1c40f; font-size: 0.65rem; font-weight: 900; letter-spacing: 2.5px; margin-bottom: 4px; text-transform: uppercase;">La Palabra de Dios</div>
                    <h2 id="lb-royal-title" style="color: #fff; font-size: 1.3rem; font-weight: 900; margin: 0; letter-spacing: 0.5px;">Santa Biblia</h2>
                    <p id="lb-royal-desc" style="color: rgba(255,255,255,0.5); font-size: 0.75rem; margin: 4px 0 0; line-height: 1.3;">Lectura libre, múltiples versiones y estudio profundo.</p>
                </div>
                
                <div style="color: #f1c40f; font-size: 1.8rem; font-weight: 300; opacity: 0.6; z-index: 1;">›</div>
            </div>
            <!-- LA CORONA TERMINA -->

            <!-- ESPACIO ANTES DE LAS MISIONES -->
            <div style="margin-top:24px;"></div>

             <!-- MISION 1: DEVOCIONAL -->
            <div class="st-mission-card st-card-devo" onclick="abrirDevocional()">
                ${badgeDevo}
                <div class="st-label" style="display:flex; justify-content:space-between; align-items:center;">
                    <span>Paso 1</span>
                    <span style="background:rgba(255,118,117,0.15); padding:3px 8px; border-radius:12px; color:#ff7675; font-weight:900; font-size:0.7rem; display:flex; align-items:center; gap:4px;">
                        🔥 ${fuegoLocal} Días Racha
                    </span>
                </div>
                <h2 class="st-title">Devocional del Día</h2>
                <button class="st-btn ${depoHoy ? 'st-btn-done' : ''}">🙏 Leer Hoy</button>
            </div>

            <!-- MISION 2: AÑO BÍBLICO -->
            <div class="st-mission-card st-card-plan" onclick="typeof abrirAnoBiblico==='function'?abrirAnoBiblico():alert('Módulos cargando...')">
                <div class="st-label" style="display:flex; justify-content:space-between; align-items:center;">
                    <span>Paso 2</span>
                    <span style="background:rgba(253,203,110,0.15); padding:3px 8px; border-radius:12px; color:#fdcb6e; font-weight:900; font-size:0.7rem; display:flex; align-items:center; gap:4px;">
                        🏆 ${porcentajeVictoria}% Victoria
                    </span>
                </div>
                <h2 class="st-title">Desafío Bíblico</h2>
                <p class="st-desc" style="margin-bottom:10px; font-size:0.75rem;">Plan actual: <strong>${planActual}</strong></p>
                <button class="st-btn">📖 Explorar Mapas</button>
            </div>

            <!-- MISION 3: ALIENTO -->
            <div class="st-mission-card st-card-aliento" onclick="abrirAliento()">
                <div class="st-label">Pilar Espiritual</div>
                <h2 class="st-title">Versículos de Aliento</h2>
                <button class="st-btn">🤝 Buscar Aliento</button>
            </div>

            <!-- ESPACIO -->
            <div style="margin-top:24px;"></div>

            <div class="st-explore-grid">
                <!-- Se movió la Biblia Libre a la tarjeta Principal superior -->
                
                <div class="st-explore-btn" onclick="AuthGlobal.abrirSelectorTemas()">
                    <div class="st-explore-icon">🎨</div>
                    <div>
                        <div class="st-explore-title" style="color:#00cec9;">Color de Fondo</div>
                        <div class="st-explore-desc">Elige tu estilo visual.</div>
                    </div>
                </div>

                <div class="st-explore-btn" onclick="_compartirAppGlobal()">
                    <div class="st-explore-icon">💌</div>
                    <div>
                        <div class="st-explore-title" style="color:#e84118;">Invitar Amigos</div>
                        <div class="st-explore-desc">Crecimiento viral de la App.</div>
                    </div>
                </div>

                <!-- MÓDULOS ACTIVOS AHORA EN MODO FABRICA/PRUEBAS -->
                
                <div class="st-explore-btn" style="grid-column: 1 / -1;" onclick="window.abrirAcademiaBiblica()">
                    <div class="st-explore-icon">🏫</div>
                    <div>
                        <div class="st-explore-title" style="color:#74b9ff;">Academia Bíblica</div>
                        <div class="st-explore-desc">Educación segmentada por edades.</div>
                    </div>
                </div>
                
                <div class="st-explore-btn" style="grid-column: 1 / -1; border-color: rgba(46,213,115,0.3); background: rgba(46,213,115,0.1);" onclick="window.seleccionarNivel('iglesia')">
                    <div class="st-explore-icon">⛪</div>
                    <div>
                        <div class="st-explore-title" style="color:#2ed573;">Panel de Iglesia (Admin)</div>
                        <div class="st-explore-desc">Planillas VIP, CBA, Liturgias.</div>
                    </div>
                </div> 
            </div>
            
        <div style="height: 90px;"></div> <!-- Padding del bottom nav si existe -->
        `;
        
        // Aplicar el tema guardado antes de mostrar la capa
        this._aplicarTema();

        document.getElementById('lb-onboarding-layer').style.display = 'none';
        capa.style.display = 'block';
    },

    abrirSelectorTemas: function() {
        if(document.getElementById('lb-theme-overlay')) {
            document.getElementById('lb-theme-overlay').style.display = 'flex';
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.id = 'lb-theme-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);z-index:99999999;display:flex;flex-direction:column;justify-content:flex-end;';
        
        let bgStyle = "background:#09090e; border-radius:30px 30px 0 0; padding:25px 20px 40px; box-shadow:0 -10px 30px rgba(0,0,0,0.5);";
        
        let html = '<div style="' + bgStyle + '">';
        html += '<h2 style="color:#fff;font-family:Inter,sans-serif;font-size:1.4rem;font-weight:900;margin:0 0 5px;text-align:center;">Atmósfera de Tienda</h2>';
        html += '<p style="color:rgba(255,255,255,0.5);text-align:center;font-size:0.8rem;margin:0 0 25px;font-family:Inter,sans-serif;">Selecciona un color de fondo para la PWA</p>';
        
        html += '<div style="display:flex;gap:12px;overflow-x:auto;padding-bottom:10px;justify-content:center;font-family:Inter,sans-serif;">';
        
        const temas = [
            { id: 'dark', nom: 'Oscuro', col: '#130f2e'},
            { id: 'white', nom: 'Blanco', col: '#ffffff'},
            { id: 'gray', nom: 'Gris', col: '#f5f6fa'},
            { id: 'blue', nom: 'Azul', col: '#e8f4f8'},
            { id: 'green', nom: 'Verdecito', col: '#e8f8f5'}
        ];

        temas.forEach(t => {
            let br = t.id === 'white' ? 'border:1px solid #dcdde1;' : 'border:1px solid rgba(255,255,255,0.1);';
            html += '<div onclick="AuthGlobal.cambiarTema(\''+t.id+'\')" style="display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;flex-shrink:0;width:70px;">';
            html += '<div style="width:50px;height:50px;border-radius:50%;background:'+t.col+';'+br+'box-shadow:0 4px 10px rgba(0,0,0,0.2);"></div>';
            html += '<div style="color:rgba(255,255,255,0.7);font-size:0.6rem;font-weight:700;text-align:center;line-height:1.2;">'+t.nom+'</div>';
            html += '</div>';
        });
        
        html += '</div>';
        html += '<button onclick="document.getElementById(\'lb-theme-overlay\').style.display=\'none\'" style="width:100%;margin-top:20px;padding:15px;border-radius:15px;background:rgba(255,255,255,0.1);color:#fff;border:none;font-weight:900;cursor:pointer;font-family:Inter,sans-serif;">Dejar así</button>';
        html += '</div>';
        
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function(e) {
            if(e.target === overlay) overlay.style.display = 'none';
        });
    },

    cambiarTema: function(temaId) {
        localStorage.setItem('lb_tema_tienda', temaId);
        this._aplicarTema();
        const o = document.getElementById('lb-theme-overlay');
        if(o) o.style.display = 'none';
    },
    
    // =========================================================================
    // 🔒🔒🔒🔒🔒 [5 CANDADOS - MOTOR DE TEMAS DE COLOR]
    // ESTA GAMA DE COLORES HA SIDO PERFECCIONADA A EXTREMO CONTRASTE A PETICIÓN DEL USUARIO.
    // ESTÁ ESTRICTAMENTE PROHIBIDO CAMBIAR LOS CÓDIGOS HEX O LA OPACIDAD SIN SU ORDEN.
    // =========================================================================
    
    _aplicarTema: function() {
        const temaId = localStorage.getItem('lb_tema_tienda') || 'dark';
        if(!document.getElementById('lb-tema-light-styles')) {
            const st = document.createElement('style');
            st.id = 'lb-tema-light-styles';
            document.head.appendChild(st);
        }
        
        const st = document.getElementById('lb-tema-light-styles');
        if(temaId === 'dark') {
            st.innerHTML = '';
            return; // El Oscuro usa el CSS original de fábrica
        }

        let mainBg = '';
        let cardBg = '';
        let royalBg = '';
        let darkText = '#2d3436';
        let secText = '#636e72';
        
        if(temaId === 'white') {
            mainBg = 'linear-gradient(180deg, #f5f6fa 0%, #dcdde1 100%)';
            cardBg = '#ffffff';
            royalBg = 'linear-gradient(135deg, #ffffff 0%, #f1f2f6 100%)';
            darkText = '#2d3436';
            secText = '#636e72';
        } else if(temaId === 'gray') {
            mainBg = '#f1f2f6';
            cardBg = 'linear-gradient(145deg, #dfe4ea, #ced6e0)';
            royalBg = 'linear-gradient(135deg, #a4b0be, #747d8c)';
            darkText = '#2f3542';
            secText = '#57606f';
        } else if(temaId === 'blue') {
            mainBg = '#f0f8ff';
            cardBg = 'linear-gradient(145deg, #d4e6f1, #85c1e9)';
            royalBg = 'linear-gradient(135deg, #5dade2, #2e86c1)';
            darkText = '#154360';
            secText = '#21618c';
        } else if(temaId === 'green') {
            mainBg = '#f4fbf4';
            cardBg = 'linear-gradient(145deg, #abebc6, #58d68d)';
            royalBg = 'linear-gradient(135deg, #52be80, #27ae60)';
            darkText = '#145a32';
            secText = '#1e8449';
        }

        st.innerHTML = `
            #lb-santuario-layer { background: transparent !important; color: ${darkText} !important; }
            .st-bg { background: ${mainBg} !important; opacity: 1 !important; z-index: -1; transition: background 0.3s ease; }
            
            #lb-santuario-layer .st-brand-title { background: linear-gradient(90deg, #2d3436, #0984e3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            
            #lb-santuario-layer .st-name { color: ${darkText} !important; }
            
            /* Textos limpios sin sombra */
            #lb-santuario-layer .st-title, 
            #lb-santuario-layer .st-gema-verse, 
            #lb-santuario-layer .st-explore-title, 
            #lb-santuario-layer .st-section-title { color: ${darkText} !important; text-shadow: none !important; }
            
            /* Textos secundarios */
            #lb-santuario-layer .st-desc, 
            #lb-santuario-layer .st-gema-ref, 
            #lb-santuario-layer .st-explore-desc, 
            #lb-santuario-layer .st-greet { color: ${secText} !important; }
            
            #lb-santuario-layer .st-label { color: rgba(0,0,0,0.5) !important; }
            
            /* Aplicando COLOR DE ARTE a las Tarjetas Regulares */
            #lb-santuario-layer .st-mission-card, 
            #lb-santuario-layer .st-explore-btn, 
            #lb-santuario-layer .st-gema-diaria, 
            #lb-santuario-layer .st-settings { 
                background: ${cardBg} !important; 
                border: 1px solid rgba(255,255,255,0.8) !important; 
                box-shadow: 0 10px 20px rgba(0,0,0,0.05), inset 0 2px 5px rgba(255,255,255,0.5) !important; 
            }
            
            /* Aplicando COLOR DE ARTE a LA REINA (Premium Card) */
            #lb-royal-card {
                background: ${royalBg} !important;
                border: 1px solid rgba(241, 196, 15, 0.5) !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.8) !important;
            }
            #lb-royal-title { color: ${darkText} !important; text-shadow: none !important; }
            #lb-royal-desc { color: ${secText} !important; }
            
            /* Botones Adaptables que resaltan sobre el color saturado */
            #lb-santuario-layer .st-btn { border-color: rgba(0,0,0,0.05) !important; color: ${darkText} !important; background: rgba(255,255,255,0.6) !important; box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important; }
            #lb-santuario-layer .st-btn-done { background: rgba(255,255,255,0.2) !important; color: rgba(0,0,0,0.4) !important; border: 1px dashed rgba(0,0,0,0.1) !important; box-shadow: none !important; }
            #lb-santuario-layer .st-settings { color: ${darkText} !important; }
        `;
    },

    // Esconde TODO el menú clásico original
    _ocultarLegacyMenu: function() {
        const welcome = document.querySelector('.welcome-text');
        const grid = document.querySelector('.category-grid');
        const iglesiaBtns = document.querySelectorAll(`div[onclick="seleccionarNivel('iglesia')"]`);
        const shareBtns = document.querySelectorAll(`div[onclick="_compartirAppGlobal()"]`);
        
        if (welcome) welcome.style.display = 'none';
        if (grid) grid.style.display = 'none';
        iglesiaBtns.forEach(b => b.style.display = 'none');
        shareBtns.forEach(b => b.style.display = 'none');
    },

    // CSS del nuevo motor inyectado al Head
    _inyectarEstilos: function() {
        if(document.getElementById('auth-mundial-styles')) return;
        const style = document.createElement('style');
        style.id = 'auth-mundial-styles';
        style.innerHTML = `
            /* ========== ESTILOS DEL ONBOARDING ========== */
            #lb-onboarding-layer {
                position: fixed; top: 0; left: 0; right: 0; bottom: 0; filter: blur(0px);
                background-color: #050505; z-index: 9999999; /* Sobre todo */
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                background-image: url('https://legadobiblicopro.com/galaxia_bg.jpg'); /* placeholder */
                background-size: cover; background-position: center;
            }
            .ob-container { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; padding: 20px; text-align: center; }
            .ob-icon-circle { display: flex; justify-content: center; align-items: center; margin-bottom: 10px; }
            .ob-title { font-family: 'Inter', sans-serif; font-size: 2.2rem; font-weight: 900; margin-bottom: 5px; color: #fff; text-align: center; }
            .ob-subtitle { font-family: 'Inter', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.7); text-align: center; margin-bottom: 40px; line-height:1.4;}
            .ob-glass-box { width: 90%; max-width: 400px; padding: 25px; background: rgba(20,20,30,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; backdrop-filter: blur(15px); }
            .ob-btn-google { width: 100%; padding: 16px; background: #fff; border: none; border-radius: 14px; color: #000; font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: transform 0.2s; }
            .ob-btn-google:active { transform: scale(0.96); }
            @keyframes ob-floating { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }

            /* ========== ESTILOS DEL SANTUARIO ========== */
            #lb-santuario-layer {
                width: 100%; min-height: 100vh; padding: 20px;
                background-color: #09090e; color: #fff; font-family: 'Inter', sans-serif;
                animation: slideUp 0.5s ease; box-sizing: border-box;
            }
            .st-bg { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, rgba(9,9,14,0.1) 0%, rgba(9,9,14,1) 100%); z-index: -1; }
            
            .st-brand-header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 25px; padding-top: 10px; }
            .st-brand-logo { width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5)); }
            .st-brand-title { font-family: 'Inter', sans-serif; font-size: 1.3rem; font-weight: 900; letter-spacing: -0.5px; margin: 0; background: linear-gradient(90deg, #fff, #a29bfe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

            .st-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
            .st-user { display: flex; align-items: center; gap: 14px; }
            .st-avatar { width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #a29bfe, #6c5ce7); display: flex; justify-content: center; align-items: center; font-size: 1.2rem; font-weight: 900; box-shadow: 0 5px 15px rgba(108,92,231,0.4); border: 2px solid rgba(255,255,255,0.2); }
            .st-greet { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-bottom: 2px; }
            .st-name { font-size: 1.15rem; font-weight: 900; letter-spacing: -0.5px; }
            .st-settings { width: 40px; height: 40px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center; cursor: pointer; color: #fff; font-size:1.1rem; backdrop-filter: blur(10px);}
            
            .st-stats { display: flex; gap: 10px; margin-bottom: 30px; }
            .st-stat-card { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 14px; display: flex; align-items: center; gap: 10px; backdrop-filter: blur(10px); }
            .st-stat-icon { font-size: 1.5rem; }
            .st-stat-val { font-size: 1.1rem; font-weight: 900; line-height: 1; margin-bottom: 4px; }
            .st-stat-lbl { font-size: 0.6rem; color: rgba(255,255,255,0.4); font-weight: 700; letter-spacing: 1px; }

            .st-section-title { font-size: 1.1rem; font-weight: 900; margin-bottom: 16px; color: rgba(255,255,255,0.9); }

            .st-gema-diaria { background: linear-gradient(145deg, rgba(20,20,30,0.8) 0%, rgba(10,10,15,0.9) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 25px; margin-bottom: 25px; text-align: center; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(10px); }
            .st-gema-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #000; border: 1px solid rgba(255,255,255,0.2); padding: 4px 14px; border-radius: 20px; font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; color: #fdcb6e; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
            .st-gema-verse { font-family: 'Crimson Text', serif; font-size: 1.3rem; line-height: 1.6; color: #fff; font-style: italic; margin-bottom: 10px; margin-top: 5px; }
            .st-gema-ref { font-size: 0.75rem; font-weight: 800; color: rgba(255,255,255,0.4); letter-spacing: 1px; }

            .st-mission-card { width: 100%; border-radius: 20px; padding: 22px; margin-bottom: 16px; position: relative; overflow: hidden; cursor: pointer; transition: transform 0.2s, background 0.3s; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(15px); box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
            .st-mission-card:active { transform: scale(0.97); background: rgba(255,255,255,0.05); }
            .st-card-devo { border-left: 4px solid #ff7675; }
            .st-card-plan { border-left: 4px solid #74b9ff; }
            .st-card-aliento { border-left: 4px solid #fdcb6e; }
            
            .st-badge { position: absolute; top: 18px; right: 18px; padding: 4px 10px; border-radius: 20px; font-size: 0.65rem; font-weight: 800; display: flex; align-items: center; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
            .st-done { color: #55efc4; border-color: rgba(85,239,196,0.3); background: rgba(85,239,196,0.1); }
            .st-label { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 6px; letter-spacing:1.5px; }
            .st-title { font-size: 1.25rem; font-weight: 900; margin-bottom: 14px; line-height: 1.3; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
            .st-desc { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-bottom: 15px; }
            .st-btn { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.15); padding: 10px 18px; border-radius: 12px; font-weight: 800; font-size: 0.75rem; display:inline-flex; gap:8px; align-items:center; transition: background 0.2s; }
            .st-btn:hover { background: rgba(255,255,255,0.15); }
            .st-btn-done { background: transparent; color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1); }

            .st-explore-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .st-explore-btn { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 16px; border-radius: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; cursor: pointer; backdrop-filter: blur(10px); transition: transform 0.2s, background 0.3s; }
            .st-explore-btn:active { transform: scale(0.97); background: rgba(255,255,255,0.05); }
            .st-explore-icon { font-size: 1.6rem; margin-bottom: 4px; }
            .st-explore-title { font-size: 0.8rem; font-weight: 800; margin-bottom: 3px; color: #fff; }
            .st-explore-desc { font-size: 0.6rem; color: rgba(255,255,255,0.4); line-height: 1.3;}

        `;
        document.head.appendChild(style);
    }
};

// Autoejecutar al cargar si Firebase está pre-cargado
document.addEventListener('DOMContentLoaded', () => {
    const chk = setInterval(() => {
        if(typeof firebase !== 'undefined' && firebase.auth) {
            clearInterval(chk);
            AuthGlobal.init();
        }
    }, 200);
});
