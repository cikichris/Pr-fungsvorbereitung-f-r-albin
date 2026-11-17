// AP2 – Geschäftsprozesse im E-Commerce: Sommer 2023
// Fragen und Musterlösungen aus der Vorlage, automatisch übernommen
// (Konverter: tools/import). Frage-ids nicht ändern.
export default {
  id: 'gp-2023-sommer',
  titel: 'Sommer 2023',
  bereich: 'gp',
  sortierung: 2023.0,
  quelle: 'Musterlösung',
  aufgaben: [
    {
      nr: '1',
      fragen: [
        {
          id: 'gp-2023-sommer-01',
          nr: '1.1',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kostenrechnung',
          frage: `Ist die interne oder externe App-Entwicklung im ersten Jahr günstiger?`,
          loesung: `**Geplanter App-Umsatz: 300.000,00 €**

**Interne Lösung:**

| Kostenposition | Berechnung | Betrag |
|---|---|---|
| Entwicklung einmalig | 16 Personentage × 400,00 € | 6.400,00 € |
| Betrieb jährlich | 4 Personentage × 400,00 € × 12 | 19.200,00 € |
| IT jährlich | 1.200,00 € × 12 | 14.400,00 € |
| **Gesamtkosten intern** |  | **40.000,00 €** |

**Externe Lösung:**

| Kostenposition | Berechnung | Betrag |
|---|---|---|
| Entwicklung und Einrichtung | Pauschale | 25.000,00 € |
| Umsatzprovision | 300.000,00 € × 3 % | 9.000,00 € |
| **Gesamtkosten extern** |  | **34.000,00 €** |

**Kostenunterschied:**

> 40.000,00 € − 34.000,00 € = **6.000,00 €**

**Ergebnis:** Im ersten Jahr ist die externe Lösung bei diesem Umsatz **6.000,00 € günstiger**.`,
        },
        {
          id: 'gp-2023-sommer-02',
          nr: '1.2',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kostenrechnung',
          frage: `Ab welchem Jahresumsatz ist die interne App-Lösung günstiger?`,
          loesung: `Man setzt die beiden Kostenfunktionen gleich.

**Interne Kosten:**

40.000,00 €

**Externe Kosten:**

25.000,00 € + 3 % des Umsatzes

**Gleichung:**

> 40.000 = 25.000 + 0,03 × Umsatz

> 15.000 = 0,03 × Umsatz

> Umsatz = 15.000 ÷ 0,03 = **500.000,00 €**

**Ergebnis:**

- Unter 500.000,00 € Umsatz: externe Lösung günstiger.
- Bei 500.000,00 € Umsatz: beide gleich teuer.
- Über 500.000,00 € Umsatz: interne Lösung günstiger.

**Merksatz:** Am Schnittpunkt sind die Kosten gleich. Erst darüber ist hier die interne Lösung günstiger.`,
        },
        {
          id: 'gp-2023-sommer-03',
          nr: '1.3',
          typ: 'offen',
          art: 'anwenden',
          thema: 'projekt',
          frage: `Welche Chancen und Risiken haben interne und externe Projektrealisierung?`,
          loesung: `**Interne Umsetzung Externe Umsetzung**

Mitarbeiter kennen die betrieblichen Ein spezialisierter Dienstleister bringt

|  |  |  |
|---|---|---|
| **Chance** | Abläufe und können Anforderungen gezielt berücksichtigen. | Erfahrung und technisches Fachwissen ein. |
| **Risiko** | Fehlende Fachkenntnisse oder begrenzte Kapazitäten können das Projekt verzögern. | Es entsteht eine Abhängigkeit vom Dienstleister, beispielsweise bei Änderungen oder Wartung. |

**Merksatz:** Eine Make-or-Buy-Entscheidung berücksichtigt neben Kosten auch Qualität, Wissen, Kapazitäten und Abhängigkeiten.`,
        },
        {
          id: 'gp-2023-sommer-04',
          nr: '1.4',
          typ: 'offen',
          art: 'auswahl',
          thema: 'customerjourney',
          frage: `In welcher Reihenfolge verlaufen die Phasen der Customer Journey?`,
          loesung: `1. **Awareness:** Auf das Angebot aufmerksam werden.
1. **Consideration:** Informieren und Alternativen vergleichen.
1. **Purchase:** Kaufen.
1. **Retention:** Kundenbeziehung erhalten und Wiederkäufe fördern.
1. **Advocacy:** Weiterempfehlen.

**Zahlenfolge für die Kästchen in der Prüfung: 1 – 4 – 2 – 3 – 5**`,
        },
        {
          id: 'gp-2023-sommer-05',
          nr: '1.5',
          typ: 'offen',
          art: 'auswahl',
          thema: 'werbekennzahlen',
          frage: `Welches Abrechnungsmodell liegt bei einer umsatzabhängigen Verkaufsprovision vor?`,
          loesung: `In der Aufgabe wird eine Provision von **10 % auf die über den Social-Media-Shop erzielten Umsätze** verlangt.

**Gesuchtes Modell: CPO – Cost per Order**

Die Vergütung ist an zustande gekommene Bestellungen gebunden.

**Richtige Auswahl: Antwort 2.**

**Abgrenzung:**

| Modell | Vergütung für |
|---|---|
| CPM | 1.000 Werbeeinblendungen |
| CPC | Einen Klick |
| CPL | Einen Interessentenkontakt |
| CPO | Eine Bestellung |
| CPV | Eine Videoansicht nach festgelegter Definition |`,
        },
        {
          id: 'gp-2023-sommer-06',
          nr: '1.6',
          typ: 'offen',
          art: 'auswahl',
          thema: 'socialmedia',
          frage: `Welche Aussage über Social Media als mobilen Vertriebskanal ist falsch?`,
          loesung: `Falsch ist die pauschale Behauptung, Social-Media-Plattformen seien wegen grundsätzlich geringer Reichweiten als Vertriebskanal ungeeignet.

**Richtige Auswahl der falschen Aussage: Antwort 4.**

Social-Media-Vertrieb kann beispielsweise:

- neue Kunden erreichen,
- unterschiedliche Zielgruppen ansprechen,
- kurze Wege zum Kauf ermöglichen,
- Impulskäufe fördern.

Ob der Kanal geeignet ist, hängt vom Angebot, der Zielgruppe und der Wirtschaftlichkeit ab.`,
        },
        {
          id: 'gp-2023-sommer-07',
          nr: '1.7',
          typ: 'offen',
          art: 'anwenden',
          thema: 'shopkennzahlen',
          frage: `Warum kann der durchschnittliche Warenkorbwert mobil niedriger ausfallen? Nennen Sie zwei Ursachen.`,
          loesung: `- **Kleinere und spontanere Einkäufe:** Kunden kaufen unterwegs möglicherweise einzelne Artikel statt umfangreicher Warenkörbe.
- **Schwierigerer Vergleich komplexer Produkte:** Auf kleinen Bildschirmen können umfangreiche Informationen und Vergleiche unübersichtlicher sein. Teure Anschaffungen werden deshalb möglicherweise später am Desktop oder in der Filiale abgeschlossen.

Das sind mögliche Erklärungen, die anhand von Nutzungs- und Verkaufsdaten geprüft werden sollten.`,
        },
      ],
    },
    {
      nr: '2',
      fragen: [
        {
          id: 'gp-2023-sommer-08',
          nr: '2.1.1',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kalkulation',
          frage: `Wie berechnet man den Netto-Listenverkaufspreis des E-Mountainbikes?

**Gegeben:**

- Einkaufspreis für 400 Fahrräder: 600.000,00 € netto
- Lieferantenrabatt: 10 %
- Lieferantenskonto: 2 %
- Lieferkosten insgesamt: 250,00 €
- Transportversicherung insgesamt: 250,00 €
- Handlungskostenzuschlag: 28 %
- Gewinnzuschlag: 75 %
- Kundenskonto: 1,5 %
- Kundenrabatt: 12 %`,
          loesung: `**Listeneinkaufspreis je Fahrrad:**

> 600.000,00 € ÷ 400 = **1.500,00 €**

**Bezugskosten je Fahrrad:**

> (250,00 € + 250,00 €) ÷ 400 = **1,25 €**

| Kalkulationsschritt | Berechnung | Betrag |
|---|---|---|
| Listeneinkaufspreis |  | 1.500,00 € |
| − Lieferantenrabatt | 10 % | 150,00 € |
| **= Zieleinkaufspreis** |  | **1.350,00 €** |
| − Lieferantenskonto | 2 % von 1.350,00 € | 27,00 € |
| **= Bareinkaufspreis** |  | **1.323,00 €** |
| + Bezugskosten |  | 1,25 € |
| **= Bezugspreis** |  | **1.324,25 €** |
| + Handlungskosten | 28 % vom Bezugspreis | 370,79 € |
| **= Selbstkosten** |  | **1.695,04 €** |
| + Gewinn | 75 % von den Selbstkosten | 1.271,28 € |
| **= Barverkaufspreis** |  | **2.966,32 €** |

| Kalkulationsschritt | Berechnung | Betrag |
|---|---|---|
| + Kundenskonto | Zielverkaufspreis × 1,5 % | 45,17 € |
| **= Zielverkaufspreis** | 2.966,32 € ÷ 0,985 | **3.011,49 €** |
| + Kundenrabatt | Listenverkaufspreis × 12 % | 410,66 € |
| **= Listenverkaufspreis netto** | 3.011,49 € ÷ 0,88 | **3.422,15 €** |

**Wichtig:** Kundenskonto und Kundenrabatt werden nicht einfach aufgeschlagen.

**Merksätze:**

> Zielverkaufspreis = Barverkaufspreis ÷ (1 − Kundenskontosatz)

> Listenverkaufspreis = Zielverkaufspreis ÷ (1 − Kundenrabattsatz)`,
        },
        {
          id: 'gp-2023-sommer-09',
          nr: '2.1.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kalkulation',
          frage: `Ist Globetrader mit dem kalkulierten Fahrradpreis konkurrenzfähig?`,
          loesung: `- Eigener Netto-Listenverkaufspreis: **3.422,15 €**
- Vergleichbarer Konkurrenzpreis netto: **3.499,99 €**

**Preisunterschied:**

> 3.499,99 € − 3.422,15 € = **77,84 €**

**Ergebnis:** Bei vergleichbarer Leistung ist Globetrader preislich konkurrenzfähig und liegt **77,84 € unter dem Konkurrenzangebot**.`,
        },
        {
          id: 'gp-2023-sommer-10',
          nr: '2.2',
          typ: 'offen',
          art: 'auswahl',
          thema: 'kalkulation',
          frage: `Welche Kriterien gehören zu einem Angebotsvergleich?`,
          loesung: `Ein umfassender Angebotsvergleich berücksichtigt **quantitative und qualitative Kriterien**.

| Quantitativ | Qualitativ |
|---|---|
| Bezugspreis | Produktqualität |
| Rabatt und Skonto | Lieferzuverlässigkeit |
| Transportkosten | Service |
| Weitere bezifferbare Kosten | Nachhaltigkeit |

**Richtige Auswahl: Antwort 4.**

**Merksatz:** Das günstigste Angebot ist nicht automatisch das insgesamt passendste.`,
        },
        {
          id: 'gp-2023-sommer-11',
          nr: '2.3',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kalkulation',
          frage: `Wie berechnet man den Kalkulationsfaktor?`,
          loesung: `**Formel dieser Aufgabe:**

> Kalkulationsfaktor = Netto-Listenverkaufspreis ÷ Bezugspreis

**Berechnung:**

> 3.422,15 € ÷ 1.324,25 € = **2,58**

**Bedeutung:** Der Bezugspreis wird mit dem Kalkulationsfaktor multipliziert, um den entsprechenden Verkaufspreis zu ermitteln.

**Wichtig:** Der Faktor ist keine Prozentangabe und hat keine Einheit.`,
        },
        {
          id: 'gp-2023-sommer-12',
          nr: '2.4',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kostenrechnung',
          frage: `Wie berechnet man den Deckungsbeitrag aus Betriebsergebnis und Fixkosten?`,
          loesung: `**Ausgangsformel:**

> Betriebsergebnis = Deckungsbeitrag − Fixkosten

**Umgestellt:**

> Deckungsbeitrag = Betriebsergebnis + Fixkosten

**Berechnung:**

> 59.500,00 € + 56.980,00 € = **116.480,00 €**

**Ergebnis:** Der Deckungsbeitrag der Kategorie beträgt im betrachteten Quartal **116.480,00 €**.`,
        },
        {
          id: 'gp-2023-sommer-13',
          nr: '2.5',
          typ: 'offen',
          art: 'auswahl',
          thema: 'analyse',
          frage: `Wozu dient eine Nutzwertanalyse?`,
          loesung: `Sie unterstützt die Auswahl zwischen Alternativen anhand **gewichteter Bewertungskriterien**.

Damit lassen sich besonders qualitative Merkmale wie Qualität, Service oder Zuverlässigkeit strukturiert vergleichen.

**Richtige Auswahl: Antwort 3.**

**Grundablauf:**

Kriterien festlegen → gewichten → Alternativen bewerten → gewichtete Punkte addieren → Ergebnisse vergleichen.`,
        },
        {
          id: 'gp-2023-sommer-14',
          nr: '2.6',
          typ: 'offen',
          art: 'auswahl',
          thema: 'testing',
          frage: `Was muss bei der Vorbereitung einer A/B-Testvariante beachtet werden?`,
          loesung: `**Erwartete Auswahl nach Lösungsvorlage: Antwort 5.**

Die Kategorienseite sollte **übersichtlich gestaltet** sein.

**Weitere wichtige Grundsätze:**

- Eine klare Hypothese festlegen.
- Änderungen gezielt auswählen.
- Ladezeit und Benutzerfreundlichkeit berücksichtigen.
- Varianten unter vergleichbaren Bedingungen testen.

**Wichtig:** Ein A/B-Test muss nicht zwingend nur eine winzige Änderung untersuchen. Werden mehrere Elemente gemeinsam verändert, lässt sich aber nicht eindeutig bestimmen, welches einzelne Element den Unterschied verursacht hat.`,
        },
      ],
    },
    {
      nr: '3',
      fragen: [
        {
          id: 'gp-2023-sommer-15',
          nr: '3.1',
          typ: 'offen',
          art: 'auswahl',
          thema: 'marketing',
          frage: `Was ist ein Werbeobjekt?`,
          loesung: `Das Werbeobjekt ist das Produkt, die Dienstleistung oder das Unternehmen, **für das geworben wird**.

**Beispiel:** Eine Kampagne bewirbt die persönliche Rucksackberatung in der Filiale.

**Richtige Auswahl: Antwort 4.**

**Merksatz:** Werbeobjekt beantwortet die Frage: **Wofür wird geworben?**`,
        },
        {
          id: 'gp-2023-sommer-16',
          nr: '3.2',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'onlinewerbung',
          frage: `Was bedeutet regionales Onlinemarketing?`,
          loesung: `Regionales Onlinemarketing richtet digitale Marketingmaßnahmen auf ein **bestimmtes geografisches Gebiet** aus.

Für Globetrader sollen dadurch Menschen im Einzugsgebiet einer Filiale auf deren Angebot aufmerksam werden.

**Beispiel:** Eine Suchanzeige bewirbt „Outdoor-Beratung in Köln“ und führt zu einer Seite mit Adresse, Öffnungszeiten und Beratungsangebot.

**Merksatz:** Online Aufmerksamkeit erzeugen und regionale Nachfrage beziehungsweise Filialbesuche fördern.`,
        },
        {
          id: 'gp-2023-sommer-17',
          nr: '3.3',
          typ: 'offen',
          art: 'anwenden',
          thema: 'onlinewerbung',
          frage: `Welche drei Online-Maßnahmen können die Filialsichtbarkeit außerhalb sozialer Netzwerke steigern?`,
          loesung: `- **Lokale Suchmaschinenoptimierung:** Filialseiten mit Standort, Öffnungszeiten und passenden lokalen Suchbegriffen erstellen.
- **Regional ausgerichtete Suchanzeigen:** Anzeigen gezielt im Einzugsgebiet ausspielen.
- **Einträge in passenden Online-Verzeichnissen:** Filialinformationen in lokalen Branchen- und Stadtportalen vollständig bereitstellen.

**Wichtig:** Adresse, Kontaktinformationen und Öffnungszeiten sollten konsistent sein.`,
        },
        {
          id: 'gp-2023-sommer-18',
          nr: '3.4.1',
          typ: 'offen',
          art: 'rechnen',
          thema: 'werbekennzahlen',
          frage: `Wie berechnet man das Werbebudget bei vorgegebenem CPM?`,
          loesung: `**CPM = Cost per Mille**, also Kosten je 1.000 Einblendungen.

**Gegeben:**

- Reichweite: 120.000 Nutzer
- Geplante Kontakthäufigkeit: 2
- CPM: 4,75 €

**Schritt 1: Einblendungen**

> 120.000 × 2 = **240.000 Impressions**

**Schritt 2: Budget**

> Budget = Impressions ÷ 1.000 × CPM

> 240.000 ÷ 1.000 × 4,75 € = **1.140,00 €**

**Ergebnis:** Rechnerisch werden **1.140,00 €** benötigt.

**Einordnung:** Eine durchschnittliche Kontakthäufigkeit von zwei garantiert in einer realen Kampagne nicht, dass jede einzelne Person genau zweimal erreicht wird.`,
        },
        {
          id: 'gp-2023-sommer-19',
          nr: '3.4.2',
          typ: 'offen',
          art: 'rechnen',
          thema: 'werbekennzahlen',
          frage: `Wie berechnet man den CPO aus Budget, CTR und Conversion-Rate?

**Gegeben:**

- Einblendungen: 240.000
- CTR: 1,5 %
- Conversion-Rate: 3,5 %
- Budget: 1.140,00 €`,
          loesung: `**Schritt 1: Klicks**

> 240.000 × 1,5 % = **3.600 Klicks**

**Schritt 2: Bestellungen**

> 3.600 × 3,5 % = **126 Bestellungen**

**Schritt 3: CPO**

> CPO = Werbekosten ÷ Bestellungen

> 1.140,00 € ÷ 126 = **9,05 € je Bestellung**

**Achtung: Fehler in der Lösungsvorlage.** Sie rechnet die Klicks aus 120.000 Nutzern statt aus 240.000 Einblendungen. Da die Aufgabe die CTR ausdrücklich auf die Impressions bezieht, ist **9,05 €** das passende Ergebnis; die Vorlage nennt **18,10 €**.`,
        },
        {
          id: 'gp-2023-sommer-20',
          nr: '3.5',
          typ: 'offen',
          art: 'anwenden',
          thema: 'onlinewerbung',
          frage: `Wie könnte eine regionale Trigger-Kampagne für die Filialen aussehen?`,
          loesung: `Eine Trigger-Kampagne wird durch einen bestimmten **Anlass oder ein Ereignis** ausgelöst.

| Bestandteil | Beispiel |
|---|---|
| **Trigger und Zielgruppe** | Bestandskunden im Filialeinzugsgebiet haben seit sechs Monaten nichts gekauft. |
| **Onlinewerbekanal** | E-Mail an entsprechend erreichbare Kunden |
| **Angebot** | Einladung zur persönlichen Outdoor-Beratung mit einem nur in der Filiale einlösbaren Gutschein |
| **KPIs** | Klickrate, gebuchte Beratungstermine, Gutscheineinlösungen und zugeordneter Filialumsatz |

**Merksatz:** Anlass, Zielgruppe, Kanal, Angebot und Erfolgsmessung müssen zusammenpassen.`,
        },
        {
          id: 'gp-2023-sommer-21',
          nr: '3.6',
          typ: 'offen',
          art: 'auswahl',
          thema: 'onlinewerbung',
          frage: `Welche Aussage über Google-My-Business-Profile ist in der Prüfung falsch?`,
          loesung: `**Gesuchte Auswahl: Antwort 3.**

Die Aufgabe behauptet, dass mit jeder zusätzlichen Profilangabe höhere Gebühren an Google entstehen. Diese Behauptung wird in der Lösung als falsch gewertet.

**Lernpunkt:** Vollständige Standortinformationen helfen Nutzern, eine Filiale zu finden und ihren Besuch zu planen.

Dazu gehören beispielsweise Adresse, Öffnungszeiten, Telefonnummer und passende Informationen zum Angebot.`,
        },
        {
          id: 'gp-2023-sommer-22',
          nr: '3.7',
          typ: 'offen',
          art: 'auswahl',
          thema: 'marketing',
          frage: `Welche Maßnahme wird in der Prüfung ausschließlich der Kundenbindung zugeordnet?`,
          loesung: `**Bonusprogramme.**

Sie belohnen bestehende Kunden beispielsweise für Wiederholungskäufe oder erreichte Einkaufswerte.

**Richtige Auswahl: Antwort 4.**

**Beispiel:** Kunden sammeln bei jedem Einkauf Punkte und erhalten später einen Vorteil.

Newsletter können dagegen auch Interessenten erreichen, die noch nichts gekauft haben.`,
        },
      ],
    },
    {
      nr: '4',
      fragen: [
        {
          id: 'gp-2023-sommer-23',
          nr: '4.1',
          typ: 'offen',
          art: 'rechnen',
          thema: 'shopkennzahlen',
          frage: `Wie berechnet man die Conversion-Rates der drei Produktgruppen?`,
          loesung: `Das KPI-Handbuch legt ausdrücklich fest:

- Conversion = **bestätigter Bestelleingang**
- Bezugsgröße = **Unique Visitors**

**Formel:**

> Conversion-Rate = bestätigte Bestellungen ÷ Unique Visitors × 100

| Produktgruppe | Bestätigte Bestellungen | Unique Visitors | Conversion-Rate |
|---|---|---|---|
| Hosen | 347 | 1.253 | **27,69 %** |
| Hemden | 143 | 567 | **25,22 %** |
| Jacken | 213 | 675 | **31,56 %** |

**Merksatz:** Immer die Definition der Aufgabe beachten. Hier werden weder versendete Bestellungen noch die allgemeine Besucherzahl verwendet.`,
        },
        {
          id: 'gp-2023-sommer-24',
          nr: '4.2',
          typ: 'offen',
          art: 'rechnen',
          thema: 'shopkennzahlen',
          frage: `Wie berechnet man die Retourenquote der Hosen?`,
          loesung: `**Formel dieser Aufgabe:**

> Retourenquote = retournierte Bestellungen ÷ versendete Bestellungen × 100

**Berechnung:**

> 45 ÷ 330 × 100 = **13,64 %**

**Wichtig:** Die Bezugsgröße sind hier die **330 versendeten Bestellungen**, nicht die 347 bestätigten Bestellungen.`,
        },
        {
          id: 'gp-2023-sommer-25',
          nr: '4.3',
          typ: 'offen',
          art: 'rechnen',
          thema: 'shopkennzahlen',
          frage: `Wie berechnet man den Umsatzanteil der Hosen?`,
          loesung: `**Grundformel:**

> Umsatzanteil = Umsatz der Hosen ÷ Gesamtumsatz der Produktgruppe × 100

Dabei müssen Zähler und Nenner auf derselben Grundlage stehen: beispielsweise **beide vor Retouren**.

**Mit den ausdrücklich angegebenen Umsätzen vor Retouren:**

Hosenumsatz brutto:

> 330 × 99,00 € = **32.670,00 €**

Gesamtumsatz brutto:

**81.666,00 €**

Da beide Werte denselben Umsatzsteuersatz enthalten, ergibt sich der Anteil auch direkt aus den Bruttowerten:

> 32.670,00 € ÷ 81.666,00 € × 100 = **40,00 %**

**Problem der Lösungsvorlage:** Sie zieht bei den Hosen 45 Retouren ab, beim Gesamtumsatz jedoch nicht. Dadurch kommt sie auf **34,55 %**.

**Für deine Unterlagen:**

- **Ergebnis der Vorlage: 34,55 %**
- **Vergleich auf einheitlicher Grundlage vor Retouren: 40,00 %**

**Merksatz:** „Netto“ im Sinne von **ohne Umsatzsteuer** bedeutet nicht automatisch „nach Retouren“.`,
        },
        {
          id: 'gp-2023-sommer-26',
          nr: '4.4',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kostenrechnung',
          frage: `Wie hoch ist der Stückdeckungsbeitrag einer Hose?

**Gegeben:**

- Verkaufspreis brutto: 99,00 €
- Wareneinsatz: 54,00 €
- Variable Handlungskosten: 13,00 €
- Umsatzsteuer: 19 %`,
          loesung: `**Schritt 1: Nettoverkaufspreis**

> 99,00 € ÷ 1,19 = **83,19 €**

**Schritt 2: Stückdeckungsbeitrag**

> Stückdeckungsbeitrag = Nettoverkaufspreis − Wareneinsatz − variable Handlungskosten

> 83,19 € − 54,00 € − 13,00 € = **16,19 €**

**Bedeutung:** Jede verkaufte Hose liefert 16,19 € zur Fixkostendeckung und anschließend zur Gewinnerzielung.`,
        },
        {
          id: 'gp-2023-sommer-27',
          nr: '4.5',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kostenrechnung',
          frage: `Wie hoch ist die kurzfristige Preisuntergrenze einer Hose?`,
          loesung: `Die kurzfristige Preisuntergrenze entspricht den **variablen Stückkosten**.

**Berechnung:**

> 54,00 € Wareneinsatz + 13,00 € variable Handlungskosten = **67,00 € netto**

Bei diesem Nettoverkaufspreis beträgt der Stückdeckungsbeitrag **0 €**.

**Merksatz:** Variable Kosten sind gedeckt, Fixkosten noch nicht.`,
        },
        {
          id: 'gp-2023-sommer-28',
          nr: '4.6',
          typ: 'offen',
          art: 'auswahl',
          thema: 'kostenrechnung',
          frage: `Was bezeichnet der Break-even-Point?`,
          loesung: `Der Break-even-Point bezeichnet die Absatzmenge, bei der **alle Kosten durch die Umsatzerlöse gedeckt sind**.

**An diesem Punkt gilt:**

> Erlöse = Gesamtkosten

> Gewinn = **0 €**

**Formel im einfachen linearen Modell:**

> Gewinnschwellenmenge = Fixkosten ÷ Stückdeckungsbeitrag

**Richtige Auswahl: Antwort 5.**`,
        },
        {
          id: 'gp-2023-sommer-29',
          nr: '4.7',
          typ: 'offen',
          art: 'auswahl',
          thema: 'shopkennzahlen',
          frage: `Was sagt der Customer Lifetime Value aus?`,
          loesung: `**CLV = Customer Lifetime Value**

Er beschreibt den wirtschaftlichen Wert eines Kunden über die gesamte Kundenbeziehung.

In der Prüfung wird dafür der **Deckungsbeitrag über sämtliche Bestellungen eines Kunden** betrachtet.

**Richtige Auswahl: Antwort 1.**

**Nutzen:** Das Unternehmen kann einschätzen, welche Ausgaben für Kundengewinnung und Kundenbindung wirtschaftlich vertretbar sind.

**Wichtig:** Es gibt unterschiedliche Berechnungsmodelle, beispielsweise mit Akquisitionskosten und einer Abzinsung künftiger Beiträge.`,
        },
        {
          id: 'gp-2023-sommer-30',
          nr: '4.8',
          typ: 'offen',
          art: 'auswahl',
          thema: 'kostenrechnung',
          frage: `Was ist die Kostenträgerrechnung und wie unterscheiden sich Voll- und Teilkostenrechnung?`,
          loesung: `Die Kostenträgerrechnung untersucht, **wofür Kosten entstanden sind**, beispielsweise für ein bestimmtes Produkt oder eine Dienstleistung.

Sie kann als **Vollkostenrechnung oder Teilkostenrechnung** durchgeführt werden.

**Richtige Auswahl: Antwort 3.**

| Verfahren | Grundgedanke |
|---|---|
| **Vollkostenrechnung** | Sämtliche Kosten werden den Kostenträgern zugerechnet. |
| **Teilkostenrechnung** | Zunächst wird nur ein Teil der Kosten zugerechnet, beispielsweise die variablen Kosten. Fixkosten werden gesondert betrachtet. |

Die **Deckungsbeitragsrechnung ist eine Form der Teilkostenrechnung**.

**Merksatz:** Vollkostenrechnung fragt nach sämtlichen zugerechneten Kosten; die Deckungsbeitragsrechnung zeigt zunächst den Beitrag nach Abzug der variablen Kosten.`,
        },
      ],
    },
  ],
};
