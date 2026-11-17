// AP2 Kundenkommunikation Winter 2021/22 – Allgemeine Lernfragen und Antworten
// Fragen und Musterlösungen aus der Vorlage, automatisch übernommen
// (Konverter: tools/import). Frage-ids nicht ändern.
export default {
  id: 'kk-2021-22-winter',
  titel: 'Winter 2021/22',
  bereich: 'kk',
  sortierung: 2021.5,
  quelle: 'Musterlösung',
  aufgaben: [
    {
      nr: '1',
      fragen: [
        {
          id: 'kk-2021-22-winter-01',
          nr: '1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Wie kann ein Unternehmen Ausgangsrechnungen und Zahlungseingänge überwachen?`,
          loesung: `Durch eine **Offene-Posten-Liste** in der Buchhaltungssoftware. Sie zeigt, welche Rechnungen noch unbezahlt und wann sie fällig sind. Zahlungseingänge werden regelmäßig mit den offenen Rechnungen abgeglichen.`,
        },
        {
          id: 'kk-2021-22-winter-02',
          nr: '2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Wann gerät ein Kunde in Zahlungsverzug?`,
          loesung: `Grundsätzlich, wenn eine Forderung fällig ist und der Kunde trotz Mahnung nicht zahlt, obwohl er die Nichtzahlung zu vertreten hat.

Eine Mahnung kann beispielsweise entfallen, wenn ein Zahlungstermin vertraglich kalendermäßig festgelegt wurde. Bei Entgeltforderungen tritt Verzug spätestens **30 Tage nach Fälligkeit und Rechnungseingang** ein. Für Verbraucher gilt diese Regel nur bei einem entsprechenden Hinweis in der Rechnung.`,
        },
        {
          id: 'kk-2021-22-winter-03',
          nr: '3',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'zahlung',
          frage: `Was ist eine Mahnung?`,
          loesung: `Eine Mahnung ist die eindeutige Aufforderung an einen Schuldner, eine bereits fällige Leistung zu erbringen, beispielsweise eine offene Rechnung zu bezahlen.`,
        },
        {
          id: 'kk-2021-22-winter-04',
          nr: '4',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Wie kann ein kaufmännisches Mahnverfahren aufgebaut sein?`,
          loesung: `1. **Zahlungserinnerung:** Freundlich auf die offene Rechnung hinweisen.
1. **Mahnung:** Eindeutig zur Zahlung auffordern und eine Zahlungsfrist setzen.
1. **Letzte Zahlungsaufforderung:** Eine letzte Frist setzen und weitere Schritte ankündigen.
1. **Weitere Schritte prüfen:** Beispielsweise ein gerichtliches Mahnverfahren einleiten.

**Wichtig:** Drei Mahnungen sind gesetzlich nicht vorgeschrieben.`,
        },
        {
          id: 'kk-2021-22-winter-05',
          nr: '5',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Welche Voraussetzungen müssen für ein gerichtliches Mahnverfahren vorliegen?`,
          loesung: `- Es geht um die Zahlung einer **bestimmten Geldsumme in Euro**.
- Die Forderung ist fällig und darf nicht von einer noch ausstehenden Gegenleistung des Gläubigers abhängen.

**Wichtig:** Ein vorheriges erfolgloses kaufmännisches Mahnverfahren ist keine zwingende Voraussetzung.`,
        },
        {
          id: 'kk-2021-22-winter-06',
          nr: '6',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Wie wird der gesetzliche Verzugszinssatz bestimmt?`,
          loesung: `- **Bei Beteiligung eines Verbrauchers:** Basiszinssatz plus **5 Prozentpunkte**.
- **Bei Entgeltforderungen ohne Beteiligung eines Verbrauchers:** Basiszinssatz plus **9 Prozentpunkte**.

**Beispiel mit dem historischen Basiszinssatz der Aufgabe:**

> −0,88 % + 9 Prozentpunkte = 8,12 %`,
        },
        {
          id: 'kk-2021-22-winter-07',
          nr: '7',
          typ: 'offen',
          art: 'rechnen',
          thema: 'zahlung',
          frage: `Wie berechnet man Verzugszinsen und den insgesamt offenen Betrag?`,
          loesung: `Bei taggenauer Berechnung mit 365 Tagen:

> Verzugszinsen = offener Betrag × Zinssatz in Prozent × Verzugstage ÷ (100 × 365)

Beispiel:

> 3.084,48 × 8,12 × 45 ÷ (100 × 365) = 30,88 €

> Gesamtbetrag = Rechnungsbetrag + Verzugszinsen + berechtigte Mahnkosten

Mit den vorgegebenen Mahnkosten der Aufgabe:

> 3.084,48 + 30,88 + 68,00 = **3.183,36 €**`,
        },
        {
          id: 'kk-2021-22-winter-08',
          nr: '8',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Wie wirkt sich eine Teilzahlung auf die Verjährung einer Forderung aus?`,
          loesung: `Eine Teilzahlung kann ein **Anerkenntnis der Forderung** darstellen. Dadurch beginnt die Verjährungsfrist erneut.

Die regelmäßige Verjährungsfrist beträgt **drei Jahre**. Beim Neubeginn durch Anerkenntnis wird grundsätzlich vom Anerkenntnis aus gerechnet, nicht erst vom Jahresende.`,
        },
        {
          id: 'kk-2021-22-winter-09',
          nr: '9',
          typ: 'offen',
          art: 'anwenden',
          thema: 'retouren',
          frage: `Welche kunden- und händlerseitigen Retourengründe gibt es, und wie können Retouren reduziert werden?`,
          loesung: `| Ursache | Beispiel für einen Retourengrund | Geeignete Maßnahme |
|---|---|---|
| Kundenseitig | Der Artikel gefällt nicht. | Aussagekräftige Bilder und realistische Produktbeschreibungen anbieten. |
| Kundenseitig | Mehrere Varianten wurden zur Auswahl bestellt. | Vergleichsmöglichkeiten und individuelle Auswahlberatung anbieten. |
| Händlerseitig | Die Lieferung kommt zu spät. | Lieferzeiten zuverlässig planen und Verzögerungen früh mitteilen. |
| Händlerseitig | Die Ware kommt beschädigt an. | Eine geeignete Verpackung und sorgfältige Versandkontrolle sicherstellen. |`,
        },
        {
          id: 'kk-2021-22-winter-10',
          nr: '10',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kommunikation',
          frage: `Welche vier Seiten einer Nachricht unterscheidet das Vier-Ohren-Modell?`,
          loesung: `- **Sachinhalt:** Worüber wird informiert?
- **Selbstoffenbarung:** Was zeigt der Sprecher über seine Gefühle oder Bedürfnisse?
- **Beziehung:** Wie steht der Sprecher zum Empfänger und wie behandelt er ihn?
- **Appell:** Was möchte der Sprecher beim Empfänger erreichen?

**Merksatz:** Sache – Selbstoffenbarung – Beziehung – Appell.`,
        },
        {
          id: 'kk-2021-22-winter-11',
          nr: '11',
          typ: 'offen',
          art: 'anwenden',
          thema: 'beschwerde',
          frage: `Wie sollte eine kundenorientierte Antwort auf eine Beschwerde aufgebaut sein?`,
          loesung: `- Aussagekräftiger Betreff und persönliche Anrede.
- Für die Rückmeldung bedanken.
- Verständnis zeigen und sich gegebenenfalls entschuldigen.
- Den Sachverhalt verständlich erklären.
- Einen konkreten Lösungsvorschlag anbieten.
- Das Einverständnis des Kunden einholen.
- Mit einer freundlichen Grußformel abschließen.`,
        },
        {
          id: 'kk-2021-22-winter-12',
          nr: '12',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kommunikation',
          frage: `Welche Methoden der Einwandbehandlung können im Kundengespräch eingesetzt werden?`,
          loesung: `- **Verständnis zeigen:** „Ich verstehe, dass Ihnen der zusätzliche Aufwand wichtig ist.“
- **Ja-aber-Methode:** Den Einwand anerkennen und anschließend einen anderen Gesichtspunkt nennen: „Ja, die Montage kostet Zeit. Dafür fällt der Kaufpreis niedriger aus.“
- **Bumerang-Methode:** Den Einwand aufgreifen und als Vorteil darstellen: „Gerade die Lieferung in Einzelteilen ermöglicht es Ihnen, das Gerät leichter durch enge Türen zu transportieren.“`,
        },
        {
          id: 'kk-2021-22-winter-13',
          nr: '13',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kommunikation',
          frage: `Warum sind offene Fragen bei einer Beschwerde hilfreich? Nennen Sie drei Gründe.`,
          loesung: `- **Mehr Informationen:** Der Kunde kann seine Situation ausführlich schildern.
- **Besseres Verständnis:** Ursachen, Erwartungen und Wünsche werden deutlicher.
- **Gemeinsame Lösung:** Der Kunde fühlt sich ernst genommen und wird in die Lösungsfindung einbezogen.

**Beispiel:** „Welche Lösung würde Ihnen in dieser Situation am meisten helfen?“`,
        },
        {
          id: 'kk-2021-22-winter-14',
          nr: '14',
          typ: 'offen',
          art: 'anwenden',
          thema: 'beschwerde',
          frage: `Warum sollte ein Unternehmen sein Beschwerdemanagement verbessern? Nennen Sie zwei Gründe.`,
          loesung: `- **Kunden halten:** Eine faire und schnelle Lösung kann Vertrauen wiederherstellen und Abwanderung verhindern.
- **Fehler vermeiden:** Die Auswertung von Beschwerden zeigt Schwachstellen, sodass Produkte und Abläufe verbessert werden können.`,
        },
        {
          id: 'kk-2021-22-winter-15',
          nr: '15',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kanaele',
          frage: `Welche Besonderheiten hat schriftliche digitale Kommunikation im Vergleich zum persönlichen Gespräch? Nennen Sie drei.`,
          loesung: `- **Weniger Ausdrucksmöglichkeiten:** Mimik, Gestik und Tonfall fehlen häufig. Dadurch können Missverständnisse entstehen.
- **Zeitversetzter Austausch:** Beispielsweise bei E-Mails müssen die Beteiligten nicht gleichzeitig verfügbar sein.
- **Technische Abhängigkeit:** Geräte, Software und eine funktionierende Verbindung sind erforderlich.`,
        },
        {
          id: 'kk-2021-22-winter-16',
          nr: '16',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kanaele',
          frage: `Welche zwei digitalen Kommunikationskanäle ermöglichen einen persönlicheren Kundenkontakt?`,
          loesung: `- **Livechat mit Mitarbeitern:** Kunden erhalten direkte, individuell auf ihr Anliegen abgestimmte Antworten.
- **Videoberatung:** Persönliche Beratung mit sichtbarem Ansprechpartner ermöglicht auch die Erklärung oder Vorführung von Produkten.`,
        },
        {
          id: 'kk-2021-22-winter-17',
          nr: '17',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'kommunikation',
          frage: `Was unterscheidet Inhalts- und Beziehungsebene einer Nachricht?`,
          loesung: `- **Inhaltsebene:** Die sachlichen Informationen, beispielsweise Preis, Liefertermin oder Produktdaten.
- **Beziehungsebene:** Wie die Beteiligten zueinander stehen, beispielsweise ob Vertrauen, Wertschätzung oder Misstrauen vermittelt wird.

**Merksatz:** Inhalt = Was wird gesagt? Beziehung = Wie stehen wir zueinander?`,
        },
        {
          id: 'kk-2021-22-winter-18',
          nr: '18',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kommunikation',
          frage: `Wie lassen sich Inhalts- und Beziehungsebene an einer Beschwerde erkennen?`,
          loesung: `**Beispiel:** „Meine Lieferung ist immer noch nicht angekommen. Nehmen Sie mein Anliegen überhaupt ernst?“

- **Inhaltsebene:** Die Lieferung ist bisher nicht eingetroffen.
- **Beziehungsebene:** Der Kunde fühlt sich nicht ausreichend beachtet und zweifelt an der Zuverlässigkeit des Unternehmens.`,
        },
        {
          id: 'kk-2021-22-winter-19',
          nr: '19',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kanaele',
          frage: `Welche drei Vorteile bietet die Kommunikation per E-Mail?`,
          loesung: `- **Zeitliche Flexibilität:** Empfänger können Nachrichten zu einem passenden Zeitpunkt lesen und beantworten.
- **Nachvollziehbarkeit:** Informationen und Absprachen bleiben schriftlich dokumentiert.
- **Einfacher Dateiversand:** Bilder, Rechnungen und andere Unterlagen können als Anhang übermittelt werden.`,
        },
        {
          id: 'kk-2021-22-winter-20',
          nr: '20',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'kanaele',
          frage: `Was ist eine Cross-Channel-Kommunikationsstrategie und warum ist sie sinnvoll?`,
          loesung: `Bei einer Cross-Channel-Kommunikationsstrategie werden verschiedene Kommunikationskanäle miteinander verbunden.

Ein Kunde kann beispielsweise eine Anfrage per E-Mail beginnen und anschließend telefonisch weiterklären. Die bisherigen Informationen stehen dem zuständigen Mitarbeiter zur Verfügung.

**Vorteil:** Der Kunde kann den Kanal wechseln, ohne sein Anliegen jedes Mal vollständig neu erklären zu müssen.`,
        },
      ],
    },
  ],
};
