// Beispielklausur zum Ausprobieren der App. Die Aufgaben sind selbst
// geschrieben und stammen aus keiner echten Prüfung. Sobald die ersten
// echten Klausuren eingepflegt sind, kann diese Datei weg.
export default {
  id: 'beispiel',
  titel: 'Beispielklausur',
  bereich: 'gp',
  termin: 'zum Ausprobieren',
  dauer: 30,
  beispiel: true,
  situation: `Sie arbeiten bei der **Gartenwelt Nord GmbH** in Kiel. Das Unternehmen verkauft Gartenmöbel und Gartenzubehör über einen eigenen Onlineshop und zusätzlich über einen großen Online-Marktplatz.`,
  aufgaben: [
    {
      nr: '1',
      titel: 'Rechtliche Vorgaben im Onlineshop',
      situation: 'Ihre Abteilungsleiterin bittet Sie, die rechtlichen Angaben im Shop zu überprüfen.',
      fragen: [
        {
          id: 'beispiel-1a',
          nr: '1a',
          typ: 'mc',
          thema: 'onlinerecht',
          punkte: 2,
          frage: 'Eine Kundin hat einen Gartenstuhl im Onlineshop bestellt und wurde ordnungsgemäß über ihr Widerrufsrecht belehrt. Wann endet die Widerrufsfrist?',
          optionen: [
            '14 Tage nach Vertragsschluss',
            '14 Tage nach Erhalt der Ware',
            '30 Tage nach Erhalt der Ware',
            'Einen Monat nach der Bestellung',
            'Gar nicht, wenn die AGB ein Widerrufsrecht ausschließen',
          ],
          richtig: [1],
          erklaerung: 'Bei Waren beginnt die 14-tägige Widerrufsfrist mit dem Erhalt der Ware (§ 355 Abs. 2, § 356 Abs. 2 BGB). Ein Ausschluss in den AGB ist gegenüber Verbrauchern unwirksam.',
        },
        {
          id: 'beispiel-1b',
          nr: '1b',
          typ: 'mc',
          thema: 'onlinerecht',
          punkte: 2,
          frage: 'Bei welchen **zwei** Bestellungen besteht kein Widerrufsrecht?',
          optionen: [
            'Gartenstuhl aus dem Standardsortiment',
            'Markise, die nach den Maßen des Kunden angefertigt wurde',
            'Schnittblumen für den Wintergarten',
            'Sonnenschirm aus dem Sonderangebot',
            'Rasenmäher, den der Kunde nach Erhalt ausprobiert hat',
          ],
          richtig: [1, 2],
          erklaerung: 'Ausgeschlossen sind unter anderem Waren, die nach Kundenwünschen angefertigt werden, und Waren, die schnell verderben (§ 312g Abs. 2 BGB). Sonderangebote haben ein normales Widerrufsrecht. Für das Ausprobieren des Rasenmähers kann der Shop höchstens Wertersatz verlangen.',
        },
        {
          id: 'beispiel-1c',
          nr: '1c',
          typ: 'offen',
          thema: 'onlinerecht',
          punkte: 3,
          frage: 'Nennen Sie drei Angaben, die im Impressum des Onlineshops der Gartenwelt Nord GmbH stehen müssen.',
          loesung: `Drei der folgenden Angaben:
- Firma mit Rechtsform (Gartenwelt Nord GmbH)
- vollständige Anschrift (kein Postfach)
- vertretungsberechtigte Person, hier die Geschäftsführung
- E-Mail-Adresse und eine weitere schnelle Kontaktmöglichkeit, z. B. Telefon
- Registergericht und Handelsregisternummer
- Umsatzsteuer-Identifikationsnummer, falls vorhanden`,
          erklaerung: 'Grundlage ist § 5 Digitale-Dienste-Gesetz (früher § 5 TMG). Für jede richtige Angabe gibt es einen Punkt.',
        },
      ],
    },
    {
      nr: '2',
      titel: 'Kennzahlen des Onlineshops',
      situation: `Für den Monat Mai liegen folgende Zahlen aus der Webanalyse vor:

| Kennzahl | Mai |
|---|---|
| Besuche (Sitzungen) | 48.000 |
| Bestellungen | 1.200 |
| Umsatz (netto) | 72.000,00 € |
| Retournierte Bestellungen | 180 |`,
      fragen: [
        {
          id: 'beispiel-2a',
          nr: '2a',
          typ: 'zahl',
          thema: 'kennzahlen',
          punkte: 2,
          frage: 'Berechnen Sie die Konversionsrate (Conversion Rate) im Mai in Prozent.',
          ergebnis: 2.5,
          einheit: '%',
          toleranz: 0.01,
          erklaerung: 'Konversionsrate = Bestellungen ÷ Besuche × 100 = 1.200 ÷ 48.000 × 100 = **2,5 %**.',
        },
        {
          id: 'beispiel-2b',
          nr: '2b',
          typ: 'zahl',
          thema: 'kennzahlen',
          punkte: 2,
          frage: 'Berechnen Sie den durchschnittlichen Bestellwert (Warenkorbwert) im Mai.',
          ergebnis: 60,
          einheit: '€',
          toleranz: 0.01,
          erklaerung: 'Durchschnittlicher Bestellwert = Umsatz ÷ Bestellungen = 72.000 € ÷ 1.200 = **60,00 €**.',
        },
        {
          id: 'beispiel-2c',
          nr: '2c',
          typ: 'zahl',
          thema: 'kennzahlen',
          punkte: 2,
          frage: 'Berechnen Sie die Retourenquote im Mai in Prozent.',
          ergebnis: 15,
          einheit: '%',
          toleranz: 0.01,
          erklaerung: 'Retourenquote = retournierte Bestellungen ÷ Bestellungen × 100 = 180 ÷ 1.200 × 100 = **15 %**.',
        },
        {
          id: 'beispiel-2d',
          nr: '2d',
          typ: 'mc',
          thema: ['logistik', 'vertriebskanaele'],
          punkte: 2,
          frage: 'Welche Maßnahme senkt die Retourenquote bei Gartenmöbeln am ehesten?',
          optionen: [
            'Kostenlosen Rückversand anbieten',
            'Genaue Maßangaben, Materialbeschreibungen und Fotos aus mehreren Blickwinkeln zeigen',
            'Die Widerrufsfrist freiwillig auf 30 Tage verlängern',
            'Häufiger Newsletter mit Rabattcodes versenden',
            'Zahlung per Rechnung abschaffen',
          ],
          richtig: [1],
          erklaerung: 'Viele Rücksendungen entstehen, weil die Ware nicht den Erwartungen entspricht. Genaue Produktinformationen verringern diese Lücke. Kostenloser Rückversand und längere Fristen erhöhen die Quote eher.',
        },
      ],
    },
    {
      nr: '3',
      titel: 'Online-Marketing',
      fragen: [
        {
          id: 'beispiel-3a',
          nr: '3a',
          typ: 'zuordnung',
          thema: 'marketing',
          punkte: 4,
          frage: 'Ordnen Sie die Maßnahmen den Begriffen zu.',
          optionen: ['Suchmaschinenoptimierung (SEO)', 'Suchmaschinenwerbung (SEA)', 'Affiliate-Marketing', 'Retargeting'],
          aussagen: [
            { text: 'Für ausgewählte Suchbegriffe erscheinen bezahlte Anzeigen über den Suchergebnissen.', richtig: 1 },
            { text: 'Ein Garten-Blog erhält eine Provision für jeden Verkauf, der über seinen Link zustande kommt.', richtig: 2 },
            { text: 'Besucher, die den Shop ohne Kauf verlassen haben, sehen auf anderen Websites Werbung für die angesehenen Produkte.', richtig: 3 },
            { text: 'Die Produkttexte werden überarbeitet, damit der Shop in den unbezahlten Suchergebnissen weiter oben erscheint.', richtig: 0 },
          ],
          erklaerung: 'SEO verbessert die unbezahlte Platzierung, SEA kauft Anzeigenplätze, beim Affiliate-Marketing werben Partner gegen Provision, Retargeting spricht frühere Besucher erneut an.',
        },
        {
          id: 'beispiel-3b',
          nr: '3b',
          typ: 'offen',
          thema: 'vertriebskanaele',
          punkte: 3,
          frage: 'Erläutern Sie zwei Vorteile und einen Nachteil, die der Verkauf über einen Online-Marktplatz im Vergleich zum eigenen Onlineshop hat.',
          loesung: `**Vorteile** (zwei davon):
- große Reichweite, viele Kunden suchen direkt auf dem Marktplatz
- Vertrauen der Kunden in die bekannte Plattform
- wenig eigener Aufwand für Technik, Zahlungsabwicklung und oft auch Versand

**Nachteile** (einer davon):
- Verkaufsprovisionen und Gebühren schmälern die Marge
- starker Preisvergleich mit Wettbewerbern auf derselben Seite
- Abhängigkeit von den Regeln des Marktplatzes, kaum eigene Kundendaten`,
          erklaerung: 'Für jeden passend erläuterten Punkt gibt es einen Punkt. Nur ein Stichwort ohne Erläuterung zählt in der Prüfung meist nur halb.',
        },
      ],
    },
    {
      nr: '4',
      titel: 'Auftragsabwicklung und Kalkulation',
      fragen: [
        {
          id: 'beispiel-4a',
          nr: '4a',
          typ: 'reihenfolge',
          thema: 'logistik',
          punkte: 3,
          frage: 'Bringen Sie die Schritte der Auftragsabwicklung bei Zahlung per Vorkasse in die richtige Reihenfolge.',
          schritte: [
            { text: 'Ware im Lager kommissionieren', pos: 3 },
            { text: 'Bestellung geht im Onlineshop ein', pos: 1 },
            { text: 'Versandbestätigung mit Sendungsnummer an den Kunden senden', pos: 5 },
            { text: 'Zahlungseingang prüfen', pos: 2 },
            { text: 'Paket packen und Versandetikett drucken', pos: 4 },
          ],
          erklaerung: 'Bei Vorkasse wird erst nach dem Zahlungseingang kommissioniert. Die Versandbestätigung geht raus, sobald das Paket übergeben ist.',
        },
        {
          id: 'beispiel-4b',
          nr: '4b',
          typ: 'zahl',
          thema: 'kalkulation',
          punkte: 3,
          frage: `Ein Lieferant bietet einen Loungesessel an:
- Listeneinkaufspreis 200,00 €
- Liefererrabatt 10 %
- Liefererskonto 2 %
- Bezugskosten 8,40 € pro Stück

Berechnen Sie den Bezugspreis pro Stück.`,
          ergebnis: 184.8,
          einheit: '€',
          toleranz: 0.01,
          erklaerung: `- Listeneinkaufspreis 200,00 € − 10 % Rabatt (20,00 €) = Zieleinkaufspreis 180,00 €
- 180,00 € − 2 % Skonto (3,60 €) = Bareinkaufspreis 176,40 €
- 176,40 € + 8,40 € Bezugskosten = **Bezugspreis 184,80 €**`,
        },
      ],
    },
    {
      nr: '5',
      titel: 'Newsletter',
      fragen: [
        {
          id: 'beispiel-5a',
          nr: '5a',
          typ: 'mc',
          thema: 'datenschutz',
          punkte: 2,
          frage: 'Der Shop möchte einen Newsletter einführen. Was versteht man unter dem Double-Opt-in-Verfahren?',
          optionen: [
            'Kunden müssen den Newsletter zweimal abbestellen, bevor er endet.',
            'Nach der Anmeldung erhält die Person eine E-Mail und bestätigt die Anmeldung über einen Link.',
            'Jeder Kunde, der zweimal bestellt hat, wird automatisch eingetragen.',
            'Die Einwilligung wird in den AGB und im Impressum erwähnt.',
            'Der Newsletter wird nur an Bestandskunden verschickt.',
          ],
          richtig: [1],
          erklaerung: 'Mit dem Bestätigungslink weist der Shop nach, dass die Inhaberin der E-Mail-Adresse selbst eingewilligt hat (Art. 7 DSGVO, § 7 UWG).',
        },
      ],
    },
  ],
};
