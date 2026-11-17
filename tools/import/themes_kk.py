"""Themen für die Kundenkommunikations-Fragen (Namen: content/themen.js)."""
import re

RULES = [
    ('recht', r'DSGVO|TDDDG|Fotos|Bilder beschaffen|außergerichtlichen'),
    ('servicekennzahlen', r'Antwortrate|Antwortzeit|Retention|Kundenbindungsrate|Kundenverlustrate|Amortisation|Kennzahlen|Branchendurchschnitt|wirtschaftlich lohnt|Antwortgeschwindigkeit'),
    ('zahlung', r'Rechnung|Zahlungs|Skonto|Verzugszins|Mahn|Verjähr|Teilzahlung|nicht rechtzeitig bezahlt|offenen Rechnung'),
    ('socialservice', r'Social Media|sozialen Medien|Onlinebewertungen|negative Kommentare|öffentliche(n)? (Kunden)?[Bb]eschwerde|Richtlinie|Teilen ihrer Inhalte|Kundenforum|Unternehmensblog'),
    ('kommunikation', r'Vier-Ohren|Vier-Seiten|Kommunikationsquadrat|Watzlawick|Axiom|Inhalts- und (einen )?Beziehungs|Beziehungsebene|Appell|Einwand|offene Fragen|Kommunikationsarten|Stimme|Kundenaussage'),
    ('kundenbindung', r'Kundenbindung|ABC|80-zu-20|A-Kunden|B-Kunden|CRM|Befragung|befragen|Frageform|Rücklaufquote|Zufriedenheit|servicestrategie'),
    ('retouren', r'Retour|Rücksend|Rückversand|Rückgabe|[Ww]iderruf(en)?\b|Widerrufsrecht|Retourenlabel|Falschlieferung|falsche und unvollständige|Gutschrift|Rückzahlung|Ressourcen eingespart|weiterverwendet|Austausch beschädigter'),
    ('stoerungen', r'Lieferverzug|Kaufvertragsstörung|Leistungsstörung|Lieferengp|Nichtannahme|Annahmeverzug|erneut zu versenden|zu spät erhält|Ersatzartikel|weiteren Rechtsfolgen'),
    ('beschwerde', r'Beschwerde|Antwortschreiben|unzufriedenen|Kundenforderung|Forderung abgelehnt|kundenorientierte Antwort|kundenfreundlich|Reklamationsbearbeitung|Reklamation reagieren'),
    ('maengel', r'Mangel|mangelhaft|Mängel|Nacherfüllung|Gewährleist|Garantie|Reklamation|Schlechtleistung|nicht richtig funktioniert|Reparatur|Servicetechniker|nicht mehr lieferbar|Transportkosten'),
    ('kaufvertrag', r'Kaufvertrag|Bestelleingangsbestätigung|Auftragsbestätigung|Schenkung|Werbegeschenk|Rückabwicklung|Leihvertrag|Mietvertrag|Kaution|vermietete|Preissenkung|Preisdifferenz|Preisänderung'),
    ('kanaele', r'Livechat|Chat|FAQ|Voice|Sprachassist|Messenger|E-Mail|Textbaustein|App|synchron|Cross-Channel|Kommunikationskan|Kommunikationsleitfaden|Pull|Personal für|Telefon|Serviceangebote|Kontaktmöglichkeiten|digitale|Quellen|Produktpflege|Pflege und Nutzung'),
]


def thema(frage, loesung):
    for tid, pat in RULES:
        if re.search(pat, frage):
            return tid
    return None
