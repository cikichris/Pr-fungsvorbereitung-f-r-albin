// =====================================================================
//  Prüfungsbereiche, Themen und Fragetypen
//
//  Jede Frage einer Klausur gehört zu einem Prüfungsbereich (über die
//  Klausur) und zu einem oder mehreren Themen (Feld thema). Neue Themen
//  hier ergänzen, die id danach nicht mehr ändern.
// =====================================================================

export const BEREICHE = [
  { id: 'teil1', name: 'Sortimentsbewirtschaftung und Vertragsanbahnung', kurz: 'Teil 1' },
  { id: 'gp', name: 'Geschäftsprozesse im E-Commerce', kurz: 'Geschäftsprozesse' },
  { id: 'wiso', name: 'Wirtschafts- und Sozialkunde', kurz: 'WiSo' },
];

export const THEMEN = [
  // E-Commerce
  { id: 'sortiment', name: 'Sortiment und Warenwirtschaft' },
  { id: 'beschaffung', name: 'Beschaffung und Lieferanten' },
  { id: 'kaufvertrag', name: 'Kaufvertrag und Vertragsstörungen' },
  { id: 'onlinerecht', name: 'Online-Recht: Fernabsatz, Widerruf, Pflichtangaben' },
  { id: 'datenschutz', name: 'Datenschutz' },
  { id: 'kalkulation', name: 'Kalkulation und Preise' },
  { id: 'kennzahlen', name: 'Kennzahlen und Controlling' },
  { id: 'rechnungswesen', name: 'Rechnungswesen' },
  { id: 'marketing', name: 'Online-Marketing' },
  { id: 'vertriebskanaele', name: 'Onlineshop, Marktplätze und Vertriebskanäle' },
  { id: 'zahlung', name: 'Zahlungsarten und Zahlungsabwicklung' },
  { id: 'logistik', name: 'Versand, Logistik und Retouren' },
  { id: 'kundenkommunikation', name: 'Kundenkommunikation und Service' },
  { id: 'projekt', name: 'Projektmanagement' },
  // Wirtschafts- und Sozialkunde
  { id: 'ausbildung', name: 'Berufsausbildung' },
  { id: 'arbeitsrecht', name: 'Arbeitsrecht und Arbeitsschutz' },
  { id: 'mitbestimmung', name: 'Tarifrecht und Mitbestimmung' },
  { id: 'sozialversicherung', name: 'Sozialversicherung und Vorsorge' },
  { id: 'entgelt', name: 'Entgelt und Steuern' },
  { id: 'rechtsformen', name: 'Unternehmensformen' },
  { id: 'wirtschaft', name: 'Markt und Wirtschaftsordnung' },
  { id: 'nachhaltigkeit', name: 'Nachhaltigkeit und Umweltschutz' },
];

export const TYPEN = {
  mc: 'Multiple Choice',
  zuordnung: 'Zuordnung',
  reihenfolge: 'Reihenfolge',
  zahl: 'Rechenaufgabe',
  offen: 'Freie Antwort',
};
