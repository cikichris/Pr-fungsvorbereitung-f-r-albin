"""Erzeugt content/formeln.js aus dem Formelblatt Geschäftsprozesse
(PDF, mit parse_pdf.py umgewandelt) und den Formeln, die in den
Musterlösungen Kundenkommunikation vorkommen.

Aufruf: python3 -I gen_formeln.py <formelblatt.json> <repo>
"""
import json
import os
import re
import sys

SRC, REPO = sys.argv[1], sys.argv[2]

# Thema je Formel des Formelblatts (Reihenfolge wie im PDF)
GP_THEMEN = [
    'kalkulation', 'shopkennzahlen', 'emailmarketing', 'kostenrechnung', 'kostenrechnung',
    'kalkulation', 'kostenrechnung', 'kostenrechnung', 'kostenrechnung', 'kalkulation',
    'kalkulation', 'shopkennzahlen', 'kostenrechnung', 'rechnungswesen', 'rechnungswesen',
    'rechnungswesen', 'shopkennzahlen', 'werbekennzahlen', 'kostenrechnung', 'werbekennzahlen',
    'shopkennzahlen', 'kostenrechnung', 'werbekennzahlen', 'werbekennzahlen', 'kostenrechnung',
    'rechnungswesen',
]

# Aus den Musterlösungen Kundenkommunikation: (id, Thema, Name, Zeilen, Fundstelle)
KK = [
    ('verzugszinssatz', 'zahlung', 'Gesetzlicher Verzugszinssatz', [
        'Verbraucher beteiligt: Basiszinssatz + 5 Prozentpunkte',
        'Kein Verbraucher beteiligt (Entgeltforderung): Basiszinssatz + 9 Prozentpunkte',
    ], 'Winter 2021/22, Winter 2025/26'),
    ('verzugszinsen', 'zahlung', 'Verzugszinsen', [
        'Verzugszinsen = offener Betrag × Zinssatz in Prozent × Verzugstage ÷ (100 × 365)',
    ], 'Sommer 2020, Winter 2021/22, Winter 2025/26'),
    ('gesamtforderung', 'zahlung', 'Offener Gesamtbetrag', [
        'Gesamtbetrag = Rechnungsbetrag + Verzugszinsen + berechtigte Mahnkosten',
    ], 'Winter 2021/22'),
    ('retourenkosten', 'retouren', 'Monatliche Retourenkosten', [
        'Monatliche Retourenkosten = Retourenanzahl × Kosten je Retoure',
    ], 'Sommer 2024'),
    ('retourenquote-artikel', 'retouren', 'Artikelbezogene Retourenquote', [
        'Retourenquote (%) = retournierte Artikel ÷ verkaufte Artikel × 100',
    ], 'Winter 2024/25'),
    ('bearbeitungsdauer', 'retouren', 'Durchschnittliche Bearbeitungsdauer einer Retoure', [
        'Bearbeitungsdauer = Summe der Bearbeitungsdauern ÷ Anzahl abgeschlossener Retouren',
    ], 'Winter 2024/25'),
    ('kosten-retoure', 'retouren', 'Durchschnittliche Kosten je Retoure', [
        'Kosten je Retoure = gesamte Retourenkosten ÷ Anzahl der Retouren',
    ], 'Winter 2024/25'),
    ('amortisationszeit', 'servicekennzahlen', 'Amortisationszeit', [
        'Amortisationszeit = Projektkosten ÷ monatliche Einsparung',
    ], 'Sommer 2024'),
    ('antwortrate', 'servicekennzahlen', 'Antwortrate', [
        'Antwortrate (%) = beantwortete Anfragen ÷ eingegangene Anfragen × 100',
    ], 'Sommer 2022'),
    ('antwortzeit', 'servicekennzahlen', 'Durchschnittliche Antwortzeit', [
        'Durchschnittliche Antwortzeit = Summe aller Antwortzeiten ÷ Anzahl beantworteter Anfragen',
    ], 'Sommer 2025'),
    ('retention', 'servicekennzahlen', 'Retention-Rate (Kundenbindungsrate)', [
        'Retention-Rate (%) = (Kunden am Ende − Neukunden) ÷ Kunden zu Beginn × 100',
    ], 'Sommer 2025'),
    ('kundenverlustrate', 'servicekennzahlen', 'Kundenverlustrate', [
        'Kundenverlustrate (%) = verlorene Kunden im Zeitraum ÷ Kundenbestand zu Beginn des Zeitraums × 100',
    ], 'Winter 2023/24'),
    ('csat', 'servicekennzahlen', 'Customer Satisfaction Score (CSAT)', [
        'CSAT (%) = zufriedene Kunden ÷ alle antwortenden Kunden × 100',
    ], 'Winter 2025/26'),
    ('interaktionsrate', 'socialservice', 'Interaktionsrate', [
        'Interaktionsrate (%) = Interaktionen ÷ Reichweite × 100',
    ], 'Winter 2025/26'),
    ('umsatzanteil', 'kundenbindung', 'Umsatzanteil eines Kunden (ABC-Analyse)', [
        'Umsatzanteil (%) = Kundenumsatz ÷ Gesamtumsatz × 100',
    ], 'Sommer 2025'),
]


def name_of(frage):
    n = re.sub(r'^Wie (berechnet|ermittelt) man (den |die |das )?', '', frage).rstrip('?').strip()
    n = n.replace(' und den ', ' und ')
    n = re.sub(r'^monatlichen ', 'monatlicher ', n)
    n = re.sub(r'^gesamten variablen ', 'gesamte variable ', n)
    return n[0].upper() + n[1:]


def lines_of(blocks):
    out = []
    for b in blocks:
        texts = b['lines'] if b['t'] == 'p' else [b['text']]
        for t in texts:
            for line in t.split('\n'):
                line = re.sub(r'^Formel:\s*', '', line.replace('**', '')).strip()
                line = line.replace(' : ', ' ÷ ').replace(' – ', ' − ')
                if line:
                    out.append(line)
    return out


def js(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def main():
    data = json.load(open(SRC, encoding='utf-8'))
    if len(data['fragen']) != len(GP_THEMEN):
        raise SystemExit(f"Formelblatt hat {len(data['fragen'])} Formeln, erwartet {len(GP_THEMEN)}")
    out = [
        '// =====================================================================',
        '//  Formelsammlung',
        '//  Geschäftsprozesse: Formelblatt (automatisch übernommen, tools/import)',
        '//  Kundenkommunikation: Formeln aus den Musterlösungen',
        '// =====================================================================',
        '',
        'export const FORMELN = [',
    ]
    for i, (q, thema) in enumerate(zip(data['fragen'], GP_THEMEN), start=1):
        out.append(f"  {{ id: 'gp-{i:02d}', bereich: 'gp', thema: '{thema}', name: {js(name_of(q['frage']))},")
        out.append(f"    zeilen: [{', '.join(js(l) for l in lines_of(q['blocks']))}] }},")
    for fid, thema, name, zeilen, quelle in KK:
        out.append(f"  {{ id: 'kk-{fid}', bereich: 'kk', thema: '{thema}', name: {js(name)},")
        out.append(f"    zeilen: [{', '.join(js(z) for z in zeilen)}], quelle: {js(quelle)} }},")
    out += ['];', '']
    with open(os.path.join(REPO, 'content', 'formeln.js'), 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(out))
    print('Formeln:', len(data['fragen']) + len(KK))


main()
