// =====================================================
// BIBLIA DATOS — Constantes y estructuras de datos
// =====================================================

const BIBLIA_API_URL = "https://bible-api.deno.dev/api/read/";

// Utilidad: convertir hex a rgb
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r},${g},${b}`;
}

const ESTRUCTURA_BIBLIA = {
    "ANTIGUO TESTAMENTO": {
        color: "#55efc4",
        categorias: {
            "Pentateuco (La Ley)": ["Genesis", "Exodo", "Levitico", "Numeros", "Deuteronomio"],
            "Libros Historicos": ["Josue", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Cronicas", "2 Cronicas", "Esdras", "Nehemias", "Ester"],
            "Poeticos y Sapienciales": ["Job", "Salmos", "Proverbios", "Eclesiastes", "Cantares"],
            "Profetas Mayores": ["Isaias", "Jeremias", "Lamentaciones", "Ezequiel", "Daniel"],
            "Profetas Menores": ["Oseas", "Joel", "Amos", "Abdias", "Jonas", "Miqueas", "Nahum", "Habacuc", "Sofonias", "Hageo", "Zacarias", "Malaquias"]
        }
    },
    "NUEVO TESTAMENTO": {
        color: "#a29bfe",
        categorias: {
            "Evangelios": ["Mateo", "Marcos", "Lucas", "Juan"],
            "Historia": ["Hechos"],
            "Epistolas Paulinas": ["Romanos", "1 Corintios", "2 Corintios", "Galatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemon"],
            "Epistolas Generales": ["Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas"],
            "Profecia (Apocaliptico)": ["Apocalipsis"]
        }
    }
};

const BIBLE_INSIGHTS = {
    "Isaias 1:18": "La redencion es total. No importa el historial — Dios puede restaurarte completamente.",
    "Josue 1:9": "El pueblo Adventista es llamado a pararse firme en los ultimos dias. Valentia y fe.",
    "Salmos 23:1": "El Sabado existe para recordarnos que Dios es nuestro Pastor. Descansa en El.",
    "Mateo 5:14": "Los jovenes Adventistas somos llamados a ser luz. Nuestro estilo de vida es nuestro testimonio.",
    "Juan 3:16": "El corazon del Gran Conflicto. Dios no entrego a Su Hijo para condenar, sino para salvar.",
    "Apocalipsis 14:12": "Identidad Adventista: Guardar los mandamientos de Dios y la fe de Jesus.",
    "Daniel 8:14": "Las 2,300 tardes y mananas — la profecia que nos ubica historicamente (1844).",
    "Genesis 2:3": "Aqui nace el Sabado. Una institucion creacional para toda la humanidad."
};

const CONTEO_CAPITULOS = {
    "Genesis": 50, "Exodo": 40, "Levitico": 27, "Numeros": 36, "Deuteronomio": 34,
    "Josue": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24, "1 Reyes": 22, "2 Reyes": 25, "1 Cronicas": 29, "2 Cronicas": 36, "Esdras": 10, "Nehemias": 13, "Ester": 10,
    "Job": 42, "Salmos": 150, "Proverbios": 31, "Eclesiastes": 12, "Cantares": 8,
    "Isaias": 66, "Jeremias": 52, "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12,
    "Oseas": 14, "Joel": 3, "Amos": 9, "Abdias": 1, "Jonas": 4, "Miqueas": 7, "Nahum": 3, "Habacuc": 3, "Sofonias": 3, "Hageo": 2, "Zacarias": 14, "Malaquias": 4,
    "Mateo": 28, "Marcos": 16, "Lucas": 24, "Juan": 21, "Hechos": 28,
    "Romanos": 16, "1 Corintios": 16, "2 Corintios": 13, "Galatas": 6, "Efesios": 6, "Filipenses": 4, "Colosenses": 4, "1 Tesalonicenses": 5, "2 Tesalonicenses": 3, "1 Timoteo": 6, "2 Timoteo": 4, "Tito": 3, "Filemon": 1,
    "Hebreos": 13, "Santiago": 5, "1 Pedro": 5, "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1, "3 Juan": 1, "Judas": 1, "Apocalipsis": 22
};

let currentTranslation = "rv1960";
let currentLibroSlug = "";
let currentLibroNombre = "";
let currentCapitulo = 1;

// Jose - Variables para el tamaño de fuente
let currentFontSize = parseFloat(localStorage.getItem('bibleFontSize')) || 1.15;

// --- FUNCIONES CORE BIBLIA ---

// Lista plana de todos los libros en orden canónico
const LIBROS_AT = [
    "Genesis", "Exodo", "Levitico", "Numeros", "Deuteronomio",
    "Josue", "Jueces", "Rut", "1 Samuel", "2 Samuel",
    "1 Reyes", "2 Reyes", "1 Cronicas", "2 Cronicas", "Esdras",
    "Nehemias", "Ester", "Job", "Salmos", "Proverbios",
    "Eclesiastes", "Cantares", "Isaias", "Jeremias", "Lamentaciones",
    "Ezequiel", "Daniel", "Oseas", "Joel", "Amos",
    "Abdias", "Jonas", "Miqueas", "Nahum", "Habacuc",
    "Sofonias", "Hageo", "Zacarias", "Malaquias"
];
const LIBROS_NT = [
    "Mateo", "Marcos", "Lucas", "Juan", "Hechos",
    "Romanos", "1 Corintios", "2 Corintios", "Galatas", "Efesios",
    "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo",
    "2 Timoteo", "Tito", "Filemon", "Hebreos", "Santiago",
    "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan",
    "Judas", "Apocalipsis"
];
const TODOS_LIBROS = [...LIBROS_AT, ...LIBROS_NT];

// Estado del modo activo del selector
let _modoSelectorBiblia = 'genero'; // 'genero' | 'at' | 'nt' | 'buscar'

// Escala de fuente para pantallas de selector (independiente del lector)
let _libFontSize = parseFloat(localStorage.getItem('libFontSize')) || 1.0;

// Paleta de colores para los géneros literarios (alternados)
const COLORES_CATEGORIA = [
    '#55efc4', // verde menta
    '#74b9ff', // azul claro
    '#fdcb6e', // amarillo dorado
    '#fd79a8', // rosa
    '#a29bfe', // violeta
    '#00cec9', // turquesa
    '#e17055', // coral
    '#6c5ce7', // morado
    '#00b894', // verde esmeralda
    '#ffeaa7', // crema
];
