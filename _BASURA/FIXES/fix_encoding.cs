using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

class FixEncoding {
    // Tabla Windows-1252: Unicode codepoint especial -> byte original
    static Dictionary<int, byte> win1252Map = new Dictionary<int, byte> {
        {0x20AC,0x80},{0x201A,0x82},{0x0192,0x83},{0x201E,0x84},{0x2026,0x85},
        {0x2020,0x86},{0x2021,0x87},{0x02C6,0x88},{0x2030,0x89},{0x0160,0x8A},
        {0x2039,0x8B},{0x0152,0x8C},{0x017D,0x8E},{0x2018,0x91},{0x2019,0x92},
        {0x201C,0x93},{0x201D,0x94},{0x2022,0x95},{0x2013,0x96},{0x2014,0x97},
        {0x02DC,0x98},{0x2122,0x99},{0x0161,0x9A},{0x203A,0x9B},{0x0153,0x9C},
        {0x017E,0x9E},{0x0178,0x9F}
    };

    static void Main(string[] args) {
        string filePath = args.Length > 0 ? args[0] : "index.html";
        Console.WriteLine("Procesando: " + filePath);

        // Agregar rango Latin-1 A0-FF al mapa
        for (int b = 0xA0; b <= 0xFF; b++) win1252Map[b] = (byte)b;

        byte[] rawBytes = File.ReadAllBytes(filePath);
        int startIdx = 0;
        if (rawBytes.Length >= 3 && rawBytes[0]==0xEF && rawBytes[1]==0xBB && rawBytes[2]==0xBF) {
            startIdx = 3;
            Console.WriteLine("  BOM eliminado");
        }

        // Decodificar como UTF-8 (obtenemos string corrupto)
        string corruptedText = Encoding.UTF8.GetString(rawBytes, startIdx, rawBytes.Length - startIdx);
        Console.WriteLine("  Chars leidos: " + corruptedText.Length);

        // Reconstruir bytes originales
        var result = new List<byte>(rawBytes.Length);
        int fixed_count = 0, preserved = 0;

        for (int i = 0; i < corruptedText.Length; i++) {
            int cp = corruptedText[i];
            
            // Manejar surrogate pairs (emojis > U+FFFF)
            if (char.IsHighSurrogate(corruptedText[i]) && i+1 < corruptedText.Length && char.IsLowSurrogate(corruptedText[i+1])) {
                // Es un emoji real (U+10000+) — codificar como UTF-8
                byte[] bytes = Encoding.UTF8.GetBytes(new char[]{corruptedText[i], corruptedText[i+1]});
                result.AddRange(bytes);
                i++; // skip low surrogate
                preserved++;
                continue;
            }

            if (cp < 0x80) {
                result.Add((byte)cp);
            } else if (win1252Map.ContainsKey(cp)) {
                result.Add(win1252Map[cp]);
                fixed_count++;
            } else {
                // Codepoint unicode no en Win1252 — codificar UTF-8
                byte[] bytes = Encoding.UTF8.GetBytes(new char[]{corruptedText[i]});
                result.AddRange(bytes);
                preserved++;
            }
        }

        Console.WriteLine("  Corregidos: " + fixed_count + " | Preservados: " + preserved);

        // Verificar UTF-8
        try {
            string test = Encoding.UTF8.GetString(result.ToArray());
            bool hasLeer = test.Contains("LEER LA BIBLIA");
            Console.WriteLine("  UTF-8 valido. LEER LA BIBLIA: " + hasLeer);
        } catch (Exception e) {
            Console.WriteLine("  ADVERTENCIA UTF-8: " + e.Message);
        }

        // Backup
        File.WriteAllBytes(filePath + ".BACKUP_ENCODING_FIX", rawBytes);
        Console.WriteLine("  Backup guardado");

        // Escribir resultado
        File.WriteAllBytes(filePath, result.ToArray());
        Console.WriteLine("  OK: " + result.Count + " bytes escritos");
    }
}
