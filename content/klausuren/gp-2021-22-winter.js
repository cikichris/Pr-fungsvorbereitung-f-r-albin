// AP2 – Geschäftsprozesse im E-Commerce: Winter 2021/22
// Fragen und Musterlösungen aus der Vorlage, automatisch übernommen
// (Konverter: tools/import). Frage-ids nicht ändern.
export default {
  id: 'gp-2021-22-winter',
  titel: 'Winter 2021/22',
  bereich: 'gp',
  sortierung: 2021.5,
  quelle: 'Musterlösung',
  aufgaben: [
    {
      nr: '1',
      fragen: [
        {
          id: 'gp-2021-22-winter-01',
          nr: '1.1',
          typ: 'offen',
          art: 'rechnen',
          thema: 'shopkennzahlen',
          frage: `Wie berechnet man die Conversion-Rate für Desktop und Mobile?`,
          loesung: `**Formel dieser Aufgabe:**

> Conversion-Rate = Käufe ÷ Besucher der Kategorieseite × 100

| Gerät | Besucher Kategorieseite | Käufe | Conversion-Rate |
|---|---|---|---|
| Desktop | 255.128 | 2.781 | **1,1 %** |
| Mobile | 85.042 | 619 | **0,7 %** |

**Berechnung Desktop:**

> 2.781 ÷ 255.128 × 100 ≈ **1,1 %**

**Berechnung Mobile:**

> 619 ÷ 85.042 × 100 ≈ **0,7 %**

**Ergebnis:** Mobile Besucher kaufen anteilig seltener als Desktop-Besucher.`,
        },
        {
          id: 'gp-2021-22-winter-02',
          nr: '1.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'shopkennzahlen',
          frage: `Was passiert mit den Verkäufen, wenn der Mobile-Anteil bei gleichbleibenden Conversion-Rates steigt?

**Gegeben:**

- Gesamtzahl der Sessions bleibt gleich.
- Mobile-Anteil steigt auf 50 %.
- Conversion-Rates bleiben gleich.`,
          loesung: `**Schritt 1: Gesamte Sessions**

> 255.128 + 85.042 = **340.170**

**Schritt 2: Gleichmäßige Aufteilung**

> 340.170 ÷ 2 = **170.085 Sessions je Gerätetyp**

**Schritt 3: Verkäufe mit den gerundeten Raten aus Aufgabe 1.1**

Desktop:

> 170.085 × 1,1 % ≈ **1.871 Verkäufe**

Mobile:

> 170.085 × 0,7 % ≈ **1.191 Verkäufe**

**Gesamt:**

> 1.871 + 1.191 = **3.062 Verkäufe**

Bisher:

> 2.781 + 619 = **3.400 Verkäufe**

**Rückgang nach dem Rechenweg der eingetragenen Lösung:**

> 3.400 − 3.062 = **338 Verkäufe**

**Wichtige Rundungsfrage:** Mit den ungerundeten ursprünglichen Conversion-Rates ergeben sich etwa **3.092 Verkäufe**. Die PDF rechnet mit den zuvor gerundeten Raten.

**Merksatz:** Wenn mehr Besuche auf den schlechter konvertierenden Kanal entfallen, können die Gesamtverkäufe trotz unveränderter Besucherzahl sinken.`,
        },
        {
          id: 'gp-2021-22-winter-03',
          nr: '1.3',
          typ: 'offen',
          art: 'anwenden',
          thema: 'customerjourney',
          frage: `Wie unterscheiden sich die Conversion-Funnel von Desktop und Mobile?`,
          loesung: `Die einzelnen Übergänge zeigen, wo Besucher verloren gehen.

| Übergang | Desktop | Mobile |
|---|---|---|
| Kategorieseite → Produktseite | ca. **15,2 %** | ca. **14,9 %** |
| Produktseite → Warenkorb | ca. **31,2 %** | ca. **8,9 %** |
| Warenkorb → Kauf | ca. **23,0 %** | ca. **55,2 %** |

**Desktop:**

- Von den Produktseitenbesuchern legen vergleichsweise viele einen Artikel in den Warenkorb.
- Anschließend schließen jedoch nur rund 23 % der Warenkorbnutzer den Kauf ab.

**Mobile:**

- Nur rund 8,9 % der Produktseitenbesucher erreichen den Warenkorb.
- Wer den Warenkorb erreicht, kauft vergleichsweise häufig: rund 55,2 %.

**Folgerung:** Desktop sollte besonders zwischen Warenkorb und Kauf untersucht werden. Mobile liegt ein auffälliger Verlust zwischen Produktseite und Warenkorb.`,
        },
        {
          id: 'gp-2021-22-winter-04',
          nr: '1.4',
          typ: 'offen',
          art: 'anwenden',
          thema: 'testing',
          frage: `Welche zwei Optimierungsansätze ergeben sich daraus?`,
          loesung: `- **Desktop-Checkout verbessern:** Abbruchstellen, technische Fehler, unerwartete Versandkosten und unnötige Eingaben untersuchen.
- **Mobile Produktseiten verbessern:** Variantenwahl, Informationen und den „In den Warenkorb“-Button gut bedienbar gestalten und technisch testen.

**Merksatz:** Optimierungen dort ansetzen, wo der Funnel auffällige Verluste zeigt.`,
        },
        {
          id: 'gp-2021-22-winter-05',
          nr: '1.5',
          typ: 'offen',
          art: 'auswahl',
          thema: 'customerjourney',
          frage: `Was bedeutet Customer Journey?`,
          loesung: `Die Customer Journey beschreibt den Weg eines Kunden über verschiedene **Kontaktpunkte – Touchpoints – mit einem Unternehmen**.

Sie umfasst beispielsweise die erste Wahrnehmung, Informationssuche, Kaufentscheidung und Kontakte nach dem Kauf.

**Beispiel:**

Suchanzeige → Produktseite → Filialbesuch → Kauf → Kundenservice

**Richtige Auswahl: Antwort 4.**`,
        },
        {
          id: 'gp-2021-22-winter-06',
          nr: '1.6',
          typ: 'offen',
          art: 'auswahl',
          thema: 'shopkennzahlen',
          frage: `Welcher Begriff beschreibt in der damaligen Analytics-Aufgabe kein Zielvorhaben?`,
          loesung: `**Kosten.**

**Richtige Auswahl: Antwort 1.**

Die Aufgabe nennt dagegen folgende mögliche Zielvorhaben:

- Erreichen einer bestimmten Sitzungsdauer,
- Aufrufen einer Ziel-URL,
- Erreichen einer bestimmten Seitenzahl,
- Auslösen eines Ereignisses.

**Wichtig:** Die Bezeichnungen beziehen sich auf das damalige Analytics-Modell der Prüfung. Kosten sind zwar eine wichtige Kennzahl, aber hier kein Zielvorhaben.`,
        },
        {
          id: 'gp-2021-22-winter-07',
          nr: '1.7',
          typ: 'offen',
          art: 'auswahl',
          thema: 'customerjourney',
          frage: `In welcher Reihenfolge verlaufen die genannten Schritte des Conversion-Funnels?`,
          loesung: `1. **Suchbegriff eingeben**
1. **Filterkriterien auswählen**
1. **Produktvariante auswählen**
1. **Lieferanschrift eingeben**
1. **Zahlungspflichtig bestellen**

**Zahlenfolge für die Kästchen in der Prüfung: 5 – 3 – 1 – 4 – 2**`,
        },
      ],
    },
    {
      nr: '2',
      fragen: [
        {
          id: 'gp-2021-22-winter-08',
          nr: '2.1',
          typ: 'offen',
          art: 'auswahl',
          thema: 'marketing',
          frage: `Welche Aussage zum Katalogversand wird in der Prüfung gesucht?`,
          loesung: `**Gesuchte Auswahl: Antwort 4.**

Die Aussage betrifft den Versand postalischer Katalogwerbung an Kunden, solange kein Werbewiderspruch vorliegt.

**Lernpunkt der Aufgabe:** Postalische Werbung und E-Mail-Werbung werden unterschiedlich behandelt. Die Aussage ist jedoch keine pauschale Erlaubnis, beliebige Adressdaten zu verwenden.

**Weitere wichtige Erkenntnisse:**

- Katalogaktionen müssen bei der Warenplanung berücksichtigt werden.
- Druck- und Versandkosten entstehen auch ohne Bestellung.
- Shopbilder sind nicht automatisch druckgeeignet.
- Ein Katalog ist nicht allein aufgrund seiner gedruckten Form ein verbindliches Vertragsangebot.`,
        },
        {
          id: 'gp-2021-22-winter-09',
          nr: '2.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'sortiment',
          frage: `Welche zwei Aspekte sind bei Produktdaten für einen Printkatalog wichtig?`,
          loesung: `- **Druckgeeignete Bilder:** Auflösung, Qualität und Farbraum müssen zu den Vorgaben der Druckproduktion passen.
- **Angepasste und eindeutige Produktinformationen:** Texte müssen verständlich und ausreichend kurz sein. Varianten sollten über eindeutige Artikelnummern zugeordnet werden können.

**Merksatz:** Produktdaten aus dem Shop können eine Grundlage sein, müssen aber für das Druckmedium geprüft werden.`,
        },
        {
          id: 'gp-2021-22-winter-10',
          nr: '2.3.1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'testing',
          frage: `Welche drei weiteren Schritte gehören neben der Hypothese zur Testvorbereitung?`,
          loesung: `- **Testgruppe und Vergleichsgruppe festlegen:** Beispielsweise zufällig ausgewählte, vergleichbare Kunden.
- **Testzeitraum bestimmen:** Einen ausreichend langen und für beide Gruppen gleichen Zeitraum wählen.
- **Erfolgskennzahlen festlegen:** Beispielsweise Bestellquote, zusätzlicher Umsatz und zusätzlicher Deckungsbeitrag nach Katalogkosten.

**Merksatz:** Vor dem Test festlegen, woran Erfolg gemessen wird.`,
        },
        {
          id: 'gp-2021-22-winter-11',
          nr: '2.3.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'testing',
          frage: `Wie könnte eine überprüfbare Hypothese für den Katalogversand lauten?`,
          loesung: `„Kunden, die den Saisonkatalog erhalten, bestellen innerhalb von vier Wochen im Durchschnitt **15 % häufiger** als vergleichbare Kunden ohne Katalog.“

Damit sind Maßnahme, Vergleich, Zeitraum und erwartete Wirkung konkret benannt.

**Wichtig:** Eine Hypothese ist eine überprüfbare Annahme, noch kein bewiesenes Ergebnis.`,
        },
        {
          id: 'gp-2021-22-winter-12',
          nr: '2.4',
          typ: 'offen',
          art: 'auswahl',
          thema: 'testing',
          frage: `Was bedeutet eine repräsentative Kundenauswahl?`,
          loesung: `Die ausgewählte Gruppe soll die Gesamtgruppe hinsichtlich der **relevanten Merkmale und ihrer Verteilung möglichst gut abbilden**.

**Beispiel:** Altersgruppen, Kaufverhalten und andere für den Test wichtige Merkmale sollten nicht systematisch verzerrt sein.

**Richtige Auswahl: Antwort 3.**

**Merksatz:** Repräsentativ bedeutet nicht automatisch „gleich viele Männer und Frauen“, sondern passend zur untersuchten Grundgesamtheit.`,
        },
        {
          id: 'gp-2021-22-winter-13',
          nr: '2.5',
          typ: 'offen',
          art: 'auswahl',
          thema: 'sortiment',
          frage: `Wie werden die Rucksackgruppen in der ABC-Analyse eingeordnet?`,
          loesung: `Eine ABC-Analyse gruppiert Artikel nach ihrer wirtschaftlichen Bedeutung, hier anhand des **Umsatzanteils**.

| Artikelgruppe | Umsatzanteil | Zuordnung der vorliegenden Lösung |
|---|---|---|
| Tagesrucksäcke | 15,85 % | **B** |
| Trekkingrucksäcke | 38,02 % | **A** |
| Tourenrucksäcke | 28,61 % | **A** |
| Laptoprucksäcke | 13,33 % | **B** |
| Fotorucksäcke | 2,04 % | **C** |
| Fahrradrucksäcke | 2,15 % | **C** |

**Lösungsfolge bei A = 1, B = 2 und C = 3:**

**2 – 1 – 1 – 2 – 3 – 3**

**Grundbedeutung:**

- **A:** Hohe wirtschaftliche Bedeutung.
- **B:** Mittlere wirtschaftliche Bedeutung.
- **C:** Geringe wirtschaftliche Bedeutung.

**Wichtig:** Die konkreten Gruppengrenzen werden festgelegt; es gibt keine für jede ABC-Analyse zwingenden Prozentgrenzen.`,
        },
        {
          id: 'gp-2021-22-winter-14',
          nr: '2.6',
          typ: 'offen',
          art: 'anwenden',
          thema: 'testing',
          frage: `Wie kann man Kunden bei ausverkauften Artikeln auf der Website halten?`,
          loesung: `- **Passende Alternativen anzeigen:** Vergleichbare lieferbare Rucksäcke vorschlagen.
- **Verfügbarkeitsbenachrichtigung anbieten:** Kunden können sich informieren lassen, sobald der gewünschte Artikel wieder erhältlich ist.

**Merksatz:** Eine Nichtverfügbarkeit sollte nicht in einer Sackgasse enden.`,
        },
        {
          id: 'gp-2021-22-winter-15',
          nr: '2.7',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kalkulation',
          frage: `Wie berechnet man den Gewinn der nachbestellten Rucksäcke?

**Gegeben:**

- Verkaufspreis brutto: 298,00 €
- Listeneinkaufspreis netto: 175,00 €
- Kein Lieferantenrabatt bei Nachbestellung
- Lieferantenskonto: 3 %
- Bezugskosten für 100 Stück: 150,00 €
- Handlungskostenzuschlag: 30 %
- Umsatzsteuer: 19 %`,
          loesung: `| Kalkulationsschritt | Berechnung | Betrag |
|---|---|---|
| Listeneinkaufspreis |  | 175,00 € |
| − Lieferantenrabatt | Entfällt | 0,00 € |
| **= Zieleinkaufspreis** |  | **175,00 €** |
| − Lieferantenskonto | 175,00 € × 3 % | 5,25 € |
| **= Bareinkaufspreis** |  | **169,75 €** |
| + Bezugskosten je Stück | 150,00 € ÷ 100 | 1,50 € |
| **= Bezugspreis** |  | **171,25 €** |
| + Handlungskosten | 171,25 € × 30 % | 51,38 € |
| **= Selbstkosten** |  | **222,63 €** |
| Nettoverkaufspreis | 298,00 € ÷ 1,19 | **250,42 €** |
| **Gewinn je Stück** | 250,42 € − 222,63 € | **27,79 €** |

**Gewinnzuschlag:**

> Gewinnzuschlag = Gewinn ÷ Selbstkosten × 100

> 27,79 € ÷ 222,63 € × 100 = **12,48 %**

**Ergebnis: 27,79 € Gewinn je Rucksack**, entsprechend **12,48 % Gewinnzuschlag**.`,
        },
      ],
    },
    {
      nr: '3',
      fragen: [
        {
          id: 'gp-2021-22-winter-16',
          nr: '3.1',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'shopkennzahlen',
          frage: `Was sind KPIs?`,
          loesung: `**KPI = Key Performance Indicator**

KPIs sind besonders wichtige Kennzahlen, mit denen ein Unternehmen die Leistung und Zielerreichung seiner Aktivitäten überwacht und steuert.

**Beispiele:**

Conversion-Rate, Deckungsbeitrag, Kundenakquisitionskosten oder Retourenquote.

**Merksatz:** KPIs sollen zu konkreten Unternehmenszielen passen.`,
        },
        {
          id: 'gp-2021-22-winter-17',
          nr: '3.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'shopkennzahlen',
          frage: `Welche KPIs passen zu den vier Leitfragen?`,
          loesung: `| Leitfrage | Passender KPI | Erklärung |
|---|---|---|
| **Welche Produkte werden am meisten gekauft?** | Absatzmenge je Artikel | Zeigt, wie viele Einheiten eines Artikels verkauft wurden. |
| **Welche Werbung spricht Kunden an?** | Click-Through-Rate – CTR | Zeigt den Anteil der Werbeeinblendungen, die einen Klick auslösen. |
| **Passt das Sortiment zu den Kundeninteressen?** | Nulltrefferquote der Shopsuche | Zeigt, wie häufig Suchanfragen keine Ergebnisse liefern. |
| **Wie viel kostet ein neuer Kunde?** | Customer Acquisition Cost – CAC | Zeigt die durchschnittlichen Kosten für die Gewinnung eines Neukunden. |

**Formeln:**

> CTR = Klicks ÷ Werbeeinblendungen × 100

> Nulltrefferquote = Suchanfragen ohne Ergebnis ÷ gesamte Suchanfragen × 100

> CAC = zurechenbare Akquisitionskosten ÷ gewonnene Neukunden

**Wichtig:** Die tatsächlichen CAC zeigen, was ein Kunde gekostet hat. Wie viel er **kosten darf**, hängt zusätzlich von seinem erwarteten wirtschaftlichen Wert ab.

Nulltreffer können außerdem auf Suchprobleme oder fehlende Synonyme hinweisen, nicht nur auf Sortimentslücken.`,
        },
        {
          id: 'gp-2021-22-winter-18',
          nr: '3.3',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'shopkennzahlen',
          frage: `Was ist Monitoring und wie wird es angewendet?`,
          loesung: `Monitoring bedeutet, ausgewählte Entwicklungen **regelmäßig zu beobachten und mit festgelegten Zielen oder Grenzwerten zu vergleichen**.

**Beispiel:**

Globetrader überwacht wöchentlich die Nulltrefferquote der Shopsuche. Steigt sie deutlich, werden die häufigsten erfolglosen Suchbegriffe untersucht.

**Mögliche Maßnahmen:**

- Synonyme ergänzen,
- Produktdaten verbessern,
- mögliche Sortimentslücken prüfen.

**Merksatz:** Beobachten → Abweichung erkennen → Ursache untersuchen → Maßnahme ableiten.`,
        },
        {
          id: 'gp-2021-22-winter-19',
          nr: '3.4',
          typ: 'offen',
          art: 'anwenden',
          thema: 'werbekennzahlen',
          frage: `Wie unterscheiden sich die Affiliate-Abrechnungsmodelle?`,
          loesung: `| Modell | Vergütung für |
|---|---|
| **CPO – Cost per Order** | Eine Bestellung |
| **CPL – Cost per Lead** | Einen definierten Interessentenkontakt |
| **CPC – Cost per Click** | Einen Klick |
| **CPM – Cost per Mille** | 1.000 Werbeeinblendungen |
| **Lifetime-Vergütung** | Vertraglich vereinbarte Folgeumsätze vermittelter Kunden |

**Achtung zur PDF:** Die letzten Beschreibungen der Zuordnungsaufgabe sind fehlerhaft beziehungsweise nicht eindeutig. Insbesondere beschreibt „pro Bestellung/Lead“ kein CPM-Modell.

Die eingetragene Folge lautet **5 – 3 – 2 – 1 – 1**. Sie ist deshalb nicht als saubere Definition der fünf Modelle geeignet.

**Zum Lernen gelten die Bedeutungen in der Tabelle.**`,
        },
        {
          id: 'gp-2021-22-winter-20',
          nr: '3.5',
          typ: 'offen',
          art: 'auswahl',
          thema: 'werbekennzahlen',
          frage: `Bei welchem Modell liegt das Vergütungsrisiko hauptsächlich beim Affiliate?`,
          loesung: `Beim **CPO-Modell – Cost per Order**.

Der Affiliate kann Besucher vermitteln und Werbeaufwand haben. Eine Vergütung erhält er aber erst, wenn eine vergütungsfähige Bestellung zustande kommt.

**Richtige Auswahl: Antwort 4.**

**Merksatz:** Keine Bestellung bedeutet beim CPO grundsätzlich keine bestellbezogene Provision.`,
        },
        {
          id: 'gp-2021-22-winter-21',
          nr: '3.6',
          typ: 'offen',
          art: 'rechnen',
          thema: 'werbekennzahlen',
          frage: `Wie berechnet man die Gesamtkosten einer CPL-Kampagne?

**Gegeben:**

- 150 vermittelte Website-Besucher
- 30 % hinterlassen ihre E-Mail-Adresse
- Vergütung je Lead: 3,00 €`,
          loesung: `**Schritt 1: Leads**

> 150 × 30 % = **45 Leads**

**Schritt 2: Gesamtkosten**

> 45 × 3,00 € = **135,00 €**

**Ergebnis:** Globetrader bezahlt **135,00 €**, sofern alle 45 Kontakte die vereinbarten Lead-Anforderungen erfüllen.`,
        },
      ],
    },
    {
      nr: '4',
      fragen: [
        {
          id: 'gp-2021-22-winter-22',
          nr: '4.1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'rechnungswesen',
          frage: `Wie unterscheiden sich internes und externes Rechnungswesen?`,
          loesung: `| Merkmal | Internes Rechnungswesen | Externes Rechnungswesen |
|---|---|---|
| **Adressaten und Zweck** | Unternehmensleitung; Planung, Steuerung und Kontrolle | Beispielsweise Gesellschafter, Gläubiger und Finanzbehörden; Information und Rechenschaft |
| **Gestaltung und Vorgaben** | Weitgehend an betrieblichen Informationsbedürfnissen ausgerichtet | Gesetzliche Vorgaben, beispielsweise für Buchführung und Jahresabschluss |

**Beispiele:**

- Intern: Kostenrechnung, Deckungsbeitragsrechnung, Budgetplanung.
- Extern: Finanzbuchführung, Bilanz, Gewinn-und-Verlust-Rechnung.`,
        },
        {
          id: 'gp-2021-22-winter-23',
          nr: '4.2.1',
          typ: 'offen',
          art: 'rechnen',
          thema: 'rechnungswesen',
          frage: `Wie berechnet man das Eigenkapital aus den Bilanzwerten?`,
          loesung: `**Formel:**

> Eigenkapital = Vermögen − Schulden

**Vermögen:**

| Position | Betrag |
|---|---|
| Betriebs- und Geschäftsausstattung | 340.000,00 € |
| Grundstücke | 450.000,00 € |
| Bankguthaben | 52.000,00 € |
| Warenbestände | 830.000,00 € |
| Forderungen | 210.000,00 € |
| Kasse | 8.000,00 € |
| Fuhrpark | 190.000,00 € |
| **Summe Vermögen** | **2.080.000,00 €** |

**Schulden:**

913.000,00 € Bankverbindlichkeiten

- 200.000,00 € Verbindlichkeiten aus Lieferungen und Leistungen
- 40.000,00 € Umsatzsteuerschuld = **1.153.000,00 €**

**Eigenkapital:**

> 2.080.000,00 € − 1.153.000,00 € = **927.000,00 €**`,
        },
        {
          id: 'gp-2021-22-winter-24',
          nr: '4.2.2',
          typ: 'offen',
          art: 'rechnen',
          thema: 'rechnungswesen',
          frage: `Wie berechnet man die Liquidität ersten Grades?`,
          loesung: `**Formel:**

> Liquidität 1. Grades = flüssige Mittel ÷ kurzfristige Verbindlichkeiten × 100

**Flüssige Mittel:**

> 52.000,00 € Bank + 8.000,00 € Kasse = **60.000,00 €**

**In der PDF eingetragene Rechnung:**

> 60.000,00 € ÷ 200.000,00 € × 100 = **30 %**

**Fachliche Ergänzung:** Die aufgeführte Umsatzsteuerschuld von 40.000,00 € ist normalerweise ebenfalls kurzfristig. Unter Einbeziehung dieser Schuld ergibt sich:

> 60.000,00 € ÷ 240.000,00 € × 100 = **25 %**

**Für deine Unterlagen:**

- **Eingetragene Lösung: 30 %**
- **Mit kurzfristiger Umsatzsteuerschuld: 25 %**

Die Laufzeit der Bankverbindlichkeiten ist nicht angegeben. Ein kurzfristiger Anteil müsste gegebenenfalls zusätzlich berücksichtigt werden.`,
        },
        {
          id: 'gp-2021-22-winter-25',
          nr: '4.3',
          typ: 'offen',
          art: 'auswahl',
          thema: 'rechnungswesen',
          frage: `Welche Veränderung kann die Liquidität zweiten Grades verschlechtern?`,
          loesung: `Ein Anstieg der **Verbindlichkeiten aus Lieferungen und Leistungen**, während die übrigen Werte gleich bleiben.

**Richtige Auswahl: Antwort 4.**

**Formel:**

> Liquidität 2. Grades =
> (fl üssige Mittel + kurzfristige Forderungen) ÷ kurzfristige Verbindlichkeiten × 100

**Erklärung:** Der Nenner steigt, während der Zähler unverändert bleibt. Die Kennzahl sinkt.`,
        },
        {
          id: 'gp-2021-22-winter-26',
          nr: '4.4',
          typ: 'offen',
          art: 'auswahl',
          thema: 'rechnungswesen',
          frage: `Welches Controlling-Instrument vergleicht geplante und tatsächliche Verkäufe?`,
          loesung: `Der **Soll-Ist-Vergleich**.

**Richtige Auswahl: Antwort 1.**

**Beispiel Juni:**

- Geplant: 120 Zelte
- Tatsächlich verkauft: 100 Zelte

**Abweichung:**

> Ist − Soll = 100 − 120 = **−20 Zelte**

**Prozentuale Abweichung:**

> −20 ÷ 120 × 100 = **−16,67 %**

**Merksatz:** Der Vergleich zeigt Abweichungen. Ihre Ursachen müssen anschließend untersucht werden.`,
        },
        {
          id: 'gp-2021-22-winter-27',
          nr: '4.5',
          typ: 'offen',
          art: 'anwenden',
          thema: 'analyse',
          frage: `Welche Bedeutung hat Benchmarking? Nennen Sie zwei Aspekte.`,
          loesung: `Benchmarking ist der systematische Vergleich eigener Leistungen oder Prozesse mit geeigneten Vergleichsunternehmen beziehungsweise besonders guten Lösungen.

- **Eigene Position erkennen:** Beispielsweise Preise, Service und Produktleistung der Eigenmarke mit Wettbewerbsangeboten vergleichen.
- **Verbesserungen ableiten:** Erkenntnisse nutzen, um Qualität, Abläufe oder Kundenservice gezielt weiterzuentwickeln.

**Merksatz:** Vergleichen, Unterschiede verstehen und daraus Verbesserungen ableiten.`,
        },
        {
          id: 'gp-2021-22-winter-28',
          nr: '4.6',
          typ: 'offen',
          art: 'rechnen',
          thema: 'kostenrechnung',
          frage: `Wie berechnet man die Gewinnschwellenmenge des Outdoorzelts?

**Gegeben:**

- Verkaufspreis je Stück: 96,00 €
- Variable Stückkosten: 71,00 €
- Fixkosten: 60.000,00 €`,
          loesung: `**Schritt 1: Stückdeckungsbeitrag**

> 96,00 € − 71,00 € = **25,00 €**

**Schritt 2: Gewinnschwellenmenge**

> Gewinnschwellenmenge = Fixkosten ÷ Stückdeckungsbeitrag

> 60.000,00 € ÷ 25,00 € = **2.400 Zelte**

**Kontrolle:**

Erlöse:
2.400 × 96,00 € = **230.400,00 €**

Gesamtkosten:
60.000,00 € + 2.400 × 71,00 € = **230.400,00 €**

**Ergebnis:** Bei **2.400 verkauften Zelten** sind alle Kosten gedeckt. Ab dem **2.401. Zelt** entsteht unter den gegebenen Bedingungen Gewinn.`,
        },
        {
          id: 'gp-2021-22-winter-29',
          nr: '4.7',
          typ: 'offen',
          art: 'auswahl',
          thema: 'kostenrechnung',
          frage: `Wie ermittelt man die kurzfristige Preisuntergrenze?`,
          loesung: `Man ermittelt die **variablen Kosten je Stück**.

**Richtige Auswahl: Antwort 4.**

**Formel:**

> Kurzfristige Preisuntergrenze = variable Stückkosten

**Beim Outdoorzelt:**

**71,00 € je Stück**

Bei diesem Preis werden nur die variablen Kosten gedeckt. Der Stückdeckungsbeitrag beträgt **0 €**.

**Merksatz:** Die kurzfristige Preisuntergrenze deckt keine Fixkosten und ist deshalb keine dauerhaft tragfähige Preisbasis.`,
        },
      ],
    },
  ],
};
