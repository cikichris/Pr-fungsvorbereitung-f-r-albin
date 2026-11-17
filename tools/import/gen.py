"""Erzeugt content/klausuren/<fach>-*.js aus den geparsten Musterlösungen.

Aufruf: python3 -I gen.py <fach> <json-ordner> <repo> [--review]
        fach: gp (Geschäftsprozesse) oder kk (Kundenkommunikation)
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import themes  # noqa: E402
import themes_kk  # noqa: E402
from overrides import THEMA_OVERRIDE, BILDER, LOESUNG_OVERRIDE  # noqa: E402

FACH, SRC, REPO = sys.argv[1], sys.argv[2], sys.argv[3]
REVIEW = '--review' in sys.argv

# Datei, id, Titel, Sortierschlüssel (Sommer = Jahr, Winter = Jahr + 0,5)
TERMINE = [
    ('2020', '2020-sommer', 'Sommer 2020', 2020.0),
    ('2020-21', '2020-21-winter', 'Winter 2020/21', 2020.5),
    ('2021', '2021-sommer', 'Sommer 2021', 2021.0),
    ('2021-22', '2021-22-winter', 'Winter 2021/22', 2021.5),
    ('2022', '2022-sommer', 'Sommer 2022', 2022.0),
    ('2022-23', '2022-23-winter', 'Winter 2022/23', 2022.5),
    ('2023', '2023-sommer', 'Sommer 2023', 2023.0),
    ('2023-24', '2023-24-winter', 'Winter 2023/24', 2023.5),
    ('2024', '2024-sommer', 'Sommer 2024', 2024.0),
    ('2024-25', '2024-25-winter', 'Winter 2024/25', 2024.5),
    ('2025', '2025-sommer', 'Sommer 2025', 2025.0),
    ('2025-26', '2025-26', 'Winter 2025/26', 2025.5),
    ('2026', '2026', 'Sommer 2026', 2026.0),
]
FAECHER = {
    'gp': ('AP2_GP_', themes.thema),
    'kk': ('AP2_Kundenkommunikation_', themes_kk.thema),
}
PREFIX, THEMA = FAECHER[FACH]
FILES = [(PREFIX + datei, f'{FACH}-{kid}', titel, sort) for datei, kid, titel, sort in TERMINE]
art = themes.art

CALC = re.compile(r'[=÷×≈]')


def latex_plain(s):
    """LaTeX-Quelltext, der als Text im PDF steht, lesbar machen."""
    if '\\' not in s:
        return s
    s = re.sub(r'\\text\{([^{}]*)\}', r'\1', s)
    for _ in range(3):
        s = re.sub(r'\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}', r'\1 ÷ \2', s)
    s = s.replace('\\[', '').replace('\\]', '').replace('\\(', '').replace('\\)', '').replace('\\times', '×').replace('\\cdot', '·')
    s = s.replace('\\,\\%', ' %').replace('\\,', '').replace('\\%', '%').replace('\\approx', '≈')
    return re.sub(r'\s+', ' ', s).strip()


def spaced(line):
    """Leerzeichen um Rechenzeichen in Formeln: '9 %−1 %' -> '9 % − 1 %'."""
    return re.sub(r'(?<=[\w%)€])([−=×÷≈+])(?=[\w(€])', r' \1 ', line)


def para_md(lines):
    lines = [latex_plain(l) for l in lines]
    # Rechnungen und Formeln (ohne einleitendes fettes Stichwort) als Rechenblock
    if all(CALC.search(l) for l in lines) and not lines[0].startswith('**') and all(len(l) < 140 for l in lines):
        return '\n'.join('> ' + spaced(l) for l in lines)
    return '\n'.join(lines)


def blocks_md(blocks, file_id):
    out = []
    lst = None
    for b in blocks:
        if b['t'] == 'li':
            text = latex_plain(b['text']) if '\\' in b['text'] else b['text']
            if '\n' in text:
                first, rest = text.split('\n', 1)
                # "**Überschrift**\nErläuterung" -> "**Überschrift:** Erläuterung"
                if re.fullmatch(r'\*\*[^*]+\*\*', first) and not re.search(r'[.:!?]\*\*$', first):
                    first = first[:-2] + ':**'
                text = first + ' ' + rest.replace('\n', ' ')
            item = ('1. ' if b['ordered'] else '- ') + text
            if lst is not None and lst[0] == b['ordered']:
                lst[1].append(item)
                continue
            lst = (b['ordered'], [item])
            out.append(lst)
            continue
        lst = None
        if b['t'] == 'p':
            out.append(para_md(b['lines']))
        elif b['t'] == 'table':
            out.append(b['md'])
        elif b['t'] == 'image':
            key = f"{file_id}:{b['id']}"
            if key not in BILDER:
                raise SystemExit(f'Bild ohne Abschrift: {key}')
            out.append(BILDER[key].strip())
    parts = []
    for o in out:
        parts.append('\n'.join(o[1]) if isinstance(o, tuple) else o)
    return '\n\n'.join(p for p in parts if p.strip())


def split_given(blocks):
    """'Gegeben:' und die folgenden Angaben gehören zur Frage, nicht zur Lösung."""
    if not blocks or blocks[0]['t'] != 'p' or blocks[0]['lines'][0].replace('*', '').strip() != 'Gegeben:':
        return [], blocks
    i = 1
    while i < len(blocks) and blocks[i]['t'] == 'li':
        i += 1
    # direkt folgende Datentabelle ohne Rechenweg mitnehmen
    if i < len(blocks) and blocks[i]['t'] == 'table':
        md = blocks[i]['md']
        head = md.split('\n')[0]
        if not re.search(r'Rechnung|Berechnung|Schritt|Ergebnis', head) and '=' not in md:
            i += 1
    if i == 1:
        return [], blocks
    return blocks[:i], blocks[i:]


def split_antwort(blocks):
    """Format mit 'Situation: … Antwort: …': alles vor 'Antwort:' gehört zur Frage."""
    for i, b in enumerate(blocks):
        if b['t'] == 'p' and b['lines'][0].replace('*', '').strip() == 'Antwort:':
            return blocks[:i], blocks[i + 1:]
    return None


def js_str(s):
    s = s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    return '`' + s + '`'


def main():
    review = []
    for fname, kid, titel, sort in FILES:
        data = json.load(open(os.path.join(SRC, fname + '.json'), encoding='utf-8'))
        fragen = []
        for q in data['fragen']:
            given, rest = split_antwort(q['blocks']) or split_given(q['blocks'])
            frage = q['frage']
            if given:
                frage = frage + '\n\n' + blocks_md(given, fname)
            loesung = LOESUNG_OVERRIDE.get(f"{FACH}-{dict((d, k) for d, k, _, _ in TERMINE)[fname[len(PREFIX):]]}:{q['num']}") or blocks_md(rest, fname)
            nr = q['ref'] or str(q['num'])
            t = THEMA_OVERRIDE.get(f"{kid}:{q['num']}") or THEMA(q['frage'], loesung)
            if not t:
                if not REVIEW:
                    raise SystemExit(f'Kein Thema: {kid}:{q["num"]} {q["frage"]}')
                t = '???'
            a = art(q['frage'], loesung)
            fragen.append({'id': f"{kid}-{q['num']:02d}", 'nr': nr, 'typ': 'offen', 'art': a, 'thema': t,
                           'frage': frage, 'loesung': loesung})
            review.append(f"{kid}:{q['num']}\t{t}\t{a}\t{q['frage'][:90]}")

        # nach Hauptaufgabe gruppieren (1.1.1 -> Aufgabe 1)
        bloecke = []
        for f in fragen:
            haupt = f['nr'].split('.')[0] if '.' in f['nr'] or data['fragen'][0]['ref'] else '1'
            if not bloecke or bloecke[-1][0] != haupt:
                bloecke.append((haupt, []))
            bloecke[-1][1].append(f)

        lines = [
            f"// {data['titel']}",
            '// Fragen und Musterlösungen aus der Vorlage, automatisch übernommen',
            '// (Konverter: tools/import). Frage-ids nicht ändern.',
            'export default {',
            f"  id: '{kid}',",
            f"  titel: '{titel}',",
            f"  bereich: '{FACH}',",
            f"  sortierung: {sort},",
            "  quelle: 'Musterlösung',",
            '  aufgaben: [',
        ]
        abschnitte = data.get('abschnitte') or {}
        for haupt, fs in bloecke:
            lines += ['    {', f"      nr: '{haupt}',"]
            if haupt in abschnitte:
                lines.append(f"      titel: {js_str(abschnitte[haupt])},")
            lines.append('      fragen: [')
            for f in fs:
                lines.append('        {')
                lines.append(f"          id: '{f['id']}',")
                lines.append(f"          nr: '{f['nr']}',")
                lines.append("          typ: 'offen',")
                lines.append(f"          art: '{f['art']}',")
                lines.append(f"          thema: '{f['thema']}',")
                lines.append(f"          frage: {js_str(f['frage'])},")
                lines.append(f"          loesung: {js_str(f['loesung'])},")
                lines.append('        },')
            lines += ['      ],', '    },']
        lines += ['  ],', '};', '']
        with open(os.path.join(REPO, 'content', 'klausuren', kid + '.js'), 'w', encoding='utf-8') as fh:
            fh.write('\n'.join(lines))
    if REVIEW:
        print('\n'.join(review))


main()
