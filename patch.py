with open(r"C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\fixed.js", 'r', encoding='utf-8') as f:
    new_lines = f.readlines()

with open(r"C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\index.html", 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# The original array VERSICULOS starts at line 952. Wait, lines in python are 0-indexed.
# In `view_file` the file showed line 951 as `                const VERSICULOS = [`
# So `lines[950]` is where `const VERSICULOS = [` is.
# line 1059 is `                ];` for DEVOCIONALES. So `lines[1058]` is the end.
# Actually, I can just slice the list or construct a new list.

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "const VERSICULOS = [" in line:
        if start_idx == -1:
            start_idx = i
    if "];" in line and "La Parabola del Trigo y la" in lines[i-1].replace("","") or "La Par" in lines[i-1]:
        # just find where DEVOCIONALES ends
        end_idx = i

# more robust:
for i, line in enumerate(lines):
    if "const VERSICULOS = [" in line:
        start_idx = i
        break

for i in range(start_idx, len(lines)):
    if "];" in line and i > start_idx + 100:  # the devocionales end
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    lines = lines[:start_idx] + new_lines + lines[end_idx+1:]
    with open(r"C:\Users\jhose\OneDrive\Desktop\PROYECTO DE CODIGO\LEGADO_BIBLICO_PROD\index.html", 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print(f"Patched strictly from line {start_idx} to {end_idx}.")
else:
    print(f"FAILED to find indices. Start: {start_idx}, End: {end_idx}")
