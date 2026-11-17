// =====================================================================
//  Fächer (Prüfungsbereiche), Themen, Aufgabenarten
//
//  Jede Klausur gehört zu einem Fach (Feld bereich), jede Frage zu einem
//  oder mehreren Themen (Feld thema). Neue Themen hier ergänzen, die id
//  danach nicht mehr ändern: An ihr hängen Filter und Auswertungen.
// =====================================================================

export const BEREICHE = [
  { id: 'gp', name: 'Geschäftsprozesse im E-Commerce', kurz: 'Geschäftsprozesse' },
  { id: 'kk', name: 'Kundenkommunikation im E-Commerce', kurz: 'Kundenkommunikation' },
  { id: 'wiso', name: 'Wirtschafts- und Sozialkunde', kurz: 'WiSo' },
];

export const THEMEN = [
  // Geschäftsprozesse im E-Commerce
  { id: 'vertrieb', name: 'Vertriebskanäle und Marktplätze' },
  { id: 'sortiment', name: 'Sortiment und Produktdaten' },
  { id: 'kalkulation', name: 'Kalkulation, Preise und Angebotsvergleich' },
  { id: 'kostenrechnung', name: 'Kosten- und Leistungsrechnung' },
  { id: 'rechnungswesen', name: 'Rentabilität, Liquidität und Controlling' },
  { id: 'shopkennzahlen', name: 'Shop-Kennzahlen und Webanalyse' },
  { id: 'customerjourney', name: 'Customer Journey und Conversion-Funnel' },
  { id: 'testing', name: 'Tests, Hypothesen und Conversion-Optimierung' },
  { id: 'marketing', name: 'Marketingstrategie und Werbeplanung' },
  { id: 'onlinewerbung', name: 'Suchmaschinen- und Displaywerbung' },
  { id: 'werbekennzahlen', name: 'Werbekennzahlen und Abrechnungsmodelle' },
  { id: 'socialmedia', name: 'Social Media und Influencer' },
  { id: 'emailmarketing', name: 'E-Mail- und Newsletter-Marketing' },
  { id: 'analyse', name: 'Marktforschung und Analyseinstrumente' },
  { id: 'projekt', name: 'Projektmanagement' },
  { id: 'recht', name: 'Recht im E-Commerce' },
  // Kundenkommunikation im E-Commerce
  { id: 'kaufvertrag', name: 'Kaufvertrag und Vertragsarten' },
  { id: 'stoerungen', name: 'Lieferverzug und Annahmeverzug' },
  { id: 'maengel', name: 'Mangelhafte Lieferung und Gewährleistung' },
  { id: 'zahlung', name: 'Rechnung, Zahlungsverzug und Mahnwesen' },
  { id: 'retouren', name: 'Widerruf und Retourenmanagement' },
  { id: 'beschwerde', name: 'Reklamations- und Beschwerdemanagement' },
  { id: 'kommunikation', name: 'Kommunikationsmodelle und Gesprächsführung' },
  { id: 'kanaele', name: 'Servicekanäle: Chat, FAQ, E-Mail, Telefon' },
  { id: 'socialservice', name: 'Social Media im Kundenservice' },
  { id: 'kundenbindung', name: 'Kundenbindung, CRM und Befragungen' },
  { id: 'servicekennzahlen', name: 'Ziele und Kennzahlen im Kundenservice' },
];

/** Wie die Frage in der Prüfung gestellt war (Feld art). */
export const ARTEN = {
  rechnen: 'Rechenaufgabe',
  auswahl: 'Auswahlaufgabe',
  erklaeren: 'Begriff erklären',
  anwenden: 'Fallbezogen anwenden',
};

export const ARTEN_INFO = {
  rechnen: 'Berechnen mit Rechenweg, z. B. Kalkulation, Deckungsbeitrag, Kennzahlen.',
  auswahl: 'In der Prüfung gebunden: richtige Antwort ankreuzen, zuordnen oder Reihenfolge festlegen.',
  erklaeren: 'Einen Fachbegriff erklären oder abgrenzen.',
  anwenden: 'Nennen, erläutern, beurteilen oder empfehlen, bezogen auf die Situation im Unternehmen.',
};

/** Wie die App eine Antwort auswertet (Feld typ). */
export const TYPEN = {
  mc: 'Multiple Choice',
  zuordnung: 'Zuordnung',
  reihenfolge: 'Reihenfolge',
  zahl: 'Rechenaufgabe',
  offen: 'Freie Antwort',
};
