// =====================================================================
//  Verzeichnis aller Klausuren
//
//  Neue Klausur einpflegen:
//    1. Datei content/klausuren/<id>.js anlegen (Aufbau siehe beispiel.js
//       und README.md), z. B. gp-2024-sommer.js
//    2. hier importieren und in KLAUSUREN eintragen
//    3. node tools/check-content.mjs ausführen
//
//  Wichtig: Die id einer Frage nie nachträglich ändern. An ihr hängt der
//  gespeicherte Lernstand.
// =====================================================================
import beispiel from './klausuren/beispiel.js';

export const KLAUSUREN = [
  beispiel,
];
