# -*- coding: utf-8 -*-
"""
FIX DOBLE-ENCODING index.html
Cuando PowerShell leyó el archivo UTF-8 con Windows-1252 y lo re-guardó como UTF-8,
cada byte no-ASCII fue "doble-codificado". Este script revierte eso.

Algoritmo:
  1. Lee el archivo como UTF-8 → obtenemos string "corrupto" (Ã³ en lugar de ó)
  2. Para cada caracter:
     - ASCII (0-127): lo escribimos directamente (1 byte)
     - En rango Windows-1252 (0x80-0xFF): era un byte original de UTF-8 →
       lo re-codificamos como ese byte crudo
  3. El resultado son los bytes originales UTF-8 correctos
"""

import sys
import os

# Tabla Windows-1252: codepoints Unicode especiales en rango 0x80-0x9F
# (Estos bytes en Win-1252 no son iguales al codepoint Unicode — tienen mapeo especial)
WIN1252_UNICODE_TO_BYTE = {
    0x20AC: 0x80,  # €
    0x201A: 0x82,  # ‚
    0x0192: 0x83,  # ƒ
    0x201E: 0x84,  # „
    0x2026: 0x85,  # …
    0x2020: 0x86,  # †
    0x2021: 0x87,  # ‡
    0x02C6: 0x88,  # ˆ
    0x2030: 0x89,  # ‰
    0x0160: 0x8A,  # Š
    0x2039: 0x8B,  # ‹
    0x0152: 0x8C,  # Œ
    0x017D: 0x8E,  # Ž
    0x2018: 0x91,  # '
    0x2019: 0x92,  # '
    0x201C: 0x93,  # "
    0x201D: 0x94,  # "
    0x2022: 0x95,  # •
    0x2013: 0x96,  # –
    0x2014: 0x97,  # —
    0x02DC: 0x98,  # ˜
    0x2122: 0x99,  # ™
    0x0161: 0x9A,  # š
    0x203A: 0x9B,  # ›
    0x0153: 0x9C,  # œ
    0x017E: 0x9E,  # ž
    0x0178: 0x9F,  # Ÿ
}

def unicode_to_win1252_byte(codepoint):
    """
    Convierte un codepoint Unicode al byte Windows-1252 correspondiente.
    Retorna None si el codepoint no tiene equivalente en Windows-1252.
    """
    if codepoint < 0x80:
        # ASCII — mismo valor
        return codepoint
    if codepoint in WIN1252_UNICODE_TO_BYTE:
        # Caracteres especiales del rango 0x80-0x9F en Win1252
        return WIN1252_UNICODE_TO_BYTE[codepoint]
    if 0xA0 <= codepoint <= 0xFF:
        # Latin-1 Supplement — mismo byte
        return codepoint
    # Codepoint fuera del rango Windows-1252 (emoji real, etc.)
    return None

def fix_double_encoding(file_path):
    print(f"Procesando: {file_path}")
    
    # Leer el archivo como bytes
    with open(file_path, 'rb') as f:
        raw_bytes = f.read()
    
    # Quitar BOM si existe
    if raw_bytes[:3] == b'\xef\xbb\xbf':
        raw_bytes = raw_bytes[3:]
        print("  BOM eliminado")
    
    # Decodificar como UTF-8 para obtener el string corrupto
    try:
        corrupted_text = raw_bytes.decode('utf-8')
    except UnicodeDecodeError as e:
        print(f"  ERROR decodificando UTF-8: {e}")
        print("  El archivo puede no estar doble-codificado con UTF-8")
        return False
    
    # Reconstruir los bytes originales
    result = bytearray()
    fixed_count = 0
    preserved_count = 0
    
    for char in corrupted_text:
        cp = ord(char)
        
        if cp < 0x80:
            # ASCII puro — sin cambios
            result.append(cp)
        else:
            w1252_byte = unicode_to_win1252_byte(cp)
            if w1252_byte is not None:
                # Este caracter vino de un byte Windows-1252 (era byte UTF-8 original)
                result.append(w1252_byte)
                fixed_count += 1
            else:
                # Codepoint verdadero > U+00FF que NO es Win1252 (emoji real)
                # Codificarlo correctamente como UTF-8
                result.extend(char.encode('utf-8'))
                preserved_count += 1
    
    # Verificar que el resultado es UTF-8 válido
    try:
        result.decode('utf-8')
        print(f"  ✅ UTF-8 válido verificado")
    except UnicodeDecodeError as e:
        print(f"  ⚠️  Advertencia: resultado no es UTF-8 100% válido: {e}")
        print("  Intentando recuperación...")
        # Intentar recuperación simple
        result_text = result.decode('utf-8', errors='replace')
        result = bytearray(result_text.encode('utf-8'))
    
    # Backup del original
    backup_path = file_path + '.BACKUP_ENCODING_FIX'
    with open(backup_path, 'wb') as f:
        f.write(raw_bytes)
    print(f"  Backup guardado: {os.path.basename(backup_path)}")
    
    # Escribir el archivo corregido (SIN BOM)
    with open(file_path, 'wb') as f:
        f.write(bytes(result))
    
    original_size = len(raw_bytes)
    new_size = len(result)
    print(f"  Tamaño original: {original_size:,} bytes")
    print(f"  Tamaño corregido: {new_size:,} bytes")
    print(f"  Caracteres corregidos (doble-encoding): {fixed_count:,}")
    print(f"  Caracteres preservados (Unicode real): {preserved_count:,}")
    print(f"  ✅ Archivo corregido exitosamente!")
    return True

if __name__ == '__main__':
    target = 'index.html'
    if len(sys.argv) > 1:
        target = sys.argv[1]
    
    if not os.path.exists(target):
        print(f"ERROR: No se encontró el archivo {target}")
        sys.exit(1)
    
    success = fix_double_encoding(target)
    if success:
        print("\n🎉 ¡Corrección completada! Recarga la app para ver los emojis normales.")
    else:
        print("\n❌ La corrección falló.")
