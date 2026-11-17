"""Themen und Aufgabenarten für die Geschäftsprozesse-Fragen.

Die Namen der Themen stehen in content/themen.js."""
import re

# (thema, Muster im Fragetext) – erste Übereinstimmung gewinnt
RULES = [
    ('recht', r'Impressum|Kundendaten|anrufen|Einwilligung|Werbe-E-Mails|SMS|Haftung|fremden Produktbildern|rechtlich|Compliance|Geodaten'),
    ('werbekennzahlen', r'\bCPC\b|\bCPM\b|\bTKP\b|Tausender|\bCPO\b|\bCPL\b|\bCPA\b|ROAS|\bKUR\b|Kosten-Umsatz|Werbebudget|Werbekosten je|Abrechnungsmodell|Affiliate|Pay per Click|Neukundengewinnung je Kanal|Bidding|Click-Through|Vergütung'),
    ('emailmarketing', r'Newsletter|E-Mail-Marketing|E- Mail-Marketing|Printmailing'),
    ('socialmedia', r'Influencer|Social|TikTok|WhatsApp|Live-Shopping|soziale Netzwerke|Plattform eignet|Plattformen|viral|Messenger'),
    ('onlinewerbung', r'SEO|SEA|SEM\b|Suchmaschinen|Organic Search|organischen|Banner|Native|Targeting|Retargeting|LBS|Superbanner|Trigger|regionale|regionales|Filialsichtbarkeit|Google-My-Business'),
    ('projekt', r'Projekt|Gantt|magische Dreieck|agil|Scrum|Sprint|Lastenheft|SMART|überprüfbarer Marketingziele|interne(n)? oder externe|interner Bearbeitung|interne App|interne und externe'),
    ('analyse', r'SWOT|Stärken, Schwächen|Benchmarking|Nutzwertanalyse|Abweichungsanalyse|Validität|Gütekriterium|Marktforschung|Marktpotenzial|Testhypothese|Hypothese|repräsentative|Testvorbereitung|Segmentierungs|soziodemografisch|qualitative und quantitative Merkmale|Studie|Diagrammen|Monitoring'),
    ('testing', r'A/B|Eye-Tracking|Landingpage|Checkout|Conversion-Optimierung|multivariat|Produktseite|ausverkauften|Nulltreffer'),
    ('customerjourney', r'Customer Journey|Customer Experience|Funnel|ROPO|Showrooming|Touchpoint|Micro-Conversion|Unique Value|Kundengespräch|Kundenbindung'),
    ('kostenrechnung', r'[Dd]eckungsbeitr|Fixkosten|fix und|variabel|[Pp]reisuntergrenze|Break-even|Gewinnschwelle|Kostenfunktion|Kosten- und Erlösfunktion|Gemeinkosten|Kostenträger|Kostenarten|Vollkosten|Betriebsabrechnungsbogen|Kostenverlauf|Betriebsergebnis|Betriebsgewinn|Kosten der Shop-Präsentation|Erfolg nach Kostenänderungen|kurzfristigen Erfolg|kostendeckend|Auslistung|ausgelistet|Warenrohertrag|Marketingkosten pro|Marketingbudget kurzfristig|Lagerkosten|Provision für'),
    ('kalkulation', r'Kalkulation|Bruttoverkaufspreis|Listenverkaufspreis|Einstandspreis|Rohgewinn|Handelsspanne|Bezugspreis|Gewinnzuschlag|Gewinn je Zelt|Gewinn der nachbestellten|Dynamic|Preisdarstellung|Nettorechnungsbetrag|konkurrenzfähig|Mietumsätze|Monatsabsatz|Angebotsvergleich|Kriterien gehören zu einem Angebotsvergleich'),
    ('rechnungswesen', r'Eigenkapital|Umsatzrentabilität|Rentabilität|rentabl|Liquidität|Kreditwürdigkeit|Passivierung|Rechnungswesen|Budgetierung|Controlling|Wirtschaftlichkeit|wirtschaftliche Ziel|Reingewinn'),
    ('shopkennzahlen', r'Conversion|Bounce|Absprungrate|Average Order|Warenkorb|Retouren|Storno|Customer Lifetime|\bCLV\b|KPI|Kennzahl|Umsatzanteil|Abonnentenbestand|Diagrammart|Zielvorhaben|Attribution|zugerechneten'),
    ('sortiment', r'Sortiment|Randsortiment|Category|ABC|Renner|NOS|GTIN|Warengruppe|Produktdaten|ERP|Dropshipping|Instrumente eignen sich zur Sortimentsanalyse|4 P|Mietsortiment|Vermietung|Fitnesstrainer'),
    ('vertrieb', r'Marktplatz|Marktplätze|Vertriebskan|Multichannel|App|mobil|Mobile|telefonische|Telefonnummer|Katalog|Gebrauchtwaren|Re-Commerce|Vermittlungsplattform|Bestellannahme|Online-Einkaufsverhalten|Bekleidungskauf|Vertriebsempfehlung|Prime|Abteilungen|Logistik'),
    ('marketing', r'Marketing|Werbe|AIDA|Push|Pull|Content|Zielgruppe|Werbeplanung|Werbeobjekt|Schlagzeile|Erfolgsaussichten|Neukunden'),
]



def thema(frage, loesung):
    for tid, pat in RULES:
        if re.search(pat, frage):
            return tid
    return None


AUSWAHL = re.compile(r'(Auswahl|Antworten?)\b[^.\n]{0,40}\d|Lösungs(folge|reihenfolge)|Erwartete Auswahl|Gesuchte (Auswahl|Antwort)|Antwort \d+ (als richtig|erwartet)|wird Antwort \d')
RECHNEN = re.compile(r'berechne|Wie hoch|Wie viel|Ab welche|Nach wie vielen|Wie weit darf|Auf welchen Betrag|\bermittelt|Gewinnschwellenmenge|Wie stellt man|Wie zeichnet man|Mit welcher Formel|Ist die interne oder externe|Gewinn je')
ERKLAEREN = re.compile(r'^(Was (ist|sind|bedeutet|bedeuten|versteht|bezeichnet|sagt|kennzeichnet|unterscheidet|beschreibt)|Wofür steht|Wozu dien|Welchen (wesentlichen )?Zweck)')


def art(frage, loesung):
    if AUSWAHL.search(loesung) or re.search(r'^(Welche Aussage|In welcher Reihenfolge)', frage):
        return 'auswahl'
    if RECHNEN.search(frage):
        return 'rechnen'
    if ERKLAEREN.search(frage):
        return 'erklaeren'
    return 'anwenden'
