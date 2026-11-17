"""Liest eine Musterlösungs-PDF (aus Word erzeugt) und gibt Fragen als JSON aus.

Aufbau der PDFs:
  - Titelzeile
  - Fragen: fett, am linken Rand, "N. Fragetext (Aufgabennummer)"
  - Antwort: Absätze, Aufzählungen (•, 1.), Tabellen (Zellen leicht eingerückt)
  - einzelne Bilder (Formeln) -> Platzhalter [[BILD seite-n]]

Aufruf: python3 -I parse_pdf.py <pdf> <out.json>
"""
import json
import re
import sys

import pdfplumber

ROW_GAP = 22      # größerer Abstand -> neue Tabellenzeile
PARA_GAP = 20     # größerer Abstand -> neuer Absatz


def is_bold(w):
    return 'Bold' in w['fontname']


def load_lines(path):
    lines = []
    with pdfplumber.open(path) as pdf:
        offset = 0.0
        for pno, page in enumerate(pdf.pages, start=1):
            words = page.extract_words(extra_attrs=['fontname', 'size'], use_text_flow=False, keep_blank_chars=False)
            # hochgestellte Ziffern (m³) an das vorige Wort hängen
            words.sort(key=lambda w: (round(w['top']), w['x0']))
            rows = []
            for w in words:
                if w['fontname'].endswith('SymbolMT') and w['text'] == '•':
                    w = {**w, 'top': w['top'] - 0.8}
                for r in rows:
                    if abs(r['top'] - w['top']) < 3.5 and w['size'] >= 9:
                        r['words'].append(w)
                        break
                else:
                    rows.append({'top': w['top'], 'words': [w]})
            for r in rows:
                r['words'].sort(key=lambda w: w['x0'])
                r['x0'] = r['words'][0]['x0']
                r['x1'] = r['words'][-1]['x1']
                r['page'] = pno
                r['y'] = r['top'] + offset
                r['kind'] = 'text'
            for i, img in enumerate(sorted(page.images, key=lambda im: im['top'])):
                rows.append({'kind': 'image', 'page': pno, 'y': img['top'] + offset,
                             'id': f'{pno}-{i + 1}', 'bottom': img['bottom'] + offset})
            rows.sort(key=lambda r: r['y'])
            lines.extend(rows)
            offset += page.height + 40  # Seitenwechsel = großer Abstand
    return lines


def words_to_md(words):
    """Wörter zu Text, fette Abschnitte mit **…**."""
    out = []
    bold_open = False
    prev = None
    for w in words:
        b = is_bold(w)
        text = w['text']
        sep = '' if prev is None else ' '
        if prev is not None and w['x0'] - prev['x1'] < 0.8:
            sep = ''  # direkt angeschlossen (z. B. Punkt nach fettem Wort)
        if b and not bold_open:
            out.append(sep + '**')
            sep = ''
            bold_open = True
        elif not b and bold_open:
            out.append('**')
            bold_open = False
        out.append(sep + text)
        prev = w
    if bold_open:
        out.append('**')
    s = ''.join(out)
    s = re.sub(r'\*\*(\s*)\*\*', r'\1', s)
    # Satzzeichen nicht fett umschließen: "**Wort.**" bleibt, "** **" weg
    return s.strip()


def join_md(a, b):
    if not a:
        return b
    if a.endswith('**') and b.startswith('**'):
        inner = join_md(a[:-2], b[2:])
        return inner
    if a.endswith('–') and re.match(r'^\d', b):
        return a + b  # 30–|50-Jährige
    if a.endswith('-') and not a.endswith(' -') and not re.match(r'^(und|oder|bzw\.|sowie|beziehungsweise)\b', b):
        return a + b  # Bindestrich am Zeilenende: Online-|Bekleidungskauf
    return a + ' ' + b


def cell_text(words):
    lines = []
    for w in words:
        if lines and abs(lines[-1][0]['top'] - w['top']) < 3:
            lines[-1].append(w)
        else:
            lines.append([w])
    text = ''
    for ln in lines:
        part = words_to_md(sorted(ln, key=lambda w: w['x0']))
        # Word bricht in schmalen Spalten mitten im Wort um: "Nettoverkaufsprei" + "s"
        if text and re.fullmatch(r'(\*\*)?[a-zäöüß](\*\*)?', part) and re.search(r'[a-zäöüß](\*\*)?$', text):
            text = re.sub(r'\*\*$', '', text) + re.sub(r'^\*\*', '', part) if text.endswith('**') and part.startswith('**') else text + part
            continue
        text = join_md(text, part)
    return text


def table_md(rows_lines):
    """rows_lines: Liste von Zeilen (je Liste von Textzeilen) -> Markdown."""
    all_words = [w for rl in rows_lines for ln in rl for w in ln['words']]
    # Spaltenanfänge: erstes Wort einer Zeile oder Wort nach großer Lücke
    starts = []
    for rl in rows_lines:
        for ln in rl:
            prev = None
            for w in ln['words']:
                if prev is None or w['x0'] - prev['x1'] > 6:
                    starts.append(w['x0'])
                prev = w
    starts.sort()
    cols = []
    for x in starts:
        if not cols or x - cols[-1][-1] > 4:
            cols.append([x])
        else:
            cols[-1].append(x)
    cols = [min(c) for c in cols]
    # Spalten, in denen nur Fortsetzungen landen (Lücke > 6 in Zellen), zusammenführen:
    # eine Spalte muss in mindestens zwei Zeilen beginnen oder in der Kopfzeile stehen
    head_xs = [w['x0'] for ln in rows_lines[0] for w in ln['words']]
    keep = []
    for c in cols:
        n = sum(1 for rl in rows_lines if any(abs(w['x0'] - c) < 4 for ln in rl for w in ln['words']))
        if n >= 2 or any(abs(x - c) < 4 for x in head_xs) or c == cols[0]:
            keep.append(c)
    cols = keep

    def col_of(w):
        idx = 0
        for i, c in enumerate(cols):
            if w['x0'] >= c - 3:
                idx = i
        return idx

    md_rows = []
    for rl in rows_lines:
        cells = [[] for _ in cols]
        for ln in rl:
            for w in ln['words']:
                cells[col_of(w)].append(w)
        md_rows.append([cell_text(sorted(c, key=lambda w: (round(w['top']), w['x0']))).replace('|', '/') for c in cells])
    # Kopfzeile = erste Zeile, wenn komplett fett
    head_bold = all(is_bold(w) for ln in rows_lines[0] for w in ln['words'])
    out = []
    if head_bold:
        out.append('| ' + ' | '.join(c.replace('**', '') for c in md_rows[0]) + ' |')
        out.append('|' + '---|' * len(cols))
        body = md_rows[1:]
    else:
        out.append('| ' + ' | '.join('' for _ in cols) + ' |')
        out.append('|' + '---|' * len(cols))
        body = md_rows
    for r in body:
        out.append('| ' + ' | '.join(r) + ' |')
    return '\n'.join(out)


def parse(path):
    lines = load_lines(path)
    text_lines = [l for l in lines if l['kind'] == 'text']
    title = ' '.join(w['text'] for w in text_lines[0]['words'])
    margin = min(l['x0'] for l in text_lines)
    right = max(l['x1'] for l in text_lines)

    def soft(prev, nxt):
        # Word bricht nur um, wenn das nächste Wort nicht mehr in die Zeile passt
        w = nxt['words'][0]['x1'] - nxt['words'][0]['x0']
        return prev['x1'] + 4 + w > right - 3
    lines = lines[1:] if lines[0] is text_lines[0] else [l for l in lines if l is not text_lines[0]]

    def at(x, ref, tol=1.2):
        return abs(x - ref) < tol

    questions = []
    sections = {}
    # Format mit Aufgabennummer vorne ("1.2.1 Frage …") statt "N. Frage (1.2.1)"
    alt = any(l['kind'] == 'text' and at(l['x0'], margin) and is_bold(l['words'][0])
              and re.fullmatch(r'\d+(\.\d+)+', l['words'][0]['text']) for l in lines)
    cur = None
    expected = 1
    i = 0
    n = len(lines)
    blocks = None

    def first_text(l):
        return l['words'][0]['text'] if l['kind'] == 'text' else ''

    while i < n:
        l = lines[i]
        bold_margin = l['kind'] == 'text' and at(l['x0'], margin) and is_bold(l['words'][0])
        # Abschnitt (nur im Format mit Aufgabennummer vorne): "1. Verträge abwickeln"
        nxt = next((x for x in lines[i + 1:] if x['kind'] == 'text'), None)
        if (alt and bold_margin and re.fullmatch(r'\d+\.', first_text(l)) and nxt is not None
                and is_bold(nxt['words'][0]) and re.fullmatch(r'\d+(\.\d+)+', nxt['words'][0]['text'])):
            sections[first_text(l)[:-1]] = words_to_md(l['words'][1:]).replace('**', '').strip()
            i += 1
            continue
        # Fragenkopf: "N. Frage (1.2)" oder im anderen Format "1.2.1 Frage"
        alt_head = alt and bold_margin and re.fullmatch(r'\d+(\.\d+)+', first_text(l))
        if alt_head or (bold_margin and re.fullmatch(r'\d+\.', first_text(l)) and int(first_text(l)[:-1]) == expected):
            head = words_to_md(l['words'][1:])
            last_y = l['y']
            i += 1
            while (i < n and not re.search(r'\(\d+(\.\d+)*[a-z]?\)\**$', head) and lines[i]['kind'] == 'text'
                   and lines[i]['y'] - last_y < PARA_GAP and all(is_bold(w) for w in lines[i]['words'])
                   and at(lines[i]['x0'], margin)):
                head = join_md(head, words_to_md(lines[i]['words']))
                last_y = lines[i]['y']
                i += 1
            head = head.replace('**', '').strip()
            m = re.search(r'\s*\((\d+(?:\.\d+)*[a-z]?)\)$', head)
            ref = m.group(1) if m else None
            if m:
                head = head[:m.start()].strip()
            if alt_head:
                ref = first_text(l)
            cur = {'num': expected, 'ref': ref, 'frage': head, 'blocks': []}
            questions.append(cur)
            expected += 1
            continue
        if cur is None:
            i += 1
            continue
        blocks = cur['blocks']
        if l['kind'] == 'image':
            blocks.append({'t': 'image', 'id': l['id']})
            i += 1
            continue
        fw = l['words'][0]
        # Aufzählung
        if fw['text'] == '•' or (re.fullmatch(r'\d+\.', fw['text']) and l['x0'] > margin + 8):
            ordered = fw['text'] != '•'
            item_x = l['words'][1]['x0'] if len(l['words']) > 1 else l['x0'] + 18
            text = words_to_md(l['words'][1:])
            last_y = l['y']
            prev = l
            i += 1
            while (i < n and lines[i]['kind'] == 'text' and at(lines[i]['x0'], item_x, 2)
                   and lines[i]['y'] - last_y < PARA_GAP):
                nxt = words_to_md(lines[i]['words'])
                text = join_md(text, nxt) if soft(prev, lines[i]) else text + '\n' + nxt
                prev = lines[i]
                last_y = lines[i]['y']
                i += 1
            blocks.append({'t': 'li', 'ordered': ordered, 'text': text})
            continue
        # Tabelle: Zellen beginnen leicht eingerückt (Zellenabstand)
        in_table = lambda x: margin + 1.5 < x['x0'] < margin + 5  # noqa: E731
        # zweizeilige Kopfzelle, die über der ersten Tabellenzeile beginnt
        head_above = False
        if l['x0'] > margin + 5 and fw['text'] != '•' and not re.fullmatch(r'\d+\.', fw['text']):
            j, prev_y = i + 1, l['y']
            while j < n and lines[j]['kind'] == 'text' and lines[j]['y'] - prev_y < 32 and j - i < 6:
                if in_table(lines[j]):
                    head_above = True
                    break
                if at(lines[j]['x0'], margin) or lines[j]['words'][0]['text'] == '•':
                    break
                prev_y = lines[j]['y']
                j += 1
        if in_table(l) or head_above:
            rows = [[l]]
            last_y = l['y']
            i += 1
            while i < n and lines[i]['kind'] == 'text':
                nl = lines[i]
                if at(nl['x0'], margin) or nl['words'][0]['text'] == '•' or nl['y'] - last_y > 60:
                    break
                # neue Zeile, wenn großer Abstand zur letzten Zeile der vorigen Zeile
                prev_bottom = max(x['y'] for x in rows[-1])
                if nl['y'] - prev_bottom > ROW_GAP - 0.5:
                    rows.append([nl])
                else:
                    rows[-1].append(nl)
                last_y = nl['y']
                i += 1
            blocks.append({'t': 'table', 'md': table_md(rows)})
            continue
        # Absatz
        text = words_to_md(l['words'])
        last_y = l['y']
        start_x = l['x0']
        lines_in_para = [text]
        prev = l
        i += 1
        while (i < n and lines[i]['kind'] == 'text' and lines[i]['y'] - last_y < PARA_GAP
               and at(lines[i]['x0'], start_x, 2) and lines[i]['words'][0]['text'] != '•'
               and not (is_bold(lines[i]['words'][0]) and re.fullmatch(r'\d+\.', lines[i]['words'][0]['text']))):
            nxt = words_to_md(lines[i]['words'])
            if soft(prev, lines[i]):
                lines_in_para[-1] = join_md(lines_in_para[-1], nxt)
            else:
                lines_in_para.append(nxt)
            prev = lines[i]
            last_y = lines[i]['y']
            i += 1
        blocks.append({'t': 'p', 'lines': lines_in_para, 'x': round(start_x - margin, 1)})
    return {'titel': title, 'fragen': questions, 'abschnitte': sections}


if __name__ == '__main__':
    data = parse(sys.argv[1])
    with open(sys.argv[2], 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print(sys.argv[2], len(data['fragen']), 'Fragen')
