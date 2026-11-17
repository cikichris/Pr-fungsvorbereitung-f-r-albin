"""Handarbeit: Themen, die die Stichwortregeln falsch zuordnen, und
Abschriften der Formelbilder aus AP2_GP_2025-26.pdf."""

THEMA_OVERRIDE = {
    'gp-2020-sommer:15': 'marketing',
    'gp-2020-sommer:16': 'marketing',
    'gp-2020-sommer:18': 'shopkennzahlen',
    'gp-2020-sommer:19': 'shopkennzahlen',
    'gp-2020-sommer:20': 'shopkennzahlen',
    'gp-2020-sommer:26': 'marketing',
    'gp-2020-21-winter:1': 'marketing',
    'gp-2020-21-winter:2': 'testing',
    'gp-2020-21-winter:23': 'rechnungswesen',
    'gp-2021-sommer:10': 'vertrieb',
    'gp-2021-sommer:11': 'vertrieb',
    'gp-2021-sommer:19': 'werbekennzahlen',
    'gp-2021-sommer:29': 'shopkennzahlen',
    'gp-2021-22-winter:4': 'testing',
    'gp-2021-22-winter:8': 'marketing',
    'gp-2021-22-winter:10': 'testing',
    'gp-2021-22-winter:11': 'testing',
    'gp-2021-22-winter:12': 'testing',
    'gp-2021-22-winter:18': 'shopkennzahlen',
    'gp-2022-sommer:1': 'shopkennzahlen',
    'gp-2022-sommer:10': 'testing',
    'gp-2022-23-winter:4': 'socialmedia',
    'gp-2022-23-winter:5': 'socialmedia',
    'gp-2022-23-winter:14': 'marketing',
    'gp-2022-23-winter:18': 'customerjourney',
    'gp-2022-23-winter:24': 'rechnungswesen',
    'gp-2023-sommer:1': 'kostenrechnung',
    'gp-2023-sommer:2': 'kostenrechnung',
    'gp-2023-sommer:22': 'marketing',
    'gp-2023-24-winter:7': 'kostenrechnung',
    'gp-2025-sommer:11': 'kalkulation',
    'gp-2025-sommer:21': 'kostenrechnung',
    'gp-2025-sommer:26': 'rechnungswesen',
    'gp-2025-26:4': 'customerjourney',
    'gp-2025-26:8': 'projekt',
    'gp-2025-26:9': 'vertrieb',
    'gp-2025-26:10': 'testing',
    'gp-2025-26:21': 'werbekennzahlen',
    'gp-2026:7': 'analyse',
    'gp-2026:8': 'analyse',
    # Kundenkommunikation
    'kk-2020-sommer:25': 'kommunikation',
    'kk-2020-21-winter:1': 'maengel',
    'kk-2020-21-winter:9': 'kanaele',
    'kk-2022-sommer:4': 'maengel',
    'kk-2022-23-winter:8': 'kanaele',
    'kk-2023-sommer:6': 'kaufvertrag',
    'kk-2023-24-winter:9': 'stoerungen',
    'kk-2024-sommer:9': 'beschwerde',
    'kk-2024-sommer:11': 'beschwerde',
    'kk-2024-25-winter:1': 'zahlung',
    'kk-2024-25-winter:7': 'servicekennzahlen',
    'kk-2025-sommer:1': 'retouren',
    'kk-2025-26:4': 'maengel',
    'kk-2026:11': 'kundenbindung',
    'kk-2026:12': 'kundenbindung',
}

BILDER = {
    'AP2_GP_2025-26:2-1': """**Formel:**

> Lagerkosten = Länge × Breite × Höhe × Menge × Kostensatz

**Rechnung:**

Volumen eines Zeltes:

> 0,64 × 0,26 × 0,15 = 0,02496 m³

Volumen für 40 Zelte:

> 0,02496 × 40 = 0,9984 m³

Tägliche Lagerkosten:

> 0,9984 × 0,60 = 0,59904 €""",

    'AP2_GP_2025-26:3-1': """**Formel:**

> Provision gesamt = Verkaufspreis × Provisionssatz × Menge

Provision pro Zelt:

> 799,00 × 0,08 = 63,92 €

Provision für 40 Zelte:

> 63,92 × 40 = 2.556,80 €""",

    'AP2_GP_2025-26:8-1': """> Deckungsbeitrag = Nettoerlös − variable Kosten
> 50,00 − 32,00 = 18,00 €""",

    'AP2_GP_2025-26:13-1': """> CPA = Kampagnenkosten ÷ Anzahl gewonnener Akquisitionen

Beispiel:

> 600 € ÷ 30 Neukunden = 20 € pro Neukunde""",

    'AP2_GP_2025-26:14-1': """> Nettoverkaufspreis = Bruttoverkaufspreis ÷ 1,19
> 49,99 ÷ 1,19 ≈ 42,01 €

**Schritt 2: Warenrohertrag pro Stück**

> Warenrohertrag = Nettoverkaufspreis − Einstandspreis
> 42,01 − 21,38 = 20,63 €

**Schritt 3: Warenrohertrag pro Monat**

Mit dem gerundeten Stückwert aus der Musterlösung:

> 20,63 × 130 = 2.681,90 €""",

    'AP2_GP_2025-26:15-1': """Monatsbudget:

> 20,00 × 30 = 600,00 €

**Formel:**

> Marketingkosten je Stück = Marketingbudget ÷ Absatzmenge
> 600,00 ÷ 130 ≈ 4,62 €""",

    'AP2_GP_2025-26:16-1': """> Stückdeckungsbeitrag = Warenrohertrag − weitere variable Stückkosten
> 20,63 − 18,31 = 2,32 €""",

    'AP2_GP_2025-26:16-2': """> 2,32 × 130 = 301,60 €""",

    'AP2_GP_2025-26:17-1': """Maximale Marketingkosten je Stück:

> 4,62 + 2,32 = 6,94 €

Maximales Monatsbudget nach dem Rechenweg der Musterlösung:

> 6,94 × 130 = 902,20 €

Mögliche Erhöhung gegenüber dem bisherigen Budget:

> 902,20 − 600,00 = 302,20 €""",

    'AP2_GP_2025-26:18-1': """> Kurzfristige Preisuntergrenze = kv
> Langfristige Preisuntergrenze = kv + kf

(kv = variable Kosten je Stück, kf = fixe Kosten je Stück)""",
}

BILDER.update({
    'AP2_Kundenkommunikation_2020:2-1': """> Verzugszinsen = offener Betrag × Zinssatz in Prozent × Verzugstage ÷ (100 × 365)""",
    'AP2_Kundenkommunikation_2020:2-2': """> 259,41 × 4,12 × 29 ÷ (100 × 365) = **0,85 €**""",
    'AP2_Kundenkommunikation_2021-22:2-1': """> −0,88 % + 9 Prozentpunkte = 8,12 %""",
    'AP2_Kundenkommunikation_2021-22:2-2': """> Verzugszinsen = offener Betrag × Zinssatz in Prozent × Verzugstage ÷ (100 × 365)

Beispiel:

> 3.084,48 × 8,12 × 45 ÷ (100 × 365) = 30,88 €

> Gesamtbetrag = Rechnungsbetrag + Verzugszinsen + berechtigte Mahnkosten

Mit den vorgegebenen Mahnkosten der Aufgabe:

> 3.084,48 + 30,88 + 68,00 = **3.183,36 €**""",
    'AP2_Kundenkommunikation_2022:4-1': """> Antwortrate = beantwortete Anfragen ÷ eingegangene Anfragen × 100

Beispiel:

> 371 ÷ 530 × 100 = **70 %**""",
    'AP2_Kundenkommunikation_2025:3-1': """> Umsatzanteil = Kundenumsatz ÷ Gesamtumsatz × 100""",
    'AP2_Kundenkommunikation_2025:4-1': """> Retention-Rate = (Kunden am Ende − Neukunden) ÷ Kunden zu Beginn × 100""",
    'AP2_Kundenkommunikation_2025:4-2': """> (8.400 − 2.250) ÷ 8.200 × 100 = **75 %**""",
    'AP2_Kundenkommunikation_2025:5-1': """> Durchschnittliche Antwortzeit = Summe aller Antwortzeiten ÷ Anzahl beantworteter Anfragen

Beispiel:

> (2 + 3 + 2 + 1) ÷ 4 = **2 Stunden**""",
    'AP2_Kundenkommunikation_2025-26:3-1': """> Verzugszinssatz = Basiszinssatz + 9 Prozentpunkte
> 1,27 % + 9 Prozentpunkte = **10,27 % pro Jahr**""",
    'AP2_Kundenkommunikation_2025-26:4-1': """> Verzugszinsen = Rechnungsbetrag × Zinssatz × Verzugstage ÷ (100 × 365)

Werte einsetzen:

> Verzugszinsen = 10.000 × 10,27 × 35 ÷ (100 × 365)
> Verzugszinsen = **98,48 €**""",
    'AP2_Kundenkommunikation_2025-26:8-1': """> CSAT in % = zufriedene Kunden ÷ alle antwortenden Kunden × 100""",
    'AP2_Kundenkommunikation_2025-26:8-2': """> Interaktionsrate in % = Interaktionen ÷ Reichweite × 100""",
})

# Ganze Lösungen von Hand, wo die PDF-Formel nicht lesbar umgewandelt werden kann
LOESUNG_OVERRIDE = {
    'kk-2024-sommer:7': """Die Amortisationszeit zeigt, nach welcher Zeit die Einsparungen die ursprünglichen Projektkosten ausgeglichen haben.

> Amortisationszeit = Projektkosten ÷ monatliche Einsparung

**Beispiel:**

> 10.500 ÷ 2.716 ≈ 3,87 Monate

Das Projekt amortisiert sich unter diesen Annahmen **im vierten Monat**.""",
}
