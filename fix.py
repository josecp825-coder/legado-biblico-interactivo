import os

file_path = "index.html"
with open(file_path, "r", encoding="utf-8", errors="replace") as f:
    text = f.read()

replacements = {
    # Versiculos & General
    "s ": "sé ", "esperis": "esperáis", "faltar": "faltará", "Jehov": "Jehová", 
    "corazn": "corazón", "aadidas": "añadidas", "renovarn": "renovarán", 
    "guilas": "águilas", "Lmpara": "Lámpara", "am ": "amó ", "unignito": "unigénito", 
    "retn": "retén", "en m ": "en mí ", "Escudriad": "Escudriñad", "tenis": "tenéis", 
    "Acerqumonos": "Acerquémonos", "As ": "Así ", "Jeremas": "Jeremías", "Isaas": "Isaías",
    "B BLICO": "BÍBLICO", "B blico": "Bíblico", "VERS CULOS": "VERSÍCULOS", "D A": "DÍA",
    "NI OS": "NIÑOS", "J VENES": "JÓVENES", "ADOLESCENTES": "ADOLESCENTES", "A o": "Año",
    "Biblica": "Bíblica", "B BLICA": "BÍBLICA",

    # Devocionales
    "dej ": "dejó ", "tena": "tenía", "garantas": "garantías", "  ": " — ", 
    "ensea": "enseña", "Hay alg": "¿Hay alg", "est pid": "está pid", "propsito": "propósito", 
    "obedeci": "obedeció", "haba": "había", "sali ": "salió ", "dnde": "dónde", "Jos:": "José:", 
    "Detrs": "Detrás", "vivi": "vivió", "enfrent": "enfrentó", "encamin": "encaminó", 
    "ningn": "ningún", "prepar": "preparó", "Gnesis": "Génesis", "decidi": "decidió", 
    "neg ": "negó ", "cadas": "caídas", "Aos": "Años", "despus": "después", "prohiba": "prohibía", 
    "abri ": "abrió ", "or ": "oró ", "difciles": "difíciles", "Qu ": "Qué ", "sers": "serás", 
    "Corazn": "Corazón", "Cometi": "Cometió", "minti": "mintió", "envi": "envió", "llam ": "llamó ", 
    "varn": "varón", "Cmo": "¿Cómo", "caa": "caía", "oracin": "oración", "est ": "está ", 
    "perdn": "perdón", "espritu": "espíritu", "tom ": "tomó ", "decisin": "decisión", 
    "cambi": "cambió", "ser ": "será ", "Noem": "Noemí", "obligacin": "obligación", 
    "honr": "honró", "imagin": "imaginó", "coloc": "colocó", "genealgica": "genealógica", 
    "ms": "más", "Moiss": "Moisés", "Lder": "Líder", "aos": "años", "currculos": "currículos", 
    "respondi ": "respondió ", "estar ": "estaré ", "xodo": "Éxodo", "Restauracin": "Restauración", 
    "Despus": "Después", "jur ": "juró ", "negara": "negaría", "Jess": "Jesús", "cant": "cantó", 
    "llor": "lloró", "termin": "terminó", "ah.": "ahí.", "resurreccin": "resurrección", 
    "busc ": "buscó ", "especficamente": "específicamente", "pregunt ": "preguntó ", 
    "negacin": "negación", "humill": "humilló", "descart": "descartó", "restaur": "restauró", 
    "Simn": "Simón", "Jons": "Jonás", "juda": "judía", "lleg ": "llegó ", "arriesg": "arriesgó", 
    "presentndose": "presentándose", "posicin": "posición", "razn": "razón", "Elas": "Elías", 
    "Depresin": "Depresión", "da,": "día,", "da ": "día ", "derrot": "derrotó", "hua": "huía", 
    "peda": "pedía", "rbol": "árbol", "di ": "dio ", "sermn": "sermón", "sueo": "sueño", 
    "acost": "acostó", "qued ": "quedó ", "ngel": "ángel", "toc ": "tocó ", "Levntate": "Levántate", 
    "Crculos": "Círculos", "Nnive": "Nínive", "compr ": "compró ", "direccin": "dirección", 
    "descubri ": "descubrió ", "dicindole": "diciéndole", "incmodo": "incómodo", "levant ": "levantó ", 
    "hur": "huir", "Josu": "Josué", "Jordn": "Jordán", "repiti": "repitió", "Esfurzate": "Esfuérzate", 
    "bblico": "bíblico", "perdi ": "perdió ", "sugiri": "sugirió", "guard ": "guardó ", 
    "explicacin": "explicación", " a m": " a mí", "levantar ": "levantará ", "Parbola": "Parábola", 
    "cont ": "contó ", "lanz ": "lanzó ", "condicin": "condición", "Cambi ": "Cambió ", 
    "quizs": "quizás", "dirn": "dirán", "discrecin": "discreción", "destruy": "destruyó", 
    "religin": "religión", "vaco": "vacío", "medioda": "mediodía", "haban": "habían", 
    "sent ": "sentó ", "ofreci ": "ofreció ", " dar ": " daré ", "juzg": "juzgó", 
    "tendr ": "tendrá ", "jams": "jamás", "Prdigo": "Pródigo", "volvi ": "volvió ", 
    "Corri ": "Corrió ", "abraz": "abrazó", "organiz": "organizó", "corri ": "corrió ", 
    "vea ": "veía ", " gan ": " ganó ", "seal": "señal", "ejrcitos": "ejércitos", 
    "solt ": "soltó ", "engaa": "engaña", "bendicin": "bendición", "acompaadas": "acompañadas", 
    " dejar ": " dejaré ", "Sabidura": "Sabiduría", "pidi ": "pidió ", "aade": "añade", 
    "xito": "éxito", "carcter": "carácter", "aadidura": "añadidura", "Mara": "María", 
    "vala": "valía", "derram ": "derramó ", "discpulos": "discípulos", "entendi": "entendió", 
    "exageracin": "exageración", "adoracin": "adoración", "qu ": "qué ", "contar ": "contará ", 
    "Crcel": "Cárcel", "crcel": "cárcel", "dars": "darás", "oan": "oían", "Nehemas": "Nehemías", 
    "reconstruy": "reconstruyó", "slvanos": "sálvanos", "Jerusaln": "Jerusalén", 
    "Ezequas": "Ezequías", " t ": " tú ", "Beln": "Belén", "Espritu": "Espíritu", 
    " nimo": " Ánimo", "Eclesiasts": "Eclesiastés", "rer": "reír", "apstol": "apóstol", 
    "telogo": "teólogo", "etope": "etíope", "bautiz": "bautizó", "all ": "allí ", 
    "Zambllete": "Zambúllete", "zambull ": "zambulló ", " seor": " señor", "Naamn": "Naamán", 
    "l ": "él ", " o ": " ó ", " e ": " e " # Wait, e to é? No!
}

# The \uFFFD is what replacing invalid utf-8 emits when read with errors="replace".
# Because they are lost, we find them and replace based on the dictionary.
# A simpler way is: loop through the DEVOCIONALES and VERSICULOS section (lines 945-1065) and replace known broken words.

lines = text.split('\n')
for i in range(580, 1100):
    if i < len(lines):
        for bad, good in replacements.items():
            bad_with_replacement_char = bad.replace("a", "").replace("e", "").replace("i", "").replace("o", "").replace("u", "").replace("n", "")
            
            # Since the broken text has literally , we replace words containing  using regex or direct string replace
            # It's easier: just replace the exact misspelled words that now have 
            # Actually, I typed the keys WITHOUT the special character, but the file text HAS the special character!
            pass

# Let's do a better replace strategy
# Replace all instances of  in known contexts.
import re

fixes = [
    (r's ', 'sé '), (r'esperis', 'esperáis'), (r'faltar', 'faltará'), (r'Jehov', 'Jehová'),
    (r'corazn', 'corazón'), (r'aadidas', 'añadidas'), (r'renovarn', 'renovarán'),
    (r'guilas', 'águilas'), (r'Lmpara', 'Lámpara'), (r'am ', 'amó '), (r'unignito', 'unigénito'),
    (r'retn', 'retén'), (r'en m', 'en mí'), (r'Escudriad', 'Escudriñad'), (r'tenis', 'tenéis'),
    (r'Acerqumonos', 'Acerquémonos'), (r'As', 'Así'), (r'Jeremas', 'Jeremías'), (r'Isaas', 'Isaías'),
    (r'dej', 'dejó'), (r'tena', 'tenía'), (r'garantas', 'garantías'), (r'  ', ' — '),
    (r'ensea', 'enseña'), (r'Hay', '¿Hay'), (r'est', 'está'), (r'propsito', 'propósito'),
    (r'obedeci', 'obedeció'), (r'haba', 'había'), (r'sali', 'salió'), (r'dnde', 'dónde'),
    (r'Jos', 'José'), (r'Detrs', 'Detrás'), (r'vivi', 'vivió'), (r'enfrent', 'enfrentó'),
    (r'encamin', 'encaminó'), (r'ningn', 'ningún'), (r'prepar', 'preparó'), (r'Gnesis', 'Génesis'),
    (r'decidi', 'decidió'), (r'neg', 'negó'), (r'cadas', 'caídas'), (r'Aos', 'Años'),
    (r'despus', 'después'), (r'prohiba', 'prohibía'), (r'abri', 'abrió'), (r'or', 'oró'),
    (r'difciles', 'difíciles'), (r'Qu', '¿Qué'), (r'Qu', 'Qué'), (r'sers', 'serás'),
    (r'maana', 'mañana'), (r'Corazn', 'Corazón'), (r'Cometi', 'Cometió'), (r'minti', 'mintió'),
    (r'envi', 'envió'), (r'llam', 'llamó'), (r'varn', 'varón'), (r'Cmo', '¿Cómo'),
    (r'caa', 'caía'), (r'oracin', 'oración'), (r'perdn', 'perdón'), (r'espritu', 'espíritu'),
    (r'tom', 'tomó'), (r'decisin', 'decisión'), (r'cambi', 'cambió'), (r'ser ', 'será '),
    (r'Noem', 'Noemí'), (r'obligacin', 'obligación'), (r'honr', 'honró'), (r'imagin', 'imaginó'),
    (r'coloc', 'colocó'), (r'genealgica', 'genealógica'), (r'ms', 'más'), (r'Moiss', 'Moisés'),
    (r'Lder', 'Líder'), (r'aos', 'años'), (r'currculos', 'currículos'), (r'respondi', 'respondió'),
    (r'estar', 'estaré'), (r'xodo', 'Éxodo'), (r'Restauracin', 'Restauración'), (r'Despus', 'Después'),
    (r'jur', 'juró'), (r'negara', 'negaría'), (r'Jess', 'Jesús'), (r'cant', 'cantó'),
    (r'llor', 'lloró'), (r'termin', 'terminó'), (r'ah', 'ahí'), (r'resurreccin', 'resurrección'),
    (r'busc', 'buscó'), (r'especficamente', 'específicamente'), (r'pregunt', 'preguntó'),
    (r'negacin', 'negación'), (r'humill', 'humilló'), (r'descart', 'descartó'), (r'restaur', 'restauró'),
    (r'Simn', 'Simón'), (r'Jons', 'Jonás'), (r'juda', 'judía'), (r'lleg', 'llegó'),
    (r'arriesg', 'arriesgó'), (r'presentndose', 'presentándose'), (r'posicin', 'posición'), (r'razn', 'razón'),
    (r'Elas', 'Elías'), (r'Depresin', 'Depresión'), (r'da', 'día'), (r'derrot', 'derrotó'),
    (r'hua', 'huía'), (r'peda', 'pedía'), (r'rbol', 'árbol'), (r'di', 'dio'), (r'sermn', 'sermón'),
    (r'sueo', 'sueño'), (r'acost', 'acostó'), (r'qued', 'quedó'), (r'ngel', 'ángel'), (r'toc', 'tocó'),
    (r'Levntate', 'Levántate'), (r'Crculos', 'Círculos'), (r'Nnive', 'Nínive'), (r'compr', 'compró'),
    (r'direccin', 'dirección'), (r'descubri', 'descubrió'), (r'dicindole', 'diciéndole'), (r'incmodo', 'incómodo'),
    (r'levant', 'levantó'), (r'Josu', 'Josué'), (r'Jordn', 'Jordán'), (r'repiti', 'repitió'),
    (r'Esfurzate', 'Esfuérzate'), (r'bblico', 'bíblico'), (r'BBLICO', 'BÍBLICO'), (r'Bblico', 'Bíblico'),
    (r'perdi', 'perdió'), (r'sugiri', 'sugirió'), (r'guard', 'guardó'), (r'explicacin', 'explicación'),
    (r'levantar', 'levantará'), (r'Parbola', 'Parábola'), (r'cont', 'contó'), (r'lanz', 'lanzó'),
    (r'condicin', 'condición'), (r'Cambi', 'Cambió'), (r'quizs', 'quizás'), (r'dirn', 'dirán'),
    (r'discrecin', 'discreción'), (r'destruy', 'destruyó'), (r'religin', 'religión'), (r'vaco', 'vacío'),
    (r'medioda', 'mediodía'), (r'haban', 'habían'), (r'sent', 'sentó'), (r'ofreci', 'ofreció'),
    (r'dar', 'daré'), (r'juzg', 'juzgó'), (r'tendr', 'tendrá'), (r'jams', 'jamás'),
    (r'Prdigo', 'Pródigo'), (r'volvi', 'volvió'), (r'Corri', 'Corrió'), (r'abraz', 'abrazó'),
    (r'organiz', 'organizó'), (r'corri', 'corrió'), (r'vea', 'veía'), (r'gan', 'ganó'),
    (r'seal', 'señal'), (r'ejrcitos', 'ejércitos'), (r'solt', 'soltó'), (r'engaa', 'engaña'),
    (r'bendicin', 'bendición'), (r'acompaadas', 'acompañadas'), (r'dejar', 'dejaré'), (r'Sabidura', 'Sabiduría'),
    (r'pidi', 'pidió'), (r'aade', 'añade'), (r'xito', 'éxito'), (r'carcter', 'carácter'),
    (r'aadidura', 'añadidura'), (r'Mara', 'María'), (r'vala', 'valía'), (r'derram', 'derramó'),
    (r'discpulos', 'discípulos'), (r'entendi', 'entendió'), (r'exageracin', 'exageración'), (r'adoracin', 'adoración'),
    (r'qu', 'qué'), (r'qu', '¿qué'), (r'contar', 'contará'), (r'Crcel', 'Cárcel'), (r'crcel', 'cárcel'),
    (r'dars', 'darás'), (r'oan', 'oían'), (r'Nehemas', 'Nehemías'), (r'reconstruy', 'reconstruyó'),
    (r'slvanos', 'sálvanos'), (r'Jerusaln', 'Jerusalén'), (r'Ezequas', 'Ezequías'), (r' t ', ' tú '),
    (r'Beln', 'Belén'), (r'Espritu', 'Espíritu'), (r'nimo', 'Ánimo'), (r'Eclesiasts', 'Eclesiastés'),
    (r'rer', 'reír'), (r'apstol', 'apóstol'), (r'telogo', 'teólogo'), (r'etope', 'etíope'),
    (r'bautiz', 'bautizó'), (r'all', 'allí'), (r'Zambllete', 'Zambúllete'), (r'zambull', 'zambulló'),
    (r'Naamn', 'Naamán'), (r'l', 'él'), (r'', 'í'), # fallback!
    (r'BBLICA', 'BÍBLICA'), (r'NIOS', 'NIÑOS'), (r'JVENES', 'JÓVENES'), (r'Ao', 'Año'),
    (r'VERS CULOS', 'VERSÍCULOS'), (r'D A', 'DÍA'), (r' ', '— '), (r'REFLEXIN', 'REFLEXIÓN'),
    (r'B BLICO', 'BÍBLICO'), (r'B BLICA', 'BÍBLICA'), (r'REA', 'ÁREA'), (r'MLTIPLES', 'MÚLTIPLES'),
    (r'mltiples', 'múltiples'), (r'Bblico', 'Bíblico'), (r'bblica', 'bíblica'), (r'cmo', 'cómo'),
    (r'l', 'él'), (r'', 'ñ') 
]

new_lines = []
for i, line in enumerate(lines):
    # Apply fixes heavily between line 580 and 1100 where devocionales and titles are
    if 570 <= i <= 1080:
        for bad, good in fixes:
            line = line.replace(bad, good)
        # Any leftover  we try to guess based on context or just leave them/remove them
        line = line.replace(" ", " ")
        line = line.replace("", "í") # last resort default
    new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done")
