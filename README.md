# 📖 Legado Bíblico Interactivo

**Legado Bíblico Interactivo** es una aplicación web de vanguardia diseñada para el estudio sistemático y profundo de la Palabra de Dios. Orientada inicialmente al libro de **Isaías**, la plataforma adapta su lenguaje, estética e interactividad según cuatro perfiles de usuario: Niños, Adolescentes, Jóvenes y Adultos.

## 🚀 Características Principales

- **Adaptabilidad Multigeneracional**: Interfaz dinámica que cambia según la edad del estudiante.
- **Explorador Bíblico**: Buscador dinámico conectado a bases de datos bíblicas reales.
- **Gamificación Progresiva**: Sistema de puntos (tokens de sabiduría) y medallas guardadas en la nube.
- **Estética Premium**: Diseño Vibe+ con degradados animados y efectos de cristal (Glassmorphism).
- **Persistencia Real**: Conectado a Firebase para guardar el progreso de cada alumno de la clase.

## 📂 Estructura del Proyecto

```text
/legado-biblico-interactivo
├── index.html           # Punto de entrada principal y HUB de selección
├── style.css            # Sistema de diseño y temas visuales
├── data_kids.js         # Módulo especializado para Niños (Biblia Viva)
├── data_teens.js        # Módulo especializado para Adolescentes (Bible Arena)
├── data_jovenes.js      # Módulo especializado para Jóvenes (Foro Profético)
├── data_adultos.js      # Módulo especializado para Adultos (Seminario Digital)
├── firebase-service.js  # Capa de sincronización en la nube
├── firebase-config.js   # Configuración de conexión a Firestore/Auth
├── manifest.json        # Configuración para instalación PWA
├── sw.js                # Service Worker para funcionamiento Offline
└── package.json         # Definición del proyecto
```

## 🛠️ Cómo Ejecutar

1. Abre el archivo `index.html` directamente en cualquier navegador moderno.
2. Para una experiencia profesional con persistencia de datos, asegúrate de tener conexión a internet para contactar con Firebase.

---
*Desarrollado para la gloria de Dios y el fortalecimiento de la educación bíblica.*
